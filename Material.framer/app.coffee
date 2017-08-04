### 

IN PROJECT:

Fonts: 
TextLayer classes set to Material's default fonts

App: 
A modified FlowComponent that uses themes and has a "smart" header.

MenuOverlay:
A modal layer for the material side menu.

Page: 
A modified ScrollComponent that works with App and App's header. Fixed content can be set with the page as parent, or to page.content for scrolling content. When App changes pages, it updates its header using the header properties of that page. These are the header's text, the header's icon, and the action taken when tapping the icon.


Dialog

IN PROGRESS (ie client-specific stuff I've written that needs to be cleaned up for general use)

Dialogs/Modals
Buttons
Dropdown selections
Menu Buttons
Time Picker
Date Picker
Input fields
Header tabs
Footer tabs
Row items (one line, two line, etc)
Ripple effects

TODO:

lots

###

md = require "md"

# THEMES

customTheme =
	name: 'customTheme'
	tint: '#FF5A00'
	header: 
		backgroundColor: '#2665FF'
		title: '#FFFFFF'
		invertIcon: true
	statusBar: 
		image: 'images/status_bar_dim.png'
		invert: false
	page:
		backgroundColor: '#efefef'
	dialog: 
		backgroundColor: '#424242'
	text:
		title: 'rgba(0,0,0,1)'
		text: 'rgba(0,0,0,.9)'
	navBar:
		backgroundColor: '#303030'

# APP

app = new md.App
	theme: customTheme


# MENU OVERLAY

menuOverlay = new md.MenuOverlay
	title: 'MenuDemo@gmail.com'
	links: [
		{title: 'Home', icon: 'home', action: -> app.linkTo(home)},
		{title: 'Profile', icon: 'person', action: -> app.linkTo(profile)}
		]



# PAGE (home)

home = app.newPage
	header:
		title: "Home"
		iconAction: -> menuOverlay.show()

link = new md.Title 
	parent: home
	x: Align.center, y: Align.center
	text: 'link'
	color: app.theme.tint

link.onTap -> app.showNext(profile)

dialog = new md.Title 
	parent: home
	x: Align.center, y: Align.center(64)
	text: 'Dialog'
	color: app.theme.tint

dialog.onTap -> 
	new md.Dialog
		theme: app.theme
		title: 'Dialog example'
		body: 'Here is where the body text goes.'
		acceptText: 'confirm'
		acceptAction: -> print 'confirmed'
		declineText: 'reject'
		declineAction: -> print 'declined'



# PAGE (profile)

profile = app.newPage
	header:
		title: "Profile"
		icon: 'arrow-back'
		iconAction: -> app.showPrevious()



# show home screen
app.showNext(home)