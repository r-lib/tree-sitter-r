# dollar, at, namespace, namespace internal with expression rhs

    Code
      node_children_print(node)
    Output
      S-Expression
      (comment [(1, 0), (1, 78)])
      
      Text
      # These nodes allows an optional RHS, and the RHS must be a string/identifier,
      
      S-Expression
      (comment [(2, 0), (2, 76)])
      
      Text
      # so we nicely get a true node here alongside the braces. Even if that's not
      
      S-Expression
      (comment [(3, 0), (3, 64)])
      
      Text
      # parsable R code, it's useful for completions and highlighting.
      
      S-Expression
      (extract_operator [(5, 0), (5, 4)]
        lhs: (identifier [(5, 0), (5, 3)])
        operator: "$" [(5, 3), (5, 4)]
      )
      
      Text
      foo$
      
      S-Expression
      (braced_expression [(5, 4), (5, 9)]
        open: "{" [(5, 4), (5, 5)]
        body: (identifier [(5, 5), (5, 8)])
        close: "}" [(5, 8), (5, 9)]
      )
      
      Text
      {bar}
      
      S-Expression
      (extract_operator [(6, 0), (6, 4)]
        lhs: (identifier [(6, 0), (6, 3)])
        operator: "@" [(6, 3), (6, 4)]
      )
      
      Text
      foo@
      
      S-Expression
      (braced_expression [(6, 4), (6, 9)]
        open: "{" [(6, 4), (6, 5)]
        body: (identifier [(6, 5), (6, 8)])
        close: "}" [(6, 8), (6, 9)]
      )
      
      Text
      {bar}
      
      S-Expression
      (namespace_operator [(7, 0), (7, 5)]
        lhs: (identifier [(7, 0), (7, 3)])
        operator: "::" [(7, 3), (7, 5)]
      )
      
      Text
      foo::
      
      S-Expression
      (braced_expression [(7, 5), (7, 10)]
        open: "{" [(7, 5), (7, 6)]
        body: (identifier [(7, 6), (7, 9)])
        close: "}" [(7, 9), (7, 10)]
      )
      
      Text
      {bar}
      
      S-Expression
      (namespace_operator [(8, 0), (8, 6)]
        lhs: (identifier [(8, 0), (8, 3)])
        operator: ":::" [(8, 3), (8, 6)]
      )
      
      Text
      foo:::
      
      S-Expression
      (braced_expression [(8, 6), (8, 11)]
        open: "{" [(8, 6), (8, 7)]
        body: (identifier [(8, 7), (8, 10)])
        close: "}" [(8, 10), (8, 11)]
      )
      
      Text
      {bar}
      

# dollar, at, namespace, namespace internal with `if` rhs

    Code
      node_children_print(node)
    Output
      S-Expression
      (comment [(1, 0), (1, 81)])
      
      Text
      # The RHS's of these nodes are restricted to strings and identifiers, and the RHS
      
      S-Expression
      (comment [(2, 0), (2, 86)])
      
      Text
      # is optional. This ends up trying to match to an `if_statement` node, leaving the RHS
      
      S-Expression
      (comment [(3, 0), (3, 84)])
      
      Text
      # empty, and then the `if_statement` node errors because it doesn't have a `(`. This
      
      S-Expression
      (comment [(4, 0), (4, 37)])
      
      Text
      # is actually pretty decent behavior.
      
      S-Expression
      (extract_operator [(6, 0), (6, 4)]
        lhs: (identifier [(6, 0), (6, 3)])
        operator: "$" [(6, 3), (6, 4)]
      )
      
      Text
      foo$
      
      S-Expression
      (ERROR [(6, 4), (7, 0)]
        "if" [(6, 4), (6, 6)]
      )
      
      Text
      if
      
      
      S-Expression
      (extract_operator [(7, 0), (7, 4)]
        lhs: (identifier [(7, 0), (7, 3)])
        operator: "@" [(7, 3), (7, 4)]
      )
      
      Text
      foo@
      
      S-Expression
      (ERROR [(7, 4), (8, 0)]
        "if" [(7, 4), (7, 6)]
      )
      
      Text
      if
      
      
      S-Expression
      (namespace_operator [(8, 0), (8, 5)]
        lhs: (identifier [(8, 0), (8, 3)])
        operator: "::" [(8, 3), (8, 5)]
      )
      
      Text
      foo::
      
      S-Expression
      (ERROR [(8, 5), (9, 0)]
        "if" [(8, 5), (8, 7)]
      )
      
      Text
      if
      
      
      S-Expression
      (namespace_operator [(9, 0), (9, 6)]
        lhs: (identifier [(9, 0), (9, 3)])
        operator: ":::" [(9, 3), (9, 6)]
      )
      
      Text
      foo:::
      
      S-Expression
      (ERROR [(9, 6), (10, 0)]
        "if" [(9, 6), (9, 8)]
      )
      
      Text
      if
      
      

# complex expressions

    Code
      node_children_print(node)
    Output
      S-Expression
      (repeat_statement [(1, 0), (1, 33)]
        "repeat" [(1, 0), (1, 6)]
        body: (if_statement [(1, 7), (1, 33)]
          "if" [(1, 7), (1, 9)]
          open: "(" [(1, 10), (1, 11)]
          condition: (float [(1, 11), (1, 12)])
          close: ")" [(1, 12), (1, 13)]
          consequence: (true [(1, 14), (1, 18)])
          "else" [(1, 19), (1, 23)]
          alternative: (repeat_statement [(1, 24), (1, 33)]
            "repeat" [(1, 24), (1, 30)]
            body: (float [(1, 31), (1, 33)])
          )
        )
      )
      
      Text
      repeat if (1) TRUE else repeat 42
      
      S-Expression
      (if_statement [(2, 0), (2, 32)]
        "if" [(2, 0), (2, 2)]
        open: "(" [(2, 3), (2, 4)]
        condition: (true [(2, 4), (2, 8)])
        close: ")" [(2, 8), (2, 9)]
        consequence: (if_statement [(2, 10), (2, 32)]
          "if" [(2, 10), (2, 12)]
          open: "(" [(2, 13), (2, 14)]
          condition: (false [(2, 14), (2, 19)])
          close: ")" [(2, 19), (2, 20)]
          consequence: (float [(2, 21), (2, 22)])
          "else" [(2, 23), (2, 27)]
          alternative: (null [(2, 28), (2, 32)])
        )
      )
      
      Text
      if (TRUE) if (FALSE) 2 else NULL
      
      S-Expression
      (binary_operator [(3, 0), (3, 16)]
        lhs: (subset2 [(3, 0), (3, 11)]
          function: (extract_operator [(3, 0), (3, 6)]
            lhs: (namespace_operator [(3, 0), (3, 4)]
              lhs: (identifier [(3, 0), (3, 1)])
              operator: "::" [(3, 1), (3, 3)]
              rhs: (identifier [(3, 3), (3, 4)])
            )
            operator: "$" [(3, 4), (3, 5)]
            rhs: (identifier [(3, 5), (3, 6)])
          )
          arguments: (arguments [(3, 6), (3, 11)]
            open: "[[" [(3, 6), (3, 8)]
            argument: (argument [(3, 8), (3, 9)]
              value: (identifier [(3, 8), (3, 9)])
            )
            close: "]]" [(3, 9), (3, 11)]
          )
        )
        operator: "<-" [(3, 12), (3, 14)]
        rhs: (identifier [(3, 15), (3, 16)])
      )
      
      Text
      a::b$c[[d]] <- e
      
      S-Expression
      (binary_operator [(4, 0), (4, 30)]
        lhs: (binary_operator [(4, 0), (4, 24)]
          lhs: (binary_operator [(4, 0), (4, 19)]
            lhs: (binary_operator [(4, 0), (4, 12)]
              lhs: (true [(4, 0), (4, 4)])
              operator: "~" [(4, 5), (4, 6)]
              rhs: (false [(4, 7), (4, 12)])
            )
            operator: "~" [(4, 13), (4, 14)]
            rhs: (null [(4, 15), (4, 19)])
          )
          operator: "?" [(4, 20), (4, 21)]
          rhs: (na [(4, 22), (4, 24)]
            "NA" [(4, 22), (4, 24)]
          )
        )
        operator: "?" [(4, 25), (4, 26)]
        rhs: (nan [(4, 27), (4, 30)])
      )
      
      Text
      TRUE ~ FALSE ~ NULL ? NA ? NaN
      
      S-Expression
      (if_statement [(5, 0), (5, 15)]
        "if" [(5, 0), (5, 2)]
        open: "(" [(5, 3), (5, 4)]
        condition: (true [(5, 4), (5, 8)])
        close: ")" [(5, 8), (5, 9)]
        consequence: (false [(5, 10), (5, 15)])
      )
      
      Text
      if (TRUE) FALSE
      
      S-Expression
      (identifier [(6, 0), (6, 4)])
      
      Text
      else
      
      S-Expression
      (na [(6, 5), (6, 7)]
        "NA" [(6, 5), (6, 7)]
      )
      
      Text
      NA
      
      S-Expression
      (parenthesized_expression [(7, 0), (8, 8)]
        open: "(" [(7, 0), (7, 1)]
        body: (if_statement [(7, 1), (8, 7)]
          "if" [(7, 1), (7, 3)]
          open: "(" [(7, 4), (7, 5)]
          condition: (true [(7, 5), (7, 9)])
          close: ")" [(7, 9), (7, 10)]
          consequence: (false [(7, 11), (7, 16)])
          "else" [(8, 0), (8, 4)]
          alternative: (na [(8, 5), (8, 7)]
            "NA" [(8, 5), (8, 7)]
          )
        )
        close: ")" [(8, 7), (8, 8)]
      )
      
      Text
      (if (TRUE) FALSE
      else NA)
      
      S-Expression
      (binary_operator [(9, 0), (9, 16)]
        lhs: (binary_operator [(9, 0), (9, 8)]
          lhs: (identifier [(9, 0), (9, 1)])
          operator: "=" [(9, 2), (9, 3)]
          rhs: (true [(9, 4), (9, 8)])
        )
        operator: "?" [(9, 9), (9, 10)]
        rhs: (false [(9, 11), (9, 16)])
      )
      
      Text
      a = TRUE ? FALSE
      
      S-Expression
      (binary_operator [(10, 0), (10, 18)]
        lhs: (true [(10, 0), (10, 4)])
        operator: "<-" [(10, 5), (10, 7)]
        rhs: (binary_operator [(10, 8), (10, 18)]
          lhs: (false [(10, 8), (10, 13)])
          operator: "=" [(10, 14), (10, 15)]
          rhs: (na [(10, 16), (10, 18)]
            "NA" [(10, 16), (10, 18)]
          )
        )
      )
      
      Text
      TRUE <- FALSE = NA
      
      S-Expression
      (binary_operator [(11, 0), (11, 18)]
        lhs: (binary_operator [(11, 0), (11, 13)]
          lhs: (true [(11, 0), (11, 4)])
          operator: "<-" [(11, 5), (11, 7)]
          rhs: (false [(11, 8), (11, 13)])
        )
        operator: "?" [(11, 14), (11, 15)]
        rhs: (na [(11, 16), (11, 18)]
          "NA" [(11, 16), (11, 18)]
        )
      )
      
      Text
      TRUE <- FALSE ? NA
      
      S-Expression
      (binary_operator [(12, 0), (12, 17)]
        lhs: (binary_operator [(12, 0), (12, 12)]
          lhs: (true [(12, 0), (12, 4)])
          operator: "=" [(12, 5), (12, 6)]
          rhs: (false [(12, 7), (12, 12)])
        )
        operator: "?" [(12, 13), (12, 14)]
        rhs: (na [(12, 15), (12, 17)]
          "NA" [(12, 15), (12, 17)]
        )
      )
      
      Text
      TRUE = FALSE ? NA
      
      S-Expression
      (binary_operator [(13, 0), (13, 17)]
        lhs: (true [(13, 0), (13, 4)])
        operator: "?" [(13, 5), (13, 6)]
        rhs: (binary_operator [(13, 7), (13, 17)]
          lhs: (false [(13, 7), (13, 12)])
          operator: "=" [(13, 13), (13, 14)]
          rhs: (na [(13, 15), (13, 17)]
            "NA" [(13, 15), (13, 17)]
          )
        )
      )
      
      Text
      TRUE ? FALSE = NA
      

# precedence

    Code
      node_children_print(node)
    Output
      S-Expression
      (binary_operator [(1, 0), (1, 8)]
        lhs: (extract_operator [(1, 0), (1, 5)]
          lhs: (identifier [(1, 0), (1, 1)])
          operator: "$" [(1, 1), (1, 2)]
          rhs: (string [(1, 2), (1, 5)]
            "\"" [(1, 2), (1, 3)]
            content: (string_content [(1, 3), (1, 4)])
            "\"" [(1, 4), (1, 5)]
          )
        )
        operator: "^" [(1, 5), (1, 6)]
        rhs: (na [(1, 6), (1, 8)]
          "NA" [(1, 6), (1, 8)]
        )
      )
      
      Text
      A$"B"^NA
      
      S-Expression
      (extract_operator [(2, 0), (2, 6)]
        lhs: (namespace_operator [(2, 0), (2, 4)]
          lhs: (identifier [(2, 0), (2, 1)])
          operator: "::" [(2, 1), (2, 3)]
          rhs: (identifier [(2, 3), (2, 4)])
        )
        operator: "$" [(2, 4), (2, 5)]
        rhs: (identifier [(2, 5), (2, 6)])
      )
      
      Text
      a::b$c
      
      S-Expression
      (binary_operator [(3, 0), (3, 5)]
        lhs: (extract_operator [(3, 0), (3, 3)]
          lhs: (identifier [(3, 0), (3, 1)])
          operator: "$" [(3, 1), (3, 2)]
          rhs: (identifier [(3, 2), (3, 3)])
        )
        operator: "?" [(3, 3), (3, 4)]
        rhs: (identifier [(3, 4), (3, 5)])
      )
      
      Text
      a$b?c
      

# newlines

    Code
      node_children_print(node)
    Output
      S-Expression
      (identifier [(1, 0), (1, 5)])
      
      Text
      apple
      
      S-Expression
      (parenthesized_expression [(2, 0), (2, 8)]
        open: "(" [(2, 0), (2, 1)]
        body: (identifier [(2, 1), (2, 7)])
        close: ")" [(2, 7), (2, 8)]
      )
      
      Text
      (banana)
      
      S-Expression
      (braced_expression [(4, 0), (7, 1)]
        open: "{" [(4, 0), (4, 1)]
        body: (identifier [(5, 2), (5, 7)])
        body: (parenthesized_expression [(6, 2), (6, 10)]
          open: "(" [(6, 2), (6, 3)]
          body: (identifier [(6, 3), (6, 9)])
          close: ")" [(6, 9), (6, 10)]
        )
        close: "}" [(7, 0), (7, 1)]
      )
      
      Text
      {
        apple
        (banana)
      }
      
      S-Expression
      (parenthesized_expression [(9, 0), (12, 1)]
        open: "(" [(9, 0), (9, 1)]
        body: (call [(10, 2), (11, 10)]
          function: (identifier [(10, 2), (10, 7)])
          arguments: (arguments [(11, 2), (11, 10)]
            open: "(" [(11, 2), (11, 3)]
            argument: (argument [(11, 3), (11, 9)]
              value: (identifier [(11, 3), (11, 9)])
            )
            close: ")" [(11, 9), (11, 10)]
          )
        )
        close: ")" [(12, 0), (12, 1)]
      )
      
      Text
      (
        apple
        (banana)
      )
      

# motivation for not having `unmatched_delimiter` 1 (#90)

    Code
      node_children_print(node)
    Output
      S-Expression
      (comment [(1, 0), (1, 77)])
      
      Text
      # `if ()` is invalid R code because there isn't a `condition` between the two
      
      S-Expression
      (comment [(2, 0), (2, 74)])
      
      Text
      # `()`. We don't want tree-sitter to think `)` is an `unmatched_delimiter`
      
      S-Expression
      (comment [(3, 0), (3, 76)])
      
      Text
      # expression that it can accept as `condition`, we instead want to report an
      
      S-Expression
      (comment [(4, 0), (4, 44)])
      
      Text
      # error as close to the `()` as is possible.
      
      S-Expression
      (identifier [(6, 0), (6, 3)])
      
      Text
      foo
      
      S-Expression
      (ERROR [(6, 4), (10, 1)]
        "<-" [(6, 4), (6, 6)]
        "function" [(6, 7), (6, 15)]
        (parameters [(6, 15), (6, 17)]
          open: "(" [(6, 15), (6, 16)]
          close: ")" [(6, 16), (6, 17)]
        )
        "{" [(6, 18), (6, 19)]
        "if" [(7, 2), (7, 4)]
        "(" [(7, 5), (7, 6)]
        (ERROR [(7, 6), (7, 7)]
          (ERROR [(7, 6), (7, 7)])
        )
        (binary_operator [(9, 2), (9, 7)]
          lhs: (float [(9, 2), (9, 3)])
          operator: "+" [(9, 4), (9, 5)]
          rhs: (float [(9, 6), (9, 7)])
        )
        (ERROR [(10, 0), (10, 1)])
      )
      
      Text
      <- function() {
        if ()
      
        1 + 1
      }
      

# motivation for not having `unmatched_delimiter` 2 (#90)

    Code
      node_children_print(node)
    Output
      S-Expression
      (comment [(1, 0), (1, 80)])
      
      Text
      # Same argument as above, but in this case `unmatched_delimiter` made the entire
      
      S-Expression
      (comment [(2, 0), (2, 75)])
      
      Text
      # program show as ERROR with no sub-ERROR that would allow us to narrow the
      
      S-Expression
      (comment [(3, 0), (3, 8)])
      
      Text
      # scope.
      
      S-Expression
      (identifier [(5, 0), (5, 4)])
      
      Text
      blah
      
      S-Expression
      (ERROR [(5, 4), (15, 1)]
        "(" [(5, 4), (5, 5)]
        argument: (argument [(5, 5), (5, 10)]
          value: (string [(5, 5), (5, 10)]
            "'" [(5, 5), (5, 6)]
            content: (string_content [(5, 6), (5, 9)])
            "'" [(5, 9), (5, 10)]
          )
        )
        (comma [(5, 10), (5, 11)])
        (identifier [(6, 2), (6, 6)])
        "(" [(6, 6), (6, 7)]
        (identifier [(7, 4), (7, 7)])
        "=" [(7, 8), (7, 9)]
        "function" [(7, 10), (7, 18)]
        (parameters [(7, 18), (7, 20)]
          open: "(" [(7, 18), (7, 19)]
          close: ")" [(7, 19), (7, 20)]
        )
        "{" [(7, 21), (7, 22)]
        "if" [(8, 6), (8, 8)]
        "(" [(8, 9), (8, 10)]
        (ERROR [(8, 10), (9, 6)]
          (ERROR [(8, 10), (9, 5)])
          (comma [(9, 5), (9, 6)])
        )
        (binary_operator [(11, 4), (13, 5)]
          lhs: (identifier [(11, 4), (11, 8)])
          operator: "=" [(11, 9), (11, 10)]
          rhs: (function_definition [(11, 11), (13, 5)]
            name: "function" [(11, 11), (11, 19)]
            parameters: (parameters [(11, 19), (11, 21)]
              open: "(" [(11, 19), (11, 20)]
              close: ")" [(11, 20), (11, 21)]
            )
            body: (braced_expression [(11, 22), (13, 5)]
              open: "{" [(11, 22), (11, 23)]
              close: "}" [(13, 4), (13, 5)]
            )
          )
        )
        ")" [(14, 2), (14, 3)]
        (ERROR [(15, 0), (15, 1)])
      )
      
      Text
      ('foo',
        list(
          foo = function() {
            if ()
          },
      
          foo2 = function() {
      
          }
        )
      )
      

# motivation for not having `unmatched_delimiter` 3 (#90)

    Code
      node_children_print(node)
    Output
      S-Expression
      (comment [(1, 0), (1, 79)])
      
      Text
      # In this case we ideally want the `{}` to be a matching pair, and for there to
      
      S-Expression
      (comment [(2, 0), (2, 76)])
      
      Text
      # be a MISSING rhs of the `+` operator. This has proven difficult though, so
      
      S-Expression
      (comment [(3, 0), (3, 79)])
      
      Text
      # instead we end up reporting the `}` as a syntax error using a narrowly scoped
      
      S-Expression
      (comment [(4, 0), (4, 13)])
      
      Text
      # ERROR node.
      
      S-Expression
      (ERROR [(6, 0), (8, 1)]
        "{" [(6, 0), (6, 1)]
        (call [(7, 2), (7, 10)]
          function: (identifier [(7, 2), (7, 8)])
          arguments: (arguments [(7, 8), (7, 10)]
            open: "(" [(7, 8), (7, 9)]
            close: ")" [(7, 9), (7, 10)]
          )
        )
        "+" [(7, 11), (7, 12)]
        (ERROR [(8, 0), (8, 1)])
      )
      
      Text
      {
        ggplot() +
      }
      

