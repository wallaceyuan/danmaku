<?php
	include_once("./class/Wxdanmaku.class.php");
	//print_r($userinfo['openid']);
	$roomKey = "roominfo";
	$userKey = "userinfo";
/*	setcookie($roomKey, NULL);
	setcookie($userKey, NULL);*/
	if(!empty($_COOKIE['roominfo']) && !empty($_COOKIE['roominfo']) ){
		$roominfo = json_decode($_COOKIE['roominfo'],true);
		$userinfo = json_decode($_COOKIE['userinfo'],true);
	}else{
		$code      = $_GET["code"];
		$wxdanmaku = new Wxdanmaku($code);
		$userinfo = $wxdanmaku->userinfo;
		$roominfo = $wxdanmaku->roominfo;
		if(!empty($code)){
			$ri = json_encode($roominfo);
			$ui = json_encode($userinfo);
			setcookie($roomKey,$ri, time()+300*1);
			setcookie($userKey,$ui, time()+300*1);
		}
	}
?>
<!doctype html>
<html>
  <head>
	<meta charset="utf-8">
	<title>ABPlayerHTML5 by Jabbany</title>
	<script src="http://www.kankanews.com/m/2015ndpd/js/flexible_css.js,flexible.js"></script>
	<link rel="stylesheet" href="http://skin.kankanews.com/v5/danmaku/css/base.css" />
	<link rel="stylesheet" href="http://skin.kankanews.com/v5/danmaku/css/my.css">
	</head>
	<body>
	<div class="wrapper">
		<video webkit-playsinline id="video-1" autobuffer="true" data-setup="{}" width="100%" height="100%">
			<source src="<?=$roominfo['hls']?>" type="video/mp4">
			<source src="<?=$roominfo['hls1']?>" type="video/mp4">
			<source src="<?=$roominfo['hls2']?>" type="video/mp4">
			<source src="http://bililive.kksmg.com/hls/sdi20/playlist.m3u8" type="video/mp4">
			<p>Your browser does not support html5 video!</p>
		</video>
		<div id="load-player"></div>
		<div class="bottomContent">
			<div class="banner" id="test">
				<div class="logo">
					<img src="<?=$roominfo['pic']?>">
				</div>
				<div class="colInfo">
					<p class="title"><?=$roominfo['title']?>直播间</p>
					<p class="int"><?=$roominfo['intro']?></p>
				</div>
				<span>LIVE</span>
			</div>

			<div class='content'>
				<div class="contentBox">
					<div class="listW" id="listW">
						<p class="host"><i>主持人</i><span>新闻坊主持人：</span>欢迎大家来到新闻坊直播间！</p>
						<p><span>恍恍惚惚：</span>不错不错，竟然有首页网页版。</p>
					</div>
				</div>
			</div>
		</div>
	</div>
	<div class="inputLogin">
		<input type="text" placeholder="输入你的吐槽" class="text" id="input" max="300">
		<!-- <button class="button">发送消息（test）</button> -->
	</div>
<!-- 			<button id="btnInsertTimeline">btnInsertTimeline</button>
	<button id="realTime">realTime</button>
	<pre></pre> -->
<!-- 	<script src="http://192.168.1.108:3000/socket.io/socket.io.js"></script>
 -->	
	<script src="http://172.24.24.63:3000/socket.io/socket.io.js"></script>

	<script src="http://skin.kankanews.com/v5/danmaku/js/jquery-2.1.4.min.js"></script>
	<script src="http://skin.kankanews.com/v5/danmaku/js/CommentCoreLibrary.js"></script>
	<script src="http://skin.kankanews.com/v5/danmaku/js/ABPlayer.js"></script>
	<script type="text/javascript">
		var winWidth = document.documentElement.clientWidth;
		var winHeight = document.documentElement.clientHeight;
		var inst;
		var wxInfo = {
			"openid"    :"<?=$userinfo['openid']?>",
			"nickname"  :"<?=$userinfo['nickname']?>",
			"sex"     	:"<?=$userinfo['sex']?>",
			"province"	:"<?=$userinfo['province']?>",
			"city"		:"<?=$userinfo['city']?>",
			"country"   :"<?=$userinfo['country']?>",
			"headimgurl":"<?=$userinfo['headimgurl']?>",
			"unionid"	:"<?=$userinfo['unionid']?>"
		}
		console.log(wxInfo);
/*		var wxInfo = {
			"openid":"o81pDuLcFI2sNfOuLFYk9RlfSLWc",
			"nickname": "圆儿圈圈",
			"sex":"1",
			"province":"PROVINCE",
			"city":"CITY",
			"country":"COUNTRY",
			"headimgurl":    "http://wx.qlogo.cn/mmopen/g3MonUZtNHkdmzicIlibx6iaFqAc56vxLSUfpb6n5WKSYVY0ChQKkiaJSgQ1dZuTOgvLLrhJbERQQ4eMsv84eavHiaiceqxibJxCfHe/46",
			"unionid": "o6_bmasdasdsad6_2sgVt7hMZOPfL"
		}*/
		var socket = io.connect('http://172.24.24.63:3000/wechat');
/*		var socket = io.connect('http://192.168.1.108:3000/wechat');
*/
		socket.on('connect', function(){
			socket.emit('userInit',{"room":4,"openid":wxInfo.openid,'nickName':wxInfo.nickname,'posterURL':wxInfo.headimgurl});
		});
		socket.on('userStatus',function(data){
			console.log(data);
		});
		$('.text').on("keyup", function(k){
			if(this.value == null) return;
			if(k != null && k.keyCode === 13){
				var vv = this.value;
				socket.emit('createMessage', {
					message:vv,
					type:0,up:0,down:0,
					perform:{
						color:'red',fontSize:'16px'
					}
				});
				this.value = '';
				$('.text').blur();
			}
		});
		socket.on('message.add',function(msg){
			console.log(msg);
			messageAdd(msg,true);
			//document.querySelector('.message').appendChild(textnode);
		});
		socket.on('message.error',function(msg){
			console.log('messageError',msg);
		});
		socket.on('historyData',function(msgs){
	        var his = msgs.history;
	        for (var k in his){
	            if (his.hasOwnProperty(k)) {
	            	//console.log(his[k]);
	            	messageAdd(his[k],false);
	            }
	        }
	    });
	    
/*		var videoHeight = winWidth*9/16+72;
*/		var videoHeight = winWidth*9/16;
		var $_ = function(e){return document.getElementById(e);};
		window.addEventListener("load",function(){
			inst = ABP.create(document.getElementById("load-player"), {
				"src":{
					"playlist":[
						{
							"video":document.getElementById("video-1"),
							"comments":"comment-otsukimi.xml"
						}
					]
				},
				"width":'100%',
				"height":videoHeight,
				"mobile":true
			});
			console.log(inst);
			var dpr = lib.flexible.dpr;
			var bH = $('.banner').innerHeight(),ipH = $('.inputLogin').innerHeight(),vidH = $('#load-player').innerHeight();
			console.log(winHeight,videoHeight,bH,ipH);
			$('.content').height(winHeight-(vidH+bH+ipH+2));
		});
	    
	    window.addEventListener("onorientationchange" in window ? "orientationchange" : "resize", orientationChange, false);
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
		function messageAdd(msg,flag){
			var msgInsrt = '<p><span>'+msg.nickName+': </span>'+msg.message+'</p>';
			$('.listW').append(msgInsrt);
			var objDiv = document.getElementById("listW");
			objDiv.scrollTop = objDiv.scrollHeight;
/*			var sizeRem = lib.flexible.px2rem(16);
			var sizePx = lib.flexible.rem2px(sizeRem);
			console.log(sizePx);*/
			var danmaku = {
				"mode":1,
				"text":msg.message,
				"size":16
			};
			if(flag){
				inst.sendDanma(danmaku);
			}
		}
		function winHW(param){
			var video = document.getElementById("video-1");
			var winHeight = document.documentElement.clientHeight;
			if(param == 'B'){
				$('.ABP-Unit').height(winHeight);
			}else{
				$('.ABP-Unit').height('5.625rem');
			}
		}
		function orientationChange(){
			switch(window.orientation) {
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
	</script>
  </body>
</html>