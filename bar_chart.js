
// set margins and dimensions of graph
var margin = {top: 10, right: 60, bottom: 160, left: 150},
    width = 1200 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

// append svg object to '#chart1'
var svg = d3.select("#chart1")
  .append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
.append("g")
  .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");

// load data from movies.csv
const movieData = d3.csv("movies.csv");
movieData.then(function(data) {

  // filter data for top 20 grossing movies
  data =  data.filter(function(d){ return d.Rank <= 29 })
  var movieGrosses = d3.map(data, function(d){ return d.Lifetime_Gross; }).keys();

  // create X, Y axes
  var x = d3.scaleBand()
    .domain(data.map(function(d) { return d.Movie_Name}))
    .range([0, width])
    .padding(0.2);

  var y = d3.scaleLinear()
    .domain([Math.min(...movieGrosses) - 10000000, Math.max(...movieGrosses)])
    .range([height,0])

  svg.append("g")
      .attr("transform", "translate(" + 0 + "," + (height) + ")")
      .call(d3.axisBottom(x))
      .selectAll("text")
        .attr("transform", "translate(-10,0)rotate(-45)")
        .style("text-anchor", "end");

  svg.append("g")
    .call(d3.axisLeft(y));


    // create five-year bands and color according to scheme
    var year_bands = ["Pre-1990", "1990-1994", "1995-1999", "2000-2004", "2005-2009", "2010-2014", "2015-2019"];
    var color = d3.scaleOrdinal()
    .domain(year_bands)
    .range(d3.schemeDark2)

  // create bars for bar chart
  svg.selectAll("rect")
    .data(data)
    .enter()
    .append("rect")
      .attr("x", function(d) { return x(d.Movie_Name); })
      .attr("y", function(d) { return height; })
      .attr("width", x.bandwidth())
      .attr("height", function(d) { return 0; })
      .attr("fill", function (d) { return color(findYearBand(d.Year)); })
      .attr("opacity", 0.5);

  // load bars on a delay with animation
  svg.selectAll("rect")
    .transition()
    .duration(500)
    .attr("y", function(d) { return y(d.Lifetime_Gross); })
    .attr("height", function(d) { return height - y(d.Lifetime_Gross); })
    .delay(function(d,i) { return (i*100); });


  // create tooltip
  var tooltip = d3.select("#chart1")
    .append("div")
    .style("opacity", 0)
    .attr("class", "tooltip")
    .style("position", "absolute")
    .style("background-color", "white")
    .style("border", "solid")
    .style("border-width", "2px")
    .style("border-radius", "5px")
    .style("padding", "5px");

  svg.selectAll("rect")
    .on("mouseover", function(d) { this.style.opacity = 1; tooltipFunction(d, "over");})
    .on("mousemove", function(d) { tooltipFunction(d, "move");})
    .on("mouseout", function(d) { this.style.opacity = 0.5; tooltipFunction(d, "out");})

    function tooltipFunction(d, action) {

      switch (action) {
        case "over":
          tooltip.style("opacity", 1);
          return;
        case "move":

          tooltip.html('<i>' + d.Movie_Name + '</i>'
                      + "<br>" + "Total Lifetime Gross: $"+ grossToString(d.Lifetime_Gross)
                      + "<br>" + "Budget: "+ d.Budget
                      + "<br>" + "Release Year: "+ d.Year
                      + "<br>" + "Genre: "+ d.Genre)
            .style('top', (d3.event.pageY + 10) + 'px')
            .style('left', (d3.event.pageX + 10) + 'px');
          return;
        default:
          tooltip.style("opacity", 0);
      }
  }


    
  // initialize year gap legend on bar chart
  var size = 20
  svg.selectAll("dots")
    .data(year_bands)
    .enter()
    .append("rect")
      .attr("x", width * 0.85)
      .attr("y", function(d,i){ return height / 20 + i*(size+5)})
      .attr("width", size)
      .attr("height", size)
      .style("fill", function(d){ return color(d)})

  // initialize text for legend
  svg.selectAll("labels")
    .data(year_bands)
    .enter()
    .append("text")
      .attr("x", width * 0.85 + size * 1.2)
      .attr("y", function(d,i){ return height / 20 + i*(size+5) + (size * 0.5)})
      .style("fill", "black")
      .text(function(d){ return d})
      .attr("text-anchor", "left")
      .style("alignment-baseline", "middle")


  // helper function to look up a movie's release year band for legend
    function findYearBand(yr) {
        var band_one = ["1990", "1991", "1992", "1993", "1994"];
        var band_two = ["1995", "1996", "1997", "1998", "1999"];
        var band_three = ["2000", "2001", "2002", "2003", "2004"];
        var band_four = ["2005", "2006", "2007", "2008", "2009"];
        var band_five = ["2010", "2011", "2012", "2013", "2014"];
        var band_six = ["2015", "2016", "2017", "2018", "2019"];

        var options = [band_one, band_two, band_three, band_four, band_five, band_six];

        for (var i = 0; i < options.length; i++) {
            if (options[i].includes(yr)) { return year_bands[i]; }
        }
        return "Pre-1990";
    }
    

  // helper function to adapt number representation of Lifetime_Gross to string representation
  // code adapted from https://stackoverflow.com/questions/2901102/how-to-print-a-number-with-commas-as-thousands-separators-in-javascript
  function grossToString(value) {

      return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

});


// structure of graph inspired by information at https://www.d3-graph-gallery.com/graph/barplot_basic.html




