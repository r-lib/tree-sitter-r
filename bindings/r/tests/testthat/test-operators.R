test_that("relational", {
  text <- r"(
a == b
a > b
a < b
a >= b
a <= b
a != b

a ==
  b
  )"

  node <- parse(text)

  expect_node_snapshot(node)
})

test_that("arithmetic", {
  text <- r"(
a + b
a - b
a * b
a / b
a ^ b
a ** b

a +
  b

a *
  b
  )"

  node <- parse(text)

  expect_node_snapshot(node)
})

test_that("unary", {
  text <- r"(
!a
+a
-a
foo(!a, +b)
foo(-a, bar)

!
  a
-  b
  )"

  node <- parse(text)

  expect_node_snapshot(node)
})

test_that("precedence", {
  text <- r"(
2+a*2
2+a+2
!a + !b
a <= 2 && 2 >= d
a[1] <- foo || bar
a && b(c) && d
val <- foo %>% bar(1) %>% baz()
  )"

  node <- parse(text)

  expect_node_snapshot(node)
})

test_that("specials", {
  # Not specials, but hard to test errors `%\%`, `%%%`
  text <- r"(
x %% y
x %/% y
x %+% y
x %>% y
x %>% 2 %>% z
x %some text% y
x %//% y
  )"

  node <- parse(text)

  expect_node_snapshot(node)
})

test_that("not specials", {
  text <- r"(
x %\% y
  )"
  node <- parse(text)
  expect_node_snapshot(node)

  text <- r"(
x %%% y
  )"
  node <- parse(text)
  expect_node_snapshot(node)
})

test_that("pipe", {
  text <- r"(
x |> print()

x |> foo() %>% bar() |> baz()

x |> foo() |> bar() + baz()

x |> {function(x) x}()
  )"

  node <- parse(text)

  expect_node_snapshot(node)
})

test_that("pipe placeholder", {
  text <- r"(
foo |> bar(x, y = _)
foo |> bar() |> baz(data = _)
  )"

  node <- parse(text)

  expect_node_snapshot(node)
})

test_that("assignment", {
  text <- r"(
x <- 1
x = 1
x := 1
x <<- 1
1 ->> x
1 -> x
x <- y(1)
y(1) -> x
  )"

  node <- parse(text)

  expect_node_snapshot(node)
})

test_that("colon", {
  text <- r"(
1:2
(1 + 1):-5
  )"

  node <- parse(text)

  expect_node_snapshot(node)
})

test_that("formulas", {
  text <- r"(
~x
y~x
  )"

  node <- parse(text)

  expect_node_snapshot(node)
})

test_that("help", {
  text <- r"(
a ? b
a ? b <- 1
?a
  )"

  node <- parse(text)

  expect_node_snapshot(node)
})
