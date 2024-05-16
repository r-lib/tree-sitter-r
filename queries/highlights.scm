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
(string (string_content (escape_sequence) @string.escape))

;; Parameters
(parameters (parameter name: (identifier) @variable.parameter))
(arguments  (argument  name: (identifier) @variable.parameter))

;; Operators
[
  "?" ":=" "=" "<-" "<<-" "->" "->>"
  "~" "|>" "||" "|" "&&" "&"
  "<" "<=" ">" ">=" "==" "!="
  "+" "-" "*" "/" "::" ":::"
  "**" "^" "$" "@" ":"
  "special"
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
  "function"
] @keyword.function

[
  "if"
  "else"
  "while"
  "repeat"
  "for"
  (return)
  (next)
  (break)
] @keyword

[
  (true)
  (false)
  (null)
  (inf)
  (nan)
  (na)
  (dots)
  (dot_dot_i)
] @constant.builtin

;; Error
(ERROR) @error
