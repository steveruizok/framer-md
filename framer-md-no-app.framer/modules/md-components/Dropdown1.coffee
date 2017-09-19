
# 	888888ba                                   dP
# 	88    `8b                                  88
# 	88     88 88d888b. .d8888b. 88d888b. .d888b88 .d8888b. dP  dP  dP 88d888b.
# 	88     88 88'  `88 88'  `88 88'  `88 88'  `88 88'  `88 88  88  88 88'  `88
# 	88    .8P 88       88.  .88 88.  .88 88.  .88 88.  .88 88.88b.88' 88    88
# 	8888888P  dP       `88888P' 88Y888P' `88888P8 `88888P' 8888P Y8P  dP    dP
# 	                            88
# 	                            dP

Type = require 'md-components/Type'
{ Theme } = require 'md-components/Theme'
{ Icon } = require 'md-components/Icon'
{ Rippple } = require 'md-components/Ripple'

exports.Dropdown = class Dropdown extends ScrollComponent
	constructor: (options = {}) ->

		@_options = options.options ? throw 'Dropdown needs an array of options'
		@_optionLayers = []
		@_selectedOption = undefined

		@_open = undefined
		@_baseY = options.y
		@_width = options.width
		@_fullHeight = undefined

		options.options = null

		super _.defaults options,
			height: 48, y: 4
			color: Theme.colors.page.text
			backgroundColor: 'rgba(255, 255, 255, 0)'
			animationOptions: { time: .15 }
			scrollHorizontal: false
			opacity: 0
			visible: false

		@x -= 16
		@width += 32

		# Make Options
		for option, i in @_options

			newOption = new Type.Regular
				name: '.', parent: @content
				padding: {top: 10, left: 16, right: 16, bottom: 20}
				height: 48, width: @width
				color: @color
				backgroundColor: 'rgba(255, 255, 255, 0)'
				animationOptions: @animationOptions
				text: option
				clip: true

			newOption.value = option

			newOption.ripple = new Rippple(newOption, null, colorOverride = 'rgba(0,0,0,.05)' )

			newOption.onMouseOver (event, option) => @showOptionHovered(option, true)
			newOption.onMouseOut  (event, option) => @showOptionHovered(option, false)
			newOption.onTap (event, option) => @select(option)

			@_optionLayers.push(newOption)

		@_fullHeight = (@_options.length * 48) + 16
		@scrollVertical = @_options.length > @_rows

		# set widths based on widest option
		@setWidths()

	showOptionHovered: (option, hovered) =>
		return if not @_open

		option.animateStop()
		option.backgroundColor = if hovered then 'rgba(238, 238, 238, 1)' else 'rgba(255, 255, 255, 0)'

	openMenu: =>
		return if @_open
		@_open = true

		@visible = true
		
		@animate
			height: @_fullHeight
			backgroundColor: 'rgba(255, 255, 255, 1)'
			shadowY: 1, shadowSpread: 1, shadowBlur: 3
			opacity: 1

		for option in @_optionLayers
			option.backgroundColor = 'rgba(255, 255, 255, 0)'
	
	closeMenu: =>
		return if @_open is false
		@_open = false

		@animate 
			height: 48, 
			backgroundColor: 'rgba(255, 255, 255, 0)'
			shadowY: 0, shadowSpread: 0, shadowBlur: 0
			opacity: 0

		Utils.delay .15, => @visible = false

	setWidths: ->
		if not @_width?
			baseWidth = 0

			for option in @_optionLayers
				if option.width > baseWidth then baseWidth = option.width 

			@width = baseWidth + 32

			@inputLine?.width = @width - 32

		for option, i in @_optionLayers
			option.props =
				y: 8 + (48 * i)
				width: @width

	select: (option) ->
		# return if not @_open
		@_selectedOption = option
		@emit "change:selected", option.value, @