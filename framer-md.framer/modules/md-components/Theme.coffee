# 	d888888P dP
# 	   88    88
# 	   88    88d888b. .d8888b. 88d8b.d8b. .d8888b.
# 	   88    88'  `88 88ooood8 88'`88'`88 88ooood8
# 	   88    88    88 88.  ... 88  88  88 88.  ...
# 	   dP    dP    dP `88888P' dP  dP  dP `88888P'


# When loaded, this module will attempt to create a new theme based on 
# the Design Mode template.

Screen.backgroundColor = '#000'

modifyColor = (color, h, s, l) ->
	clip = _.replace(_.replace(color.toHslString().slice(4, -1), '%', ''), '%', '') .split(', ')

	newColor = new Color(
		h: _.parseInt(clip[0]) + h, 
		s: (_.parseInt(clip[1]) + s)/100, 
		l: (_.parseInt(clip[2]) + l)/100, 
		a: 1)
	
	return newColor

primaryColor = primary_color?.backgroundColor ? new Color('blue')
primaryInvert = 100 - (primary_invert?.opacity * 100)
secondaryColor = secondary_color?.backgroundColor ? new Color('green')
pageColor = page_color?.backgroundColor ? new Color('white')
pageTextColor = page_text_color?.color ? new Color('black')
menuTextColor = menu_text_color?.color ? new Color('black')
menuInvert = 100 - (menu_invert?.opacity * 100) ? 0


source =
	colors:
		primary:
			main: primaryColor
			light: modifyColor(primaryColor, 13, -5, 15)
			dark: modifyColor(primaryColor, -1, -7, -12)
			text: primary_text_color?.color ? new Color('#000')
			invert: primaryInvert
		secondary:
			main: secondaryColor
			light: modifyColor(secondaryColor, 13, -5, 15)
			dark: modifyColor(secondaryColor, -1, -7, -12)
			text: secondary_text_color?.color ? new Color('#000')
		menu:
			light: pageColor
			text: menuTextColor
			invert: menuInvert
		page: 
			main: pageColor
			text: pageTextColor

Theme = 
	tint: source.colors.secondary.main
	primary: source.colors.primary.main
	secondary: source.colors.secondary.main
	page: source.page
	menu: source.colors.menu.light
	colors: source.colors

	user:
		image: undefined

	header: 
		backgroundColor: source.colors.primary.main
		title: source.colors.primary.text
		invert: primaryInvert
		icon:
			color: source.colors.primary.text
		tabs:
			backgroundColor: source.colors.primary.light
			color: source.colors.primary.text
			selector: source.colors.secondary.main
	
	statusBar: 
		image: 'modules/md-images/status_bar.png'
		backgroundColor: source.colors.primary.dark
		invert: primaryInvert
	
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
			backgroundColor: source.colors.page.main
			text: source.colors.page.text
		secondary:
			backgroundColor: '#F5F5F6'

	menuOverlay:
		header:
			backgroundColor: source.colors.secondary.main
			icon: source.colors.secondary.light
			text: source.colors.secondary.text
		subheader:
			color: source.colors.menu.text
			text: source.colors.secondary.text
			icon: source.colors.secondary.text
		backgroundColor: source.colors.menu.light
		text: source.colors.menu.text
		slider: 
			knob: source.colors.secondary.light
			fill: source.colors.secondary.dark
		invert: source.colors.menu.invert

	button:
		flat:
			backgroundColor: null
			color: source.colors.secondary.main
			shadowY: 0
			shadowColor: 'rgba(0,0,0,.18)'
			shadowBlur: 0

		raised:
			backgroundColor: source.colors.secondary.main
			color: source.colors.secondary.text
			shadowY: 2
			shadowColor: 'rgba(0,0,0,.18)'
			shadowBlur: 6

	fab:
		backgroundColor: source.colors.secondary.main
		color: source.colors.secondary.text
		invert: primaryInvert

	dialog: 
		backgroundColor:'#FAFAFA'
	
	divider:
		backgroundColor: 'rgba(0,0,0,.12)'

	text: 
		primary: source.colors.primary.text
		secondary: source.colors.secondary.text
	
	table:
		backgroundColor: '#FFFFFF'
		text: source.colors.primary.text
		checkBox:
			backgroundColor: null
			borderColor: '#D3D3D3'
		selected:
			backgroundColor: source.colors.secondary.main
			text: source.colors.primary.text
			checkBox:
				backgroundColor: source.colors.secondary.dark
				borderColor: null

	snackbar:
		backgroundColor: 'rgba(51, 51, 51, 1)'
		color: 'rgba(255, 255, 255, 1)'

	slider:
		knob: source.colors.primary.light
		fill: source.colors.primary.dark

	card:
		header: source.colors.secondary.dark


color_pallete?.destroy()

exports.Theme = Theme
