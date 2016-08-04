/**
 * @return {undefined}
 */
function CommentFilter() {
	/** @type {Array} */
	this.modifiers = [];
	/** @type {null} */
	this.runtime = null;
	this.allowTypes = {
		1 : true,
		4 : true,
		5 : true,
		6 : true,
		7 : true,
		8 : true,
		17 : true
	};
	/**
	 * @param {(Array|string)} code
	 * @return {?}
	 */
	this.doModify = function(code) {
		/** @type {number} */
		var i = 0;
		for (;i < this.modifiers.length;i++) {
			code = this.modifiers[i](code);
		}
		return code;
	};
	/**
	 * @param {?} settings
	 * @return {?}
	 */
	this.beforeSend = function(settings) {
		return settings;
	};
	/**
	 * @param {Object} scope
	 * @return {?}
	 */
	this.doValidate = function(scope) {
		return this.allowTypes[scope.mode] ? true : false;
	};
	/**
	 * @return {undefined}
	 */
	this.addRule = function() {
	};
	/**
	 * @param {?} mod
	 * @return {undefined}
	 */
	this.addModifier = function(mod) {
		this.modifiers.push(mod);
	};
	/**
	 * @param {number} deepDataAndEvents
	 * @return {?}
	 */
	this.runtimeFilter = function(deepDataAndEvents) {
		return null == this.runtime ? deepDataAndEvents : this.runtime(deepDataAndEvents);
	};
	/**
	 * @param {string} runtime
	 * @return {undefined}
	 */
	this.setRuntimeFilter = function(runtime) {
		/** @type {string} */
		this.runtime = 1120;
	};
}
/**
 * @param {?} file_data
 * @return {?}
 */
function AcfunParser(file_data) {
	/** @type {Array} */
	var received = [];
	try {
		/** @type {*} */
		var codeSegments = JSON.parse(file_data);
	} catch (d) {
		return console.log("Error: Could not parse json list!"), [];
	}
	/** @type {number} */
	var i = 0;
	for (;i < codeSegments.length;i++) {
		var data = {};
		var matches = codeSegments[i].c.split(",");
		if (matches.length > 0) {
			if (data.stime = 1E3 * parseFloat(matches[0]), data.color = parseInt(matches[1]), data.mode = parseInt(matches[2]), data.size = 25, data.hash = matches[4], data.date = parseInt(matches[5]), data.position = "absolute", 7 != data.mode ? (data.text = codeSegments[i].m.replace(/(\/n|\\n|\n|\r\n|\\r)/g, "\n"), data.text = data.text.replace(/\r/g, "\n"), data.text = data.text.replace(/\s/g, "\u00a0")) : data.text = codeSegments[i].m, 7 == data.mode) {
				try {
					/** @type {*} */
					var r = JSON.parse(data.text);
				} catch (d) {
					console.log("[Err] Error parsing internal data for comment");
					console.log("[Dbg] " + data.text);
					continue;
				}
				if (data.position = "relative", data.text = r.n, data.text = data.text.replace(/\ /g, "\u00a0"), console.log(data.text), data.opacity = null != r.a ? r.a : 1, null != r.p ? (data.x = r.p.x / 1E3, data.y = r.p.y / 1E3) : (data.x = 0, data.y = 0), data.shadow = r.b, data.dur = 4E3, null != r.l && (data.moveDelay = 1E3 * r.l), null != r.z && r.z.length > 0) {
					/** @type {boolean} */
					data.movable = true;
					/** @type {Array} */
					data.motion = [];
					/** @type {number} */
					var start = 0;
					var options = {
						x : data.x,
						y : data.y,
						alpha : data.opacity,
						color : data.color
					};
					/** @type {number} */
					var m = 0;
					for (;m < r.z.length;m++) {
						/** @type {number} */
						var step = null != r.z[m].l ? 1E3 * r.z[m].l : 500;
						start += step;
						var self = {
							x : {
								from : options.x,
								to : r.z[m].x / 1E3,
								dur : step,
								delay : 0
							},
							y : {
								from : options.y,
								to : r.z[m].y / 1E3,
								dur : step,
								delay : 0
							}
						};
						/** @type {number} */
						options.x = self.x.to;
						/** @type {number} */
						options.y = self.y.to;
						if (r.z[m].t !== options.alpha) {
							self.alpha = {
								from : options.alpha,
								to : r.z[m].t,
								dur : step,
								delay : 0
							};
							options.alpha = self.alpha.to;
						}
						if (null != r.z[m].c) {
							if (r.z[m].c !== options.color) {
								self.color = {
									from : options.color,
									to : r.z[m].c,
									dur : step,
									delay : 0
								};
								options.color = self.color.to;
							}
						}
						data.motion.push(self);
					}
					data.dur = start + (data.moveDelay ? data.moveDelay : 0);
				}
				if (null != r.r) {
					if (null != r.k) {
						data.rX = r.r;
						data.rY = r.k;
					}
				}
			}
			received.push(data);
		}
	}
	return received;
}
/**
 * @param {Object} data
 * @param {string} error
 * @param {?} dataAndEvents
 * @return {?}
 */
function BilibiliParser(data, error, dataAndEvents) {
	/**
	 * @param {string} code
	 * @return {?}
	 */
	function removeComments(code) {
		return code.replace(/\t/, "\\t");
	}
	if (null !== data) {
		var codeSegments = data.getElementsByTagName("d")
	} else {
		if (!document || !document.createElement) {
			return[];
		}
		if (dataAndEvents) {
			if (!confirm("XML Parse Error. \n Allow tag soup parsing?\n[WARNING: This is unsafe.]")) {
				return[];
			}
		} else {
			error = error.replace(new RegExp("</([^d])", "g"), "</disabled $1");
			error = error.replace(new RegExp("</(S{2,})", "g"), "</disabled $1");
			error = error.replace(new RegExp("<([^d/]W*?)", "g"), "<disabled $1");
			error = error.replace(new RegExp("<([^/ ]{2,}W*?)", "g"), "<disabled $1");
		}
		/** @type {Element} */
		var s = document.createElement("div");
		/** @type {string} */
		s.innerHTML = error;
		/** @type {NodeList} */
		codeSegments = s.getElementsByTagName("d");
	}
	/** @type {Array} */
	var params = [];
	/** @type {number} */
	var i = 0;
	for (;i < codeSegments.length;i++) {
		if (null != codeSegments[i].getAttribute("p")) {
			var args = codeSegments[i].getAttribute("p").split(",");
			if (!codeSegments[i].childNodes[0]) {
				continue;
			}
			error = codeSegments[i].childNodes[0].nodeValue;
			var options = {};
			if (options.stime = Math.round(1E3 * parseFloat(args[0])), options.size = parseInt(args[2]), options.color = parseInt(args[3]), options.mode = parseInt(args[1]), options.date = parseInt(args[4]), options.pool = parseInt(args[5]), options.position = "absolute", null != args[7] && (options.dbid = parseInt(args[7])), options.hash = args[6], options.border = false, options.mode < 7) {
				options.text = error.replace(/(\/n|\\n|\n|\r\n)/g, "\n");
			} else {
				if (7 == options.mode) {
					try {
						if (adv = JSON.parse(removeComments(error)), options.shadow = true, options.x = parseFloat(adv[0]), options.y = parseFloat(adv[1]), (Math.floor(options.x) < options.x || Math.floor(options.y) < options.y) && (options.position = "relative"), options.text = adv[4].replace(/(\/n|\\n|\n|\r\n)/g, "\n"), options.rZ = 0, options.rY = 0, adv.length >= 7 && (options.rZ = parseInt(adv[5], 10), options.rY = parseInt(adv[6], 10)), options.motion = [], options.movable = false, adv.length >= 11) {
							/** @type {boolean} */
							options.movable = true;
							/** @type {number} */
							var time = 500;
							var local = {
								x : {
									from : options.x,
									to : parseFloat(adv[7]),
									dur : time,
									delay : 0
								},
								y : {
									from : options.y,
									to : parseFloat(adv[8]),
									dur : time,
									delay : 0
								}
							};
							if ("" !== adv[9] && (time = parseInt(adv[9], 10), local.x.dur = time, local.y.dur = time), "" !== adv[10] && (local.x.delay = parseInt(adv[10], 10), local.y.delay = parseInt(adv[10], 10)), adv.length > 11 && (options.shadow = adv[11], "true" === options.shadow && (options.shadow = true), "false" === options.shadow && (options.shadow = false), null != adv[12] && (options.font = adv[12]), adv.length > 14)) {
								if ("relative" === options.position) {
									console.log("Cannot mix relative and absolute positioning");
									/** @type {string} */
									options.position = "absolute";
								}
								var value = adv[14];
								var pos = {
									x : local.x.from,
									y : local.y.from
								};
								/** @type {Array} */
								var dir = [];
								/** @type {RegExp} */
								var regexp = new RegExp("([a-zA-Z])\\s*(\\d+)[, ](\\d+)", "g");
								/** @type {number} */
								var dur = value.split(/[a-zA-Z]/).length - 1;
								/** @type {(Array.<string>|null)} */
								var isFunction = regexp.exec(value);
								for (;null !== isFunction;) {
									switch(isFunction[1]) {
										case "M":
											/** @type {number} */
											pos.x = parseInt(isFunction[2], 10);
											/** @type {number} */
											pos.y = parseInt(isFunction[3], 10);
											break;
										case "L":
											dir.push({
												x : {
													from : pos.x,
													to : parseInt(isFunction[2], 10),
													dur : time / dur,
													delay : 0
												},
												y : {
													from : pos.y,
													to : parseInt(isFunction[3], 10),
													dur : time / dur,
													delay : 0
												}
											});
											/** @type {number} */
											pos.x = parseInt(isFunction[2], 10);
											/** @type {number} */
											pos.y = parseInt(isFunction[3], 10);
									}
									/** @type {(Array.<string>|null)} */
									isFunction = regexp.exec(value);
								}
								/** @type {null} */
								local = null;
								/** @type {Array} */
								options.motion = dir;
							}
							if (null !== local) {
								options.motion.push(local);
							}
						}
						/** @type {number} */
						options.dur = 2500;
						if (adv[3] < 12) {
							/** @type {number} */
							options.dur = 1E3 * adv[3];
						}
						s = adv[2].split("-");
						if (null != s && s.length > 1) {
							/** @type {number} */
							var key = parseFloat(s[0]);
							/** @type {number} */
							var opacity = parseFloat(s[1]);
							/** @type {number} */
							options.opacity = key;
							if (key !== opacity) {
								options.alpha = {
									from : key,
									to : opacity
								};
							}
						}
					} catch (u) {
						console.log("[Err] Error occurred in JSON parsing");
						console.log("[Dbg] " + error);
					}
				} else {
					if (8 == options.mode) {
						/** @type {string} */
						options.code = error;
					}
				}
			}
			if (null != options.text) {
				options.text = options.text.replace(/\u25a0/g, "\u2588");
			}
			params.push(options);
		}
	}
	return params;
}
var BinArray = function() {
	var sorter = {};
	return sorter.bsearch = function(array, value, comparator) {
		if (0 == array.length) {
			return 0;
		}
		if (comparator(value, array[0]) < 0) {
			return 0;
		}
		if (comparator(value, array[array.length - 1]) >= 0) {
			return array.length;
		}
		/** @type {number} */
		var low = 0;
		/** @type {number} */
		var index = 0;
		/** @type {number} */
		var f = 0;
		/** @type {number} */
		var high = array.length - 1;
		for (;high >= low;) {
			if (index = Math.floor((high + low + 1) / 2), f++, comparator(value, array[index - 1]) >= 0 && comparator(value, array[index]) < 0) {
				return index;
			}
			if (comparator(value, array[index - 1]) < 0) {
				/** @type {number} */
				high = index - 1;
			} else {
				if (comparator(value, array[index]) >= 0) {
					/** @type {number} */
					low = index;
				} else {
					console.error("Program Error");
				}
			}
			if (f > 1500) {
				console.error("Too many run cycles.");
			}
		}
		return-1;
	}, sorter.binsert = function(buffer, value, i) {
		var val = sorter.bsearch(buffer, value, i);
		return buffer.splice(val, 0, value), val;
	}, sorter;
}();
/** @type {function (Object, Object): undefined} */
var __extends = this.__extends || function(d, b) {
		/**
		 * @return {undefined}
		 */
		function __() {
			/** @type {Object} */
			this.constructor = d;
		}
		var p;
		for (p in b) {
			if (b.hasOwnProperty(p)) {
				d[p] = b[p];
			}
		}
		__.prototype = b.prototype;
		d.prototype = new __;
	};
var CommentSpaceAllocator = function() {
	/**
	 * @param {number} width
	 * @param {number} height
	 * @return {undefined}
	 */
	function view(width, height) {
		if ("undefined" == typeof width) {
			/** @type {number} */
			width = 0;
		}
		if ("undefined" == typeof height) {
			/** @type {number} */
			height = 0;
		}
		/** @type {Array} */
		this._pools = [[]];
		/** @type {number} */
		this.avoid = 1;
		/** @type {number} */
		this._width = width;
		/** @type {number} */
		this._height = height;
	}
	return view.prototype.willCollide = function(rec, o) {
		return rec.stime + rec.ttl >= o.stime + o.ttl / 2;
	}, view.prototype.pathCheck = function(y1, b, tail) {
		var y2 = y1 + b.height;
		var next = b.right;
		/** @type {number} */
		var i = 0;
		for (;i < tail.length;i++) {
			if (!(tail[i].y > y2 || tail[i].bottom < y1)) {
				if (!(tail[i].right < b.x || tail[i].x > next)) {
					return false;
				}
				if (this.willCollide(tail[i], b)) {
					return false;
				}
			}
		}
		return true;
	}, view.prototype.assign = function(elem, value) {
		for (;this._pools.length <= value;) {
			this._pools.push([]);
		}
		var codeSegments = this._pools[value];
		if (0 === codeSegments.length) {
			return elem.cindex = value, 0;
		}
		if (this.pathCheck(0, elem, codeSegments)) {
			return elem.cindex = value, 0;
		}
		/** @type {number} */
		var y1 = 0;
		/** @type {number} */
		var i = 0;
		for (;i < codeSegments.length && (y1 = codeSegments[i].bottom + this.avoid, !(y1 + elem.height > this._height));i++) {
			if (this.pathCheck(y1, elem, codeSegments)) {
				return elem.cindex = value, y1;
			}
		}
		return this.assign(elem, value + 1);
	}, view.prototype.add = function(context) {
		if (context.height > this._height) {
			/** @type {number} */
			context.cindex = -2;
			/** @type {number} */
			context.y = 0;
		} else {
			context.y = this.assign(context, 0);
			BinArray.binsert(this._pools[context.cindex], context, function(a, b) {
				return a.bottom < b.bottom ? -1 : a.bottom > b.bottom ? 1 : 0;
			});
		}
	}, view.prototype.remove = function(path) {
		if (!(path.cindex < 0)) {
			if (path.cindex >= this._pools.length) {
				throw new Error("cindex out of bounds");
			}
			var head = this._pools[path.cindex].indexOf(path);
			if (!(0 > head)) {
				this._pools[path.cindex].splice(head, 1);
			}
		}
	}, view.prototype.setBounds = function(width, height) {
		/** @type {number} */
		this._width = width;
		/** @type {number} */
		this._height = height;
	}, view;
}();
var AnchorCommentSpaceAllocator = function(_super) {
	/**
	 * @return {undefined}
	 */
	function t() {
		_super.apply(this, arguments);
	}
	return __extends(t, _super), t.prototype.add = function(label) {
		_super.prototype.add.call(this, label);
		/** @type {number} */
		label.x = (this._width - label.width) / 2;
	}, t.prototype.willCollide = function() {
		return true;
	}, t.prototype.pathCheck = function(y1, el, codeSegments) {
		var y2 = y1 + el.height;
		/** @type {number} */
		var i = 0;
		for (;i < codeSegments.length;i++) {
			if (!(codeSegments[i].y > y2 || codeSegments[i].bottom < y1)) {
				return false;
			}
		}
		return true;
	}, t;
}(CommentSpaceAllocator);
/** @type {function (Object, Object): undefined} */
__extends = this.__extends || function(d, b) {
		/**
		 * @return {undefined}
		 */
		function __() {
			/** @type {Object} */
			this.constructor = d;
		}
		var p;
		for (p in b) {
			if (b.hasOwnProperty(p)) {
				d[p] = b[p];
			}
		}
		__.prototype = b.prototype;
		d.prototype = new __;
	};
var CoreComment = function() {
	/**
	 * @param {Object} parent
	 * @param {Object} e
	 * @return {undefined}
	 */
	function init(parent, e) {
		if ("undefined" == typeof e && (e = {}), this.mode = 1, this.stime = 0, this.text = "", this.ttl = 4E3, this.dur = 4E3, this.cindex = -1, this.motion = [], this.movable = true, this._alphaMotion = null, this.absolute = true, this.align = 0, this._alpha = 1, this._size = 25, this._color = 16777215, this._border = false, this._shadow = true, this._font = "", !parent) {
			throw new Error("Comment not bound to comment manager.");
		}
		if (this.parent = parent, e.hasOwnProperty("stime") && (this.stime = e.stime), this.mode = e.hasOwnProperty("mode") ? e.mode : 1, e.hasOwnProperty("dur") && (this.dur = e.dur, this.ttl = this.dur), this.dur *= this.parent.options.global.scale, this.ttl *= this.parent.options.global.scale, e.hasOwnProperty("text") && (this.text = e.text), e.hasOwnProperty("motion")) {
			/** @type {Array} */
			this._motionStart = [];
			/** @type {Array} */
			this._motionEnd = [];
			this.motion = e.motion;
			/** @type {number} */
			var copies = 0;
			/** @type {number} */
			var n = 0;
			for (;n < e.motion.length;n++) {
				this._motionStart.push(copies);
				/** @type {number} */
				var newDuration = 0;
				var k;
				for (k in e.motion[n]) {
					var o = e.motion[n][k];
					/** @type {number} */
					newDuration = Math.max(o.dur, newDuration);
					if (null === o.easing || void 0 === o.easing) {
						/** @type {function (number, number, number, number): ?} */
						e.motion[n][k].easing = init.LINEAR;
					}
				}
				copies += newDuration;
				this._motionEnd.push(copies);
			}
			/** @type {number} */
			this._curMotion = 0;
		}
		if (e.hasOwnProperty("color")) {
			this._color = e.color;
		}
		if (e.hasOwnProperty("size")) {
			this._size = e.size;
		}
		if (e.hasOwnProperty("border")) {
			this._border = e.border;
		}
		if (e.hasOwnProperty("opacity")) {
			this._alpha = e.opacity;
		}
		if (e.hasOwnProperty("alpha")) {
			this._alphaMotion = e.alpha;
		}
		if (e.hasOwnProperty("font")) {
			this._font = e.font;
		}
		if (e.hasOwnProperty("x")) {
			this._x = e.x;
		}
		if (e.hasOwnProperty("y")) {
			this._y = e.y;
		}
		if (e.hasOwnProperty("shadow")) {
			this._shadow = e.shadow;
		}
		if (e.hasOwnProperty("position")) {
			if ("relative" === e.position) {
				/** @type {boolean} */
				this.absolute = false;
				if (this.mode < 7) {
					console.warn("Using relative position for CSA comment.");
				}
			}
		}
	}
	return init.prototype.init = function(e) {
		if ("undefined" == typeof e) {
			/** @type {null} */
			e = null;
		}
		this.dom = null !== e ? e.dom : document.createElement("div");
		this.dom.className = this.parent.options.global.className;
		this.dom.appendChild(document.createTextNode(this.text));
		this.dom.textContent = this.text;
		this.dom.innerText = this.text;
		this.size = this._size;
		if (16777215 != this._color) {
			this.color = this._color;
		}
		this.shadow = this._shadow;
		if (this._border) {
			this.border = this._border;
		}
		if ("" !== this._font) {
			this.font = this._font;
		}
		if (void 0 !== this._x) {
			this.x = this._x;
		}
		if (void 0 !== this._y) {
			this.y = this._y;
		}
		if (1 !== this._alpha || this.parent.options.global.opacity < 1) {
			this.alpha = this._alpha;
		}
		if (this.motion.length > 0) {
			this.animate();
		}
	}, Object.defineProperty(init.prototype, "x", {
		/**
		 * @return {?}
		 */
		get : function() {
			return(null === this._x || void 0 === this._x) && (this._x = this.align % 2 === 0 ? this.dom.offsetLeft : this.parent.width - this.dom.offsetLeft - this.width), this.absolute ? this._x : this._x / this.parent.width;
		},
		/**
		 * @param {number} x
		 * @return {undefined}
		 */
		set : function(x) {
			/** @type {number} */
			this._x = x;
			if (!this.absolute) {
				this._x *= this.parent.width;
			}
			if (this.align % 2 === 0) {
				/** @type {string} */
				this.dom.style.left = this._x + "px";
			} else {
				/** @type {string} */
				this.dom.style.right = this._x + "px";
			}
		},
		enumerable : true,
		configurable : true
	}), Object.defineProperty(init.prototype, "y", {
		/**
		 * @return {?}
		 */
		get : function() {
			return(null === this._y || void 0 === this._y) && (this._y = this.align < 2 ? this.dom.offsetTop : this.parent.height - this.dom.offsetTop - this.height), this.absolute ? this._y : this._y / this.parent.height;
		},
		/**
		 * @param {number} y
		 * @return {undefined}
		 */
		set : function(y) {
			/** @type {number} */
			this._y = y;
			if (!this.absolute) {
				this._y *= this.parent.height;
			}
			if (this.align < 2) {
				/** @type {string} */
				this.dom.style.top = this._y + "px";
			} else {
				/** @type {string} */
				this.dom.style.bottom = this._y + "px";
			}
		},
		enumerable : true,
		configurable : true
	}), Object.defineProperty(init.prototype, "bottom", {
		/**
		 * @return {?}
		 */
		get : function() {
			return this.y + this.height;
		},
		enumerable : true,
		configurable : true
	}), Object.defineProperty(init.prototype, "right", {
		/**
		 * @return {?}
		 */
		get : function() {
			return this.x + this.width;
		},
		enumerable : true,
		configurable : true
	}), Object.defineProperty(init.prototype, "width", {
		/**
		 * @return {?}
		 */
		get : function() {
			return(null === this._width || void 0 === this._width) && (this._width = this.dom.offsetWidth), this._width;
		},
		/**
		 * @param {?} value
		 * @return {undefined}
		 */
		set : function(value) {
			this._width = value;
			/** @type {string} */
			this.dom.style.width = this._width + "px";
		},
		enumerable : true,
		configurable : true
	}), Object.defineProperty(init.prototype, "height", {
		/**
		 * @return {?}
		 */
		get : function() {
			return(null === this._height || void 0 === this._height) && (this._height = this.dom.offsetHeight), this._height;
		},
		/**
		 * @param {number} height
		 * @return {undefined}
		 */
		set : function(height) {
			/** @type {number} */
			this._height = height;
			/** @type {string} */
			this.dom.style.height = this._height + "px";
		},
		enumerable : true,
		configurable : true
	}), Object.defineProperty(init.prototype, "size", {
		/**
		 * @return {?}
		 */
		get : function() {
			return this._size;
		},
		/**
		 * @param {number} n
		 * @return {undefined}
		 */
		set : function(n) {
			/** @type {number} */
			this._size = n;
			/** @type {string} */
			this.dom.style.fontSize = this._size + "px";
		},
		enumerable : true,
		configurable : true
	}), Object.defineProperty(init.prototype, "color", {
		/**
		 * @return {?}
		 */
		get : function() {
			return this._color;
		},
		/**
		 * @param {number} color
		 * @return {undefined}
		 */
		set : function(color) {
			/** @type {number} */
			this._color = color;
			var lt = color.toString(16);
			lt = lt.length >= 6 ? lt : (new Array(6 - lt.length + 1)).join("0") + lt;
			/** @type {string} */
			this.dom.style.color = "#" + lt;
			if (0 === this._color) {
				/** @type {string} */
				this.dom.className = this.parent.options.global.className + " rshadow";
			}
		},
		enumerable : true,
		configurable : true
	}), Object.defineProperty(init.prototype, "alpha", {
		/**
		 * @return {?}
		 */
		get : function() {
			return this._alpha;
		},
		/**
		 * @param {number} value
		 * @return {undefined}
		 */
		set : function(value) {
			/** @type {number} */
			this._alpha = value;
			/** @type {string} */
			this.dom.style.opacity = Math.min(this._alpha, this.parent.options.global.opacity) + "";
		},
		enumerable : true,
		configurable : true
	}), Object.defineProperty(init.prototype, "border", {
		/**
		 * @return {?}
		 */
		get : function() {
			return this._border;
		},
		/**
		 * @param {string} mL
		 * @return {undefined}
		 */
		set : function(mL) {
			/** @type {string} */
			this._border = mL;
			/** @type {string} */
			this.dom.style.border = this._border ? "1px solid #00ffff" : "none";
		},
		enumerable : true,
		configurable : true
	}), Object.defineProperty(init.prototype, "shadow", {
		/**
		 * @return {?}
		 */
		get : function() {
			return this._shadow;
		},
		/**
		 * @param {boolean} mL
		 * @return {undefined}
		 */
		set : function(mL) {
			/** @type {boolean} */
			this._shadow = mL;
			if (!this._shadow) {
				/** @type {string} */
				this.dom.className = this.parent.options.global.className + " noshadow";
			}
		},
		enumerable : true,
		configurable : true
	}), Object.defineProperty(init.prototype, "font", {
		/**
		 * @return {?}
		 */
		get : function() {
			return this._font;
		},
		/**
		 * @param {string} family
		 * @return {undefined}
		 */
		set : function(family) {
			/** @type {string} */
			this._font = family;
			this.dom.style.fontFamily = this._font.length > 0 ? this._font : "";
		},
		enumerable : true,
		configurable : true
	}), init.prototype.time = function(event) {
		this.ttl -= event;
		if (this.ttl < 0) {
			/** @type {number} */
			this.ttl = 0;
		}
		if (this.movable) {
			this.update();
		}
		if (this.ttl <= 0) {
			this.finish();
		}
	}, init.prototype.update = function() {
		this.animate();
	}, init.prototype.invalidate = function() {
		/** @type {null} */
		this._x = null;
		/** @type {null} */
		this._y = null;
		/** @type {null} */
		this._width = null;
		/** @type {null} */
		this._height = null;
	}, init.prototype._execMotion = function(af, mouseX) {
		console.log("_execMotion");
		var i;
		for (i in af) {
			if (af.hasOwnProperty(i)) {
				var o = af[i];
				this[i] = o.easing(Math.min(Math.max(mouseX - o.delay, 0), o.dur), o.from, o.to - o.from, o.dur);
			}
		}
	}, init.prototype.animate = function() {
		console.log("animate");
		if (this._alphaMotion && (this.alpha = (this.dur - this.ttl) * (this._alphaMotion.to - this._alphaMotion.from) / this.dur + this._alphaMotion.from), 0 !== this.motion.length) {
			/** @type {number} */
			var ttl = Math.max(this.ttl, 0);
			/** @type {number} */
			var canvasX = this.dur - ttl - this._motionStart[this._curMotion];
			return this._execMotion(this.motion[this._curMotion], canvasX), this.dur - ttl > this._motionEnd[this._curMotion] ? (this._curMotion++, void(this._curMotion >= this.motion.length && (this._curMotion = this.motion.length - 1))) : void 0;
		}
	}, init.prototype.finish = function() {
		this.parent.finish(this);
	}, init.prototype.toString = function() {
		return["[", this.stime, "|", this.ttl, "/", this.dur, "]", "(", this.mode, ")", this.text].join("");
	}, init.LINEAR = function(c, b, t, d) {
		return c * t / d + b;
	}, init;
}();
var ScrollComment = function(_super) {
	/**
	 * @param {?} options
	 * @param {?} easing
	 * @return {undefined}
	 */
	function Animation(options, easing) {
		_super.call(this, options, easing);
		this.dur *= this.parent.options.scroll.scale;
		this.ttl *= this.parent.options.scroll.scale;
	}
	return __extends(Animation, _super), Object.defineProperty(Animation.prototype, "alpha", {
		/**
		 * @param {?} value
		 * @return {undefined}
		 */
		set : function(value) {
			this._alpha = value;
			/** @type {string} */
			this.dom.style.opacity = Math.min(Math.min(this._alpha, this.parent.options.global.opacity), this.parent.options.scroll.opacity) + "";
		},
		enumerable : true,
		configurable : true
	}), Animation.prototype.init = function(factory) {
		if ("undefined" == typeof factory) {
			/** @type {null} */
			factory = null;
		}
		_super.prototype.init.call(this, factory);
		this.x = this.parent.width;
		if (this.parent.options.scroll.opacity < 1) {
			this.alpha = this._alpha;
		}
		/** @type {boolean} */
		this.absolute = true;
	}, Animation.prototype.update = function() {
		/** @type {number} */
		var reWidth = this.width >50 ? 50:this.width
		//var redur = this.width >50 ? this.dur * 50 / this.width : this.dur
		this.x = this.ttl / this.dur * (this.parent.width + reWidth) - reWidth;
	}, Animation;
}(CoreComment);
var CommentManager = function() {
	/**
	 * @param {Object} msg
	 * @return {undefined}
	 */
	function self(msg) {
		/** @type {number} */
		var interval = 0;
		this._listeners = {};
		/** @type {Object} */
		this.stage = msg;
		this.options = {
			global : {
				opacity : 1,
				scale : 1,
				className : "cmt"
			},
			scroll : {
				opacity : 1,
				scale : 1
			},
			limit : 0
		};
		/** @type {Array} */
		this.timeline = [];
		/** @type {Array} */
		this.runline = [];
		/** @type {number} */
		this.position = 0;
		/** @type {number} */
		this.limiter = 0;
		/** @type {null} */
		this.filter = null;
		this.csa = {
			scroll : new CommentSpaceAllocator(0, 0),
			top : new AnchorCommentSpaceAllocator(0, 0),
			bottom : new AnchorCommentSpaceAllocator(0, 0),
			reverse : new CommentSpaceAllocator(0, 0),
			scrollbtm : new CommentSpaceAllocator(0, 0)
		};
		this.width = this.stage.offsetWidth;
		this.height = this.stage.offsetHeight;
		/**
		 * @return {undefined}
		 */
		this.startTimer = function() {
			if (!(interval > 0)) {
				/** @type {number} */
				var clientLeft = (new Date).getTime();
				var _this = this;
				/** @type {number} */
				interval = window.setInterval(function() {
					/** @type {number} */
					var left = (new Date).getTime() - clientLeft;
					/** @type {number} */
					clientLeft = (new Date).getTime();
					_this.onTimerEvent(left, _this);
				}, 10);
			}
		};
		/**
		 * @return {undefined}
		 */
		this.stopTimer = function() {
			window.clearInterval(interval);
			/** @type {number} */
			interval = 0;
		};
	}
	/**
	 * @param {number} d
	 * @param {number} target
	 * @return {?}
	 */
	var start = function(d, target) {
		/** @type {number} */
		var base = Math.PI / 180;
		/** @type {number} */
		var radians = d * base;
		/** @type {number} */
		var radian = target * base;
		/** @type {function (*): number} */
		var cos = Math.cos;
		/** @type {function (*): number} */
		var sin = Math.sin;
		/** @type {Array} */
		var intersection = [cos(radians) * cos(radian), cos(radians) * sin(radian), sin(radians), 0, -sin(radian), cos(radian), 0, 0, -sin(radians) * cos(radian), -sin(radians) * sin(radian), cos(radians), 0, 0, 0, 0, 1];
		/** @type {number} */
		var i = 0;
		for (;i < intersection.length;i++) {
			if (Math.abs(intersection[i]) < 1E-6) {
				/** @type {number} */
				intersection[i] = 0;
			}
		}
		return "matrix3d(" + intersection.join(",") + ")";
	};
	return self.prototype.stop = function() {
		this.stopTimer();
	}, self.prototype.start = function() {
		this.startTimer();
	}, self.prototype.seek = function(m) {
		this.position = BinArray.bsearch(this.timeline, m, function(x, axisx) {
			return x < axisx.stime ? -1 : x > axisx.stime ? 1 : 0;
		});
	}, self.prototype.validate = function(val) {
		return null == val ? false : this.filter.doValidate(val);
	}, self.prototype.load = function(t) {
		/** @type {Array} */
		this.timeline = t;
		this.timeline.sort(function(a, b) {
			return a.stime > b.stime ? 2 : a.stime < b.stime ? -2 : a.date > b.date ? 1 : a.date < b.date ? -1 : null != a.dbid && null != b.dbid ? a.dbid > b.dbid ? 1 : a.dbid < b.dbid ? -1 : 0 : 0;
		});
		this.dispatchEvent("load");
	}, self.prototype.insert = function(obj) {
		var i = BinArray.binsert(this.timeline, obj, function(a, b) {
			return a.stime > b.stime ? 2 : a.stime < b.stime ? -2 : a.date > b.date ? 1 : a.date < b.date ? -1 : null != a.dbid && null != b.dbid ? a.dbid > b.dbid ? 1 : a.dbid < b.dbid ? -1 : 0 : 0;
		});
		if (i <= this.position) {
			this.position++;
		}
		this.dispatchEvent("insert");
	}, self.prototype.clear = function() {
		for (;this.runline.length > 0;) {
			this.runline[0].finish();
		}
		this.dispatchEvent("clear");
	}, self.prototype.setBounds = function() {
		this.width = this.stage.offsetWidth;
		this.height = this.stage.offsetHeight;
		this.dispatchEvent("resize");
		var i;
		for (i in this.csa) {
			this.csa[i].setBounds(this.width, this.height);
		}
		/** @type {string} */
		this.stage.style.perspective = this.width * Math.tan(40 * Math.PI / 180) / 2 + "px";
		/** @type {string} */
		this.stage.style.webkitPerspective = this.width * Math.tan(40 * Math.PI / 180) / 2 + "px";
	}, self.prototype.init = function() {
		this.setBounds();
		if (null == this.filter) {
			this.filter = new CommentFilter;
		}
	}, self.prototype.time = function(n) {
		if (n -= 1, this.position >= this.timeline.length || Math.abs(this.lastPos - n) >= 2E3) {
			if (this.seek(n), this.lastPos = n, this.timeline.length <= this.position) {
				return;
			}
		} else {
			/** @type {number} */
			this.lastPos = n;
		}
		for (;this.position < this.timeline.length && (!(this.options.limit > 0 && this.runline.length > this.limiter) && (this.validate(this.timeline[this.position]) && this.timeline[this.position].stime <= n));this.position++) {
			this.send(this.timeline[this.position]);
		}
	}, self.prototype.rescale = function() {
	}, self.prototype.send = function(data) {
		if (8 === data.mode) {
			return console.log(data), void(this.scripting && console.log(this.scripting.eval(data.code)));
		}
		if (null == this.filter || (data = this.filter.doModify(data), null != data)) {
			if (1 === data.mode || (2 === data.mode || 6 === data.mode)) {
				var obj = new ScrollComment(this, data)
			} else {
				obj = new CoreComment(this, data);
			}
			switch(obj.mode) {
				case 1:
					/** @type {number} */
					obj.align = 0;
					break;
				case 2:
					/** @type {number} */
					obj.align = 2;
					break;
				case 4:
					/** @type {number} */
					obj.align = 2;
					break;
				case 5:
					/** @type {number} */
					obj.align = 0;
					break;
				case 6:
					/** @type {number} */
					obj.align = 1;
			}
			switch(obj.init(), this.stage.appendChild(obj.dom), obj.mode) {
				default:
					;
				case 1:
					this.csa.scroll.add(obj);
					break;
				case 2:
					this.csa.scrollbtm.add(obj);
					break;
				case 4:
					this.csa.bottom.add(obj);
					break;
				case 5:
					this.csa.top.add(obj);
					break;
				case 6:
					this.csa.reverse.add(obj);
					break;
				case 17:
					;
				case 7:
					if (0 !== data.rY || 0 !== data.rZ) {
						obj.dom.style.transform = start(data.rY, data.rZ);
						obj.dom.style.webkitTransform = start(data.rY, data.rZ);
						obj.dom.style.OTransform = start(data.rY, data.rZ);
						obj.dom.style.MozTransform = start(data.rY, data.rZ);
						obj.dom.style.MSTransform = start(data.rY, data.rZ);
					}
					;
			}
			obj.y = obj.y;
			this.dispatchEvent("enterComment", obj);
			this.runline.push(obj);
		}
	}, self.prototype.sendComment = function(value) {
		console.log("CommentManager.sendComment is deprecated. Please use send instead");
		this.send(value);
	}, self.prototype.finish = function(e) {
		this.dispatchEvent("exitComment", e);
		this.stage.removeChild(e.dom);
		var index = this.runline.indexOf(e);
		switch(index >= 0 && this.runline.splice(index, 1), e.mode) {
			default:
				;
			case 1:
				this.csa.scroll.remove(e);
				break;
			case 2:
				this.csa.scrollbtm.remove(e);
				break;
			case 4:
				this.csa.bottom.remove(e);
				break;
			case 5:
				this.csa.top.remove(e);
				break;
			case 6:
				this.csa.reverse.remove(e);
				break;
			case 7:
				;
		}
	}, self.prototype.addEventListener = function(type, listener) {
		if ("undefined" != typeof this._listeners[type]) {
			this._listeners[type].push(listener);
		} else {
			/** @type {Array} */
			this._listeners[type] = [listener];
		}
	}, self.prototype.dispatchEvent = function(type, e) {
		if ("undefined" != typeof this._listeners[type]) {
			/** @type {number} */
			var i = 0;
			for (;i < this._listeners[type].length;i++) {
				try {
					this._listeners[type][i](e);
				} catch (err) {
					console.err(err.stack);
				}
			}
		}
	}, self.prototype.onTimerEvent = function(v, res) {
		/** @type {number} */
		var h = 0;
		for (;h < res.runline.length;h++) {
			var data = res.runline[h];
			if (!data.hold) {
				data.time(v);
			}
		}
	}, self;
}();
