/**
 * @return {?}
 */
function isMobile() {
    /** @type {boolean} */
    var a = false;
    return function(cssText) {
        if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(cssText) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(cssText.substr(0,
                4))) {
            /** @type {boolean} */
            a = true;
        }
    }(navigator.userAgent || (navigator.vendor || window.opera)), a;
}
/**
 * @param {?} uri
 * @param {?} actualObject
 * @param {Object} fetchOnlyFunction
 * @return {undefined}
 */
function CommentLoader(uri, actualObject, fetchOnlyFunction) {
    if (null == fetchOnlyFunction) {
        /**
         * @return {undefined}
         */
        fetchOnlyFunction = function() {
        };
    }
    /** @type {null} */
    var xhr = null;
    xhr = window.XMLHttpRequest ? new XMLHttpRequest : new ActiveXObject("Microsoft.XMLHTTP");
    xhr.open("GET", uri, true);
    xhr.send();
    var object = actualObject;
    /**
     * @return {undefined}
     */
    xhr.onreadystatechange = function() {
        if (4 == xhr.readyState && 200 == xhr.status) {
            if ("Microsoft Internet Explorer" == navigator.appName) {
                var dom = new ActiveXObject("Microsoft.XMLDOM");
                /** @type {boolean} */
                dom.async = false;
                dom.loadXML(xhr.responseText);
                object.load(BilibiliParser(dom));
                fetchOnlyFunction();
            } else {
                object.load(BilibiliParser(xhr.responseXML));
                fetchOnlyFunction();
            }
        }
    };
}
/**
 * @param {?} method
 * @param {?} url
 * @return {?}
 */
function createCORSRequest(method, url) {
    /** @type {XMLHttpRequest} */
    var xhr = new XMLHttpRequest;
    return "withCredentials" in xhr ? xhr.open(method, url, true) : "undefined" != typeof XDomainRequest ? (xhr = new XDomainRequest, xhr.open(method, url)) : xhr = null, xhr;
}
var ABP = {
    version : "0.8.0"
};
!function() {
    if (ABP) {
        /**
         * @param {Element} parent
         * @return {?}
         */
        var promote = function(parent) {
            return document.getElementById(parent);
        };
        /**
         * @param {string} type
         * @param {?} opt_attributes
         * @param {Array} elements
         * @param {boolean} fn
         * @return {?}
         */
        var create = function(type, opt_attributes, elements, fn) {
            /** @type {null} */
            var elem = null;
            if ("text" === type) {
                return document.createTextNode(opt_attributes);
            }
            /** @type {Element} */
            elem = document.createElement(type);
            var key;
            for (key in opt_attributes) {
                if ("style" !== key && "className" !== key) {
                    elem.setAttribute(key, opt_attributes[key]);
                } else {
                    if ("className" === key) {
                        elem.className = opt_attributes[key];
                    } else {
                        var name;
                        for (name in opt_attributes.style) {
                            elem.style[name] = opt_attributes.style[name];
                        }
                    }
                }
            }
            if (elements) {
                /** @type {number} */
                var j = 0;
                for (;j < elements.length;j++) {
                    if (null != elements[j]) {
                        elem.appendChild(elements[j]);
                    }
                }
            }
            return fn && ("function" == typeof fn && fn(elem)), elem;
        };
        /**
         * @param {Object} node
         * @param {string} name
         * @return {undefined}
         */
        var addClass = function(node, name) {
            if (null != node) {
                var classes = node.className.split(" ");
                if (classes.indexOf(name) < 0) {
                    classes.push(name);
                }
                node.className = classes.join(" ");
            }
        };
        /**
         * @param {Object} obj
         * @param {string} i
         * @return {?}
         */
        var func = function(obj, i) {
            if (null == obj) {
                return false;
            }
            var reserved = obj.className.split(" ");
            return reserved.indexOf(i) >= 0;
        };
        /**
         * @param {Object} node
         * @param {string} name
         * @return {undefined}
         */
        var toggleClass = function(node, name) {
            if (null != node) {
                var classes = node.className.split(" ");
                if (classes.indexOf(name) >= 0) {
                    classes.splice(classes.indexOf(name), 1);
                }
                node.className = classes.join(" ");
            }
        };
        /**
         * @param {Object} args
         * @param {Object} defs
         * @return {?}
         */
        var add = function(args, defs) {
            var toReturn = {};
            var i;
            for (i in defs) {
                toReturn[i] = args && "undefined" != typeof args[i] ? args[i] : defs[i];
            }
            return toReturn;
        };
        /**
         * @param {Element} parent
         * @param {Object} self
         * @return {?}
         */
        ABP.create = function(parent, self) {
            /** @type {Element} */
            var obj = parent;
            if (self || (self = {}), self = add(self, {
                    replaceMode : true,
                    width : 512,
                    height : 384,
                    src : "",
                    mobile : false
                }), "string" == typeof parent && (obj = promote(parent)), func(obj, "ABP-Unit")) {
                node = obj;
            } else {
                var node = create("div", {
                    className : "ABP-Unit",
                    style : {
                        width : self.width + "px",
                        height : self.height + "px"
                    }
                });
                obj.appendChild(node);
            }
            if (node.children.length > 0) {
                if (self.replaceMode) {
                    /** @type {string} */
                    node.innerHTML = "";
                }
            }
            /** @type {Array} */
            var names = [];
            /** @type {Array} */
            var codeSegments = [];
            if ("string" == typeof self.src) {
                self.src = create("video", {
                    autobuffer : "true",
                    dataSetup : "{}"
                }, [create("source", {
                    src : self.src
                })]);
                names.push(self.src);
            } else {
                if (self.src.hasOwnProperty("playlist")) {
                    var data = self.src;
                    var results = data.playlist;
                    /** @type {number} */
                    var i = 0;
                    for (;i < results.length;i++) {
                        if (results[i].hasOwnProperty("sources")) {
                            /** @type {Array} */
                            var options = [];
                            var name;
                            for (name in results[i].sources) {
                                options.push(create("source", {
                                    src : results[i][name],
                                    type : name
                                }));
                            }
                            names.push(create("video", {
                                autobuffer : "true",
                                dataSetup : "{}"
                            }, options));
                        } else {
                            if (results[i].hasOwnProperty("video")) {
                                names.push(results[i].video);
                            } else {
                                console.log("No recognized format");
                            }
                        }
                        codeSegments.push(results[i].comments);
                    }
                } else {
                    names.push(self.src);
                }
            }
            node.appendChild(create("div", {
                className : "ABP-Video",
                tabindex : "10"
            }, [create("div", {
                className : "ABP-Container"
            }), names[0]]));
            node.appendChild(create("div", {
                className : "ABP-Text"
            }, [create("input", {
                type : "text"
            })]));
            node.appendChild(create("div", {
                className : "ABP-Control"
            }, [create("div", {
                className : "button ABP-Play"
            }), create("div", {
                className : "progress-bar"
            }, [create("div", {
                className : "bar dark"
            }), create("div", {
                className : "bar"
            })]), create("div", {
                className : "button ABP-CommentShow"
            }), create("div", {
                className : "button ABP-FullScreen"
            })]));
            var item = ABP.bind(node, self.mobile);
            if (names.length > 0) {
                var n = names[0];
                /**
                 * @return {undefined}
                 */
                item.gotoNext = function() {
                    /** @type {number} */
                    var i = names.indexOf(n) + 1;
                    if (i < names.length) {
                        n = names[i];
                        /** @type {string} */
                        n.style.display = "";
                        var parent = item.video.parentNode;
                        parent.removeChild(item.video);
                        parent.appendChild(n);
                        /** @type {string} */
                        item.video.style.display = "none";
                        item.video = n;
                        item.swapVideo(n);
                        n.addEventListener("ended", function() {
                            item.gotoNext();
                        });
                    }
                    if (i < codeSegments.length) {
                        if (null !== codeSegments[i]) {
                            CommentLoader(codeSegments[i], item.cmManager);
                        }
                    }
                };
                n.addEventListener("ended", function() {
                    item.gotoNext();
                });
                CommentLoader(codeSegments[0], item.cmManager);
            }
            return item;
        };
        /**
         * @return {undefined}
         */
        ABP.load = function() {
        };
        /**
         * @param {Object} node
         * @param {?} selfObj
         * @param {Object} arg
         * @return {?}
         */
        ABP.bind = function(node, selfObj, arg) {
            var that = {
                btnPlay : null,
                barTime : null,
                barLoad : null,
                divComment : null,
                btnFull : null,
                btnDm : null,
                video : null,
                divTextField : null,
                txtText : null,
                cmManager : null,
                defaults : {
                    w : 0,
                    h : 0
                },
                state : add(arg, {
                    fullscreen : false,
                    commentVisible : true,
                    allowRescale : false,
                    autosize : false
                }),
                /**
                 * @param {string} attributes
                 * @param {number} opt_attributes
                 * @return {?}
                 */
                createPopup : function(attributes, opt_attributes) {
                    if (node.hasPopup === true) {
                        return false;
                    }
                    var div = create("div", {
                        className : "ABP-Popup"
                    }, [create("text", attributes)]);
                    return div.remove = function() {
                        if (!div.isRemoved) {
                            /** @type {boolean} */
                            div.isRemoved = true;
                            node.removeChild(div);
                            /** @type {boolean} */
                            node.hasPopup = false;
                        }
                    }, node.appendChild(div), node.hasPopup = true, "number" == typeof opt_attributes && setTimeout(function() {
                        div.remove();
                    }, opt_attributes), div;
                },
                /**
                 * @return {undefined}
                 */
                removePopup : function() {
                    var codeSegments = node.getElementsByClassName("ABP-Popup");
                    /** @type {number} */
                    var i = 0;
                    for (;i < codeSegments.length;i++) {
                        if (null != codeSegments[i].remove) {
                            codeSegments[i].remove();
                        } else {
                            codeSegments[i].parentNode.removeChild(codeSegments[i]);
                        }
                    }
                    /** @type {boolean} */
                    node.hasPopup = false;
                },
                swapVideo : null
            };
            if (that.swapVideo = function(video) {
                    video.addEventListener("timeupdate", function() {
                        if (!y) {
                            /** @type {string} */
                            that.barTime.style.width = video.currentTime / video.duration * 100 + "%";
                        }
                    });
                    video.addEventListener("ended", function() {
                        /** @type {string} */
                        that.btnPlay.className = "button ABP-Play";
                        /** @type {string} */
                        that.barTime.style.width = "0%";
                    });
                    video.addEventListener("progress", function() {
                        if (null != this.buffered) {
                            try {
                                var difference = (this.buffered.start(0), this.buffered.end(0));
                            } catch (b) {
                                return;
                            }
                            var duration = this.duration;
                            /** @type {number} */
                            var w = difference / duration * 100;
                            /** @type {string} */
                            that.barLoad.style.width = w + "%";
                        }
                    });
                    video.addEventListener("loadedmetadata", function() {
                        if (null != this.buffered) {
                            try {
                                var difference = (this.buffered.start(0), this.buffered.end(0));
                            } catch (b) {
                                return;
                            }
                            var duration = this.duration;
                            /** @type {number} */
                            var w = difference / duration * 100;
                            /** @type {string} */
                            that.barLoad.style.width = w + "%";
                        }
                    });
                    /** @type {boolean} */
                    video.isBound = true;
                    /** @type {number} */
                    var last = 0;
                    if (that.cmManager) {
                        that.cmManager.clear();
                        video.addEventListener("progress", function() {
                            if (last == video.currentTime) {
                                /** @type {boolean} */
                                video.hasStalled = true;
                                that.cmManager.stopTimer();
                            } else {
                                last = video.currentTime;
                            }
                        });
                        if (window) {
                            window.addEventListener("resize", function() {
                                that.cmManager.setBounds();
                            });
                        }
                        video.addEventListener("timeupdate", function() {
                            if (that.cmManager.display !== false) {
                                if (video.hasStalled) {
                                    that.cmManager.startTimer();
                                    /** @type {boolean} */
                                    video.hasStalled = false;
                                }
                                that.cmManager.time(Math.floor(1E3 * video.currentTime));
                            }
                        });
                        video.addEventListener("play", function() {
                            that.cmManager.startTimer();
                            try {
                                var difference = this.buffered.end(0);
                                var duration = this.duration;
                                /** @type {number} */
                                var w = difference / duration * 100;
                                /** @type {string} */
                                that.barLoad.style.width = w + "%";
                            } catch (d) {
                            }
                        });
                        video.addEventListener("ratechange", function() {
                            if (null != that.cmManager.def.globalScale) {
                                if (0 !== video.playbackRate) {
                                    /** @type {number} */
                                    that.cmManager.def.globalScale = 1 / video.playbackRate;
                                    that.cmManager.rescale();
                                }
                            }
                        });
                        video.addEventListener("pause", function() {
                            that.cmManager.stopTimer();
                        });
                        video.addEventListener("waiting", function() {
                            that.cmManager.stopTimer();
                        });
                        video.addEventListener("playing", function() {
                            that.cmManager.startTimer();
                        });
                    }
                }, null !== node && null !== node.getElementsByClassName) {
                that.defaults.w = node.offsetWidth;
                that.defaults.h = node.offsetHeight;
                var items = node.getElementsByClassName("ABP-Video");
                if (!(items.length <= 0)) {
                    /** @type {null} */
                    var video = null;
                    var id;
                    for (id in items[0].children) {
                        if (null != items[0].children[id].tagName && "VIDEO" === items[0].children[id].tagName.toUpperCase()) {
                            video = items[0].children[id];
                            break;
                        }
                    }
                    if (items[0]) {
                        if (selfObj) {
                            /** @type {string} */
                            items[0].style.bottom = "0px";
                        }
                    }
                    var meshes = items[0].getElementsByClassName("ABP-Container");
                    if (meshes.length > 0 && (that.divComment = meshes[0]), null !== video) {
                        that.video = video;
                        var targetMatches = node.getElementsByClassName("ABP-Play");
                        if (!(targetMatches.length <= 0)) {
                            that.btnPlay = targetMatches[0];
                            var suites = node.getElementsByClassName("progress-bar");
                            if (!(suites.length <= 0)) {
                                that.barHitArea = suites[0];
                                var results = suites[0].getElementsByClassName("bar");
                                that.barTime = results[0];
                                that.barLoad = results[1];
                                var valueMatches = node.getElementsByClassName("ABP-FullScreen");
                                if (!(valueMatches.length <= 0)) {
                                    that.btnFull = valueMatches[0];
                                    var heads = node.getElementsByClassName("ABP-Text");
                                    if (heads.length > 0) {
                                        that.divTextField = heads[0];
                                        var result = heads[0].getElementsByTagName("input");
                                        if (result.length > 0) {
                                            that.txtText = result[0];
                                        }
                                    }
                                    var highlightedBlocks = node.getElementsByClassName("ABP-CommentShow");
                                    if (highlightedBlocks.length > 0 && (that.btnDm = highlightedBlocks[0]), "undefined" != typeof CommentManager && (that.cmManager = new CommentManager(that.divComment), that.cmManager.display = true, that.cmManager.init(), that.cmManager.clear(), window && window.addEventListener("resize", function() {
                                            that.cmManager.setBounds();
                                        })), selfObj) {
                                        var codeSegments = node.getElementsByClassName("ABP-Control");
                                        if (codeSegments.length > 0) {
                                            that.controlBar = codeSegments[0];
                                        }
                                        /** @type {number} */
                                        var loadingTimer = -1;
                                        /**
                                         * @return {undefined}
                                         */
                                        var create = function() {
                                            /** @type {string} */
                                            that.controlBar.style.display = "none";
                                            /** @type {string} */
                                            that.divTextField.style.display = "none";
                                            /** @type {string} */
                                            that.divComment.style.bottom = "0px";
                                            that.cmManager.setBounds();
                                        };
                                        /** @type {string} */
                                        that.divComment.style.bottom = that.controlBar.offsetHeight + that.divTextField.offsetHeight + "px";
                                        /**
                                         * @return {undefined}
                                         */
                                        var handler = function() {
                                            /** @type {string} */
                                            that.controlBar.style.display = "";
                                            /** @type {string} */
                                            that.divTextField.style.display = "";
                                            /** @type {string} */
                                            that.divComment.style.bottom = that.controlBar.offsetHeight + that.divTextField.offsetHeight + "px";
                                            try {
                                                if (-1 != loadingTimer) {
                                                    clearInterval(loadingTimer);
                                                    /** @type {number} */
                                                    loadingTimer = -1;
                                                }
                                                /** @type {number} */
                                                loadingTimer = setInterval(function() {
                                                    if (document.activeElement !== that.txtText) {
                                                        create();
                                                        clearInterval(loadingTimer);
                                                        /** @type {number} */
                                                        loadingTimer = -1;
                                                    }
                                                }, 2500);
                                            } catch (fmt) {
                                                console.log(fmt);
                                            }
                                        };
                                        node.addEventListener("touchmove", handler);
                                        node.addEventListener("mousemove", handler);
                                        /** @type {number} */
                                        loadingTimer = setTimeout(function() {
                                            create();
                                        }, 4E3);
                                    }
                                    if (video.isBound !== true) {
                                        that.swapVideo(video);
                                        that.btnFull.addEventListener("click", function() {
                                            that.state.fullscreen = func(node, "ABP-FullScreen");
                                            if (that.state.fullscreen) {
                                                toggleClass(node, "ABP-FullScreen");
                                            } else {
                                                addClass(node, "ABP-FullScreen");
                                            }
                                            /** @type {boolean} */
                                            that.state.fullscreen = !that.state.fullscreen;
                                            if (that.cmManager) {
                                                that.cmManager.setBounds();
                                            }
                                            if (that.state.allowRescale) {
                                                if (that.state.fullscreen) {
                                                    if (that.defaults.w > 0) {
                                                        /** @type {number} */
                                                        that.cmManager.def.scrollScale = node.offsetWidth / that.defaults.w;
                                                    }
                                                } else {
                                                    /** @type {number} */
                                                    that.cmManager.def.scrollScale = 1;
                                                }
                                            }
                                        });
                                        that.btnDm.addEventListener("click", function() {
                                            if (0 == that.cmManager.display) {
                                                /** @type {boolean} */
                                                that.cmManager.display = true;
                                                that.cmManager.startTimer();
                                            } else {
                                                /** @type {boolean} */
                                                that.cmManager.display = false;
                                                that.cmManager.clear();
                                                that.cmManager.stopTimer();
                                            }
                                        });
                                        /** @type {string} */
                                        that.barTime.style.width = "0%";
                                        /** @type {boolean} */
                                        var y = false;
                                        that.barHitArea.addEventListener("mousedown", function() {
                                            /** @type {boolean} */
                                            y = true;
                                        });
                                        document.addEventListener("mouseup", function() {
                                            /** @type {boolean} */
                                            y = false;
                                        });
                                        that.barHitArea.addEventListener("mouseup", function(e) {
                                            /** @type {boolean} */
                                            y = false;
                                            /** @type {number} */
                                            var currentTime = e.layerX / this.offsetWidth * that.video.duration;
                                            if (Math.abs(currentTime - that.video.currentTime) > 4) {
                                                if (that.cmManager) {
                                                    that.cmManager.clear();
                                                }
                                            }
                                            /** @type {number} */
                                            that.video.currentTime = currentTime;
                                        });
                                        that.barHitArea.addEventListener("mousemove", function(e) {
                                            if (y) {
                                                /** @type {string} */
                                                that.barTime.style.width = 100 * e.layerX / this.offsetWidth + "%";
                                            }
                                        });
                                        that.btnPlay.addEventListener("click", function() {
                                            if (that.video.paused) {
                                                that.video.play();
                                                /** @type {string} */
                                                this.className = "button ABP-Play ABP-Pause";
                                            } else {
                                                that.video.pause();
                                                /** @type {string} */
                                                this.className = "button ABP-Play";
                                            }
                                        });
                                        node.addEventListener("keydown", function(event) {
                                            if (event) {
                                                if (32 == event.keyCode) {
                                                    if (document.activeElement !== that.txtText) {
                                                        that.btnPlay.click();
                                                        event.preventDefault();
                                                    }
                                                }
                                            }
                                        });
                                        node.addEventListener("touchmove", function() {
                                            event.preventDefault();
                                        });
                                        /** @type {null} */
                                        var touch0 = null;
                                        node.addEventListener("touchstart", function(touchEvent) {
                                            if (touchEvent.targetTouches.length > 0) {
                                                touch0 = touchEvent.targetTouches[0];
                                            }
                                        });
                                        node.addEventListener("touchend", function(orig) {
                                            if (orig.changedTouches.length > 0 && null != touch0) {
                                                /** @type {number} */
                                                var oDelta = orig.changedTouches[0].pageX - touch0.pageX;
                                                /** @type {number} */
                                                var marginTop = orig.changedTouches[0].pageY - touch0.pageY;
                                                if (Math.abs(oDelta) < 20 && Math.abs(marginTop) < 20) {
                                                    return void(touch0 = null);
                                                }
                                                if (Math.abs(oDelta) > 3 * Math.abs(marginTop)) {
                                                    if (oDelta > 0) {
                                                        if (that.video.paused) {
                                                            that.btnPlay.click();
                                                        }
                                                    } else {
                                                        if (!that.video.paused) {
                                                            that.btnPlay.click();
                                                        }
                                                    }
                                                } else {
                                                    if (Math.abs(marginTop) > 3 * Math.abs(oDelta)) {
                                                        /** @type {number} */
                                                        that.video.volume = 0 > marginTop ? Math.min(1, that.video.volume + 0.1) : Math.max(0, that.video.volume - 0.1);
                                                    }
                                                }
                                                /** @type {null} */
                                                touch0 = null;
                                            }
                                        });
                                    }
                                    if (null !== that.txtText && that.txtText.addEventListener("keyup", function(e) {
                                            if (null != this.value) {
                                                if (this.style.color = /^!/.test(this.value) ? "#5DE534" : "", null != e && 13 === e.keyCode) {
                                                    if ("" == this.value) {
                                                        return;
                                                    }
                                                    if (/^!/.test(this.value)) {
                                                        var strings = this.value.substring(1).split(":");
                                                        var attr = strings.shift();
                                                        switch(attr) {
                                                            case "help":
                                                                that.createPopup("\u63d0\u793a\u4fe1\u606f\uff1a", 2E3);
                                                                break;
                                                            case "speed":
                                                                ;
                                                            case "rate":
                                                                ;
                                                            case "spd":
                                                                if (strings.length < 1) {
                                                                    that.createPopup("\u901f\u5ea6\u8c03\u8282\uff1a\u8f93\u5165\u767e\u5206\u6bd4\u3010 1% - 300% \u3011", 2E3);
                                                                } else {
                                                                    /** @type {number} */
                                                                    var value = parseInt(strings[0]);
                                                                    if (0 / 0 != value) {
                                                                        /** @type {number} */
                                                                        var playbackRate = Math.min(Math.max(value, 1), 300);
                                                                        /** @type {number} */
                                                                        that.video.playbackRate = playbackRate / 100;
                                                                    }
                                                                    if (null !== that.cmManager) {
                                                                        that.cmManager.clear();
                                                                    }
                                                                }
                                                                break;
                                                            case "off":
                                                                /** @type {boolean} */
                                                                that.cmManager.display = false;
                                                                that.cmManager.clear();
                                                                that.cmManager.stopTimer();
                                                                break;
                                                            case "on":
                                                                /** @type {boolean} */
                                                                that.cmManager.display = true;
                                                                that.cmManager.startTimer();
                                                                break;
                                                            case "cls":
                                                                ;
                                                            case "clear":
                                                                if (null !== that.cmManager) {
                                                                    that.cmManager.clear();
                                                                }
                                                                break;
                                                            case "pp":
                                                                ;
                                                            case "pause":
                                                                that.video.pause();
                                                                break;
                                                            case "p":
                                                                ;
                                                            case "play":
                                                                that.video.play();
                                                                break;
                                                            case "vol":
                                                                ;
                                                            case "volume":
                                                                if (0 == strings.length) {
                                                                    that.createPopup("\u76ee\u524d\u97f3\u91cf\uff1a" + Math.round(100 * that.video.volume) + "%", 2E3);
                                                                } else {
                                                                    /** @type {number} */
                                                                    var red = parseInt(strings[0]);
                                                                    if (null !== red) {
                                                                        if (0 / 0 !== red) {
                                                                            /** @type {number} */
                                                                            that.video.volume = Math.max(Math.min(red, 100), 0) / 100;
                                                                        }
                                                                    }
                                                                    that.createPopup("\u76ee\u524d\u97f3\u91cf\uff1a" + Math.round(100 * that.video.volume) + "%", 2E3);
                                                                }
                                                                ;
                                                        }
                                                        /** @type {string} */
                                                        this.value = "";
                                                    }
                                                } else {
                                                    if (null != e && 38 === e.keyCode) {
                                                        if (e.shiftKey) {
                                                            if (null !== that.cmManager) {
                                                                /** @type {number} */
                                                                var val = Math.min(Math.round(100 * that.cmManager.def.opacity) + 5, 100);
                                                                /** @type {number} */
                                                                that.cmManager.def.opacity = val / 100;
                                                                that.removePopup();
                                                                that.createPopup("\u5f39\u5e55\u900f\u660e\u5ea6\uff1a" + Math.round(val) + "%", 800);
                                                            }
                                                        } else {
                                                            /** @type {number} */
                                                            that.video.volume = Math.round(Math.min(100 * that.video.volume + 5, 100)) / 100;
                                                            that.removePopup();
                                                            that.createPopup("\u76ee\u524d\u97f3\u91cf\uff1a" + Math.round(100 * that.video.volume) + "%", 800);
                                                        }
                                                    } else {
                                                        if (null != e && 40 === e.keyCode) {
                                                            if (e.shiftKey) {
                                                                if (null !== that.cmManager) {
                                                                    /** @type {number} */
                                                                    val = Math.max(Math.round(100 * that.cmManager.def.opacity) - 5, 0);
                                                                    /** @type {number} */
                                                                    that.cmManager.def.opacity = val / 100;
                                                                    that.removePopup();
                                                                    that.createPopup("\u5f39\u5e55\u900f\u660e\u5ea6\uff1a" + Math.round(val) + "%", 800);
                                                                }
                                                            } else {
                                                                /** @type {number} */
                                                                that.video.volume = Math.round(Math.max(100 * that.video.volume - 5, 0)) / 100;
                                                                that.removePopup();
                                                                that.createPopup("\u76ee\u524d\u97f3\u91cf\uff1a" + Math.round(100 * that.video.volume) + "%", 800);
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }), "undefined" != typeof CommentManager && that.state.autosize) {
                                        /**
                                         * @return {undefined}
                                         */
                                        var size = function() {
                                            if (0 !== video.videoHeight && 0 !== video.videoWidth) {
                                                /** @type {number} */
                                                var ratio = video.videoHeight / video.videoWidth;
                                                var w = node.offsetWidth;
                                                var h = node.offsetHeight;
                                                /** @type {number} */
                                                var v = h / w;
                                                if (ratio > v) {
                                                    /** @type {string} */
                                                    node.style.width = h / ratio + "px";
                                                    /** @type {string} */
                                                    node.style.height = h + "px";
                                                } else {
                                                    /** @type {string} */
                                                    node.style.width = w + "px";
                                                    /** @type {string} */
                                                    node.style.height = w * ratio + "px";
                                                }
                                                that.cmManager.setBounds();
                                            }
                                        };
                                        video.addEventListener("loadedmetadata", size);
                                        size();
                                    }
                                    return that;
                                }
                            }
                        }
                    }
                }
            }
        };
    }
}();
