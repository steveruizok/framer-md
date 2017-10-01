# 	888888ba  oo          dP
# 	88    `8b             88
# 	88     88 dP .d8888b. 88 .d8888b. .d8888b.
# 	88     88 88 88'  `88 88 88'  `88 88'  `88
# 	88    .8P 88 88.  .88 88 88.  .88 88.  .88
# 	8888888P  dP `88888P8 dP `88888P' `8888P88
# 	                                       .88
# 	                                   d8888P

Type = require 'md-components/Type'
{ Icon } = require 'md-components/Icon'
{ Theme } = require 'md-components/Theme'
{ Button } = require 'md-components/Button'

# simplify: create an actions array, with text, action, color?
# this needs to be standardized across apis

exports.Dialog = class Dialog extends Layer
	constructor: (options = {}) ->

		showLayers = options.showLayers ? false
			
		@_title = options.title ? 'Default Title'
		@_body = options.body ? 'Body text goes here.'
		@_acceptText = options.acceptText ? 'confirm'
		@_acceptAction = options.acceptAction ? -> null
		@_declineText = options.declineText ? ''
		@_declineAction = options.declineAction ? -> null

		super _.defaults options,
			name: if showLayers then 'Dialog' else '.'
			size: Screen.size
			backgroundColor: 'rgba(0, 0, 0, .5)'
			opacity: 0

		@on Events.Tap, (event) -> event.stopPropagation()
		
		@container = new Layer
			name: 'container', parent: @
			x: Align.center
			height: 128, width: Screen.width - 80
			backgroundColor: Theme.dialog.backgroundColor
			shadowX: 0, shadowY: 7, shadowBlur: 30
			opacity: 0
			shadowColor: 'rgba(0,0,0,.3)'
		
		@title = new Type.Title
			name: '.', parent: @container
			x: 24, y: 20
			fontSize: 16, fontWeight: 500, color: Theme.text.title
			text: @_title
		
		@body = new Type.Subhead
			name: 'body', parent: @container
			x: 24, y: 52
			width: @container.width - 42
			text: @_body
		
		buttonsY = if @_body is '' then 128 else @body.maxY + 16
		
		@accept = new Button
			name: '.', parent: @container
			x: Align.right(-16), y: buttonsY
			text: @_acceptText.toUpperCase()
			action: @_acceptAction
		
		if @_declineText isnt ''
			@decline = new Button
				name: '.', parent: @container
				x: 0, y: buttonsY
				text: @_declineText.toUpperCase()
				action: @_declineAction

		# set positions
		@container.height = @accept.maxY + 12
		@decline?.maxX = @accept.x - 16
		@container.y = Align.center(16)
		
		# add close actions to confirm and cancel
		for button in [@accept, @decline]
			button?.onTap => Utils.delay .25, @close
		
		# ON LOAD
		@open()
	
	open: =>
		@animate
			opacity: 1
			options: 
				time: .25
		
		@container.animate
			opacity: 1
			options:
				time: .25
				delay: .15

	close: =>
		@container.animate
			opacity: 0
			options:
				time: .25
		
		@animate
			opacity: 0
			options:
				time: .25
		
		Utils.delay .5, => @destroy()