# ------------------------------------------------------------------------------
# identifiers

foo
foo2
foo.bar
.foo.bar
.__NAMESPACE__.
.
..
._
._.
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
# invalid identifiers

# R does not allow identifiers to start with a `.` followed by a digit, as this
# would cause ambiguity with `.1L` and `.1i`. R itself rejects this as a syntax
# error, we currently parse this as `.1` followed by `foo`, just like we do with
# `1foo` (#190).
.1foo

# ------------------------------------------------------------------------------
# `return` is just an identifier

function(x) return(x)
return(x)
return

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
1e1L
# Technically, R parses these as floats with a warning, but for our purposes this is good enough
0.1L
.1L

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

# Decimal point
0x.
0x1.
0x.1
0x1.1

# Decimal point with exponent
0x.p1
0x1.p1
0x.1p1
0x1.1p1

# As integers
0x123L
0X123L
0xDEADL
0XDEADL
0x0p0L
0x0P0L
0x0p+0L
0x0p-0L
0x.L
0x1.L
0x.1L
0x1.1L

# ------------------------------------------------------------------------------
# scientific notation floats

1e322
1e-3
1e+3
1.8e10
1.e10
1e10

# ------------------------------------------------------------------------------
# complex

1i
0i
1.1i
.1i
1e10i
.1e10i
0x1i
0x.1i
