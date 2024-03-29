test_that("dollar, at, namespace, namespace internal with expression rhs", {
  # These nodes allows an optional RHS, and the RHS must be a string/identifier,
  # so we nicely get a true node here alongside the braces. Even if that's not
  # parsable R code, it's useful for completions and highlighting.
  text <- r"(
foo${bar}
foo@{bar}
foo::{bar}
foo:::{bar}
  )"

  node <- parse(text)

  expect_node_snapshot(node)
})

test_that("dollar, at, namespace, namespace internal with `if` rhs", {
  # The RHS's of these nodes are restricted to strings and identifiers, and the RHS
  # is optional. This ends up trying to match to an `if_statement` node, leaving the RHS
  # empty, and then the `if_statement` node errors because it doesn't have a `(`. This
  # is actually pretty decent behavior.
  text <- r"(
foo$if
foo@if
foo::if
foo:::if
  )"

  node <- parse(text)

  expect_node_snapshot(node)
})

test_that("complex expressions", {
  text <- r"(
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
  )"

  node <- parse(text)

  expect_node_snapshot(node)
})

test_that("precedence", {
  text <- r"(
A$"B"^NA
a::b$c
a$b?c
  )"

  node <- parse(text)

  expect_node_snapshot(node)
})


test_that("newlines", {
  text <- r"(
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
  )"

  node <- parse(text)

  expect_node_snapshot(node)
})
