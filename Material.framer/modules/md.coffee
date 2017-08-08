{ripple} = require 'ripple'
{theme} = require 'theme'
type = require 'type'
icons = JSON.parse Utils.domLoadDataSync "modules/icons.json"

Framer.Extras.Hints.disable()

# TODO: Change App from master flow component to Screen manager.
# App shouldn't directly manage pages: a new class, 'screen' will manage Pages.
# Tabs allow navigation between Screens. Content is still added to Pages.


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

app = undefined








# 	 .d888888
# 	d8'    88
# 	88aaaaa88a 88d888b. 88d888b.
# 	88     88  88'  `88 88'  `88
# 	88     88  88.  .88 88.  .88
# 	88     88  88Y888P' 88Y888P'
# 	           88       88
# 	           dP       dP



exports.App = class App extends Layer
	constructor: (options = {}) ->

		@_theme = theme
		@_bottomNav = options.bottomNav ? undefined
		@_menuOverlay = options.menuOverlay ? undefined
		@views = options.views ? []

		super _.defaults options,
			name: 'App'
			size: Screen.size
			backgroundColor: null
		
		app = @

		# HEADER

		@header = new Header
			theme: theme
			index: 999

		# FOOTER

		@footer = new Layer
			name: '.', parent: @
			width: Screen.width, height: 48
			image: 'images/nav_bar.png'
			index: 999
			y: Align.bottom()

		if @_bottomNav
			@bottomNav = new BottomNav
				name: 'Bottom Nav', parent: @
				destinations: @_bottomNav.links ? "md.app.bottomNav needs an array of links. Example: [{title: 'Home', icon: 'home', action: -> view.linkTo(home)}]"
				y: if @footer? then Align.bottom(-@footer.height) else Align.bottom()
				index: 999

		# MENU OVERLAY
		if @_menuOverlay
			@menuOverlay = new MenuOverlay
				name: 'Menu Overlay'
				title: @_menuOverlay.title ? throw 'md.app.menuOverlay needs a title.'
				links: @_menuOverlay.links ? throw "md.app.menuOverlay needs an array of links. Example: [{title: 'Home', icon: 'home', action: -> view.linkTo(home)}]"


		# KEYBOARD

		@keyboard = new Layer
			name: 'Keyboard'
			y: @maxY, image: theme.keyboard.image
			width: @width, height: 222
			index: 1000
			animationOptions:
				time: .25

		@keyboard.onTap => @hideKeyboard()


	# setup: (options = {}) ->

	# 	# BOTTOM NAV

	# 	if options.bottomNav
	# 		@bottomNav = new BottomNav
	# 			name: 'Bottom Nav', parent: @
	# 			destinations: options.bottomNav.links ? "md.app.bottomNav needs an array of links. Example: [{title: 'Home', icon: 'home', action: -> view.linkTo(home)}]"
	# 			y: Align.bottom(-@footer?.height)
	# 			index: 999

	# 	# MENU OVERLAY
	# 	if options.menuOverlay
	# 		@menuOverlay = new MenuOverlay
	# 			name: 'Menu Overlay'
	# 			title: options.menuOverlay.title ? throw 'md.app.menuOverlay needs a title.'
	# 			links: options.menuOverlay.links ? throw "md.app.menuOverlay needs an array of links. Example: [{title: 'Home', icon: 'home', action: -> view.linkTo(home)}]"

	showKeyboard: ->
		@keyboard.animate
			y: Align.bottom()
		@keyboard.bringToFront()

	hideKeyboard: ->
		@keyboard.animate
			y: @maxY








# 	dP     dP oo
# 	88     88
# 	88    .8P dP .d8888b. dP  dP  dP
# 	88    d8' 88 88ooood8 88  88  88
# 	88  .d8P  88 88.  ... 88.88b.88'
# 	888888'   dP `88888P' 8888P Y8P



exports.View = class View extends FlowComponent
	constructor: (options = {}) ->

		@app = app

		super _.defaults options,
			name: 'View'
			parent: app
			index: 900
			animationOptions:
				time: .2

		@onTransitionStart (current, next, direction) => 

			@app.header.title = next._header?.title ? 'Default'
			@app.header.icon = next._header?.icon ? 'menu'
			@app.header.iconAction = next._header?.iconAction ? -> null
			@app.header.visible = next._header?.visible ? true
			next._onLoad()

		app.views.push(@)

	newPage: (options = {}) ->

		page = new Page _.defaults options,
			contentInset: {top: @app.header.height}

		# adjust content inset for page
		if page.contentInset.top < @app.header.height then page.contentInset = 
			top: page.contentInset.top += @app.header.height
			bottom: page.contentInset.bottom
			left: page.contentInset.left
			right: page.contentInset.right

		return page 

	addPage: (page) ->
		page.contentInset = {top: @app.header.height}

		# adjust content inset for page
		if page.contentInset.top < @app.header.height then page.contentInset = 
			top: page.contentInset.top += @app.header.height
			bottom: page.contentInset.bottom
			left: page.contentInset.left
			right: page.contentInset.right

		return page

	linkTo: (page) ->
		if page? and @current isnt page
			@showNext(page)








# 	dP
# 	88
# 	88 .d8888b. .d8888b. 88d888b.
# 	88 88'  `"" 88'  `88 88'  `88
# 	88 88.  ... 88.  .88 88    88
# 	dP `88888P' `88888P' dP    dP
# 	
# 	

exports.Icon = class Icon extends Layer
	constructor: (options = {}) ->

		@_icon = options.icon ? 'menu'
		@_color = options.color ? '#00000'
		@_backgroundColor = options.backgroundColor ? null

		super _.defaults options,
			name: '.'
			height: 24, width: 24
			backgroundColor: @_backgroundColor

		# @icon = @_icon

	@define "icon",
		get: -> return @_icon
		set: (name) ->
			@_icon = name

			svg = if icons[@_icon] then "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'><path d='#{icons[@_icon]}' fill='#{@_color}'/></svg>"
			else throw "Error: icon '#{name}' was not found. See https://materialdesignicons.com/ for full list of icons."

			@html = svg

	@define "color",
		get: -> return @_color
		set: (color) ->
			@_color = new Color(color)

			svg = if icons[@_icon] then "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'><path d='#{icons[@_icon]}' fill='#{@_color}'/></svg>"
			else throw "Error: icon '#{name}' was not found. See https://materialdesignicons.com/ for full list of icons."

			@html = svg






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

		# TODO: if options.icon is false then no iconLayer, move title left

		@titleLayer = new type.Title
			name: '.', parent: @
			x: 72, y: Align.bottom(-14)
			color: theme.header.title
			text: @title ? "No title"

		@title = options.title ? 'Default Header'

		@iconLayer = new Icon
			name: '.', parent: @, 
			x: 12, y: Align.center(12)
			icon: 'menu', color: theme.header.icon.color

		@icon = options.icon ? 'menu'

		@iconLayer.onTap => @_iconAction()
		@iconLayer.onTouchStart (event) -> ripple(app.header, event.point)


	@define "title",
		get: -> return @_title
		set: (titleText) ->
			@_title = titleText
			@titleLayer.textReplace(@titleLayer.text, @_title)

	@define "icon",
		get: -> return @_icon
		set: (iconName) -> 
			@_icon = iconName
			@iconLayer.icon = iconName

	@define "iconColor",
		get: -> return @_icon.color
		set: (color) -> 
			@iconLayer.color = color

	@define "iconAction",
		get: -> return @_iconAction
		set: (action) ->
			@_iconAction = action







# 	 888888ba             dP     dP                       888888ba
# 	 88    `8b            88     88                       88    `8b
# 	a88aaaa8P' .d8888b. d8888P d8888P .d8888b. 88d8b.d8b. 88     88 .d8888b. dP   .dP
# 	 88   `8b. 88'  `88   88     88   88'  `88 88'`88'`88 88     88 88'  `88 88   d8'
# 	 88    .88 88.  .88   88     88   88.  .88 88  88  88 88     88 88.  .88 88 .88'
# 	 88888888P `88888P'   dP     dP   `88888P' dP  dP  dP dP     dP `88888P8 8888P'



exports.BottomNav = class BottomNav extends Layer
	constructor: (options = {}) ->
		
		@_destinations = options.destinations ? throw 'Needs at least one destination.'
		@_items = []
		@_initialDestination = options.initialDestination ? undefined
		# destination should be: [{name: string, icon: iconString, action: function}]
		@_activeDestination = @_initialDestination ? @_items[0]

		super _.defaults options,
			name: 'Bottom Nav'
			y: Align.bottom
			width: Screen.width, height: 56
			backgroundColor: theme.bottomNav.backgroundColor
			shadowY: theme.bottomNav.shadowY
			shadowBlur: theme.bottomNav.shadowBlur
			shadowColor: theme.bottomNav.shadowColor


		for destination, i in @_destinations
			item = new Layer
				name: '.', parent: @
				x: @width/@_destinations.length * i
				width: @width/@_destinations.length, height: @height
				backgroundColor: null

			item.disk = new Layer
				name: '.', parent: item
				x: Align.center, y: Align.center
				height: @height, width: @height, borderRadius: @height/2
				backgroundColor: null

			item.iconLayer = new Icon
				name: '.', parent: item.disk
				x: Align.center, y: Align.center(-8)
				icon: destination.icon
				animationOptions: {time: .15}

			item.labelLayer = new type.Caption
				name: '.', parent: item.disk
				x: Align.center, y: Align.center(14)
				width: @width, textAlign: 'center'
				text: destination.title
				animationOptions: {time: .15}

			item.action = destination.action

			item.disk.onTouchStart (event) -> 
				ripple(@, event.point, @parent.iconLayer, new Color(theme.primary).alpha(.3))

			item.onTap -> @parent.activeDestination = @

			@_items.push(item)

			@showActive(@_items[0])

		

	@define "activeDestination",
		get: -> return @_activeDestination
		set: (destination) ->
			return if destination is @_activeDestination
			@_activeDestination = destination

			@_activeDestination.action()
			@showActive(@_activeDestination)

	showActive: (item) ->
		item.labelLayer.animate {color: theme.primary, opacity: 1}
		item.iconLayer.color = theme.primary
		

		for sib in item.siblings
			sib.labelLayer.animate {color: '#777'}
			sib.iconLayer.color = '#777'




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

		@iconLayer = new Icon
			name: '.', parent: @
			y: Align.center
			icon: @_icon, color: theme.menuOverlay.text

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
			image: theme.user.image
			backgroundColor: theme.menuOverlay.header.backgroundColor

		@titleIcon = new Layer
			name: '.', parent: @header
			x: 16, y: 40
			height: 64, width: 64
			borderRadius: 32
			backgroundColor: theme.menuOverlay.header.icon

		@subheaderExpand = new Icon
			name: '.', parent: @header
			x: Align.right(-16)
			y: Align.bottom(-16)
			icon: 'menu-down'
			color: theme.menuOverlay.subheader.text

		@subheader = new type.Body1
			name: '.', parent: @header
			width: @width
			x: 16, y: Align.bottom(-18)
			text: @_title
			color: theme.menuOverlay.subheader.text

		links = []

		for link, i in @_links
			links[i] = new MenuButton
				name: '.', parent: @
				x: 16, y: 189 + (48 * i)
				text: link.title
				icon: link.icon
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








# 	 888888ba             dP     dP
# 	 88    `8b            88     88
# 	a88aaaa8P' dP    dP d8888P d8888P .d8888b. 88d888b.
# 	 88   `8b. 88    88   88     88   88'  `88 88'  `88
# 	 88    .88 88.  .88   88     88   88.  .88 88    88
# 	 88888888P `88888P'   dP     dP   `88888P' dP    dP



exports.Button = Button = class Button extends Layer 
	constructor: (options = {}) ->

		@_raised = options.raised ? false
		@_type = if @_raised then 'raised' else 'flat'
		@_action = options.action ? -> null

		super _.defaults options,
			name: '.'
			width: 0, height: 36
			borderRadius: 2
			backgroundColor: theme.button[@_type].backgroundColor
			shadowY: theme.button[@_type].shadowY
			shadowBlur: theme.button[@_type].shadowBlur
			shadowColor: theme.button[@_type].shadowColor
			animationOptions: {time: .15}

		@labelLayer = new type.Button
			name: '.', parent: @
			color: theme.button[@_type].color
			text: options.text ? 'button'
			textTransform: 'uppercase'
			textAlign: 'center'
			animationOptions: {time: .15}
			padding: 
				left: 16.5, right: 16.5
				top: 9, bottom: 11

		@size = @labelLayer.size
		@x = options.x

		@onTouchStart (event) -> 
			@showTouched()
			Utils.delay 1, => @reset()
		
		@onTouchEnd (event) -> 
			@_action()
			@reset()


	showTouched: -> 
		@labelLayer.animate {brightness: 110, saturate: 110}
		
		switch @_type
			when 'flat' then @animate {backgroundColor: 'rgba(0,0,0,.05)'}
			when 'raised'
				ripple(@, event.point, @labelLayer)
				@animate {shadowY: 3, shadowSpread: 1}

	reset: ->
		@labelLayer.animate {brightness: 100, saturate: 100}
		@backgroundColor = theme.button[@_type].backgroundColor
		@animate 
			shadowY: theme.button[@_type].shadowY
			shadowSpread: 0








# 	 88888888b          dP
# 	 88                 88
# 	a88aaaa    .d8888b. 88d888b.
# 	 88        88'  `88 88'  `88
# 	 88        88.  .88 88.  .88
# 	 dP        `88888P8 88Y8888'



exports.Fab = Fab = class Fab extends Layer 
	constructor: (options = {}) ->

		@_raised = options.raised ? false
		@_action = options.action ? -> null
		@_icon = options.icon ? 'plus'

		super _.defaults options,
			name: '.'
			x: Align.right(-16), y: Align.bottom(-66)
			width: 64, height: 64, borderRadius: 32
			backgroundColor: theme.fab.backgroundColor
			shadowY: 2, shadowBlur: 3
			shadowColor: 'rgba(0,0,0,.25)'
			animationOptions: {time: .15}

		if app.bottomNav? then @y -= app.bottomNav.height

		@iconLayer = new Icon
			name: '.', parent: @
			x: Align.center, y: Align.center
			icon: @_icon, color: theme.fab.color

		@onTouchStart (event) -> 
			@showTouched()
			Utils.delay 1, => @reset()
		
		@onTouchEnd (event) -> 
			@_action()
			@reset()


	showTouched: -> 
		ripple(@, event.point, @iconLayer)
		@animate {shadowY: 3, shadowSpread: 1}

	reset: ->
		@animate 
			shadowY: 2
			shadowSpread: 0









# 	 .88888.           oo       dP dP        oo            dP
# 	d8'   `88                   88 88                      88
# 	88        88d888b. dP .d888b88 88        dP .d8888b. d8888P
# 	88   YP88 88'  `88 88 88'  `88 88        88 Y8ooooo.   88
# 	Y8.   .88 88       88 88.  .88 88        88       88   88
# 	 `88888'  dP       dP `88888P8 88888888P dP `88888P'   dP

exports.GridList = GridList = class GridList extends Layer
	constructor: (options = {}) ->
		
		@_columns = options.columns ? 2
		
		super _.defaults options,
			name: '.'
			width: Screen.width
			backgroundColor: null
		
		@tiles = []
		@tileWidth = (@width - 24) / @_columns
		@tileHeight = options.tileHeight ? Screen.width / @_columns
		
	addTile: (tile) ->
		tile.i = @tiles.length
		@tiles.push(tile)
		
		tile.x = 8 + (@tileWidth + 8) * (tile.i % @_columns)
		tile.y = 8 + (@tileHeight + 8) * Math.floor(tile.i / @_columns)

		@height = _.last(@tiles).maxY

		if @parent?.parent?.content? then @parent.parent.updateContent()
	
	removeTile = (tile) ->
		_.pull(@tiles, tile)
		@repositionTiles()

	repositionTiles: ->
		for tile, i in @tiles
			tile.x = 8 + (@tileWidth + 8) * (tile.i % @_columns)
			tile.y = 8 + (@tileHeight + 8) * Math.floor(tile.i / @_columns)
			@height = _.last(@tiles).maxY











# 	d888888P oo dP
# 	   88       88
# 	   88    dP 88 .d8888b.
# 	   88    88 88 88ooood8
# 	   88    88 88 88.  ...
# 	   dP    dP dP `88888P'


exports.Tile = Tile = class Tile extends Layer
	constructor: (options = {}) ->
		
		@_header = options.header ? false
		@_footer = options.footer ? false
		
		if @_header and @_footer then throw 'Tile cannot have both a header and a footer.'
		
		@_icon = options.icon
		@_gridList = options.gridList ? throw 'Tile needs a grid property.'
		
		super _.defaults options,
			name: '.', parent: @_gridList
			width: @_gridList.tileWidth
			height: @_gridList.tileHeight
			
		if @_header or @_footer
			@header = new Layer
				name: '.', parent: @
				y: if @_footer then Align.bottom()
				width: @width
				height: if options.support then 68 else 48
				backgroundColor: options.backgroundColor ? 'rgba(0,0,0,.5)'
				
			if options.title
				@header.title = new type.Regular
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
		@_gridList.addTile(@)
			












