# 	 888888ba             dP     dP
# 	 88    `8b            88     88
# 	a88aaaa8P' dP    dP d8888P d8888P .d8888b. 88d888b.
# 	 88   `8b. 88    88   88     88   88'  `88 88'  `88
# 	 88    .88 88.  .88   88     88   88.  .88 88    88
# 	 88888888P `88888P'   dP     dP   `88888P' dP    dP


Type = require 'md-components/Type'
{ Ripple } = require 'md-components/Ripple'
{ Icon } = require 'md-components/Icon'
{ Theme } = require 'md-components/Theme'

exports.Button = class Button extends Layer 
	constructor: (options = {}) ->

		@_raised = options.raised ? false
		@_type = if @_raised then 'raised' else 'flat'
		@_action = options.action ? -> null

		super _.defaults options,
			name: '.'
			width: 0, height: 36
			borderRadius: 2
			backgroundColor: Theme.button[@_type].backgroundColor
			shadowY: Theme.button[@_type].shadowY
			shadowBlur: Theme.button[@_type].shadowBlur
			shadowColor: Theme.button[@_type].shadowColor
			animationOptions: {time: .15}

		@labelLayer = new Type.Button
			name: '.', parent: @
			color: Theme.button[@_type].color
			text: options.text ? 'button'
			textTransform: 'uppercase'
			textAlign: 'center'
			animationOptions: {time: .15}
			padding: 
				left: 16.5, right: 16.5
				top: 9, bottom: 11

		@size = @labelLayer.size
		@x = options.x

		@onTapStart @showTouched
		@onTapEnd -> @_action(); @reset()

	showTouched: -> 

		@labelLayer.animate {brightness: 110, saturate: 110}
		
		switch @_type
			when 'flat' then @animate {backgroundColor: 'rgba(0,0,0,.05)'}
			when 'raised'
				Ripple(@, event.point, @labelLayer)
				@animate {shadowY: 3, shadowSpread: 1}

	reset: ->
		@animateStop()
		@labelLayer.animate {brightness: 100, saturate: 100}
		@backgroundColor = Theme.button[@_type].backgroundColor
		@animate 
			shadowY: Theme.button[@_type].shadowY
			shadowSpread: 0