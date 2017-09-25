### Notes / Todo

REFERENCE:
https://material.io/guidelines/
https://materialdesignicons.com/

###

md = require "md"

# Create App

app = new md.App

	# bottomnav links for each view are created automatically
	# if a project has more than one view, it has a bottomnav by default
	# (bottomnav option should be boolean to enable / disable this)

	bottomNav:
		links: [
			{
				title: 'Home', 
				icon: 'home', 
				view: 'home'
			}, { 
				title: 'Favorites', 
				icon: 'star',
				view: 'favorites' 
			}, { 
				title: 'Profile', 
				icon: 'face',
				view: 'profile'
			}
		]
	
	# menu overlay should be header, then links (a stackview of MenuButtons or MenuLinks(?))
	# links for each view are added automatically
	# other links can be added manually (menuOverlay.links.addToStack?)
	
	menuOverlay:
		title: 'MenuDemo@gmail.com'
		links: [
			{
				title: 'Home', 
				icon: 'home', 
				view: 'home'
			}, { 
				title: 'Favorites', 
				icon: 'star',
				view: 'favorites' 
			}, { 
				title: 'Profile', 
				icon: 'face',
				view: 'profile'
			}
		]
	
	# views need to be rewritten; they should extend stackview and add header integration
	# possibly a more complex header property as used in TheCops
	
	views: [
		home = new md.View
			title: "Home"
			iconAction: -> app.showMenu(),
		favorites = new md.View
			title: "Favorites"
			iconAction: -> app.showMenu(),
		profile = new md.View
			title: "Profile"
			iconAction: -> app.showMenu()
		]

# ###################################
# Views

home.build ->
	@addToStack new md.Headline
		text: 'Welcome to Framer-Md'
	@addToStack new md.Subhead
		text: 'A Material Design Kit for Framer'
	@addToStack new md.Regular

# Home

# Favorites

# Profile
	

