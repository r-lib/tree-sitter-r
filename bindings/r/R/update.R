# Assumes that you have forked tree-sitter-r in its entirety, but your
# current working directory is `tree-sitter-r/bindings/r/`.
update <- function() {
  header <- normalizePath(file.path("..", "..", "src", "tree_sitter", "parser.h"), mustWork = TRUE)
  parser <- normalizePath(file.path("..", "..", "src", "parser.c"), mustWork = TRUE)
  scanner <- normalizePath(file.path("..", "..", "src", "scanner.c"), mustWork = TRUE)

  to_header <- file.path(".", "src", "tree_sitter", "parser.h")
  to_parser <- file.path(".", "src", "parser.c")
  to_scanner <- file.path(".", "src", "scanner.c")

  if (!dir.exists(file.path(".", "src"))) {
    message("Creating `src/` directory")
    dir.create(file.path(".", "src"))
  }
  if (!dir.exists(file.path(".", "src", "tree_sitter"))) {
    message("Creating `src/tree_sitter/` directory")
    dir.create(file.path(".", "src", "tree_sitter"))
  }

  header_needs_update <- needs_update(header, to_header)
  if (header_needs_update) {
    message("`tree_sitter/parser.h` is out of date, updating.")
    file.copy(header, to_header, overwrite = TRUE)
  }

  parser_needs_update <- needs_update(parser, to_parser)
  if (parser_needs_update) {
    message("`parser.c` is out of date, updating.")
    file.copy(parser, to_parser, overwrite = TRUE)
  }

  scanner_needs_update <- needs_update(scanner, to_scanner)
  if (scanner_needs_update) {
    message("`scanner.c` is out of date, updating.")
    file.copy(scanner, to_scanner, overwrite = TRUE)
  }

  if (header_needs_update || parser_needs_update || scanner_needs_update) {
    message("Run `load_all()` again to recompile with updated source files.")
  }

  invisible()
}

needs_update <- function(from, to) {
  if (!file.exists(to)) {
    # First time ever
    return(TRUE)
  }

  from_modified <- file.info(from)$mtime
  to_modified <- file.info(to)$mtime

  isTRUE(from_modified > to_modified)
}
