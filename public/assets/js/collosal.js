var Graph, Plot, Scatter, SlopeInterceptLine,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Graph = (function() {
  function Graph(height, width, name, axis_labels, domain) {
    this.height = height;
    this.width = width;
    this.name = name != null ? name : "default";
    this.axis_labels = axis_labels != null ? axis_labels : {
      x: "X",
      y: "Y"
    };
    this.domain = domain != null ? domain : {
      x: [],
      y: []
    };
    this.scale = {
      x: d3.scale.linear().domain(this.domain.x).range([0, this.width]),
      y: d3.scale.linear().domain(this.domain.y).range([this.height, 0])
    };
    this.value = {
      x: function(d) {
        return console.log("#overide");
      },
      y: function(d) {
        return console.log("#overide");
      }
    };
    this.axis = {
      x: d3.svg.axis().scale(this.scale.x).orient("bottom"),
      y: d3.svg.axis().scale(this.scale.y).orient("left")
    };
    this.map = {
      x: (function(_this) {
        return function(d) {
          return _this.scale.x(_this.value.x(d));
        };
      })(this),
      y: (function(_this) {
        return function(d) {
          return _this.scale.y(_this.value.y(d));
        };
      })(this)
    };
    this.container = d3.select('.container').append("div").attr("id", this.name.split(' ').join('-')).attr("class", "chart");
    this.title = this.container.append("div").attr("class", "title").text(this.name);
    this.svg = this.container.append("svg").attr("height", height).attr("width", width).append("g");
    this.svg.append("g").attr("class", "x axis").attr("transform", "translate(4," + this.height + ")").call(this.axis.x).append("text").attr("class", "label").attr("x", this.width).attr("y", -6).style("text-anchor", "end").text(this.axis_labels.x);
    this.svg.append("g").attr("class", "y axis").call(this.axis.y).attr("transform", "translate(4,0)").append("text").attr("class", "label").attr("transform", "rotate(-90)").attr("y", 16).style("text-anchor", "end").text(this.axis_labels.y);
  }

  return Graph;

})();

Plot = (function() {
  function Plot(graph, data, attributes, styles) {
    this.graph = graph;
    this.data = data;
    this.attributes = attributes != null ? attributes : {};
    this.styles = styles != null ? styles : {};
    this.plot = void 0;
  }

  Plot.prototype.show = function(transition) {
    if (transition == null) {
      transition = "fadeIn";
    }
    return this.plot.attr("class", "animated " + transition);
  };

  Plot.prototype.hide = function(transition) {
    if (transition == null) {
      transition = "fadeOut";
    }
    return this.plot.attr("class", "animated " + transition);
  };

  return Plot;

})();

Scatter = (function(_super) {
  __extends(Scatter, _super);

  function Scatter() {
    return Scatter.__super__.constructor.apply(this, arguments);
  }

  Scatter.prototype.draw = function() {
    var k, selectAllClass, v, _ref, _ref1, _results;
    if (!this.attributes["class"]) {
      console.warn("No class defined in attributes in graph : " + this.graph.name);
    } else {
      selectAllClass = this.attributes["class"].split(' ').join('_');
      this.plot = this.graph.svg.selectAll("." + selectAllClass).data(this.data).enter().append("circle");
      _ref = this.attributes;
      for (k in _ref) {
        v = _ref[k];
        this.plot.attr(k, v);
      }
      _ref1 = this.styles;
      _results = [];
      for (k in _ref1) {
        v = _ref1[k];
        _results.push(this.plot.attr(k, v));
      }
      return _results;
    }
  };

  return Scatter;

})(Plot);

SlopeInterceptLine = (function(_super) {
  __extends(SlopeInterceptLine, _super);

  function SlopeInterceptLine() {
    return SlopeInterceptLine.__super__.constructor.apply(this, arguments);
  }

  SlopeInterceptLine.prototype.draw = function(transition) {
    var k, v, _ref, _ref1, _results;
    if (transition == null) {
      transition = "fadeIn";
    }
    this.plot = this.graph.svg.append("svg:line").attr("class", "animated " + transition).attr("x1", 0).attr("y1", this.graph.scale.y(this.data.intercept)).attr("x2", this.graph.scale.x(this.graph.domain.x[1])).attr("y2", this.graph.scale.y(this.graph.domain.x[1] * this.data.slope + this.data.intercept)).style("stroke-width", 1.5);
    this.show();
    _ref = this.attributes;
    for (k in _ref) {
      v = _ref[k];
      this.plot.attr(k, v);
    }
    _ref1 = this.styles;
    _results = [];
    for (k in _ref1) {
      v = _ref1[k];
      _results.push(this.plot.attr(k, v));
    }
    return _results;
  };

  return SlopeInterceptLine;

})(Plot);
