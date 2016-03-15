var dataset;
var dataer;
var MAPwidth = 540;
var MAPheight = 400;
var tt = 0;
var color = d3.scale.category20();
var LYLsvg = d3.select("#chinamap").append("svg")
    .attr("width", MAPwidth)
    .attr("height", MAPheight);
var projection = d3.geo.mercator()
    .center([105, 38])
    .scale(500)
    .translate([MAPwidth / 2, MAPheight / 2]);

var nodeset = new Array();//存放48个结点
var nodes =new Array();//每个节点是一个32维城市数据表

d3.csv("data/yilin_weiboNum.csv",function(error,data){
    if(error){
        return console.error(error);
    }
    else{
        dataer = data;
        for(var i = 0;i<dataer.length;i++){
            var node = new Array();
            node[0] = dataer[i].text1;node[1] = dataer[i].text2;node[2] = dataer[i].text3;node[3] = dataer[i].text4;node[4] = dataer[i].text5;node[5] = dataer[i].text6;node[6] = dataer[7].text1;node[7] = dataer[i].text8;
            node[8] = dataer[i].text9;node[9] = dataer[i].text10;node[10] = dataer[i].text11;node[11] = dataer[i].text12;node[12] = dataer[i].text13;node[13] = dataer[i].text14;node[14] = dataer[i].text15;node[15] = dataer[i].text16;
            node[16] = dataer[i].text17;node[17] = dataer[i].text18;node[18] = dataer[i].text19;node[19] = dataer[i].text20;node[20] = dataer[i].text21;node[21] = dataer[i].text22;node[22] = dataer[i].text23;node[23] = dataer[i].text24;
            node[24] = dataer[i].text25;node[25] = dataer[i].text26;node[26] = dataer[i].text27;node[27] = dataer[i].text28;node[28] = dataer[i].text29;node[29] = dataer[i].text30;node[30] = dataer[i].text31;node[31] = dataer[i].text32;
            node[32] = dataer[i].text33;node[33] = dataer[i].text34;node[34] = dataer[i].text35;node[35] = dataer[i].text36;node[36] = dataer[i].text37;node[37] = dataer[i].text38;node[38] = dataer[i].text39;node[39] = dataer[i].text40;
            node[40] = dataer[i].text41;node[41] = dataer[i].text42;node[42] = dataer[i].text43;node[43] = dataer[i].text44;node[44] = dataer[i].text45;node[45] = dataer[i].text46;node[46] = dataer[i].text47;node[47] = dataer[i].text48;
            nodeset[i] = node;
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
    LYLsvg.selectAll("path")
        .data(dataset.features)
        .enter()
        .append("path")
        .attr("class","chinamapClass")
        .attr("d", path);

    //获取中心点坐标,将其坐标存在Nodes这个数组中，每个元素都是一个省份的中心点
    dataset.features.forEach(function(d,i){
        var centroid = path.centroid(d);
        centroid.x =  centroid[0];//省份的x坐标
        centroid.y = centroid[1];//省份的y坐标
        centroid.id = d.properties.id;
        centroid.name = d.properties.name;//省份的名称
        centroid.feature = d;
//        centroid.prop = nodeset[i][0];
        nodes.push(centroid);
    });

    //画圆圈，选择nodes中的点
//    LYLsvg.append("circle")
//        .attr("cx",function(d){
//            return nodes[1].x;
//        })
//        .attr("cy",function(d){
//            return nodes[1].y;
//        })
//        .attr("r",10)
//        .style("fill","yellow")
//        .style("opacity",0.5);

    //给所有省份画圈
    LYLsvg.selectAll("circle")
        .data(nodes)
        .enter()
        .append("circle")
        .attr("r",function(d,i){
            return nodeset[i][0]*10;
        })
        .attr("cx",function(d,i){
            return d.x;
        })
        .attr("cy",function(d,i){
            return d.y;
        })
        .style("fill","#F1C40F")
        .style("opacity",0.8);

function fun(){
    tt = parseInt(tt) + 1;
    LYLsvg.selectAll("circle")
        .transition()
        .duration(2000)
        .delay(function(d,i){
            return 1000;
        })
        .attr("r",function(d,i){
            return nodeset[i][tt]*10;
        })

}
        setInterval(fun,2000);

});