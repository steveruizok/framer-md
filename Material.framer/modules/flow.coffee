{database} = require 'database'



# 	 88888888b dP
# 	 88        88
# 	a88aaaa    88 .d8888b. dP  dP  dP
# 	 88        88 88'  `88 88  88  88
# 	 88        88 88.  .88 88.88b.88'
# 	 dP        dP `88888P' 8888P Y8P
 	

exports.flow = flow = new md.App
	theme: 'dau'
	footer: false
	animationOptions: {curve: "spring(300, 35, 0)"}






# 	8888ba.88ba                              888888ba             dP     dP
# 	88  `8b  `8b                             88    `8b            88     88
# 	88   88   88 .d8888b. 88d888b. dP    dP a88aaaa8P' dP    dP d8888P d8888P .d8888b. 88d888b.
# 	88   88   88 88ooood8 88'  `88 88    88  88   `8b. 88    88   88     88   88'  `88 88'  `88
# 	88   88   88 88.  ... 88    88 88.  .88  88    .88 88.  .88   88     88   88.  .88 88    88
# 	dP   dP   dP `88888P' dP    dP `88888P'  88888888P `88888P'   dP     dP   `88888P' dP    dP


class MenuButton extends Layer
	constructor: (options = {}) ->
		
		@_icon = options.icon ? 'book'
		@_text = options.text ? 'Default'
		@_action = options.action ? -> null

		super _.defaults options,
			height: 48, width: 304
			backgroundColor: null

		@iconLayer = new Layer
			name: '.', parent: @
			y: Align.center
			height: 32, width: 32
			invert: 100
			image: @_icon

		@labelLayer = new TextLayer
			name: '.', parent: @
			y: Align.center, x: @iconLayer.maxX + 16
			width: 100
			fontFamily: 'Stratos'
			fontSize: 14
			textAlign: 'left'
			color: '#FFF'
			text: "#{@_text}"

		@onTap @_action
		@onTap -> 
			Utils.delay .25, => @parent.hide()






#    888888ba                    dP       dP                                        dP  888888ba             dP     dP                    
#    88    `8b                   88       88                                        88  88    `8b            88     88                    
#    88     88 .d8888b. .d8888b. 88d888b. 88d888b. .d8888b. .d8888b. 88d888b. .d888b88 a88aaaa8P' dP    dP d8888P d8888P .d8888b. 88d888b.
#    88     88 88'  `88 Y8ooooo. 88'  `88 88'  `88 88'  `88 88'  `88 88'  `88 88'  `88  88   `8b. 88    88   88     88   88'  `88 88'  `88
#    88    .8P 88.  .88       88 88    88 88.  .88 88.  .88 88.  .88 88       88.  .88  88    .88 88.  .88   88     88   88.  .88 88    88
#    8888888P  `88888P8 `88888P' dP    dP 88Y8888' `88888P' `88888P8 dP       `88888P8  88888888P `88888P'   dP     dP   `88888P' dP    dP


exports.DashboardButton = class DashboardButton extends Layer
	constructor: (options = {}) ->
		
		@_icon = options.icon ? 'book'
		@_text = options.text ? 'Default'
		@_action = options.action ? -> null

		super _.defaults options,
			backgroundColor: null
			height: 100, width: 56

		@iconLayer = new Layer
			name: '.', parent: @
			x: Align.center, y: 0
			height: 72, width: 72
			invert: 100
			image: "images/icons/#{@_icon}.png"

		@textLayer = new TextLayer
			name: '.', parent: @
			y: @iconLayer.maxY, x: Align.center
			width: 100
			fontFamily: 'Stratos'
			fontSize: 13
			textAlign: 'center'
			color: '#FFF'
			text: "#{@_text}"

		@onTap @_action






#	dP                   oo   dP              dP   oo                  
# 	88                        88              88                       
#	88 88d888b. dP   .dP dP d8888P .d8888b. d8888P dP .d8888b. 88d888b.
# 	88 88'  `88 88   d8' 88   88   88'  `88   88   88 88'  `88 88'  `88
# 	88 88    88 88 .88'  88   88   88.  .88   88   88 88.  .88 88    88
# 	dP dP    dP 8888P'   dP   dP   `88888P8   dP   dP `88888P' dP    dP

class Invitation extends Layer
	constructor: (options = {}) ->
		super _.defaults options






# 	 888888ba
# 	 88    `8b
# 	a88aaaa8P' .d8888b. .d8888b. .d8888b. .d8888b.
# 	 88        88'  `88 88'  `88 88ooood8 Y8ooooo.
# 	 88        88.  .88 88.  .88 88.  ...       88
# 	 dP        `88888P8 `8888P88 `88888P' `88888P'
# 	                         .88
# 	                     d8888P

pages = [
	{title: 'Profile', icon: 'account-circle', action: -> 
		flow.showNext(new Profile)},
	{title: 'Biographies', icon: 'group', action: -> 
		flow.showNext(new Biographies)},
	{title: 'Notes', icon: 'drive-file', action: -> 
		flow.showNext(new Notes)},
	{title: 'Music', icon: 'headset', action: -> 
		flow.showNext(new Music)},
	{title: 'Map', icon: 'map', action: -> 
		flow.showNext(new Map)},
	{title: 'Radio', icon: 'wifi-tethering', action: -> 
		flow.showNext(new Radio)},
	{title: 'Book', icon: 'book', action: -> 
		flow.showNext(new Book)},
	{title: 'History', icon: 'drive-document', action: -> 
		flow.showNext(new History)},
	{title: 'Help', icon: 'warning', action: -> 
		flow.showNext(new Help)},
]






#    888888ba                    dP       dP                                        dP
#    88    `8b                   88       88                                        88
#    88     88 .d8888b. .d8888b. 88d888b. 88d888b. .d8888b. .d8888b. 88d888b. .d888b88
#    88     88 88'  `88 Y8ooooo. 88'  `88 88'  `88 88'  `88 88'  `88 88'  `88 88'  `88
#    88    .8P 88.  .88       88 88    88 88.  .88 88.  .88 88.  .88 88       88.  .88
#    8888888P  `88888P8 `88888P' dP    dP 88Y8888' `88888P' `88888P8 dP       `88888P8


class Dashboard extends md.Page
	constructor: (options = {}) ->
		super _.defaults options,
			theme: flow.theme
			header: 
				title: 'Dashboard', 
				visible: true, 
				icon: 'menu', 
				iconAction: -> menuOverlay.show()

		MARGIN = 48
		ROW_HEIGHT = 104

		@profileButton = new DashboardButton
			name: '.', parent: @
			x: MARGIN, y: ROW_HEIGHT
			icon: 'account-circle'
			text: 'Profile'
			action: -> flow.showNext(new Profile)

		@biosButton = new DashboardButton
			name: '.', parent: @
			x: Align.center, y: ROW_HEIGHT
			icon: 'group'
			text: 'Biographies'
			action: -> flow.showNext(new Biographies)

		@notesButton = new DashboardButton
			name: '.', parent: @
			x: Align.right(-MARGIN), y: ROW_HEIGHT
			icon: 'drive-file'
			text: 'Notes'
			action: -> flow.showNext(new Notes)

		@headsetButton = new DashboardButton
			name: '.', parent: @
			x: MARGIN, y: ROW_HEIGHT * 2
			icon: 'headset'
			text: 'Music'
			action: -> flow.showNext(new Music)

		@mapButton = new DashboardButton
			name: '.', parent: @
			x: Align.center, y: ROW_HEIGHT * 2
			icon: 'map'
			text: 'Map'
			action: -> flow.showNext(new Map)

		@radioButton = new DashboardButton
			name: '.', parent: @
			x: Align.right(-MARGIN), y: ROW_HEIGHT * 2
			icon: 'wifi-tethering'
			text: 'Radio'
			action: -> flow.showNext(new Radio)

		@bookButton = new DashboardButton
			name: '.', parent: @
			x: MARGIN, y: ROW_HEIGHT * 3
			icon: 'book'
			text: 'Book'
			action: -> flow.showNext(new Book)

		@historyButton = new DashboardButton
			name: '.', parent: @
			x: Align.center, y: ROW_HEIGHT * 3
			icon: 'drive-document'
			text: 'History'
			action: -> flow.showNext(new History)

		@helpButton = new DashboardButton
			name: '.', parent: @
			x: Align.right(-MARGIN), y: ROW_HEIGHT * 3
			icon: 'warning'
			text: 'Help'
			action: -> flow.showNext(new Help)













# 	8888ba.88ba                              .88888.                             dP                  
# 	88  `8b  `8b                            d8'   `8b                            88                  
# 	88   88   88 .d8888b. 88d888b. dP    dP 88     88 dP   .dP .d8888b. 88d888b. 88 .d8888b. dP    dP
# 	88   88   88 88ooood8 88'  `88 88    88 88     88 88   d8' 88ooood8 88'  `88 88 88'  `88 88    88
# 	88   88   88 88.  ... 88    88 88.  .88 Y8.   .8P 88 .88'  88.  ... 88       88 88.  .88 88.  .88
# 	dP   dP   dP `88888P' dP    dP `88888P'  `8888P'  8888P'   `88888P' dP       dP `88888P8 `8888P88
#                                                                                               .88
#                                                                                           d8888P 

class MenuOverlay extends Layer
	constructor: (options = {}) ->
		super _.defaults options,
			height: Screen.height
			width: 304
			height: Screen.height
			visible: false
			backgroundColor: '#303030'
			animationOptions: {curve: "spring(300, 35, 0)"}

		@scrim = new Layer
			name: '.', 
			size: Screen.size
			backgroundColor: 'rgba(0,0,0,.8)'
			opacity: 0
			visible: false
			animationOptions:
				time: .25

		@scrim.onTap => @hide()
		@onSwipeLeftEnd => @hide()

		@userPhoto = new Layer
			name: '.', parent: @
			width: @width, height: 173
			image: database.user.image
			brightness: 50

		@userName = new md.Title
			name: '.', parent: @
			width: @width
			fontSize: 28
			color: '#FFF'
			x: 16, y: 32
			text: database.user.name

		@userName.maxY = @userPhoto.maxY - 16

		links = []

		for page, i in pages
			links[i] = new MenuButton
				name: '.', parent: @
				x: 16, y: 189 + (48 * i)
				text: page.title
				icon: "images/icons/#{page.icon}.png"
				action: page.action

	show: ->
		@bringToFront()
		@visible = true
		@x = -Screen.width
		@animate
			x: 0

		@scrim.placeBehind(@)
		@scrim.visible = true
		@scrim.animate
			opacity: 1

	hide: ->
		@animate
			x: -Screen.width

		@scrim.animate
			opacity: 0

		Utils.delay .3, =>
			@visible = false
			@scrim.visible = false
			@sendToBack()
			@scrim.sendToBack()







# 	 888888ba                    .8888b oo dP
# 	 88    `8b                   88   "    88
# 	a88aaaa8P' 88d888b. .d8888b. 88aaa  dP 88 .d8888b.
# 	 88        88'  `88 88'  `88 88     88 88 88ooood8
# 	 88        88       88.  .88 88     88 88 88.  ...
# 	 dP        dP       `88888P' dP     dP dP `88888P'

class Profile extends md.Page
	constructor: (options) ->
		super _.defaults options,
			theme: flow.theme
			header:
				title: 'Profile'
				visible: true, 
				icon: 'arrow-back', 
				iconAction: -> 
					flow.showPrevious()
					@destroy()






#	  888888ba  oo                                              dP       oo
#	  88    `8b                                                 88
#	 a88aaaa8P' dP .d8888b. .d8888b. 88d888b. .d8888b. 88d888b. 88d888b. dP .d8888b. .d8888b.
#	  88   `8b. 88 88'  `88 88'  `88 88'  `88 88'  `88 88'  `88 88'  `88 88 88ooood8 Y8ooooo.
#	  88    .88 88 88.  .88 88.  .88 88       88.  .88 88.  .88 88    88 88 88.  ...       88
#	  88888888P dP `88888P' `8888P88 dP       `88888P8 88Y888P' dP    dP dP `88888P' `88888P'
#	                             .88                   88
#	                         d8888P                    dP

class Biographies extends md.Page
	constructor: (options = {}) ->
		super _.defaults options,
			theme: flow.theme
			header:
				title: 'Biographies'
				visible: true, 
				icon: 'arrow-back', 
				iconAction: -> 
					flow.showPrevious()
					@destroy()






#	  888888ba  oo
#	  88    `8b
#	 a88aaaa8P' dP .d8888b.
#	  88   `8b. 88 88'  `88
#	  88    .88 88 88.  .88
#	  88888888P dP `88888P'



class BiographiesFocus extends md.Page
	constructor: (options = {}) ->

		@_source = options.source ? {title: 'Default'}

		super _.defaults options,
			theme: flow.theme
			header:
				title: "#{@_source.title}"
				visible: true, 
				icon: 'arrow-back', 
				iconAction: -> 
					flow.showPrevious()
					@destroy()






# 	888888ba             dP                    
# 	88    `8b            88                    
# 	88     88 .d8888b. d8888P .d8888b. .d8888b.
# 	88     88 88'  `88   88   88ooood8 Y8ooooo.
# 	88     88 88.  .88   88   88.  ...       88
# 	dP     dP `88888P'   dP   `88888P' `88888P'


class Notes extends md.Page
	constructor: (options = {}) ->

		@_text = database.user.note

		super _.defaults options,
			theme: flow.theme
			header:
				title: 'Notes'
				visible: true, 
				icon: 'arrow-back', 
				iconAction: -> 
					flow.showPrevious()
					@destroy()

		@textField = new Layer
			parent: @
			x: 16, y: 100
			backgroundColor: null
			html: """
			<textarea name="textarea" class="textarea" style="
				background-color: #000000;
				width: 320px;
				height: 500px;
				font-family: Stratos;
				font-size: 16px;
				font-weight: 400;
				color: #FFFFFF;
				line-height: 20px;
				border: none;
				outline: none; 
				">
				#{@_text}
			</textarea>
		"""

		@textArea = document.querySelectorAll(".textarea")[0]


		@on "keyup", =>
			database.user.note = @textArea.value



# 	8888ba.88ba                    oo
# 	88  `8b  `8b
# 	88   88   88 dP    dP .d8888b. dP .d8888b.
# 	88   88   88 88    88 Y8ooooo. 88 88'  `""
# 	88   88   88 88.  .88       88 88 88.  ...
# 	dP   dP   dP `88888P' `88888P' dP `88888P'

class Music extends md.Page
	constructor: (options = {}) ->
		super _.defaults options,
			theme: flow.theme
			header:
				title: 'Music'
				visible: true, 
				icon: 'arrow-back', 
				iconAction: -> 
					flow.showPrevious()
					@destroy()

		@musicIcon = new Layer
			name: '.', parent: @
			height: 152, width: 152
			x: Align.center, y: Align.center(-64)
			image: 'images/icons/headset.png'
			invert: 100

		@musicDescription1 = new md.Regular
			name: '.', parent: @
			x: Align.center, y: @musicIcon.maxY
			color: "#FFF", textAlign: "center"
			width: 280
			text: 'Your music is composed based  on what we know about you.'

		@musicDescription2 = new md.Regular
			name: '.', parent: @
			x: Align.center, y: @musicDescription1.maxY + 16
			color: "#FFF", textAlign: "center"
			width: 280
			text: ' It is unique to you.'

		@musicDescription3 = new md.Regular
			name: '.', parent: @
			x: Align.center, y: @musicDescription2.maxY + 16
			color: "#FFF", textAlign: "center"
			width: 240
			text: ' If you do not enjoy what  you hear, please change.'





# 	8888ba.88ba
# 	88  `8b  `8b
# 	88   88   88 .d8888b. 88d888b.
# 	88   88   88 88'  `88 88'  `88
# 	88   88   88 88.  .88 88.  .88
# 	dP   dP   dP `88888P8 88Y888P'
# 	                      88
# 	                      dP

class Map extends md.Page
	constructor: (options) ->
		super _.defaults options,
			theme: flow.theme
			header:
				title: 'Map'
				visible: true, 
				icon: 'arrow-back', 
				iconAction: -> 
					flow.showPrevious()
					@destroy()
		
		@map = new Layer
			name: '.', parent: @
			size: @size
			scale: 1.5
			brightness: 80
			image: 'images/map.png'

		@map.draggable = true

		@findMeBox = new Layer
			name: '.', parent: @
			x: Align.right(-8), y: Align.bottom(-176)
			width: 48, height: 48
			backgroundColor: '#efefef'
			borderRadius: 24

		@findMe = new Layer
			name: '.', parent: @findMeBox
			x: Align.center, y: Align.center
			width: 40, height: 40
			image: 'images/icons/radio-button-on.png'

		@zoomBox = new Layer
			name: '.', parent: @
			x: Align.right(-8), y: Align.bottom(-64)
			width: 48, height: 96
			backgroundColor: '#efefef'
			borderRadius: 24

		@zoomIn = new Layer
			name: '.', parent: @zoomBox
			x: Align.center, y: 8
			width: 40, height: 40
			image: 'images/icons/add.png'

		@zoomOut = new Layer
			name: '.', parent: @zoomBox
			x: Align.center, y: Align.bottom(-8)
			width: 40, height: 40
			image: 'images/icons/remove.png'





#	 888888ba                 dP oo
#	  88    `8b                88
#	 a88aaaa8P' .d8888b. .d888b88 dP .d8888b.
#	  88   `8b. 88'  `88 88'  `88 88 88'  `88
#	  88     88 88.  .88 88.  .88 88 88.  .88
#	  dP     dP `88888P8 `88888P8 dP `88888P'



class Radio extends md.Page
	constructor: (options = {}) ->
		super _.defaults options,
			theme: flow.theme
			header:
				title: 'Radio'
				visible: true, 
				icon: 'arrow-back', 
				iconAction: -> 
					flow.showPrevious()
					@destroy()

		@radioIcon = new Layer
			name: '.', parent: @
			height: 152, width: 152
			x: Align.center, y: Align.center(-64)
			image: 'images/icons/wifi-tethering.png'
			invert: 100

		@radioLabel = new md.Regular
			name: '.', parent: @
			x: Align.center, y: @radioIcon.maxY
			color: "#FFF", textAlign: "center"
			text: 'Searching for signal...'

		@radioDescription = new md.Regular
			name: '.', parent: @
			x: Align.center, y: @radioLabel.maxY + 32
			color: "#FFF", textAlign: "center"
			width: 200
			text: 'Radio is only available in  certain areas of the Space.'



# 	 888888ba                    dP
# 	 88    `8b                   88
# 	a88aaaa8P' .d8888b. .d8888b. 88  .dP
# 	 88   `8b. 88'  `88 88'  `88 88888"
# 	 88    .88 88.  .88 88.  .88 88  `8b.
# 	 88888888P `88888P' `88888P' dP   `YP
# 	
# 	

class Book extends md.Page
	constructor: (options = {}) ->
		super _.defaults options,
			theme: flow.theme
			header:
				title: 'Book'
				visible: true, 
				icon: 'arrow-back', 
				iconAction: -> 
					flow.showPrevious()
					@destroy()

		@bookFlow = new Layer
			name: '.', parent: @content
			x: 16, y: 96
			backgroundColor: null
			width: @width - 32
			height: @height * 2
		
		@bookFlow.style =
			fontFamily: 'Stratos'
			fontSize: '16px'
			lineHeight: '1.4'
			color: '#FFF'
		
		@bookFlow.html = """FADE IN:<br><br>
1 INT. WASHINGTON MUSEUM - DAY 1<br><br>
The saddest eyes you ever saw.
We are looking at an El Greco drawing. It is a study for
one of his paintings.<br><br>
PULL BACK TO REVEAL --<br><br>
A bunch of art students are doing sketches of the eyes,
the elongated fingers, the slender hands El Greco drew so
brilliantly.<br><br>
Most of the students are around 20. A couple of suburban
housewives are there too.
And one older man.<br><br>
This is LUTHER WHITNEY. Mid 60s, very fit, neatly
dressed. At quick glance, he seems as if he might be a
successful company executive.<br><br>
As we watch him draw we can tell he is capable of great
concentration. And patient. With eyes that miss
nothing: He has pilot’s eyes.<br><br>
We’ll find out more about him as time goes on, but this
is all you really have to know: Luther Whitney is the
hero of this piece. As we watch him draw --
Luther’s sketchbook. He is finishing his work on the
eyes, and he’s caught the sadness: It’s good stuff.
Luther. It’s not good enough for him. He looks at his
work a moment, shakes his head.<br><br>
GIRL STUDENT<br><br>
Don’t give up.<br><br>
LUTHER<br><br>
I never do.<br><br>
GIRL STUDENT<br><br>
May I?<br><br>
She’s indicated his sketchbook. He nods. She starts
thumbing through.<br><br>
The sketchbook as the pages turn.<br><br>
Detail work. Eyes and hands. The eyes are good. The
hands are better. Very skillful.<br><br>
(CONTINUED)<br><br>
"""







# 	dP     dP  oo            dP
# 	88     88                88
# 	88aaaaa88a dP .d8888b. d8888P .d8888b. 88d888b. dP    dP
# 	88     88  88 Y8ooooo.   88   88'  `88 88'  `88 88    88
# 	88     88  88       88   88   88.  .88 88       88.  .88
# 	dP     dP  dP `88888P'   dP   `88888P' dP       `8888P88
# 	                                                     .88
# 	                                                 d8888P


class History extends md.Page
	constructor: (options) ->
		super _.defaults options,
			theme: flow.theme
			header:
				title: 'History'
				visible: true, 
				icon: 'arrow-back', 
				iconAction: -> 
					flow.showPrevious()
					@destroy()






# 	dP     dP           dP
# 	88     88           88
# 	88aaaaa88a .d8888b. 88 88d888b.
# 	88     88  88ooood8 88 88'  `88
# 	88     88  88.  ... 88 88.  .88
# 	dP     dP  `88888P' dP 88Y888P'
# 	                       88
# 	                       dP

class Help extends md.Page
	constructor: (options) ->
		super _.defaults options,
			theme: flow.theme
			header:
				title: 'Help'
				visible: true, 
				icon: 'arrow-back', 
				iconAction: -> 
					flow.showPrevious()
					@destroy()


		@helpIcon = new Layer
			name: '.', parent: @
			height: 152, width: 152
			x: Align.center, y: Align.center(-128)
			image: 'images/icons/warning.png'
			invert: 100

		@helpLabel = new md.Regular
			name: '.', parent: @
			x: Align.center, y: @helpIcon.maxY
			color: "#FFF", textAlign: "center"
			text: 'Do you need help?'

		@helpDescription = new md.Regular
			name: '.', parent: @
			x: Align.center, y: @helpLabel.maxY + 16
			color: "#FFF", textAlign: "center"
			width: 280
			text: 'Chat now with one of our operators.'

		@needHelp = new md.Title
			name: '.', parent: @
			text: 'I NEED HELP'
			textAlign: 'center'
			x: Align.center, y: @helpDescription.maxY + 64
			color: 'rgba(255, 0, 0, 1)'

		@needHelp.onTap -> null # TODO, begin assistance chat

		@cancel = new md.Title
			name: '.', parent: @
			text: 'CANCEL'
			textAlign: 'center'
			x: Align.center, y: @needHelp.maxY + 48
			color: '#CCC'

		@cancel.onTap -> flow.showPrevious()


menuOverlay = new MenuOverlay
dashboard = new Dashboard

flow.showNext(dashboard)
# flow.showNext(new Map)

