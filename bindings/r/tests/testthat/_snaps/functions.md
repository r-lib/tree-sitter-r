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
      (function_definition [(9, 0), (9, 27)]
        name: "function" [(9, 0), (9, 8)]
        parameters: (parameters [(9, 8), (9, 24)]
          open: "(" [(9, 8), (9, 9)]
          parameter: (parameter [(9, 9), (9, 13)]
            name: (identifier [(9, 9), (9, 13)])
          )
          (comma [(9, 13), (9, 14)])
          parameter: (parameter [(9, 15), (9, 23)]
            name: (identifier [(9, 15), (9, 19)])
            "=" [(9, 20), (9, 21)]
            default: (float [(9, 22), (9, 23)])
          )
          close: ")" [(9, 23), (9, 24)]
        )
        body: (braced_expression [(9, 25), (9, 27)]
          open: "{" [(9, 25), (9, 26)]
          close: "}" [(9, 26), (9, 27)]
        )
      )
      
      Text
      function(arg1, arg2 = 2) {}
      
      S-Expression
      (function_definition [(11, 0), (15, 1)]
        name: "function" [(11, 0), (11, 8)]
        parameters: (parameters [(11, 8), (13, 15)]
          open: "(" [(11, 8), (11, 9)]
          parameter: (parameter [(11, 9), (11, 10)]
            name: (identifier [(11, 9), (11, 10)])
          )
          (comma [(11, 10), (11, 11)])
          parameter: (parameter [(12, 9), (12, 10)]
            name: (identifier [(12, 9), (12, 10)])
          )
          (comma [(12, 10), (12, 11)])
          parameter: (parameter [(13, 9), (13, 14)]
            name: (identifier [(13, 9), (13, 10)])
            "=" [(13, 11), (13, 12)]
            default: (float [(13, 13), (13, 14)])
          )
          close: ")" [(13, 14), (13, 15)]
        )
        body: (braced_expression [(13, 16), (15, 1)]
          open: "{" [(13, 16), (13, 17)]
          close: "}" [(15, 0), (15, 1)]
        )
      )
      
      Text
      function(x,
               y,
               z = 3) {
      
      }
      
      S-Expression
      (function_definition [(17, 0), (20, 3)]
        name: "function" [(17, 0), (17, 8)]
        parameters: (parameters [(17, 8), (17, 10)]
          open: "(" [(17, 8), (17, 9)]
          close: ")" [(17, 9), (17, 10)]
        )
        body: (float [(20, 2), (20, 3)])
      )
      
      Text
      function()
      
      
        1
      
      S-Expression
      (function_definition [(22, 0), (23, 8)]
        name: "function" [(22, 0), (22, 8)]
        parameters: (parameters [(23, 0), (23, 2)]
          open: "(" [(23, 0), (23, 1)]
          close: ")" [(23, 1), (23, 2)]
        )
        body: (binary_operator [(23, 3), (23, 8)]
          lhs: (float [(23, 3), (23, 4)])
          operator: "+" [(23, 5), (23, 6)]
          rhs: (float [(23, 7), (23, 8)])
        )
      )
      
      Text
      function
      () 1 + 1
      
      S-Expression
      (function_definition [(25, 0), (27, 8)]
        name: "function" [(25, 0), (25, 8)]
        parameters: (parameters [(27, 0), (27, 2)]
          open: "(" [(27, 0), (27, 1)]
          close: ")" [(27, 1), (27, 2)]
        )
        body: (binary_operator [(27, 3), (27, 8)]
          lhs: (float [(27, 3), (27, 4)])
          operator: "+" [(27, 5), (27, 6)]
          rhs: (float [(27, 7), (27, 8)])
        )
      )
      
      Text
      function
      
      () 1 + 1
      
      S-Expression
      (function_definition [(29, 0), (33, 8)]
        name: "function" [(29, 0), (29, 8)]
        (comment [(31, 0), (31, 24)])
        parameters: (parameters [(33, 0), (33, 2)]
          open: "(" [(33, 0), (33, 1)]
          close: ")" [(33, 1), (33, 2)]
        )
        body: (binary_operator [(33, 3), (33, 8)]
          lhs: (float [(33, 3), (33, 4)])
          operator: "+" [(33, 5), (33, 6)]
          rhs: (float [(33, 7), (33, 8)])
        )
      )
      
      Text
      function
      
      # this important comment
      
      () 1 + 1
      
      S-Expression
      (function_definition [(35, 0), (35, 24)]
        name: "function" [(35, 0), (35, 8)]
        parameters: (parameters [(35, 8), (35, 10)]
          open: "(" [(35, 8), (35, 9)]
          close: ")" [(35, 9), (35, 10)]
        )
        body: (function_definition [(35, 11), (35, 24)]
          name: "function" [(35, 11), (35, 19)]
          parameters: (parameters [(35, 19), (35, 21)]
            open: "(" [(35, 19), (35, 20)]
            close: ")" [(35, 20), (35, 21)]
          )
          body: (braced_expression [(35, 22), (35, 24)]
            open: "{" [(35, 22), (35, 23)]
            close: "}" [(35, 23), (35, 24)]
          )
        )
      )
      
      Text
      function() function() {}
      
      S-Expression
      (function_definition [(37, 0), (37, 30)]
        name: "function" [(37, 0), (37, 8)]
        parameters: (parameters [(37, 8), (37, 27)]
          open: "(" [(37, 8), (37, 9)]
          parameter: (parameter [(37, 9), (37, 26)]
            name: (identifier [(37, 9), (37, 10)])
            "=" [(37, 11), (37, 12)]
            default: (function_definition [(37, 13), (37, 26)]
              name: "function" [(37, 13), (37, 21)]
              parameters: (parameters [(37, 21), (37, 23)]
                open: "(" [(37, 21), (37, 22)]
                close: ")" [(37, 22), (37, 23)]
              )
              body: (braced_expression [(37, 24), (37, 26)]
                open: "{" [(37, 24), (37, 25)]
                close: "}" [(37, 25), (37, 26)]
              )
            )
          )
          close: ")" [(37, 26), (37, 27)]
        )
        body: (braced_expression [(37, 28), (37, 30)]
          open: "{" [(37, 28), (37, 29)]
          close: "}" [(37, 29), (37, 30)]
        )
      )
      
      Text
      function(x = function() {}) {}
      
      S-Expression
      (comment [(39, 0), (39, 32)])
      
      Text
      # With no intermediate `{` scope
      
      S-Expression
      (function_definition [(40, 0), (40, 26)]
        name: "function" [(40, 0), (40, 8)]
        parameters: (parameters [(40, 8), (40, 10)]
          open: "(" [(40, 8), (40, 9)]
          close: ")" [(40, 9), (40, 10)]
        )
        body: (for_statement [(40, 11), (40, 26)]
          "for" [(40, 11), (40, 14)]
          open: "(" [(40, 14), (40, 15)]
          variable: (identifier [(40, 15), (40, 16)])
          "in" [(40, 17), (40, 19)]
          sequence: (binary_operator [(40, 20), (40, 23)]
            lhs: (float [(40, 20), (40, 21)])
            operator: ":" [(40, 21), (40, 22)]
            rhs: (float [(40, 22), (40, 23)])
          )
          close: ")" [(40, 23), (40, 24)]
          body: (identifier [(40, 25), (40, 26)])
        )
      )
      
      Text
      function() for(i in 1:5) i
      

# function dots and dot dot i

    Code
      node_children_print(node)
    Output
      S-Expression
      (comment [(1, 0), (1, 35)])
      
      Text
      # Dots as parameter without default
      
      S-Expression
      (function_definition [(2, 0), (2, 27)]
        name: "function" [(2, 0), (2, 8)]
        parameters: (parameters [(2, 8), (2, 13)]
          open: "(" [(2, 8), (2, 9)]
          parameter: (parameter [(2, 9), (2, 12)]
            name: (dots [(2, 9), (2, 12)])
          )
          close: ")" [(2, 12), (2, 13)]
        )
        body: (braced_expression [(2, 14), (2, 27)]
          open: "{" [(2, 14), (2, 15)]
          body: (call [(2, 16), (2, 25)]
            function: (identifier [(2, 16), (2, 20)])
            arguments: (arguments [(2, 20), (2, 25)]
              open: "(" [(2, 20), (2, 21)]
              argument: (argument [(2, 21), (2, 24)]
                value: (dots [(2, 21), (2, 24)])
              )
              close: ")" [(2, 24), (2, 25)]
            )
          )
          close: "}" [(2, 26), (2, 27)]
        )
      )
      
      Text
      function(...) { list(...) }
      
      S-Expression
      (comment [(4, 0), (4, 32)])
      
      Text
      # Dots as parameter with default
      
      S-Expression
      (function_definition [(5, 0), (5, 32)]
        name: "function" [(5, 0), (5, 8)]
        parameters: (parameters [(5, 8), (5, 17)]
          open: "(" [(5, 8), (5, 9)]
          parameter: (parameter [(5, 9), (5, 16)]
            name: (dots [(5, 9), (5, 12)])
            "=" [(5, 13), (5, 14)]
            default: (float [(5, 15), (5, 16)])
          )
          close: ")" [(5, 16), (5, 17)]
        )
        body: (braced_expression [(5, 18), (5, 32)]
          open: "{" [(5, 18), (5, 19)]
          body: (call [(5, 20), (5, 30)]
            function: (identifier [(5, 20), (5, 23)])
            arguments: (arguments [(5, 23), (5, 30)]
              open: "(" [(5, 23), (5, 24)]
              argument: (argument [(5, 24), (5, 29)]
                value: (string [(5, 24), (5, 29)]
                  "\"" [(5, 24), (5, 25)]
                  content: (string_content [(5, 25), (5, 28)])
                  "\"" [(5, 28), (5, 29)]
                )
              )
              close: ")" [(5, 29), (5, 30)]
            )
          )
          close: "}" [(5, 31), (5, 32)]
        )
      )
      
      Text
      function(... = 1) { get("...") }
      
      S-Expression
      (comment [(7, 0), (7, 36)])
      
      Text
      # `..i` as parameter without default
      
      S-Expression
      (function_definition [(8, 0), (8, 28)]
        name: "function" [(8, 0), (8, 8)]
        parameters: (parameters [(8, 8), (8, 13)]
          open: "(" [(8, 8), (8, 9)]
          parameter: (parameter [(8, 9), (8, 12)]
            name: (dot_dot_i [(8, 9), (8, 12)])
          )
          close: ")" [(8, 12), (8, 13)]
        )
        body: (braced_expression [(8, 14), (8, 28)]
          open: "{" [(8, 14), (8, 15)]
          body: (call [(8, 16), (8, 26)]
            function: (identifier [(8, 16), (8, 19)])
            arguments: (arguments [(8, 19), (8, 26)]
              open: "(" [(8, 19), (8, 20)]
              argument: (argument [(8, 20), (8, 25)]
                value: (string [(8, 20), (8, 25)]
                  "\"" [(8, 20), (8, 21)]
                  content: (string_content [(8, 21), (8, 24)])
                  "\"" [(8, 24), (8, 25)]
                )
              )
              close: ")" [(8, 25), (8, 26)]
            )
          )
          close: "}" [(8, 27), (8, 28)]
        )
      )
      
      Text
      function(..1) { get("..1") }
      
      S-Expression
      (comment [(10, 0), (10, 33)])
      
      Text
      # `..i` as parameter with default
      
      S-Expression
      (function_definition [(11, 0), (11, 32)]
        name: "function" [(11, 0), (11, 8)]
        parameters: (parameters [(11, 8), (11, 17)]
          open: "(" [(11, 8), (11, 9)]
          parameter: (parameter [(11, 9), (11, 16)]
            name: (dot_dot_i [(11, 9), (11, 12)])
            "=" [(11, 13), (11, 14)]
            default: (float [(11, 15), (11, 16)])
          )
          close: ")" [(11, 16), (11, 17)]
        )
        body: (braced_expression [(11, 18), (11, 32)]
          open: "{" [(11, 18), (11, 19)]
          body: (call [(11, 20), (11, 30)]
            function: (identifier [(11, 20), (11, 23)])
            arguments: (arguments [(11, 23), (11, 30)]
              open: "(" [(11, 23), (11, 24)]
              argument: (argument [(11, 24), (11, 29)]
                value: (string [(11, 24), (11, 29)]
                  "\"" [(11, 24), (11, 25)]
                  content: (string_content [(11, 25), (11, 28)])
                  "\"" [(11, 28), (11, 29)]
                )
              )
              close: ")" [(11, 29), (11, 30)]
            )
          )
          close: "}" [(11, 31), (11, 32)]
        )
      )
      
      Text
      function(..1 = 1) { get("..1") }
      
      S-Expression
      (comment [(13, 0), (13, 15)])
      
      Text
      # Miscellaneous
      
      S-Expression
      (function_definition [(14, 0), (14, 23)]
        name: "function" [(14, 0), (14, 8)]
        parameters: (parameters [(14, 8), (14, 16)]
          open: "(" [(14, 8), (14, 9)]
          parameter: (parameter [(14, 9), (14, 10)]
            name: (identifier [(14, 9), (14, 10)])
          )
          (comma [(14, 10), (14, 11)])
          parameter: (parameter [(14, 12), (14, 15)]
            name: (dots [(14, 12), (14, 15)])
          )
          close: ")" [(14, 15), (14, 16)]
        )
        body: (call [(14, 17), (14, 23)]
          function: (identifier [(14, 17), (14, 18)])
          arguments: (arguments [(14, 18), (14, 23)]
            open: "(" [(14, 18), (14, 19)]
            argument: (argument [(14, 19), (14, 22)]
              value: (dots [(14, 19), (14, 22)])
            )
            close: ")" [(14, 22), (14, 23)]
          )
        )
      )
      
      Text
      function(x, ...) f(...)
      
      S-Expression
      (function_definition [(15, 0), (15, 26)]
        name: "function" [(15, 0), (15, 8)]
        parameters: (parameters [(15, 8), (15, 16)]
          open: "(" [(15, 8), (15, 9)]
          parameter: (parameter [(15, 9), (15, 10)]
            name: (identifier [(15, 9), (15, 10)])
          )
          (comma [(15, 10), (15, 11)])
          parameter: (parameter [(15, 12), (15, 15)]
            name: (dots [(15, 12), (15, 15)])
          )
          close: ")" [(15, 15), (15, 16)]
        )
        body: (binary_operator [(15, 17), (15, 26)]
          lhs: (dot_dot_i [(15, 17), (15, 20)])
          operator: "+" [(15, 21), (15, 22)]
          rhs: (dot_dot_i [(15, 23), (15, 26)])
        )
      )
      
      Text
      function(x, ...) ..1 + ..2
      

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
        name: (identifier [(1, 9), (1, 10)])
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
      
      S-Expression
      (comment [(11, 0), (11, 88)])
      
      Text
      # Not currently allowed by the parser, but we think it will be and is just an oversight.
      
      S-Expression
      (comment [(12, 0), (12, 167)])
      
      Text
      # `'\\'` would need to be included alongside `FUNCTION` here https://github.com/wch/r-source/blob/802121c877837926a6bc2a930b3da749b537258b/src/main/gram.y#L3898-L3901.
      
      S-Expression
      (function_definition [(13, 0), (14, 8)]
        name: "\\" [(13, 0), (13, 1)]
        parameters: (parameters [(14, 0), (14, 2)]
          open: "(" [(14, 0), (14, 1)]
          close: ")" [(14, 1), (14, 2)]
        )
        body: (binary_operator [(14, 3), (14, 8)]
          lhs: (float [(14, 3), (14, 4)])
          operator: "+" [(14, 5), (14, 6)]
          rhs: (float [(14, 7), (14, 8)])
        )
      )
      
      Text
      \
      () 1 + 1
      

