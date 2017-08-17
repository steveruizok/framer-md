# 	 888888ba                 dP oo          dP
# 	 88    `8b                88             88
# 	a88aaaa8P' .d8888b. .d888b88 dP .d8888b. 88d888b. .d8888b. dP.  .dP
# 	 88   `8b. 88'  `88 88'  `88 88 88'  `88 88'  `88 88'  `88  `8bd8'
# 	 88     88 88.  .88 88.  .88 88 88.  .88 88.  .88 88.  .88  .d88b.
# 	 dP     dP `88888P8 `88888P8 dP `88888P' 88Y8888' `88888P' dP'  `dP


Type = require 'md-components/Type'
{ Ripple } = require 'md-components/Ripple'
{ Icon } = require 'md-components/Icon'
{ Theme } = require 'md-components/Theme'

exports.Radiobox = Radiobox = class Radiobox extends Icon
	constructor: (options = {}) ->

		@_isOn = undefined
		@_group = options.group ? []

		super _.defaults options,
			name: '.'
			animationOptions: {time: .15}
			icon: 'radiobox-blank'
			color: 'rgba(0,0,0,.54)'
			action: -> null

		@isOn = options.isOn ? false

		@onTap -> @isOn = !@isOn

		@_group.push(@)

	@define "isOn",
		get: -> return @_isOn
		set: (bool) ->
			return if bool is @_isOn
			
			@_isOn = bool
			@emit("change:isOn", @_isOn, @)
			@update()

	update: ->
		if @_isOn
			@icon = 'radiobox-marked'
			@color = Theme.colors.primary.main
			sib.isOn = false for sib in _.without(@_group, @)

		else 
			@icon = 'radiobox-blank'
			@color = 'rgba(0,0,0,.54)'