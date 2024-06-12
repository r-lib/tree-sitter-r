match(a, b)
# ^ reference.call

fn <- function() {
  foo() 
  # ^ reference.call

  bar() + baz()
  # ^ reference.call
  #        ^ reference.call
}

pkg::exported(mtcars, x = 1)
#      ^ reference.call

pkg:::internal(mtcars, x = 1)
#      ^ reference.call
