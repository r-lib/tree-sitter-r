test_that("identifiers", {
  # TODO: `_foo` is recognized as  `_` and `foo` identifiers. Should it be this way?

  text <- r"(
foo
foo2
foo.bar
.foo.bar
.__NAMESPACE__.
foo_bar
`a "literal"`
`another
literal \` foo`
`backslash followed by newline \
`
`\``
_foo
  )"

  node <- parse(text)

  expect_snapshot({
    treesitter::node_children(node)
  })
})

test_that("unicode identifiers", {
  text <- r"(
你好
.你.好.
.你_好.
  )"

  node <- parse(text)

  expect_snapshot(node)
})

test_that("strings", {
  text <- r"(
"foo"
"foo\"bar"
"foo\ "
"foo\
"
"\""
'foo'
'foo\'bar'
'foo\ '
'foo\
'
'\''
"#"
'#'
  )"

  node <- parse(text)

  expect_snapshot(treesitter::node_children(node))
})

test_that("unclosed double quote", {
  text <- r"(
"\"
  )"

  node <- parse(text)

  expect_snapshot(node)
})

test_that("unclosed single quote", {
  text <- r"(
'\'
  )"

  node <- parse(text)

  expect_snapshot(node)
})

test_that("unclosed backtick", {
  text <- r"(
`\`
  )"

  node <- parse(text)

  expect_snapshot(node)
})

test_that("raw strings", {
  text <- r"-(
r"(raw string)"
R"{another raw string}"
R"--[yet another ]- raw string]--"
r()
  )-"

  node <- parse(text)

  expect_snapshot(treesitter::node_children(node))
})

test_that("comments", {
  text <- r"(
# a comment'

'# not a comment'


'
# still not a comment'
  )"

  node <- parse(text)

  expect_snapshot(node)
})

test_that("constants", {
  text <- r"(
TRUE
FALSE
NULL
Inf
NaN
NA
NA_real_
NA_character_
NA_complex_
  )"

  node <- parse(text)

  expect_snapshot(node)
})

test_that("integers", {
  text <- r"(
12332L
0L
12L
0xDEADL
  )"

  node <- parse(text)

  expect_snapshot(node)
})

test_that("floats", {
  text <- r"(
.66
.11
123.4123
.1234
0xDEAD
x <- -.66
  )"

  node <- parse(text)

  expect_snapshot(treesitter::node_children(node))
})

test_that("scientific notation floats", {
  text <- r"(
1e322
1e-3
1e+3
1.8e10
1.e10
1e10
  )"

  node <- parse(text)

  expect_snapshot(node)
})
