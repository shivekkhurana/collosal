var DimensionsHelper, ScatterPlotHelper;

DimensionsHelper = (function() {
  function DimensionsHelper() {
    this.height = 0.8 * $(window).height();
    this.width = this.height;
  }

  return DimensionsHelper;

})();

ScatterPlotHelper = (function() {
  function ScatterPlotHelper() {
    this.value = {
      x: function(d) {
        return d.male;
      },
      y: function(d) {
        return d.female;
      }
    };
    this.attr = {
      r: function(d) {
        return d.freq * 8;
      }
    };
    this.style = {
      fill: "#a4e8da",
      stroke: "#daf6f0",
      "stroke-width": 3
    };
  }

  return ScatterPlotHelper;

})();
