# 	 888888ba  oo                   dP
# 	 88    `8b                      88
# 	a88aaaa8P' dP 88d888b. 88d888b. 88 .d8888b.
# 	 88   `8b. 88 88'  `88 88'  `88 88 88ooood8
# 	 88     88 88 88.  .88 88.  .88 88 88.  ...
# 	 dP     dP dP 88Y888P' 88Y888P' dP `88888P'
# 	              88       88
# 	              dP       dP

#	By default, shows an expanding circle over a layer, clipped to its frame.
#	On the layer's touchEnd event, the circle and its mask will disappear.

#	required:
#	layer (Layer), the layer over which to show the ripple effect
#	point (object), the ripple origin point, usually a onTouchStart's event.point

#	optional:
#	placeBehind (Layer), a child of layer behind which the ripple should appear
#	color (string or color object), a custom color for the ripple

class exports.Ripple extends Layer
	constructor: (@mask, @external = false, @colorOverride = undefined, events = true) ->

		@mask ?= throw 'Ripple needs a mask layer'

		super
			name: 'Ripple', parent: @mask
			point: Align.center
			backgroundColor: @_color
			width: 8, height: 8
			opacity: 0

		fullWidth = if @mask.width > @mask.height then @mask.width else @mask.height
		@_fullWidth = fullWidth * 2

		if events
			@mask.onTapStart ( event ) => @show( event.point )
			@mask.onTapEnd @hide
			@mask.onPanEnd @hide
			@mask.onPan (event, layer) => 
				isTooFar = (num) -> Math.abs(num) >= 24
				@hide() if isTooFar(event.offset.x) or isTooFar(event.offset.y)

	show: (point = @point) =>
		return if @mask.parent?.disabled

		@animateStop()

		fullWidth = @_fullWidth
		parent = @mask.parent
		color = undefined

		if @colorOverride?
			color = @colorOverride
		else if @external
			color = new Color( parent.color )
				.alpha( .25 )
		else 
			color = new Color( parent.backgroundColor )
				.alpha( .5 )
				.lighten( 15 )
				.saturate ( 15 )

		@props =
			x: point.x - 4
			y: point.y - 4
			height: 8
			width: 8
			borderRadius: 4
			backgroundColor: color
			opacity: 0

		@animate
			opacity: 1
			options: { time: .1 }

		@animate
			x: point.x - 4 - ( fullWidth )
			y: point.y - 4 - ( fullWidth )
			height: fullWidth * 2
			width: fullWidth * 2
			borderRadius: ( fullWidth )
			options: { time: .6 }

	hide: =>
		@animate
			opacity: 0
			options: { time: .45 , delay: .1 }
