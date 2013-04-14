//@ sourceMappingURL=main.map
// Generated by CoffeeScript 1.6.1
(function() {
  var Controls, DataTransfer, Graph, Metric,
    __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  Controls = (function() {
    var update_start_date, update_y_range;

    function Controls() {
      this.metric_form = "<form id=\"metrics_form\" >\n	<fieldset>\n		<ul>\n			<li><label>Metric</label><input id=\"metric_name_in\" /><br /></li>\n			<li><label>Tags</label>\n				<ul id=\"tag_ul\" >\n					<li class=\"tag_li\"><label><select></select></label><input type=\"text\" /></li>\n\n				</ul></li>\n\n		</ul>\n	</fieldset>\n</form>";
      this.tag_li = '<li class="tag_li"><select></select><input type="text" /></li>';
      this.add_metric_tab();
    }

    Controls.prototype.add_metric_tab = function() {
      return d3.select('#new_metric').on('click', function(d, i) {
        var linki, newdiv, newli;
        linki = i;
        d3.selectAll('.tablink').classed('tablactive', false);
        d3.selectAll('.tab').classed('tabactive', false);
        newli = d3.select('#tablinks').insert('li', '#new_metric').text('new metric').classed('tablink', true).classed('tablactive', true);
        newdiv = d3.select('#tabs').insert('div', '#new_metric_div').html(this.metric_form).classed('tab', true).classed('tabactive', true);
        return d3.selectAll('.tablink').on('click', function(d, i) {
          linki = i;
          d3.selectAll('.tablink').classed('tablactive', false);
          d3.select(this).classed('tablactive', true);
          return d3.selectAll('.tab').classed('tabactive', function(d, i) {
            if (linki === i) {
              return true;
            } else {
              return false;
            }
          });
        });
      });
    };

    update_start_date = function() {};

    update_y_range = function() {};

    return Controls;

  })();

  Graph = (function() {
    var height, width;

    width = 1000;

    height = 500;

    function Graph(width, height) {
      this.width = width;
      this.height = height;
      generate_graph();
    }

    Graph.prototype.generate_graph = function() {};

    Graph.prototype.width = function(value) {
      if (!arguments.length) {
        return this.width;
      } else {
        this.width = value;
      }
      return generate_graph;
    };

    Graph.prototype.construct_svg = function() {
      return d3.select('#data').append('svg').attr('width', width.attr('height', height));
    };

    Graph.prototype.construct_canvas = function() {
      return d3.select('#data').append('canvas').attr('width', width.attr('height', height));
    };

    return Graph;

  })();

  $(function() {
    var controls, url;
    controls = new Controls();
    url = new DataTransfer('/data/metrics');
    url.get_data();
    return setTimeout(function() {
      return console.log(url.metrics_list);
    }, 1000);
  });

  DataTransfer = (function() {

    DataTransfer.prototype.metrics_list = {};

    function DataTransfer(url) {
      this.url = url;
    }

    DataTransfer.prototype.format_row = function(row) {
      var metric, point, rarray, tn, tv, _ref, _ref1;
      rarray = row.split(' ');
      metric = (_ref = rarray[0], __indexOf.call(Metric.names, _ref) < 0) ? new Metric(rarray[0]) : this.metrics_list[rarray[0]];
      this.metrics_list[rarray[0]] = metric;
      point = {
        'timestamp': new Date(+rarray[1] * 1000),
        'value': rarray[2],
        'tags': {}
      };
      rarray.map(function(elem) {
        if (__indexOf.call(elem, '=') >= 0) {
          return point['tags'][elem.split('=')[0]] = elem.split('=')[1];
        }
      });
      _ref1 = point['tags'];
      for (tn in _ref1) {
        tv = _ref1[tn];
        metric.add_tag(tn, tv);
      }
      return metric.add_point(point);
    };

    DataTransfer.prototype.get_data = function() {
      var self;
      self = this;
      return d3.text(this.url, function(error, data) {
        var row, _i, _len, _ref, _results;
        _ref = data.split('\n');
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          row = _ref[_i];
          _results.push(self.format_row(row));
        }
        return _results;
      });
    };

    return DataTransfer;

  })();

  Metric = (function() {

    Metric.names = [];

    function Metric(name, data, tags) {
      this.data = data != null ? data : [];
      this.tags = tags != null ? tags : {};
      Metric.names.push(name);
    }

    Metric.prototype.add_point = function(point) {
      return this.data.push(point);
    };

    Metric.prototype.add_tag = function(tag_name, tag_value) {
      if (this.tags[tag_name] == null) {
        return this.tags[tag_name] = [tag_value];
      } else {
        if (__indexOf.call(this.tags[tag_name], tag_value) < 0) {
          return this.tags[tag_name].push(tag_value);
        }
      }
    };

    Metric.prototype.construct_time_scales = function() {
      var d, self;
      self = this;
      this.time_scale = d3.time.scale().domain(d3.extent((function() {
        var _i, _len, _ref, _results;
        _ref = self.data;
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          d = _ref[_i];
          _results.push(d['timestamp']);
        }
        return _results;
      })())).range(['0px', '1000px']);
      return console.log(this.time_scale(new Date(1365074228 * 1000), new Date));
    };

    Metric.prototype.construct_value_scales = function() {
      var d, self;
      self = this;
      this.value_scale = d3.scale.linear().domain(d3.extent((function() {
        var _i, _len, _ref, _results;
        _ref = self.data;
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          d = _ref[_i];
          _results.push(d['value']);
        }
        return _results;
      })())).range(['0px', '600px']);
      return console.log(this.value_scale(87.71333333333334));
    };

    Metric.prototype.time_pixel = function(timestamp) {
      return this.time_scale(new Date(timestamp * 1000));
    };

    Metric.prototype.pixel_time = function(pixel) {
      return this.time_scale.invert(pixel);
    };

    return Metric;

  })();

}).call(this);
