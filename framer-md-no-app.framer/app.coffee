### Notes / Todo

REFERENCE:
https://material.io/guidelines/
https://materialdesignicons.com/

###

md = require "md"
Screen.backgroundColor = 'efefef'


class Page extends Layer
	constructor: (options = {}) ->
		
		super _.defaults options,
			size: Screen.size
			backgroundColor: Screen.backgroundColor
	
	addToStack: (layers) =>
		if typeof layers is 'object' then layers = [layers]
		for layer in layers
			@stack.push(layer)
		
		@stackView()
		
	removeFromStack: (layer) =>
		_.pull(@stack, layer)
	
	# Stack layers in stack, with optional padding and animation
	stackView: (animate = false, padding = 16, top = 32, animationOptions = {time: .25}) =>
		
		for layer, i in @stack
			if animate is true
				if i is 0 then layer.animate
					y: top
					options: animationOptions
					
				else layer.animate
					y: @stack[i - 1].maxY + padding
					options: animationOptions
			else
				if i is 0 then layer.y = top
				else layer.y = @stack[i - 1].maxY + padding
				
		@updateContent()
		
	build: (func) -> do _.bind(func, @)

	refresh: ->
		for card in @cards
			card.refresh()
		@stackView()

# Component Tests without App Structure

page = new Page

new md.Headline
new md.Subhead
new md.Title
new md.Regular
new md.Menu
new md.Body1
new md.Body2
new md.Caption
