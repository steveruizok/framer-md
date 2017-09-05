# 	888888ba  oo          oo       dP
# 	88    `8b                      88
# 	88     88 dP dP   .dP dP .d888b88 .d8888b. 88d888b.
# 	88     88 88 88   d8' 88 88'  `88 88ooood8 88'  `88
# 	88    .8P 88 88 .88'  88 88.  .88 88.  ... 88
# 	8888888P  dP 8888P'   dP `88888P8 `88888P' dP

{ Theme } = require 'md-components/Theme'

exports.Divider = Divider = class Divider extends Layer
	constructor: (options = {}) ->
		super _.defaults options,
			name: '.'
			width: options.parent?.width ? 200, height: 1,
			backgroundColor: Theme.divider.backgroundColor