#define R_NO_REMAP
#include <R.h>
#include <Rinternals.h>

#include "tree_sitter/parser.h"

// `parser.c`
extern const TSLanguage* tree_sitter_r(void);

SEXP ffi_language(void) {
  static SEXP language = NULL;

  if (language == NULL) {
    const TSLanguage* pointer = tree_sitter_r();
    language = R_MakeExternalPtr((void*) pointer, R_NilValue, R_NilValue);
    R_PreserveObject(language);
  }

  return language;
}
