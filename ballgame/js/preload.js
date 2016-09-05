/**
 * Created by Administrator on 2016/6/28 0028.
 */
var Preload = {
    prefix: "./imgs/",
    manifest: function () { //返回JSON格式文件列表
        return [
            { src: this.prefix + "bg.png" },
            { src: this.prefix + "ball.png" },
            { src: this.prefix + "button.png" },
            { src: this.prefix + "button2.png" },
            { src: this.prefix + "cup.png" },
            { src: this.prefix + "shadow.png" }
        ]
    },
    init: function(_completeFun,_progressObj){ //开始预加载
        var _preload = new createjs.LoadQueue(true);
        //预加载缓存,防止重复loading
        _preload.setMaxConnections(100); // 关键！----设置并发数
        _preload.maintainScriptOrder=true; // 关键！---一定要将其设置为 true, 否则不起作用。
        //已加载完毕进度
        _preload.on("progress", function() {
            //console.log("已加载 " + (_preload.progress*100|0) + " %");
            _progressObj && _progressObj.html((_preload.progress*100|0) + " %");
        });
        //全度资源加载完毕
        _preload.on("complete", function() {
            console.log("资源加载好啦！");
            _completeFun && _completeFun();
        });
        _preload.loadManifest(Preload.manifest());
    }
}