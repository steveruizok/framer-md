Type = require 'md-components/Type'
{ Ripple } = require 'md-components/Ripple'
{ Icon } = require 'md-components/Icon'
{ Theme } = require 'md-components/Theme'


# 	d888888P                     dP    .d888888
# 	   88                        88   d8'    88
# 	   88    .d8888b. dP.  .dP d8888P 88aaaaa88a 88d888b. .d8888b. .d8888b.
# 	   88    88ooood8  `8bd8'    88   88     88  88'  `88 88ooood8 88'  `88
# 	   88    88.  ...  .d88b.    88   88     88  88       88.  ... 88.  .88
# 	   dP    `88888P' dP'  `dP   dP   88     88  dP       `88888P' `88888P8
# 	
# 	

# single

# multiline

# text area

exports.TextArea = class TextArea extends Type.Regular
	constructor: (options = {}) ->
		
		@_app = options.app ? options.parent?._app
		@_tint = options.tint ? Theme.primary
		@_box = options.box ? false
		@_selectColor = options.selectColor ? new Color(@_tint).desaturate(-20).alpha(.5)
		@_rows = options.rows ? 4
		@_labelText = options.labelText
		@_helperText = options.helperText
		
		@_value
		@_disabled
		@_placeholder
		@_focused
		@_color
				
		# Summary: Use a hidden input field (@_textarea) to set the content of a TextLayer (@).

		super _.defaults options,
			name: 'Input Field'
			width: 300
			borderRadius: 4
			color: '#333'
			fontSize: 16
			text: "{value}"
			color: Theme.colors.primary.text
			borderWidth: 2,
			borderColor: options.tint
			padding: if @_labelText? then {top: 39, bottom: 8, right: 8, left: 8} else {top: 16, bottom: 8, right: 8, left: 8}
			animationOptions: {time: .15, colorModel: "rgb"}
			clip: true
		
		# store default color
		@_color = @color
		@color = null
		
		# create label
		if @_labelText?
			@labelTextLayer = new TextLayer
				name: 'LabelTextLayer', parent: @
				fontSize: 12, color: 'rgba(0,0,0,.87)'
				padding: {top: 16, bottom: 8, right: 8, left: 8}
				animationOptions: {time: .15, colorModel: "rgb"}
				text: "{labelText}"
			
			@labelTextLayer.template = @_labelText
		
		
		# create text field box elements
		if @_box
			@helperLayer = new TextLayer
				name: 'Helper Text', parent: @
				fontSize: 12, y: @maxY
				color: 'rgba(109, 109, 109, 1)'
				padding: {top: 8, bottom: 8, right: 8, left: 8}
				text: "{helper}"
				animationOptions: {time: .15, colorModel: "rgb"}
			
			@helperLayer.template = @_helperText ? ''
		
			@onMouseOver => @showHovered(true)
			@onMouseOut => @showHovered(false)
		
		
		# create textarea html element and append to '.framerLayer'
		@_textarea = document.createElement('textarea')
		@_element.appendChild(@_textarea)

		# set height
		@_textarea.rows = @_rows

		# turn off focus styling
		Utils.insertCSS( "*:focus { outline: 0; } textarea { resize: none; } ::selection { background: #{@_selectColor}; /* WebKit/Blink Browsers */ } ")
				
		# turn off element attributes
		for attribute in ['spellcheck', 'autocapitalize', 'autocomplete', 'autofocus', 'resize']
			@setTextareaAttribute(attribute, "false")
		
		# set placeholder
		@placeholder = options.placeholder ? ''
		
		# set input style
		@setStyle()
		
		# set layer height
		@height = @_textarea.clientHeight

		# set event listeners
		@onTap => @showFocus(true)
		@_textarea.onblur  = => @showFocus(false)
		@_textarea.oninput = @setValue

		@showFocus()
	
	# change input label and border on focus or unfocus
	showFocus: (focused) =>
		return if @_disabled
		if focused
			@animateStop()
			@labelTextLayer?.animate
				y: 0
				fontSize: 12
				color: @tint
			@animate
				borderWidth: 2
				borderColor: @tint
				
			@_textarea.style.color = @_color

			@_app?.showKeyboard()
		else
			@animateStop()
			if @_textarea.value is ''
				@labelTextLayer?.animate
					y: 0
					fontSize: 16
					color: 'rgba(80, 80, 80, 1)'
			else
				@labelTextLayer?.animate
					y: 0
					fontSize: 12
					color: 'rgba(80, 80, 80, 1)'
			@animate
				borderWidth: 1
				borderColor: 'rgba(80, 80, 80, 1)'
				
			@_textarea.style.color = 'rgba(43, 43, 43, 1)'

			@_app?.hideKeyboard()


	
	showDisabled: =>
		if @disabled
			@animateStop()
			if @_textarea.value is ''
				@labelTextLayer?.animate
					y: 0
					fontSize: 16
					color: 'rgba(80, 80, 80, 1)'
			else
				@labelTextLayer?.animate
					y: 0
					fontSize: 12
					color: 'rgba(80, 80, 80, 1)'
			@animate
				borderWidth: 1
				borderColor: 'rgba(80, 80, 80, 1)'
				
			@_textarea.style.color = 'rgba(43, 43, 43, 1)'
			
			if @_box then @borderWidth = 0
			@opacity = .5
		else
			if @_box then @borderWidth = 1
			@opacity = 1
			@showFocus()
	
	# if text box, set display properties on hover
	showHovered: (hovered) =>
		return if @_disabled
		if hovered
			@animateStop()
			if @_textarea.value is ''
				@labelTextLayer?.animate
					y: 8
					fontSize: 16
					color: 'rgba(80, 80, 80, 1)'
		else
			@animateStop()
			if @_textarea.value is ''
				@labelTextLayer?.animate
					y: 0
					fontSize: 16
					color: 'rgba(80, 80, 80, 1)'
			else
				@labelTextLayer?.animate
					y: 0
					fontSize: 12
					color: 'rgba(80, 80, 80, 1)'
	
	# get selection info - start index, end index, and direction
	getSelected: => {start: @_textarea.selectionStart, end: @_textarea.selectionEnd, direction: @_textarea.selectionDirection}
	
	# return selected text as a string
	getSelection: =>
		selected = @getSelected()
		start = selected.start
		end = selected.end
		
		return if end > start then @value[start...end] else ''
	
	# set value of textlayer using textarea value
	setValue: => @value = @_textarea.value
			
	# set style of textarea 
	setStyle: ->
		@_textarea.style.cssText = """
			zoom: #{@context.scale};
			font-size: #{@fontSize}px;
			font-weight: #{@fontWeight}px;
			font-family: #{@fontFamily};
			font-style: #{@fontStyle};
			color: #{@_color};
			background-color: transparent;
			position: absolute;
			top: 0px;
			left: 0px;
			resize: none;
			width: #{@width}px;
			outline: 0px none transparent !important;
			line-height: #{@lineHeight};
			padding: #{@padding.top}px #{@padding.right}px #{@padding.bottom}px #{@padding.left}px;
			-webkit-box-sizing: border-box; /* Safari/Chrome, other WebKit */
			-moz-box-sizing: border-box;    /* Firefox, other Gecko */
			box-sizing: border-box; 
		"""
	
	# set individual attribute of textarea
	setTextareaAttribute: (attribute, value) ->
		@_textarea.setAttribute(attribute, value)

	@define "tint",
		get: -> return @_tint
		set: (value) ->
			return if @_tint is value
			
			@_tint = value
	
	@define "value",
		get: -> return @_value
		set: (value) ->
			return if @_value is value
			
			@_value = value
			@template = @_value
			if @value is '' then @value = @placeholder
		
	@define "placeholder",
		get: -> return @_placeholder
		set: (value) ->
			return if @_placeholder is value
			return if typeof value isnt 'string'
			@_placeholder = value
			@template = value
	
	@define "selection",
		get: -> return @getSelection()
		
	@define "focused",
		get: -> return @_focused
		set: (value) ->
			return if @_focused is value
			return if typeof value isnt 'boolean'
			
			@_focused = value

	@define "disabled",
		get: -> return @_disabled
		set: (value) ->
			return if @_disabled is value
			return if typeof value isnt 'boolean'
			
			@_disabled = value
			@_textarea.disabled = value
			Utils.delay 0, => @showDisabled()
	

Screen.backgroundColor = 'rgba(169, 173, 234, 1)'
