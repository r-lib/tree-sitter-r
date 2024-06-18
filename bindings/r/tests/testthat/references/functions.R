# ------------------------------------------------------------------------------
# functions

function() 1
function() {}
function(arg1, arg2) {
  arg2
}

function(x, y) return(y)

function(x, ...) f(...)

function(arg1, arg2 = 2) {}

function(x,
         y,
         z = 3) {

}

function()


  1

function() function() {}

function(x = function() {}) {}

# With no intermediate `{` scope
function() for(i in 1:5) i

# ------------------------------------------------------------------------------
# function no body

function(x, y)

# ------------------------------------------------------------------------------
# function no body with assignment

x <- function(x, y)

# ------------------------------------------------------------------------------
# function no body inside another function

function(x = function()) {}

# ------------------------------------------------------------------------------
# lambda function

a <- \(arg) arg
b <- \(arg1, arg2) paste0(arg1, arg2)
c <- \(fun, ...) fun(...)
1:3 |> {\(x, y = 1) x + y}() |> {\(x) sum(x)}()
{\(a = 1) a + 1}()
\() 1 + 2
\()

  1 + 2
