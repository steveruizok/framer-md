
#  888888ba                            
#  88    `8b                           
# a88aaaa8P' .d8888b. .d8888b. .d8888b.
#  88        88'  `88 88'  `88 88ooood8
#  88        88.  .88 88.  .88 88.  ...
#  dP        `88888P8 `8888P88 `88888P'
#                          .88         
#                      d8888P          

# simplify header controls
# remove template(?)

{ Theme } = require 'md-components/Theme'
{ StackView } = require 'md-components/StackView'

exports.Page = class Page extends StackView
	constructor: (options = {}) ->
		@__constructor = true

		{ flow } = require 'md-components/Flow'

		options.icon ?= 'arrow-left'
		options.iconAction ?= -> flow.showPrevious()

		# header
		@headerOptions = {
			title: options.title
			icon: options.icon
			iconAction: options.iconAction
			actions: options.actions
		}

		# on load
		@onLoad = options.onLoad ? -> null

		# refresh
		@refresh = options.refresh ? -> null


		super _.defaults options,
			name: options.title ? 'View'
			size: Screen.size
			scrollHorizontal: false
			backgroundColor: Theme.page.primary.backgroundColor
			shadowSpread: 1
			shadowColor: 'rgba(0,0,0,.16)'
			shadowBlur: 3
			contentInset: {top: flow.header?.height, bottom: 241}

		@content.backgroundColor = null

		@sendToBack()

		delete @__constructor

	onLoad: -> null
	refresh: -> null