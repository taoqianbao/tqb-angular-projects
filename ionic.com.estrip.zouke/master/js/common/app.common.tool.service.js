
angular.module("app.common.tool.service", []).factory("cacheLocal", ["CacheFactory", function(e) {
	return {
		product: e("cacheProduct", {
			maxAge: 9e5,
			cacheFlushInterval: 9e5,
			deleteOnExpire: "aggressive",
			storageMode: "localStorage",
			storagePrefix: "product"
		}),
		system: e("cacheSystem", {
			deleteOnExpire: "aggressive",
			storageMode: "localStorage",
			storagePrefix: "system"
		})
	}
}]).factory("permission", ["$rootScope", "$timeout", "CONFIG", "$cordovaGeolocation", "$cordovaPush", "$ionicPopup", "resVersion", "cacheLocal", function(e, t, o, i, n, a, r, s) {
	return {
		getPosition: function() {
			window.cordova && i.getCurrentPosition({
				enableHighAccuracy: !0,
				maximumAge: 12e4,
				timeout: 5e3
			}).then(function(e) {
				o.latitude = e.coords.latitude, o.longitude = e.coords.longitude
			}, function() {})
		},
		registerPush: function() {
			if (window.cordova) {
				var i = e.user.isIOS ? o.pushConfig.ios : o.pushConfig.android;
				n.register(i).then(function(e) {
					o.uuid = e, s.system.put("deviceToken", o.uuid), t(function() {
						r.check({}, function() {})
					}, 2e3)
				}, function() {
					o.uuid = s.system.get("deviceToken") || "", t(function() {
						r.check({}, function() {})
					}, 2e3)
				})
			}
		},
		prompt: function() {
			o.permission = e.user.isAndroid ? !0 : s.system.get("permission");
			var n = this,
				r = function() {
					t(function() {
						a.alert({
							title: "欧优游希望获取推送消息权限",
							templateUrl: "app/common/templates/permissionPushPop.html",
							okText: "知道了"
						}).then(function() {
							n.registerPush()
						}), n.getPosition()
					}, 1500)
				};
			o.permission ? (n.getPosition(), n.registerPush()) : (s.system.put("permission", !0), a.alert({
				title: "欧优游希望获取定位权限",
				templateUrl: "app/common/templates/permissionLocationPop.html",
				okText: "知道了"
			}).then(function() {
				i.getCurrentPosition({
					enableHighAccuracy: !0,
					maximumAge: 12e4,
					timeout: 2e3
				}).then(function() {
					r()
				}, function() {
					r()
				})
			}))
		}
	}
}]).factory("utils", function() {
	return {
		minutesToHour: function(e) {
			var t = Math.floor(e / 60);
			return t + "时" + (e - 60 * t) + "分"
		},
		timeDiff: function(e, t) {
			var o = e.split(":"),
				i = t.split(":");
			e = 60 * parseInt(o[0]) + parseInt(o[1]), t = 60 * parseInt(i[0]) + parseInt(i[1]);
			var n = 0;
			return t > e ? (n = t - e, this.minutesToHour(n)) : (n = 1440 - e + t, this.minutesToHour(n))
		},
		calcDegree: function(e) {
			return e * Math.PI / 180
		},
		calcDistance: function(e, t) {
			var o = 6378137,
				i = this.calcDegree(e[0]),
				n = this.calcDegree(e[1]),
				a = this.calcDegree(t[0]),
				r = this.calcDegree(t[1]),
				s = Math.sin(i) * Math.sin(a);
			return s += Math.cos(i) * Math.cos(a) * Math.cos(n - r), s = parseInt(Math.acos(s) * o / 1e3)
		},
		isEmpty: function(e) {
			return "" == e || null == e || void 0 == e
		},
		arrayMinus: function(e, t) {
			for (var o = [], i = [], n = 0; n < t.length; n++) o[t[n]] = !0;
			for (var n = 0; n < e.length; n++) o[e[n]] || i.push(e[n]);
			return i
		}
	}
}).factory("authFactory", ["$rootScope", "resUser", "PERMISSIONS", "cacheLocal", function(e, t, o, i) {
	return {
		authorize: function() {
			return e.user.isSigned
		},
		loadUser: function(o) {
			return 1 == o ? t.getOwnInfo({
				loginclient: "app",
				silence: !0
			}).$promise.then(function(t) {
				0 == t.data.code && (e.user.info = t.data, e.user.isSigned = 1 == t.data.is_login)
			}) : t.getOwnInfo({
				loginclient: "app"
			}).$promise.then(function(t) {
				0 == t.data.code && (e.user.info = t.data, e.user.isSigned = 1 == t.data.is_login)
			})
		},
		signIn: function(t, o) {
			return o = o || angular.noop, i.system.put("SESSIONID", t), e.user.token = t, window.cordova && e.user.isAndroid && navigator.chat.login({
				token: t
			}, function() {}, function() {}), this.loadUser().then(o)
		},
		signOut: function(o) {
			return o = o || angular.noop, i.system.put("SESSIONID", ""), t.logout({}, function(t) {
				0 == t.data.code && (e.user.info = {}, e.user.isSigned = !1, e.user.token = "", o())
			})
		}
	}
}]).factory("genPy", function() {
	return function(e) {
		if (void 0 == e) return "";
		e = e.trim(), e = e.replace(/\s/g, "");
		var t = pinyin(e);
		return t = t.toString().replace(/,/, " "), t = t.toString().replace(/,/g, ""), t = t.replace(/\b\w+\b/g, function(e) {
			return e.substring(0, 1).toUpperCase() + e.substring(1)
		})
	}
}).factory("JSON_stringify", function() {
	return function(e, t) {
		var o = JSON.stringify(e);
		return t ? o : o.replace(/[\u007f-\uffff]/g, function(e) {
			return "\\u" + ("0000" + e.charCodeAt(0).toString(16)).slice(-4)
		})
	}
}).factory("processContent", function() {
	return function(e, t) {
		"undefined" == typeof t && (t = "-appmaxwid");
		var o = new RegExp('src="(.*?)"');
		return e.replace(o, 'src="$1' + t + '"')
	}
}).service("angularLoadDynamic", ["$document", "$q", "$timeout", function(e, t, o) {
	function i(e) {
		var i = {};
		return function(n) {
			if ("undefined" == typeof i[n]) {
				var a = t.defer(),
					r = e(n);
				r.onload = r.onreadystatechange = function(e) {
					o(function() {
						a.resolve(e)
					})
				}, r.onerror = function(e) {
					o(function() {
						a.reject(e)
					})
				}, i[n] = a.promise
			}
			return i[n]
		}
	}
	document.write = function(e) {
		var t = document.createElement("div");
		t.innerHTML = e;
		for (var o = t.querySelectorAll("script"), i = 0; i < o.length; ++i) {
			var n = document.createElement("script");
			n.src = o[i].src, document.body.appendChild(n)
		}
	}, this.loadScript = i(function(t) {
		var o = e[0].createElement("script");
		return o.src = t, e[0].body.appendChild(o), o
	}), this.loadCSS = i(function(t) {
		var o = e[0].createElement("link");
		return o.rel = "stylesheet", o.type = "text/css", o.href = t, e[0].head.appendChild(o), o
	})
}]).service("angularLoad", ["$document", "$q", "$timeout", function(e) {
	return document.write = function(e) {
		var t = document.createElement("div");
		t.innerHTML = e;
		for (var o = t.querySelectorAll("script"), i = 0; i < o.length; ++i) {
			var n = document.createElement("script");
			n.src = o[i].src, document.body.appendChild(n)
		}
	}, {
		loadScript: function(t) {
			var o = e[0].createElement("script");
			o.type = "text/javascript", o.src = t, e[0].body.appendChild(o)
		}
	}
}]).factory("JAlert", ["$rootScope", "$document", "$ionicPopup", "$ionicBackdrop", "$timeout", "statusBar", "$cordovaToast", "$cordovaDialogs", function(e, t, o, i, n, a, r, s) {
	var c = document.createElement("div"),
		l = document.createElement("div");
	c.appendChild(l), c.classList.add("flex"), c.classList.add("JAlert"), document.body.appendChild(c);
	var d = 0,
		u = {
			notify: function(o) {
				if (e.user.isIOS) {
					var i = t[0].body.querySelector("notification");
					i.innerHTML = o, window.cordova && a.hide(), i.classList.add("active"), n(function() {
						i.classList.remove("active"), n(function() {
							window.cordova && a.show()
						}, 500)
					}, 2500)
				} else this.showOnce(o)
			},
			showOnce: function(e) {
				window.cordova ? r.showShortCenter(e) : console.log("%c JAlert.showOnce:" + e, "font-size:18px;font-weight:bold;color:blue;")
			},
			show: function(e, t) {
				0 === d && (c.classList.add("active"), c.style.zIndex = 100), l.innerHTML = e, t && 0 !== d || ++d
			},
			alert: function(e) {
				window.cordova ? s.alert(e, "提示", "确定") : window.alert(e)
			},
			isShown: function() {
				return !1
			},
			hide: function() {
				0 !== d && (1 === d && (c.classList.remove("active"), n(function() {
					c.style.zIndex = ""
				}, 200)), --d)
			},
			confirm: function(e, t, o) {
				if (window.cordova) {
					var i = "提示";
					angular.isString(e) || (i = e.title || i, e = e.text), s.confirm(e, i, ["确定", "取消"]).then(function(e) {
						switch (e) {
							case 0:
								o();
								break;
							case 1:
								t();
								break;
							case 2:
								o()
						}
					})
				} else window.confirm(e) ? t() : o()
			},
			prompt: function(e, t, o) {
				if (window.cordova) s.prompt(e.message, e.title || "输入", ["确定", "取消"], e.defaultText).then(function(e) {
					switch (e.buttonIndex) {
						case 1:
							t && t(e.input1);
							break;
						case 2:
						default:
							o && o()
					}
					console.log(e.buttonIndex)
				});
				else {
					var i = window.prompt(e.message, e.defaultText);
					null === i ? o && o() : t && t(i)
				}
			}
		};
	return window.JAlert = u, window.JAlert
}]).factory("uuidBuilder", function() {
	var e = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz".split("");
	return {
		create: function(t, o) {
			var i, n = e,
				a = [];
			if (o = o || n.length, t)
				for (i = 0; t > i; i++) a[i] = n[0 | Math.random() * o];
			else {
				var r;
				for (a[8] = a[13] = a[18] = a[23] = "-", a[14] = "4", i = 0; 36 > i; i++) a[i] || (r = 0 | 16 * Math.random(), a[i] = n[19 == i ? 3 & r | 8 : r])
			}
			return a.join("")
		},
		createFast: function() {
			for (var t, o = e, i = new Array(36), n = 0, a = 0; 36 > a; a++) 8 == a || 13 == a || 18 == a || 23 == a ? i[a] = "-" : 14 == a ? i[a] = "4" : (2 >= n && (n = 33554432 + 16777216 * Math.random() | 0), t = 15 & n, n >>= 4, i[a] = o[19 == a ? 3 & t | 8 : t]);
			return i.join("")
		},
		createCompact: function() {
			return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(e) {
				var t = 16 * Math.random() | 0,
					o = "x" == e ? t : 3 & t | 8;
				return o.toString(16)
			})
		}
	}
}).factory("viewArgument", ["uuidBuilder", "$timeout", "$stateParams", function(e, t, o) {
	function i(e) {
		n.hasOwnProperty(e) && delete n[e]
	}
	var n = {},
		a = "";
	return {
		put: function(r, s) {
			s = s || 5e3;
			var c;
			return r.__uuid ? c = r.__uuid : r.__uuid = c = o.uuid ? o.uuid : e.createFast(), r.__timer && t.cancel(r.__timer), r.__timer = t(function() {
				i(c)
			}, s), n[c] = r, a = c, c
		},
		get: function(e) {
			e = e || a;
			var o = n[e];
			return o && o.__timer && t.cancel(o.__timer), i(e), o
		},
		parseKey: function(e) {
			return e.__uuid ? e.__uuid : o.uuid ? o.uuid : null
		},
		setKey: function(e, t) {
			e.__uuid = t
		}
	}
}]).factory("currentScope", ["$rootScope", "$q", function(e, t) {
	function o(e, t) {
		if (!e || !t) return !1;
		do
			if (e === t) return !0;
		while (t = t.$parent);
		return !1
	}
	var i = null;
	return {
		__set: function(e) {
			i = e
		},
		get: function() {
			return i || angular.element(this.activeView()).scope()
		},
		activeView: function() {
			var e = document.querySelectorAll("[nav-view='active']");
			return e[e.length - 1]
		},
		stageView: function() {
			return document.querySelector("[nav-view='stage']")
		},
		activeModal: function() {
			return document.querySelector(".modal.active")
		},
		ready: function(e, n) {
			var a = t.defer();
			if (o(i, e)) a.resolve();
			else var r = e.$on("currentScope.change", function() {
				o(i, e) && (r(), a.resolve(), e = null, r = null, a = null)
			});
			return a.promise.then(n || angular.noop)
		}
	}
}]).factory("viewElement", ["$rootScope", "$ionicHistory", function(e, t) {
	function o() {
		return document.querySelector("ion-view[nav-view='stage']")
	}

	function i() {
		return document.querySelector("ion-view[nav-view='active']")
	}

	function n() {
		return document.querySelector("ion-view[nav-view='entering']")
	}

	function a(e) {
		return document.querySelector("ion-view[view-id='" + e + "']")
	}

	function r(e, t) {
		return e || (t = "body>" + t, e = document), e.querySelector(t)
	}

	function s(e) {
		return r(e, "ion-nav-bar [nav-bar='active']")
	}

	function c(e) {
		return r(e, "ion-nav-bar [nav-bar='cached']")
	}

	function l(e) {
		return r(e, "ion-nav-bar [nav-bar='stage']")
	}

	function d(e) {
		return r(e, "ion-nav-bar [nav-bar='entering']")
	}

	function u(e) {
		return r(e, "ion-nav-bar [nav-bar='leaving']")
	}
	e.$on("$ionicView.enter", function(e, t) {
		t.viewId && "back" !== t.direction && (n() || i()).setAttribute("view-id", t.viewId)
	});
	var p = 0;
	return e.$on("$ionicView.beforeEnter", function() {
		p = 2
	}), e.$on("$ionicView.enter", function() {
		p = 3
	}), e.$on("$stateChangeSuccess", function() {
		0 !== p && (p = 1)
	}), {
		getById: function(e) {
			var i = a(e);
			return i ? i : t.currentView().viewId === e ? o() : null
		},
		current: function() {
			return a(t.currentView().viewId) || o() || n()
		},
		back: function() {
			return a(t.backView().viewId)
		},
		currentNavBar: function(e) {
			switch (p) {
				case 1:
					return c(e);
				default:
					return l(e) || d(e) || s(e)
			}
		},
		backNavBar: function(e) {
			switch (p) {
				case 0:
					return null;
				case 1:
				case 2:
					return s(e);
				default:
					return u(e) || c(e)
			}
		}
	}
}]).run(["$rootScope", "currentScope", "viewElement", "tip", function(e, t) {
	e.$on("$ionicView.beforeEnter", function(o) {
		t.__set(o.targetScope), e.$broadcast("currentScope.change")
	})
}]).factory("EventDispatcher", function() {
	function e() {
		this._EventDispatcher_event = {}, this._EventDispatcher_EObjectFilter = [], this._EventDispatcher_bind = {
			length: 0
		}
	}
	var t = [];
	return e.__wkh_private_className = "util.EventDispatcher", e.prototype = {
		constructor: e,
		className: e.__wkh_private_className,
		addEventListener: function(e, t) {
			this._EventDispatcher_event[e] ? -1 === this._EventDispatcher_event[e].contains(t) && this._EventDispatcher_event[e].push(t) : this._EventDispatcher_event[e] = [t]
		},
		removeEventListener: function(e, t) {
			var o = this._EventDispatcher_event[e];
			o && o.length > 0 && this._EventDispatcher_event[e].remove(t)
		},
		dispatchEvent: function(e, t) {
			var o;
			if ((o = this._EventDispatcher_EObjectFilter.length) > 0)
				for (var i = 0; o > i; ++i) e = this._EventDispatcher_EObjectFilter[i](e) || e;
			t = t || this._EventDispatcher_bind[e.type] || this;
			var n = !0,
				a = this._EventDispatcher_event[e.type];
			if (a && (o = a.length) > 0)
				for (var i = 0; o > i; ++i) a[i].call(t, e) === !1 && (n = !1);
			return n
		},
		hasRegisterListener: function(e) {
			var t = this._EventDispatcher_event[e];
			return t && t.length > 0
		},
		addEObjectFilter: function(e) {
			this._EventDispatcher_EObjectFilter.push(e)
		},
		bind: function(e, o) {
			var i = this._EventDispatcher_bind;
			if (o) {
				if (o === this) return;
				0 === i.length && t.push(this), i[e] || ++i.length, this._EventDispatcher_bind[e] = o
			} else this.clearBind(e)
		},
		clearBind: function(e) {
			if (e) {
				var o = this._EventDispatcher_bind;
				o[e] && (delete this._EventDispatcher_bind[e], --o.length), 0 === o.length && t.splice(t.indexOf(this), 1)
			} else 0 !== this._EventDispatcher_bind.length && (this._EventDispatcher_bind = {
				length: 0
			}, t.splice(t.indexOf(this), 1))
		}
	}, window.addEventListener("unload", function() {
		for (var e = t.length, o = 0; e > o; ++o) t[o].clearBind()
	}), e
}).factory("Ajax", ["EventDispatcher", function(e) {
	function t(e) {
		if (e) {
			var t = [];
			for (var o in e)
				if (e.hasOwnProperty(o) && "function" != typeof e[o]) {
					var i = e[o];
					if (o = encodeURIComponent(o).replace("%20", "+"), Array.isArray(i))
						for (var n = i.length, a = 0; n > a; ++a) t.push(o + "=" + encodeURIComponent(i[a].toString()).replace("%20", "+"));
					else i = encodeURIComponent(i.toString()).replace("%20", "+"), t.push(o + "=" + i)
				}
			return t.join("&")
		}
	}

	function o(e) {
		if (e) {
			var t = new FormData;
			for (var o in e)
				if (e.hasOwnProperty(o) && "function" != typeof e[o]) {
					var i = e[o];
					if (Array.isArray(i))
						for (var n = i.length, a = 0; n > a; ++a) t.append(o, i[a]);
					else t.append(o, i)
				}
			return t
		}
	}

	function i(e) {
		if (e) {
			var t = [];
			for (var o in e)
				if (e.hasOwnProperty(o) && "function" != typeof e[o]) {
					var i = e[o];
					if (o = o.replace(" ", "+"), Array.isArray(i))
						for (var n = i.length, a = 0; n > a; ++a) t.push(o + "=" + i[a].toString().replace(" ", "+"));
					else i = i.toString().replace(" ", "+"), t.push(o + "=" + i)
				}
			return t.join("&")
		}
	}

	function n(e, t) {
		if (t)
			for (var o in t)
				if (t.hasOwnProperty(o) && "function" != typeof t[o]) {
					var i = t[o];
					if (Array.isArray(i))
						for (var n = i.length, a = 0; n > a; ++a) e.setRequestHeader(o, i[a]);
					else e.setRequestHeader(o, i)
				}
	}

	function a(r, s, p) {
		e.call(this), f.push(this), s || (s = {}), s.data = s.data || {}, this.dispatchEvent({
			type: a.Event.CREATE,
			data: s.data
		});
		var y = void 0 == s.crossDomain ? g.crossDomain : s.crossDomain;
		this._Ajax_xhr = new XMLHttpRequest, this._Ajax_disposed = !1, this._Ajax_id = void 0 == p ? "" : p;
		var _ = s.method || g.method,
			v = s.enctype || g.enctype,
			w = void 0 == s.encode ? g.encode : s.encode;
		h.MULTIPARTFORMDATA === v && (_ = m.POST);
		var S = _ === m.GET ? void 0 == s.cache ? g.cache : s.cache : !1;
		if (this._Ajax_overrideType = s.overrideType || g.overrideType, this._Ajax_dataFilter = s.dataFilter, this._Ajax_data = s.data, !S) {
			var b = (new Date).getTime();
			this._Ajax_data = this._Ajax_data || {}, this._Ajax_data["token" + b] = b
		}
		if (this._Ajax_data && w) switch (v) {
			case h.URLENCODED:
				this._Ajax_data = t(this._Ajax_data);
				break;
			case h.MULTIPARTFORMDATA:
				this._Ajax_data = o(this._Ajax_data);
				break;
			case h.TEXT:
				this._Ajax_data = i(this._Ajax_data)
		}
		if (this._Ajax_data && _ === m.GET && (r += -1 === r.indexOf("?") ? "?" + this._Ajax_data : "&" + this._Ajax_data, this._Ajax_data = null), this._Ajax_ie8cross) this._Ajax_xhr.open(_._value, r), this._Ajax_xhr.onload = c, this._Ajax_data = t(this._Ajax_data);
		else {
			var k = void 0 == s.async ? g.async : s.async;
			this._Ajax_xhr.open(_._value, r, k, s.userName, s.password), y || this._Ajax_xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest"), v !== h.MULTIPARTFORMDATA && this._Ajax_xhr.setRequestHeader("content-type", v._value), n(this._Ajax_xhr, s.header), s.overrideType && (this._Ajax_xhr.overrideMimeType = s.overrideType), this._Ajax_xhr.onreadystatechange = u
		}
		var $ = s.timeout || g.timeout;
		0 !== $ && (this._Ajax_xhr.timeout = $, this._Ajax_xhr.ontimeout = l), this._Ajax_xhr.onerror = d
	}

	function r() {
		this._Ajax_disposed || (f.splice(f.indexOf(this), 1), this._Ajax_ie8cross ? this._Ajax_xhr.onload = null : this._Ajax_xhr.onreadystatechange = null, this._Ajax_xhr.ontimeout = null, this._Ajax_xhr = null, this._Ajax_disposed = !0)
	}

	function s(e, t, o, i) {
		if (e.hasRegisterListener(a.Event.SUCCESS)) {
			var n;
			e._Ajax_overrideType ? n = e._Ajax_overrideType.toLowerCase() : (n = t, n = n ? n.toLowerCase() : g.responseContentType.toLowerCase());
			var r, s;
			if (-1 !== n.indexOf("xml") || -1 !== n.indexOf("html"))
				if (r = o) s = a.ResponseType.XML;
				else {
					var c = document.createElement("div");
					for (c.innerHTML = i, r = document.createDocumentFragment(); c.firstChild;) r.appendChild(c.firstChild);
					s = a.ResponseType.FRAGMENT
				} else if ("application/json" === n || -1 !== n.indexOf("json"))
				if (s = a.ResponseType.JSON, i) try {
					r = JSON.parse(i)
				} catch (l) {
					return void e.dispatchEvent({
						type: a.Event.ERROR,
						xhr: e._Ajax_xhr,
						status: 200,
						statusText: "ok",
						errorType: a.ErrorType.JSONERROR
					})
				} else r = null;
				else s = a.ResponseType.TEXT, r = i;
			e._Ajax_dataFilter && (r = e._Ajax_dataFilter(r, s)), e.dispatchEvent({
				type: a.Event.SUCCESS,
				xhr: e._Ajax_xhr,
				status: 200,
				statusText: "ok",
				data: r,
				dataType: s,
				contentType: n
			})
		}
	}

	function c() {
		var e = p(this);
		s(e, this.contentType, void 0, this.responseText), r.call(e)
	}

	function l() {
		var e = p(this);
		e.dispatchEvent({
			type: a.Event.TIMEOUT,
			xhr: this
		}), r.call(e)
	}

	function d() {
		var e = p(this);
		e.dispatchEvent(e._Ajax_ie8cross ? {
			type: a.Event.ERROR,
			xhr: this,
			errorType: a.ErrorType.AJAXERROR
		} : {
			type: a.Event.ERROR,
			xhr: this,
			status: this.status,
			statusText: this.statusText,
			errorType: a.ErrorType.AJAXERROR
		}), r.call(e)
	}

	function u() {
		var e = p(this);
		e.dispatchEvent({
			type: a.Event.READYSTATECHANGE,
			xhr: this
		}), 4 === this.readyState && (e.dispatchEvent({
			type: a.Event.COMPLETE,
			xhr: this,
			status: this.status,
			statusText: this.statusText
		}), 0 === this.status || (200 === this.status ? s(e, this.getResponseHeader("content-type"), this.responseXML, this.responseText) : e.dispatchEvent({
			type: a.Event.ERROR,
			xhr: this,
			status: this.status,
			statusText: this.statusText,
			errorType: a.ErrorType.STATUSERROR
		}), r.call(e)))
	}

	function p(e) {
		for (var t = f.length, o = 0; t > o; ++o)
			if (f[o]._Ajax_xhr === e) return f[o];
		return null
	}
	var m = {
			POST: {
				_value: "POST"
			},
			GET: {
				_value: "GET"
			},
			OPTIONS: {
				_value: "OPTIONS"
			},
			HEAD: {
				_value: "HEAD"
			},
			PUG: {
				_value: "PUT"
			},
			DELETE: {
				_value: "DELETE"
			},
			TRACE: {
				_value: "TRACE"
			},
			CONNECT: {
				_value: "CONNECT"
			}
		},
		h = {
			URLENCODED: {
				_value: "application/x-www-form-urlencoded"
			},
			MULTIPARTFORMDATA: {
				_value: "multipart/form-data"
			},
			TEXT: {
				_value: "text/plain"
			}
		},
		g = {
			method: m.POST,
			async: !0,
			cache: !1,
			crossDomain: !1,
			enctype: h.URLENCODED,
			encode: !0,
			timeout: 0,
			overrideType: void 0,
			responseContentType: "Application/JSON"
		},
		f = [];
	a.__wkh_private_className = "util.Ajax", a.Event = {
		CREATE: "create",
		TIMEOUT: "timeout",
		BEFORESEND: "beforesend",
		ABORT: "abort",
		READYSTATECHANGE: "readystatechange",
		COMPLETE: "complete",
		ERROR: "error",
		SUCCESS: "success"
	}, a.ErrorType = {
		JSONERROR: new Object,
		AJAXERROR: new Object,
		STATUSERROR: new Object
	}, a.ResponseType = {
		XML: new Object,
		FRAGMENT: new Object,
		JSON: new Object,
		TEXT: new Object
	}, a.HttpMethod = m, a.HttpFormEnctype = h;
	var y = !0;
	return a.global = new e, a.global.dispatchEvent = function(t, o) {
		return y ? e.prototype.dispatchEvent.call(this, t, o) : !0
	}, a.enableGlobalEvent = function() {
		y = !0
	}, a.disableGlobalEvent = function() {
		y = !1
	}, a.setGlobalSetting = function(e) {
		if (2 === arguments.length) arguments[0] in g && (g[arguments[0]] = arguments[1]);
		else
			for (var t in e) t in g && (g[t] = e[t])
	}, a.prototype = Object.create(e.prototype), a.prototype.constructor = a, a.prototype.className = a.__wkh_private_className, a.prototype.send = function() {
		return this.dispatchEvent({
			type: a.Event.BEFORESEND,
			xhr: this._Ajax_xhr
		}) ? (this._Ajax_data ? this._Ajax_xhr.send(this._Ajax_data) : this._Ajax_xhr.send(), !0) : !1
	}, a.prototype.getXHR = function() {
		return this._Ajax_xhr
	}, a.prototype.usable = function() {
		return this._Ajax_disposed === !1
	}, a.prototype.abort = function() {
		this.usable() && (this._Ajax_disposed.abort(), this.dispatchEvent({
			type: a.Event.ABORT,
			xhr: this._Ajax_xhr
		}), r.call(this))
	}, a.prototype.getId = function() {
		return this._Ajax_id
	}, a.prototype.dispatchEvent = function(t, o) {
		var i = a.global.dispatchEvent(t, o || this);
		return e.prototype.dispatchEvent.call(this, t, o) && i
	}, window.addEventListener("unload", function() {
		for (var e = f.length, t = 0; e > t; ++t) r.call(f[t])
	}), a
}]).factory("random", function() {
	var e = function(e, t, o) {
			e = e || 0, t = t || 10, o = o !== !1;
			var i = t - e,
				n = Math.random();
			return o ? e + Math.floor(n * i) : e + n * i
		},
		t = function(t, o, i, n) {
			for (var a, r = []; r.length < t;) a = e(o, i, n), -1 === r.contains(a) && r.push(a);
			return r
		};
	return {
		getRandomNum: e,
		getRandomNumList: t
	}
}).factory("setBackViewHome", ["$rootScope", "$ionicHistory", "$ionicViewSwitcher", "viewElement", function(e, t, o, i) {
	function n(t) {
		for (var o = t.length - 1; o >= 0; --o)
			if (t[o].stateName === "app." + e._tab.tabActive + "Home" || "app.chatHome" === t[o].stateName) return o
	}
	return function() {
		var e = t.viewHistory().histories[t.currentView().historyId],
			a = n(e.stack) || 0,
			r = e.stack.splice(a + 1, e.cursor - a - 1);
		e.cursor = a + 1, e.stack[a + 1].backViewId = e.stack[a].viewId, e.stack[a].forwardViewId = e.stack[a + 1].viewId, t.backView(e.stack[a]);
		for (var s = 0, c = r.length; c > s; ++s) o.destroyViewEle(angular.element(i.getById(r[s].viewId)))
	}
}]).factory("statusBar", ["$rootScope", function(e) {
	function t() {
		console.log("android full screen trigger success", arguments)
	}

	function o() {
		console.log("android full screen trigger failed", arguments)
	}
	var i = 0,
		n = !1;
	return window.cordova && ionic.Platform.isAndroid() && window.AndroidFullScreen.isImmersiveModeSupported(function() {
		n = !0
	}, function() {
		n = !1
	}), {
		show: function() {
			i > 0 && --i, 0 === i && (e.user.isIOS ? ionic.Platform.showStatusBar(!0) : e.user.isAndroid && ionic.Platform.fullScreen(!1, !0))
		},
		hide: function() {
			0 === i && (e.user.isIOS ? ionic.Platform.showStatusBar(!1) : e.user.isAndroid && ionic.Platform.fullScreen(!0, !1)), ++i
		},
		fullScreen: function(i) {
			(window.cordova || !e.user.isIOS) && (i ? n ? window.AndroidFullScreen.immersiveMode(t, o) : window.AndroidFullScreen.leanMode(t, o) : window.AndroidFullScreen.showSystemUI(t, o))
		}
	}
}]).factory("RootScopeProxy", ["$rootScope", "viewElement", "$timeout", function(e) {
	function t(e) {
		i.cancelById(e.currentScope.$id)
	}

	function o(e) {
		var t = i.initScope(e);
		Object.defineProperty(this, "id", {
			get: function() {
				return t
			}
		})
	}
	var i = {
		initScope: function(e) {
			var o = e.$id;
			if (!this[o]) {
				var i = [];
				i.scope = e, i.push(e.$on("$destroy", t)), this[o] = i
			}
			return o
		},
		getListById: function(e) {
			return this[e] || []
		},
		cancelById: function(e) {
			var t = this[e];
			if (t) {
				for (var o = 0, i = t.length; i > o; ++o) t[o](), t[o] = null;
				t.scope && (t.scope = null, delete t.scope), delete this[e]
			}
		}
	};
	return o.prototype.$on = function() {
		i.getListById(this.id).push(e.$on.apply(e, arguments))
	}, o.prototype.$watch = function() {
		i.getListById(this.id).push(e.$watch.apply(e, arguments))
	}, o.prototype.$watchCollection = function() {
		i.getListById(this.id).push(e.$watchCollection.apply(e, arguments))
	}, o.prototype.$watchGroup = function() {
		i.getListById(this.id).push(e.$watchGroup.apply(e, arguments))
	}, o.prototype.setValue = function(t, o) {
		e[t] = o, i.getListById(this.id).push(function() {
			e[t] = null, delete e[t]
		})
	}, o
}]).factory("Recorder", ["$rootScope", "$timeout", function(e, t) {
	function o() {
		console.log("recorder:", "ok")
	}

	function i(e) {
		console.log("recorder:", e.code, e.message), this.stopRecord(), this.release(), JAlert.alert("没有录音权限\n请在「设置」->「隐私」->「麦克风」中打开")
	}

	function n() {
		console.log("play", "ok"), this._isPlaying = !1, e.$apply()
	}

	function a(e) {
		console.log("play:", e.code, e.message)
	}

	function r(t) {
		window.cordova && (t = t || "tmp" + (new Date).valueOf(), e.user.isIOS ? (this._recordPath = "cdv" + cordova.file.tempDirectory, this._playPath = cordova.file.tempDirectory.substring(7), this._readPath = cordova.file.tempDirectory, this._name = t + ".m4a") : (this._recordPath = this._playPath = this._readPath = cordova.file.externalCacheDirectory, this._name = t + ".mp3"), this._media = null, this._isRecording = !1, this._isPlaying = !1, this._time = 0, this._playTime = 0)
	}

	function s() {
		this._time = (new Date).valueOf() - this._start, this._t = t(arguments.callee.bind(this), 50)
	}
	var c = {
		numberOfLoops: 1,
		playAudioWhenScreenIsLocked: !1
	};
	return r.prototype.startRecord = function() {
		window.cordova && (this.release(), this._media = new Media(this._recordPath + this._name, o, i.bind(this)), this._media.startRecord(), this._start = (new Date).valueOf(), this._t = t(s.bind(this), 50), this._isRecording = !0)
	}, r.prototype.stopRecord = function() {
		this._media && this._isRecording && (this._media.stopRecord(), this._time = (new Date).valueOf() - this._start, t.cancel(this._t), delete this._start, delete this._t, this._isRecording = !1, this._media.release(), this._media = new Media(this._playPath + this._name, n.bind(this), a))
	}, r.prototype.release = function() {
		this._media && (this._isRecording && this.stopRecord(), this._isPlaying && this.stop(), this._media.release(), this._media = null)
	}, r.prototype.play = function() {
		this._media && !this._isPlaying && (this._isRecording && this.stopRecord(), e.user.isIOS ? this._media.play(c) : this._media.play(), this._isPlaying = !0, this._playTime = (new Date).valueOf())
	}, r.prototype.stop = function() {
		this._media && this._isPlaying && (this._media.stop(), this._isPlaying = !1)
	}, r.prototype.toggle = function() {
		this._isPlaying ? this.stop() : this.play()
	}, Object.defineProperty(r.prototype, "name", {
		get: function() {
			return this._name
		}
	}), Object.defineProperty(r.prototype, "path", {
		get: function() {
			return this._readPath
		}
	}), Object.defineProperty(r.prototype, "time", {
		get: function() {
			return this._time
		}
	}), Object.defineProperty(r.prototype, "isPlaying", {
		get: function() {
			return this._isPlaying
		}
	}), Object.defineProperty(r.prototype, "isRecording", {
		get: function() {
			return this._isRecording
		}
	}), Object.defineProperty(r.prototype, "hasRecordFile", {
		get: function() {
			return !!this._media
		}
	}), Object.defineProperty(r.prototype, "position", {
		get: function() {
			var e = 0;
			return this._playTime && (e = (new Date).valueOf() - this._playTime, e > this._time && (e = this._time)), e
		}
	}), r
}])