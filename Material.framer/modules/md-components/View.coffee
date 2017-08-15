# 	dP     dP oo
# 	88     88
# 	88    .8P dP .d8888b. dP  dP  dP
# 	88    d8' 88 88ooood8 88  88  88
# 	88  .d8P  88 88.  ... 88.88b.88'
# 	888888'   dP `88888P' 8888P Y8P

# Works without an app, but will integrate with app if set with options.app.

{ Theme } = require 'md-components/Theme'
{ Page } = require 'md-components/Page'

exports.View = class View extends FlowComponent
	constructor: (options = {}) ->

		@_title = options.title ? 'Home'
		@_icon = options.icon ? 'menu'
		@_iconAction = options.iconAction ? -> app.menuOverlay.show() 
		@_app = options.app

		super _.defaults options,
			name: 'View'
			animationOptions: {curve: "spring(300, 35, 0)"}
			shadowSpread: 2, shadowColor: 'rgba(0,0,0,.1)', shadowBlur: 6

		@onTransitionStart (current, next, direction) -> @_app?.changePage(next)

	newPage: (options = {}) ->
		page = new Page _.defaults options,
			size: @size
		return page 

	linkTo: (page) ->
		if page? and @current isnt page
			@showNext(page)
