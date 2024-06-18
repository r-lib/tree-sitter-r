#!/usr/bin/env Rscript

# Update this list if more tree-sitter files are required
files <- c(
  file.path("tree_sitter", "alloc.h"),
  file.path("tree_sitter", "array.h"),
  file.path("tree_sitter", "parser.h"),
  "parser.c",
  "scanner.c"
)

upstream_directory <- file.path("..", "..", "src")

upstream <- file.path(upstream_directory, files)
destination <- file.path("src", files)

# Assumes that you have forked this repo in its entirety, but your
# current working directory is `bindings/r/`.
sync <- function(upstream_directory, upstream, destination) {
  upstream_directory <- normalizePath(upstream_directory, mustWork = FALSE)

  if (dir.exists(upstream_directory)) {
    # Typical case in CI checks, `devtools::install_github()`, `pak::pak()`
    # where the full git repo directory is in place
    sync_with_upstream(upstream, destination)
  } else {
    # `pak::pak("local::.")`, and in particular pkgdown CI which uses
    # `local::.`, where pkgdepends copies only the package directory to a
    # temp directory. In this case, `bootstrap.R` must have already been run.
    sync_without_upstream(destination)
  }

  invisible()
}

sync_with_upstream <- function(upstream, destination) {
  any_updated <- FALSE

  for (i in seq_along(upstream)) {
    updated <- sync_with_upstream_one(upstream[[i]], destination[[i]])
    any_updated <- any_updated || updated
  }

  if (any_updated) {
    message("If using `load_all()`, call it again to recompile with updated source files.")
  } else {
    message("All parent tree-sitter files were up to date.")
  }
}

sync_with_upstream_one <- function(upstream, destination) {
  shortname <- destination
  is_parser_c <- identical(shortname, file.path("src", "parser.c"))

  upstream <- normalizePath(upstream, mustWork = TRUE)
  destination <- normalizePath(destination, mustWork = FALSE)

  dir_destination <- dirname(destination)
  if (!dir.exists(dir_destination)) {
    message(sprintf("Creating `%s` directory.", dir_destination))
    dir.create(dir_destination, recursive = TRUE)
  }

  update <- needs_update(upstream, destination)

  if (update) {
    message(sprintf("`%s` is out of date, updating.", shortname))
    file.copy(upstream, destination, overwrite = TRUE)
    patch_pragmas(destination)
  }

  if (is_parser_c) {
    # In the case of `parser.c`, we want to sync up the ABI version with `abi.R` when
    # developing interactively, but in CI checks and with `pak::pak()` or
    # `devtools::install_github()`, we just want to check that the ABIs are aligned.
    if (in_load_all()) {
      update_abi()
    } else {
      check_abi()
    }
  }

  update
}

sync_without_upstream <- function(destination) {
  message(paste0(
    "Can't find parent tree-sitter directory, ",
    "R package has likely been moved to a temporary directory. ",
    "Checking if required files already exist from a previous `bootstrap.R` run."
  ))

  if (!all(file.exists(destination))) {
    stop(paste0(
      "Can't find required tree-sitter files, ",
      "and can't find the parent tree-sitter directory to copy from. ",
      "Do you need to run `bootstrap.R` before the package ",
      "is moved to the temporary directory?"
    ))
  }

  # When we don't have the parent directory, just check that the preexisting
  # `R/abi.R` and `src/parser.c` ABIs are in sync.
  check_abi()

  message(paste0(
    "Found required files, ",
    "proceeding with no guarantees that they are up to date!"
  ))

  invisible()
}

needs_update <- function(upstream, destination) {
  if (!file.exists(destination)) {
    # First time ever
    return(TRUE)
  }

  upstream_modified <- file.info(upstream)$mtime
  destination_modified <- file.info(destination)$mtime

  isTRUE(upstream_modified > destination_modified)
}

# For CRAN
patch_pragmas <- function(path) {
  lines <- readLines(path)
  lines <- gsub("#pragma", "# pragma", lines)
  writeLines(lines, path)
}

parser_c_path <- function() {
  path <- file.path(".", "src", "parser.c")
  normalizePath(path, mustWork = TRUE)
}

abi_r_path <- function() {
  path <- file.path(".", "R", "abi.R")
  normalizePath(path, mustWork = FALSE)
}

check_abi <- function() {
  path <- parser_c_path()
  version <- get_c_abi(path)

  path <- abi_r_path()

  if (!file.exists(path)) {
    stop("Can't find `R/abi.R` file. Do you need to run `bootstrap.R` locally first?")
  }

  r_version <- get_r_abi(path)

  if (identical(version, r_version)) {
    # Synced up
    return(invisible(NULL))
  }

  stop(paste(
    sep = "\n",
    "`R/abi.R` and `src/parser.c` are out of sync. ",
    sprintf("`R/abi.R` reports the ABI version as %s.", r_version),
    sprintf("`src/parser.c` reports the ABI version as %s.", version)
  ))
}

update_abi <- function() {
  path <- parser_c_path()
  version <- get_c_abi(path)

  path <- abi_r_path()

  if (file.exists(path)) {
    r_version <- get_r_abi(path)

    if (identical(version, r_version)) {
      # Already synced up
      return(invisible(NULL))
    }

    # ABI has updated
    message(sprintf(
      "Existing ABI version is %s, new ABI version is %s, updating.",
      r_version,
      version
    ))
  } else {
    message(sprintf(
      "`abi.R` doesn't exist yet, creating it now with ABI version %s. Make sure to run `devtools::document()`.",
      version
    ))
  }

  write_abi(version)
}

write_abi <- function(version) {
  path <- file.path("tools", "abi.R")
  path <- normalizePath(path, mustWork = TRUE)

  destination <- file.path("R", "abi.R")
  destination <- normalizePath(destination, mustWork = FALSE)

  lines <- readLines(path)
  lines <- gsub("LANGUAGE_VERSION", version, lines, fixed = TRUE)
  writeLines(lines, destination)

  invisible(NULL)
}

get_r_abi <- function(path) {
  lines <- readLines(path)

  pattern <- "ABI: (\\d+)"
  line <- grep(pattern, lines, value = TRUE)

  if (length(line) != 1L) {
    stop("Can't find `ABI:` line in `abi.R`.")
  }

  version <- get_one_capture(line, pattern)
  version <- as.integer(version)

  if (is.na(version)) {
    stop("Can't parse ABI version from `abi.R`.")
  }

  version
}

get_c_abi <- function(path) {
  # It's a big file!
  lines <- readLines(path, n = 50L)

  pattern <- "^#define LANGUAGE_VERSION (\\d+)$"
  line <- grep(pattern, lines, value = TRUE)

  if (length(line) != 1L) {
    stop("Can't find `LANGUAGE_VERSION` line in `parser.c`.")
  }

  version <- get_one_capture(line, pattern)
  version <- as.integer(version)

  if (is.na(version)) {
    stop("Can't parse `LANGUAGE_VERSION` from `parser.c`.")
  }

  version
}

get_one_capture <- function(line, pattern) {
  # Find positions of matches
  positions <- regexec(pattern, line)

  # Extract out match content. We only have 1 line, so `[[1L]]`.
  match <- regmatches(line, positions)[[1L]]

  # Matches are in the form of:
  # - Element 1 is the whole match
  # - Element 2 is the first capture group, which is what we care about
  capture <- match[[2L]]

  if (length(capture) != 1L || !is.character(capture)) {
    stop("Failed to extract exactly one capture group.")
  }

  capture
}

in_load_all <- function() {
  Sys.getenv("DEVTOOLS_LOAD") == "treesitter.r"
}

# Run it!
sync(upstream_directory, upstream, destination)
