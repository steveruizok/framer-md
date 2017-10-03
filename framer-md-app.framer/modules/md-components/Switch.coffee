
# 	.d88888b             oo   dP            dP
# 	88.    "'                 88            88
# 	`Y88888b. dP  dP  dP dP d8888P .d8888b. 88d888b.
# 	      `8b 88  88  88 88   88   88'  `"" 88'  `88
# 	d8'   .8P 88.88b.88' 88   88   88.  ... 88    88
# 	 Y88888P  8888P Y8P  dP   dP   `88888P' dP    dP

Type = require 'md-components/Type'
{ Ripple } = require 'md-components/Ripple'
{ Icon } = require 'md-components/Icon'
{ Theme } = require 'md-components/Theme'

exports.Switch = class Switch extends Layer
	constructor: (options = {}) ->

		@_isOn = false

		super _.defaults options,
			name: 'Switch'
			width: 34, height: 14, borderRadius: 7
			color: new Color(Theme.primary).desaturate(100).alpha(.84)
			backgroundColor: 'rgba(0,0,0,.54)'
			animationOptions: {time: .15}

		@mask = new Layer
			name: 'Mask', parent: @
			x: -12, y: Align.center
			width: 44, height: 44
			borderRadius: 20
			backgroundColor: null
			clip: true
			opacity: 1
			animationOptions: {time: .15}

		@ripple = new Ripple( @mask, external = true )

		@knob = new Layer
			name: 'Knob', parent: @mask
			x: Align.center, y: Align.center
			width: 20, height: 20, borderRadius: 10
			backgroundColor: 'rgba(250, 250, 250, 1)'
			shadowY: 2, shadowBlur: 3
			animationOptions: {time: .15}
		
		@onTap -> @isOn = !@isOn

	@define "isOn",
		get: -> return @_isOn
		set: (bool) ->
			return if bool is @_isOn
			
			@_isOn = bool
			@emit("change:isOn", @_isOn, @)
			@update()

	update: ->
		if @_isOn
			@mask.animate {x: Align.right(12)}
			@color = Theme.primary
			@knob.animate {backgroundColor: Theme.primary}
			@animate {backgroundColor: Theme.colors.primary.light}
		else 
			@mask.animate {x: -12}
			@color = new Color(Theme.primary).desaturate(100).alpha(.84)
			@knob.animate {backgroundColor: 'rgba(250, 250, 250, 1)'}
			@animate {backgroundColor: 'rgba(0,0,0,.54)'}
