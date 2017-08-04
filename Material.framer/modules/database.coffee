
# 	      dP            dP            dP
# 	      88            88            88
# 	.d888b88 .d8888b. d8888P .d8888b. 88d888b. .d8888b. .d8888b. .d8888b.
# 	88'  `88 88'  `88   88   88'  `88 88'  `88 88'  `88 Y8ooooo. 88ooood8
# 	88.  .88 88.  .88   88   88.  .88 88.  .88 88.  .88       88 88.  ...
# 	`88888P8 `88888P8   dP   `88888P8 88Y8888' `88888P8 `88888P' `88888P'


database =

	chatBubbles: []

	choices:
		language: undefined
		rule1: undefined
		rule2: undefined
		rule3: undefined
		earlyExit1: undefined
		earlyExit2: undefined

	removeChatBubble: (chatBubble) ->
		_.pull(@chatBubbles, chatBubble)
		chatBubble.destroy()

	user:
		name: 'Victor Ivanovich'
		age: 42
		sex: "M"
		image: "images/user.png"
		languages: ["english", "german"]
		history: []
		note: "When you look at it, it looks like any other piece of land. The sun shines on it like on any other part of the earth. And it's as though nothing had particularly changed in it. Like everything was the way it was thirty
years ago. My father, rest his soul, could  look at it and not notice anything out of place at all. Except maybe"

	addHistory: (item) ->
		@user.history.push(item)
		item.timeStamp = _.now()

	invitations: []
	events: []
	locations: []



exports.database = database



# 	dP                   oo   dP              dP   oo
# 	88                        88              88
# 	88 88d888b. dP   .dP dP d8888P .d8888b. d8888P dP .d8888b. 88d888b.
# 	88 88'  `88 88   d8' 88   88   88'  `88   88   88 88'  `88 88'  `88
# 	88 88    88 88 .88'  88   88   88.  .88   88   88 88.  .88 88    88
# 	dP dP    dP 8888P'   dP   dP   `88888P8   dP   dP `88888P' dP    dP
# 	
# 	

class Invitation
	constructor: (options) ->
		@name = options.name ? 'New Invitation'
		@event = options.event ? new Event
		@location = @event.location
		@startTime = @event.startTime



# 	dP                                     dP   oo
# 	88                                     88
# 	88        .d8888b. .d8888b. .d8888b. d8888P dP .d8888b. 88d888b.
# 	88        88'  `88 88'  `"" 88'  `88   88   88 88'  `88 88'  `88
# 	88        88.  .88 88.  ... 88.  .88   88   88 88.  .88 88    88
# 	88888888P `88888P' `88888P' `88888P8   dP   dP `88888P' dP    dP

class Location
	constructor: (options) ->
		@name = options.name ? 'Location'



# 	 88888888b                              dP
# 	 88                                     88
# 	a88aaaa    dP   .dP .d8888b. 88d888b. d8888P
# 	 88        88   d8' 88ooood8 88'  `88   88
# 	 88        88 .88'  88.  ... 88    88   88
# 	 88888888P 8888P'   `88888P' dP    dP   dP


class Event
	constructor: (options) ->
		@name = options.name ? 'New Event'
		@location = options.location ? new Location
		@startTime = options.startTime ? new Date(_.now() + 360000)





