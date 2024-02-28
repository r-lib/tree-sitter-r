
#include <tree_sitter/parser.h>

#include <cwctype>
#include <sstream>
#include <vector>

namespace {

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
  CLOSE_BRACKET2,
  TOP_LEVEL,
};

struct Scanner {

  void push(TokenType token) {
    tokens_.push_back(token);
  }

  void pop(TokenType token) {

    if (tokens_.empty()) {
      return;
    }

    TokenType back = tokens_.back();
    if (token != back) {
      return;
    }

    tokens_.pop_back();

  }

  TokenType peek() {
    return tokens_.back();
  }

  unsigned serialize(char* buffer) {

    int n = tokens_.size() - 1;
    if (n > TREE_SITTER_SERIALIZATION_BUFFER_SIZE)
      return 0;

    for (int i = 0; i < n; i++) {
      buffer[i] = (char) tokens_[i + 1];
    }

    return n;

  }

  void deserialize(const char* buffer, unsigned n) {

    tokens_.clear();
    tokens_.reserve(n + 1);
    tokens_.push_back((TokenType) TOP_LEVEL);
    for (unsigned i = 0; i < n; i++) {
      tokens_.push_back((TokenType) buffer[i]);
    }

  }

  bool scan(TSLexer* lexer, const bool* valid_symbols) {
    consume_whitespace_and_ignored_newlines(lexer);

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
      push(OPEN_PAREN);
      return true;
    }

    if (valid_symbols[CLOSE_PAREN] && lexer->lookahead == ')') {
      lexer->advance(lexer, false);
      lexer->mark_end(lexer);
      lexer->result_symbol = CLOSE_PAREN;
      pop(OPEN_PAREN);
      return true;
    }

    if (valid_symbols[OPEN_BRACE] && lexer->lookahead == '{') {
      lexer->advance(lexer, false);
      lexer->mark_end(lexer);
      lexer->result_symbol = OPEN_BRACE;
      push(OPEN_BRACE);
      return true;
    }

    if (valid_symbols[CLOSE_BRACE] && lexer->lookahead == '}') {
      lexer->advance(lexer, false);
      lexer->mark_end(lexer);
      lexer->result_symbol = CLOSE_BRACE;
      pop(OPEN_BRACE);
      return true;
    }

    if (valid_symbols[OPEN_BRACKET] || valid_symbols[OPEN_BRACKET2]) {
      if (lexer->lookahead == '[') {
        lexer->advance(lexer, false);
        if (lexer->lookahead == '[') {
          lexer->advance(lexer, false);
          lexer->mark_end(lexer);
          lexer->result_symbol = OPEN_BRACKET2;
          push(OPEN_BRACKET2);
        } else {
          lexer->mark_end(lexer);
          lexer->result_symbol = OPEN_BRACKET;
          push(OPEN_BRACKET);
        }
        return true;
      }
    }

    if (valid_symbols[CLOSE_BRACKET] || valid_symbols[CLOSE_BRACKET2]) {
      if (lexer->lookahead == ']') {
        lexer->advance(lexer, false);
        if (lexer->lookahead == ']' && peek() == OPEN_BRACKET2) {
          lexer->advance(lexer, false);
          lexer->mark_end(lexer);
          lexer->result_symbol = CLOSE_BRACKET2;
          pop(OPEN_BRACKET2);
        } else {
          lexer->mark_end(lexer);
          lexer->result_symbol = CLOSE_BRACKET;
          pop(OPEN_BRACKET);
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
      return scan_newline_or_else(lexer, valid_symbols);
    }
 
    return false;

  }

  void consume_whitespace_and_ignored_newlines(TSLexer* lexer) {
    while (std::isspace(lexer->lookahead)) {
      if (lexer->lookahead != '\n') {
        // Consume all spaces, tabs, etc, unconditionally
        lexer->advance(lexer, true);
        continue;
      }

      // If we are inside `(`, `[`, or `[[`, we consume newlines unconditionally.
      // Notably not within `{` nor at "top level", where newlines have contextual
      // meaning, particularly for `if` statements. Both of those are handled elsewhere.
      TokenType token = peek();
      if (token == OPEN_PAREN || token == OPEN_BRACKET || token == OPEN_BRACKET2) {
        lexer->advance(lexer, true);
        continue;
      }

      // We've hit a newline with contextual meaning to be handled elsewhere
      break;
    }
  }

  bool scan_else(TSLexer* lexer) {
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
  // a `TOP_LEVEL` context or a `OPEN_BRACE` one if we saw a new line at this point.
  bool scan_newline_or_else(TSLexer* lexer, const bool* valid_symbols) {
    // Advance to the next non-newline, non-space character,
    // we know we have at least 1 newline because this function was called
    while (std::isspace(lexer->lookahead)) {
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
    if (valid_symbols[ELSE] && peek() == OPEN_BRACE && scan_else(lexer)) {
      return true;
    }

    return true;
  }

  bool scan_raw_string_literal(TSLexer* lexer) {

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

  private:
    std::vector<TokenType> tokens_;

};

} // end anonymous namespace

extern "C" {

void *tree_sitter_r_external_scanner_create() {
  Scanner* scanner = new Scanner();
  scanner->deserialize(nullptr, 0);
  return scanner;
}

bool tree_sitter_r_external_scanner_scan(void *payload,
                                         TSLexer *lexer,
                                         const bool *valid_symbols)
{
  Scanner* scanner = static_cast<Scanner*>(payload);
  return scanner->scan(lexer, valid_symbols);
}

unsigned tree_sitter_r_external_scanner_serialize(void *payload, char *buffer) {
  Scanner* scanner = static_cast<Scanner*>(payload);
  return scanner->serialize(buffer);
}

void tree_sitter_r_external_scanner_deserialize(void *payload, const char *buffer, unsigned length) {
  Scanner* scanner = static_cast<Scanner*>(payload);
  scanner->deserialize(buffer, length);
}

void tree_sitter_r_external_scanner_destroy(void *payload) {
  Scanner* scanner = static_cast<Scanner*>(payload);
  delete scanner;
}

} // extern "C"
