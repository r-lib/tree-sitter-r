# strings

    Code
      node_children_print(node)
    Output
      S-Expression
      (string [(1, 0), (1, 5)]
        "\"" [(1, 0), (1, 1)]
        content: (string_content [(1, 1), (1, 4)])
        "\"" [(1, 4), (1, 5)]
      )
      
      Text
      "foo"
      
      S-Expression
      (string [(2, 0), (3, 4)]
        "\"" [(2, 0), (2, 1)]
        content: (string_content [(2, 1), (3, 3)])
        "\"" [(3, 3), (3, 4)]
      )
      
      Text
      "foo
      bar"
      
      S-Expression
      (string [(4, 0), (7, 4)]
        "\"" [(4, 0), (4, 1)]
        content: (string_content [(4, 1), (7, 3)])
        "\"" [(7, 3), (7, 4)]
      )
      
      Text
      "foo
      
      
      bar"
      
      S-Expression
      (string [(8, 0), (8, 3)]
        "\"" [(8, 0), (8, 1)]
        content: (string_content [(8, 1), (8, 2)])
        "\"" [(8, 2), (8, 3)]
      )
      
      Text
      "#"
      
      S-Expression
      (string [(10, 0), (10, 5)]
        "'" [(10, 0), (10, 1)]
        content: (string_content [(10, 1), (10, 4)])
        "'" [(10, 4), (10, 5)]
      )
      
      Text
      'foo'
      
      S-Expression
      (string [(11, 0), (11, 3)]
        "'" [(11, 0), (11, 1)]
        content: (string_content [(11, 1), (11, 2)])
        "'" [(11, 2), (11, 3)]
      )
      
      Text
      '#'
      

# strings without content

    Code
      node_children_print(node)
    Output
      S-Expression
      (string [(1, 0), (1, 2)]
        "\"" [(1, 0), (1, 1)]
        "\"" [(1, 1), (1, 2)]
      )
      
      Text
      ""
      
      S-Expression
      (string [(2, 0), (2, 2)]
        "'" [(2, 0), (2, 1)]
        "'" [(2, 1), (2, 2)]
      )
      
      Text
      ''
      

# strings with escape sequences

    Code
      node_children_print(node)
    Output
      S-Expression
      (string [(1, 0), (1, 4)]
        "\"" [(1, 0), (1, 1)]
        content: (string_content [(1, 1), (1, 3)]
          (escape_sequence [(1, 1), (1, 3)])
        )
        "\"" [(1, 3), (1, 4)]
      )
      
      Text
      "\\"
      
      S-Expression
      (string [(2, 0), (2, 4)]
        "\"" [(2, 0), (2, 1)]
        content: (string_content [(2, 1), (2, 3)]
          (escape_sequence [(2, 1), (2, 3)])
        )
        "\"" [(2, 3), (2, 4)]
      )
      
      Text
      "\ "
      
      S-Expression
      (string [(3, 0), (3, 4)]
        "\"" [(3, 0), (3, 1)]
        content: (string_content [(3, 1), (3, 3)]
          (escape_sequence [(3, 1), (3, 3)])
        )
        "\"" [(3, 3), (3, 4)]
      )
      
      Text
      "\n"
      
      S-Expression
      (string [(4, 0), (4, 4)]
        "\"" [(4, 0), (4, 1)]
        content: (string_content [(4, 1), (4, 3)]
          (escape_sequence [(4, 1), (4, 3)])
        )
        "\"" [(4, 3), (4, 4)]
      )
      
      Text
      "\t"
      
      S-Expression
      (string [(5, 0), (5, 4)]
        "\"" [(5, 0), (5, 1)]
        content: (string_content [(5, 1), (5, 3)]
          (escape_sequence [(5, 1), (5, 3)])
        )
        "\"" [(5, 3), (5, 4)]
      )
      
      Text
      "\r"
      
      S-Expression
      (string [(6, 0), (6, 4)]
        "\"" [(6, 0), (6, 1)]
        content: (string_content [(6, 1), (6, 3)]
          (escape_sequence [(6, 1), (6, 3)])
        )
        "\"" [(6, 3), (6, 4)]
      )
      
      Text
      "\""
      
      S-Expression
      (string [(7, 0), (7, 4)]
        "'" [(7, 0), (7, 1)]
        content: (string_content [(7, 1), (7, 3)]
          (escape_sequence [(7, 1), (7, 3)])
        )
        "'" [(7, 3), (7, 4)]
      )
      
      Text
      '\''
      
      S-Expression
      (string [(9, 0), (9, 4)]
        "\"" [(9, 0), (9, 1)]
        content: (string_content [(9, 1), (9, 3)]
          (escape_sequence [(9, 1), (9, 3)])
        )
        "\"" [(9, 3), (9, 4)]
      )
      
      Text
      "\0"
      
      S-Expression
      (string [(10, 0), (10, 4)]
        "\"" [(10, 0), (10, 1)]
        content: (string_content [(10, 1), (10, 3)]
          (escape_sequence [(10, 1), (10, 3)])
        )
        "\"" [(10, 3), (10, 4)]
      )
      
      Text
      "\1"
      
      S-Expression
      (string [(11, 0), (11, 4)]
        "\"" [(11, 0), (11, 1)]
        content: (string_content [(11, 1), (11, 3)]
          (escape_sequence [(11, 1), (11, 3)])
        )
        "\"" [(11, 3), (11, 4)]
      )
      
      Text
      "\7"
      
      S-Expression
      (string [(12, 0), (12, 5)]
        "\"" [(12, 0), (12, 1)]
        content: (string_content [(12, 1), (12, 4)]
          (escape_sequence [(12, 1), (12, 4)])
        )
        "\"" [(12, 4), (12, 5)]
      )
      
      Text
      "\12"
      
      S-Expression
      (string [(13, 0), (13, 6)]
        "\"" [(13, 0), (13, 1)]
        content: (string_content [(13, 1), (13, 5)]
          (escape_sequence [(13, 1), (13, 5)])
        )
        "\"" [(13, 5), (13, 6)]
      )
      
      Text
      "\123"
      
      S-Expression
      (string [(14, 0), (14, 7)]
        "\"" [(14, 0), (14, 1)]
        content: (string_content [(14, 1), (14, 6)]
          (escape_sequence [(14, 1), (14, 5)])
        )
        "\"" [(14, 6), (14, 7)]
      )
      
      Text
      "\1234"
      
      S-Expression
      (string [(16, 0), (16, 5)]
        "\"" [(16, 0), (16, 1)]
        content: (string_content [(16, 1), (16, 4)]
          (escape_sequence [(16, 1), (16, 4)])
        )
        "\"" [(16, 4), (16, 5)]
      )
      
      Text
      "\x1"
      
      S-Expression
      (string [(17, 0), (17, 6)]
        "\"" [(17, 0), (17, 1)]
        content: (string_content [(17, 1), (17, 5)]
          (escape_sequence [(17, 1), (17, 5)])
        )
        "\"" [(17, 5), (17, 6)]
      )
      
      Text
      "\x01"
      
      S-Expression
      (string [(18, 0), (18, 7)]
        "\"" [(18, 0), (18, 1)]
        content: (string_content [(18, 1), (18, 6)]
          (escape_sequence [(18, 1), (18, 5)])
        )
        "\"" [(18, 6), (18, 7)]
      )
      
      Text
      "\x012"
      
      S-Expression
      (string [(20, 0), (20, 5)]
        "\"" [(20, 0), (20, 1)]
        content: (string_content [(20, 1), (20, 4)]
          (escape_sequence [(20, 1), (20, 4)])
        )
        "\"" [(20, 4), (20, 5)]
      )
      
      Text
      "\u1"
      
      S-Expression
      (string [(21, 0), (21, 6)]
        "\"" [(21, 0), (21, 1)]
        content: (string_content [(21, 1), (21, 5)]
          (escape_sequence [(21, 1), (21, 5)])
        )
        "\"" [(21, 5), (21, 6)]
      )
      
      Text
      "\u01"
      
      S-Expression
      (string [(22, 0), (22, 7)]
        "\"" [(22, 0), (22, 1)]
        content: (string_content [(22, 1), (22, 6)]
          (escape_sequence [(22, 1), (22, 6)])
        )
        "\"" [(22, 6), (22, 7)]
      )
      
      Text
      "\u001"
      
      S-Expression
      (string [(23, 0), (23, 8)]
        "\"" [(23, 0), (23, 1)]
        content: (string_content [(23, 1), (23, 7)]
          (escape_sequence [(23, 1), (23, 7)])
        )
        "\"" [(23, 7), (23, 8)]
      )
      
      Text
      "\u0001"
      
      S-Expression
      (string [(24, 0), (24, 9)]
        "\"" [(24, 0), (24, 1)]
        content: (string_content [(24, 1), (24, 8)]
          (escape_sequence [(24, 1), (24, 7)])
        )
        "\"" [(24, 8), (24, 9)]
      )
      
      Text
      "\u00011"
      
      S-Expression
      (string [(26, 0), (26, 7)]
        "\"" [(26, 0), (26, 1)]
        content: (string_content [(26, 1), (26, 6)]
          (escape_sequence [(26, 1), (26, 6)])
        )
        "\"" [(26, 6), (26, 7)]
      )
      
      Text
      "\u{1}"
      
      S-Expression
      (string [(27, 0), (27, 8)]
        "\"" [(27, 0), (27, 1)]
        content: (string_content [(27, 1), (27, 7)]
          (escape_sequence [(27, 1), (27, 7)])
        )
        "\"" [(27, 7), (27, 8)]
      )
      
      Text
      "\u{01}"
      
      S-Expression
      (string [(28, 0), (28, 9)]
        "\"" [(28, 0), (28, 1)]
        content: (string_content [(28, 1), (28, 8)]
          (escape_sequence [(28, 1), (28, 8)])
        )
        "\"" [(28, 8), (28, 9)]
      )
      
      Text
      "\u{001}"
      
      S-Expression
      (string [(29, 0), (29, 10)]
        "\"" [(29, 0), (29, 1)]
        content: (string_content [(29, 1), (29, 9)]
          (escape_sequence [(29, 1), (29, 9)])
        )
        "\"" [(29, 9), (29, 10)]
      )
      
      Text
      "\u{0001}"
      
      S-Expression
      (string [(31, 0), (31, 7)]
        "\"" [(31, 0), (31, 1)]
        content: (string_content [(31, 1), (31, 6)]
          (escape_sequence [(31, 1), (31, 6)])
        )
        "\"" [(31, 6), (31, 7)]
      )
      
      Text
      "\U{1}"
      
      S-Expression
      (string [(32, 0), (32, 8)]
        "\"" [(32, 0), (32, 1)]
        content: (string_content [(32, 1), (32, 7)]
          (escape_sequence [(32, 1), (32, 7)])
        )
        "\"" [(32, 7), (32, 8)]
      )
      
      Text
      "\U{01}"
      
      S-Expression
      (string [(33, 0), (33, 9)]
        "\"" [(33, 0), (33, 1)]
        content: (string_content [(33, 1), (33, 8)]
          (escape_sequence [(33, 1), (33, 8)])
        )
        "\"" [(33, 8), (33, 9)]
      )
      
      Text
      "\U{001}"
      
      S-Expression
      (string [(34, 0), (34, 10)]
        "\"" [(34, 0), (34, 1)]
        content: (string_content [(34, 1), (34, 9)]
          (escape_sequence [(34, 1), (34, 9)])
        )
        "\"" [(34, 9), (34, 10)]
      )
      
      Text
      "\U{0001}"
      
      S-Expression
      (string [(35, 0), (35, 11)]
        "\"" [(35, 0), (35, 1)]
        content: (string_content [(35, 1), (35, 10)]
          (escape_sequence [(35, 1), (35, 10)])
        )
        "\"" [(35, 10), (35, 11)]
      )
      
      Text
      "\U{00001}"
      
      S-Expression
      (string [(36, 0), (36, 12)]
        "\"" [(36, 0), (36, 1)]
        content: (string_content [(36, 1), (36, 11)]
          (escape_sequence [(36, 1), (36, 11)])
        )
        "\"" [(36, 11), (36, 12)]
      )
      
      Text
      "\U{000001}"
      
      S-Expression
      (string [(37, 0), (37, 13)]
        "\"" [(37, 0), (37, 1)]
        content: (string_content [(37, 1), (37, 12)]
          (escape_sequence [(37, 1), (37, 12)])
        )
        "\"" [(37, 12), (37, 13)]
      )
      
      Text
      "\U{0000001}"
      
      S-Expression
      (string [(38, 0), (38, 14)]
        "\"" [(38, 0), (38, 1)]
        content: (string_content [(38, 1), (38, 13)]
          (escape_sequence [(38, 1), (38, 13)])
        )
        "\"" [(38, 13), (38, 14)]
      )
      
      Text
      "\U{00000001}"
      
      S-Expression
      (string [(40, 0), (40, 5)]
        "\"" [(40, 0), (40, 1)]
        content: (string_content [(40, 1), (40, 4)]
          (escape_sequence [(40, 1), (40, 4)])
        )
        "\"" [(40, 4), (40, 5)]
      )
      
      Text
      "\U1"
      
      S-Expression
      (string [(41, 0), (41, 6)]
        "\"" [(41, 0), (41, 1)]
        content: (string_content [(41, 1), (41, 5)]
          (escape_sequence [(41, 1), (41, 5)])
        )
        "\"" [(41, 5), (41, 6)]
      )
      
      Text
      "\U01"
      
      S-Expression
      (string [(42, 0), (42, 7)]
        "\"" [(42, 0), (42, 1)]
        content: (string_content [(42, 1), (42, 6)]
          (escape_sequence [(42, 1), (42, 6)])
        )
        "\"" [(42, 6), (42, 7)]
      )
      
      Text
      "\U001"
      
      S-Expression
      (string [(43, 0), (43, 8)]
        "\"" [(43, 0), (43, 1)]
        content: (string_content [(43, 1), (43, 7)]
          (escape_sequence [(43, 1), (43, 7)])
        )
        "\"" [(43, 7), (43, 8)]
      )
      
      Text
      "\U0001"
      
      S-Expression
      (string [(44, 0), (44, 9)]
        "\"" [(44, 0), (44, 1)]
        content: (string_content [(44, 1), (44, 8)]
          (escape_sequence [(44, 1), (44, 8)])
        )
        "\"" [(44, 8), (44, 9)]
      )
      
      Text
      "\U00001"
      
      S-Expression
      (string [(45, 0), (45, 10)]
        "\"" [(45, 0), (45, 1)]
        content: (string_content [(45, 1), (45, 9)]
          (escape_sequence [(45, 1), (45, 9)])
        )
        "\"" [(45, 9), (45, 10)]
      )
      
      Text
      "\U000001"
      
      S-Expression
      (string [(46, 0), (46, 11)]
        "\"" [(46, 0), (46, 1)]
        content: (string_content [(46, 1), (46, 10)]
          (escape_sequence [(46, 1), (46, 10)])
        )
        "\"" [(46, 10), (46, 11)]
      )
      
      Text
      "\U0000001"
      
      S-Expression
      (string [(47, 0), (47, 12)]
        "\"" [(47, 0), (47, 1)]
        content: (string_content [(47, 1), (47, 11)]
          (escape_sequence [(47, 1), (47, 11)])
        )
        "\"" [(47, 11), (47, 12)]
      )
      
      Text
      "\U00000001"
      
      S-Expression
      (string [(48, 0), (48, 13)]
        "\"" [(48, 0), (48, 1)]
        content: (string_content [(48, 1), (48, 12)]
          (escape_sequence [(48, 1), (48, 11)])
        )
        "\"" [(48, 12), (48, 13)]
      )
      
      Text
      "\U000000011"
      
      S-Expression
      (string [(50, 0), (50, 10)]
        "\"" [(50, 0), (50, 1)]
        content: (string_content [(50, 1), (50, 9)]
          (escape_sequence [(50, 4), (50, 6)])
        )
        "\"" [(50, 9), (50, 10)]
      )
      
      Text
      "foo\"bar"
      
      S-Expression
      (string [(51, 0), (51, 12)]
        "\"" [(51, 0), (51, 1)]
        content: (string_content [(51, 1), (51, 11)]
          (escape_sequence [(51, 4), (51, 6)])
          (escape_sequence [(51, 9), (51, 11)])
        )
        "\"" [(51, 11), (51, 12)]
      )
      
      Text
      "foo\"bar\""
      
      S-Expression
      (string [(52, 0), (52, 7)]
        "\"" [(52, 0), (52, 1)]
        content: (string_content [(52, 1), (52, 6)]
          (escape_sequence [(52, 4), (52, 6)])
        )
        "\"" [(52, 6), (52, 7)]
      )
      
      Text
      "foo\ "
      
      S-Expression
      (string [(53, 0), (54, 1)]
        "\"" [(53, 0), (53, 1)]
        content: (string_content [(53, 1), (54, 0)]
          (escape_sequence [(53, 4), (54, 0)])
        )
        "\"" [(54, 0), (54, 1)]
      )
      
      Text
      "foo\
      "
      

# invalid strings 1

    Code
      node_children_print(node)
    Output
      S-Expression
      (ERROR [(1, 0), (1, 2)]
        "\"" [(1, 0), (1, 1)]
        "\\" [(1, 1), (1, 2)]
      )
      
      Text
      "\
      
      S-Expression
      (identifier [(1, 2), (1, 3)])
      
      Text
      u
      
      S-Expression
      (braced_expression [(1, 3), (1, 10)]
        open: "{" [(1, 3), (1, 4)]
        body: (float [(1, 4), (1, 9)])
        close: "}" [(1, 9), (1, 10)]
      )
      
      Text
      {00001}
      
      S-Expression
      (string [(1, 10), (2, 0)]
        "\"" [(1, 10), (1, 11)]
        content: (string_content [(1, 11), (2, 0)])
        "\"" MISSING [(2, 0), (2, 0)]
      )
      
      Text
      "
      
      

# invalid strings 2

    Code
      node_children_print(node)
    Output
      S-Expression
      (ERROR [(1, 0), (1, 2)]
        "\"" [(1, 0), (1, 1)]
        "\\" [(1, 1), (1, 2)]
      )
      
      Text
      "\
      
      S-Expression
      (identifier [(1, 2), (1, 3)])
      
      Text
      U
      
      S-Expression
      (braced_expression [(1, 3), (1, 14)]
        open: "{" [(1, 3), (1, 4)]
        body: (float [(1, 4), (1, 13)])
        close: "}" [(1, 13), (1, 14)]
      )
      
      Text
      {000000001}
      
      S-Expression
      (string [(1, 14), (2, 0)]
        "\"" [(1, 14), (1, 15)]
        content: (string_content [(1, 15), (2, 0)])
        "\"" MISSING [(2, 0), (2, 0)]
      )
      
      Text
      "
      
      

# invalid strings 3

    Code
      node_children_print(node)
    Output
      S-Expression
      (string [(1, 0), (1, 4)]
        "\"" [(1, 0), (1, 1)]
        (ERROR [(1, 1), (1, 3)]
          "\\" [(1, 1), (1, 2)]
        )
        "\"" [(1, 3), (1, 4)]
      )
      
      Text
      "\8"
      

# invalid strings 4

    Code
      node_children_print(node)
    Output
      S-Expression
      (string [(1, 0), (1, 4)]
        "\"" [(1, 0), (1, 1)]
        (ERROR [(1, 1), (1, 3)]
          "\\" [(1, 1), (1, 2)]
          (identifier [(1, 2), (1, 3)])
        )
        "\"" [(1, 3), (1, 4)]
      )
      
      Text
      "\x"
      

# raw strings

    Code
      node_children_print(node)
    Output
      S-Expression
      (string [(1, 0), (1, 15)])
      
      Text
      r"(raw string)"
      
      S-Expression
      (string [(2, 0), (2, 23)])
      
      Text
      R"{another raw string}"
      
      S-Expression
      (string [(3, 0), (3, 34)])
      
      Text
      R"--[yet another ]- raw string]--"
      
      S-Expression
      (string [(5, 0), (5, 6)])
      
      Text
      r"(")"
      
      S-Expression
      (string [(6, 0), (6, 7)])
      
      Text
      r"("")"
      
      S-Expression
      (string [(7, 0), (7, 6)])
      
      Text
      r"(')"
      
      S-Expression
      (string [(8, 0), (8, 7)])
      
      Text
      r"('')"
      
      S-Expression
      (string [(10, 0), (10, 8)])
      
      Text
      r"-(-)-"
      
      S-Expression
      (string [(11, 0), (11, 9)])
      
      Text
      r"-()-)-"
      
      S-Expression
      (string [(12, 0), (12, 12)])
      
      Text
      r"--()-")--"
      
      S-Expression
      (string [(14, 0), (14, 9)])
      
      Text
      r"( () )"
      
      S-Expression
      (string [(15, 0), (15, 7)])
      
      Text
      r"(())"
      
      S-Expression
      (string [(16, 0), (16, 8)])
      
      Text
      r"( ())"
      
      S-Expression
      (string [(17, 0), (17, 8)])
      
      Text
      r"(() )"
      
      S-Expression
      (string [(18, 0), (18, 8)])
      
      Text
      r"-())-"
      
      S-Expression
      (string [(19, 0), (19, 11)])
      
      Text
      r"-(())-)-"
      
      S-Expression
      (string [(21, 0), (23, 2)])
      
      Text
      r"(raw
      string
      )"
      
      S-Expression
      (call [(25, 0), (25, 3)]
        function: (identifier [(25, 0), (25, 1)])
        arguments: (arguments [(25, 1), (25, 3)]
          open: "(" [(25, 1), (25, 2)]
          close: ")" [(25, 2), (25, 3)]
        )
      )
      
      Text
      r()
      

