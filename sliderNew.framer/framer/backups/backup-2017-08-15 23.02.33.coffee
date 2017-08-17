
md = require "md"

home=new Layer
	size:Screen.size
	backgroundColor: "#fff"
home.bringToFront()	

# default, uses design mode
themeSlider=new md.Slider
	x:30
	y:30
	width:300

# single-property over-rides
md.Theme.slider.knob.backgroundColor = 'green'

themeSlider=new md.Slider
	x:30
	y:100
	width:300

# turning off entire design mode
md.Theme.designMode = false
	
themeSlider=new md.Slider
	x:30
	y:170
	width:300

# setting custom properties
themeSlider=new md.Slider
	x:30
	y:240
	width:300
	theme:
		knob:
			backgroundColor: 'red'

# eventually, we'll build in the option to do complete custom themes in code and drop them in using something like Theme.setTheme(myTheme).