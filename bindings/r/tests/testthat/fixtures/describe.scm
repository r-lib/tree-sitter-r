(call
	function: [
		(identifier) @parent_function
		(namespace_operator
			lhs: (identifier) @parent_pkg (#eq? @parent_pkg "testthat")
			rhs: (identifier) @parent_function
		)
	] (#eq? @parent_function "describe")
	arguments: (arguments
		(argument
			value: (string) @parent_desc
		)
		(argument
			value: (braced_expression
				body: (call
					function: [
						(identifier) @function
						(namespace_operator
							lhs: (identifier) @pkg (#eq? @pkg "testthat")
							rhs: (identifier) @function
						)
					] (#eq? @function "it")
					arguments: (arguments
						(argument
							value: (string) @desc
						)
					)
				) @call
			)
		)
	)
) @parent_call
