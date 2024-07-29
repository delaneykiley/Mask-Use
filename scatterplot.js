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

// load data
const movie_data = d3.csv("ind_year_data.csv");
movie_data.then(function(data) {
  data.forEach(function(d) {
    d.Count = +d.Count;
    var parser = d3.timeParse("%Y");
    d.Year = parser(d.Year);
  });

    // create x axis
    var x = d3.scaleTime()
      .domain(d3.extent(data, function(d) { return d.Year; }))
      .range([ 0, width ]);
    svg.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x));

    // create y axis
    var y = d3.scaleLinear()
      .domain([0, d3.max(data, function(d) { return d.Count; })])
      .range([ height, 0 ]);
    svg.append("g")
      .call(d3.axisLeft(y));

        // Add the line
    svg.append("path")
      .data(data)
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-width", 1.5)
      .attr("d", d3.line()
        .x(function(d) { return x(d.Year) })
        .y(function(d) { return y(d.Count) })
        )

      // Add dots
  // svg.append('g')
  //   .selectAll("dot")
  //   .data(data)
  //   .enter()
  //   .append("circle")
  //     .attr("cx", function (d) { return x(d.Year); } )
  //     .attr("cy", function (d) { return y(d.Count); } )
  //     .attr("r", 1.5)
  //     .style("fill", "#69b3a2")
    

    
    
});

// structure of this graph inspired by information at https://d3-graph-gallery.com/graph/line_basic.html
