angular.module("app", ["ionic", "ngCordova", "ngMessages", "ngResource", "app.common", "app.base", "app.chat", "app.journey", "app.mall", "app.product", "app.user", "app.poi", "app.toolbox", "app.postcard", "app.map", "app.story", "ngIOS9UIWebViewPatch", "angular-cache", "ngMedia", "ion-affix"]).constant("CONFIG", {
	hostWWW: "http://m.ouutrip.com",
	hostImg: "http://cdn1.zouke.com",
	host: "http://api.ouutrip.com",
	versionFile: "http://cdn1.zouke.com/app/version.json?_=" + (new Date).getTime().toString(),
	httpCount: 0,
	guideShow: !1,
	version: "",
	uuid: "",
	deviceId: "",
	model: "",
	latitude: 0,
	longitude: 0,
	distance: 200,
	loadOnceNum: 10,
	devWidth: 0,
	devHeight: 0,
	imgSize: "-applist",
	imgSizeAct: "-appact",
	imgSizeCity: "-appcity",
	imgSizeTopic: "-apptopic",
	imgSizePd: "-apppd",
	imgSizeThumb: "-appthum",
	imgSizePost: "-apppost",
	imgSizePostFix: "-apppostfix",
	imgSizePostBig: "-apppostbig",
	imgSizeWeixin: "-weixin",
	imgFixWid: "-appfixwid",
	imgFixHeight: "-appfixheight",
	imgSizeCard: "",
	imgSizeCardThumb: "",
	hCard: "",
	hCardThumb: "",
	hImg: "",
	hAct: "",
	hImgTp: "",
	hImgPd: "",
	hThumb: "",
	hCity: "",
	permission: !1,
	pushConfig: {
		ios: {
			badge: !0,
			sound: !0,
			alert: !0
		},
		android: {}
	}
}).constant("PERMISSIONS", {
	needSignIn: "needSignIn"
}).constant("$ionicLoadingConfig", {
	template: '<ion-spinner icon="dots"></ion-spinner>',
	delay: 200
}).config(["$ionicConfigProvider", "$sceDelegateProvider", "$httpProvider", "CONFIG", function(e, t, o, i) {

	e.views.maxCache(6),
		e.views.swipeBackEnabled(!1),
		e.backButton.previousTitleText(!1).text(" "),
		e.navBar.alignTitle("center"),
		t.resourceUrlWhitelist(["self", "http://*.zouke.com/**", "http://*.ouutrip.com/**", "https://*.google.cn/**", "https://*.google.com/**", "http://*.gstatic.cn", "http://*.gstatic.com", "https://*.gstatic.com/*", "http://*.googleapis.com", "http://wx.qlogo.cn", "http://upload.qiniu.com/", "http://*.qiniudn.com/**", "http://*.alipay.com/**", "https://*.alipay.com/**", "https://*.alipayobjects.com/**", "https://*.tbcdn.cn/**", i.host + "/**"]),
		o.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded",
		o.defaults.transformRequest = [function(e) {
			var t = function(e) {
				var o, i, n, a, r, s, c, l = "";
				for (o in e)
					if (i = e[o], i instanceof Array)
						for (c = 0; c < i.length; ++c) r = i[c], n = o + "[" + c + "]", s = {}, s[n] = r, l += t(s) + "&";
					else if (i instanceof Object)
					for (a in i) r = i[a], n = o + "[" + a + "]", s = {}, s[n] = r, l += t(s) + "&";
				else void 0 !== i && null !== i && (l += encodeURIComponent(o) + "=" + encodeURIComponent(i) + "&");
				return l.length ? l.substr(0, l.length - 1) : l
			};
			return angular.isObject(e) && "[object File]" !== String(e) ? t(e) : e
		}],
		o.interceptors.push("http1Injector"),
		o.interceptors.push("http2Injector")

}]).config(["$cordovaAppRateProvider", function(e) {
	
	document.addEventListener("deviceready", function() {
		var t = {
				language: "zh-Hans",
				appName: "欧优游",
				openStoreInApp: !1,
				iosURL: "914798809",
				androidURL: "market://details?id=com.estrip.zouke"
			},
			o = {
				title: "10个点赞，不如一份评价",
				message: "如果我们让你很Hi，给个5星好评呗",
				cancelButtonLabel: "滚，爽了再给",
				laterButtonLabel: "今日不宜，下次",
				rateButtonLabel: "呶，给你"
			};
		e.setCustomLocale(o), e.setPreferences(t)
	})
}]).run(["$cordovaDevice", "$cordovaNetwork", "$cordovaSplashscreen", "$cordovaAppAvailability", "$ionicHistory", "$cordovaKeyboard", "$cordovaStatusbar", "$cordovaAppVersion", "$cordovaAppRate", "$cordovaPush", "$rootScope", "$http", "$state", "$timeout", "activityManager", "permission", "angularLoadDynamic", "CONFIG", "JAlert", "cacheLocal", "resVersion", "perfectModal", function(e, t, o, i, n, a, r, s, c, l, d, u, p, m, h, g, f, y, _, v, w, S) {
	u.defaults.cache = v.product, y.SIGNATURE = "1be7cd176e7dafe991c80caa7b8505d1", y.devWidth = window.innerWidth, y.devHeight = window.innerHeight, y.hAct = parseInt(y.devWidth / 480 * 192) + "px", y.hImg = parseInt(y.devWidth / 480 * 240) + "px", y.hImgTp = parseInt(y.devWidth / 480 * 280) + "px", y.hImgPd = parseInt(y.devWidth / 480 * 320) + "px", y.hImgStory = parseInt((y.devWidth - 24) / 480 * 320) + "px", y.hThumb = parseInt(y.devWidth / 320 * 200) + "px", y.hCity = parseInt(y.devWidth / 480 * 250) + "px", y.hCard = Math.round(.618 * y.devHeight / (y.devWidth - 30) * 480), y.hCardThumb = Math.round(y.hCard / 480 * 160), y.imgSizeCard = "?imageView2/1/w/480/h/" + y.hCard + "/q/90/format/JPG/interlace/1", y.imgSizeCardThumb = "?imageView2/1/w/160/h/" + y.hCardThumb + "/q/90/format/JPG/interlace/1", d.user || (d.user = {}), d.user.token = v.system.get("SESSIONID", "") || "", ionic.Platform.ready(function() {
		if (console.log("platform.ready"), d.user.isIOS = ionic.Platform.isIOS(), d.user.isAndroid = ionic.Platform.isAndroid(), d.user.needUpdate = !1, void 0 === v.system.get("appratePrecondition") && v.system.put("appratePrecondition", 0), void 0 === v.system.get("stateGuide") && v.system.put("stateGuide", {}), window.cordova) {
			Object.defineProperty(d, "appratePrecondition", {
				get: function() {
					return v.system.get("appratePrecondition") || 0
				},
				set: function(e) {
					d.user.info.allow_rate && (e >= 6 && (e = 6), 5 === e && c.promptForRating(!0).then(function() {
						_.showOnce("欧优游·有你更精彩！")
					}), v.system.put("appratePrecondition", e))
				}
			}), s.getVersionNumber().then(function(e) {
				y.version = e;
				var t = v.system.get("version");
				console.log(t), y.version !== t ? (y.guideShow = !0, v.system.put("version", y.version), v.system.put("appratePrecondition", 0), v.system.put("stateGuide", {}), S.load().then(function() {
					void 0 == t ? m(function() {
						g.prompt()
					}, 3e3) : (g.registerPush(), g.getPosition())
				})) : (g.registerPush(), g.getPosition())
			}), y.deviceId = e.getUUID(), y.model = e.getModel(), d.user.networkState = t.getNetwork(), d.$on("$cordovaNetwork:online", function(e, t) {
				"none" == d.user.networkState && n.clearCache(), d.user.networkState = t, window.webGoogle || f.loadScript("http://ditu.google.cn/maps/api/js?v=3.2&sensor=false&time=" + (new Date).valueOf()).then(function() {
					window.webGoogle = window.google
				})
			}), d.$on("$cordovaNetwork:offline", function(e, t) {
				d.user.networkState = t
			}), d.user.isIOS ? i.check("weixin://").then(function() {
				d.user.wxInstalled = !0
			}, function() {
				d.user.wxInstalled = !1
			}) : (d.user.wxInstalled = !0, navigator.updateApp.checkAndUpdate(y.versionFile)), a.hideAccessoryBar(!0), a.disableScroll(!0), r.style(0);
			var l = d.user.isIOS ? 300 : 1500;
			m(function() {
				o.hide()
			}, l), d.$on("$cordovaPush:notificationReceived", function(e, t) {
				var o = function() {
					if (void 0 != t.alert && "" != t.alert && null != t.alert) {
						var e = "",
							o = "";
						switch (t.cat) {
							case "1":
								e = "今日晚报已发行，现在查看吗？", o = "app.paper";
								break;
							case "21":
								e = t.alert + "\n现在查看吗？", o = "app.commonActivity";
								break;
							case "22":
								o = "app.storyDetail";
								break;
							case "23":
								o = "app.journeyDetail";
								break;
							case "24":
								o = "app.poiDetail";
								break;
							case "25":
								o = "app.topic";
								break;
							case "31":
							case "32":
							case "33":
								o = "app.userLike";
								break;
							case "41":
							case "42":
							case "43":
							case "44":
								o = "app.userComments";
								break;
							case "51":
								o = "app.userMessage";
								break;
							case "52":
								e = t.alert + "\n现在查看吗？", o = "app.userMessage";
							case "53":
								e = t.alert + "\n现在查看吗？", o = "app.userMessage";
								break;
							case "61":
								o = "app.userMessage";
								break;
							case "62":
								e = t.alert + "\n现在查看吗？", o = "app.userMessage";
								break;
							case "63":
								o = "app.userMessage"
						}
						console.log(e + "....." + o), "1" == t.foreground ? "" != e && "" != o ? _.confirm(e, function() {
							"21" == t.cat ? h.go(t.id, t.url) : p.go(o, {
								id: t.id
							})
						}, function() {}) : _.notify(t.alert) : "" != o && ("21" == t.cat ? h.go(t.id, t.url) : p.go(o, {
							id: t.id
						}))
					}
				};
				switch (console.log("**********************" + JSON.stringify(t)), t.type) {
					case "status":
						1 == t.alert;
						break;
					case "voice":
						d.$emit("$cordovaPush:voice", t);
						break;
					case "notify":
						o()
				}
			})
		}
		window.plugins.umengAnalyticsPlugin.init(), m(function() {
			window.localGoogle = window.google, delete window.google
		}, 200), m(function() {
			f.loadScript("http://ditu.google.cn/maps/api/js?v=3.2&sensor=false").then(function() {
				window.webGoogle = window.google
			})
		}, 300)
	})
}])