# anonymous missing node

    Code
      node_children_print(node)
    Output
      S-Expression
      (for_statement [(1, 0), (1, 13)]
        "for" [(1, 0), (1, 3)]
        "(" [(1, 4), (1, 5)]
        variable: (identifier [(1, 5), (1, 6)])
        "in" [(1, 7), (1, 9)]
        sequence: (identifier [(1, 10), (1, 13)])
        ")" MISSING [(1, 13), (1, 13)]
      )
      
      Text
      for (i in vec
      

# named missing node

    Code
      node_children_print(node)
    Output
      S-Expression
      (binary_operator [(1, 0), (3, 0)]
        lhs: (float [(1, 0), (1, 1)])
        operator: "+" [(1, 2), (1, 3)]
        rhs: (identifier MISSING [(3, 0), (3, 0)])
      )
      
      Text
      1 +
      
      
      

