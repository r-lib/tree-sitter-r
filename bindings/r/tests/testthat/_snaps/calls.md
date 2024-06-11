# subset

    Code
      node_children_print(node)
    Output
      S-Expression
      (subset [(1, 0), (1, 8)]
        function: (identifier [(1, 0), (1, 3)])
        arguments: (arguments [(1, 3), (1, 8)]
          open: "[" [(1, 3), (1, 4)]
          argument: (argument [(1, 4), (1, 7)]
            value: (identifier [(1, 4), (1, 7)])
          )
          close: "]" [(1, 7), (1, 8)]
        )
      )
      
      Text
      foo[bar]
      
      S-Expression
      (subset [(2, 0), (2, 9)]
        function: (identifier [(2, 0), (2, 3)])
        arguments: (arguments [(2, 3), (2, 9)]
          open: "[" [(2, 3), (2, 4)]
          argument: (argument [(2, 4), (2, 5)]
            value: (float [(2, 4), (2, 5)])
          )
          (comma [(2, 5), (2, 6)])
          argument: (argument [(2, 7), (2, 8)]
            value: (float [(2, 7), (2, 8)])
          )
          close: "]" [(2, 8), (2, 9)]
        )
      )
      
      Text
      foo[1, 2]
      
      S-Expression
      (subset [(3, 0), (3, 8)]
        function: (identifier [(3, 0), (3, 3)])
        arguments: (arguments [(3, 3), (3, 8)]
          open: "[" [(3, 3), (3, 4)]
          argument: (argument [(3, 4), (3, 5)]
            value: (float [(3, 4), (3, 5)])
          )
          (comma [(3, 5), (3, 6)])
          close: "]" [(3, 7), (3, 8)]
        )
      )
      
      Text
      foo[1, ]
      
      S-Expression
      (subset [(4, 0), (4, 9)]
        function: (identifier [(4, 0), (4, 3)])
        arguments: (arguments [(4, 3), (4, 9)]
          open: "[" [(4, 3), (4, 4)]
          argument: (argument [(4, 4), (4, 5)]
            value: (float [(4, 4), (4, 5)])
          )
          (comma [(4, 5), (4, 6)])
          (comma [(4, 6), (4, 7)])
          close: "]" [(4, 8), (4, 9)]
        )
      )
      
      Text
      foo[1,, ]
      
      S-Expression
      (subset [(5, 0), (5, 9)]
        function: (identifier [(5, 0), (5, 3)])
        arguments: (arguments [(5, 3), (5, 9)]
          open: "[" [(5, 3), (5, 4)]
          argument: (argument [(5, 4), (5, 5)]
            value: (float [(5, 4), (5, 5)])
          )
          (comma [(5, 5), (5, 6)])
          (comma [(5, 6), (5, 7)])
          argument: (argument [(5, 7), (5, 8)]
            value: (float [(5, 7), (5, 8)])
          )
          close: "]" [(5, 8), (5, 9)]
        )
      )
      
      Text
      foo[1,,2]
      
      S-Expression
      (subset [(6, 0), (6, 15)]
        function: (identifier [(6, 0), (6, 3)])
        arguments: (arguments [(6, 3), (6, 15)]
          open: "[" [(6, 3), (6, 4)]
          argument: (argument [(6, 4), (6, 7)]
            name: (identifier [(6, 4), (6, 5)])
            "=" [(6, 5), (6, 6)]
            value: (float [(6, 6), (6, 7)])
          )
          (comma [(6, 7), (6, 8)])
          (comma [(6, 8), (6, 9)])
          argument: (argument [(6, 9), (6, 12)]
            name: (identifier [(6, 9), (6, 10)])
            "=" [(6, 10), (6, 11)]
            value: (float [(6, 11), (6, 12)])
          )
          (comma [(6, 12), (6, 13)])
          argument: (argument [(6, 13), (6, 14)]
            value: (float [(6, 13), (6, 14)])
          )
          close: "]" [(6, 14), (6, 15)]
        )
      )
      
      Text
      foo[x=1,,y=3,4]
      
      S-Expression
      (subset [(7, 0), (7, 5)]
        function: (identifier [(7, 0), (7, 3)])
        arguments: (arguments [(7, 3), (7, 5)]
          open: "[" [(7, 3), (7, 4)]
          close: "]" [(7, 4), (7, 5)]
        )
      )
      
      Text
      foo[]
      

# subset2

    Code
      node_children_print(node)
    Output
      S-Expression
      (subset2 [(1, 0), (1, 8)]
        function: (identifier [(1, 0), (1, 3)])
        arguments: (arguments [(1, 3), (1, 8)]
          open: "[[" [(1, 3), (1, 5)]
          argument: (argument [(1, 5), (1, 6)]
            value: (identifier [(1, 5), (1, 6)])
          )
          close: "]]" [(1, 6), (1, 8)]
        )
      )
      
      Text
      foo[[x]]
      
      S-Expression
      (subset2 [(2, 0), (2, 11)]
        function: (identifier [(2, 0), (2, 3)])
        arguments: (arguments [(2, 3), (2, 11)]
          open: "[[" [(2, 3), (2, 5)]
          argument: (argument [(2, 5), (2, 6)]
            value: (identifier [(2, 5), (2, 6)])
          )
          (comma [(2, 6), (2, 7)])
          argument: (argument [(2, 8), (2, 9)]
            value: (identifier [(2, 8), (2, 9)])
          )
          close: "]]" [(2, 9), (2, 11)]
        )
      )
      
      Text
      foo[[x, y]]
      
      S-Expression
      (subset2 [(3, 0), (3, 9)]
        function: (identifier [(3, 0), (3, 3)])
        arguments: (arguments [(3, 3), (3, 9)]
          open: "[[" [(3, 3), (3, 5)]
          argument: (argument [(3, 5), (3, 6)]
            value: (identifier [(3, 5), (3, 6)])
          )
          (comma [(3, 6), (3, 7)])
          close: "]]" [(3, 7), (3, 9)]
        )
      )
      
      Text
      foo[[x,]]
      
      S-Expression
      (subset2 [(4, 0), (4, 10)]
        function: (identifier [(4, 0), (4, 3)])
        arguments: (arguments [(4, 3), (4, 10)]
          open: "[[" [(4, 3), (4, 5)]
          argument: (argument [(4, 5), (4, 6)]
            value: (identifier [(4, 5), (4, 6)])
          )
          (comma [(4, 6), (4, 7)])
          (comma [(4, 7), (4, 8)])
          close: "]]" [(4, 8), (4, 10)]
        )
      )
      
      Text
      foo[[x,,]]
      
      S-Expression
      (subset2 [(5, 0), (5, 11)]
        function: (identifier [(5, 0), (5, 3)])
        arguments: (arguments [(5, 3), (5, 11)]
          open: "[[" [(5, 3), (5, 5)]
          argument: (argument [(5, 5), (5, 6)]
            value: (identifier [(5, 5), (5, 6)])
          )
          (comma [(5, 6), (5, 7)])
          (comma [(5, 7), (5, 8)])
          argument: (argument [(5, 8), (5, 9)]
            value: (identifier [(5, 8), (5, 9)])
          )
          close: "]]" [(5, 9), (5, 11)]
        )
      )
      
      Text
      foo[[x,,y]]
      
      S-Expression
      (subset2 [(6, 0), (6, 7)]
        function: (identifier [(6, 0), (6, 3)])
        arguments: (arguments [(6, 3), (6, 7)]
          open: "[[" [(6, 3), (6, 5)]
          close: "]]" [(6, 5), (6, 7)]
        )
      )
      
      Text
      foo[[]]
      

# subset and subset2 precedence

    Code
      node_children_print(node)
    Output
      S-Expression
      (subset2 [(1, 0), (1, 9)]
        function: (identifier [(1, 0), (1, 1)])
        arguments: (arguments [(1, 1), (1, 9)]
          open: "[[" [(1, 1), (1, 3)]
          argument: (argument [(1, 3), (1, 7)]
            value: (subset [(1, 3), (1, 7)]
              function: (identifier [(1, 3), (1, 4)])
              arguments: (arguments [(1, 4), (1, 7)]
                open: "[" [(1, 4), (1, 5)]
                argument: (argument [(1, 5), (1, 6)]
                  value: (float [(1, 5), (1, 6)])
                )
                close: "]" [(1, 6), (1, 7)]
              )
            )
          )
          close: "]]" [(1, 7), (1, 9)]
        )
      )
      
      Text
      a[[b[1]]]
      
      S-Expression
      (subset [(2, 0), (2, 9)]
        function: (identifier [(2, 0), (2, 1)])
        arguments: (arguments [(2, 1), (2, 9)]
          open: "[" [(2, 1), (2, 2)]
          argument: (argument [(2, 2), (2, 8)]
            value: (subset2 [(2, 2), (2, 8)]
              function: (identifier [(2, 2), (2, 3)])
              arguments: (arguments [(2, 3), (2, 8)]
                open: "[[" [(2, 3), (2, 5)]
                argument: (argument [(2, 5), (2, 6)]
                  value: (float [(2, 5), (2, 6)])
                )
                close: "]]" [(2, 6), (2, 8)]
              )
            )
          )
          close: "]" [(2, 8), (2, 9)]
        )
      )
      
      Text
      a[b[[1]]]
      

# switch

    Code
      node_children_print(node)
    Output
      S-Expression
      (call [(1, 0), (6, 1)]
        function: (identifier [(1, 0), (1, 6)])
        arguments: (arguments [(1, 6), (6, 1)]
          open: "(" [(1, 6), (1, 7)]
          argument: (argument [(1, 7), (1, 10)]
            value: (identifier [(1, 7), (1, 10)])
          )
          (comma [(1, 10), (1, 11)])
          argument: (argument [(2, 2), (2, 7)]
            name: (identifier [(2, 2), (2, 3)])
            "=" [(2, 4), (2, 5)]
            value: (float [(2, 6), (2, 7)])
          )
          (comma [(2, 7), (2, 8)])
          argument: (argument [(3, 2), (3, 9)]
            name: (string [(3, 2), (3, 5)]
              "\"" [(3, 2), (3, 3)]
              content: (string_content [(3, 3), (3, 4)])
              "\"" [(3, 4), (3, 5)]
            )
            "=" [(3, 6), (3, 7)]
            value: (float [(3, 8), (3, 9)])
          )
          (comma [(3, 9), (3, 10)])
          argument: (argument [(4, 2), (4, 5)]
            name: (identifier [(4, 2), (4, 3)])
            "=" [(4, 4), (4, 5)]
          )
          (comma [(4, 6), (4, 7)])
          argument: (argument [(5, 2), (5, 3)]
            value: (float [(5, 2), (5, 3)])
          )
          close: ")" [(6, 0), (6, 1)]
        )
      )
      
      Text
      switch(foo,
        x = 1,
        "y" = 2,
        z = ,
        3
      )
      

# calls

    Code
      node_children_print(node)
    Output
      S-Expression
      (call [(1, 0), (1, 3)]
        function: (identifier [(1, 0), (1, 1)])
        arguments: (arguments [(1, 1), (1, 3)]
          open: "(" [(1, 1), (1, 2)]
          close: ")" [(1, 2), (1, 3)]
        )
      )
      
      Text
      f()
      
      S-Expression
      (call [(2, 0), (2, 4)]
        function: (identifier [(2, 0), (2, 1)])
        arguments: (arguments [(2, 1), (2, 4)]
          open: "(" [(2, 1), (2, 2)]
          argument: (argument [(2, 2), (2, 3)]
            value: (identifier [(2, 2), (2, 3)])
          )
          close: ")" [(2, 3), (2, 4)]
        )
      )
      
      Text
      f(x)
      
      S-Expression
      (call [(3, 0), (3, 6)]
        function: (identifier [(3, 0), (3, 1)])
        arguments: (arguments [(3, 1), (3, 6)]
          open: "(" [(3, 1), (3, 2)]
          argument: (argument [(3, 2), (3, 5)]
            value: (binary_operator [(3, 2), (3, 5)]
              lhs: (float [(3, 2), (3, 3)])
              operator: "+" [(3, 3), (3, 4)]
              rhs: (float [(3, 4), (3, 5)])
            )
          )
          close: ")" [(3, 5), (3, 6)]
        )
      )
      
      Text
      f(1+1)
      
      S-Expression
      (call [(4, 0), (4, 8)]
        function: (identifier [(4, 0), (4, 1)])
        arguments: (arguments [(4, 1), (4, 8)]
          open: "(" [(4, 1), (4, 2)]
          argument: (argument [(4, 2), (4, 7)]
            value: (binary_operator [(4, 2), (4, 7)]
              lhs: (float [(4, 2), (4, 3)])
              operator: "~" [(4, 4), (4, 5)]
              rhs: (float [(4, 6), (4, 7)])
            )
          )
          close: ")" [(4, 7), (4, 8)]
        )
      )
      
      Text
      f(1 ~ 1)
      
      S-Expression
      (call [(5, 0), (5, 6)]
        function: (identifier [(5, 0), (5, 1)])
        arguments: (arguments [(5, 1), (5, 6)]
          open: "(" [(5, 1), (5, 2)]
          argument: (argument [(5, 2), (5, 3)]
            value: (identifier [(5, 2), (5, 3)])
          )
          (comma [(5, 3), (5, 4)])
          close: ")" [(5, 5), (5, 6)]
        )
      )
      
      Text
      f(x, )
      
      S-Expression
      (call [(6, 0), (6, 7)]
        function: (identifier [(6, 0), (6, 1)])
        arguments: (arguments [(6, 1), (6, 7)]
          open: "(" [(6, 1), (6, 2)]
          argument: (argument [(6, 2), (6, 3)]
            value: (identifier [(6, 2), (6, 3)])
          )
          (comma [(6, 3), (6, 4)])
          (comma [(6, 4), (6, 5)])
          argument: (argument [(6, 5), (6, 6)]
            value: (identifier [(6, 5), (6, 6)])
          )
          close: ")" [(6, 6), (6, 7)]
        )
      )
      
      Text
      f(x,,y)
      
      S-Expression
      (call [(7, 0), (7, 7)]
        function: (identifier [(7, 0), (7, 1)])
        arguments: (arguments [(7, 1), (7, 7)]
          open: "(" [(7, 1), (7, 2)]
          argument: (argument [(7, 2), (7, 3)]
            value: (identifier [(7, 2), (7, 3)])
          )
          (comma [(7, 3), (7, 4)])
          argument: (argument [(7, 5), (7, 6)]
            value: (identifier [(7, 5), (7, 6)])
          )
          close: ")" [(7, 6), (7, 7)]
        )
      )
      
      Text
      f(x, y)
      
      S-Expression
      (call [(8, 0), (8, 11)]
        function: (identifier [(8, 0), (8, 1)])
        arguments: (arguments [(8, 1), (8, 11)]
          open: "(" [(8, 1), (8, 2)]
          argument: (argument [(8, 2), (8, 3)]
            value: (identifier [(8, 2), (8, 3)])
          )
          (comma [(8, 3), (8, 4)])
          argument: (argument [(8, 5), (8, 10)]
            name: (identifier [(8, 5), (8, 6)])
            "=" [(8, 7), (8, 8)]
            value: (float [(8, 9), (8, 10)])
          )
          close: ")" [(8, 10), (8, 11)]
        )
      )
      
      Text
      f(x, y = 2)
      
      S-Expression
      (call [(9, 0), (9, 12)]
        function: (identifier [(9, 0), (9, 1)])
        arguments: (arguments [(9, 1), (9, 12)]
          open: "(" [(9, 1), (9, 2)]
          argument: (argument [(9, 2), (9, 11)]
            name: (identifier [(9, 2), (9, 3)])
            "=" [(9, 4), (9, 5)]
            value: (binary_operator [(9, 6), (9, 11)]
              lhs: (float [(9, 6), (9, 7)])
              operator: "+" [(9, 8), (9, 9)]
              rhs: (float [(9, 10), (9, 11)])
            )
          )
          close: ")" [(9, 11), (9, 12)]
        )
      )
      
      Text
      f(x = 1 + 1)
      
      S-Expression
      (call [(10, 0), (10, 9)]
        function: (identifier [(10, 0), (10, 1)])
        arguments: (arguments [(10, 1), (10, 9)]
          open: "(" [(10, 1), (10, 2)]
          argument: (argument [(10, 2), (10, 3)]
            value: (identifier [(10, 2), (10, 3)])
          )
          (comma [(10, 3), (10, 4)])
          argument: (argument [(10, 5), (10, 8)]
            name: (identifier [(10, 5), (10, 6)])
            "=" [(10, 7), (10, 8)]
          )
          close: ")" [(10, 8), (10, 9)]
        )
      )
      
      Text
      f(x, y =)
      
      S-Expression
      (call [(11, 0), (11, 11)]
        function: (identifier [(11, 0), (11, 1)])
        arguments: (arguments [(11, 1), (11, 11)]
          open: "(" [(11, 1), (11, 2)]
          argument: (argument [(11, 2), (11, 10)]
            value: (call [(11, 2), (11, 10)]
              function: (identifier [(11, 2), (11, 4)])
              arguments: (arguments [(11, 4), (11, 10)]
                open: "(" [(11, 4), (11, 5)]
                argument: (argument [(11, 5), (11, 6)]
                  value: (identifier [(11, 5), (11, 6)])
                )
                (comma [(11, 6), (11, 7)])
                argument: (argument [(11, 8), (11, 9)]
                  value: (identifier [(11, 8), (11, 9)])
                )
                close: ")" [(11, 9), (11, 10)]
              )
            )
          )
          close: ")" [(11, 10), (11, 11)]
        )
      )
      
      Text
      f(f2(x, y))
      
      S-Expression
      (call [(12, 0), (12, 4)]
        function: (identifier [(12, 0), (12, 1)])
        arguments: (arguments [(12, 1), (12, 4)]
          open: "(" [(12, 1), (12, 2)]
          (comma [(12, 2), (12, 3)])
          close: ")" [(12, 3), (12, 4)]
        )
      )
      
      Text
      f(,)
      
      S-Expression
      (call [(13, 0), (13, 5)]
        function: (identifier [(13, 0), (13, 1)])
        arguments: (arguments [(13, 1), (13, 5)]
          open: "(" [(13, 1), (13, 2)]
          argument: (argument [(13, 2), (13, 3)]
            value: (identifier [(13, 2), (13, 3)])
          )
          (comma [(13, 3), (13, 4)])
          close: ")" [(13, 4), (13, 5)]
        )
      )
      
      Text
      f(x,)
      
      S-Expression
      (call [(14, 0), (14, 5)]
        function: (identifier [(14, 0), (14, 1)])
        arguments: (arguments [(14, 1), (14, 5)]
          open: "(" [(14, 1), (14, 2)]
          (comma [(14, 2), (14, 3)])
          argument: (argument [(14, 3), (14, 4)]
            value: (identifier [(14, 3), (14, 4)])
          )
          close: ")" [(14, 4), (14, 5)]
        )
      )
      
      Text
      f(,y)
      
      S-Expression
      (call [(15, 0), (15, 6)]
        function: (identifier [(15, 0), (15, 1)])
        arguments: (arguments [(15, 1), (15, 6)]
          open: "(" [(15, 1), (15, 2)]
          argument: (argument [(15, 2), (15, 4)]
            name: (identifier [(15, 2), (15, 3)])
            "=" [(15, 3), (15, 4)]
          )
          (comma [(15, 4), (15, 5)])
          close: ")" [(15, 5), (15, 6)]
        )
      )
      
      Text
      f(x=,)
      
      S-Expression
      (call [(16, 0), (16, 8)]
        function: (identifier [(16, 0), (16, 1)])
        arguments: (arguments [(16, 1), (16, 8)]
          open: "(" [(16, 1), (16, 2)]
          argument: (argument [(16, 2), (16, 6)]
            name: (string [(16, 2), (16, 5)]
              "\"" [(16, 2), (16, 3)]
              content: (string_content [(16, 3), (16, 4)])
              "\"" [(16, 4), (16, 5)]
            )
            "=" [(16, 5), (16, 6)]
          )
          (comma [(16, 6), (16, 7)])
          close: ")" [(16, 7), (16, 8)]
        )
      )
      
      Text
      f("x"=,)
      
      S-Expression
      (call [(17, 0), (17, 10)]
        function: (identifier [(17, 0), (17, 1)])
        arguments: (arguments [(17, 1), (17, 10)]
          open: "(" [(17, 1), (17, 2)]
          argument: (argument [(17, 2), (17, 7)]
            name: (dots [(17, 2), (17, 5)])
            "=" [(17, 6), (17, 7)]
          )
          (comma [(17, 8), (17, 9)])
          close: ")" [(17, 9), (17, 10)]
        )
      )
      
      Text
      f(... = ,)
      
      S-Expression
      (call [(18, 0), (18, 6)]
        function: (identifier [(18, 0), (18, 1)])
        arguments: (arguments [(18, 1), (18, 6)]
          open: "(" [(18, 1), (18, 2)]
          (comma [(18, 2), (18, 3)])
          argument: (argument [(18, 3), (18, 5)]
            name: (identifier [(18, 3), (18, 4)])
            "=" [(18, 4), (18, 5)]
          )
          close: ")" [(18, 5), (18, 6)]
        )
      )
      
      Text
      f(,y=)
      

# braces

    Code
      node_children_print(node)
    Output
      S-Expression
      (braced_expression [(1, 0), (1, 2)]
        open: "{" [(1, 0), (1, 1)]
        close: "}" [(1, 1), (1, 2)]
      )
      
      Text
      {}
      
      S-Expression
      (braced_expression [(3, 0), (3, 3)]
        open: "{" [(3, 0), (3, 1)]
        body: (float [(3, 1), (3, 2)])
        close: "}" [(3, 2), (3, 3)]
      )
      
      Text
      {1}
      
      S-Expression
      (braced_expression [(5, 0), (5, 6)]
        open: "{" [(5, 0), (5, 1)]
        body: (float [(5, 1), (5, 2)])
        body: (float [(5, 4), (5, 5)])
        close: "}" [(5, 5), (5, 6)]
      )
      
      Text
      {1; 2}
      
      S-Expression
      (braced_expression [(7, 0), (8, 2)]
        open: "{" [(7, 0), (7, 1)]
        body: (float [(7, 1), (7, 2)])
        body: (float [(8, 0), (8, 1)])
        close: "}" [(8, 1), (8, 2)]
      )
      
      Text
      {1;
      2}
      
      S-Expression
      (braced_expression [(10, 0), (12, 1)]
        open: "{" [(10, 0), (10, 1)]
        body: (float [(10, 1), (10, 2)])
        body: (float [(11, 0), (11, 1)])
        close: "}" [(12, 0), (12, 1)]
      )
      
      Text
      {1
      2
      }
      
      S-Expression
      (braced_expression [(14, 0), (17, 1)]
        open: "{" [(14, 0), (14, 1)]
        body: (float [(15, 0), (15, 1)])
        body: (float [(16, 0), (16, 1)])
        close: "}" [(17, 0), (17, 1)]
      )
      
      Text
      {
      1
      2
      }
      
      S-Expression
      (comment [(19, 0), (19, 50)])
      
      Text
      # https://github.com/r-lib/tree-sitter-r/issues/44
      
      S-Expression
      (braced_expression [(20, 0), (24, 1)]
        open: "{" [(20, 0), (20, 1)]
        body: (float [(21, 2), (21, 3)])
        body: (float [(22, 0), (22, 1)])
        body: (float [(23, 2), (23, 3)])
        close: "}" [(24, 0), (24, 1)]
      )
      
      Text
      {
        1
      2
        3
      }
      

