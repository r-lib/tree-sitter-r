expect_describe_it_captures <- function(parent_desc, desc, captures) {
  # make sure we captured something
  expect_gt(length(captures$node), 0)

  # the capture names that should always be present
  expect_contains(
    captures$name,
    c(
      "parent_call", "parent_function", "parent_desc",
      "call", "function", "desc"
    )
  )

  expect_equal(
    treesitter::node_text(captures[["node"]][[which(captures$name == "parent_function")]]),
    "describe"
  )
  expect_equal(
    treesitter::node_text(captures[["node"]][[which(captures$name == "parent_desc")]]),
    parent_desc
  )
  expect_equal(
    treesitter::node_text(captures[["node"]][[which(captures$name == "function")]]),
    "it"
  )
  expect_equal(
    treesitter::node_text(captures[["node"]][[which(captures$name == "desc")]]),
    desc
  )
}
