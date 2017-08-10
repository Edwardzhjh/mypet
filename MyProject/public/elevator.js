$(()=>{
    //获得所有楼层气泡span
    var $spans=$(".title>h2>span");
    //获得id为elevator的div
    var $elev=$("#elevator");
    //获得返回顶部小图标
    var $toTop=$(".toTop");
    //为window绑定滚动事件
    $(window).scroll(()=>{
        //获得页面滚动过的高度:
        var scrollTop= $("body").scrollTop();
        //遍历每个span
        $spans.each((i,span)=>{
            var $span=$(span);
            //如果当前span的offsetTop<(scrollTop+innerHeight/2)
            if($span.offset().top<=(scrollTop+innerHeight/2)){
                //清除所有span的class
                $spans.removeClass("hover");
                //让当前span为hover
                $span.addClass("hover");
                //设置$elev下ul下的第i个li为active，清除其余li的class
                $elev.find("ul>li:eq("+i+")")
                    .addClass("active")
                    .siblings()
                    .removeClass("active");
            }else{
                //移出当前span的hover
                $span.removeClass("hover");
            }
        })
        //如果$spans中有.hover的
        if($spans.is(".hover")){
            $elev.show();//设置$elev显示
            //返回顶部小图标显示
            $toTop.addClass("show");
        }else{//否则
            $elev.hide();//设置$elev隐藏
            //返回顶部小图标隐藏
            $toTop.removeClass("show");
        }
    })
    //鼠标进入电梯按钮翻面
    $elev
        .on("mouseover","a:first-child",e=>$(e.target).parent().addClass("active"))
        .on("mouseout","a:last-child",
            e=>{
            var $li=$(e.target).parent();
            //查找当前li在所有li中的下标
            var i= $elev.find("ul>li").index($li);
            console.log();
            if(!$spans.eq(i).is(".hover"))
                $li.removeClass("active")
        });

    //为$elev添加单击事件委托，只允许li下的最后一个a响应事件
    $elev.on("click","li>a:last-child", e=>{
        //让页面滚动到当前li对应的span的offsetTop的位置
        var $li=$(e.target).parent();
        var i=$elev.find("ul>li").index($li);
        var $span=$spans.eq(i);
        $("body").animate({
            scrollTop:$span.offset().top
        },500);
    })
    //回到顶部小图标的点击事件
    $toTop.on("click",e=>{
        $("body").animate({scrollTop:0},500);
    })
})