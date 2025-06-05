# Release process

## Version

Unlike some other tree-sitter grammars, the R grammar's release version is not tied to the tree-sitter version. Instead, we just use standard semantic versioning. We released 1.0.0 when we merged the longstanding `next` branch into `main`, and then we froze `main-old` for people to pin to if they are slow to update.

## Flow

-   Create an `rc/x-y-z` branch

-   Update all binding versions to the new version

-   Polish CHANGELOG

-   Update CHANGELOG's `## devel` to the new version, go ahead and add a new `## devel` header

-   Push and open a PR

-   Follow the release procedure for R, as it is manual

-   Merge the PR

    -   After merging, do NOT call `usethis::use_github_release()`. We are going to create our own git tag

-   Create an push a git tag for the version, i.e. `git push origin tag vX.Y.Z` where the leading `v` does matter

    -   This will kick off `publish.yaml` for the GitHub Release, the npm package release, and the Rust crate release

## R package

<https://cran.r-project.org/web/packages/treesitter.r/index.html>

Davis is the maintainer.

The {treesitter.r} package is relatively simple. It just provides `language()` as an external pointer into the C level tree-sitter-r grammar struct.

-   Decide if you also need to release [{treesitter}](https://github.com/DavisVaughan/r-tree-sitter).
-   Ensure you `devtools::load_all()` twice to ensure that `bootstrap.R` runs and pulls updated files into `src/` and updates any ABI changes.
-   Update `NEWS.md` to mention the update and point to the changelog.
-   Run `devtools::check()` to ensure tests are still passing.
-   Run `devtools::release()` to do a standard R package release if all looks good.
    -   Use the same version as the Rust crate and the npm package.

If in {treesitter} you have to deal with a bump in the minimal ABI supported by tree-sitter, then you'll definitely have to do a release of the {treesitter.r} package as well. There are tools in `abi.R` that will need to be updated with the ABI that tree-sitter-r's parser was generated with, but `bootstrap.R` will do this for you. The worst case would be if tree-sitter bumped their ABI version to X and also raised the *minimal* ABI version to X as well, due to some serious breaking change. If that happens, then you'll have to release both {treesitter} and {treesitter.r} as close together as possible, because {treesitter} will complain that it isn't compatible with the grammar from {treesitter.r}.

It's worth noting that {treesitter.r} does not actually Import {treesitter}, it just Suggests it. This is generally preferred in the tree-sitter ecosystem. {treesitter} just knows how to consume the external pointer that {treesitter.r} creates.

## Rust crate

<https://docs.rs/tree-sitter-r/latest/tree_sitter_r/>

Davis is the main owner of the crate, but Kevin also has publish rights.

-   Use `tree-sitter init --update` to update language specific files, in particular `Cargo.toml`, `bindings/rust/lib.rs` and `bindings/rust/build.rs`.

-   Note that tree-sitter-r only depends on `tree-sitter-language`, not the `tree-sitter` crate.

-   The `build.rs` script will compile in `parser.c` and `scanner.c` on a crate build. This gives `lib.rs` access to `fn tree_sitter_r() -> *const ()`, which then becomes the `LanguageFn` defined in `tree-sitter-language`.

-   Don't forget to update the version in `Cargo.toml` to the same version used in the R package.

-   `cargo publish --dry-run` will do a dry run before submitting

-   The `publish.yaml` CI will actually run `cargo publish` for you. It runs <https://github.com/tree-sitter/workflows/blob/main/.github/workflows/package-crates.yml>. Note that we have a `CARGO_REGISTRY_TOKEN` token that expires after 1 year and may need to be refreshed.

## Npm package

Davis is the maintainer of the package.

We use [nvm](https://github.com/nvm-sh/nvm) for npm version management. The npm version is specified in `.nvmrc`.

-   Use `tree-sitter init --update` to update language specific files, in particular `package.json`, `bindings/node/*`.

-   For the `peerDependencies` of `tree-sitter`, we typically use the same version that tree-sitter-rust's npm bindings use, if it seems like it makes sense.

-   To test the bindings in a basic way

    ```
    # To respect .nvmrc
    nvm use
    npm install
    # If tree-sitter doesn't get installed
    # npm install tree-sitter --save-dev
    npm test
    ```

-   If you need to reset the node package cache, delete `node_modules/`

-   `npm publish --dry-run` will do a dry run

-   The `publish.yaml` CI will actually run `npm publish` for you. It runs <https://github.com/tree-sitter/workflows/blob/main/.github/workflows/package-npm.yml>. Note that we have a `NODE_AUTH_TOKEN` token that expires after 1 year and may need to be refreshed.

    -   Note that this builds the WASM binary along with "prebuilds" for each platform, so it does more than just `npm publish`.

We publish as an [unscoped public package](https://docs.npmjs.com/creating-and-publishing-unscoped-public-packages) because that seems to be what other tree-sitter grammars do as well.
