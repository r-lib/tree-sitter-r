# namespace

    Code
      node_children_print(x)
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
      node_children_print(x)
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
      node_children_print(x)
    Output
      S-Expression
      (call [(1, 0), (1, 16)]
        function: (identifier [(1, 0), (1, 7)])
        arguments: (arguments [(1, 7), (1, 16)]
          "(" [(1, 7), (1, 8)]
          argument: (argument [(1, 8), (1, 15)]
            value: (namespace_operator [(1, 8), (1, 15)]
              lhs: (identifier [(1, 8), (1, 13)])
              operator: "::" [(1, 13), (1, 15)]
            )
          )
          ")" [(1, 15), (1, 16)]
        )
      )
      
      Text
      library(dplyr::)
      
      S-Expression
      (call [(3, 0), (3, 9)]
        function: (identifier [(3, 0), (3, 7)])
        arguments: (arguments [(3, 7), (3, 9)]
          "(" [(3, 7), (3, 8)]
          ")" [(3, 8), (3, 9)]
        )
      )
      
      Text
      library()
      
      S-Expression
      (float [(5, 0), (5, 1)])
      
      Text
      1
      
      S-Expression
      (float [(6, 0), (6, 1)])
      
      Text
      2
      
      S-Expression
      (float [(7, 0), (7, 1)])
      
      Text
      3
      

