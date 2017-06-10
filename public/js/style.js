/************ This javascript created by author xiexkang 2017-06  Start************/
var Api  = {
    timeCount  :   60
},
Regs  = {
    integer     :   /^[0-9]*[1-9][0-9]*$/,    //正整数
    intFloat    :   /^[1-9]\d*\.\d*|0\.\d*[1-9]\d*$/,     //正浮点数
},
sended = 'sended';

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

// other
!function () {
    //a标签中嵌套button去除跳转
    $('.accChg .btn').on('click',function (e) {
        return false;
    });
}();

// myBasicInf.html
~function () {
    //关闭提示
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
    // 回复框操作    主人T：一级留言 , 客人B：二级留言
    var mesIcoT = ".mesIcoT", mesIcoB = ".mesIcoB", anAreaT = ".anAreaT", anAreaB = ".anAreaB", itemX  = ".itemX", anArea =".anArea";
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
        wzs = '.js-wz',
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

/************ This javascript created by author xiexkang 2017-06  end************/














