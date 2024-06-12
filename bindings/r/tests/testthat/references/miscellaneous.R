# ------------------------------------------------------------------------------
# dollar, at, namespace, namespace internal with expression rhs

# These nodes allows an optional RHS, and the RHS must be a string/identifier,
# so we nicely get a true node here alongside the braces. Even if that's not
# parsable R code, it's useful for completions and highlighting.

foo${bar}
foo@{bar}
foo::{bar}
foo:::{bar}

# ------------------------------------------------------------------------------
# dollar, at, namespace, namespace internal with `if` rhs

# The RHS's of these nodes are restricted to strings and identifiers, and the RHS
# is optional. This ends up trying to match to an `if_statement` node, leaving the RHS
# empty, and then the `if_statement` node errors because it doesn't have a `(`. This
# is actually pretty decent behavior.

foo$if
foo@if
foo::if
foo:::if

# ------------------------------------------------------------------------------
# complex expressions

repeat if (1) TRUE else repeat 42
if (TRUE) if (FALSE) 2 else NULL
a::b$c[[d]] <- e
TRUE ~ FALSE ~ NULL ? NA ? NaN
if (TRUE) FALSE
else NA
(if (TRUE) FALSE
else NA)
a = TRUE ? FALSE
TRUE <- FALSE = NA
TRUE <- FALSE ? NA
TRUE = FALSE ? NA
TRUE ? FALSE = NA

# ------------------------------------------------------------------------------
# precedence

A$"B"^NA
a::b$c
a$b?c

# ------------------------------------------------------------------------------
# newlines

apple
(banana)

{
  apple
  (banana)
}

(
  apple
  (banana)
)

# ------------------------------------------------------------------------------
# motivation for not having `unmatched_delimiter` 1 (#90)

# `if ()` is invalid R code because there isn't a `condition` between the two
# `()`. We don't want tree-sitter to think `)` is an `unmatched_delimiter`
# expression that it can accept as `condition`, we instead want its error
# recovery to detect the missing `condition`.

foo <- function() {
  if ()

  1 + 1
}

# ------------------------------------------------------------------------------
# motivation for not having `unmatched_delimiter` 2 (#90)

# Same argument as above, but in this case `unmatched_delimiter` made the entire
# program show as ERROR.

blah('foo',
  list(
    foo = function() {
      if ()
    },

    foo2 = function() {

    }
  )
)

# ------------------------------------------------------------------------------
# motivation for not having `unmatched_delimiter` 3 (#90)

# In this case we want the `{}` to be a matching pair, and for there to be a
# MISSING rhs of the `+` operator.

{
  ggplot() +
}
