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
		
		@_app = options.app ? options.parent?._app ? options.parent?.parent?._app # lol
		@_color = options.color ? 'rgba(0,0,0,.87)'
		@_inputType = options.inputType ? 'input'
		@_inputMode = options.inputMode ? 'latin'
		@_maxLength = options.maxLength
		@_placeholder = options.placeholder ? ''
		@_readOnly = options.readOnly
		@_value = ''

		@tint = options.tint ? Theme.primary
		@selectionColor = options.selectionColor ? new Color(@tint).desaturate(-20).alpha(.5)
		@pattern = options.pattern ? (value) -> null
		@matches = false

		@_disabled
		@_focused
		@_color
		@_helperText
		@_helperTextColor
		@_labelText
		@_labelTextColor

		options.value ?= ''
		options.labelText ?= ''
		options.labelTextColor ?= 'rgba(0, 0, 0, .54)'
		options.helperText ?= ''
		options.helperTextColor ?= 'rgba(0, 0, 0, .54)'
		options.focused ?= false

		super _.defaults options,
			name: 'Input Field'
			width: 300, height: 72
			text: '', color: 'rgba(0,0,0,.87)'
			backgroundColor: null
			padding: {top: 22}
			animationOptions: {time: .15, colorModel: "rgb"}
			text: '{placeholder}'

		@template = @_placeholder
		

		# Label Text

		@labelTextLayer = new Type.Regular
			name: 'LabelTextLayer', parent: @
			x: 0, y: 22
			animationOptions: @animationOptions
			text: "{labelText}"
		

		# Helper Text

		@helperTextLayer = new Type.Caption
			name: 'Helper Text', parent: @
			x: 0, y: Align.bottom
			animationOptions: @animationOptions
			text: "{helper}"


		# Input Line

		@inputLine = new Layer
			name: 'Input Line', parent: @
			height: 1, width: @width
			y: Align.bottom(-22)
			backgroundColor: 'rgba(0, 0, 0, .42)'
			animationOptions: {time: .05, colorModel: "rgb"}
		

		# Input Element

		@_input = document.createElement(@_inputType, {'autofocus': false})

		@_input.spellcheck 		= false
		@_input.autocapitalize  = false
		@_input.autocomplete 	= false

		if @_inputMode?   then @setInputAttribute('inputmode', @_inputMode)
		if @_maxLength?   then @setInputAttribute('maxlength', @_maxLength)
		if @_readOnly? 	  then @setInputAttribute('readonly',  @_readOnly )

		Utils.insertCSS( """
			*:focus { outline: 0; }
			textarea { resize: none; } 
			::selection { background: #{@selectionColor}; } 
			""" )

		@_element.appendChild(@_input)
		@setStyle()
		

		# Event Listeners

		# @onTap => @focused = true
		@onMouseOver => @hovered = true
		@onMouseOut => @hovered = false
		@on "change:width", => @inputLine?.width = @width

		@_input.onfocus = => @focused = true; @setScroll(false)
		@_input.onblur = => @focused = false; @setScroll(true)
		@_input.oninput = @setValue

		# now that we have our layers, set options properties again

		@labelText = options.labelText
		@labelTextColor = options.labelTextColor
		@helperText = options.helperText
		@helperTextColor = options.helperTextColor
		@focused = options.focused
		@value = options.value

		if @parent?.name is "content"
			@scrollLayer = @parent.parent
			@scrollLayer?.onScrollStart => @disabled = true
			@scrollLayer?.onScrollEnd => @disabled = false
	
	setScroll: (scroll) => 
		@scrollLayer?.scrollVertical = scroll
		@_input.readonly = scroll

	showFocused: =>
		return if @disabled

		baseY = if @_inputType is 'textarea' then 8 else 0

		if @focused
			@animateStop()

			@_app?.focused = @

			if @screenFrame.y + @height > Screen.height - 222
				@scrollLayer?.scrollToLayer(@, 0, .45)
			else if @screenFrame.y < Screen.height * .15
				@scrollLayer?.scrollToLayer(@, 0, .15)

			@labelTextLayer?.animate
				y: baseY
				fontSize: 12
				color: @tint

			@inputLine?.animate
				height: 1
				backgroundColor: @tint

			if @_inputType is 'textarea'
				@animate
					borderWidth: 2
					borderColor: @tint

			@_app?.showKeyboard()

		else
			@animateStop()

			if this.hasTextContent()
				@labelTextLayer?.animate
					y: baseY
					fontSize: 12
					color: @labelTextColor
			else
				@labelTextLayer?.animate
					y: 22
					fontSize: 16
					color: @labelTextColor

			@inputLine?.animate
				height: 1
				backgroundColor: 'rgba(0, 0, 0, .42)'
			
			if @_inputType is 'textarea'
				@animate
					borderWidth: 1
					borderColor: 'rgba(0, 0, 0, .42)'

			if @_app?.focused is @
				@_app?.focused = undefined
				@_app?.hideKeyboard()

		@setPlaceholder()

	showDisabled: =>
		@animateStop()
		@opacity = if @disabled is true then .5 else 1
	
	showHovered: =>
		return if @disabled
		return if @focused
		
		if @hovered
			@inputLine?.animate
				height: 2
				backgroundColor: @_color
			if @_inputType is 'textarea'
				@animate 
					borderWidth: 2
		
		else @showFocused()
	
	hasTextContent : -> @value.length  		> 0
	hasHelperText  : -> @helperText?.length  > 0
	hasLabelText   : -> @labelText?.length   > 0
	hasPlaceholder : -> @_placeholder?.length > 0

	# get selection info - start index, end index, and direction
	getSelected: => {start: @_input.selectionStart, end: @_input.selectionEnd, direction: @_input.selectionDirection}
	
	# return selected text as a string
	getSelection: =>
		selected = @getSelected()
		start = selected.start
		end = selected.end
		
		return if @focused and end > start then @value[start...end]

	# set value of textlayer using textarea value
	setValue: => @value = @_input.value

	setPlaceholder: => 
		if @hasTextContent() or not @focused
			@color = null 
		else if @focused
			@color = 'rgba(0,0,0,.42)'

	# set style of textarea 
	setStyle: ->
		@_input.style.cssText = """
			z-index:5;
			zoom: #{@context.scale};
			font-size: #{@fontSize}px;
			font-weight: #{@fontWeight};
			font-family: #{@fontFamily};
			color: #{@tint};
			-webkit-text-fill-color: #{@_color};
			background-color: transparent;
			position: absolute;
			top: 0px;
			left: 0px;
			resize: none;
			width: #{@width}px;
			padding: #{@padding.top}px #{@padding.right}px #{@padding.bottom}px #{@padding.left}px;
			outline: 0px none transparent !important;
			line-height: #{@lineHeight};
			-webkit-box-sizing: border-box; /* Safari/Chrome, other WebKit */
			-moz-box-sizing: border-box;    /* Firefox, other Gecko */
			box-sizing: border-box; 
		"""

	# set individual attribute of textarea
	setInputAttribute: (attribute, value) ->
		@_input.setAttribute(attribute, value)

	@define "value",
		get: -> return @_value
		set: (value) ->
			return if @_value is value
			
			@_value = value
			
			@matches = @pattern(value)
			@emit("change:value", @value, @matches, @)

			@setPlaceholder()

	@define "labelText",
		get: -> return @_labelText
		set: (value) ->
			return if not @labelTextLayer?
			return if @_labelText is value
			@_labelText = value

			@labelTextLayer.template = @_labelText
			@labelTextLayer.visible = this.hasLabelText()

	@define "labelTextColor",
		get: -> return @_labelTextColor
		set: (value) ->
			return if not @labelTextLayer?
			return if @_labelTextColor is value
			@_labelTextColor = value

			@labelTextLayer.color = value

	@define "helperText",
		get: -> return @_helperText
		set: (value) ->
			return if not @helperTextLayer?
			return if @_helperText is value
			@_helperText = value

			@helperTextLayer.template = @_helperText
			@helperTextLayer.visible = this.hasHelperText()

	@define "helperTextColor",
		get: -> return @_helperTextColor
		set: (value) ->
			return if not @helperTextLayer?
			return if @_helperTextColor is value
			@_helperTextColor = value

			@helperTextLayer.color = value


	@define "disabled",
		get: -> return @_disabled
		set: (value) ->
			return if @_disabled is value
			if typeof value isnt 'boolean' then throw 'Disabled must be either true or false.'
			
			@_disabled = value
			@_input.blur()
			@_input.disabled = value

			@emit("change:disabled", value, @)

			@showDisabled()
		
	@define "focused",
		get: -> return @_focused
		set: (value) ->
			return if @_focused is value
			if typeof value isnt 'boolean' then throw 'Focused must be either true or false.'
			
			@_focused = value

			# blur or focus text area if set programmaically
			if value is true and document.activeElement isnt @_input 
				@_input.focus()
			else if value is false and document.activeElement is @_input
				@_input.blur()

			@emit("change:focused", value, @)

			@showFocused()

	@define "hovered",
		get: -> return @_hovered
		set: (value) ->
			return if @_hovered is value
			if typeof value isnt 'boolean' then throw 'Hovered must be either true or false.'
			
			@_hovered = value

			@emit("change:hovered", value, @)

			@showHovered()
