<?php
class Wxdanmaku{
	private $appid       = "wx577ca3767f909099";
	private $appsecret   = "38a5de7c39d6165efe9dfb0a5054e4ef";
	private $code        = "";
	private $scope       = "snsapi_userinfo";
	private $token       = "";
	private $openid      = "";
	
	public  $userinfo    = array();
	
	public  $destination = "http://wx.kankanews.com/xwf";    
	public  $roominfo    = array(
		"roomid" => "",
		"title"  => "新闻坊",
		"intro"  => "2016年7月12日 15：30–16：30",
		"pic"    => "http://static.statickksmg.com/image/2015/09/30/4888de38635d914c8f2d8188be1efb37.png",
		"hls"    => "",
		"hls1"   => "http://bililive.kksmg.com/hls/rikaze001/playlist.m3u8",
		"hls2"   => "http://kankan.live.bestvcdn.com.cn/live/program/live991/weixinxwzh/live.m3u8",
	);
	
	public function Wxdanmaku($code = ""){
		date_default_timezone_set("Asia/Shanghai");
		header("Content-type:text/html;charset=utf-8");
		
		$this->code = $code;
		if(empty($code)){
			$redirect    = "https://open.weixin.qq.com/connect/oauth2/authorize?".
						   "appid=$this->appid&redirect_uri=".htmlspecialchars($this->destination).
						   "&response_type=code&scope=$this->scope&state=STATE#wechat_redirect";
			header("Location: $redirect");
		}
		
		$api   = "https://api.weixin.qq.com/sns/oauth2/access_token?appid=$this->appid&secret=$this->appsecret&code=$this->code&grant_type=authorization_code";
		$tmp   = json_decode(file_get_contents($api), true);
		
		$this->token  = $tmp["access_token"];
		$this->openid = $tmp["openid"];
		
		$api  = "https://api.weixin.qq.com/sns/userinfo?access_token=$this->token&openid=$this->openid&lang=zh_CN";
		$this->userinfo = json_decode(file_get_contents($api), true);
	
		$now  = time();
		
		if($now >= strtotime(date("Y-m-d"." 17:00:00")) && $now < strtotime(date("Y-m-d"." 18:25:00"))){
			$this->roominfo["hls"] = $this->roominfo["hls2"]."?se=kankan&ct=2&_cp=1&_fk=".$this->getBestvFK();
		}else{
			$this->roominfo["hls"] = $this->roominfo["hls1"];
		}
		
	}
	
	
	public function getBestvFK(){
		$id = md5("KKBestvFK-".time().rand(1, 1000));
		$fk = file_get_contents("http://101.231.136.150/QueryKey?se=weixin&ct=2&id=".$id);
		return (string)$fk;
	}
	
}
?>