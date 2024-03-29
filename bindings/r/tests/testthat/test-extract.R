test_that("dollar", {
  text <- r"(
foo$bar
foo$bar$baz
foo$bar@baz
foo$bar()
foo$"bar"
foo$bar()$baz[[1]]$bam
  )"

  node <- parse(text)

  expect_snapshot(node_children_print(node))
})

test_that("dollar no rhs", {
  text <- r"(
foo$
  )"

  node <- parse(text)

  expect_snapshot(node_children_print(node))
})

test_that("slot", {
  text <- r"(
foo@bar
foo@bar$baz
foo@bar()
foo@"bar"
  )"

  node <- parse(text)

  expect_snapshot(node_children_print(node))
})

test_that("slot no rhs", {
  text <- r"(
foo@
  )"

  node <- parse(text)

  expect_snapshot(node_children_print(node))
})
