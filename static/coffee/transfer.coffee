# transfer.coffee
# functions/classes here construct the url and then get the relevant data from the server and parse it
# metrics_list = {}
$ ->	
	#this should change at some point when wanting to form actual url..
	controls = new Controls()
	url = new DataTransfer('/data/metrics')
	url.get_data()
	setTimeout () ->
		console.log url.metrics_list
		# url.metrics_list['tsd.hbase.rpcs'].construct_time_scales()
		# url.metrics_list['tsd.hbase.rpcs'].construct_value_scales()
	, 1000


#start=2013/04/04-10:59:00&
#m=sum:5m-avg:rate:tsd.hbase.rpcs{host=*,type=*}&
#o=&
#yrange=[0:]&
#wxh=1900x764 (optional i guess for just data)

# different name...
class DataTransfer
	metrics_list: {}

	constructor: (@url) ->
		# class the constructs the url and gets data passing it to the metric class
	
	format_row: (row) -> 
		rarray = row.split ' '
		metric = if rarray[0] not in Metric.names then new Metric(rarray[0]) else @metrics_list[rarray[0]]
		@metrics_list[rarray[0]] = metric
		point = 'timestamp': new Date(+rarray[1] * 1000), 'value': rarray[2], 'tags': {}
		rarray.map (elem) -> if '=' in elem then point['tags'][elem.split('=')[0]] = elem.split('=')[1]
		metric.add_tag tn, tv for tn, tv of point['tags']
		metric.add_point point


	get_data: () ->
		self = @
		d3.text @url, (error, data) -> 
			self.format_row row for row in data.split('\n')

	



	
