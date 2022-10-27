; locals.scm

(function_definition) @local.scope

(argument  name: (identifier) @local.definition)
(parameter name: (identifier) @local.definition)

("<-" lhs: (identifier) @local.definition)
("="  lhs: (identifier) @local.definition)
("->" rhs: (identifier) @local.definition)

(identifier) @local.reference
