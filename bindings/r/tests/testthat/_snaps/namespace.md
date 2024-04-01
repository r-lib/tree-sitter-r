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
          "(" [(3, 8), (3, 9)]
          argument: (argument [(3, 9), (3, 10)]
            value: (float [(3, 9), (3, 10)])
          )
          ")" [(3, 10), (3, 11)]
        )
      )
      
      Text
      foo::bar(1)
      

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
          "(" [(3, 9), (3, 10)]
          argument: (argument [(3, 10), (3, 11)]
            value: (float [(3, 10), (3, 11)])
          )
          ")" [(3, 11), (3, 12)]
        )
      )
      
      Text
      foo:::bar(1)
      

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
          "(" [(5, 7), (5, 8)]
          argument: (argument [(5, 8), (5, 15)]
            value: (namespace_operator [(5, 8), (5, 15)]
              lhs: (identifier [(5, 8), (5, 13)])
              operator: "::" [(5, 13), (5, 15)]
            )
          )
          ")" [(5, 15), (5, 16)]
        )
      )
      
      Text
      library(dplyr::)
      
      S-Expression
      (call [(7, 0), (7, 9)]
        function: (identifier [(7, 0), (7, 7)])
        arguments: (arguments [(7, 7), (7, 9)]
          "(" [(7, 7), (7, 8)]
          ")" [(7, 8), (7, 9)]
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
      

