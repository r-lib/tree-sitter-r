# anonymous missing node

    Code
      node_children_print(node)
    Output
      S-Expression
      (braced_expression [(1, 0), (4, 0)]
        open: "{" [(1, 0), (1, 1)]
        body: (braced_expression [(1, 1), (3, 1)]
          open: "{" [(1, 1), (1, 2)]
          body: (binary_operator [(2, 2), (2, 7)]
            lhs: (float [(2, 2), (2, 3)])
            operator: "+" [(2, 4), (2, 5)]
            rhs: (float [(2, 6), (2, 7)])
          )
          close: "}" [(3, 0), (3, 1)]
        )
        close: "}" MISSING [(4, 0), (4, 0)]
      )
      
      Text
      {{
        1 + 2
      }
      
      

# named missing node

    Code
      node_children_print(node)
    Output
      S-Expression
      (while_statement [(1, 0), (1, 13)]
        "while" [(1, 0), (1, 5)]
        open: "(" [(1, 6), (1, 7)]
        condition: (binary_operator [(1, 7), (1, 12)]
          lhs: (identifier [(1, 7), (1, 8)])
          operator: ">" [(1, 9), (1, 10)]
          rhs: (identifier [(1, 11), (1, 12)])
        )
        close: ")" [(1, 12), (1, 13)]
        body: (identifier MISSING [(1, 13), (1, 13)])
      )
      
      Text
      while (a > b)
      

