# treesitter.r

treesitter.r exposes the R tree-sitter grammar for use with the language
agnostic [treesitter](https://github.com/DavisVaughan/r-tree-sitter)
package. To use it, provide
[`treesitter.r::language()`](reference/language.md) as an argument to
[`treesitter::parser()`](https://davisvaughan.github.io/r-tree-sitter/reference/parser.html).

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
