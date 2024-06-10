# unclosed double quote

    Code
      node_children_print(node)
    Output
      S-Expression
      (string [(1, 0), (2, 0)]
        "\"" [(1, 0), (1, 1)]
        content: (string_content [(1, 1), (2, 0)]
          (escape_sequence [(1, 1), (1, 3)])
        )
        "\"" MISSING [(2, 0), (2, 0)]
      )
      
      Text
      "\"
      
      

# unclosed single quote

    Code
      node_children_print(node)
    Output
      S-Expression
      (string [(1, 0), (3, 0)]
        "'" [(1, 0), (1, 1)]
        content: (string_content [(1, 1), (3, 0)]
          (escape_sequence [(1, 1), (1, 3)])
        )
        "'" MISSING [(3, 0), (3, 0)]
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
      

