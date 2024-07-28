
// set margins and dimensions of graph
var width = 1200
    height = 500
    margin = 50

// set radius
var radius = Math.min(width, height) / 2 - margin

// append svg object to '#chart2'
var svg = d3.select("#chart2")
  .append("svg")
    .attr("width", width + 2 * margin)
    .attr("height", height + 2 * margin)
  .append("g")
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

// create list of labels for hard coded data
var year_band_labels = ["1920-1924", "1925-1929", "1930-1934", "1935-1939", "1940-1944", "1945-1949", "1950-1954", "1955-1959", 
                       "1960-1964", "1965-1969", "1970-1974", "1975-1979", "1980-1984", "1985-1989", "1990-1994", "1995-1999",
                       "2000-2004", "2005-2009", "2010-2014", "2015-2019", "Other"]

// hard coded values from dataset, created with script contained in YearsDict.py
var yearsDict = {"2015-2020": 256, "2005-2009": 161, "1995-1999": 101, "2010-2014": 227, 
                 "2000-2004": 147, "1990-1994": 60, "1980-1984": 8, "1975-1979": 8, 
                 "1985-1989": 25, "1970-1974": 2, "1935-1939": 2, "1940-1944": 1, "1960-1964": 1, "1965-1969": 1}


// set the color scale to a d3 scheme
var color = d3.scaleOrdinal()
  .domain(year_band_labels)
  .range(["aquamarine", "black", "blanchedalmond", "blue", "blueviolet", "brown", "burlywood", "cadetblue", 
         "chartreuse", "coral", "cornflowerblue", "crimson", "darkcyan", "darkmagenta", "darkolivegreen", "darkorchid", 
          "deeppink", "deepskyblue", "forestgreen", "goldenrod", "hotpink", "indianred", "indigo", "lemonchiffon"]);

// create tooltip and append to '#chart2'
var tooltip = d3.select("#chart2")
  .append("div")
  .style("opacity", 0)
  .attr("class", "tooltip")
  .style("position", "absolute")
  .style("background-color", "white")
  .style("border", "solid")
  .style("border-width", "2px")
  .style("border-radius", "5px")
  .style("padding", "5px");

// create and update the pie chart for input data variable
function update(data) {


  var pie = d3.pie()
    .value(function(d) {return d.value; })
    .sort(function(a, b) { console.log(a) ; return d3.ascending(a.key, b.key);} ) // This make sure that group order remains the same in the pie chart
  var data_ready = pie(d3.entries(data))


    
  var u = svg.selectAll("path")
    .data(data_ready)

    
  u
    .enter()
    .append('path')
    .merge(u)
    .transition()
    .duration(1000)
    .attr('d', d3.arc()
      .innerRadius(0)
      .outerRadius(radius)
    )
    .attr('fill', function(d){ return(color(d.data.key)) })
    .attr("stroke", "white")
    .style("stroke-width", "2px")
    .style("opacity", 1)

    u
    .on('mouseover', function(d) { this.style.opacity = 1; tooltipFunction(d, "over")})
    u
    .on('mousemove', function(d) { tooltipFunction(d, "move")})
    u

    
    var size = 14
  svg.selectAll("dots")
    .data(year_band_labels)
    .enter()
    .append("rect")
      .attr("x", width * 0.25)
      .attr("y", function(d,i){ return height * 0.00000001 + i*(size+5) - (size * 0.5)})
      .attr("width", size)
      .attr("height", size)
      .style("fill", function(d){ return color(d)})

  // Creating Text
  svg.selectAll("labels")
    .data(year_band_labels)
    .enter()
    .append("text")
      .attr("x", width * 0.25 + size * 1.2)
      .attr("y", function(d,i){ return height * 0.00000001 + i*(size+5) - 20})
          //+ (size * 0.5)})
      .style("fill", "black")
      .text(function(d){ return d})
      .attr("text-anchor", "left")
      .style("alignment-baseline", "middle")

    u
    .exit()
    .remove()

    

}

function tooltipFunction(d, action) {

  switch (action) {
    case "over":

      tooltip.style("opacity", 1);
      return;
    case "move":

        tooltip.html('<u>' + d.data.key + '</u>');



      tooltip.style('top', (d3.event.pageY + 10) + 'px')
              .style('left', (d3.event.pageX + 10) + 'px');
      return;
    default:
      tooltip.style("opacity", 0);
  }
}

// Initialize the plot with the dataset
update(yearsDict)


// structure of graph inspired by information at https://d3-graph-gallery.com/graph/pie_changeData.html
