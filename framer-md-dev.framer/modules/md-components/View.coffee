# 	dP     dP oo
# 	88     88
# 	88    .8P dP .d8888b. dP  dP  dP
# 	88    d8' 88 88ooood8 88  88  88
# 	88  .d8P  88 88.  ... 88.88b.88'
# 	888888'   dP `88888P' 8888P Y8P

# Works without an app, but will integrate with app if set with options.app.

{ Theme } = require 'md-components/Theme'
{ Page } = require 'md-components/Page'

exports.View = class View extends Page
	constructor: (options = {}) ->
		
		{ flow } = require 'md-components/Flow'

		@_icon = options.icon ? 'open-in-new'
		
		options.title ?= 'New View'
		options.icon = 'menu'
		options.iconAction = -> flow.showMenu()

		super options

		flow.addView
			view: @
			text: options.title
			icon: @_icon