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
      (identifier [(7, 0), (7, 13)])
      
      Text
      `a "literal"`
      
      S-Expression
      (identifier [(8, 0), (9, 15)])
      
      Text
      `another
      literal \` foo`
      
      S-Expression
      (identifier [(10, 0), (11, 1)])
      
      Text
      `backslash followed by newline \
      `
      
      S-Expression
      (identifier [(12, 0), (12, 4)])
      
      Text
      `\``
      
      S-Expression
      (identifier [(13, 0), (13, 1)]
        "_" [(13, 0), (13, 1)]
      )
      
      Text
      _
      
      S-Expression
      (identifier [(13, 1), (13, 4)])
      
      Text
      foo
      

# unicode identifiers

    Code
      node_print(node)
    Output
      S-Expression
      (program [(1, 0), (4, 2)]
        (identifier [(1, 0), (1, 6)])
        (identifier [(2, 0), (2, 9)])
        (identifier [(3, 0), (3, 9)])
      )
      
      Text
      你好
      .你.好.
      .你_好.
        

# strings

    Code
      node_children_print(node)
    Output
      S-Expression
      (string [(1, 0), (1, 5)])
      
      Text
      "foo"
      
      S-Expression
      (string [(2, 0), (2, 10)])
      
      Text
      "foo\"bar"
      
      S-Expression
      (string [(3, 0), (3, 7)])
      
      Text
      "foo\ "
      
      S-Expression
      (string [(4, 0), (5, 1)])
      
      Text
      "foo\
      "
      
      S-Expression
      (string [(6, 0), (6, 4)])
      
      Text
      "\""
      
      S-Expression
      (string [(7, 0), (7, 5)])
      
      Text
      'foo'
      
      S-Expression
      (string [(8, 0), (8, 10)])
      
      Text
      'foo\'bar'
      
      S-Expression
      (string [(9, 0), (9, 7)])
      
      Text
      'foo\ '
      
      S-Expression
      (string [(10, 0), (11, 1)])
      
      Text
      'foo\
      '
      
      S-Expression
      (string [(12, 0), (12, 4)])
      
      Text
      '\''
      
      S-Expression
      (string [(13, 0), (13, 3)])
      
      Text
      "#"
      
      S-Expression
      (string [(14, 0), (14, 3)])
      
      Text
      '#'
      

# unclosed double quote

    Code
      node_print(node)
    Output
      S-Expression
      (program [(1, 0), (2, 2)]
        (ERROR [(1, 0), (2, 2)]
          (ERROR [(1, 0), (2, 2)])
        )
      )
      
      Text
      "\"
        

# unclosed single quote

    Code
      node_print(node)
    Output
      S-Expression
      (program [(1, 0), (2, 2)]
        (ERROR [(1, 0), (2, 2)]
          (ERROR [(1, 0), (2, 2)])
        )
      )
      
      Text
      '\'
        

# unclosed backtick

    Code
      node_print(node)
    Output
      S-Expression
      (program [(1, 0), (2, 2)]
        (ERROR [(1, 0), (2, 2)]
          (ERROR [(1, 0), (2, 2)])
        )
      )
      
      Text
      `\`
        

# raw strings

    Code
      node_children_print(node)
    Output
      S-Expression
      (string [(1, 0), (1, 15)])
      
      Text
      r"(raw string)"
      
      S-Expression
      (string [(2, 0), (2, 23)])
      
      Text
      R"{another raw string}"
      
      S-Expression
      (string [(3, 0), (3, 34)])
      
      Text
      R"--[yet another ]- raw string]--"
      
      S-Expression
      (call [(4, 0), (4, 3)]
        function: (identifier [(4, 0), (4, 1)])
        arguments: (arguments [(4, 1), (4, 3)]
          "(" [(4, 1), (4, 2)]
          ")" [(4, 2), (4, 3)]
        )
      )
      
      Text
      r()
      

# comments

    Code
      node_print(node)
    Output
      S-Expression
      (program [(1, 0), (8, 2)]
        (comment [(1, 0), (1, 12)])
        (string [(3, 0), (3, 17)])
        (string [(6, 0), (7, 22)])
      )
      
      Text
      # a comment'
      
      '# not a comment'
      
      
      '
      # still not a comment'
        

# constants

    Code
      node_print(node)
    Output
      S-Expression
      (program [(1, 0), (10, 2)]
        (true [(1, 0), (1, 4)])
        (false [(2, 0), (2, 5)])
        (null [(3, 0), (3, 4)])
        (inf [(4, 0), (4, 3)])
        (nan [(5, 0), (5, 3)])
        (na [(6, 0), (6, 2)]
          "NA" [(6, 0), (6, 2)]
        )
        (na [(7, 0), (7, 8)]
          "NA_real_" [(7, 0), (7, 8)]
        )
        (na [(8, 0), (8, 13)]
          "NA_character_" [(8, 0), (8, 13)]
        )
        (na [(9, 0), (9, 11)]
          "NA_complex_" [(9, 0), (9, 11)]
        )
      )
      
      Text
      TRUE
      FALSE
      NULL
      Inf
      NaN
      NA
      NA_real_
      NA_character_
      NA_complex_
        

# integers

    Code
      node_print(node)
    Output
      S-Expression
      (program [(1, 0), (5, 2)]
        (integer [(1, 0), (1, 6)]
          "L" [(1, 5), (1, 6)]
        )
        (integer [(2, 0), (2, 2)]
          "L" [(2, 1), (2, 2)]
        )
        (integer [(3, 0), (3, 3)]
          "L" [(3, 2), (3, 3)]
        )
        (integer [(4, 0), (4, 7)]
          "L" [(4, 6), (4, 7)]
        )
      )
      
      Text
      12332L
      0L
      12L
      0xDEADL
        

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
      (float [(5, 0), (5, 6)])
      
      Text
      0xDEAD
      
      S-Expression
      (binary_operator [(6, 0), (6, 9)]
        lhs: (identifier [(6, 0), (6, 1)])
        operator: "<-" [(6, 2), (6, 4)]
        rhs: (unary_operator [(6, 5), (6, 9)]
          operator: "-" [(6, 5), (6, 6)]
          rhs: (float [(6, 6), (6, 9)])
        )
      )
      
      Text
      x <- -.66
      

# scientific notation floats

    Code
      node_print(node)
    Output
      S-Expression
      (program [(1, 0), (7, 2)]
        (float [(1, 0), (1, 5)])
        (float [(2, 0), (2, 4)])
        (float [(3, 0), (3, 4)])
        (float [(4, 0), (4, 6)])
        (float [(5, 0), (5, 5)])
        (float [(6, 0), (6, 4)])
      )
      
      Text
      1e322
      1e-3
      1e+3
      1.8e10
      1.e10
      1e10
        

