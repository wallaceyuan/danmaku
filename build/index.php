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
	<title>ABPlayerHTML5 by Jabbany</title>
	<script src="http://www.kankanews.com/m/2015ndpd/js/flexible_css.js,flexible.js"></script>
	<link rel="stylesheet" href="http://172.16.10.95/skin/v5/danmaku/css/base.css" />
	<link rel="stylesheet" href="http://172.16.10.95/skin/v5/danmaku/css/my.css">
	</head>
	<body>
	<div class="loading">
	    <div class="caseRouge">
	        <div class="birdLoading"></div>
	        <p>loading...</p>
	    </div>
	</div>
	<div class="wrapper">
		<video webkit-playsinline id="video-1" autobuffer="true" data-setup="{}" width="100%" height="100%">
<!-- 			<source src="http://bililive.kksmg.com/hls/sdi20/playlist.m3u8" type="video/mp4">
 -->			<source src="<?=$roominfo['hls']?>" type="video/mp4">
			<source src="<?=$roominfo['hls1']?>" type="video/mp4">
			<source src="<?=$roominfo['hls2']?>" type="video/mp4">
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
					</div>
				</div>
			</div>
		</div>
		<div class="inputLogin">
			<input type="text" placeholder="输入你的吐槽" class="text" id="input" max="300">
			<!-- <button class="button">发送消息（test）</button> -->
		</div>
	</div>
<!-- 	<script src="http://192.168.1.108:3000/socket.io/socket.io.js"></script>
 -->	
	<script src="http://172.24.24.63:3000/socket.io/socket.io.js"></script>
	<script src="http://skin.kankanews.com/v5/danmaku/js/jquery-2.1.4.min.js"></script>
	<script src="http://skin.kankanews.com/v5/danmaku/js/CommentCoreLibrary.js"></script>
	<script src="http://skin.kankanews.com/v5/danmaku/js/ABPlayer.js"></script>
	<script type="text/javascript">
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
	</script>
	<script type="text/javascript" src="http://114.80.151.109/spa/m/danmaku/js/index.js"></script>
  </body>
</html>