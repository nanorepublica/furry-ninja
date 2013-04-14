# controls.coffee
# this file handles the form elements that control the graph - start date/time, legend shown etc

class Controls
	constructor: () ->
		# create the initial controls
		@metric_form = """
						<form id="metrics_form" >
							<fieldset>
								<ul>
									<li><label>Metric</label><input id="metric_name_in" /><br /></li>
									<li><label>Tags</label>
										<ul id="tag_ul" >
											<li class="tag_li"><label><select></select></label><input type="text" /></li>

										</ul></li>

								</ul>
							</fieldset>
						</form>
					   """
		@tag_li = '<li class="tag_li"><select></select><input type="text" /></li>'
		# d3.select('#tag_ul').html(@tag_li)
		@add_metric_tab()

	add_metric_tab: () ->
		d3.select('#new_metric').on 'click', (d,i) ->
			linki = i
			d3.selectAll('.tablink').classed 'tablactive', false
			d3.selectAll('.tab').classed 'tabactive', false
			newli = d3.select('#tablinks')
				.insert('li', '#new_metric')
				.text('new metric')
				.classed('tablink', true)
				.classed 'tablactive', true
			newdiv = d3.select('#tabs')
				.insert('div','#new_metric_div')
				.html(@metric_form)
				.classed('tab', true)
				.classed('tabactive', true)
				
			d3.selectAll('.tablink').on 'click', (d,i) ->
				linki = i
				d3.selectAll('.tablink').classed 'tablactive', false
				d3.select(this).classed 'tablactive', true
				d3.selectAll('.tab').classed 'tabactive', (d,i) ->
					if linki == i then true else false
	
	update_start_date = () ->
		# get start date either from graph itself or from date select

	update_y_range = () ->
		# update_y_range either from graph itself of from a form element



