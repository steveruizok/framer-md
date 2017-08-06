{database} = require 'database'
{ripple} = require 'ripple'
{theme} = require 'theme'
type = require 'type'

# Our goal is to require only one require in Framer project, so this 
# is a clunky way of letting user create text using md.Title, etc.

exports.theme = theme
exports.Title = Title = type.Title
exports.Headline = Headline = type.Headline
exports.SubheadSecondary = SubheadSecondary = type.SubheadSecondary
exports.Regular = Regular = type.Regular
exports.Body2 = Body2 = type.Body2
exports.Body1 = Body1 = type.Body1
exports.Caption = Caption = type.Caption
exports.DialogAction = DialogAction = type.DialogAction

#  .d888888                   
# d8'    88                   
# 88aaaaa88a 88d888b. 88d888b.
# 88     88  88'  `88 88'  `88
# 88     88  88.  .88 88.  .88
# 88     88  88Y888P' 88Y888P'
#            88       88      
#            dP       dP      


exports.App = class App extends FlowComponent
	constructor: (options = {}) ->

		@_footer = options.footer ? true
		@theme = theme

		super _.defaults options,
			name: 'Flow'
			animationOptions:
				time: .2

		if @_footer
			@footer = new Layer
				name: '.', parent: @
				width: Screen.width, height: 48
				image: 'images/nav_bar.png'
		
		@header = new Header
			theme: theme

		@onTransitionStart (current, next, direction) => 

			@header.title = next._header?.title ? 'Default'
			@header.icon = next._header?.icon ? 'menu'
			@header.iconAction = next._header?.iconAction ? -> null
			@header.visible = next._header?.visible ? true
			next._onLoad()

		
		# KEYBOARD

		@keyboard = new Layer
			name: 'Keyboard'
			y: @maxY, image: theme.keyboard.image
			width: 360, height: 269
			animationOptions:
				time: .25

	newPage: (options = {}) ->

		page = new Page _.defaults options,
			contentInset: {top: @header.height}

		# adjust content inset for page
		if page.contentInset.top < @header.height then page.contentInset = 
			top: page.contentInset.top += @header.height
			bottom: page.contentInset.bottom
			left: page.contentInset.left
			right: page.contentInset.right

		return page 

	addPage: (page) ->
		page.contentInset = {top: @header.height}

		# adjust content inset for page
		if page.contentInset.top < @header.height then page.contentInset = 
			top: page.contentInset.top += @header.height
			bottom: page.contentInset.bottom
			left: page.contentInset.left
			right: page.contentInset.right

		return page 

	linkTo: (page) ->
		if page? and @current isnt page
			@showNext(page)


	showKeyboard: ->
		@keyboard.animate
			y: Align.bottom()
		@keyboard.bringToFront()

	hideKeyboard: ->
		@keyboard.animate
			y: Screen.maxY








# .d88888b    dP              dP                      888888ba                   
# 88.    "'   88              88                      88    `8b                  
# `Y88888b. d8888P .d8888b. d8888P dP    dP .d8888b. a88aaaa8P' .d8888b. 88d888b.
#       `8b   88   88'  `88   88   88    88 Y8ooooo.  88   `8b. 88'  `88 88'  `88
# d8'   .8P   88   88.  .88   88   88.  .88       88  88    .88 88.  .88 88      
#  Y88888P    dP   `88888P8   dP   `88888P' `88888P'  88888888P `88888P8 dP  


exports.StatusBar = class StatusBar extends Layer
	constructor: (options = {}) ->

		super _.defaults options,
			name: '.'
			width: Screen.width, height: 24
			backgroundColor: theme.statusBar.backgroundColor

		@items = new Layer
			name: '.', parent: @
			size: @size
			image: theme.statusBar.image
			invert: theme.statusBar.invert



# dP     dP                          dP                  
# 88     88                          88                  
# 88aaaaa88a .d8888b. .d8888b. .d888b88 .d8888b. 88d888b.
# 88     88  88ooood8 88'  `88 88'  `88 88ooood8 88'  `88
# 88     88  88.  ... 88.  .88 88.  .88 88.  ... 88      
# dP     dP  `88888P' `88888P8 `88888P8 `88888P' dP      


exports.Header = class Header extends Layer
	constructor: (options = {}) ->
		
		@_title = undefined
		@_icon = undefined
		@_iconAction = options.iconAction ? -> null

		super _.defaults options,
			name: 'Header', 
			width: Screen.width, height: 80
			shadowY: 2, shadowBlur: 3, shadowColor: 'rgba(0,0,0,.24)'
			backgroundColor: theme.header.backgroundColor

		@statusBar = new StatusBar
			name: '.', parent: @

		@titleLayer = new type.Title
			name: '.', parent: @
			x: 72, y: Align.bottom(-14)
			color: theme.header.title
			text: @title ? "No title"

		@title = options.title ? 'Default Header'

		@iconLayer = new Layer
			name: '.', parent: @, 
			x: 12, y: Align.center(12)
			width: 32, height: 32
			image: '', backgroundColor: null
			invert: theme.header.invert

		@icon = options.icon ? 'menu'

		@iconLayer.onTap => @_iconAction()


	@define "title",
		get: -> return @_title
		set: (titleText) ->
			@_title = titleText
			@titleLayer.textReplace(@titleLayer.text, @_title)

	@define "icon",
		get: -> return @_icon
		set: (iconName) -> 
			@_icon = iconName
			@iconLayer.image = "images/icons/#{@_icon}.png"

	@define "iconAction",
		get: -> return @_iconAction
		set: (action) ->
			@_iconAction = action







#  888888ba                            
#  88    `8b                           
# a88aaaa8P' .d8888b. .d8888b. .d8888b.
#  88        88'  `88 88'  `88 88ooood8
#  88        88.  .88 88.  .88 88.  ...
#  dP        `88888P8 `8888P88 `88888P'
#                          .88         
#                      d8888P          


exports.Page = class Page extends ScrollComponent
	constructor: (options = {}) ->
		
		@_header = options.header ? {title: 'Default', visible: true, icon: 'menu', iconAction: -> return null}
		@_template = options.template
		@_templateOpacity = options.templateOpacity ? .5
		@_onLoad = options.onLoad ? -> null

		if @_header.iconAction then @_header.iconAction = _.bind(@_header.iconAction, @)
		if @_onLoad then @_onLoad = _.bind(@_onLoad, @)


		super _.defaults options,
			name: 'Page'
			size: Screen.size
			scrollHorizontal: false
			backgroundColor: theme.page.primary.backgroundColor
		
		@contentInset =
			top: 0, bottom: 500

		@content.backgroundColor = null

		if @_template?
			@_template.props =
				parent: @
				opacity: @_templateOpacity

		@sendToBack()


	update: -> return null



#  888888ba                      dP   dP                      
#  88    `8b                     88   88                      
# a88aaaa8P' .d8888b. dP  dP  dP 88 d8888P .d8888b. 88d8b.d8b.
#  88   `8b. 88'  `88 88  88  88 88   88   88ooood8 88'`88'`88
#  88     88 88.  .88 88.88b.88' 88   88   88.  ... 88  88  88
#  dP     dP `88888P' 8888P Y8P  dP   dP   `88888P' dP  dP  dP

exports.RowItem = class RowItem extends Layer
	constructor: (options = {}) ->

		@_icon = options.icon
		@_iconBackgroundColor = options.iconBackgroundColor ? '#777'
		@_text = options.text ? 'Row item'
		@_row = options.row ? 0
		@_y = 32 + (@_row * 48) 

		super _.defaults options,
			width: Screen.width
			y: @_y
			height: 48
			backgroundColor: null

		@icon = new Layer
			name: '.', parent: @
			x: 16, y: Align.center
			height: 32, width: 32, borderRadius: 16
			backgroundColor: @_iconBackgroundColor
			image: @_icon

		@labelLayer = new type.Regular
			name: '.', parent: @
			x: @icon.maxX + 16, y: Align.center
			color: theme.text.text
			text: @_text


# 	8888ba.88ba                              888888ba             dP     dP
# 	88  `8b  `8b                             88    `8b            88     88
# 	88   88   88 .d8888b. 88d888b. dP    dP a88aaaa8P' dP    dP d8888P d8888P .d8888b. 88d888b.
# 	88   88   88 88ooood8 88'  `88 88    88  88   `8b. 88    88   88     88   88'  `88 88'  `88
# 	88   88   88 88.  ... 88    88 88.  .88  88    .88 88.  .88   88     88   88.  .88 88    88
# 	dP   dP   dP `88888P' dP    dP `88888P'  88888888P `88888P'   dP     dP   `88888P' dP    dP


class MenuButton extends Layer
	constructor: (options = {}) ->
		
		@_icon = options.icon ? 'home'
		@_text = options.text ? 'Default'
		@_action = options.action ? -> null

		super _.defaults options,
			height: 48, width: 304
			backgroundColor: null

		@iconLayer = new Layer
			name: '.', parent: @
			y: Align.center
			height: 32, width: 32
			invert: theme.menu.invert
			image: @_icon

		@labelLayer = new type.Regular
			name: 'label', parent: @
			x: @iconLayer.maxX + 16
			y: Align.center()
			color: theme.menuOverlay.text
			text: @_text

		@onTap @_action
		@onTap -> 
			Utils.delay .25, => @parent.hide()



# 	8888ba.88ba                              .88888.                             dP                  
# 	88  `8b  `8b                            d8'   `8b                            88                  
# 	88   88   88 .d8888b. 88d888b. dP    dP 88     88 dP   .dP .d8888b. 88d888b. 88 .d8888b. dP    dP
# 	88   88   88 88ooood8 88'  `88 88    88 88     88 88   d8' 88ooood8 88'  `88 88 88'  `88 88    88
# 	88   88   88 88.  ... 88    88 88.  .88 Y8.   .8P 88 .88'  88.  ... 88       88 88.  .88 88.  .88
# 	dP   dP   dP `88888P' dP    dP `88888P'  `8888P'  8888P'   `88888P' dP       dP `88888P8 `8888P88
#                                                                                               .88
#                                                                                           d8888P 

exports.MenuOverlay = class MenuOverlay extends Layer
	
	
	constructor: (options = {}) ->

		@_links = options.links ? [{title: 'Home', icon: 'home', action: -> null}]
		@_title = options.title ? 'Menu'
		@_image = options.image ? null


		super _.defaults options,
			height: Screen.height
			width: 304
			height: Screen.height
			visible: false
			backgroundColor: theme.menuOverlay.backgroundColor
			animationOptions: {curve: "spring(300, 35, 0)"}


		@scrim = new Layer
			name: '.', 
			size: Screen.size
			backgroundColor: 'rgba(0,0,0,.6)'
			opacity: 0
			visible: false
			animationOptions:
				time: .25

		@scrim.onTap => @hide()
		@onSwipeLeftEnd => @hide()

		@header = new Layer
			name: '.', parent: @
			width: @width, height: 173
			image: database.user.image
			backgroundColor: theme.menuOverlay.header.backgroundColor

		@titleIcon = new Layer
			name: '.', parent: @header
			x: 16, y: 40
			height: 64, width: 64
			borderRadius: 32
			backgroundColor: theme.menuOverlay.header.icon

		@titleExpand = new Layer
			name: '.', parent: @header
			x: Align.right(-16)
			y: Align.bottom(-13)
			height: 32, width: 32
			invert: theme.secondary.invert
			image: "images/icons/expand-more.png"

		@title = new type.Body1
			name: '.', parent: @header
			width: @width
			x: 16, y: Align.bottom(-18)
			text: @_title

		links = []

		for link, i in @_links
			links[i] = new MenuButton
				name: '.', parent: @
				x: 16, y: 189 + (48 * i)
				text: link.title
				icon: "images/icons/#{link.icon}.png"
				action: link.action

	show: ->
		@bringToFront()
		@visible = true
		@x = -Screen.width
		@animate
			x: 0

		@scrim.placeBehind(@)
		@scrim.visible = true
		@scrim.animate
			opacity: 1

	hide: ->
		@animate
			x: -Screen.width

		@scrim.animate
			opacity: 0

		Utils.delay .3, =>
			@visible = false
			@scrim.visible = false
			@sendToBack()
			@scrim.sendToBack()


# 	888888ba  oo          dP
# 	88    `8b             88
# 	88     88 dP .d8888b. 88 .d8888b. .d8888b.
# 	88     88 88 88'  `88 88 88'  `88 88'  `88
# 	88    .8P 88 88.  .88 88 88.  .88 88.  .88
# 	8888888P  dP `88888P8 dP `88888P' `8888P88
# 	                                       .88
# 	                                   d8888P

exports.Dialog = class Dialog extends Layer
	constructor: (options = {}) ->

		super _.defaults options,
			name: '.', size: Screen.size, color: theme.tint
			backgroundColor: 'rgba(0, 0, 0, .5)'
			opacity: 0
			
		@_title = options.title ? 'Default Title'
		@_body = options.body ? 'Body text goes here.'
		@_acceptText = options.acceptText ? 'confirm'
		@_acceptAction = options.acceptAction ? -> null
		@_declineText = options.declineText ? ''
		@_declineAction = options.declineAction ? -> null
		
		@on Events.Tap, (event) -> event.stopPropagation()
		
		@container = new Layer
			name: 'container', parent: @
			x: Align.center
			height: 128, width: Screen.width - 80
			backgroundColor: theme.dialog.backgroundColor
			shadowX: 0, shadowY: 7, shadowBlur: 30
			opacity: 0
			shadowColor: 'rgba(0,0,0,.3)'
		
		@title = new type.Title
			name: '.', parent: @container
			x: 24, y: 20
			fontSize: 16, fontWeight: 500, color: theme.text.title
			text: @_title
		
		@body = new type.SubheadSecondary
			name: 'body', parent: @container
			x: 24, y: 52
			width: @container.width - 42
			text: @_body
		
		buttonsY = if @_body is '' then 128 else @body.maxY + 16
		
		@accept = new type.DialogAction
			name: '.', parent: @container
			x: Align.right(-16), y: buttonsY
			color: theme.tint, text: @_acceptText.toUpperCase()
			
		@accept.onTap @_acceptAction
		
		if @_declineText isnt ''
			@decline = new type.DialogAction
				name: '.', parent: @container
				x: 0, y: buttonsY
				color: theme.tint, text: @_declineText.toUpperCase()

			@decline.onTap @_declineAction

		# set positions
		@container.height = @accept.maxY + 12
		@decline?.maxX = @accept.x - 16
		@container.y = Align.center(16)
		
		# add close actions to confirm and cancel
		for button in [@accept, @decline]
			button?.onTap @close
		
		
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
				delay: .05

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






