{ Icon } = require 'md-components/Icon'


# 	 a88888b. dP                         dP       dP
# 	d8'   `88 88                         88       88
# 	88        88d888b. .d8888b. .d8888b. 88  .dP  88d888b. .d8888b. dP.  .dP
# 	88        88'  `88 88ooood8 88'  `"" 88888"   88'  `88 88'  `88  `8bd8'
# 	Y8.   .88 88    88 88.  ... 88.  ... 88  `8b. 88.  .88 88.  .88  .d88b.
# 	 Y88888P' dP    dP `88888P' `88888P' dP   `YP 88Y8888' `88888P' dP'  `dP


class Checkbox extends Icon
	constructor: (options = {}) ->

		super _.defaults options,
			name: 'Checkbox'
			animationOptions: {time: .15}
			toggle: true
			color: 'rgba(117, 117, 117, 1.000)'
			onColor: 'rgba(67, 133, 244, 1.000)'
			action: => @update()

		@on "change:disabled", @update
		@on "change:isOn", @update

		@update()

	update: ->
		
		if @_isOn
			@icon = 'checkbox-marked'
		else 
			@icon = 'checkbox-blank-outline'

		if @_disabled
			@opacity = .3
		else
			@opacity = 1








# 	dP     dP                          dP
# 	88     88                          88
# 	88aaaaa88a .d8888b. .d8888b. .d888b88 .d8888b. 88d888b.
# 	88     88  88ooood8 88'  `88 88'  `88 88ooood8 88'  `88
# 	88     88  88.  ... 88.  .88 88.  .88 88.  ... 88
# 	dP     dP  `88888P' `88888P8 `88888P8 `88888P' dP
# 	
# 	


class Header extends TextLayer
	constructor: (options = {}) ->
		
		@i = options.i
		@_source = options.source
		@_table = options.table
		@_format = @_source.format
		@_key = @_source.key
		
		@_colWidth = 0
		@_sorted = false
		@_hovered = false
		@_align = @_source.align ? if @i is 0 then 'left' else 'right'

		super _.defaults options,
			name: @_source.title
			y: Align.center
			textAlign: @_align
			fontSize: 12, 
			color: @_table._colors.dim
			padding: {top: 12, bottom: 12}
			fontWeight: 600
			text: @_source.title

		@_baseWidth = @width

		if @_table._sortable

			@_table.sorted = true

			@icon = new Icon
				name: 'Header Icon', parent: @
				x: if @_align is 'left' then Align.right(24) else -24
				y: Align.center()
				animationOptions: @animationOptions
				color: @_table._colors.bright
				scale: .7
				opacity: 0
				icon: 'arrow-up'

			@onTap -> @setTableSort()

		@onMouseOver -> Utils.delay 0, => @hovered = true
		@onMouseOut ->  @hovered = false; @tooltip?.destroy(); @tooltip = undefined

	setTableSort: =>
		@_table._sorted = true
		@_table.build(@_key, false)

	sort: (column, descending) ->
		return if not @_table._sortable

		if @_key is column and @_table._sorted
			@_sorted = true
			@animate { color: @_table._colors.bright }
			@icon.animateStop()
			@icon.animate
				opacity: 1, 
				rotation: if descending then 180 else 0,
				scale: .8

		else 
			@_sorted = false
			@animate { color: @_table._colors.dim }
			@icon?.animate { opacity: 0, scale: .7 }
			Utils.delay .25, => @icon?.rotation = 0

	@define "hovered",
		get: -> return @_hovered
		set: (bool) ->
			return if bool is @_hovered
			@_hovered = bool

			if @_hovered 

				if not @_sorted
					@icon.animate { opacity: 1, color: @_table._colors.low }
					
					siblings = _.without(@_table.headers, @)
					
					for sib in siblings
						sib.hovered = false
						if sib._sorted is false
							sib.icon.animate { opacity: 0, color: @_table._colors.low }		
			
			else
				@icon?.animate
					opacity: if @_sorted then 1 else 0 
					color: @_table._colors.bright










# 	 888888ba
# 	 88    `8b
# 	a88aaaa8P' .d8888b. dP  dP  dP
# 	 88   `8b. 88'  `88 88  88  88
# 	 88     88 88.  .88 88.88b.88'
# 	 dP     dP `88888P' 8888P Y8P
# 	
# 	

class Row extends Layer
	constructor: (options = {}) ->
		
		@i = options.i
		@item = options.item
		
		@_table = options.table

		@_rows = @_table.rows
		@_cells = []

		@_selectable = @_table._selectable

		@_onColor = @_table._onColor
		@_selected = false

		@_hoverable = @_table._hoverable
		@_hovered = false

		super _.defaults options,
			name: if @_table._showNames then 'Row' else '.', 
			parent: if @_table._scrollable then @_table.content else @_table
			height: @_table._rowHeight, width: @_table.width
			y: 56 + ( @_table.rows.length * @_table._rowHeight)
			color: @_table._colors.bright
			shadowY: -1, shadowColor: 'rgba(0,0,0,.15)'
			backgroundColor: @_table.backgroundColor
			animationOptions: @_table.animationOptions

		@baseBackgroundColor = if @_table._striped? and @i % 2 is 0 then @_table._striped else @backgroundColor

		if @_selectable

			@checkbox = new Checkbox
				name: 'Checkbox', parent: @
				x: 20, y: Align.center
				color: @_table._colors.high
				onColor: @_onColor
				disabled: false

			@checkbox.ignoreEvents = true

		# build cells

		for header, i in @_table._headers

			cell = new Cell
				table: @_table
				source: header
				row: @
				i: i

		@_table.rows.push(@)

		@onMouseOver -> Utils.delay 0, => @hovered = true
		@onMouseOut ->  @hovered = false
		@onTapEnd -> 	@selected = !@selected

	reset: ->

		@item.hovered = @hovered
		@item.selected = @selected
		@checkbox.isOn = @selected
		@_selectable = !@item.isEmpty
		
		# check hovered status

		if @hovered
			@backgroundColor = @_table._colors.hover
			sib.hovered = false for sib in _.without(@_rows, @)
		
		else 

			# if not hovered, set default display values

			@backgroundColor = @baseBackgroundColor
			cell.color = @color for cell in @_cells

			# update display if item matches any flags conditions

			for flag in @_table.flags
				if flag.condition(@item)
					if flag.backgroundColor? then @backgroundColor = flag.backgroundColor
					if flag.color? then cell.color = flag.color for cell in @_cells

			# update display if item is selected

			if @selected
				@backgroundColor = @_table._colors.select
				

	fill: (item) ->
		@item = item
		@item.row = @

		# set style based on status
		@selected = item.selected
		
		@reset()

		# fill cells
		for cell in @_cells
			cell.fill(item)

	@define "selected",
		get: -> return @_selected
		set: (bool) ->
			return if bool is @_selected or not @_selectable

			@_selected = bool

			if @_selected and not @_table._multiselect
				sib.selected = false for sib in _.without(@_table.rows, @)

			@reset()

			@_table.emit "change:selected", @_table.getSelected()

			# if @_selected then @emit "select", @item
			# else @emit "deselect", @item

			

	@define "hovered",
		get: -> return @_hovered
		set: (bool) ->
			return if bool is @_hovered or not @_hoverable or @item.isEmpty

			@_hovered = bool
			@reset()










# 	 a88888b.          dP dP
# 	d8'   `88          88 88
# 	88        .d8888b. 88 88
# 	88        88ooood8 88 88
# 	Y8.   .88 88.  ... 88 88
# 	 Y88888P' `88888P' dP dP
# 	
# 	

class Cell extends TextLayer
	constructor: (options = {}) ->

		@i = options.i
		@_source = options.source
		@_row = options.row
		@_table = options.table

		@_key = @_source.key
		@_format = @_source.format ? (item) -> return item
		@_data = ''

		super _.defaults options,
			name: 'Cell', parent: @_row
			x: @_table.headers[@i].x
			y: Align.center
			textAlign: @_table.headers[@i]._align
			fontSize: 13
			color: @_table._colors.bright
			textTransform: "capitalize"
			animationOptions: @_table.animationOptions
			text: "{data}"

		@template = ''

		@_row._cells.push(@)

	fill: (item) ->
		# fill cells with data
		@data = item[@_key]

	@define "data",
		get: -> return @_data
		set: (data) ->

			if @_sortdata then @_data = @_sortdata
			else @_data = if data or data is 0 then @_data = _.defaultTo(@_format(data, @_table), '') else ''

			@template = @_data










# 	d888888P          dP       dP
# 	   88             88       88
# 	   88    .d8888b. 88d888b. 88 .d8888b.
# 	   88    88'  `88 88'  `88 88 88ooood8
# 	   88    88.  .88 88.  .88 88 88.  ...
# 	   dP    `88888P8 88Y8888' dP `88888P'
# 	
# 	

class exports.Table extends ScrollComponent
	constructor: (options = {}) ->
		
		
		@_headers = options.headers ? [
			{title: 'Title', key: 'title', width: 200},
			{title: 'Author', key: 'author', width: 100},
			{title: 'Year', key: 'year', width: 100}
			]
		@_items = options.items ? [
			{title: 'Catcher in the Rye', author: 'J. D. Salinger', year: '1951'},
			{title: 'Hatchet', author: 'Gary Paulsen', year: '1987'},
			{title: 'Empire', author: 'Michael Hardt', year: '2000'},
			]
		
		@_scrollable = options.scrollable ? false
		@_sorted = options.sorted ? false
		@_sortable = options.sortable ? false
		@_hoverable = options.hoverable ? true
		@_selectable = options.selectable ? true
		@_multiselect = options.multiselect ? false

		@_rowHeight = options.rowHeight ? 48
		@_rowsPerPage = options.rowsPerPage ? 6

		@_start = 0
		@_totalItems = undefined

		@_striped = options.striped

		@flags = options.flags ? []
		@headers = []
		@rows = []
		@items = []

		@_sortColumn = @_headers[0].key
		@_sortDescending = false
		
		@_filter = null

		@_onColor = options.onColor ? 'rgba(67, 133, 244, 1.000)'
		@_showNames = options.showNames ? true

		super _.defaults options,
			name: 'Table', 
			x: 16, y: 16
			height: (@_rowsPerPage * @_rowHeight) + 56, width: 512
			backgroundColor: '#FFF'
			scrollHorizontal: false
			animationOptions: {time: .15}
			color: '#000'

		@content.backgroundColor = null

		# Colors

		@_colors =
			bright: new Color(@color).alpha(.87)
			high: new Color(@color).alpha(.58)
			dim: new Color(@color).alpha(.54)
			low: new Color(@color).alpha(.38)
			hover: new Color(@_onColor).alpha(.07).desaturate(100)
			select: new Color(@_onColor).alpha(.04).desaturate(100)
			tint: new Color(@_onColor).alpha(.13)
			contrast: new Color(@backgroundColor).alpha(.87)

		# make headers
		@_makeHeaders()

		# turn off scroll component's update content while adding rows...
		@dontUpdateContent = true

		# add rows
		totalRows = if @_scrollable then @_items.length else @_rowsPerPage
		@_addRow(i) for i in [0 ... totalRows]

		# set max for items, to prevent crashes and extremely long load times
		items = if @_items?.length > 50 then @_items[0 ... @_rowsPerPage] else @_items

		# add items
		@addItem(item, false) for item in items

		# populate and sort table
		@build(@_sortColumn, preserveSortDirection = true, sort = @_sorted)

		# turn back on scroll component's update content...
		@dontUpdateContent = false

		# and then update content with new children
		@updateContent()

		# reset y value ( useful if the table has changed height )
		@y = options.y 

		if @width < @getMinimumWidth() then throw "The table '#{@name}' is below its minimum width. Set its width to at least #{@getMinimumWidth()}."
		

	####################
	# private functions:

	_makeHeaders: ->
		startX = if @_selectable then 58 else 24

		@header = new Layer
			name: if @_showNames then 'Header' else '.'
			parent: @
			height: 56, width: @width
			backgroundColor: @backgroundColor
			shadowY: 1, shadowColor: 'rgba(0,0,0,.15)'

		if @_selectable

			@checkbox = new Checkbox
				name: 'Checkbox', parent: @header
				x: 20, y: Align.center
				onColor: @_onColor
				color: @_colors.high ? 'rgba(117, 117, 117, 1.000)'
				disabled: !@_multiselect

			@checkbox.on "change:isOn", (isOn) =>
				item.selected = isOn for item in @items
				@update()

			@on "change:selected", @_testCheckbox

		# Build headers
		@_headers.forEach (header, i) =>

			@headers[i] = new Header
				name: header.title, 
				parent: @header
				x: startX
				animationOptions: @animationOptions
				source: header, 
				table: @, 
				i: i

			startX += @headers[i]._baseWidth + 56
			
			if header.sort?
				@_sortColumn = header.key
				if header.sort is "descending" then @_sortDescending = true


	_addRow: (i) ->
		row = new Row  
			table: @
			i: i


	_filterItems: (items, condition) ->
		return _.filter(items, (item) -> return condition(item))


	_setSort: (sortColumn, preserveSortDirection) ->
		if not preserveSortDirection
			if @_sortColumn is sortColumn then @_sortDescending = !@_sortDescending
			else @_sortDescending = false
			@_sortColumn = sortColumn


	_sortItems: (items, sortColumn = @_sortColumn) ->
		items = _.sortBy(items, (item) ->
			
			item._sortdata = undefined

			if sortColumn.format?
				data = item[sortColumn].property
				item._sortdata = if data or data is 0 then _.defaultTo(sortColumn.format(data, @), '') else ''

			else item._sortdata = item[sortColumn]

			return item._sortdata

			)

		if @_sortDescending then items = _.reverse(items)
		
		return items


	_updateHeaders: -> header.sort(@_sortColumn, @_sortDescending) for header in @headers
			

	_fillCells: (items) ->
		for row, i in @rows
			item = items[@_start + i] ? {isEmpty: true}
			row.fill(item)

			row.checkbox.visible = items[@_start + i]?


	_setWidths: ->

		# first loop through columns:
		for header, i in @_headers

			# reset the header width to its base width
			header.width = @headers[i]._baseWidth

			# start with the header width for colWidth
			header.colWidth = @headers[i].width

			# if cell width is wider than header width, set colWidth to cell width
			for row in @rows
				cell = row._cells[i]
				if cell.width > header.colWidth then header.colWidth = cell.width

			# set header width to colWidth
			@headers[i].width = header.colWidth
			
		# align headers from right to left

		startX = @width - 24

		for header, i in _.reverse(_.tail(@headers))
			header.maxX = startX
			startX -= header.width + 56

		# second loop through columns:
		for header, i in @headers
			
			# change cell widths
			for row in @rows
				cell = row._cells[i]

				# position cells
				if i > 0 then cell.maxX = @headers[i].maxX
				else cell.x = @headers[i].x

	_testCheckbox: ->
		return if not @_multiselect or not @_selectable

		if @items.length is 0
			@checkbox.isOn = false
			@checkbox.disabled = true
		else if _.every(@items, 'selected')
			@checkbox.isOn = true
			@checkbox.icon = 'checkbox-marked'
		else if _.some(@items, 'selected')
			@checkbox.icon = 'minus-box'
			@checkbox.color = @checkbox._offColor
		else
			@checkbox.isOn = false
			@checkbox.icon = 'checkbox-blank-outline'

	

	
	###################
	# public functions:
	
	# get selected
	getSelected: -> return _.filter(@items, 'selected')
	
	# select item
	select: (item) -> item.row.selected = true
	selectAll: -> row.selected = true for row in @rows

	# deselect item
	deselect: (item) -> item.row.selected = false
	deselectAll: -> row.selected = false for row in @rows

	# get minimum width
	getMinimumWidth: ->
		minWidth = if @_selectable then 82 else 48
		minWidth += (@headers.length - 1) * 56
		for header, i in @_headers
			minWidth += header.colWidth

		return minWidth


	# Add item
	addItem: (item, build = true) ->
		@items.push(item)
		if build then @update()
	
	# Remove Item
	removeItem: (item, build = true) ->
		_.pull(@items, item)
		if build then @update()


	# Build table using current data
	build: (sortColumn = @_sortColumn, preserveSortDirection = true, sort = true) ->
		
		# Set sort column and direction
		@_setSort(sortColumn, preserveSortDirection)

		# Update header display
		@_updateHeaders()

		items = @items

		# filter items
		if @_filter
			items = @_filterItems(items, @_filter)

		# sort items
		if sort
			items = @_sortItems(items)

		# update number of items being displayed
		@_totalItems = items.length

		# fill cells
		@_fillCells(items)

		# set widths of cells and headers
		@_setWidths()


	updateContent: ->
		return unless @content
		return if @dontUpdateContent

		# standard updateContent ScrollComponent function (smushed to one line)
		contentFrame = @calculateContentFrame(); @content.width = contentFrame.width; @content.height = contentFrame.height; constraintsFrame = @calculateContentFrame(); constraintsFrame = { x: -constraintsFrame.width + @width - @_contentInset.right, y: -constraintsFrame.height + @height - @_contentInset.bottom, width: constraintsFrame.width + constraintsFrame.width  - @width + @_contentInset.left + @_contentInset.right, height: constraintsFrame.height + constraintsFrame.height - @height + @_contentInset.top + @_contentInset.bottom }; @content.draggable.constraints = constraintsFrame; @scrollPoint = @scrollPoint; if @content.children.length and @content.backgroundColor?.isEqual(Framer.Defaults.Layer.backgroundColor) then @content.backgroundColor = null


	nextPage: ->
		start = @_start
		total = @_totalItems
		perPage = @_rowsPerPage

		newStart = start + perPage

		if newStart > total
			newStart = total - perPage

		@_start = newStart
		@update()

	prevPage: ->
		start = @_start
		total = @_totalItems
		perPage = @_rowsPerPage

		return if start is 0

		start = if start - perPage < 0 then 0 else start - perPage
		@_start = start
		@update()

	update: -> 
		@emit "update", @
		@build(@_sortColumn, preserveSortDirection = true, sort = @_sorted)
		@_testCheckbox()
	
	@define "filter",
		get: -> return @_filter
		set: (filter) ->
			return if @_filter is filter
			@_filter = filter
			@_start = 0

			@update()









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


		# title and header buttons for unselected state

		@menu = new Layer
			name: if @_tableCard._showNames then 'Menu' else '.'
			parent: @
			size: @size
			backgroundColor: @backgroundColor

		@title = new TextLayer
			name: 'Title', parent: @menu
			x: 24, y: 24
			fontSize: 20
			color: @_table._colors.bright
			text: @_tableCard._title

		startX = undefined

		if @_tableCard._headerButtons.length > 0
			@title.visible = false

		for button, i in @_tableCard._headerButtons
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

			newButton.onTap newButton.action

			startX = newButton.maxX + 8

		# header controls

		startX = undefined

		for control, i in _.reverse(@_tableCard._headerControls)
			newControl = new Icon
				parent: @menu
				x: startX ? Align.right(-14)
				y: 24
				color: @_table._colors.dim
				icon: control.icon
				action: control.action

			startX = newControl.x - 48


		# Selected Menu - contextual header for selected items

		@selectedMenu = new Layer
			name: if @_tableCard._showNames then 'Selected Menu' else '.'
			parent: @
			size: @size
			backgroundColor: @_table._colors.tint

		@selectedLabel = new TextLayer
			name: 'Selected'
			parent: @selectedMenu
			y: 24, x: 24
			fontSize: 14, color: @_table._onColor
			text: '{selected} item{plural} selected'

		startX = undefined

		for control, i in _.reverse(@_tableCard._selectedControls)
			newControl = new Icon
				parent: @selectedMenu
				x: startX ? Align.right(-14)
				y: Align.center
				icon: control.icon
				action: control.action
				color: @_table._colors.dim

			startX = newControl.x - 48


	update: =>
		selected = @_table.getSelected().length

		@selectedLabel.template = 
			selected: @_table.getSelected().length
			plural: if selected > 1 then 's' else ''

		isSelected = selected > 0 and @_tableCard._selectedControls.length > 0

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

		@next = new Icon
			parent: @
			x: Align.right(-14), y: Align.center
			icon: 'chevron-right'
			color: @_table._colors.high
			onColor: @_table._colors.high
			action: => @_tableCard.nextPage()

		@prev = new Icon
			parent: @
			x: @next.x - 48, y: Align.center
			icon: 'chevron-left'
			color: @_table._colors.high
			onColor: @_table._colors.high
			action: => @_tableCard.prevPage()

		@currentPage = new TextLayer
			name: 'Current Page', parent: @
			y: Align.center, textAlign: 'right'
			fontSize: 12, color: @_table._colors.high
			text: '{start}-{last} of {total}'

		@rowsPerPageIcon = new Icon
			parent: @
			y: Align.center
			icon: 'menu-down'
			disabled: true
			color: @_table._colors.high
			onColor: @_table._colors.high
			action: => @_tableCard.prevPage()

		@rowsPerPage = new TextLayer
			name: 'Rows Per Page', parent: @
			y: Align.center, textAlign: 'right'
			fontSize: 12, color: @_table._colors.high
			text: '{rowsPerPage}'

		@rowsPerPageLabel = new TextLayer
			name: 'Current Page', parent: @
			y: Align.center, textAlign: 'right'
			fontSize: 12, color: @_table._colors.high
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

		@_footer = options.footer ? true

		@_showNames = options.showNames ? true
		
		@_rawX = options.x
		@_rawY = options.y

		super _.defaults options,
			name: 'Table Card', 
			x: 16, y: 16
			height: 280, width: 512
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
				backgroundColor: @_table.backgroundColor
				color: @_table.color

			# create header controls
			@headerControls = new HeaderControls
				tableCard: @

			# create footer controls
			if @_footer and not @_table._scrollable
				@height += 48
				@footerControls = new FooterControls
					tableCard: @

			# add event listener
			@_table.on "change:selected", @headerControls.update

			# reset properties with options properties (fixes align bugs)
			Utils.delay 0, =>
				@x = @_rawX
				@y = @_rawY

			# update everything
			@update()


	update: ->
		@_table.update()
		@headerControls?.update()
		@footerControls?.update()