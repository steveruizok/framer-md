### Notes / Todo

REFERENCE:
https://material.io/guidelines/
https://materialdesignicons.com/

###

md = require "md"

# Create App

app = new md.App
	bottomNav:
		links: [
			{
				title: 'Buttons', 
				icon: 'home', 
				view: 'buttons'
			}, { 
				title: 'Form', 
				icon: 'pencil',
				view: 'form' 
			}, { 
				title: 'Gallery', 
				icon: 'image',
				view: 'gallery'
			}
		]
			
	menuOverlay:
		title: 'MenuDemo@gmail.com'
		links: [
			{
				title: 'Buttons', 
				icon: 'home', 
				view: 'buttons'
			}, { 
				title: 'Form', 
				icon: 'pencil', 
				view: 'form'
			}, { 
				title: 'Gallery', 
				icon: 'image', 
				view: 'gallery'
			}
		]
			
	views: [
		buttons = new md.View
			title: "Buttons"
			iconAction: -> app.showMenu(),
		form = new md.View
			title: "Form"
			iconAction: -> app.showMenu(),
		gallery = new md.View
			title: "Gallery"
			iconAction: -> app.showMenu()
		]


# Views

# Buttons 

# welcome (buttons page 1)

buttons.build ->
		
	card = new md.Card
		name: 'Card'
		parent: @content
		height: 216
		expand: 220
		expanded: true
		actions: [
			{text: 'see more', action: -> card.expanded = true}
		]
	
	# Text layer to register our actions.	
	welcome = new md.Regular
		name: 'welcome', parent: card
		x: Align.center, y: 16
		width: Screen.width - 64
		textAlign: 'center'
		text: 'Welcome to the Material Kit demo. This is the Buttons view. There are two other views: Form and Gallery.'
	
	# button to go to the second page
	toSecondPage = new md.Button 
		name: 'to second page'
		parent: card
		x: Align.center, y: 100
		text: 'go to second page'
		raised: true
		action: -> buttons.showNext(secondPage)
	
	# Text layer to register our actions.
	resultText = new md.Regular
		name: 'results', parent: card
		x: Align.center, y: 216
		width: Screen.width
		textAlign: 'center'
		text: 'Results: {results}'
	
	resultText.template =
		results: 'Nothing yet.'
	
	# button to create a dialog
	dialog = new md.Button 
		name: 'dialog button'
		parent: card
		raised: true
		x: Align.center, y: resultText.maxY + 32
		text: 'Dialog'
		color: md.Theme.tint
		action: ->	
			resultText.template = 'Dialog opened.'
			new md.Dialog
				title: 'Dialog'
				body: 'Here is where the body would go.'
				acceptText: 'confirm'
				acceptAction: -> 
					resultText.template = 'Dialog confirmed.'
				declineText: 'decline'
				declineAction: -> 
					resultText.template = 'Dialog declined.'
	
	
	
	# button to open the keyboard
	showKeyboard = new md.Button 
		name: 'keyboard button'
		parent: card
		x: Align.center, y: dialog.maxY + 16
		text: 'show keyboard'
		action: -> 
			app.showKeyboard()
			resultText.template = 'Keyboard opened.'
	
	# fab to... do nothing yet
	actionButton = new md.ActionButton
		name: 'Action Button'
		app: app
		parent: buttons.home
		icon: 'plus'
		action: -> 
			resultText.template = 'Action button tapped.'
			showFirstNotification()
	
	showFirstNotification = ->
		new md.Notification
			app: app
			title: 'New Notification'
			body: 'Notfiications can be swiped away or set with a timeout. The buttons below are optional. Tap Next to proceed.'
			icon: 'email'
			timeout: 5
			action1:
				icon: 'archive'
				title: 'Archive'
				action: -> resultText.template = 'Notification Archived.'
			action2:
				icon: 'alert-circle'
				title: 'Next'
				action: -> 
					resultText.template = 'More notifications shown.'
					showNextNotifications()
	
	showNextNotifications = ->
		first = new md.Notification
			app: app
			title: 'Another Notification'
			body: 'Notifications stack like this and position automatically.'
			icon: 'emoticon-happy'
			iconBackgroundColor: 'rgba(0, 152, 168, 1)'
			timeout: 5
		Utils.delay 1, ->
			second = new md.Notification
				app: app
				title: 'A third notification.'
				body: 'They reposition automatically, too.'
				icon: 'emoticon-cool'
				iconBackgroundColor: 'rgba(255, 233, 149, 1)'
				iconColor: '#000'
				timeout: 5

# --- secondPage (buttons page 2)

secondPage = buttons.newPage
	name: 'second page'
	header:
		title: "Second Page"
		icon: 'arrow-left'
		iconAction: -> 
			buttons.showPrevious()

secondPage.build ->
	
	# Text layer to register our actions.
	tip = new md.Regular
		name: 'second page tip', parent: @
		x: Align.center, y: 32
		width: Screen.width - 32
		textAlign: 'center'
		text: "This is another page of the Buttons view. Views are modified flow components. When a new page is loaded, the app's header changes to show its title. You can also set the header's button icon and action."
		
	# button to go to the third page
	toThirdPage = new md.Button 
		name: 'button to third page'
		parent: @
		x: Align.center, y: 168
		text: 'go to third page'
		raised: true
		action: -> buttons.showNext(thirdPage)
	
# --- thirdPage (buttons page 3)

thirdPage = buttons.newPage
	name: 'third page'
	header:
		title: "Third Page"
		icon: 'arrow-left'
		iconAction: -> 
			buttons.showPrevious()

thirdPage.build ->

	# Text layer to register our actions.
	tip = new md.Regular
		name: 'third page tip', parent: @content
		x: Align.center, y: 32
		width: Screen.width - 32
		textAlign: 'center'
		text: "Pages are modified scroll components. Fixed content can be added to the page, and scrolling content (like this) to the page.content."

# Form

# Selectors (form page 1)

form.build ->
	
	# Text layer to register our actions.
	formResults = new md.Regular
		name: '.', parent: @
		x: Align.center, y: 32
		width: Screen.width
		textAlign: 'center'
		text: 'Results: {results}'
		
	formResults.template =
		results: 'None yet.'
		
	uiswitch = new md.Switch
		parent: @
		x: Align.center, y: formResults.maxY + 32
	
	uiswitch.on "change:isOn", (isOn) -> formResults.template = "Switch's isOn property is #{isOn}."
	
	for i in [0..3]
		checkbox = new md.Checkbox
			parent: @
			x: Align.center(-64), y: 120 + (i * 48)
		
		checkbox.on "change:isOn", (isOn) -> formResults.template = "Checkbox's isOn property is #{isOn}."
	
	radioboxGroup = []
	
	for i in [0..3]
		radiobox = new md.Radiobox
			parent: @
			x: Align.center(64), y: 120 + (i * 48)
			group: radioboxGroup
			
		radiobox.i = i
		
		radiobox.on "change:isOn", (isOn) -> if isOn then formResults.template = "Radiobox number #{@i} is active."
	
	slider = new md.Slider
		parent: @
		x: Align.center, y: 320
		min: 0, max: 100
	
	slider.onValueChange -> 
		formResults.template = "Slider's value is #{@value.toFixed(2)}"
		
	notchSlider = new md.Slider
		parent: @
		x: Align.center, y: 380
		notched: true
		min: 0, max: 100
	
	notchSlider.onValueChange -> formResults.template = "Notched slider's value is #{Math.round(@value)}"
	
	nextPage = new md.Button
		parent: @
		x: Align.right(-8), y: Align.bottom(-72)
		text: 'Next Page'
		action: -> form.showNext(inputs)
	#


# Inputs (form page 2)

inputs = form.newPage
	name: 'inputs'
	header:
		title: "Inputs"
		icon: 'arrow-left'
		iconAction: -> form.showPrevious()

inputs.build ->
	
	selectionCaption = new md.Caption
		parent: @content
		x: 16, y: 16
		text: 'Selected Text:'
	
	selectionLayer = new md.Regular
		parent: @content
		x: 16, y: selectionCaption.maxY
		text: '{selection}'
	
	selectionLayer.template = "none"
		
	Utils.interval .15, ->
		selectionLayer.template = "none"
		focused = app.focused
		if focused?
			selection = focused.getSelection()
			selectionLayer.template = selection ? 'none'	
	
	select = new md.Select 
		parent: @content,
		x: Align.center, y: selectionLayer.maxY + 32
		options: ['Red', 'Yellow', 'Blue', 'Green', 'Orange', 'Purple', 'Black', 'White']
		rows: 6
		labelText: 'Dropdown Select'
	
	textfield = new md.TextField
		parent: @content
		x: 16, y: select.maxY + 32
		width: @width - 32
		point: Align.center
		labelText: 'Text Field'
		helperText: 'Helper text'
		placeholder: 'Test placeholder'
# 	
# 	select = new md.Select
# 		parent: @content
# 		x: 16, y:  textfield.maxY + 32
# 		options: ['Baseball', 'Football', 'Boxing', 'Tennis']
# 		labelText: 'Favorite Sport'
	
	startsWithS = new md.TextField
		parent: @content
		x: 16, y: textfield.maxY + 32
		width: @width - 32
		point: Align.center
		labelText: 'Favorite S Word'
		helperText: "Your answer must start with the letter S."
		helperTextColor: null
		placeholder: 'Test placeholder'
		pattern: (value) -> _.startsWith(value, 's') or _.startsWith(value, 'S')
	
	startsWithS.on "change:value", (value, matches, input) ->
		if matches or input.hasTextContent() is false 
			input.helperTextColor = 'rgba(0,0,0,.42)'
		else
			input.helperTextColor = 'red'
	
	textarea = new md.TextArea
		parent: @content
		labelText: 'Text Area'
		x: 16, y: startsWithS.maxY + 40
		width: @width - 32
		rows: 3
		placeholder: 'Overflow filter coming soon!'
		
	
	
	

# Gallery

# Grid List (gallery page 1)

# grid list

gallery.build ->
	
	gridList = new md.GridList
		name: 'Grid', parent: @content
		columns: 2
	
	for i in _.range(20)
		tile = new md.Tile
			gridList: gridList
			image: Utils.randomImage()
			tileHeight: 150
			footer: true
			title: 'Tile ' + i
			support: 'A nice image!'
			icon: Utils.randomChoice(['coffee', 'emoticon', 'cup', 'flask'])
			rippleColor: new Color(app.Theme.primary).alpha(.3)
			action: ->
				@animate {rotation: 360}
			footerAction: ->
				@animate {rotation: 360}
				
		tile.onLongPress ->
			gridList.removeTile(@)

