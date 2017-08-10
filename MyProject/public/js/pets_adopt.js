//导航条js
$("#logo-nav>li").hover((e)=>{
    //console.log($(e.target));
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
    //再次发送ajax请求 /pet_list 总页数
    //获取返回的数据总页数
    $.ajax({
        type:"GET",
        url:"petpage",
        success:function(data){
            var p=data.page;
            var html="";
            for(var i=1;i<=p;i++){
                if(i==pageNo){
                    html+=`<li class="active"><a href="#">${i}</a></li>`
                }else{
                    html+=`<li><a href="#">${i}</a></li>`
                }

            }
            $("ol.pageList").html(html);
        }
    })
}
loadPetList(1);

$("ol.pageList").on("click","li a",function(e){
    //1:阻止事件默认行为 a
    e.preventDefault();
    //2:获取当前页码->页数
    var pno = parseInt($(this).html());
    //3:发起异步请求，获取当前页面的产品列表
    //  并且更新分页页条 1 2 3 4 5
    loadPetList(pno);
});