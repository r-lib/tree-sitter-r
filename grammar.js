
// The R 4.2.0 syntax table, from ?Syntax:
//
//  ":: :::"           access variables in a namespace
//  "$ @"              component / slot extraction
//  "[ [["             indexing
//  "^"                exponentiation (right to left)
//  "- +"              unary minus and plus
//  ":"                sequence operator
//  "%any% |>"         special operators (including "%%" and "%/%")
//  "* /"              multiply, divide
//  "+ -"              (binary) add, subtract
//  "< > <= >= == !="  ordering and comparison
//  "!"                negation
//  "&  &&"            and
//  "| ||"             or
//  "~"                as in formulae
//  "-> ->>"           rightwards assignment
//  "<- <<-"           assignment (right to left)
//  "="                assignment (right to left)
//  "?"                help (unary and binary)
//
// R also has an operator precedence table defined here:
//
// https://github.com/wch/r-source/blob/36008873fb8ca2af3bdaaff418dbade5f7bce118/src/main/gram.y#L414-L436
//
// However, the effective precedence of "?" and "=" is a bit different, as R
// defines special reduction rules for these operators:
//
// https://github.com/wch/r-source/blob/36008873fb8ca2af3bdaaff418dbade5f7bce118/src/main/gram.y#L440-L453
//
// Rather than try to replicate those reduction rules, we just adjust the
// operator precedence to match the declared precedence in the R syntax table,
// while allowing for R's declared precedence differences between certain
// control flow keywords.

const PREC = {
  // ?
  HELP: { ASSOC: prec.left, RANK: 1 },

  // function() {}
  FUNCTION: { ASSOC: prec.left, RANK: 2 },

  // while() {}
  WHILE: { ASSOC: prec.left, RANK: 2 },

  // for() {}
  FOR: { ASSOC: prec.left, RANK: 2 },

  // repeat {}
  REPEAT: { ASSOC: prec.left, RANK: 2 },

  // if {} else {}
  IF: { ASSOC: prec.right, RANK: 3 },
  ELSE: { ASSOC: prec.left, RANK: 4 },

  // <-, <<-, :=
  LEFT_ASSIGN: { ASSOC: prec.right, RANK: 5 },

  // =
  EQUALS_ASSIGN: { ASSOC: prec.right, RANK: 6 },

  // ->, ->>
  RIGHT_ASSIGN: { ASSOC: prec.left, RANK: 7 },

  // ~
  TILDE: { ASSOC: prec.left, RANK: 8 },

  // |, ||
  OR: { ASSOC: prec.left, RANK: 9 },

  // &, &&
  AND: { ASSOC: prec.left, RANK: 10 },

  // !
  UNARY_NOT: { ASSOC: prec.left, RANK: 11 },

  // >, >=, <, <=, ==, !=
  // NOTE: These are nonassoc in R's grammar, but we have to specify
  // associativity to generate the grammar, and left seems correct.
  COMPARISON: { ASSOC: prec.left, RANK: 12 },

  // +, -
  PLUS_MINUS: { ASSOC: prec.left, RANK: 13 },

  // *, /
  MULTIPLY_DIVIDE: { ASSOC: prec.left, RANK: 14 },
  
  // %>%, %<>%
  SPECIAL: { ASSOC: prec.left, RANK: 15 },

  // |>
  PIPE: { ASSOC: prec.left, RANK: 15 },

  // =>
  PIPEBIND: { ASSOC: prec.left, RANK: 16 },

  // :
  COLON: { ASSOC: prec.left, RANK: 17 },

  // +, -
  UNARY_PLUS_MINUS: { ASSOC: prec.left, RANK: 18 },
  
  // ^, **
  EXPONENTIATE: { ASSOC: prec.right, RANK: 19 },

  // $, @
  EXTRACT: { ASSOC: prec.left, RANK: 20 },
  
  // ::, :::
  NAMESPACE: { ASSOC: prec.left, RANK: 21 },

  // match(1, 2), {, (, [, [[
  // NOTE: These are nonassoc in R's grammar
  CALL_OR_BLOCK: { ASSOC: prec.right, RANK: 22 }
}

module.exports = grammar({
  name: 'r',

  extras: $ => [
    $.comment,
    /\s/
  ],

  externals: $ => [
    $._newline,
    $._semicolon,
    $._raw_string_literal,
    // Don't use `_external` variants directly. Instead use their aliased versions.
    $._external_else,
    $._external_open_parenthesis,
    $._external_close_parenthesis,
    $._external_open_brace,
    $._external_close_brace,
    $._external_open_bracket,
    $._external_close_bracket,
    $._external_open_bracket2,
    $._external_close_bracket2
  ],

  word: $ => $._identifier,

  rules: {
    // Top-level rules.
    program: $ => repeat(choice($._expression, $._semicolon, $._newline)),

    // Function definitions.
    function_definition: $ => PREC.FUNCTION.ASSOC(PREC.FUNCTION.RANK, seq(
      choice("\\", "function"),
      field("parameters", $.function_parameters),
      repeat($._newline),
      field("body", $._expression)
    )),

    // NOTE: We include "(" and ")" as part of the rule here to allow
    // tree-sitter to create a "parameters" node in the AST even when
    // no parameters are declared for a function.
    function_parameters: $ => seq(
      $._open_parenthesis,
      optional(seq(
        field("parameter", $.function_parameter), 
        repeat(seq($.comma, field("parameter", $.function_parameter)))
      )),
      $._close_parenthesis
    ),

    function_parameter: $ => choice(
      $._function_parameter_with_default,
      $._function_parameter_without_default
    ),

    _function_parameter_with_default: $ => seq(
      field("name", $.identifier), 
      "=", 
      optional(field("default", $._expression))
    ),

    _function_parameter_without_default: $ => field("name", choice($.identifier, $.dots)),

    // Control flow.
    if_statement: $ => PREC.IF.ASSOC(PREC.IF.RANK, seq(
      "if",
      repeat($._newline),
      $._open_parenthesis,
      field("condition", $._expression),
      $._close_parenthesis,
      repeat($._newline),
      field("consequence", $._expression),
      // No `repeat($._newline)` here. Specially handled in the scanner instead.
      optional(seq(
        $._else, 
        field("alternative", $._expression)
      ))
    )),

    for_statement: $ => PREC.FOR.ASSOC(PREC.FOR.RANK, seq(
      "for",
      repeat($._newline),
      $._open_parenthesis,
      field("variable", $.identifier),
      "in",
      field("sequence", $._expression),
      $._close_parenthesis,
      repeat($._newline),
      field("body", $._expression)
    )),

    while_statement: $ => PREC.WHILE.ASSOC(PREC.WHILE.RANK, seq(
      "while",
      repeat($._newline),
      $._open_parenthesis,
      field("condition", $._expression),
      $._close_parenthesis,
      repeat($._newline),
      field("body", $._expression)
    )),

    repeat_statement: $ => PREC.REPEAT.ASSOC(PREC.REPEAT.RANK, seq(
      "repeat",
      repeat($._newline),
      field("body", $._expression)
    )),

    // Blocks.
    braces: $ => PREC.CALL_OR_BLOCK.ASSOC(PREC.CALL_OR_BLOCK.RANK, seq(
      $._open_brace,
      repeat(field("body", choice($._expression, $._semicolon, $._newline))),
      $._close_brace
    )),

    parentheses: $ => PREC.CALL_OR_BLOCK.ASSOC(PREC.CALL_OR_BLOCK.RANK, seq(
      $._open_parenthesis,
      repeat(field("body", choice($._expression, $._newline))),
      $._close_parenthesis
    )),

    // Function calls and subsetting.
    call: $ => PREC.CALL_OR_BLOCK.ASSOC(PREC.CALL_OR_BLOCK.RANK, seq(
      field("function", $._expression),
      field("arguments", $.call_arguments)
    )),

    subset: $ => PREC.CALL_OR_BLOCK.ASSOC(PREC.CALL_OR_BLOCK.RANK, seq(
      field("function", $._expression), 
      field("arguments", $.subset_arguments)
    )),

    subset2: $ => PREC.CALL_OR_BLOCK.ASSOC(PREC.CALL_OR_BLOCK.RANK, seq(
      field("function", $._expression), 
      field("arguments", $.subset2_arguments)
    )),

    // The actual matching rules for arguments in each of the above.
    // Semi-colons are not actually permitted here, but we add them to the rules to avoid
    // semi-colons erroneously closing a call.
    call_arguments: $ => seq(
      $._open_parenthesis, 
      optional($._arguments), 
      $._close_parenthesis
    ),
    subset_arguments: $ => seq(
      $._open_bracket, 
      optional($._arguments), 
      $._close_bracket
    ),
    subset2_arguments: $ => seq(
      $._open_bracket2, 
      optional($._arguments), 
      $._close_bracket2
    ),

    _arguments: $ => seq(
      field("argument", $.argument), 
      repeat(seq($.comma, field("argument", $.argument)))
    ),

    // An argument; either named or unnamed.
    argument: $ => choice(
      $._argument_named,
      $._argument_unnamed
    ),

    // Since `_argument_unnamed` can be an arbitrary `_expression` (with precedence 0)
    // which include `dots`, `string`, and `identifier`, there is an ambiguity. We need to
    // set a higher precedence here to try and match `_argument_named` first.
    _argument_named: $ => prec(1, seq(
      field("name", choice($.dots, $.identifier, $.string)),
      "=",
      optional($._argument_value)
    )),

    _argument_unnamed: $ => $._argument_value,

    _argument_value: $ => field("value", choice($._expression, $._newline)),

    // Help
    help: $ => choice(
      unaryRule($, "?", PREC.HELP),
      binaryRule($, "?", PREC.HELP)
    ),

    // Assignment
    left_assignment: $ => binaryRule($, "<-", PREC.LEFT_ASSIGN),
    left_super_assignment: $ => binaryRule($, "<<-", PREC.LEFT_ASSIGN),
    walrus_assignment: $ => binaryRule($, ":=", PREC.LEFT_ASSIGN),
    
    right_assignment: $ => binaryRule($, "->", PREC.RIGHT_ASSIGN),
    right_super_assignment: $ => binaryRule($, "->>", PREC.RIGHT_ASSIGN),

    equals_assignment: $ => binaryRule($, "=", PREC.EQUALS_ASSIGN),

    // Tilde
    tilde: $ => choice(
      unaryRule($, "~", PREC.TILDE),
      binaryRule($, "~", PREC.TILDE)
    ),

    // Pipe and pipebind
    pipe: $ => binaryRule($, "|>", PREC.PIPE),
    pipebind: $ => binaryRule($, "=>", PREC.PIPEBIND),

    // Unary operator
    // NOTE: Unary `?` and `~` are lumped with their binary version for clarity
    unary_operator: $ => {
      const table = [
        ["!", PREC.UNARY_NOT],
        ["+", PREC.UNARY_PLUS_MINUS],
        ["-", PREC.UNARY_PLUS_MINUS]
      ];
      return choice(
        ...table.map(([operator, prec]) => unaryRule($, operator, prec))
      )
    },

    // Logical operators (vectorized)
    logical_operator: $ => {
      const table = [
        ["|", PREC.OR],
        ["&", PREC.AND]
      ];
      return choice(
        ...table.map(([operator, prec]) => binaryRule($, operator, prec))
      )
    },

    // Logical operators (scalar)
    logical_scalar_operator: $ => {
      const table = [
        ["||", PREC.OR],
        ["&&", PREC.AND]
      ];
      return choice(
        ...table.map(([operator, prec]) => binaryRule($, operator, prec))
      )
    },

    // Comparison operators
    // From ?`<`
    comparison_operator: $ => {
      const table = [
        ["<", PREC.COMPARISON],
        ["<=", PREC.COMPARISON],
        [">", PREC.COMPARISON],
        [">=", PREC.COMPARISON],
        ["==", PREC.COMPARISON],
        ["!=", PREC.COMPARISON]
      ];
      return choice(
        ...table.map(([operator, prec]) => binaryRule($, operator, prec))
      )
    },

    // Arithmetic operators
    // From ?`+`
    arithmetic_operator: $ => {
      const table = [
        ["+", PREC.PLUS_MINUS],
        ["-", PREC.PLUS_MINUS],
        ["*", PREC.MULTIPLY_DIVIDE],
        ["/", PREC.MULTIPLY_DIVIDE],
        ["**", PREC.EXPONENTIATE],
        ["^", PREC.EXPONENTIATE],
        // TODO: Is this right? We don't want anything between them at all.
        [alias(/%[^%]*%/, "%%"), PREC.SPECIAL],
        ["%/%", PREC.SPECIAL]
      ];
      return choice(
        ...table.map(([operator, prec]) => binaryRule($, operator, prec))
      )
    },

    // TODO: Special?

    // Colon
    colon: $ => binaryRule($, ":", PREC.COLON),

    // Extractors
    dollar: $ => binaryRuleExtract($, "$", PREC.EXTRACT),
    at: $ => binaryRuleExtract($, "@", PREC.EXTRACT),

    // Namespace operators
    namespace: $ => binaryRuleNamespace($, "::", PREC.NAMESPACE),
    namespace_internal: $ => binaryRuleNamespace($, ":::", PREC.NAMESPACE),

    // Numeric literals.
    integer: $ => seq($._float_literal, "L"),
    complex: $ => seq($._float_literal, "i"),
    float: $ => $._float_literal,

    _hex_literal: $ => seq(/0[xX][0-9a-fA-F]+/),
    _number_literal: $ => /(?:(?:\d+(?:\.\d*)?)|(?:\.\d+))(?:[eE][+-]?\d*)?/,
    _float_literal: $ => choice($._hex_literal, $._number_literal),

    // Strings.
    // Regex is: "Between two quote characters, allow either backslash followed by any
    // character (i.e. escape sequence) or any character except that quote character or
    // a bare backtick."
    string: $ => choice(
      $._raw_string_literal,
      /'((?:\\(.|\n))|[^'\\])*'/,
      /"((?:\\(.|\n))|[^"\\])*"/,
    ),

    // Identifiers.
    identifier: $ => choice(
      token("_"), 
      $._identifier, 
      $._quoted_identifier
    ),
    _identifier: $ => /[\p{XID_Start}.][\p{XID_Continue}.]*/,
    _quoted_identifier: $ => /`((?:\\(.|\n))|[^`\\])*`/,

    // Miscellaneous tokens
    dot_dot_i: $ => token(/[.][.]\d+/),
    dots: $ => token("..."),

    // Keywords
    // NOTE: We only include keywords which aren't included as part of special forms.
    // In other words, no keywords used in special control-flow constructions.
    return: $ => "return",
    next: $ => "next",
    break: $ => "break", 
    true: $ => "TRUE",
    false: $ => "FALSE",
    null: $ => "NULL",
    inf: $ => "Inf",
    nan: $ => "NaN",

    na: $ => choice(
      "NA", 
      "NA_integer_", 
      "NA_real_", 
      "NA_complex_", 
      "NA_character_"
    ),

    // A general R expression.
    _expression: $ => choice(
      $.function_definition,

      $.if_statement,
      $.for_statement,
      $.while_statement,
      $.repeat_statement,

      $.braces,
      $.parentheses,

      $.call,
      $.subset,
      $.subset2,

      $.help,

      $.left_assignment,
      $.left_super_assignment,
      $.walrus_assignment,
      $.right_assignment,
      $.right_super_assignment,
      $.equals_assignment,

      $.tilde,

      $.pipe,
      $.pipebind,

      $.unary_operator,
      $.logical_operator,
      $.logical_scalar_operator,
      $.comparison_operator,
      $.arithmetic_operator,

      $.colon,

      $.dollar,
      $.at,

      $.namespace,
      $.namespace_internal,

      $.integer,
      $.complex,
      $.float,

      $.string,

      $.identifier,

      $.dot_dot_i,
      $.dots,

      $.return,
      $.next,
      $.break,
      $.true,
      $.false,
      $.null,
      $.inf,
      $.nan,
      $.na,

      $.unmatched_closing_brace,
      $.unmatched_closing_parenthesis,
      $.unmatched_closing_bracket
    ),

    // Comments.
    comment: $ => /#.*/,

    // Commas. We include these in the AST so we can figure out the
    // argument call position. This is necessary given how R tolerates
    // missing arguments in function calls.
    comma: $ => ",",

    // Check for un-matched closing brackets. This allows us to recover in
    // cases where the parse tree is temporarily incorrect, e.g. because the
    // user has removed the opening bracket associated with some closing bracket.
    unmatched_closing_brace: $ => /\}/,
    unmatched_closing_parenthesis: $ => /\)/,
    unmatched_closing_bracket: $ => /\]/,

    // This somehow ends up allowing better error recovery
    _string_or_identifier: $ => choice($.string, $.identifier),

    // Provide aliasing of some key externals
    _else: $ => alias($._external_else, "else"),
    _open_parenthesis: $ => alias($._external_open_parenthesis, "("),
    _close_parenthesis: $ => alias($._external_close_parenthesis, ")"),
    _open_brace: $ => alias($._external_open_brace, "{"),
    _close_brace: $ => alias($._external_close_brace, "}"),
    _open_bracket: $ => alias($._external_open_bracket, "["),
    _close_bracket: $ => alias($._external_close_bracket, "]"),
    _open_bracket2: $ => alias($._external_open_bracket2, "[["),
    _close_bracket2: $ => alias($._external_close_bracket2, "]]")
  }
})

// NOTE: Newlines are allowed after all unary operators
function unaryRule($, operator, prec) {
  return prec.ASSOC(prec.RANK, seq(
    field("operator", operator), 
    repeat($._newline),
    field("rhs", $._expression)
  ));
}

// The typical case, where expressions are allowed on either side
function binaryRule($, operator, prec) {
  return prec.ASSOC(prec.RANK, seq(
    field("lhs", $._expression), 
    field("operator", operator), 
    repeat($._newline), 
    field("rhs", $._expression)
  ));
}

// Expression on LHS, string or identifier on RHS
function binaryRuleExtract($, operator, prec) {
  return prec.ASSOC(prec.RANK, seq(
    field("lhs", $._expression), 
    field("operator", operator), 
    repeat($._newline), 
    field("rhs", $._string_or_identifier)
  ));
}

// String or identifier on both sides
function binaryRuleNamespace($, operator, prec) {
  // Note, no allowance for newlines
  return prec.ASSOC(prec.RANK, seq(
    field("lhs", $._string_or_identifier), 
    field("operator", operator), 
    field("rhs", $._string_or_identifier)
  ));
}

// ---------------------------------------------------------------------------------------
// 
// // Precedence table for unary operators.
// const UNARY_OPERATORS = {
//   "?": [prec.left, 1],
//   "~": [prec.left, 5],
//   "!": [prec.left, 8],
//   "+": [prec.left, 14],
//   "-": [prec.left, 14]
// };
// 
// // Precedence table for binary operators.
// const BINARY_OPERATORS = {
//   "?":    [prec.left,  1],
//   ":=":   [prec.right, 2],
//   "=":    [prec.right, 3],
//   "<-":   [prec.right, 3],
//   "<<-":  [prec.right, 3],
//   "->":   [prec.left,  4],
//   "->>":  [prec.left,  4],
//   "~":    [prec.left,  5],
//   "|>":   [prec.left,  6],
//   "=>":   [prec.left,  6],
//   "||":   [prec.left,  7],
//   "|":    [prec.left,  7],
//   "&&":   [prec.left,  8],
//   "&":    [prec.left,  8],
//   "<":    [prec.left,  9],
//   "<=":   [prec.left,  9],
//   ">":    [prec.left,  9],
//   ">=":   [prec.left,  9],
//   "==":   [prec.left,  9],
//   "!=":   [prec.left,  9],
//   "+":    [prec.left,  10],
//   "-":    [prec.left,  10],
//   "*":    [prec.left,  11],
//   "/":    [prec.left,  11],
//   "%<>%": [prec.left,  12],
//   "%$%":  [prec.left,  12],
//   "%!>%": [prec.left,  12],
//   "%>%":  [prec.left,  12],
//   "%T>%": [prec.left,  12],
//   "%%":   [prec.left,  12],
//   ":":    [prec.left,  13],
//   "**":   [prec.right, 15],
//   "^":    [prec.right, 15],
//   "$":    [prec.left,  18],
//   "@":    [prec.left,  18],
//   "::":   [prec.left,  20],
//   ":::":  [prec.left,  20],
// };
// 
// // All operators.
// let OPERATORS = [...new Set([
//   ...Object.keys(UNARY_OPERATORS),
//   ...Object.keys(BINARY_OPERATORS)
// ])];
// 
// // NOTE: We only include keywords which aren't included as part of special forms.
// // In other words, no keywords used in special control-flow constructions.
// const KEYWORDS = [
//   "return", "next", "break", "TRUE", "FALSE", "NULL", "Inf", "NaN",
//   "NA", "NA_integer_", "NA_real_", "NA_complex_", "NA_character_",
// ];
// 
// function commaSep1($, rule) {
//   return seq(rule, repeat(seq($.comma, rule)));
// }
// 
// function unaryRule($, rule, spec) {
//   const [assoc, prec] = spec;
//   return assoc(prec, seq(field("operator", rule), field("operand", $._expression)));
// }
// 
// function binaryRule($, rule, spec) {
// 
//   const [assoc, prec] = spec;
// 
//   // Special handling for '%%'.
//   if (rule === "%%") {
//     rule = alias(/%[^%]*%/, "%%");
//   }
// 
//   const inner = (rule === "::" || rule === ":::")
//     ? seq(field("lhs", $._expression), field("operator", rule), field("rhs", $._expression))
//     : seq(field("lhs", $._expression), field("operator", rule), repeat($._newline), field("rhs", $._expression));
// 
//   return assoc(prec, inner);
// 
// }
// 
// function operator($, rule) {
// 
//   // Get the precedence values.
//   const unarySpec  = UNARY_OPERATORS[rule];
//   const binarySpec = BINARY_OPERATORS[rule];
// 
//   // Build the operator rules.
//   // Note: newlines aren't permitted following a '::' or ':::'.
//   if (binarySpec == null) {
//     return unaryRule($, rule, unarySpec);
//   } else if (unarySpec == null) {
//     return binaryRule($, rule, binarySpec);
//   } else {
//     return choice(
//       unaryRule($, rule, unarySpec),
//       binaryRule($, rule, binarySpec)
//     );
//   }
// }
// 
// function generateKeywordRules($) {
//   return KEYWORDS.reduce((object, item) => {
//     object[item] = $ => item;
//     return object;
//   }, {});
// }
// 
// function keywordRules($) {
//   return KEYWORDS.map((value) => $[value]);
// }
// 
// function generateOperatorRules($) {
//   return OPERATORS.reduce((rules, key) => {
//     rules[key] = $ => operator($, key);
//     return rules;
//   }, {});
// }
// 
// function operatorRules($) {
//   return OPERATORS.map((key) => {
//     return $[key];
//   });
// }
// 
// module.exports = grammar({
// 
//   name: "r",
// 
//   extras: $ => [
//     $.comment,
//     /\s/
//   ],
// 
//   externals: $ => [
//     $._newline,
//     $._semicolon,
//     $._else,
//     $._raw_string_literal,
//     "(",
//     ")",
//     "{",
//     "}",
//     "[",
//     "]",
//     "[[",
//     "]]",
//   ],
// 
//   word: $ => $._identifier,
// 
//   rules: {
// 
//     // Top-level rules.
//     program: $ => repeat(choice($._expression, $._semicolon, $._newline)),
// 
//     // Function definitions.
//     function: $ => prec.right(seq(
//       choice("\\", "function"),
//       field("parameters", $.parameters),
//       repeat($._newline),
//       optional(field("body", $._expression))
//     )),
// 
//     // NOTE: We include "(" and ")" as part of the rule here to allow
//     // tree-sitter to create a "parameters" node in the AST even when
//     // no parameters are declared for a function.
//     parameters: $ => seq(
//       "(",
//       optional(commaSep1($, field("parameter", $.parameter))),
//       ")"
//     ),
// 
//     parameter: $ => choice(
//       seq(field("name", $.identifier), "=", optional(field("default", $._expression))),
//       field("name", choice($.identifier, $.dots))
//     ),
// 
//     // Control flow.
//     if: $ => prec.right(seq(
//       "if",
//       repeat($._newline),
//       "(",
//       field("condition", $._expression),
//       ")",
//       repeat($._newline),
//       field("consequence", $._expression),
//       // No `repeat($._newline)` here. Specially handled in the scanner instead.
//       optional(seq(alias($._else, "else"), field("alternative", $._expression)))
//     )),
// 
//     for: $ => prec.right(seq(
//       "for",
//       repeat($._newline),
//       "(",
//       field("variable", $.identifier),
//       "in",
//       field("sequence", $._expression),
//       ")",
//       repeat($._newline),
//       optional(field("body", $._expression))
//     )),
// 
//     while: $ => prec.right(seq(
//       "while",
//       repeat($._newline),
//       "(",
//       field("condition", $._expression),
//       ")",
//       repeat($._newline),
//       optional(field("body", $._expression))
//     )),
// 
//     repeat: $ => prec.right(seq(
//       "repeat",
//       repeat($._newline),
//       optional(field("body", $._expression))
//     )),
// 
//     // Blocks.
//     "{": $ => prec.right(seq(
//       "{",
//       repeat(field("body", choice($._expression, $._semicolon, $._newline))),
//       optional("}")
//     )),
// 
//     "(": $ => prec.right(seq(
//       "(",
//       repeat(field("body", choice($._expression, $._newline))),
//       optional(")")
//     )),
// 
//     // Function calls and subsetting.
//     call: $ => prec.right(16, seq($._expression, field("arguments", alias($._call_arguments,    $.arguments)))),
//     "[":  $ => prec.right(16, seq($._expression, field("arguments", alias($._subset_arguments,  $.arguments)))),
//     "[[": $ => prec.right(16, seq($._expression, field("arguments", alias($._subset2_arguments, $.arguments)))),
// 
//     // Dummy rule; used for aliasing so we can easily search the AST.
//     arguments: $ => $._expression,
// 
//     // The actual matching rules for arguments in each of the above.
//     // Semi-colons are not actually permitted here, but we add them to the rules to avoid
//     // semi-colons erroneously closing a call.
//     _call_arguments:    $ => prec.right(seq("(",  repeat(choice($.comma, $._semicolon, field("argument", $.argument))), optional(")"))),
//     _subset_arguments:  $ => prec.right(seq("[",  repeat(choice($.comma, $._semicolon, field("argument", $.argument))), optional("]"))),
//     _subset2_arguments: $ => prec.right(seq("[[", repeat(choice($.comma, $._semicolon, field("argument", $.argument))), optional("]]"))),
// 
//     // An argument; either named or unnamed.
//     argument: $ => prec.right(choice(
//       prec(1, seq(field("name", choice($.dots, $.identifier, $.string)), "=", optional(field("value", choice($._expression, $._newline))))),
//       prec(2, field("value", choice($._expression, $._newline)))
//     )),
// 
//     // Operators.
//     ...generateOperatorRules(),
// 
//     // Keywords.
//     ...generateKeywordRules(),
// 
//     // Miscellaneous.
//     "..i": $ => token(/[.][.]\d+/),
//     dots: $ => token("..."),
// 
//     // A general R expression.
//     _expression: $ => prec.right(choice(
// 
//       // Function definitions.
//       $.function,
// 
//       // Calls and subsets.
//       $.call, $["["], $["[["],
// 
//       // Control flow.
//       $.if, $.for, $.while, $.repeat, $.break, $.next,
// 
//       // Blocks.
//       $["{"], $["("],
// 
//       // Binary operators.
//       ...operatorRules($),
// 
//       // Keywords.
//       ...keywordRules($),
// 
//       // Dots.
//       $.dots,
// 
//       // E.g. '..1'
//       $["..i"],
// 
//       // Literals.
//       $.integer, $.float, $.complex, $.string,
// 
//       // Identifiers.
//       prec.left($.identifier),
// 
//       // Unmatched closing brackets.
//       $["}"], $[")"], $["]"]
// 
//     )),
// 
//     // Numeric literals.
//     _hex_literal: $ => seq(/0[xX][0-9a-fA-F]+/),
//     _number_literal: $ => /(?:(?:\d+(?:\.\d*)?)|(?:\.\d+))(?:[eE][+-]?\d*)?/,
//     _float_literal: $ => choice($._hex_literal, $._number_literal),
// 
//     integer: $ => seq($._float_literal, "L"),
//     complex: $ => seq($._float_literal, "i"),
//     float: $ => $._float_literal,
// 
//     // Strings.
//     // Regex is: "Between two quote characters, allow either backslash followed by any
//     // character (i.e. escape sequence) or any character except that quote character or
//     // a bare backtick."
//     string: $ => choice(
//       $._raw_string_literal,
//       /'((?:\\(.|\n))|[^'\\])*'/,
//       /"((?:\\(.|\n))|[^"\\])*"/,
//     ),
// 
//     // Identifiers.
//     _identifier: $ => /[\p{XID_Start}.][\p{XID_Continue}.]*/,
//     _quoted_identifier: $ => /`((?:\\(.|\n))|[^`\\])*`/,
//     identifier: $ => choice(token("_"), $._identifier, $._quoted_identifier),
// 
//     // Comments.
//     comment: $ => /#.*/,
// 
//     // Commas. We include these in the AST so we can figure out the
//     // argument call position. This is necessary given how R tolerates
//     // missing arguments in function calls.
//     comma: $ => ",",
// 
//     // Check for un-matched closing brackets. This allows us to recover in
//     // cases where the parse tree is temporarily incorrect, e.g. because the
//     // user has removed the opening bracket associated with some closing bracket.
//     "}": $ => /\}/,
//     ")": $ => /\)/,
//     "]": $ => /\]/
// 
//   }
// 
// });
