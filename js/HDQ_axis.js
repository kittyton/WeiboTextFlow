//$("#axisDiv").css("top",580);

d3.csv("data/statData.csv", function (weiboNum) {
    var weiboNumData = "M 0 0 L ";

    numMax = d3.max(weiboNum).value;
    weiboNumData += "0 " + -weiboNum[0].value / numMax * 100 + " ";
    for (i = 0; i < weiboNum.length; i++) {
        weiboNumData += weiboNum[i].time * 1505 / 144 + " " + -weiboNum[i].value / numMax * 100 + " ";
    }
    weiboNumData += weiboNum[i - 1].time * 1505 / 144 + " 0";
    //console.log(weiboNumData);

    //weiboNumData = "M 0 0 L 100 -30 200 -10 300 -59 500 -90 500 0";
    var axisDivWidth = $("#axisDiv").width();
    var statLineSvg = d3.select("#axisDiv").append("svg")
        .attr("width", axisDivWidth)
        .attr("heght", 100)
        .append("g");

    statLineSvg.append("path")
        .attr("id", "statLinePath")
        .attr("transform", "translate(" + 15 + "," + 150 + ")")
        .attr("d", weiboNumData)

    ;
    statLineSvg.append("rect")
        .attr("transform", "translate(" + 15 + "," + 0 + ")")
        .attr("fill", "#d1dddc")
        .attr("height", 150)
        .attr("width", axisDivWidth - 45 + 2)
        .attr("x", 0)
        .transition()
        .duration(96000)
        .ease("liner")
        .attr("x", axisDivWidth - 45)
        .attr("width", 0)
    ;
    var axisSvg = d3.select("#axisDiv").append("svg")
        .attr("height", 50)
        .attr("width", axisDivWidth)
        .append("g")
        .attr("id", "axis")
        .style("stroke", "#1abc9c");
    axisSvg.append("line")
        .attr("transform", "translate(" + 15 + "," + 3 + ")")
        .attr("x2", axisDivWidth - 45)
        .attr("y2", 0)
        .attr("id", "axisMainLine")
        .style("stroke-width", 5);
    tickWidth = (axisDivWidth - 45) / 24;
    for (i = 0; i <= 24; i++) {
        width = tickWidth * i + 15;
        tick = axisSvg.append("g")
            .attr("transform", "translate(" + width + "," + 2 + ")");
        tick.append("line")
            //.attr("x1", tickWidth * i)
            //.attr("x2", tickWidth * i)
            .attr("y1", 0)
            .attr("y2", 10)
            .style("stroke-width", 1);
        tick.append("text")
            .attr("y", 25)
            .attr("x", -15)
            .text(i + ":00");
    }
    axisSvg.append("svg")
        .append("circle")
        .attr("id", "axisPointer")
        .attr("transform", "translate(" + 15 + "," + 2 + ")")
        .attr("r", 10)
        .attr("fill", "#e74c3c")
        .style("filter", "url(#Gaussian_Blur)")
        .attr("cx", 0)
        .transition()
        .duration(96000)
        .ease("liner")
        .attr("cx", axisDivWidth - 45)
    ;


});