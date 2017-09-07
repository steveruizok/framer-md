Type = require 'md-components/Type'
{ Theme } = require 'md-components/Theme'
{ TextField } = require 'md-components/TextField'


# 	d888888P                     dP    .d888888
# 	   88                        88   d8'    88
# 	   88    .d8888b. dP.  .dP d8888P 88aaaaa88a 88d888b. .d8888b. .d8888b.
# 	   88    88ooood8  `8bd8'    88   88     88  88'  `88 88ooood8 88'  `88
# 	   88    88.  ...  .d88b.    88   88     88  88       88.  ... 88.  .88
# 	   dP    `88888P' dP'  `dP   dP   88     88  dP       `88888P' `88888P8
# 	
# 	

exports.TextArea = class TextArea extends TextField
	constructor: (options = {}) ->
		
		@_rows = options.rows ? 4

		super _.defaults options,
			name: 'Text Area'
			width: 300
			borderRadius: 4
			borderWidth: 2, borderColor: options.tint
			padding: {top: 28, bottom: 16, right: 16, left: 16}
			clip: true
			inputType: 'textarea'
		
		# Label Text

		@labelTextLayer.props =
			x: 16, y: 16
		
		# Input Line

		@inputLine.destroy()
		
		# Textarea Element
				
		@setInputAttribute('rows', @_rows)
		@setInputAttribute('resize', @_rows)

		@height = @_input.clientHeight

		