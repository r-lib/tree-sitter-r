# nocov start

.onLoad <- function(libname, pkgname) {
  if (Sys.getenv("DEVTOOLS_LOAD") == "treesitter.r") {
    # Support syncing with `load_all()`
    path <- file.path(".", "bootstrap.R")
    path <- normalizePath(path, mustWork = TRUE)
    source(path)
  }
}

# nocov end
