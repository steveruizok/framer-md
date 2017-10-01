Theme = require 'md-components/Theme'

# 	d888888P                                                                dP
# 	   88                                                                   88
# 	   88    dP    dP 88d888b. .d8888b. .d8888b. 88d888b. .d8888b. 88d888b. 88d888b. dP    dP
# 	   88    88    88 88'  `88 88'  `88 88'  `88 88'  `88 88'  `88 88'  `88 88'  `88 88    88
# 	   88    88.  .88 88.  .88 88.  .88 88.  .88 88       88.  .88 88.  .88 88    88 88.  .88
# 	   dP    `8888P88 88Y888P' `88888P' `8888P88 dP       `88888P8 88Y888P' dP    dP `8888P88
# 	              .88 88                     .88                   88                     .88
# 	          d8888P  dP                 d8888P                    dP                 d8888P

Utils.insertCSS(
	"""
    @font-face {
      font-family: "Roboto";
      src: url("modules/md-fonts/Roboto-Regular.ttf");
    """)

class exports.Headline extends TextLayer
	constructor: (options) ->
		super _.defaults options,
			name: '.'
			fontFamily: 'Roboto'
			fontSize: 24
			fontWeight: 400
			lineHeight: 1.3
			color: 'rgba(0,0,0,.87)'

class exports.Subhead extends TextLayer
	constructor: (options) ->
		super _.defaults options,
			name: '.'
			fontFamily: 'Roboto'
			fontSize: 16
			fontWeight: 400, 
			lineHeight: 1.5,
			color: 'rgba(0,0,0,.54)'

class exports.Title extends TextLayer
	constructor: (options) ->
		super _.defaults options,
			name: '.'
			fontFamily: 'Roboto'
			fontSize: 20
			fontWeight: 500
			lineHeight: 1.3
			color: 'rgba(0,0,0,.87)'
class exports.Regular extends TextLayer
	constructor: (options) ->
		super _.defaults options,
			name: '.'
			fontFamily: 'Roboto'
			fontSize: 16
			fontWeight: 400
			lineHeight: 1.3
			color: 'rgba(0,0,0,.87)'
class exports.Body2 extends TextLayer
	constructor: (options) ->
		super _.defaults options,
			name: '.'
			fontFamily: 'Roboto'
			fontSize: 14
			fontWeight: 500
			lineHeight: 1.3
			color: 'rgba(0,0,0,.87)'
class exports.Menu extends TextLayer
	constructor: (options) ->
		super _.defaults options,
			name: '.'
			fontFamily: 'Roboto'
			fontSize: 14
			fontWeight: 500
			lineHeight: 1.7
			color: 'rgba(0,0,0,.87)'
class exports.Body1 extends TextLayer
	constructor: (options) ->
		super _.defaults options,
			name: '.'
			fontFamily: 'Roboto'
			fontSize: 14
			fontWeight: 400
			lineHeight: 1.4
			color: 'rgba(0,0,0,.87)'
class exports.Caption extends TextLayer
	constructor: (options) ->
		super _.defaults options,
			name: '.'
			fontFamily: 'Roboto'
			fontSize: 12
			fontWeight: 400
			lineHeight: 1.3
			color: 'rgba(0,0,0,.54)'
class exports.Button extends TextLayer
	constructor: (options) ->
		super _.defaults options,
			name: '.'
			fontFamily: 'Roboto'
			fontSize: 14
			fontWeight: 500
			lineHeight: 1.3
			color: '#009688'
			letterSpacing: 0.5
			padding: {left: 4, right: 4, top: 8, bottom: 0},