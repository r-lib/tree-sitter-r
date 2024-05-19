expect_test_that_captures <- function(code_source, desc, captures) {
  skip_if_not_installed("treesitter")

  # make sure we captured something
  expect_gt(length(captures$node), 0)

  # the capture names that should always be present
  expect_contains(captures$name, c("call", "function", "desc"))
  # other captures, such as "pkg" or "param" could also be here

  expect_equal(
    treesitter::node_text(captures[["node"]][[which(captures$name == "call")]]),
    trimws(code_source)
  )
  expect_equal(
    treesitter::node_text(captures[["node"]][[which(captures$name == "function")]]),
    "test_that"
  )
  expect_equal(
    treesitter::node_text(captures[["node"]][[which(captures$name == "desc")]]),
    desc
  )
  if ("pkg" %in% captures$name) {
    expect_equal(
      treesitter::node_text(captures[["node"]][[which(captures$name == "pkg")]]),
      "testthat"
    )
  }
  if ("param" %in% captures$name) {
    expect_equal(
      treesitter::node_text(captures[["node"]][[which(captures$name == "param")]]),
      "desc"
    )
  }
}
