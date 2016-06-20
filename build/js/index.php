<?php
include_once("./class/Wxdanmaku.class.php");
$code      = $_GET["code"];
$wxdanmaku = new Wxdanmaku($code);

print_r($wxdanmaku->userinfo);
?>