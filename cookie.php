<?php
	$roomKey = "roominfo";
	if(!empty($_COOKIE['roominfo'])){
		echo 'you';
		$roominfo=json_decode($_COOKIE['roominfo'],true);
		print_r($roominfo);
	}else{
		echo 'wu';
		$roominfo =  array(
			"roomid" => "",
			"title"  => "新闻坊",
			"intro"  => "扎根社区 传递民声 周一至周日 18:00-18:25",
			"pic"    => "http://static.statickksmg.com/image/2015/09/30/4888de38635d914c8f2d8188be1efb37.png",
			"hls"    => "",
			"hls1"   => "http://bililive.kksmg.com/hls/rikaze001/playlist.m3u8",
			"hls2"   => "http://kankan.live.bestvcdn.com.cn/live/program/live991/weixinxwzh/live.m3u8",
		);
		
		$roominfo = json_encode($roominfo);
		setcookie($roomKey,$roominfo, time()+3600*24);
	}
?>
