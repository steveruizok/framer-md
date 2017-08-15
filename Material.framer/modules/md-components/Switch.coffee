
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

		@_isOn = undefined

		super _.defaults options,
			name: '.'
			width: 34, height: 14, borderRadius: 7
			backgroundColor: 'rgba(34, 31, 31, .26)'
			animationOptions: {time: .15}

		@knob = new Layer
			name: '.', parent: @
			x: 0, y: Align.center
			width: 20, height: 20, borderRadius: 10
			backgroundColor: 'F1F1F1'
			shadowY: 2, shadowBlur: 3
			animationOptions: {time: .15}

		@isOn = options.isOn ? false
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
			@knob.animate {x: Align.right(), backgroundColor: Theme.colors.primary.main}
			@animate {backgroundColor: Theme.colors.primary.light}
		else 
			@knob.animate {x: 0, backgroundColor: 'F1F1F1'}
			@animate {backgroundColor: 'rgba(34, 31, 31, .26)'}
