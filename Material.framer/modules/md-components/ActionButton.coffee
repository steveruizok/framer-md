# 	 .d888888             dP   oo                    888888ba             dP     dP
# 	d8'    88             88                         88    `8b            88     88
# 	88aaaaa88a .d8888b. d8888P dP .d8888b. 88d888b. a88aaaa8P' dP    dP d8888P d8888P .d8888b. 88d888b.
# 	88     88  88'  `""   88   88 88'  `88 88'  `88  88   `8b. 88    88   88     88   88'  `88 88'  `88
# 	88     88  88.  ...   88   88 88.  .88 88    88  88    .88 88.  .88   88     88   88.  .88 88    88
# 	88     88  `88888P'   dP   dP `88888P' dP    dP  88888888P `88888P'   dP     dP   `88888P' dP    dP

Type = require 'md-components/Type'
{ Ripple } = require 'md-components/Ripple'
{ Icon } = require 'md-components/Icon'
{ Theme } = require 'md-components/Theme'
{ MenuButton } = require 'md-components/MenuButton'

exports.ActionButton = class ActionButton extends Layer 
	constructor: (options = {}) ->

		@_raised = options.raised ? false
		@_action = options.action ? -> null
		@_icon = options.icon ? 'plus'
		@_app = options.app

		super _.defaults options,
			name: '.'
			x: Align.right(-16), y: Align.bottom(-17)
			width: 64, height: 64, borderRadius: 32
			backgroundColor: Theme.fab.backgroundColor
			shadowY: 2, shadowBlur: 3
			shadowColor: 'rgba(0,0,0,.25)'
			animationOptions: {time: .15}

		if @_app?
			if @_app.bottomNav? then @y -= @_app.bottomNav.height
			@_app.actionButton = @

		@iconLayer = new Icon
			name: '.', parent: @
			x: Align.center, y: Align.center
			icon: @_icon, color: Theme.fab.color

		@onTouchStart (event) -> 
			@showTouched()
			Utils.delay 1, => @reset()
		
		@onTouchEnd (event) -> 
			@_action()
			@reset()

	showTouched: -> 
		Ripple(@, event.point, @iconLayer)
		@animate {shadowY: 3, shadowSpread: 1}

	reset: ->
		@animate 
			shadowY: 2
			shadowSpread: 0
