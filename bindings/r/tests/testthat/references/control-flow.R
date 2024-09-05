# ------------------------------------------------------------------------------
# if

if (x)
  log(y)

if (a.b) {
  log(c)
  d
}

# ------------------------------------------------------------------------------
# if else

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

# ------------------------------------------------------------------------------
# complex if statements

# Invalid at top level due to newline before `else`, so not a real if statement
if (TRUE) {
  1
}
else {
  2
}

# Invalid for same reason as above
if (TRUE)
  1
else
  2

# Valid inside `{` only due to special `else` handling with newlines
{
  if (TRUE) {
    1
  }
  else {
    2
  }
}

# Valid with comments in special newline territory
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

# ------------------------------------------------------------------------------
# for

for (x in y)
  f

for (x in 5:6) {
  for (y in ys) {
    z
  }
}

for (x in y) for (y in z) x + y

# ------------------------------------------------------------------------------
# for no body

for (i in 1:5)

# ------------------------------------------------------------------------------
# while

while(TRUE)
  bar

while(x > 0)
  x <- x - 1

while(TRUE)
  break

while(TRUE)
  next

# ------------------------------------------------------------------------------
# while no body

while (a < b)

# ------------------------------------------------------------------------------
# repeat

repeat 1

# ------------------------------------------------------------------------------
# repeat no body

repeat

# dummy comment to retain a newline after the `repeat` (can remove if we add another test)
