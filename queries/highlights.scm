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
  "%<>%" "%$%" "%!>%" "%>%" "%T>%" "%%"
  "**" "^" "$" "@"
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
  (return) (next) (break) (NULL)
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
  (Inf) (NaN) (dots) (TRUE) (FALSE)
  (NA) (NA_integer_) (NA_real_) (NA_complex_) (NA_character_)
] @constant.builtin

;; Calls

;; Error
(ERROR) @error
