# 	 .d888888             dP   oo                    888888ba             dP     dP
# 	d8'    88             88                         88    `8b            88     88
# 	88aaaaa88a .d8888b. d8888P dP .d8888b. 88d888b. a88aaaa8P' dP    dP d8888P d8888P .d8888b. 88d888b.
# 	88     88  88'  `""   88   88 88'  `88 88'  `88  88   `8b. 88    88   88     88   88'  `88 88'  `88
# 	88     88  88.  ...   88   88 88.  .88 88    88  88    .88 88.  .88   88     88   88.  .88 88    88
# 	88     88  `88888P'   dP   dP `88888P' dP    dP  88888888P `88888P'   dP     dP   `88888P' dP    dP

{ Ripple } = require 'md-components/Ripple'
{ Icon } = require 'md-components/Icon'
{ Theme } = require 'md-components/Theme'

exports.ActionButton = class ActionButton extends Layer 
	constructor: (options = {}) ->

		@_action = options.action ? -> null
		@_icon = options.icon ? 'plus'

		{ app } = require 'md-components/App'

		super _.defaults options,
			name: 'Action Button'
			x: Align.right(-16), y: Align.bottom(-17)
			width: 64, height: 64, borderRadius: 32
			backgroundColor: Theme.fab.backgroundColor
			shadowY: 2, shadowBlur: 3
			shadowColor: 'rgba(0,0,0,.25)'
			animationOptions: {time: .15}

		if app?
			@y = Align.bottom(-app.footer.height - 17)
			app.actionButton = @

		# icon
		
		@iconLayer = new Icon
			name: '.', parent: @
			x: Align.center, y: Align.center
			icon: @_icon, 
			color: Theme.fab.color

		# mask
		
		@mask = new Layer
			parent: @
			size: @size
			backgroundColor: null
			borderRadius: @borderRadius
			clip: true
			opacity: 1

		@mask.placeBehind @iconLayer
		@ripple = new Ripple( @mask, null )

		# events

		@onTouchStart (event) -> 
			@showTouched()
			Utils.delay 1, => @reset()
		
		@onTouchEnd (event) -> 
			@_action()
			@reset()

	showTouched: -> 
		@animate {shadowY: 3, shadowSpread: 1}

	reset: ->
		@animate 
			shadowY: 2
			shadowSpread: 0
