; locals.scm

(function_definition) @local.scope

(parameters (parameter name: (identifier) @local.definition))

("<-" lhs: (identifier) @local.definition)
("="  lhs: (identifier) @local.definition)
("->" rhs: (identifier) @local.definition)

(identifier) @local.reference
