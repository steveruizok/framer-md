# add stackview to any layer

class exports.StackView extends ScrollComponent
	constructor: (options = {}) ->
		showLayers = options.showLayers ? false

		# stack related
		@_stack = []
		@padding = options.padding ? {
			top: 16, right: 16, 
			bottom: 0, left: 16
			stack: 16
			}
		
		super _.defaults options,
			name: 'StackView'
			size: Screen.size
			scrollHorizontal: false
			contentInset: { bottom: 16 }
			
		@content.clip = false
		@content.backgroundColor = Screen.backgroundColor
		@content.name = if options.showLayers then 'content' else '.'
	
	# add a layer to the stack
	addToStack: (layers = []) =>
		if not _.isArray(layers) then layers = [layers]
	
		last = _.last(@stack)
		if last?
			startY = last.maxY + (@padding.stack ? 0)
		else
			startY = @padding.top ? 0

		for layer in layers
			layer.parent = @content
			layer.x = _.clamp(
				@padding.left + layer.x, 
				@padding.left, 
				@width - @padding.right - layer.width
				)
			layer.y = startY
			if layer.constructor.name is 'Card'
				layer.width = @width - ( @padding.left + @padding.right )
			@stack.push(layer)
			
			layer.on "change:height", => @moveStack(@)
			
		@updateContent()
	
	# pull a layer from the stack
	removeFromStack: (layer) =>
		_.pull(@stack, layer)
	
	# stack layers in stack, with optional padding and animation
	stackView: (
		animate = false, 
		padding = @padding.stack, 
		top = @padding.top, 
		animationOptions = {time: .25}
	) =>
	
		for layer, i in @stack
			
			if animate is true
				if i is 0 then layer.animate
					y: top
					options: animationOptions
					
				else layer.animate
					y: @stack[i - 1].maxY + padding
					options: animationOptions
			else
				if i is 0 then layer.y = top
				else layer.y = @stack[i - 1].maxY + padding
				
		@updateContent()
	
	# move stack when layer height changes
	moveStack: (layer) =>
		index = _.indexOf(@stack, layer)
		for layer, i in @stack
			if i > 0 and i > index
				layer.y = @stack[i - 1].maxY + @padding.stack
				
	
	# build with page as bound object
	build: (func) -> do _.bind(func, @)

	# refresh page
	refresh: -> null
	
	@define "stack",
		get: -> return @_stack
		set: (layers) ->
			layer.destroy() for layer in @stack
			@addToStack(layers)



		