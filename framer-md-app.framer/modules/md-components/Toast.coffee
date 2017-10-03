# 	d888888P                              dP
# 	   88                                 88
# 	   88    .d8888b. .d8888b. .d8888b. d8888P
# 	   88    88'  `88 88'  `88 Y8ooooo.   88
# 	   88    88.  .88 88.  .88       88   88
# 	   dP    `88888P' `88888P8 `88888P'   dP

Type = require 'md-components/Type'
{ Ripple } = require 'md-components/Ripple'
{ Theme } = require 'md-components/Theme'
{ Button } = require 'md-components/Button'

# currently identical to snackbar

class exports.Toast extends Layer
	constructor: (options = {}) ->

		{ app } = require 'md-components/App'
		@_app = app

		@_title = options.title ? 'Toast'
		@_timeout = options.timeout ? 4
		@_action = options.action

		super _.defaults options,
			name: '.'
			y: Screen.maxY
			width: Screen.width
			clip: true
			backgroundColor: Theme.toast.backgroundColor
			animationOptions: {time: .25}
			visible: false

		titleWidth = @width - 48

		if @_action?
			@action = new Button
				parent: @
				x: Align.right(-8), y: 4
				color: @_action.color ? Theme.colors.primary.light
				text: @_action.title.toUpperCase()
				action: @_action.action

			@action.onTap @hide
			titleWidth = @action.x - 8 - 24

		@textLabel = new Type.Body1
			name: 'Title', parent: @
			x: 24, y: 14
			width: titleWidth
			text: @_title
			color: Theme.toast.color

		@height = @textLabel.maxY + 14
		@action?.y = Align.center

		

		Utils.delay @_timeout, @hide

		@show()

	show: =>
		if @_app?
			if @_app.toast? 
				@_app.toast.hide()
				Utils.delay 1, @show
				return
			else
				@_app.toast = @
				@_app.actionButton?.animate {y: @_app.actionButton.y - @height, options: @animationOptions}

				height = @height

				@y = Screen.height - @_app.footer.height
				@height = 0
				@visible = true
				@animate
					y: @y - (height - 1)
					height: height
		else
			@visible = true
			@y = Screen.height
			@animate {y: Screen.height - @height}

	hide: => 
		if @_app?
			@_app.toast = undefined
			@_app.actionButton?.animate {y: @_app.actionButton.y + @height, options: @animationOptions}
		
		@animate {height: 0, y: @y + @height}
		Utils.delay .5, => @destroy()