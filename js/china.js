var dataset;
var dataer;
var width = 540;
var height = 400;
var cities = new Array();
var num = new Array();
var color = d3.scale.quantize().range(["#000066","#000099","#0000CC","#0000FF","#0066CC","#0066FF","#0099FF","#00CCCC","#00CCFF","#00FFCC","#00FFFF"
]);
var svg = d3.select("#china_map").append("svg")
    .attr("width", width)
    .attr("height", height);
var projection = d3.geo.mercator()
    .center([105, 38])
    .scale(500)
    .translate([width / 2, height / 2]);

var nodeset =new Array();//每个节点是一个32维城市数据表
var nodes = new Array();
d3.csv("data/yilin_weiboTotal(UTF-8).csv",function(error,data){
    if(error){
        return console.error(error);
    }
    else{
        dataer = data;
        var max = d3.max(dataer, function (d) {
            return parseInt(d.total_num);
        });
        var min = d3.min(dataer,function(d){
            return parseInt(d.total_num);
        })
//        rank_user_num.sort(function(a,b){return a>b?1:-1})
        color.domain([min, max]);
        for(var i = 0;i<dataer.length;i++){
           nodeset[i] = dataer[i].total_num;
           cities[i] = dataer[i].location_name;
           num[i] = dataer[i].location_id;
        }
    }
})




var path = d3.geo.path().projection(projection);
//    var color = d3.scale().category20();
d3.json("data/china.json", function (error, data) {
    if (error)
        return console.error(error);
    else
        dataset = data;
    //布局地图
    svg.selectAll("path")
        .data(dataset.features)
        .enter()
        .append("path")
        .attr("stroke", "#000")
        .attr("stroke-width", 0.2)
        .attr("fill", function(d,i){
            return color(nodeset[i]*10);
        })
        .attr("d", path)
        .on("mouseover",function(d,i){
          return  svg.selectAll("path");

        }).append("title").text(function(d,i){
            return cities[i]+"   "+"微博总数"+num[i];
        });

});