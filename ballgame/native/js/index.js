$(document).ready(function(){
    window._triggerEvent = (document.ontouchstart!==null) ?  'click' : 'touchstart';
    //是否处于开发模式
    window.isDebugger = false;
    //页面error提示
    isDebugger && (window.onerror = function (e) { alert(e); } );//页面error提示
    //打印函数封装
    window.log = function(msg) {
        if (window.console && console.log) {
            console.log(msg);
        }else {
            isDebugger && (Popup ? Popup.tip(msg) : alert(msg));
        }
    };
    //初始化
    (function init(){
        //画布
        var cvsRadio = 2; //解决canvas画图模糊问题
        var cvsId = 'cvs'; //canvas所在标签ID
        var cvs = document.getElementById(cvsId), //canvas对象
            ctx = cvs.getContext('2d'), //canvas 2d对象
            cvsW = cvs.width, //canvas宽度
            cvsH = cvs.height; //canvas高度
        //所需图片资源
        var resource_prefix = "./imgs/";
        var resourceObj = {
            "bg": "bg.png", //0
            "cup": "cup.png", //1
            "ball": "ball.png", //2
            "shadow": "shadow.png", //3
            "button": "button.png" //4
        }
        var resource = [resourceObj.bg, resourceObj.cup, resourceObj.ball,resourceObj.shadow, resourceObj.button];
        //图片资源循环加载
        var resourceImg = new Array(), loadedImg = 0, errorImg = 0;
        for(var i=0;i<resource.length;i++){
            resourceImg[i] = new Image();
            resourceImg[i].src = resource_prefix + resource[i];
            console.log(resourceImg[i].src)
            resourceImg[i].onload = function(_src){
                loadedImg++;
                (loadedImg+errorImg==resource.length) && loadComplete();
                //console.log("loadedImg: "+resourceImg[i].src);
            }
            resourceImg[i].onerror = function(){
                errorImg++;
                (loadedImg+errorImg==resource.length) && loadComplete();
                //console.log("errorImg: "+resourceImg[i].src);
            }
        }
        //图片资源加载完毕操作函数
        //绘制shadow
        var shadow = resourceImg[3], shadow_w = shadow.width/2,  shadow_h = shadow.height/2; //shadow在cvs上显示的宽高
        var drawShadow = function(){
            ctx.drawImage(shadow, 52, 250, shadow_w, shadow_h); //绘制shadow1
            ctx.drawImage(shadow, 52 + shadow_w, 270, shadow_w, shadow_h); //绘制shadow2
            ctx.drawImage(shadow, 52 + 2*shadow_w, 250, shadow_w, shadow_h); //绘制shadow3
        }
        //绘制ball
        var shadow = resourceImg[3], shadow_w = shadow.width/2; //shadow在cvs上显示的宽度
        var ball = resourceImg[2], ball_w = ball.width/2,  ball_h = ball.height/2; //ball在cvs上显示的宽高
        var drawBall = function(){ //_index表示放置ball的位置
            _ballIndex ==1 && ctx.drawImage(ball, 90, 220, ball_w, ball_h); //绘制ball1
            _ballIndex ==2 && ctx.drawImage(ball, 90 + shadow_w, 240, ball_w, ball_h); //绘制ball2
            _ballIndex ==3 && ctx.drawImage(ball, 90 + 2*shadow_w, 220, ball_w, ball_h); //绘制ball3
        }
        //绘制cup
        var cup, cup_w, cup_h; //cup在cvs上显示的宽高
        var cup1Info, cup2Info, cup3Info; //cup1,cup2,cup3的x,y值
        var shadow = resourceImg[3], shadow_w = shadow.width/2; //shadow在cvs上显示的宽度
        cup = resourceImg[1], cup_w = cup.width/2,cup_h = cup.height/2; //cup在cvs上显示的宽高
        cup1Info = {"x": 62, "y": 120 }
        cup2Info = {"x": 62 + shadow_w, "y": 140 }
        cup3Info = {"x": 62 + 2*shadow_w, "y": 120 }
        var drawCup = function(_upNum){ //_upNum表示被点开的那个杯子序号
            ctx.drawImage(cup, cup1Info.x, (_upNum==1 ? cup1Info.y-30 : cup1Info.y), cup_w, cup_h); //绘制cup1
            ctx.drawImage(cup, cup2Info.x, (_upNum==2 ? cup2Info.y-30 : cup2Info.y), cup_w, cup_h); //绘制cup2
            ctx.drawImage(cup, cup3Info.x, (_upNum==3 ? cup3Info.y-30 : cup3Info.y), cup_w, cup_h); //绘制cup3
        }
        var _ballIndex; //气球放置位置
        var loadComplete = function(){
            console.log("图片加载完毕！");
            _ballIndex = Math.floor(Math.random()*3+1);
            toDraw();
        }
        var toDraw = function(_clickCup){ //_clickCup表示被点开的那个杯子序号
            ctx.clearRect(0, 0, cvsW, cvsH);
            ctx.drawImage(resourceImg[0], 0, 0, cvsW, cvsH); //绘制背景
            drawShadow();
            drawBall();
            drawCup(_clickCup);
            if(_clickCup){
                //(_clickCup==_ballIndex) ? Popup.tip("你猜对了！") : Popup.tip("你猜错了！！");
                if((_clickCup==_ballIndex)){
                    Popup.prompt("你猜对了！再玩一次？？",function () {
                        _ballIndex = Math.floor(Math.random()*2+1);
                        toDraw();
                    })
                }else{
                    Popup.tip("你猜错了！再猜猜看！！！");
                }
            }
        }
        //点击事件处理
        cvs.onclick = function(e){
            e = e||event;//获取事件对象
            //获取事件在canvas中发生的位置
            var x = e.clientX-cvs.offsetLeft;
            var y = e.clientY-cvs.offsetTop;
            if(x>=cup1Info.x && x<=cup1Info.x+cup_w && y>=cup1Info.y && y<=cup1Info.y+cup_h){ //判断点击位置是否在杯子1范围内
                console.log("点击了杯子1");
                toDraw(1);
            }
            if(x>=cup2Info.x && x<=cup2Info.x+cup_w && y>=cup2Info.y && y<=cup2Info.y+cup_h){ //判断点击位置是否在杯子2范围内
                console.log("点击了杯子2");
                toDraw(2);
            }
            if(x>=cup3Info.x && x<=cup3Info.x+cup_w && y>=cup3Info.y && y<=cup3Info.y+cup_h){ //判断点击位置是否在杯子3范围内
                console.log("点击了杯子3");
                toDraw(3);
            }
        };
    })();
});