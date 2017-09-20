### Notes / Todo

REFERENCE:
https://material.io/guidelines/
https://materialdesignicons.com/

###

md = require "md"
Screen.backgroundColor = 'efefef'

# Page

# Pages are scroll componets that hold content. They have a stack view, a refresh function that fires when a page becomes a flow component's current view, and instructions for the header - what what title to show, what buttons to show, and what those buttons should do. They also have some functions to work with a collapsing header.

class Page extends ScrollComponent
	constructor: (options = {}) ->
		
		# stack related
		@_stack = []
		@padding = options.padding ? {
			top: 16, right: 0, 
			bottom: 0, left: 16
			stack: 16
			}
		
		# header settings
		@left = options.left
		@right = options.right
		@title = options.title
		
		super _.defaults options,
			size: Screen.size
			scrollHorizontal: false
			
		@content.backgroundColor = Screen.backgroundColor
		
		# collapsing header related
		@_startScroll = undefined
		@onScrollStart => @_startScroll = @scrollPoint
		
		
	
	# add a layer to the stack
	addToStack: (layers = []) =>
		if not _.isArray(layers) then layers = [layers]
		
		for layer in layers
			layer.parent = @content
			layer.x = @padding.left ? 0
			layer.y = @padding.top ? 0
			@stack.push(layer)
			
			layer.on "change:height", => @moveStack(@)
		
		@stackView()
	
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
			
	
# #####################################	
# Component Tests without App Structure

page = new Page

# ####################################
# Type

page.addToStack(divider2 = new md.Divider
	width: Screen.width - 32
	text: 'Type'
	backgroundColor: Screen.backgroundColor
	)

# Type
page.addToStack([
	headline = new md.Headline,
	subhead = new md.Subhead,
	title = new md.Title,
	regular = new md.Regular,
	menu = new md.Menu,
	body1 = new md.Body1,
	body2 = new md.Body2,
	caption = new md.Caption,
])

# ####################################
# Buttons

page.addToStack(new md.Divider
	width: Screen.width - 32
	text: 'Buttons'
	backgroundColor: Screen.backgroundColor
	)

# Action Button
actionButton = new md.ActionButton

# Button
page.addToStack button = new md.Button

page.addToStack button = new md.Button
	raised: true
	action: -> @text = 'Tapped'

# ####################################
# Cards

page.addToStack(new md.Divider
	width: Screen.width - 32
	text: 'Cards'
	backgroundColor: Screen.backgroundColor
	)

# Card (rising)
card = new md.Card
	width: Screen.width - 32

card.onMouseOver -> @raised = true
card.onMouseOut  -> @raised = false

# Expanding Card
expandCard = new md.Card
	width: Screen.width - 32
	expand: 60
	
expandCardSecret = new md.Regular
	parent: expandCard
	y: 200, x: Align.center
	text: 'Secret!'
	
# Card with Actions
actionCard = new md.Card
	width: Screen.width - 32
	expand: 32
	actions: [
		{text: 'Button', action: -> @text = 'Tapped'}
		{text: 'Button', action: -> @text = 'Tapped'}
	]
	
page.addToStack([
	card,
	expandCard,
	actionCard
	])

# ####################################
# GridList

page.addToStack(new md.Divider
	width: Screen.width - 32
	text: 'GridList'
	backgroundColor: Screen.backgroundColor
	)

# GridList - needs work
gridList = new md.GridList
	width: Screen.width - 32

page.addToStack(gridList)

# Tile
for i in _.range(2)
	new md.Tile
		gridList: gridList
		image: Utils.randomImage()

# Tile with Header
new md.Tile
	gridList: gridList
	image: Utils.randomImage()
	header: true
	title: 'Tile'

# Tile with Header and Icon
new md.Tile
	gridList: gridList
	image: Utils.randomImage()
	header: true
	title: 'Tile'
	icon: 'settings'
	
# Tile with Header and Support
new md.Tile
	gridList: gridList
	image: Utils.randomImage()
	header: true
	title: 'Tile'
	support: 'Support Text'

# Tile with Header, Support and Icon
new md.Tile
	gridList: gridList
	image: Utils.randomImage()
	header: true
	title: 'Tile'
	support: 'Support Text'
	icon: 'settings'

# Tile with Footer
new md.Tile
	gridList: gridList
	image: Utils.randomImage()
	footer: true
	title: 'Tile'

# Tile with Footer and Icon
new md.Tile
	gridList: gridList
	image: Utils.randomImage()
	footer: true
	title: 'Tile'
	icon: 'settings'

# Tile with Header and Support
new md.Tile
	gridList: gridList
	image: Utils.randomImage()
	footer: true
	title: 'Tile'
	support: 'Support Text'

# Tile with Header, Support and Icon
new md.Tile
	gridList: gridList
	image: Utils.randomImage()
	footer: true
	title: 'Tile'
	support: 'Support Text'
	icon: 'settings'

# ####################################
# Selectors

page.addToStack(new md.Divider
	width: Screen.width - 32
	text: 'Selectors'
	backgroundColor: Screen.backgroundColor
	)
	
checkboxes = new md.Card

for i in _.range(5)
	checkbox = new md.Checkbox 
		parent: checkboxes
		x: 32 + (i * 32)
		y: 32
		
page.addToStack(checkboxes)

# actionButton = new Checkbox
# actionButton = new Dialog
# actionButton = new GridList
# actionButton = new Header
# actionButton = new Icon
# actionButton = new MenuButton
# actionButton = new MenuOverlay
# actionButton = new Notification
# actionButton = new Page
# actionButton = new Radiobox
# actionButton = new Ripple
# actionButton = new RowItem
# actionButton = new Select
# actionButton = new Slider
# actionButton = new Snackbar
# actionButton = new StatusBar
# actionButton = new Switch
# actionButton = new TextArea
# actionButton = new TextField
# actionButton = new Theme
# actionButton = new Tile
# actionButton = new View