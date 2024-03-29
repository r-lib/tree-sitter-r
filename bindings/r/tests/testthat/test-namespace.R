test_that("namespace", {
  text <- r"(
foo::
foo::bar
foo::bar(1)
  )"

  node <- parse(text)

  expect_node_snapshot(node)
})

test_that("namespace internal", {
  text <- r"(
foo:::
foo:::bar
foo:::bar(1)
  )"

  node <- parse(text)

  expect_node_snapshot(node)
})

test_that("namespace missing rhs", {
  # It's nice that `::` allows an optional RHS and enforces that it can only be a
  # string or identifier, so this gives us a pretty clean tree even though it is
  # invalid R code.
  # https://github.com/r-lib/tree-sitter-r/issues/65
  text <- r"(
library(dplyr::)

library()

1
2
3
  )"

  node <- parse(text)

  expect_node_snapshot(node)
})
