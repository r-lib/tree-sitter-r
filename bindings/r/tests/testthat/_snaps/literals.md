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
      (identifier [(6, 0), (6, 1)])
      
      Text
      .
      
      S-Expression
      (identifier [(7, 0), (7, 2)])
      
      Text
      ..
      
      S-Expression
      (identifier [(8, 0), (8, 2)])
      
      Text
      ._
      
      S-Expression
      (identifier [(9, 0), (9, 3)])
      
      Text
      ._.
      
      S-Expression
      (identifier [(10, 0), (10, 7)])
      
      Text
      foo_bar
      
      S-Expression
      (identifier [(11, 0), (11, 6)])
      
      Text
      `_foo`
      
      S-Expression
      (identifier [(12, 0), (12, 13)])
      
      Text
      `a "literal"`
      
      S-Expression
      (identifier [(13, 0), (14, 15)])
      
      Text
      `another
      literal \` foo`
      
      S-Expression
      (identifier [(15, 0), (16, 1)])
      
      Text
      `backslash followed by newline \
      `
      
      S-Expression
      (identifier [(17, 0), (17, 4)])
      
      Text
      `\``
      
      S-Expression
      (comment [(18, 0), (18, 18)])
      
      Text
      # Pipe placeholder
      
      S-Expression
      (identifier [(19, 0), (19, 1)])
      
      Text
      _
      
      S-Expression
      (comment [(20, 0), (20, 73)])
      
      Text
      # Recognized as a single `_foo` identifier, even if invalid R code (#71).
      
      S-Expression
      (identifier [(21, 0), (21, 4)])
      
      Text
      _foo
      
      S-Expression
      (identifier [(22, 0), (22, 5)])
      
      Text
      __foo
      
      S-Expression
      (identifier [(23, 0), (23, 5)])
      
      Text
      _foo_
      

# invalid identifiers

    Code
      node_children_print(node)
    Output
      S-Expression
      (comment [(1, 0), (1, 79)])
      
      Text
      # R does not allow identifiers to start with a `.` followed by a digit, as this
      
      S-Expression
      (comment [(2, 0), (2, 79)])
      
      Text
      # would cause ambiguity with `.1L` and `.1i`. R itself rejects this as a syntax
      
      S-Expression
      (comment [(3, 0), (3, 80)])
      
      Text
      # error, we currently parse this as `.1` followed by `foo`, just like we do with
      
      S-Expression
      (comment [(4, 0), (4, 16)])
      
      Text
      # `1foo` (#190).
      
      S-Expression
      (float [(5, 0), (5, 2)])
      
      Text
      .1
      
      S-Expression
      (identifier [(5, 2), (5, 5)])
      
      Text
      foo
      

# `return` is just an identifier

    Code
      node_children_print(node)
    Output
      S-Expression
      (function_definition [(1, 0), (1, 21)]
        name: "function" [(1, 0), (1, 8)]
        parameters: (parameters [(1, 8), (1, 11)]
          open: "(" [(1, 8), (1, 9)]
          parameter: (parameter [(1, 9), (1, 10)]
            name: (identifier [(1, 9), (1, 10)])
          )
          close: ")" [(1, 10), (1, 11)]
        )
        body: (call [(1, 12), (1, 21)]
          function: (identifier [(1, 12), (1, 18)])
          arguments: (arguments [(1, 18), (1, 21)]
            open: "(" [(1, 18), (1, 19)]
            argument: (argument [(1, 19), (1, 20)]
              value: (identifier [(1, 19), (1, 20)])
            )
            close: ")" [(1, 20), (1, 21)]
          )
        )
      )
      
      Text
      function(x) return(x)
      
      S-Expression
      (call [(2, 0), (2, 9)]
        function: (identifier [(2, 0), (2, 6)])
        arguments: (arguments [(2, 6), (2, 9)]
          open: "(" [(2, 6), (2, 7)]
          argument: (argument [(2, 7), (2, 8)]
            value: (identifier [(2, 7), (2, 8)])
          )
          close: ")" [(2, 8), (2, 9)]
        )
      )
      
      Text
      return(x)
      
      S-Expression
      (identifier [(3, 0), (3, 6)])
      
      Text
      return
      

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
      
      S-Expression
      (integer [(4, 0), (4, 4)]
        "L" [(4, 3), (4, 4)]
      )
      
      Text
      1e1L
      
      S-Expression
      (comment [(5, 0), (5, 96)])
      
      Text
      # Technically, R parses these as floats with a warning, but for our purposes this is good enough
      
      S-Expression
      (integer [(6, 0), (6, 4)]
        "L" [(6, 3), (6, 4)]
      )
      
      Text
      0.1L
      
      S-Expression
      (integer [(7, 0), (7, 3)]
        "L" [(7, 2), (7, 3)]
      )
      
      Text
      .1L
      

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
      (comment [(23, 0), (23, 15)])
      
      Text
      # Decimal point
      
      S-Expression
      (float [(24, 0), (24, 3)])
      
      Text
      0x.
      
      S-Expression
      (float [(25, 0), (25, 4)])
      
      Text
      0x1.
      
      S-Expression
      (float [(26, 0), (26, 4)])
      
      Text
      0x.1
      
      S-Expression
      (float [(27, 0), (27, 5)])
      
      Text
      0x1.1
      
      S-Expression
      (comment [(29, 0), (29, 29)])
      
      Text
      # Decimal point with exponent
      
      S-Expression
      (float [(30, 0), (30, 5)])
      
      Text
      0x.p1
      
      S-Expression
      (float [(31, 0), (31, 6)])
      
      Text
      0x1.p1
      
      S-Expression
      (float [(32, 0), (32, 6)])
      
      Text
      0x.1p1
      
      S-Expression
      (float [(33, 0), (33, 7)])
      
      Text
      0x1.1p1
      
      S-Expression
      (comment [(35, 0), (35, 13)])
      
      Text
      # As integers
      
      S-Expression
      (integer [(36, 0), (36, 6)]
        "L" [(36, 5), (36, 6)]
      )
      
      Text
      0x123L
      
      S-Expression
      (integer [(37, 0), (37, 6)]
        "L" [(37, 5), (37, 6)]
      )
      
      Text
      0X123L
      
      S-Expression
      (integer [(38, 0), (38, 7)]
        "L" [(38, 6), (38, 7)]
      )
      
      Text
      0xDEADL
      
      S-Expression
      (integer [(39, 0), (39, 7)]
        "L" [(39, 6), (39, 7)]
      )
      
      Text
      0XDEADL
      
      S-Expression
      (integer [(40, 0), (40, 6)]
        "L" [(40, 5), (40, 6)]
      )
      
      Text
      0x0p0L
      
      S-Expression
      (integer [(41, 0), (41, 6)]
        "L" [(41, 5), (41, 6)]
      )
      
      Text
      0x0P0L
      
      S-Expression
      (integer [(42, 0), (42, 7)]
        "L" [(42, 6), (42, 7)]
      )
      
      Text
      0x0p+0L
      
      S-Expression
      (integer [(43, 0), (43, 7)]
        "L" [(43, 6), (43, 7)]
      )
      
      Text
      0x0p-0L
      
      S-Expression
      (integer [(44, 0), (44, 4)]
        "L" [(44, 3), (44, 4)]
      )
      
      Text
      0x.L
      
      S-Expression
      (integer [(45, 0), (45, 5)]
        "L" [(45, 4), (45, 5)]
      )
      
      Text
      0x1.L
      
      S-Expression
      (integer [(46, 0), (46, 5)]
        "L" [(46, 4), (46, 5)]
      )
      
      Text
      0x.1L
      
      S-Expression
      (integer [(47, 0), (47, 6)]
        "L" [(47, 5), (47, 6)]
      )
      
      Text
      0x1.1L
      

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
      

# complex

    Code
      node_children_print(node)
    Output
      S-Expression
      (complex [(1, 0), (1, 2)]
        "i" [(1, 1), (1, 2)]
      )
      
      Text
      1i
      
      S-Expression
      (complex [(2, 0), (2, 2)]
        "i" [(2, 1), (2, 2)]
      )
      
      Text
      0i
      
      S-Expression
      (complex [(3, 0), (3, 4)]
        "i" [(3, 3), (3, 4)]
      )
      
      Text
      1.1i
      
      S-Expression
      (complex [(4, 0), (4, 3)]
        "i" [(4, 2), (4, 3)]
      )
      
      Text
      .1i
      
      S-Expression
      (complex [(5, 0), (5, 5)]
        "i" [(5, 4), (5, 5)]
      )
      
      Text
      1e10i
      
      S-Expression
      (complex [(6, 0), (6, 6)]
        "i" [(6, 5), (6, 6)]
      )
      
      Text
      .1e10i
      
      S-Expression
      (complex [(7, 0), (7, 4)]
        "i" [(7, 3), (7, 4)]
      )
      
      Text
      0x1i
      
      S-Expression
      (complex [(8, 0), (8, 5)]
        "i" [(8, 4), (8, 5)]
      )
      
      Text
      0x.1i
      

