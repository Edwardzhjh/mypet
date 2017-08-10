//导航条js
$("#logo-nav>li>a").hover((e)=>{
        $(e.target).parent().addClass("active").siblings(".active");
    },
    (e)=>{
        //if($(e.target).)
        $("#logo-nav>li:first-child").addClass("active").siblings().removeClass("active");
    });

var fli=document.querySelector("#logo-nav").firstElementChild;
//console.log(fli);
var lis=document.querySelectorAll(".dropdown");
for(var i=0;i<lis.length;i++){
    lis[i].onmouseover=function(){
        this.lastElementChild.className="dropDown-menu show";
        this.className="dropdown active";
        //fli.className="";
    };
    lis[i].onmouseout=function(){
        this.lastElementChild.className="dropDown-menu fade";
        this.className="dropdown";
        //fli.className="active";
    }
}

//轮播图片
$(function(){
    var i=0;
    var WAIT=2000+INTERVAL;
    var INTERVAL=500;
    var $items=$(".items>li");
    var $indexs=$("#indexs>li");
    var $content=$(".banner>.bannerContent");
    //var timer=null;
    //console.log($items.length);
    //console.dir($items);
    var curIndex=0;
    $items.eq(curIndex).css("opacity","1");
    var autoChange=setInterval(()=>{
        if(curIndex < $items.length-1){
            curIndex ++;
        }else{
            curIndex = 0;
        }
        //调用变换处理函数
        //console.log(curIndex);
        changeTo(curIndex);
    },3500);
    //console.log($items.eq(curIndex));
    //定义变换处理函数
    function changeTo(num){
        $items.eq(num).animate({opacity:1},500).siblings("li").animate({opacity:0},500);
        //右下角小图标随之改变
        $indexs.eq(num).addClass("hover").siblings().removeClass("hover");
        $content.eq(num).addClass("active").siblings().removeClass("active");
    }
    //鼠标悬停图片，停止轮播，鼠标从图片移开，继续轮播
    $items.hover(()=>{
        clearInterval(autoChange);
    },()=>{
        autoChange=setInterval(()=>{
            if(curIndex < $items.length-1){
                curIndex ++;
            }else{
                curIndex = 0;
            }
            //调用变换处理函数
            //console.log(curIndex);
            changeTo(curIndex);
        },3500);
    });
    //右下角小图标鼠标悬停和移开事件
    $indexs.hover((e)=>{
        var i=$(e.target).index();
        console.log(i);
        clearInterval(autoChange);
        changeTo(i);
        curIndex=i;
    },()=>{
        autoChange=setInterval(()=>{
            if(curIndex < $items.length-1){
                curIndex ++;
            }else{
                curIndex = 0;
            }
            //调用变换处理函数
            //console.log(curIndex);
            changeTo(curIndex);
    },3500)})
});

//$(function(){
//    var i=0;
//    var WAIT=2000;
//    var INTERVAL=500;
//    var $items=$(".items>li");
//    console.log($items.length);
//    $items.eq(i).animate({opacity:1},0).delay(2000).animate({opacity:0},500,play());
//    function play(){
//        i++;
//        //if(i>$items.length){i=0}
//        $items.eq(i).delay(2000).animate({opacity:1},500).delay(2000).animate({opacity:0},500)
//    }
//})