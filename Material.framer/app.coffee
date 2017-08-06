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

TODO:

lots

###

md = require "md"
Framer.Extras.Hints.disable()
color_pallete.destroy()


# APP
view = new md.View


# MENU OVERLAY

menuOverlay = new md.MenuOverlay
	title: 'MenuDemo@gmail.com'
	links: [
		{title: 'Home', icon: 'home', action: -> view.linkTo(home)},
		{title: 'Profile', icon: 'person', action: -> view.linkTo(profile)}
		]


# PAGE (home)

home = view.newPage
	header:
		title: "Home"
		iconAction: -> menuOverlay.show()

resultText = new md.Regular
	name: '.', parent: home
	x: Align.center, y: 150
	width: Screen.width
	textAlign: 'center'
	text: 'Results: {results}'

resultText.template =
	results: 'Nothing yet.'

link = new md.Button 
	parent: home
	x: Align.center, y: 200
	text: 'link'
	action: -> 
		view.showNext(profile)

dialog = new md.Button 
	parent: home
	raised: true
	x: Align.center, y: 250
	text: 'Dialog'
	color: md.theme.tint
	action: ->	
		new md.Dialog
			title: 'Dialog example'
			body: 'Here is where the body text goes.'
			acceptText: 'confirm'
			acceptAction: -> 
				resultText.template = 'Dialog confirmed.'
			declineText: 'decline'
			declineAction: -> 
				resultText.template = 'Dialog declined.'

fab = new md.Fab
	icon: 'add'
	action: -> resultText.template = 'Fab tapped.'


# PAGE (profile)

profile = view.newPage
	header:
		title: "Profile"
		icon: 'arrow-back'
		iconAction: -> 
			view.showPrevious()


# show home screen
view.showNext(home)