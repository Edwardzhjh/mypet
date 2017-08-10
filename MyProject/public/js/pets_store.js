//导航条js
$activeli=$("#logo-nav>li:nth-child(3)");

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