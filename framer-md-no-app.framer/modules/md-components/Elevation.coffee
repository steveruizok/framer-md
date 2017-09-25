# 	 88888888b dP                              dP   oo
# 	 88        88                              88
# 	a88aaaa    88 .d8888b. dP   .dP .d8888b. d8888P dP .d8888b. 88d888b.
# 	 88        88 88ooood8 88   d8' 88'  `88   88   88 88'  `88 88'  `88
# 	 88        88 88.  ... 88 .88'  88.  .88   88   88 88.  .88 88    88
# 	 88888888P dP `88888P' 8888P'   `88888P8   dP   dP `88888P' dP    dP

# thanks to @ma_rylou

exports.Elevation = (layer, elevationnumber = 0, animate = true, options = {time: .2, curve: 'ease'}) ->
	
	# Error handling
	if typeof elevationnumber isnt "number"
		throw Error "Elevation must be a number."

	# Clamp elevation number to between 0 and 24
	elevationnumber = _.clamp(elevationnumber, 0, 24) 

	props =
		shadowSpread: 0
		shadowX: 0
		shadowY: elevationnumber
		shadowBlur: elevationnumber
		shadowColor:"rgba(0, 0, 0, 0.24)"

	animProps =  _.merge(props, {options: options})

	#target layer
	if animate then layer.animate animProps
	else layer.props = props
