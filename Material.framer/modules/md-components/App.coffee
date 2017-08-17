# 	 .d888888
# 	d8'    88
# 	88aaaaa88a 88d888b. 88d888b.
# 	88     88  88'  `88 88'  `88
# 	88     88  88.  .88 88.  .88
# 	88     88  88Y888P' 88Y888P'
# 	           88       88
# 	           dP       dP

{ Theme } = require 'md-components/Theme'
{ Header } = require 'md-components/Header'
{ BottomNav } = require 'md-components/BottomNav'
{ MenuOverlay } = require 'md-components/MenuOverlay'

exports.App = class App extends Layer
	constructor: (options = {}) ->

		@_bottomNav = options.bottomNav ? undefined
		@_menuOverlay = options.menuOverlay ? undefined
		
		@Theme = Theme
		@views = options.views ? []
		@current = {i: 0}
		@notifications = []
		@actionButton = undefined
		@snackbar = undefined

		super _.defaults options,
			name: 'App'
			size: Screen.size
			backgroundColor: null
			index: 1

		# HEADER

		@header = new Header
			Theme: Theme
			index: 999

		# FOOTER

		@footer = new Layer
			name: 'Footer'
			width: Screen.width, height: 48
			image: Theme.footer.image
			index: 999
			y: Align.bottom()
			clip: true

		flash = undefined

		@backButton = new Layer
			name: 'Back Button', parent: @footer
			x: 56
			width: 40, height: 40, borderRadius: 24
			opacity: 0, backgroundColor: 'rgba(255, 255, 255, .2)'
			animationOptions: {time: .15}

		@backButton.onTapStart =>
			flash?.destroy()
			flash = @backButton.copy()
			flash.ignoreEvents = true
			flash.parent = @footer
			flash.animate {x: 32, width: 100, y: 0, height: 48, opacity: 1}

		@backButton.onTap => 
			flash?.animateStop()
			flash?.animate {opacity: 0, options:{time: .5}}
			@current.showPrevious()


		if @_bottomNav
			@bottomNav = new BottomNav
				name: 'Bottom Nav'
				destinations: @_bottomNav.links ? "BottomNav needs an array of links. Example: [{title: 'Home', icon: 'home', action: -> view.linkTo(home)}]"
				y: if @footer? then Align.bottom(-@footer.height) else Align.bottom()
				index: 998

		# MENU OVERLAY
		if @_menuOverlay
			@menuOverlay = new MenuOverlay
				name: 'Menu Overlay'
				title: @_menuOverlay.title ? throw 'MenuOverlay needs a title.'
				links: @_menuOverlay.links ? throw "MenuOverlay needs an array of links. Example: [{title: 'Home', icon: 'home', action: -> view.linkTo(home)}]"


		# KEYBOARD

		@keyboard = new Layer
			name: 'Keyboard'
			y: @maxY, image: Theme.keyboard.image
			width: @width, height: 222
			index: 1000
			animationOptions:
				time: .25

		@keyboard.onTap => @hideKeyboard()

		for view, i in @views
			@addView(view, i)

		@changeView(@views[0])

	showKeyboard: ->
		@keyboard.animate
			y: Align.bottom()
		@keyboard.bringToFront()

	hideKeyboard: ->
		@keyboard.animate
			y: @maxY

	addView: (view, i) ->
		view.i = i
		view.parent = @
		view._app = @
		view.y = @header.maxY
		view.height = Screen.height - @header.height - @footer.height

		view.home = view.newPage
		 	name: 'home'
		 	header:
			 	title: view._title
			 	icon: view._icon
			 	iconAction: view._iconAction

		view.showNext(view.home)

	changeView: (view) ->
		return if view is @current

		@header.title = view.current._header?.title ? 'Default'
		@header.icon = view.current._header?.icon ? 'menu'
		@header.iconAction = view.current._header?.iconAction ? -> app.showMenu()
		@header.visible = view.current._header?.visible ? true

		if view.i > @current.i
			view.x = Screen.width 
			@current.animate {x: -Screen.width}
		else if view.i < @current.i
			view.x = -Screen.width
			@current.animate {x: Screen.width}

		view.animate {x: 0}
		view.bringToFront()
		@current = view

	showMenu: ->
		@menuOverlay.show()

	hideMenu: ->
		@menuOverlay.hide()

	changePage: (page) ->
		@header.title = page._header.title
		@header.icon = page._header.icon
		@header.iconAction = page._header.iconAction
		@header.visible = page._header.visible
		page.update()