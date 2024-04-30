skip_if(
  identical(tolower(Sys.info()[["sysname"]]), "windows") &&
    getRversion() < "4.2.0", 
  "Windows R <4.1 lacks native UTF-8 support."
)

test_that_tree_sitter("references/unicode.R")
