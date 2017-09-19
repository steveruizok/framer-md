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

class exports.Rippple extends Layer
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
			x: point.x - 4 - ( fullWidth / 2 )
			y: point.y - 4 - ( fullWidth / 2 )
			height: fullWidth
			width: fullWidth 
			borderRadius: ( fullWidth / 2 )
			options: { time: .45 }

	hide: =>
		@animate
			opacity: 0
			options: { time: .45 , delay: .1 }


exports.Ripple = ( layer, point, placeBehind, color ) ->
	
	if !layer? then throw 'Ripple requires a Layer. Try myLayer.onTouchStart (event) -> ripple(@, event.point)'
	if !point? then throw 'Ripple requires a point. Try myLayer.onTouchStart (event) -> ripple(@, event.point)'

	mask = new Layer
		name: '.'
		parent: layer
		size: layer.size
		borderRadius: layer.borderRadius
		backgroundColor: null
		clip: true
		opacity: 0
		animationOptions: { time: .15 }
	
	if placeBehind then mask.placeBehind(placeBehind)
	
	# RIPPLE CIRCLE
	
	longSide = if layer.width > layer.height then layer.width else layer.height

	rippleCircle = new Layer
			name: '.', parent: mask
			x: point.x - 16
			y: point.y - 16
			width: 32, height: 32, 
			borderRadius: longSide
			
	if color?
		rippleCircle.props =
			backgroundColor: color
	else 
		rippleCircle.props = 
			backgroundColor: layer.backgroundColor
			saturate: 120
			brightness: 120
			opacity: .5
	
	# ANIMATIONS CIRCLE
	
	mask.animate
		opacity: 1
		options: {time: .15}
	
	rippleCircle.animate
		x: rippleCircle.x - longSide * 1.3
		y: rippleCircle.y - longSide * 1.3
		width: longSide * 2.6
		height: longSide * 2.6
		options: {time: .5}
	
	Utils.delay 2, -> 
		mask.animate
			opacity: 0
		mask.onAnimationEnd mask.destroy

	# TOUCH END
	
	layer.onTouchEnd -> 
		mask.animate
			opacity: 0
		mask.onAnimationEnd mask.destroy
