var Http = {
    prefix: "api/data.php",
    request: function(url, data, success, error, method ){
        $.ajax({
            url: Http.prefix + url,
            type: method ? method : "POST",
            data: data || {},
            success: function(_res){
               // if(typeof _res == "string"){ _res = eval("("+_res+")"); }
                success && success(_res);
            },
            error: function(xhr, type){
                console.log("来自"+url+"的error xhr: "+JSON.stringify(xhr));
                var err = {};
                try {
                    var d = $.parseJSON(xhr.responseText);
                    err = $.extend(err, d);
                } catch (e) {
                    err.Msg = xhr.responseText || "网络错误，请稍后重试._来自http.request.error";
                }
                var r = error && error(err);
                if (r !== false) {
                    //log(err.Msg || err.Message);
                }
            }
        });
    },
    riceNum: function(success, error){ //获取爱心接力人数
        var data = {
            "action": "ricenum"
        }
        this.request("", data, success, error);
    },
    savePic: function(imgbase, success, error){ //后台上传图片
        var data = {
            "action": "save_pic",
            "upload_file1": imgbase
        }
        this.request("", data, success, error);
    }
}
var App = {
    init: function () {
        var _curUrl = window.location.href, _curUrl = _curUrl.substring(0,_curUrl.indexOf('.html')),
            _curhtmlname = _curUrl ? _curUrl.substring(_curUrl.lastIndexOf('/')+1, _curUrl.length) : "index";
        App[_curhtmlname]();
    },
    interactive1: function () { //interactive1页面
        //轮播图初始化
        var swiper = new Swiper('.swiper-container', {
            loop: true,
            pagination: '.swiper-pagination',
            slidesPerView: 2,
            centeredSlides: true,
            spaceBetween: 10,
            grabCursor: true
        });
        //获取接力人数
        /*var RiceNum = (function () {
            Http.riceNum(function (_data) { //获取接力人数
                var _html = "",
                    _arr = _data.toString().split("");
                for(var i=0,len=_arr.length;i<len;i++){
                    _html += ("<span>"+_arr[i]+"</span>");
                }
                $("#int_num").html(_html);
            });
        })()*/
        var _html = "",
            _arr = "210468".toString().split("");
        for(var i=0,len=_arr.length;i<len;i++){
            _html += ("<span>"+_arr[i]+"</span>");
        }
        $("#int_num").html(_html);
    },
    interactive2: function(){ //interactive2页面
        //点击分享
        $("body").on(_triggerEvent,"#btn_share",function () {
            $(".int_share").fadeIn();
        });
        //base64图片上传提交
        $("body").on(_triggerEvent,".int2_sub",function(){
            var base64 = cvs.toDataURL("image/png");
            $("#int_rice").attr("src",base64);
            $(".interactive2_main").addClass("hide");
            $(".interactive3_main").removeClass("hide");
            /*Http.savePic(base64, function (_data) {
                //alert(_data);
                //(_data==-2) && App.tip("请上传图片.");
                //(_data==0) && App.tip("上传失败，请稍后重试.");
                if(_data!=-2 && _data!=0)
                {
                    var temp_pic = "upload/admin/images/"+_data; //图片地址   
                    window.location.href = "interactive3.html?urldata="+temp_pic

                } 
            });*/
        });
        var _triggerbtn;
        //选择照片按钮
        $("body").on("click",".int2_file",function(){
            $("#int2_file").click();
            ($(this).hasClass("int2_btn1")) && (_triggerbtn="int2_btn1")
        });
        $("#int2_file").change(function(){
            if(_triggerbtn=="int2_btn1"){
                _triggerbtn = "";
                $(".interactive2_main1").hide();
                $(".interactive2_main2").show();
            }
            //添加手势编辑图片
            selectFileImage(this,initImg);
        });
        //画布
        var cvsRadio = 2; //解决canvas画图模糊问题
        var cvsId = 'int2_cvs'; //canvas所在标签ID
        var cvs = document.getElementById(cvsId), //canvas对象
            ctx = cvs.getContext('2d'), //canvas 2d对象
            cvsW = cvs.width, //canvas宽度
            cvsH = cvs.height; //canvas高度
        var cvsRotation = 0; //旋转角度
        //被编辑的背景图片对象
        var bgImg;
        var bgImg_x, bgImg_y; //图片在canvas上的x值，y值
        var bgImg_scale; //图片的缩放比例
        var bgImg_curW, bgImg_curH; //图片在canvas上显示的宽度，高度
        //米饭图片对象
        var riceImg;
        var riceImg_x, riceImg_curW;
        //禁止iphone上下回弹
        cvs.addEventListener("touchmove", function(evt){
            evt.preventDefault();
        }, true);
        function initImg(_base64) { //_base64 是正确旋转后的base64格式图片
            riceImg = new Image();
            riceImg.src = "./imgs/int2_rice.png";
            riceImg.onload = function () {
                riceImg_x = (cvsW-cvsRadio*(riceImg.width/2))/2, riceImg_y = cvsRadio * 0;
                riceImg_curW = cvsRadio*(riceImg.width/2), riceImg_curH = cvsRadio*(riceImg.height/2);
                bgImg = new Image();
                bgImg.src = _base64;
                bgImg.onload = function(){
                    //移除loading底图
                    $(cvs).css("backgroundImage","none");
                    //初始化参数
                    bgImg_x = 0;
                    bgImg_y = 0;
                    bgImg_scale = cvsW/bgImg.width; //背景图和画布的比例
                    bgImg_curW = bgImg.width * bgImg_scale;
                    bgImg_curH = bgImg.height * bgImg_scale;
                    //初始化绘制
                    ctx.clearRect(0, 0, cvsW, cvsH);
                    ctx.drawImage(bgImg, bgImg_x, bgImg_y, bgImg_curW, bgImg_curH);
                    ctx.drawImage(riceImg, riceImg_x, riceImg_y, riceImg_curW, riceImg_curH);
                    //添加手势编辑事件
                    eventRegisterFirst && addEventHandlers();
                };
            }
        }
        var eventRegisterFirst = true; //是否第一次注册该事件
        function addEventHandlers(){
            eventRegisterFirst = false;
            var hammerCvs = new Hammer(cvs);
            hammerCvs.get('pan').set({ direction: Hammer.DIRECTION_ALL });//允许识别器识别全部方位的pan,默认只能识别水平方向
            hammerCvs.on("pan", function(e){
                ctx.clearRect(0, 0, cvsW, cvsH);
                var _curX = bgImg_x + e.deltaX;
                var _curY = bgImg_y + e.deltaY;
                bgImg.rotate = (cvsRotation*Math.PI/180);
                ctx.drawImage(bgImg, _curX, _curY, bgImg_curW, bgImg_curH);
                ctx.drawImage(riceImg, riceImg_x, riceImg_y, riceImg_curW, riceImg_curH);
                if(e.eventType == "4"){ //手指离开屏幕
                    bgImg_x = _curX;
                    bgImg_y = _curY;
                }
            });
            hammerCvs.get('pinch').set({ enable: true });//允许pinch事件，默认禁止
            hammerCvs.on("pinch", function(e){
                ctx.clearRect(0, 0, cvsW, cvsH);
                var _curX = bgImg_x + (bgImg_curW-bgImg_curW * e.scale)/2;
                var _curY = bgImg_y + (bgImg_curH-bgImg_curH * e.scale)/2;
                ctx.drawImage(bgImg, _curX, _curY, bgImg_curW * e.scale, bgImg_curH * e.scale);
                ctx.drawImage(riceImg, riceImg_x, riceImg_y, riceImg_curW, riceImg_curH);
                if(e.eventType == "4"){ //手指离开屏幕
                    bgImg_scale = e.scale;
                    bgImg_x = _curX;
                    bgImg_y = _curY;
                    bgImg_curW *= bgImg_scale;
                    bgImg_curH *= bgImg_scale;
                }
            });
        }
    },
    interactive3: function () { //interactive3页面
        //TODO 后台获取爱心接力图片
        var _data = App.getParam("urldata");
        $("#int_rice").attr("src",_data);
        //点击分享
        $("body").on(_triggerEvent,"#btn_share",function () {
            $(".int_share").fadeIn();
        });
    },
    tip: function(_info,_style,_hideTime){ //_style的值有'tip_red'、'tip_green',默认值为'tip_default'
        var randomClass = "tip"+Math.round(Math.random()*1000000000);
        var sty = _style?_style:"tip_default"
        var tiphtml = '<div class="tip_box '+sty+' '+randomClass+'">'+_info+'</div>';
        $("body").append(tiphtml);
        setTimeout(function(){ $("."+randomClass).fadeOut(); setTimeout(function(){ $("."+randomClass).remove(); },1000) },_hideTime?_hideTime:2000)
    },
    getParam: function(name){
         var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
         var r = window.location.search.substr(1).match(reg);
         if(r!=null)return  unescape(r[2]); return null;
    }
}
$(document).ready(function(){
    window.isDebugger = true;
    window.log = function (m) { (document.ontouchstart!==null) ?  (isDebugger && alert(m)) : (console.log(m)); }
    window._triggerEvent = (document.ontouchstart!==null) ?  'click' : 'touchstart';
    App.init();
});
