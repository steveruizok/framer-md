# 	8888ba.88ba                              .88888.                             dP                  
# 	88  `8b  `8b                            d8'   `8b                            88                  
# 	88   88   88 .d8888b. 88d888b. dP    dP 88     88 dP   .dP .d8888b. 88d888b. 88 .d8888b. dP    dP
# 	88   88   88 88ooood8 88'  `88 88    88 88     88 88   d8' 88ooood8 88'  `88 88 88'  `88 88    88
# 	88   88   88 88.  ... 88    88 88.  .88 Y8.   .8P 88 .88'  88.  ... 88       88 88.  .88 88.  .88
# 	dP   dP   dP `88888P' dP    dP `88888P'  `8888P'  8888P'   `88888P' dP       dP `88888P8 `8888P88
#                                                                                               .88
#                                                                                           d8888P 

Type = require 'md-components/Type'
{ Ripple } = require 'md-components/Ripple'
{ Icon } = require 'md-components/Icon'
{ Theme } = require 'md-components/Theme'
{ MenuButton } = require 'md-components/MenuButton'

exports.MenuOverlay = class MenuOverlay extends Layer
	constructor: (options = {}) ->

		@links = []
		@_title = options.title ? 'Menu'
		@_image = options.image ? null
		@_app = options.app


		super _.defaults options,
			height: Screen.height
			width: 304
			visible: false
			backgroundColor: Theme.menuOverlay.backgroundColor
			animationOptions: {curve: "spring(300, 35, 0)"}


		@scrim = new Layer
			name: '.', 
			size: Screen.size
			backgroundColor: 'rgba(0,0,0,.6)'
			opacity: 0
			visible: false
			animationOptions:
				time: .25

		@scrim.onTap => @hide()
		@onSwipeLeftEnd => @hide()

		@header = new Layer
			name: '.', parent: @
			width: @width, height: 173
			image: Theme.user.image
			backgroundColor: Theme.menuOverlay.header.backgroundColor

		@titleIcon = new Layer
			name: '.', parent: @header
			x: 16, y: 40
			height: 64, width: 64
			borderRadius: 32
			backgroundColor: Theme.menuOverlay.header.icon

		@subheaderExpand = new Icon
			name: '.', parent: @header
			x: Align.right(-16)
			y: Align.bottom(-16)
			icon: 'menu-down'
			color: Theme.menuOverlay.subheader.icon

		@subheader = new Type.Body1
			name: '.', parent: @header
			width: @width
			x: 16, y: Align.bottom(-18)
			text: @_title
			color: Theme.menuOverlay.subheader.text

	show: ->
		@bringToFront()
		@visible = true
		@x = -Screen.width
		@animate
			x: 0

		@scrim.placeBehind(@)
		@scrim.visible = true
		@scrim.animate
			opacity: 1

	hide: ->
		@animate
			x: -Screen.width

		@scrim.animate
			opacity: 0

		Utils.delay .3, =>
			@visible = false
			@scrim.visible = false
			@sendToBack()
			@scrim.sendToBack()

	addLink: (options) -> 
		lastY = _.last(@links)?.maxY ? 189
		@links.push new MenuButton
			name: '.', parent: @
			x: 16, y: lastY
			text: options.title
			icon: options.icon
			view: options.view

		options.view.i = @links.length