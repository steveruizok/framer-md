icons = JSON.parse Utils.domLoadDataSync "modules/icons.json"

# 	dP
# 	88
# 	88 .d8888b. .d8888b. 88d888b.
# 	88 88'  `"" 88'  `88 88'  `88
# 	88 88.  ... 88.  .88 88    88
# 	dP `88888P' `88888P' dP    dP
# 	
# 	
#-- @steveruizok
#	A class for creating Material Design icons, with access to 1600 icons as SVGs.
#	Adapted from marcbachmann's https://www.npmjs.com/package/material-design-icons-svg.
#	
#
#-- Installation:
#	Download and place icon.coffee and icons.json in your project's modules folder.
#	At the top of your project, type: "{Icon} = require "icon"
#
#
#--	Usage:
#	To create an icon, type:
#
#		myIcon = new Icon
#		
#	You can set the icon and the icon's fill color.
#
#		myIcon = new Icon
#			icon: 'cookie'
#			color: '#945200'
#
#	You can change an existing icon's fill or icon.
#
# 		myIcon.color = 'red' 
#		myIcon.icon = 'cup'
#
#	Apart from that, you can use the Icon instance just like any other Layer instance.
#
#	Enjoy! @steveruiok



exports.Icon = class Icon extends Layer
	constructor: (options = {}) ->

		@_icon = options.icon ? 'menu'
		@_color = options.color ? '#00000'
		@_backgroundColor = options.backgroundColor ? null

		super _.defaults options,
			name: '.'
			height: 24, width: 24
			backgroundColor: @_backgroundColor

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