var Popup = {
    //eg: Popup.tip("申请失败了呢~");
    tip: function(_info,_style,_hideTime){ //_style的值有'g_tipred'、'g_tipgreen',默认值为'g_tipdefault'
        var randomClass = "tip"+Math.round(Math.random()*1000000000);
        var sty = _style?_style:"g_tipdefault"
        var tiphtml = '<div class="g_tipbox '+sty+' '+randomClass+'">'+_info+'</div>';
        $("body").append(tiphtml);
        setTimeout(function(){ $("."+randomClass).hide(); setTimeout(function(){ $("."+randomClass).remove(); },500) },_hideTime?_hideTime:500)
    },
    //eg: Popup.prompt("申请成功了呢~",function(){ log("点击了确定按钮"); }, function(){ log("点击了取消按钮"); });
    prompt: function(_info,_sureFun,_cancelFun,_sureTxt,_cancleTxt){
        _sureTxt = _sureTxt ? _sureTxt : "确定";
        _cancleTxt = _cancleTxt ? _cancleTxt : "取消";
        var prompthtml = '<div class="g_promptWrap g_maskbg"><div class="g_prompt">' +
            '<p class="g_promptCon">'+_info+'</p>' +
            '<p><button class="g_promptCancel">'+_cancleTxt+'</button><button class="g_promptSure">'+_sureTxt+'</button></p>' +
            '</div></div>';
        $("body").append(prompthtml);
        $("body").find(".g_promptWrap").on("click"," .g_promptSure",function(){
            _sureFun && _sureFun();
            $(".g_promptWrap").fadeOut();
            setTimeout(function(){ $(".g_promptWrap").remove(); },1000);
        });
        $("body").find(".g_promptWrap").on("click"," .g_promptCancel",function(){
            _cancelFun && _cancelFun();
            $(".g_promptWrap").fadeOut();
            setTimeout(function(){ $(".g_promptWrap").remove(); },1000);
        });
    },
    //eg: Popup.load("正在上传,请稍等...");
    load: function(_info){
        var loadhtml = _info ? '<div class="g_waitingbox g_maskbg" style="height:'+$(window).height()+'px;"><div class="g_loading"><div class="g_loadgif"><span></span><span></span><span></span><span></span><span></span></div><br> '+_info+'</div></div>' : '<div class="waiting_box g_maskbg" style="height:'+$(window).height()+'px;"><div class="g_loading"><div class="g_loadgif"><span></span><span></span><span></span><span></span><span></span></div><br>正在努力加载中....</div></div>';
        $("body").append(loadhtml);
    },
    removeload: function(){
        $(".g_waitingbox").fadeOut();
        setTimeout(function(){ $(".g_waitingbox").remove(); },1000);
    }
}