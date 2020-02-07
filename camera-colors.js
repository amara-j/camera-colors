var svg = d3.select("div#svg-container")
    .append("svg")
    .attr("preserveAspectRatio", "xMinYMin meet")
    .attr("viewBox", "-300 -300 1400 1400")
    .classed("svg-content", true);


// define inner and outer radii for donut chart
outermonth = 200
innermonth = 150
innerPhoto = outermonth
outerPhoto = innerPhoto + 300



function createArray (length, fillValue){
var array = new Array (length)
array.fill(fillValue)
return array
}


var pie = d3.pie()
    .padAngle(0.01);

var colordata = d3.json("camera.json")
console.log(colordata.length)

var realData = colordata.then(function(data){
    console.log(data[0].color)



var colors = data.map(d => (console.log(d.color)))



    
})




var montharc = d3.arc().innerRadius(innermonth).outerRadius(outermonth)
var photoArc = d3.arc().innerRadius(innerPhoto).outerRadius(outerPhoto)

monthColors = ["black"]

photoColors =
    ["#9a9da3", "#698cb3", "#686866", "#505352", "#5e554e",
        "#626c7d", "#6d7482", "#8398be", "#467baf", "#564f48",
        "#7e7464", "#6d6e61", "#51565e", "#c4734d", "#6d7082",
        "#5b575b", "#90a0b1", "#665b51", "#774d3b", "#9ea2a5",
        "#5e6a7c", "#976140", "#485a62", "#6a767b", "#7e8b93",
        "#73889d", "#7b984b", "#9e5238", "#637164", "#665766",
        "#624a2c", "#617a99", "#929dae", "#8f946d", "#52687f",
        "#6f8299", "#8e7a5e", "#5e5f3c", "#815b3d", "#4d584d",
        "#5c5c53", "#52583f", "#4b6284", "#3a3d3c", "#4c4944",
        "#9e9582", "#8f706c", "#665947", "#6f675a", "#896c42",
        "#777775", "#778296", "#5c4a4f", "#80868f", "#777d7c",
        "#a5a3a3", "#5d5f62", "#6d706f", "#4e5459", " #5e5554"]

monthPieData = []


// make a build array function so i dont need to literally type 60 ones
// parameters value, length

var monthPie = svg.selectAll("g.montharc")
    //break into 12 equal pieces to represent months of the year
    .data(pie(createArray(12,1)))
    .enter()
    .append("g")
    .attr("class", "arc")
    .attr("transform", "translate(" + outermonth + "," + outermonth + ")")
    .append("path")
    .attr("fill", function (d, i) {
        return d[i % monthColors.length];
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
    .data(pie(createArray(60,1)))
    .enter()
    .append("g")
    .attr("class", "colorarc")
    .attr("transform", "translate(" + outermonth + "," + outermonth + ")")
    .append("path")
    //     .attr("fill", function (d, i) {
    //    //     return dataset.colors;
    //         return photoColors[i];
    //         //we have to do different colors, so use the index and mode to access a list of colors
    //     })

    .attr("fill", function (d, i) {
        //     return dataset.colors;
        return photoColors[i];
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
        .innerRadius((innermonth + outermonth) / 2)
        .outerRadius((innermonth + outermonth) / 2)
        .startAngle(Math.PI / 6 * (1 + i) + Math.PI / 24)
        .endAngle(i * Math.PI / 6 + Math.PI / 24)


    svg.append("path")
        .attr("id", "labelArc" + i)
        .attr("d", labelArc)
        .attr("transform", "translate(" + outermonth + "," + outermonth + ")")
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


