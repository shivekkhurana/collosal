class DimensionsHelper
	constructor : () ->
		@height = 0.8*$(window).height()
		@width 	= @height

class ScatterPlotHelper
	constructor : () ->
		@value = 
			x : (d) ->
				d.male
			y : (d) ->
				d.female

		@attr =
			r : (d) ->
				d.freq*8

		@style = 
			fill 	: "#a4e8da",
			stroke	: "#daf6f0",
			"stroke-width"	: 3
