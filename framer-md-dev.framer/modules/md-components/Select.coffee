Type = require 'md-components/Type'
{ Theme } = require 'md-components/Theme'
{ TextField } = require 'md-components/TextField'
{ Dropdown } = require 'md-components/Dropdown'
{ Icon } = require 'md-components/Icon'


# 	.d88888b           dP                     dP
# 	88.    "'          88                     88
# 	`Y88888b. .d8888b. 88 .d8888b. .d8888b. d8888P
# 	      `8b 88ooood8 88 88ooood8 88'  `""   88
# 	d8'   .8P 88.  ... 88 88.  ... 88.  ...   88
# 	 Y88888P  `88888P' dP `88888P' `88888P'   dP
# 	
# 	


class exports.Select extends TextField
	constructor: (options = {}) ->
		
		@_options = options.options ? ['Select Menu']

		# TODO
		# add an explicit width prop to textfield and use this prop instead of useMenuWidth

		useMenuWidth = options.useMenuWidth ? false

		super _.defaults options,
			name: 'Downdown Select'
			type: 'dropdown'
			inputType: 'input'
			readOnly: true
			clip: false

		@dropdown = new Dropdown
			parent: @
			x: 0, y: 4
			width: if not useMenuWidth then @width
			options: @_options

		if useMenuWidth then @width = @dropdown.width

		@dropdown.on "change:selection", (selection) =>
			@_input.value = selection
			@setValue()

		@dropdown.on "change:isOpen", (isOpen) =>
			@focused = isOpen

	showFocused: =>
		return if @disabled

		baseY = 0

		if @focused
			@bringToFront()

			@animateStop()

			@_app?.focused = @

			if @screenFrame.y + @height > Screen.height - 222
				@scrollLayer?.scrollToLayer(@, 0, .45)
			else if @screenFrame.y < Screen.height * .15
				@scrollLayer?.scrollToLayer(@, 0, .15)

			@labelTextLayer?.animate
				y: baseY
				fontSize: 12
				color: @tint

			@inputLine?.animate
				height: 1
				backgroundColor: @tint

		else
			@animateStop()

			if this.hasTextContent()
				@labelTextLayer?.animate
					y: baseY
					fontSize: 12
					color: @labelTextColor
			else
				@labelTextLayer?.animate
					y: 22
					fontSize: 16
					color: @labelTextColor

			@inputLine?.animate
				height: 1
				backgroundColor: 'rgba(0, 0, 0, .42)'

			if @_app?.focused is @
				@_app?.focused = undefined

		@setPlaceholder()

	@define "focused",
		get: -> return @_focused
		set: (value) ->
			return if @_focused is value
			if typeof value isnt 'boolean' then throw 'Focused must be either true or false.'
			
			@_focused = value

			@emit("change:focused", value, @)

			@showFocused()