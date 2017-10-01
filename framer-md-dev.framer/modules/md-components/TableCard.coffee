# 	dP     dP                          dP                    a88888b.                     dP                     dP
# 	88     88                          88                   d8'   `88                     88                     88
# 	88aaaaa88a .d8888b. .d8888b. .d888b88 .d8888b. 88d888b. 88        .d8888b. 88d888b. d8888P 88d888b. .d8888b. 88 .d8888b.
# 	88     88  88ooood8 88'  `88 88'  `88 88ooood8 88'  `88 88        88'  `88 88'  `88   88   88'  `88 88'  `88 88 Y8ooooo.
# 	88     88  88.  ... 88.  .88 88.  .88 88.  ... 88       Y8.   .88 88.  .88 88    88   88   88       88.  .88 88       88
# 	dP     dP  `88888P' `88888P8 `88888P8 `88888P' dP        Y88888P' `88888P' dP    dP   dP   dP       `88888P' dP `88888P'

{ Icon } = require 'md-components/Icon'
{ Theme } = require 'md-components/Theme'
{ Checkbox } = require 'md-components/Checkbox'
{ Card } = require 'md-components/Card'
{ Button } = require 'md-components/Button'

class HeaderControls extends Layer
	constructor: (options = {}) ->

		@_tableCard = options.tableCard
		@_table = @_tableCard._table

		@selectedButtons = []
		@selectedIcons = []
		@menuButtons = []
		@menuIcons = []

		@headerTitle = options.headerTitle

		@_colors =
			bright: new Color(@_table.color).alpha(.87)
			dim: new Color(@_table.color).alpha(.54)
			low: new Color(@_table.color).alpha(.38)
			hover: new Color(@_table._onColor).alpha(.1)
			select: new Color(@_table._onColor).alpha(.2)
			tint: new Color(@_table._onColor).alpha(.2)
			contrast: new Color(@_table.backgroundColor).alpha(.87)

		super _.defaults options,
			name: if @_tableCard._showNames then 'Header' else '.'
			height: 64
			parent: @_tableCard
			width: @_tableCard.width
			controls: @_tableCard._headerControls
			backgroundColor: @_tableCard.backgroundColor


		# header menu (shown when no items are selected)

		@menu = new Layer
			name: if @_tableCard._showNames then 'Menu' else '.'
			parent: @
			size: @size
			backgroundColor: @backgroundColor

		@title = new TextLayer
			name: 'Title', parent: @menu
			x: 24, y: 24
			fontSize: 20
			textTransform: 'capitalize'
			color: @_colors.bright
			text: "{title}"

		@title.template = @_tableCard._title

		@buildHeaderIcons(false)
		@buildHeaderButtons(false)


		# contextual header menu (shown when items are selected)

		@selectedMenu = new Layer
			name: if @_tableCard._showNames then 'Selected Menu' else '.'
			parent: @
			size: @size
			backgroundColor: @_colors.tint

		@selectedLabel = new TextLayer
			name: 'Selected'
			parent: @selectedMenu
			y: 24, x: 24
			fontSize: 14, color: @_table._onColor
			text: '{selected} item{plural} selected'


		# note: selected controls and selected buttons are both at 
		# right side of header, so use one or the other

		@buildSelectedIcons(false)
		@buildSelectedButtons(false)

		@update()

	buildHeaderButtons: (update = true) ->
		button?.destroy() for button in @selectedButtons
		startX = undefined
		

		for button, i in @_tableCard.headerButtons
			newButton = new TextLayer
				parent: @menu
				x: startX ? 8, y: 24
				fontSize: 14, fontWeight: 500
				padding: {right: 16, left: 16, top: 9, bottom: 9}
				backgroundColor: @backgroundColor
				textTransform: 'uppercase'
				borderRadius: 2
				color: @_table._onColor
				text: button.text
			
			newButton.action = button.action

			@selectedButtons.push(newButton)

			newButton.onTap newButton.action

		if update then @update()


	buildHeaderIcons: (update = true) ->
		button?.destroy() for button in @menuIcons
		for control, i in _.reverse(@_tableCard.headerIcons)
			newIcon = new Icon
				parent: @menu
				x: startX ? Align.right(-14)
				y: 24
				color: @_colors.bright
				icon: control.icon
				action: control.action

			@menuIcons.push(newIcon)

			startX = newIcon.x - 48

		if update then @update()


	buildSelectedIcons: (update = true) ->
		button?.destroy() for button in @selectedIcons
		startX = undefined

		for control, i in _.reverse(@_tableCard.selectedIcons)
			newIcon = new Icon
				parent: @selectedMenu
				x: startX ? Align.right(-14)
				y: Align.center
				icon: control.icon
				action: control.action
				color: @_colors.contrast

			@selectedIcons.push(newIcon)

			startX = newIcon.x - 48

		if update then @update()


	buildSelectedButtons: (update = true) ->
		button?.destroy() for button in @selectedButtons

		startX = undefined

		for button, i in _.reverse(@_tableCard.selectedButtons)
			newButton = new TextLayer
				parent: @selectedMenu
				x: startX ? Align.right(-14), 
				y: Align.center
				fontSize: 14, fontWeight: 500
				padding: {right: 16, left: 16, top: 9, bottom: 9}
				backgroundColor: null
				textTransform: 'uppercase'
				borderRadius: 2
				color: @_table._onColor
				text: button.text
			
			newButton.action = button.action

			newButton.onTap newButton.action

			@selectedButtons.push(newButton)

			startX = newButton.x - newButton.width

		if update then @update()


	update: =>
		@title.template = @_tableCard._title

		@title.visible = @_tableCard.headerButtons.length is 0

		# header selected label

		selected = @_table.getSelected().length

		@selectedLabel.template = 
			selected: @_table.getSelected().length
			plural: if selected > 1 then 's' else ''

		# if rows are selected and we have selected controls...

		isSelected = selected > 0 and _.concat(@_tableCard.selectedIcons, @_tableCard.selectedButtons).length  > 0

		@selectedMenu.visible = isSelected
		@menu.visible = !isSelected
		









# 	 88888888b                     dP                      a88888b.                     dP                     dP
# 	 88                            88                     d8'   `88                     88                     88
# 	a88aaaa    .d8888b. .d8888b. d8888P .d8888b. 88d888b. 88        .d8888b. 88d888b. d8888P 88d888b. .d8888b. 88 .d8888b.
# 	 88        88'  `88 88'  `88   88   88ooood8 88'  `88 88        88'  `88 88'  `88   88   88'  `88 88'  `88 88 Y8ooooo.
# 	 88        88.  .88 88.  .88   88   88.  ... 88       Y8.   .88 88.  .88 88    88   88   88       88.  .88 88       88
# 	 dP        `88888P' `88888P'   dP   `88888P' dP        Y88888P' `88888P' dP    dP   dP   dP       `88888P' dP `88888P'
# 	
# 	

class FooterControls extends Layer
	constructor: (options = {}) ->

		@_tableCard = options.tableCard
		@_table = @_tableCard._table

		super _.defaults options,
			name: if @_tableCard._showNames then 'Footer' else '.'
			y: Align.bottom
			height: 48
			parent: @_tableCard
			width: @_tableCard.width
			title: @_tableCard._title
			controls: @_tableCard._headerControls
			backgroundColor: @_tableCard.backgroundColor

		unless @_tableCard._blankFooter

			@next = new Icon
				parent: @
				x: Align.right(-14), y: Align.center
				icon: 'chevron-right'
				color: @_table.color
				onColor: @_table._onColor
				action: => @_tableCard.nextPage()

			@prev = new Icon
				parent: @
				x: @next.x - 48, y: Align.center
				icon: 'chevron-left'
				color: @_table.color
				onColor: @_table._onColor
				action: => @_tableCard.prevPage()

			@currentPage = new TextLayer
				name: 'Current Page', parent: @
				y: Align.center, textAlign: 'right'
				fontSize: 12, color: @_table.color ? 'rgba(126, 126, 126, 1)'
				text: '{start}-{last} of {total}'

			@rowsPerPageIcon = new Icon
				parent: @
				y: Align.center
				icon: 'menu-down'
				disabled: true
				color: @_table.color
				onColor: @_table._onColor
				action: => @_tableCard.prevPage()

			@rowsPerPage = new TextLayer
				name: 'Rows Per Page', parent: @
				y: Align.center, textAlign: 'right'
				fontSize: 12, color: @_table.color ? 'rgba(126, 126, 126, 1)'
				text: '{rowsPerPage}'

			@rowsPerPageLabel = new TextLayer
				name: 'Current Page', parent: @
				y: Align.center, textAlign: 'right'
				fontSize: 12, color: @_table.color ? 'rgba(126, 126, 126, 1)'
				text: 'Rows per Page:'

			for button in [@next, @prev]
				button.on "change:disabled", (isDisabled) ->
					if isDisabled then @opacity = .5
					else @opacity = 1

		@update(true)

		@_table.on "update", @update


	update: (initial = false) =>
		start = @_table._start
		rowsPerPage = @_table._rowsPerPage
		last = start + rowsPerPage
		total = @_table._totalItems

		if last > total then last = total

		unless @_tableCard._blankFooter

			@currentPage.template =
				start: start + 1
				last: last
				total: total

			@rowsPerPage.template = rowsPerPage

			@currentPage.maxX = @prev.x - 32
			
			if initial
				@rowsPerPageIcon.maxX = @currentPage.x - 32
				@rowsPerPage.maxX = @rowsPerPageIcon.x
				@rowsPerPageLabel.maxX = @rowsPerPageIcon.x - 40

			@prev.disabled = start is 0
			@next.disabled = last is total

		






# 	d888888P          dP       dP           a88888b.                         dP
# 	   88             88       88          d8'   `88                         88
# 	   88    .d8888b. 88d888b. 88 .d8888b. 88        .d8888b. 88d888b. .d888b88
# 	   88    88'  `88 88'  `88 88 88ooood8 88        88'  `88 88'  `88 88'  `88
# 	   88    88.  .88 88.  .88 88 88.  ... Y8.   .88 88.  .88 88       88.  .88
# 	   dP    `88888P8 88Y8888' dP `88888P'  Y88888P' `88888P8 dP       `88888P8
# 	
# 	

class exports.TableCard extends Card
	constructor: (options = {}) ->
		
		# table defined using @define method
		@_table = undefined

		@_title = options.title ? 'Table Card'
		@headerIcons = options.headerIcons ? []
		@headerButtons = options.headerButtons ? []
		@selectedIcons = options.selectedIcons ? []
		@selectedButtons = options.selectedButtons ? []
		
		
		# an option:
		# {name: 'Filter', 'icon': 'filter-menu', action: filterList}

		@_footer = options.footer ? true
		@_blankFooter = options.blankFooter ? false

		@_showNames = options.showNames ? true
		
		@_rawX = options.x
		@_rawY = options.y

		super _.defaults options,
			name: 'Table Card', 
			color: Theme.colors.primary.main
			# x: 16, y: 16
			# height: 280, width: 512
			# backgroundColor: '#FFF'
			# borderRadius: 3
			# shadowY: 1, shadowBlur: 5,
			# shadowColor: 'rgba(0,0,0,.3)'
			# animationOptions: {time: .15}


	nextPage: ->
		@_table.nextPage()
		@update()


	prevPage: ->
		@_table.prevPage()
		@update()


	# Add new table (and remove existing table, if one exists)
	@define "table",
		get: -> return @_table
		set: (table) ->
			return if table is @_table

			# clear existing objects
			@_table?.destroy()
			@headerControls?.destroy()
			@footerControls?.destroy()

			# add cross references
			@_table = table

			@table._tableCard = @

			# set table properties
			@table.props =
				parent: @
				x: 0, y: 64

			# set card properties to fit table
			@props =
				height: @table.height + 64
				width: @table.width
				backgroundColor: @table.backgroundColor
				color: @table.color

			# create header controls
			@headerControls = new HeaderControls
				tableCard: @

			# create footer controls
			if @_footer and not @_table._scrollable
				@height += 48
				@footerControls = new FooterControls
					tableCard: @

			# add event listener
			@table.on "change:selected", @headerControls.update

			# reset properties with options properties (fixes align bugs)
			Utils.delay 0, =>
				@x = @_rawX
				@y = @_rawY

				# update everything
				@update()


	update: ->
		Utils.delay 1, => @_table.update()
		@headerControls?.update()
		@footerControls?.update()