/**
 * Created by Administrator on 2017/5/31.
 */
//listenCourse.html 头部滑动
$(document).ready(function () {
    /*
     1.需要进行滑动的父容器：swipeDom:指需要进行滑动的元素的父元素
     2.方向:swipeType  x/y
     3.弹簧区间 swipeDistance
     * */
    itcast.iScroll({
        swipeDom:document.querySelector(".com"),
        swipeType:"x",
        swipeDistance:50
    });


//头部的点击事件  此处用click处理
    var li=$("#hUl li"),
        active="active";      //当前的li具有的类

    li.on("click",function () {
        $(this).find("a").addClass(active).parents("li").siblings().find("a").removeClass(active);
    });

//中间的选项卡切换
    var $li=$(".contHear ul li"),
        show="show",    //swipe块的显示
        cur="cur";      // 当前的li的类

    $li.on("click",function(event){
        $(".contHear ul li").eq($(this).index()).addClass("cur").siblings().removeClass('cur');
        $(".mianCont .swipe").eq($(".contHear ul li").index(this)).addClass("show").siblings().removeClass('show');
    });

});


//playVideo.html
$(document).ready(function () {
    var $ke=$(".Hrow .ke"),
        Hicon=$(".Hrow .ke .icon-xiala"),
        introduce=$(".Hrow .introduce");    //介绍的内容块

    $ke.on("click",function () {
        if(Hicon.hasClass("icon-xiala")){
            Hicon.removeClass("icon-xiala").addClass("icon-guanbi");
            introduce.show();
            return false;
        }else{
            Hicon.removeClass("icon-guanbi").addClass("icon-xiala");
            introduce.hide();
            return false;
        }
    });

    var $mesIcoT=$(".item .hand .mesIcoT"),     //主人回复按钮
        $mesIcoB=$(".itemX .hand .mesIcoB"),    //客人回复按钮
        show="show",                            //控制主人回复框显示的类
        cancle=$(".anArea .bot .cancleBtn"),    //取消按钮
        subBtn=$(".anArea .bot .subBtn");       //确定按钮

    /*回复框   biaoshi按钮的属性值，dui默认是布尔值true, fa回复按钮的父级元素，textarea回复按钮控制的文本框，cuo默认是布尔值false */
    function huifu(obj,biaoshi,dui,fa,textarea,cuo) {
        obj.on("click",function () {
            var flag=$(this).attr(biaoshi);
            if(flag==dui){
                $(this).parents(fa).find(textarea).show();
                flag=$(this).attr("flag",cuo).attr(biaoshi);
            }else{
                $(this).parents(fa).find(textarea).hide();
                flag=$(this).attr("flag",dui).attr(biaoshi);
            }
        })
    }

//主人回复按钮
    huifu($mesIcoT,"flag","true","li",".anAreaT","false");

//客人回复按钮
    huifu($mesIcoB,"flag","true",".itemX",".anAreaB","false");

    /*点击取消操作 fa按钮的父级元素，txtarea按钮控制要显示的文本框，btn是图标按钮 ， flag图标按钮的标识，ble图标按钮标识的布尔值*/
    function fromCancel(obj,fa,txtarea,btn,flag,ble) {
        obj.on("click",function () {
            $(this).parents(fa).find(txtarea).hide();
            $(this).parents(fa).find(btn).attr(flag,ble);
            return false;
        });
    }

   //主人回复按钮下的取消
    fromCancel(cancle,"li",".anAreaT",".mesIcoT","flag","true");

   //客人回复按钮下的取消
    fromCancel(cancle,".itemX",".anAreaB",".mesIcoB","flag","true");
});


//learn.html
$(document).ready(function () {
    var $li=$(".learnTab ul li"),
        show="show",    //swipe块的显示
        cur="cur";      // 当前的li的类

    $li.on("click",function(event){
        $(".learnTab ul li").eq($(this).index()).addClass("cur").siblings().removeClass('cur');
        $(".Hlearn .questionMain").eq($(".learnTab ul li").index(this)).addClass("show").siblings().removeClass('show');
    });

//笔记修改  删除块
    (function () {
            var $revise=$(".noteItem .revise"),         //修改按钮
                active="active",                      //控制文本框显示的类
                $delete=$(".noteItem .delete"),       //删除按钮
                $cancleBtn=$(".noteItem .cancleBtn"), //取消按钮
                $subBtn=$(".noteItem .subBtn");       //确认按钮

            for(var i=0;i<$revise.length;i++){
                (function () {
                    $revise[i].onclick=function (e) {
                        var father=$(this).parents(".noteItem");
                        var $pp=$(this).parents(".noteItem").find(".pp");
                        var textarea=$(this).parents(".noteItem").find("textarea");
                        var $foot=$(this).parents(".noteItem").find(".noteFoot");

                        if(father.hasClass(active)){
                            father.removeClass(active).siblings().removeClass(active);
                            $pp.html(textarea.val());
                            $foot.show();

                        }else{
                            father.addClass(active).siblings("").removeClass(active);
                            textarea.val($pp.text());
                            $pp.hide();
                            $foot.hide();
                        }
                        return false;
                    }

                })(i)
            }

            //用户点击确定按钮
            $subBtn.on("click",function () {
                var myfa=$(this).parents(".noteItem"),       //当前的父元素
                    myp=myfa.find("p"),                     //当前父元素下的p
                    mytextarea=myfa.find("textarea"),      //当前元素的textarea
                    mynoteFoot=myfa.find(".noteFoot");    //当前的底部

                if(myfa.hasClass(active)){
                    myfa.removeClass(active);
                    myp.html(mytextarea.val());
                    myp.show();
                    mynoteFoot.show();
                    return false;
                }
            });

            //用户点击取消按钮
            $cancleBtn.on("click",function () {
                var myfa=$(this).parents(".noteItem"),       //当前的父元素
                    myp=myfa.find("p"),                   //当前父元素下的p
                    mynoteFoot=myfa.find(".noteFoot");   //当前的底部

                if(myfa.hasClass(active)){
                    myfa.removeClass(active);
                    myp.show();
                    myp.html();
                    mynoteFoot.show();
                    return false;
                }
            });
        })();


//用户点击删除按钮
    ~function () {
        //回复框
        var deletea=$(".noteItem .fr .delete");
        dLength=deletea.length;
        Hmask=$(".Hmask");
        for(var i=0; i<dLength;i++){
            (function (num) {
                deletea[i].onclick = function () {
                    Hmask.show().find(".maskDel").addClass("delBoxAni");
                    // $(this).parents(".fr").siblings("p").remove();
                }
            })(i);
        }
        //取消删除
        $(".Hcancel").on("click",function () {
            $(this).parents(".Hmask").hide();
        });

        //确认删除
        function subDel(sObj,ele) {
            $(".Hsubmit").on("click",function () {
                var Hmask=$(".Hmask");
                Hmask.hide();
                $(this).parents(".Hmask").siblings(sObj).find(ele).eq($(this).index()-1).remove();
                return false;
            });
        }

        subDel(".noteItem",".pp");
    }();
});


//video.html
$(document).ready(function () {
    //点击收藏小心心
    var $heart=$("i.icon-shoucang");
    $heart.on("click",function () {
        if($(this).hasClass("icon-shoucang")){
            $(this).removeClass("icon-shoucang").addClass("icon-icon-sel-shixin");
            return false;
        }else{
            $(this).removeClass("icon-icon-sel-shixin").addClass("icon-shoucang");
            return false;
        }
    });
});


//buyVideo.html
$(document).ready(function () {
   var pp=$(".classify .firstP"),              //要点击的对象
       $videoMsg=$(".classify .videoMsg"),      //视频分类信息
       iconTop="icon-icon-back-copy",        //默认向上的箭头
       iconDowm="icon-icon-back-copy-copy";   //向下的箭头

    pp.on("click",function () {
       var $i=$(this).find("i");
       if($i.hasClass(iconTop)){
           $i.removeClass(iconTop).addClass(iconDowm);
           $videoMsg.show();
           return false;
       }else{
           $i.removeClass(iconDowm).addClass(iconTop);
           $videoMsg.hide();
           return false;
       }
    });

    //视频分类下拉中的点击事件
     var li=$(".videoMsg li"),     //拿到点击的每一个li
         cur="cur";                //当前li具有的颜色

    li.on("click",function () {
         $(this).addClass(cur).siblings().removeClass(cur);
    });

});

/* index.html */
$(document).ready(function() {

    //首页中的轮播图
    function bannerAnimation() {
        //首页中的轮播图
        var banner=$(".banner"),
            banWidth=banner.width(),     //大盒子的宽度
            dotUl=$(".banner .dotUl"),
            index=0;                     //标识一个索引

        //让图片自动轮播
         var setTime =setInterval(function() {
                (index < 4) ? (index++) : (index = 0);
                $(".dotUl li").eq(index).addClass("now").siblings().removeClass("now");
                $(".imgUl img").eq(index).show().parents("li").siblings().find("img").hide();
            }, 1000);

    };

    bannerAnimation();


    //热门视频中的轮播图
    (function () {
        var $left=$(".Harr .icon-icon-back-left"),      //左边的箭头
            $right=$(".Harr .icon-icon-back-right");    //右边的箭头
            $ul=$(".listVideo .NEW ul"),               //ul块
            $li=$(".NEW ul li"),                      //ul中的li
            lenght=$li.size(),                       //li的长度
            width=$li.width(),                      //每个li的宽度
            index=0;                                //定义一个索引

        $ul.css({width:width*lenght});

        //用户点击右边按钮
        function moveR(){
            if (index < lenght - 1) {
                index++;
            }
          $ul.animate({ left:-(width * index)+'px' });
          return false;
        }

       //用户点击右边的按钮
        $right.on("click",function () {
            moveR();
        });

        //用户点击左边的按钮
        function moveL() {
            if(index>0){
                index--;
            }
           $ul.animate({left:-(width * index)+'px'});
        };

      //用户点击左边按钮
        $left.on("click",function () {
            moveL();
        });
    })();

});



