//rem控制布局
var Rem  = {max: 750, min: 320, px: 100, bodyMax: 640,bodyMaxPx: 70};
$(window).on('resize', function () {
    var w = $(this).width(),
        bodyW = $('body').width();
    if (w < Rem.min) {
        w = Rem.min;
    } else if (w > Rem.max) {
        w = Rem.max;
    }
    if(bodyW==Rem.bodyMax){
        $('html').css('font-size',Rem.bodyMaxPx+ 'px');
    }else {
        $('html').css('font-size', Rem.px * w / Rem.max + 'px');
    }
}).trigger('resize');

// 防止浏览器不支持console报错(IE)
if (!window.console) {
    (function () {
        window.console = {};
        var funs = ["profiles", "memory", "_commandLineAPI", "debug", "error", "info", "log", "warn", "dir", "dirxml", "trace", "assert", "count", "markTimeline", "profile", "profileEnd", "time", "timeEnd", "timeStamp", "group", "groupCollapsed", "groupEnd"];
        for (var i = 0; i < funs.length; i++) {
            console[funs[i]] = function () {};
        }
    })();
}

//去除input框默认背景色（淡黄色）
$("input[type='text'],input[type='password']").prop('autocomplete','off');
