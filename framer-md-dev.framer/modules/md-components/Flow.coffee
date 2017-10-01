# 	 .d888888
# 	d8'    88
# 	88aaaaa88a 88d888b. 88d888b.
# 	88     88  88'  `88 88'  `88
# 	88     88  88.  .88 88.  .88
# 	88     88  88Y888P' 88Y888P'
# 	           88       88
# 	           dP       dP

{ Header } = require 'md-components/Header'
{ BottomNav } = require 'md-components/BottomNav'
{ MenuOverlay } = require 'md-components/MenuOverlay'
{ Theme } = require 'md-components/Theme'

exports.flow # set by class

class exports.Flow extends FlowComponent
	constructor: (options = {}) ->
		@__constructor = true

		exports.flow = @

		@activeInput
		@header
		@keyboard 

		super _.defaults options,
			name: 'Flow'

		# Header

		@header = new Header

		# Keyboard

		@keyboard = new Layer
			name: 'Keyboard'
			y: @maxY, image: Theme.keyboard.image
			width: @width, height: 222
			index: 1000
			animationOptions:
				time: .25

		@keyboard.onTap @closeKeyboard

		# App Footer

		@footer = new Layer
			name: 'Footer'
			width: Screen.width, height: 48
			image: Theme.footer.image
			index: 999
			y: Align.bottom()
			clip: true

		flash = undefined

		@backButton = new Layer
			name: 'Back Button', parent: @footer
			x: 56
			width: 40, height: 40, borderRadius: 24
			opacity: 0, backgroundColor: 'rgba(255, 255, 255, .2)'
			animationOptions: {time: .15}

		@backButton.onTapStart =>
			flash?.destroy()
			flash = @backButton.copy()
			flash.ignoreEvents = true
			flash.parent = @footer
			flash.animate {x: 32, width: 100, y: 0, height: 48, opacity: 1}

		@backButton.onTap => 
			flash?.animateStop()
			flash?.animate {opacity: 0, options:{time: .5}}
			return if @current.constructor.name is 'View'
			@showPrevious()

		@menuOverlay = new MenuOverlay
			title: @name
			
		# Transition Events

		@onTransitionStart (prev, next, direction) =>
			Utils.delay 0, => @onChange(next)

	# On changing to a new page
	
	onChange: (next) ->
		return if typeof next is 'string'
		if !_.includes(['View', 'Page'], next.constructor?.name)
			throw 'Flow only words with Views and Pages.'
			return

		@setHeader(next.headerOptions)
		next.contentInset.top = @header.maxY + 16

		next.scrollY = 0
		next.onLoad()

	# Transitions

	showNextRight: (nav, layerA, layerB, overlay) ->
		options = {curve: "spring(300, 35, 0)"}

		transition =
			layerA:
				show: {options: options, x: 0, y: 0}
				hide: {options: options, x: 0 - layerA?.width / 2, y: 0}
			layerB:
				show: {options: options, x: 0, y: 0}
				hide: {options: options, x: layerB.width, y: 0}

	showNextLeft: (nav, layerA, layerB, overlay) ->
		options = {curve: "spring(300, 35, 0)"}

		transition =
			layerA:
				show: {options: options, x: 0, y: 0}
				hide: {options: options, x: 0 + layerA?.width / 2, y: 0}
			layerB:
				show: {options: options, x: 0, y: 0}
				hide: {options: options, x: -layerB.width, y: 0}

	# keyboard

	openKeyboard: () => 
		@footer.visible = false
		return if Utils.isMobile()

		@keyboard.bringToFront()
		@animate { y: -@keyboard.height }
		@keyboard.animate { y: Screen.height - @keyboard.height }
			
	closeKeyboard: => 
		@footer.visible = true
		@animate { y: 0 }
		@keyboard.animate { y: Screen.height }

	# menu

	showMenu: ->
		@menuOverlay.show()

	hideMenu: ->
		@menuOverlay.hide()

	# header

	setHeader: (options = {}) ->

		for layer in [@header.titleLayer, @header.iconLayer]
			layer.animate {opacity: 0, options: {time: .15}}

		Utils.delay .25, =>

			@header.title = options.title ? 'Header'
			@header.icon = options.icon ? 'menu'
			@header.iconAction = options.iconAction ? -> null
			@header.actions = options.actions ? []
			@header.visible = options.visible ? true

			for layer in [@header.titleLayer, @header.iconLayer]
				layer.animate {opacity: 1, options: {time: .15}}

	# add view

	addView: (options = {}) ->
		@menuOverlay.addLink(options)
