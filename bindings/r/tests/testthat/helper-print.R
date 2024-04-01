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

test_that_tree_sitter <- function(path) {
  env <- parent.frame()

  path <- testthat::test_path(path)
  lines <- readLines(path)

  boundaries <- startsWith(lines, "# -----")
  boundaries <- which(boundaries)
  boundaries <- unique(c(boundaries, length(lines) + 1L))

  n_chunks <- length(boundaries) - 1L

  for (i in seq_len(n_chunks)) {
    start <- boundaries[[i]]
    end <- boundaries[[i + 1L]]

    desc <- lines[[start + 1L]]
    desc <- sub("# ", "", desc, fixed = TRUE)

    start <- start + 2L
    end <- pmax(end - 1L, start)

    text <- lines[seq(start, end)]
    text <- paste0(text, collapse = "\n")

    expr <- substitute(
      testthat::test_that(desc, {
        language <- language()
        parser <- treesitter::parser(language)

        tree <- treesitter::parser_parse(parser, text)
        node <- treesitter::tree_root_node(tree)

        expect_snapshot(node_children_print(node))
      }),
      list(desc = desc, text = text)
    )

    eval(expr, env)
  }
}

cat_line <- function(...) {
  out <- paste0(..., collapse = "\n")
  cat(out, "\n", sep = "", file = stdout(), append = TRUE)
}
