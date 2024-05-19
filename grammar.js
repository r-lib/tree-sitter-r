// ---------------------------------------------------------------------------------------
// R has an operator precedence table defined here:
// https://github.com/wch/r-source/blob/0a8f53a7ba47463f1c938dd3e2c2acc7a2d3a1c2/src/main/gram.y#L419-L441
//
// Our precedence table defined in `PREC` follows the R precedence order pretty closely.
// However, we sometimes need to adjust the associativity, see `NOTE ON PREC.RIGHT` below.
//
// We also don't need the `ELSE` or `PIPEBIND` precedence specifications from the table.
// We handle `ELSE` within the `if` node using a special external, and `=>` didn't make it
// into a release version of R (it is off by default) and we think it is unlikely to make
// a return.
//
// Note that if a precedence rank is unspecified in a rule, it can be assumed to be 0.
// ---------------------------------------------------------------------------------------

// ---------------------------------------------------------------------------------------
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
// ---------------------------------------------------------------------------------------

// ---------------------------------------------------------------------------------------
// NOTE ON OPERATORS:
//
// For `unary_operator`, `binary_operator`, `extract_operator`, and `namespace_operator`,
// the way these have been grouped is based on the semantic definition of each kind of
// operator group. Specifically:
//
// <unary> <expr>
// <expr> <binary> <expr>
// <expr> <extract> <symbol>
// <symbol> <namespace> <symbol>
//
// In theory, we could have gone further to, say, split out comparison and arithmetic
// operators from the binary operator group, or split out the pipe as its own rule.
// However, this is all rather arbitrary, and we decided it was best to stop the grouping
// at semantic meaning, and let end consumers layer on additional behavior as needed by
// creating more granular groups based on the `operator` field.
// ---------------------------------------------------------------------------------------

const PREC = {
  // #
  // NOTE: If we don't put comments at a negative rank, then `"#"` will treat the `#` as
  // the start of a comment rather than being part of the string.
  COMMENT: { ASSOC: prec, RANK: -1},

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

  // <-, <<-, :=
  LEFT_ASSIGN: { ASSOC: prec.right, RANK: 4 },

  // =
  EQUALS_ASSIGN: { ASSOC: prec.right, RANK: 5 },

  // ->, ->>
  RIGHT_ASSIGN: { ASSOC: prec.left, RANK: 6 },

  // ~
  TILDE: { ASSOC: prec.left, RANK: 7 },

  // |, ||
  OR: { ASSOC: prec.left, RANK: 8 },

  // &, &&
  AND: { ASSOC: prec.left, RANK: 9 },

  // !
  UNARY_NOT: { ASSOC: prec.left, RANK: 10 },

  // >, >=, <, <=, ==, !=
  // NOTE: These are nonassoc in R's grammar, but we have to specify
  // associativity to generate the grammar, and left seems correct.
  COMPARISON: { ASSOC: prec.left, RANK: 11 },

  // +, -
  PLUS_MINUS: { ASSOC: prec.left, RANK: 12 },

  // *, /
  MULTIPLY_DIVIDE: { ASSOC: prec.left, RANK: 13 },

  // %>%, %<>%, |>
  SPECIAL_OR_PIPE: { ASSOC: prec.left, RANK: 14 },

  // :
  COLON: { ASSOC: prec.left, RANK: 15 },

  // +, -
  UNARY_PLUS_MINUS: { ASSOC: prec.left, RANK: 16 },

  // ^, **
  EXPONENTIATE: { ASSOC: prec.right, RANK: 17 },

  // $, @
  // NOTE: See `NOTE ON PREC.RIGHT` above
  EXTRACT: { ASSOC: prec.right, RANK: 18 },

  // ::, :::
  // NOTE: See `NOTE ON PREC.RIGHT` above
  NAMESPACE: { ASSOC: prec.right, RANK: 19 },

  // match(1, 2), [, [[
  // NOTE: We aren't entirely sure how Bison works for calls and subsets. Practically,
  // we need calls to have high precedence so things like `function(x, y, z) match(x, y)`
  // don't get parsed as a call with function `function(x, y, z) match` and arguments of
  // `(x, y)`. In the Bison grammar, there is no `%prec` specified for these rules, and
  // the last terminal nodes of `]` and `)` don't have an assigned precedence in the
  // table, so in theory they have the same precedence as general R expressions, but that
  // obviously isn't the case. Possibly this has to do with Bison's lookahead that
  // tree-sitter doesn't do.
  // https://github.com/wch/r-source/blob/0a8f53a7ba47463f1c938dd3e2c2acc7a2d3a1c2/src/main/gram.y#L501
  // https://github.com/wch/r-source/blob/0a8f53a7ba47463f1c938dd3e2c2acc7a2d3a1c2/src/main/gram.y#L507-L508
  // https://github.com/wch/r-source/blob/0a8f53a7ba47463f1c938dd3e2c2acc7a2d3a1c2/src/main/gram.y#L441
  CALL: { ASSOC: prec.right, RANK: 20 },
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
    braced_expression: $ => withPrec(PREC.BLOCK, seq(
      $._open_brace,
      repeat(field("body", choice($._expression, $._semicolon, $._newline))),
      optional($._close_brace)
    )),

    parenthesized_expression: $ => withPrec(PREC.BLOCK, seq(
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
      field("open", $._open_parenthesis),
      repeat($._argument),
      field("close", $._close_parenthesis)
    ),
    subset_arguments: $ => seq(
      field("open", $._open_bracket),
      repeat($._argument),
      field("close", $._close_bracket)
    ),
    subset2_arguments: $ => seq(
      field("open", $._open_bracket2),
      repeat($._argument),
      field("close", $._close_bracket2)
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

    // Operators
    // NOTE: See `NOTE ON OPERATORS` above
    // NOTE: Newlines are allowed after all unary operators
    unary_operator: $ => {
      const table = [
        ["?", PREC.HELP],
        ["~", PREC.TILDE],
        ["!", PREC.UNARY_NOT],
        ["+", PREC.UNARY_PLUS_MINUS],
        ["-", PREC.UNARY_PLUS_MINUS]
      ];

      return choice(...table.map(([operator, prec]) => prec.ASSOC(prec.RANK, seq(
        field("operator", operator),
        repeat($._newline),
        field("rhs", $._expression)
      ))))
    },

    // NOTE: Expressions are allowed on either side of the operator
    binary_operator: $ => {
      const table = [
        ["?", PREC.HELP],

        ["~", PREC.TILDE],

        ["<-", PREC.LEFT_ASSIGN],
        ["<<-", PREC.LEFT_ASSIGN],
        [":=", PREC.LEFT_ASSIGN],

        ["->", PREC.RIGHT_ASSIGN],
        ["->>", PREC.RIGHT_ASSIGN],

        ["=", PREC.EQUALS_ASSIGN],

        ["|", PREC.OR],
        ["&", PREC.AND],

        ["||", PREC.OR],
        ["&&", PREC.AND],

        ["<", PREC.COMPARISON],
        ["<=", PREC.COMPARISON],
        [">", PREC.COMPARISON],
        [">=", PREC.COMPARISON],
        ["==", PREC.COMPARISON],
        ["!=", PREC.COMPARISON],

        ["+", PREC.PLUS_MINUS],
        ["-", PREC.PLUS_MINUS],
        ["*", PREC.MULTIPLY_DIVIDE],
        ["/", PREC.MULTIPLY_DIVIDE],
        ["**", PREC.EXPONENTIATE],
        ["^", PREC.EXPONENTIATE],

        // Special infix operator
        // Regex: Between two `%`, anything but another `%`, `\`, or `\n`.
        // Includes primitives `%%` and `%/%`.
        // Alias is used for targeting in `highlights.scm`.
        // TODO: This could probably be fine tuned to disallow more things.
        [alias(/%[^%\\\n]*%/, "special"), PREC.SPECIAL_OR_PIPE],
        ["|>", PREC.SPECIAL_OR_PIPE],

        [":", PREC.COLON]
      ];

      return choice(...table.map(([operator, prec]) => prec.ASSOC(prec.RANK, seq(
        field("lhs", $._expression),
        field("operator", operator),
        repeat($._newline),
        field("rhs", $._expression)
      ))))
    },

    // NOTE: Expression on LHS, string or identifier on RHS
    extract_operator: $ => {
      const table = [
        ["$", PREC.EXTRACT],
        ["@", PREC.EXTRACT]
      ];

      return choice(...table.map(([operator, prec]) => prec.ASSOC(prec.RANK, seq(
        field("lhs", $._expression),
        field("operator", operator),
        repeat($._newline),
        optional(field("rhs", $._string_or_identifier))
      ))))
    },

    // NOTE: No newlines are allowed. String or identifier on both LHS and RHS.
    namespace_operator: $ => {
      const table = [
        ["::", PREC.NAMESPACE],
        [":::", PREC.NAMESPACE]
      ];

      return choice(...table.map(([operator, prec]) => prec.ASSOC(prec.RANK, seq(
        field("lhs", $._string_or_identifier),
        field("operator", operator),
        optional(field("rhs", $._string_or_identifier))
      ))))
    },

    // Numeric literals.
    integer: $ => seq($._float_literal, "L"),
    complex: $ => seq($._float_literal, "i"),
    float: $ => $._float_literal,

    _hex_literal: $ => seq(/0[xX][0-9a-fA-F]+/),
    _number_literal: $ => /(?:(?:\d+(?:\.\d*)?)|(?:\.\d+))(?:[eE][+-]?\d*)?/,
    _float_literal: $ => choice($._hex_literal, $._number_literal),

    // Strings.
    string: $ => choice(
      $._raw_string_literal,
      $._single_quoted_string,
      $._double_quoted_string
    ),

    // TODO: Raw string contents, something like this, where `_raw_string_open`,
    // `_raw_string_close`, and `_raw_string_content` are externals.
    // _raw_string_literal: $ => seq(
    //   $._raw_string_open,
    //   optional(field("content", alias($._raw_string_content, $.string_content))),
    //   $._raw_string_close
    // ),

    // Explanation is:
    // - Between two quote characters, allow either:
    //   - Anything except `'` (or `"`) or `\`
    //   - An escape sequence
    _single_quoted_string: $ => seq(
      '\'',
      optional(field("content", alias($._single_quoted_string_content, $.string_content))),
      '\''
    ),

    _double_quoted_string: $ => seq(
      '"',
      optional(field("content", alias($._double_quoted_string_content, $.string_content))),
      '"'
    ),

    _single_quoted_string_content: $ => repeat1(choice(
      /[^'\\]+/,
      $.escape_sequence
    )),

    _double_quoted_string_content: $ => repeat1(choice(
      /[^"\\]+/,
      $.escape_sequence
    )),

    escape_sequence: $ => token.immediate(seq(
      '\\',
      choice(
        /[^0-9xuU]/,
        /[0-7]{1,3}/,
        /x[0-9a-fA-F]{1,2}/,
        /u[0-9a-fA-F]{1,4}/,
        /u\{[0-9a-fA-F]{1,4}\}/,
        /U[0-9a-fA-F]{1,8}/,
        /U\{[0-9a-fA-F]{1,8}\}/
      )
    )),

    // Identifiers.
    // NOTE: `_` isn't a valid way to start an R identifier, but we are a little
    // lax here and parse it anyways. One reason is because want to support a lone `_` as
    // the pipe placeholder identifier. It could be included as a separate `"_"` choice,
    // but then `_foo` parses as two identifiers: `_` and `foo`, making it impossible to
    // check that `_foo` is an invalid identifier. It seems simpler to parse `_foo` as a
    // single identifier, and then let downstream consumers do further checks on the
    // validity as needed (#71).
    identifier: $ => choice(
      $._identifier,
      $._quoted_identifier
    ),
    _identifier: $ => /[\p{XID_Start}._][\p{XID_Continue}.]*/,
    _quoted_identifier: $ => /`((?:\\(.|\n))|[^`\\])*`/,

    // Keywords.
    // We define keywords as those contained in `?Reserved`, i.e. it must be a reserved
    // word in R's parser to be considered here. If a keyword from `?Reserved` is already
    // mentioned within a wider rule (like "if" and "function"), then it is not included
    // again here. Grammar consumers can choose to highlight more words as required. We
    // make a single exception for `return`, which is not in `?Reserved` but is SO special
    // that we decided to include it as a keyword.
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
    dots: $ => "...",
    dot_dot_i: $ => token(/[.][.]\d+/),

    // A general R expression.
    _expression: $ => choice(
      $.function_definition,

      $.if_statement,
      $.for_statement,
      $.while_statement,
      $.repeat_statement,

      $.braced_expression,
      $.parenthesized_expression,

      $.call,
      $.subset,
      $.subset2,

      $.unary_operator,
      $.binary_operator,
      $.extract_operator,
      $.namespace_operator,

      $.integer,
      $.complex,
      $.float,

      $.string,

      $.identifier,

      $.return,
      $.next,
      $.break,
      $.true,
      $.false,
      $.null,
      $.inf,
      $.nan,
      $.na,
      $.dots,
      $.dot_dot_i,

      $.unmatched_delimiter
    ),

    // Comments.
    comment: $ => token(withPrec(PREC.COMMENT, /#.*/)),

    // Commas. We include these in the AST so we can figure out the
    // argument call position. This is necessary given how R tolerates
    // missing arguments in function calls.
    comma: $ => ",",

    // Check for un-matched closing delimiter. This allows us to recover in
    // cases where the parse tree is temporarily incorrect, e.g. because the
    // user has removed the opening delimiter associated with some closing delimiter.
    // This is not the same as, say, `_close_brace`, as the external scanner doesn't
    // identify these, the typical internal scanner does. It is important for the
    // underlying string literals to appear in the tree as children of the
    // `unmatched_delimiter` node so you can tell them apart if you need to.
    unmatched_delimiter: $ => choice(
      "}",
      ")",
      "]"
    ),

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
