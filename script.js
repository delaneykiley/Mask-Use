/* --- Dataset URLs --- */

// NYT Prison Systems COVID Data
let systemsURL = "data/systems.csv"
let myData = {}
  d3.csv(systemsURL).then( data => {
   for (let item of data){
      myData[item.system] = item.total_inmate_cases }
   })

/* -------------------- */

let width= 500
let height= 400
let leftMargin= 30
let rightMargin= 20
let bottomMargin= 30
let topMargin= 30
let dataObj = myData

function drawChart(){
   let svg = d3.select('#chartdiv')
      .append('svg')
      .attr("width", width + leftMargin + rightMargin)
      .attr("height", height + topMargin + bottomMargin)
   // X scale and axis
   let xscale = d3.scaleBand()
      .domain(Object.keys(dataObj))
      .range([0, width]);
   let x_axis = d3.axisBottom(xscale)
   
   svg.append("g")
      .attr("transform", `translate(${leftMargin},   ${topMargin+height})`)
      .call(x_axis);
   // Y scale and axis
   let yscale = d3.scaleLinear()
      .domain([0, Math.max(...Object.values(dataObj))])
      .range([height, 0])
   let y_axis = d3.axisLeft(yscale)
   
   svg.append("g")
      .attr("transform", `translate(${leftMargin}, ${topMargin})`)
      .call(y_axis);
   Object.values(dataObj).forEach( (element, index) => {
      let g = svg.append("g")
      let barWidth = 40;
      let x = (index * (width/ Object.values(dataObj).length) +  (width/ Object.values(dataObj).length)/2 - barWidth/2)
   g.append("rect")
      .attr("x", x)
      .attr("y", ( yscale(element)))
      .attr("height",  height - yscale(element))
      .attr("width", barWidth)
      .attr("fill",  "#88aaee")
      .attr("transform", `translate(${leftMargin}, ${topMargin})`)
   g.append("text")
      .attr("x", x )
      .attr("y", (yscale(element)))
      .text(element)
      .attr("transform", `translate(${leftMargin}, ${topMargin})`)
   })
}
drawChart()
