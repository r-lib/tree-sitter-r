test_that("subset", {
  text <- r"(
foo[bar]
foo[1, 2]
foo[1, ]
foo[1,, ]
foo[1,,2]
foo[x=1,,y=3,4]
foo[]
  )"

  node <- parse(text)

  expect_snapshot(node_children_print(node))
})

test_that("subset2", {
  text <- r"(
foo[[x]]
foo[[x, y]]
foo[[x,]]
foo[[x,,]]
foo[[x,,y]]
foo[[]]
  )"

  node <- parse(text)

  expect_snapshot(node_children_print(node))
})

test_that("subset and subset2 precedence", {
  text <- r"(
a[[b[1]]]
a[b[[1]]]
  )"

  node <- parse(text)

  expect_snapshot(node_children_print(node))
})

test_that("switch", {
  text <- r"(
switch(foo,
  x = 1,
  "y" = 2,
  z = ,
  3
)
  )"

  node <- parse(text)

  expect_snapshot(node_children_print(node))
})

test_that("calls", {
  text <- r"(
f()
f(x)
f(1+1)
f(1 ~ 1)
f(x, )
f(x,,y)
f(x, y)
f(x, y = 2)
f(x = 1 + 1)
f(x, y =)
f(f2(x, y))
f(,)
f(x,)
f(,y)
f(x=,)
f("x"=,)
f(... = ,)
f(,y=)
  )"

  node <- parse(text)

  expect_snapshot(node_children_print(node))
})

test_that("braces", {
  text <- r"(
{}

{1}

{1; 2}

{1;
2}

{1
2
}

{
1
2
}
  )"

  node <- parse(text)

  expect_snapshot(node_children_print(node))
})
