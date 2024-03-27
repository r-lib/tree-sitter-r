// R has an operator precedence table defined here:
// https://github.com/wch/r-source/blob/0a8f53a7ba47463f1c938dd3e2c2acc7a2d3a1c2/src/main/gram.y#L419-L441
//
// Our precedence table defined in `PREC` follows the R precedence order exactly. However,
// we sometimes need to adjust the associativity, see `NOTE ON PREC.RIGHT` below.
//
// We start the rank at 1, because unspecified precedence has a rank of 0 and we want that
// to be on its own precedence level.

// NOTE ON PREC.RIGHT:
// 
// A few things in this table are left associative in R's grammar, but we are forced to
// make them right associative to get the behavior we want. This includes:
// - $, @
// - ::, :::
//
// We are forced to do this because we want these nodes to have an `optional()` RHS.
// While `dplyr::` isn't parsable R code, we want it to be recognized as a `::` node with
// a known package name, as this helps us generate completions.
//
// The trailing `optional()` then means there are two interpretations of `foo::bar`:
// - [foo::][bar] == [namespace][identifier]
// - [foo::bar] == [namespace]
//
// We want to force the latter, which means that the namespace rule has to be right
// associative to "prefer matching a rule that ends later".
//
// In practice we don't think this will matter for the rules we've had to swap the order
// on, since they are typically the only things at their numeric precedence rank.

const PREC = {
  // {, (
  // NOTE: If we understand correctly, brace and parenthesis blocks are given the same
  // precedence as all other general expressions. Note that they are not tagged with an
  // explicit `%prec` in the links below, and the last terminal nodes of `}` and `)` do
  // not have a `%left` or `%right` precedence assigned in the table above (the last
  // terminal node is how Bison assigns precedence to a rule by default), so we are left
  // to assume they have default precedence.
  // https://github.com/wch/r-source/blob/0a8f53a7ba47463f1c938dd3e2c2acc7a2d3a1c2/src/main/gram.y#L467-L468
  // https://www.gnu.org/software/bison/manual/html_node/How-Precedence.html
  // NOTE: See `NOTE ON PREC.RIGHT` above
  BLOCK: { ASSOC: prec.right, RANK: 0 },

  // ?
  HELP: { ASSOC: prec.left, RANK: 1 },

  // function() {}
  // while() {}
  // for() {}
  // repeat {}
  // NOTE: See `NOTE ON PREC.RIGHT` above
  FUNCTION_OR_LOOP: { ASSOC: prec.right, RANK: 2 },

  // if {}
  IF: { ASSOC: prec.right, RANK: 3 },

  // else {}
  // NOTE: `ELSE` is not actually used, we have a special external for it and it is
  // part of the `if` node, but we keep it in `PREC` for alignment with R's table.
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
  
  // %>%, %<>%, |>
  SPECIAL_OR_PIPE: { ASSOC: prec.left, RANK: 15 },

  // =>
  PIPEBIND: { ASSOC: prec.left, RANK: 16 },

  // :
  COLON: { ASSOC: prec.left, RANK: 17 },

  // +, -
  UNARY_PLUS_MINUS: { ASSOC: prec.left, RANK: 18 },
  
  // ^, **
  EXPONENTIATE: { ASSOC: prec.right, RANK: 19 },

  // $, @
  // NOTE: See `NOTE ON PREC.RIGHT` above
  EXTRACT: { ASSOC: prec.right, RANK: 20 },
  
  // ::, :::
  // NOTE: See `NOTE ON PREC.RIGHT` above
  NAMESPACE: { ASSOC: prec.right, RANK: 21 },

  // match(1, 2), [, [[
  // TODO: Should this be rank 1 or 22?
  // TODO: Do they really need to be `prec.right()`? It seems like just `prec()` works.
  // NOTE: If we understand correctly, calls and subsets have the same precedence as
  // other general expressions (see same reasoning for `BLOCK` above). However, unlike
  // `{` and `(` in `BLOCK`, these rules start their sequence with an `_expression`, which
  // would cause `call`, `subset`, and `subset2` to be ambiguous with just a general
  // `_expression` if they had the same precedence level. We get around this by assigning
  // these rules a higher precedence rank.
  // https://github.com/wch/r-source/blob/0a8f53a7ba47463f1c938dd3e2c2acc7a2d3a1c2/src/main/gram.y#L501
  // https://github.com/wch/r-source/blob/0a8f53a7ba47463f1c938dd3e2c2acc7a2d3a1c2/src/main/gram.y#L507-L508
  // NOTE: These are supposedly nonassoc in R's grammar, but no rule has a terminal node
  // of `[`, `(`, or `LBB` or specifies those as their `%prec`, so I'm not sure that is
  // really happening. We should verify whether or not these really need to be
  // `prec.right()` or just `prec()` and add some tests either way.
  // https://github.com/wch/r-source/blob/0a8f53a7ba47463f1c938dd3e2c2acc7a2d3a1c2/src/main/gram.y#L441
  CALL: { ASSOC: prec.right, RANK: 22 },
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
    function_definition: $ => withPrec(PREC.FUNCTION_OR_LOOP, seq(
      field("name", choice("\\", "function")),
      field("parameters", $.parameters),
      repeat($._newline),
      optional(field("body", $._expression))
    )),

    // NOTE: We include "(" and ")" as part of the rule here to allow
    // tree-sitter to create a "parameters" node in the AST even when
    // no parameters are declared for a function.
    // Spaces and newlines between the `()` are consumed ahead of time
    // by the external scanner.
    parameters: $ => seq(
      $._open_parenthesis,
      optional(seq(
        field("parameter", $.parameter), 
        repeat(seq($.comma, field("parameter", $.parameter)))
      )),
      $._close_parenthesis
    ),

    parameter: $ => choice(
      $._parameter_with_default,
      $._parameter_without_default
    ),

    _parameter_with_default: $ => seq(
      field("name", $.identifier), 
      "=", 
      optional(field("default", $._expression))
    ),

    _parameter_without_default: $ => field("name", choice($.identifier, $.dots)),

    // Control flow.
    if_statement: $ => withPrec(PREC.IF, seq(
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

    for_statement: $ => withPrec(PREC.FUNCTION_OR_LOOP, seq(
      "for",
      repeat($._newline),
      $._open_parenthesis,
      field("variable", $.identifier),
      "in",
      field("sequence", $._expression),
      $._close_parenthesis,
      repeat($._newline),
      optional(field("body", $._expression))
    )),

    while_statement: $ => withPrec(PREC.FUNCTION_OR_LOOP, seq(
      "while",
      repeat($._newline),
      $._open_parenthesis,
      field("condition", $._expression),
      $._close_parenthesis,
      repeat($._newline),
      optional(field("body", $._expression))
    )),

    repeat_statement: $ => withPrec(PREC.FUNCTION_OR_LOOP, seq(
      "repeat",
      repeat($._newline),
      optional(field("body", $._expression))
    )),

    // Blocks.
    braces: $ => withPrec(PREC.BLOCK, seq(
      $._open_brace,
      repeat(field("body", choice($._expression, $._semicolon, $._newline))),
      optional($._close_brace)
    )),

    parentheses: $ => withPrec(PREC.BLOCK, seq(
      $._open_parenthesis,
      repeat(field("body", choice($._expression, $._newline))),
      optional($._close_parenthesis)
    )),

    // Function calls and subsetting.
    call: $ => withPrec(PREC.CALL, seq(
      field("function", $._expression),
      field("arguments", alias($.call_arguments, $.arguments))
    )),

    subset: $ => withPrec(PREC.CALL, seq(
      field("function", $._expression), 
      field("arguments", alias($.subset_arguments, $.arguments))
    )),

    subset2: $ => withPrec(PREC.CALL, seq(
      field("function", $._expression), 
      field("arguments", alias($.subset2_arguments, $.arguments))
    )),

    // The actual matching rules for arguments in each of the above.
    // Spaces and newlines between the `()`, `[]`, or `[[]]` are consumed ahead of time
    // by the external scanner.
    call_arguments: $ => seq(
      $._open_parenthesis, 
      repeat($._argument), 
      $._close_parenthesis
    ),
    subset_arguments: $ => seq(
      $._open_bracket, 
      repeat($._argument), 
      $._close_bracket
    ),
    subset2_arguments: $ => seq(
      $._open_bracket2, 
      repeat($._argument), 
      $._close_bracket2
    ),

    // Supports `x[1,]` or `x[1,,2]`, so it really is `choice()` rather than `seq()`
    // like in function `parameters`.
    _argument: $ => choice(
      $.comma,
      field("argument", $.argument)
    ),

    // An argument; either named or unnamed.
    argument: $ => choice(
      $._argument_named,
      $._argument_unnamed
    ),

    // Since `_argument_unnamed` can be an arbitrary `_expression` (with precedence 0)
    // which include `dots`, `string`, and `identifier`, there is an ambiguity. We need to
    // set a higher precedence here to try and match `_argument_named` first. Also, since
    // it `repeat()`s we need right precedence specified to ensure the optional
    // `_argument_value` is preferred.
    _argument_named: $ => prec.right(1, seq(
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
    pipe: $ => binaryRule($, "|>", PREC.SPECIAL_OR_PIPE),
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
        ["^", PREC.EXPONENTIATE]
      ];
      return choice(
        ...table.map(([operator, prec]) => binaryRule($, operator, prec))
      )
    },

    // Special infix operator
    // Regex: Between two `%`, anything but another `%`, `\`, or `\n`.
    // Includes primitives `%%` and `%/%`.
    // TODO: This could probably be fine tuned to disallow more things.
    special: $ => binaryRule($, /%[^%\\\n]*%/, PREC.SPECIAL_OR_PIPE),

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

      $.special,

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

    // Provide aliasing of some key externals.
    // This gives `highlights.scm` something to target for
    // `@punctuation.bracket` and `@keyword`.
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

function withPrec(prec, rule) {
  return prec.ASSOC(prec.RANK, rule)
}

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
    optional(field("rhs", $._string_or_identifier))
  ));
}

// String or identifier on both sides
function binaryRuleNamespace($, operator, prec) {
  // Note, no allowance for newlines
  return prec.ASSOC(prec.RANK, seq(
    field("lhs", $._string_or_identifier), 
    field("operator", operator), 
    optional(field("rhs", $._string_or_identifier))
  ));
}
