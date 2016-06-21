if(ABPInst.txtText !== null){
    ABPInst.txtText.addEventListener("keyup", function(k){
        if(this.value == null) return;
        if(/^!/.test(this.value)){
            this.style.color = "#5DE534";
        }else{
            this.style.color = "";
        }
        if(k != null && k.keyCode === 13){
            if(this.value == "") return;
            if(/^!/.test(this.value)){
                /** Execute command **/
                var commandPrompts = this.value.substring(1).split(":");
                var command = commandPrompts.shift();
                switch (command){
                    case "help":{
                        var popup = ABPInst.createPopup("提示信息：",2000);
                    }break;
                    case "speed":
                    case "rate":
                    case "spd":{
                        if(commandPrompts.length < 1){
                            ABPInst.createPopup("速度调节：输入百分比【 1% - 300% 】", 2000);
                        }else{
                            var pct = parseInt(commandPrompts[0]);
                            if(pct != NaN){
                                var percentage = Math.min(Math.max(pct, 1), 300);
                                ABPInst.video.playbackRate = percentage / 100;
                            }
                            if(ABPInst.cmManager !== null){
                                ABPInst.cmManager.clear();
                            }
                        }
                    }break;
                    case "off":{
                        ABPInst.cmManager.display = false;
                        ABPInst.cmManager.clear();
                        ABPInst.cmManager.stopTimer();
                    }break;
                    case "on":{
                        ABPInst.cmManager.display = true;
                        ABPInst.cmManager.startTimer();
                    }break;
                    case "cls":
                    case "clear":{
                        if(ABPInst.cmManager !== null){
                            ABPInst.cmManager.clear();
                        }
                    }break;
                    case "pp":
                    case "pause":{
                        ABPInst.video.pause();
                    }break;
                    case "p":
                    case "play":{
                        ABPInst.video.play();
                    }break;
                    case "vol":
                    case "volume":{
                        if(commandPrompts.length == 0){
                            var popup = ABPInst.createPopup("目前音量：" +
                                Math.round(ABPInst.video.volume * 100) + "%", 2000);
                        }else{
                            var precVolume = parseInt(commandPrompts[0]);
                            if(precVolume !== null && precVolume !== NaN){
                                ABPInst.video.volume = Math.max(Math.min(precVolume, 100),0) / 100;
                            }
                            ABPInst.createPopup("目前音量：" +
                                Math.round(ABPInst.video.volume * 100) + "%", 2000);
                        }
                    }break;
                    default:break;
                }
                this.value = "";
            }
        }else if(k != null && k.keyCode === 38){
            if(!k.shiftKey){
                /** Volume up **/
                ABPInst.video.volume = Math.round(Math.min((ABPInst.video.volume * 100) + 5, 100)) / 100;
                ABPInst.removePopup();
                var p = ABPInst.createPopup("目前音量：" +
                    Math.round(ABPInst.video.volume * 100) + "%", 800);
            }else{
                if(ABPInst.cmManager !== null){
                    var opa = Math.min(Math.round(ABPInst.cmManager.def.opacity * 100) + 5,100);
                    ABPInst.cmManager.def.opacity = opa / 100;
                    ABPInst.removePopup();
                    var p = ABPInst.createPopup("弹幕透明度：" + Math.round(opa) + "%",800);
                }
            }
        }else if(k != null && k.keyCode === 40){
            if(!k.shiftKey){
                /** Volume Down **/
                ABPInst.video.volume = Math.round(Math.max((ABPInst.video.volume * 100) - 5, 0)) / 100;
                ABPInst.removePopup();
                var p = ABPInst.createPopup("目前音量：" +
                    Math.round(ABPInst.video.volume * 100) + "%", 800);
            }else{
                if(ABPInst.cmManager !== null){
                    var opa = Math.max(Math.round(ABPInst.cmManager.def.opacity * 100) - 5,0);
                    ABPInst.cmManager.def.opacity = opa / 100;
                    ABPInst.removePopup();
                    var p = ABPInst.createPopup("弹幕透明度：" + Math.round(opa) + "%",800);
                }
            }
        }
    });
}

var video = document.getElementsByTagName('video')[0];
video.addEventListener("play", function(){
    //$("#danmup .danmu-div").danmu("danmuResume");
});
video.addEventListener("pause", function(){
    console.log('pause');
    //$("#danmup .danmu-div").danmu("danmuPause");
});
video.addEventListener("waiting", function(){
    console.log('waiting');
});
video.addEventListener("playing",function(){
    console.log('playing');
    //$("#danmup .danmu-div").data("danmuResume");
});
video.addEventListener("progress",function(){
    //console.log('progress');
});
video.addEventListener("timeupdate",function(){
    //console.log('timeupdate');
});