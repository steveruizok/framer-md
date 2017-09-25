### Notes / Todo

REFERENCE:
https://material.io/guidelines/
https://materialdesignicons.com/

###

md = require "md"

# #####################################	
# Component Tests without App Structure

Screen.backgroundColor = 'efefef'
page = new md.StackView

# ####################################
# Type

page.addToStack(divider2 = new md.Divider
	width: Screen.width - 32
	text: 'Type'
	backgroundColor: Screen.backgroundColor
	)

# Dialog Buttons
typeCard = new md.Card
	width: Screen.width - 32

typeCard.addToStack([
	headline = new md.Headline
		text: 'Headline',
	subhead = new md.Subhead
		text: 'Subhead',
	title = new md.Title
		text: 'Title',
	regular = new md.Regular
		text: 'Regular',
	menu = new md.Menu
		text: 'Menu',
	body1 = new md.Body1
		text: 'Body1',
	body2 = new md.Body2
		text: 'Body2',
	caption = new md.Caption
		text: 'Caption',

])

page.addToStack(typeCard)


# ####################################
# Icons

page.addToStack(new md.Divider
	width: Screen.width - 32
	text: 'Icons'
	backgroundColor: Screen.backgroundColor
	)

# Dialog Buttons
iconsCard = new md.Card
	width: Screen.width - 32

cols = 7
gap = ( (Screen.width - 32) - (cols * 24) ) / cols
startX = gap / 2
startY = 16

for i in _.range(35)
	icon = new md.Icon
		parent: iconsCard
		x: startX + ((i % cols) * (gap * 2)) 
		y: startY + (Math.floor(i/cols) * (gap * 2))

andSoMuchMore = new md.Regular
	parent: iconsCard
	x: Align.right(-16)
	y: icon.maxY + 24
	text: "...and 1,615 more!"

iconsCard.height = andSoMuchMore.maxY + 16

page.addToStack(iconsCard)


# ####################################
# Buttons

page.addToStack(new md.Divider
	width: Screen.width - 32
	text: 'Buttons'
	backgroundColor: Screen.backgroundColor
	)

# Dialog Buttons
buttonsCard = new md.Card
	width: Screen.width - 32

buttonsCard.build ->
	# Button
	@addToStack new md.Button
		text: 'Flat'
		
	# Button
	@addToStack disFlat = new md.Button
		disabled: true
		text: 'Flat'
	
	# Raised Button
	@addToStack new md.Button
		raised: true
		text: 'Raised'
		
	# Button
	@addToStack disRaised = new md.Button
		raised: true
		disabled: true
		text: 'Flat'
		
	@addToStack new md.Button
		icon: 'menu'
	
	@addToStack disIcon = new md.Button
		icon: 'heart'
		disabled: true
	
	# Action Button
	@addToStack new md.ActionButton
		action: ->
			disRaised.disabled = !disRaised.disabled
			disFlat.disabled = !disFlat.disabled
			disIcon.disabled = !disIcon.disabled

page.addToStack(buttonsCard)


# ####################################
# Cards

page.addToStack(new md.Divider
	width: Screen.width - 32
	text: 'Cards'
	backgroundColor: Screen.backgroundColor
	)

# Card (rising on mouseover)
card = new md.Card
	width: Screen.width - 32

card.onMouseOver -> @raised = true
card.onMouseOut  -> @raised = false

# Card with Actions
actionCard = new md.Card
	width: Screen.width - 32
	expand: 60
	actions: [
		{text: 'Button', action: -> @text = 'Tapped'}
		{text: 'Button', action: -> @text = 'Tapped'}
	]

expandCardSecret = new md.Regular
	parent: actionCard
	y: 212, x: Align.center
	text: 'Secret!'
	
page.addToStack([
	card,
	actionCard
	])


# ####################################
# Selectors

page.addToStack(new md.Divider
	width: Screen.width - 32
	text: 'Selection Controls'
	backgroundColor: Screen.backgroundColor
	)


# Switches

switches = new md.Card
	width: Screen.width - 32

switches.build ->
	
	switchesLabel = new md.Caption	
		parent: @
		x: 16, y: 16
		text: 'Switch'
	
	uiSwitch = new md.Switch
		parent: @
		x: 16, y: switchesLabel.maxY + 24
		
	uiSwitch.on "change:isOn", (isOn) ->
		switchesResult.template = if isOn then 'is on' else 'is off'
	
	switchesResult = new md.Regular	
		parent: @
		x: 16, 
		y: uiSwitch.maxY + 16
		text: 'Switch {isOn}'
	
	switchesResult.template = 'is off'
	
	@height = switchesResult.maxY + 16
	
page.addToStack(switches)

# Checkboxes

checkboxes = new md.Card
	width: Screen.width - 32

checkboxLabel = new md.Caption	
	parent: checkboxes
	x: 16, y: 16
	text: 'Checkbox'


checkboxGroup = []

boxes = 7
gap = ( (Screen.width - 32) - (boxes * 24) ) / boxes
startX = gap / 2

for i in _.range(7)
	checkbox = new md.Checkbox 
		name: i + 1
		parent: checkboxes
		x: startX
		y: checkboxLabel.maxY + 12
		group: checkboxGroup
	
	startX += (24 + gap)
	
	do -> 
		checkbox.on "change:isOn", (isOn, box) ->
			result = ""
			for box in checkboxGroup
				if box.isOn
					result += (box.name + ', ')
			if result is "" then result = "none"
			checkboxResult.template = _.trimEnd(result, ', ')


checkboxResult = new md.Regular	
	parent: checkboxes
	x: 16, 
	y: checkbox.maxY + 16
	text: 'Checked: {checked}'

checkboxResult.template = 'none'

checkboxes.height = checkboxResult.maxY + 16
	
page.addToStack(checkboxes)


# Radioboxes

radioboxes = new md.Card
	width: Screen.width - 32

radioboxesLabel = new md.Caption	
	parent: radioboxes
	x: 16, y: 16
	text: 'Radiobox'


radioboxGroup = []

boxes = 7
gap = ( (Screen.width - 32) - (boxes * 24) ) / boxes
startX = gap / 2

for i in _.range(7)
	radiobox = new md.Radiobox 
		name: i + 1
		parent: radioboxes
		x: startX
		y: radioboxesLabel.maxY + 12
		group: radioboxGroup
	
	startX += (24 + gap)
	
	do -> 
		radiobox.on "change:isOn", (isOn, box) ->
			result = "none"
			for box in radioboxGroup
				if box.isOn
					result = (box.name)
			radioboxResult.template = result


radioboxResult = new md.Regular	
	parent: radioboxes
	x: 16, 
	y: checkbox.maxY + 16
	text: 'Selected: {checked}'
	
radioboxGroup[0].isOn = true

radioboxes.height = radioboxResult.maxY + 16

page.addToStack(radioboxes)

# Sliders

sliders = new md.Card
	width: Screen.width - 32

sliders.build ->
	@addToStack new md.Caption
		text: 'Slider'
	
	# regular slider
	
	@addToStack( slider = new md.Slider
		width: @width - 48
		)
		
	slider.on "change:value", (value) ->
		sliderResult.template = slider.value.toFixed(1)
	
	@addToStack( sliderResult = new md.Regular
		text: 'Slider value: {value}'
		)
	
	sliderResult.template = slider.value.toFixed(1)
	
	# notched slider
	
	@addToStack new md.Caption
		text: 'Slider with Notches'
		
	@addToStack( notchedSlider = new md.Slider
		width: @width - 48
		notched: true
		)
	
	
	notchedSlider.on "change:value", (value) ->
		notchedSliderResult.template = notchedSlider.value.toFixed(1)
	
	@addToStack( notchedSliderResult = new md.Regular
		text: 'Slider value: {value}'
		)
	
	notchedSliderResult.template = notchedSlider.value.toFixed(1)
	
page.addToStack(sliders)


# ####################################
# Inputs

page.addToStack(new md.Divider
	width: Screen.width - 32
	text: 'Text Field Inputs'
	backgroundColor: Screen.backgroundColor
	)

# Text Fields

textFieldsCard = new md.Card
	width: Screen.width - 32
	
textFieldsCard.padding.stack = 32

textFieldsCard.build ->
	
	@addToStack new md.Caption
		text: 'TextField'
	
	@addToStack new md.TextField
	
	@addToStack new md.TextField
		labelText: 'Placeholder Text'
	
	@addToStack new md.TextField
		labelText: 'Placeholder Text'
		helperText: 'Helper Text'

page.addToStack(textFieldsCard)

# Text Areas

textAreasCard = new md.Card
	width: Screen.width - 32

textAreasCard.build ->
	
	@addToStack new md.Caption
		text: 'TextArea'
	
	@addToStack new md.TextArea
	
	@addToStack new md.TextArea
		labelText: 'Placeholder Text'

page.addToStack(textAreasCard)

# Patterns

patternCard = new md.Card
	width: Screen.width - 32

patternCard.build ->
	
	@addToStack new md.Caption
		text: 'Patterns'
		
	@addToStack sonlyfield = new md.TextField
		helperText: "Must start with the letter 's'"
		pattern: (value) -> value[0] is 's' or value[0] is 'S'
	
	sonlyfield.on "change:value", (value, matches, layer) ->
		if matches or value is ''
			@inputLine.backgroundColor = md.Theme.primary
			@helperTextColor = 'rgba(0, 0, 0, .54)'
			@helperText = "Please enter your favorite 's' word."
		else
			@inputLine.backgroundColor = '#FE2929'
			@helperTextColor = '#FE2929'
			@helperText = "Your entry must begin with the letter 's'."

page.addToStack(patternCard)

# Selection 

selectionCard = new md.Card
	width: Screen.width - 32

selectionCard.build ->
	
	@addToStack new md.Caption
		text: 'Selection'
		
	@addToStack textfield = new md.TextField
		labelText: 'Placeholder Text'

	@addToStack selectionResult = new md.Regular	
		text: 'Selected: {checked}'
	
	selectionResult.template = 'none'
	
	textfield.onTouchEnd ->
		selectionResult.template = @getSelection() ? 'none'

page.addToStack(selectionCard)

# Select 

page.addToStack new md.Divider
	width: Screen.width - 32
	text: 'Dropdown Select'
	backgroundColor: Screen.backgroundColor
	
	
page.addToStack new md.Select
	labelText: 'Select Direction'
	width: Screen.width - 32
	options: [
		'up',
		'down',
		'left',
		'right'
		]
			
page.addToStack new md.Select
	width: Screen.width - 32
	labelText: 'Select Color'
	options: [
		'blue',
		'green'
		'yellow',
		'orange',
		'red',
		'purple',
		'black',
		'grey',
		'white'
	]

# actionButton = new Select

# ####################################
# Dialogs

page.addToStack(new md.Divider
	width: Screen.width - 32
	text: 'Dialogs'
	backgroundColor: Screen.backgroundColor
	)

# Dialog Buttons
dialogButtonsCard = new md.Card
	width: Screen.width - 32
	
dialogButtonsCard.addToStack new md.Button
	text: 'Show First Dialog'
	raised: true
	action: -> new md.Dialog
		title: 'Dialog Options'
		body: 'Body can be short or long. The dialog modal adjusts it size as needed.'
		acceptText: 'accept'
	
dialogButtonsCard.addToStack new md.Button
	text: 'Second Second Dialog'
	raised: true
	action: -> new md.Dialog
		title: 'Accept Options'
		body: 'All buttons close the dialog, but you can set custom actions that will also run.'
		acceptText: 'accept'
		acceptAction: -> dialogResult.template = 'Dialog 2 accepted'

dialogButtonsCard.addToStack new md.Button
	text: 'Show Third Dialog'
	raised: true
	action: -> new md.Dialog
		title: 'Cancel Options'
		body: 'Dialogs can have reject buttons and actions too.'
		acceptText: 'accept'
		acceptAction: -> dialogResult.template = 'Dialog 3 accepted'
		declineText: 'reject'
		declineAction: -> dialogResult.template = 'Dialog 3 rejected'

dialogButtonsCard.addToStack( dialogResult = new md.Regular	
	text: 'Result: {checked}'
	)

dialogResult.template = 'none'

page.addToStack(dialogButtonsCard)



# ####################################
# Notifications

notifications = []

notificationButtonsCard = new md.Card
	width: Screen.width - 32

notificationButtonsCard.build ->
	
	@addToStack new md.Button
		text: 'Show First Notification'
		raised: true
		action: -> new md.Notification
			title: 'This is a notification'
			body: 'Like dialogs, it takes a title and body. You can swipe notifications away or they will fade after a timeout.'
			group: notifications
	
	@addToStack new md.Button
		text: 'Show Second Notification'
		raised: true
		action: -> new md.Notification
			title: 'Notifications Stack'
			body: 'When given a group, notifications will stack and adjust. They can also have icons and custom icon / background colors.'
			group: notifications
			iconColor: '#FFFB00'
			iconBackgroundColor: '#B68CEA'
			icon: 'settings'
	
	@addToStack new md.Button
		text: 'Show Third Notification'
		raised: true
		action: -> new md.Notification
			title: 'Actions'
			body: 'Notifications can have actions, just like dialogs. Actions can have icons too.'
			group: notifications
			icon: 'message'
			actions: [
				{
					icon: 'close', 
					title: 'Reject', 
					action: -> notificationResult.template = 'Notification 3 was rejected.'
				},
				{
					icon: 'check', 
					title: 'accept', 
					action: -> notificationResult.template = 'Notification 3 was accepted.'
				}
			]
			
	@addToStack( notificationResult = new md.Regular	
		text: 'Result: {checked}'
	)
		
	notificationResult.template = 'none'

page.addToStack(notificationButtonsCard)


# ####################################
# Snackbars

page.addToStack(new md.Divider
	width: Screen.width - 32
	text: 'Snackbar'
	backgroundColor: Screen.backgroundColor
	)

snackbarsCard = new md.Card
	width: Screen.width - 32

snackbarsCard.build ->
	
	snackbarsCard.addToStack new md.Button
		text: 'Show Snackbar'
		raised: true
		action: -> 
			new md.Snackbar
				y: Screen.height
	
	snackbarsCard.addToStack new md.Button
		text: 'Show Snackbar with Action'
		raised: true
		action: -> 
			new md.Snackbar
				y: Screen.height
				text: 'Button Tapped'
				action: {title: 'Dismiss', action: -> @close}
	
page.addToStack(snackbarsCard)


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
# Tables

page.addToStack(new md.Divider
	width: Screen.width - 32
	text: 'Tables'
	backgroundColor: Screen.backgroundColor
	)

# formats

ratingToStars = ( rating ) ->
	stars = ''
	for star in _.range( Math.floor( rating / 2 ) )
		stars += '★'
	if ( rating / 2 ) % 1 >= .5 then stars += '½'
	return stars

# flags

ratingOverSix = 
	condition: (item) -> item.rating >= 7
	color: 'rgba(3, 79, 88, 1.000)'
	backgroundColor: 'rgba(218, 235, 237, 1.000)'

ratingOverSeven = 
	condition: (item) -> item.rating >= 7.4
	color: 'rgba(151, 81, 39, 1.000)'
	backgroundColor: 'rgba(241, 227, 155, 1.000)'

# Filters




# Card

tableCard = new md.Card
	width: Screen.width - 32
	padding: {top: 0, right: 0, bottom: 0, left: 0}

tableCard.build -> 
	
	@addToStack heading = new Layer
		name: 'Table Heading'
		height: 64, width: @width
		backgroundColor: '#FFF'
				
	new md.Headline
		parent: heading
		x: 16, y: Align.center
		text: 'Hal Hartley Films'
	
	@addToStack table = new md.Table
		sortable: true
		multiselect: true
		striped: 'rgba(250, 250, 250, 1.000)'
	# 	rowsPerPage: 10
		scrollable: true
		showNames: false
		width: @width
		
		headers: [
			{ title: 'Film', key: 'name' },
			{ title: 'Rating', key: 'rating', format: ratingToStars }
			]
				
		flags: [ratingOverSix, ratingOverSeven]
				
		items: [
			{ name: 'The Unbelievable Truth', year: '1989', rating: 7.5 },
			{ name: 'Ned Rifle', year: '2014', rating: 6.3 },
			{ name: 'Surviving Desire', year: '1992', rating: 7.5 },
			{ name: 'La Commedia', year: '2014', rating: 6.8 },
			{ name: 'Henry Fool', year: '1997', rating: 7.3 },
			{ name: 'Meanwhile', year: '2014', rating: 6.4 },
			{ name: 'Simple Men', year: '1992', rating: 7.2 },
			{ name: 'Fay Grim', year: '2006', rating: 6.3 },
			{ name: 'The Girl From Monday', year: '2005', rating: 5.3 },
			{ name: 'My America', year: '2014', rating: 5.4 },
			{ name: 'The Book of Life', year: '1998', rating: 6.7 },
			{ name: 'Flirt', year: '1995', rating: 6.3 },
			{ name: 'Trust', year: '1990', rating: 7.5 },
			{ name: 'Amateur', year: '1994', rating: 7.0 },
			{ name: 'No Such Thing', year: '2001', rating: 6.2 },
		]
		
	@addToStack filters = new Layer
		height: 48, width: @width
		backgroundColor: "#FFF"
		
	new md.Button
		parent: filters
		x: 16, y: Align.center
		text: '6+ Stars'
		action: -> table.filter = (item) -> item.rating >= 6
	
	new md.Button
		parent: filters
		x: Align.center, y: Align.center
		text: '7+ Stars'
		action: -> table.filter = (item) -> item.rating >= 7
		
	new md.Button
		parent: filters
		x: Align.right(-16), y: Align.center
		text: 'clear'
		action: -> table.filter = null

page.addToStack(tableCard)


# ####################################
# Menu Overlay

# actionButton = new MenuButton
# actionButton = new MenuOverlay


# ####################################
# Whole app related

# actionButton = new StatusBar
# actionButton = new Theme
# actionButton = new View
# actionButton = new Page
