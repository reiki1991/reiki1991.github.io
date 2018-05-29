var flashOver = function(){};
Zepto(function($){

    //解析url
    function geturl(name){
        var reg = new RegExp('(^|&)'+ name +'=([^&]*)(&|$)');
        var r = window.location.search.substr(1).match(reg);
        if (r!=null) return unescape(r[2]); return null;
    }
    var page = geturl("page");
    if(page){
        $("."+page).removeClass("hide");
    }else{
        $(".loadingWrap").removeClass("hide");
    }

    //活动详情按钮
    $(".index_active_btn").bind("click",function(){
        $(".homeWrap").addClass("hide");
        $(".activeDetailWrap").removeClass("hide");
    });

    //互动捐助
    $(".index_upload_btn").bind("click",function(){
        window.location.href = "interactive.html";
    });

    //镜片介绍
    $(".index_glass_btn").bind("click",function(){

    });

    var two = new Swiper('.two',{
        calculateHeight:true,
        loop:true,
        grabCursor:true,
        speed:600
//                autoplay:3500
    });
    $('.leftArrows').on('click', function(e){
        e.preventDefault();
        two.swipePrev();
    });
    $('.rightArrows').on('click', function(e){
        e.preventDefault();
        two.swipeNext();
    });

    flashOver = function(){
        $(".canvasWrap").addClass("hide");
        $(".homeWrap").removeClass("hide");
    }
});
