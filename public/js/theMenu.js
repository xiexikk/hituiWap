// 手指滑动切换tab栏
+function () {
    var theMenuList = ".tabMenu_list",
        s = "cur";
    $(theMenuList).css("left",0);
    $(theMenuList +" li").each(function(){
        $(theMenuList +" li").eq(0).addClass(s).siblings().removeClass(s);
    });
    var nav_w=  $(theMenuList +" li").first().width();
    $(theMenuList +" li").on('click', function(){
        nav_w=$(this).width();
        $(this).addClass(s).siblings().removeClass(s);
        var fn_w = ($(".tabMenu").width() - nav_w) / 2;
        var fnl_l;
        var fnl_x = parseInt($(this).position().left);
        if (fnl_x <= fn_w) {
            fnl_l = 0;
        } else if (fn_w - fnl_x <= flb_w - fl_w) {
            fnl_l = flb_w - fl_w;
        } else {
            fnl_l = fn_w - fnl_x;
        }
        $(theMenuList).animate({
            "left" : fnl_l
        }, 300);

    });
    var fl_w=$(theMenuList).width();
    var flb_w=$(".tabMenu_left").width();
    $(theMenuList).on('touchstart', function (e) {
        var touch1 = e.originalEvent.targetTouches[0];
        x1 = touch1.pageX;
        y1 = touch1.pageY;
        ty_left = parseInt($(this).css("left"));
    });
    $(theMenuList).on('touchmove', function (e) {
        var touch2 = e.originalEvent.targetTouches[0];
        var x2 = touch2.pageX;
        var y2 = touch2.pageY;
        if(ty_left + x2 - x1>=0){
            $(this).css("left", 0);
        }else if(ty_left + x2 - x1<=flb_w-fl_w){
            $(this).css("left", flb_w-fl_w);
        }else{
            $(this).css("left", ty_left + x2 - x1);
        }
        if(Math.abs(y2-y1)>0){
            e.preventDefault();
        }
    });
    for(n=1;n<9;n++){
        var page='pagenavi'+n;
        var mslide='slider'+n;
        var mtitle='emtitle'+n;
        arrdiv = 'arrdiv' + n;
        /* var as=document.getElementById(page).getElementsByTagName('a');*/
        var tt=new TouchSlider({id:mslide,'auto':'-1',fx:'ease-out',direction:'left',speed:600,timeout:5000,'before':function(index){
            var as=document.getElementById(this.page).getElementsByTagName('a');
            as[this.p].className='';
            this.p=index;
            fnl_x =  parseInt($(theMenuList +" li").eq(this.p).position().left);
            nav_w= $(theMenuList +" li").eq(this.p).width();
            $(theMenuList +" li").eq(this.p).addClass(s).siblings().removeClass(s);
            var fn_w = ($(".tabMenu").width() - nav_w) / 2;
            var fnl_l;
            if (fnl_x <= fn_w) {
                fnl_l = 0;
            } else if (fn_w - fnl_x <= flb_w - fl_w) {
                fnl_l = flb_w - fl_w;
            } else {
                fnl_l = fn_w - fnl_x;
            }
            $(theMenuList).animate({
                "left" : fnl_l
            }, 300);
        }});
        tt.page = page;
        tt.p = 0;
    }
}();
