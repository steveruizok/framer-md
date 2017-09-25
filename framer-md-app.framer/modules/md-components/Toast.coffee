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

class exports.Toast extends Layer
	constructor: (options = {}) ->
		@__constructor = true
		showLayers = options.showLayers

		@_title = options.title ? 'Toast'
		@_timeout = options.timeout ? 4
		@_action = options.action
		@_app = options.app

		super _.defaults options,
			name: 'Toast'
			y: Screen.maxY
			width: Screen.width
			clip: true
			backgroundColor: Theme.toast.backgroundColor
			animationOptions: {time: .25}

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

		if @_app?
			@y = if @_app.bottomNav? then Align.bottom(-@_app.bottomNav.height + @height) ? Align.bottom(@height)

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
				@animate {y: @y - @height}
		else
			@animate {y: @y - @height}

	hide: => 
		if @_app?
			@_app.toast = undefined
			@_app.actionButton?.animate {y: @_app.actionButton.y + @height, options: @animationOptions}
		
		@animate {height: 0, y: @y + @height}
		Utils.delay .5, => @destroy()