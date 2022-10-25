
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
//
// NOTE: For many binary operators, we choose to declare them as right-associative,
// with an optional right-hand operand. This is mainly because it allows tree-sitter
// to produce an AST with the binary operand created in the tree, but with the
// operand missing when unused. This makes introspection on the AST a bit easier.

// Precedence table for unary operators.
const UNARY_OPERATORS = {
  "?": 10,
  "~": 50,
  "!": 80,
  "+": 140,
  "-": 140
};

// Precedence table for binary operators.
const BINARY_OPERATORS = {
  "?":   10,
  ":=":  20,
  "=":   30,
  "<-":  30,
  "<<-": 30,
  "->":  40,
  "->>": 40,
  "~":   50,
  "|>":  60,
  "=>":  60,
  "||":  70,
  "|":   70,
  "&&":  80,
  "&":   80,
  "<":   90,
  "<=":  90,
  ">":   90,
  ">=":  90,
  "==":  90,
  "!=":  90,
  "+":   100,
  "-":   100,
  "*":   110,
  "/":   110,
  "%%":  120,
  ":":   130,
  "**":  150,
  "^":   150,
  "(":   170,
  "[":   170,
  "[[":  170,
  "$":   180,
  "@":   180,
  "::":  190,
  ":::": 190
};

function commaSep1(rule) {
  return seq(rule, repeat(seq(",", rule)));
}

function operator($, rule) {

  // Get the precedence values.
  const unaryPrecedence = UNARY_OPERATORS[rule];
  const binaryPrecedence = BINARY_OPERATORS[rule];

  // Special handling for '%%'.
  if (rule === '%%') {
    rule = /%[^%]*%/;
  }

  // Build the operator rules.
  const unaryRule = seq(rule, repeat("\n"), optional($._expression));
  const binaryRule = seq($._expression, rule, repeat("\n"), optional($._expression));

  // If we don't have a unary operator rule, return this one as-is.
  if (unaryPrecedence == null) {
    return prec.right(binaryPrecedence, binaryRule);
  } else {
    return choice(
      prec.right(unaryPrecedence, unaryRule),
      prec.right(binaryPrecedence, binaryRule)
    );
  }
}

module.exports = grammar({

  name: "r",

  extras: $ => [
    $.comment,
    /\s/
  ],

  externals: $ => [
    $._raw_string_literal
  ],

  word: $ => $._identifier,

  rules: {

    // Top-level rules.
    program: $ => repeat(seq($._expression, optional(choice(";", "\n")))),

    // Function definitions.
    function_definition: $ => prec.right(seq(
      choice("\\", "function"),
      $.parameters,
      optional($._expression)
    )),

    // NOTE: We include "(" and ")" as part of the rule here to allow
    // tree-sitter to create a "parameters" node in the AST even when
    // no parameters are declared for a function.
    parameters: $ => seq("(", optional(commaSep1($.parameter)), ")"),

    parameter: $ => choice(
      seq(field("name", $.identifier), "=", field("default", $._expression)),
      field("name", choice($.identifier, $.dots)),
    ),

    // Control flow.
    if: $ => prec.right(seq(
      "if",
      "(",
      field("condition", $._expression),
      ")",
      field("consequence", optional($._expression)),
      field("alternative", optional(seq("else", $._expression)))
    )),

    for: $ => prec.right(seq(
      "for",
      "(",
      field("variable", $.identifier),
      "in",
      field("sequence", $._expression),
      ")",
      field("body", optional($._expression))
    )),

    while: $ => prec.right(seq(
      "while",
      "(",
      field("condition", $._expression),
      ")",
      field("body", optional($._expression))
    )),

    repeat: $ => prec.right(seq(
      "repeat",
      field("body", optional($._expression))
    )),

    // Blocks.
    "{": $ => prec.right(seq(
      "{",
      repeat(choice($._expression, ";", "\n")),
      optional("}"),
    )),

    // Parenthetical blocks.
    "(": $ => prec.right(seq(
      "(",
      repeat(choice($._expression, ";", "\n")),
      optional(")")
    )),

    // Call and subset operators. Special handling as they can receive
    // multiple arguments separated by commas.
    call:    $ => prec.right(BINARY_OPERATORS["("],  seq($._expression, alias($._call_arguments, $.arguments))),
    subset:  $ => prec.right(BINARY_OPERATORS["["],  seq($._expression, alias($._subset_arguments, $.arguments))),
    subset2: $ => prec.right(BINARY_OPERATORS["[["], seq($._expression, alias($._subset2_arguments, $.arguments))),

    // Dummy rule; used for aliasing so we can easily search the AST.
    arguments: $ => $._expression,

    // The actual matching rules for arguments in each of the above.
    _call_arguments:    $ => prec.right(seq("(",  repeat(choice(",", $.argument)), optional(")"))),
    _subset_arguments:  $ => prec.right(seq("[",  repeat(choice(",", $.argument)), optional("]"))),
    _subset2_arguments: $ => prec.right(seq("[[", repeat(choice(",", $.argument)), optional("]]"))),

    // An argument; either named or unnamed.
    argument: $ => prec.right(choice(
      seq(field("name", $.identifier), "=", optional(field("value", $._expression))),
      field("value", $._expression)
    )),

    // Operators.
    "$":   $ => operator($, "$"),
    ":=":  $ => operator($, ":="),
    "=":   $ => operator($, "="),
    "?":   $ => operator($, "?"),
    ":=":  $ => operator($, ":="),
    "=":   $ => operator($, "="),
    "<-":  $ => operator($, "<-"),
    "<<-": $ => operator($, "<<-"),
    "->":  $ => operator($, "->"),
    "->>": $ => operator($, "->>"),
    "~":   $ => operator($, "~"),
    "|>":  $ => operator($, "|>"),
    "=>":  $ => operator($, "=>"),
    "||":  $ => operator($, "||"),
    "|":   $ => operator($, "|"),
    "&&":  $ => operator($, "&&"),
    "&":   $ => operator($, "&"),
    "<":   $ => operator($, "<"),
    "<=":  $ => operator($, "<="),
    ">":   $ => operator($, ">"),
    ">=":  $ => operator($, ">="),
    "==":  $ => operator($, "=="),
    "!=":  $ => operator($, "!="),
    "+":   $ => operator($, "+"),
    "-":   $ => operator($, "-"),
    "*":   $ => operator($, "*"),
    "/":   $ => operator($, "/"),
    "%%":  $ => operator($, "%%"),
    ":":   $ => operator($, ":"),
    "**":  $ => operator($, "**"),
    "^":   $ => operator($, "^"),
    "$":   $ => operator($, "$"),
    "@":   $ => operator($, "@"),
    "::":  $ => operator($, "::"),
    ":::": $ => operator($, ":::"),

    dots: $ => "...",

    placeholder: $ => "_",

    break: $ => "break",

    next: $ => "next",

    true: $ => "TRUE",
    false: $ => "FALSE",
    null: $ => "NULL",
    inf: $ => "Inf",
    nan: $ => "NaN",

    na: $ => choice(
      "NA",
      "NA_character_",
      "NA_complex_",
      "NA_integer_",
      "NA_real_"
    ),

    _expression: $ => prec.right(choice(

      // Function definitions.
      $.function_definition,

      // Calls and subsets.
      $.call, $.subset, $.subset2,

      // Control flow.
      $.if, $.for, $.while, $.repeat, $.break, $.next,

      // Blocks.
      $["{"], $["("],

      // Binary operators.
      $["$"], $[":="], $["="], $["?"], $[":="], $["="], $["<-"], $["<<-"], $["->"], $["->>"],
      $["~"], $["|>"], $["=>"], $["||"], $["|"], $["&&"], $["&"],
      $["<"], $["<="], $[">"], $[">="], $["=="], $["!="],
      $["+"], $["-"], $["*"], $["/"], $["%%"], $[":"], $["**"], $["^"],
      $["$"], $["@"], $["::"], $[":::"],

      // Keywords or special symbols.
      $.true, $.false, $.null, $.inf, $.nan, $.na, $.dots,

      // Literals.
      $.identifier, $.integer, $.float, $.complex, $.string,

    )),

    _identifier: $ => /[.\p{XID_Start}][._\p{XID_Continue}]*/,
    _quoted_identifier: $ => /`((?:\\.)|[^`\\])*`/,
    identifier: $ => choice($._identifier, $._quoted_identifier),

    _hex_literal: $ => seq(/0[xX][0-9a-fA-F]+/),
    _number_literal: $ => /(?:(?:\d+(?:\.\d*)?)|(?:\.\d+))(?:[eE][+-]?\d*)?[i]?/,
    _float: $ => choice($._hex_literal, $._number_literal),

    float: $ => $._float,
    integer: $ => seq($._float, "L"),
    complex: $ => seq($._float, "i"),

    comment: $ => /#.*/,

    string: $ => choice(
      $._raw_string_literal,
      /'((?:\\.)|[^'\\])*'/,
      /"((?:\\.)|[^"\\])*"/,
    ),

  }

});
