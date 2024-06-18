# anonymous missing node

    Code
      node_children_print(node)
    Output
      S-Expression
      (for_statement [(1, 0), (1, 13)]
        "for" [(1, 0), (1, 3)]
        open: "(" [(1, 4), (1, 5)]
        variable: (identifier [(1, 5), (1, 6)])
        "in" [(1, 7), (1, 9)]
        sequence: (identifier [(1, 10), (1, 13)])
        close: ")" MISSING [(1, 13), (1, 13)]
      )
      
      Text
      for (i in vec
      

# named missing node

    Code
      node_children_print(node)
    Output
      S-Expression
      (braced_expression [(1, 0), (3, 1)]
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
        close: "}" MISSING [(3, 1), (3, 1)]
      )
      
      Text
      {{
        1 + 2
      }
      

