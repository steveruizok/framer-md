# 	d888888P oo dP
# 	   88       88
# 	   88    dP 88 .d8888b.
# 	   88    88 88 88ooood8
# 	   88    88 88 88.  ...
# 	   dP    dP dP `88888P'

Type = require 'md-components/Type'
{ Ripple } = require 'md-components/Ripple'
{ Icon } = require 'md-components/Icon'
{ Theme } = require 'md-components/Theme'

exports.Tile = Tile = class Tile extends Layer
	constructor: (options = {}) ->
		
		@_header = options.header ? false
		@_footer = options.footer ? false
		@_action = options.action ? -> null
		@_headerAction = options.headerAction ? -> null
		@_footerAction = options.footerAction ? -> null
		
		if @_header and @_footer then throw 'Tile cannot have both a header and a footer.'
		
		@_icon = options.icon
		@gridList = options.gridList ? throw 'Tile needs a grid property.'
		
		super _.defaults options,
			name: '.', parent: @gridList
			width: @gridList.tileWidth
			height: @gridList.tileHeight
			animationOptions: {time: .3}
		
		@onTouchStart (event) -> 
			if @gridList.parent?.parent?.content and @gridList.parent?.parent?.isMoving is false
				Ripple(@, event.point, @header, options.RippleColor ? 'rgba(0,0,0,.1)')
		
		@onTap @_action
		@onTap (event) -> event.stopPropagation()

		if @_header or @_footer
			@header = new Layer
				name: '.', parent: @
				y: if @_footer then Align.bottom()
				width: @width
				height: if options.support then 68 else 48
				backgroundColor: options.backgroundColor ? 'rgba(0,0,0,.5)'
			
			@header.onTouchStart (event) -> Ripple(@, event.point, @title)
			
			if @_footer then @header.onTap @_footerAction
			else @header.onTap @_headerAction

			@header.onTap (event) -> event.stopPropagation()

			if options.title
				@header.title = new Type.Regular
					name: '.', parent: @header
					x: 8, y: if options.support then 12 else Align.center()
					color: @color
					text: options.title ? 'Two Line'
			
				if options.support
					@header.support = new TextLayer
						name: '.', parent: @header
						x: 8, y: 35
						fontSize: 12
						fontFamily: 'Roboto'
						color: @color
						text: options.support ? 'Support text'
			
			if options.icon
				@header.icon = new Icon
					name: '.', parent: @header
					x: Align.right(-12), y: if options.support then 20 else Align.center()
					icon: options.icon
					color: @color

		@i = undefined
		@gridList.addTile(@)