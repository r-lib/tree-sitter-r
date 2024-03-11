#' tree-sitter language for R
#'
#' `language()` returns an external pointer to the tree-sitter language
#' object for R.
#'
#' @returns An external pointer.
#'
#' @export
#' @examples
#' language()
language <- function() {
  # TODO: Possibly export wrapper from tree-sitter R bindings package for
  # `new_language()` that all grammar binding packages could use?
  out <- .Call(ffi_language)
  class(out) <- c("tree_sitter_r_language", "tree_sitter_language")
  out
}
