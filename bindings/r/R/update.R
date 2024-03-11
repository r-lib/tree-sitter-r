update <- function() {
  header <- normalizePath(file.path("..", "..", "src", "tree_sitter", "parser.h"))
  parser <- normalizePath(file.path("..", "..", "src", "parser.c"))
  scanner <- normalizePath(file.path("..", "..", "src", "scanner.c"))

  to_header <- file.path(".", "src", "tree_sitter", "parser.h")
  to_parser <- file.path(".", "src", "parser.c")
  to_scanner <- file.path(".", "src", "scanner.c")

  if (!dir.exists(file.path(".", "src"))) {
    dir.create(file.path(".", "src"))
  }
  if (!dir.exists(file.path(".", "src", "tree_sitter"))) {
    dir.create(file.path(".", "src", "tree_sitter"))
  }

  file.copy(header, to_header, overwrite = TRUE)
  file.copy(parser, to_parser, overwrite = TRUE)
  file.copy(scanner, to_scanner, overwrite = TRUE)
}
