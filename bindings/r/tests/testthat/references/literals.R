# ------------------------------------------------------------------------------
# identifiers

foo
foo2
foo.bar
.foo.bar
.__NAMESPACE__.
foo_bar
`_foo`
`a "literal"`
`another
literal \` foo`
`backslash followed by newline \
`
`\``
# Pipe placeholder
_
# Recognized as a single `_foo` identifier, even if invalid R code (#71).
_foo
__foo
_foo_

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
