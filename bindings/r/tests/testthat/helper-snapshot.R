expect_snapshot_s_expression <- function(x) {
  language <- language()
  parser <- treesitter::parser(language)
  tree <- treesitter::parser_parse(parser, x)
  node <- treesitter::tree_root_node(tree)
  expect_snapshot({
    treesitter::node_show_s_expression(
      x = node,
      color_parentheses = FALSE,
      color_locations = FALSE
    )
  })
}
