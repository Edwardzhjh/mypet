//������js
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

//�ֲ�ͼƬ
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
        //���ñ任������
        //console.log(curIndex);
        changeTo(curIndex);
    },3500);
    //console.log($items.eq(curIndex));
    //����任������
    function changeTo(num){
        $items.eq(num).animate({opacity:1},500).siblings("li").animate({opacity:0},500);
        //���½�Сͼ����֮�ı�
        $indexs.eq(num).addClass("hover").siblings().removeClass("hover");
        $content.eq(num).addClass("active").siblings().removeClass("active");
    }
    //�����ͣͼƬ��ֹͣ�ֲ�������ͼƬ�ƿ��������ֲ�
    $items.hover(()=>{
        clearInterval(autoChange);
    },()=>{
        autoChange=setInterval(()=>{
            if(curIndex < $items.length-1){
                curIndex ++;
            }else{
                curIndex = 0;
            }
            //���ñ任������
            //console.log(curIndex);
            changeTo(curIndex);
        },3500);
    });
    //���½�Сͼ�������ͣ���ƿ��¼�
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
            //���ñ任������
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