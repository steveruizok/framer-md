# 	8888ba.88ba                              888888ba             dP     dP
# 	88  `8b  `8b                             88    `8b            88     88
# 	88   88   88 .d8888b. 88d888b. dP    dP a88aaaa8P' dP    dP d8888P d8888P .d8888b. 88d888b.
# 	88   88   88 88ooood8 88'  `88 88    88  88   `8b. 88    88   88     88   88'  `88 88'  `88
# 	88   88   88 88.  ... 88    88 88.  .88  88    .88 88.  .88   88     88   88.  .88 88    88
# 	dP   dP   dP `88888P' dP    dP `88888P'  88888888P `88888P'   dP     dP   `88888P' dP    dP

Type = require 'md-components/Type'
{ Ripple } = require 'md-components/Ripple'
{ Icon } = require 'md-components/Icon'
{ Theme } = require 'md-components/Theme'


exports.MenuButton = class MenuButton extends Layer
	constructor: (options = {}) ->
		
		@_icon = options.icon ? 'home'
		@_text = options.text ? 'Default'
		@_action = options.action ? -> null
		@_view = options.view
		@_app = options.app

		super _.defaults options,
			height: 48, width: 304
			backgroundColor: null

		@iconLayer = new Icon
			name: '.', parent: @
			y: Align.center
			icon: @_icon, color: Theme.menuOverlay.text
			action: -> null

		@labelLayer = new Type.Regular
			name: 'label', parent: @
			x: @iconLayer.maxX + 16
			y: Align.center()
			color: Theme.menuOverlay.text
			text: @_text

		@onTapEnd ->
			if @_view? then @_app?.changeView(@_view)
			Utils.delay .25, => @parent.hide()