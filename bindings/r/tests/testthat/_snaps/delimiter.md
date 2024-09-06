# closing brace

    Code
      node_children_print(node)
    Output
      S-Expression
      (ERROR [(1, 0), (1, 1)]
        (ERROR [(1, 0), (1, 1)])
      )
      
      Text
      }
      

# closing parenthesis

    Code
      node_children_print(node)
    Output
      S-Expression
      (ERROR [(1, 0), (1, 1)]
        (ERROR [(1, 0), (1, 1)])
      )
      
      Text
      )
      

# closing bracket

    Code
      node_children_print(node)
    Output
      S-Expression
      (ERROR [(1, 0), (1, 1)]
        (ERROR [(1, 0), (1, 1)])
      )
      
      Text
      ]
      

# opening brace, closing parenthesis

    Code
      node_children_print(node)
    Output
      S-Expression
      (comment [(1, 0), (1, 72)])
      
      Text
      # Parenthesis is "not valid" so it isn't matched by the external scanner
      
      S-Expression
      (ERROR [(2, 0), (2, 2)]
        "{" [(2, 0), (2, 1)]
        (ERROR [(2, 1), (2, 2)])
      )
      
      Text
      {)
      

# opening parenthesis, closing brace

    Code
      node_children_print(node)
    Output
      S-Expression
      (ERROR [(1, 0), (1, 2)]
        "(" [(1, 0), (1, 1)]
        (ERROR [(1, 1), (1, 2)])
      )
      
      Text
      (}
      

# opening parenthesis, closing bracket

    Code
      node_children_print(node)
    Output
      S-Expression
      (ERROR [(1, 0), (1, 2)]
        "(" [(1, 0), (1, 1)]
        (ERROR [(1, 1), (1, 2)])
      )
      
      Text
      (]
      

# opening bracket2, unmatched closing bracket

    Code
      node_children_print(node)
    Output
      S-Expression
      (identifier [(1, 0), (1, 1)])
      
      Text
      x
      
      S-Expression
      (ERROR [(1, 1), (1, 5)]
        "[[" [(1, 1), (1, 3)]
        (ERROR [(1, 4), (1, 5)])
      )
      
      Text
      [[2]
      

# opening bracket and bracket2, unmatched closing bracket

    Code
      node_children_print(node)
    Output
      S-Expression
      (identifier [(1, 0), (1, 1)])
      
      Text
      x
      
      S-Expression
      (ERROR [(1, 1), (1, 7)]
        "[" [(1, 1), (1, 2)]
        (identifier [(1, 2), (1, 3)])
        "[[" [(1, 3), (1, 5)]
        (ERROR [(1, 6), (1, 7)])
      )
      
      Text
      [y[[2]
      

# opening bracket2 and bracket, matched closing bracket

    Code
      node_children_print(node)
    Output
      S-Expression
      (subset2 [(1, 0), (1, 7)]
        function: (identifier [(1, 0), (1, 1)])
        arguments: (arguments [(1, 1), (1, 7)]
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
          close: "]]" MISSING [(1, 7), (1, 7)]
        )
      )
      
      Text
      x[[y[2]
      

# opening bracket2 and bracket, unmatched closing bracket

    Code
      node_children_print(node)
    Output
      S-Expression
      (identifier [(1, 0), (1, 1)])
      
      Text
      x
      
      S-Expression
      (ERROR [(1, 1), (1, 8)]
        "[[" [(1, 1), (1, 3)]
        (subset [(1, 3), (1, 7)]
          function: (identifier [(1, 3), (1, 4)])
          arguments: (arguments [(1, 4), (1, 7)]
            open: "[" [(1, 4), (1, 5)]
            argument: (argument [(1, 5), (1, 6)]
              value: (float [(1, 5), (1, 6)])
            )
            close: "]" [(1, 6), (1, 7)]
          )
        )
        (ERROR [(1, 7), (1, 8)])
      )
      
      Text
      [[y[2]]
      

# for no closing `)`

    Code
      node_children_print(node)
    Output
      S-Expression
      (ERROR [(1, 0), (3, 7)]
        "for" [(1, 0), (1, 3)]
        "(" [(1, 4), (1, 5)]
        (identifier [(1, 5), (1, 6)])
        "in" [(1, 7), (1, 9)]
        (binary_operator [(1, 10), (3, 7)]
          lhs: (identifier [(1, 10), (1, 13)])
          (ERROR [(3, 2), (3, 3)])
          operator: "+" [(3, 4), (3, 5)]
          rhs: (float [(3, 6), (3, 7)])
        )
      )
      
      Text
      for (i in vec
      
        1 + 1
      

