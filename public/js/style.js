/************ This javascript created by author xiexkang 2017-06  Start************/
var Api  = {
    success    :    1,        //返回成功标识
    timeCount  :   60
},
Regs  = {
    mobile      :   /^1(3[0-9]|4[57]|5[0-35-9]|7[0135678]|8[0-9])\d{8}$/,             //手机号
    email       :   /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/,          //邮箱
    integer     :   /^[0-9]*[1-9][0-9]*$/,                                          //正整数
    intFloat    :   /^[1-9]\d*\.\d*|0\.\d*[1-9]\d*$/                           //正浮点数
},
sended = 'sended';           //验证码已发送状态

// 文字提示
function fadeTip(o) {
    var speed =2e3;
    o.tipBox.html(o.tipText).fadeIn(speed, function () {
        o.tipBox.fadeOut(speed, function () {
            o.tipBox.remove();
        });
    });
}

//验证码倒计时
function countTime($e,time) {
    $e.attr("disabled",true);
    var timer = setInterval(function () {
        time--;
        $e.html("" +time+ "s后重新发送");
        $e.addClass(sended);
        if (time < 0) {
            //倒计时完毕，可再次发送
            clearInterval(timer);
            timer = null;
            $e.html($e.data('html')).attr("disabled",false);  //恢复提示 可发送状态
            $e.removeClass(sended);
        }
    }, 1e3);
}

//显示input输入为数字和小数
$.fn.clearNoNum = function () {
    this.bind("keyup", function () {
        this.value = this.value.replace(/[^\d.]/g, "");
        //必须保证第一个为数字而不是.
        this.value = this.value.replace(/^\./g, "");
        //保证只有出现一个.而没有多个.
        this.value = this.value.replace(/\.{2,}/g, ".");
        //保证.只出现一次，而不能出现两次以上
        this.value = this.value.replace(".", "$#$").replace(/\./g, "").replace("$#$", ".");
    });
};
// 使用佣金
$('#expRell').clearNoNum();
// 充值金额
$('#recMoney').clearNoNum();

//lazyImgLoad.js
+function(){
    //src:先加载gif图片, data-src:真正图片地址
    var lazyload = {
        init : function(opt){
            var that = this,
                op = {
                    anim: true,
                    extend_height:0,
                    selectorName:"img",
                    realSrcAtr:"data-src"
                };
            // 合并对象，已有的{anim:true}+用户自定义对象。也就是op = op + opt
            $.extend(op,opt);
            // 调用lazyload.img.init(op)函数
            that.img.init(op);
        },

        img : {
            init : function(n){

                var that = this,
                    selectorName = n.selectorName,
                    realSrcAtr = n.realSrcAtr,
                    anim = n.anim;
                // console.log(n);

                // 要加载的图片是不是在指定窗口内
                function inViewport( el ) {
                    // 当前窗口的顶部
                    var top = window.pageYOffset,
                    // 当前窗口的底部
                        btm = window.pageYOffset + window.innerHeight,
                    // 元素所在整体页面内的y轴位置
                        elTop = $(el).offset().top;
                    // 判断元素，是否在当前窗口，或者当前窗口延伸400像素内
                    return elTop >= top && elTop - n.extend_height <= btm;
                }

                // 滚动事件里判断，加载图片
                $(window).on('scroll', function() {
                    $(selectorName).each(function(index,node) {
                        var $this = $(this);

                        if(!$this.attr(realSrcAtr) || !inViewport(this)){
                            return;
                        }

                        act($this);

                    })
                }).trigger('scroll');

                // 展示图片
                function act(_self){
                    // 已经加载过了，则中断后续代码
                    if (_self.attr('lazyImgLoaded')) return;
                    var img = new Image(),
                        original = _self.attr('data-src');
                    // 图片请求完成后的事件，把data-src指定的图片，放到src里面，浏览器显示
                    img.onload = function() {
                        _self.attr('src', original);
                        anim && _self.css({ opacity: .2 }).animate({ opacity: 1 }, 280);
                    };
                    // 当你设置img.src的时候，浏览器就在发送图片请求了
                    original && (img.src = original);
                    _self.attr('lazyImgLoaded', true);
                }
            }
        }
    };
    // * selectorName，要懒加载的选择器名称
    // * extend_height  扩展高度
    // * anim  是否开启动画
    // * realSrcAtr  图片真正地址
    lazyload.init({
        anim:false,
        selectorName:".lazy"
    });
}();

// footer导航
function footNav(parm){
    for(var i = 0; i < $(parm).size(); i++){
        if($(parm).eq(i).hasClass('cur')){
            var img01 =  $(parm).eq(i).find('img').attr('src');
            var img02 =  $(parm).eq(i).find('img').attr('rel');
         /*   var temp = '';
            temp = img01;
            img01 = img02;
            img02 = temp;*/

            //es6:解构赋值
            [img01,img02] = [img02,img01];

            $(parm).eq(i).find('img').attr('src', img01);
            $(parm).eq(i).find('img').attr('rel', img02);
        }
    }
}
footNav('.footNav .nav li');


// 收藏与否
+function () {
    $.extend($.fn,{
        //收藏成功提示：
        loveYesHtml : function () {
            var popHtml='';
            popHtml ='<div class="lovePop">' + '</div>';
            $(popHtml).insertAfter($("body"));
            fadeTip({tipBox:$('.lovePop'),tipText:"收藏成功!"});
        },
        //取消收藏提示：
        loveNoHtml : function () {
            var popHtml='';
            popHtml ='<div class="lovePop">' + '</div>';
            $(popHtml).insertAfter($("body"));
            fadeTip({tipBox:$('.lovePop'),tipText:"取消收藏!"});
        }
    });
    var $love = $('.js-love'),
        h = 'icoLove-hover';
    $love.each(function (i,e) {
        $love.eq(i).on('click',{x:i},function (event) {
            var $this = $(this);
            $this.toggleClass(h);
            if($this.hasClass(h)){
                $(this).loveYesHtml();
            }else{
                $(this).loveNoHtml();
            }
        });
    });
}();

// textScroll公告文字
function timer(opj){
    var notLiHig =  $('.gfNot li').height();
    $(opj).find('ul').animate({
        marginTop :notLiHig
    },500,function(){
        $(this).css({marginTop : "0"}).find("li:first").appendTo(this);
    })
}
$(function(){
    var $gfNot = $('.gfNot'),
        num = $gfNot .find('li').length,
        speed = 3500;
    if(num > 1){
        var time=setInterval('timer(".gfNot")',speed);
        $gfNot.mousemove(function(){
            clearInterval(time);
        }).mouseout(function(){
            time = setInterval('timer(".gfNot")',speed);
        });
    }
});

// markFix悬浮菜单栏
+function () {
    $('.btn_mark .ico').empty();
    $(".btn_home").click(function(e){
        e.preventDefault();
        e.stopPropagation();
        $(this).parent().toggleClass("active");
        $(".btn_qq_box").toggle();
    });
    $(".btn_mark").click(function(e){
        $(this).toggleClass("active");
        $(".btn_qq_box").toggle();
    });
}();

// other
!function () {
    //a标签中嵌套button去除跳转
    $('.accChg .btn').on('click',function (e) {
        return false;
    });
    //控制显示样式
    function controlStyle() {
        //courses.html
        var h1 = $('.theMenu').height(),
            h2 = $('.theSearch').height(),
            h3 = $('.findSel .tabHd').height();
        $('.listBd').css("top",(h1+h2+h3)+'px');
        $('.listBd').height($(window).height()-h1-h2);
        var  couLi = '.courList li',
        couLiWid = ($('body').width()-parseFloat($('.courList').css('padding-left'))*2)*0.47,
        couLiMr = ($('body').width()-couLiWid*2)/2;
        $(couLi).css("marginBottom",couLiMr);
        $(couLi+':nth-of-type(odd)').css("marginRight",couLiMr);
        $(couLi).width(couLiWid);
        var couLiHig = couLiWid*1.09;
        $(couLi).height(couLiHig);
        var couTpWid = couLiWid*.95;
        $(couLi+' .tp').width(couTpWid);
        $(couLi+' .tp').height(couTpWid/1.6);

        // index.html
        $("#myCourList li").css('margin-bottom',0);
        // index.html
      /*  var $myCouList = $("#myCourList"),
            $myCouListUl =  $("#myCourList ul"),
            $myCouListLi = $("#myCourList li"),
            couLiNum = $myCouListLi.length;
        $myCouListLi.css({"marginRight":couLiMr,"marginBottom":couLiMr});
        $("#myCourList li:last-of-type").css({"marginRight":0});
        $myCouListUl.width((couLiWid+couLiMr)*couLiNum);
        $myCouListUl.height(couLiHig);*/

        //student.html
        var stLi =  '.stuCom .list01 li';
        var stPdwid =  parseFloat($('.stuCom').css('padding-left'));
        $(stLi).css({'margin-bottom':stPdwid*2,'margin-left':stPdwid,'margin-right':stPdwid});
        $(stLi+':nth-of-type(2n)').css('margin-right',0);
        var stliWid = (($('body').width()-stPdwid*6)/2);
        var stLiHig =  stliWid*1.32;
        $(stLi).width(stliWid);
        $(stLi).height(stLiHig);
        var stTpWid = stliWid*.92;
        var stTpHig = stTpWid*.93;
        $(stLi+' .tp').width(stTpWid);
        $(stLi+' .tp').height(stTpHig);
        var stTpPt = (stliWid-stTpWid)/2;
        $(stLi+' .tp').css('padding-top',stTpPt);
       // $(stLi+' .txt').height(stLiHig-stTpPt-stTpHig);
       // $(stLi+' .txt').css('top',stTpPt+stTpHig);

        //video.html
        var videoInf = '.videoInf';
        var vidTxtbd = $(window).height()-$('.videoPlay object').height()-$(videoInf+' .txt').height();
        $('.js-txtBd .wrap').height(vidTxtbd);
    }

    $(window).on('resize', function () {
        controlStyle();
    }).trigger('resize');
}();

// tab栏操作Fn
+function () {
    function tabChg(parm1, parm2) {
        var s = 'cur';
        $(parm1).eq(0).addClass(s);
        $(parm2).eq(0).show().siblings().hide();
        $(parm1).on("click", function () {
            var $e = $(this),
                index = $e.index();
            $(this).addClass(s).siblings().removeClass(s);
            $(parm2).eq(index).show().siblings().hide();
        })
    }
    //myAccount.html
    tabChg('.accChg ol li','.accChg ul');
    //myInfor.htm
    tabChg('.myInfor ol li','.myInfor .inList ul');
    //myCollect.html
    tabChg('.myCollect .tab li','.myCollect .collList ul');
    //myQuestion.html
    tabChg('.myQuestion .tab li','.myQuestion .askList ul');
    //loginReg.html
    tabChg('.loginReg .tab li','.logRegList ul li');
    //notice.html
    tabChg('.notice .tab li','.notice .module');
    // student.html
    tabChg('.student .tab li','.student .stuCom .list');
    //audition.html
    tabChg('.audition .tab li','.audition .audList ul');
    //myNotes.html
    tabChg('.video .tab li','.video .videoList .list');
}();

//选择项操作Fn
+function () {
    function mySel(ll) {
        var s = 'cur';
        $(ll).eq(0).addClass(s).siblings(ll).removeClass(s);
        this.ll = ll;
        this.fn = function () {
            $(ll).on("click",function (e) {
                var $e = $(this);
                $e.addClass(s).siblings(ll).removeClass(s);
            });
        }
    }
    // myPortrait.html
    var mSelA = new mySel('.faceList ul li');
    mSelA.fn();
    //myRecharge01.html
    var mSelB = new mySel('.selList ul li');
    mSelB.fn();
    //myRecharge02.html
    var mSelC = new mySel('.recStyle ul li');
    mSelC.fn();
}();


//index.html 热门视频
/*+function () {
    var $bd      = $('#myCourList'),                                   //主区域
        $ulBox  = $bd.find('ul'),                                        //ul区
        $lis    = $ulBox.find('li'),                                     //每个li区
        len      = $lis.length,                                          //li个数
        liWidth = $lis.eq(len - 1).width(),                             //li的宽
        ml       = parseFloat($lis.css('margin-right')),             //li的ml
        w        = (liWidth+ ml) * len,                             //计算ul的总宽度
        i        = 0;
    $ulBox.css({width: w});

    $bd.on("swipeRight", function () {
        swipeFn('prev');
    });
    $bd.on("swipeLeft", function () {
        swipeFn('next');
    });
    //滑动执行方法
    function swipeFn(dir) {
        switch (dir) {
            case 'prev':
                i = i - 1 < 0 ? 0 : i - 1;
                break;
            case 'next':
                i = i + 1 > len - 2 ? len - 2 : i + 1;
                break;
        }
        $ulBox.stop().animate({"margin-left": -(liWidth + ml) * i}, 0.25e3);
    }
}();*/

// myBasicInf.html
~function () {
    //关闭提示control
    $('.js-shut').bind('click',function () {
       $(this).parents('.remTip').remove();
    });
}();

// myGrade.html
~function () {
    //切换显示
    var arrIco = ".js-arr",
        arrIcoNum = $(arrIco).length,
        itCom = ".myGrade .itemCom",
        o = 'open';
    for(var i = 0; i<arrIcoNum ;i++){
        (function () {
            var bl = true;
            $(arrIco)[i].onclick = function (e) {
                var $e = $(this);
                $e.parents(itCom).toggleClass(o);
                bl ? $e.parents(itCom).addClass(o) : $e.parents(itCom).removeClass(o);
                bl = !bl;
            }
        })(i);
    }
}();

// myCollect.html
~function () {
    // 回复框操作    *主人T：一级留言 , *客人B：二级留言
    var mesIcoT = ".mesIcoT", mesIcoB = ".mesIcoB",
        anAreaT = ".anAreaT", anAreaB = ".anAreaB",
        itemX  = ".itemX", anArea =".anArea";
    $(mesIcoT).on("click",function (e) {
        var $e = $(this);
        $e.parents("li").find(anAreaT).toggle();
        $e.parents("li").siblings('li').find(anAreaT).hide();
        $(anAreaB).hide();
    });
    $(mesIcoB).on("click",function (e) {
        var $e = $(this);
        $e.parents(itemX).find(anAreaB).toggle();
        $e.parents(itemX).siblings(itemX).find(anAreaB).hide();
        $(anAreaT).hide();
    });
    //隐藏回复框
    function hideFn(parm) {
        $(parm + " .cancleBtn"+','+parm + " .subBtn").on("click", function () {
            $(parm).hide();
        });
    }
    hideFn(anArea);
}();

//myEnterCourses02.html
~function () {
    //使用优惠卷，使用佣金
    var $ii = $(".js-switch"),
        iiNum = $ii.length,
        s = 'cur';
    for (var i = 0; i < iiNum; i++) {
        $ii.eq(i).on('click',{a:i},function (event) {
            // console.log(event.data.a);
            $(this).parents('.it').toggleClass(s);
        });
    }
}();

// myAddress.html
~function () {
    //选择地址与默认地址
    var h = 'hover';
    function danSel(d) {
        $(d).bind('click',function () {
            $(d).removeClass(h);
            $(this).addClass(h);
        });
    }
    danSel('.js-radIco');
    danSel('.js-defIco');
}();

// myNotes.html
~function () {
    //笔记编辑
    var chgs = '.js-chg',
        wzs = '.js-note',
        txtAreas = '.js-txtArea',
        areas ='.js-area',
        subBtns = '.js-subBtn',
        canBtns = '.js-canBtn',
        lens = $('.notes li').length,
        is=0;
    for(; is<lens; is++){
        (function () {
            $(chgs)[is].onclick = function (e) {
                var $e = $(this),
                    $eLi =$e.parents('li');
                $(txtAreas).hide();
                $eLi.find(txtAreas).show();
                var theTxt = $eLi.find(wzs).text();
                $eLi.find(areas).val(theTxt);
            };
            $(subBtns)[is].onclick = function (e) {
                var $e = $(this),
                    $eLi =$e.parents('li');
                $eLi.find(txtAreas).hide();
                var txVal =$eLi.find(areas).val();
                $eLi.find(wzs).text(txVal);
            };
            $(canBtns)[is].onclick = function (e) {
                var $e = $(this),
                    $eLi =$e.parents('li');
                $eLi.find(txtAreas).hide();
            };
        })(is);
    }
}();

// myInfor.html , myJoinVided01.html
~function () {
    // 勾选操作（单选，多选，全选）
    var h = 'hover';
    function setNumber(a,b){
        var cheNum   = $(a).length,
            count = 0;
        $.each($(a).closest('ul').find('.li'), function (i, e) {
            //根据勾选中的数量计算总值
            if ($(e).find(a).hasClass(h)) {
                count++;
               //console.log(count);
            }
        });
        count - cheNum ? $(b).removeClass(h) : $(b).addClass(h);
    }
    $.extend($.fn,{
        dataItem : function (){
            $(this).toggleClass(h);
        },
        allDataItem : function (a){
            $(this).toggleClass(h);
            if($(this).hasClass(h)){
                $(a).addClass(h);
            }else{
                $(a).removeClass(h);
            }
        }
    });
    function cheFn(a,b) {
        $(a).on("click",function () {
            $(this).dataItem();
            setNumber(a,b);
        });
        $(b).on("click",function () {
            $(this).allDataItem(a);
            setNumber(a,b);
        });
    }
    cheFn('.js-mesChe','.js-allMesChe');
    cheFn('.js-che','.js-allChe');
}();

//myContactUs.html
~function () {
    var tabLi = '.myContactUs .tab li',
        s='cur';
    $(tabLi).on('click',function () {
        var $e = $(this),
            index = $e.index();
        $(this).addClass(s).siblings().removeClass(s);
        $('.module').eq(index).show().siblings().hide();
        $('body').removeClass('bgWhite');
    });
    $(tabLi+'.li01'+','+tabLi+'.li02').on('click',function () {
        $('body').addClass('bgWhite');
    });
    if($(tabLi+'.li01'+','+tabLi+'.li02').hasClass(s)){
        $('body').addClass('bgWhite');
    }
    for(var i = 0; i<=tabLi.length;i++){
        if($(tabLi).eq(i).hasClass(s)){
            $('.module').eq(i).show().siblings().hide();
        }
    }
}();

// courses.html
~function () {
    var olLi= '.js-li', ul ='.js-ul', bd = '.listBd', s='cur',speed = 300;
    for(var i = 0; i<$(olLi).size() ;i++){
        (function () {
            $(olLi)[i].onclick = function (e) {
                 $('body').addClass('bodyOf');
                var $e = $(this),
                    index = $e.index();
                $e.toggleClass(s);
                if($e.hasClass(s)){
                    $e.siblings().removeClass(s);
                    $(bd).fadeIn(speed);
                    $(ul).eq(index).show().siblings(ul).hide();
                }else{
                    $(bd).hide();
                    $('body').removeClass('bodyOf');
                }
            }
        })(i);
    }
    $(ul+' li').bind('click',function () {
       var $e = $(this),
           index = $e.index();
       $e.addClass(s).siblings().removeClass(s);
    });
    $(bd+' .wrap').on('click',function () {
        $(bd).hide();
        $(olLi).removeClass(s);
        $('body').removeClass('bodyOf');
    });
}();

// student.html
~function () {
    var stCom = '.stuCom',
         pdH ='pbAdd'; //stuCom list 底部占位
    // 学员介绍 字符显示省略
    function simpleText($e) {
        $e.text($e.data('simple'));
    }
    function showText($e) {
        $e.text($e.data('text'));
    }
    $.extend($.fn, {
        simpleText: function () {
            return simpleText($(this));
        },
        showText  : function () {
            return showText($(this));
        }
    });
    // 挂载到属性上
    $('.js-wz').each(function (i, e) {
        var $e         = $(e),
            text       = $e.text(),
            simpleText = text.slice(0, 20) + '...';
        $e.attr({'data-simple': simpleText, 'data-text': text}).text(simpleText);   // 初始化
    });
    $('.js-text').on('click', function () {
        var $li = $(this);
        var $wz = $(this).find('.js-wz');
        $li.toggleClass('hover');
        $li.hasClass('hover') ? showText($wz) : simpleText($wz);
        $li.hasClass('hover') ?  $(stCom+ ' .list01').addClass(pdH) : $(stCom+ ' .list01').removeClass(pdH);
        $li.siblings().removeClass('hover').find('.js-wz').each(function () {
            $(this).simpleText();
        });
    });
    // 学员视频
    var moreBtn = ".js-thgMore",
        o = 'open';
    $(moreBtn).on('click',function () {
        var $e = $(this);
        $e.parents('li').toggleClass(o);
        if($e.parents('li').hasClass(o)){
            $e.parents('li').siblings('li').removeClass(o);
            $(stCom+ ' .list02').addClass(pdH);
        }else{
            $(stCom+ ' .list02').removeClass(pdH);
        }
    });
}();

//video.html
~function () {
    var $infBtn = $('.js-infBtn'),
        $txtBd  = $('.js-txtBd'),
        $bdWrap = $('.js-txtBd .wrap'),
        fadeSpeed = 200,
        h = 'hover';
    $.extend($.fn,{
        hideWrap : function () {
            $infBtn .removeClass(h);
            $txtBd.fadeOut(fadeSpeed);
            $('body').removeClass('bodyOf');
        },
        toggleWrap :function ($e) {
            $e.toggleClass(h);
            $txtBd.fadeToggle(fadeSpeed);
            $('body').toggleClass('bodyOf');
        }
    });
    $infBtn.on('click',function () {
        $(this).toggleWrap($infBtn);
    });
    $bdWrap.on('click',function () {
        $(this).hideWrap();
    });
        //当前播放视频显示在可视范围scrollTop
    $(window).on('resize', function () {
        var $vidUl = $('.videoList .list01 ul'),
            $vidLi = $('.videoList .list01 li'),
            s = 'cur',
            vidLiH  = $vidLi.height(),
            eH = parseFloat($vidUl.css('padding-top'))+parseFloat($vidLi.css('margin-bottom'))+parseFloat($vidLi.css('padding-bottom'));
        $vidLi.each(function (i,e) {
            if($(e).hasClass(s)) {
                var scrHig = vidLiH * i + eH*i-parseFloat($(e).css('margin-bottom'));
                $vidUl.scrollTop(scrHig);
                $(e).addClass(s).siblings('li').removeClass(s);
            }
        });
    }).trigger('resize');
}();

//index.html 2017.7.17-add
// 学员动态
(function($){
    $.fn.myScroll = function(options){
        //默认配置
        var defaults = {
            speed:36,  //滚动速度,值越大速度越慢
            rowHeight:27 //每行的高度
        };
        var opts = $.extend({}, defaults, options),intId = [];
        function marquee(obj, step){
            obj.find("ul").animate({
                marginTop: '-=1'
            },0,function(){
                var s = Math.abs(parseInt($(this).css("margin-top")));
                if(s >= step){
                    $(this).find("li").slice(0, 1).appendTo($(this));
                    $(this).css("margin-top", 0);
                }
            });
        }
        this.each(function(i){
            var sh = opts["rowHeight"],speed = opts["speed"],_this = $(this);
            intId[i] = setInterval(function(){
                if(_this.find("ul").height()<=_this.height()){
                    clearInterval(intId[i]);
                }else{
                    marquee(_this, sh);
                }
            }, speed);
            _this.hover(function(){
                clearInterval(intId[i]);
            },function(){
                intId[i] = setInterval(function(){
                    if(_this.find("ul").height()<=_this.height()){
                        clearInterval(intId[i]);
                    }else{
                        marquee(_this, sh);
                    }
                }, speed);
            });
        });
    }
})(jQuery);
~function () {
    $(window).on('resize', function () {
        var enLiHig = parseFloat($("#enlist li").height());
        $("#enlist").myScroll({
            speed:36,                   //数值越大，速度越慢
            rowHeight:enLiHig            //li的高度
        });
    }).trigger('resize');
}();

/************ This javascript created by author xiexkang 2017-06  end************/














