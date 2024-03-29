test_that("closing brace", {
  text <- r"(
}
  )"

  node <- parse(text)

  expect_snapshot(node_children_print(node))
})

test_that("closing parenthesis", {
  text <- r"(
)
  )"

  node <- parse(text)

  expect_snapshot(node_children_print(node))
})

test_that("closing bracket", {
  text <- r"(
]
  )"

  node <- parse(text)

  expect_snapshot(node_children_print(node))
})

test_that("opening brace, closing parenthesis", {
  # Parenthesis is "not valid" so it isn't matched by the external scanner, and
  # instead falls through to the `unmatched_delimiter` rule in the grammar.
  text <- r"(
{)
  )"

  node <- parse(text)

  expect_snapshot(node_children_print(node))
})

test_that("opening parenthesis, closing brace", {
  text <- r"(
(}
  )"

  node <- parse(text)

  expect_snapshot(node_children_print(node))
})

test_that("opening parenthesis, closing bracket", {
  text <- r"(
(]
  )"

  node <- parse(text)

  expect_snapshot(node_children_print(node))
})

test_that("opening bracket2, unmatched closing bracket", {
  text <- r"(
x[[2]
  )"

  node <- parse(text)

  expect_snapshot(node_children_print(node))
})

test_that("opening bracket and bracket2, unmatched closing bracket", {
  text <- r"(
x[y[[2]
  )"

  node <- parse(text)

  expect_snapshot(node_children_print(node))
})

test_that("opening bracket2 and bracket, matched closing bracket", {
  text <- r"(
x[[y[2]
  )"

  node <- parse(text)

  expect_snapshot(node_children_print(node))
})

test_that("opening bracket2 and bracket, unmatched closing bracket", {
  text <- r"(
x[[y[2]]
  )"

  node <- parse(text)

  expect_snapshot(node_children_print(node))
})
