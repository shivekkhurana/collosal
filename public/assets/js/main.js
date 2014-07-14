var baseUrl = "http://127.0.0.1:8080";
var d = new DimensionsHelper();

function log(i){
	console.log(i);
}

function male_vs_female_corr(){
	var name 	= "Personality Correlation";
	var sH = new ScatterPlotHelper();

	var g = new Graph(d.height, d.width, name, {x:"Male", y:"Female"}, {x:[-1, 17], y:[-1, 17]});
	g.value.x = sH.value.x;
	g.value.y = sH.value.y;

	d3.json(baseUrl+"/couple/codes", function(error, data){
		if (error){
			console.warn(error)	
		}	
		else {
			var attr = sH.attr;
			attr.cx = g.map.x;
			attr.cy = g.map.y;
			attr.class = "dot";
			var style = sH.style;
			
			var s = new Scatter(g, data.c_data, attr, style);
			s.draw()
		}
	});
}

male_vs_female_corr()

function male_vs_female_sphere(name){
	var sH = new ScatterPlotHelper();

	var g = new Graph(d.height, d.width, name, {x:"Male", y:"Female"}, {x:[-10, 101], y:[-10, 101]});
	g.value.x = sH.value.x;
	g.value.y = sH.value.y;

	d3.json(baseUrl+"/couple/personality?sphere="+name, function(error, data){
		if (error){
			console.warn(error)	
		}	
		else {
			var attr = sH.attr;
			attr.cx = g.map.x;
			attr.cy = g.map.y;
			attr.class = "dot supplement "+name;
			
			var style = sH.style;

			var sSupplement = new Scatter(g, data.s_data, attr, style);
			sSupplement.draw()

			var suppRegLine = new SlopeInterceptLine(g, data.regression.supplement, {}, style);
			suppRegLine.draw();


			attr.class = "dot compliment "+name;
			style.fill = "#EB485A";
			style.stroke = "#f28591";
			
			attr.cy = function (d){
				return g.scale.y(100-g.value.y(d));	 
			}

			var sCompliment = new Scatter(g, data.s_data, attr, style);
			sCompliment.draw()

			var compRegLine = new SlopeInterceptLine(g, data.regression.compliment, {}, style);
			compRegLine.draw();
		}
	});
}

male_vs_female_sphere("extrovert")
male_vs_female_sphere("intuition")
male_vs_female_sphere("feeling")
male_vs_female_sphere("perceiving")