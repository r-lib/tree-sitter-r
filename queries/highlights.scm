; highlights.scm

;; Comments
(comment) @comment

;; Numeric literals
[
 (integer)
 (float)
 (complex)
] @constant.builtin

;; Strings
(string)  @string

;; Parameters
(parameters (parameter name: (identifier) @variable.parameter))
(arguments  (argument  name: (identifier) @variable.parameter))

;; Operators
[
  "?" ":=" "=" "<-" "<<-" "->" "->>"
  "~" "|>" "=>" "||" "|" "&&" "&"
  "<" "<=" ">" ">=" "==" "!="
  "+" "-" "*" "/" "::" ":::"
  "**" "^" "$" "@"
  (special)
] @operator

;; Brackets
[
  "("  ")"
  "{"  "}"
  "["  "]"
  "[[" "]]"
] @punctuation.bracket

(comma) @punctuation.delimiter

;; Keywords
[
  (return) (next) (break) (null)
] @keyword

[
  "function"
] @keyword.function

[
  "if"
  "else"
  "while"
  "repeat"
  "for"
] @keyword

[
  (inf) (nan) (dots) (true) (false) (na)
] @constant.builtin

;; Calls

;; Error
(ERROR) @error
