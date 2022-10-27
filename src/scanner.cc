
#include <tree_sitter/parser.h>

#include <cwctype>
#include <sstream>
#include <vector>

namespace {

enum TokenType {
  NEWLINE,
  SEMICOLON,
  RAW_STRING_LITERAL,
  OPEN_PAREN,
  CLOSE_PAREN,
  OPEN_BRACE,
  CLOSE_BRACE,
  OPEN_BRACKET,
  CLOSE_BRACKET,
  OPEN_BRACKET2,
  CLOSE_BRACKET2,
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
    for (int i = 0; i < n; i++) {
      buffer[i] = (char) tokens_[i+ 1];
    }

    return n;

  }

  void deserialize(const char* buffer, unsigned n) {

    tokens_.clear();
    tokens_.push_back(OPEN_BRACE);
    for (unsigned i = 0; i < n; i++) {
      tokens_.push_back((TokenType) buffer[i]);
    }

  }

  bool scan(TSLexer* lexer, const bool* valid_symbols) {

    // scan whitespace
    if (valid_symbols[NEWLINE] && scan_whitespace(lexer, valid_symbols)) {
      return true;
    }

    // check for semi-colons
    if (valid_symbols[SEMICOLON] && lexer->lookahead == ';') {
      lexer->advance(lexer, false);
      lexer->mark_end(lexer);
      lexer->result_symbol = SEMICOLON;
      return true;
    }

    // check for a raw string literal
    if (valid_symbols[RAW_STRING_LITERAL] && scan_raw_string_literal(lexer, valid_symbols)) {
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

    return false;

  }

  bool scan_whitespace(TSLexer* lexer, const bool* valid_symbols) {

    while (std::iswspace(lexer->lookahead)) {
      if (lexer->lookahead == '\n' && peek() == OPEN_BRACE) {
        lexer->advance(lexer, true);
        lexer->mark_end(lexer);
        lexer->result_symbol = NEWLINE;
        return true;
      }
      lexer->advance(lexer, true);
    }

    return false;

  }

  bool scan_raw_string_literal(TSLexer* lexer, const bool* valid_symbols) {

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
