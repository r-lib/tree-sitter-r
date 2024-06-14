#' tree-sitter ABI version
#'
#' `abi()` returns the ABI version that `parser.c` was generated with. This is
#' used to verify that the grammar is compatible with the tree-sitter C library
#' embedded within the treesitter package.
#'
#' @returns A single integer.
#'
#' @export
#' @examples
#' abi()
abi <- function() {
  14L
}
