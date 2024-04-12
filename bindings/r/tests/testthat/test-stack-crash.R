test_that("1025 unmatched opening braces", {
  # We don't really care about the actual result value, the important thing is that it
  # doesn't crash. This is 1 nesting level past the `TREE_SITTER_SERIALIZATION_BUFFER_SIZE`,
  # which is a pathological edge case. When this occurs, we give up from the external
  # scanner and let the internal scanner either handle it or error.

  skip_if_not_installed("treesitter")

  text <- paste(c("\n", replicate(1025, "{"), "\n  "), collapse = "")

  language <- language()
  parser <- treesitter::parser(language)

  expect_no_error({
    tree <- treesitter::parser_parse(parser, text)
    node <- treesitter::tree_root_node(tree)
  })
})
