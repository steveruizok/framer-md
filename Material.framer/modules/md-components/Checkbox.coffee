# 	 a88888b. dP                         dP       dP
# 	d8'   `88 88                         88       88
# 	88        88d888b. .d8888b. .d8888b. 88  .dP  88d888b. .d8888b. dP.  .dP
# 	88        88'  `88 88ooood8 88'  `"" 88888"   88'  `88 88'  `88  `8bd8'
# 	Y8.   .88 88    88 88.  ... 88.  ... 88  `8b. 88.  .88 88.  .88  .d88b.
# 	 Y88888P' dP    dP `88888P' `88888P' dP   `YP 88Y8888' `88888P' dP'  `dP

Type = require 'md-components/Type'
{ Ripple } = require 'md-components/Ripple'
{ Icon } = require 'md-components/Icon'
{ Theme } = require 'md-components/Theme'

exports.Checkbox = CheckBox = class Checkbox extends Icon
	constructor: (options = {}) ->

		@_isOn = undefined

		super _.defaults options,
			name: '.'
			animationOptions: {time: .15}
			icon: 'checkbox-blank-outline'
			color: 'rgba(0,0,0,.54)'
			action: -> null

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
			@icon = 'checkbox-marked'
			@color = Theme.colors.primary.main
		else 
			@icon = 'checkbox-blank-outline'
			@color = 'rgba(0,0,0,.54)'