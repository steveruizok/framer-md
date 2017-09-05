Type = require 'md-components/Type'
{ Ripple } = require 'md-components/Ripple'
{ Icon } = require 'md-components/Icon'
{ Theme } = require 'md-components/Theme'


# 	d888888P                     dP    88888888b oo          dP       dP
# 	   88                        88    88                    88       88
# 	   88    .d8888b. dP.  .dP d8888P a88aaaa    dP .d8888b. 88 .d888b88
# 	   88    88ooood8  `8bd8'    88    88        88 88ooood8 88 88'  `88
# 	   88    88.  ...  .d88b.    88    88        88 88.  ... 88 88.  .88
# 	   dP    `88888P' dP'  `dP   dP    dP        dP `88888P' dP `88888P8
# 	
# 	


exports.TextField = class TextField extends Type.Regular
	constructor: (options = {}) ->
		
		@_app = options.app ? options.parent?._app
		@_tint = options.tint ? Theme.primary
		@_box = options.box ? false
		@_selectColor = options.selectColor ? new Color(@_tint).desaturate(-20).alpha(.5)
		@_maxLength = options.maxLength
		
		@_labelText
		@_value
		@_disabled
		@_focused
		@_color
		@_helperText
		@_helperTextColor
				
		# Summary: Use a hidden input field (@_input) to set the content of a TextLayer (@).

		super _.defaults options,
			name: 'Input Field'
			width: 300, height: 72
			text: ''
			backgroundColor: null
			animationOptions: {time: .15, colorModel: "rgb"}
		
		# store default color
		@_color = 'rgba(0,0,0,.87)'

		# create label
		@labelTextLayer = new TextLayer
			name: 'LabelTextLayer', parent: @
			y: 22, height: 73
			fontSize: 16, color: 'rgba(0,0,0,.54)'
			animationOptions: @animationOptions
			text: "{labelText}"
		
		@labelTextLayer.template = options.labelText ? ''
		@labelTextLayer.visible = options.labelText?
	

		# create textarea html element and append to '.framerLayer'
		@_input = document.createElement('input')
		@_element.appendChild(@_input)

		# turn off focus styling
		Utils.insertCSS( "*:focus { outline: 0; } ::selection { background: #{@_selectColor}; /* WebKit/Blink Browsers */ } ")
				
		# turn off element attributes
		for attribute in ['spellcheck', 'autocapitalize', 'autocomplete', 'autofocus']
			@setTextFieldAttribute(attribute, "false")
		
		# set max length
		if @_maxLength? then @setTextFieldAttribute('maxLength', @_maxLength)

		# set input style
		@setStyle()
		@_input.style['-webkit-text-fill-color'] = @_color

		# set layer height
		# @height = @_input.clientHeight

		# input line
		@inputLine = new Layer
			name: 'Input Line', parent: @
			height: 1, width: @width
			y: Align.bottom(-22)
			backgroundColor: 'rgba(0, 0, 0, .42)'
			animationOptions: {time: .05, colorModel: "rgb"}
		
		@on "change:width", => @inputLine.width = @width

		# helper text
		@helperTextLayer = new Type.Caption
			name: 'Helper Text', parent: @
			y: Align.bottom
			text: "{helper}"
			animationOptions: @animationOptions
		
		@helperTextLayer.template = options.helperText ? ''
		@helperTextLayer.color = options.helperTextColor ? 'rgba(0, 0, 0, .42)'

		# set event listeners
		@onTap => @showFocus(true)
		@_input.onblur  = => @showFocus(false)
		@_input.oninput = => @setValue()
		@onMouseOver => @showHovered(true)
		@onMouseOut => @showHovered(false)
		
		# refresh colors and style for current state
		@showFocus()
	
	# change input label and border on focus or unfocus
	showFocus: (focused) =>
		return if @disabled

		@_focused = focused

		if focused
			@animateStop()

			@labelTextLayer?.animate
				y: 0
				fontSize: 12
				color: @tint

			@inputLine.animate
				height: 1
				backgroundColor: @tint
			
			@_app?.showKeyboard()

		else
			@animateStop()

			if @_input.value is ''
				@labelTextLayer?.animate
					y: 22
					fontSize: 16
					color: 'rgba(0, 0, 0, .54)'
			else
				@labelTextLayer?.animate
					y: 0
					fontSize: 12
					color: 'rgba(0, 0, 0, .54)'

			@inputLine.animate
				height: 1
				backgroundColor: 'rgba(0, 0, 0, .42)'
				
			@_app?.hideKeyboard()


	# shor disabled status
	showDisabled: =>
		@animateStop()
		@showFocus()
		if @disabled
			if @_box then @borderWidth = 0
			@opacity = .5
		else
			if @_box then @borderWidth = 1
			@opacity = 1
	

	# if text box, set display properties on hover
	showHovered: (hovered) =>
		return if @disabled
		return if @_focused

		if hovered 
			@inputLine.animate
				height: 2
				backgroundColor: @_color
		else
			@showFocus()
	

	# get selection info - start index, end index, and direction
	getSelected: => 
		return {
			start: @_input.selectionStart, 
			end: @_input.selectionEnd, 
			direction: @_input.selectionDirection
		}
	

	# return selected text as a string
	getSelection: =>
		selected = @getSelected()		
		return if selected.end > selected.start then @value[selected.start...selected.end] else ''
	

	# set value of textlayer using textarea value
	setValue: => 
		@value = @_input.value

	# set style of textarea 
	setStyle: ->
		@_input.style.cssText = """
			zoom: #{@context.scale};
			font-size: 16px;
			font-weight: 400;
			font-family: "Roboto";
			color: #{@_tint};
			background-color: transparent;
			position: absolute;
			top: 0px;
			left: 0px;
			width: #{@width}px;
			padding-top: 22px;
			outline: 0px none transparent !important;
			line-height: 20px;
			-webkit-box-sizing: border-box; /* Safari/Chrome, other WebKit */
			-moz-box-sizing: border-box;    /* Firefox, other Gecko */
			box-sizing: border-box; 
		"""
	

	# set individual attribute of textarea
	setTextFieldAttribute: (attribute, value) ->
		@_input.setAttribute(attribute, value)


	@define "tint",
		get: -> return @_tint
		set: (value) ->
			return if @_tint is value
			
			@_tint = value
			@showFocused()
	

	@define "value",
		get: -> return @_value
		set: (value) ->
			return if @_value is value

			@_value = value
	

	@define "selection",
		get: -> return @getSelection()
		

	@define "focused",
		get: -> return @_focused
		set: (value) ->
			return if @_focused is value
			return if typeof value isnt 'boolean'
			
			@_focused = value

	@define "labelText",
		get: -> return @_labelText
		set: (value) ->
			return if @_labelText is value
			@_labelText = value

			return if not @labelTextLayer?
			@labelTextLayer.template = @_labelText
			@labelTextLayer.visible = @_labelText?.length > 0

	@define "helperText",
		get: -> return @_helperText
		set: (value) ->
			return if @_helperText is value
			@_helperText = value

			return if not @helperTextLayer?
			@helperTextLayer.template = @_helperText
			@helperTextLayer.visible = @_helperText.length > 0


	@define "helperTextColor",
		get: -> return @_helperTextColor
		set: (value) ->
			return if @_helperTextColor is value
			@_helperTextColor = value

			return if not @helperTextLayer?
			@helperTextLayer.color = value


	@define "disabled",
		get: -> return @_disabled
		set: (value) ->
			return if @_disabled is value
			return if typeof value isnt 'boolean'
			
			@_disabled = value
			@_input.disabled = value
			Utils.delay 0, => @showDisabled()
