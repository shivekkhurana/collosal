
class Graph
	constructor : (@height, @width, @name="default", @axis_labels ={x:"X", y:"Y"}, @domain={x:[], y:[]})->
		@scale = 
			x : d3.scale.linear().domain(@domain.x).range([0, @width])
			y : d3.scale.linear().domain(@domain.y).range([@height, 0])

		@value =
			x : (d)->
				console.log "#overide"
			y : (d) ->
				console.log "#overide"

		@axis =
			x : d3.svg.axis().scale(@scale.x).orient("bottom")
			y : d3.svg.axis().scale(@scale.y).orient("left")

		@map = 
			x: (d) => 
				@scale.x( @value.x(d) )

			y: (d) =>
				@scale.y( @value.y(d) )

		@container = d3.select('.container')
						.append("div")
						.attr("id", @name.split(' ').join('-'))
						.attr("class", "chart")
				
		@title = @container.append("div")
							.attr("class", "title")
							.text(@name)

		@svg = @container.append("svg")
				.attr("height", height)
				.attr("width", width)
				.append("g");

		@svg.append("g")
			.attr("class", "x axis")
			.attr("transform", "translate(4," + @height + ")")
			.call(@axis.x)
			.append("text")
			.attr("class", "label")
			.attr("x", @width)
			.attr("y", -6)
			.style("text-anchor", "end")
			.text(@axis_labels.x);

		@svg.append("g")
			.attr("class", "y axis")
			.call(@axis.y)
			.attr("transform", "translate(4,0)")
			.append("text")
			.attr("class", "label")
			.attr("transform", "rotate(-90)")
			.attr("y", 16)
			.style("text-anchor", "end")
			.text(@axis_labels.y);


class Plot
	constructor : (@graph, @data, @attributes={}, @styles={})->
		@plot = undefined

	show : (transition = "fadeIn") ->
			@plot.attr("class", "animated #{transition}")

	hide : (transition = "fadeOut") ->
		@plot.attr("class", "animated #{transition}")


class Scatter extends Plot
	draw : () ->
		if not @attributes.class
			console.warn "No class defined in attributes in graph : #{@graph.name}"
			return
		else 
			selectAllClass = @attributes.class.split(' ').join('_')
			@plot = @graph.svg
						.selectAll(".#{selectAllClass}")
						.data(@data)
						.enter()
						.append("circle")
				
			for k, v of @attributes
				@plot.attr(k, v)

			for k, v of @styles
				@plot.attr(k,v)
				

class SlopeInterceptLine extends Plot
	draw : (transition = "fadeIn") ->
		@plot = @graph.svg
					.append("svg:line")
					.attr("class", "animated #{transition}")
					.attr("x1", 0)
					.attr("y1", @graph.scale.y(@data.intercept) )
					.attr("x2", @graph.scale.x( @graph.domain.x[1] ) )
					.attr("y2", @graph.scale.y( @graph.domain.x[1]*@data.slope + @data.intercept) )
					.style("stroke-width", 1.5)

		@show() #animate

		for k, v of @attributes
			@plot.attr(k, v)

		for k, v of @styles
			@plot.attr(k,v)

