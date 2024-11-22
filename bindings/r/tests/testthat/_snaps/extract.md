# dollar

    Code
      node_children_print(node)
    Output
      S-Expression
      (extract_operator [(1, 0), (1, 7)]
        lhs: (identifier [(1, 0), (1, 3)])
        operator: "$" [(1, 3), (1, 4)]
        rhs: (identifier [(1, 4), (1, 7)])
      )
      
      Text
      foo$bar
      
      S-Expression
      (extract_operator [(2, 0), (2, 11)]
        lhs: (extract_operator [(2, 0), (2, 7)]
          lhs: (identifier [(2, 0), (2, 3)])
          operator: "$" [(2, 3), (2, 4)]
          rhs: (identifier [(2, 4), (2, 7)])
        )
        operator: "$" [(2, 7), (2, 8)]
        rhs: (identifier [(2, 8), (2, 11)])
      )
      
      Text
      foo$bar$baz
      
      S-Expression
      (extract_operator [(3, 0), (3, 11)]
        lhs: (extract_operator [(3, 0), (3, 7)]
          lhs: (identifier [(3, 0), (3, 3)])
          operator: "$" [(3, 3), (3, 4)]
          rhs: (identifier [(3, 4), (3, 7)])
        )
        operator: "@" [(3, 7), (3, 8)]
        rhs: (identifier [(3, 8), (3, 11)])
      )
      
      Text
      foo$bar@baz
      
      S-Expression
      (call [(4, 0), (4, 9)]
        function: (extract_operator [(4, 0), (4, 7)]
          lhs: (identifier [(4, 0), (4, 3)])
          operator: "$" [(4, 3), (4, 4)]
          rhs: (identifier [(4, 4), (4, 7)])
        )
        arguments: (arguments [(4, 7), (4, 9)]
          open: "(" [(4, 7), (4, 8)]
          close: ")" [(4, 8), (4, 9)]
        )
      )
      
      Text
      foo$bar()
      
      S-Expression
      (extract_operator [(5, 0), (5, 9)]
        lhs: (identifier [(5, 0), (5, 3)])
        operator: "$" [(5, 3), (5, 4)]
        rhs: (string [(5, 4), (5, 9)]
          "\"" [(5, 4), (5, 5)]
          content: (string_content [(5, 5), (5, 8)])
          "\"" [(5, 8), (5, 9)]
        )
      )
      
      Text
      foo$"bar"
      
      S-Expression
      (extract_operator [(6, 0), (6, 22)]
        lhs: (subset2 [(6, 0), (6, 18)]
          function: (extract_operator [(6, 0), (6, 13)]
            lhs: (call [(6, 0), (6, 9)]
              function: (extract_operator [(6, 0), (6, 7)]
                lhs: (identifier [(6, 0), (6, 3)])
                operator: "$" [(6, 3), (6, 4)]
                rhs: (identifier [(6, 4), (6, 7)])
              )
              arguments: (arguments [(6, 7), (6, 9)]
                open: "(" [(6, 7), (6, 8)]
                close: ")" [(6, 8), (6, 9)]
              )
            )
            operator: "$" [(6, 9), (6, 10)]
            rhs: (identifier [(6, 10), (6, 13)])
          )
          arguments: (arguments [(6, 13), (6, 18)]
            open: "[[" [(6, 13), (6, 15)]
            argument: (argument [(6, 15), (6, 16)]
              value: (float [(6, 15), (6, 16)])
            )
            close: "]]" [(6, 16), (6, 18)]
          )
        )
        operator: "$" [(6, 18), (6, 19)]
        rhs: (identifier [(6, 19), (6, 22)])
      )
      
      Text
      foo$bar()$baz[[1]]$bam
      
      S-Expression
      (extract_operator [(7, 0), (7, 7)]
        lhs: (identifier [(7, 0), (7, 3)])
        operator: "$" [(7, 3), (7, 4)]
        rhs: (dots [(7, 4), (7, 7)])
      )
      
      Text
      foo$...
      
      S-Expression
      (extract_operator [(8, 0), (8, 7)]
        lhs: (identifier [(8, 0), (8, 3)])
        operator: "$" [(8, 3), (8, 4)]
        rhs: (dot_dot_i [(8, 4), (8, 7)])
      )
      
      Text
      foo$..1
      

# dollar no rhs

    Code
      node_children_print(node)
    Output
      S-Expression
      (extract_operator [(1, 0), (2, 0)]
        lhs: (identifier [(1, 0), (1, 3)])
        operator: "$" [(1, 3), (1, 4)]
      )
      
      Text
      foo$
      
      

# slot

    Code
      node_children_print(node)
    Output
      S-Expression
      (extract_operator [(1, 0), (1, 7)]
        lhs: (identifier [(1, 0), (1, 3)])
        operator: "@" [(1, 3), (1, 4)]
        rhs: (identifier [(1, 4), (1, 7)])
      )
      
      Text
      foo@bar
      
      S-Expression
      (extract_operator [(2, 0), (2, 11)]
        lhs: (extract_operator [(2, 0), (2, 7)]
          lhs: (identifier [(2, 0), (2, 3)])
          operator: "@" [(2, 3), (2, 4)]
          rhs: (identifier [(2, 4), (2, 7)])
        )
        operator: "$" [(2, 7), (2, 8)]
        rhs: (identifier [(2, 8), (2, 11)])
      )
      
      Text
      foo@bar$baz
      
      S-Expression
      (call [(3, 0), (3, 9)]
        function: (extract_operator [(3, 0), (3, 7)]
          lhs: (identifier [(3, 0), (3, 3)])
          operator: "@" [(3, 3), (3, 4)]
          rhs: (identifier [(3, 4), (3, 7)])
        )
        arguments: (arguments [(3, 7), (3, 9)]
          open: "(" [(3, 7), (3, 8)]
          close: ")" [(3, 8), (3, 9)]
        )
      )
      
      Text
      foo@bar()
      
      S-Expression
      (extract_operator [(4, 0), (4, 9)]
        lhs: (identifier [(4, 0), (4, 3)])
        operator: "@" [(4, 3), (4, 4)]
        rhs: (string [(4, 4), (4, 9)]
          "\"" [(4, 4), (4, 5)]
          content: (string_content [(4, 5), (4, 8)])
          "\"" [(4, 8), (4, 9)]
        )
      )
      
      Text
      foo@"bar"
      
      S-Expression
      (extract_operator [(5, 0), (5, 7)]
        lhs: (identifier [(5, 0), (5, 3)])
        operator: "@" [(5, 3), (5, 4)]
        rhs: (dots [(5, 4), (5, 7)])
      )
      
      Text
      foo@...
      
      S-Expression
      (extract_operator [(6, 0), (6, 7)]
        lhs: (identifier [(6, 0), (6, 3)])
        operator: "@" [(6, 3), (6, 4)]
        rhs: (dot_dot_i [(6, 4), (6, 7)])
      )
      
      Text
      foo@..1
      

# slot no rhs

    Code
      node_children_print(node)
    Output
      S-Expression
      (extract_operator [(1, 0), (1, 4)]
        lhs: (identifier [(1, 0), (1, 3)])
        operator: "@" [(1, 3), (1, 4)]
      )
      
      Text
      foo@
      

