var winWidth = document.documentElement.clientWidth;
var winHeight = document.documentElement.clientHeight;
var htUrl = 'http://5ea4bcdd9895.ih5.cn/idea/sPJ5dDI';
var ua = navigator.userAgent.toLowerCase();
var isAndroid = ua.indexOf('android') != -1;
var isIos = (ua.indexOf('iphone') != -1) || (ua.indexOf('ipad') != -1);
var inst;var state;

/*		var socket = io.connect('http://172.24.24.63:3000/wechat');
 */
var socket = io.connect('http://192.168.1.108:3000/wechat');

socket.on('connect', function() {
    socket.emit('userInit', {
        "room": 4,
        "openid": wxInfo.openid,
        'nickName': wxInfo.nickname,
        'posterURL': wxInfo.headimgurl
    });
});
socket.on('userStatus', function(data) {
	if(data.status!=0){
		state = false;
	}
    console.log(data);
});

$('.text').on("keyup", function(k) {
    if (this.value == null) return;
    if (k != null && k.keyCode === 13) {
        var vv = this.value;
        this.value = '';
        $('.text').blur();
        if(state){
        	socket.emit('createMessage', {
        	    message: vv,
        	    type: 0,
        	    up: 0,
        	    down: 0,
        	    perform: {
        	        color: 'red',
        	        fontSize: '16px'
        	    }
        	});
        }
    }
});
socket.on('message.add', function(msg) {
    console.log(msg);
    messageAdd(msg, true);
    //document.querySelector('.message').appendChild(textnode);
});
socket.on('message.error', function(msg) {
    console.log('messageError', msg);
});
socket.on('historyData', function(msgs) {
    var his = msgs.history;
    for (var k in his) {
        if (his.hasOwnProperty(k)) {
            messageAdd(his[k], false);
        }
    }
});

var videoHeight = winWidth * 9 / 16;
var $_ = function(e) {
    return document.getElementById(e);
};
window.addEventListener("load", function() {
    inst = ABP.create(document.getElementById("load-player"), {
        "src": {
            "playlist": [{
                "video": document.getElementById("video-1")
                    /*,
                    							"comments":"comment-otsukimi.xml"*/
            }]
        },
        "width": '100%',
        "height": videoHeight,
        "mobile": true
    });
    console.log(inst);
    var dpr = lib.flexible.dpr;
    var bH = $('.banner').innerHeight(),
        ipH = $('.inputLogin').innerHeight(),
        vidH = $('#load-player').innerHeight();
    $('.content').height(winHeight - (vidH + bH + ipH + 2));
    $('.loading').css('display','none');
});

window.addEventListener("onorientationchange" in window ? "orientationchange" : "resize", orientationChange, false);

function messageAdd(msg, flag) {
    var msgInsrt = '<p><span>' + msg.nickName + ': </span>' + msg.message + '</p>';
    $('.listW').append(msgInsrt);
    var objDiv = document.getElementById("listW");
    objDiv.scrollTop = objDiv.scrollHeight;
    var danmaku = {
        "mode": 1,
        "text": msg.message,
        "size": 16
    };
    if (flag) {
        inst.sendDanma(danmaku);
    }
}

function winHW(param) {
    var playerEl = $('.ABP-Unit');
    if (param == 'B') {
        setTimeout(function() {
        	$('.bottomContent,.inputLogin').css('display', 'none');
        	if (isIos && $('.ABP-Control').is(':visible')) {
        	    $('.ABP-Unit .ABP-Text').css('display', 'block');
        	}
            playerEl.css({
                width: $(window).width(),
                height: $(window).height()
            });
            $('.loading').css('display','none');
        }, 500);
    } else {
        setTimeout(function() {
        	$('.bottomContent,.inputLogin').css('display', 'block');
        	if (isIos && $('.ABP-Control').is(':visible')) {
        	    $('.ABP-Unit .ABP-Text').css('display', 'none');
        	}
        	playerEl.css({
        	    width: $(window).width(),
        	    height: '5.625rem'
        	});
        	$('.loading').css('display','none');
        }, 500);
    }
}

function orientationChange() {
	$('.loading').css('display','block');
    switch (window.orientation) {
        case 0: // Portrait
        case 180: // Upside-down Portrait
            winHW();
            break;
        case -90: // Landscape: turned 90 degrees counter-clockwise
        case 90: // Landscape: turned 90 degrees clockwise
            winHW("B");
            break;
    }
}