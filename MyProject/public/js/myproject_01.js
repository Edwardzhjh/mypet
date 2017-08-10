//导航条js
$("#logo-nav>li").hover((e)=>{
    console.log($(e.target));
    //console.log($(e.target).parent());
    $(e.target).parent().addClass("active");
    if($(e.target).parent().hasClass("dropdown")){
        //console.log(1);
        $(e.target).next().addClass("showdown");
    }
},(e)=>{
    $(e.target).parent().removeClass("active");
    $(".showdown").removeClass("showdown").parent().removeClass("active");
});

//slider 轮播图片
$(function(){
    var imgs=[
        "images/slide1.jpg",
        "images/slide2.jpg",
        "images/slide3.jpg",
        "images/slide4.jpg"
    ];
    var str="";
    for(var src of imgs){
        str+=`<li><a href="#"><img src="${src}" alt=""/></a></li>`;
    }
    $("ul.items").html(str);
    //获取所有图片
    var $items=$(".items>li");
    //获取所有图片编号
    var $indexs=$("#indexs>li");
    //右边文字内容
    var $bannerContent=$(".banner>.bannerContent");
    //console.log($items.length);
    //console.dir($items);
    //令当前编号为0;
    var curIndex=0;
    $items.eq(curIndex).css("opacity","1");
    //定义自动转换函数
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
        //图片改变 如果用动画队列做例如animate({opacity:1},500).animate({opacity:0},500)
        //中间就会出现一瞬间的白屏
        $items.eq(num).animate({opacity:1},500).siblings("li").animate({opacity:0},500);
        //右下角小图标随之改变
        $indexs.eq(num).addClass("hover").siblings().removeClass("hover");
        //右侧文本随之改变
        $bannerContent.eq(num).addClass("active").siblings().removeClass("active");
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

//明星宠物鼠标悬停放大
//var $starImg=$(".starImg img");
//    $starImg.hover((e)=>{
//        //console.log($(e.target));
//        $(e.target).animate({left:-25,top:-10,width:400,opacity:1},200);
//},(e)=>{
//        $(e.target).animate({left:0,top:0,width:350,opacity:.7},200);
//    });
//$starImg.hover((e)=>{
//    $(e.target).addClass("hover");
//},(e)=>{
//    $(e.target).removeClass("hover");
//})

//商品鼠标悬停放大
//var $imgs=$(".storeItems img");
//$imgs.hover((e)=>{
//    //console.log($(e.target));
//    if($(e.target).is(":animated")){
//        $(e.target).stop().animate({left:-50,top:-25,width:500,height:250},200);
//    }else{
//    $(e.target).animate({left:-50,top:-25,width:500,height:250},200)}
//},(e)=>{
//    $(e.target).animate({left:0,top:0,width:400,height:200},200)
//});

//标签页切换
var $lis=$(".storeTab>li");
var $borderOn=$(".borderOn");
var $storeUl=$(".storeUl");
$lis.on("click",(e)=>{
    //console.log($(e.target).index());
    var $n=$(e.target).index();
    $borderOn.animate({left:$n*100+270},250);
    $(".storeContent").eq($n).addClass("active").siblings().removeClass("active");
    $storeUl.animate({left:-$n*1140},350);
});

function loadPetList(pageNo){
//页码的显示 [1] [2] [3] [4] [5]
//1：发送一个ajax请求 /petlist 获取当前页内容
    $.ajax({
        type:"GET",
        url:"/petlist",
        data:{pageNo:pageNo},
        success:function(data){
            //console.log(data);
            //获取返回的数据
            //拼接字符串
            var html="";
            for(var i=0;i<data.length;i++){
                var o=data[i];
                var gender="";
                var str=o.pdate;
                var pubtime=str.substr(0,str.indexOf("T"));
                //console.log(pubtime);
                if(o.pgender==1){gender="男孩"}else{gender="女孩"}
                html+=`
                    <li>
                    <div class="mask">
                        <a href="#">
                            <img class="img-responsive" src="images/${o.ppic}"/>
                            <img class="zoom" src="images/zoom.png"/>
                        </a>
                    </div>
                    <div class="pets_info">
                        <ul>
                            <li>姓名：${o.pname}</li>
                            <li>性别：${gender}</li>
                            <li>年龄：${o.page}个月</li>
                            <li>暂居地：${o.ploc}</li>
                            <li>发布时间：${pubtime}</li>
                        </ul>
                    </div>
                </li>
                `;
            }
            $(".petList").html(html);
        }
    })
}
loadPetList(1);