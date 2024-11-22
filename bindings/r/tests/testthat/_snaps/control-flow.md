# if

    Code
      node_children_print(node)
    Output
      S-Expression
      (if_statement [(1, 0), (2, 8)]
        "if" [(1, 0), (1, 2)]
        open: "(" [(1, 3), (1, 4)]
        condition: (identifier [(1, 4), (1, 5)])
        close: ")" [(1, 5), (1, 6)]
        consequence: (call [(2, 2), (2, 8)]
          function: (identifier [(2, 2), (2, 5)])
          arguments: (arguments [(2, 5), (2, 8)]
            open: "(" [(2, 5), (2, 6)]
            argument: (argument [(2, 6), (2, 7)]
              value: (identifier [(2, 6), (2, 7)])
            )
            close: ")" [(2, 7), (2, 8)]
          )
        )
      )
      
      Text
      if (x)
        log(y)
      
      S-Expression
      (if_statement [(4, 0), (7, 1)]
        "if" [(4, 0), (4, 2)]
        open: "(" [(4, 3), (4, 4)]
        condition: (identifier [(4, 4), (4, 7)])
        close: ")" [(4, 7), (4, 8)]
        consequence: (braced_expression [(4, 9), (7, 1)]
          open: "{" [(4, 9), (4, 10)]
          body: (call [(5, 2), (5, 8)]
            function: (identifier [(5, 2), (5, 5)])
            arguments: (arguments [(5, 5), (5, 8)]
              open: "(" [(5, 5), (5, 6)]
              argument: (argument [(5, 6), (5, 7)]
                value: (identifier [(5, 6), (5, 7)])
              )
              close: ")" [(5, 7), (5, 8)]
            )
          )
          body: (identifier [(6, 2), (6, 3)])
          close: "}" [(7, 0), (7, 1)]
        )
      )
      
      Text
      if (a.b) {
        log(c)
        d
      }
      
      S-Expression
      (if_statement [(9, 0), (14, 1)]
        "if" [(9, 0), (9, 2)]
        open: "(" [(9, 3), (9, 4)]
        condition: (binary_operator [(10, 2), (11, 3)]
          lhs: (identifier [(10, 2), (10, 3)])
          operator: "<" [(10, 4), (10, 5)]
          rhs: (identifier [(11, 2), (11, 3)])
        )
        close: ")" [(12, 0), (12, 1)]
        consequence: (braced_expression [(12, 2), (14, 1)]
          open: "{" [(12, 2), (12, 3)]
          body: (identifier [(13, 2), (13, 3)])
          close: "}" [(14, 0), (14, 1)]
        )
      )
      
      Text
      if (
        x <
        y
      ) {
        z
      }
      

# if else

    Code
      node_children_print(node)
    Output
      S-Expression
      (if_statement [(1, 0), (3, 3)]
        "if" [(1, 0), (1, 2)]
        open: "(" [(1, 3), (1, 4)]
        condition: (identifier [(1, 4), (1, 5)])
        close: ")" [(1, 5), (1, 6)]
        consequence: (identifier [(2, 2), (2, 3)])
        "else" [(2, 4), (2, 8)]
        alternative: (if_statement [(2, 9), (3, 3)]
          "if" [(2, 9), (2, 11)]
          open: "(" [(2, 12), (2, 13)]
          condition: (identifier [(2, 13), (2, 14)])
          close: ")" [(2, 14), (2, 15)]
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
        open: "(" [(5, 3), (5, 4)]
        condition: (identifier [(5, 4), (5, 5)])
        close: ")" [(5, 5), (5, 6)]
        consequence: (identifier [(6, 2), (6, 3)])
        "else" [(6, 4), (6, 8)]
        alternative: (if_statement [(6, 9), (7, 10)]
          "if" [(6, 9), (6, 11)]
          open: "(" [(6, 12), (6, 13)]
          condition: (identifier [(6, 13), (6, 14)])
          close: ")" [(6, 14), (6, 15)]
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
        open: "(" [(9, 3), (9, 4)]
        condition: (identifier [(9, 4), (9, 5)])
        close: ")" [(9, 5), (9, 6)]
        consequence: (braced_expression [(9, 7), (12, 1)]
          open: "{" [(9, 7), (9, 8)]
          body: (identifier [(10, 2), (10, 3)])
          body: (identifier [(11, 2), (11, 3)])
          close: "}" [(12, 0), (12, 1)]
        )
        "else" [(12, 2), (12, 6)]
        alternative: (braced_expression [(12, 7), (14, 1)]
          open: "{" [(12, 7), (12, 8)]
          body: (identifier [(13, 2), (13, 3)])
          close: "}" [(14, 0), (14, 1)]
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
        open: "(" [(2, 3), (2, 4)]
        condition: (true [(2, 4), (2, 8)])
        close: ")" [(2, 8), (2, 9)]
        consequence: (braced_expression [(2, 10), (4, 1)]
          open: "{" [(2, 10), (2, 11)]
          body: (float [(3, 2), (3, 3)])
          close: "}" [(4, 0), (4, 1)]
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
        open: "{" [(5, 5), (5, 6)]
        body: (float [(6, 2), (6, 3)])
        close: "}" [(7, 0), (7, 1)]
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
        open: "(" [(10, 3), (10, 4)]
        condition: (true [(10, 4), (10, 8)])
        close: ")" [(10, 8), (10, 9)]
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
        open: "{" [(16, 0), (16, 1)]
        body: (if_statement [(17, 2), (22, 3)]
          "if" [(17, 2), (17, 4)]
          open: "(" [(17, 5), (17, 6)]
          condition: (true [(17, 6), (17, 10)])
          close: ")" [(17, 10), (17, 11)]
          consequence: (braced_expression [(17, 12), (19, 3)]
            open: "{" [(17, 12), (17, 13)]
            body: (float [(18, 4), (18, 5)])
            close: "}" [(19, 2), (19, 3)]
          )
          "else" [(20, 2), (20, 6)]
          alternative: (braced_expression [(20, 7), (22, 3)]
            open: "{" [(20, 7), (20, 8)]
            body: (float [(21, 4), (21, 5)])
            close: "}" [(22, 2), (22, 3)]
          )
        )
        close: "}" [(23, 0), (23, 1)]
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
        open: "{" [(26, 0), (26, 1)]
        body: (if_statement [(27, 2), (36, 3)]
          "if" [(27, 2), (27, 4)]
          open: "(" [(27, 5), (27, 6)]
          condition: (true [(27, 6), (27, 10)])
          close: ")" [(27, 10), (27, 11)]
          consequence: (braced_expression [(27, 12), (29, 3)]
            open: "{" [(27, 12), (27, 13)]
            body: (float [(28, 4), (28, 5)])
            close: "}" [(29, 2), (29, 3)]
          )
          (comment [(30, 2), (30, 12)])
          (comment [(32, 2), (32, 16)])
          "else" [(34, 2), (34, 6)]
          alternative: (braced_expression [(34, 7), (36, 3)]
            open: "{" [(34, 7), (34, 8)]
            body: (float [(35, 4), (35, 5)])
            close: "}" [(36, 2), (36, 3)]
          )
        )
        close: "}" [(37, 0), (37, 1)]
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
      
      S-Expression
      (comment [(39, 0), (39, 80)])
      
      Text
      # Valid. This test ensures we handle the newline after `1 + 1` correctly (#125).
      
      S-Expression
      (braced_expression [(40, 0), (44, 1)]
        open: "{" [(40, 0), (40, 1)]
        body: (if_statement [(41, 2), (43, 9)]
          "if" [(41, 2), (41, 4)]
          open: "(" [(41, 5), (41, 6)]
          condition: (true [(41, 6), (41, 10)])
          close: ")" [(41, 10), (41, 11)]
          consequence: (binary_operator [(43, 4), (43, 9)]
            lhs: (float [(43, 4), (43, 5)])
            operator: "+" [(43, 6), (43, 7)]
            rhs: (float [(43, 8), (43, 9)])
          )
        )
        close: "}" [(44, 0), (44, 1)]
      )
      
      Text
      {
        if (TRUE)
      
          1 + 1
      }
      
      S-Expression
      (comment [(46, 0), (46, 97)])
      
      Text
      # Valid. Newlines are allowed between the `else` and the `alternative`, even at top level (#141).
      
      S-Expression
      (if_statement [(47, 0), (52, 1)]
        "if" [(47, 0), (47, 2)]
        open: "(" [(47, 3), (47, 4)]
        condition: (true [(47, 4), (47, 8)])
        close: ")" [(47, 8), (47, 9)]
        consequence: (braced_expression [(47, 10), (49, 1)]
          open: "{" [(47, 10), (47, 11)]
          body: (float [(48, 2), (48, 3)])
          close: "}" [(49, 0), (49, 1)]
        )
        "else" [(49, 2), (49, 6)]
        alternative: (braced_expression [(50, 0), (52, 1)]
          open: "{" [(50, 0), (50, 1)]
          body: (float [(51, 2), (51, 3)])
          close: "}" [(52, 0), (52, 1)]
        )
      )
      
      Text
      if (TRUE) {
        1
      } else
      {
        2
      }
      
      S-Expression
      (comment [(54, 0), (54, 84)])
      
      Text
      # Valid. Same as above but in `{ }` so it is valid no matter where the newlines are.
      
      S-Expression
      (braced_expression [(55, 0), (62, 1)]
        open: "{" [(55, 0), (55, 1)]
        body: (if_statement [(56, 2), (61, 3)]
          "if" [(56, 2), (56, 4)]
          open: "(" [(56, 5), (56, 6)]
          condition: (true [(56, 6), (56, 10)])
          close: ")" [(56, 10), (56, 11)]
          consequence: (braced_expression [(56, 12), (58, 3)]
            open: "{" [(56, 12), (56, 13)]
            body: (float [(57, 4), (57, 5)])
            close: "}" [(58, 2), (58, 3)]
          )
          "else" [(58, 4), (58, 8)]
          alternative: (braced_expression [(59, 2), (61, 3)]
            open: "{" [(59, 2), (59, 3)]
            body: (float [(60, 4), (60, 5)])
            close: "}" [(61, 2), (61, 3)]
          )
        )
        close: "}" [(62, 0), (62, 1)]
      )
      
      Text
      {
        if (TRUE) {
          1
        } else
        {
          2
        }
      }
      
      S-Expression
      (comment [(64, 0), (64, 103)])
      
      Text
      # Valid. Newlines and comments are allowed between the `else` and the `alternative`, even at top level.
      
      S-Expression
      (if_statement [(65, 0), (72, 1)]
        "if" [(65, 0), (65, 2)]
        open: "(" [(65, 3), (65, 4)]
        condition: (true [(65, 4), (65, 8)])
        close: ")" [(65, 8), (65, 9)]
        consequence: (braced_expression [(65, 10), (67, 1)]
          open: "{" [(65, 10), (65, 11)]
          body: (float [(66, 2), (66, 3)])
          close: "}" [(67, 0), (67, 1)]
        )
        "else" [(67, 2), (67, 6)]
        (comment [(69, 0), (69, 21)])
        alternative: (braced_expression [(70, 0), (72, 1)]
          open: "{" [(70, 0), (70, 1)]
          body: (float [(71, 2), (71, 3)])
          close: "}" [(72, 0), (72, 1)]
        )
      )
      
      Text
      if (TRUE) {
        1
      } else
      
      # do this alternative
      {
        2
      }
      
      S-Expression
      (comment [(74, 0), (74, 90)])
      
      Text
      # Valid. Newlines are allowed between the `else` and the `alternative`, even at top level.
      
      S-Expression
      (if_statement [(75, 0), (76, 3)]
        "if" [(75, 0), (75, 2)]
        open: "(" [(75, 3), (75, 4)]
        condition: (true [(75, 4), (75, 8)])
        close: ")" [(75, 8), (75, 9)]
        consequence: (float [(75, 10), (75, 11)])
        "else" [(75, 12), (75, 16)]
        alternative: (float [(76, 2), (76, 3)])
      )
      
      Text
      if (TRUE) 1 else
        2
      

# for

    Code
      node_children_print(node)
    Output
      S-Expression
      (for_statement [(1, 0), (2, 3)]
        "for" [(1, 0), (1, 3)]
        open: "(" [(1, 4), (1, 5)]
        variable: (identifier [(1, 5), (1, 6)])
        "in" [(1, 7), (1, 9)]
        sequence: (identifier [(1, 10), (1, 11)])
        close: ")" [(1, 11), (1, 12)]
        body: (identifier [(2, 2), (2, 3)])
      )
      
      Text
      for (x in y)
        f
      
      S-Expression
      (for_statement [(4, 0), (8, 1)]
        "for" [(4, 0), (4, 3)]
        open: "(" [(4, 4), (4, 5)]
        variable: (identifier [(4, 5), (4, 6)])
        "in" [(4, 7), (4, 9)]
        sequence: (binary_operator [(4, 10), (4, 13)]
          lhs: (float [(4, 10), (4, 11)])
          operator: ":" [(4, 11), (4, 12)]
          rhs: (float [(4, 12), (4, 13)])
        )
        close: ")" [(4, 13), (4, 14)]
        body: (braced_expression [(4, 15), (8, 1)]
          open: "{" [(4, 15), (4, 16)]
          body: (for_statement [(5, 2), (7, 3)]
            "for" [(5, 2), (5, 5)]
            open: "(" [(5, 6), (5, 7)]
            variable: (identifier [(5, 7), (5, 8)])
            "in" [(5, 9), (5, 11)]
            sequence: (identifier [(5, 12), (5, 14)])
            close: ")" [(5, 14), (5, 15)]
            body: (braced_expression [(5, 16), (7, 3)]
              open: "{" [(5, 16), (5, 17)]
              body: (identifier [(6, 4), (6, 5)])
              close: "}" [(7, 2), (7, 3)]
            )
          )
          close: "}" [(8, 0), (8, 1)]
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
        open: "(" [(10, 4), (10, 5)]
        variable: (identifier [(10, 5), (10, 6)])
        "in" [(10, 7), (10, 9)]
        sequence: (identifier [(10, 10), (10, 11)])
        close: ")" [(10, 11), (10, 12)]
        body: (for_statement [(10, 13), (10, 31)]
          "for" [(10, 13), (10, 16)]
          open: "(" [(10, 17), (10, 18)]
          variable: (identifier [(10, 18), (10, 19)])
          "in" [(10, 20), (10, 22)]
          sequence: (identifier [(10, 23), (10, 24)])
          close: ")" [(10, 24), (10, 25)]
          body: (binary_operator [(10, 26), (10, 31)]
            lhs: (identifier [(10, 26), (10, 27)])
            operator: "+" [(10, 28), (10, 29)]
            rhs: (identifier [(10, 30), (10, 31)])
          )
        )
      )
      
      Text
      for (x in y) for (y in z) x + y
      
      S-Expression
      (comment [(12, 0), (12, 25)])
      
      Text
      # `...` as the `variable`
      
      S-Expression
      (for_statement [(13, 0), (13, 34)]
        "for" [(13, 0), (13, 3)]
        open: "(" [(13, 4), (13, 5)]
        variable: (dots [(13, 5), (13, 8)])
        "in" [(13, 9), (13, 11)]
        sequence: (binary_operator [(13, 12), (13, 15)]
          lhs: (float [(13, 12), (13, 13)])
          operator: ":" [(13, 13), (13, 14)]
          rhs: (float [(13, 14), (13, 15)])
        )
        close: ")" [(13, 15), (13, 16)]
        body: (call [(13, 17), (13, 34)]
          function: (identifier [(13, 17), (13, 22)])
          arguments: (arguments [(13, 22), (13, 34)]
            open: "(" [(13, 22), (13, 23)]
            argument: (argument [(13, 23), (13, 33)]
              value: (call [(13, 23), (13, 33)]
                function: (identifier [(13, 23), (13, 26)])
                arguments: (arguments [(13, 26), (13, 33)]
                  open: "(" [(13, 26), (13, 27)]
                  argument: (argument [(13, 27), (13, 32)]
                    value: (string [(13, 27), (13, 32)]
                      "\"" [(13, 27), (13, 28)]
                      content: (string_content [(13, 28), (13, 31)])
                      "\"" [(13, 31), (13, 32)]
                    )
                  )
                  close: ")" [(13, 32), (13, 33)]
                )
              )
            )
            close: ")" [(13, 33), (13, 34)]
          )
        )
      )
      
      Text
      for (... in 1:2) print(get("..."))
      
      S-Expression
      (comment [(15, 0), (15, 25)])
      
      Text
      # `..i` as the `variable`
      
      S-Expression
      (for_statement [(16, 0), (16, 34)]
        "for" [(16, 0), (16, 3)]
        open: "(" [(16, 4), (16, 5)]
        variable: (dot_dot_i [(16, 5), (16, 8)])
        "in" [(16, 9), (16, 11)]
        sequence: (binary_operator [(16, 12), (16, 15)]
          lhs: (float [(16, 12), (16, 13)])
          operator: ":" [(16, 13), (16, 14)]
          rhs: (float [(16, 14), (16, 15)])
        )
        close: ")" [(16, 15), (16, 16)]
        body: (call [(16, 17), (16, 34)]
          function: (identifier [(16, 17), (16, 22)])
          arguments: (arguments [(16, 22), (16, 34)]
            open: "(" [(16, 22), (16, 23)]
            argument: (argument [(16, 23), (16, 33)]
              value: (call [(16, 23), (16, 33)]
                function: (identifier [(16, 23), (16, 26)])
                arguments: (arguments [(16, 26), (16, 33)]
                  open: "(" [(16, 26), (16, 27)]
                  argument: (argument [(16, 27), (16, 32)]
                    value: (string [(16, 27), (16, 32)]
                      "\"" [(16, 27), (16, 28)]
                      content: (string_content [(16, 28), (16, 31)])
                      "\"" [(16, 31), (16, 32)]
                    )
                  )
                  close: ")" [(16, 32), (16, 33)]
                )
              )
            )
            close: ")" [(16, 33), (16, 34)]
          )
        )
      )
      
      Text
      for (..1 in 1:2) print(get("..1"))
      

# for no body

    Code
      node_children_print(node)
    Output
      S-Expression
      (for_statement [(1, 0), (2, 0)]
        "for" [(1, 0), (1, 3)]
        open: "(" [(1, 4), (1, 5)]
        variable: (identifier [(1, 5), (1, 6)])
        "in" [(1, 7), (1, 9)]
        sequence: (binary_operator [(1, 10), (1, 13)]
          lhs: (float [(1, 10), (1, 11)])
          operator: ":" [(1, 11), (1, 12)]
          rhs: (float [(1, 12), (1, 13)])
        )
        close: ")" [(1, 13), (1, 14)]
        body: (identifier MISSING [(2, 0), (2, 0)])
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
        open: "(" [(1, 5), (1, 6)]
        condition: (true [(1, 6), (1, 10)])
        close: ")" [(1, 10), (1, 11)]
        body: (identifier [(2, 2), (2, 5)])
      )
      
      Text
      while(TRUE)
        bar
      
      S-Expression
      (while_statement [(4, 0), (5, 12)]
        "while" [(4, 0), (4, 5)]
        open: "(" [(4, 5), (4, 6)]
        condition: (binary_operator [(4, 6), (4, 11)]
          lhs: (identifier [(4, 6), (4, 7)])
          operator: ">" [(4, 8), (4, 9)]
          rhs: (float [(4, 10), (4, 11)])
        )
        close: ")" [(4, 11), (4, 12)]
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
        open: "(" [(7, 5), (7, 6)]
        condition: (true [(7, 6), (7, 10)])
        close: ")" [(7, 10), (7, 11)]
        body: (break [(8, 2), (8, 7)])
      )
      
      Text
      while(TRUE)
        break
      
      S-Expression
      (while_statement [(10, 0), (11, 6)]
        "while" [(10, 0), (10, 5)]
        open: "(" [(10, 5), (10, 6)]
        condition: (true [(10, 6), (10, 10)])
        close: ")" [(10, 10), (10, 11)]
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
        open: "(" [(1, 6), (1, 7)]
        condition: (binary_operator [(1, 7), (1, 12)]
          lhs: (identifier [(1, 7), (1, 8)])
          operator: "<" [(1, 9), (1, 10)]
          rhs: (identifier [(1, 11), (1, 12)])
        )
        close: ")" [(1, 12), (1, 13)]
        body: (identifier MISSING [(2, 0), (2, 0)])
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
      (repeat_statement [(1, 0), (3, 90)]
        "repeat" [(1, 0), (1, 6)]
        (comment [(3, 0), (3, 90)])
        body: (identifier MISSING [(3, 90), (3, 90)])
      )
      
      Text
      repeat
      
      # dummy comment to retain a newline after the `repeat` (can remove if we add another test)
      

