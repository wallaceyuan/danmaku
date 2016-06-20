function isMobile() {
	var a = !1;
	return function(b) {
		(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(b) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(b.substr(0, 4))) && (a = !0)
	}(navigator.userAgent || navigator.vendor || window.opera), a
}
function CommentLoader(a, b, c) {
	null == c && (c = function() {});
	var d = null;
	d = window.XMLHttpRequest ? new XMLHttpRequest : new ActiveXObject("Microsoft.XMLHTTP"), d.open("GET", a, !0), d.send();
	var e = b;
	d.onreadystatechange = function() {
		if (4 == d.readyState && 200 == d.status) if ("Microsoft Internet Explorer" == navigator.appName) {
			var a = new ActiveXObject("Microsoft.XMLDOM");
			a.async = !1, a.loadXML(d.responseText), e.load(BilibiliParser(a)), c()
		} else e.load(BilibiliParser(d.responseXML)), c()
	}
}
function createCORSRequest(a, b) {
	var c = new XMLHttpRequest;
	return "withCredentials" in c ? c.open(a, b, !0) : "undefined" != typeof XDomainRequest ? (c = new XDomainRequest, c.open(a, b)) : c = null, c
}
var ABP = {
	version: "0.8.0"
};
!
function() {
	"use strict";
	if (ABP) {
		var a = function(a) {
				return document.getElementById(a)
			},
			b = function(a, b, c, d) {
				var e = null;
				if ("text" === a) return document.createTextNode(b);
				e = document.createElement(a);
				for (var f in b) if ("style" !== f && "className" !== f) e.setAttribute(f, b[f]);
				else if ("className" === f) e.className = b[f];
				else for (var g in b.style) e.style[g] = b.style[g];
				if (c) for (var h = 0; h < c.length; h++) null != c[h] && e.appendChild(c[h]);
				return d && "function" == typeof d && d(e), e
			},
			c = function(a, b) {
				if (null != a) {
					var c = a.className.split(" ");
					c.indexOf(b) < 0 && c.push(b), a.className = c.join(" ")
				}
			},
			d = function(a, b) {
				if (null == a) return !1;
				var c = a.className.split(" ");
				return c.indexOf(b) >= 0
			},
			e = function(a, b) {
				if (null != a) {
					var c = a.className.split(" ");
					c.indexOf(b) >= 0 && c.splice(c.indexOf(b), 1), a.className = c.join(" ")
				}
			},
			f = function(a, b) {
				var c = {};
				for (var d in b) c[d] = a && "undefined" != typeof a[d] ? a[d] : b[d];
				return c
			};
		ABP.create = function(c, e) {
			var g = c;
			if (e || (e = {}), e = f(e, {
				replaceMode: !0,
				width: 512,
				height: 384,
				src: "",
				mobile: !1
			}), "string" == typeof c && (g = a(c)), d(g, "ABP-Unit")) h = g;
			else {
				var h = b("div", {
					className: "ABP-Unit",
					style: {
						width: e.width + "px",
						height: e.height + "px"
					}
				});
				g.appendChild(h)
			}
			h.children.length > 0 && e.replaceMode && (h.innerHTML = "");
			var i = [],
				j = [];
			if ("string" == typeof e.src) e.src = b("video", {
				autobuffer: "true",
				dataSetup: "{}"
			}, [b("source", {
				src: e.src
			})]), i.push(e.src);
			else if (e.src.hasOwnProperty("playlist")) for (var k = e.src, l = k.playlist, m = 0; m < l.length; m++) {
				if (l[m].hasOwnProperty("sources")) {
					var n = [];
					for (var o in l[m].sources) n.push(b("source", {
						src: l[m][o],
						type: o
					}));
					i.push(b("video", {
						autobuffer: "true",
						dataSetup: "{}"
					}, n))
				} else l[m].hasOwnProperty("video") ? i.push(l[m].video) : console.log("No recognized format");
				j.push(l[m].comments)
			} else i.push(e.src);
			h.appendChild(b("div", {
				className: "ABP-Video",
				tabindex: "10"
			}, [b("div", {
				className: "ABP-Container"
			}), i[0]])), h.appendChild(b("div", {
				className: "ABP-Text"
			}, [b("input", {
				type: "text"
			})])), h.appendChild(b("div", {
				className: "ABP-Control"
			}, [b("div", {
				className: "button ABP-Play"
			}), b("div", {
				className: "progress-bar"
			}, [b("div", {
				className: "bar dark"
			}), b("div", {
				className: "bar"
			})]), b("div", {
				className: "button ABP-CommentShow"
			}), b("div", {
				className: "button ABP-FullScreen"
			})]));
			var p = ABP.bind(h, e.mobile);
			if (i.length > 0) {
				var q = i[0];
				p.gotoNext = function() {
					var a = i.indexOf(q) + 1;
					if (a < i.length) {
						q = i[a], q.style.display = "";
						var b = p.video.parentNode;
						b.removeChild(p.video), b.appendChild(q), p.video.style.display = "none", p.video = q, p.swapVideo(q), q.addEventListener("ended", function() {
							p.gotoNext()
						})
					}
					a < j.length && null !== j[a] && CommentLoader(j[a], p.cmManager)
				}, q.addEventListener("ended", function() {
					p.gotoNext()
				}), CommentLoader(j[0], p.cmManager)
			}
			return p
		}, ABP.load = function() {}, ABP.bind = function(a, g, h) {
			var i = {
				btnPlay: null,
				barTime: null,
				barLoad: null,
				divComment: null,
				btnFull: null,
				btnDm: null,
				video: null,
				divTextField: null,
				txtText: null,
				cmManager: null,
				defaults: {
					w: 0,
					h: 0
				},
				state: f(h, {
					fullscreen: !1,
					commentVisible: !0,
					allowRescale: !1,
					autosize: !1
				}),
				createPopup: function(c, d) {
					if (a.hasPopup === !0) return !1;
					var e = b("div", {
						className: "ABP-Popup"
					}, [b("text", c)]);
					return e.remove = function() {
						e.isRemoved || (e.isRemoved = !0, a.removeChild(e), a.hasPopup = !1)
					}, a.appendChild(e), a.hasPopup = !0, "number" == typeof d && setTimeout(function() {
						e.remove()
					}, d), e
				},
				removePopup: function() {
					for (var b = a.getElementsByClassName("ABP-Popup"), c = 0; c < b.length; c++) null != b[c].remove ? b[c].remove() : b[c].parentNode.removeChild(b[c]);
					a.hasPopup = !1
				},
				swapVideo: null
			};
			if (i.swapVideo = function(a) {
				a.addEventListener("timeupdate", function() {
					y || (i.barTime.style.width = a.currentTime / a.duration * 100 + "%")
				}), a.addEventListener("ended", function() {
					i.btnPlay.className = "button ABP-Play", i.barTime.style.width = "0%"
				}), a.addEventListener("progress", function() {
					if (null != this.buffered) {
						try {
							var a = (this.buffered.start(0), this.buffered.end(0))
						} catch (b) {
							return
						}
						var c = this.duration,
							d = a / c * 100;
						i.barLoad.style.width = d + "%"
					}
				}), a.addEventListener("loadedmetadata", function() {
					if (null != this.buffered) {
						try {
							var a = (this.buffered.start(0), this.buffered.end(0))
						} catch (b) {
							return
						}
						var c = this.duration,
							d = a / c * 100;
						i.barLoad.style.width = d + "%"
					}
				}), a.isBound = !0;
				var b = 0;
				i.cmManager && (i.cmManager.clear(), a.addEventListener("progress", function() {
					b == a.currentTime ? (a.hasStalled = !0, i.cmManager.stopTimer()) : b = a.currentTime
				}), window && window.addEventListener("resize", function() {
					i.cmManager.setBounds()
				}), a.addEventListener("timeupdate", function() {
					i.cmManager.display !== !1 && (a.hasStalled && (i.cmManager.startTimer(), a.hasStalled = !1), i.cmManager.time(Math.floor(1e3 * a.currentTime)))
				}), a.addEventListener("play", function() {
					i.cmManager.startTimer();
					try {
						var a = this.buffered.end(0),
							b = this.duration,
							c = a / b * 100;
						i.barLoad.style.width = c + "%"
					} catch (d) {}
				}), a.addEventListener("ratechange", function() {
					null != i.cmManager.def.globalScale && 0 !== a.playbackRate && (i.cmManager.def.globalScale = 1 / a.playbackRate, i.cmManager.rescale())
				}), a.addEventListener("pause", function() {
					i.cmManager.stopTimer()
				}), a.addEventListener("waiting", function() {
					i.cmManager.stopTimer()
				}), a.addEventListener("playing", function() {
					i.cmManager.startTimer()
				}))
			}, null !== a && null !== a.getElementsByClassName) {
				i.defaults.w = a.offsetWidth, i.defaults.h = a.offsetHeight;
				var j = a.getElementsByClassName("ABP-Video");
				if (!(j.length <= 0)) {
					var k = null;
					for (var l in j[0].children) if (null != j[0].children[l].tagName && "VIDEO" === j[0].children[l].tagName.toUpperCase()) {
						k = j[0].children[l];
						break
					}
					j[0] && g && (j[0].style.bottom = "0px");
					var m = j[0].getElementsByClassName("ABP-Container");
					if (m.length > 0 && (i.divComment = m[0]), null !== k) {
						i.video = k;
						var n = a.getElementsByClassName("ABP-Play");
						if (!(n.length <= 0)) {
							i.btnPlay = n[0];
							var o = a.getElementsByClassName("progress-bar");
							if (!(o.length <= 0)) {
								i.barHitArea = o[0];
								var p = o[0].getElementsByClassName("bar");
								i.barTime = p[0], i.barLoad = p[1];
								var q = a.getElementsByClassName("ABP-FullScreen");
								if (!(q.length <= 0)) {
									i.btnFull = q[0];
									var r = a.getElementsByClassName("ABP-Text");
									if (r.length > 0) {
										i.divTextField = r[0];
										var s = r[0].getElementsByTagName("input");
										s.length > 0 && (i.txtText = s[0])
									}
									var t = a.getElementsByClassName("ABP-CommentShow");
									if (t.length > 0 && (i.btnDm = t[0]), "undefined" != typeof CommentManager && (i.cmManager = new CommentManager(i.divComment), i.cmManager.display = !0, i.cmManager.init(), i.cmManager.clear(), window && window.addEventListener("resize", function() {
										i.cmManager.setBounds()
									})), g) {
										var u = a.getElementsByClassName("ABP-Control");
										u.length > 0 && (i.controlBar = u[0]);
										var v = -1,
											w = function() {
												i.controlBar.style.display = "none", i.divTextField.style.display = "none", i.divComment.style.bottom = "0px", i.cmManager.setBounds()
											};
										i.divComment.style.bottom = i.controlBar.offsetHeight + i.divTextField.offsetHeight + "px";
										var x = function() {
												i.controlBar.style.display = "", i.divTextField.style.display = "", i.divComment.style.bottom = i.controlBar.offsetHeight + i.divTextField.offsetHeight + "px";
												try {
													-1 != v && (clearInterval(v), v = -1), v = setInterval(function() {
														document.activeElement !== i.txtText && (w(), clearInterval(v), v = -1)
													}, 2500)
												} catch (a) {
													console.log(a)
												}
											};
										a.addEventListener("touchmove", x), a.addEventListener("mousemove", x), v = setTimeout(function() {
											w()
										}, 4e3)
									}
									if (k.isBound !== !0) {
										i.swapVideo(k), i.btnFull.addEventListener("click", function() {
											i.state.fullscreen = d(a, "ABP-FullScreen"), i.state.fullscreen ? e(a, "ABP-FullScreen") : c(a, "ABP-FullScreen"), i.state.fullscreen = !i.state.fullscreen, i.cmManager && i.cmManager.setBounds(), i.state.allowRescale && (i.state.fullscreen ? i.defaults.w > 0 && (i.cmManager.def.scrollScale = a.offsetWidth / i.defaults.w) : i.cmManager.def.scrollScale = 1)
										}), i.btnDm.addEventListener("click", function() {
											0 == i.cmManager.display ? (i.cmManager.display = !0, i.cmManager.startTimer()) : (i.cmManager.display = !1, i.cmManager.clear(), i.cmManager.stopTimer())
										}), i.barTime.style.width = "0%";
										var y = !1;
										i.barHitArea.addEventListener("mousedown", function() {
											y = !0
										}), document.addEventListener("mouseup", function() {
											y = !1
										}), i.barHitArea.addEventListener("mouseup", function(a) {
											y = !1;
											var b = a.layerX / this.offsetWidth * i.video.duration;
											Math.abs(b - i.video.currentTime) > 4 && i.cmManager && i.cmManager.clear(), i.video.currentTime = b
										}), i.barHitArea.addEventListener("mousemove", function(a) {
											y && (i.barTime.style.width = 100 * a.layerX / this.offsetWidth + "%")
										}), i.btnPlay.addEventListener("click", function() {
											i.video.paused ? (i.video.play(), this.className = "button ABP-Play ABP-Pause") : (i.video.pause(), this.className = "button ABP-Play")
										}), a.addEventListener("keydown", function(a) {
											a && 32 == a.keyCode && document.activeElement !== i.txtText && (i.btnPlay.click(), a.preventDefault())
										}), a.addEventListener("touchmove", function() {
											event.preventDefault()
										});
										var z = null;
										a.addEventListener("touchstart", function(a) {
											a.targetTouches.length > 0 && (z = a.targetTouches[0])
										}), a.addEventListener("touchend", function(a) {
											if (a.changedTouches.length > 0 && null != z) {
												var b = a.changedTouches[0].pageX - z.pageX,
													c = a.changedTouches[0].pageY - z.pageY;
												if (Math.abs(b) < 20 && Math.abs(c) < 20) return void(z = null);
												Math.abs(b) > 3 * Math.abs(c) ? b > 0 ? i.video.paused && i.btnPlay.click() : i.video.paused || i.btnPlay.click() : Math.abs(c) > 3 * Math.abs(b) && (i.video.volume = 0 > c ? Math.min(1, i.video.volume + .1) : Math.max(0, i.video.volume - .1)), z = null
											}
										})
									}
									if (null !== i.txtText && i.txtText.addEventListener("keyup", function(a) {
										if (null != this.value) if (this.style.color = /^!/.test(this.value) ? "#5DE534" : "", null != a && 13 === a.keyCode) {
											if ("" == this.value) return;
											if (/^!/.test(this.value)) {
												var b = this.value.substring(1).split(":"),
													c = b.shift();
												switch (c) {
												case "help":
													{
														i.createPopup("提示信息：", 2e3)
													}
													break;
												case "speed":
												case "rate":
												case "spd":
													if (b.length < 1) i.createPopup("速度调节：输入百分比【 1% - 300% 】", 2e3);
													else {
														var d = parseInt(b[0]);
														if (0 / 0 != d) {
															var e = Math.min(Math.max(d, 1), 300);
															i.video.playbackRate = e / 100
														}
														null !== i.cmManager && i.cmManager.clear()
													}
													break;
												case "off":
													i.cmManager.display = !1, i.cmManager.clear(), i.cmManager.stopTimer();
													break;
												case "on":
													i.cmManager.display = !0, i.cmManager.startTimer();
													break;
												case "cls":
												case "clear":
													null !== i.cmManager && i.cmManager.clear();
													break;
												case "pp":
												case "pause":
													i.video.pause();
													break;
												case "p":
												case "play":
													i.video.play();
													break;
												case "vol":
												case "volume":
													if (0 == b.length) {
														i.createPopup("目前音量：" + Math.round(100 * i.video.volume) + "%", 2e3)
													} else {
														var f = parseInt(b[0]);
														null !== f && 0 / 0 !== f && (i.video.volume = Math.max(Math.min(f, 100), 0) / 100), i.createPopup("目前音量：" + Math.round(100 * i.video.volume) + "%", 2e3)
													}
												}
												this.value = ""
											}
										} else if (null != a && 38 === a.keyCode) if (a.shiftKey) {
											if (null !== i.cmManager) {
												var g = Math.min(Math.round(100 * i.cmManager.def.opacity) + 5, 100);
												i.cmManager.def.opacity = g / 100, i.removePopup(); {
													i.createPopup("弹幕透明度：" + Math.round(g) + "%", 800)
												}
											}
										} else {
											i.video.volume = Math.round(Math.min(100 * i.video.volume + 5, 100)) / 100, i.removePopup(); {
												i.createPopup("目前音量：" + Math.round(100 * i.video.volume) + "%", 800)
											}
										} else if (null != a && 40 === a.keyCode) if (a.shiftKey) {
											if (null !== i.cmManager) {
												var g = Math.max(Math.round(100 * i.cmManager.def.opacity) - 5, 0);
												i.cmManager.def.opacity = g / 100, i.removePopup(); {
													i.createPopup("弹幕透明度：" + Math.round(g) + "%", 800)
												}
											}
										} else {
											i.video.volume = Math.round(Math.max(100 * i.video.volume - 5, 0)) / 100, i.removePopup(); {
												i.createPopup("目前音量：" + Math.round(100 * i.video.volume) + "%", 800)
											}
										}
									}), "undefined" != typeof CommentManager && i.state.autosize) {
										var A = function() {
												if (0 !== k.videoHeight && 0 !== k.videoWidth) {
													var b = k.videoHeight / k.videoWidth,
														c = a.offsetWidth,
														d = a.offsetHeight,
														e = d / c;
													b > e ? (a.style.width = d / b + "px", a.style.height = d + "px") : (a.style.width = c + "px", a.style.height = c * b + "px"), i.cmManager.setBounds()
												}
											};
										k.addEventListener("loadedmetadata", A), A()
									}
									return i
								}
							}
						}
					}
				}
			}
		}
	}
}();