# 	d888888P dP
# 	   88    88
# 	   88    88d888b. .d8888b. 88d8b.d8b. .d8888b.
# 	   88    88'  `88 88ooood8 88'`88'`88 88ooood8
# 	   88    88    88 88.  ... 88  88  88 88.  ...
# 	   dP    dP    dP `88888P' dP  dP  dP `88888P'


# When loaded, this module will attempt to create a new theme based on 
# the Design Mode template.

Screen.backgroundColor = '#000'

exports.modifyColor = modifyColor = (color, h, s, l) ->
	clip = _.replace(_.replace(color.toHslString().slice(4, -1), '%', ''), '%', '') .split(', ')

	newColor = new Color(
		h: _.parseInt(clip[0]) + h, 
		s: (_.parseInt(clip[1]) + s)/100, 
		l: (_.parseInt(clip[2]) + l)/100, 
		a: 1)
	
	return newColor

primaryColor = new Color('#0F6CC8')
primaryTextColor = new Color('#FFFFFF')

secondaryColor = new Color('#1B9DFF')
secondaryTextColor = new Color('#FFFFFF')

menuColor = new Color ('#CCCCCC')
menuTextColor = new Color('#000000')

pageColor = new Color('#FFFFFF')
pageTextColor = new Color('#333333')

exports.colors = colors = 
	primary:
		main: primaryColor
		light: modifyColor(primaryColor, 13, -5, 15)
		dark: modifyColor(primaryColor, -1, -7, -12)
		text: primaryTextColor

	secondary:
		main: secondaryColor
		light: modifyColor(secondaryColor, 13, -5, 15)
		dark: modifyColor(secondaryColor, -1, -7, -12)
		text: secondaryTextColor
	menu:
		main: menuColor
		light: modifyColor(menuColor, 13, -5, 15)
		dark: modifyColor(menuColor, -1, -7, -12)
		text: menuTextColor
	page: 
		main: pageColor
		light: modifyColor(pageColor, 13, -5, 15)
		dark: modifyColor(pageColor, -1, -7, -12)
		text: pageTextColor

exports.Theme = 
	tint: colors.secondary.main
	primary: colors.primary.main
	secondary: colors.secondary.main
	page: colors.page.main
	menu: colors.menu.light
	colors: colors

	user:
		image: undefined

	header: 
		backgroundColor: colors.primary.main
		title: colors.primary.text
		icon:
			color: colors.primary.text
		tabs:
			backgroundColor: colors.primary.light
			color: colors.primary.text
			selector: colors.secondary.main
	
	statusBar: 
		image: 'modules/md-images/status_bar.png'
		backgroundColor: colors.primary.dark
	
	bottomNav:
		backgroundColor: '#FFFFFF'
		shadowY: -2
		shadowBlur: 6
		shadowColor: 'rgba(0,0,0,.1)'
	
	navBar:
		backgroundColor: '#000000'
	
	keyboard:
		image: 'modules/md-images/keyboard.png'

	footer:
		image: 'modules/md-images/nav_bar.png'

	page:
		primary:
			backgroundColor: colors.page.main
			text: colors.page.text
		secondary:
			backgroundColor: '#F5F5F6'

	menuOverlay:
		header:
			backgroundColor: colors.secondary.main
			icon: colors.secondary.light
			text: colors.secondary.text
		subheader:
			color: colors.menu.text
			text: colors.secondary.text
			icon: colors.secondary.text
		backgroundColor: colors.menu.light
		text: colors.menu.text
		slider: 
			knob: colors.secondary.light
			fill: colors.secondary.dark

	button:
		flat:
			backgroundColor: null
			color: colors.secondary.main
			shadowY: 0
			shadowColor: 'rgba(0,0,0,.18)'
			shadowBlur: 0

		raised:
			backgroundColor: colors.secondary.main
			color: colors.secondary.text
			shadowY: 2
			shadowColor: 'rgba(0,0,0,.18)'
			shadowBlur: 6

	fab:
		backgroundColor: colors.secondary.main
		color: colors.secondary.text

	dialog: 
		backgroundColor:'#FAFAFA'
	
	divider:
		backgroundColor: 'rgba(0,0,0,.12)'

	text: 
		primary: colors.primary.text
		secondary: colors.secondary.text
	
	table:
		backgroundColor: '#FFFFFF'
		text: colors.primary.text
		checkBox:
			backgroundColor: null
			borderColor: '#D3D3D3'
		selected:
			backgroundColor: colors.secondary.main
			text: colors.primary.text
			checkBox:
				backgroundColor: colors.secondary.dark
				borderColor: null
	snackbar:
		backgroundColor: 'rgba(51, 51, 51, 1)'
		color: 'rgba(255, 255, 255, 1)'

	toast:
		backgroundColor: 'rgba(51, 51, 51, 1)'
		color: 'rgba(255, 255, 255, 1)'

	slider:
		knob: colors.primary.light
		fill: colors.primary.dark

	card:
		header: colors.secondary.dark

color_pallete?.destroy()