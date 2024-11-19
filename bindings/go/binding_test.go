package tree_sitter_r_test

import (
	"testing"

	tree_sitter "github.com/tree-sitter/go-tree-sitter"
	tree_sitter_r "github.com/r-lib/tree-sitter-r/bindings/go"
)

func TestCanLoadGrammar(t *testing.T) {
	language := tree_sitter.NewLanguage(tree_sitter_r.Language())
	if language == nil {
		t.Errorf("Error loading R grammar")
	}
}
