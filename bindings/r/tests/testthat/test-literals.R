test_that("identifiers", {
  text <- "
  foo
  foo2
  foo.bar
  .foo.bar
  .__NAMESPACE__.
  foo_bar
  `a \"literal\"`
  `another
  literal \` foo`
  `backslash followed by newline \
  `
  `\``
  # Recognized as `_` and `foo` identifiers. Should it be this way?
  _foo
  "
  expect_snapshot_s_expression(text)
})
