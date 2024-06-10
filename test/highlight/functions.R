foo <- function() {}
# ^ function
#      ^ keyword.function

foo = function(a, b = 2, d) {
# ^ function
#      ^ keyword.function
#              ^ variable.parameter
#                 ^ variable.parameter
#                        ^ variable.parameter
  a + x + d
# ^ variable.parameter
#     ^ variable
#         ^ variable.parameter
}

# Note: We align the capture name of function declarations and function calls
# so they can have the same highlight color
foo(a, b, d = 2)
# ^ function
#   ^ variable
#      ^ variable
#         ^ variable.parameter

\(x) x + y
# <- operator
# ^ variable.parameter
#    ^ variable.parameter
#        ^ variable
