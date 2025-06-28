
<!-- README.md is generated from README.Rmd. Please edit that file -->

# treesitter.r

hi

<!-- badges: start -->

[![R-CMD-check](https://github.com/r-lib/tree-sitter-r/actions/workflows/R-CMD-check.yaml/badge.svg)](https://github.com/r-lib/tree-sitter-r/actions/workflows/R-CMD-check.yaml)
<!-- badges: end -->

treesitter.r exposes the R tree-sitter grammar for use with the language
agnostic [treesitter](https://github.com/DavisVaughan/r-tree-sitter)
package. To use it, provide `treesitter.r::language()` as an argument to
`treesitter::parser()`.

## Installation

Install treesitter.r from CRAN with:

``` r
install.packages("treesitter.r")
```

You can install the development version of treesitter.r from
[GitHub](https://github.com/) with:

``` r
# install.packages("pak")
pak::pak("r-lib/tree-sitter-r/bindings/r")
```
