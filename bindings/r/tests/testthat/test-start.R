test_that("`program` always starts at `(0, 0)`", {
  # https://github.com/r-lib/tree-sitter-r/issues/151
  #
  # We don't have tree-sitter corpus tests for this, as this is very specific
  # to node positions, and the tree-sitter test infrastructure doesn't report
  # that.
  skip_if_not_installed("treesitter")

  language <- language()
  parser <- treesitter::parser(language)

  test_program_position <- function(text, end_point, end_byte) {
    tree <- treesitter::parser_parse(parser, text)

    # Root node is `program`
    node <- treesitter::tree_root_node(tree)

    expect_identical(treesitter::node_start_point(node), treesitter::point(0, 0))
    expect_identical(treesitter::node_end_point(node), end_point)

    expect_identical(treesitter::node_start_byte(node), 0)
    expect_identical(treesitter::node_end_byte(node), end_byte)
  }

  # Empty file
  test_program_position("", treesitter::point(0, 0), 0)

  # Only whitespace
  test_program_position("  ", treesitter::point(0, 2), 2)

  # Only newlines (Unix)
  test_program_position("\n\n", treesitter::point(2, 0), 2)

  # Only newlines (Windows)
  test_program_position("\r\n\r\n", treesitter::point(2, 0), 4)

  # Leading whitespace
  test_program_position("  x", treesitter::point(0, 3), 3)

  # Leading newlines (Unix)
  test_program_position("\n\nx", treesitter::point(2, 1), 3)

  # Leading newlines (Windows)
  test_program_position("\r\n\r\nx", treesitter::point(2, 1), 5)
})
