

// set the dimensions and margins of the graph
var margin = {top: 10, right: 30, bottom: 30, left: 60},
    width = 460 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg = d3.select("#chart3")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");


//Read the data
const yearData = d3.csv("ind_year_data.csv");
yearData.then( function(data) {

  // Add X axis
  // var x = d3.scaleLinear()
  //   .domain(data.map(function(d) { return d.Year}))
  //   .range([ 0, width ]);
    var x = d3.time.scale()
        .range([0, width]);

    x.domain(data.map(function(d) { return d.Year}))

     var xAxis = d3.svg.axis()
              .scale(x)
              .orient("bottom")
              .tickFormat(d3.time.format("%Y"));
    svg.append("g")
                      .attr("class", "x axis")
                      .attr("transform", "translate(0," + height + ")")
                      .call(xAxis);
    
  // svg.append("g")
    // .attr("transform", "translate(0," + height + ")")
    // .call(d3.axisBottom(x));

    var counts = d3.map(data, function(d){ return d.Count; }).keys();
  // Add Y axis
  var y = d3.scaleLinear()
    .domain(0, 60)
    .range([ height, 0]);
  svg.append("g")
    .call(d3.axisLeft(y));

  // Add dots
  svg.append('g')
    .selectAll("dot")
    .data(data)
    .enter()
    .append("circle")
      .attr("cx", function (d) { return x(d.Year); } )
      .attr("cy", function (d) { return y(d.Count); } )
      .attr("r", 1.5)
      .style("fill", "#69b3a2")

})

