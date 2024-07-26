
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

// create 2 data_set
var year_band_labels = ["1920-1924", "1925-1929", "1930-1934", "1935-1939", "1940-1944", "1945-1949", "1950-1954", "1955-1959", 
                       "1960-1964", "1965-1969", "1970-1974", "1975-1979", "1980-1984", "1985-1989", "1990-1994", "1995-1999",
                       "2000-2004", "2005-2009", "2010-2014", "2015-2019", "Other"]
var movieData = d3.csv("movies.csv");
var yearsDict = {"2015-2020": 256, "2005-2009": 161, "1995-1999": 101, '2010-2014': 227, '2000-2004': 147, '1990-1994': 60, '1980-1984': 8, "1975-1979": 8, "1985-1989": 25, "1970-1974": 2, "1935-1939": 2, "1940-1944": 1, "1960-1964": 1, "1965-1969": 1}

var data2 = {a: 6, b: 16, c:20, d:14, e:19, f:12}

// set the color scale
var color = d3.scaleOrdinal()
  .domain(year_band_labels)
  .range(d3.schemeDark2);

// A function that create / update the plot for a given variable:
function update(data) {

  // Compute the position of each group on the pie:
  var pie = d3.pie()
    .value(function(d) {return d.value; })
    .sort(function(a, b) { console.log(a) ; return d3.ascending(a.key, b.key);} ) // This make sure that group order remains the same in the pie chart
  var data_ready = pie(d3.entries(data))

  // map to data
  var u = svg.selectAll("path")
    .data(data_ready)

  // Build the pie chart: Basically, each part of the pie is a path that we build using the arc function.
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

  // remove the group that is not present anymore
  u
    .exit()
    .remove()

}

// Initialize the plot with the first dataset
update(data1)

    
// helper function to find release year band for film
function findReleaseYearBand(yr) {

        var band20 = ["1920", "1921", "1922", "1923", "1924"];
        var band25 = ["1925", "1926", "1927", "1928", "1929"];
        var band30 = ["1930", "1931", "1932", "1933", "1934"];
        var band35 = ["1935", "1936", "1937", "1938", "1939"];
        var band40 = ["1940", "1941", "1942", "1943", "1944"];
        var band45 = ["1945", "1946", "1947", "1948", "1949"];
        var band50 = ["1950", "1951", "1952", "1953", "1954"];
        var band55 = ["1955", "1956", "1957", "1958", "1959"];
        var band60 = ["1960", "1961", "1962", "1963", "1964"];
        var band65 = ["1965", "1966", "1967", "1968", "1969"];
        var band70 = ["1970", "1971", "1972", "1973", "1974"];
        var band75 = ["1975", "1976", "1977", "1978", "1979"];
        var band80 = ["1980", "1981", "1982", "1983", "1984"];
        var band85 = ["1985", "1986", "1987", "1988", "1989"];
        var band90 = ["1990", "1991", "1992", "1993", "1994"];
        var band95 = ["1995", "1996", "1997", "1998", "1999"];
        var band00 = ["2000", "2001", "2002", "2003", "2004"];
        var band05 = ["2005", "2006", "2007", "2008", "2009"];
        var band10 = ["2010", "2011", "2012", "2013", "2014"];
        var band15 = ["2015", "2016", "2017", "2018", "2019"];

      var options = [band20, band25, band30, band35, band40, band45, band50, band55, band60, band65, 
                     band70, band75, band80, band85, band90, band95, band00, band05, band10, band15];

      for (var i = 0; i < options.length; i++) {

        if (options[i].includes(yr)) { return year_band_labels[i]; }
      }

      return "Other";
  }

// helper function to build release year dictionary
function buildYearsDict(data) {
    yearsDict = {};
    // build dictionary here
    return yearsDict;
}

// structure of graph inspired by information at https://d3-graph-gallery.com/graph/pie_changeData.html
