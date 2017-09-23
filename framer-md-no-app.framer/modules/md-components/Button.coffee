# 	 888888ba             dP     dP
# 	 88    `8b            88     88
# 	a88aaaa8P' dP    dP d8888P d8888P .d8888b. 88d888b.
# 	 88   `8b. 88    88   88     88   88'  `88 88'  `88
# 	 88    .88 88.  .88   88     88   88.  .88 88    88
# 	 88888888P `88888P'   dP     dP   `88888P' dP    dP


Type = require 'md-components/Type'
{ Rippple } = require 'md-components/Ripple'
{ Icon } = require 'md-components/Icon'
{ Theme } = require 'md-components/Theme'

exports.Button = class Button extends Layer 
	constructor: (options = {}) ->

		@_baseX = options.x

		@_raised = options.raised ? false
		@_type = options.type ? if @_raised then 'raised' else 'flat'
		@_action = options.action ? -> null

		@_explicitWidth = options.width? ? false

		@_labelText = options.text
		options.text = undefined

		super _.defaults options,
			name: '.'
			width: 0, height: 36
			borderRadius: 2
			color: Theme.button[@_type].color
			backgroundColor: Theme.button[@_type].backgroundColor
			shadowY: Theme.button[@_type].shadowY
			shadowBlur: Theme.button[@_type].shadowBlur
			shadowColor: Theme.button[@_type].shadowColor
			animationOptions: {time: .15}

		@labelLayer = new Type.Button
			name: '.', parent: @
			color: @color
			text: '{labelText}'
			textTransform: 'uppercase'
			textAlign: 'center'
			animationOptions: {time: .15}
			padding: 
				left: 16.5, right: 16.5
				top: 9, bottom: 11

		@mask = new Layer
			parent: @
			size: @size
			backgroundColor: null
			borderRadius: 2
			clip: true
			opacity: 1

		@mask.placeBehind @labelLayer

		switch @_type
			when 'flat'
				@ripple = new Rippple( @mask, null, colorOverride = 'rgba(0,0,0,.05)' )
			when 'raised'  
				@ripple = new Rippple( @mask, null )
				@onTapStart @showRaised 

		@onTapEnd -> 
			@_action()
			@reset()

		@text = @_labelText

	showRaised: => @animate {shadowY: 3, shadowSpread: 1}

	setRipple: ->
		@mask?.destroy()

		@mask = new Layer
			parent: @
			size: @size
			backgroundColor: null
			borderRadius: 2
			clip: true
			opacity: 1

		@mask.placeBehind @labelLayer

		switch @_type
			when 'flat'
				@ripple = new Rippple( @mask, null, colorOverride = 'rgba(0,0,0,.05)' )
			when 'raised'  
				@ripple = new Rippple( @mask, null )
				@onTapStart @showRaised 

	reset: =>
		@animateStop()
		@animate 
			shadowY: Theme.button[@_type].shadowY
			shadowSpread: 0

	@define "text",
		get: -> return @_labelText
		set: (text) ->
			if not text? then text = ''
			@_labelText = text

			@labelLayer.visible = @_labelText.length > 0
			@labelLayer.template = @_labelText

			if not @_explicitWidth
				@size = @labelLayer.size
				@mask.size = @size
			
			@x = @_baseX
			@setRipple()