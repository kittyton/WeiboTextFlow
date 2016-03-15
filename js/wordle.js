var dataset_wordle;
var tf = new Array();
var hotword = new Array();
var weiboset = new Array();

var svgwordle = d3.select("#wordle").append("svg")
    .attr("width", 600)
    .attr("height", 400);
    //.attr("style","border:1px solid red");

//读取微博数据
d3.csv("data/static.csv",function(error,data){
    if(error){
        return console.error(error);
    }else{
        for(var i = 0;i<data.length;i++){
            weiboset[i] = data[i].text;
        }
    }

})

//读取敏感词数据
d3.csv("data/yilin_SensitiveWord.csv", function (error, data){
    if(error){
        return console.error(error);
    }
    dataset_wordle = data;

    var i;
    for( i = 0;i <data.length;i++){
       hotword[i] = data[i].sensitiveWord;
       tf[i] = data[i].tf;
    }


var fill = d3.scale.category20();

d3.layout.cloud().size([600, 400])
    .words(hotword.map(function(d,i) {
        return {"text": d, "size": tf[i]};
    }))
    .rotate(function() { return ~~(Math.random() * 2) * 90; })
    .font("Impact")
    .fontSize(function(d,i){
        return tf[i]/10;
    })
    .on("end", draw)
    .start();

function draw(words) {
    svgwordle
        .attr("width", 400)
        .attr("height", 300)
//        .attr("style","border:1px solid red")
        .append("g")
        .attr("transform", "translate(150,150)")
        .selectAll("text")
        .data(words)
        .enter().append("text")
        .style("border","1px solid blue")
        .style("font-size", function(d) { return d.size-5 + "px"; })
        .style("font-family", "Impact")
        .style("fill", function(d, i) {
//            alert(d.text+i);
            return fill(i); })
        .attr("text-anchor", "middle")
        .attr("transform", function(d) {
            return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
//            return "translate(" + [d.x, d.y] + ")";
        })
        .text(function(d) { return d.text; })
        .on("mouseover",function(d,i){
//            alert(d.text+ i);
//            alert(weiboset[i]);
            var tmp= "";
            for(var j = 0;j < 10;j++){
               tmp += '<div class="weiboDataList">'+weiboset[i*10+j]+"</div>";

            }
//            alert(tmp);
            document.getElementById("lyllist").innerHTML = tmp;
        });
}
});