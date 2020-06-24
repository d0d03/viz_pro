var width = document.body.clientWidth;
var height = document.body.offsetHeight;

var stop = false;

var n = 250;
var x = d3.scaleLinear().domain([0, n]).range([height,width-height]);
var y = d3.scaleLinear().domain([0, n]).range([0,height]);
var data = d3.shuffle(d3.range(n));
var duration = 0.5;
var colors = d3.scaleSequential().interpolator(d3.interpolateRainbow).domain([0,n]);

var svg = d3.select("main").append("svg")
    .attr("width",width)
    .attr("height", height)
    .attr("style","margin:50");

var line = svg.selectAll("line")
    .data(data)
    .enter()
    .append("line")
    .attr("x1",0)
    .attr("y1",0)
    .attr("x2",0)
    .attr("y2", function(d){return y(d);})
    .attr("class", function(d){ return "line" + d; })
    .attr("stroke",function(d){ return colors(d); })
    .attr("transform",function(d,i){ return "translate(" + x(i) + ")";});