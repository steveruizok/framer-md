Type = require 'md-components/Type'
{ Ripple } = require 'md-components/Ripple'
{ Icon } = require 'md-components/Icon'
{ Theme } = require 'md-components/Theme'
{ Divider } = require 'md-components/Divider'
{ Button } = require 'md-components/Button'

# 	 a88888b.                         dP
# 	d8'   `88                         88
# 	88        .d8888b. 88d888b. .d888b88
# 	88        88'  `88 88'  `88 88'  `88
# 	Y8.   .88 88.  .88 88       88.  .88
# 	 Y88888P' `88888P8 dP       `88888P8


exports.Card = class Card extends Layer
	constructor: (options = {}) ->

		@_raised = undefined

		_initExpand = options.expanded
		options.expanded = undefined

		@_expanded = false
		@_expand = options.expand

		@_baseHeight = options.height ? 200
		@_baseFooterHeight = 0

		@_baseY = options.y ? 8
		@_expand = options.expand
		@_actions = options.actions ? []
		@_verticalActions = options.verticalActions ? false

		

		super _.defaults options,
			name: '.'
			x: Align.center, y: 8
			width: Screen.width - 16
			borderRadius: 2
			backgroundColor: '#f9f9f9'
			shadowY: 2, shadowBlur: 3
			clip: true
			animationOptions: {time: .15}


		@footer = new Layer
			name: '.', parent: @
			height: 52, width: @width
			y: Align.bottom
			backgroundColor: @backgroundColor
			animationOptions: {time: .15}
	
		@divider = new Divider
			name: 'Divider', parent: @footer
			visible: false


		if @_expand?

			@divider.visible = true
			@footer.visible = true

			@expandIcon = new Icon
				name: 'Expand Icon', parent: @footer
				x: Align.right(-12), y: Align.bottom(-12)
				icon: 'chevron-down', color: '#000'
				animationOptions: {time: .15}
				action: => @expanded = !@expanded

		if @_actions.length > 0

			@divider.visible = true
			@footer.visible = true

			startX = 8; startY = 8

			for action in @_actions
				@actionButtons = []

				button = new Button
					name: "#{action.text} Button", parent: @footer
					x: startX, y: Align.bottom(-startY)
					text: action.text
					action: action.action

				if !@_verticalActions then startX = button.maxX
				if @_verticalActions
					startY = @height - button.y + 4
					@footer.y = button.y - 8
					@footer.height += button.height + 8

				@actionButtons.push(button)

			@_baseFooterHeight = @footer.height

	@define "expanded",
		get: -> return @_expanded
		set: (bool) ->
			return if bool is @_expanded
			@_expanded = bool

			if @_expanded 
				@bringToFront()
				@expandIcon.animate {rotation: 180}
				@animate {height: @height + @_expand}
				@footer.animate {height: @_expand}
			else 
				@expandIcon.animate {rotation: 0}
				@animate {height: @_baseHeight}
				@footer.animate {height: @_baseFooterHeight}

	@define "raised",
		get: -> return @_raised
		set: (bool) ->
			return if bool is @_raised
			@_raised = bool

			if @_raised then @animate {shadowY: 8, shadowBlur: 10}
			else @animate {shadowY: 2, shadowBlur: 3}