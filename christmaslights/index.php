<!DOCTYPE HTML>
<html><head>
    <meta charset="UTF-8">
    <title>万象城22</title>
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="black">
    <meta name="format-detection" content="telephone=no">
    <meta name="format-detection" content="email=no">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=0">
    <link rel="stylesheet" type="text/css" href="css/common.css" />
</head>
<body>
<div class="fm_stage">
    <div class="fm_wrap">
        <section class="fm fm1 cur">
            <div class="piece">
                <i class="snow1 style1" style="left:448.44px; top:-28.02px; -webkit-animation: snow 6s linear 0.1s infinite;"></i>
                <i class="snow1 style1" style="left:94.72px; top:-20.59px; -webkit-animation: snow 6s linear 1s infinite;"></i>
                <i class="snow1 style2" style="left:457.09px; top:-23.82px; -webkit-animation: snow 5s linear 1s infinite;"></i>
                <i class="snow1 style1" style="left:316.11px; top:-26.73px; -webkit-animation: snow 5s linear 0.1s infinite;"></i>
                <i class="snow1 style3" style="left:348.04px; top:-20.08px; -webkit-animation: snow 6s linear 2s infinite;"></i>
                <i class="snow1 style1" style="left:385.96px; top:-29.19px; -webkit-animation: snow 5s linear 3s infinite;"></i>
                <i class="snow2 style2" style="left:296.15px; top:-29.17px; -webkit-animation: snow 10s linear 3s infinite;"></i>
                <i class="snow2 style3" style="left:346.66px; top:-23.16px; -webkit-animation: snow 9s linear 5s infinite;"></i>
                <i class="snow2 style1" style="left:156.48px; top:-22.29px; -webkit-animation: snow 10s linear 4s infinite;"></i>
                <i class="snow2 style2" style="left:16.43px; top:-25.69px; -webkit-animation: snow 9s linear 1s infinite;"></i>
                <i class="snow2 style2" style="left:28.49px; top:-26.21px; -webkit-animation: snow 8s linear 1s infinite;"></i>
                <i class="snow2 style3" style="left:3.82px; top:-25.30px; -webkit-animation: snow 9s linear 2s infinite;"></i>
                <i class="snow2 style2" style="left:12.18px; top:-23.42px; -webkit-animation: snow 9s linear 4s infinite;"></i>
                <i class="snow2 style3" style="left:11.88px; top:-26.34px; -webkit-animation: snow 10s linear 4s infinite;"></i>
                <i class="snow2 style3" style="left:236.62px; top:-23.36px; -webkit-animation: snow 9s linear 5s infinite;"></i>
                <i class="snow2 style2" style="left:48.04px; top:-28.08px; -webkit-animation: snow 8s linear 3s infinite;"></i>
                <i class="snow2 style1" style="left:116.67px; top:-24.12px; -webkit-animation: snow 10s linear 3s infinite;"></i>
                <i class="snow2 style3" style="left:4.72px; top:-21.74px; -webkit-animation: snow 9s linear 5s infinite;"></i>
                <i class="snow2 style3" style="left:-194.31px; top:-26.23px; -webkit-animation: snow 8s linear 5s infinite;"></i>
                <i class="snow2 style3" style="left:32.37px; top:-27.36px; -webkit-animation: snow 8s linear 3s infinite;"></i>
                <i class="snow2 style3" style="left:-7.74px; top:-22.74px; -webkit-animation: snow 10s linear 5s infinite;"></i>
                <i class="snow3 style2" style="left:368.74px; top:-25.60px; -webkit-animation: snow 7s linear 1s infinite;"></i>
                <i class="snow3 style3" style="left:14.08px; top:-37.95px; -webkit-animation: snow 6s linear 2s infinite;"></i>
                <i class="snow3 style1" style="left:126.24px; top:-23.34px; -webkit-animation: snow 7s linear 3s infinite;"></i>
                <i class="snow3 style3" style="left:312.02px; top:-32.79px; -webkit-animation: snow 6s linear 5s infinite;"></i>
                <i class="snow3 style3" style="left:177.39px; top:-32.00px; -webkit-animation: snow 5s linear 1s infinite;"></i>
                <i class="snow3 style2" style="left:644.23px; top:-35.51px; -webkit-animation: snow 5s linear 4s infinite;"></i>
                <i class="snow3 style2" style="left:258.58px; top:-42.24px; -webkit-animation: snow 5s linear 4s infinite;"></i>
                <i class="snow3 style3" style="left:222.16px; top:-42.89px; -webkit-animation: snow 6s linear 0.1s infinite;"></i>
            </div>
            <img src="./img/arrow-up.png" class="up_arrow"/>
        </section>
        <section class="fm fm2 cover"><img src="./img/arrow-up.png" class="up_arrow"/></section>
        <section class="fm fm3">
            <img src="./img/share_tip.png" width="104" class="share_tip"/>
            <span class="share_btn"></span>
            <div class="boc_logo"><img src="./img/boc.png" width="120" /></div>
        </section>
    </div>
</div>
<div class="music on">&nbsp;</div>
<audio src="./img/music1.mp3" id="audio_player" loop="loop" autoplay="autoplay">HTML5 Audio is not supported</audio>
<div id="cover">
    <img src="./img/hand.png" class="cover_hand"/>
</div>
<script src="./js/zepto.js" type="text/javascript"></script>
<script type="text/javascript">
    var hasScratch = false;
    $(function() {
        var body_width = document.documentElement.clientWidth;
        var body_height = document.documentElement.clientHeight;
        var move_obj = $(".fm_wrap");
        var fm = move_obj.find(".fm");
        var fm_len = fm.length;
        var starPoint,nowPoint,moveSpace;
        var move_speed = 300; //翻转速度
        var min_move = 30; //翻转触发最小距离
        var angle = 90;
        var per = 0,per2;
        var cur_index;
        var change = function(obj,translateY,rotateX,time,opacity,bezier){
            var bezier = bezier ? bezier : "linear";
            obj.css({ '-webkit-transform':"translateY("+translateY+"%) rotateX("+rotateX+"deg)",'-webkit-transition':time+'ms '+bezier, 'transform':"translateY("+translateY+"%) rotateX("+rotateX+"deg)",'transition':time+'ms '+bezier,'opacity':opacity });
        }
        var touchevent = {
            mystar: function(e){
                starPoint = e.touches[0].pageY;
                cur_index = $(this).index();
                move_obj.children().removeClass("cur").eq(cur_index).addClass("cur");
            },
            mymove: function(e){
                e.stopPropagation();
                e.preventDefault();
                nowPoint = e.touches[0].pageY;
                moveSpace = nowPoint-starPoint;
                per = moveSpace/body_width;
                per2 = 1-Math.abs(per);
                if(moveSpace>0){ //鼠标往下滑
                    if(cur_index>0){
                        $(".fm_bottom").removeClass("fm_active");
                        $(".fm_top").addClass("fm_active");
                        change($(".fm_top"),-per2*100,angle*per2,0); //opacity变化: Math.abs(per)
                        $(".fm_mid").removeClass("fm_top").addClass("fm_bottom");
                        change($(".fm_mid"),per*100,-angle*per,0); //opacity变化: 1-Math.abs(per)
                    }
                }else if(cur_index<fm_len-1){ //鼠标往上滑
                    $(".fm_top").removeClass("fm_active");
                    $(".fm_bottom").addClass("fm_active");
                    change($(".fm_bottom"),per2*100,-angle*per2*4/5,0); //opacity变化: Math.abs(per)
                    $(".fm_mid").removeClass("fm_bottom").addClass("fm_top");
                    change($(".fm_mid"),per*100,-angle*per,0); //opacity变化: 1-Math.abs(per)
                }
            },
            myend: function(e){
                if(Math.abs(moveSpace)>min_move){ //进行翻转
                    if(moveSpace>0){ //鼠标往下滑
                        if(cur_index>0){
                            cur_index--;
                            change($(".fm_top"),0,0,move_speed);
                            change($(".fm_mid"),100,-angle,move_speed,1);
                        }
                    }else if(cur_index<fm_len-1){ //鼠标往上滑
                        cur_index++;
                        change($(".fm_bottom"),0,0,move_speed);
                        change($(".fm_mid"),-100,angle,move_speed,1);
                    }
                    //fm_mid,fm_top,fm_bottom重置
                    setTimeout(function(){
                        fm.removeClass("fm_mid").removeClass("fm_top").removeClass("fm_bottom").removeClass("fm_active");
                        fm.eq(cur_index).addClass("fm_mid");
                        if(cur_index<fm_len-1){ fm.eq(cur_index+1).addClass("fm_bottom"); }
                        if(cur_index>0){ fm.eq(cur_index-1).addClass("fm_top"); }
                        //添加动画开始标签
                        fm.removeClass("cur").find(".animated").removeClass("in");
                        fm.eq(cur_index).addClass("cur").find(".animated").addClass("in");
                        if(cur_index==1&&!hasScratch){
                            fm.eq(cur_index).removeClass("cover");
                            $("#cover").show();
                        }
                    },move_speed)
                }else{ //返回原位
                    if(moveSpace>0&&cur_index>0){ //鼠标往右滑
                        change($(".fm_top"),-100,-angle,move_speed/2);
                    }else if(cur_index<fm_len-1){ //鼠标往左滑
                        change($(".fm_bottom"),100,angle,move_speed/2);
                    }
                    change($(".fm_mid"),0,0,move_speed/2);
                }
                moveSpace = 0;
            }
        }
        $(document).ready(function() {
            fm.eq(0).addClass("fm_mid");
            fm.eq(1).addClass("fm_bottom");
            $(".fm").css("width",body_width);
            $(".fm_stage,.fm").css("height",body_height);
            fm.bind("touchstart", touchevent.mystar);
            fm.bind("touchmove", touchevent.mymove);
            fm.bind("touchend", touchevent.myend);
            $(".share_btn").on("touchstart","",function(){
                $(".share_tip").show();
            })
            $(".music").on("touchstart","",function(){
                if(audio_player.paused){
                    audio_player.play(); $(".music").removeClass("off").addClass("on");
                }else{
                    audio_player.pause(); $(".music").removeClass("on").addClass("off");
                }
            });
            $('html').one('touchstart',function(){
                if(audio_player.paused){ audio_player.play(); }
            });
        });
    });
</script>
<script src="./js/Scratch.js" type="text/javascript"></script>
<script type="text/javascript">
    var scratch_callback = function(){
        $("#cover").addClass("hiding");
        setTimeout(function(){
            $("#cover").remove();
        },800)
    }
    var _param = {
        node: $('#cover')[0],
        cover: './img/cover.jpg',
        coverType: 'image',
        coverTxt: "reiki",
        w: $(window).width(),
        h: $(window).height(),
        isResize: true,
        drawMode: "h100",
        callback: scratch_callback
    }
    var scratch = new Scratch(_param);
    scratch.init("./img/fm2_bg.jpg");
    //scratch.init();
</script>
</body>
</html>