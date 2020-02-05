var svg = d3.select("div#svg-container")
    .append("svg")
    .attr("preserveAspectRatio", "xMinYMin meet")
    .attr("viewBox", "-300 -300 1400 1400")
    .classed("svg-content", true);


// define inner and outer radii for donut chart
outermonth = 200
innermonth = 160
innerPhoto = outermonth
outerPhoto = innerPhoto + 200


var pie = d3.pie()
    .padAngle(0.01);


var montharc = d3.arc().innerRadius(innermonth).outerRadius(outermonth)
var photoArc = d3.arc().innerRadius(innerPhoto).outerRadius(outerPhoto)

monthColors = ["black"]

photoColors = []


d3.csv("camera-colors.csv")
    .then(function (data) {

    })



var monthPie = svg.selectAll("g.montharc")
    //break into 12 equal pieces to represent months of the year
    .data(pie([1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]))
    .enter()
    .append("g")
    .attr("class", "arc")
    .attr("transform", "translate(" + outermonth + "," + outermonth + ")")
    .append("path")
    .attr("fill", function (d, i) {
        return monthColors[i % monthColors.length];
        //we have to do different colors, so use the index and mode to access a list of colors
    })
    .attr("d", montharc)
    //add any mouse interactions as before
    .on("mouseover", function () {
        d3.select(this).attr("opacity", .5)
    })
    .on("mouseout", function () {
        d3.select(this).attr("opacity", 1)
    })



var colorPie = svg.selectAll("g.colorarc")
    //break into 36 equal pieces– 3 for each month
    .data(pie([1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
        1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]))
    .enter()
    .append("g")
    .attr("class", "colorarc")
    .attr("transform", "translate(" + outermonth + "," + outermonth + ")")
    .append("path")
    .attr("fill", function (d, i) {
        return photoColors[i % photoColors.length];
        //we have to do different colors, so use the index and mode to access a list of colors
    })
    .attr("d", photoArc)
    //add any mouse interactions as before
    .on("mouseover", function (d, i) {
        d3.select(this).attr("opacity", .5)
        console.log(i)
    })
    .on("mouseout", function () {
        d3.select(this).attr("opacity", 1)
    })






monthList = ["JAN", "FEB", "MARCH", "APRIL", "MAY", "JUNE", "JULY", "AUG", "SEPT", "OCT", "NOV", "DEC"]

timeScale = d3.scaleTime()
    .domain([new Date(2016, 1, 1), new Date(2016, 12, 31)])
    .range([Math.PI / 6, 0]);


for (var i = 0; i < 12; i++) {
    var month = monthList[i];

    var labelArc = d3.arc()
        .innerRadius(175)
        .outerRadius(175)
        .startAngle(Math.PI / 6 * (1 + i) + Math.PI / 24)
        .endAngle(i * Math.PI / 6 + Math.PI / 24)


    svg.append("path")
        .attr("id", "labelArc" + i)
        .attr("d", labelArc)
        .attr("transform", "translate(200,200)")
        .attr("opacity", 1)
        .attr("fill", "purple")


    svg.append("text")
        .append("textPath") //append a textPath to the text element
        .attr("xlink:href", "#labelArc" + i) //place the ID of the path here
        .style("text-anchor", "left") //place the text halfway on the arc
        .attr("startOffset", "50%")
        .text(month)
        .attr("fill", "white")
        .attr("font-family", "sans-serif")
        .attr("font-size", "18px");

}


