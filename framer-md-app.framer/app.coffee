### Notes / Todo

REFERENCE:
https://material.io/guidelines/
https://materialdesignicons.com/

###

md = require "md"
flow = new md.Flow
	name: 'Framer Introduction'

# Create App

# app = new md.App
# 
# 	# bottomnav links for each view are created automatically
# 	# if a project has more than one view, it has a bottomnav by default
# 	# (bottomnav option should be boolean to enable / disable this)
# 
# 	bottomNav:
# 		links: [
# 			{
# 				title: 'Home', 
# 				icon: 'home', 
# 				view: 'home'
# 			}, { 
# 				title: 'Favorites', 
# 				icon: 'star',
# 				view: 'favorites' 
# 			}, { 
# 				title: 'Profile', 
# 				icon: 'face',
# 				view: 'profile'
# 			}
# 		]
# 	
# 	# menu overlay should be header, then links (a stackview of MenuButtons or MenuLinks(?))
# 	# links for each view are added automatically
# 	# other links can be added manually (menuOverlay.links.addToStack?)
# 	
# 	menuOverlay:
# 		title: 'MenuDemo@gmail.com'
# 		links: [
# 			{
# 				title: 'Home', 
# 				icon: 'home', 
# 				view: 'home'
# 			}, { 
# 				title: 'Favorites', 
# 				icon: 'star',
# 				view: 'favorites' 
# 			}, { 
# 				title: 'Profile', 
# 				icon: 'face',
# 				view: 'profile'
# 			}
# 		]
# 	
# 	# views need to be rewritten; they should extend stackview and add header integration
# 	# possibly a more complex header property as used in TheCops
# 	
# 	views: [
# 		favorites = new md.View
# 			title: "Favorites"
# 			iconAction: -> app.showMenu(),
# 		profile = new md.View
# 			title: "Profile"
# 			iconAction: -> app.showMenu()
# 		]


# ###################################
# Pages

# Home

home = new md.View
	title: 'Hello World'
	iconAction: -> flow.showMenu()


welcome = new md.Card

welcome.build ->
	@addToStack new md.Headline
		text: 'Welcome to Framer-Md'
	
	@addToStack new md.Subhead
		text: 'A Material Design Kit for Framer'
		
	@addToStack new md.Regular
		width: @width - 32
		text: 'This project is still in development, but feel free to have a look around, play with the components, modify things for your own needs, and report any bugs you find.'
			
	@addToStack new md.Regular
		width: @width - 32
		text: 'Contributions are very welcome!'
		
	@addToStack new md.Body1
		width: @width - 32
		text: '@steveruizok'
		
home.build ->
	@addToStack welcome
	
	@addToStack new md.Button
		text: 'Next Page'
		action: -> flow.showNext(components)
		x: Align.right


# Components

components = new md.View
	title: 'Components'
	iconAction: -> flow.showMenu()
		
introduction = new md.Card

introduction.build ->
	@addToStack new md.Headline
		text: 'Components'
		
	@addToStack new md.Regular
		width: @width - 32
		text: 'Framer-md is made up of many components. A few of them are independant, loosely coupled, and may be dropped in anywhere. Some, especially those involving the app structure (like pages, the header, and its menu overlay) are more dependant on one another.'
	

components.build ->
	@addToStack introduction

	@addToStack new md.Button
		text: 'Next Page'
		action: -> flow.showNext(buttons)
		x: Align.right





buttons = new md.Page
	title: 'Components'
	iconAction: -> flow.showMenu()
		
button = new md.Card

button.build ->
	@addToStack new md.Subhead
		text: 'Button'
		
	@addToStack new md.Body1
		width: @width - 32
		text: 'An example of a "loosely coupled" component is Button. It takes several properties, such as  "text" and "raised". Like many components, it can be given a callback through its "action" property.'

	@addToStack new md.Button
	
	@addToStack new md.Button
		type: 'raised'
	
	@addToStack new md.Button
		disabled: true
		
	@addToStack new md.Button
		text: 'Click Here!'
		action: -> @text = 'Clicked!'
		
buttons.build -> 
	@addToStack button
	
	@addToStack new md.Button
		text: 'Next Page'
		action: -> flow.showNext(textfields1)
		x: Align.right




textfields1 = new md.Page
	title: 'Components'
	iconAction: -> flow.showMenu()

textfield1 = new md.Card

textfield1.build ->
	@addToStack new md.Subhead
		text: 'Text Field'
		
	@addToStack new md.Body1
		width: @width - 32
		text: 'A more complex component is TextField.'

	@addToStack new md.TextField
	
	@addToStack new md.TextField
		labelText: 'Enter your message.'
	
	@addToStack new md.TextField
		labelText: 'Enter your message.'
		helperText: 'Messages will be remembered.'
		
textfields1.build ->
	@addToStack textfield1
	
	@addToStack new md.Button
		text: 'Next Page'
		action: -> flow.showNext(textfields2)
		x: Align.right




textfields2 = new md.Page
	title: 'Components'
	iconAction: -> flow.showMenu()

textfield2 = new md.Card

textfield2.build ->
	@addToStack new md.Subhead
		text: 'Text Field'
		
	@addToStack new md.Body1
		width: @width - 32
		text: 'TextFields can also do some other cool tricks.'
	
	@addToStack sWordsOnly = new md.TextField
		labelText: 'Enter your favorite S word.'
		helperText: 'Your message must start with the letter S'
		pattern: (value) -> value[0] is 's' or value[0] is 'S'
	
	sWordsOnly.on "change:value", (value, matches) ->
		if matches or value is ''
			@helperTextColor = 'rgba(0, 0, 0, .54)'
		else
			@helperTextColor = 'red'

	
textfields2.build ->
	@addToStack textfield2


# Profile

profile = new md.View
	title: 'Components'
	iconAction: -> flow.showMenu()
		
profile.build ->
	@addToStack new md.Headline
		text: 'User Profile'
	@addToStack new md.Subhead
		text: 'Second Page'
	@addToStack new md.Regular

# Views have Pages. Views get links in the menuOverlay and 
# in the bottom nav bar, if enabled

# View
# - Page
# - Page

flow.addView
	name: 'Home'
	icon: 'home'
	view: home

flow.addView
	name: 'Components'
	icon: 'puzzle'
	view: components


flow.showNext(home)
