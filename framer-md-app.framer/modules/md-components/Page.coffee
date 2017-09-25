
#  888888ba                            
#  88    `8b                           
# a88aaaa8P' .d8888b. .d8888b. .d8888b.
#  88        88'  `88 88'  `88 88ooood8
#  88        88.  .88 88.  .88 88.  ...
#  dP        `88888P8 `8888P88 `88888P'
#                          .88         
#                      d8888P          

# simplify header controls
# add stackview integration
# remove template(?)
# change update to refresh (as in rest of app)

{ Theme } = require 'md-components/Theme'
{ StackView } = require 'md-components/StackView'

exports.Page = class Page extends StackView
	constructor: (options = {}) ->
		
		@_header = {}
		@_header.title = options.header?.title ? 'New Page'
		@_header.visible = options.header?.visible ? true
		@_header.icon = options.header?.icon ? 'menu'
		@_header.iconAction = options.header?.iconAction ? -> null

		@_template = options.template
		@_templateOpacity = options.templateOpacity ? .5
		@_load = options.load ? -> null
		@_update = options.update ? -> null

		@_app = options.app

		if @_header.iconAction then @_header.iconAction = _.bind(@_header.iconAction, @)
		if @_onLoad then @_onLoad = _.bind(@_onLoad, @)

		super _.defaults options,
			name: 'Page'
			size: Screen.size
			scrollHorizontal: false
			backgroundColor: Theme.page.primary.backgroundColor
			contentInset: { bottom: 16 }
		
		@contentInset =
			top: 0, bottom: 160

		@content.backgroundColor = null
		@content._app = @_app

		if @_template?
			@_template.props =
				parent: @
				opacity: @_templateOpacity

		@sendToBack()

	update: -> @_update()

	load: -> @_load()

	build: (func) -> do _.bind(func, @)