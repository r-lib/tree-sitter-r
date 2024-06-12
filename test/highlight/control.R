for (i in 1:5) {
# ^ repeat
#      ^ keyword
  return()
  # ^ @keyword

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
