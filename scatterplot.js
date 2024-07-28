// set margins and dimensions of graph
var margin = {
     top: 20,
     right: 20,
     bottom: 30,
     left: 40
}
width = 700 - margin.left - margin.right;
height = 500 - margin.top - margin.bottom;

// read in data and format the year
const yearData = d3.csv("ind_year_data.csv");
yearData.forEach(function (d) {
    parseDate = d3.timeParse("%Y");
    d.date = parseDate(d.Year);
});

// sort the data by year
yearData.sort(function (a, b) {
    return a.Year - b.Year;
});

// set ranges and domains
var x = d3.scaleTime().range([0, width]);
var y = d3.scaleLinear().range([height, 0]);
x.domain(d3.extent(yearData, function (d) {
    return d.Year;
}));
y.domain([0, d3.max(yearData, function (d) {
    return d.Count;
})]);

// initialize the line
var valueline = d3.line()
    .x(function (d) {
        return x(d.Year);
    })
    .y(function (d) {
        return y(d.Count);
    });

// create svg object and append to "chart3"
var svg = d3.select("#chart3").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");

// append the trendline to svg object
svg.append("path")
    .data(yearData)
    .attr("class", "line")
    .attr("d", valueline)
    .attr("stroke", "#32CD32")
    .attr("stroke-width", 2)
    .attr("fill", "#FFFFFF");

var path = svg.selectAll("dot")
    .data(data)
    .enter().append("circle")
    .attr("r", 5)
    .attr("cx", function (d) {
        return x(d.date);
    })
    .attr("cy", function (d) {
        return y(d.wage);
    })
    .attr("stroke", "#32CD32")
    .attr("stroke-width", 1.5)
    .attr("fill", "#FFFFFF")
    .on('mouseover', function (d, i) {
        d3.select(this).transition()
            .duration('100')
            .attr("r", 7);
        div.transition()
            .duration(100)
            .style("opacity", 1);
        div.html("$" + d3.format(".2f")(d.wage))
            .style("left", (d3.event.pageX + 10) + "px")
            .style("top", (d3.event.pageY - 15) + "px");
    })
    .on('mouseout', function (d, i) {
        d3.select(this).transition()
            .duration('200')
            .attr("r", 5);
        div.transition()
            .duration('200')
            .style("opacity", 0);
    });


// Add the axis
if (width < 500) {
    svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x).ticks(5));
} else {
    svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));
}

svg.append("g")
    .call(d3.axisLeft(y));




// // set the dimensions and margins of the graph
// var margin = {top: 10, right: 30, bottom: 30, left: 60},
//     width = 460 - margin.left - margin.right,
//     height = 400 - margin.top - margin.bottom;

// // append the svg object to the body of the page
// var svg = d3.select("#chart3")
//   .append("svg")
//     .attr("width", width + margin.left + margin.right)
//     .attr("height", height + margin.top + margin.bottom)
//   .append("g")
//     .attr("transform",
//           "translate(" + margin.left + "," + margin.top + ")");


// //Read the data
// const yearData = d3.csv("ind_year_data.csv");
// yearData.then( function(data) {

//   // Add X axis
//   var x = d3.scaleLinear()
//     .domain(data.map(function(d) { return d.Year}))
//     .range([ 0, width ]);

    
//   svg.append("g")
//     .attr("transform", "translate(0," + height + ")")
//     .call(d3.axisBottom(x).ticks(d3.timeYear.every(1)));

    
//     var counts = d3.map(data, function(d){ return d.Count; }).keys();
    
//   // Add Y axis
//   var y = d3.scaleLinear()
//     .domain(0, 60)
//     .range([ height, 0]);
//   svg.append("g")
//     .call(d3.axisLeft(y));

//   // Add dots
//   svg.append('g')
//     .selectAll("dot")
//     .data(data)
//     .enter()
//     .append("circle")
//       .attr("cx", function (d) { return x(d.Year); } )
//       .attr("cy", function (d) { return y(d.Count); } )
//       .attr("r", 1.5)
//       .style("fill", "#69b3a2")

// })

