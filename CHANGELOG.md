# Changelog

## devel

- Fixed an issue where the `program` node didn't always start at `(0, 0)` (#125).

## 1.0.1

- Changed tree-sitter dependency from `0.22.6` to `>=0.21.0` to match other grammars and be less restrictive.

## 1.0.0

- This release incorporates a complete rewrite of the grammar which has been incubating on the `next` branch for the past two years. It contains many bug fixes and improvements. If you still need to use the previous version, you can pin to the `main-old` branch, which is the commit just before the `next` branch was merged in.

- Added a `CHANGELOG.md` to track changes.
