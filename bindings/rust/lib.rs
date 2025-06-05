//! This crate provides R language support for the [tree-sitter] parsing library.
//!
//! Typically, you will use the [`LANGUAGE`] constant to add this language to a
//! tree-sitter [`Parser`], and then use the parser to parse some code:
//!
//! ```
//! let code = r#"
//! "#;
//! let mut parser = tree_sitter::Parser::new();
//! let language = tree_sitter_r::LANGUAGE;
//! parser
//!     .set_language(&language.into())
//!     .expect("Error loading R parser");
//! let tree = parser.parse(code, None).unwrap();
//! assert!(!tree.root_node().has_error());
//! ```
//!
//! [`Parser`]: https://docs.rs/tree-sitter/*/tree_sitter/struct.Parser.html
//! [tree-sitter]: https://tree-sitter.github.io/

use tree_sitter_language::LanguageFn;

extern "C" {
    fn tree_sitter_r() -> *const ();
}

/// The tree-sitter [`LanguageFn`] for this grammar.
pub const LANGUAGE: LanguageFn = unsafe { LanguageFn::from_raw(tree_sitter_r) };

/// The content of the [`node-types.json`] file for this grammar.
///
/// [`node-types.json`]: https://tree-sitter.github.io/tree-sitter/using-parsers#static-node-types
pub const NODE_TYPES: &str = include_str!("../../src/node-types.json");

pub const HIGHLIGHTS_QUERY: &str = include_str!("../../queries/highlights.scm");
// pub const INJECTIONS_QUERY: &str = include_str!("../../queries/injections.scm");
pub const LOCALS_QUERY: &str = include_str!("../../queries/locals.scm");
pub const TAGS_QUERY: &str = include_str!("../../queries/tags.scm");

#[cfg(test)]
mod tests {
    #[test]
    fn test_can_load_grammar() {
        let mut parser = tree_sitter::Parser::new();
        parser
            .set_language(&super::LANGUAGE.into())
            .expect("Error loading R parser");
    }

    // See https://github.com/tree-sitter/tree-sitter/issues/2767
    #[test]
    fn test_tree_cursor() {
        let mut parser = tree_sitter::Parser::new();
        parser.set_language(&super::LANGUAGE.into()).unwrap();

        // This is an `identifier`
        let text = "foo";

        let tree = parser.parse(text, None).unwrap();

        let mut cursor = tree.walk();
        assert_eq!(cursor.node().kind(), "program");

        // program -> identifier
        assert!(cursor.goto_first_child());
        assert_eq!(cursor.node().kind(), "identifier");
        assert_eq!(cursor.node().utf8_text(text.as_bytes()).unwrap(), "foo");

        assert!(!cursor.goto_first_child());
        assert_eq!(cursor.node().kind(), "identifier");
        assert_eq!(cursor.node().utf8_text(text.as_bytes()).unwrap(), "foo");

        assert!(!cursor.goto_last_child());
        assert_eq!(cursor.node().kind(), "identifier");
        assert_eq!(cursor.node().utf8_text(text.as_bytes()).unwrap(), "foo");
    }
}
