match(a, b)
# ^ reference.call

fn <- function() {
  foo() 
  # ^ reference.call

  bar() + baz()
  # ^ reference.call
  #        ^ reference.call
}
