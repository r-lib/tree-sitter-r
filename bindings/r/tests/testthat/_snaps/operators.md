# relational

    Code
      node_children_print(x)
    Output
      S-Expression
      (binary_operator [(1, 0), (1, 6)]
        lhs: (identifier [(1, 0), (1, 1)])
        operator: "==" [(1, 2), (1, 4)]
        rhs: (identifier [(1, 5), (1, 6)])
      )
      
      Text
      a == b
      
      S-Expression
      (binary_operator [(2, 0), (2, 5)]
        lhs: (identifier [(2, 0), (2, 1)])
        operator: ">" [(2, 2), (2, 3)]
        rhs: (identifier [(2, 4), (2, 5)])
      )
      
      Text
      a > b
      
      S-Expression
      (binary_operator [(3, 0), (3, 5)]
        lhs: (identifier [(3, 0), (3, 1)])
        operator: "<" [(3, 2), (3, 3)]
        rhs: (identifier [(3, 4), (3, 5)])
      )
      
      Text
      a < b
      
      S-Expression
      (binary_operator [(4, 0), (4, 6)]
        lhs: (identifier [(4, 0), (4, 1)])
        operator: ">=" [(4, 2), (4, 4)]
        rhs: (identifier [(4, 5), (4, 6)])
      )
      
      Text
      a >= b
      
      S-Expression
      (binary_operator [(5, 0), (5, 6)]
        lhs: (identifier [(5, 0), (5, 1)])
        operator: "<=" [(5, 2), (5, 4)]
        rhs: (identifier [(5, 5), (5, 6)])
      )
      
      Text
      a <= b
      
      S-Expression
      (binary_operator [(6, 0), (6, 6)]
        lhs: (identifier [(6, 0), (6, 1)])
        operator: "!=" [(6, 2), (6, 4)]
        rhs: (identifier [(6, 5), (6, 6)])
      )
      
      Text
      a != b
      
      S-Expression
      (binary_operator [(8, 0), (9, 3)]
        lhs: (identifier [(8, 0), (8, 1)])
        operator: "==" [(8, 2), (8, 4)]
        rhs: (identifier [(9, 2), (9, 3)])
      )
      
      Text
      a ==
        b
      

# arithmetic

    Code
      node_children_print(x)
    Output
      S-Expression
      (binary_operator [(1, 0), (1, 5)]
        lhs: (identifier [(1, 0), (1, 1)])
        operator: "+" [(1, 2), (1, 3)]
        rhs: (identifier [(1, 4), (1, 5)])
      )
      
      Text
      a + b
      
      S-Expression
      (binary_operator [(2, 0), (2, 5)]
        lhs: (identifier [(2, 0), (2, 1)])
        operator: "-" [(2, 2), (2, 3)]
        rhs: (identifier [(2, 4), (2, 5)])
      )
      
      Text
      a - b
      
      S-Expression
      (binary_operator [(3, 0), (3, 5)]
        lhs: (identifier [(3, 0), (3, 1)])
        operator: "*" [(3, 2), (3, 3)]
        rhs: (identifier [(3, 4), (3, 5)])
      )
      
      Text
      a * b
      
      S-Expression
      (binary_operator [(4, 0), (4, 5)]
        lhs: (identifier [(4, 0), (4, 1)])
        operator: "/" [(4, 2), (4, 3)]
        rhs: (identifier [(4, 4), (4, 5)])
      )
      
      Text
      a / b
      
      S-Expression
      (binary_operator [(5, 0), (5, 5)]
        lhs: (identifier [(5, 0), (5, 1)])
        operator: "^" [(5, 2), (5, 3)]
        rhs: (identifier [(5, 4), (5, 5)])
      )
      
      Text
      a ^ b
      
      S-Expression
      (binary_operator [(6, 0), (6, 6)]
        lhs: (identifier [(6, 0), (6, 1)])
        operator: "**" [(6, 2), (6, 4)]
        rhs: (identifier [(6, 5), (6, 6)])
      )
      
      Text
      a ** b
      
      S-Expression
      (binary_operator [(8, 0), (9, 3)]
        lhs: (identifier [(8, 0), (8, 1)])
        operator: "+" [(8, 2), (8, 3)]
        rhs: (identifier [(9, 2), (9, 3)])
      )
      
      Text
      a +
        b
      
      S-Expression
      (binary_operator [(11, 0), (12, 3)]
        lhs: (identifier [(11, 0), (11, 1)])
        operator: "*" [(11, 2), (11, 3)]
        rhs: (identifier [(12, 2), (12, 3)])
      )
      
      Text
      a *
        b
      

# unary

    Code
      node_children_print(x)
    Output
      S-Expression
      (unary_operator [(1, 0), (1, 2)]
        operator: "!" [(1, 0), (1, 1)]
        rhs: (identifier [(1, 1), (1, 2)])
      )
      
      Text
      !a
      
      S-Expression
      (unary_operator [(2, 0), (2, 2)]
        operator: "+" [(2, 0), (2, 1)]
        rhs: (identifier [(2, 1), (2, 2)])
      )
      
      Text
      +a
      
      S-Expression
      (unary_operator [(3, 0), (3, 2)]
        operator: "-" [(3, 0), (3, 1)]
        rhs: (identifier [(3, 1), (3, 2)])
      )
      
      Text
      -a
      
      S-Expression
      (call [(4, 0), (4, 11)]
        function: (identifier [(4, 0), (4, 3)])
        arguments: (arguments [(4, 3), (4, 11)]
          "(" [(4, 3), (4, 4)]
          argument: (argument [(4, 4), (4, 6)]
            value: (unary_operator [(4, 4), (4, 6)]
              operator: "!" [(4, 4), (4, 5)]
              rhs: (identifier [(4, 5), (4, 6)])
            )
          )
          (comma [(4, 6), (4, 7)])
          argument: (argument [(4, 8), (4, 10)]
            value: (unary_operator [(4, 8), (4, 10)]
              operator: "+" [(4, 8), (4, 9)]
              rhs: (identifier [(4, 9), (4, 10)])
            )
          )
          ")" [(4, 10), (4, 11)]
        )
      )
      
      Text
      foo(!a, +b)
      
      S-Expression
      (call [(5, 0), (5, 12)]
        function: (identifier [(5, 0), (5, 3)])
        arguments: (arguments [(5, 3), (5, 12)]
          "(" [(5, 3), (5, 4)]
          argument: (argument [(5, 4), (5, 6)]
            value: (unary_operator [(5, 4), (5, 6)]
              operator: "-" [(5, 4), (5, 5)]
              rhs: (identifier [(5, 5), (5, 6)])
            )
          )
          (comma [(5, 6), (5, 7)])
          argument: (argument [(5, 8), (5, 11)]
            value: (identifier [(5, 8), (5, 11)])
          )
          ")" [(5, 11), (5, 12)]
        )
      )
      
      Text
      foo(-a, bar)
      
      S-Expression
      (unary_operator [(7, 0), (8, 3)]
        operator: "!" [(7, 0), (7, 1)]
        rhs: (identifier [(8, 2), (8, 3)])
      )
      
      Text
      !
        a
      
      S-Expression
      (unary_operator [(9, 0), (9, 4)]
        operator: "-" [(9, 0), (9, 1)]
        rhs: (identifier [(9, 3), (9, 4)])
      )
      
      Text
      -  b
      

# precedence

    Code
      node_children_print(x)
    Output
      S-Expression
      (binary_operator [(1, 0), (1, 5)]
        lhs: (float [(1, 0), (1, 1)])
        operator: "+" [(1, 1), (1, 2)]
        rhs: (binary_operator [(1, 2), (1, 5)]
          lhs: (identifier [(1, 2), (1, 3)])
          operator: "*" [(1, 3), (1, 4)]
          rhs: (float [(1, 4), (1, 5)])
        )
      )
      
      Text
      2+a*2
      
      S-Expression
      (binary_operator [(2, 0), (2, 5)]
        lhs: (binary_operator [(2, 0), (2, 3)]
          lhs: (float [(2, 0), (2, 1)])
          operator: "+" [(2, 1), (2, 2)]
          rhs: (identifier [(2, 2), (2, 3)])
        )
        operator: "+" [(2, 3), (2, 4)]
        rhs: (float [(2, 4), (2, 5)])
      )
      
      Text
      2+a+2
      
      S-Expression
      (unary_operator [(3, 0), (3, 7)]
        operator: "!" [(3, 0), (3, 1)]
        rhs: (binary_operator [(3, 1), (3, 7)]
          lhs: (identifier [(3, 1), (3, 2)])
          operator: "+" [(3, 3), (3, 4)]
          rhs: (unary_operator [(3, 5), (3, 7)]
            operator: "!" [(3, 5), (3, 6)]
            rhs: (identifier [(3, 6), (3, 7)])
          )
        )
      )
      
      Text
      !a + !b
      
      S-Expression
      (binary_operator [(4, 0), (4, 16)]
        lhs: (binary_operator [(4, 0), (4, 6)]
          lhs: (identifier [(4, 0), (4, 1)])
          operator: "<=" [(4, 2), (4, 4)]
          rhs: (float [(4, 5), (4, 6)])
        )
        operator: "&&" [(4, 7), (4, 9)]
        rhs: (binary_operator [(4, 10), (4, 16)]
          lhs: (float [(4, 10), (4, 11)])
          operator: ">=" [(4, 12), (4, 14)]
          rhs: (identifier [(4, 15), (4, 16)])
        )
      )
      
      Text
      a <= 2 && 2 >= d
      
      S-Expression
      (binary_operator [(5, 0), (5, 18)]
        lhs: (subset [(5, 0), (5, 4)]
          function: (identifier [(5, 0), (5, 1)])
          arguments: (arguments [(5, 1), (5, 4)]
            "[" [(5, 1), (5, 2)]
            argument: (argument [(5, 2), (5, 3)]
              value: (float [(5, 2), (5, 3)])
            )
            "]" [(5, 3), (5, 4)]
          )
        )
        operator: "<-" [(5, 5), (5, 7)]
        rhs: (binary_operator [(5, 8), (5, 18)]
          lhs: (identifier [(5, 8), (5, 11)])
          operator: "||" [(5, 12), (5, 14)]
          rhs: (identifier [(5, 15), (5, 18)])
        )
      )
      
      Text
      a[1] <- foo || bar
      
      S-Expression
      (binary_operator [(6, 0), (6, 14)]
        lhs: (binary_operator [(6, 0), (6, 9)]
          lhs: (identifier [(6, 0), (6, 1)])
          operator: "&&" [(6, 2), (6, 4)]
          rhs: (call [(6, 5), (6, 9)]
            function: (identifier [(6, 5), (6, 6)])
            arguments: (arguments [(6, 6), (6, 9)]
              "(" [(6, 6), (6, 7)]
              argument: (argument [(6, 7), (6, 8)]
                value: (identifier [(6, 7), (6, 8)])
              )
              ")" [(6, 8), (6, 9)]
            )
          )
        )
        operator: "&&" [(6, 10), (6, 12)]
        rhs: (identifier [(6, 13), (6, 14)])
      )
      
      Text
      a && b(c) && d
      
      S-Expression
      (binary_operator [(7, 0), (7, 31)]
        lhs: (identifier [(7, 0), (7, 3)])
        operator: "<-" [(7, 4), (7, 6)]
        rhs: (binary_operator [(7, 7), (7, 31)]
          lhs: (binary_operator [(7, 7), (7, 21)]
            lhs: (identifier [(7, 7), (7, 10)])
            operator: "special" [(7, 11), (7, 14)]
            rhs: (call [(7, 15), (7, 21)]
              function: (identifier [(7, 15), (7, 18)])
              arguments: (arguments [(7, 18), (7, 21)]
                "(" [(7, 18), (7, 19)]
                argument: (argument [(7, 19), (7, 20)]
                  value: (float [(7, 19), (7, 20)])
                )
                ")" [(7, 20), (7, 21)]
              )
            )
          )
          operator: "special" [(7, 22), (7, 25)]
          rhs: (call [(7, 26), (7, 31)]
            function: (identifier [(7, 26), (7, 29)])
            arguments: (arguments [(7, 29), (7, 31)]
              "(" [(7, 29), (7, 30)]
              ")" [(7, 30), (7, 31)]
            )
          )
        )
      )
      
      Text
      val <- foo %>% bar(1) %>% baz()
      

# specials

    Code
      node_children_print(x)
    Output
      S-Expression
      (binary_operator [(1, 0), (1, 6)]
        lhs: (identifier [(1, 0), (1, 1)])
        operator: "special" [(1, 2), (1, 4)]
        rhs: (identifier [(1, 5), (1, 6)])
      )
      
      Text
      x %% y
      
      S-Expression
      (binary_operator [(2, 0), (2, 7)]
        lhs: (identifier [(2, 0), (2, 1)])
        operator: "special" [(2, 2), (2, 5)]
        rhs: (identifier [(2, 6), (2, 7)])
      )
      
      Text
      x %/% y
      
      S-Expression
      (binary_operator [(3, 0), (3, 7)]
        lhs: (identifier [(3, 0), (3, 1)])
        operator: "special" [(3, 2), (3, 5)]
        rhs: (identifier [(3, 6), (3, 7)])
      )
      
      Text
      x %+% y
      
      S-Expression
      (binary_operator [(4, 0), (4, 7)]
        lhs: (identifier [(4, 0), (4, 1)])
        operator: "special" [(4, 2), (4, 5)]
        rhs: (identifier [(4, 6), (4, 7)])
      )
      
      Text
      x %>% y
      
      S-Expression
      (binary_operator [(5, 0), (5, 13)]
        lhs: (binary_operator [(5, 0), (5, 7)]
          lhs: (identifier [(5, 0), (5, 1)])
          operator: "special" [(5, 2), (5, 5)]
          rhs: (float [(5, 6), (5, 7)])
        )
        operator: "special" [(5, 8), (5, 11)]
        rhs: (identifier [(5, 12), (5, 13)])
      )
      
      Text
      x %>% 2 %>% z
      
      S-Expression
      (binary_operator [(6, 0), (6, 15)]
        lhs: (identifier [(6, 0), (6, 1)])
        operator: "special" [(6, 2), (6, 13)]
        rhs: (identifier [(6, 14), (6, 15)])
      )
      
      Text
      x %some text% y
      
      S-Expression
      (binary_operator [(7, 0), (7, 8)]
        lhs: (identifier [(7, 0), (7, 1)])
        operator: "special" [(7, 2), (7, 6)]
        rhs: (identifier [(7, 7), (7, 8)])
      )
      
      Text
      x %//% y
      

# not specials

    Code
      node_children_print(x)
    Output
      S-Expression
      (identifier [(1, 0), (1, 1)])
      
      Text
      x
      
      S-Expression
      (ERROR [(1, 2), (1, 7)]
        (ERROR [(1, 2), (1, 3)])
        "\\" [(1, 3), (1, 4)]
        (ERROR [(1, 4), (1, 7)])
      )
      
      Text
      %\% y
      

---

    Code
      node_children_print(x)
    Output
      S-Expression
      (binary_operator [(1, 0), (2, 0)]
        lhs: (identifier [(1, 0), (1, 1)])
        operator: "special" [(1, 2), (1, 4)]
        operator: (ERROR [(1, 4), (1, 7)]
          (ERROR [(1, 4), (1, 7)])
        )
        rhs: (identifier [(2, 0), (2, 0)])
      )
      
      Text
      x %%% y
      
      

# pipe

    Code
      node_children_print(x)
    Output
      S-Expression
      (binary_operator [(1, 0), (1, 12)]
        lhs: (identifier [(1, 0), (1, 1)])
        operator: "|>" [(1, 2), (1, 4)]
        rhs: (call [(1, 5), (1, 12)]
          function: (identifier [(1, 5), (1, 10)])
          arguments: (arguments [(1, 10), (1, 12)]
            "(" [(1, 10), (1, 11)]
            ")" [(1, 11), (1, 12)]
          )
        )
      )
      
      Text
      x |> print()
      
      S-Expression
      (binary_operator [(3, 0), (3, 29)]
        lhs: (binary_operator [(3, 0), (3, 20)]
          lhs: (binary_operator [(3, 0), (3, 10)]
            lhs: (identifier [(3, 0), (3, 1)])
            operator: "|>" [(3, 2), (3, 4)]
            rhs: (call [(3, 5), (3, 10)]
              function: (identifier [(3, 5), (3, 8)])
              arguments: (arguments [(3, 8), (3, 10)]
                "(" [(3, 8), (3, 9)]
                ")" [(3, 9), (3, 10)]
              )
            )
          )
          operator: "special" [(3, 11), (3, 14)]
          rhs: (call [(3, 15), (3, 20)]
            function: (identifier [(3, 15), (3, 18)])
            arguments: (arguments [(3, 18), (3, 20)]
              "(" [(3, 18), (3, 19)]
              ")" [(3, 19), (3, 20)]
            )
          )
        )
        operator: "|>" [(3, 21), (3, 23)]
        rhs: (call [(3, 24), (3, 29)]
          function: (identifier [(3, 24), (3, 27)])
          arguments: (arguments [(3, 27), (3, 29)]
            "(" [(3, 27), (3, 28)]
            ")" [(3, 28), (3, 29)]
          )
        )
      )
      
      Text
      x |> foo() %>% bar() |> baz()
      
      S-Expression
      (binary_operator [(5, 0), (5, 27)]
        lhs: (binary_operator [(5, 0), (5, 19)]
          lhs: (binary_operator [(5, 0), (5, 10)]
            lhs: (identifier [(5, 0), (5, 1)])
            operator: "|>" [(5, 2), (5, 4)]
            rhs: (call [(5, 5), (5, 10)]
              function: (identifier [(5, 5), (5, 8)])
              arguments: (arguments [(5, 8), (5, 10)]
                "(" [(5, 8), (5, 9)]
                ")" [(5, 9), (5, 10)]
              )
            )
          )
          operator: "|>" [(5, 11), (5, 13)]
          rhs: (call [(5, 14), (5, 19)]
            function: (identifier [(5, 14), (5, 17)])
            arguments: (arguments [(5, 17), (5, 19)]
              "(" [(5, 17), (5, 18)]
              ")" [(5, 18), (5, 19)]
            )
          )
        )
        operator: "+" [(5, 20), (5, 21)]
        rhs: (call [(5, 22), (5, 27)]
          function: (identifier [(5, 22), (5, 25)])
          arguments: (arguments [(5, 25), (5, 27)]
            "(" [(5, 25), (5, 26)]
            ")" [(5, 26), (5, 27)]
          )
        )
      )
      
      Text
      x |> foo() |> bar() + baz()
      
      S-Expression
      (binary_operator [(7, 0), (7, 22)]
        lhs: (identifier [(7, 0), (7, 1)])
        operator: "|>" [(7, 2), (7, 4)]
        rhs: (call [(7, 5), (7, 22)]
          function: (braced_expression [(7, 5), (7, 20)]
            "{" [(7, 5), (7, 6)]
            body: (function_definition [(7, 6), (7, 19)]
              name: "function" [(7, 6), (7, 14)]
              parameters: (parameters [(7, 14), (7, 17)]
                "(" [(7, 14), (7, 15)]
                parameter: (parameter [(7, 15), (7, 16)]
                  name: (identifier [(7, 15), (7, 16)])
                )
                ")" [(7, 16), (7, 17)]
              )
              body: (identifier [(7, 18), (7, 19)])
            )
            "}" [(7, 19), (7, 20)]
          )
          arguments: (arguments [(7, 20), (7, 22)]
            "(" [(7, 20), (7, 21)]
            ")" [(7, 21), (7, 22)]
          )
        )
      )
      
      Text
      x |> {function(x) x}()
      

# pipe placeholder

    Code
      node_children_print(x)
    Output
      S-Expression
      (binary_operator [(1, 0), (1, 20)]
        lhs: (identifier [(1, 0), (1, 3)])
        operator: "|>" [(1, 4), (1, 6)]
        rhs: (call [(1, 7), (1, 20)]
          function: (identifier [(1, 7), (1, 10)])
          arguments: (arguments [(1, 10), (1, 20)]
            "(" [(1, 10), (1, 11)]
            argument: (argument [(1, 11), (1, 12)]
              value: (identifier [(1, 11), (1, 12)])
            )
            (comma [(1, 12), (1, 13)])
            argument: (argument [(1, 14), (1, 19)]
              name: (identifier [(1, 14), (1, 15)])
              "=" [(1, 16), (1, 17)]
              value: (identifier [(1, 18), (1, 19)]
                "_" [(1, 18), (1, 19)]
              )
            )
            ")" [(1, 19), (1, 20)]
          )
        )
      )
      
      Text
      foo |> bar(x, y = _)
      
      S-Expression
      (binary_operator [(2, 0), (2, 29)]
        lhs: (binary_operator [(2, 0), (2, 12)]
          lhs: (identifier [(2, 0), (2, 3)])
          operator: "|>" [(2, 4), (2, 6)]
          rhs: (call [(2, 7), (2, 12)]
            function: (identifier [(2, 7), (2, 10)])
            arguments: (arguments [(2, 10), (2, 12)]
              "(" [(2, 10), (2, 11)]
              ")" [(2, 11), (2, 12)]
            )
          )
        )
        operator: "|>" [(2, 13), (2, 15)]
        rhs: (call [(2, 16), (2, 29)]
          function: (identifier [(2, 16), (2, 19)])
          arguments: (arguments [(2, 19), (2, 29)]
            "(" [(2, 19), (2, 20)]
            argument: (argument [(2, 20), (2, 28)]
              name: (identifier [(2, 20), (2, 24)])
              "=" [(2, 25), (2, 26)]
              value: (identifier [(2, 27), (2, 28)]
                "_" [(2, 27), (2, 28)]
              )
            )
            ")" [(2, 28), (2, 29)]
          )
        )
      )
      
      Text
      foo |> bar() |> baz(data = _)
      

# assignment

    Code
      node_children_print(x)
    Output
      S-Expression
      (binary_operator [(1, 0), (1, 6)]
        lhs: (identifier [(1, 0), (1, 1)])
        operator: "<-" [(1, 2), (1, 4)]
        rhs: (float [(1, 5), (1, 6)])
      )
      
      Text
      x <- 1
      
      S-Expression
      (binary_operator [(2, 0), (2, 5)]
        lhs: (identifier [(2, 0), (2, 1)])
        operator: "=" [(2, 2), (2, 3)]
        rhs: (float [(2, 4), (2, 5)])
      )
      
      Text
      x = 1
      
      S-Expression
      (binary_operator [(3, 0), (3, 6)]
        lhs: (identifier [(3, 0), (3, 1)])
        operator: ":=" [(3, 2), (3, 4)]
        rhs: (float [(3, 5), (3, 6)])
      )
      
      Text
      x := 1
      
      S-Expression
      (binary_operator [(4, 0), (4, 7)]
        lhs: (identifier [(4, 0), (4, 1)])
        operator: "<<-" [(4, 2), (4, 5)]
        rhs: (float [(4, 6), (4, 7)])
      )
      
      Text
      x <<- 1
      
      S-Expression
      (binary_operator [(5, 0), (5, 7)]
        lhs: (float [(5, 0), (5, 1)])
        operator: "->>" [(5, 2), (5, 5)]
        rhs: (identifier [(5, 6), (5, 7)])
      )
      
      Text
      1 ->> x
      
      S-Expression
      (binary_operator [(6, 0), (6, 6)]
        lhs: (float [(6, 0), (6, 1)])
        operator: "->" [(6, 2), (6, 4)]
        rhs: (identifier [(6, 5), (6, 6)])
      )
      
      Text
      1 -> x
      
      S-Expression
      (binary_operator [(7, 0), (7, 9)]
        lhs: (identifier [(7, 0), (7, 1)])
        operator: "<-" [(7, 2), (7, 4)]
        rhs: (call [(7, 5), (7, 9)]
          function: (identifier [(7, 5), (7, 6)])
          arguments: (arguments [(7, 6), (7, 9)]
            "(" [(7, 6), (7, 7)]
            argument: (argument [(7, 7), (7, 8)]
              value: (float [(7, 7), (7, 8)])
            )
            ")" [(7, 8), (7, 9)]
          )
        )
      )
      
      Text
      x <- y(1)
      
      S-Expression
      (binary_operator [(8, 0), (8, 9)]
        lhs: (call [(8, 0), (8, 4)]
          function: (identifier [(8, 0), (8, 1)])
          arguments: (arguments [(8, 1), (8, 4)]
            "(" [(8, 1), (8, 2)]
            argument: (argument [(8, 2), (8, 3)]
              value: (float [(8, 2), (8, 3)])
            )
            ")" [(8, 3), (8, 4)]
          )
        )
        operator: "->" [(8, 5), (8, 7)]
        rhs: (identifier [(8, 8), (8, 9)])
      )
      
      Text
      y(1) -> x
      

# colon

    Code
      node_children_print(x)
    Output
      S-Expression
      (binary_operator [(1, 0), (1, 3)]
        lhs: (float [(1, 0), (1, 1)])
        operator: ":" [(1, 1), (1, 2)]
        rhs: (float [(1, 2), (1, 3)])
      )
      
      Text
      1:2
      
      S-Expression
      (binary_operator [(2, 0), (2, 10)]
        lhs: (parenthesized_expression [(2, 0), (2, 7)]
          "(" [(2, 0), (2, 1)]
          body: (binary_operator [(2, 1), (2, 6)]
            lhs: (float [(2, 1), (2, 2)])
            operator: "+" [(2, 3), (2, 4)]
            rhs: (float [(2, 5), (2, 6)])
          )
          ")" [(2, 6), (2, 7)]
        )
        operator: ":" [(2, 7), (2, 8)]
        rhs: (unary_operator [(2, 8), (2, 10)]
          operator: "-" [(2, 8), (2, 9)]
          rhs: (float [(2, 9), (2, 10)])
        )
      )
      
      Text
      (1 + 1):-5
      

# formulas

    Code
      node_children_print(x)
    Output
      S-Expression
      (unary_operator [(1, 0), (1, 2)]
        operator: "~" [(1, 0), (1, 1)]
        rhs: (identifier [(1, 1), (1, 2)])
      )
      
      Text
      ~x
      
      S-Expression
      (binary_operator [(2, 0), (2, 3)]
        lhs: (identifier [(2, 0), (2, 1)])
        operator: "~" [(2, 1), (2, 2)]
        rhs: (identifier [(2, 2), (2, 3)])
      )
      
      Text
      y~x
      

# help

    Code
      node_children_print(x)
    Output
      S-Expression
      (binary_operator [(1, 0), (1, 5)]
        lhs: (identifier [(1, 0), (1, 1)])
        operator: "?" [(1, 2), (1, 3)]
        rhs: (identifier [(1, 4), (1, 5)])
      )
      
      Text
      a ? b
      
      S-Expression
      (binary_operator [(2, 0), (2, 10)]
        lhs: (identifier [(2, 0), (2, 1)])
        operator: "?" [(2, 2), (2, 3)]
        rhs: (binary_operator [(2, 4), (2, 10)]
          lhs: (identifier [(2, 4), (2, 5)])
          operator: "<-" [(2, 6), (2, 8)]
          rhs: (float [(2, 9), (2, 10)])
        )
      )
      
      Text
      a ? b <- 1
      
      S-Expression
      (unary_operator [(3, 0), (3, 2)]
        operator: "?" [(3, 0), (3, 1)]
        rhs: (identifier [(3, 1), (3, 2)])
      )
      
      Text
      ?a
      

