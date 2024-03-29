# Assumes that you have forked tree-sitter-r in its entirety, but your
# current working directory is `tree-sitter-r/bindings/r/`, as set by the
# `.Rprofile` in the root of the directory.
update <- function() {
  header <- normalizePath(file.path("..", "..", "src", "tree_sitter", "parser.h"))
  parser <- normalizePath(file.path("..", "..", "src", "parser.c"))
  scanner <- normalizePath(file.path("..", "..", "src", "scanner.c"))

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

  message("Updating `tree_sitter/parser.h`")
  file.copy(header, to_header, overwrite = TRUE)

  message("Updating `parser.c`")
  file.copy(parser, to_parser, overwrite = TRUE)

  message("Updating `scanner.c`")
  file.copy(scanner, to_scanner, overwrite = TRUE)
}
