; locals.scm

(function_definition) @local.scope

(argument  name: (identifier) @local.definition)
(parameter name: (identifier) @local.definition)

(left_assignment lhs: (identifier) @local.definition)
(equals_assignment  lhs: (identifier) @local.definition)
(right_assignment rhs: (identifier) @local.definition)

(identifier) @local.reference
