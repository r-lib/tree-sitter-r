; highlights.scm

(comment) @comment

; Numeric literals
[
 (integer)
 (float)
 (complex)
] @constant.builtin

; Strings
(string)  @string

; Parameters
(parameters (parameter name: (identifier) @variable.parameter))
(arguments  (argument  name: (identifier) @variable.parameter))

; Operators
[
  "?" ":=" "=" "<-" "<<-" "->" "->>"
  "~" "|>" "=>" "||" "|" "&&" "&"
  "<" "<=" ">" ">=" "==" "!="
  "+" "-" "*" "/"
  "::" ":::"
  "**" "^"
  "$" "@"
] @operator

; Brackets
[
  "("  ")"
  "{"  "}"
  "["  "]"
  "[[" "]]"
] @operator

; Keywords
[
  (next) (break) (NULL) (Inf) (NaN) (dots)
  (NA) (NA_integer_) (NA_real_) (NA_complex_) (NA_character_)
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
  (TRUE)
  (FALSE)
] @constant.builtin

; Calls

; Error
(ERROR) @error
