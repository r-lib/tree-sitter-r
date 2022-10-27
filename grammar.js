
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
  "?": 1,
  "~": 5,
  "!": 8,
  "+": 14,
  "-": 14
};

// Precedence table for binary operators.
const BINARY_OPERATORS = {
  "?":   1,
  ":=":  2,
  "=":   3,
  "<-":  3,
  "<<-": 3,
  "->":  4,
  "->>": 4,
  "~":   5,
  "|>":  6,
  "=>":  6,
  "||":  7,
  "|":   7,
  "&&":  8,
  "&":   8,
  "<":   9,
  "<=":  9,
  ">":   9,
  ">=":  9,
  "==":  9,
  "!=":  9,
  "+":   10,
  "-":   10,
  "*":   11,
  "/":   11,
  "%%":  12,
  ":":   13,
  "**":  15,
  "^":   15,
  "$":   18,
  "@":   18,
  "::":  20,
  ":::": 20,
};

// All operators.
let OPERATORS = [...new Set([
  ...Object.keys(UNARY_OPERATORS),
  ...Object.keys(BINARY_OPERATORS)
])];

// NOTE: We only include keywords which aren't included as part of special forms.
// In other words, no keywords used in special control-flow constructions.
const KEYWORDS = [
  "next", "break", "TRUE", "FALSE", "NULL", "Inf", "NaN",
  "NA", "NA_integer_", "NA_real_", "NA_complex_", "NA_character_",
];

function commaSep1($, rule) {
  return seq(rule, repeat(seq($.comma, rule)));
}

function operator($, rule) {

  // Get the precedence values.
  const unaryPrecedence  = UNARY_OPERATORS[rule];
  const binaryPrecedence = BINARY_OPERATORS[rule];

  // Special handling for '%%'.
  if (rule === '%%') {
    rule = /%[^%]*%/;
  }

  // Build the operator rules.
  // Note: newlines aren't permitted following a '::' or ':::'.
  const unaryRule  = seq(rule, optional($._expression));
  const binaryRule = (rule === "::" || rule === ":::")
    ? seq(field("lhs", $._expression), rule, field("rhs", optional($._expression)))
    : seq(field("lhs", $._expression), rule, repeat($._newline), field("rhs", optional($._expression)));

  // If we don't have a unary operator rule, return this one as-is.
  if (unaryPrecedence == null) {
    return prec.right(binaryPrecedence, binaryRule);
  } else if (binaryPrecedence == null) {
    return prec.right(unaryPrecedence, unaryRule);
  } else {
    return choice(
      prec.right(unaryPrecedence, unaryRule),
      prec.right(binaryPrecedence, binaryRule)
    );
  }
}

function generateKeywordRules($) {
  return KEYWORDS.reduce((object, item) => {
    object[item] = $ => item;
    return object;
  }, {});
}

function keywordRules($) {
  return KEYWORDS.map((value) => $[value]);
}

function generateOperatorRules($) {
  return OPERATORS.reduce((rules, key) => {
    rules[key] = $ => operator($, key);
    return rules;
  }, {});
}

function operatorRules($) {
  return OPERATORS.map((key) => {
    return $[key];
  });
}

module.exports = grammar({

  name: "r",

  extras: $ => [
    $.comment,
    /\s/
  ],

  externals: $ => [
    $._newline,
    $._semicolon,
    $._open_paren,
    $._close_paren,
    $._open_brace,
    $._close_brace,
    $._open_bracket,
    $._close_bracket,
    $._open_bracket2,
    $._close_bracket2,
    $._raw_string_literal
  ],

  word: $ => $._identifier,

  rules: {

    // Top-level rules.
    program: $ => repeat(choice($._expression, $._semicolon, $._newline)),

    // Function definitions.
    function_definition: $ => prec.right(seq(
      choice("\\", "function"),
      $.parameters,
      optional($._expression)
    )),

    // NOTE: We include "(" and ")" as part of the rule here to allow
    // tree-sitter to create a "parameters" node in the AST even when
    // no parameters are declared for a function.
    parameters: $ => seq($._open_paren, optional(commaSep1($, $.parameter)), $._close_paren),

    parameter: $ => choice(
      seq(field("name", $.identifier), "=", field("default", optional($._expression))),
      field("name", choice($.identifier, $.dots))
    ),

    // Control flow.
    if: $ => prec.right(seq(
      "if",
      repeat($._newline),
      $._open_paren,
      field("condition", $._expression),
      $._close_paren,
      repeat($._newline),
      field("consequence", $._expression),
      repeat($._newline),
      field("alternative", optional(seq("else", $._expression)))
    )),

    for: $ => prec.right(seq(
      "for",
      repeat($._newline),
      $._open_paren,
      field("variable", $.identifier),
      "in",
      field("sequence", $._expression),
      $._close_paren,
      repeat($._newline),
      field("body", optional($._expression))
    )),

    while: $ => prec.right(seq(
      "while",
      repeat($._newline),
      $._open_paren,
      field("condition", $._expression),
      $._close_paren,
      repeat($._newline),
      field("body", optional($._expression))
    )),

    repeat: $ => prec.right(seq(
      "repeat",
      repeat($._newline),
      field("body", optional($._expression))
    )),

    // Blocks.
    "{": $ => prec.right(seq(
      $._open_brace,
      repeat(choice($._expression, $._semicolon, $._newline)),
      optional($._close_brace),
    )),

    // Parenthetical blocks.
    "(": $ => prec.right(seq(
      $._open_paren,
      repeat(choice($._expression, $._newline)),
      optional($._close_paren)
    )),

    // Function calls.
    call:    $ => prec.right(16, seq($._expression, alias($._call_arguments, $.arguments))),
    subset:  $ => prec.right(16, seq($._expression, alias($._subset_arguments, $.arguments))),
    subset2: $ => prec.right(16, seq($._expression, alias($._subset2_arguments, $.arguments))),

    // Dummy rule; used for aliasing so we can easily search the AST.
    arguments: $ => $._expression,

    // The actual matching rules for arguments in each of the above.
    _call_arguments:    $ => prec.right(seq($._open_paren,    repeat(choice($.comma, $.argument)), optional($._close_paren))),
    _subset_arguments:  $ => prec.right(seq($._open_bracket,  repeat(choice($.comma, $.argument)), optional($._close_bracket))),
    _subset2_arguments: $ => prec.right(seq($._open_bracket2, repeat(choice($.comma, $.argument)), optional($._close_bracket2))),

    // An argument; either named or unnamed.
    argument: $ => prec.right(choice(
      prec(1, seq(field("name", $.identifier), "=", optional(field("value", choice($._expression, $._newline))))),
      prec(2, field("value", choice($._expression, $._newline)))
    )),

    // Operators.
    ...generateOperatorRules(),

    // Keywords.
    ...generateKeywordRules(),

    "..i": $ => token(/[.][.]\d+/),
    dots: $ => token("..."),

    // A general R expression.
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
      ...operatorRules($),

      // Keywords.
      ...keywordRules($),

      $.dots,

      // E.g. '..1'
      $["..i"],

      // Literals.
      prec.left($.identifier), $.integer, $.float, $.complex, $.string,

    )),

    _identifier: $ => /[.]*[\p{XID_Start}][._\p{XID_Continue}]*/,
    _quoted_identifier: $ => /`((?:\\.)|[^`\\])*`/,
    _dotted_identifier: $ => /[.]+/,
    identifier: $ => choice($._identifier, $._quoted_identifier, $._dotted_identifier),

    _hex_literal: $ => seq(/0[xX][0-9a-fA-F]+/),
    _number_literal: $ => /(?:(?:\d+(?:\.\d*)?)|(?:\.\d+))(?:[eE][+-]?\d*)?[i]?/,
    _float_literal: $ => choice($._hex_literal, $._number_literal),

    float: $ => $._float_literal,
    integer: $ => seq($._float_literal, "L"),
    complex: $ => seq($._float_literal, "i"),

    comment: $ => /#.*/,
    comma: $ => ",",

    string: $ => choice(
      $._raw_string_literal,
      /'((?:\\.)|[^'\\])*'/,
      /"((?:\\.)|[^"\\])*"/,
    ),

  }

});
