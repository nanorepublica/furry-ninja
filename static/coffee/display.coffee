# display.coffee 
# concerned with the construction of the graphs and updating them/ main interaction with d3
# calculating areas for graphs - so scales can be calculated

class Graph
	width = 1000
	height = 500

	constructor: (@width, @height) ->
		# backend for contecting data to elements using d3
		generate_graph()

	generate_graph: () ->
		# generate graph here
		# if webkit - svg, firefox - canvas, ie -?
		# add axes, legend (if selected)
		# draw each metric or point?

	width: (value) ->
		if not arguments.length then return @width else @width = value
		return generate_graph
	
	


	construct_svg: () ->
		d3.select('#data').append('svg')
			.attr 'width', width
			.attr 'height', height

	construct_canvas: () ->
		d3.select('#data').append('canvas')
			.attr 'width', width
			.attr 'height', height


	