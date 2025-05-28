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

# ------------------------------------------------------------------------------
# floats

.66
.11
123.4123
.1234
x <- -.66

# ------------------------------------------------------------------------------
# hexadecimal

# `x` vs `X`
0x123
0X123

# Numbers and letters
0xDEAD
0XDEAD
0x1f2F3
0X1f2F3

# `p` vs `P`
0x0p0
0x0P0
0x0p123
0x0P123

# `+` and `-`
0x0p+0
0x0p-0
0x0p+123
0x0p-123

# As integers
0x123L
0X123L
0xDEADL
0XDEADL
0x0p0L
0x0P0L
0x0p+0L
0x0p-0L

# ------------------------------------------------------------------------------
# scientific notation floats

1e322
1e-3
1e+3
1.8e10
1.e10
1e10
