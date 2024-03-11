#include <R_ext/Rdynload.h>
#include <Rinternals.h>
#include <stdbool.h>
#include <stdlib.h>  // for NULL

extern SEXP ffi_language(void);

static const R_CallMethodDef CallEntries[] = {
    {"ffi_language", (DL_FUNC) &ffi_language, 0},
    {NULL, NULL, 0}};

void R_init_treesitterr(DllInfo* dll) {
  R_registerRoutines(dll, NULL, CallEntries, NULL, NULL);
  R_useDynamicSymbols(dll, FALSE);
}
