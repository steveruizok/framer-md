
md = require "md"

home=new Layer
	size:Screen.size
	backgroundColor: "#fff"
home.bringToFront()	


themeSlider=new md.Slider
	x:30
	y:30
	width:300


customSlider=new md.Slider
	x:30
	y:200
	width:300
	custom:true

