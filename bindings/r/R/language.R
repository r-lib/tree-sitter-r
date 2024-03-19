#' tree-sitter language for R
#'
#' `language()` returns a `tree_sitter_language` object for R for use with the
#' treesitter package.
#'
#' @returns A `tree_sitter_language` object.
#'
#' @export
#' @examples
#' language()
language <- function() {
  pointer <- .Call(ffi_language)
  new_language("r", pointer)
}

new_language <- function(name, pointer) {
  stopifnot(is.character(name), length(name) == 1L, !is.na(name))
  stopifnot(typeof(pointer) == "externalptr")

  out <- list(name = name, pointer = pointer)
  class(out) <- "tree_sitter_language"

  out
}
