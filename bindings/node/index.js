const root = require("path").join(__dirname, "..", "..");

module.exports =
  typeof process.versions.bun === "string"
    // Support `bun build --compile` by being statically analyzable enough to find the .node file at build-time
    // The file name comes from `name` in package.json, with `/` replaced by `+`.
    ? require(`../../prebuilds/${process.platform}-${process.arch}/@davisvaughan+tree-sitter-r.node`)
    : require("node-gyp-build")(root);

try {
  module.exports.nodeTypeInfo = require("../../src/node-types.json");
} catch (_) {}
