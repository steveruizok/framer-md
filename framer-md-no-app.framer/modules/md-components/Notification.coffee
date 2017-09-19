# 	888888ba             dP   oo .8888b oo                     dP   oo
# 	88    `8b            88      88   "                        88
# 	88     88 .d8888b. d8888P dP 88aaa  dP .d8888b. .d8888b. d8888P dP .d8888b. 88d888b.
# 	88     88 88'  `88   88   88 88     88 88'  `"" 88'  `88   88   88 88'  `88 88'  `88
# 	88     88 88.  .88   88   88 88     88 88.  ... 88.  .88   88   88 88.  .88 88    88
# 	dP     dP `88888P'   dP   dP dP     dP `88888P' `88888P8   dP   dP `88888P' dP    dP

# Notification does not require an app property, however if one is not set then notifications will not flow around eachother.

# TODO: replace action1 and action2 with array of actions.

Type = require 'md-components/Type'
{ Ripple } = require 'md-components/Ripple'
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
		@_time = options.time ? new Date()
		#TODO: replace action1 / action2 with @actions (array)
		@_action1 = options.action1
		@_action2 = options.action2
		@_timeout = options.timeout ? 5
		@_app = options.app

		# actions should be {title: 'archive', icon: 'archive'}
		
		initY = undefined
		if @_app?
			initY = if @_app.notifications.length > 0 then _.last(@_app.notifications).maxY + 8 else @_app.header.maxY + 4
			@_app.notifications.push(@)

		super _.defaults options,
			name: options.name ? '.'
			width: 344, borderRadius: 2
			x: Align.center, y: initY ? 0
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

		if @_action1?

			divider = new Divider
				name: 'Divider'
				parent: @
				x: 64, y: @body.maxY + 11
				width: @width - 64

			if @_action1?
				@action1 = new Layer
					name: 'Action 1', parent: @
					x: 64, y: divider.maxY + 11
					width: 80, height: 24, backgroundColor: null
				
				@action1.icon = new Icon
					name: 'Icon', parent: @action1
					icon: @_action1.icon
					width: 18, height: 18
					color: 'rgba(0,0,0,.54)'
				
				@action1.label = new Type.Caption
					name: 'Label', parent: @action1
					x: @action1.icon.maxX + 8
					fontSize: 13
					text: @_action1.title.toUpperCase()

				@action1.width = @action1.label.maxX

				#@action1.onTouchStart (event) -> Ripple(@, event.point, @icon, new Color(Theme.secondary).alpha(.3))
				@action1.onTap @close
				if @_action1.action then @action1.onTap => Utils.delay .25, _.bind(@_action1.action, @)
				

				if @_action2?
					@action2 = new Layer
						name: 'Action 2', parent: @
						x: @action1.maxX + 45, y: divider.maxY + 11
						width: 80, height: 24, backgroundColor: null
					
					@action2.icon = new Icon
						name: 'Icon', parent: @action2
						icon: @_action2.icon
						width: 18, height: 18
						color: 'rgba(0,0,0,.54)'
					
					@action2.label = new Type.Caption
						name: 'Label', parent: @action2
						x: @action2.icon.maxX + 8
						fontSize: 13
						text: @_action2.title.toUpperCase()

					@action2.width = @action2.label.maxX

					#@action2.onTouchStart (event) -> Ripple(@, event.point, @icon, new Color(Theme.secondary).alpha(.3))
					@action2.onTap @close
					if @_action2.action then @action2.onTap => Utils.delay .25, _.bind(@_action2.action, @)
					

				@height = divider.maxY + 47

		@open()

		@onSwipeLeftEnd => @close('left')
		@onSwipeRightEnd => @close('right')
		Utils.delay @_timeout, => if not @closed then @close('right')

	open: => 
		@animate {opacity: 1}

	close: (direction) =>
		if @_app? 
			_.pull(@_app.notifications, @)

			for notification in @_app.notifications
				if notification.y > @maxY
					notification.animate {y: notification.y - @height}

		@animate
			x: if direction is 'left' then -Screen.width else Screen.width
			opacity: 0
		
		@closed = true

		Utils.delay .5, => @destroy()