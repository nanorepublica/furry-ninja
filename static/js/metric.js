//@ sourceMappingURL=metric.map
// Generated by CoffeeScript 1.6.1
(function() {
  var Metric;

  Metric = (function() {

    Metric.prototype.data = [];

    Metric.names = [];

    function Metric(name) {
      Metric.names.push(name);
      console.log('time scales...');
      this.construct_time_scale;
    }

    Metric.prototype.add_point = function(point) {
      return this.data.push(point);
    };

    Metric.prototype.construct_time_scale = function() {
      var d, self, timestamps, _i, _len, _ref;
      self = this;
      _ref = this.data;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        d = _ref[_i];
        timestamps = d['timestamp'];
      }
      this.time_scale = d3.time.scale.domain([d3.min(timestamps, d3.max(timestamps))].range(['0px', '1000px']));
      return console.log(this.time_scale);
    };

    return Metric;

  })();

}).call(this);