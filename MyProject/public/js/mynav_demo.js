$(".navBar>li").hover((e)=>{
    //console.log($(this));
    $(e.target).children("ul").addClass("showDown");
},(e)=>{
    //console.log(1);
    console.log($(e.target));
    $(".showDown").removeClass("showDown");
});