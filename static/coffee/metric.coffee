# metric.coffee
# file for class containing Metric - this should handle all processing done on a Metric

# provide helper functions - get time range, get points given range, integrate with d3 - give scale etc..
# Metric = exports ? this


class Metric
	@names: []

	constructor: (name, @data = [], @tags = {}) -> 
		Metric.names.push name
		# Class to get data from the server and construct metrics from it?

	add_point: (point) ->
		@data.push point

	add_tag: (tag_name, tag_value) ->
		if not @tags[tag_name]?
			@tags[tag_name] = [tag_value]
		else
			@tags[tag_name].push tag_value if tag_value not in @tags[tag_name]

	construct_time_scales: () ->
		self = @
		@time_scale = d3.time.scale()
			.domain(d3.extent (d['timestamp'] for d in self.data) )
			.range ['0px','1000px'] # this needs to calculated from the display
		console.log @time_scale(new Date(1365074228 * 1000), new Date)

	construct_value_scales: () ->
		self = @
		@value_scale = d3.scale.linear()
			.domain(d3.extent (d['value'] for d in self.data))
			.range ['0px', '600px']
		console.log @value_scale(87.71333333333334)

	time_pixel: (timestamp) ->
		@time_scale(new Date(timestamp * 1000))

	pixel_time: (pixel) ->
		@time_scale.invert(pixel)

	
