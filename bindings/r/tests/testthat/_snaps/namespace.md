# namespace

    Code
      node_children_print(node)
    Output
      S-Expression
      (namespace_operator [(1, 0), (1, 5)]
        lhs: (identifier [(1, 0), (1, 3)])
        operator: "::" [(1, 3), (1, 5)]
      )
      
      Text
      foo::
      
      S-Expression
      (namespace_operator [(2, 0), (2, 8)]
        lhs: (identifier [(2, 0), (2, 3)])
        operator: "::" [(2, 3), (2, 5)]
        rhs: (identifier [(2, 5), (2, 8)])
      )
      
      Text
      foo::bar
      
      S-Expression
      (call [(3, 0), (3, 11)]
        function: (namespace_operator [(3, 0), (3, 8)]
          lhs: (identifier [(3, 0), (3, 3)])
          operator: "::" [(3, 3), (3, 5)]
          rhs: (identifier [(3, 5), (3, 8)])
        )
        arguments: (arguments [(3, 8), (3, 11)]
          open: "(" [(3, 8), (3, 9)]
          argument: (argument [(3, 9), (3, 10)]
            value: (float [(3, 9), (3, 10)])
          )
          close: ")" [(3, 10), (3, 11)]
        )
      )
      
      Text
      foo::bar(1)
      
      S-Expression
      (namespace_operator [(4, 0), (4, 8)]
        lhs: (identifier [(4, 0), (4, 3)])
        operator: "::" [(4, 3), (4, 5)]
        rhs: (dots [(4, 5), (4, 8)])
      )
      
      Text
      foo::...
      
      S-Expression
      (namespace_operator [(5, 0), (5, 8)]
        lhs: (identifier [(5, 0), (5, 3)])
        operator: "::" [(5, 3), (5, 5)]
        rhs: (dot_dot_i [(5, 5), (5, 8)])
      )
      
      Text
      foo::..1
      
      S-Expression
      (namespace_operator [(6, 0), (6, 8)]
        lhs: (dots [(6, 0), (6, 3)])
        operator: "::" [(6, 3), (6, 5)]
        rhs: (identifier [(6, 5), (6, 8)])
      )
      
      Text
      ...::foo
      
      S-Expression
      (namespace_operator [(7, 0), (7, 8)]
        lhs: (dot_dot_i [(7, 0), (7, 3)])
        operator: "::" [(7, 3), (7, 5)]
        rhs: (identifier [(7, 5), (7, 8)])
      )
      
      Text
      ..1::foo
      
      S-Expression
      (namespace_operator [(8, 0), (8, 8)]
        lhs: (dots [(8, 0), (8, 3)])
        operator: "::" [(8, 3), (8, 5)]
        rhs: (dots [(8, 5), (8, 8)])
      )
      
      Text
      ...::...
      
      S-Expression
      (namespace_operator [(9, 0), (9, 8)]
        lhs: (dot_dot_i [(9, 0), (9, 3)])
        operator: "::" [(9, 3), (9, 5)]
        rhs: (dot_dot_i [(9, 5), (9, 8)])
      )
      
      Text
      ..1::..1
      

# namespace internal

    Code
      node_children_print(node)
    Output
      S-Expression
      (namespace_operator [(1, 0), (1, 6)]
        lhs: (identifier [(1, 0), (1, 3)])
        operator: ":::" [(1, 3), (1, 6)]
      )
      
      Text
      foo:::
      
      S-Expression
      (namespace_operator [(2, 0), (2, 9)]
        lhs: (identifier [(2, 0), (2, 3)])
        operator: ":::" [(2, 3), (2, 6)]
        rhs: (identifier [(2, 6), (2, 9)])
      )
      
      Text
      foo:::bar
      
      S-Expression
      (call [(3, 0), (3, 12)]
        function: (namespace_operator [(3, 0), (3, 9)]
          lhs: (identifier [(3, 0), (3, 3)])
          operator: ":::" [(3, 3), (3, 6)]
          rhs: (identifier [(3, 6), (3, 9)])
        )
        arguments: (arguments [(3, 9), (3, 12)]
          open: "(" [(3, 9), (3, 10)]
          argument: (argument [(3, 10), (3, 11)]
            value: (float [(3, 10), (3, 11)])
          )
          close: ")" [(3, 11), (3, 12)]
        )
      )
      
      Text
      foo:::bar(1)
      
      S-Expression
      (namespace_operator [(4, 0), (4, 9)]
        lhs: (identifier [(4, 0), (4, 3)])
        operator: ":::" [(4, 3), (4, 6)]
        rhs: (dots [(4, 6), (4, 9)])
      )
      
      Text
      foo:::...
      
      S-Expression
      (namespace_operator [(5, 0), (5, 9)]
        lhs: (identifier [(5, 0), (5, 3)])
        operator: ":::" [(5, 3), (5, 6)]
        rhs: (dot_dot_i [(5, 6), (5, 9)])
      )
      
      Text
      foo:::..1
      
      S-Expression
      (namespace_operator [(6, 0), (6, 9)]
        lhs: (dots [(6, 0), (6, 3)])
        operator: ":::" [(6, 3), (6, 6)]
        rhs: (identifier [(6, 6), (6, 9)])
      )
      
      Text
      ...:::foo
      
      S-Expression
      (namespace_operator [(7, 0), (7, 9)]
        lhs: (dot_dot_i [(7, 0), (7, 3)])
        operator: ":::" [(7, 3), (7, 6)]
        rhs: (identifier [(7, 6), (7, 9)])
      )
      
      Text
      ..1:::foo
      
      S-Expression
      (namespace_operator [(8, 0), (8, 9)]
        lhs: (dots [(8, 0), (8, 3)])
        operator: ":::" [(8, 3), (8, 6)]
        rhs: (dots [(8, 6), (8, 9)])
      )
      
      Text
      ...:::...
      
      S-Expression
      (namespace_operator [(9, 0), (9, 9)]
        lhs: (dot_dot_i [(9, 0), (9, 3)])
        operator: ":::" [(9, 3), (9, 6)]
        rhs: (dot_dot_i [(9, 6), (9, 9)])
      )
      
      Text
      ..1:::..1
      

# namespace missing rhs

    Code
      node_children_print(node)
    Output
      S-Expression
      (comment [(1, 0), (1, 79)])
      
      Text
      # It's nice that `::` allows an optional RHS and enforces that it can only be a
      
      S-Expression
      (comment [(2, 0), (2, 78)])
      
      Text
      # string or identifier, so this gives us a pretty clean tree even though it is
      
      S-Expression
      (comment [(3, 0), (3, 17)])
      
      Text
      # invalid R code.
      
      S-Expression
      (comment [(4, 0), (4, 50)])
      
      Text
      # https://github.com/r-lib/tree-sitter-r/issues/65
      
      S-Expression
      (call [(5, 0), (5, 16)]
        function: (identifier [(5, 0), (5, 7)])
        arguments: (arguments [(5, 7), (5, 16)]
          open: "(" [(5, 7), (5, 8)]
          argument: (argument [(5, 8), (5, 15)]
            value: (namespace_operator [(5, 8), (5, 15)]
              lhs: (identifier [(5, 8), (5, 13)])
              operator: "::" [(5, 13), (5, 15)]
            )
          )
          close: ")" [(5, 15), (5, 16)]
        )
      )
      
      Text
      library(dplyr::)
      
      S-Expression
      (call [(7, 0), (7, 9)]
        function: (identifier [(7, 0), (7, 7)])
        arguments: (arguments [(7, 7), (7, 9)]
          open: "(" [(7, 7), (7, 8)]
          close: ")" [(7, 8), (7, 9)]
        )
      )
      
      Text
      library()
      
      S-Expression
      (float [(9, 0), (9, 1)])
      
      Text
      1
      
      S-Expression
      (float [(10, 0), (10, 1)])
      
      Text
      2
      
      S-Expression
      (float [(11, 0), (11, 1)])
      
      Text
      3
      

