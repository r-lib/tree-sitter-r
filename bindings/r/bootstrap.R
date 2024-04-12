#!/usr/bin/env Rscript

# Assumes that you have forked this repo in its entirety, but your
# current working directory is `bindings/r/`.
sync <- function() {
  dir_src <- file.path(".", "src")
  dir_tree_sitter <- file.path(dir_src, "tree_sitter")

  dest_header <- file.path(dir_tree_sitter, "parser.h")
  dest_alloc <- file.path(dir_tree_sitter, "alloc.h")
  dest_array <- file.path(dir_tree_sitter, "array.h")
  dest_parser <- file.path(dir_src, "parser.c")
  dest_scanner <- file.path(dir_src, "scanner.c")

  if (!dir.exists(dir_src)) {
    message("Creating `src/` directory")
    dir.create(dir_src)
  }
  if (!dir.exists(dir_tree_sitter)) {
    message("Creating `src/tree_sitter/` directory")
    dir.create(dir_tree_sitter)
  }

  upstream <- normalizePath(file.path("..", "..", "src"), mustWork = FALSE)

  if (dir.exists(upstream)) {
    # Typical case in CI checks, `devtools::install_github()`, `pak::pak()`
    # where the full git repo directory is in place
    sync_with_upstream(upstream, dest_header, dest_alloc, dest_array, dest_parser, dest_scanner)
  } else {
    # `pak::pak("local::.")`, and in particular pkgdown CI which uses
    # `local::.`, where pkgdepends copies only the package directory to a
    # temp directory. In this case, `bootstrap.R` must have already been run.
    sync_without_upstream(dest_header, dest_alloc, dest_array, dest_parser, dest_scanner)
  }

  invisible()
}

sync_with_upstream <- function(upstream, dest_header, dest_alloc, dest_array, dest_parser, dest_scanner) {
  header <- normalizePath(file.path(upstream, "tree_sitter", "parser.h"), mustWork = TRUE)
  alloc <- normalizePath(file.path(upstream, "tree_sitter", "alloc.h"), mustWork = TRUE)
  array <- normalizePath(file.path(upstream, "tree_sitter", "array.h"), mustWork = TRUE)
  parser <- normalizePath(file.path(upstream, "parser.c"), mustWork = TRUE)
  scanner <- normalizePath(file.path(upstream, "scanner.c"), mustWork = TRUE)

  header_needs_update <- needs_update(header, dest_header)
  if (header_needs_update) {
    message("`tree_sitter/parser.h` is out of date, updating.")
    file.copy(header, dest_header, overwrite = TRUE)
  }

  alloc_needs_update <- needs_update(alloc, dest_alloc)
  if (alloc_needs_update) {
    message("`tree_sitter/alloc.h` is out of date, updating.")
    file.copy(alloc, dest_alloc, overwrite = TRUE)
  }

  array_needs_update <- needs_update(array, dest_array)
  if (array_needs_update) {
    message("`tree_sitter/array.h` is out of date, updating.")
    file.copy(array, dest_array, overwrite = TRUE)
  }

  parser_needs_update <- needs_update(parser, dest_parser)
  if (parser_needs_update) {
    message("`parser.c` is out of date, updating.")
    file.copy(parser, dest_parser, overwrite = TRUE)
  }

  scanner_needs_update <- needs_update(scanner, dest_scanner)
  if (scanner_needs_update) {
    message("`scanner.c` is out of date, updating.")
    file.copy(scanner, dest_scanner, overwrite = TRUE)
  }

  if (header_needs_update || alloc_needs_update || array_needs_update || parser_needs_update || scanner_needs_update) {
    message("If using `load_all()`, call it again to recompile with updated source files.")
  } else {
    message("All parent tree-sitter files were up to date.")
  }

  invisible()
}

sync_without_upstream <- function(dest_header, dest_alloc, dest_array, dest_parser, dest_scanner) {
  message(paste0(
    "Can't find parent tree-sitter directory, ",
    "R package has likely been moved to a temporary directory. ",
    "Checking if required files already exist in `src` from a previous `bootstrap.R` run."
  ))

  if (!all(file.exists(dest_header, dest_alloc, dest_array, dest_parser, dest_scanner))) {
    stop(paste0(
      "Can't find required tree-sitter files in `src/`, ",
      "and can't find the parent tree-sitter directory to copy from. ",
      "Do you need to run `bootstrap.R` before the package ",
      "is moved to the temporary directory?"
    ))
  }

  message(paste0(
    "Found required files in `src/`, ",
    "proceeding with no guarantees that they are up to date!"
  ))

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

# Run it!
sync()
