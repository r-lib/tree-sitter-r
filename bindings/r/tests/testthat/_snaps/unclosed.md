# unclosed double quote

    Code
      node_children_print(node)
    Output
      S-Expression
      (ERROR [(1, 0), (2, 0)]
        (ERROR [(1, 0), (2, 0)])
      )
      
      Text
      "\"
      
      

# unclosed single quote

    Code
      node_children_print(node)
    Output
      S-Expression
      (ERROR [(1, 0), (3, 0)]
        (ERROR [(1, 0), (3, 0)])
      )
      
      Text
      '\'
      
      
      

# unclosed backtick

    Code
      node_children_print(node)
    Output
      S-Expression
      (ERROR [(0, 0), (0, 3)]
        (ERROR [(0, 0), (0, 3)])
      )
      
      Text
      `\`
      

