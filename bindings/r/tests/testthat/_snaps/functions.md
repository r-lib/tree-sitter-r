# functions

    Code
      node_children_print(node)
    Output
      S-Expression
      (function_definition [(1, 0), (1, 12)]
        name: "function" [(1, 0), (1, 8)]
        parameters: (parameters [(1, 8), (1, 10)]
          open: "(" [(1, 8), (1, 9)]
          close: ")" [(1, 9), (1, 10)]
        )
        body: (float [(1, 11), (1, 12)])
      )
      
      Text
      function() 1
      
      S-Expression
      (function_definition [(2, 0), (2, 13)]
        name: "function" [(2, 0), (2, 8)]
        parameters: (parameters [(2, 8), (2, 10)]
          open: "(" [(2, 8), (2, 9)]
          close: ")" [(2, 9), (2, 10)]
        )
        body: (braced_expression [(2, 11), (2, 13)]
          open: "{" [(2, 11), (2, 12)]
          close: "}" [(2, 12), (2, 13)]
        )
      )
      
      Text
      function() {}
      
      S-Expression
      (function_definition [(3, 0), (5, 1)]
        name: "function" [(3, 0), (3, 8)]
        parameters: (parameters [(3, 8), (3, 20)]
          open: "(" [(3, 8), (3, 9)]
          parameter: (parameter [(3, 9), (3, 13)]
            name: (identifier [(3, 9), (3, 13)])
          )
          (comma [(3, 13), (3, 14)])
          parameter: (parameter [(3, 15), (3, 19)]
            name: (identifier [(3, 15), (3, 19)])
          )
          close: ")" [(3, 19), (3, 20)]
        )
        body: (braced_expression [(3, 21), (5, 1)]
          open: "{" [(3, 21), (3, 22)]
          body: (identifier [(4, 2), (4, 6)])
          close: "}" [(5, 0), (5, 1)]
        )
      )
      
      Text
      function(arg1, arg2) {
        arg2
      }
      
      S-Expression
      (function_definition [(7, 0), (7, 24)]
        name: "function" [(7, 0), (7, 8)]
        parameters: (parameters [(7, 8), (7, 14)]
          open: "(" [(7, 8), (7, 9)]
          parameter: (parameter [(7, 9), (7, 10)]
            name: (identifier [(7, 9), (7, 10)])
          )
          (comma [(7, 10), (7, 11)])
          parameter: (parameter [(7, 12), (7, 13)]
            name: (identifier [(7, 12), (7, 13)])
          )
          close: ")" [(7, 13), (7, 14)]
        )
        body: (call [(7, 15), (7, 24)]
          function: (return [(7, 15), (7, 21)])
          arguments: (arguments [(7, 21), (7, 24)]
            open: "(" [(7, 21), (7, 22)]
            argument: (argument [(7, 22), (7, 23)]
              value: (identifier [(7, 22), (7, 23)])
            )
            close: ")" [(7, 23), (7, 24)]
          )
        )
      )
      
      Text
      function(x, y) return(y)
      
      S-Expression
      (function_definition [(9, 0), (9, 23)]
        name: "function" [(9, 0), (9, 8)]
        parameters: (parameters [(9, 8), (9, 16)]
          open: "(" [(9, 8), (9, 9)]
          parameter: (parameter [(9, 9), (9, 10)]
            name: (identifier [(9, 9), (9, 10)])
          )
          (comma [(9, 10), (9, 11)])
          parameter: (parameter [(9, 12), (9, 15)]
            name: (dots [(9, 12), (9, 15)])
          )
          close: ")" [(9, 15), (9, 16)]
        )
        body: (call [(9, 17), (9, 23)]
          function: (identifier [(9, 17), (9, 18)])
          arguments: (arguments [(9, 18), (9, 23)]
            open: "(" [(9, 18), (9, 19)]
            argument: (argument [(9, 19), (9, 22)]
              value: (dots [(9, 19), (9, 22)])
            )
            close: ")" [(9, 22), (9, 23)]
          )
        )
      )
      
      Text
      function(x, ...) f(...)
      
      S-Expression
      (function_definition [(11, 0), (11, 27)]
        name: "function" [(11, 0), (11, 8)]
        parameters: (parameters [(11, 8), (11, 24)]
          open: "(" [(11, 8), (11, 9)]
          parameter: (parameter [(11, 9), (11, 13)]
            name: (identifier [(11, 9), (11, 13)])
          )
          (comma [(11, 13), (11, 14)])
          parameter: (parameter [(11, 15), (11, 23)]
            name: (identifier [(11, 15), (11, 19)])
            "=" [(11, 20), (11, 21)]
            default: (float [(11, 22), (11, 23)])
          )
          close: ")" [(11, 23), (11, 24)]
        )
        body: (braced_expression [(11, 25), (11, 27)]
          open: "{" [(11, 25), (11, 26)]
          close: "}" [(11, 26), (11, 27)]
        )
      )
      
      Text
      function(arg1, arg2 = 2) {}
      
      S-Expression
      (function_definition [(13, 0), (17, 1)]
        name: "function" [(13, 0), (13, 8)]
        parameters: (parameters [(13, 8), (15, 15)]
          open: "(" [(13, 8), (13, 9)]
          parameter: (parameter [(13, 9), (13, 10)]
            name: (identifier [(13, 9), (13, 10)])
          )
          (comma [(13, 10), (13, 11)])
          parameter: (parameter [(14, 9), (14, 10)]
            name: (identifier [(14, 9), (14, 10)])
          )
          (comma [(14, 10), (14, 11)])
          parameter: (parameter [(15, 9), (15, 14)]
            name: (identifier [(15, 9), (15, 10)])
            "=" [(15, 11), (15, 12)]
            default: (float [(15, 13), (15, 14)])
          )
          close: ")" [(15, 14), (15, 15)]
        )
        body: (braced_expression [(15, 16), (17, 1)]
          open: "{" [(15, 16), (15, 17)]
          close: "}" [(17, 0), (17, 1)]
        )
      )
      
      Text
      function(x,
               y,
               z = 3) {
      
      }
      
      S-Expression
      (function_definition [(19, 0), (22, 3)]
        name: "function" [(19, 0), (19, 8)]
        parameters: (parameters [(19, 8), (19, 10)]
          open: "(" [(19, 8), (19, 9)]
          close: ")" [(19, 9), (19, 10)]
        )
        body: (float [(22, 2), (22, 3)])
      )
      
      Text
      function()
      
      
        1
      
      S-Expression
      (function_definition [(24, 0), (24, 24)]
        name: "function" [(24, 0), (24, 8)]
        parameters: (parameters [(24, 8), (24, 10)]
          open: "(" [(24, 8), (24, 9)]
          close: ")" [(24, 9), (24, 10)]
        )
        body: (function_definition [(24, 11), (24, 24)]
          name: "function" [(24, 11), (24, 19)]
          parameters: (parameters [(24, 19), (24, 21)]
            open: "(" [(24, 19), (24, 20)]
            close: ")" [(24, 20), (24, 21)]
          )
          body: (braced_expression [(24, 22), (24, 24)]
            open: "{" [(24, 22), (24, 23)]
            close: "}" [(24, 23), (24, 24)]
          )
        )
      )
      
      Text
      function() function() {}
      
      S-Expression
      (function_definition [(26, 0), (26, 30)]
        name: "function" [(26, 0), (26, 8)]
        parameters: (parameters [(26, 8), (26, 27)]
          open: "(" [(26, 8), (26, 9)]
          parameter: (parameter [(26, 9), (26, 26)]
            name: (identifier [(26, 9), (26, 10)])
            "=" [(26, 11), (26, 12)]
            default: (function_definition [(26, 13), (26, 26)]
              name: "function" [(26, 13), (26, 21)]
              parameters: (parameters [(26, 21), (26, 23)]
                open: "(" [(26, 21), (26, 22)]
                close: ")" [(26, 22), (26, 23)]
              )
              body: (braced_expression [(26, 24), (26, 26)]
                open: "{" [(26, 24), (26, 25)]
                close: "}" [(26, 25), (26, 26)]
              )
            )
          )
          close: ")" [(26, 26), (26, 27)]
        )
        body: (braced_expression [(26, 28), (26, 30)]
          open: "{" [(26, 28), (26, 29)]
          close: "}" [(26, 29), (26, 30)]
        )
      )
      
      Text
      function(x = function() {}) {}
      
      S-Expression
      (comment [(28, 0), (28, 32)])
      
      Text
      # With no intermediate `{` scope
      
      S-Expression
      (function_definition [(29, 0), (29, 26)]
        name: "function" [(29, 0), (29, 8)]
        parameters: (parameters [(29, 8), (29, 10)]
          open: "(" [(29, 8), (29, 9)]
          close: ")" [(29, 9), (29, 10)]
        )
        body: (for_statement [(29, 11), (29, 26)]
          "for" [(29, 11), (29, 14)]
          open: "(" [(29, 14), (29, 15)]
          variable: (identifier [(29, 15), (29, 16)])
          "in" [(29, 17), (29, 19)]
          sequence: (binary_operator [(29, 20), (29, 23)]
            lhs: (float [(29, 20), (29, 21)])
            operator: ":" [(29, 21), (29, 22)]
            rhs: (float [(29, 22), (29, 23)])
          )
          close: ")" [(29, 23), (29, 24)]
          body: (identifier [(29, 25), (29, 26)])
        )
      )
      
      Text
      function() for(i in 1:5) i
      

# function no body

    Code
      node_children_print(node)
    Output
      S-Expression
      (function_definition [(1, 0), (2, 0)]
        name: "function" [(1, 0), (1, 8)]
        parameters: (parameters [(1, 8), (1, 14)]
          open: "(" [(1, 8), (1, 9)]
          parameter: (parameter [(1, 9), (1, 10)]
            name: (identifier [(1, 9), (1, 10)])
          )
          (comma [(1, 10), (1, 11)])
          parameter: (parameter [(1, 12), (1, 13)]
            name: (identifier [(1, 12), (1, 13)])
          )
          close: ")" [(1, 13), (1, 14)]
        )
        body: (identifier MISSING [(2, 0), (2, 0)])
      )
      
      Text
      function(x, y)
      
      

# function no body with assignment

    Code
      node_children_print(node)
    Output
      S-Expression
      (binary_operator [(1, 0), (2, 0)]
        lhs: (identifier [(1, 0), (1, 1)])
        operator: "<-" [(1, 2), (1, 4)]
        rhs: (function_definition [(1, 5), (2, 0)]
          name: "function" [(1, 5), (1, 13)]
          parameters: (parameters [(1, 13), (1, 19)]
            open: "(" [(1, 13), (1, 14)]
            parameter: (parameter [(1, 14), (1, 15)]
              name: (identifier [(1, 14), (1, 15)])
            )
            (comma [(1, 15), (1, 16)])
            parameter: (parameter [(1, 17), (1, 18)]
              name: (identifier [(1, 17), (1, 18)])
            )
            close: ")" [(1, 18), (1, 19)]
          )
          body: (identifier MISSING [(2, 0), (2, 0)])
        )
      )
      
      Text
      x <- function(x, y)
      
      

# function no body inside another function

    Code
      node_children_print(node)
    Output
      S-Expression
      (ERROR [(1, 0), (1, 27)]
        "function" [(1, 0), (1, 8)]
        "(" [(1, 8), (1, 9)]
        (identifier [(1, 9), (1, 10)])
        "=" [(1, 11), (1, 12)]
        "function" [(1, 13), (1, 21)]
        (parameters [(1, 21), (1, 23)]
          open: "(" [(1, 21), (1, 22)]
          close: ")" [(1, 22), (1, 23)]
        )
        (ERROR [(1, 23), (1, 27)])
      )
      
      Text
      function(x = function()) {}
      

# lambda function

    Code
      node_children_print(node)
    Output
      S-Expression
      (binary_operator [(1, 0), (1, 15)]
        lhs: (identifier [(1, 0), (1, 1)])
        operator: "<-" [(1, 2), (1, 4)]
        rhs: (function_definition [(1, 5), (1, 15)]
          name: "\\" [(1, 5), (1, 6)]
          parameters: (parameters [(1, 6), (1, 11)]
            open: "(" [(1, 6), (1, 7)]
            parameter: (parameter [(1, 7), (1, 10)]
              name: (identifier [(1, 7), (1, 10)])
            )
            close: ")" [(1, 10), (1, 11)]
          )
          body: (identifier [(1, 12), (1, 15)])
        )
      )
      
      Text
      a <- \(arg) arg
      
      S-Expression
      (binary_operator [(2, 0), (2, 37)]
        lhs: (identifier [(2, 0), (2, 1)])
        operator: "<-" [(2, 2), (2, 4)]
        rhs: (function_definition [(2, 5), (2, 37)]
          name: "\\" [(2, 5), (2, 6)]
          parameters: (parameters [(2, 6), (2, 18)]
            open: "(" [(2, 6), (2, 7)]
            parameter: (parameter [(2, 7), (2, 11)]
              name: (identifier [(2, 7), (2, 11)])
            )
            (comma [(2, 11), (2, 12)])
            parameter: (parameter [(2, 13), (2, 17)]
              name: (identifier [(2, 13), (2, 17)])
            )
            close: ")" [(2, 17), (2, 18)]
          )
          body: (call [(2, 19), (2, 37)]
            function: (identifier [(2, 19), (2, 25)])
            arguments: (arguments [(2, 25), (2, 37)]
              open: "(" [(2, 25), (2, 26)]
              argument: (argument [(2, 26), (2, 30)]
                value: (identifier [(2, 26), (2, 30)])
              )
              (comma [(2, 30), (2, 31)])
              argument: (argument [(2, 32), (2, 36)]
                value: (identifier [(2, 32), (2, 36)])
              )
              close: ")" [(2, 36), (2, 37)]
            )
          )
        )
      )
      
      Text
      b <- \(arg1, arg2) paste0(arg1, arg2)
      
      S-Expression
      (binary_operator [(3, 0), (3, 25)]
        lhs: (identifier [(3, 0), (3, 1)])
        operator: "<-" [(3, 2), (3, 4)]
        rhs: (function_definition [(3, 5), (3, 25)]
          name: "\\" [(3, 5), (3, 6)]
          parameters: (parameters [(3, 6), (3, 16)]
            open: "(" [(3, 6), (3, 7)]
            parameter: (parameter [(3, 7), (3, 10)]
              name: (identifier [(3, 7), (3, 10)])
            )
            (comma [(3, 10), (3, 11)])
            parameter: (parameter [(3, 12), (3, 15)]
              name: (dots [(3, 12), (3, 15)])
            )
            close: ")" [(3, 15), (3, 16)]
          )
          body: (call [(3, 17), (3, 25)]
            function: (identifier [(3, 17), (3, 20)])
            arguments: (arguments [(3, 20), (3, 25)]
              open: "(" [(3, 20), (3, 21)]
              argument: (argument [(3, 21), (3, 24)]
                value: (dots [(3, 21), (3, 24)])
              )
              close: ")" [(3, 24), (3, 25)]
            )
          )
        )
      )
      
      Text
      c <- \(fun, ...) fun(...)
      
      S-Expression
      (binary_operator [(4, 0), (4, 47)]
        lhs: (binary_operator [(4, 0), (4, 28)]
          lhs: (binary_operator [(4, 0), (4, 3)]
            lhs: (float [(4, 0), (4, 1)])
            operator: ":" [(4, 1), (4, 2)]
            rhs: (float [(4, 2), (4, 3)])
          )
          operator: "|>" [(4, 4), (4, 6)]
          rhs: (call [(4, 7), (4, 28)]
            function: (braced_expression [(4, 7), (4, 26)]
              open: "{" [(4, 7), (4, 8)]
              body: (function_definition [(4, 8), (4, 25)]
                name: "\\" [(4, 8), (4, 9)]
                parameters: (parameters [(4, 9), (4, 19)]
                  open: "(" [(4, 9), (4, 10)]
                  parameter: (parameter [(4, 10), (4, 11)]
                    name: (identifier [(4, 10), (4, 11)])
                  )
                  (comma [(4, 11), (4, 12)])
                  parameter: (parameter [(4, 13), (4, 18)]
                    name: (identifier [(4, 13), (4, 14)])
                    "=" [(4, 15), (4, 16)]
                    default: (float [(4, 17), (4, 18)])
                  )
                  close: ")" [(4, 18), (4, 19)]
                )
                body: (binary_operator [(4, 20), (4, 25)]
                  lhs: (identifier [(4, 20), (4, 21)])
                  operator: "+" [(4, 22), (4, 23)]
                  rhs: (identifier [(4, 24), (4, 25)])
                )
              )
              close: "}" [(4, 25), (4, 26)]
            )
            arguments: (arguments [(4, 26), (4, 28)]
              open: "(" [(4, 26), (4, 27)]
              close: ")" [(4, 27), (4, 28)]
            )
          )
        )
        operator: "|>" [(4, 29), (4, 31)]
        rhs: (call [(4, 32), (4, 47)]
          function: (braced_expression [(4, 32), (4, 45)]
            open: "{" [(4, 32), (4, 33)]
            body: (function_definition [(4, 33), (4, 44)]
              name: "\\" [(4, 33), (4, 34)]
              parameters: (parameters [(4, 34), (4, 37)]
                open: "(" [(4, 34), (4, 35)]
                parameter: (parameter [(4, 35), (4, 36)]
                  name: (identifier [(4, 35), (4, 36)])
                )
                close: ")" [(4, 36), (4, 37)]
              )
              body: (call [(4, 38), (4, 44)]
                function: (identifier [(4, 38), (4, 41)])
                arguments: (arguments [(4, 41), (4, 44)]
                  open: "(" [(4, 41), (4, 42)]
                  argument: (argument [(4, 42), (4, 43)]
                    value: (identifier [(4, 42), (4, 43)])
                  )
                  close: ")" [(4, 43), (4, 44)]
                )
              )
            )
            close: "}" [(4, 44), (4, 45)]
          )
          arguments: (arguments [(4, 45), (4, 47)]
            open: "(" [(4, 45), (4, 46)]
            close: ")" [(4, 46), (4, 47)]
          )
        )
      )
      
      Text
      1:3 |> {\(x, y = 1) x + y}() |> {\(x) sum(x)}()
      
      S-Expression
      (call [(5, 0), (5, 18)]
        function: (braced_expression [(5, 0), (5, 16)]
          open: "{" [(5, 0), (5, 1)]
          body: (function_definition [(5, 1), (5, 15)]
            name: "\\" [(5, 1), (5, 2)]
            parameters: (parameters [(5, 2), (5, 9)]
              open: "(" [(5, 2), (5, 3)]
              parameter: (parameter [(5, 3), (5, 8)]
                name: (identifier [(5, 3), (5, 4)])
                "=" [(5, 5), (5, 6)]
                default: (float [(5, 7), (5, 8)])
              )
              close: ")" [(5, 8), (5, 9)]
            )
            body: (binary_operator [(5, 10), (5, 15)]
              lhs: (identifier [(5, 10), (5, 11)])
              operator: "+" [(5, 12), (5, 13)]
              rhs: (float [(5, 14), (5, 15)])
            )
          )
          close: "}" [(5, 15), (5, 16)]
        )
        arguments: (arguments [(5, 16), (5, 18)]
          open: "(" [(5, 16), (5, 17)]
          close: ")" [(5, 17), (5, 18)]
        )
      )
      
      Text
      {\(a = 1) a + 1}()
      
      S-Expression
      (function_definition [(6, 0), (6, 9)]
        name: "\\" [(6, 0), (6, 1)]
        parameters: (parameters [(6, 1), (6, 3)]
          open: "(" [(6, 1), (6, 2)]
          close: ")" [(6, 2), (6, 3)]
        )
        body: (binary_operator [(6, 4), (6, 9)]
          lhs: (float [(6, 4), (6, 5)])
          operator: "+" [(6, 6), (6, 7)]
          rhs: (float [(6, 8), (6, 9)])
        )
      )
      
      Text
      \() 1 + 2
      
      S-Expression
      (function_definition [(7, 0), (9, 7)]
        name: "\\" [(7, 0), (7, 1)]
        parameters: (parameters [(7, 1), (7, 3)]
          open: "(" [(7, 1), (7, 2)]
          close: ")" [(7, 2), (7, 3)]
        )
        body: (binary_operator [(9, 2), (9, 7)]
          lhs: (float [(9, 2), (9, 3)])
          operator: "+" [(9, 4), (9, 5)]
          rhs: (float [(9, 6), (9, 7)])
        )
      )
      
      Text
      \()
      
        1 + 2
      

