# leading newlines are not consumed before the `program` node, must start at (0, 0)! (#125)

    Code
      node_print(node)
    Output
      S-Expression
      (program [(0, 0), (2, 10)]
        (comment [(2, 0), (2, 10)])
      )
      
      Text
      
      
      # hi there

