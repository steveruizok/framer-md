# 	 888888ba             dP     dP                       888888ba
# 	 88    `8b            88     88                       88    `8b
# 	a88aaaa8P' .d8888b. d8888P d8888P .d8888b. 88d8b.d8b. 88     88 .d8888b. dP   .dP
# 	 88   `8b. 88'  `88   88     88   88'  `88 88'`88'`88 88     88 88'  `88 88   d8'
# 	 88    .88 88.  .88   88     88   88.  .88 88  88  88 88     88 88.  .88 88 .88'
# 	 88888888P `88888P'   dP     dP   `88888P' dP  dP  dP dP     dP `88888P8 8888P'

Type = require 'md-components/Type'
{ Rippple } = require 'md-components/Ripple'
{ Icon } = require 'md-components/Icon'
{ Theme } = require 'md-components/Theme'

exports.BottomNav = class BottomNav extends Layer
	constructor: (options = {}) ->
		
		@_destinations = options.destinations ? throw 'Needs at least one destination.'
		@_items = []
		@_initialDestination = options.initialDestination ? undefined
		# destination should be: [{name: string, icon: iconString, action: function}]
		@_activeDestination = @_initialDestination ? @_items[0]
		@_app = options.app
		@view = options.view

		super _.defaults options,
			name: 'Bottom Nav'
			y: Align.bottom
			width: Screen.width, height: 56
			backgroundColor: Theme.bottomNav.backgroundColor
			shadowY: Theme.bottomNav.shadowY
			shadowBlur: Theme.bottomNav.shadowBlur
			shadowColor: Theme.bottomNav.shadowColor
			clip: true

		for destination, i in @_destinations
			item = new Layer
				name: '.', parent: @
				x: @width/@_destinations.length * i
				width: @width/@_destinations.length, height: @height
				color: Theme.primary
				backgroundColor: null

			nav = @

			do _.bind( ->

				@mask = new Layer
					parent: @
					x: Align.center, y: Align.center()
					height: @height * 1.72
					width: @height * 1.7
					borderRadius: @height
					backgroundColor: null
					clip: true
					opacity: 1

				@ripple = new Rippple( @mask , external = true, undefined, events = false)

				@iconLayer = new Icon
					name: '.', parent: @
					x: Align.center, y: Align.center(-8)
					icon: destination.icon
					animationOptions: {time: .15}

				@labelLayer = new Type.Caption
					name: '.', parent: @
					x: Align.center, y: Align.center(14)
					width: @width, 
					textAlign: 'center'
					text: destination.title
					animationOptions: {time: .15}

				# set events on entire item
				@onTapStart ( event ) => @ripple.show( event.point )
				@onTapEnd @ripple.hide
				@onPanEnd @ripple.hide

				@view = destination.view

				@onTap -> nav._app.changeView(@view)

			, item)

			@_items.push(item)

			@showActive(@_items[0])

	@define "activeDestination",
		get: -> return @_activeDestination
		set: (destination) ->
			return if destination is @_activeDestination
			@_activeDestination = destination

			@showActive(@_activeDestination)

			@_app.changeView(@_activeDestination.view)

	showActive: (item) ->
		item.labelLayer.animate {color: Theme.primary, opacity: 1}
		item.iconLayer.color = Theme.primary
		
		for sib in item.siblings
			sib.labelLayer.animate {color: '#777'}
			sib.iconLayer.color = '#777'