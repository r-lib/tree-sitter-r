
#include <tree_sitter/parser.h>
#include <ctype.h> // isspace()
#include <string.h> // memcpy()

enum TokenType {
  NEWLINE,
  SEMICOLON,
  ELSE,
  RAW_STRING_LITERAL,
  OPEN_PAREN,
  CLOSE_PAREN,
  OPEN_BRACE,
  CLOSE_BRACE,
  OPEN_BRACKET,
  CLOSE_BRACKET,
  OPEN_BRACKET2,
  CLOSE_BRACKET2
};

// ---------------------------------------------------------------------------------------
// Temporary Stack structure until we can use the `<tree_sitter/array.h>` header from
// tree sitter 1.0.0. Inspired from tree-sitter-julia.

typedef char Scope;

const Scope SCOPE_TOP_LEVEL = 0;
const Scope SCOPE_BRACE = 1;
const Scope SCOPE_PAREN = 2;
const Scope SCOPE_BRACKET = 3;
const Scope SCOPE_BRACKET2 = 4;

// A `Stack` data structure for tracking the current `Scope`
//
// `SCOPE_TOP_LEVEL` is never actually pushed onto the stack. It is returned from
// `stack_peek()` as a base case when `len = 0`. Note that in `stack_pop()` we still check
// for `len > 0` before peeking to retain the invariant that we can't pop without
// something on the stack.
// 
// This actually makes serialization/deserialization very simple. Even if we pushed an
// initial `SCOPE_TOP_LEVEL` in the create hook, there is no guarantee that that will get
// serialized (so the length of the stack won't be remembered) because the serialize hook
// only runs when we accept a token from our external scanner. That would complicate the
// deserialize hook by forcing us to differentiate between the cases of:
// 1) A deserialization call restoring state from a previous serialization (len > 0).
// 2) A deserialization call when there wasn't a previous serialization (len = 0), where
//    we'd have to repush an initial `SCOPE_TOP_LEVEL`.
typedef struct {
  Scope *arr;
  unsigned len;
} Stack;

static Stack *new_stack() {
  Scope *arr = malloc(TREE_SITTER_SERIALIZATION_BUFFER_SIZE);
  if (arr == NULL) exit(1);
  Stack *stack = malloc(sizeof(Stack));
  if (stack == NULL) exit(1);
  stack->arr = arr;
  stack->len = 0;
  return stack;
}

static void stack_free(Stack *stack) {
  free(stack->arr);
  free(stack);
}

static void stack_push(Stack *stack, Scope scope) {
  if (stack->len >= TREE_SITTER_SERIALIZATION_BUFFER_SIZE) exit(1);
  stack->arr[stack->len] = scope;
  stack->len++;
}

static Scope stack_peek(Stack *stack) {
  if (stack->len == 0) {
    return SCOPE_TOP_LEVEL;
  } else {
    return stack->arr[stack->len - 1];
  }
}

static void stack_pop(Stack *stack, Scope scope) {
  if (stack->len == 0) exit(1);
  Scope x = stack_peek(stack);
  stack->len--;
  if (x != scope) exit(1);
}

static unsigned stack_serialize(Stack *stack, char *buffer) {
  unsigned len = stack->len;
  if (len > 0) {
    memcpy(buffer, stack->arr, len);
  }
  return len;
}

static void stack_deserialize(Stack *stack, const char *buffer, unsigned len) {
  if (len > 0) {
    memcpy(stack->arr, buffer, len);
  }
  stack->len = len;
}

// ---------------------------------------------------------------------------------------

static void consume_whitespace_and_ignored_newlines(TSLexer* lexer, Stack* stack) {
  while (isspace(lexer->lookahead)) {
    if (lexer->lookahead != '\n') {
      // Consume all spaces, tabs, etc, unconditionally
      lexer->advance(lexer, true);
      continue;
    }

    // If we are inside `(`, `[`, or `[[`, we consume newlines unconditionally.
    // Notably not within `{` nor at "top level", where newlines have contextual
    // meaning, particularly for `if` statements. Both of those are handled elsewhere.
    Scope scope = stack_peek(stack);
    if (scope == SCOPE_PAREN || scope == SCOPE_BRACKET || scope == SCOPE_BRACKET2) {
      lexer->advance(lexer, true);
      continue;
    }

    // We've hit a newline with contextual meaning to be handled elsewhere
    break;
  }
}

static bool scan_else(TSLexer* lexer) {
  if (lexer->lookahead != 'e') {
    return false;
  }

  lexer->advance(lexer, false);
  if (lexer->lookahead != 'l') {
    return false;
  }

  lexer->advance(lexer, false);
  if (lexer->lookahead != 's') {
    return false;
  }

  lexer->advance(lexer, false);
  if (lexer->lookahead != 'e') {
    return false;
  }

  // We found `else`, return special `external` for it
  lexer->advance(lexer, false);
  lexer->mark_end(lexer);
  lexer->result_symbol = ELSE;

  return true;
}

// Due to `consume_whitespace_and_ignored_newlines()`, expect that we are either in
// a `SCOPE_TOP_LEVEL` or a `SCOPE_BRACE` if we saw a new line at this point.
static bool scan_newline_or_else(TSLexer* lexer, Stack* stack, const bool* valid_symbols) {
  // Advance to the next non-newline, non-space character,
  // we know we have at least 1 newline because this function was called
  while (isspace(lexer->lookahead)) {
    if (lexer->lookahead != '\n') {
      lexer->advance(lexer, true);
      continue;
    }
    
    lexer->advance(lexer, true);
    lexer->mark_end(lexer);
  }

  // If the next symbol is a comment, we go ahead and consume the newline as it won't
  // affect the context, and would otherwise interfere with a situation like below, as
  // the rogue newline would make it look like we exited the `if` statement, making a
  // potential `else` node "invalid" in terms of `valid_symbols`.
  //
  // if (cond) {
  // }
  // # comment
  // else {
  //  
  // }
  if (lexer->lookahead == '#') {
    lexer->advance(lexer, true);
    return false;
  }

  // At this point the most recent newline is marked by `mark_end()`, so lock
  // it in as a result before giving the special `else` case a chance to run.
  lexer->result_symbol = NEWLINE;

  // If the next symbol is an `e`, we need to check if we are coming up on an `else`,
  // in which case we consume all of the newlines if we are also in a `{` scope.
  if (valid_symbols[ELSE] && stack_peek(stack) == SCOPE_BRACE && scan_else(lexer)) {
    return true;
  }

  return true;
}

static bool scan_raw_string_literal(TSLexer* lexer) {

  // scan a raw string literal; see R source code for implementation:
  // https://github.com/wch/r-source/blob/52b730f217c12ba3d95dee0cd1f330d1977b5ea3/src/main/gram.y#L3102

  // raw string literals can start with either 'r' or 'R'
  lexer->mark_end(lexer);
  char prefix = lexer->lookahead;
  if (prefix != 'r' && prefix != 'R') {
    return false;
  }
  lexer->advance(lexer, false);

  // check for quote character
  char quote = lexer->lookahead;
  if (quote != '"' && quote != '\'') {
    return false;
  }
  lexer->advance(lexer, false);

  // start counting '-' characters
  int hyphen_count = 0;
  while (lexer->lookahead == '-') {
    lexer->advance(lexer, false);
    hyphen_count += 1;
  }

  // check for an opening bracket, and figure out
  // the corresponding closing bracket
  char opening_bracket = lexer->lookahead;
  char closing_bracket = 0;
  if (opening_bracket == '(') {
    closing_bracket = ')';
    lexer->advance(lexer, false);
  } else if (opening_bracket == '[') {
    closing_bracket = ']';
    lexer->advance(lexer, false);
  } else if (opening_bracket == '{') {
    closing_bracket = '}';
    lexer->advance(lexer, false);
  } else {
    return false;
  }

  // we're in the body of the raw string; start looping until
  // we find the matching closing bracket
  for (; lexer->lookahead != 0; lexer->advance(lexer, false)) {

    // consume a closing bracket
    if (lexer->lookahead != closing_bracket) {
      continue;
    }
    lexer->advance(lexer, false);

    // consume hyphens
    bool hyphens_ok = true;
    for (int i = 0; i < hyphen_count; i++) {
      if (lexer->lookahead != '-') {
        hyphens_ok = false;
        break;
      }
      lexer->advance(lexer, false);
    }

    if (!hyphens_ok) {
      continue;
    }

    // consume a closing quote character
    if (lexer->lookahead != quote) {
      continue;
    }
    lexer->advance(lexer, false);

    // success!
    lexer->mark_end(lexer);
    lexer->result_symbol = RAW_STRING_LITERAL;
    return true;

  }

  // if we get here, this implies we hit eof (and so we have
  // an unclosed raw string)
  return false;

}

static bool scan(TSLexer* lexer, Stack* stack, const bool* valid_symbols) {
  consume_whitespace_and_ignored_newlines(lexer, stack);

  // check for semi-colons
  if (valid_symbols[SEMICOLON] && lexer->lookahead == ';') {
    lexer->advance(lexer, false);
    lexer->mark_end(lexer);
    lexer->result_symbol = SEMICOLON;
    return true;
  }

  // check for an open bracket
  if (valid_symbols[OPEN_PAREN] && lexer->lookahead == '(') {
    lexer->advance(lexer, false);
    lexer->mark_end(lexer);
    lexer->result_symbol = OPEN_PAREN;
    stack_push(stack, SCOPE_PAREN);
    return true;
  }

  if (valid_symbols[CLOSE_PAREN] && lexer->lookahead == ')') {
    lexer->advance(lexer, false);
    lexer->mark_end(lexer);
    lexer->result_symbol = CLOSE_PAREN;
    stack_pop(stack, SCOPE_PAREN);
    return true;
  }

  if (valid_symbols[OPEN_BRACE] && lexer->lookahead == '{') {
    lexer->advance(lexer, false);
    lexer->mark_end(lexer);
    lexer->result_symbol = OPEN_BRACE;
    stack_push(stack, SCOPE_BRACE);
    return true;
  }

  if (valid_symbols[CLOSE_BRACE] && lexer->lookahead == '}') {
    lexer->advance(lexer, false);
    lexer->mark_end(lexer);
    lexer->result_symbol = CLOSE_BRACE;
    stack_pop(stack, SCOPE_BRACE);
    return true;
  }

  if (valid_symbols[OPEN_BRACKET] || valid_symbols[OPEN_BRACKET2]) {
    if (lexer->lookahead == '[') {
      lexer->advance(lexer, false);
      if (lexer->lookahead == '[') {
        lexer->advance(lexer, false);
        lexer->mark_end(lexer);
        lexer->result_symbol = OPEN_BRACKET2;
        stack_push(stack, SCOPE_BRACKET2);
      } else {
        lexer->mark_end(lexer);
        lexer->result_symbol = OPEN_BRACKET;
        stack_push(stack, SCOPE_BRACKET);
      }
      return true;
    }
  }

  if (valid_symbols[CLOSE_BRACKET] || valid_symbols[CLOSE_BRACKET2]) {
    if (lexer->lookahead == ']') {
      lexer->advance(lexer, false);
      if (lexer->lookahead == ']') {
        lexer->advance(lexer, false);
        lexer->mark_end(lexer);
        lexer->result_symbol = CLOSE_BRACKET2;
        stack_pop(stack, SCOPE_BRACKET2);
      } else {
        lexer->mark_end(lexer);
        lexer->result_symbol = CLOSE_BRACKET;
        stack_pop(stack, SCOPE_BRACKET);
      }
      return true;
    }
  }

  // There absolutely must not be any other conditions after these.
  // These functions `advance()` internally, so if they return `false` then we can't
  // check any other conditions after these because `lookahead` won't be accurate.
  if (valid_symbols[RAW_STRING_LITERAL] && (lexer->lookahead == 'r' || lexer->lookahead == 'R')) {
    return scan_raw_string_literal(lexer);
  } else if (valid_symbols[ELSE] && lexer->lookahead == 'e') {
    return scan_else(lexer);
  } else if (valid_symbols[NEWLINE] && lexer->lookahead == '\n') {
    return scan_newline_or_else(lexer, stack, valid_symbols);
  }

  return false;

}

// ---------------------------------------------------------------------------------------

void *tree_sitter_r_external_scanner_create() {
  Stack* stack = new_stack();
  return stack;
}

bool tree_sitter_r_external_scanner_scan(void *payload,
                                         TSLexer *lexer,
                                         const bool *valid_symbols) {
  return scan(lexer, payload, valid_symbols);
}

unsigned tree_sitter_r_external_scanner_serialize(void *payload, char *buffer) {
  return stack_serialize(payload, buffer);
}

void tree_sitter_r_external_scanner_deserialize(void *payload, const char *buffer, unsigned length) {
  stack_deserialize(payload, buffer, length);
}

void tree_sitter_r_external_scanner_destroy(void *payload) {
  stack_free(payload);
}