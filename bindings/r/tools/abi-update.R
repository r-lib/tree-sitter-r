# Utility for updating the contents of the `abi()` function in the package.
# Pulls `#define LANGUAGE_VERSION <version>` from `parser.c`.
# Meant to be run on load during development through `devtools::load_all()`.
# If the ABI changes, a test will fail, forcing you to be aware of the change.

get_abi <- function() {
  path <- file.path("src", "parser.c")
  path <- normalizePath(path, mustWork = TRUE)

  # It's a big file!
  lines <- readLines(path, n = 50L)

  pattern <- "^#define LANGUAGE_VERSION (\\d+)$"
  line <- grep(pattern, lines, value = TRUE)

  if (length(line) != 1L) {
    stop("Can't find `LANGUAGE_VERSION` line in `parser.c`.")
  }

  # Find positions of matches
  positions <- regexec(pattern, line)

  # Extract out match content. We only have 1 line, so `[[1L]]`.
  match <- regmatches(line, positions)[[1L]]

  # Matches are in the form of:
  # - Element 1 is the whole match
  # - Element 2 is the first capture group, which is what we care about
  version <- match[[2L]]
  version <- as.integer(version)

  if (is.na(version)) {
    stop("Can't parse `LANGUAGE_VERSION` from `parser.c`.")
  }

  version
}

write_abi <- function(version) {
  path <- file.path("tools", "abi-template.R")
  path <- normalizePath(path, mustWork = TRUE)

  destination <- file.path("R", "abi.R")
  destination <- normalizePath(destination, mustWork = FALSE)

  message(sprintf("`parser.c` generated with ABI version %s.", version))

  version <- sprintf("%sL", as.character(version))

  lines <- readLines(path)
  lines <- sub("LANGUAGE_VERSION", version, lines, fixed = TRUE)
  writeLines(lines, destination)

  invisible(NULL)
}

run <- function() {
  version <- get_abi()
  write_abi(version)
}

run()
