### Notes / Todo

REFERENCE:
https://material.io/guidelines/
https://materialdesignicons.com/

IN PROJECT:

Fonts: 
TextLayer classes set to Material's default fonts

App:
A wrapper that includes the header, footer, nav, and menu overlay.

View: 
A modified FlowComponent that uses themes and has a "smart" header.

Menu Overlay:
A modal layer for the material side menu.

Page: 
A modified ScrollComponent that works with App and App's header. Fixed content can be set with the page as parent, or to page.content for scrolling content. When App changes pages, it updates its header using the header properties of that page. These are the header's text, the header's icon, and the action taken when tapping the icon.

IMPLEMENTED:

Button (flat, raised, fab)
Icon support (using SVGs)
Header
Footer
MenuOverlay
BottomNav
Dialogs
Keyboard
Ripple effects
Grid Lists / Tiles

TODO

Forms / Controls:
	Dropdown selections
	Time Picker
	Date Picker
	Input fields
	Switches
	Dividers
	Steppers
	Sliders
	Checkboxes
	Radio Buttons

Header:
	Tabs

MenuOverlay:
	Dividers
	Subheaders
	ScrollBar
	
Dialogs:
	Scrollable content
	Custom content dialogs
	Full Screen dialogs

Lists:
	Row items (one line, two line, etc)
	Toggles

General:
	Cards
	Chips
	Grids
	Menus
	Progress Bars

###

md = require "md"

# Create App

app = new md.App
	bottomNav:
		links: [
			{
				title: 'Buttons', 
				icon: 'home', 
				action: -> app.changeView(buttons)
				}, 
			{ 
				title: 'Form', 
				icon: 'pencil',
				action: -> app.changeView(form)
				}
			{ 
				title: 'Gallery', 
				icon: 'image',
				action: -> app.changeView(gallery)
				},
			]
	menuOverlay:
		title: 'MenuDemo@gmail.com'
		links: [
			{
				title: 'Buttons', 
				icon: 'home', 
				action: -> app.changeView(buttons)
				},
			{
				title: 'Form', 
				icon: 'pencil', 
				action: -> app.changeView(form)
				},
			{
				title: 'Gallery', 
				icon: 'image', 
				action: -> app.changeView(gallery)
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

# --- buttons (view)

# Text layer to register our actions.
welcome = new md.Regular
	name: 'welcome', parent: buttons.home
	x: Align.center, y: 32
	width: Screen.width - 64
	textAlign: 'center'
	text: 'Welcome to the Material Kit demo. This is the Buttons view. There are two other views: Form and Gallery.'

# button to go to the second page
toSecondPage = new md.Button 
	name: 'to second page'
	parent: buttons.home
	x: Align.center, y: 130
	text: 'go to second page'
	raised: true
	action: -> buttons.showNext(secondPage)

# Text layer to register our actions.
resultText = new md.Regular
	name: 'results', parent: buttons.home
	x: Align.center, y: toSecondPage.maxY + 32
	width: Screen.width
	textAlign: 'center'
	text: 'Results: {results}'

resultText.template =
	results: 'Nothing yet.'

# button to create a dialog
dialog = new md.Button 
	name: 'dialog button'
	parent: buttons.home
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
	parent: buttons.home
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

# button to open the keyboard
showKeyboard = new md.Button 
	name: 'keyboard button'
	parent: buttons.home
	x: Align.center, y: showKeyboard.maxY + 16
	text: 'show snackbar'
	action: -> 
		new md.Snackbar
			parent: buttons.home
			app: app
			name: 'snackbar'
			title: 'This is a snackbar. It has a timeout and one action.'
			action:
				title: 'undo'
				action: -> null

# --- secondPage (page of buttons view)

secondPage = buttons.newPage
	name: 'second page'
	header:
		title: "Second Page"
		icon: 'arrow-left'
		iconAction: -> 
			buttons.showPrevious()
			
# Text layer to register our actions.
tip = new md.Regular
	name: 'second page tip', parent: secondPage
	x: Align.center, y: 32
	width: Screen.width - 32
	textAlign: 'center'
	text: "This is another page of the Buttons view. Views are modified flow components. When a new page is loaded, the app's header changes to show its title. You can also set the header's button icon and action."
	
# button to go to the third page
toThirdPage = new md.Button 
	name: 'button to third page'
	parent: secondPage
	x: Align.center, y: 168
	text: 'go to third page'
	raised: true
	action: -> buttons.showNext(thirdPage)
	
# --- thirdPage (page of buttons view)

thirdPage = buttons.newPage
	name: 'third page'
	header:
		title: "Third Page"
		icon: 'arrow-left'
		iconAction: -> 
			buttons.showPrevious()
			
# Text layer to register our actions.
tip = new md.Regular
	name: 'third page tip', parent: thirdPage.content
	x: Align.center, y: 32
	width: Screen.width - 32
	textAlign: 'center'
	text: "Pages are modified scroll components. Fixed content can be added to the page, and scrolling content (like this) to the page.content."



# --- form (view)

# Text layer to register our actions.
formResults = new md.Regular
	name: '.', parent: form.home
	x: Align.center, y: 32
	width: Screen.width
	textAlign: 'center'
	text: 'Results: {results}'
	
formResults.template =
	results: 'None yet.'
	
uiswitch = new md.Switch
	parent: form.home
	x: Align.center, y: formResults.maxY + 32

uiswitch.on "change:isOn", (isOn) -> formResults.template = "Switch's isOn property is #{isOn}."

for i in [0..3]
	checkbox = new md.Checkbox
		parent: form.home
		x: Align.center(-64), y: 120 + (i * 32)
	
	checkbox.on "change:isOn", (isOn) -> formResults.template = "Checkbox's isOn property is #{isOn}."

radioboxGroup = []

for i in [0..3]
	radiobox = new md.Radiobox
		parent: form.home
		x: Align.center(64), y: 120 + (i * 32)
		group: radioboxGroup
		
	radiobox.i = i
	
	radiobox.on "change:isOn", (isOn) -> if isOn then formResults.template = "Radiobox number #{@i} is active."

slider = new md.Slider
	parent: form.home
	x: Align.center, y: 280
	
slider.onValueChange -> 
	formResults.template = "Slider's value is #{@value.toFixed(2)}"
	
notchSlider = new md.Slider
	parent: form.home
	x: Align.center, y: 332
	notched: true

notchSlider.onValueChange -> formResults.template = "Notched slider's value is #{Math.round(@value)}"

# --- gallery (view)

# grid list

gridList = new md.GridList
	name: 'Grid', parent: gallery.home.content
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


color_pallete.destroy()