test_that("describe(it()) with 2 it()s can be matched", {
  # first example for testthat::describe()
  code_source <- '
describe("matrix()", {
  it("can be multiplied by a scalar", {
    m1 <- matrix(1:4, 2, 2)
    m2 <- m1 * 2
    expect_equal(matrix(1:4 * 2, 2, 2), m2)
  })
  it("can have not yet tested specs")
})
  '
  matches <- get_matches(code_source, read_fixture("describe.scm"))

  # there are 2 it() calls
  expect_length(matches, 2)

  it_one <- matches[[1]]
  expect_describe_it_captures(
    "\"matrix()\"",
    "\"can be multiplied by a scalar\"",
    it_one
  )
  expect_top_level(
    it_one[["node"]][[which(it_one$name == "parent_call")]]
  )

  it_two <- matches[[2]]
  expect_describe_it_captures(
    "\"matrix()\"",
    "\"can have not yet tested specs\"",
    it_two
  )
  expect_top_level(
    it_two[["node"]][[which(it_two$name == "parent_call")]]
  )
})

test_that("nested describe() can be matched", {
  # second example for testthat::describe()
  code_source <- '
describe("math library", {
  describe("addition()", {
    it("can add two numbers", {
      expect_equal(1 + 1, addition(1, 1))
    })
  })
  describe("division()", {
    it("can divide two numbers", {
      expect_equal(10 / 2, division(10, 2))
    })
    it("can handle division by 0") #not yet implemented
  })
})
  '
  matches <- get_matches(code_source, read_fixture("describe.scm"))

  # there are 3 it() calls
  expect_length(matches, 3)

  expect_describe_it_captures(
    "\"addition()\"",
    "\"can add two numbers\"",
    matches[[1]]
  )

  expect_describe_it_captures(
    "\"division()\"",
    "\"can divide two numbers\"",
    matches[[2]]
  )

  expect_describe_it_captures(
    "\"division()\"",
    "\"can handle division by 0\"",
    matches[[3]]
  )
})
