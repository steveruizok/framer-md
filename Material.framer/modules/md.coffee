{database} = require 'database'

#  88888888b                     dP           
#  88                            88           
# a88aaaa    .d8888b. 88d888b. d8888P .d8888b.
#  88        88'  `88 88'  `88   88   Y8ooooo.
#  88        88.  .88 88    88   88         88
#  dP        `88888P' dP    dP   dP   `88888P'


Utils.insertCSS(
	"""
    @font-face {
      font-family: "Roboto";
      src: url("fonts/Roboto.ttf");
    }
    """)

exports.Headline = eadline = class Headline extends TextLayer
	constructor: (options) ->
		super _.defaults options,
			fontFamily: 'Roboto'
			fontSize: 24
			fontWeight: 400
			lineHeight: 1.3
			color: 'rgba(0,0,0,.87)'
exports.Title = Title = class Title extends TextLayer
	constructor: (options) ->
		super _.defaults options,
			fontFamily: 'Roboto'
			fontSize: 20
			fontWeight: 500
			lineHeight: 1.3
			color: 'rgba(0,0,0,.87)'
exports.Regular = Regular = class Regular extends TextLayer
	constructor: (options) ->
		super _.defaults options,
			fontFamily: 'Roboto'
			fontSize: 16
			fontWeight: 400
			lineHeight: 1.3
			color: 'rgba(0,0,0,.87)'
exports.Body2 = Body2 = class Body2 extends TextLayer
	constructor: (options) ->
		super _.defaults options,
			fontFamily: 'Roboto'
			fontSize: 14
			fontWeight: 500
			lineHeight: 1.3
			color: 'rgba(0,0,0,.87)'
exports.Menu = Menu = class Menu extends TextLayer
	constructor: (options) ->
		super _.defaults options,
			fontFamily: 'Roboto'
			fontSize: 14
			fontWeight: 500
			lineHeight: 1.7
			color: 'rgba(0,0,0,.87)'
exports.Body1 = Body1 = class Body1 extends TextLayer
	constructor: (options) ->
		super _.defaults options,
			fontFamily: 'Roboto'
			fontSize: 14
			fontWeight: 400
			lineHeight: 1.4
			color: 'rgba(0,0,0,.87)'
exports.Caption = Caption = class Caption extends TextLayer
	constructor: (options) ->
		super _.defaults options,
			fontFamily: 'Roboto'
			fontSize: 12
			fontWeight: 400
			lineHeight: 1.3
			color: 'rgba(0,0,0,.54)'
 





#   dP   dP                                            
#   88   88                                            
# d8888P 88d888b. .d8888b. 88d8b.d8b. .d8888b. .d8888b.
#   88   88'  `88 88ooood8 88'`88'`88 88ooood8 Y8ooooo.
#   88   88    88 88.  ... 88  88  88 88.  ...       88
#   dP   dP    dP `88888P' dP  dP  dP `88888P' `88888P'


exports.themes = themes =
	dark:
		name: 'dark'
		tint: '#009688'
		header: 
			backgroundColor: '#212121'
			title: '#FFFFFF'
			invertIcon: true
		statusBar: 
			image: 'images/status_bar_dark.png'
			backgroundColor: '#000000'
			invert: false
		page:
			backgroundColor: '#303030'
		dialog: 
			backgroundColor: '#424242'
		text:
			title: 'rgba(255,255,255,1)'
			text: 'rgba(255,255,255,.7)'
		navBar:
			backgroundColor: '#000000'
	light:
		name: 'light'
		tint: '#009688'
		header: 
			backgroundColor: '#E0E0E0'
			title: 'rgba(0,0,0,.87)'
			invertIcon: false
		statusBar: 
			image: 'images/status_bar_light.png'
			backgroundColor: '#757575'
			invert: false
		page:
			backgroundColor: '#EEEEEE'
		dialog: 
			backgroundColor:'#FAFAFA'
		text:
			title: 'rgba(0,0,0,.87)'
			text: 'rgba(0,0,0,.54)'
		navBar:
			backgroundColor: '#000000'
	dau:
		name: 'dau'
		tint: '#009688'
		header: 
			backgroundColor: '#000'
			title: '#FFFFFF'
			invertIcon: true
		statusBar: 
			image: 'images/status_bar_dark.png'
			backgroundColor: '#000000'
			invert: false
		page:
			backgroundColor: '#000000'
		dialog: 
			backgroundColor: '#424242'
		text:
			title: 'rgba(255,255,255,1)'
			text: 'rgba(255,255,255,.9)'
		navBar:
			backgroundColor: '#303030'







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


		@_theme = options.theme #? themes.dark
		@_footer = options.footer ? true

		super _.defaults options,
			name: 'Flow'
			animationOptions:
				time: .2
		

		@theme = @_theme ? themes.dark

		if @_footer
			@footer = new Layer
				name: '.', parent: @
				width: Screen.width, height: 48
				image: 'images/nav_bar.png'
		
		@header = new Header
			theme: @_theme

		@onTransitionStart (current, next, direction) => 

			@header.title = next._header?.title ? 'Default'
			@header.icon = next._header?.icon ? 'menu'
			@header.iconAction = next._header?.iconAction ? -> null
			@header.visible = next._header?.visible ? true
			next._onLoad()

		
		# KEYBOARD

		@keyboard = new Layer
			name: 'Keyboard'
			y: @maxY, image: 'images/keyboard_dark.png'
			width: 360, height: 269
			animationOptions:
				time: .25

	newPage: (options = {}) ->

		page = new Page _.defaults options,
			theme: @_theme
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
		page.theme = @_theme

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

	@define "theme",
		get: -> return @_theme
		set: (theme) ->
			return if theme is @_theme
			@_theme = theme







# .d88888b    dP              dP                      888888ba                   
# 88.    "'   88              88                      88    `8b                  
# `Y88888b. d8888P .d8888b. d8888P dP    dP .d8888b. a88aaaa8P' .d8888b. 88d888b.
#       `8b   88   88'  `88   88   88    88 Y8ooooo.  88   `8b. 88'  `88 88'  `88
# d8'   .8P   88   88.  .88   88   88.  .88       88  88    .88 88.  .88 88      
#  Y88888P    dP   `88888P8   dP   `88888P' `88888P'  88888888P `88888P8 dP  


exports.StatusBar = class StatusBar extends Layer
	constructor: (options = {}) ->
		
		@_theme = undefined

		super _.defaults options,
			name: '.'
			width: Screen.width, height: 24

		@theme = options.theme ? throw 'Needs theme.'

	@define "theme",
		get: -> return @_theme
		set: (theme) ->
			return if theme is @_theme

			@_theme = theme
			@backgroundColor = null
			@image = @_theme.statusBar.image
			@invert = if @_theme.statusBar.invert is true then 100 else 0







# dP     dP                          dP                  
# 88     88                          88                  
# 88aaaaa88a .d8888b. .d8888b. .d888b88 .d8888b. 88d888b.
# 88     88  88ooood8 88'  `88 88'  `88 88ooood8 88'  `88
# 88     88  88.  ... 88.  .88 88.  .88 88.  ... 88      
# dP     dP  `88888P' `88888P8 `88888P8 `88888P' dP      


exports.Header = class Header extends Layer
	constructor: (options = {}) ->
		
		@_theme = options.theme
		@_title = undefined
		@_icon = undefined
		@_iconAction = options.iconAction ? -> null

		super _.defaults options,
			width: Screen.width
			y: 0
			height: 80
			shadowY: 2, shadowBlur: 3, shadowColor: 'rgba(0,0,0,.24)'

		@theme = options.theme ? throw 'Needs theme.'
		
		@backgroundColor = @_theme.header.backgroundColor

		@statusBar = new StatusBar
			name: '.', parent: @
			theme: @_theme

		@titleLayer = new Title
			name: '.', parent: @
			x: 72, y: Align.bottom(-14)
			color: @theme.header.title
			text: @title ? "No title"

		@title = options.title ? 'Default Header'

		@iconLayer = new Layer
			name: '.', parent: @, 
			x: 12, y: Align.center(12)
			width: 32
			height: 32
			image: ''
			backgroundColor: null
			invert: if @theme.header.invertIcon is true then 100 else 0

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

	@define "theme",
		get: -> return @_theme
		set: (theme) ->
			return if theme is @_theme

			@_theme = theme
			@backgroundColor = @_theme.header.backgroundColor
			@titleLayer.color = @_theme.header.title
			@iconLayer.invert = if @_theme.header.invertIcon is true then 100 else 0







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
		
		@_theme = options.theme
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
		
		@contentInset =
			top: 0, bottom: 500

		@theme = options.theme ? throw 'Needs theme.'

		@backgroundColor = @theme.page.backgroundColor
		@content.backgroundColor = @theme.page.backgroundColor

		if @_template?
			@_template.props =
				parent: @
				opacity: @_templateOpacity

		@sendToBack()


	@define "theme",
		get: -> return @_theme
		set: (theme) ->
			return if theme is @_theme

			@_theme = theme
			@backgroundColor = @_theme.page.backgroundColor

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

		@theme = options.theme ? throw 'needs theme'

		@icon = new Layer
			name: '.', parent: @
			x: 16, y: Align.center
			height: 32, width: 32, borderRadius: 16
			backgroundColor: @_iconBackgroundColor
			image: @_icon

		@labelLayer = new Regular
			name: '.', parent: @
			text: @_text
			x: @icon.maxX + 16, y: Align.center
			color: @theme.text.text


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
			invert: 100
			image: @_icon

		@labelLayer = new Regular
			name: 'label', parent: @
			x: @iconLayer.maxX + 16
			y: Align.center()
			color: '#FFF'
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
			backgroundColor: '#303030'
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

		@topSection = new Layer
			name: '.', parent: @
			width: @width, height: 173
			image: database.user.image
			backgroundColor: 'rgba(0,0,0,.3)'

		@titleIcon = new Layer
			name: '.', parent: @topSection
			x: 16, y: 40
			height: 64, width: 64
			borderRadius: 32
			backgroundColor: '#777'

		@titleExpand = new Layer
			name: '.', parent: @topSection
			x: Align.right(-16)
			y: Align.bottom(-13)
			height: 32, width: 32
			invert: 100
			image: "images/icons/expand-more.png"

		@title = new Body1
			name: '.', parent: @topSection
			width: @width
			color: '#FFF'
			x: 16, y: Align.bottom(-18)
			text: @_title

		links = []

		for link, i in @_links
			links[i] = new MenuButton
				name: 'test', parent: @
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

		@_theme = options.theme ? 'dark'

		super _.defaults options,
			name: '.', size: Screen.size, color: @_theme.tint
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
			backgroundColor: @_theme.dialog.backgroundColor
			shadowX: 0, shadowY: 7, shadowBlur: 30
			opacity: 0
			shadowColor: 'rgba(0,0,0,.3)'
		
		@title = new TextLayer
			name: '.', parent: @container
			x: 24, y: 20
			fontSize: 16, fontWeight: 500, color: @_theme.text.title
			text: @_title
		
		@body = new TextLayer
			name: 'body', parent: @container
			x: 24, y: 52
			width: @container.width - 42
			fontSize: 16
			fontWeight: 400, lineHeight: 1.5, color: @_theme.text.body
			text: @_body
		
		buttonsY = if @_body is '' then 128 else @body.maxY + 16
		
		@accept = new TextLayer
			name: '.', parent: @container
			x: Align.right(-16), y: buttonsY
			fontSize: 14, fontWeight: 500, textAlign: 'center'
			letterSpacing: 1.1, padding: {left: 4, right: 4, top: 8, bottom: 0}, 
			color: @_theme.tint, text: @_acceptText.toUpperCase()
			
		@accept.onTap @_acceptAction
		
		if @_declineText isnt ''
			@decline = new TextLayer
				name: '.', parent: @container
				x: 0, y: buttonsY
				fontSize: 14, fontWeight: 500, textAlign: 'center'
				letterSpacing: 1.1, padding: {left: 4, right: 4, top: 8, bottom: 0}, 
				color: @_theme.tint, text: @_declineText.toUpperCase()

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






