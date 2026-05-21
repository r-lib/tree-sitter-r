# Run `nvm use` followed by `npm install` first to install tree-sitter-cli from
# the `package.json` `devDependencies` section into `node_modules/`. Required
# for most of these commands. Requires nvm, and uses the node version in
# `.nvmrc`.

# Run the tests
test *ARGS:
  ./node_modules/tree-sitter-cli/tree-sitter test {{ARGS}}

# Regenerate `parser.c`, `grammar.json`, and `node-types.json`
generate:
  ./node_modules/tree-sitter-cli/tree-sitter generate

# Run an arbitrary tree-sitter command using our pinned version
tree-sitter *ARGS:
  ./node_modules/tree-sitter-cli/tree-sitter {{ARGS}}
