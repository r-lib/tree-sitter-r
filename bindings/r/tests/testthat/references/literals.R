# ------------------------------------------------------------------------------
# identifiers

# TODO: `_foo` is recognized as  `_` and `foo` identifiers. Should it be this way?
foo
foo2
foo.bar
.foo.bar
.__NAMESPACE__.
foo_bar
`a "literal"`
`another
literal \` foo`
`backslash followed by newline \
`
`\``
_foo

# ------------------------------------------------------------------------------
# comments

# a comment'

'# not a comment'


'
# still not a comment'

# ------------------------------------------------------------------------------
# constants

TRUE
FALSE
NULL
Inf
NaN
NA
NA_real_
NA_character_
NA_complex_

# ------------------------------------------------------------------------------
# integers

12332L
0L
12L
0xDEADL

# ------------------------------------------------------------------------------
# floats

.66
.11
123.4123
.1234
0xDEAD
x <- -.66

# ------------------------------------------------------------------------------
# scientific notation floats

1e322
1e-3
1e+3
1.8e10
1.e10
1e10
