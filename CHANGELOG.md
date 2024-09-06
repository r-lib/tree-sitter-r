# Changelog

## devel

## 1.1.0

- Switched to using `tree-sitter-language` in the Rust bindings to remove a dependency on a specific `tree-sitter` crate version (#133).

- Fixed an issue where the `program` node didn't always start at `(0, 0)` (#134).

- To align better with the R grammar and to greatly simplify the possible states in the tree-sitter grammar, some fields are no longer optional (#132).
  - The `"body"` field of `function_definition`, `for_statement`, `while_statement`, and `repeat_statement`.
  - The `"close"` field of `braced_expression` and `parenthesized_expression`.

## 1.0.1

- Changed tree-sitter dependency from `0.22.6` to `>=0.21.0` to match other grammars and be less restrictive.

## 1.0.0

- This release incorporates a complete rewrite of the grammar which has been incubating on the `next` branch for the past two years. It contains many bug fixes and improvements. If you still need to use the previous version, you can pin to the `main-old` branch, which is the commit just before the `next` branch was merged in.

- Added a `CHANGELOG.md` to track changes.
