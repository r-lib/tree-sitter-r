# nocov start

.onLoad <- function(libname, pkgname) {
  if (Sys.getenv("DEVTOOLS_LOAD") == "treesitter.r") {
    update()
  }
}

# nocov end
