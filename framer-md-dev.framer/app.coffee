### Notes / Todo

REFERENCE:
https://material.io/guidelines/
https://materialdesignicons.com/

###

md = require "md"
Screen.backgroundColor = '#FFF'

header = new md.Header
	icon: 'menu'
	title: 'Hello World!'
	action: -> print 'hello'

header.icon = 'star'

Utils.delay 3, =>
	header.setHeader
		title: 'whaddup world'
		action: -> print 'whaddup'
		backgroundColor: 'FF0077'

# app = new md.App
# 	name: 'Framer Introduction'

# ###################################
# Pages

# refactored:

# Button
# Notification
# StackView
# Card
# View
# Snackbar
# Toast


# to do:

# Text Inputs
# combine into a single class - wrap everything in a container layer, so that I can adjus height depending on whether label or helpertext exists.


# Home

# home = new md.View
# 	title: 'Refactoring!'
# 	icon: 'home'
# 	showLayers: true
# 
# home.build ->
# 	@addToStack new md.Button
# 		action: -> new md.Toast
# 	
# app.showNext(home)

# myView = new md.View
# 
# app.showNext(myView)
