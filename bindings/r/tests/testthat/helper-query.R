read_fixture <- function(file) {
  paste(readLines(test_path("fixtures", file)), collapse = '')
}

get_captures <- function(code_source, query_source) {
  skip_if_not_installed("treesitter")
  language <- language()
  parser <- treesitter::parser(language)
  tree <- treesitter::parser_parse(parser, code_source)
  node <- treesitter::tree_root_node(tree)
  query <- treesitter::query(language, query_source)
  treesitter::query_captures(query, node)
}

get_matches <- function(code_source, query_source) {
  skip_if_not_installed("treesitter")
  language <- language()
  parser <- treesitter::parser(language)
  tree <- treesitter::parser_parse(parser, code_source)
  node <- treesitter::tree_root_node(tree)
  query <- treesitter::query(language, query_source)
  treesitter::query_matches(query, node)[[1]]
}

expect_top_level <- function(node) {
  skip_if_not_installed("treesitter")
  expect_equal(
    treesitter::node_type(treesitter::node_parent(node)),
    "program"
  )
}
