# 	.d88888b  dP oo       dP
# 	88.    "' 88          88
# 	`Y88888b. 88 dP .d888b88 .d8888b. 88d888b.
# 	      `8b 88 88 88'  `88 88ooood8 88'  `88
# 	d8'   .8P 88 88 88.  .88 88.  ... 88
# 	 Y88888P  dP dP `88888P8 `88888P' dP

{ Ripple } = require 'md-components/Ripple'
{ Icon } = require 'md-components/Icon'
{ Theme } = require 'md-components/Theme'

exports.Slider = class Slider extends SliderComponent
	constructor: (options = {}) ->

		@_notched = options.notched ? false
		@_notches = options.notches ? 10
		@_notchWidth = undefined

		super _.defaults options,
			name: '.', height: 2
			backgroundColor: 'rgba(0,0,0,.26)'
			min: 0, max: 10
			animationOptions: {time: .15}
		
		@fill.backgroundColor = Theme.primary
		@knobSize = 44

		@knob.props =
			name: 'Knob'
			backgroundColor: null
			shadowX: 0
			shadowY: 0
			shadowBlur: 0
			color: Theme.primary

		@knob.draggable.propagateEvents = false

		@thumb = new Layer
			name: 'Thumb', parent: @knob
			x: Align.center, y: Align.center
			height: 12, width: 12, borderRadius: 12
			backgroundColor: Theme.primary
			animationOptions: {time: .15}

		if @_notched

			@_notchWidth = @width / @_notches

			for i in [0...@_notches]
				notch = new Layer
					name: '.', parent: @
					x: i * @_notchWidth
					width: 2, height: 2, borderRadius: 2,
					backgroundColor: Theme.colors.primary.text

				notch.placeBehind(@knob)

			@tip = new Layer
				name: 'Tip', parent: @knob
				x: Align.center, y: -24
				width: 26, height: 32
				html: '<svg width="26px" height="32px" viewBox="0 0 26 32"><path d="M13,0.1 C20.2,0.1 26,6 26,13.3 C26,17 24,20.9 18.7,26.2 L13,32 L7.2,26.2 C2,20.8 0,16.9 0,13.3 C-3.55271368e-15,6 5.8,0.1 13,0.1 L13,0.1 Z" fill="' + Theme.primary + '"></path></svg>'
				backgroundColor: null, opacity: 0
				animationOptions: {time: .15}

			@tipValue = new TextLayer
				name: 'Tip Value', parent: @tip
				y: 5, width: 26
				color: Theme.colors.primary.text
				fontSize: 12, fontFamily: 'Roboto', textAlign: 'center'
				text: "{value}"

			@tipValue.template = @value

			@onTouchStart @_showNotchedDragging
			 
			@onValueChange ->
				@_setNotchedValue()
				@_setTipValue()


		else 
			@knob.onTouchStart @_showDragging
		

		@knob.onTouchEnd @showDefault
		@knob.onDragEnd @showDefault
		@knob.onDrag @_setThumbColor
		@_setThumbColor()

	_roundValue: (number, nearest) ->
		return (Math.round(number / nearest) + 1) * nearest

	_setNotchedValue: (value) =>
		if @knob.midX % @_notchWidth > 0
			@knob.x = @_roundValue(@knob.x, @_notchWidth) - (@knob.width / 2)

	_setTipValue: => 
		@tipValue.template = Math.round(@value)
		@_setTipColor()

	_setTipColor: =>
		color = if @value is @min then 'rgba(190, 190, 190, 1)' else Theme.primary
		@tip.html = '<svg width="26px" height="32px" viewBox="0 0 26 32"><path d="M13,0.1 C20.2,0.1 26,6 26,13.3 C26,17 24,20.9 18.7,26.2 L13,32 L7.2,26.2 C2,20.8 0,16.9 0,13.3 C-3.55271368e-15,6 5.8,0.1 13,0.1 L13,0.1 Z" fill="' + color + '"></path></svg>'

	_showNotchedDragging: =>
		@_setTipColor()
		@thumb.animate {opacity: 0}
		@tip.animate {opacity: 1}

	_showDragging: =>
		@_setThumbColor()
		@thumb.animate {width: 18, height: 18, x: 13, y: 13}

	_setThumbColor: =>
		@thumb.backgroundColor = if @value is @min then 'rgba(190, 190, 190, 1)' else Theme.primary

	showDefault: =>
		@animateStop()
		@_setThumbColor()
		@thumb.animate {opacity: 1, width: 12, height: 12, x: 15, y: 15}
		if @_notched
			@_setTipColor()
			@tip.animate {opacity: 0}


		