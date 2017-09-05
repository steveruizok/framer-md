{ Icon } = require 'md-components/Icon'

# 	dP     dP                          dP                    a88888b.                     dP                     dP
# 	88     88                          88                   d8'   `88                     88                     88
# 	88aaaaa88a .d8888b. .d8888b. .d888b88 .d8888b. 88d888b. 88        .d8888b. 88d888b. d8888P 88d888b. .d8888b. 88 .d8888b.
# 	88     88  88ooood8 88'  `88 88'  `88 88ooood8 88'  `88 88        88'  `88 88'  `88   88   88'  `88 88'  `88 88 Y8ooooo.
# 	88     88  88.  ... 88.  .88 88.  .88 88.  ... 88       Y8.   .88 88.  .88 88    88   88   88       88.  .88 88       88
# 	dP     dP  `88888P' `88888P8 `88888P8 `88888P' dP        Y88888P' `88888P' dP    dP   dP   dP       `88888P' dP `88888P'
# 	
# 	

class HeaderControls extends Layer
	constructor: (options = {}) ->

		@_tableCard = options.tableCard
		@_table = @_tableCard._table

		super _.defaults options,
			name: if @_tableCard._showNames then 'Header' else '.'
			height: 64
			parent: @_tableCard
			width: @_tableCard.width
			controls: @_tableCard._headerControls
			backgroundColor: @_tableCard.backgroundColor

		@title = new TextLayer
			name: 'Title', parent: @
			x: 24, y: 24
			fontSize: 20
			color: 'rgba(33, 33, 33, 1.000)'
			text: @_tableCard._title

		# header buttons

		startX = undefined

		if @_tableCard._headerButtons.length > 0
			@title.visible = false

		for button, i in @_tableCard._headerButtons
			newButton = new TextLayer
				parent: @
				x: startX ? 8, y: 24
				fontSize: 14, fontWeight: 500
				padding: {right: 16, left: 16, top: 9, bottom: 9}
				backgroundColor: @backgroundColor
				textTransform: 'uppercase'
				borderRadius: 2
				color: @_table.color
				text: button.text
			
			newButton.action = button.action

			newButton.onTap newButton.action

			startX = newButton.maxX + 8

		# header controls

		startX = undefined

		for control, i in _.reverse(@_tableCard._headerControls)
			newControl = new Icon
				parent: @
				x: startX ? Align.right(-14)
				y: 24
				icon: control.icon
				action: control.action

			startX = newControl.x - 48

		# contextual header for selected items

		@selectedMenu = new Layer
			name: if @_tableCard._showNames then 'Selected Menu' else '.'
			parent: @
			size: @size
			backgroundColor: new Color(@_table.color).lighten(35)

		@selectedLabel = new TextLayer
			name: 'Selected'
			parent: @selectedMenu
			y: 24, x: 24
			fontSize: 14, color: @_table.color
			text: '{selected} item{plural} selected'

		startX = undefined

		for control, i in _.reverse(@_tableCard._selectedControls)
			newControl = new Icon
				parent: @selectedMenu
				x: startX ? Align.right(-14)
				y: Align.center
				icon: control.icon
				action: control.action

			startX = newControl.x - 48

	update: =>
		selected = @_table.getSelected().length

		@selectedLabel.template = 
			selected: @_table.getSelected().length
			plural: if selected > 1 then 's' else ''

		@selectedMenu.visible = selected > 0 and @_tableCard._headerControls.length > 0

		









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
			name: if @_tableCard._showNames then 'Header' else '.'
			y: Align.bottom
			height: 48
			parent: @_tableCard
			width: @_tableCard.width
			title: @_tableCard._title
			controls: @_tableCard._headerControls
			backgroundColor: @_tableCard.backgroundColor

		@next = new Icon
			parent: @
			x: Align.right(-14), y: Align.center
			icon: 'chevron-right'
			action: => @_tableCard.nextPage()

		@prev = new Icon
			parent: @
			x: @next.x - 48, y: Align.center
			icon: 'chevron-left'
			action: => @_tableCard.prevPage()

		@currentPage = new TextLayer
			name: 'Current Page', parent: @
			y: Align.center, textAlign: 'right'
			fontSize: 12, color: 'rgba(126, 126, 126, 1)'
			text: '{start}-{last} of {total}'

		@rowsPerPageIcon = new Icon
			parent: @
			y: Align.center
			icon: 'menu-down'
			disabled: true
			action: => @_tableCard.prevPage()

		@rowsPerPage = new TextLayer
			name: 'Rows Per Page', parent: @
			y: Align.center, textAlign: 'right'
			fontSize: 12, color: 'rgba(126, 126, 126, 1)'
			text: '{rowsPerPage}'

		@rowsPerPageLabel = new TextLayer
			name: 'Current Page', parent: @
			y: Align.center, textAlign: 'right'
			fontSize: 12, color: 'rgba(126, 126, 126, 1)'
			text: 'Rows per Page:'

		for button in [@next, @prev]
			button.on "change:disabled", (isDisabled) ->
				if isDisabled then @opacity = .5
				else @opacity = 1

		@update(true)


	update: (initial = false) ->
		start = @_table._start
		rowsPerPage = @_table._rowsPerPage
		last = start + rowsPerPage
		total = @_table._totalItems

		if last > total then last = total

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

class exports.TableCard extends Layer
	constructor: (options = {}) ->
		
		# table defined using @define method
		@_table = undefined

		@_title = options.title ? 'Table Card'
		@_headerControls = options.headerControls ? []
		@_selectedControls = options.selectedControls ? []
		@_headerButtons = options.headerButtons ? []
		
		# an option:
		# {name: 'Filter', 'icon': 'filter-menu', action: filterList}

		@_footer = options.footer

		@_showNames = options.showNames ? true
		
		@_rawX = options.x
		@_rawY = options.y

		super _.defaults options,
			name: 'Table Card', 
			x: 16, y: 16
			height: @_table?.height + 64 ? 280, width: @_table?.width ? 512
			color: 'rgba(67, 133, 244, 1.000)'
			backgroundColor: '#FFF'
			borderRadius: 3
			shadowY: 1, shadowBlur: 5,
			shadowColor: 'rgba(0,0,0,.3)'
			animationOptions: {time: .15}


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
			@_table._tableCard = @

			# set table properties
			@_table.props =
				parent: @
				x: 0, y: 64

			# set card properties to fit table
			@props =
				height: @_table.height + 64
				width: @_table.width

			# create header controls
			@headerControls = new HeaderControls
				tableCard: @

			# create footer controls
			unless @_table._scrollable
				@height += 48
				@footerControls = new FooterControls
					tableCard: @

			# add event listener
			@_table.on "change:selected", @headerControls.update

			# reset properties with options properties (fixes align bugs)
			@x = @_rawX
			@y = @_rawY

			# update everything
			@update()

			

	update: ->
		Utils.delay 1, => @_table.update()
		@headerControls?.update()
		@footerControls?.update()