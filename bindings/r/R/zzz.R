# nocov start

.onLoad <- function(libname, pkgname) {
  if (Sys.getenv("DEVTOOLS_LOAD") == "treesitter.r") {
    # Support syncing with `load_all()`
    path <- file.path(".", "bootstrap.R")
    path <- normalizePath(path, mustWork = TRUE)
    source(path)

    # Ensure ABI version is up to date.
    # Tests will fail if the ABI version has changed,
    # requiring explicit acknowledgment of the update.
    path <- file.path(".", "tools", "abi-update.R")
    path <- normalizePath(path, mustWork = TRUE)
    source(path)
  }
}

# nocov end
