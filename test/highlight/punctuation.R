{
# <- punctuation.bracket
  1 + 1
}
# <- punctuation.bracket

(
# <- punctuation.bracket
    1 + 1
)
# <- punctuation.bracket

a[b]
#^ punctuation.bracket
#  ^ punctuation.bracket

# No good way to prove that `[[` is one token from what I can tell
a[[b]]
#^ punctuation.bracket
# ^ punctuation.bracket
#   ^ punctuation.bracket
#    ^ punctuation.bracket

fn()
# ^ punctuation.bracket
#  ^ punctuation.bracket

fn(a, b)
#   ^ punctuation.delimiter
