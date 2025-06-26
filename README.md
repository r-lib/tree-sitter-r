# tree-sitter-r

An R grammar for [tree-sitter](https://github.com/tree-sitter/tree-sitter).

## R package

This grammar is available as an [R package](https://cran.r-project.org/web/packages/treesitter.r/index.html).

You'll also want the [R package providing bindings to tree-sitter](https://davisvaughan.github.io/r-tree-sitter/) itself.

## Rust bindings

This grammar is available as a [Rust crate on crates.io](https://crates.io/crates/tree-sitter-r).

## Node bindings

This grammar is available as an [npm package](https://www.npmjs.com/package/@davisvaughan/tree-sitter-r).

Note that it is currently listed as a scoped package under the name `@davisvaughan/tree-sitter-r`.
We are working with the npm team to gain ownership of the `tree-sitter-r` package.
Once that happens, we will move the npm package there instead.

## References

- [The R Draft Spec](https://cran.r-project.org/doc/manuals/r-release/R-lang.pdf)
- [gram.y](https://github.com/wch/r-source/blob/trunk/src/main/gram.y)

## Known deviations

This section describes known deviations from the R grammar.

### `]]` as a literal token

The following is valid R syntax, note how `]]` has been split over multiple lines.

```r
x[["a"]
]
```

This applies to `]]`, but not to `[[`, for example, this is not valid R syntax:

```r
x[
["a"]]
```

The technical reason for this is that [in the grammar](https://github.com/wch/r-source/blob/988774e05497bcf2cfac47bfbec59d551432e3fb/src/main/gram.y#L508) R treats `[[` as a single token, but `]]` is treated as two individual `]` tokens.
Treating `]]` as two individual `]` tokens allows whitespace, newlines, and even comments to appear between the two `]` tokens:

```r
x[["a"] # comment
]
```

While we'd like to precisely support the R grammar, it is also extremely useful to treat all of `(`, `)`, `[`, `]`, `[[`, and `]]` as literal tokens when using the tree-sitter grammar.
This allows you to treat call, subset, and subset2 nodes in the same way, since they all have exactly the same node structure.

Because treating `]]` as a literal token is so useful, and because we've never seen any R code "in the wild" written this way, this grammar does not allow whitespace, newlines, or comments between the two `]` tokens.
