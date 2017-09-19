# 	 888888ba                 dP oo          dP
# 	 88    `8b                88             88
# 	a88aaaa8P' .d8888b. .d888b88 dP .d8888b. 88d888b. .d8888b. dP.  .dP
# 	 88   `8b. 88'  `88 88'  `88 88 88'  `88 88'  `88 88'  `88  `8bd8'
# 	 88     88 88.  .88 88.  .88 88 88.  .88 88.  .88 88.  .88  .d88b.
# 	 dP     dP `88888P8 `88888P8 dP `88888P' 88Y8888' `88888P' dP'  `dP


{ Icon } = require 'md-components/Icon'
{ Theme } = require 'md-components/Theme'

exports.Radiobox = Radiobox = class Radiobox extends Icon
	constructor: (options = {}) ->

		@_group = undefined

		super _.defaults options,
			name: '.'
			animationOptions: {time: .15}
			icon: 'radiobox-blank'
			color: Theme.primary
			toggle: true
			action: -> null

		@on "change:isOn", ->
			@updateIcon()
			@updateSiblings()

	updateIcon: =>
		@icon = if @isOn then 'radiobox-marked' else 'radiobox-blank' 

	updateSiblings: =>
		if @isOn then sib.isOn = false for sib in _.without(@_group, @)

	@define "group",
		get: -> return @_group
		set: (array) ->
			return if array is @_group
			@_group = array

			# add this checkbox to the group array if not in it already
			if not _.includes(@_group, @) then @_group.push(@)
