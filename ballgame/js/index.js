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
    // 自定义数组删除
    Array.prototype.del = function(n){
        if (n<0) return this;
        return this.slice(0,n).concat(this.slice(n+1,this.length));
    }
    var g_movetimes = 10, g_movetime = 500;
    $(".levellist").on("click","button",function(){
        var _hard = $(this).data("hard").split(",");
        g_movetimes = _hard[0]-0;
        g_movetime = _hard[1]-0;
        $(".g_maskbg").hide();
    });
    //初始化
    Preload.init(function () {
        //画布
        var cvsId = 'cvs'; //canvas所在标签ID
        var cvs = document.getElementById(cvsId),
            cvsW = cvs.width, //canvas宽度
            cvsH = cvs.height; //canvas高度
        var stage = new createjs.Stage(cvs);
        //资源
        var _Resource = {
            "bg": new createjs.Bitmap("./imgs/bg.png"),
            "cup1": new createjs.Bitmap("./imgs/cup.png"),
            "cup2": new createjs.Bitmap("./imgs/cup.png"),
            "cup3": new createjs.Bitmap("./imgs/cup.png"),
            "ball1": new createjs.Bitmap("./imgs/ball.png"),
            "ball2": new createjs.Bitmap("./imgs/ball.png"),
            "ball3": new createjs.Bitmap("./imgs/ball.png"),
            "shadow1": new createjs.Bitmap("./imgs/shadow.png"),
            "shadow2": new createjs.Bitmap("./imgs/shadow.png"),
            "shadow3": new createjs.Bitmap("./imgs/shadow.png"),
            "button": new createjs.Bitmap("./imgs/button.png"),
            "button2": new createjs.Bitmap("./imgs/button2.png")
        }
        //变量
        var cupPos; //三处位置信息储存
        var _cupObj, _ballObj, _shadowObj, buttonObj; //cupObj,ballObj,shadowObj储存x,y,width,height等信息
        var initContainer = function(_ballNum){
            _Resource["shadow1"].y = _Resource["shadow2"].y = _Resource["shadow3"].y = _cupObj.height - _shadowObj.height + 10;
            _Resource["ball1"].x = _Resource["ball2"].x = _Resource["ball3"].x = (_shadowObj.width - _ballObj.width)/2;
            _Resource["ball1"].y = _Resource["ball2"].y = _Resource["ball3"].y = _cupObj.height - _ballObj.height - 10;
            _Resource["cup1"].x = _Resource["cup2"].x = _Resource["cup3"].x = (_shadowObj.width - _cupObj.width)/2;
            _Resource.ball1.alpha = _Resource.ball2.alpha = _Resource.ball3.alpha = 0;
            _ballNum && (_Resource[_ballNum].alpha = 1);
            cups[0].x = (cvsW - 3*_shadowObj.width)/4;
            cups[1].x = 2*cups[0].x+_shadowObj.width;
            cups[2].x = cups[1].x+_shadowObj.width+cups[0].x;
            cups[0].y = cups[2].y = (cvsH - _cupObj.height - 10)/1.5;
            cups[1].y = cups[0].y - 20;
            _Resource.button.x = _Resource.button2.x = (cvsW-buttonObj.width)/2;
            _Resource.button.y =_Resource.button2.y = (cvsH-buttonObj.height)-20;
            cupPos = [{x: cups[0].x, y:cups[0].y}, {x: cups[1].x, y:cups[1].y},{x: cups[2].x, y:cups[2].y}];
        }
        var cups = [new createjs.Container(), new createjs.Container(), new createjs.Container()];
        cups[0].addChild(_Resource.shadow1, _Resource.ball1, _Resource.cup1);
        cups[1].addChild(_Resource.shadow2, _Resource.ball2, _Resource.cup2);
        cups[2].addChild(_Resource.shadow3, _Resource.ball3, _Resource.cup3);
        stage.addChild(_Resource.bg);
        stage.addChild(_Resource.button);
        stage.addChild(cups[0]);
        stage.addChild(cups[1]);
        stage.addChild(cups[2]);
        var moveCup = function (_times, _tweentime) { //通过次数_tweentime和时间time来难度调整
            var originArr, radomArr,count = 0, tempPos; //随机数组
            var _movetimer = setInterval(function () {
                if(count++>_times){
                    clearInterval(_movetimer);
                    _isableClick = true;
                    return;
                }
                originArr = [0,1,2];
                radomArr = [];
                radomArr.push(count%3); //第一个数累加重复【1,2,0,1,2,0...】
                radomArr.push(originArr.del(count%3)[Math.round(Math.random())]); //第二个数在剩下的数字中随机挑选
                createjs.Tween.get(cups[radomArr[0]]).to({x:cupPos[radomArr[1]].x,y:cupPos[radomArr[1]].y}, _tweentime, createjs.Ease.cubicInOut);
                createjs.Tween.get(cups[radomArr[1]]).to({x:cupPos[radomArr[0]].x,y:cupPos[radomArr[0]].y}, _tweentime, createjs.Ease.cubicInOut);
                tempPos = $.extend(true,{},cupPos);
                cupPos[radomArr[0]] = tempPos[radomArr[1]];
                cupPos[radomArr[1]] = tempPos[radomArr[0]];
            },_tweentime+10);
        }
        //var gameplaying = false; //游戏是否正在进行中 //if(gameplaying){ return; } gameplaying = true;
        var beginClick = function(e){
            _clickedObj && (_clickedObj.y += _ballObj.height);
            var _targetCup = _Resource["cup"+_ballIndex];
            stage.removeChild(_Resource.button);
            stage.removeChild(_Resource.button2);
            _Resource["cup"+_ballIndex].y -= _shadowObj.height*2;
            setTimeout(function () {
                _Resource["cup"+_ballIndex].y += _shadowObj.height*2;
                console.log(g_movetime);
                moveCup(g_movetimes, g_movetime);
            },1000);
        }
        var _isableClick = false, _tipMsg, _clickedObj;
        var cupClick = function(e){
          if(!_isableClick) { return; }
          _clickedObj = e.target;
          _clickedObj.y -= _ballObj.height;
          if(e.target.parent.getChildAt(1).alpha){
            _tipMsg = "你猜对了！";
          }else{
            _tipMsg = "你猜错了！";
          }
          setTimeout(function(){
            alert(_tipMsg);
            stage.addChild(_Resource.button2);
          },100)
         }
        _Resource["cup1"].addEventListener("click",cupClick);
        _Resource["cup2"].addEventListener("click",cupClick);
        _Resource["cup3"].addEventListener("click",cupClick);
        _Resource.button.addEventListener("click",beginClick);
        _Resource.button2.addEventListener("click",beginClick);
        //ticker
        var _ballIndex; //气球放置位置
        var _isfirst = true;
        createjs.Ticker.setFPS(30);
        createjs.Ticker.addEventListener("tick", function () {
            if (_isfirst) {
                _cupObj = _Resource.cup1.getBounds();
                _ballObj = _Resource.ball1.getBounds();
                _shadowObj = _Resource.shadow1.getBounds();
                buttonObj = _Resource.button.getBounds();
                _ballIndex = Math.floor(Math.random()*3+1);
                initContainer("ball"+_ballIndex);
                _isfirst = false;
            }
            stage.update();
        });
    });
});
