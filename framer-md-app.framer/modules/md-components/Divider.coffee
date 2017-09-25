# 	888888ba  oo          oo       dP
# 	88    `8b                      88
# 	88     88 dP dP   .dP dP .d888b88 .d8888b. 88d888b.
# 	88     88 88 88   d8' 88 88'  `88 88ooood8 88'  `88
# 	88    .8P 88 88 .88'  88 88.  .88 88.  ... 88
# 	8888888P  dP 8888P'   dP `88888P8 `88888P' dP

Type = require 'md-components/Type'
{ Theme } = require 'md-components/Theme'

class exports.Divider extends Layer
	constructor: (options = {}) ->

		width = 0 # check if parent is a View and adjust to padding
		showLayers = options.showLayers

		@_labelText = undefined
		@_backgroundColor = options.backgroundColor

		options.backgroundColor = Theme.divider.backgroundColor

		super _.defaults options,
			name: if showLayers then 'Divider' else '.'
			width: options.parent?.width ? 200, height: 1,
			backgroundColor: Theme.divider.backgroundColor

		@labelLayer = new Type.Caption
			name: if showLayers then 'Label' else '.'
			parent: @
			x: Align.center
			y: Align.center
			padding: {left: 16, right: 16}
			textAlign: 'center'
			textTransform: 'uppercase'
			text: '{labelText}'
			visible: false
			backgroundColor: @_backgroundColor

		@text = options.text

	@define "text",
		get: -> return @_labelText
		set: (text) ->
			if not text? then text = ''
			@_labelText = text

			@labelLayer?.visible = @text.length > 0
			@labelLayer?.template = @text
			@labelLayer?.x = Align.center
