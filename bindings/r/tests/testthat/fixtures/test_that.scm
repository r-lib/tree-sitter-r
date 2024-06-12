(call
	function: [
		(identifier) @function
		(namespace_operator
			lhs: (identifier) @pkg (#eq? @pkg "testthat")
			rhs: (identifier) @function
		) 
	] (#eq? @function "test_that")
	arguments: [
    	(arguments
        	. (argument value: (string) @desc) . (comma) . (_) .
        )
        (arguments
        	. (_) . (comma) .
            (argument
        		name: (identifier) @param
				value: (string) @desc
			) (#eq? @param "desc")
			.
        )
	]
) @call
