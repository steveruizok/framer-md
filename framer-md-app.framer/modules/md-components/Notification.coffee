# 	888888ba             dP   oo .8888b oo                     dP   oo
# 	88    `8b            88      88   "                        88
# 	88     88 .d8888b. d8888P dP 88aaa  dP .d8888b. .d8888b. d8888P dP .d8888b. 88d888b.
# 	88     88 88'  `88   88   88 88     88 88'  `"" 88'  `88   88   88 88'  `88 88'  `88
# 	88     88 88.  .88   88   88 88     88 88.  ... 88.  .88   88   88 88.  .88 88    88
# 	dP     dP `88888P'   dP   dP dP     dP `88888P' `88888P8   dP   dP `88888P' dP    dP

# Notification does not require an app property, however if one is not set then notifications will not flow around eachother.

# TODO: replace action1 and action2 with array of actions.

Type = require 'md-components/Type'
{ Icon } = require 'md-components/Icon'
{ Theme } = require 'md-components/Theme'
{ Divider } = require 'md-components/Divider' 

exports.Notification = Notification = class Notification extends Layer
	constructor: (options = {}) ->

		
		@_title = options.title ? 'Notification'
		@_body = options.body ? 'This is a notification.'
		@_icon = options.icon ? undefined
		@_iconColor = options.iconColor ? Theme.text.secondary
		@_iconBackgroundColor = options.iconBackgroundColor ? Theme.secondary
		
		@_actions = options.actions ? []

		@_time = options.time ? new Date()
		@_timeout = options.timeout ? 5

		@_app = options.app
		@_group = @_app?.notifications ? options.group

		

		# actions should be:
		# {title: 'archive', icon: 'archive', color: '', backgroundColor: ''}
		
		if @_app?
			@_group = @_app.notifications

		super _.defaults options,
			name: options.name ? '.'
			width: Screen.width - 16, borderRadius: 2
			x: Align.center
			backgroundColor: Theme.dialog.backgroundColor
			shadowX: 0, shadowY: 2, shadowBlur: 3
			opacity: 0, shadowColor: 'rgba(0,0,0,.3)'
			animationOptions: {time: .25}

		@iconLayer = new Layer
			name: 'Icon Container'
			parent: @
			x: 12, y: 12
			height: 40, width: 40, borderRadius: 20
			backgroundColor: @_iconBackgroundColor

		if @_icon
			@icon = new Icon
				name: 'Icon'
				parent: @iconLayer
				x: Align.center, y: Align.center
				color: @_iconColor
				icon: @_icon

		@title = new Type.Subhead
			name: 'Title'
			parent: @ 
			x: 64, y: 8
			width: @width - 72
			color: 'rgba(0,0,0,.87)'
			text: @_title

		@body = new Type.Body1
			name: 'Body'
			parent: @
			x: 64, y: @title.maxY
			width: @width - 72
			text: @_body

		@date = new Type.Caption
			name: 'Date'
			parent: @
			x: Align.right(-9), y: 15
			text: @_time.toLocaleTimeString([], hour: "numeric", minute: "2-digit")

		@height = _.clamp(@body.maxY + 13, 64, Infinity)

		# actions

		if @_actions.length > 0

			divider = new Divider
				name: 'Divider'
				parent: @
				x: 64, y: @body.maxY + 11
				width: @width - 64

			@height = divider.maxY + 46

			startX = 64
			notification = @
			
			for action in @_actions
				actionButton = new Layer
					name: 'Action 1', parent: @
					x: startX, y: divider.maxY + 11
					width: 80, height: 24, backgroundColor: null
				
				do _.bind( -> # actionButton

					@icon = new Icon
						name: 'Icon', parent: @
						width: 18, height: 18
						color: 'rgba(0,0,0,.54)'
						icon: action.icon
				
					@label = new Type.Caption
						name: 'Label', parent: @
						x: @icon.maxX + 8
						fontSize: 13
						textTransform: 'uppercase'
						text: action.title

					@width = @label.maxX + 20
					startX += @width

					do (action) => 
						@onTap => 
							notification.close()
							if action.action?
								Utils.delay .25, _.bind(action.action, notification)

				actionButton)

		# swipes

		@onSwipeLeftEnd => @close('left')
		@onSwipeRightEnd => @close('right')

		@open()

	open: => 
		if @_app then startY = @_app.header.maxY + 4
		else startY = 8

		startY += _.last(@_group)?.maxY ? 0

		@y = startY

		Utils.delay @_timeout, => if not @closed then @close('right')
		
		@animate {opacity: 1}
		@_group.push(@)


	close: (direction) =>
		if @_group
			_.pull(@_group, @)

			for notification in @_group
				if notification.y > @maxY
					notification.animate {y: notification.y - @height}

		@animate
			x: if direction is 'left' then -Screen.width else Screen.width
			opacity: 0
		
		@closed = true

		Utils.delay .5, => @destroy()
