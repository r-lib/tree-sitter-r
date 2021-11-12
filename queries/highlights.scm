; highlights.scm

(call function: (identifier) @function)
(call arguments:
 (arguments
  name: (identifier) @parameter ))

(namespace_get function: (identifier) @function.method)
(namespace_get_internal function: (identifier) @function.method)

(namespace_get namespace: (identifier) @namespace
 "::" @operator)
(namespace_get_internal namespace: (identifier) @namespace
 ":::" @operator)

; Literals

(integer) @number

(float) @number

(complex) @number

(string) @string

(comment) @comment

(formal_parameters (identifier) @variable.parameter)

(identifier) @variable

; Operators
[
 "="
 "<-"
 "<<-"
 "->"
] @operator

(unary operator: [
  "-"
  "+"
  "!"
  "~"
] @operator)

(binary operator: [
  "-"
  "+"
  "*"
  "/"
  "^"
  "<"
  ">"
  "<="
  ">="
  "=="
  "!="
  "||"
  "|"
  "&&"
  "&"
  ":"
  "~"
  "|>"
] @operator)

(special) @operator

[
 "("
 ")"
 "["
 "]"
 "{"
 "}"
] @punctuation.bracket

(dollar "$" @operator)

(subset2
  "[[" @punctuation.bracket
  "]]" @punctuation.bracket)

[
 "while"
 "if"
 "else"
 "function"
 "repeat"
 "for"
 "in"
 (dots)
 (true)
 (false)
 (break)
 (next)
 (inf)
 (nan)
 (na)
 (null)
] @keyword
