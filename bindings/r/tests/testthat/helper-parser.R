parse <- function(x) {
  skip_if_not_installed("treesitter")
  language <- language()
  parser <- treesitter::parser(language)
  tree <- treesitter::parser_parse(parser, x)
  treesitter::tree_root_node(tree)
}
