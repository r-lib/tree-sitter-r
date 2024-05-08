test_that("one-liner test_that() call is matched", {
  code_source <- 'test_that("desc one-liner", expect_true(TRUE))'
  captures <- get_captures(code_source, read_fixture("test_that.scm"))

  expect_test_that_captures(
    code_source,
    "\"desc one-liner\"",
    captures
  )
  expect_top_level(captures[["node"]][[1]])
})

test_that("test_that() call with braced expression for `code` is matched", {
  code_source <- '
test_that("desc bracket body", {
  x <- 1 + 1
  expect_equal(x, 2)
})
  '
  captures <- get_captures(code_source, read_fixture("test_that.scm"))

  expect_test_that_captures(
    code_source,
    "\"desc bracket body\"",
    captures
  )
  expect_top_level(captures[["node"]][[1]])
})

test_that("test_that(code, desc = 'desc') is matched", {
  code_source <- 'test_that(expect_true(TRUE), desc = "desc after code")'
  captures <- get_captures(code_source, read_fixture("test_that.scm"))

  expect_test_that_captures(
    code_source,
    "\"desc after code\"",
    captures
  )
  expect_top_level(captures[["node"]][[1]])
})

test_that("test_that() with <2 args does not match", {
  code_source <- 'test_that("desc only, no code")'
  captures <- get_captures(code_source, read_fixture("test_that.scm"))
  expect_length(captures$node, 0)
})

test_that("test_that() with >2 args does not match", {
  code_source <- 'test_that("desc", expect_true(TRUE), other_stuff)'
  captures <- get_captures(code_source, read_fixture("test_that.scm"))
  expect_length(captures$node, 0)
})

test_that("testthat::test_that() is matched", {
  code_source <- 'testthat::test_that("with testthat::", expect_true(TRUE))'
  captures <- get_captures(code_source, read_fixture("test_that.scm"))

  expect_test_that_captures(
    code_source,
    "\"with testthat::\"",
    captures
  )
  
  expect_top_level(captures[["node"]][[1]])
})

test_that("OTHERPKG::test_that() does not match", {
  code_source <- 'OTHERPKG::test_that("with OTHERPKG::", expect_true(TRUE))'
  captures <- get_captures(code_source, read_fixture("test_that.scm"))
  expect_length(captures$node, 0)
})
