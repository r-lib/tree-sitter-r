for (i in 1:5) {
# ^ repeat
#      ^ keyword
  next
  # ^ @keyword

  break
  # ^ @keyword
}

while (a > b) {
# ^ repeat
}

repeat {
# ^ repeat
}

if (a > b) {
# <- conditional
} else if (b > c) {
# ^ conditional
#      ^ conditional
} else {
# ^ conditional
}

function(return = 1) {
         # ^ @variable.parameter
}

function() {
  return()
  # ^ @keyword
}

function() {
  return
  # ^ @variable
}