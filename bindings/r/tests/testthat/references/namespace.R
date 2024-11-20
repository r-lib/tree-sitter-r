# ------------------------------------------------------------------------------
# namespace

foo::
foo::bar
foo::bar(1)
foo::...
foo::..1
...::foo
..1::foo
...::...
..1::..1

# ------------------------------------------------------------------------------
# namespace internal

foo:::
foo:::bar
foo:::bar(1)
foo:::...
foo:::..1
...:::foo
..1:::foo
...:::...
..1:::..1

# ------------------------------------------------------------------------------
# namespace missing rhs

# It's nice that `::` allows an optional RHS and enforces that it can only be a
# string or identifier, so this gives us a pretty clean tree even though it is
# invalid R code.
# https://github.com/r-lib/tree-sitter-r/issues/65
library(dplyr::)

library()

1
2
3
