test_that("comments don't include a trailing `\\r` on CRLF line endings", {
  # https://github.com/r-lib/tree-sitter-r/pull/184
  #
  # We don't have tree-sitter corpus tests for this, as the trailing `\r` only
  # affects the comment's end position, not the tree structure, and the
  # tree-sitter test infrastructure doesn't report node positions.
  #
  # Our `grammar.js` `comment` regex of `[^\r\n]*` matches other grammars
  # https://github.com/tree-sitter/tree-sitter-c-sharp/pull/181
  # https://github.com/tree-sitter/tree-sitter-javascript/blob/58404d8cf191d69f2674a8fd507bd5776f46cb11/grammar.js#L1048
  skip_if_not_installed("treesitter")

  language <- language()
  parser <- treesitter::parser(language)

  test_comment_position <- function(text, end_point, end_byte) {
    tree <- treesitter::parser_parse(parser, text)
    node <- treesitter::node_child(treesitter::tree_root_node(tree), 1)

    expect_identical(treesitter::node_type(node), "comment")
    expect_identical(treesitter::node_text(node), "# comment")

    expect_identical(
      treesitter::node_start_point(node),
      treesitter::point(0, 0)
    )
    expect_identical(treesitter::node_end_point(node), end_point)

    expect_identical(treesitter::node_start_byte(node), 0)
    expect_identical(treesitter::node_end_byte(node), end_byte)
  }

  # No line ending
  test_comment_position("# comment", treesitter::point(0, 9), 9)

  # Unix
  test_comment_position("# comment\n", treesitter::point(0, 9), 9)

  # Windows. The comment stops before the `\r`, which is treated as whitespace.
  test_comment_position("# comment\r\n", treesitter::point(0, 9), 9)
})
