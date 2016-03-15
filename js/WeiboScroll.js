var dataset;
$(function () {
    d3.csv("data/yl_weibo.csv", function (error, data) {
        dataset = data;
        var count;
        document.getElementById("scrollDiv").innerHTML = document.getElementById("scrollDiv").innerHTML + "<ul id='aa'>";
        for (var i = 0; i < dataset.length; i++) {
            var tmp = dataset[i].text.substring(0,28);
            document.getElementById("aa").innerHTML = document.getElementById("aa").innerHTML + "<li name='li'>" + tmp + "</li>";
        }
        $("#scrollDiv").Scroll({line: 3, speed: 800, timer: 500});
    });
    $.fn.extend({
        Scroll: function (opt, callback) {
//                    alert("call back");
            if (!opt) var opt = {};
            var _this = this.eq(0).find("ul:first");
            var lineH = _this.find("li:first").height(),
                line = opt.line ? parseInt(opt.line, 10) : parseInt(this.height() / lineH, 10),
                speed = opt.speed ? parseInt(opt.speed, 10) : 1000, //卷动速度，数值越大，速度越慢（毫秒）
                timer = opt.timer ? parseInt(opt.timer, 10) : 5000; //滚动的时间间隔（毫秒）
            if (line == 0) line = 1;
            var upHeight = 0 - line * lineH;

            scrollUp = function () {
                _this.animate({
                    marginTop: upHeight
                }, speed, function () {
                    for (i = 1; i <= line; i++) {
                        _this.find("li:first").appendTo(_this);
                    }
                    _this.css({marginTop: 0});
                });
            }
            _this.hover(function () {
               // clearInterval(timerID);
            },function () {
                timerID = setInterval("scrollUp()", timer);
            }).mouseout();
        }
    })
})(jQuery);