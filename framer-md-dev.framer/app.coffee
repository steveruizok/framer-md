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

home.build ->
	@addToStack new md.Button

actionButton = new md.ActionButton

flow.showNext(home)
