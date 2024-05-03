package tree_sitter_r_test

import (
	"testing"

	tree_sitter "github.com/smacker/go-tree-sitter"
	"github.com/tree-sitter/tree-sitter-r"
)

func TestCanLoadGrammar(t *testing.T) {
	language := tree_sitter.NewLanguage(tree_sitter_r.Language())
	if language == nil {
		t.Errorf("Error loading R grammar")
	}
}
