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

Ripple = (layer, point, placeBehind, color) ->
	
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
		animationOptions: {time: .15}
	
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

exports.Ripple = Ripple