; highlights.scm

(comment) @comment

; Literals
(integer) @number
(float) @float
(complex) @number
(string) @string

;; Identifiers, etc
(identifier) @variable
(parameters (parameter name: (identifier) @parameter))

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
] @conditional

[
  "while"
  "repeat"
  "for"
] @repeat

[
  (TRUE)
  (FALSE)
] @boolean

; Calls
(call (identifier) @function)
(call (arguments (argument name: (identifier) @parameter)))

; Error
(ERROR) @error
