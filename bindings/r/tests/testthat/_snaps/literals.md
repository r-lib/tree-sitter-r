# identifiers

    Code
      node_children_print(node)
    Output
      S-Expression
      (identifier [(1, 0), (1, 3)])
      
      Text
      foo
      
      S-Expression
      (identifier [(2, 0), (2, 4)])
      
      Text
      foo2
      
      S-Expression
      (identifier [(3, 0), (3, 7)])
      
      Text
      foo.bar
      
      S-Expression
      (identifier [(4, 0), (4, 8)])
      
      Text
      .foo.bar
      
      S-Expression
      (identifier [(5, 0), (5, 15)])
      
      Text
      .__NAMESPACE__.
      
      S-Expression
      (identifier [(6, 0), (6, 7)])
      
      Text
      foo_bar
      
      S-Expression
      (identifier [(7, 0), (7, 6)])
      
      Text
      `_foo`
      
      S-Expression
      (identifier [(8, 0), (8, 13)])
      
      Text
      `a "literal"`
      
      S-Expression
      (identifier [(9, 0), (10, 15)])
      
      Text
      `another
      literal \` foo`
      
      S-Expression
      (identifier [(11, 0), (12, 1)])
      
      Text
      `backslash followed by newline \
      `
      
      S-Expression
      (identifier [(13, 0), (13, 4)])
      
      Text
      `\``
      
      S-Expression
      (comment [(14, 0), (14, 18)])
      
      Text
      # Pipe placeholder
      
      S-Expression
      (identifier [(15, 0), (15, 1)])
      
      Text
      _
      
      S-Expression
      (comment [(16, 0), (16, 73)])
      
      Text
      # Recognized as a single `_foo` identifier, even if invalid R code (#71).
      
      S-Expression
      (identifier [(17, 0), (17, 4)])
      
      Text
      _foo
      
      S-Expression
      (identifier [(18, 0), (18, 5)])
      
      Text
      __foo
      
      S-Expression
      (identifier [(19, 0), (19, 5)])
      
      Text
      _foo_
      

# comments

    Code
      node_children_print(node)
    Output
      S-Expression
      (comment [(1, 0), (1, 12)])
      
      Text
      # a comment'
      
      S-Expression
      (string [(3, 0), (3, 17)]
        open: "'" [(3, 0), (3, 1)]
        content: (string_content [(3, 1), (3, 16)])
        close: "'" [(3, 16), (3, 17)]
      )
      
      Text
      '# not a comment'
      
      S-Expression
      (string [(6, 0), (7, 22)]
        open: "'" [(6, 0), (6, 1)]
        content: (string_content [(6, 1), (7, 21)])
        close: "'" [(7, 21), (7, 22)]
      )
      
      Text
      '
      # still not a comment'
      

# constants

    Code
      node_children_print(node)
    Output
      S-Expression
      (true [(1, 0), (1, 4)])
      
      Text
      TRUE
      
      S-Expression
      (false [(2, 0), (2, 5)])
      
      Text
      FALSE
      
      S-Expression
      (null [(3, 0), (3, 4)])
      
      Text
      NULL
      
      S-Expression
      (inf [(4, 0), (4, 3)])
      
      Text
      Inf
      
      S-Expression
      (nan [(5, 0), (5, 3)])
      
      Text
      NaN
      
      S-Expression
      (na [(6, 0), (6, 2)]
        "NA" [(6, 0), (6, 2)]
      )
      
      Text
      NA
      
      S-Expression
      (na [(7, 0), (7, 8)]
        "NA_real_" [(7, 0), (7, 8)]
      )
      
      Text
      NA_real_
      
      S-Expression
      (na [(8, 0), (8, 13)]
        "NA_character_" [(8, 0), (8, 13)]
      )
      
      Text
      NA_character_
      
      S-Expression
      (na [(9, 0), (9, 11)]
        "NA_complex_" [(9, 0), (9, 11)]
      )
      
      Text
      NA_complex_
      

# integers

    Code
      node_children_print(node)
    Output
      S-Expression
      (integer [(1, 0), (1, 6)]
        "L" [(1, 5), (1, 6)]
      )
      
      Text
      12332L
      
      S-Expression
      (integer [(2, 0), (2, 2)]
        "L" [(2, 1), (2, 2)]
      )
      
      Text
      0L
      
      S-Expression
      (integer [(3, 0), (3, 3)]
        "L" [(3, 2), (3, 3)]
      )
      
      Text
      12L
      

# floats

    Code
      node_children_print(node)
    Output
      S-Expression
      (float [(1, 0), (1, 3)])
      
      Text
      .66
      
      S-Expression
      (float [(2, 0), (2, 3)])
      
      Text
      .11
      
      S-Expression
      (float [(3, 0), (3, 8)])
      
      Text
      123.4123
      
      S-Expression
      (float [(4, 0), (4, 5)])
      
      Text
      .1234
      
      S-Expression
      (binary_operator [(5, 0), (5, 9)]
        lhs: (identifier [(5, 0), (5, 1)])
        operator: "<-" [(5, 2), (5, 4)]
        rhs: (unary_operator [(5, 5), (5, 9)]
          operator: "-" [(5, 5), (5, 6)]
          rhs: (float [(5, 6), (5, 9)])
        )
      )
      
      Text
      x <- -.66
      

# hexadecimal

    Code
      node_children_print(node)
    Output
      S-Expression
      (comment [(1, 0), (1, 12)])
      
      Text
      # `x` vs `X`
      
      S-Expression
      (float [(2, 0), (2, 5)])
      
      Text
      0x123
      
      S-Expression
      (float [(3, 0), (3, 5)])
      
      Text
      0X123
      
      S-Expression
      (comment [(5, 0), (5, 21)])
      
      Text
      # Numbers and letters
      
      S-Expression
      (float [(6, 0), (6, 6)])
      
      Text
      0xDEAD
      
      S-Expression
      (float [(7, 0), (7, 6)])
      
      Text
      0XDEAD
      
      S-Expression
      (float [(8, 0), (8, 7)])
      
      Text
      0x1f2F3
      
      S-Expression
      (float [(9, 0), (9, 7)])
      
      Text
      0X1f2F3
      
      S-Expression
      (comment [(11, 0), (11, 12)])
      
      Text
      # `p` vs `P`
      
      S-Expression
      (float [(12, 0), (12, 5)])
      
      Text
      0x0p0
      
      S-Expression
      (float [(13, 0), (13, 5)])
      
      Text
      0x0P0
      
      S-Expression
      (float [(14, 0), (14, 7)])
      
      Text
      0x0p123
      
      S-Expression
      (float [(15, 0), (15, 7)])
      
      Text
      0x0P123
      
      S-Expression
      (comment [(17, 0), (17, 13)])
      
      Text
      # `+` and `-`
      
      S-Expression
      (float [(18, 0), (18, 6)])
      
      Text
      0x0p+0
      
      S-Expression
      (float [(19, 0), (19, 6)])
      
      Text
      0x0p-0
      
      S-Expression
      (float [(20, 0), (20, 8)])
      
      Text
      0x0p+123
      
      S-Expression
      (float [(21, 0), (21, 8)])
      
      Text
      0x0p-123
      
      S-Expression
      (comment [(23, 0), (23, 13)])
      
      Text
      # As integers
      
      S-Expression
      (integer [(24, 0), (24, 6)]
        "L" [(24, 5), (24, 6)]
      )
      
      Text
      0x123L
      
      S-Expression
      (integer [(25, 0), (25, 6)]
        "L" [(25, 5), (25, 6)]
      )
      
      Text
      0X123L
      
      S-Expression
      (integer [(26, 0), (26, 7)]
        "L" [(26, 6), (26, 7)]
      )
      
      Text
      0xDEADL
      
      S-Expression
      (integer [(27, 0), (27, 7)]
        "L" [(27, 6), (27, 7)]
      )
      
      Text
      0XDEADL
      
      S-Expression
      (integer [(28, 0), (28, 6)]
        "L" [(28, 5), (28, 6)]
      )
      
      Text
      0x0p0L
      
      S-Expression
      (integer [(29, 0), (29, 6)]
        "L" [(29, 5), (29, 6)]
      )
      
      Text
      0x0P0L
      
      S-Expression
      (integer [(30, 0), (30, 7)]
        "L" [(30, 6), (30, 7)]
      )
      
      Text
      0x0p+0L
      
      S-Expression
      (integer [(31, 0), (31, 7)]
        "L" [(31, 6), (31, 7)]
      )
      
      Text
      0x0p-0L
      

# scientific notation floats

    Code
      node_children_print(node)
    Output
      S-Expression
      (float [(1, 0), (1, 5)])
      
      Text
      1e322
      
      S-Expression
      (float [(2, 0), (2, 4)])
      
      Text
      1e-3
      
      S-Expression
      (float [(3, 0), (3, 4)])
      
      Text
      1e+3
      
      S-Expression
      (float [(4, 0), (4, 6)])
      
      Text
      1.8e10
      
      S-Expression
      (float [(5, 0), (5, 5)])
      
      Text
      1.e10
      
      S-Expression
      (float [(6, 0), (6, 4)])
      
      Text
      1e10
      

