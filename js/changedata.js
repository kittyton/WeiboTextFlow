var positive =Array();//获取的积极情绪的词频
var negative =Array();//获取的消极情绪的词频
var sad =Array();//获取悲伤情绪词频
var anger =Array();//获取生气词频
var anx = Array();//获取焦虑词频
WHLsvg = d3.select("#motion").append("svg").attr("width", 500).attr("height", 300);

WHLsvg.append("g").attr("id", "quotesDonut");
WHLsvg.append("g").attr("id","commentDonut");
d3.select("#commentDonut")
    .append("rect")
    .attr("x",280)
    .attr("y",120)
    .attr("width",15)
    .attr("height",15)
    .attr("fill","#f2e21b")
;
d3.select("#commentDonut")
    .append("rect")
    .attr("x",280)
    .attr("y",140)
    .attr("width",15)
    .attr("height",15)
    .attr("fill","#0099CC")
;
d3.select("#commentDonut")
    .append("rect")
    .attr("x",280)
    .attr("y",160)
    .attr("width",15)
    .attr("height",15)
    .attr("fill","#DC3912")
;
d3.select("#commentDonut")
    .append("rect")
    .attr("x",280)
    .attr("y",180)
    .attr("width",15)
    .attr("height",15)
    .attr("fill","#b96ea2")
;
d3.select("#commentDonut")
    .append("text")
    .attr("x",300)
    .attr("y",132)
    .text("Positive")
;
d3.select("#commentDonut")
    .append("text")
    .attr("x",300)
    .attr("y",152)
    .text("Sad")
;
d3.select("#commentDonut")
    .append("text")
    .attr("x",300)
    .attr("y",172)
    .text("Anger")
;
d3.select("#commentDonut")
    .append("text")
    .attr("x",300)
    .attr("y",192)
    .text("Anxious")
;


var salesData1 = [
    {sex: "positive", color: "#f2e21b"},
//    {sex: "negative", color: "#3366CC"}
    {sex:"sad",color:"#0099CC"},
    {sex:"anger",color:"#eb0600"},
    {sex:"anx",color:"#b96ea2"}
];
Donut3D.draw("quotesDonut", initialData1(), 150, 150, 100, 80, 10, 0);

function initialData1() {
    return salesData1.map(function (d) {
        return {sex: d.sex, value: 1, color: d.color};
    });
}
//读取Emotion.csv数据，如果出错，输出错误
d3.csv("data/WHLEmotion.csv",function(Emotion){
    for(var i=0;i<Emotion.length;i++){
        positive[i]=Emotion[i].Positive;
        sad[i]=Emotion[i].sad;
        anger[i]=Emotion[i].anger;
        anx[i]=Emotion[i].anx;
    }
});
//console.log(positive);
//console.log(negative);
function setNewData(i) {
    var salesData = [
        {sex: "positive", color: "#f2e21b" ,value:positive[i]},
        {sex:"sad",color:"#0099CC",value:sad[i]},
        {sex:"anger",color:"#eb0600",value:anger[i]},
        {sex:"anx",color:"#b96ea2",value:anx[i]}
    ]
    return salesData.map(function (d) {
        return {sex: d.sex, value: d.value, color: d.color};
    });
}
function changeData(i) {
    Donut3D.transition("quotesDonut", setNewData(i), 100, 80, 10, 0);
}
var w_i=0;
var   auto=setInterval(function(){
    if(w_i<positive.length)
    {
//        console.log(i);
//        alert(i);
        changeData(w_i);
        w_i++;
    }else{
        clearInterval(auto);
    }
},2000);