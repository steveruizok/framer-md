### Notes / Todo

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

# ------------
# Create Views
view = new md.View

# ------------
# App Settings

md.App.setup
	bottomNav:
		links: [
			{
				title: 'Home', 
				icon: 'home', 
				action: -> view.linkTo(home)
				}, 
			{
				title: 'Profile', 
				icon: 'account', 
				action: -> view.linkTo(profile)
				},
			{
				title: 'Settings', 
				icon: 'settings', 
				action: -> view.linkTo(settings)
				}
			]
	menuOverlay:
		title: 'MenuDemo@gmail.com'
		links: [
			{
				title: 'Home', 
				icon: 'home', 
				action: -> view.linkTo(home)
				},
			{
				title: 'Profile', 
				icon: 'account', 
				action: -> view.linkTo(profile)
				},
			{
				title: 'Settings', 
				icon: 'settings', 
				action: -> view.linkTo(settings)
				}
			]

# ------------
# Create Pages



# --- PAGE (home)

home = view.newPage
	header:
		title: "Home"
		iconAction: -> md.App.menuOverlay.show()

# Text layer to register our actions.
resultText = new md.Regular
	name: '.', parent: home
	x: Align.center, y: 150
	width: Screen.width
	textAlign: 'center'
	text: 'Results: {results}'

resultText.template =
	results: 'Nothing yet.'

# button to create a dialog
dialog = new md.Button 
	parent: home
	raised: true
	x: Align.center, y: 200
	text: 'Dialog'
	color: md.theme.tint
	action: ->	
		resultText.template = 'Dialog opened.'
		new md.Dialog
			title: 'Dialog example'
			body: 'Here is where the body text goes.'
			acceptText: 'confirm'
			acceptAction: -> 
				resultText.template = 'Dialog confirmed.'
			declineText: 'decline'
			declineAction: -> 
				resultText.template = 'Dialog declined.'

# button to open the keyboard
showKeyboard = new md.Button 
	parent: home
	x: Align.center, y: 260
	text: 'show keyboard'
	action: -> 
		md.App.showKeyboard()
		resultText.template = 'Keyboard opened.'

# fab to... do nothing yet
fab = new md.Fab
	parent: home
	icon: 'plus'
	action: -> resultText.template = 'Fab tapped.'



# --- PAGE (profile)

profile = view.newPage
	header:
		title: "Profile"
		icon: 'arrow-left'
		iconAction: -> 
			view.showPrevious()

# Text layer to register our actions.
welcomeProfile = new md.Regular
	name: '.', parent: profile
	x: Align.center, y: 150
	width: Screen.width
	textAlign: 'center'
	text: 'Welcome to the Profile Page!'



# --- PAGE (settings)

settings = view.newPage
	header:
		title: "Settings"
		icon: 'arrow-left'
		iconAction: -> 
			view.showPrevious()

welcomeSettings = new md.Regular
	name: '.', parent: settings
	x: Align.center, y: 150
	width: Screen.width
	textAlign: 'center'
	text: 'Welcome to the Settings Page!'

# show home screen
view.showNext(home)



color_pallete.destroy()