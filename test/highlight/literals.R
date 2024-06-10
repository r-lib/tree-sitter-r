"x"
# ^ string

"\n1 + 2\u123 and \U123"
# ^ string.escape
#        ^ string.escape
#                  ^ string.escape

1L
# <- number

1.5
# ^ number

1+3i
# <- number
# ^ number
