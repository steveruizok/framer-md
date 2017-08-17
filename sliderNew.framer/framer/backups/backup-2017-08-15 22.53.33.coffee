
md = require "md"

print md.Theme.designMode

home=new Layer
	size:Screen.size
	backgroundColor: "#fff"
home.bringToFront()	


themeSlider=new md.Slider
	x:30
	y:30
	width:300
	
themeSlider=new md.Slider
	x:30
	y:100
	width:300
	theme: {}