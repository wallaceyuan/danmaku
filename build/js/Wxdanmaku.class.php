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
	
	public function Wxdanmaku($code = ""){
		date_default_timezone_set("Asia/Shanghai");
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
	}
	
	
}
?>