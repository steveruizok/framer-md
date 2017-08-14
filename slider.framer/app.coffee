
md = require "md"

home=new Layer
	size:Screen.size
	backgroundColor: "#fff"
home.bringToFront()	
customSlider = new md.Slider
	width:300
	parent:home
	custom:true
	x:20
	y:20
themedlider = new md.Slider
	width:300
	parent:home
	x:20
	y:120

