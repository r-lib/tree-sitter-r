test_that("if", {
  text <- r"(
if (x)
  log(y)

if (a.b) {
  log(c)
  d
}
  )"

  node <- parse(text)

  expect_node_snapshot(node)
})

test_that("if else", {
  text <- r"(
if (x)
  y else if (a)
  b

if (x)
  y else if (a)
  b else d

if (a) {
  c
  d
} else {
  e
}
  )"

  node <- parse(text)

  expect_node_snapshot(node)
})

test_that("complex if statements", {
  # Invalid at top level due to newline before `else`, so not a real if statement
  text <- r"(
if (TRUE) {
  1
}
else {
  2
}
  )"
  node <- parse(text)
  expect_node_snapshot(node)

  # Invalid for same reason as above
  text <- r"(
if (TRUE)
  1
else
  2
  )"
  node <- parse(text)
  expect_node_snapshot(node)

  # Valid inside `{` only due to special `else` handling with newlines
  text <- r"(
{
  if (TRUE) {
    1
  }
  else {
    2
  }
}
  )"
  node <- parse(text)
  expect_node_snapshot(node)

  # Valid with comments in special newline territory
  text <- r"(
{
  if (TRUE) {
    1
  }
  # hi there

  # another one!

  else {
    2
  }
}
  )"
  node <- parse(text)
  expect_node_snapshot(node)
})

test_that("for", {
  text <- r"(
for (x in y)
  f

for (x in 5:6) {
  for (y in ys) {
    z
  }
}

for (x in y) for (y in z) x + y
  )"

  node <- parse(text)

  expect_node_snapshot(node)
})

test_that("for no body", {
  text <- r"(
for (i in 1:5)
  )"

  node <- parse(text)

  expect_node_snapshot(node)
})

test_that("while", {
  text <- r"(
while(TRUE)
  bar

while(x > 0)
  x <- x - 1

while(TRUE)
  break

while(TRUE)
  next
  )"

  node <- parse(text)

  expect_node_snapshot(node)
})

test_that("while no body", {
  text <- r"(
while (a < b)
  )"

  node <- parse(text)

  expect_node_snapshot(node)
})

test_that("repeat", {
  text <- r"(
repeat 1
  )"

  node <- parse(text)

  expect_node_snapshot(node)
})

test_that("repeat no body", {
  text <- r"(
repeat
  )"

  node <- parse(text)

  expect_node_snapshot(node)
})
