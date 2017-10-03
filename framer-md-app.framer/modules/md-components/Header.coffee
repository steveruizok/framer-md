# dP     dP                          dP                  
# 88     88                          88                  
# 88aaaaa88a .d8888b. .d8888b. .d888b88 .d8888b. 88d888b.
# 88     88  88ooood8 88'  `88 88'  `88 88ooood8 88'  `88
# 88     88  88.  ... 88.  .88 88.  .88 88.  ... 88      
# dP     dP  `88888P' `88888P8 `88888P8 `88888P' dP    

Type = require 'md-components/Type'
{ Icon } = require 'md-components/Icon'
{ Theme } = require 'md-components/Theme'
{ modifyColor } = require 'md-components/Theme'
{ StatusBar } = require 'md-components/StatusBar'

exports.Header = class Header extends Layer
	constructor: (options = {}) ->
		@__constructor = true

		# properties
		
		@_title
		options.title ?= 'Header'

		@_icon
		options.icon ?= 'menu'

		@_action
		options.action ?= -> null

		# assign forced options
		_.assign options,
			width: Screen.width
			height: 80
			shadowY: 2, 
			shadowBlur: 3, 
			shadowColor: 'rgba(0,0,0,.24)'

		# set default options
		super _.defaults options,
			name: options.title
			backgroundColor: Theme.header.backgroundColor ? '#777'
			color: Theme.header.title ? '#FFF'

		# title

		@titleLayer = new Type.Title
			name: '.', parent: @
			x: 72, y: Align.bottom(-14)
			color: @color
			text: ''

		# icon

		@iconLayer = new Icon
			name: '.', parent: @, 
			x: 12, y: Align.center(12)
			icon: options.icon ? 'menu'
			color: @color

		# status bar

		@statusBar = new StatusBar
			name: '.', parent: @

		# events

		@iconLayer.onTapEnd => @_action()

		@on "change:color", =>
			@titleLayer.color = @color
			@iconLayer.color = @color
			@statusBar.color = @color

		@on "change:backgroundColor", =>
			@statusBar.backgroundColor = modifyColor(
				@backgroundColor, -1, -7, -12
				)

		delete @__constructor

		# set options that require layers

		@title = options.title
		@icon = options.icon
		@action = options.action

	setHeader: (options = {}) ->

		for layer in [@titleLayer, @iconLayer]
			layer.animate {opacity: 0, options: {time: .15}}

		Utils.delay .25, =>

			_.assign(@, options)

			for layer in [@titleLayer, @iconLayer]
				layer.animate {opacity: 1, options: {time: .15}}

	@define "title",
		get: -> return @_title
		set: (titleText) ->
			return if @__constructor
			@_title = titleText
			@titleLayer.text = titleText

	@define "icon",
		get: -> return @_icon
		set: (iconName) -> 
			return if @__constructor
			@_icon = iconName
			@iconLayer.icon = iconName

	@define "action",
		get: -> return @_action
		set: (action) ->
			return if @__constructor
			@_action = action
