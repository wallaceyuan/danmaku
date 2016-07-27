/**
 * Created by yuan on 2016/1/15.
 */
var videofc = require('./app/js/videofc.js');

var videoInt = require('./app/js/videoInit.js');

var sharebtn = videoInt.share(info);

videoInt.weiXin();videoInt.bar();videoInt.weather();
var d = navigator.userAgent.indexOf("MSIE 8") > -1 || navigator.userAgent.indexOf("MSIE 7") > -1;
if(d){
	$(".header .header-content ").css({
		"margin-right":'10px'
	})
}

$(".liveShare").append(sharebtn.wb,sharebtn.qq,sharebtn.wx);
if(now =='now'){
	videoInt.zbInit();videofc.liveInit();
	$(".live-box #content-1").mCustomScrollbar({
		callbacks:{
			onInit: function(){
				var ConHeight = $('.live-box #content-1').height();
				var hkHeight = $('.wrapper.now').position().top;
				var oHeight = $('#mCSB_1').height()/2;
				if(hkHeight>ConHeight/2){
					setTimeout(function(){
						$('.live-box #content-1').mCustomScrollbar("scrollTo",hkHeight-oHeight);
					},1000);
				}
			}
		}
	});
	$(window).resize(function() {
		videoInt.zbLiveWidth();
	});
}else{
	videoInt.hkInit();videofc.hkTime();videofc.hkClick();
	$(".non-live-box #content-1").mCustomScrollbar({
		callbacks:{
			onInit: function(){

			}
		}
	});

	$(window).resize(function() {
		videoInt.hkLiveWidth();
	});
}
