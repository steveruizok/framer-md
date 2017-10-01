
# 	 .88888.           oo       dP dP        oo            dP
# 	d8'   `88                   88 88                      88
# 	88        88d888b. dP .d888b88 88        dP .d8888b. d8888P
# 	88   YP88 88'  `88 88 88'  `88 88        88 Y8ooooo.   88
# 	Y8.   .88 88       88 88.  .88 88        88       88   88
# 	 `88888'  dP       dP `88888P8 88888888P dP `88888P'   dP

Type = require 'md-components/Type'
{ Ripple } = require 'md-components/Ripple'
{ Icon } = require 'md-components/Icon'
{ Theme } = require 'md-components/Theme'

exports.GridList = class GridList extends Layer
	constructor: (options = {}) ->
		
		@_columns = options.columns ? 2
		
		super _.defaults options,
			name: '.'
			width: Screen.width
			backgroundColor: null
		
		@tiles = []
		@tileWidth = (@width - 24) / @_columns
		@tileHeight = options.tileHeight ? Screen.width / @_columns
		
	addTile: (tile) ->
		tile.i = @tiles.length
		tile.gridList = @
		@tiles.push(tile)
		
		tile.x = 8 + (@tileWidth + 8) * (tile.i % @_columns)
		tile.y = 8 + (@tileHeight + 8) * Math.floor(tile.i / @_columns)

		@height = _.last(@tiles).maxY

		if @parent?.parent?.content? then @parent.parent.updateContent()
	
	removeTile: (tile) ->
		_.pull(@tiles, tile)
		tile.destroy()
		@repositionTiles()

	repositionTiles: ->
		for tile, i in @tiles
			tile.i = i
			tile.animate
				x: 8 + (@tileWidth + 8) * (tile.i % @_columns)
				y: 8 + (@tileHeight + 8) * Math.floor(tile.i / @_columns)
		@height = _.last(@tiles).maxY

		if @parent?.parent?.content? then @parent.parent.updateContent()
