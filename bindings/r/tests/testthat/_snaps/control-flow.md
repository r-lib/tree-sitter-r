# if

    Code
      node_children_print(node)
    Output
      S-Expression
      (if_statement [(1, 0), (2, 8)]
        "if" [(1, 0), (1, 2)]
        "(" [(1, 3), (1, 4)]
        condition: (identifier [(1, 4), (1, 5)])
        ")" [(1, 5), (1, 6)]
        consequence: (call [(2, 2), (2, 8)]
          function: (identifier [(2, 2), (2, 5)])
          arguments: (arguments [(2, 5), (2, 8)]
            "(" [(2, 5), (2, 6)]
            argument: (argument [(2, 6), (2, 7)]
              value: (identifier [(2, 6), (2, 7)])
            )
            ")" [(2, 7), (2, 8)]
          )
        )
      )
      
      Text
      if (x)
        log(y)
      
      S-Expression
      (if_statement [(4, 0), (7, 1)]
        "if" [(4, 0), (4, 2)]
        "(" [(4, 3), (4, 4)]
        condition: (identifier [(4, 4), (4, 7)])
        ")" [(4, 7), (4, 8)]
        consequence: (braced_expression [(4, 9), (7, 1)]
          "{" [(4, 9), (4, 10)]
          body: (call [(5, 2), (5, 8)]
            function: (identifier [(5, 2), (5, 5)])
            arguments: (arguments [(5, 5), (5, 8)]
              "(" [(5, 5), (5, 6)]
              argument: (argument [(5, 6), (5, 7)]
                value: (identifier [(5, 6), (5, 7)])
              )
              ")" [(5, 7), (5, 8)]
            )
          )
          body: (identifier [(6, 2), (6, 3)])
          "}" [(7, 0), (7, 1)]
        )
      )
      
      Text
      if (a.b) {
        log(c)
        d
      }
      

# if else

    Code
      node_children_print(node)
    Output
      S-Expression
      (if_statement [(1, 0), (3, 3)]
        "if" [(1, 0), (1, 2)]
        "(" [(1, 3), (1, 4)]
        condition: (identifier [(1, 4), (1, 5)])
        ")" [(1, 5), (1, 6)]
        consequence: (identifier [(2, 2), (2, 3)])
        "else" [(2, 4), (2, 8)]
        alternative: (if_statement [(2, 9), (3, 3)]
          "if" [(2, 9), (2, 11)]
          "(" [(2, 12), (2, 13)]
          condition: (identifier [(2, 13), (2, 14)])
          ")" [(2, 14), (2, 15)]
          consequence: (identifier [(3, 2), (3, 3)])
        )
      )
      
      Text
      if (x)
        y else if (a)
        b
      
      S-Expression
      (if_statement [(5, 0), (7, 10)]
        "if" [(5, 0), (5, 2)]
        "(" [(5, 3), (5, 4)]
        condition: (identifier [(5, 4), (5, 5)])
        ")" [(5, 5), (5, 6)]
        consequence: (identifier [(6, 2), (6, 3)])
        "else" [(6, 4), (6, 8)]
        alternative: (if_statement [(6, 9), (7, 10)]
          "if" [(6, 9), (6, 11)]
          "(" [(6, 12), (6, 13)]
          condition: (identifier [(6, 13), (6, 14)])
          ")" [(6, 14), (6, 15)]
          consequence: (identifier [(7, 2), (7, 3)])
          "else" [(7, 4), (7, 8)]
          alternative: (identifier [(7, 9), (7, 10)])
        )
      )
      
      Text
      if (x)
        y else if (a)
        b else d
      
      S-Expression
      (if_statement [(9, 0), (14, 1)]
        "if" [(9, 0), (9, 2)]
        "(" [(9, 3), (9, 4)]
        condition: (identifier [(9, 4), (9, 5)])
        ")" [(9, 5), (9, 6)]
        consequence: (braced_expression [(9, 7), (12, 1)]
          "{" [(9, 7), (9, 8)]
          body: (identifier [(10, 2), (10, 3)])
          body: (identifier [(11, 2), (11, 3)])
          "}" [(12, 0), (12, 1)]
        )
        "else" [(12, 2), (12, 6)]
        alternative: (braced_expression [(12, 7), (14, 1)]
          "{" [(12, 7), (12, 8)]
          body: (identifier [(13, 2), (13, 3)])
          "}" [(14, 0), (14, 1)]
        )
      )
      
      Text
      if (a) {
        c
        d
      } else {
        e
      }
      

# complex if statements

    Code
      node_children_print(node)
    Output
      S-Expression
      (comment [(1, 0), (1, 79)])
      
      Text
      # Invalid at top level due to newline before `else`, so not a real if statement
      
      S-Expression
      (if_statement [(2, 0), (4, 1)]
        "if" [(2, 0), (2, 2)]
        "(" [(2, 3), (2, 4)]
        condition: (true [(2, 4), (2, 8)])
        ")" [(2, 8), (2, 9)]
        consequence: (braced_expression [(2, 10), (4, 1)]
          "{" [(2, 10), (2, 11)]
          body: (float [(3, 2), (3, 3)])
          "}" [(4, 0), (4, 1)]
        )
      )
      
      Text
      if (TRUE) {
        1
      }
      
      S-Expression
      (identifier [(5, 0), (5, 4)])
      
      Text
      else
      
      S-Expression
      (braced_expression [(5, 5), (7, 1)]
        "{" [(5, 5), (5, 6)]
        body: (float [(6, 2), (6, 3)])
        "}" [(7, 0), (7, 1)]
      )
      
      Text
      {
        2
      }
      
      S-Expression
      (comment [(9, 0), (9, 34)])
      
      Text
      # Invalid for same reason as above
      
      S-Expression
      (if_statement [(10, 0), (11, 3)]
        "if" [(10, 0), (10, 2)]
        "(" [(10, 3), (10, 4)]
        condition: (true [(10, 4), (10, 8)])
        ")" [(10, 8), (10, 9)]
        consequence: (float [(11, 2), (11, 3)])
      )
      
      Text
      if (TRUE)
        1
      
      S-Expression
      (identifier [(12, 0), (12, 4)])
      
      Text
      else
      
      S-Expression
      (float [(13, 2), (13, 3)])
      
      Text
      2
      
      S-Expression
      (comment [(15, 0), (15, 68)])
      
      Text
      # Valid inside `{` only due to special `else` handling with newlines
      
      S-Expression
      (braced_expression [(16, 0), (23, 1)]
        "{" [(16, 0), (16, 1)]
        body: (if_statement [(17, 2), (22, 3)]
          "if" [(17, 2), (17, 4)]
          "(" [(17, 5), (17, 6)]
          condition: (true [(17, 6), (17, 10)])
          ")" [(17, 10), (17, 11)]
          consequence: (braced_expression [(17, 12), (19, 3)]
            "{" [(17, 12), (17, 13)]
            body: (float [(18, 4), (18, 5)])
            "}" [(19, 2), (19, 3)]
          )
          "else" [(20, 2), (20, 6)]
          alternative: (braced_expression [(20, 7), (22, 3)]
            "{" [(20, 7), (20, 8)]
            body: (float [(21, 4), (21, 5)])
            "}" [(22, 2), (22, 3)]
          )
        )
        "}" [(23, 0), (23, 1)]
      )
      
      Text
      {
        if (TRUE) {
          1
        }
        else {
          2
        }
      }
      
      S-Expression
      (comment [(25, 0), (25, 50)])
      
      Text
      # Valid with comments in special newline territory
      
      S-Expression
      (braced_expression [(26, 0), (37, 1)]
        "{" [(26, 0), (26, 1)]
        body: (if_statement [(27, 2), (36, 3)]
          "if" [(27, 2), (27, 4)]
          "(" [(27, 5), (27, 6)]
          condition: (true [(27, 6), (27, 10)])
          ")" [(27, 10), (27, 11)]
          consequence: (braced_expression [(27, 12), (29, 3)]
            "{" [(27, 12), (27, 13)]
            body: (float [(28, 4), (28, 5)])
            "}" [(29, 2), (29, 3)]
          )
          consequence: (comment [(30, 2), (30, 12)])
          consequence: (comment [(32, 2), (32, 16)])
          "else" [(34, 2), (34, 6)]
          alternative: (braced_expression [(34, 7), (36, 3)]
            "{" [(34, 7), (34, 8)]
            body: (float [(35, 4), (35, 5)])
            "}" [(36, 2), (36, 3)]
          )
        )
        "}" [(37, 0), (37, 1)]
      )
      
      Text
      {
        if (TRUE) {
          1
        }
        # hi there
      
        # another one!
      
        else {
          2
        }
      }
      

# for

    Code
      node_children_print(node)
    Output
      S-Expression
      (for_statement [(1, 0), (2, 3)]
        "for" [(1, 0), (1, 3)]
        "(" [(1, 4), (1, 5)]
        variable: (identifier [(1, 5), (1, 6)])
        "in" [(1, 7), (1, 9)]
        sequence: (identifier [(1, 10), (1, 11)])
        ")" [(1, 11), (1, 12)]
        body: (identifier [(2, 2), (2, 3)])
      )
      
      Text
      for (x in y)
        f
      
      S-Expression
      (for_statement [(4, 0), (8, 1)]
        "for" [(4, 0), (4, 3)]
        "(" [(4, 4), (4, 5)]
        variable: (identifier [(4, 5), (4, 6)])
        "in" [(4, 7), (4, 9)]
        sequence: (binary_operator [(4, 10), (4, 13)]
          lhs: (float [(4, 10), (4, 11)])
          operator: ":" [(4, 11), (4, 12)]
          rhs: (float [(4, 12), (4, 13)])
        )
        ")" [(4, 13), (4, 14)]
        body: (braced_expression [(4, 15), (8, 1)]
          "{" [(4, 15), (4, 16)]
          body: (for_statement [(5, 2), (7, 3)]
            "for" [(5, 2), (5, 5)]
            "(" [(5, 6), (5, 7)]
            variable: (identifier [(5, 7), (5, 8)])
            "in" [(5, 9), (5, 11)]
            sequence: (identifier [(5, 12), (5, 14)])
            ")" [(5, 14), (5, 15)]
            body: (braced_expression [(5, 16), (7, 3)]
              "{" [(5, 16), (5, 17)]
              body: (identifier [(6, 4), (6, 5)])
              "}" [(7, 2), (7, 3)]
            )
          )
          "}" [(8, 0), (8, 1)]
        )
      )
      
      Text
      for (x in 5:6) {
        for (y in ys) {
          z
        }
      }
      
      S-Expression
      (for_statement [(10, 0), (10, 31)]
        "for" [(10, 0), (10, 3)]
        "(" [(10, 4), (10, 5)]
        variable: (identifier [(10, 5), (10, 6)])
        "in" [(10, 7), (10, 9)]
        sequence: (identifier [(10, 10), (10, 11)])
        ")" [(10, 11), (10, 12)]
        body: (for_statement [(10, 13), (10, 31)]
          "for" [(10, 13), (10, 16)]
          "(" [(10, 17), (10, 18)]
          variable: (identifier [(10, 18), (10, 19)])
          "in" [(10, 20), (10, 22)]
          sequence: (identifier [(10, 23), (10, 24)])
          ")" [(10, 24), (10, 25)]
          body: (binary_operator [(10, 26), (10, 31)]
            lhs: (identifier [(10, 26), (10, 27)])
            operator: "+" [(10, 28), (10, 29)]
            rhs: (identifier [(10, 30), (10, 31)])
          )
        )
      )
      
      Text
      for (x in y) for (y in z) x + y
      

# for no body

    Code
      node_children_print(node)
    Output
      S-Expression
      (for_statement [(1, 0), (2, 0)]
        "for" [(1, 0), (1, 3)]
        "(" [(1, 4), (1, 5)]
        variable: (identifier [(1, 5), (1, 6)])
        "in" [(1, 7), (1, 9)]
        sequence: (binary_operator [(1, 10), (1, 13)]
          lhs: (float [(1, 10), (1, 11)])
          operator: ":" [(1, 11), (1, 12)]
          rhs: (float [(1, 12), (1, 13)])
        )
        ")" [(1, 13), (1, 14)]
      )
      
      Text
      for (i in 1:5)
      
      

# while

    Code
      node_children_print(node)
    Output
      S-Expression
      (while_statement [(1, 0), (2, 5)]
        "while" [(1, 0), (1, 5)]
        "(" [(1, 5), (1, 6)]
        condition: (true [(1, 6), (1, 10)])
        ")" [(1, 10), (1, 11)]
        body: (identifier [(2, 2), (2, 5)])
      )
      
      Text
      while(TRUE)
        bar
      
      S-Expression
      (while_statement [(4, 0), (5, 12)]
        "while" [(4, 0), (4, 5)]
        "(" [(4, 5), (4, 6)]
        condition: (binary_operator [(4, 6), (4, 11)]
          lhs: (identifier [(4, 6), (4, 7)])
          operator: ">" [(4, 8), (4, 9)]
          rhs: (float [(4, 10), (4, 11)])
        )
        ")" [(4, 11), (4, 12)]
        body: (binary_operator [(5, 2), (5, 12)]
          lhs: (identifier [(5, 2), (5, 3)])
          operator: "<-" [(5, 4), (5, 6)]
          rhs: (binary_operator [(5, 7), (5, 12)]
            lhs: (identifier [(5, 7), (5, 8)])
            operator: "-" [(5, 9), (5, 10)]
            rhs: (float [(5, 11), (5, 12)])
          )
        )
      )
      
      Text
      while(x > 0)
        x <- x - 1
      
      S-Expression
      (while_statement [(7, 0), (8, 7)]
        "while" [(7, 0), (7, 5)]
        "(" [(7, 5), (7, 6)]
        condition: (true [(7, 6), (7, 10)])
        ")" [(7, 10), (7, 11)]
        body: (break [(8, 2), (8, 7)])
      )
      
      Text
      while(TRUE)
        break
      
      S-Expression
      (while_statement [(10, 0), (11, 6)]
        "while" [(10, 0), (10, 5)]
        "(" [(10, 5), (10, 6)]
        condition: (true [(10, 6), (10, 10)])
        ")" [(10, 10), (10, 11)]
        body: (next [(11, 2), (11, 6)])
      )
      
      Text
      while(TRUE)
        next
      

# while no body

    Code
      node_children_print(node)
    Output
      S-Expression
      (while_statement [(1, 0), (2, 0)]
        "while" [(1, 0), (1, 5)]
        "(" [(1, 6), (1, 7)]
        condition: (binary_operator [(1, 7), (1, 12)]
          lhs: (identifier [(1, 7), (1, 8)])
          operator: "<" [(1, 9), (1, 10)]
          rhs: (identifier [(1, 11), (1, 12)])
        )
        ")" [(1, 12), (1, 13)]
      )
      
      Text
      while (a < b)
      
      

# repeat

    Code
      node_children_print(node)
    Output
      S-Expression
      (repeat_statement [(1, 0), (1, 8)]
        "repeat" [(1, 0), (1, 6)]
        body: (float [(1, 7), (1, 8)])
      )
      
      Text
      repeat 1
      

# repeat no body

    Code
      node_children_print(node)
    Output
      S-Expression
      (repeat_statement [(1, 0), (1, 6)]
        "repeat" [(1, 0), (1, 6)]
      )
      
      Text
      repeat
      

