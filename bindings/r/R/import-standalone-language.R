# Standalone file: do not edit by hand
# Source: <https://github.com/DavisVaughan/r-tree-sitter/blob/main/R/standalone-language.R>
# ----------------------------------------------------------------------
#
# ---
# repo: DavisVaughan/r-tree-sitter
# file: standalone-language.R
# last-updated: 2024-04-11
# license: https://unlicense.org
# ---
#
# ## Changelog
#
# nocov start

#' Construct a new tree-sitter language object
#'
#' @description
#' This function is a developer tool to wrap an external pointer to a
#' C level tree-sitter `const TSLanguage*`. It is not exported, but should
#' be copied into grammar specific R packages and called by them, providing
#' the language name and an external pointer to the result of their C level
#' `tree_sitter_{name}()` function.
#'
#' @param pointer `[external_pointer]`
#'
#'   An external pointer to a `const TSLanguage*`.
#'
#' @param name `[string]`
#'
#'   The name of the language being wrapped.
#'
#'   This will eventually be removed when tree-sitter supports extracting the
#'   language name from the `pointer`.
#'
#' @param ... Not used.
#'
#' @returns
#' A `tree_sitter_language` object.
#'
#' @noRd
new_language <- function(pointer, ..., name = NULL) {
  if (typeof(pointer) != "externalptr") {
    stop("`pointer` must be an external pointer.")
  }

  # TODO: Remove `name` argument if name is accessible in language object
  # https://github.com/tree-sitter/tree-sitter/pull/3184
  if (is.null(name)) {
    stop("`name` currently must be supplied.")
  }
  if (!is.character(name) || length(name) != 1L || is.na(name)) {
    stop("`name` must be a string.")
  }

  out <- list(pointer = pointer, name = name)
  class(out) <- "tree_sitter_language"

  out
}

# nocov end
