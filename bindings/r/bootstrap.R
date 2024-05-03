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

# Run it!
sync(upstream_directory, upstream, destination)
