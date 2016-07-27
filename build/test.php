<?php
	include_once("./class/Wxdanmaku.class.php");
	//print_r($userinfo['openid']);
	$roomKey = "roominfo";
	$userKey = "userinfo";

	if(!empty($_COOKIE['roominfo']) && !empty($_COOKIE['roominfo'])&&json_decode($_COOKIE['userinfo'],true)['openid'] ){
		$roominfo = json_decode($_COOKIE['roominfo'],true);
		$userinfo = json_decode($_COOKIE['userinfo'],true);
	}else{
		$code      = $_GET["code"];
		$wxdanmaku = new Wxdanmaku($code);
		$userinfo = $wxdanmaku->userinfo;
		$roominfo = $wxdanmaku->roominfo;
		if($userinfo['errcode']){
			$wxdanmaku = new Wxdanmaku('');
			$userinfo = $wxdanmaku->userinfo;
			$roominfo = $wxdanmaku->roominfo;
			$ri = json_encode($roominfo);
			$ui = json_encode($userinfo);
			setcookie($roomKey,$ri, time()+300*1);
			setcookie($userKey,$ui, time()+300*1);
		}else{
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
    <title>新闻坊直播</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
	<script src="http://www.kankanews.com/m/2015ndpd/js/flexible_css.js,flexible.js"></script>
    <link rel="stylesheet" href="http://skin.kankanews.com/v5/danmaku/css/base.css" />
    <link rel="stylesheet" href="http://skin.kankanews.com/v5/danmaku/css/my.css">
	</head>
	<body>
	<div class="loading">
	    <div class="caseRouge">
	        <div class="birdLoading"></div>
	        <p>loading...</p>
	    </div>
	</div>
	<div class="wrapper">
		<div class="videoW"></div>
		<div id="load-player"></div>
		<div class="bottomContent">
			<div class="banner" id="test">
				<div class="logo">
					<img src="<?=$roominfo['pic']?>">
				</div>
				<div class="colInfo">
					<p class="title"><?=$roominfo['title']?>直播间</p>
<!-- 					<p class="int"><?=$roominfo['intro']?></p>
 -->					<p class="int">2016年7月12日 15：30</p>
				</div>
				<span>LIVE</span>
			</div>
			<div class='content'>
				<div class="contentBox">
					<div class="listW" id="listW">
						<p class="host"><i>主持人</i><span>新闻坊主持人：</span>欢迎大家来到新闻坊直播间！</p>
					</div>
				</div>
			</div>
		</div>
		<div class="inputLogin">
			<input type="text" placeholder="输入你的吐槽" class="text" id="input" max="300">
			<span>发送</span>
			<!-- <button class="button">发送消息（test）</button> -->
		</div>
	</div>
<!-- 	<script src="http://192.168.1.108:3000/socket.io/socket.io.js"></script>
 -->	
	<script src="http://114.80.151.109/spa/m/danmaku/js/jquery-2.1.4.min.js"></script>
	<script type="text/javascript">
		var device = 'mobile',fullPage = false,videoState = false;
		if(!/iphone|nokia|sony|ericsson|mot|samsung|sgh|lg|philips|panasonic|alcatel|lenovo|cldc|midp|wap|android|iPod/i.test(navigator.userAgent.toLowerCase())){
		    device = 'PC';
		}
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
		var videoH = '<video webkit-playsinline id="video-1" width="100%" height="100%">'+
		                '<source src="http://bililive.kksmg.com/hls/disneyc5/playlist.m3u8" type="video/mp4">'+
		                '<source src="http://kankan.live.bestvcdn.com.cn/live/program/live991/weixinxwzh/live.m3u8?se=kankan&ct=2&_cp=1&_fk=D6714859D317650F26E248D52AC343FF7AA7003B0410E0FBED976CCC43896E97" type="video/mp4">'+
		                '<p>Your browser does not support html5 video!</p>'+
		            '</video>';
		$('.videoW').append(videoH);
	</script>
	<script type="text/javascript">
		var video = document.getElementById('video-1');
		console.log(video);
		video.addEventListener("play", function () {
			alert("play");
		}, false);
		video.addEventListener("error", function(fmt) {
		    var errorcode=video.error.code;
		    console.log(errorcode);
		    if(errorcode===1){//取回过程被用户中止

		    }else if(errorcode==2){// 当下载时发生错误
		    	alert("下载时发生错误");
		    }else if(errorcode==3){//当解码时发生错误
		    	alert("解码时发生错误");
		    }else if(errorcode==4){//不支持音频/视频
		    	alert("当前环境不支持此类型视频");
		    }
		});
	</script>
    <script src="http://skin.kankanews.com/v5/danmaku/js/ABPlayer.js"></script>
    <script src="http://skin.kankanews.com/v5/danmaku/js/CommentCoreLibrary.js"></script>
    <script src="http://danmaku.kankanews.com/socket.io/socket.io.js"></script>
    <script src="http://skin.kankanews.com/v5/danmaku/js/index.js"></script>
    <!--begin 看看统计代码-->
      <script type="text/javascript" src="http://skin.kankanews.com/v6/kkstatistic.js"></script>
      <script type="text/javascript">
          var _l = new KKStatistic({
              apiURL    : "http://api.kankanews.com/kkstat/kkweb/collect/kankan.json",
              utmSource : "utm_source"
          });
      </script>
      <!--begin 统计代码-->
      <div style="display:none"><script src="http://s11.cnzz.com/z_stat.php?id=1256986032&web_id=1256986032" language="JavaScript"></script></div>
      <script type="text/javascript" src="http://tajs.qq.com/stats?sId=53365655" charset="UTF-8"></script>
      <!--end 统计代码-->
</html>