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
  new_language(pointer, name = "r")
}
