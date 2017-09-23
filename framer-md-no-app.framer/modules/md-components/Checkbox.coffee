# 	 a88888b. dP                         dP       dP
# 	d8'   `88 88                         88       88
# 	88        88d888b. .d8888b. .d8888b. 88  .dP  88d888b. .d8888b. dP.  .dP
# 	88        88'  `88 88ooood8 88'  `"" 88888"   88'  `88 88'  `88  `8bd8'
# 	Y8.   .88 88    88 88.  ... 88.  ... 88  `8b. 88.  .88 88.  .88  .d88b.
# 	 Y88888P' dP    dP `88888P' `88888P' dP   `YP 88Y8888' `88888P' dP'  `dP

{ Icon } = require 'md-components/Icon'
{ Theme } = require 'md-components/Theme'

exports.Checkbox = CheckBox = class Checkbox extends Icon
	constructor: (options = {}) ->

		@_group = undefined

		super _.defaults options,
			name: '.'
			animationOptions: {time: .15}
			icon: 'checkbox-blank-outline'
			color: Theme.primary
			toggle: true
			action: -> null

		@onTapEnd @updateIcon

	updateIcon: =>
		@icon = if @isOn then 'checkbox-marked' else 'checkbox-blank-outline' 

	@define "group",
		get: -> return @_group
		set: (array) ->
			return if array is @_group
			@_group = array

			# add this checkbox to the group array if not in it already
			if not _.includes(@_group, @) then @_group.push(@)