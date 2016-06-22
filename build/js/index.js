    var winWidth = document.documentElement.clientWidth;
    var winHeight = document.documentElement.clientHeight;

    var ua = navigator.userAgent.toLowerCase();
    var isAndroid = ua.indexOf('android') != -1;
    var isIos = (ua.indexOf('iphone') != -1) || (ua.indexOf('ipad') != -1);
    var mobile = false,state = true,inst;
    if(/iphone|nokia|sony|ericsson|mot|samsung|sgh|lg|philips|panasonic|alcatel|lenovo|cldc|midp|wap|android|iPod/i.test(navigator.userAgent.toLowerCase())){
        mobile = true;
    }

/*    var socket = io.connect('http://172.24.24.63:3000/wechat');
*/            var socket = io.connect('http://192.168.1.108:3000/wechat');
    socket.on('connect', function() {
        var msgInsrt = '<p class="syinfo">\u623f\u95f4\u8fde\u63a5\u4e2d\u002e\u002e\u002e</p>';
        $('.listW').append(msgInsrt);
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
        var msgInsrt = '<p class="syinfo">\u6b22\u8fce'+wxInfo.nickname+'\u6765\u5230\u76f4\u64ad\u95f4</p>' +
            '<p class="syinfo">\u5f39\u5e55\u8fde\u63a5\u4e2d\u002e\u002e\u002e</p>';
        $('.listW').append(msgInsrt);
        console.log(data);
    });
    $('.text').on("keyup", function(k) {
        if (this.value == null) return;
        if (k != null && k.keyCode === 13) {
            var vv = this.value;
            this.value = '';
            $('.text').blur();
/*            if(state){*/
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
/*
            }
*/
        }
    });
    socket.on('message.add', function(msg) {
        console.log(msg);
        messageAdd(msg, true);
        //document.querySelector('.message').appendChild(textnode);
    });
    socket.on('message.error', function(msg) {
        state = false;
        console.log('messageError', msg);
    });
    socket.on('historyData', function(msgs) {
        var msgInsrt = '<p class="syinfo">\u5f39\u5e55\u8fde\u63a5\u6210\u529f</p>';
        $('.listW').append(msgInsrt);
        var his = msgs.history;
        for (var k in his) {
            if (his.hasOwnProperty(k)) {
                //console.log(his[k]);
                messageAdd(his[k], false);
            }
        }
    });


    var vidologinH = lib.flexible.rem2px(5.625);
    var videoHeight = winWidth * 9 / 16;
    if(videoHeight >vidologinH){
        videoHeight = vidologinH;
    }
    var $_ = function(e) {
        return document.getElementById(e);
    };
    window.addEventListener("load", function() {
        inst = ABP.create(document.getElementById("load-player"), {
            "src": {
                "playlist": [{
                    "video": document.getElementById("video-1"),
                    "comments":"comment-otsukimi.xml"
                }]
            },
            "width": '100%',
            "height": videoHeight,
            "mobile": mobile,
            "comment":false
        });
        console.log(inst);
        var dpr = lib.flexible.dpr;
        var bH = $('.banner').innerHeight(),
            ipH = $('.inputLogin').innerHeight(),
            vidH = $('#load-player').innerHeight();
        $('.content').height(winHeight - (vidH + bH + ipH + 2));
        $('.ABP-Text').addClass('shu');
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
        	$('.ABP-Unit').addClass('ABP-FullScreen');
        	inst.cmStageResize();
/*                playerEl.css({
                width: $(window).width(),
                height: $(window).height()
            });*/
            setTimeout(function() {
                $('.bottomContent,.inputLogin').css('display', 'none');
                $('.ABP-Unit .ABP-Text').removeClass('shu');
                $('.loading').css('display','none');
            }, 800);
        } else {
/*                playerEl.css({
                width: $(window).width(),
                height: '5.625rem'
            });*/
            $('.ABP-Unit').removeClass('ABP-FullScreen');
            inst.cmStageResize();
            setTimeout(function() {
                $('.bottomContent,.inputLogin').css('display', 'block');
                $('.ABP-Unit .ABP-Text').addClass('shu');
                $('.loading').css('display','none');
            }, 800);
        }
    }

    function orientationChange() {
    	$('.loading').css('display','block');
        if(mobile){
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
    }