node_print <- function(x) {
  cat_line("S-Expression")

  # Most importantly, no `max_lines` truncation that we'd get
  # from the normal print method
  treesitter::node_show_s_expression(
    x = x,
    color_parentheses = FALSE,
    color_locations = FALSE
  )

  cat_line()
  cat_line("Text")

  text <- treesitter::node_text(x)
  cat_line(text)

  invisible(x)
}

# Always starts with a `program` node that we
# print the children of
node_children_print <- function(x) {
  children <- treesitter::node_children(x)

  for (i in seq_along(children)) {
    node_print(children[[i]])
    cat_line()
  }

  invisible(x)
}

expect_node_snapshot <- function(x) {
  expect_snapshot(node_children_print(x))
}

cat_line <- function(...) {
  out <- paste0(..., collapse = "\n")
  cat(out, "\n", sep = "", file = stdout(), append = TRUE)
}
