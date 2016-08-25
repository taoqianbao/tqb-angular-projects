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
	e.views.maxCache(6), e.views.swipeBackEnabled(!1), e.backButton.previousTitleText(!1).text(" "), e.navBar.alignTitle("center"), t.resourceUrlWhitelist(["self", "http://*.zouke.com/**", "http://*.ouutrip.com/**", "https://*.google.cn/**", "https://*.google.com/**", "http://*.gstatic.cn", "http://*.gstatic.com", "https://*.gstatic.com/*", "http://*.googleapis.com", "http://wx.qlogo.cn", "http://upload.qiniu.com/", "http://*.qiniudn.com/**", "http://*.alipay.com/**", "https://*.alipay.com/**", "https://*.alipayobjects.com/**", "https://*.tbcdn.cn/**", i.host + "/**"]), o.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded", o.defaults.transformRequest = [function(e) {
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
	}], o.interceptors.push("http1Injector"), o.interceptors.push("http2Injector")
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
}]), 

angular.module("app.base.config", []), 

angular.module("app.base.controller", []).controller("baseCtrl", ["$scope", "lcBase", function(e, t) {
	t.init(e), t.initAuth(), t.initViewCacheManager(), t.initTab(), t.initSideModal(), ionic.Platform.ready(t.initUmeng)
}]).controller("commentListCtrl", ["$scope", "$rootScope", "$stateParams", "$state", "$timeout", "$ionicScrollDelegate", "viewArgument", "dateFilter", "resJourney", "resStory", "resProduct", "resPoi", function(e, t, o, i, n, a, r, s, c, l, d, u) {
	switch (e.title = o.title, e.type = o.type, e.id = o.id, e.comments = [], e.modified = !1, e.type) {
		case "journey":
			c.getComments({
				journey_id: e.id
			}, function(t) {
				0 == t.data.code && (e.comments = t.data.list)
			});
			break;
		case "story":
			l.getComments({
				story_id: e.id
			}, function(t) {
				0 == t.data.code && (e.comments = t.data.list)
			});
			break;
		case "product":
			d.getComments({
				pd_id: e.id
			}, function(t) {
				0 == t.data.code && (e.comments = t.data.list)
			});
			break;
		case "poi":
			u.getComments({
				poi_id: e.id,
				page: 1
			}, function(t) {
				0 == t.data.code && (e.comments = t.data.list)
			})
	}
	e.onClickUser = function(e, t, o) {
		i.go("app.userHome", {
			id: e,
			name: t,
			avatar: o
		})
	}, e.onClickComment = function() {
		t.user.isSigned || t.$emit("request:needSigned")
	}, e.content = {
		value: ""
	}, e.replyUser = function(t, o) {
		var i = t.currentTarget.ownerDocument.querySelector("textarea");
		e.content.value = "@" + o + "  ", n(function() {
			i.focus()
		}, 300)
	}, e.onClickCommentLike = function(t, o) {
		var i = e.comments[o],
			n = i.is_liked ? 0 : 1,
			a = function() {
				i.is_liked ? i.like_num-- : i.like_num++, i.is_liked = !i.is_liked, e.modified = !0
			};
		switch (e.type) {
			case "journey":
				c.likeComment({
					comment_id: t,
					action: n
				}, function(e) {
					0 == e.data.code && a(e)
				});
				break;
			case "story":
				l.likeComment({
					comment_id: t,
					action: n
				}, function(e) {
					0 == e.data.code && a(e)
				});
				break;
			case "product":
				d.likeComment({
					comment_id: t,
					action: n
				}, function(e) {
					0 == e.data.code && a(e)
				});
				break;
			case "poi":
				u.likeComment({
					comment_id: t,
					action: n
				}, function(e) {
					0 == e.data.code && a(e)
				})
		}
	}, e.onSubmitComment = function() {
		if ("" != e.content.value) {
			var o = function(o) {
				var i = a.$getByHandle("comment-list"),
					r = e.comments,
					c = {
						id: o,
						comment: e.content.value,
						comment_time: s(new Date, "yyyy-MM-dd hh:mm:ss"),
						is_liked: !1,
						like_num: 0,
						user_id: t.user.info.user_id,
						user_name: t.user.info.user_name,
						avatar: t.user.info.avatar
					};
				r.unshift(c), e.content.value = "", e.modified = !0, n(function() {
					i.resize(), i.scrollTop(!0)
				}, 200)
			};
			switch (e.type) {
				case "journey":
					c.comment({
						journey_id: e.id,
						content: e.content.value
					}, function(e) {
						0 == e.data.code && o(e.data.id)
					});
					break;
				case "story":
					l.comment({
						story_id: e.id,
						content: e.content.value
					}, function(e) {
						0 == e.data.code && o(e.data.id)
					});
					break;
				case "product":
					d.comment({
						pd_id: e.id,
						content: e.content.value
					}, function(e) {
						0 == e.data.code && o(e.data.id)
					});
					break;
				case "poi":
					u.comment({
						poi_id: e.id,
						content: e.content.value
					}, function(e) {
						0 == e.data.code && o(e.data.id)
					})
			}
		}
	}, e.$on("$ionicView.beforeLeave", function() {
		e.content.value = "", r.put(e.comments)
	})
}]).controller("citySelectCtrl", ["$scope", "$timeout", "$ionicHistory", "$ionicScrollDelegate", "viewArgument", function(e, t, o, i, n) {
	e.cities = n.get(), e.toggleGroup = function(o) {
		e.shownGroup = e.isGroupShown(o) ? null : o, t(function() {
			i.$getByHandle("city-select").resize()
		}, 200)
	}, e.isGroupShown = function(t) {
		return e.shownGroup === t
	}, e.onClickCity = function(e, t) {
		n.put({
			code: e,
			name: t
		}), o.goBack()
	}
}]).controller("dateSelectCtrl", ["$scope", "$ionicHistory", "viewArgument", function(e, t, o) {
	e.date = o.get(), e.$on("dateSelect", function(i) {
		i.stopPropagation(), o.put({
			date: e.date.selected
		}), t.goBack()
	})
}]).controller("singleSelectCtrl", ["$scope", "$timeout", "$ionicHistory", "$ionicScrollDelegate", "viewArgument", function(e, t, o, i, n) {
	var a = n.get();
	e.title = a.title, e.list = a.list, e.onClick = function(e) {
		n.put({
			index: e
		}), o.goBack()
	}
}]).controller("commonActivityCtrl", ["$scope", "$rootScope", "$state", "$ionicHistory", "viewArgument", "viewElement", "resActivity", "$stateParams", "$ionicActionSheet", "weixinShare", "resUser", "statusBar", "CONFIG", "modal", "$ionicLoading", "$timeout", function(e, t, o, i, n, a, r, s, c, l, d, u, p, m, h, g) {
	function f(o) {
		function i() {
			if (!t.user.isIOS) {
				g(function() {
					document.querySelector(".user-postcard-modal .container").style.display = ""
				}, 100);
				var e = document.createEvent("HTMLEVENTS");
				e.initEvent("resize", !0, !0), window.dispatchEvent(e)
			}
		}
		if (t.user.isAndroid) {
			var n = document.querySelector(".user-postcard-modal .container");
			n && (n.style.display = "block")
		}
		return e.postcard && e.postcard.id == o ? (u.hide(), void m.getModal("postcard", e).show().then(i)) : void d.getPostcardDetail({
			id: o
		}, function(t) {
			function o() {
				var t = n.getBoundingClientRect().height,
					o = n.parentElement.getBoundingClientRect().height;
				e.mediaStyle.bottom = .016 * t + (o - t) + "px", e.$apply()
			}
			if (0 === t.data.code) {
				if (u.hide(), e.postcard = t.data, m.getModal("postcard", e).show().then(i), !e.bind) {
					e.bind = !0;
					var n = document.querySelector(".user-postcard-modal img");
					e.mediaStyle = {}, n.addEventListener("load", o), window.addEventListener("resize", o), e.$on("$destory", function() {
						window.removeEventListener("resize", o)
					})
				}
				e.audio && e.audio.release(), e.postcard.audio_url ? (e.audio = new Media(e.postcard.audio_url, function() {
					e.isPlaying && (e.isPlaying = !1), g.cancel(e.toggle.t);
					var t = e.audio.getDuration();
					0 > t && (t = e.postcard.duration), y(t), e.$apply()
				}, function() {
					console.log("upostcard media fail", arguments)
				}), y(Math.round(e.postcard.duration / 1e3))) : e.audio = null
			}
		})
	}

	function y(t) {
		t = Math.round(t);
		var o = Math.floor(t / 60);
		e.duration = 0 === o ? t + '"' : o + "'" + t % 60 + '"'
	}

	function _(e) {
		k && k.postMessage({
			view: C,
			type: "triggerSuccess",
			triggerName: e,
			msg: "ok"
		}, "*")
	}

	function v(e) {
		var o = e.data;
		if (o.view = C) switch (o.type) {
			case "init":
				k.postMessage({
					view: C,
					type: "userInfo",
					info: {
						userName: t.user.info.user_name,
						gender: t.user.info.gender,
						avatar: t.user.info.avatar
					}
				}, "*");
				break;
			case "share":
				x = o.shareData;
				break;
			case "trigger":
				var i = P[o.triggerName];
				i && i.apply(P, o.triggerArgument || [])
		}
	}
	e.$emit("baseCtrl.cleanCache");
	var w = n.get();
	w.src && (e.src = w.src), w.testSrc && g(function() {
		a.current().querySelector("iframe").src = w.testSrc
	});
	var S = s.id,
		b = a.current().querySelector("iframe"),
		k = b.contentWindow,
		$ = !1;
	e.$watch("src", function() {
		$ || (console.log("iframe loadstart"), $ = !0, h.show({
			template: "Loading..."
		}), g(function() {
			$ && ($ = !1, console.log("iframe timeout"), h.hide())
		}, 5e3))
	}), b.addEventListener("load", function() {
		$ && ($ = !1, console.log("iframe load"), h.hide())
	}), b.addEventListener("error", function() {
		$ && ($ = !1, console.log("iframe error"), h.hide())
	});
	var x = null;
	m.createModal("postcard", "app/user/templates/postcardModal.html", "up", !0, e, !0), e.close = function() {
		m.getModal("postcard").hide()
	}, e.audio = null, e.isPlaying = !1, e.duration = "", e.toggle = function() {
		e.isPlaying ? (e.isPlaying = !1, e.audio.stop()) : (e.isPlaying = !0, e.audio.play(), e.toggle.t = g(function() {
			e.toggle.t = g(arguments.callee, 50), e.audio.getCurrentPosition(y)
		}, 50))
	}, e.$on("modal.hidden", function(t, o) {
		"postcard" === m.getModalName(o) && (e.isPlaying && e.toggle(), u.show())
	}), e.share = function() {
		function o() {
			JAlert.notify("已分享")
		}

		function i() {
			JAlert.notify("分享失败")
		}
		var n = {
			url: p.hostWWW + "/postcard/detail?id=" + e.postcard.id + "&uid=" + t.user.info.user_id,
			title: "有声音的明信片·有故事的旅行",
			desc: e.postcard.text,
			image: e.postcard.main_url + "-weixin"
		};
		c.show({
			buttons: [{
				text: '<i class="ic ic-weixin"></i>微信好友'
			}, {
				text: '<i class="ic ic-weixin-moment"></i>朋友圈（完整卡片）'
			}, {
				text: '<i class="ic ic-weixin-moment"></i>朋友圈（静态图片）'
			}, {
				text: "保存到相册"
			}],
			cssClass: "share-sheet",
			cancelText: "取消",
			cancel: function() {},
			buttonClicked: function(t) {
				switch (t) {
					case 0:
						l.page2Friend(n, o, i);
						break;
					case 1:
						n.desc = "「" + (e.postcard.city || "欧优游") + "」寄出: " + n.desc, l.page2Timeline(n, o, i);
						break;
					case 2:
						l.image2Timeline(e.postcard.snapshot_url, o, i);
						break;
					case 3:
						var a = document.querySelector(".user-postcard-modal img"),
							r = document.createElement("canvas");
						r.width = a.naturalWidth, r.height = a.naturalHeight, r.getContext("2d").drawImage(a, 0, 0), window.canvas2ImagePlugin.saveImageDataToLibrary(function() {
							JAlert.notify("保存成功")
						}, function(e) {
							JAlert.notify(e)
						}, r)
				}
				return !0
			}
		})
	};
	var P = {
			gotoWidthPut: function(e, t, o) {
				n.put(o), this["goto"](e, t)
			},
			"goto": function(e, t) {
				o.go(e, t || {}), _("goto")
			},
			back: function() {
				i.goBack(), _("back")
			},
			comment: function(e) {
				r.comment({
					id: S,
					content: e
				}, function(e) {
					0 === e.data.code ? (JAlert.notify("评论提交成功"), _("comment")) : JAlert.notify(e.data.msg)
				})
			},
			like: function() {
				r.like({
					id: S
				}, function(e) {
					0 === e.data.code && _("like")
				})
			},
			postcard: function(e) {
				f(e)
			}
		},
		C = "app.commonActivity";
	e.$on("$ionicView.beforeEnter", function() {
		k.postMessage({
			view: C,
			type: "view.enter"
		}, "*"), window.addEventListener("message", v)
	}), e.$on("$ionicView.beforeLeave", function() {
		k.postMessage({
			view: C,
			type: "view.leave"
		}, "*"), window.removeEventListener("message", v)
	}), e.$on("$destroy", function() {
		window.removeEventListener("message", v)
	}), e.shareActivity = function() {
		function e() {
			JAlert.notify("已分享")
		}

		function t() {
			JAlert.notify("分享失败")
		}
		x && c.show({
			buttons: [{
				text: '<i class="ic ic-weixin"></i>微信好友'
			}, {
				text: '<i class="ic ic-weixin-moment"></i>朋友圈'
			}],
			cssClass: "share-sheet",
			cancelText: "取消",
			cancel: function() {},
			buttonClicked: function(o) {
				switch (o) {
					case 0:
						l.page2Friend(x, e, t);
						break;
					case 1:
						l.page2Timeline(x, e, t)
				}
				return !0
			}
		})
	}
}]).factory("activityManager", ["viewArgument", "$state", function(e, t) {
	return {
		go: function(o, i) {
			i = i || "http://m.zouke.com/activity/appdetail?id=" + o, e.put({
				src: i
			}), t.go("app.commonActivity", {
				id: o
			})
		},
		test: function(o) {
			e.put({
				testSrc: o
			}), t.go("app.commonActivity", {
				id: "test"
			})
		}
	}
}]).controller("testCtrl", ["$rootScope", function() {}]).run(["$rootScope", "$timeout", "$ionicHistory", "$ionicScrollDelegate", "viewArgument", "viewElement", "$state", "modal", "mHistory", "activityManager", "$stateParams", "$cordovaDialogs", "$ionicLoading", "$ionicSlideBoxDelegate", function() {
	if (window.debug) {
		window.androidBack = function() {
			var e = document.createEvent("HTMLEVENTS");
			e.initEvent("backbutton", !0, !0), document.dispatchEvent(e)
		};
		for (var e = arguments.callee.toString(), t = e.split("(")[1].split(")")[0].replace(/\s/g, "").split(","), o = 0; o < arguments.length; ++o) window[t[o]] = arguments[o]
	}
}]), 

angular.module("app.base.directive", []).directive("fixTabsAnimation", ["$document", "$rootScope", "$state", "$timeout", "$ionicHistory", function(e, t, o, i, n) {
	var a = e[0].querySelector(".tabs-index"),
		r = ["app.journeyHome", "app.mallHome", "app.mapHome"];
	return {
		restrict: "A",
		link: function(t) {
			t.$on("$ionicView.beforeLeave", function() {
				-1 == r.indexOf(n.currentView().stateName) && (angular.forEach(e[0].querySelectorAll(".bar.bar-header"), function(e) {
					e.classList.remove("hide")
				}), a.classList.add("inactive"))
			}), t.$on("$ionicView.beforeEnter", function() {
				a.classList.remove("inactive")
			})
		}
	}
}]), 

angular.module("app.base", ["app.base.controller", "app.base.route", "app.base.modal", "app.base.directive", "app.base.logic", "app.base.config"]), 

angular.module("app.base.logic", []).factory("lcBase", ["$rootScope", "$timeout", "$state", "$document", "$ionicHistory", "$ionicGesture", "cacheLocal", "CONFIG", "sideModal", "loginModal", "authFactory", "angularLoadDynamic", "$ionicViewSwitcher", "viewElement", function(e, t, o, i, n, a, r, s, c, l, d, u, p, m) {
	function h(e) {
		g = e, g.$on("$destroy", function() {
			g = null
		})
	}
	var g = null;
	return {
		init: function(e) {
			return h(e), r.system.remove("messages"), e.base = {
				bottom: .82 * s.devHeight + "px",
				devHeight: s.devHeight + "px"
			}, this
		},
		initUmeng: function() {
			if (window.cordova) {
				var t = {
						"app.commonActivity": {
							name: "app.commonActivity",
							key: "id"
						},
						"app.journeyList": {
							name: "app.journeyList",
							key: "option"
						},
						"app.journeyDetail": {
							name: "app.journeyDetail",
							key: "id"
						},
						"app.storyDetail": {
							name: "app.storyDetail",
							key: "id"
						},
						"app.poiDetail": {
							name: "app.poiDetail",
							key: "id"
						},
						"app.product": {
							name: "app.product",
							key: "pid"
						}
					},
					o = null,
					i = "",
					n = "app.journeyHome";
				window.plugins.umengAnalyticsPlugin.init(), e.$on("$stateChangeSuccess", function(e, n, a) {
					var r = t[n.name];
					if (r !== o && (o && (console.log("pause", i), window.plugins.umengAnalyticsPlugin.onPause({
							classname: i
						})), o = r, r)) {
						var s = r.name ? r.key : r[n.name].key,
							c = s ? ".id=" + a[s] : "";
						i = (r.name || r[n.name].name) + c, console.log("resume", i), window.plugins.umengAnalyticsPlugin.onResume({
							classname: i
						})
					}
				}), n in t && e.$emit("$stateChangeSuccess", {
					name: n
				})
			}
		},
		initAuth: function() {
			return e.user.isSigned = r.system.get("SESSIONID") ? !0 : !1, console.log(e.user.isSigned), e.user.info = {}, e.$on("request:needSigned", function() {
				l.show()
			}), d.loadUser(!0), this
		},
		initViewCacheManager: function() {
			return e.$on("baseCtrl.cleanCache", function(t) {
				var o = m.current(),
					i = t.targetScope;
				i === e && (i = angular.element(o).scope()), i.$on("$ionicView.leave", function(e, t) {
					"back" === t.direction && (p.destroyViewEle(angular.element(o)), o = null)
				})
			}), this
		},
		initTab: function() {
			return g.tab = {
				tabActive: "journey",
				showAddBar: !1,
				switchTab: function(e, t) {
					if (t !== this.tabActive || "add" === t) switch (("journey" == t || "mall" == t || "map" == t) && n.nextViewOptions({
						disableAnimate: !0
					}), t) {
						case "journey":
							o.go("app.journeyHome");
							break;
						case "mall":
							o.go("app.mallHome");
							break;
						case "add":
							g.tab.showAddBar = !g.tab.showAddBar, e.stopPropagation();
							break;
						case "map":
							o.go("app.mapHome");
							break;
						case "chat":
							o.go("app.chatHome");
							break;
						case "postcard":
							o.go("app.postcardTemplate")
					}
				}
			}, e._tab = {get tabActive() {
					return g.tab.tabActive
				},
				isHideTab: !1,
				showTab: function() {
					this.isHideTab = !1
				},
				hideTab: function() {
					this.isHideTab = !0
				}
			}, e.$on("$ionicView.enter", function(e, t) {
				switch (t.stateName) {
					case "app.journeyHome":
						g.tab.tabActive = "journey";
						break;
					case "app.mallHome":
						g.tab.tabActive = "mall";
						break;
					case "app.mapHome":
						g.tab.tabActive = "map"
				}
			}), this
		},
		initSideModal: function() {
			return c.load(), e.showSide = function() {
				c.show()
			}, a.on("swipeleft", c.show, angular.element(i[0].body.querySelector(".view-container"))), this
		}
	}
}]), angular.module("app.base.route", []).config(["$stateProvider", "$urlRouterProvider", "$locationProvider", "PERMISSIONS", function(e, t, o) {
	o.html5Mode(!1), t.otherwise("/journeyHome"), e.state("app", {
		"abstract": !0,
		templateUrl: "app/base/templates/tabs.html",
		controller: "baseCtrl"
	}).state("app.commentList", {
		url: "/commentList/:type/:id/:title",
		cache: !1,
		templateUrl: "app/base/templates/commentList.html",
		controller: "commentListCtrl"
	}).state("app.citySelect", {
		url: "/citySelect",
		cache: !1,
		templateUrl: "app/base/templates/citySelect.html",
		controller: "citySelectCtrl"
	}).state("app.dateSelect", {
		url: "/dateSelect",
		cache: !1,
		templateUrl: "app/base/templates/dateSelect.html",
		controller: "dateSelectCtrl"
	}).state("app.singleSelect", {
		url: "/singleSelect",
		cache: !1,
		templateUrl: "app/base/templates/singleSelect.html",
		controller: "singleSelectCtrl"
	}).state("app.commonActivity", {
		url: "/activity/:id",
		cache: !0,
		templateUrl: "app/base/templates/activity.html",
		controller: "commonActivityCtrl"
	})
}]).constant("PERMISSIONS", {
	needSignIn: "needSignIn"
}), angular.module("app.controllers.chat", []).controller("chatHomeCtrl", ["$scope", "$rootScope", "$state", "$timeout", "$document", "$ionicScrollDelegate", "$ionicHistory", "cacheLocal", "$ionicPlatform", "resChat", "CONFIG", "viewArgument", "RootScopeProxy", "logicTip", function(e, t, o, i, n, a, r, s, c, l, d, u, p, m) {
	e.msgWidth = d.devWidth - 62 + 16, e.messages = [], e.msgModel = {}, e.msgNofity = "", e.tipsScroll = a.$getByHandle("chat-tips"), e.chatScroll = a.$getByHandle("chat"), e.showNofity = !1, e.imgSizeThumb = d.imgSizeThumb, e.$on("$ionicView.afterEnter", function(t, o) {
		if (e.messages.length <= 1) {
			var n = s.system.get("messages") || [];
			n.length > 0 && (e.messages = e.messages.concat(n))
		}
		"back" != o.direction && i(function() {
			e.chatScroll.resize(), e.chatScroll.scrollBottom(!1)
		}, 50)
	}), e.$on("$ionicView.afterLeave", function() {
		s.system.put("messages", e.messages.slice(1, e.messages.length))
	}), e.onClickHot = function(t, o) {
		e.showChat(), i(function() {
			e.sendMessage(o)
		}, 500)
	}, e.onFocusInput = function() {
		e.chatScroll.scrollBottom(!0)
	}, e.onBlurInput = function() {
		e.chatScroll.scrollBottom(!0)
	}, e.onClickItem = function(e, t, i) {
		var n = "";
		for (var a in i) n += 0 == a ? i[a] : "," + i[a];
		switch (e) {
			case "journey":
				o.go("app.journeyList", {
					type: "chat",
					option: t,
					filter: !1,
					title: "行程 - " + n
				});
				break;
			case "poi":
				o.go("app.poiList", {
					type: "chat",
					option: t,
					filter: !1,
					title: "兴趣点 - " + n
				});
				break;
			case "story":
				o.go("app.storyList", {
					type: "chat",
					option: t,
					filter: !1,
					title: "故事 - " + n
				});
				break;
			case "product":
				o.go("app.productList", {
					type: "chat",
					option: t,
					filter: !1,
					title: "特惠 - " + n
				});
				break;
			case "article":
				o.go("app.articleList", {
					type: "chat",
					option: t,
					filter: !1,
					title: "问答 - " + n
				})
		}
	}, e.onClickText = function(t) {
		if ("A" != t.target.nodeName) {
			var o = t.target.innerText;
			e.sendMessage(o)
		}
	}, e.isVoiceMethod = !1, e.switchInputMethod = function(o) {
		if (e.isVoiceMethod = !e.isVoiceMethod, e.isVoiceMethod) t.user.isIOS && window.cordova && navigator.wxvoice.check({}, function(e) {
			switch (e.code) {
				case 0:
					break;
				case 1:
					JAlert.alert("没有录音权限\n请在「设置」->「隐私」->「麦克风」中打开")
			}
		}, function(e) {
			console.log("error~~~~~~~~~~~~~~~~~" + e)
		});
		else {
			var n = o.currentTarget.parentNode.querySelector("input");
			e.isStartRecord = !1, i(function() {
				n.focus()
			}, 500)
		}
	}, e.showMessage = function(t) {
		return "" == t ? !1 : void l.getMessage({
			category: "all",
			key_word: t
		}, function(o) {
			0 == o.data.code && (o.data.input = t, o.data.logo = "img/icon-new/chat/default.png", e.messages.push({
				msg: o.data
			}), e.chatScroll.resize(), e.chatScroll.scrollBottom(!0))
		})
	}, i(function() {
		e.showMessage("hotword")
	}, 500), m.chatHome(), e.sendMessage = function(t) {
		return "" == t ? !1 : (e.messages.push({
			msg: t,
			client: !0
		}), e.msgModel.input = "", i(function() {
			e.chatScroll.resize(), e.chatScroll.scrollBottom(!0)
		}), void l.getMessage({
			category: "all",
			key_word: t
		}, function(o) {
			if (0 == o.data.code) {
				var i, n = parseInt(10 * Math.random());
				"tips" == o.data.type ? i = "img/icon-new/chat/notfound" + n % 4 + ".png" : "list" == o.data.type && (i = "img/icon-new/chat/success" + n % 5 + ".png"), o.data.input = t, o.data.logo = i, e.messages.push({
					msg: o.data
				}), e.chatScroll.resize(), e.chatScroll.scrollBottom(!0)
			}
		}))
	};
	var h = !1,
		g = 0,
		f = function() {
			e.isStartRecord = !1, t.user.isIOS && window.cordova && navigator.wxvoice.close()
		};
	e.voiceImg = "recog000", e.isStartRecord = !1, e.recordWait = !1, e.voickOk = !1;
	var y = new p(e);
	e.onVoiceHold = function() {
		if (h = !1, e.voiceImg = "recog000", e.isStartRecord = !0, window.cordova) {
			var t = function() {
				navigator.wxvoice.close(), h = !0, e.isStartRecord = !1
			};
			navigator.wxvoice.start({
				data: "startrecord"
			}, function(e) {
				-1 == e.code
			}, function(e) {
				console.log("error~~~~~~~~~~~~~~~~~" + e)
			});
			var o = !1;
			y.$on("$cordovaPush:voice", function(n, a) {
				if ("status" == a.type) i(function() {
					t()
				}, 800);
				else {
					var r = parseInt(a.msg);
					if (r > 100 && !o) {
						switch (r) {
							case 201:
								t(), JAlert.alert("请检查网络连接");
								break;
							case 301:
								t(), JAlert.notify("语音过短");
								break;
							case 304:
								t(), JAlert.alert("请开启麦克风权限");
								break;
							case 999:
								t(), JAlert.notify("语音识别异常");
								break;
							default:
								g = (new Date).getTime()
						}
						o = !0
					} else e.voiceImg = 9 >= r ? "recog00" + a.msg : "recog009", r > 1 && (e.voickOk = !0)
				}
			})
		}
	}, e.onVoiceRelease = function() {
		if (!h) {
			var t = (new Date).getTime() - g;
			if (1e3 > t) return JAlert.notify("时间太短了，亲！"), void f();
			if (!e.voickOk) return JAlert.notify("声音太低了，亲！"), void f();
			e.voickOk = !1, e.recordWait = !0, window.cordova && navigator.wxvoice.getResult({
				data: "startrecord"
			}, function(t) {
				switch (t.code) {
					case 0:
						e.sendMessage(t.msg);
						break;
					case -301:
						JAlert.notify("未采集到语音");
						break;
					case -201:
						JAlert.notify("网络异常");
						break;
					default:
						JAlert.notify("语音识别异常")
				}
				e.recordWait = !1, e.isStartRecord = !1
			}, function() {
				JAlert.notify("语音识别异常"), e.recordWait = !1, e.isStartRecord = !1
			})
		}
	}
}]), angular.module("app.chat", ["app.controllers.chat", "app.route.chat"]), angular.module("app.route.chat", []).config(["$stateProvider", "$urlRouterProvider", "$locationProvider", "PERMISSIONS", function(e) {
	e.state("app.chatHome", {
		url: "/chatHome",
		cache: !0,
		templateUrl: "app/chat/templates/chatHome.html",
		controller: "chatHomeCtrl"
	})
}]), angular.module("app.common.filter", []).filter("inArray", function() {
	return function(e, t) {
		return void 0 === e ? !1 : -1 == e.indexOf(t) ? !1 : !0
	}
}).filter("toDate", function() {
	return function(e) {
		return void 0 === e ? !1 : new Date(e.split(" ")[0])
	}
}).filter("sortArray", function() {
	return function(e, t) {
		if (void 0 !== e) {
			var o = [];
			for (var i in t) {
				var n = t[i];
				o.push(e[n])
			}
			return o
		}
	}
}).filter("slice", function() {
	return function(e, t, o) {
		return void 0 != e ? 0 == o ? e.slice(t, e.length) : e.slice(t, o) : void 0
	}
}).filter("filterProduct", function() {
	return function(e, t, o) {
		if (void 0 != e) {
			if (null == o || "" == o) return e;
			var i = [];
			if ("location" == t) {
				for (var n in e)
					for (var a in e[n].country_code)
						if (e[n].country_code[a] == o) {
							i.push(e[n]);
							break
						}
			} else if ("category" == t)
				for (var n in e) {
					for (var a in e[n].tags)
						if (e[n].tags[a] == o) {
							i.push(e[n]);
							break
						}
					e[n].cat == o && i.push(e[n])
				}
			return i
		}
	}
}).filter("groupby", function() {
	return function(e, t) {
		if (e) {
			for (var o = {}, i = 0; i < e.length; i++) o[e[i][t]] ? o[e[i][t]].push(e[i]) : o[e[i][t]] = [e[i]];
			var n = [];
			for (var t in o) n.push({
				key: t,
				sort: o[t][0].sort,
				list: o[t]
			});
			return n.sort(function(e, t) {
				return e.sort > t.sort ? 1 : -1
			})
		}
	}
}).filter("orderByCustom", ["$parse", function(e) {
	return function(t, o, i) {
		function n(e, t) {
			for (var i = 0; i < o.length; i++) {
				var n = o[i](e, t);
				if (0 !== n) return n
			}
			return 0
		}

		function a(e, t) {
			return t ? function(t, o) {
				return e(o, t)
			} : e
		}

		function r(e) {
			switch (typeof e) {
				case "number":
				case "boolean":
				case "string":
					return !0;
				default:
					return !1
			}
		}

		function s(e) {
			return null === e ? "null" : "function" == typeof e.valueOf && (e = e.valueOf(), r(e)) ? e : "function" == typeof e.toString && (e = e.toString(), r(e)) ? e : ""
		}

		function c(e, t) {
			var o = typeof e,
				i = typeof t;
			return o === i && "object" === o && (e = s(e), t = s(t)), o === i ? ("string" === o && (e = e.toLowerCase(), t = t.toLowerCase()), e === t ? 0 : t > e ? -1 : 1) : i > o ? -1 : 1
		}
		if (void 0 !== t) return t.length > 0 && !t[0][o] ? t : t[0][o] ? (o = angular.isArray(o) ? o : [o], 0 === o.length && (o = ["+"]), o = o.map(function(t) {
			var o = !1,
				i = t || identity;
			if (angular.isString(t)) {
				if (("+" == t.charAt(0) || "-" == t.charAt(0)) && (o = "-" == t.charAt(0), t = t.substring(1)), "" === t) return a(c, o);
				if (i = e(t), i.constant) {
					var n = i();
					return a(function(e, t) {
						return c(e[n], t[n])
					}, o)
				}
			}
			return a(function(e, t) {
				return c(i(e), i(t))
			}, o)
		}), Array.prototype.slice.call(t).sort(a(n, i))) : t
	}
}]), angular.module("app.common", ["app.common.filter", "app.common.tool", "app.common.injector", "app.common.datepicker", "app.common.expand", "app.common.graphic", "app.common.modal", "app.common.override", "app.common.pushup", "app.common.resource", "app.common.scrollzoom", "app.common.slideup", "app.common.tips", "app.common.validate", "app.common.viewdragback", "app.common.third", "app.common.share"]), angular.module("app.mall.controller", []).controller("mallHomeCtrl", ["$rootScope", "$scope", "$state", "$ionicHistory", "$ionicSlideBoxDelegate", "viewArgument", "resMall", "CONFIG", function(e, t, o, i, n, a, r, s) {
	t.imgHeight = s.hImg, t.imgSize = s.imgSize, t.title = "自由行超市";
	var c = n.$getByHandle("mall-handle"),
		l = function() {
			r.getMallPage({}, function(e) {
				0 == e.data.code && (t.country = {
					hot: e.data.hot_country,
					east: e.data.east,
					west: e.data.west,
					south: e.data.south,
					north: e.data.north,
					all: e.data.country
				}, t.slider = e.data.slider, c.update())
			})
		};
	t.$on("$ionicView.afterEnter", function() {
		t.country || l()
	}), t.params = [{
		title: "签证",
		type: "category",
		option: "VC",
		filter: !0,
		img: "img/icon-new/mall/visa.png"
	}, {
		title: "WIFI",
		type: "category",
		option: "WD",
		filter: !0,
		img: "img/icon-new/mall/wifi.png"
	}, {
		title: "欧铁",
		type: "tag",
		option: "ER",
		filter: !1,
		img: "img/icon-new/mall/train.png"
	}, {
		title: "包车",
		type: "tag",
		option: "LT",
		filter: !0,
		img: "img/icon-new/mall/car.png"
	}, {
		title: "导游",
		type: "category",
		option: "TG",
		filter: !0,
		img: "img/icon-new/mall/guide.png"
	}], t.clickCountry = function(e) {
		a.put({
			name: e.name,
			code: e.code,
			countries: t.country.all
		}), o.go("app.toolboxSale", {})
	}, t["goto"] = function(e, t) {
		"undefined" == typeof t ? o.go(e, {}) : o.go(e, t)
	}, t.clickActive = function(e) {
		"pd" === e.type ? o.go("app.product", {
			pid: e.id
		}) : o.go("app.activity", {
			aid: e.id
		})
	}, t.getProductList = function(e, t, i, n) {
		o.go("app.productList", {
			title: e,
			type: t,
			option: i,
			filter: n
		})
	}
}]).controller("activityCtrl", ["$scope", "$ionicNavBarDelegate", "$stateParams", "resActivity", "CONFIG", function(e, t, o, i, n) {
	e.activity = {}, i.get({
		acid: o.aid
	}, function(o) {
		e.imgSizeAct = n.imgSizeAct, e.imgSizeThumb = n.imgSizeThumb, e.activity = o.data, t.title(e.activity.name)
	})
}]).controller("saleSearchCtrl", ["$scope", "$timeout", "$state", "$stateParams", "$ionicModal", "$ionicPopover", "$ionicScrollDelegate", "$ionicSlideBoxDelegate", "viewArgument", "resProduct", "CONFIG", "logicTip", function(e, t, o, i, n, a, r, s, c, l, d, u) {
	function p(e) {
		var t = [],
			o = "";
		for (o in e) e[o].num && t.push({
			code: o,
			value: e[o]
		});
		return t
	}
	e.$emit("baseCtrl.cleanCache");
	var m = c.get() || {};
	e.title = m.name ? m.name : "热门产品", e.type = m.name ? "country" : "hot", e.countries = [], e.selected = m.code || "hot", e.selectCity = "hot", e.sliderHeight = d.hImg, e.imgSize = d.imgSize, e.devWidth = d.devWidth, e.cityPopup = !1;
	var h = s.$getByHandle("sale-search-slider"),
		g = function(o, i) {
			e.type = o, "hot" == o ? l.getHot({}, function(o) {
				0 == o.data.code && (e.sliders = o.data.slider, e.countries = o.data.country, e.result = p(o.data.hot), t(function() {
					h.update(), h.slide(0, 0)
				}), u.toolboxSale())
			}) : "country" == o && (e.countries = m.countries, l.getCountryPd({
				countryid: i
			}, function(o) {
				0 == o.data.code && (e.results = o.data.list, e.sliders = o.data.slider, e.footerCities = e.results.slice(0, 4), e.modalCities = e.results.slice(4, e.results.length), e.results.length > 0 && (e.selectCity = e.results[0].city, e.result = p(e.results[0])), t(function() {
					h.update(), h.slide(0, 0)
				}), u.mallCity())
			}))
		};
	g(e.type, e.selected), n.fromTemplateUrl("app/mall/templates/countryListModal.html", {
		scope: e,
		animation: "slide-in-up"
	}).then(function(t) {
		e.modal = t
	}), a.fromTemplateUrl("app/mall/templates/cityListPop.html", {
		scope: e
	}).then(function(t) {
		e.popover = t
	}), e.openCountryModel = function() {
		e.modal.show()
	}, e.closeCountryModel = function() {
		e.modal.hide()
	}, e.countrySelect = function(t, o) {
		e.selected = t, e.title = o, e.modal.hide(), "hot" == t ? (e.selectCity = "hot", g("hot")) : g("country", t)
	}, e.openCityPop = function(t) {
		e.cityPopup = !0, e.popover.show(t)
	}, e.$on("popover.hidden", function() {
		e.cityPopup = !1
	}), e.$on("$destroy", function() {
		e.modal.remove(), e.popover.remove()
	}), e.clickCity = function(t) {
		e.selectCity = t, r.$getByHandle("country-srcoll").scrollTop(!0);
		for (var o in e.results) e.results[o].city == e.selectCity && (e.result = p(e.results[o]), -1 == e.footerCities.indexOf(e.results[o]) && e.footerCities.push(e.results[o]), -1 != e.modalCities.indexOf(e.results[o]) && (e.modalCities.splice(e.modalCities.indexOf(e.results[o]), 1), e.popover.hide(), r.$getByHandle("city-select").scrollBottom(!0)))
	}, e.onClickCategory = function(e, t, i) {
		var n = {};
		"hot" == e ? n = {
			title: i,
			filter: !1,
			type: "hot",
			option: t
		} : (n = {
			title: i,
			filter: !1,
			type: "csearch",
			option: {
				city: e
			}
		}, ["LT", "ODT", "MDT"].indexOf(t) > -1 ? n.option.tags = [t] : n.option.category = t), o.go("app.productList", {
			type: n.type,
			option: JSON.stringify(n.option),
			filter: n.filter,
			title: n.title
		})
	}
}]).controller("productListCtrl", ["$scope", "$ionicScrollDelegate", "$stateParams", "CONFIG", "utils", "viewArgument", "resProduct", function(e, t, o, i, n, a, r) {
	var s = {},
		c = {};
	e.imgHeight = i.hImg, e.imgSize = i.imgSize, e.page = 1, e.number = i.loadOnceNum, e.errorFlag = !1, e.hasFilter = "true" == o.filter, e.title = o.title, e.type = o.type;
	try {
		e.option = JSON.parse(o.option)
	} catch (l) {
		e.option = o.option
	}
	switch (e.type) {
		case "category":
			s = {
				category: "category",
				option: e.option
			}, e.pdCode = e.option, "PT" == e.option && (e.hasFilter = !1), e.hasFilter && (c = {
				category: "cat",
				option: {
					cat: e.option
				}
			});
			break;
		case "tag":
			s = {
				category: "tag",
				option: e.option
			}, e.pdCode = e.option, e.hasFilter && (c = {
				category: "tag",
				option: {
					cat: e.option
				}
			});
			break;
		case "mark":
			s = {
				category: "usermark",
				option: e.option
			};
			break;
		case "chat":
			s = {
				key_word: e.option
			};
			break;
		case "search":
			s = {
				category: "search",
				option: e.option
			};
			break;
		case "sale":
			s = {
				category: "sale",
				option: ""
			};
			break;
		case "csearch":
			s = {
				category: "csearch",
				option: e.option
			};
			break;
		case "hot":
			s = {};
			break;
		case "uncommon":
			s = {}
	}
	"hot" == e.type ? r.getSaleList(s, function(t) {
		0 == t.data.code && (e.products = t.data.list, e.filters = {
			category: t.data.category,
			location: t.data.country
		})
	}) : "uncommon" == e.type ? r.getExtraProducts(s, function(t) {
		0 == t.data.code && (e.products = t.data.list, e.filters = {
			category: t.data.tag,
			location: t.data.country
		})
	}) : "chat" == e.type ? r.search(s, function(t) {
		0 == t.data.code && (e.products = t.data.list)
	}) : r.getPdList(s, function(t) {
		0 == t.data.code && (e.products = t.data.list)
	}), e.hasFilter && ("hot" != e.type && r.getPdListFilter(c, function(t) {
		e.filters = t.data
	}), e.filterActive = null, e.filterCondition = {}, e.sortCondition = null, e.onClickFilterMask = function() {
		e.filterActive = null
	}, e.filterClick = function(o) {
		e.filterActive = e.filterActive == o ? null : o, t.$getByHandle("filterScroll").scrollTop()
	}, e.execFilter = function(o, i, a) {
		switch (o) {
			case "location":
				e.filterCondition.location = n.isEmpty(i) ? null : {
					name: a,
					value: i
				};
				break;
			case "category":
				e.filterCondition.category = n.isEmpty(i) ? null : {
					name: a,
					value: i
				};
				break;
			case "sort":
				e.sortCondition = null == i ? null : {
					name: a,
					asc: i,
					field: "_price"
				}
		}
		t.$getByHandle("pdListScroll").scrollTop(!1), e.filterActive = null, e.page = 1
	}), e.loadMore = function(t) {
		e.page = t + 1, e.$broadcast("scroll.infiniteScrollComplete")
	}
}]).controller("localCtrl", ["$scope", "$http", "CONFIG", "$cordovaGeolocation", "utils", function(e, t, o, i, n) {
	function a(i) {
		console.log(i);
		var a = 47.3,
			r = 19.05,
			s = i.coords.latitude,
			c = i.coords.longitude,
			l = n.calcDistance([a, r], [s, c]);
		JAlert.hide(), l > 3e3 ? (e.errorFlag = !0, e.farAway = !0) : t.post(o.api.getPdList, {
			category: "local",
			option: {
				la: s,
				ln: c,
				dist: o.distance
			}
		}).success(function(t) {
			e.products = t.data
		})
	}

	function r(t) {
		console.log(t), JAlert.hide(), e.errorFlag = !0, e.errorTips = "", e.errorTips = t.code == t.PERMISSION_DENIED ? "请设置手机允许欧优游进行定位" : "请检查定位功能是否开启"
	}
	e.title = "附近活动", e.type = "local", e.errorFlag = !1, e.farAway = !1, e.loadOnceNum = o.loadOnceNum;
	n.calcDistance([47.3, 19.05], [47.3, 19.15]);
	i.getCurrentPosition({
		enableHighAccuracy: !1,
		maximumAge: 12e4,
		timeout: 1e3
	}).then(a, r), JAlert.show("正在定位...")
}]), angular.module("app.mall", ["app.mall.controller", "app.mall.service", "app.mall.route"]), angular.module("app.mall.route", []).config(["$stateProvider", "$urlRouterProvider", "$locationProvider", "PERMISSIONS", function(e, t, o) {
	o.html5Mode(!1), e.state("app.mallHome", {
		url: "/mallHome",
		cache: !0,
		templateUrl: "app/mall/templates/mallHome.html",
		controller: "mallHomeCtrl"
	}).state("app.toolboxSale", {
		url: "/toolboxSale",
		cache: !0,
		templateUrl: "app/mall/templates/saleSearch.html",
		controller: "saleSearchCtrl"
	}).state("app.activity", {
		url: "/activity/:aid",
		cache: !1,
		templateUrl: "app/mall/templates/activity.html",
		controller: "activityCtrl"
	}).state("app.productList", {
		url: "/productList/:type/:option/:filter/:title",
		cache: !0,
		templateUrl: "app/mall/templates/productList.html",
		controller: "productListCtrl"
	})
}]), angular.module("app.mall.service", []).service("commonData", function() {
	this.commonData = {}
}).service("contactForm", function() {
	this.data = {}, this.setData = function(e) {
		this.data = e
	}, this.getData = function() {
		return this.data
	}
}).factory("orderFormData", ["resOrder", "dateFilter", "resUser", function(e, t, o) {
	function i(e, t) {
		if (!u.isPersonal()) {
			var o = u._calendarInfos = e.avail_date,
				i = [];
			for (var n in o) o.hasOwnProperty(n) && i.push(n);
			u._dateEnabled = i, i[0] && (u.calendarModel.selected = i[0])
		}
		t && (u._pName = e.pd_name, u._refund = e.refund, u._min = e.min_num, u._max = e.max_num, u._personA = u._gPerson = u._gDays = e.min_num, u._oPrice = e.ori_price, u._packageInfos = e.set_info || u._packageInfos || null, u._packageSelected = u._packageSelected || u._packageInfos && Object.keys(u._packageInfos)[0], u._timeInfos = e.open_time || u._timeInfos || null, u._timeSelected = u._timeSelected || u._timeInfos && Object.keys(u._timeInfos)[0], u._pointInfos = e.meet_points || u._pointInfos || null, u._pointSelected = u._pointSelected || u._pointInfos && Object.keys(u._pointInfos)[0], u._airportInfos = e.airport_poi || u._airportInfos || null, u._airportSelected = u._aireportSelected || u._airportInfos && Object.keys(u._airportInfos)[0], u._express = e.express || !1)
	}

	function n(e) {
		0 === e.data.code ? i(e.data, !0) : JAlert.showOnce(e.data.msg)
	}

	function a(e) {
		if (0 === e.data.code) {
			if (u.isPersonal()) return;
			i(e.data)
		} else JAlert.showOnce(e.data.msg)
	}

	function r(e) {
		if (0 === e.data.code) {
			var t = e.data.list[0];
			t && (u.personInfos[0] = angular.copy(t), u.contactInfo = angular.copy(t))
		}
	}

	function s(e, t) {
		var o = this;
		this._status = 0, this._statusText = "", this._type = e, this._id = t, this._orderId = "", this._pName, this._refund = [], this._min = 0, this._max = 0, this._oPrice = 0, this._all_price = 0, this._o_all_price = 0, this._express = !1, this._calendarInfos = null, this._dateEnabled = [], this._dateSelected = "", this.__calenderModel = {get enabled() {
				return o._dateEnabled
			},
			get selected() {
				return o._dateSelected
			},
			set selected(e) {
				if (o._dateSelected = e, "FS" === o._type) {
					var t;
					(t = o._calendarInfos) && (t = t[o._dateSelected]) && (t = t.day_parts) && (t = t.label) && (o._timeInfos = t, !(o.timeSelected && o.timeSelected in o._timeInfos) && (o.timeSelected = Object.keys(o._timeInfos)[0]))
				}
			}
		}, this._packageInfos = null, this._packageSelected = "", this._timeInfos = null, this._timeSelected = "", this._personA = 0, this._personA_ = 0, this._personC = 0, this._personC_ = 0, this._personT = 0, this._personT_ = 0, this._gPerson = 0, this._gPerson_ = 0, this._gDays = 0, this._gDays_ = 0, this._address = "", this._rpersonInfos = null, this._rperson = 0, this._pointInfos = null, this._pointInfoSelected = "", this._personInfos = [], this._contactInfo = {}, this._code, this._payType = "weix", this._budget = "0", this._remark = "", this._airportInfos = null, this._aireportSelected = "", this._method = "0", this._flight = "", this._aTime = null
	}

	function c(e, t, o, i) {
		if (void 0 !== i) {
			if (null === i || "" === i) return e[t + "_"] = e[t], void(e[t] = null);
			var n = e[t];
			try {
				e[t] = parseInt(i, 10);
				var a;
				a = "_gDays" === t ? e.getDayNumber() : e.getPersonNumber(), (a > e._max || a < e._min || e[t] < o) && (e[t] = n || e[t + "_"])
			} catch (r) {
				e[t] = n || e[t + "_"]
			}
		}
	}
	s.prototype.initFromRemoteData = function(e) {
		if (this._id = e.pd_id, this._type = e.category, this._orderId = e.order_id, this._status = parseInt(e.use_stat, 10), 0 === this._status && (this._status = 2), this._statusText = e.statusDesc, this._pName = e.pd_name, this._refund = e.refund, this._dateSelected = e.travel_date, this._all_price = e.order_price, this._o_all_price = e.amount_price, e.adult_info) {
			this._personA = e.adult_info.length, this._personT = e.teenager_info.length, this._personC = e.child_info.length, this._personInfos = e.adult_info.concat(e.child_info, e.teenager_info);
			for (var t = 0, o = this._personInfos.length; o > t; ++t) this._personInfos[t].name = this._personInfos[t].zh_name
		}
		switch (e.open_time && (this._timeInfos = {}, this._timeInfos[e.open_time] = e.open_time_desc, this._timeSelected = e.open_time), e.set_name && (this._packageInfos = [{
			set_name: e.set_name
		}], this._packageSelected = "0"), this.contactInfo = {
			name: e.name_contact,
			pyname: e.name_contact_py,
			mobile: e.mobile_contact,
			email: e.email_contact
		}, this._type) {
			case "WD":
				this._gDays = e.order_days, this._pointInfos = [e.meet_point], this._pointSelected = "0";
				break;
			case "TG":
				this._gDays = e.adult_num, this._gPerson = e.person, this._address = e.address;
				break;
			case "PT":
				this._personA = e.adult_num, this._personC = e.child_num, this._personT = e.teenager_num, this._gDays = e.trip_day, this._budget = l.indexOf(e.budget), this._remark = e.trip_mark;
				break;
			case "VC":
				this._address = e.visa_address;
				break;
			case "ST":
				this._method = d.indexOf(e.st_method), this._flight = e.flight, this._airportSelected = e.airport, this._airportInfos = {}, this._airportInfos[e.airport] = e.airport_name, this._address = e.address, e.seeoff_time && (this._aTime = new Date("1970-01-01 " + e.seeoff_time)), this._gPerson = e.adult_num
		}
	}, s.prototype.getId = function() {
		return this._id
	}, s.prototype.getType = function() {
		return this._type
	}, Object.defineProperty(s.prototype, "needExpress", {
		get: function() {
			return this._express
		}
	}), Object.defineProperty(s.prototype, "orderId", {
		get: function() {
			return this._orderId
		},
		set: function(e) {
			this._orderId = e
		}
	}), Object.defineProperty(s.prototype, "status", {
		get: function() {
			return this._status
		},
		set: function(e) {
			this._status = e
		}
	}), Object.defineProperty(s.prototype, "statusText", {
		get: function() {
			return this._statusText
		},
		set: function(e) {
			this._statusText = e
		}
	}), Object.defineProperty(s.prototype, "pName", {
		get: function() {
			return this._pName
		}
	}), Object.defineProperty(s.prototype, "refund", {
		get: function() {
			return this._refund
		}
	}), Object.defineProperty(s.prototype, "dateSelected", {
		get: function() {
			return this._dateSelected
		}
	}), Object.defineProperty(s.prototype, "calendarModel", {
		get: function() {
			return this.__calenderModel
		}
	}), Object.defineProperty(s.prototype, "calendarInfos", {
		get: function() {
			return this._calendarInfos
		}
	}), Object.defineProperty(s.prototype, "packageInfos", {
		get: function() {
			return this._packageInfos
		}
	}), Object.defineProperty(s.prototype, "packageSelected", {
		get: function() {
			return this._packageSelected
		},
		set: function(e) {
			e in this._packageInfos && (this._packageSelected = e)
		}
	}), Object.defineProperty(s.prototype, "timeInfos", {
		get: function() {
			return this._timeInfos
		}
	}), Object.defineProperty(s.prototype, "timeSelected", {
		get: function() {
			return this._timeSelected
		},
		set: function(e) {
			if (e in this._timeInfos && (this._timeSelected = e), "FS" === this.getType()) {
				var t;
				(t = this._calendarInfos) && (t = t[this._dateSelected]) && (t = t.day_parts) && (t = t.person) && (t = t[this._timeSelected]) && (this._rpersonInfos = t, !(this._rperson && -1 !== this._rpersonInfos.indexOf(this._rperson)) && (this._rperson = this._rpersonInfos[0]))
			}
		}
	}), Object.defineProperty(s.prototype, "rpersonInfos", {
		get: function() {
			return this._rpersonInfos
		}
	}), Object.defineProperty(s.prototype, "rperson", {
		get: function() {
			return this._rperson
		},
		set: function(e) {
			this._rperson = e
		}
	}), Object.defineProperty(s.prototype, "pointInfos", {
		get: function() {
			return this._pointInfos
		}
	}), Object.defineProperty(s.prototype, "pointSelected", {
		get: function() {
			return this._pointSelected
		},
		set: function(e) {
			this._pointSelected = e
		}
	}), Object.defineProperty(s.prototype, "code", {
		get: function() {
			return this._code
		},
		set: function(e) {
			this._code = e
		}
	}), Object.defineProperty(s.prototype, "payType", {
		get: function() {
			return this._payType
		},
		set: function(e) {
			this._payType = e
		}
	}), Object.defineProperty(s.prototype, "budget", {
		get: function() {
			return this._budget
		},
		set: function(e) {
			this._budget = e
		}
	}), Object.defineProperty(s.prototype, "remark", {
		get: function() {
			return this._remark
		},
		set: function(e) {
			this._remark = e
		}
	}), Object.defineProperty(s.prototype, "airportInfos", {
		get: function() {
			return this._airportInfos
		}
	}), Object.defineProperty(s.prototype, "airportSelected", {
		get: function() {
			return this._airportSelected
		},
		set: function(e) {
			this._airportSelected = e
		}
	}), Object.defineProperty(s.prototype, "method", {
		get: function() {
			return this._method
		},
		set: function(e) {
			this._method = e
		}
	}), Object.defineProperty(s.prototype, "flight", {
		get: function() {
			return this._flight
		},
		set: function(e) {
			this._flight = e
		}
	}), Object.defineProperty(s.prototype, "aTime", {
		get: function() {
			return this._aTime
		},
		set: function(e) {
			this._aTime = e
		}
	}), Object.defineProperty(s.prototype, "personA", {
		get: function() {
			return this._personA
		},
		set: function(e) {
			c(this, "_personA", 1, e)
		}
	}), Object.defineProperty(s.prototype, "personC", {
		get: function() {
			return this._personC
		},
		set: function(e) {
			c(this, "_personC", 0, e)
		}
	}), Object.defineProperty(s.prototype, "personT", {
		get: function() {
			return this._personT
		},
		set: function(e) {
			c(this, "_personT", 0, e)
		}
	}), Object.defineProperty(s.prototype, "gPerson", {
		get: function() {
			return this._gPerson
		},
		set: function(e) {
			c(this, "_gPerson", 1, e)
		}
	}), Object.defineProperty(s.prototype, "gDays", {
		get: function() {
			return this._gDays
		},
		set: function(e) {
			c(this, "_gDays", 1, e)
		}
	}), Object.defineProperty(s.prototype, "personInfos", {
		get: function() {
			return this._personInfos
		}
	}), Object.defineProperty(s.prototype, "contactInfo", {
		get: function() {
			return this._contactInfo
		},
		set: function(e) {
			this._contactInfo = e
		}
	}), Object.defineProperty(s.prototype, "address", {
		get: function() {
			return this._address
		},
		set: function(e) {
			this._address = e
		}
	}), s.prototype.revertShadow = function(e) {
		null === this["_" + e] && (this["_" + e] = this["_" + e + "_"])
	}, s.prototype.getPerPrice = function(e) {
		var t = null;
		if (!this._calendarInfos || !(t = this._calendarInfos[this._dateSelected])) return 0;
		switch (e) {
			case "personC":
				return t.price_c;
			case "personT":
				return t.price_t;
			default:
				return t.price_a
		}
	}, s.prototype.changeNumber = function(e, t) {
		this[e] = this[e] + t
	}, s.prototype.addAble = function(e) {
		var t;
		return t = "gDays" === e ? this.getDayNumber() : this.getPersonNumber(), t < this.getMax()
	}, s.prototype.subAble = function(e) {
		switch (e) {
			case "personA":
			case "gPerson":
			case "gDays":
				if (1 === this[e]) return !1;
				break;
			default:
				if (0 === this[e]) return !1
		}
		var t;
		return t = "gDays" === e ? this.getDayNumber() : this.getPersonNumber(), t > this.getMin()
	}, s.prototype.hasCalendar = function() {
		return null != this._calendarInfos
	}, s.prototype.hasPackage = function() {
		return null != this._packageInfos
	}, s.prototype.hasTime = function() {
		return null != this._timeInfos
	}, s.prototype.hasPerson = function() {
		switch (this.getType()) {
			case "FS":
			case "TG":
			case "PT":
			case "WD":
			case "ST":
				return !1;
			default:
				return !0
		}
	}, s.prototype.hasPrice = function() {
		switch (this.getType()) {
			case "FS":
			case "PT":
				return !1;
			default:
				return !0
		}
	}, s.prototype.hasRperson = function() {
		return null != this._rpersonInfos
	}, s.prototype.isPersonal = function() {
		return "PT" === this.getType()
	}, s.prototype.isGuide = function() {
		return "TG" === this.getType()
	}, s.prototype.isWifi = function() {
		return "WD" === this.getType()
	}, s.prototype.isMQL = function() {
		return "FS" === this.getType()
	}, s.prototype.isVisa = function() {
		return "VC" === this.getType()
	}, s.prototype.isAirport = function() {
		return "ST" === this.getType()
	}, s.prototype.getMax = function() {
		return this._max
	}, s.prototype.getMin = function() {
		return this._min
	}, s.prototype.getPersonNumber = function() {
		return this.isPersonal() || this.hasPerson() ? this._personA + this._personC + this._personT : this.isGuide() || this.isAirport() ? this._gPerson : 0
	}, s.prototype.getDayNumber = function() {
		return this.isGuide() || this.isWifi() || this.isPersonal() ? this._gDays : 0
	}, s.prototype.getPackageOffset = function() {
		return this.packageInfos ? this.packageInfos[this.packageSelected].set_price : 0
	}, s.prototype.getPrice = function() {
		if (this._all_price) return this._all_price;
		if (this.hasPrice()) {
			if (this.isGuide()) return this.getPerPrice("gDays") * this.getDayNumber() / 2;
			var e = this.getPackageOffset();
			return this.isWifi() ? (this.getPerPrice("gDays") + e) * this.getDayNumber() : (this.getPerPrice("personA") + e) * this.personA + (this.getPerPrice("personC") + e) * this.personC + (this.getPerPrice("personT") + e) * this.personT
		}
		return 0
	}, s.prototype.getSave = function() {
		return this._all_price && this._o_all_price ? this._o_all_price - this._all_price : this.hasPrice() ? this.isGuide() ? 0 : this.isWifi() ? (this._oPrice - this.getPerPrice("gDays")) * this.getDayNumber() : (this._oPrice - this.getPerPrice("personA")) * this.personA + (this._oPrice - this.getPerPrice("personC")) * this.personC + (this._oPrice - this.getPerPrice("personT")) * this.personT : 0
	}, s.prototype.getRemoteInfos = function() {
		this.isPersonal() && (this._dateEnabled = "*", this._calendarInfos = [], this._dateSelected = "today"), e.getInfo({
			pdId: this._id
		}, n), o.getContacts({
			first: !0
		}, r)
	}, s.prototype.getAvailDateByMonth = function(o) {
		this.isPersonal() || e.getAvailDate({
			pdId: this._id,
			date: t(o, "yyyy-MM-dd")
		}, a)
	}, s.prototype.getRemoteOrderInfos = function(e) {
		this.orderId && o.getOrderDetail({
			order_id: this.orderId
		}, function(t) {
			0 === t.data.code ? (u.initFromRemoteData(t.data), e && e(u)) : JAlert.showOnce(t.data.msg)
		})
	};
	var l = ["2-5", "5-8", "8+"],
		d = ["pickup", "seeoff"];
	s.prototype.createOrder = function() {
		var e = {
			pd_id: this.getId(),
			travel_date: this.dateSelected,
			opt_value: this.timeSelected,
			set_id: this.packageSelected,
			set_price: this.packageInfos && this.packageInfos[this.packageSelected].set_price,
			adult_num: this.personA,
			teenager_num: this.personT,
			child_num: this.personC,
			adult_info: [],
			teenager_info: [],
			child_info: [],
			name_contact: this.contactInfo.name,
			name_contact_py: this.contactInfo.pyname,
			mobile_contact: this.contactInfo.mobile,
			email_contact: this.contactInfo.email,
			address_contact: this.contactInfo.address,
			zipcode_contact: this.contactInfo.zipcode,
			coupon_code: this.code
		};
		if (this.hasPerson())
			for (var o = this.personA, i = this.personA + this.personC, n = this.personInfos.length, a = 0; n > a; ++a) o > a ? e.adult_info.push({
				zh_name: this.personInfos[a].name,
				py_name: this.personInfos[a].pyname
			}) : i > a ? e.child_info.push({
				zh_name: this.personInfos[a].name,
				py_name: this.personInfos[a].pyname,
				age: this.personInfos[a].age
			}) : e.teenager_info.push({
				zh_name: this.personInfos[a].name,
				py_name: this.personInfos[a].pyname,
				age: this.personInfos[a].age
			});
		switch (this.getType()) {
			case "TG":
				e.adult_num = this.gDays, e.person = this.gPerson, e.address = this.address;
				break;
			case "PT":
				e.trip_day = this.gDays, e.budget = l[this.budget], e.trip_mark = this.remark;
				break;
			case "VC":
				e.visa_address = this.address;
				break;
			case "WD":
				e.get_point_key = this.pointSelected, e.adult_num = this.gDays;
				break;
			case "ST":
				e.st_method = d[this.method], e.flight = this.flight, e.airport = this.airportSelected, e.address = this.address, e.adult_num = this.gPerson, e.seeoff_time = t(this.aTime, "HH:MM")
		}
		return e
	};
	var u = null;
	return {
		create: function(e, t) {
			return u && u.getId() === t || (u = new s(e, t)), u
		},
		createByOrderId: function(e, t) {
			u || (u = new s("", "")), u.orderId = e, u.getRemoteOrderInfos(t)
		},
		current: function() {
			return u
		},
		clear: function() {
			u = null
		}
	}
}]), angular.module("app.journey.controller", []).controller("journeyHomeCtrl", ["$scope", "$rootScope", "$state", "$ionicHistory", "$timeout", "CONFIG", "viewElement", "viewArgument", "resJourney", "resUser", "resBanner", "RootScopeProxy", "activityManager", "$ionicSlideBoxDelegate", function(e, t, o, i, n, a, r, s, c, l, d, u, p, m) {
	e.items = [], e.index = 0, e.page = 1, e.hasMore = !0, e.httpRequesting = !1, e.imgSizeTopic = a.imgSizeTopic, e.imgSizePd = a.imgSizePd, e.hImgTp = a.hImgTp, e.hJourney = parseInt(a.hImgPd) + 41 + "px", e.hImgJourney = a.hImgPd, e.loop = function(t) {
		arguments.callee.t && n.cancel(arguments.callee.t), t === e.activities.length - 1 && (arguments.callee.t = n(function() {
			e.loop.active ? (m.$getByHandle("banner").slide(0), e.loop.replay = !1) : e.loop.replay = !0
		}, 3e3))
	}, e.loop.active = !0, e.loop.replay = !1, e.$on("$ionicView.leave", function() {
		e.loop.active = !1
	}), e.$on("$ionicView.enter", function() {
		e.loop.active = !0, m.$getByHandle("banner").update(), e.loop.replay && (m.$getByHandle("banner").slide(0), e.loop.replay = !1)
	});
	var h = function(t) {
		var o = a.guideShow || t ? !0 : !1;
		e.httpRequesting = !0, c.getHome({
			page: e.page,
			getCacheOrHttp: !t,
			silence: o
		}, function(o) {
			if (0 == o.data.code) {
				if (o.data.banner) {
					e.activities = o.data.banner;
					var i = m.$getByHandle("banner");
					i.update(), i.slide(0, 1), i.start()
				}
				e.hasMore = o.data.list.length == o.data.per_num, e.items = 1 == e.page ? o.data.list : e.items.concat(o.data.list), ++e.page
			}
			e.httpRequesting = !1, t && e.$broadcast("scroll.refreshComplete"), e.$broadcast("scroll.infiniteScrollComplete")
		}, function() {
			n(function() {
				e.httpRequesting = !1, t && e.$broadcast("scroll.refreshComplete"), e.$broadcast("scroll.infiniteScrollComplete")
			}, 2e3)
		})
	};
	e.clickActivity = function(e) {
		switch (e.type) {
			case "activity":
				p.go(e.id, e.url);
				break;
			case "story":
				o.go("app.storyDetail", {
					id: e.id
				});
				break;
			case "journey":
				o.go("app.journeyDetail", {
					id: e.id
				});
				break;
			case "jtheme":
				o.go("app.journeyList", {
					type: "theme",
					option: e.id,
					filter: !1,
					title: e.name
				});
				break;
			case "product":
				o.go("app.product", {
					pid: e.id
				});
				break;
			case "poi":
				break;
			default:
				e.state && e.param && o.go(e.state, e.param)
		}
	}, e.onClickItem = function(t, i, n, a) {
		"0" == i ? o.go("app.journeyList", {
			type: "theme",
			option: n,
			filter: !0,
			title: a
		}) : (s.put(angular.copy(e.items[t])), e.index = t, o.go("app.journeyDetail", {
			id: n
		}))
	}, e.onClickUser = function(e, t, i, n) {
		e.stopPropagation(), o.go("app.userHome", {
			id: t,
			name: i,
			avatar: n
		})
	}, e.onClickLike = function(t, o) {
		var i = e.items[o],
			n = i.is_liked ? 0 : 1;
		t.stopPropagation(), l.likeJourney({
			id: i.id,
			action: n
		}, function(e) {
			(0 == e.data.code || 1 == e.data.code) && (i.is_liked ? i.like_num -= 1 : i.like_num += 1, i.is_liked = !i.is_liked)
		})
	};
	var g = e.page;
	e.loadMore = function() {
		g < e.page && e.hasMore && (g = e.page, h())
	}, e.doRefresh = function() {
		e.page = 1, g = e.page, e.hasMore = !0, h(!0)
	}, e.$on("$ionicView.afterEnter", function() {
		0 == e.items.length && h(!0)
	});
	var f = new u(e);
	f.$on("signSuccess", function() {
		e.page = 1, g = e.page, e.hasMore = !0, h(!0)
	})
}]).controller("journeyListCtrl", ["$scope", "$rootScope", "$state", "$stateParams", "$timeout", "CONFIG", "viewArgument", "resJourney", "resUser", "RootScopeProxy", function(e, t, o, i, n, a, r, s, c, l) {
	e.title = i.title, e.type = i.type, e.option = i.option, e.hasFilter = "true" == i.filter, e.items = [], e.page = 1, e.hasMore = !0, e.imgSizePd = a.imgSizePd, e.hJourney = parseInt(a.hImgPd) + 41 + "px", e.hImgJourney = a.hImgPd, e.index = 0;
	var d = function(t) {
		switch (e.httpRequesting = !0, e.type) {
			case "theme":
				s.getTheme({
					theme_id: e.option,
					page: e.page,
					getCacheOrHttp: !t
				}, function(t) {
					0 == t.data.code && (e.hasMore = t.data.list.length == t.data.per_num, e.items = 1 == e.page ? t.data.list : e.items.concat(t.data.list), ++e.page), e.httpRequesting = !1, e.$broadcast("scroll.infiniteScrollComplete")
				}, function() {
					e.httpRequesting = !1, e.$broadcast("scroll.infiniteScrollComplete")
				});
				break;
			case "chat":
				e.$emit("baseCtrl.cleanCache"), s.search({
					key_word: e.option,
					page: e.page
				}, function(t) {
					0 == t.data.code && (e.hasMore = t.data.list.length == t.data.per_num, e.items = 1 == e.page ? t.data.list : e.items.concat(t.data.list), e.httpRequesting = !1, ++e.page), e.$broadcast("scroll.infiniteScrollComplete")
				}, function() {
					e.httpRequesting = !1
				})
		}
	};
	n(function() {
		d()
	}, 350), e.$on("$ionicView.afterEnter", function(t, o) {
		if ("forward" != o.direction) {
			var i = r.get();
			if (i) {
				var n = e.items[e.index];
				n.is_liked && !i.isLiked ? (n.is_liked = !1, n.like_num -= 1) : !n.is_liked && i.isLiked && (n.is_liked = !0, n.like_num += 1)
			}
		}
	}), e.onClickJourney = function(t, i) {
		e.index = t, r.put(angular.copy(e.items[t])), o.go("app.journeyDetail", {
			id: i
		})
	}, e.onClickUser = function(e, t, i, n) {
		e.stopPropagation(), o.go("app.userHome", {
			id: t,
			name: i,
			avatar: n
		})
	}, e.onClickLike = function(t, o) {
		var i = e.items[o],
			n = i.is_liked ? 0 : 1;
		t.stopPropagation(), c.likeJourney({
			id: i.id,
			action: n
		}, function(e) {
			0 == e.data.code && (i.is_liked ? i.like_num -= 1 : i.like_num += 1, i.is_liked = !i.is_liked)
		})
	};
	var u = e.page;
	e.loadMore = function() {
		u < e.page && e.hasMore && (u = e.page, d())
	};
	var p = new l(e);
	p.$on("signSuccess", function() {
		"theme" == e.type && (e.page = 1, u = e.page, e.hasMore = !0, d(!0))
	})
}]).controller("journeyDetailCtrl", ["$scope", "$rootScope", "$state", "$stateParams", "$timeout", "$ionicScrollDelegate", "$ionicSlideBoxDelegate", "CONFIG", "dateFilter", "viewArgument", "journeyUpdate", "modal", "storyModal", "resJourney", "resUser", "RootScopeProxy", function(e, t, o, i, n, a, r, s, c, l, d, u, p, m, h, g) {
	e.$emit("baseCtrl.cleanCache"), e.id = i.id, e.journey = l.get(), e.readOnly = e.journey && 1 == e.journey.readOnly ? !0 : !1, e.isPrivate = e.journey && 1 == e.journey.isPrivate ? !0 : !1, e.imgSize = s.imgSizeTopic, e.imgSizeThumb = s.imgSizeThumb, e.sliderHeight = parseInt((s.devWidth - 16) / 480 * 280) + "px", e.hostImg = s.hostImg, e.limitWord = 60, e.story = {
		imgSizeStory: s.imgSizePd,
		hImgStory: s.hImgStory,
		titleShown: !1,
		city: "",
		poiId: 0,
		poiName: "",
		poiMarked: !1,
		audioShown: !1,
		audio: {},
		audioName: "",
		audioDuration: "",
		audioPaused: !0
	};
	var f = function() {
		m.getDetail2({
			id: e.id
		}, function(t) {
			0 == t.data.code && (e.journey = t.data, angular.forEach(e.journey.comment, function(e) {
				angular.forEach(e, function(e) {
					r.$getByHandle("journey-slider-" + e.id).update()
				})
			}))
		})
	};
	n(function() {
		f()
	}), e.onClickMap = function() {
		l.put({
			journey_id: e.id,
			readOnly: !0
		}), o.go("app.map", {
			type: "journey"
		})
	}, e.onClickUser = function() {
		o.go("app.userHome", {
			id: e.journey.user_id,
			name: e.journey.user_name,
			avatar: e.journey.avatar
		})
	}, e.onClickPoi = function(t, i) {
		o.go("app.poiDetail", {
			id: t,
			journeyId: e.id,
			title: i
		})
	}, e.clickAvatar = function(e, t, i) {
		o.go("app.userHome", {
			id: e,
			name: t,
			avatar: i
		})
	}, e.onClickAllComments = function() {
		o.go("app.commentList", {
			type: "journey",
			id: e.id,
			title: e.journey.name
		})
	}, e.onClickComment = function() {
		t.user.isSigned || t.$emit("request:needSigned")
	}, e.onCommentInput = function() {
		n(function() {
			a.$getByHandle("journey-detail").scrollBottom(!0)
		}, 100)
	}, e.clickStory = function(e) {
		o.go("app.storyDetail", {
			id: e.id
		})
	}, e.onClickCommentLike = function(e) {
		var t = e.is_liked ? 0 : 1;
		m.likeComment({
			comment_id: e.id,
			action: t
		}, function(t) {
			0 == t.data.code && (e.is_liked ? e.like_num-- : e.like_num++, e.is_liked = !e.is_liked)
		})
	}, e.content = {
		value: ""
	}, e.replyUser = function(t, o) {
		var i = t.currentTarget.parentNode.parentNode.parentNode.querySelector('[contenteditable="true"]');
		n(function() {
			i.focus(), e.content.value = "@" + o + "  ", n(function() {
				var e, t;
				window.getSelection && document.createRange ? (t = document.createRange(), t.selectNodeContents(i), t.collapse(!0), t.setEnd(i, i.childNodes.length), t.setStart(i, i.childNodes.length), e = window.getSelection(), e.removeAllRanges(), e.addRange(t)) : document.body.createTextRange && (t = document.body.createTextRange(), t.moveToElementText(i), t.collapse(!0), t.select())
			}, 10)
		}, 300)
	}, e.onSubmitComment = function() {
		"" != e.content.value && m.comment({
			journey_id: e.id,
			content: e.content.value
		}, function(o) {
			if (0 == o.data.code) {
				var i = e.journey.comments.list,
					n = {
						id: o.data.id,
						comment: e.content.value,
						comment_time: c(new Date, "yyyy-MM-dd hh:mm:ss"),
						is_liked: !1,
						like_num: 0,
						user_id: t.user.info.user_id,
						user_name: t.user.info.user_name,
						avatar: t.user.info.avatar
					};
				i.length > 1 && i.splice(-1), i.unshift(n), e.journey.comments.num++, e.content.value = ""
			}
		})
	}, e.onClickLikeJourney = function() {
		var t = e.journey,
			o = t.is_liked ? 0 : 1;
		h.likeJourney({
			id: t.id,
			action: o
		}, function(o) {
			0 == o.data.code && (t.is_liked ? t.like_num -= 1 : t.like_num += 1, t.is_liked = !t.is_liked, e.modified = !0)
		})
	}, e.onClickCopy = function() {
		o.go("app.journeyDiy", {
			type: "copy",
			id: e.id
		})
	};
	var y = new g(e);
	y.$on("signSuccess", function() {
		m.getDetail({
			id: e.id
		}, function(t) {
			0 == t.data.code && (e.journey.is_liked = t.data.is_liked)
		})
	}), e.$on("$ionicView.afterEnter", function(t, o) {
		var i = l.get();
		"back" == o.direction && i && (e.journey.comments.list = i.slice(0, 3), e.journey.comments.num = i.length)
	})
}]).controller("journeyDiyCtrl", ["$scope", "$rootScope", "$stateParams", "$state", "$timeout", "$ionicHistory", "$ionicScrollDelegate", "$ionicPopup", "CONFIG", "viewArgument", "modal", "journeyUpdate", "resJourney", "resUser", "logicTip", function(e, t, o, i, n, a, r, s, c, l, d, u, p, m, h) {
	function g(t) {
		if (e.modified) {
			var o = "行程已修改，现在保存吗？";
			"merge" != e.type || e.saved || (o = "合并行程未保存，现在保存吗？"), JAlert.confirm(o, function() {
				e.onClickFinish()
			}, function() {
				e.modified = !1, a.goBack()
			}), t.preventDefault()
		}
	}
	var f = new u(e);
	e.$on("$destroy", function() {
		f && f.destroy()
	}), e.$emit("baseCtrl.cleanCache"), e.title = "编辑行程", e.id = o.id, e.type = o.type, e.imgSizeThumb = c.imgSizeThumb, e.modified = !1, e.saved = !1, e.journey = {}, e.cityList = [], e.expanded = [], e.adjustCity = -1, e.adjustCityData = {}, e.daysAdjust = 1, e.rename = !1, e.oldName = "", e.selectList = [], e.page = 1, e.hasMore = !0, d.createModal("joinModal", "app/journey/templates/journeySelectModal.html", "up", !1, e), e.onClickSelectModal = function() {
		d.getModal("joinModal").hide()
	};
	var y = function() {
			t.user.info.journey < 2 || (e.httpRequesting = !0, m.getMyJourney({
				page: e.page
			}, function(t) {
				if (0 == t.data.code) {
					t.data.list.length < t.data.per_num && (e.hasMore = !1);
					for (var o = 0; o < t.data.list.length; o++) t.data.list[o].id == e.journey.id && t.data.list.splice(o, 1);
					e.selectList = e.selectList.concat(t.data.list), e.httpRequesting = !1, ++e.page, h.journeyDiyMerge()
				}
				e.$broadcast("scroll.infiniteScrollComplete")
			}, function() {
				e.httpRequesting = !1
			}))
		},
		_ = function() {
			f.initCity(e.journey.nodeList), f.initCityMap(".journey-diy .map", "pale", !1)
		},
		v = function() {
			m.copyJourney({
				id: e.id
			}, function(o) {
				0 == o.data.code && (e.journey = o.data, _(), t.user.info.journey++, JAlert.notify("已复制到「我的行程」"), h.journeyDiy(), y())
			})
		};
	n(function() {
		switch (e.type) {
			case "copy":
				m.getJourneyState({
					id: e.id
				}, function(e) {
					0 == e.data.code && (e.data.num > 0 ? JAlert.confirm("已复制过该行程，是否再次复制？", function() {
						v()
					}, function() {
						a.goBack()
					}) : v())
				});
				break;
			case "modify":
				p.getPlan({
					id: e.id
				}, function(t) {
					0 == t.data.code && (e.journey = t.data, _(), h.journeyDiy(), y())
				});
				break;
			case "merge":
				e.title = "合并后行程", m.mergeJourney({
					journey_id: e.id,
					data: l.get()
				}, function(t) {
					0 == t.data.code && (e.journey = t.data, e.journey.id = e.id, e.modified = !0, _(), h.journeyDiy(), JAlert.notify("行程已合并"))
				})
		}
	}), e.getStartDatIndex = function(t) {
		for (var o = e.journey.nodeList, i = 0, n = 0; t > n; ++n) i += o[n].days;
		return i
	}, e.onClickRename = function(t) {
		if (e.rename) e.oldName != e.journey.name && (e.modified = !0);
		else {
			e.oldName = e.journey.name;
			var o = t.currentTarget.parentNode.querySelector("input");
			n(function() {
				o.focus()
			})
		}
		e.rename = !e.rename
	}, e.onClickFinish = function() {
		e.modified && m.updateJourney({
			plan_data: angular.toJson(e.journey)
		}, function(t) {
			0 == t.data.code && (JAlert.notify("行程已更新"), e.modified = !1, e.saved = !0)
		})
	}, e.onClickJoin = function() {
		d.getModal("joinModal").show()
	}, e.onClickSelect = function(t) {
		d.getModal("joinModal").hide();
		var o = {
			nodeList: angular.copy(e.journey.nodeList)
		};
		e.journey.is_current && (o.nodeList.splice(0, 1), o.nodeList.splice(-1, 1)), l.put(o), i.go("app.journeyDiy", {
			type: "merge",
			id: t
		})
	}, e.poiListToString = function(e) {
		for (var t = [], o = 0, i = e.length; i > o; ++o) t.push(e[o].name);
		return t.join("、")
	}, e.journeyReorder = function(t, o, i) {
		var n = e.journey.nodeList;
		if (0 !== i && !n[o].type && !n[i].type) {
			var a = n[o];
			n[o] = n[i], n[i] = a
		}
	}, e.onClickMap = function() {
		l.put(angular.copy(e.journey.nodeList)), i.go("app.map", {
			type: "journey"
		})
	}, e.onClickCity = function(t, o, i) {
		if (e.adjustCity != o) {
			var a = t.currentTarget.querySelector(".poi");
			e.expanded[i] = !a.classList.contains("expand"), n(function() {
				r.$getByHandle("journey-diy").resize()
			}, 300)
		}
	}, e.onClickDayAdjust = function(t) {
		if (e.adjustCity == t) e.adjustCity = -1, e.modified = !0;
		else {
			if (e.adjustCity > -1) {
				var o = e.adjustCity;
				e.onClickDayCancel(o)
			}
			e.adjustCityData = angular.copy(e.journey.nodeList[t]), e.adjustCity = t
		}
		r.$getByHandle("journey-diy").scrollBy(0, 44, !0)
	}, e.onClickDayCancel = function(t) {
		var o = e.journey.nodeList[t].poi.list,
			i = o.length;
		o.splice(0, i), e.journey.nodeList[t] = e.adjustCityData, e.adjustCity = -1
	}, e.onClickDayAdd = function(t) {
		e.journey.nodeList[t].days >= 30 ? JAlert.notify("亲，你要成为欧洲土著吗？") : (f.dayPlus(t, e.daysAdjust), r.$getByHandle("journey-diy").scrollBy(0, 32, !0))
	}, e.onClickDayRemove = function(e, t) {
		f.dayMinus(e, t), r.$getByHandle("journey-diy").scrollBy(0, -32, !0)
	}, e.onClickPoiAdjust = function(e) {
		l.put([angular.copy(f.getCity(e))]), i.go("app.map", {
			type: "journey"
		})
	};
	var w = e.page;
	e.loadMore = function() {
		w < e.page && e.hasMore && (w = e.page, y())
	}, t.user.isIOS && e.$on("view.dragBack.start", g), e.$on("$stateChangeStart", function(e, t) {
		t.name === a.backView().stateName && g(e)
	}), e.$on("$ionicView.beforeLeave", function(t, o) {
		"forward" != o.direction && (!e.saved || "modify" != e.type && "merge" != e.type || l.put({
			modified: !0,
			name: e.journey.name,
			totalDay: e.journey.journeyDays,
			cityNum: e.cityList.length
		}))
	}), e.$on("$ionicView.afterEnter", function(t, o) {
		if ("forward" != o.direction) {
			var i = l.get();
			i && (i.modified ? e.saved = !0 : i.length > 0 && (f.updateJourney(i), e.modified = !0))
		}
	})
}]).controller("journeyTrafficSelectCtrl", ["$scope", "$ionicHistory", "$stateParams", "viewArgument", function(e, t, o, i) {
	e.nowNode = i.get(), e.nodeSelectList = [{
		id: 1,
		type: "plane",
		from: "浦东机场",
		to: "巴黎机场",
		begin: new Date("2015-03-26 7:20"),
		end: new Date("2015-03-26 19:20"),
		hours: 12,
		transit: "直达",
		number: "AF111",
		company: "法国航空",
		price: 2800
	}, {
		id: 2,
		type: "plane",
		from: "浦东机场",
		to: "巴黎机场",
		begin: new Date("2015-03-26 8:20"),
		end: new Date("2015-03-26 20:20"),
		hours: 12,
		transit: "北京中转",
		number: "AF311 - AF192",
		company: "法国航空",
		price: 2500
	}], e.selectedId = e.nowNode.traffic.id;
	var n = null;
	e.select = function() {
		i.put(n ? n : e.nowNode.traffic), t.goBack()
	}, e.checked = function(e) {
		n = e
	}
}]).controller("journeyHotelSelectCtrl", ["$scope", "$ionicHistory", "$stateParams", "viewArgument", function(e, t, o, i) {
	e.nowNode = i.get(), e.nodeSelectList = [{
		id: 1,
		name: "美丽迪奥纳酒店",
		localName: "abc",
		star: 3,
		price: 480,
		des: "市中心 / 交通便利"
	}, {
		id: 2,
		name: "美丽迪酒店",
		localName: "def",
		star: 4,
		price: 500,
		des: "市中心"
	}], e.selectedId = e.nowNode.hotel.id;
	var n = e.nowNode.hotel;
	e.select = function() {
		i.put(n), t.goBack()
	}, e.checked = function(e) {
		n = e
	}
}]).controller("journeyPoiEditCtrl", ["$scope", "$ionicHistory", "$state", "$stateParams", "viewArgument", function(e, t, o, i, n) {
	e.nowNode = n.get(), e.selectedPoi = [
		[{
			id: 1,
			type: "spot",
			name: "卢浮宫",
			img: "test.png",
			price: 120,
			person: 3600
		}, {
			id: 2,
			type: "spot",
			name: "凯旋门",
			img: "test.png",
			price: 0,
			person: 3600
		}],
		[{
			id: 3,
			type: "spot",
			name: "铁塔",
			img: "test.png",
			price: 120,
			person: 3600
		}, {
			id: 4,
			type: "spot",
			name: "凯旋门",
			img: "test.png",
			price: 0,
			person: 3600
		}]
	], e.selectedPoi.allId = [1, 2, 3, 4];
	var a, r;
	e.addPoi = function(t) {
		a = n.put(e.selectedPoi.allId), r = t, o.go("app.journeyPoiAdd", {
			uuid: a
		})
	}, e.$on("$ionicView.beforeEnter", function() {
		if (a && r) {
			n.get()
		}
	}), e.reOrder = function(t) {
		e.showReorder[t] = !e.showReorder[t]
	}, e.showReorder = [], e.movePoi = function(t, o, i, n) {
		e.selectedPoi[o].splice(i, 1), e.selectedPoi[o].splice(n, 0, t)
	}, e.deletePoi = function(t, o, i) {
		e.selectedPoi[o].splice(i, 1);
		var n = e.selectedPoi.allId.indexOf(t.id); - 1 !== n && e.selectedPoi.allId.splice(n, 1)
	}
}]).controller("journeyPoiAdd", ["$scope", "$state", "$stateParams", "$ionicHistory", "viewArgument", "$timeout", function(e) {
	e.tabs = [{
		id: 0,
		name: "收藏"
	}, {
		id: 1,
		name: "景点"
	}, {
		id: 2,
		name: "餐饮"
	}, {
		id: 3,
		name: "购物"
	}], e.tabs.selectIndex = 0, e.tabs.select = function(e) {
		this.selectIndex = e
	}, e.list = [{
		id: 1,
		type: "spot",
		name: "卢浮宫",
		img: "test.png",
		price: 120,
		person: 3600,
		distance: .5
	}, {
		id: 2,
		type: "spot",
		name: "凯旋门",
		img: "test.png",
		price: 0,
		person: 3600,
		distance: 1
	}]
}]), angular.module("app.journey", ["app.journey.controller", "app.journey.service", "app.journey.route"]), angular.module("app.journey.route", []).config(["$stateProvider", "$urlRouterProvider", "$locationProvider", "PERMISSIONS", function(e, t, o, i) {
	o.html5Mode(!1), t.otherwise("/journeyHome"), e.state("app.journeyHome", {
		url: "/journeyHome",
		cache: !0,
		templateUrl: "app/journey/templates/journeyHome.html",
		controller: "journeyHomeCtrl"
	}).state("app.journeyList", {
		url: "/journeyList/:type/:option/:filter/:title",
		cache: !0,
		templateUrl: "app/journey/templates/journeyList.html",
		controller: "journeyListCtrl"
	}).state("app.journeyDetail", {
		url: "/journeyDetail/:id",
		cache: !0,
		templateUrl: "app/journey/templates/journeyDetail.html",
		controller: "journeyDetailCtrl"
	}).state("app.journeyDiy", {
		url: "/journeyDiy/:type/:id/",
		cache: !0,
		templateUrl: "app/journey/templates/journeyDiy.html",
		controller: "journeyDiyCtrl",
		data: {
			permission: i.needSignIn
		}
	})
}]), angular.module("app.journey.service", []).factory("journeyTransfer", ["currentScope", function() {
	function e(e) {
		this.scope = e
	}
	return e.prototype.initList = function(e) {
		var t = this.scope,
			o = 0,
			i = 0,
			n = 0;
		angular.forEach(e, function(e) {
			if (e.poi) {
				t.pointList.city.push({
					id: e.id,
					type: "city",
					name: e.name,
					lat: e.lat,
					lng: e.lng,
					days: e.days,
					poi_num: 0,
					story_num: 0
				});
				var a = 0,
					r = 0;
				angular.forEach(e.poi.list, function(t) {
					var o = 0;
					n += .5 == e.days ? .5 : 1, angular.forEach(t, function(e) {
						o += e.story_num
					}), angular.extend(t, {
						city_id: e.id,
						city_name: e.name,
						dayIndex: n,
						poi_num: t.length,
						story_num: o
					}), a += t.length, r += o
				}), t.pointList.journey = t.pointList.journey.concat(e.poi.list);
				var s = t.pointList.city.slice(-1)[0];
				s.poi_num = a, s.story_num = r, o += s.poi_num, i += s.story_num
			}
		}), t.pointList.journey.poi_num = o, t.pointList.journey.story_num = i
	}, e.prototype.initOfflineList = function(e, t) {
		var o = this.scope,
			i = 0,
			n = 0,
			a = 0;
		angular.forEach(e, function(e) {
			if (e.poi && e.id == t) {
				var r = 0,
					s = 0;
				angular.forEach(e.poi.list, function(t) {
					var o = 0;
					a += .5 == e.days ? .5 : 1, angular.forEach(t, function(e) {
						o += e.story_num
					}), angular.extend(t, {
						city_id: e.id,
						city_name: e.name,
						dayIndex: a,
						poi_num: t.length,
						story_num: o
					}), r += t.length, s += o
				}), o.pointList.journey = o.pointList.journey.concat(e.poi.list);
				var c = o.pointList.city[0];
				c.poi_num = r, c.story_num = s, i += c.poi_num, n += c.story_num
			}
		}), o.pointList.journey.poi_num = i, o.pointList.journey.story_num = n
	}, e.prototype.loadCatList = function(e, t) {
		var o = this.scope,
			i = [],
			n = [],
			a = "mark" != t;
		if (a) angular.forEach(o.pointList.mark, function(e) {
			n.push(e.id)
		});
		else {
			var r = "";
			angular.forEach(o.pointList.city, function(e) {
				r += "" == r ? e.id : "," + e.id
			});
			var s = [];
			if (angular.forEach(e, function(e) {
					-1 != r.indexOf(e.city_id) && s.push(e)
				}), e = s, 0 == e.length) return
		}
		angular.forEach(o.pointList.journey, function(e) {
			angular.forEach(e, function(e) {
				i.push(e.id)
			})
		}), e.poiInJourney = [], e.poiInMark = [];
		for (var c = 0; c < e.length; c++) e[c].isJourney = i.indexOf(e[c].id) > -1, e[c].isMarked = a ? n.indexOf(e[c].id) > -1 : !0, e[c].isJourney && e.poiInJourney.push({
			id: e[c].id,
			index: c
		}), a && e[c].isMarked && e.poiInMark.push({
			id: e[c].id,
			index: c
		});
		o.pointList[t] = e
	}, e.prototype.updateJourneyIndex = function(e, t, o, i) {
		var n = this.scope,
			a = n.pointList[t].poiInJourney;
		if (void 0 != a)
			if ("add" == e) a.push({
				id: o,
				index: i
			});
			else if ("del" == e)
			for (var r = 0; r < a.length; r++)
				if (a[r].id == o) {
					a.splice(r, 1);
					break
				}
	}, e.prototype.updateMarkIndex = function(e, t, o, i) {
		var n = this.scope,
			a = n.pointList[t].poiInMark;
		if (void 0 != a)
			if ("add" == e) a.push({
				id: o,
				index: i
			});
			else if ("del" == e)
			for (var r = 0; r < a.length; r++)
				if (a[r].id == o) {
					a.splice(r, 1);
					break
				}
	}, e.prototype.updateJourney = function(e, t, o) {
		var i = this.scope,
			n = i.pointList.journey[t].city_id,
			a = this.getCity(n);
		"add" == e ? (i.pointList.journey[t].poi_num += 1, i.pointList.journey[t].story_num += o.story_num, a.poi_num += 1, a.story_num += o.story_num, i.activeCity.poi_num += 1, i.activeCity.story_num += o.story_num, i.pointList.journey.poi_num += 1, i.pointList.journey.story_num += o.story_num) : "del" == e && (i.pointList.journey[t].poi_num -= 1, i.pointList.journey[t].story_num -= o.story_num, a.poi_num -= 1, a.story_num -= o.story_num, i.activeCity.poi_num -= 1, i.activeCity.story_num -= o.story_num, i.pointList.journey.poi_num -= 1, i.pointList.journey.story_num -= o.story_num), i.$apply(function() {
			i.updateTitle(t)
		})
	}, e.prototype.addToJourney = function(e, t, o) {
		var i = this.scope;
		if (!isNaN(e))
			if (t.isJourney = !0, i.pointList.journey[e].push(t), this.updateJourney("add", e, t), t.isMarked) {
				this.updateJourneyIndex("add", "mark", t.id, o);
				var n = this.getMarkPoiIndex(t.type, t.id);
				if (null != n) {
					var a = i.pointList[t.type][n];
					a.isJourney = !0, this.updateJourneyIndex("add", a.type, a.id, n)
				}
			} else this.updateJourneyIndex("add", t.type, t.id, o)
	}, e.prototype.moveInJourney = function(e, t, o) {
		var i = this.scope;
		if (!isNaN(o)) {
			var n = this.getIndexOfJourney(t, e),
				a = i.pointList.journey[t][n];
			i.pointList.journey[t].splice(n, 1), i.pointList.journey[o].push(a), this.updateJourney("del", t, a), this.updateJourney("add", o, a)
		}
	}, e.prototype.removeFromJourney = function(e, t) {
		var o = this.scope;
		if (!isNaN(e)) {
			var i = this.getIndexOfJourney(e, t),
				n = o.pointList.journey[e][i];
			o.pointList.journey[e].splice(i, 1), this.updateJourney("del", e, n);
			var a = this.getJourneyPoiIndex("mark", n.id);
			null != a && (this.updateJourneyIndex("del", "mark", n.id), o.pointList.mark[a].isJourney = !1, o.pointList.mark[a].isMarked = !0);
			var r = this.getJourneyPoiIndex(n.type, n.id);
			null != r && (this.updateJourneyIndex("del", n.type, n.id), o.pointList[n.type][r].isJourney = !1);
			var s = {};
			return null != a ? (s.isMarked = !0, s.index = a) : (s.isMarked = !1, s.index = r), s
		}
	}, e.prototype.getJourneyPoiIndex = function(e, t) {
		var o = this.scope,
			i = null;
		if (o.pointList[e] && o.pointList[e].length > 0)
			for (var n = o.pointList[e].poiInJourney, a = 0; a < n.length; a++)
				if (n[a].id == t) {
					i = n[a].index;
					break
				}
		return i
	}, e.prototype.getMarkPoiIndex = function(e, t) {
		var o = this.scope,
			i = null;
		if (o.pointList[e] && o.pointList[e].length > 0)
			for (var n = o.pointList[e].poiInMark, a = 0; a < n.length; a++)
				if (n[a].id == t) {
					i = n[a].index;
					break
				}
		return i
	}, e.prototype.markPoi = function(e, t, o) {
		var i = this.scope,
			n = function(e) {
				for (var o = null, n = 0; n < e.length; n++)
					if (e[n].id == t) {
						e[n].isMarked = !0, i.pointList.mark.push(e[n]), o = n;
						break
					}
				return o
			};
		list = i.pointList.journey[o];
		var a = n(list);
		null != a && (list[a].isMarked = null, this.updateJourneyIndex("add", "mark", t, i.pointList.mark.length - 1)), i.pointList[e].length > 0 && (list = i.pointList[e], a = n(list), null != a && this.updateMarkIndex("add", e, t, a))
	}, e.prototype.cancelMark = function(e, t) {
		for (var o = this.scope, i = o.pointList.mark, n = 0; n < i.length; n++)
			if (i[n].id == t) {
				i.splice(n, 1);
				break
			}
		var a = this.getMarkPoiIndex(e, t);
		null != a && (o.pointList[e][a].isMarked = !1, this.updateMarkIndex("del", e, t, a))
	}, e.prototype.getIndexOfJourney = function(e, t) {
		for (var o = this.scope, i = o.pointList.journey[e], n = null, a = 0; a < i.length; a++)
			if (i[a].id == t) {
				n = a;
				break
			}
		return n
	}, e.prototype.getIndexOfMark = function(e) {
		for (var t = this.scope, o = t.pointList.mark, i = null, n = 0; n < o.length; n++)
			if (o[n].id == e) {
				i = n;
				break
			}
		return i
	}, e.prototype.getCity = function(e) {
		for (var t = this.scope, o = t.pointList.city, i = null, n = 0; n < o.length; n++)
			if (o[n].id == e) {
				i = o[n];
				break
			}
		return i
	}, e.prototype.getFirstDayOfCity = function(e) {
		for (var t = this.scope, o = 0, i = t.pointList.journey; o < i.length && i[o].city_id != e; o++);
		return o
	}, e.prototype.destroy = function() {
		this.scope = null
	}, e
}]).factory("journeyUpdate", ["viewElement", "map", "CONFIG", function(e, t, o) {
	function i(e) {
		this.cScope = e
	}
	return i.prototype.initCity = function(e) {
		var t = this.cScope;
		t.journey.journeyDays = 0, t.journey.poi_num = 0, t.journey.story_num = 0, angular.forEach(e, function(e) {
			e.poi && (t.cityList.push({
				id: e.id,
				type: "city",
				name: e.name,
				lat: e.lat,
				lng: e.lng,
				poiNum: e.poi.count,
				storyNum: e.poi.story_num
			}), t.journey.journeyDays += e.days, t.journey.poi_num += e.poi.count, t.journey.story_num += e.poi.story_num)
		})
	}, i.prototype.initCityMap = function(o, i, n) {
		var a = this.cScope,
			r = {
				lat: 50.984768,
				lng: 11.02988
			},
			s = e.current().querySelector(o);
		a.mapOverview = t.createMap(s, r, 4, i, !1, !1, {
			minZoom: 4,
			maxZoom: 6,
			draggable: n || !1,
			disableDoubleClickZoom: !0,
			mapTypeId: "terrain"
		}), a.mapOverview.showLines(a.cityList, "#ec898c"), a.cityList.length < 3 && a.mapOverview.showMarkers(a.cityList, "city", !0, !1)
	}, i.prototype.initCityStaticMap = function(i) {
		var n = e.current().querySelector(i),
			a = Math.floor(1.5 * (o.devWidth - 20)) + "x300",
			r = t.createStaticMap(6, a, this.cScope.cityList);
		n.innerHTML = '<img class="img-responsive" src="' + r + '"/>'
	}, i.prototype.getCity = function(e) {
		for (var t = this.cScope, o = t.journey.nodeList, i = null, n = 0; n < o.length; n++)
			if (o[n].id == e) {
				i = o[n];
				break
			}
		return i
	}, i.prototype.dayPlus = function(e, t) {
		var o = this.cScope,
			i = o.journey.nodeList[e];
		if (1 == t || i.days % 1 == 0) {
			var n = [];
			i.poi.list.push(n)
		}
		i.days += t, o.journey.journeyDays += t
	}, i.prototype.dayMinus = function(e, t) {
		var o = this.cScope,
			i = o.journey.nodeList[e];
		t + 1 == i.poi.list.length && i.days % 1 == .5 ? (i.days -= .5, o.journey.journeyDays -= .5) : (i.days -= 1, o.journey.journeyDays -= 1), i.poi.list[t].length > 0 && angular.forEach(i.poi.list[t], function(e) {
			--i.poi.count, i.poi.story_num -= e.story_num
		}), i.poi.list.splice(t, 1)
	}, i.prototype.updateJourney = function(e) {
		var t = this.cScope,
			o = "",
			i = {},
			n = this,
			a = 0,
			r = 0,
			s = 0,
			c = 0;
		angular.forEach(e, function(e) {
			e.city_id != o && (i = n.getCity(e.city_id), i.poi.list = [], a = 0, r = 0, o = e.city_id), a += e.poi_num, r += e.story_num, s += a - i.poi.count, c += r - i.poi.story_num, i.poi.count = a, i.poi.story_num = r, delete e.city_id, delete e.city_name, delete e.poi_num, delete e.story_num, i.poi.list.push(e)
		}), t.journey.poi_num += s, t.journey.story_num += c
	}, i.prototype.destroy = function() {
		this.cScope = null
	}, i
}]), angular.module("app.map.controller", []).controller("mapHomeCtrl", ["$scope", "$rootScope", "$ionicHistory", "$ionicScrollDelegate", "$state", "$timeout", "$http", "$cordovaFile", "$cordovaFileTransfer", "$cordovaNetwork", "$q", "viewArgument", "cacheLocal", "resMap", "resUser", function(e, t, o, i, n, a, r, s, c, l, d, u, p, m, h) {
	var g;
	g = window.cordova ? t.user.isIOS ? cordova.file.cacheDirectory : t.user.isAndroid ? cordova.file.applicationStorageDirectory + "databases/" : cordova.file.tempDirectory : "", e.firstEnter = !0;
	var f = p.system.get("maps") || [];
	f.length > 0 && (e.firstEnter = !1);
	var y = [];
	e.maplist = f, e.downloadingArray = [], e.downloadedArray = [];
	var _ = function(t) {
			"2" == e.maplist[t].status.downloadStatus && (e.maplist[t].status.downloadStatus = "3"), -1 !== ["3", "5"].indexOf(e.maplist[t].status.downloadStatus) && -1 === e.downloadingArray.indexOf(e.maplist[t].id) && e.downloadingArray.push(e.maplist[t].id), -1 !== ["1"].indexOf(e.maplist[t].status.downloadStatus) && -1 === e.downloadedArray.indexOf(e.maplist[t].id) && e.downloadedArray.push(e.maplist[t].id)
		},
		v = function(t) {
			s.checkFile(g, e.maplist[t].id + ".db").then(function(o) {
				o.file(function(o) {
					e.maplist[t].size == o.size ? e.maplist[t].status.downloadStatus = "1" : e.maplist[t].status.length = o.size, -1 !== y.indexOf(e.maplist[t].city) && (e.maplist[t].sort = -100 + y.indexOf(e.maplist[t].city))
				})
			})
		},
		w = function(t, o) {
			t && t.length && (e.maplist = t);
			for (var i = 0; i < e.maplist.length; i++) o[i] || (o[i] = {}, "PAR" === e.maplist[i].city && (o[i].status = {
				length: 0,
				downloadStatus: "5"
			}, e.downloadingArray.push(e.maplist[i].id))), e.maplist[i].poi_num = o[i].poi_num, e.maplist[i].marker_num = o[i].marker_num, e.maplist[i].status = o[i].status || {
				length: 0,
				downloadStatus: "0"
			}, _(i), v(i)
		},
		S = function() {
			m.getOffline({}, function(e) {
				0 == e.data.code && w(e.data.list, f)
			})
		};
	e.addCity = function() {
		u.put(e.maplist), n.go("app.mapAdd")
	}, e.onClickCity = function(e) {
		n.go("app.map", {
			type: "offline",
			uuid: e
		})
	};
	var b = i.$getByHandle("map-home");
	e.onDeleteDownloading = function(t) {
		e.firstEnter && (e.firstEnter = !1), e.deleteMap(t), p.system.remove("poi." + t.id), p.system.remove("journey." + t.id), p.system.remove("mark." + t.id), -1 !== e.downloadedArray.indexOf(t.id) && e.downloadedArray.splice(e.downloadedArray.indexOf(t.id), 1), -1 !== e.downloadingArray.indexOf(t.id) && e.downloadingArray.splice(e.downloadingArray.indexOf(t.id), 1), a(function() {
			b.resize()
		}, 300)
	}, e.addToDownload = function(t) {
		for (var o = !1, i = 0; i < e.maplist.length; i++) - 1 !== t.indexOf(e.maplist[i].id) && "0" == e.maplist[i].status.downloadStatus && (e.maplist[i].status.downloadStatus = "5", o = !0);
		o && k(e.maplist)
	};
	var k = function(t, o) {
		if (t) {
			var i = !1;
			e.maplist = t;
			for (var n = 0; n < e.maplist.length; n++)("2" == e.maplist[n].status.downloadStatus || "3" == e.maplist[n].status.downloadStatus) && (i = !0), -1 !== ["2", "3", "5"].indexOf(e.maplist[n].status.downloadStatus) && -1 === e.downloadingArray.indexOf(e.maplist[n].id) && e.downloadingArray.push(e.maplist[n].id), -1 !== ["1"].indexOf(e.maplist[n].status.downloadStatus) && -1 === e.downloadedArray.indexOf(e.maplist[n].id) && e.downloadedArray.push(e.maplist[n].id);
			i || e.download(o)
		}
	};
	e.existsInArray = function(t) {
		try {
			for (var o = 0; o < e.maplist.length; o++)
				if (-1 !== t.indexOf(e.maplist[o].status.downloadStatus)) return !0
		} catch (i) {
			return !1
		}
		return !1
	}, e.$watch("maplist", function(e) {
		e && p.system.put("maps", e)
	}, !0), e.$on("$ionicView.beforeEnter", function() {
		if (y = u.get() || [], 0 == e.maplist.length) S();
		else {
			for (var t = 0, o = 0; o < e.maplist.length; o++) y && -1 !== y.indexOf(e.maplist[o].city) && (++t, e.maplist[o].status.downloadStatus = "5"), -1 !== ["2", "3", "5"].indexOf(e.maplist[o].status.downloadStatus) && -1 === e.downloadingArray.indexOf(e.maplist[o].id) && e.downloadingArray.push(e.maplist[o].id), -1 !== ["1"].indexOf(e.maplist[o].status.downloadStatus) && -1 === e.downloadedArray.indexOf(e.maplist[o].id) && e.downloadedArray.push(e.maplist[o].id);
			t > 0 && JAlert.notify(t + "个城市已加入下载列表")
		}
	});
	var $ = function(t) {
		for (var o = !1, i = 0; i < e.maplist.length; i++)
			if ("2" == e.maplist[i].status.downloadStatus && (o = !0, t && e.maplist[i].id == t.id)) return e.maplist[i];
		if (!o)
			for (var i = 0; i < e.maplist.length; i++)
				if (-1 !== ["2", "3", "5"].indexOf(e.maplist[i].status.downloadStatus)) return t || e.maplist[i]
	};
	e.deleteMap = function(e) {
		e.status && "2" == e.status.downloadStatus && e.status.downloader && e.status.downloader.abort && e.status.downloader.abort(), a(function() {
			s.removeFile(g, e.id + ".db").then(function() {
				JAlert.notify("删除成功！")
			}), e.status.downloadStatus = "0", e.status.length = 0
		}, 300)
	}, e.stopDownload = function(e) {
		return "2" == e.status.downloadStatus ? (e.status.downloader && e.status.downloader.abort && e.status.downloader.abort(), e.status.downloadStatus = "3", !0) : !1
	}, t.$watch("user.networkState", function(t, o) {
		var i = !1,
			n = !1;
		if (e.maplist) {
			for (var a = 0; a < e.maplist.length; a++) "2" == e.maplist[a].status.downloadStatus && (i = !0), -1 !== ["2", "3", "4"].indexOf(e.maplist[a].status.downloadStatus) && (n = !0);
			i && "wifi" == o && "cellular" == t && JAlert.confirm("当前网络为3G/4G，是否继续下载离线地图？", function() {
				e.download(!0)
			}, function() {}), n && ("wifi" != t && "cellular" != t || "none" != o || JAlert.notify("当前网络正常，请点击开始下载！"))
		}
	}), t.$on("$cordovaNetwork:offline", function() {
		for (var t = 0; t < e.maplist.length; t++)
			if (map && "2" == map.status.downloadStatus) {
				map = $(), e.stopDownload(map);
				break
			}
	}), e.openMap = function(e) {
		"1" == e.status.downloadStatus && e.status.length === e.size && n.go("app.map", {
			type: "offline",
			uuid: e.id
		}), window.cordova || n.go("app.map", {
			type: "offline",
			uuid: e.id
		})
	}, e.download = function(o, i) {
		if ($(i) && (map = $(i), !e.stopDownload(map))) {
			var n = function() {
				"EU" !== map.city && (m.getPoiByRange({
					r0: map.range[0],
					r1: map.range[1],
					r2: map.range[2],
					r3: map.range[3]
				}, function(e) {
					0 == e.data.code && (p.system.put("poi." + map.id, e.data.list), map.poi_num = e.data.list.length)
				}), t.user.isSigned && (h.getCurJourney({
					city: map.city,
					silence: !0
				}, function(e) {
					0 == e.data.code && p.system.put("journey." + map.id, e.data)
				}), h.getMark({
					city: map.city,
					silence: !0
				}, function(e) {
					0 == e.data.code && (p.system.put("mark." + map.id, e.data.list), map.marker_number = e.data.list.length)
				}))), map.status.downloadStatus = "2";
				var o = function(t) {
					map.status.downloader = c.download(map.database_url + "?_=" + (new Date).getTime(), g + map.id + ".db", {
						headers: {
							Range: "bytes=" + t + "-" + (map.size - 1)
						}
					}), map.status.downloader.then(function(t) {
						t.file(function() {}), map.status.downloadStatus = "1", e.downloadingArray.splice(e.downloadingArray.indexOf(map.id), 1), k(e.maplist)
					}, function(e) {
						4 == e.code ? map.status.downloadStatus = "3" : 3 == e.code ? map.status.downloadStatus = "3" : JAlert.notify("下载出错，请删除重新下载")
					}, function(e) {
						ionic.requestAnimationFrame(function() {
							map.status.length = t + e.loaded
						})
					})
				};
				s.checkFile(g, map.id + ".db").then(function(e) {
					e.file(function(e) {
						map.status.length = e.size, o(e.size)
					})
				}, function(e) {
					console.log(e), o(0)
				})
			};
			o ? n() : "cellular" == t.user.networkState ? JAlert.confirm("当前网络为3G/4G，是否继续下载？", function() {
				n()
			}, function() {}) : "none" == t.user.networkState ? JAlert.notify("当前网络异常，无法下载！") : "wifi" == t.user.networkState && n()
		}
	}
}]).controller("routeCtrl", ["$scope", "$rootScope", "$stateParams", "map", function(e, t, o, i) {
	e.$on("$ionicView.beforeLeave", function() {
		document.getElementById("map").innerHTML = ""
	}), e.initialize = function() {
		i.routeTo(null, {
			la: o.lat,
			ln: o.lng
		}, "walking")
	}
}]).controller("mapGeneralCtrl", ["$scope", "$rootScope", "$state", "$stateParams", "$timeout", "$cordovaSQLite", "$cordovaGeolocation", "currentScope", "cacheLocal", "viewArgument", "map", "utils", "journeyTransfer", "viewElement", "$cordovaKeyboard", "resJourney", "resPoi", "resUser", "logicTip", function(e, t, o, i, n, a, r, s, c, l, d, u, p, m, h, g, f, y, _) {
	e.$emit("baseCtrl.cleanCache");
	var v = {
			lat: 50.984768,
			lng: 11.02988
		},
		w = null,
		S = new p(e);
	e.flipShow = !1, e.flipped = !1, e.mapType = i.type, e.activeCity = {}, e.modified = !1, e.keyBack = i.uuid, e.keyForward = 0, e.search = {
		key: ""
	}, e.readOnly = !1, e.pointCat = {
		city: "城市",
		journey: "行程",
		mark: "收藏",
		AT: "景点",
		RS: "美食",
		SH: "购物",
		SM: "活动",
		TL: "公厕",
		HT: "酒店"
	}, e.pointList = {
		city: [],
		journey: [],
		mark: [],
		AT: [],
		RS: [],
		SH: [],
		SM: [],
		TL: [],
		HT: [],
		search: []
	}, e.day = {
		shown: !1,
		activeDay: "all"
	}, e.widget = {
		expanded: !1,
		shown: !1,
		selected: null
	}, e.drag = {
		isDragging: !1,
		isJourney: !1,
		elemId: ""
	}, m.current().querySelector(".map").addEventListener("touchstart", function() {
		e.$apply(function() {
			"search" === e.widget.selected && (document.activeElement.blur(), window.cordova && h.isVisible() && h.close(), e.onClickMapWidget("search"))
		})
	}, !0);
	var b = {},
		k = null,
		$ = {};
	switch (i.type) {
		case "journey":
			if (b = l.get(), void 0 == b) return;
			b.readOnly && (e.readOnly = !0), k = function() {
				S.initList(b), s.ready(e, function() {
					$ = m.current().querySelector(".front .map"), w = d.createMap($, v, 4, "simple", !1, !0, {
						minZoom: 4,
						maxZoom: 18
					}), w.setMapLocalType(null), !e.readOnly && e.pointList.journey.length > 1 && _.mapJourney();
					var t = e.pointList.city.length;
					t > 1 ? e.onClickDay("all") : 1 == t && e.onClickDay(0, e.pointList.city[0].id)
				})
			}, b.journey_id ? g.getPlan({
				id: b.journey_id
			}, function(e) {
				0 == e.data.code && (b = e.data.nodeList, k())
			}) : k(), t.user.isSigned && y.getMark({}, function(e) {
				0 == e.data.code && e.data.list.length > 0 && S.loadCatList(e.data.list, "mark")
			}), e.day.shown = !0;
			break;
		case "offline":
			var x = c.system.get("maps"),
				P = null;
			e.flipShow = !0, angular.forEach(x, function(e) {
				e.id == i.uuid && (P = e)
			}), e.title = P.city_name, e.activeCity.id = P.city, e.pointList.city.push({
				id: P.city,
				type: "city",
				name: P.city_name
			});
			var C = c.system.get("mark." + P.id);
			b = c.system.get("journey." + P.id), b && b.nodeList.length > 0 && S.initOfflineList(b.nodeList, P.city), C && C.length > 0 && S.loadCatList(C, "mark"), angular.forEach(c.system.get("poi." + P.id), function(t) {
				"undefined" != typeof e.pointList[t.type] && e.pointList[t.type].push(t)
			}), e.widget.shown = !0, e.day.shown = !0, k = function() {
				n(function() {
					w && w.destroy(), $ = {}, v = {
						lat: (P.range[3] - P.range[1]) / 2 + P.range[1],
						lng: (P.range[2] - P.range[0]) / 2 + P.range[0]
					}, e.flipped ? (e.mapType = "online", $ = m.current().querySelector(".back .map"), w = d.createMap($, v, P.min_zoom, "simple", !1, !0, {
						minZoom: 10,
						maxZoom: P.max_zoom
					}), w.showMarkers(e.pointList.AT, "AT", !0, !1), w.setMapLocalType(null)) : (e.mapType = "offline", $ = m.current().querySelector(".front .map"), w = d.createMap($, v, P.min_zoom, "simple", !0, !0, {
						minZoom: P.min_zoom,
						maxZoom: P.max_zoom
					}), w.setMapLocalType(P), w.showMarkers(e.pointList.AT, "AT", !0, !1)), e.getLocation = function(e) {
						w.getLocation(e.currentTarget, P.range)
					}
				}, 500)
			}, s.ready(e, function() {
				k()
			}), e.onClickFlip = function() {
				e.flipped = !e.flipped, k()
			}
	}
	e.updateTitle = function(t) {
		if ("all" == t) e.title = "<span>" + e.pointList.city.length + "城市</span><span>" + e.pointList.journey.poi_num + "兴趣点 - " + e.pointList.journey.story_num + "故事</span>";
		else {
			var o = e.pointList.journey[t],
				i = "",
				n = e.pointList.journey[t].dayIndex,
				a = t > 0 ? e.pointList.journey[t - 1].dayIndex : 0;
			i = n.toFixed() - n > 0 ? n.toFixed() + " AM" : a.toFixed() - a > 0 ? n.toFixed() + " PM" : n.toFixed(), e.title = "<span>" + e.activeCity.name + " - D" + i + "</span><span>" + o.poi_num + "兴趣点, " + o.story_num + "故事</span>"
		}
	}, e.onClickDay = function(t, o) {
		if (e.day.activeDay != t && (e.widget.selected = null), e.day.activeDay = t, w.clearMarkers("all"), w.closeInfo(), move(w.getElem()).duration("0").set("opacity", "0.1").then().duration("1s").set("opacity", "1").pop().end(), "all" == t) e.widget.shown = !1, w.showMarkers(e.pointList.city, "city", !0, !1), w.showLines(e.pointList.city, "#FF585B");
		else {
			var i = S.getCity(o);
			e.activeCity = {
				id: e.pointList.journey[t].city_id,
				name: e.pointList.journey[t].city_name,
				poi_num: i.poi_num,
				story_num: i.story_num
			}, e.widget.shown = !0, e.widget.expanded = !1, w.clearLines(), e.pointList.journey[t].length > 0 && (w.showMarkers(e.pointList.journey[t], "journey", !0, !e.readOnly), "offline" != e.mapType && _.mapDrag(w)), e.readOnly || _.mapWidget()
		}
		e.updateTitle(t)
	}, e.onClickBubble = function(e, t, i, n) {
		"city" != i && (u.isEmpty(t) || o.go("app.poiDetail", {
			id: t,
			title: n
		}), e.stopPropagation())
	}, e.showMessage = function() {
		JAlert.notify("请切换至在线地图查看！")
	}, e.onClickMap = function() {
		w.closeInfo()
	}, e.searchPoi = function() {
		n(function() {
			var t = e.search.key.replace(/(^\s*)|(\s*$)/g, "");
			"" != t && (w.closeInfo(), w.clearMarkers("all"), e.pointList.search = [], f.search({
				key_word: t,
				city: e.activeCity.id
			}, function(t) {
				0 == t.data.code && (t.data.list && t.data.list.length > 0 ? (e.onClickMapWidget("search"), e.pointList.search = t.data.list, w.showMarkers(e.pointList.search, "search", !0, !e.readOnly)) : JAlert.notify("未找到「" + e.search.key + "」"))
			}))
		})
	}, e.onClickMapWidget = function(t, o) {
		switch (w.closeInfo(), t) {
			case "search":
				if (arguments.callee.t && n.cancel(arguments.callee.t), e.search.key = "", e.pointList.search = [], e.widget.selected != t) {
					e.widget.selected = t;
					var a = m.current().querySelector("#search");
					arguments.callee.t = n(function() {
						a.focus()
					}, 300)
				} else m.current().querySelector("#search").blur(), e.widget.selected = null;
				break;
			case "more":
				e.widget.expanded = !e.widget.expanded;
				break;
			default:
				if (w.clearMarkers("other"), e.widget.selected != t)
					if (e.widget.selected = t, 0 == e.pointList[t].length && "offline" !== i.type) "mark" == t ? JAlert.notify("未收藏兴趣点") : f.searchByType({
						city: e.activeCity.id,
						type: t
					}, function(i) {
						0 == i.data.code && (0 == i.data.list.length ? JAlert.notify("暂无" + e.pointCat[t] + "数据") : (JAlert.notify("已加载" + i.data.list.length + "个" + o), S.loadCatList(i.data.list, t), w.showMarkers(e.pointList[t], t, !0, !e.readOnly)))
					});
					else if ("mark" == t) {
					var r = [];
					angular.forEach(e.pointList[t], function(t) {
						t.city_id == e.activeCity.id && r.push(t)
					}), w.showMarkers(r, t, !0, !e.readOnly)
				} else w.showMarkers(e.pointList[t], t, !0, !e.readOnly);
				else e.widget.selected = null
		}
	}, e.$on("$ionicView.afterEnter", function(t, o) {
		if ("forward" != o.direction) {
			var i = l.get(),
				n = {};
			i && (1 == i.is_marked ? (S.markPoi(i.type, i.id, e.day.activeDay), n = w.getMarkerById(i.id), n && (n.isMarked = !0, w.closeInfo(), n.isJourney || n.setMap(null))) : 0 == i.is_marked && (S.cancelMark(i.type, i.id), n = w.getMarkerById(i.id), n.isJourney || (n.isMarked = !1, w.closeInfo(), n.setMap(null))))
		}
	}), e.$on("$ionicView.beforeLeave", function(t, o) {
		"back" == o.direction && e.modified && l.put(e.pointList.journey)
	}), e.$on("marker.drag", function(t, o, i) {
		e.$apply(function() {
			e.drag.isDragging = !0, e.drag.isJourney = o.isJourney, e.drag.elemId = i.classList.contains("can-be-dropped") || i.parentNode.classList.contains("can-be-dropped") ? i.getAttribute("id") || i.parentNode.getAttribute("id") : null
		})
	}), e.$on("marker.drop", function(t, o) {
		var i = o.type,
			a = o.index,
			r = null,
			s = o.id;
		if ("recycling" == e.drag.elemId) {
			var c = S.removeFromJourney(e.day.activeDay, s);
			o.isJourney = !1, o.index = c.index, w.closeInfo(), c.isMarked && "mark" == e.widget.selected ? (o.isMarked = !0, w.changeMarker(o, "journey", "mark")) : c.isMarked || e.widget.selected != i ? o.setMap(null) : w.changeMarker(o, "journey", i), e.modified = !0
		} else if (!u.isEmpty(e.drag.elemId)) {
			if (e.drag.elemId = parseInt(e.drag.elemId), isNaN(e.drag.elemId)) return;
			o.isJourney ? S.moveInJourney(s, e.day.activeDay, e.drag.elemId) : (r = o.isMarked ? e.pointList.mark[a] : e.pointList[i][a], S.addToJourney(e.drag.elemId, r, a), o.isJourney = !0, o.index = null, o.jIndex = e.pointList.journey[e.drag.elemId].length - 1), e.drag.elemId == e.day.activeDay ? o.isMarked ? w.changeMarker(o, "mark", "journey") : w.changeMarker(o, i, "journey") : (w.closeInfo(), o.setMap(null)), e.modified = !0
		}
		n(function() {
			e.drag.isDragging = !1, e.drag.isJourney = !1, e.drag.elemId = null
		})
	}), e.$on("$destroy", function() {
		w && w.destroy(), S && S.destroy()
	})
}]).controller("mapAddressCtrl", ["$scope", "viewArgument", "currentScope", "viewElement", "map", function(e, t, o, i, n) {
	var a = null;
	e.poi = t.get(), void 0 != e.poi && (e.title = "<span>" + e.poi.name + "</span><span>" + e.poi.address + "</span>", o.ready(e, function() {
		var t = i.current().querySelector(".map");
		a = n.createMap(t, e.poi, 17, "complex", !1, !1, {
			minZoom: 14,
			maxZoom: 18
		}), a.route([e.poi.lat, e.poi.lng], "walking"), a.setMapLocalType(null), a.showMarkers([e.poi], e.poi.type, !1, !1)
	}), e.$on("$destroy", function() {
		a && a.destroy()
	}))
}]).controller("mapAddCtrl", ["$scope", "$rootScope", "$stateParams", "$timeout", "$ionicHistory", "$ionicScrollDelegate", "viewArgument", "cacheLocal", function(e, t, o, i, n, a, r, s) {
	e.maplist = r.get(), e.cityAdded = 0, e.toggleGroup = function(t) {
		e.shownGroup = e.isGroupShown(t) ? null : t, i(function() {
			a.$getByHandle("map-add").resize()
		}, 200)
	}, e.isGroupShown = function(t) {
		return e.shownGroup === t
	}, e.onClickConfirm = function() {
		if (0 != e.cityAdded) {
			for (var t = 0; t < e.maplist.length; t++) "6" == e.maplist[t].status.downloadStatus && (e.maplist[t].status.downloadStatus = "5");
			s.system.put("maps", e.maplist), n.goBack()
		}
	}, e.$on("$ionicView.beforeLeave", function() {
		for (var t = 0; t < e.maplist.length; t++) "6" == e.maplist[t].status.downloadStatus && (e.maplist[t].status.downloadStatus = "0")
	}), e.inCurrentChanges = [], e.hasSelected = !1;
	var c = function(t, o) {
		e.hasSelected = !0, "6" == o ? e.cityAdded++ : "0" == o && e.cityAdded--;
		for (var i = 0; i < e.maplist.length; i++) e.maplist[i].id == t && (e.maplist[i].status.downloadStatus = o, e.inCurrentChanges.push(e.maplist[i].id))
	};
	e.toggleCheck = function(e, t) {
		var o = t.currentTarget.querySelector("input");
		null != o && (o.checked ? (o.checked = !1, c(e, "0")) : (o.checked = !0, c(e, "6")))
	}, e.toggleCheck1 = function(e, t) {
		var o = t.currentTarget.querySelector("input");
		null != o && (o.checked ? c(e, "6") : c(e, "0"))
	}
}]), angular.module("app.map", ["app.map.controller", "app.map.service", "app.map.route"]), angular.module("app.map.route", []).config(["$stateProvider", "$urlRouterProvider", "$locationProvider", "PERMISSIONS", function(e) {
	e.state("app.mapHome", {
		url: "/mapHome",
		cache: !0,
		templateUrl: "app/map/templates/mapHome.html",
		controller: "mapHomeCtrl"
	}).state("app.map", {
		url: "/map/:type/:uuid",
		cache: !0,
		templateUrl: "app/map/templates/map.html",
		controller: "mapGeneralCtrl"
	}).state("app.mapAddress", {
		url: "/mapAddress",
		cache: !1,
		templateUrl: "app/map/templates/mapAddress.html",
		controller: "mapAddressCtrl"
	}).state("app.mapRoute", {
		url: "/route/:lat/:lng",
		cache: !1,
		templateUrl: "app/map/templates/route.html",
		controller: "routeCtrl"
	}).state("app.mapAdd", {
		url: "/mapAdd",
		cache: !1,
		templateUrl: "app/map/templates/mapAdd.html",
		controller: "mapAddCtrl"
	})
}]), angular.module("app.map.service", []).factory("map", ["$rootScope", "$document", "$timeout", "$compile", "$cordovaGeolocation", "$cordovaSQLite", "CONFIG", "currentScope", "utils", "mapDrag", function(e, t, o, n, a, r, s, c, l, d) {
	function u(e, t, o, i, n, a, r) {
		this.__scope = c.get(), this.__elem = e, this.__options = {
			zoom: o ? o : 12,
			center: new gogle.maps.LatLng(t.lat, t.lng),
			disableDefaultUI: !0,
			noClear: !1,
			styles: i
		}, this.__map = null, this.__isOffline = n, this.__infoBubble = null, this.__cityBubbles = [], this.__markers = {
			city: [],
			journey: [],
			other: []
		}, this.__lines = [], this.__icons = {
			city: "img/icon-new/marker/city.png",
			journey: "img/icon-new/marker/journey.png",
			mark: "img/icon-new/marker/mark.png",
			AT: "img/icon-new/marker/spot.png",
			RS: "img/icon-new/marker/food.png",
			SH: "img/icon-new/marker/shopping.png",
			HT: "img/icon-new/marker/hotel.png",
			TL: "img/icon-new/marker/toilet.png",
			SM: "img/icon-new/marker/activity.png",
			journeyTiny: "img/icon-new/marker/journey-tiny.png",
			poiTiny: "img/icon-new/marker/poi-tiny.png"
		}, this._init(a, r)
	}
	var p = [{
			featureType: "administrative",
			elementType: "all",
			stylers: [{
				visibility: "on"
			}, {
				lightness: 33
			}]
		}, {
			featureType: "landscape",
			elementType: "all",
			stylers: [{
				color: "#f2e5d4"
			}]
		}, {
			featureType: "water",
			elementType: "all",
			stylers: [{
				visibility: "on"
			}, {
				color: "#acbcc9"
			}]
		}],
		m = [{
			featureType: "landscape.man_made",
			elementType: "geometry",
			stylers: [{
				color: "#f7f1df"
			}]
		}, {
			featureType: "landscape.natural",
			elementType: "geometry",
			stylers: [{
				color: "#f3f8ec"
			}]
		}, {
			featureType: "landscape.natural.terrain",
			elementType: "geometry",
			stylers: [{
				visibility: "off"
			}]
		}, {
			featureType: "poi",
			elementType: "labels",
			stylers: [{
				visibility: "on"
			}]
		}, {
			featureType: "poi.business",
			elementType: "all",
			stylers: [{
				visibility: "off"
			}]
		}, {
			featureType: "poi.medical",
			elementType: "geometry",
			stylers: [{
				color: "#fbd3da"
			}]
		}, {
			featureType: "poi.park",
			elementType: "geometry",
			stylers: [{
				color: "#bde6ab"
			}]
		}, {
			featureType: "road",
			elementType: "geometry.stroke",
			stylers: [{
				visibility: "off"
			}]
		}, {
			featureType: "road",
			elementType: "labels",
			stylers: [{
				visibility: "off"
			}]
		}, {
			featureType: "road.highway",
			elementType: "geometry.fill",
			stylers: [{
				color: "#ffe15f"
			}]
		}, {
			featureType: "road.highway",
			elementType: "geometry.stroke",
			stylers: [{
				color: "#efd151"
			}]
		}, {
			featureType: "road.arterial",
			elementType: "geometry.fill",
			stylers: [{
				color: "#ffffff"
			}]
		}, {
			featureType: "road.local",
			elementType: "geometry.fill",
			stylers: [{
				color: "black"
			}]
		}, {
			featureType: "transit.station.airport",
			elementType: "geometry.fill",
			stylers: [{
				color: "#cfb2db"
			}]
		}, {
			featureType: "water",
			elementType: "geometry",
			stylers: [{
				color: "#a2daf2"
			}]
		}],
		h = [{
			featureType: "landscape.man_made",
			elementType: "geometry",
			stylers: [{
				color: "#f7f1df"
			}]
		}, {
			featureType: "landscape.natural",
			elementType: "geometry",
			stylers: [{
				color: "#f3f8ec"
			}]
		}, {
			featureType: "landscape.natural.terrain",
			elementType: "geometry",
			stylers: [{
				visibility: "off"
			}]
		}, {
			featureType: "poi",
			elementType: "labels",
			stylers: [{
				visibility: "on"
			}]
		}, {
			featureType: "poi.business",
			elementType: "all",
			stylers: [{
				visibility: "on"
			}]
		}, {
			featureType: "poi.medical",
			elementType: "geometry",
			stylers: [{
				color: "#fbd3da"
			}]
		}, {
			featureType: "poi.park",
			elementType: "geometry",
			stylers: [{
				color: "#bde6ab"
			}]
		}, {
			featureType: "road",
			elementType: "geometry.stroke",
			stylers: [{
				visibility: "off"
			}]
		}, {
			featureType: "road",
			elementType: "labels",
			stylers: [{
				visibility: "on"
			}]
		}, {
			featureType: "road.highway",
			elementType: "geometry.fill",
			stylers: [{
				color: "#ffe15f"
			}]
		}, {
			featureType: "road.highway",
			elementType: "geometry.stroke",
			stylers: [{
				color: "#efd151"
			}]
		}, {
			featureType: "road.arterial",
			elementType: "geometry.fill",
			stylers: [{
				color: "#ffffff"
			}]
		}, {
			featureType: "road.local",
			elementType: "geometry.fill",
			stylers: [{
				color: "black"
			}]
		}, {
			featureType: "transit.station.airport",
			elementType: "geometry.fill",
			stylers: [{
				color: "#cfb2db"
			}]
		}, {
			featureType: "water",
			elementType: "geometry",
			stylers: [{
				color: "#a2daf2"
			}]
		}];
	return u.prototype._execAfterRender = function() {
		var e = this;
		gogle.maps.event.addListenerOnce(this.__map, "idle", function() {
			angular.forEach(e.__elem.querySelectorAll("a"), function(e) {
				e.getAttribute("href") && e.getAttribute("href").indexOf("http://") > -1 && angular.element(e).on("click", function(e) {
					e.preventDefault()
				})
			}), e = null
		})
	}, u.prototype._fixInfoWindow = function() {
		var e = gogle.maps.InfoWindow.prototype.set;
		gogle.maps.InfoWindow.prototype.set = function(t) {
			("map" !== t || this.get("noSuppress")) && e.apply(this, arguments)
		}
	}, u.prototype._fixResizeBug = function() {
		var e = ionic.trigger;
		this.__scope.$on("$destroy", function() {
			ionic.trigger = e
		}), this.__scope.$on("$ionicView.afterLeave", function() {
			ionic.trigger = function(t) {
				return "resize" == t ? !1 : void e.apply(ionic, arguments)
			}
		}), this.__scope.$on("$ionicView.afterEnter", function() {
			ionic.trigger = e
		})
	}, u.prototype._init = function(e, t) {
		t = t, angular.extend(this.__options, t), this.__map = new gogle.maps.Map(this.__elem, this.__options), o(function() {
			var e = document.querySelectorAll("body>span[style]");
			e = e[e.length - 1], e && "BESbewy" === e.innerHTML && (this.__$span = e)
		}.bind(this), 200), this.__infoBubble = new InfoBubble({
			shadowStyle: 0,
			padding: 0,
			maxWidth: 100,
			maxHeight: 107,
			backgroundColor: "#fff",
			borderRadius: 5,
			arrowStyle: 0,
			arrowSize: 8,
			borderWidth: 1,
			borderColor: "#999",
			disableAutoPan: !1,
			hideCloseButton: !0
		}), this._execAfterRender(), this._fixInfoWindow(), this._fixResizeBug();
		var i = this;
		if (gogle.maps.event.addListener(i.__map, "click", function() {
				i.closeInfo()
			}), e) {
			var n = 13,
				a = null;
			gogle.maps.event.addListener(i.__map, "zoom_changed", function() {
				if (0 != i.__markers.journey.length || 0 != i.__markers.other.length) {
					var e = i.__map.getZoom();
					n >= e ? (a = function(e, t) {
						var o = t.getIcon(),
							n = "journey" == e ? i.__icons.journeyTiny : i.__icons.poiTiny;
						if (o.url != n) {
							var a = {
								url: n,
								size: new gogle.maps.Size(28, 35),
								origin: new gogle.maps.Point(0, 0),
								anchor: new gogle.maps.Point(7, 17.5),
								scaledSize: new gogle.maps.Size(14, 17.5)
							};
							t.setIcon(a)
						}
					}, i.__markers.journey.length && i.__markers.journey[0].getIcon().url == i.__icons.journey && angular.forEach(i.__markers.journey, function(e) {
						a("journey", e)
					}), i.__markers.other.length && i.__markers.other[0].getIcon().url != i.__icons.poiTiny && angular.forEach(i.__markers.other, function(e) {
						a("other", e)
					})) : e > n && (a = function(e, t) {
						var o = t.getIcon(),
							n = "journey" == e ? i.__icons.journey : i.__icons[t.type];
						if (o.url != n) {
							var a = {
								url: n,
								size: new gogle.maps.Size(40, 50),
								origin: new gogle.maps.Point(0, 0),
								anchor: new gogle.maps.Point(13, 33),
								scaledSize: new gogle.maps.Size(26, 33)
							};
							t.setIcon(a)
						}
					}, i.__markers.journey.length && i.__markers.journey[0].getIcon().url == i.__icons.journeyTiny && angular.forEach(i.__markers.journey, function(e) {
						a("journey", e)
					}), i.__markers.other.length && i.__markers.other[0].getIcon().url == i.__icons.poiTiny && angular.forEach(i.__markers.other, function(e) {
						a("other", e)
					}))
				}
			})
		}
	}, u.prototype.destroy = function() {
		this.clearMarkers("all"), this.__$span && (this.__$span.remove(), delete this.__$span), this.__options = null, gogle.maps.event.clearInstanceListeners(this.__map), gogle.maps.event.clearInstanceListeners(document), gogle.maps.event.clearInstanceListeners(window), this.__infoBubble = null, this.__cityBubbles = null, this.__markers = null, this.__lines = null
	}, u.prototype._addCityBubble = function(e, t) {
		var o = '<div class="item item-city" ng-click="onClickBubble($event,\'' + e.id + "','city','" + e.title + "')\"><span>" + e.title + "</span>" + (t ? "<p>" + t + "天</p>" : "") + "</div>",
			i = t ? 36 : 20,
			a = new InfoBubble({
				shadowStyle: 0,
				padding: 0,
				maxWidth: 65,
				maxHeight: i,
				backgroundColor: "#ec898c",
				borderRadius: 5,
				arrowStyle: 2,
				arrowSize: 8,
				borderWidth: 1,
				borderColor: "#fff",
				hideCloseButton: !0,
				disableAutoPan: !0,
				disableAnimation: !0
			}),
			r = n(o)(this.__scope);
		a.setContent(r[0]), a.open(this.__map, e), this.__cityBubbles.push(a)
	}, u.prototype._addMarker = function(e, t, o, i) {
		var a = {};
		"city" != t && (a = {
			url: this.__icons["search" == t ? e.type : t],
			size: new gogle.maps.Size(40, 50),
			origin: new gogle.maps.Point(0, 0),
			anchor: new gogle.maps.Point(13, 33),
			scaledSize: new gogle.maps.Size(26, 33)
		});
		var r = new gogle.maps.Marker({
				position: new gogle.maps.LatLng(e.lat, e.lng),
				map: this.__map,
				draggable: !1,
				raiseOnDrag: !1,
				title: e.name,
				icon: "city" == t ? this.__icons[t] : a
			}),
			s = this;
		if (r.id = e.id, r.type = e.type, o)
			if ("city" == t) s._addCityBubble(r, e.days);
			else {
				var c = "";
				gogle.maps.event.addListener(r, "click", function() {
					if (s.__isOffline) c = '<div class="item item-poi" ng-click="showMessage()"><p>' + this.title + "</p>", s.__infoBubble.disableAutoPan = !0;
					else {
						var t = "$event,'" + e.id + "','" + e.type + "',&quot;" + this.title + "&quot;";
						c = '<div class="item item-poi" ng-click="onClickBubble(' + t + ')"><p>' + this.title + '</p><img src="' + (e.img ? e.img + '-appmarker"' : 'http://cdn1.zouke.com/app/poi/default-thumb.jpg-appmarker"') + ">"
					}
					e.story_num && (c += "<span>" + e.story_num + "个故事</span>"), c += "</div>";
					var o = n(c)(s.__scope);
					s.__infoBubble.setContent(o[0]), s.__infoBubble.close(), s.__infoBubble.open(s.__map, this)
				})
			}
		return i && d.init(r), r
	}, u.prototype.setMapLocalType = function(t) {
		function o() {}
		if (null != t) {
			var i, n;
			window.cordova && (e.user.isIOS ? (i = cordova.file.documentsDirectory, n = window.sqlitePlugin.openDatabase({
				name: t.id + ".db",
				location: 2
			})) : e.user.isAndroid ? (i = cordova.file.applicationStorageDirectory, n = window.sqlitePlugin.openDatabase({
				name: t.id + ".db",
				androidDatabaseImplementation: 2
			})) : (i = cordova.file.tempDirectory, n = window.sqlitePlugin.openDatabase({
				name: t.id + ".db"
			}))), o.prototype.tileSize = new gogle.maps.Size(256, 256), o.prototype.maxZoom = t.max_zoom, o.prototype.minZoom = t.min_zoom, o.prototype.getTile = function(e, t) {
				var o = document.createElement("img");
				o.style.width = this.tileSize.width + "px", o.style.height = this.tileSize.height + "px";
				var i = "select x,y,z,buff from tiles where x=" + e.x + " and y=" + e.y + " and z=" + t + " limit 1;";
				return r.execute(n, i, []).then(function(e) {
					var t = e.rows.item(0);
					o.src = t ? "data:image/png;base64," + t.buff : "img/icon-new/mapblank.jpg"
				}, function(e) {
					console.log(e)
				}), o
			}, this.__map.setMapTypeId("local"), this.__map.mapTypes.set("local", new o);
			var a = new gogle.maps.LatLngBounds(new gogle.maps.LatLng(t.range[1], t.range[0]), new gogle.maps.LatLng(t.range[3], t.range[2]));
			that = this, gogle.maps.event.addListener(this.__map, "center_changed", function() {
				mcenter = that.__map.getCenter(), a.contains(mcenter) || (x = mcenter.lng(), y = mcenter.lat(), maxX = a.getNorthEast().lng(), maxY = a.getNorthEast().lat(), minX = a.getSouthWest().lng(), minY = a.getSouthWest().lat(), x < minX && (x = minX), x > maxX && (x = maxX), y < minY && (y = minY), y > maxY && (y = maxY), that.__map.setCenter(new gogle.maps.LatLng(y, x)))
			})
		} else this.__map.setMapTypeId(gogle.maps.MapTypeId.ROADMAP)
	}, u.prototype.getLocation = function(e, t) {
		var o = new gogle.maps.LatLngBounds(new gogle.maps.LatLng(t[1], t[0]), new gogle.maps.LatLng(t[3], t[2])),
			i = null,
			n = null;
		gogle.maps.event.addDomListenerOnce(e, "click", function() {
			null != n && n.setMap(null), r()
		});
		var r = function() {
			a.getCurrentPosition({
				enableHighAccuracy: !0,
				maximumAge: 12e4,
				timeout: 5e3
			}).then(function(e) {
				i = new gogle.maps.LatLng(e.coords.latitude, e.coords.longitude), n = new gogle.maps.Marker({
					map: this.__map,
					position: i,
					icon: "img/icon-new/current-pos.png"
				}), o.contains(i) ? this.__map.setCenter(i) : JAlert.showOnce("您的位置不在当前地图内！")
			}, function(e) {
				var t = "";
				t = e.code == e.PERMISSION_DENIED ? "请设置手机允许欧优游进行定位" : "请检查定位功能是否开启", JAlert.showOnce(t)
			})
		};
		r()
	}, u.prototype.getElem = function() {
		return this.__elem
	}, u.prototype.getMap = function() {
		return this.__map
	}, u.prototype.changeMarker = function(e, t, o, n) {
		var a = {};
		if (a = n ? {
				url: this.__icons[o],
				size: new gogle.maps.Size(40, 66),
				origin: new gogle.maps.Point(0, 0),
				anchor: new gogle.maps.Point(20, 66)
			} : {
				url: this.__icons[o],
				size: new gogle.maps.Size(40, 66),
				origin: new gogle.maps.Point(0, 0),
				anchor: new gogle.maps.Point(13, 43),
				scaledSize: new gogle.maps.Size(26, 43)
			}, e.setOptions({
				icon: a
			}), t != o) {
			"journey" != t && (t = "other");
			var r = this.__markers[t];
			for (i = 0; i < r.length; i++)
				if (r.id == e.id) {
					r.splice(i, 1);
					break
				}
				"journey" != o && (o = "other"), this.__markers[o].push(e)
		}
	}, u.prototype.switchStyle = function(e) {
		if (l.isEmpty(e)) e = m;
		else switch (e) {
			case "pale":
				e = p;
				break;
			case "simple":
				e = m;
				break;
			case "complex":
				e = h
		}
		this.__map.setOptions({
			styles: e
		})
	}, u.prototype.showMarkers = function(e, t, o, i) {
		if (0 != e.length) {
			this.__isOffline && (i = !1);
			for (var n = new gogle.maps.LatLngBounds, a = this, r = function(e) {
					var r = a._addMarker(e, t, o, i);
					return n.extend(r.position), r
				}, s = "city" == t || "journey" == t ? t : "other", c = 0; c < e.length; c++) {
				var l = e[c],
					d = null;
				if (-1 !== ["city", "AT", "RS", "SH", "SM", "TL", "HT"].indexOf(l.type)) switch (t) {
					case "city":
						d = r(l), this.__markers[s].push(d);
						break;
					case "journey":
						d = r(l), d.isJourney = !0, this.__markers[s].push(d);
						break;
					case "mark":
						l.isJourney || (d = r(l), d.index = c, d.isJourney = !1, d.isMarked = !0, this.__markers[s].push(d));
						break;
					default:
						l.isJourney || l.isMarked || (d = r(l), d.index = c, d.isJourney = !1, d.isMarked = !1, this.__markers[s].push(d))
				}
			}
			if (0 == this.__markers[s].length) {
				if ("city" == t) return;
				JAlert.notify("mark" == t ? "收藏的点已在行程中" : "加载的点已在行程中")
			} else {
				var a = this;
				this.__isOffline && "mark" == t ? (this.__map.setCenter(this.__markers[s][0].getPosition()), this.__map.setZoom(13)) : this.__map.fitBounds(n)
			}
		}
	}, u.prototype.showLines = function(e, t) {
		t = l.isEmpty(t) ? "#FF585B" : t;
		var o = e,
			i = new gogle.maps.LatLngBounds,
			n = [],
			a = {},
			r = {},
			s = {
				path: gogle.maps.SymbolPath.CIRCLE
			};
		if (1 == o.length) a = new gogle.maps.LatLng(o[0].lat, o[0].lng), i.extend(a), r = new gogle.maps.Polyline({
			path: [a, a],
			geodesic: !1,
			icons: [{
				icon: s,
				offset: "0%"
			}, {
				icon: s,
				offset: "100%"
			}],
			strokeColor: t,
			strokeOpacity: .9,
			strokeWeight: 2,
			map: this.__map
		}), this.__lines.push(r);
		else
			for (var c = 0; c < o.length; c++) a = new gogle.maps.LatLng(o[c].lat, o[c].lng), n.push(a), i.extend(a), n.length > 1 && (r = new gogle.maps.Polyline({
				path: n.slice(-2),
				geodesic: !0,
				icons: [{
					icon: s,
					offset: "0%"
				}, {
					icon: s,
					offset: "100%"
				}],
				strokeColor: t,
				strokeOpacity: .9,
				strokeWeight: 2,
				map: this.__map
			}), this.__lines.push(r));
		this.__map.fitBounds(i)
	}, u.prototype.getMarkerById = function(e) {
		var t = null,
			o = "journey";
		for (i = 0; i < this.__markers[o].length; i++)
			if (this.__markers[o][i].id == e) {
				t = this.__markers[o][i];
				break
			}
		if (null == t)
			for (o = "other", i = 0; i < this.__markers[o].length; i++)
				if (this.__markers[o][i].id == e) {
					t = this.__markers[o][i];
					break
				}
		return t
	}, u.prototype.clearMarkers = function(e) {
		var t = 0;
		if ("city" == e || "all" == e) {
			for (t = 0; t < this.__markers.city.length; t++) gogle.maps.event.clearInstanceListeners(this.__markers.city[t]), this.__markers.city[t].setMap(null), this.__markers.city[t] = null;
			for (t = 0; t < this.__cityBubbles.length; t++) this.__cityBubbles[t].close(), this.__cityBubbles[t] = null;
			this.__markers.city = [], this.__cityBubbles = []
		}
		if ("journey" == e || "all" == e) {
			for (t = 0; t < this.__markers.journey.length; t++) gogle.maps.event.clearInstanceListeners(this.__markers.journey[t]), this.__markers.journey[t].setMap(null), this.__markers.journey[t] = null;
			this.__markers.journey = []
		}
		if ("other" == e || "all" == e) {
			for (t = 0; t < this.__markers.other.length; t++) this.__markers.other[t].isJourney || (gogle.maps.event.clearInstanceListeners(this.__markers.other[t]), this.__markers.other[t].setMap(null), this.__markers.other[t] = null);
			this.__markers.other = []
		}
	}, u.prototype.clearLines = function() {
		this.__lines.length && (angular.forEach(this.__lines, function(e) {
			e.setMap(null), e = null
		}), this.__lines = [])
	}, u.prototype.closeInfo = function() {
		l.isEmpty(this.__infoBubble) || this.__infoBubble.close()
	}, u.prototype.setCenter = function(e) {
		this.__map.setCenter(new gogle.maps.LatLng(e.lat, e.lng))
	}, u.prototype.getCurrent = function() {
		var e = this;
		return a.watchPosition({
			enableHighAccuracy: !1,
			maximumAge: 12e4,
			timeout: 5e3
		}).then(function(t) {
			{
				var o = new gogle.maps.LatLng(t.coords.latitude, t.coords.longitude);
				new gogle.maps.Marker({
					position: o,
					map: e.__map,
					icon: "img/icon-new/current-pos.png",
					title: "我的位置"
				})
			}
		})
	}, u.prototype.route = function(e) {
		var t = document.createElement("div"),
			o = document.createElement("div");
		t.style.marginTop = "8px", t.style.padding = "0 15px", t.style.background = "rgba(255, 255, 255, 0.8)", t.style.borderTopLeftRadius = "3px", t.style.borderBottomLeftRadius = "3px", o.style.width = "33px", o.style.height = "33px", o.style.backgroundImage = "url(img/icon-new/map/walking.jpg)", t.appendChild(o), this.__map.controls[gogle.maps.ControlPosition.TOP_CENTER].push(t);
		var i = document.createElement("div"),
			n = document.createElement("div");
		i.style.marginTop = "8px", i.style.padding = "0 15px", i.style.background = "rgba(255, 255, 255, 0.8)", i.style.borderTopRightRadius = "3px", i.style.borderBottomRightRadius = "3px", n.style.width = "33px", n.style.height = "33px", n.style.backgroundImage = "url(img/icon-new/map/bus.jpg)", i.appendChild(n), this.__map.controls[gogle.maps.ControlPosition.TOP_CENTER].push(i);
		var r = document.createElement("div"),
			s = document.createElement("div");
		r.style.marginTop = "8px", r.style.padding = "0 15px", r.style.background = "rgba(255, 255, 255, 0.8)", s.style.width = "33px", s.style.height = "33px", s.style.backgroundImage = "url(img/icon-new/map/driving.jpg)", r.appendChild(s), this.__map.controls[gogle.maps.ControlPosition.TOP_CENTER].push(r);
		var c = this,
			d = null;
		gogle.maps.event.addDomListener(t, "click", function() {
			m(u, d, e, "walking"), o.style.backgroundImage = "url(img/icon-new/map/walking-active.jpg)", s.style.backgroundImage = "url(img/icon-new/map/driving.jpg)", n.style.backgroundImage = "url(img/icon-new/map/bus.jpg)"
		}), gogle.maps.event.addDomListener(r, "click", function() {
			m(u, d, e, "driving"), o.style.backgroundImage = "url(img/icon-new/map/walking.jpg)", s.style.backgroundImage = "url(img/icon-new/map/driving-active.jpg)", n.style.backgroundImage = "url(img/icon-new/map/bus.jpg)"
		}), gogle.maps.event.addDomListener(i, "click", function() {
			m(u, d, e, "transit"), o.style.backgroundImage = "url(img/icon-new/map/walking.jpg)", s.style.backgroundImage = "url(img/icon-new/map/driving.jpg)", n.style.backgroundImage = "url(img/icon-new/map/bus-active.jpg)"
		});
		var u = new gogle.maps.DirectionsRenderer;
		u.setMap(this.__map);
		var p = function(e, t, o, i, n) {
				var a = new gogle.maps.DirectionsService,
					r = {
						origin: o,
						destination: i,
						optimizeWaypoints: !0,
						travelMode: gogle.maps.DirectionsTravelMode.TRANSIT
					};
				"walking" == n ? r.travelMode = gogle.maps.DirectionsTravelMode.WALKING : "transit" == n ? r.travelMode = gogle.maps.DirectionsTravelMode.TRANSIT : "driving" == n && (r.travelMode = gogle.maps.DirectionsTravelMode.DRIVING), a.route(r, function(e, o) {
					JAlert.hide(), o == gogle.maps.DirectionsStatus.OK ? (t.setDirections(e), path = e.routes[0].overview_path) : JAlert.showOnce("查询异常！")
				})
			},
			m = function(e, t, o, i) {
				o = new gogle.maps.LatLng(o[0], o[1]), a.getCurrentPosition({
					enableHighAccuracy: !1,
					maximumAge: 12e4,
					timeout: 5e3
				}).then(function(n) {
					t = new gogle.maps.LatLng(n.coords.latitude, n.coords.longitude);
					var a = l.calcDistance([t.lat(), t.lng()], [o.lat(), o.lng()]);
					a > 100 ? JAlert.showOnce("亲，您距离目的地太远！") : (JAlert.show("路线规划中..."), p(c.__map, e, t, o, i))
				}, function() {
					p(c.__map, e, new gogle.maps.LatLng(31.2555630337, 121.564718921), o, i), JAlert.showOnce("不能获取当前位置！")
				})
			}
	}, {
		createMap: function(e, t, o, i, n, a, r) {
			if (delete window.gogle, window.gogle = n ? window.localGoogle : window.webGoogle, "undefined" == typeof gogle || "undefined" == typeof gogle.maps.LatLng) return void JAlert.showOnce("Google地图又趴了 :(\n稍候再试试");
			if (l.isEmpty(i)) i = m;
			else switch (i) {
				case "simple":
					i = m;
					break;
				case "pale":
					i = p;
					break;
				case "complex":
					i = h
			}
			return new u(e, t, o, i, n, a, r)
		},
		createStaticMap: function(e, t, o) {
			var i = "http://ditu.google.cn/maps/api/staticmap?maptype=terrain&style=feature:landscape.man_made|element:geometry|color:0xf7f1df&style=feature:water|element:geometry|color:0xa2daf2&style=feature:landscape.natural|element:geometry|color:0xf3f8ec";
			if (t && (i += "&size=" + t), o && o.length) {
				var n = o.length < 4 ? s.hostImg + "/marker/city-big.png" : s.hostImg + "/marker/city-small.png",
					a = "&markers=icon:" + n;
				if (o.length > 1) {
					var r = "&path=color:0xFF585B|weight:3|geodesic:true";
					angular.forEach(o, function(e) {
						r += "|" + e.lat + "," + e.lng, a += "|" + e.lat + "," + e.lng
					}), i += r
				} else e && (i += "&zoom=" + e), a += "|" + o[0].lat + "," + o[0].lng;
				i += a
			}
			return i
		}
	}
}]).factory("mapDrag", ["$rootScope", "$timeout", function(e, t) {
	function o() {
		var e = document.createElement("div");
		e.style.position = "absolute", e.style.zIndex = "1000", e.style.display = "none", e.style.left = "0", e.style.top = "0";
		var t = new Image;
		return t.style.display = "block", t.style.verticalAlign = "top", e.appendChild(t), document.body.appendChild(e), e
	}

	function i(e, t, o) {
		e && (e.style.left = t + "px", e.style.top = o + "px")
	}

	function n(e) {
		e && (e.style.display = "block")
	}

	function a(e) {
		e && (e.style.display = "none")
	}

	function r(e, t) {
		e.firstElementChild.src = t
	}

	function s(e) {
		var t = e.getMap(),
			o = t.getDiv(),
			i = t.getProjection(),
			n = Math.pow(2, t.getZoom()),
			a = i.fromLatLngToPoint(new gogle.maps.LatLng(t.getBounds().getNorthEast().lat(), t.getBounds().getSouthWest().lng())),
			r = i.fromLatLngToPoint(e.getPosition()),
			s = o.getBoundingClientRect();
		return {
			x: (r.x - a.x) * n + s.left,
			y: (r.y - a.y) * n + s.top
		}
	}

	function c(e) {
		e.___drag__disable || (e.getDiv().addEventListener("touchmove", c.touchmove, !0), e.___drag__disable = !0)
	}

	function l(e) {
		e.___drag__disable && (e.getDiv().removeEventListener("touchmove", c.touchmove, !0), e.___drag__disable = !1)
	}

	function d() {
		if (!(y > 1)) {
			var o = this;
			this.__$timer = t(function() {
				r(w, o.icon.url), g = o.isJourney ? {
					width: 26,
					height: 43
				} : {
					width: 26,
					height: 33
				};
				var t = s(o);
				o.__$left = t.x - g.width / 2 - h.x, o.__$top = t.y - g.height - h.y, i(w, o.__$left, o.__$top), n(w), c(o.getMap()), o.setOpacity(0), o.__$bindTouchEndFn || (o.__$bindTouchMoveFn = p.bind(o), o.__$bindTouchEndFn = m.bind(o)), document.addEventListener("touchmove", o.__$bindTouchMoveFn, !0), document.addEventListener("touchend", o.__$bindTouchEndFn, !0);
				var a = w.getBoundingClientRect();
				e.$broadcast("marker.drag", o, document.elementFromPoint((a.left + a.right) / 2, a.bottom + 1)), o.__$timer = null, o = null, f = !0
			}, 300)
		}
	}

	function u(e) {
		if (this.__$timer) {
			if (1 === y) {
				var o = Math.abs(e.touches[0].clientX - _.x),
					i = Math.abs(e.touches[0].clientY - _.y);
				if (10 > o && 10 > i) return
			}
			t.cancel(this.__$timer), this.__$timer = null
		}
	}

	function p(t) {
		var o = this;
		window.requestAnimationFrame || (window.requestAnimationFrame = window.webkitRequestAnimationFrame), window.requestAnimationFrame(function() {
			i(w, o.__$left + t.touches[0].clientX - _.x, o.__$top + t.touches[0].clientY - _.y);
			var n = w.getBoundingClientRect();
			e.$broadcast("marker.drag", o, document.elementFromPoint((n.left + n.right) / 2, n.bottom + 1))
		})
	}

	function m(t) {
		if (0 === t.touches.length || t.touches[0].identifier !== v) {
			document.removeEventListener("touchmove", this.__$bindTouchMoveFn, !0), document.removeEventListener("touchend", this.__$bindTouchEndFn, !0), l(this.getMap()), this.setOpacity(1);
			var o = w.getBoundingClientRect();
			e.$broadcast("marker.drop", this, document.elementFromPoint((o.left + o.right) / 2, o.bottom + 1)), a(w), f = !1
		}
	}
	var h = {
			x: 5,
			y: 25
		},
		g = {},
		f = !1,
		y = 0,
		_ = null,
		v = null;
	document.body.addEventListener("touchstart", function(e) {
		y = e.touches.length, 1 === y && (_ = {
			x: e.touches[0].clientX,
			y: e.touches[0].clientY
		}, v = e.touches[0].identifier)
	}, !0), document.body.addEventListener("touchend", function(e) {
		y = e.touches.length
	}, !0);
	var w = o();
	return c.touchmove = function(e) {
		e.stopPropagation()
	}, {
		init: function(e) {
			gogle.maps.event.addListener(e, "mousedown", d), gogle.maps.event.addListener(e, "mouseup", u), gogle.maps.event.addListener(e, "click", u), e.getMap().getDiv().addEventListener("touchmove", u.bind(e))
		},
		getMarkerPositionOffset: s,
		__$pointNumber: function() {
			return y
		},
		__$markerDragged: function() {
			return f
		},
		__$firstTouchid: function() {
			return v
		}
	}
}]).factory("mapRect", ["$timeout", "mapDrag", function(e, t) {
	function o(e, t, o) {
		var i = e.__$now,
			n = e.__$rect;
		t /= e.__$scale, o /= e.__$scale, i.x += t, i.y += o;
		var a = (-e.__$height + n.top) * e.__$scale + e.__$height,
			r = (e.__$height + n.bottom) * e.__$scale - e.__$height,
			s = (-e.__$width + n.left) * e.__$scale + e.__$width,
			c = (e.__$width + n.right) * e.__$scale - e.__$width;
		a > 0 && (a = 0), 0 > r && (r = 0), s > 0 && (s = 0), 0 > c && (c = 0);
		var l = i.x * e.__$scale,
			d = i.y * e.__$scale;
		d > r ? (o -= (d - r) / e.__$scale, i.y = r / e.__$scale) : a > d && (o += (a - d) / e.__$scale, i.y = a / e.__$scale), l > c ? (t -= (l - c) / e.__$scale, i.x = c / e.__$scale) : s > l && (t += (s - l) / e.__$scale, i.x = s / e.__$scale), e.panBy(-t, -o)
	}

	function i(e) {
		return Math.pow(2, e)
	}

	function n(e) {
		return Math.round(Math.log(e) / Math.log(2))
	}

	function a() {
		this.__$maxScale = i(this.__$maxZoom - this.getZoom()), this.__$minScale = i(this.__$minZoom - this.getZoom());
		var e = this.__$rect_sw,
			t = this.__$rect_ne,
			o = this.getProjection(),
			n = Math.pow(2, this.getZoom()),
			a = o.fromLatLngToPoint(this.getBounds().getNorthEast()),
			r = o.fromLatLngToPoint(this.getBounds().getSouthWest()),
			s = o.fromLatLngToPoint(t),
			c = o.fromLatLngToPoint(e);
		this.__$rect = {
			top: -(c.y - r.y) * n,
			bottom: (a.y - s.y) * n,
			left: -(s.x - a.x) * n,
			right: (r.x - c.x) * n
		}, this.__$rect.top > 0 && (this.__$rect.top = 0), this.__$rect.bottom < 0 && (this.__$rect.bottom = 0), this.__$rect.left > 0 && (this.__$rect.left = 0), this.__$rect.right < 0 && (this.__$rect.right = 0), this.__$now = {
			x: 0,
			y: 0
		}
	}

	function r(e) {
		this.__$width = this.getDiv().getBoundingClientRect().width / 2, this.__$height = this.getDiv().getBoundingClientRect().height / 2, a.call(this, e)
	}

	function s(e) {
		if (!t.__$markerDragged()) switch (this.__$endFn || (this.__$moveFn = c.bind(this), this.__$endFn = l.bind(this)), this.__$cancel && this.__$cancel(), t.__$pointNumber()) {
			case 1:
				this.getDiv().addEventListener("touchmove", this.__$moveFn, !0), this.getDiv().addEventListener("touchend", this.__$endFn, !0), this.__$isBind = !0, this.__$prePosition = {
					x: e.touches[0].clientX,
					y: e.touches[0].clientY
				}, this.__$preprePosition = this.__$prePosition, this.__$preTime = e.timeStamp, this.__$prepreTime = this.__$preTime;
				break;
			case 2:
				this.__$isBind || (this.getDiv().addEventListener("touchmove", this.__$moveFn, !0), this.getDiv().addEventListener("touchend", this.__$endFn, !0), this.__$isBind = !0), this.__$prePosition = {
					x: (e.touches[0].clientX + e.touches[1].clientX) / 2,
					y: (e.touches[0].clientY + e.touches[1].clientY) / 2
				};
				var o = this.getDiv().getBoundingClientRect();
				this.__$offsetX = (o.left + o.right) / 2 - this.__$prePosition.x, this.__$offsetY = (o.top + o.bottom) / 2 - this.__$prePosition.y, this.__$preprePosition = this.__$prePosition, this.__$prepreTime = this.__$preTime, this.__$preTime = e.timeStamp, this.__$mId = e.touches[1].identifier, this.__$destance = Math.sqrt(Math.pow(e.touches[0].clientX - e.touches[1].clientX, 2) + Math.pow(e.touches[0].clientY - e.touches[1].clientY, 2))
		}
	}

	function c(e) {
		if (!t.__$markerDragged()) switch (this.__$prepreTime = this.__$preTime, this.__$preTime = e.timeStamp, t.__$pointNumber()) {
			case 1:
				var i = e.touches[0].clientX,
					n = e.touches[0].clientY;
				o(this, i - this.__$prePosition.x, n - this.__$prePosition.y), this.__$preprePosition = this.__$prePosition, this.__$prePosition = {
					x: i,
					y: n
				};
				break;
			default:
				var i = (e.touches[0].clientX + e.touches[1].clientX) / 2,
					n = (e.touches[0].clientY + e.touches[1].clientY) / 2,
					a = Math.sqrt(Math.pow(e.touches[0].clientX - e.touches[1].clientX, 2) + Math.pow(e.touches[0].clientY - e.touches[1].clientY, 2));
				this.__$preScale = this.__$scale, this.__$scale = a / this.__$destance, this.__$scale > this.__$maxScale && (this.__$scale = this.__$maxScale), this.__$scale < this.__$minScale && (this.__$scale = this.__$minScale);
				var r = this.__$scale - this.__$preScale;
				o(this, i - this.__$prePosition.x + this.__$offsetX * r, n - this.__$prePosition.y + this.__$offsetY * r);
				var s = this;
				window.requestAnimationFrame(function() {
					s.getDiv().firstElementChild.style.webkitTransform = "scale(" + s.__$scale + ")", s.getDiv().firstElementChild.style.transform = "scale(" + s.__$scale + ")", s = null
				}), this.__$preprePosition = this.__$prePosition, this.__$prePosition = {
					x: i,
					y: n
				}
		}
	}

	function l(e) {
		if ("__$mId" in this && (!e.touches[1] || e.touches[1].identifier !== this.__$mId)) {
			var i = n(this.__$scale);
			this.__$scale = 1;
			var a = this;
			window.requestAnimationFrame(function() {
				a.getDiv().firstElementChild.style.webkitTransform = "scale(" + a.__$scale + ")", a.getDiv().firstElementChild.style.transform = "scale(" + a.__$scale + ")", a = null
			}), this.setZoom(this.getZoom() + i), this.__$preprePosition = null, delete this.__$preScale, delete this.__$offsetX, delete this.__$offsetY, delete this.__$destance, delete this.__$mId
		}
		if (!e.touches[0] || e.touches[0].identifier !== t.__$firstTouchid()) {
			if (this.getDiv().removeEventListener("touchmove", this.__$moveFn, !0), this.getDiv().removeEventListener("touchend", this.__$endFn, !0), this.__$isBind = !1, this.__$prepreTime && this.__$preprePosition) {
				for (var r = e.timeStamp - this.__$prepreTime, s = null, c = 0, l = e.changedTouches.length; l > c; ++c)
					if (e.changedTouches[c].identifier === t.__$firstTouchid()) {
						s = e.changedTouches[c];
						break
					}
				var d = (s.clientX - this.__$preprePosition.x) / (r / 1e3),
					u = (s.clientY - this.__$preprePosition.y) / (r / 1e3);
				if (0 !== d || 0 !== u) {
					var p = Math.sqrt(d * d + u * u),
						m = 1e3,
						h = -m * d / p,
						g = -m * u / p,
						f = p / m,
						y = e.timeStamp,
						_ = 0,
						v = 0,
						w = this,
						S = window.requestAnimationFrame(function() {
							var e = ((new Date).getTime() - y) / 1e3;
							e > f ? e = f : S = window.requestAnimationFrame(arguments.callee);
							var t = d * e + .5 * h * e * e,
								i = u * e + .5 * g * e * e;
							o(w, t - _, i - v), _ = t, v = i
						});
					this.__$cancel = function() {
						window.cancelRequestAnimationFrame(S), delete this.__$cancel, w = null
					}
				}
			}
			delete this.__$prePosition, delete this.__$preprePosition, delete this.__$preTime, delete this.__$prepreTime, delete this.__$mId
		}
	}
	return window.requestAnimationFrame || (window.requestAnimationFrame = window.webkitRequestAnimationFrame), window.cancelRequestAnimationFrame || (window.cancelRequestAnimationFrame = window.webkitCancelRequestAnimationFrame), window.mapRect = {
		init: function(e, t, o, i, n) {
			e.__$rect_sw = t, e.__$rect_ne = o, e.__$rect = null, e.__$now = null, e.__$scale = 1, e.__$width = 0, e.__$height = 0, e.__$minZoom = i || 3, e.__$maxZoom = n || 21, e.__$minScale = 0, e.__$maxScale = 0, e.setOptions({
				draggable: !1
			}), gogle.maps.event.addListener(e, "projection_changed", r), gogle.maps.event.addListener(e, "zoom_changed", a), e.getDiv().addEventListener("touchstart", s.bind(e), !0)
		},
		moveToCenter: function(e) {
			var t = e.getMap(),
				n = t.getProjection(),
				a = n.fromLatLngToPoint(t.getCenter()),
				r = n.fromLatLngToPoint(e.getPosition()),
				s = i(t.getZoom());
			o(t, (a.x - r.x) * s, (a.y - r.y) * s)
		}
	}
}]).factory("markerEvent", function() {
	return {
		resize: function(e, t) {
			gogle.maps.event.addListener(e.getMap(), "zoom_changed", function() {
				e.getMap() === this && t.call(e, this.getZoom())
			})
		}
	}
}), angular.module("app.poi.controller", []).controller("poiDetailCtrl", ["$scope", "$rootScope", "$state", "$stateParams", "$timeout", "$ionicSlideBoxDelegate", "$ionicListDelegate", "CONFIG", "RootScopeProxy", "viewArgument", "resUser", "resPoi", "dateFilter", "utils", "$ionicScrollDelegate", function(e, t, o, i, n, a, r, s, c, l, d, u, p, m, h) {
	e.$emit("baseCtrl.cleanCache"), e.modified = !1, e.title = i.title, e.poiId = i.id, e.journeyId = i.journeyId, e.sliderHeight = s.hImgTp, e.imgSize = s.imgSizeTopic, e.imgSizeThumb = s.imgSizeThumb, e.hostImg = s.hostImg, e.content = {
		value: ""
	}, e.limitTag = 45, e.limitWord = 60, e.submitComment = function() {
		u.comment({
			poi_id: e.poi.id,
			content: e.content.value
		}, function(o) {
			if (0 == o.data.code) {
				var i = e.poi.comment.list,
					n = {
						id: o.data.id,
						comment: e.content.value,
						comment_time: p(new Date, "yyyy-MM-dd hh:mm:ss"),
						is_liked: !1,
						like_num: 0,
						user_id: t.user.info.user_id,
						user_name: t.user.info.user_name,
						avatar: t.user.info.avatar
					};
				i.length > 3 && i.splice(-1), i.unshift(n), e.poi.comment.count++, e.content.value = ""
			}
		})
	}, e.$on("$ionicView.afterEnter", function(t, o) {
		var i = l.get();
		"back" == o.direction && i && (e.poi.comment.list = i.slice(0, 3), e.poi.comment.count = i.length)
	}), e.likeComment = function(e) {
		var t = e.is_liked ? "0" : "1";
		u.likeComment({
			comment_id: e.id,
			action: t
		}, function(o) {
			0 == o.data.code && ("0" == t ? e.like_num -= 1 : e.like_num += 1, e.is_liked = !e.is_liked)
		})
	}, e.content = {
		value: ""
	}, e.replyUser = function(t, o) {
		var i = t.currentTarget.parentNode.parentNode.parentNode.querySelector('[contenteditable="true"]');
		n(function() {
			i.focus(), e.content.value = "@" + o + "  ", n(function() {
				var e, t;
				window.getSelection && document.createRange ? (t = document.createRange(), t.selectNodeContents(i), t.collapse(!0), t.setEnd(i, i.childNodes.length), t.setStart(i, i.childNodes.length), e = window.getSelection(), e.removeAllRanges(), e.addRange(t)) : document.body.createTextRange && (t = document.body.createTextRange(), t.moveToElementText(i), t.collapse(!0), t.select())
			}, 10)
		}, 300)
	}, e.clickAvatar = function(e, t, i) {
		o.go("app.userHome", {
			id: e,
			name: t,
			avatar: i
		})
	}, e.onClickAllComments = function() {
		o.go("app.commentList", {
			type: "poi",
			id: e.poi.id,
			title: e.poi.name
		})
	};
	var g = function() {
		u.getDetail({
			poi_id: e.poiId,
			journey_id: e.journeyId
		}, function(t) {
			0 == t.data.code && (e.poi = t.data, e.poi.distance = m.calcDistance([e.poi.lat, e.poi.lng], [s.latitude, s.longitude]), a.$getByHandle("poi-detail-slider").update())
		})
	};
	n(function() {
		g()
	}), e.onClickStory = function(e) {
		o.go("app.storyDetail", {
			id: e
		})
	}, e.onClickMarkPoi = function() {
		var t = e.poi.is_marked ? 0 : 1;
		d.markPoi({
			poi_id: e.poi.id,
			action: t
		}, function(t) {
			0 == t.data.code && (e.poi.is_marked = !e.poi.is_marked, e.poi.modified = !0)
		})
	}, e.onClickAddress = function() {
		console.log("click address...");
		var t = {
			id: e.poi.id,
			name: e.poi.name,
			type: e.poi.type,
			lat: e.poi.lat,
			lng: e.poi.lng,
			address: e.poi.address
		};
		l.put(t), o.go("app.mapAddress")
	};
	var f = new c(e);
	f.$on("signSuccess", function() {
		g()
	}), e.resizeScroll = function() {
		n(h.resize.bind(h))
	}
}]).controller("poiListCtrl", ["$scope", "$state", "$stateParams", "$timeout", "$ionicScrollDelegate", "CONFIG", "viewArgument", "resPoi", function(e, t, o, i, n, a, r, s) {
	e.items = [], e.type = o.type, e.title = o.title, e.option = o.option, e.hasFilter = o.filter, e.page = 1, e.hasMore = !0, e.imgSizeThumb = a.imgSizeThumb, e.hostImg = a.hostImg;
	var c = function() {
			s.getHot({
				page: e.page
			}, function(t) {
				0 == t.data.code && (e.hasMore = t.data.list.length == t.data.per_num, e.items = 1 == e.page ? t.data.list : e.items.concat(t.data.list), e.httpRequesting = !1, e.tags = t.data.tags, e.tags.unshift({
					code: "hot",
					name: "热门标签"
				})), e.$broadcast("scroll.infiniteScrollComplete")
			}, function() {
				e.httpRequesting = !1
			})
		},
		l = function() {
			switch (e.httpRequesting = !0, e.type) {
				case "hot":
					c();
					break;
				case "chat":
					s.search({
						key_word: e.option,
						page: e.page
					}, function(t) {
						0 == t.data.code && (t.data.list.length < t.data.per_num && (e.hasMore = !1), e.items = e.items.concat(t.data.list), e.httpRequesting = !1, ++e.page), e.$broadcast("scroll.infiniteScrollComplete")
					}, function() {
						e.httpRequesting = !1
					})
			}
		};
	i(function() {
		l()
	}), e.onClickPoi = function(e, o) {
		t.go("app.poiDetail", {
			id: e,
			title: o
		})
	};
	var d = e.page;
	e.loadMore = function() {
		d < e.page && e.hasMore && (d = e.page, l())
	}
}]).controller("postcardListCtrl", ["$rootScope", "$scope", "CONFIG", "cardModal", "resPoiCard", function(e, t, o, i, n) {
	t.imgSizeCardThumb = o.imgSizeCardThumb, t.thumbPaddingTop = o.hCard / 480 * 33.13 + "%", t.onClickPostcard = function(o) {
		e.card = t.postcards[o], i.show()
	}, t.addPostcard = function() {}, t.postcards = n.getCard()
}]), angular.module("app.poi", ["app.poi.controller", "app.poi.route", "app.poi.modal"]), angular.module("app.poi.route", []).config(["$stateProvider", "$urlRouterProvider", "$locationProvider", "PERMISSIONS", function(e, t, o, i) {
	e.state("app.poiDetail", {
		url: "/poiDetail/:id/:journeyId/:title",
		cache: !0,
		templateUrl: "app/poi/templates/poiDetail.html",
		controller: "poiDetailCtrl"
	}).state("app.poiList", {
		url: "/poiList/:type/:option/:filter/:title",
		cache: !0,
		templateUrl: "app/poi/templates/poiList.html",
		controller: "poiListCtrl"
	}).state("app.postcardList", {
		url: "/postcardList/:id",
		cache: !0,
		templateUrl: "app/poi/templates/postcardList.html",
		controller: "postcardListCtrl"
	}).state("app.poiIntro", {
		url: "/poiIntro/:id",
		cache: !1,
		templateUrl: "app/poi/templates/poiIntro.html",
		controller: "poiIntroCtrl"
	}).state("app.newStory", {
		url: "/newStory/:type/:id/:title",
		cache: !1,
		templateUrl: "app/poi/templates/newStory.html",
		controller: "newStoryCtrl",
		data: {
			permission: i.needSignIn
		}
	})
}]), angular.module("app.postcard.controller", []).controller("postcardTemplate", ["$scope", "$state", "$cordovaImagePicker", "viewArgument", "file", "convert", "$cordovaFile", "$timeout", "statusBar", function(e, t, o, i, n, a, r, s, c) {
	function l(e, o) {
		e && 0 === e.length || (i.put(e), t.go("app.postcardFilter", {
			template: o
		}))
	}
	e.selectTemplate = function(e) {
		switch (e) {
			case "rome":
			case "alone":
				window.cordova ? (s(function() {
					JAlert.show("加载图片..."), c.hide(), c.fullScreen(!0)
				}, 300), navigator.camera.getPicture(function(t) {
					l([t], e), navigator.camera.cleanup(function() {}, function() {})
				}, function() {
					JAlert.hide(), c.show(), c.fullScreen(!1), console.log("fail", arguments), navigator.camera.cleanup(function() {}, function() {})
				}, {
					quality: 100,
					destinationType: navigator.camera.DestinationType.DATA_URL,
					sourceType: navigator.camera.PictureSourceType.PHOTOLIBRARY,
					encodingType: navigator.camera.EncodingType.JPEG,
					saveToPhotoAlbum: !1,
					targetWidth: 720,
					targetHeight: 720,
					mediaType: navigator.camera.MediaType.PICTURE,
					correctOrientation: !0
				})) : l([{
					data: "/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAMCAgICAgMCAgIDAwMDBAYEBAQEBAgGBgUGCQgKCgkICQkKDA8MCgsOCwkJDRENDg8QEBEQCgwSExIQEw8QEBD/2wBDAQMDAwQDBAgEBAgQCwkLEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBD/wAARCAAFAAUDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwD50ooor8MP9Uz/2Q=="
				}], e)
		}
	}
}]).controller("pictureSelect", ["$scope", "$stateParams", function() {}]).controller("postcardFilter", ["$scope", "viewArgument", "convert", "canvasResize", "$timeout", "$stateParams", "PhotoManager", "$ionicHistory", "$rootScope", "$cordovaFile", "Recorder", "$cordovaDatePicker", "$cordovaImagePicker", "$cordovaGeolocation", "resPostcard", "modal", "file", "$ionicScrollDelegate", "statusBar", "$cordovaKeyboard", "CONFIG", "$ionicActionSheet", "weixinShare", "mHistory", "$ionicPlatform", function(e, t, o, i, n, a, r, s, c, l, d, u, p, m, h, g, f, y, _, v, w, S, b, k, $) {
	function x(t) {
		if (e.showPan = "" == t ? !1 : e.panName === t ? !e.showPan : !0, "t" in x && n.cancel(x.t), e.showPan)
			if (e.panName = t, "filters" === t) e.popUpShow = !0, x.s && (y.scrollBy(0, -100, !0), x.s = !1);
			else {
				var o = e.popUpShow ? 500 : 100;
				e.popUpShow = !1, x.t = n(function() {
					x.s = !0, y.scrollBy(0, 100, !0)
				}, o)
			} else e.panName = "", x.s ? (y.scrollBy(0, -100, !0), x.s = !1) : e.popUpShow = !1
	}

	function P() {
		var e = E.position;
		e > E.time ? e = E.time : E.t = n(arguments.callee, 50), E.p = e
	}

	function C() {
		function t() {
			e._hasUploading = !0, JAlert.show("正在保存..."), a.timeout = !1, R.date = e.date.valueOf(), R.address_id = e.positionInfo.id, R.address_name = e.positionInfo.en_name || e.positionInfo.zh_name, R.text = e.textString.value.trim(), R.text_id = R.text === e.textOP.rawText ? e.textOP.rawId : "0", R.text_size = e.textStyle.fontSize, R.text_font = e.textStyle.fontFamily, R.author = e.authorString.value.trim(), R.length = 2, E.hasRecordFile && ++R.length, n(), E.hasRecordFile && (R.duration = E.time, l.readAsDataURL(E.path, E.name).then(function(e) {
				a(s, u, o.dataURLtoBlob(e), "audio")
			}, function(e) {
				console.log("audio read fail:", e)
			})), html2canvas(document.querySelector(".postcard-filter .imageContainer"), {
				onrendered: function(t) {
					e.saveCanvas = t, a(r, "postcard/" + c.user.info.user_id + "_main_" + d + ".jpg", o.dataURLtoBlob(o.canvasToDataUrl(t, "image/jpeg")), "main")
				},
				useCORS: !0
			}).then(function() {
				html2canvas(document.querySelector(".postcard-filter"), {
					onrendered: function(t) {
						e.saveCanvas = t, a(r, "postcard/" + c.user.info.user_id + "_clip_" + d + ".jpg", o.dataURLtoBlob(o.canvasToDataUrl(t, "image/jpeg")), "clip")
					},
					useCORS: !0
				})
			}).then(function() {
				if ("wifi" === c.user.networkState) {
					var e = "postcard/" + c.user.info.user_id + "_raw_" + d + ".jpg";
					f.upload2({
						token: r,
						name: e,
						file: o.dataURLtoBlob(o.canvasToDataUrl(O[0]._originCanvas, "image/jpeg"))
					}, function() {
						_ = e, i()
					}, function() {}, function() {}, function() {})
				}
			})
		}

		function i() {
			y && _ && h.saveRawImage({
				postcard_id: y,
				img_url: _
			})
		}

		function n() {
			p = [], m = R.length
		}

		function a(t, o, n, r) {
			function s() {
				switch (r) {
					case "main":
						e.share.main_url = "http://cdn3.zouke.com/" + o;
						break;
					case "clip":
						e.share.clip_url = "http://cdn3.zouke.com/" + o
				}
				R[r + "_url"] = o, --R.length, 0 === R.length && (delete R.length, JAlert.hide(), h.save(R, function(t) {
					0 === t.data.code && (g.getModal("savePostcard").show(), y = e.share.id = e.sendInfo.id = t.data.id, i())
				}))
			}
			if (n) {
				var c = {
					p: 0
				};
				p.push(c), p[o] = c, f.upload2({
					token: t,
					name: o,
					file: n
				}, s, function() {
					e.clipNow = !1, JAlert.hide(), JAlert.notify("图片保存出错!")
				}, function() {
					a.timout || (a.timout = !0, e.clipNow = !1, JAlert.hide(), JAlert.notify("图片保存超时"))
				}, function(e) {
					p[o].p = e.loaded / e.total;
					for (var t = 0, i = 0; i < p.length; ++i) t += p[i].p;
					var n = (t / m * 100).toFixed(1);
					n > 99 && (n = 99), JAlert.show("正在保存 " + n + "%", !0)
				})
			} else s()
		}
		if (!e.positionInfo || !e.positionInfo.en_name && !e.positionInfo.zh_name) return void JAlert.showOnce("明信片信息不完整");
		var r = "",
			s = "",
			d = (new Date).valueOf(),
			u = "postcard/" + c.user.info.user_id + "_audio_" + d + E.name;
		return void(c.user.isAndroid && E.hasRecordFile ? (f.getMP3Token(u, function(e) {
			s = e, r && t()
		}, function() {
			e.clipNow = !1
		}), f.getToken(function(e) {
			r = e, s && t()
		}, function() {
			e.clipNow = !1
		})) : f.getToken(function(e) {
			r = s = e, t()
		}, function() {
			e.clipNow = !1
		}));
		var p, m, y, _
	}

	function T() {
		B = n(function() {
			e.random = Math.floor(10 * Math.random()), B = n(arguments.callee, 100)
		}, 100)
	}

	function A() {
		n.cancel(B)
	}

	function M() {
		return e.prepublish ? void angular.element(document.querySelector(".publish-bar>span")).triggerHandler("click") : void(e.clipNow ? k.isEmpty() || k.goBack() : e.back(!0))
	}
	n(function() {
		y.freezeScroll(!0), y.$getByHandle("image-filter").freezeScroll(!1)
	});
	var I = {
			getPicture: function(e, t, o, i) {
				navigator.camera.getPicture(e, t, {
					quality: 100,
					destinationType: navigator.camera.DestinationType.DATA_URL,
					sourceType: navigator.camera.PictureSourceType.PHOTOLIBRARY,
					encodingType: navigator.camera.EncodingType.JPEG,
					saveToPhotoAlbum: !1,
					targetWidth: o,
					targetHeight: i,
					mediaType: navigator.camera.MediaType.PICTURE,
					correctOrientation: !0
				})
			},
			getPictureList: function(e, t, o, i, n, a) {
				window.imagePicker.getPictures(e, t, {
					maximumImagesCount: i,
					minimumImagesCount: o,
					width: n,
					height: a,
					quality: 100
				})
			},
			clip: function(e, t, i) {
				var n = new Image;
				n.addEventListener("load", function() {
					i && i(o.clip(n, t, t, "cover"), t)
				}), n.src = e
			},
			getPosition: function(t, o, i) {
				R.lat = t, R.lng = o, h.getAddress({
					lat: t,
					lng: o
				}, function(t) {
					0 === t.data.code && (e.hasActivity = t.data.in_activity, e.positionList = t.data.list, e.positionInfo = e.positionList[0], e.textOP._tempRandomText = t.data.briefs, e.textOP._page = 1, e.textOP._pointer = -1, e.textOP.next(), e.templateImageList = t.data.imgs, i && i())
				}, function() {
					JAlert.confirm("加载超时, 是否重试?", function() {
						I.getPosition(t, o, i)
					}, function() {})
				})
			},
			getFixPosition: function(e, t) {
				null == e || null == t ? (JAlert.notify("无法获取图片位置信息"), m.getCurrentPosition({
					timeout: 2e3,
					maximumAge: 3e4,
					enableHighAccuracy: !0
				}).then(function(e) {
					I.getPosition(e.coords.latitude, e.coords.longitude)
				}, function() {
					JAlert.notify("定位失败！"), I.getPosition("", "")
				})) : n(function() {
					I.getPosition(e, t)
				})
			}
		},
		L = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAGUlEQVQYV2O8e/fufwYiAOOoQnyhRP3gAQBG4CPnByUIhQAAAABJRU5ErkJggg==";
	e.templateImageList = [L, L, L, L];
	var D = t.get(),
		O = [];
	O.bindIndex = 0, n(function() {
		for (var e = document.querySelectorAll(".imageContainer canvas"), t = 0, o = D.length; o > t; ++t) O[t] = new r(e[t], "data:image/jpeg;base64," + D[t].data);
		JAlert.hide()
	}, 300);
	var j = e.template = a.template;
	e.hasStamp = !0, e.textString = {
			value: ""
		}, e.filterNames = r.filterNames, e.fontNames = ["fzjl"], e.authorString = {
			value: c.user.info.user_name
		}, e.textStyle = {
			fontSize: "20px",
			fontFamily: e.fontNames[0]
		}, e.date = new Date, e.positionList = [], e.positionInfo = null,
		function() {
			I.getFixPosition(D[0].lat, D[0].lng)
		}(), e.chooseAddress = function(t) {
			return window.cordova && v.isVisible() ? void v.close() : (t && (e.positionInfo = t), void g.getModal("addressSelect").hide())
		}, e.search = {
			keyword: ""
		}, e.$watch("search.keyword", function(t) {
			t && h.searchPosition({
				key_word: t
			}, function(t) {
				0 === t.data.code && (e.positionList = t.data.list, y.$getByHandle("postcard-poi").scrollTop())
			})
		}), g.createModal("addressSelect", "app/postcard/templates/poiSearchModal.html", "up", !0, e), g.createModal("savePostcard", "app/postcard/templates/saveModal.html", "up", !0, e, !1), e.showManageOperator = !1, e.showTextOperator = !1, e.showRecorderOperator = !1, e.showStampOperator = !1, e.showPan = !1, e.panName = "", e.imageOperator = function(t, o) {
			e.showManageOperator = !e.showManageOperator, x(e.showManageOperator ? "filters" : ""), e.showTextOperator = !1, e.showRecorderOperator = !1, e.showStampOperator = !1, O.bindIndex = o, t.stopPropagation()
		}, e.textOperator = function(t) {
			e.showTextOperator = !e.showTextOperator, x(e.showTextOperator ? "text" : ""), e.showManageOperator = !1, e.showRecorderOperator = !1, e.showStampOperator = !1, t.stopPropagation()
		}, e.stampOperator = function(t) {
			e.showManageOperator = !1, e.showTextOperator = !1, e.showPan = !1, e.showRecorderOperator = !1, e.showStampOperator = !e.showStampOperator, t.stopPropagation()
		}, e.closeOperator = function() {
			e.showManageOperator = !1, e.showTextOperator = !1, e.showRecorderOperator = !1, x(""), e.showStampOperator = !1
		}, e.recorderOperator = function() {
			e.showManageOperator = !1, e.showTextOperator = !1, x(""), e.showRecorderOperator = !0, e.showStampOperator = !1
		}, e.selectDate = function() {
			u.show({
				date: e.date,
				mode: "date",
				allowOldDates: !0,
				allowFutureDates: !0,
				doneButtonLabel: "选择",
				doneButtonColor: "#5FB2B2",
				cancelButtonLabel: "取消",
				cancelButtonColor: "#666666"
			}).then(function(t) {
				t && (e.date = t)
			})
		}, e.selectAddress = function() {
			g.getModal("addressSelect", e).show().then(function() {
				y.$getByHandle("postcard-poi").freezeScroll(!1)
			})
		}, e.stampOP = {
			remove: function() {
				e.hasStamp = !1
			}
		}, e.imageOP = {
			filter: function() {
				x("filters")
			},
			rotate: function() {
				++O[O.bindIndex].rotate
			},
			render: function(e) {
				O[O.bindIndex].render(e)
			},
			get filterName() {
				var e = O[O.bindIndex];
				return e ? e.filter : ""
			},
			reSelectImage: function(t) {
				function o() {
					console.log("getPicture fail")
				}

				function i(t, o) {
					I.clip(t, 160, function(t) {
						e.$apply(function() {
							e.templateImageList[o] = t
						})
					})
				}
				angular.isNumber(t) ? c.user.isIOS ? I.getPictureList(function(e) {
					for (var t = 0, o = e.length; o > t; ++t) i("data:image/jpeg;base64," + e[t].data, t);
					console.log(e)
				}, o, 1, 4, 160, 160) : I.getPicture(function(e) {
					i("data:image/jpeg;base64," + e.data, t)
				}, o, 160, 160) : I.getPicture(function(t) {
					e.closeOperator(), O[O.bindIndex] = new r(O[O.bindIndex]._canvas, "data:image/jpeg;base64," + t.data), I.getFixPosition(t.lat, t.lng)
				}, o, 720, 720)
			}
		}, e.textOP = {
			text: function() {
				x("text")
			},
			font: function() {
				x("fonts")
			},
			bigger: function() {
				var t = parseFloat(e.textStyle.fontSize) + 2;
				t > 32 && (t = 32), e.textStyle.fontSize = t + "px"
			},
			smaller: function() {
				var t = parseFloat(e.textStyle.fontSize) - 2;
				14 > t && (t = 14), e.textStyle.fontSize = t + "px"
			},
			setFont: function(t) {
				e.textStyle.fontFamily = t
			},
			next: function() {
				++this._pointer, this._tempRandomText && this._tempRandomText[this._pointer] ? e.textString.value = this._tempRandomText[this._pointer].brief : this._randomText(function(t) {
					0 === t.data.code && (e.textOP._tempRandomText = e.textOP._tempRandomText.concat(t.data.list), e.textString.value = e.textOP._tempRandomText[e.textOP._pointer].brief)
				})
			},
			pre: function() {
				this._pointer > 0 && (--this._pointer, e.textString.value = this._tempRandomText[this._pointer].brief)
			},
			_tempRandomText: null,
			_page: 1,
			_randomText: function(t) {
				++this._page, h.randomTextByPoi({
					id: e.positionInfo.id,
					page: this._page
				}, t)
			},
			_pointer: 0,
			get pointer() {
				return this._pointer
			},
			get rawText() {
				return this._tempRandomText ? this._tempRandomText[this._pointer].brief : ""
			},
			get rawId() {
				return this._tempRandomText ? this._tempRandomText[this._pointer].id : ""
			},
			authorName: function(t) {
				e.showManageOperator = !1, e.showTextOperator = !1, e.showRecorderOperator = !1, e.showStampOperator = !1, x("authorName"), t.stopPropagation()
			}
		};
	var E = e.recorderOP = new d("recorder");
	E.p = 0, E.play = function() {
		d.prototype.play.call(this), E.t = n(P, 50)
	}, E.stop = function() {
		d.prototype.stop.call(this), n.cancel(E.t)
	}, E.startRecord = function() {
		d.prototype.startRecord.call(this), E.ttt = n(function() {
			E.stopRecord()
		}, 9e4), T()
	}, E.stopRecord = function() {
		E.tt && n.cancel(E.tt), E.ttt && n.cancel(E.ttt), e.showRecorderTip = !0, E.tt = n(function() {
			delete e.showRecorderTip
		}, 1500), d.prototype.stopRecord.call(this), A()
	}, E.toggleRecord = function() {
		this.isRecording ? this.stopRecord() : this.startRecord()
	}, E.getTime = function() {
		if (this.time) {
			var e = Math.floor(this.time / 6e4),
				t = Math.floor(this.time % 6e4 / 1e3),
				o = "";
			0 != e && (o += e + "'"), o += t + '"';
			var i = this.p;
			if (this.isPlaying) {
				o = "";
				var n = Math.floor(i / 6e4),
					a = Math.floor(i % 6e4 / 1e3);
				0 != e && (o += n + "'"), o += a + '"'
			}
			return o
		}
	};
	var R = e.saveInfo = {
		template: j,
		version: 1,
		audio_url: "",
		main_url: "",
		clip_url: "",
		allow_open: !0,
		text_id: "",
		text: "",
		text_size: "",
		text_font: "",
		address_id: "",
		address_name: "",
		date: "",
		author: "",
		duration: 0,
		lat: "",
		lng: ""
	};
	e.save = function() {
		e.prepublish = !0, e.clipNow = !0, E.stopRecord(), E.stop()
	}, e.stopPublish = function() {
		e.prepublish = !1, e.clipNow = !1
	}, e.publish = function() {
		e.prepublish = !1, n(C, 200)
	}, e.toggleOpen = function() {
		R.allow_open = !R.allow_open
	}, e.back = function(e) {
		e ? JAlert.confirm("确认退出编辑?", function() {
			s.goBack(), _.show(), _.fullScreen(!1)
		}, function() {}) : (s.goBack(), _.show(), _.fullScreen(!1))
	}, e.random = 0;
	var B = 0;
	e.textareaBlur = function() {
		n(function() {
			e.showPan ? y.scrollBottom(!0) : y.scrollTop(!0)
		}, 200)
	}, e.$on("$destroy", function() {
		e.recorderOP.release()
	}), e.defaultLayer = "main", e.share = function() {
		function t() {
			JAlert.notify("已分享")
		}

		function o() {
			JAlert.notify("分享失败")
		}
		var i = {
				url: w.hostWWW + "/postcard/detail?id=" + arguments.callee.id + "&uid=" + c.user.info.user_id,
				title: "有声音的明信片·有故事的旅行",
				desc: e.textString.value.replace(/\n/g, " "),
				image: arguments.callee.main_url + "-weixin"
			},
			n = arguments.callee.clip_url;
		S.show({
			buttons: [{
				text: '<i class="ic ic-weixin"></i>微信好友'
			}, {
				text: '<i class="ic ic-weixin-moment"></i>朋友圈（完整卡片）'
			}, {
				text: '<i class="ic ic-weixin-moment"></i>朋友圈（静态图片）'
			}],
			cssClass: "share-sheet",
			cancelText: "取消",
			cancel: function() {},
			buttonClicked: function(a) {
				switch (a) {
					case 0:
						b.page2Friend(i, t, o);
						break;
					case 1:
						i.desc = "「" + (e.positionInfo.city || "欧优游") + "」寄出: " + i.desc, b.page2Timeline(i, t, o);
						break;
					case 2:
						b.image2Timeline(n, t, o)
				}
				return !0
			}
		})
	}, e.saveToLocal = function() {
		JAlert.showOnce("正在保存.."), window.canvas2ImagePlugin.saveImageDataToLibrary(function() {
			JAlert.notify("保存成功")
		}, function(e) {
			JAlert.notify(e)
		}, e.saveCanvas)
	}, e.sendInfo = {
		id: "",
		from_name: "",
		from_zipcode: "",
		from_address: "",
		to_name: "",
		to_zipcode: "",
		to_address: ""
	}, e.send = function() {
		e.sendInfo.from_name = e.saveInfo.author, n(function() {
			k.go("postcard")
		}, 300)
	}, e.mBack = function() {
		k.goBack(), window.cordova && v.isVisible() && v.close()
	}, e.sendPostcard = function() {
		e.sendInfo.to_name && e.sendInfo.to_zipcode && e.sendInfo.to_address ? h.saveMailAddress(e.sendInfo, function(e) {
			0 === e.data.code ? (JAlert.alert(0 === e.data.type ? "提交成功!\n欧优游将尽快为你打印并邮寄明信片" : "亲!你已超过免费邮寄的限额"), k.goBack()) : JAlert.notify(e.data.msg)
		}) : JAlert.notify("信息未填写完整!")
	};
	var F;
	e.$on("$ionicView.afterEnter", function() {
		F = $.registerBackButtonAction(M, 201)
	}), e.$on("$ionicView.beforeLeave", function() {
		F()
	})
}]), angular.module("app.postcard", ["app.postcard.controller", "app.postcard.route"]), angular.module("app.postcard.route", []).config(["$stateProvider", "$urlRouterProvider", "$locationProvider", "PERMISSIONS", function(e, t, o, i) {
	e.state("app.postcardTemplate", {
		url: "/postcardTemplate",
		cache: !0,
		templateUrl: "app/postcard/templates/postcardTemplate.html",
		controller: "postcardTemplate",
		data: {
			permission: i.needSignIn
		}
	}).state("app.pictureSelect", {
		url: "/pictureSelect/:template",
		cache: !1,
		templateUrl: "app/postcard/templates/pictureSelect.html",
		controller: "pictureSelect"
	}).state("app.postcardFilter", {
		url: "/postcardFilter/:template",
		cache: !1,
		templateUrl: "app/postcard/templates/postcardFilter.html",
		controller: "postcardFilter",
		data: {
			permission: i.needSignIn
		}
	})
}]), angular.module("app.product.controller", []).controller("productCtrl", ["$scope", "$rootScope", "$document", "$timeout", "$ionicScrollDelegate", "$state", "$stateParams", "$ionicSlideBoxDelegate", "CONFIG", "viewArgument", "dateFilter", "resProduct", function(e, t, o, i, n, a, r, s, c, l, d, u) {
	e.pid = r.pid, e.title = "产品详情", e.imgHeight = c.hImgPd, e.imgSize = c.imgSizePd, e.headerTranslated = !1, e.header = o[0].body.querySelector(".nav-bar-container"), u.getDetail({
		pdId: e.pid
	}, function(t) {
		0 == t.data.code && (e.product = t.data, s.$getByHandle("product-handle").update())
	}), e.onClickUser = function(e, t, o) {
		a.go("app.userHome", {
			id: e,
			name: t,
			avatar: o
		})
	}, e.onClickMark = function() {
		var t = e.product.is_marked ? 0 : 1;
		u.mark({
			pd_id: e.pid,
			action: t
		}, function(t) {
			0 == t.data.code && (e.product.is_marked ? (e.product.is_marked = !1, JAlert.notify("已取消收藏")) : (e.product.is_marked = !0, JAlert.notify("已收藏")))
		})
	}, e.onClickComment = function() {
		t.user.isSigned || t.$emit("request:needSigned")
	}, e.onClickAllComments = function() {
		a.go("app.commentList", {
			type: "product",
			id: e.pid,
			title: e.product.title
		})
	}, e.onCommentInput = function() {
		i(function() {
			n.$getByHandle("product-content").scrollBottom(!0)
		}, 100)
	}, e.onClickCommentLike = function(t, o) {
		var i = e.product.comments.content[o],
			n = i.is_liked ? 0 : 1;
		u.likeComment({
			comment_id: t,
			action: n
		}, function(e) {
			0 == e.data.code && (i.is_liked ? i.like_num-- : i.like_num++, i.is_liked = !i.is_liked)
		})
	}, e.onSubmitComment = function() {
		"" != e.commentInput && u.comment({
			pd_id: e.pid,
			content: e.commentInput
		}, function(o) {
			if (0 == o.data.code) {
				var i = e.product.comments.content,
					n = {
						id: o.data.id,
						comment: e.commentInput,
						comment_time: d(new Date, "yyyy-MM-dd hh:mm:ss"),
						is_liked: !1,
						like_num: 0,
						user_id: t.user.info.user_id,
						avatar: t.user.info.avatar
					};
				i.length > 3 && i.splice(-1), i.unshift(n), e.product.comments.num++, e.commentInput = ""
			}
		})
	}, e.showFile = function(t) {
		switch (t) {
			case "officer":
				l.put({
					file: e.product.officer_file
				});
				break;
			case "freelancer":
				l.put({
					file: e.product.freelancer_file
				});
				break;
			case "retirees":
				l.put({
					file: e.product.retirees_file
				});
				break;
			case "studentship":
				l.put({
					file: e.product.studentship_file
				})
		}
		a.go("app.visaFile")
	}, e.checkExpress = function(e) {
		return this.product && "1" === this.product.express || !e.point
	}, e.onClickAddress = function(e) {
		if (!this.checkExpress(e)) {
			var t = {
				name: e.name,
				type: "AT",
				lat: e.gps.latitude,
				lng: e.gps.longitude,
				address: e.point,
				remark: e.mp_remark
			};
			l.put(t), a.go("app.meetingAddress")
		}
	}, e.$on("$ionicView.beforeLeave", function() {
		e.headerTranslated && e.header.classList.remove("title-balanced")
	}), e.$on("$ionicView.beforeEnter", function() {
		e.headerTranslated && e.header.classList.add("title-balanced")
	}), e.orderNow = function(e, t) {
		a.go("app.step1", {
			pid: e,
			cat: t
		})
	}, e.toggles = [!0, !0, !0, !0, !1, !1, !1], e.toggleClick = function(t) {
		e.toggles[t] = !e.toggles[t], i(function() {
			n.$getByHandle("product-content").resize()
		}, 200)
	}
}]).controller("meetingAddressCtrl", ["$scope", "$timeout", "viewArgument", "currentScope", "viewElement", "map", "CONFIG", function(e, t, o, i, n, a, r) {
	var s = null;
	e.mapWidth = r.devWidth + "px", e.mapHeight = .7 * r.devHeight - 20 + "px", e.poi = o.get(), void 0 != e.poi && (e.title = e.poi.name, i.ready(e, function() {
		var o = n.current().querySelector(".map");
		t(function() {
			s = a.createMap(o, e.poi, 17, "complex", !1, !1, {
				minZoom: 10,
				maxZoom: 18
			}), s.route([e.poi.lat, e.poi.lng], "walking"), s.showMarkers([e.poi], e.poi.type, !1, !1)
		}, 300)
	}), e.$on("$destroy", function() {
		s && s.destroy()
	}))
}]).controller("visaFileCtrl", ["$scope", "viewArgument", function(e, t) {
	e.fileHtml = t.get().file, e.title = "材料说明"
}]).controller("pdJourneyCtrl", ["$scope", "$http", "$stateParams", "resProduct", "CONFIG", function(e, t, o, i, n) {
	e.pid = o.pid, i.getJourney({
		pdId: o.pid
	}, function(t) {
		e.data = t.data, e.imgSize = n.imgFixWid
	})
}]).controller("step1Ctrl", ["$scope", "$rootScope", "$http", "$state", "$timeout", "$stateParams", "dateFilter", "orderFormData", function(e, t, o, i, n, a, r, s) {
	var c = a.pid,
		l = a.cat;
	s.clear();
	var d = e.orderData = s.create(l, c);
	d.getRemoteInfos();
	var u = ["预约选项 1/3", "定制选项 1/3", "预订选项 1/3"];
	e.title = d.isPersonal() ? u[1] : d.isMQL() || d.isGuide() ? u[0] : u[2], e.nextStep = function() {
		i.go("app.step2", {
			pid: c,
			cat: l
		})
	}, e.$on("monthChange", function(e, t) {
		e.stopPropagation(), d.getAvailDateByMonth(t)
	})
}]).controller("step2Ctrl", ["$scope", "$rootScope", "$http", "$state", "$stateParams", "$ionicModal", "CONFIG", "genPy", "orderFormData", function(e, t, o, i, n, a, r, s, c) {
	var l = (n.pid, n.cat, e.orderData = c.current());
	e.cIndex = l.personA, e.tIndex = l.personA + l.personC, e.title = "联系信息 2/3", l.chooseIndex = l.chooseIndex || [0], l.chooseIndex[-1] = l.chooseIndex[-1] || 0, e.loop = [];
	for (var d = 0, u = l.personInfos.length = l.getPersonNumber(); u > d; ++d) e.loop.push(d), e.orderData.personInfos[d] = e.orderData.personInfos[d] || null;
	e.choose = function(e) {
		i.go("app.contacts", {
			opt: "choose-" + e
		})
	}, e.getPinYin = function(e) {
		-1 === e && (l.contactInfo.pyname = s(l.contactInfo.name)), l.personInfos[e] && l.personInfos[e].name && (l.personInfos[e].pyname = s(l.personInfos[e].name))
	}, e.nextStep = function() {
		i.go("app.step3")
	}
}]).controller("step3Ctrl", ["$scope", "$rootScope", "$state", "$stateParams", "resOrder", "orderFormData", "setBackViewHome", "$ionicHistory", function(e, t, o, i, n, a, r, s) {
	function c(e, t) {
		return n[e](t).$promise
	}

	function l(t, o) {
		switch (t.data.code) {
			case 0:
			case 1:
			case 2:
				e.orderData.orderId = t.data.order_id, e.orderData.getRemoteOrderInfos(function() {
					o && 1 === t.data.code ? u() : d("保存成功")
				}), r(), console.log(e.orderData);
				break;
			case 8:
				JAlert.notify(t.data.msg)
		}
	}

	function d(e) {
		JAlert.confirm({
			text: "是否查看订单?",
			title: e
		}, function() {
			o.go("app.userOrder"), r()
		}, function() {
			s.goBack()
		})
	}

	function u() {
		function t(t) {
			0 === t.code ? (e.orderData.getRemoteOrderInfos(), d("支付成功")) : JAlert.showOnce(2 === t.code ? "正在确认支付结果，请稍候查看订单状态！" : "支付异常，请稍候再试")
		}

		function o() {
			JAlert.showOnce("支付异常，请稍候再试")
		}
		switch (e.orderData.payType) {
			case "ali":
				c("getAliPayid", {
					order_id: e.orderData.orderId
				}).then(function(e) {
					0 === e.data.code ? navigator.alipay.start({
						tradeNO: e.data.out_trade_no,
						productName: e.data.subject,
						productDescription: e.data.body,
						amount: e.data.total_fee,
						notify_url: e.data.notify_url
					}, t, o) : JAlert.showOnce(e.data.msg)
				});
				break;
			case "weix":
				c("getWeixPayid", {
					order_id: e.orderData.orderId
				}).then(function(e) {
					if (0 === e.data.code) {
						var i = e.data.prepayid;
						navigator.weixin.pay({
							prepayid: i
						}, t, o)
					} else JAlert.showOnce(e.data.msg)
				})
		}
	}
	e.orderData = a.current(), e.title = 0 === e.orderData.status ? "订单确认 3/3" : "订单信息", e.getAllNames = function() {
		for (var t = [], o = 0, i = e.orderData.personInfos.length; i > o; ++o) t.push(e.orderData.personInfos[o].name);
		return t.join(" ")
	}, e.checkCode = function() {
		void 0 == e.orderData.code || "" === e.orderData.code.trim() ? (e.codecorrent = !1, e.errormessage = "请输入优惠码") : n.checkCode({
			code: e.orderData.code
		}, function(t) {
			0 === t.data.code ? e.codecorrent = !0 : (e.codecorrent = !1, e.errormessage = t.data.msg)
		})
	}, e.save = function() {
		c("submit", e.orderData.createOrder()).then(function(e) {
			l(e, !1)
		})
	}, e.submit = function() {
		0 === e.orderData.status ? c("submit", e.orderData.createOrder()).then(function(e) {
			l(e, !0)
		}) : 1 === e.orderData.status ? u() : 3 === e.orderData.status && o.go("app.commentList", {
			type: "product",
			id: e.orderData._id,
			title: e.orderData.pName
		})
	}
}]), angular.module("app.product", ["app.product.controller", "app.product.route"]), angular.module("app.product.route", []).config(["$stateProvider", "$urlRouterProvider", "$locationProvider", "PERMISSIONS", function(e, t, o, i) {
	e.state("app.product", {
		url: "/product/:pid",
		cache: !0,
		templateUrl: "app/product/templates/product.html",
		controller: "productCtrl"
	}).state("app.meetingAddress", {
		url: "/meetingAddress",
		cache: !1,
		templateUrl: "app/product/templates/meetingAddress.html",
		controller: "meetingAddressCtrl"
	}).state("app.pdjourney", {
		url: "/pdjourney/:pid",
		cache: !1,
		templateUrl: "app/product/templates/pdJourney.html",
		controller: "pdJourneyCtrl"
	}).state("app.visaFile", {
		url: "/visaFile",
		cache: !1,
		templateUrl: "app/product/templates/visaFile.html",
		controller: "visaFileCtrl"
	}).state("app.step1", {
		url: "/product/step1/:pid/:cat",
		cache: !0,
		templateUrl: "app/product/templates/step1.html",
		controller: "step1Ctrl",
		data: {
			permission: i.needSignIn
		}
	}).state("app.step2", {
		url: "/product/step2/:pid/:cat",
		cache: !0,
		templateUrl: "app/product/templates/step2.html",
		controller: "step2Ctrl",
		data: {
			permission: i.needSignIn
		}
	}).state("app.step3", {
		url: "/product/step3/:pid/:cat",
		cache: !0,
		templateUrl: "app/product/templates/step3.html",
		controller: "step3Ctrl",
		data: {
			permission: i.needSignIn
		}
	})
}]), angular.module("app.story.controller", []).controller("storyPageCtrl1", ["$scope", "$rootScope", "$state", "$timeout", "$document", "$ionicScrollDelegate", "$ionicHistory", "cacheLocal", "$ionicPlatform", "resChat", "CONFIG", "viewArgument", "RootScopeProxy", "logicTip", function(e, t, o, i, n, a, r, s, c, l, d, u) {
	e.title = "Scene", e.scene = [], e.$on("story", function() {});
	var p = {};
	p.storyCats = function() {}, e.sceneCats = [{
		title: "大家",
		sub: "关于艺术的那些事情",
		readed: "25"
	}, {
		title: "大家",
		sub: "关于艺术的那些事情",
		readed: "26"
	}, {
		title: "大家",
		sub: "关于艺术的那些事情",
		readed: "27"
	}, {
		title: "大家",
		sub: "关于艺术的那些事情",
		readed: "28"
	}, {
		title: "大家",
		sub: "关于艺术的那些事情",
		readed: "29"
	}, {
		title: "大家",
		sub: "关于艺术的那些事情",
		readed: "30"
	}], e.onClickItem = function(e) {
		console.log(e), u.put(e), o.go("app.storyPage2")
	}, e.onClickSwitch = function(t) {
		e.activeSlide = t
	}
}]).controller("storyPageCtrl2", ["$scope", "$rootScope", "$state", "$timeout", "$document", "$ionicScrollDelegate", "$ionicHistory", "cacheLocal", "$ionicPlatform", "resChat", "CONFIG", "viewArgument", "RootScopeProxy", "logicTip", function(e, t, o, i, n, a, r, s, c, l, d, u) {
	var p = u.get();
	e.title = p.title, e.story = {
		imgSizeStory: d.imgSizePd,
		hImgStory: d.hImgStory,
		titleShown: !0,
		city: "",
		poiId: 0,
		poiName: "",
		poiMarked: !1,
		audioShown: !1,
		audio: {},
		audioName: "",
		audioDuration: "",
		audioPaused: !0
	}, e.stories = [{
		author: "QiuQiu1",
		title: "哥伦布的第一次远洋航行",
		location: "哥伦布纪念堂",
		view: "1110",
		id: "001",
		name: "xxx",
		user: "ooo",
		desc: "gag",
		img: ""
	}, {
		author: "QiuQiu2",
		title: "哥伦布的第一次远洋航行",
		location: "哥伦布纪念堂",
		view: "1111",
		id: "001",
		name: "xxx",
		user: "ooo",
		desc: "gag",
		img: ""
	}, {
		author: "QiuQiu3",
		title: "哥伦布的第一次远洋航行",
		location: "哥伦布纪念堂",
		view: "1112",
		id: "001",
		name: "xxx",
		user: "ooo",
		desc: "gag",
		img: ""
	}, {
		author: "QiuQiu4",
		title: "哥伦布的第一次远洋航行",
		location: "哥伦布纪念堂",
		view: "1113",
		id: "001",
		name: "xxx",
		user: "ooo",
		desc: "gag",
		img: ""
	}, {
		author: "QiuQiu5",
		title: "哥伦布的第一次远洋航行",
		location: "哥伦布纪念堂",
		view: "1114",
		id: "001",
		name: "xxx",
		user: "ooo",
		desc: "gag",
		img: ""
	}, {
		author: "QiuQiu6",
		title: "哥伦布的第一次远洋航行",
		location: "哥伦布纪念堂",
		view: "1114",
		id: "001",
		name: "xxx",
		user: "ooo",
		desc: "gag",
		img: ""
	}], e.onClickStoryItem = function(e) {
		u.put(e), o.go("app.storyPage3")
	}
}]).controller("storyListCtrl", ["$scope", "$state", "$stateParams", "$timeout", "CONFIG", "viewArgument", "resStory", function(e, t, o, i, n, a, r) {
	e.type = o.type, e.title = o.title, e.option = o.option, e.page = 1, e.hasMore = !0, e.imgSizePd = n.imgSizePd, e.imgSizeThumb = n.imgSizeThumb, e.items = [], e.tags = [];
	var s = function() {
		switch (e.httpRequesting = !0, e.type) {
			case "hot":
				r.getHot({
					page: e.page
				}, function(t) {
					0 == t.data.code && (e.hasMore = t.data.list.length == t.data.per_num, 1 == e.page ? (0 == e.tags.length && (e.tags = t.data.tags, e.tags.unshift({
						code: "hot",
						name: "热门标签"
					})), e.items = t.data.list) : e.items = e.items.concat(t.data.list), e.httpRequesting = !1, ++e.page), e.$broadcast("scroll.infiniteScrollComplete")
				}, function() {
					e.httpRequesting = !1
				});
				break;
			case "chat":
				r.search({
					key_word: e.option,
					page: e.page
				}, function(t) {
					0 == t.data.code && (t.data.list.length < t.data.per_num && (e.hasMore = !1), e.items = 1 == e.page ? t.data.list : e.items.concat(t.data.list), e.httpRequesting = !1, ++e.page), e.$broadcast("scroll.infiniteScrollComplete")
				}, function() {
					e.httpRequesting = !1
				});
				break;
			default:
				r.searchByTag({
					tag_id: e.type,
					page: e.page
				}, function(t) {
					0 == t.data.code && (e.hasMore = t.data.list.length == t.data.per_num, e.items = 1 == e.page ? t.data.list : e.items.concat(t.data.list), e.httpRequesting = !1, ++e.page), e.$broadcast("scroll.infiniteScrollComplete")
				}, function() {
					e.httpRequesting = !1
				})
		}
	};
	i(function() {
		s()
	}), e.onClickStory = function(e) {
		t.go("app.storyDetail", {
			id: e
		})
	};
	var c = e.page;
	e.loadMore = function() {
		c < e.page && e.hasMore && (c = e.page, s())
	}
}]).controller("storyDetailCtrl", ["$scope", "$state", "$rootScope", "$timeout", "$stateParams", "viewArgument", "CONFIG", "processContent", "resStory", "resUser", "dateFilter", function(e, t, o, i, n, a, r, s, c, l, d) {
	e.imgSize = r.imgSize;
	var u = function() {
		c.getDetail({
			id: n.id
		}, function(t) {
			0 == t.data.code && (e.story = t.data, e.story.content = s(e.story.content))
		})
	};
	e.replyUser = function(t, o) {
		var n = t.currentTarget.parentNode.parentNode.parentNode.querySelector('[contenteditable="true"]');
		i(function() {
			n.focus(), e.content.value = "@" + o + "  ", i(function() {
				var e, t;
				window.getSelection && document.createRange ? (t = document.createRange(), t.selectNodeContents(n), t.collapse(!0), t.setEnd(n, n.childNodes.length), t.setStart(n, n.childNodes.length), e = window.getSelection(), e.removeAllRanges(), e.addRange(t)) : document.body.createTextRange && (t = document.body.createTextRange(), t.moveToElementText(n), t.collapse(!0), t.select())
			}, 10)
		}, 300)
	}, i(function() {
		u()
	}, 0), e.onClickLikeStory = function() {
		l.likeStory({}, function(t) {
			0 == t.data.code && (e.story.liked = !e.story.liked)
		})
	}, e.clickAvatar = function(e, o, i) {
		t.go("app.userHome", {
			id: e,
			name: o,
			avatar: i
		})
	}, e.onClickAllComments = function() {
		t.go("app.commentList", {
			type: "story",
			id: e.story.id,
			title: e.story.name
		})
	}, e.content = {
		value: ""
	}, e.submitComment = function() {
		c.comment({
			story_id: e.story.id,
			content: e.content.value
		}, function(t) {
			if (0 == t.data.code) {
				var i = e.story.comments.list,
					n = {
						id: t.data.id,
						comment: e.content.value,
						comment_time: d(new Date, "yyyy-MM-dd hh:mm:ss"),
						is_liked: !1,
						like_num: 0,
						user_id: o.user.info.user_id,
						user_name: o.user.info.user_name,
						avatar: o.user.info.avatar
					};
				i.length > 3 && i.splice(-1), i.unshift(n), e.story.comments.num++, e.content.value = ""
			}
		})
	}, e.$on("$ionicView.afterEnter", function(t, o) {
		var i = a.get();
		"back" == o.direction && i && (e.story.comments.list = i.slice(0, 3), e.story.comments.num = i.length)
	}), e.onClickCommentLike = function(e) {
		var t = e.is_liked ? 0 : 1;
		c.likeComment({
			comment_id: e.id,
			action: t
		}, function(t) {
			0 == t.data.code && (e.is_liked ? e.like_num-- : e.like_num++, e.is_liked = !e.is_liked)
		})
	}, e.clickUser = function() {
		"crawl" != e.story.user_type && t.go("app.userHome", {
			id: e.story.user_id,
			name: e.story.user_name,
			avatar: e.story.avatar
		})
	}
}]), angular.module("app.story", ["app.story.controller", "app.story.route"]), angular.module("app.story.route", []).config(["$stateProvider", function(e) {
	e.state("app.storyList", {
		url: "/storyList/:type/:option/:filter/:title",
		cache: !0,
		templateUrl: "app/story/templates/storyList.html",
		controller: "storyListCtrl"
	}).state("app.storyDetail", {
		url: "/storyDetail/:id",
		cache: !0,
		templateUrl: "app/story/templates/storyDetail.html",
		controller: "storyDetailCtrl"
	})
}]), angular.module("app.toolbox.controller", []).controller("toolboxHomeCtrl", ["$document", "$scope", "$rootScope", "$state", "$ionicHistory", "$timeout", function(e, t, o, i) {
	t.shortcut = [{
		name: "有故事",
		icon: "ic-story",
		img: "img/bg/toolbox-story.png"
	}, {
		name: "我要飞",
		icon: "ic-flight",
		img: "img/bg/toolbox-flight.png"
	}, {
		name: "查一查",
		icon: "ic-sale",
		img: "img/bg/toolbox-search.png"
	}, {
		name: "不一样",
		icon: "ic-different",
		img: "img/bg/toolbox-different.png"
	}, {
		name: "约个伴",
		icon: "ic-appointment",
		img: "img/bg/toolbox-appointment.png"
	}], t.onClickShortcut = function(e) {
		switch (e) {
			case "story":
				i.go("app.storyList", {
					type: "hot",
					option: "",
					filter: !0,
					title: "热门故事"
				});
				break;
			case "traffic":
				i.go("app.toolboxTraffic");
				break;
			case "sale":
				i.go("app.toolboxSale");
				break;
			case "special":
				i.go("app.productList", {
					type: "tag",
					option: "NE",
					filter: !0,
					title: "非凡体验"
				});
				break;
			case "appointment":
				i.go("app.toolboxAppointment")
		}
	}
}]).controller("trafficSearchCtrl", ["$scope", "$state", "$timeout", "$ionicSlideBoxDelegate", "CONFIG", "utils", "viewArgument", "dateFilter", "modal", "resTrain", "resProduct", function(e, t, o, i, n, a, r, s, c, l, d) {
	e.title = "欧铁查询", e.imgHeight = n.hImg, e.imgSize = n.imgSize, e.page = 1, e.number = n.loadOnceNum, e.activeSlide = 0, e.mini = !1, e.modified = !1, e.select = "", e.listSelect = [], e.products = [], e.minDate = new Date, e.maxDate = new Date, e.maxDate.setYear(e.maxDate.getFullYear() + 1), e.trainCities = {}, l.getCites({
		silence: !0
	}, function(t) {
		0 == t.data.code && (e.trainCities = t.data)
	}), e.timeRanges = [{
		label: "00:00-00:06",
		value: "1"
	}, {
		label: "06:00-12:00",
		value: "2"
	}, {
		label: "12:00-18:00",
		value: "3"
	}, {
		label: "18:00-24:00",
		value: "4"
	}], d.getPdList({
		category: "tag",
		option: "ER"
	}, function(t) {
		0 == t.data.code && (e.products = t.data.list)
	}), e.form = {
		fromCity: {
			zh_name: "选择城市"
		},
		toCity: {
			zh_name: "选择城市"
		},
		date: s(e.minDate, "yyyy-MM-dd"),
		timeRange: e.timeRanges[1]
	}, e.onClickSwitch = function(t) {
		e.activeSlide = t, i.$getByHandle("traffic-search").slide(t)
	}, e.onSlideChanged = function(t) {
		e.activeSlide = t
	}, e.onClickSelect = function(o) {
		switch (e.select = o, o) {
			case "from":
				r.put(e.trainCities), t.go("app.citySelect");
				break;
			case "to":
				r.put(e.trainCities), t.go("app.citySelect");
				break;
			case "date":
				r.put({
					minDate: e.minDate,
					maxDate: e.maxDate,
					selected: e.form.date
				}), t.go("app.dateSelect");
				break;
			case "time":
				r.put({
					title: "选择出发时间",
					list: e.listSelect
				}), t.go("app.singleSelect")
		}
	}, e.$on("$ionicView.beforeEnter", function(t, o) {
		if ("forward" != o.direction) {
			var i = r.get();
			if (void 0 != i) {
				switch (e.select) {
					case "from":
						e.form.fromCity.zh_name = i.name, e.form.fromCity.en_name = i.code;
						break;
					case "to":
						e.form.toCity.zh_name = i.name, e.form.toCity.en_name = i.code;
						break;
					case "date":
						e.form.date = i.date;
						break;
					case "time":
						e.form.timeRange = e.timeRanges[i.index]
				}
				e.modified = !0
			}
		}
	}), e.actionTrainSearch = function() {
		return "选择城市" === e.form.fromCity.zh_name || "选择城市" === e.form.toCity.zh_name ? void JAlert.notify("请选择城市！") : e.form.fromCity.zh_name == e.form.toCity.zh_name ? void JAlert.notify("请选择不同的城市！") : (e.mini = !0, e.modified = !1, void l.search({
			date: e.form.date,
			fromCity: e.form.fromCity.en_name,
			toCity: e.form.toCity.en_name,
			daypart: e.form.timeRange.value
		}, function(t) {
			0 == t.data.code && e.list.initTrains(t.data.trains)
		}))
	}, e.list = {
		initTrains: function(t) {
			e.trains = [], angular.forEach(t, function(t) {
				t.time_cost = a.minutesToHour(t.time_cost), t.transfer ? (angular.extend(t, {
					has_transfer: !0,
					transfer_times: 1,
					detail: [{
						from_station: t.from_station,
						from_time: t.from_time,
						numbers: t.numbers,
						time_cost: a.timeDiff(t.from_time, t.transfer.arrival_time),
						to_station: t.transfer.station,
						to_time: t.transfer.arrival_time
					}, {
						transfer_city: t.transfer.city,
						transfer_wait: a.timeDiff(t.transfer.arrival_time, t.transfer.departure_time),
						from_station: t.transfer.station,
						from_time: t.transfer.departure_time,
						numbers: t.transfer.numbers,
						time_cost: a.timeDiff(t.to_time, t.transfer.departure_time),
						to_station: t.to_station,
						to_time: t.to_time
					}]
				}), e.trains.push(t)) : (angular.extend(t, {
					has_transfer: !1
				}), e.trains.push(t))
			})
		},
		initSingleSelect: function(t) {
			angular.forEach(t, function(t) {
				e.listSelect.push({
					name: t.label
				})
			})
		}
	}, e.list.initSingleSelect(e.timeRanges)
}]), angular.module("app.toolbox", ["app.toolbox.controller", "app.toolbox.route"]), angular.module("app.toolbox.route", []).config(["$stateProvider", "$urlRouterProvider", "$locationProvider", "PERMISSIONS", function(e, t, o) {
	o.html5Mode(!1), t.otherwise("/journeyHome"), e.state("app.toolboxHome", {
		url: "/toolboxHome",
		cache: !0,
		templateUrl: "app/toolbox/templates/toolboxHome.html",
		controller: "toolboxHomeCtrl"
	}).state("app.toolboxTraffic", {
		url: "/toolboxTraffic",
		cache: !0,
		templateUrl: "app/toolbox/templates/trafficSearch.html",
		controller: "trafficSearchCtrl"
	})
}]), angular.module("app.user.controller", []).controller("userHomeCtrl", ["$scope", "$state", "$timeout", "$stateParams", "$ionicSlideBoxDelegate", "viewArgument", "resUser", "resJourney", "resPoi", "resStory", "modal", "storyModal", "CONFIG", "loginModal", "$rootScope", function(e, t, o, i, n, a, r, s, c, l, d, u, p, m, h) {
	e.$emit("baseCtrl.cleanCache"), e.modal = {
		dragHide: "modalStory",
		blurView: ["modalStory", "userHome.sendMessage"]
	}, e.story = {
		imgSizeStory: p.imgSizePd,
		hImgStory: p.hImgStory,
		titleShown: !0,
		city: "",
		poiId: 0,
		poiName: "",
		poiMarked: !1,
		audioShown: !1,
		audio: {},
		audioName: "",
		audioDuration: "",
		audioPaused: !0
	}, e.stories = [], u.load(e, "modalStory");
	e.sendMessage = {
		_init: !1,
		_msg: "",
		_show: function(e) {
			e.show()
		},
		_hide: function(e) {
			e.hide()
		},
		show: function() {
			h.user.isSigned ? this._init ? d.getModalPromise("userHome.sendMessage").then(this._show) : (this._init = !0, d.createModalImmediately("userHome.sendMessage", "app/user/templates/sendMessageModal.html", "up", !0).then(this._show)) : m.show()
		},
		close: function() {
			d.getModalPromise("userHome.sendMessage").then(this._hide)
		},
		send: function() {
			if (window.cordova) {
				var t = this;
				navigator.chat.send({
					suid: h.user.info.user_id,
					ruid: e.userId,
					msg: this._msg
				}, function(e) {
					switch (console.log(e.code, e.msg), e.code) {
						case 0:
							JAlert.notify("信息发送成功！"), t.close();
							break;
						default:
							JAlert.notify(e.msg)
					}
					t = null
				}, function(e) {
					console.log("error~~~~~~~~~~~~~~~~~" + e), t = null
				})
			}
		}
	}, e.page = {
		activity: 1,
		journey: 1,
		poi: 1,
		story: 1
	}, e.hasMore = {
		activity: !0,
		journey: !0,
		poi: !0,
		story: !0
	}, e.result = {
		activity: [],
		journey: [],
		poi: [],
		story: []
	}, e.httpRequesting = !1, e.userId = i.id, e.userName = i.name, e.userAvatar = i.avatar, e.imgSizeStory = p.imgSizePd, e.imgSizeJourney = p.imgSize, e.imgSizeThumb = p.imgSizeThumb, e.hImgJourney = 240 * (p.devWidth - 20) / 480 + "px", e.activeSlide = 0, e.userCardHidden = !1, e.hostImg = p.hostImg;
	var g = {};
	g.user = function() {
		r.getInfo({
			user_id: e.userId
		}, function(t) {
			0 == t.data.code && (e.userName || (e.userName = t.data.name), e.userAvatar || (e.userAvatar = t.data.avatar), e.userBrief = t.data.brief, e.userTags = t.data.tags)
		})
	}, g.user(), g.journey = function() {
		e.httpRequesting = !0, s.getUserJourney({
			user_id: e.userId,
			page: e.page.journey
		}, function(t) {
			0 == t.data.code && (e.hasMore.journey = t.data.list.length == t.data.per_num, e.result.journey = 1 == e.page.journey ? t.data.list : e.result.journey.concat(t.data.list), ++e.page.journey), e.httpRequesting = !1, e.$broadcast("scroll.infiniteScrollComplete"), n.$getByHandle("user-home").update()
		}, function() {
			e.httpRequesting = !1
		})
	}, g.journey(), g.poi = function() {
		e.httpRequesting = !0, c.getUserMarkPoi({
			user_id: e.userId,
			page: e.page.poi
		}, function(t) {
			0 == t.data.code && (e.hasMore.poi = t.data.list.length == t.data.per_num, e.result.poi = 1 == e.page.poi ? t.data.list : e.result.poi.concat(t.data.list), ++e.page.poi), e.httpRequesting = !1, e.$broadcast("scroll.infiniteScrollComplete"), n.$getByHandle("user-home").update()
		}, function() {
			e.httpRequesting = !1
		})
	}, g.poi(), g.story = function() {
		e.httpRequesting = !0, l.getUserStory({
			user_id: e.userId,
			page: e.page.story
		}, function(t) {
			if (0 == t.data.code) {
				var o = 0;
				angular.forEach(t.data.list, function(e) {
					o += e.storys.length
				}), e.hasMore.story = o == t.data.per_num;
				var i = e.result.story.length;
				i > 0 && e.result.story[i - 1].name == t.data.list[0].name ? (e.result.story[i - 1].storys = e.result.story[i - 1].storys.concat(t.data.list[0].storys), t.data.list.splice(0, 1), e.result.story = e.result.story.concat(t.data.list)) : e.result.story = e.result.story.concat(t.data.list), ++e.page.story
			}
			e.httpRequesting = !1, e.$broadcast("scroll.infiniteScrollComplete"), n.$getByHandle("user-home").update()
		}, function() {
			e.httpRequesting = !1
		})
	}, g.story(), e.scrollHandle = "journey", e.onSlideChanged = function(t) {
		switch (e.activeSlide = t, t) {
			case 0:
				e.scrollHandle = "journey";
				break;
			case 1:
				e.scrollHandle = "poi";
				break;
			case 2:
				e.scrollHandle = "story"
		}
	}, e.onClickSwitch = function(e) {
		n.$getByHandle("user-home").slide(e)
	}, e.onClickJourney = function(o, i) {
		a.put(angular.copy(e.result.journey[o])), t.go("app.journeyDetail", {
			id: i
		})
	}, e.onClickPoi = function(o, i, n) {
		t.go("app.poiDetail", {
			id: i,
			title: n
		}), e.curPoiIndex = o
	}, e.onClickStory = function(e) {
		t.go("app.storyDetail", {
			id: e
		})
	}, e.onClickLikeJourney = function(t, o) {
		var i = e.result.journey[o],
			n = i.is_liked ? 0 : 1;
		t.stopPropagation(), r.likeJourney({
			id: i.id,
			action: n
		}, function(e) {
			(0 == e.data.code || 1 == e.data.code) && (i.is_liked ? i.like_num -= 1 : i.like_num += 1, i.is_liked = !i.is_liked)
		})
	}, e.onClickJourneyComments = function(o, i) {
		o.stopPropagation();
		var n = e.result.journey[i];
		t.go("app.commentList", {
			type: "journey",
			id: n.id,
			title: n.name
		})
	};
	var f = angular.copy(e.page);
	e.loadMore = function(t) {
		f[t] < e.page[t] && e.hasMore[t] && (f[t] = e.page[t], g[t]())
	}
}]).controller("userJourneyCtrl", ["$scope", "$rootScope", "$state", "$ionicHistory", "$timeout", "$ionicSlideBoxDelegate", "$ionicScrollDelegate", "CONFIG", "startSelectModal", "dateFilter", "viewArgument", "authFactory", "resUser", function(e, t, o, i, n, a, r, s, c, l, d, u, p) {
	e.$emit("baseCtrl.cleanCache"), e.activeSlide = 0, e.page = 1, e.hasMore = !0, e.httpRequesting = !1, e.imgSizeJourney = s.imgSize, e.hImgJourney = 240 * (s.devWidth - 20) / 480 + "px", e.journey = [], e.index = 0, c.load(e), e.$on("startSelect:confirm", function(t, o, i, n) {
		var a = e.journey[e.index];
		p.setCurJourney({
			id: a.id,
			action: 1,
			city: o,
			date: n
		}, function(t) {
			if (0 == t.data.code) {
				if (1 == e.journey[0].is_current) {
					var o = e.journey[0];
					o.is_current = 0, delete o.start_city, delete o.start_date
				}
				a.is_current = 1, a.start_city = i, a.start_date = n, e.journey.splice(e.index, 1), e.journey.unshift(a), JAlert.notify("已设置出发行程"), r.$getByHandle("my-journey").scrollTop(!0)
			}
		})
	});
	var m = function() {
		e.httpRequesting = !0, p.getMyJourney({
			page: e.page
		}, function(t) {
			0 == t.data.code && (e.hasMore = t.data.list.length == t.data.per_num, e.journey = 1 == e.page ? t.data.list : e.journey.concat(t.data.list), ++e.page), e.httpRequesting = !1, e.$broadcast("scroll.infiniteScrollComplete")
		}, function() {
			e.httpRequesting = !1
		})
	};
	m(), e.onClickModal = function() {
		c.close()
	};
	var h = function(t, o, i) {
		var n = "";
		n = "go" == t ? "该行程已点亮！<br>复制该行程后可设为出发，是否复制？" : "该行程已点亮！<br>复制该行程后可进行编辑，是否复制？", 0 == o.status ? JAlert.confirm(n, function() {
			p.copyJourney({
				id: o.id
			}, function(t) {
				0 == t.data.code && (JAlert.notify("行程已复制"), e.page = 1, m(), r.$getByHandle("my-journey").scrollTop(!0))
			})
		}) : i()
	};
	e.onClickGo = function(t, o) {
		t.stopPropagation();
		var i = e.journey[o];
		if (1 == i.is_current) JAlert.confirm("确定取消该出发行程吗？", function() {
			p.setCurJourney({
				id: i.id,
				action: 0
			}, function(e) {
				0 == e.data.code && (i.is_current = 0, JAlert.notify("出发行程已取消"))
			})
		});
		else {
			var n = function() {
				1 == e.journey[0].is_current ? JAlert.confirm("确定用该行程替换已有出发行程？", function() {
					c.show()
				}) : c.show()
			};
			h("go", i, function() {
				e.index = o, n()
			})
		}
	}, e.onClickComplete = function(e) {
		e.stopPropagation()
	}, e.onClickJourney = function(t, i) {
		var n = e.journey[i];
		n.showMore && (n.showMore = !1), e.index = i;
		var a = angular.copy(n);
		a.readOnly = !0, "0" != n.status && (a.isPrivate = !0), d.put(a), o.go("app.journeyDetail", {
			id: n.id
		})
	}, e.onClickDIY = function(t, i) {
		t.stopPropagation();
		var n = e.journey[i];
		n.showMore && (n.showMore = !1), h("modify", n, function() {
			e.index = i, o.go("app.journeyDiy", {
				type: "modify",
				id: n.id
			})
		})
	}, e.onClickDel = function(t, o) {
		t.stopPropagation();
		var i = e.journey[o];
		JAlert.confirm("确定删除该行程？", function() {
			p.delJourney({
				id: i.id
			}, function(t) {
				0 == t.data.code && (JAlert.notify("已删除"), e.page = 1, m())
			})
		})
	}, e.onClickLikeJourney = function(t, o) {
		t.stopPropagation();
		var i = e.journey[o],
			n = i.is_liked ? 0 : 1;
		p.likeJourney({
			id: i.id,
			action: n
		}, function(e) {
			0 == e.data.code && (i.is_liked ? i.like_num -= 1 : i.like_num += 1, i.is_liked = !i.is_liked)
		})
	}, e.onClickAllComments = function(t, i) {
		t.stopPropagation();
		var n = e.journey[i];
		o.go("app.commentList", {
			type: "journey",
			id: n.id,
			title: n.name
		})
	}, e.onClickDownload = function(t, a) {
		t.stopPropagation();
		var r = e.journey[a];
		r.showMore && (r.showMore = !1), d.put(r.city_list), i.goBack(), n(function() {
			o.go("app.mapHome", {})
		})
	}, e.onClickMore = function(t, o) {
		t.stopPropagation();
		var i = e.journey[o];
		i.showMore = i.showMore ? !1 : !0
	};
	var g = e.page;
	e.loadMore = function() {
		g < e.page && e.hasMore && (g = e.page, m())
	}, e.$on("$ionicView.afterEnter", function(t, o) {
		if ("forward" != o.direction) {
			var i = d.get();
			i && i.modified && (e.page = 1, m(), r.$getByHandle("my-journey").scrollTop(!1))
		}
	})
}]).controller("userPoiCtrl", ["$scope", "$rootScope", "$state", "$ionicSlideBoxDelegate", "CONFIG", "modal", "viewArgument", "storyModal", "resUser", function(e, t, o, i, n, a, r, s, c) {
	e.$emit("baseCtrl.cleanCache"), e.hostImg = n.hostImg, e.imgSizeThumb = n.imgSizeThumb, e.curPoiIndex = 0, e.poiList = [], e.page = 1, e.hasMore = !0, e.httpRequesting = !1;
	var l = function() {
		e.httpRequesting = !0, c.getMarkPoi({
			page: e.page
		}, function(t) {
			0 == t.data.code && (e.hasMore = t.data.list.length == t.data.per_num, e.poiList = 1 == e.page ? t.data.list : e.poiList.concat(t.data.list), ++e.page), e.httpRequesting = !1, e.$broadcast("scroll.infiniteScrollComplete")
		}, function() {
			e.httpRequesting = !1
		})
	};
	l(), e.onClickPoi = function(t, i, n) {
		o.go("app.poiDetail", {
			id: i,
			title: n
		}), e.curPoiIndex = t
	}, e.$on("$ionicView.afterEnter", function(t, o) {
		if ("forward" != o.direction) {
			var i = r.get();
			i && 0 == i.is_marked && (e.page = 1, l())
		}
	});
	var d = e.page;
	e.loadMore = function() {
		d < e.page && e.hasMore && (d = e.page, l())
	}
}]).controller("userStoryCtrl", ["$scope", "$rootScope", "$state", "$ionicSlideBoxDelegate", "$ionicListDelegate", "CONFIG", "modal", "viewArgument", "storyModal", "resUser", function(e, t, o, i, n, a, r, s, c, l) {
	e.$emit("baseCtrl.cleanCache"), e.imgSizeThumb = a.imgSizeThumb, e.modal = {
		dragHide: "modalStory",
		blurView: "modalStory"
	}, e.story = {
		imgSizeStory: a.imgSizePd,
		hImgStory: a.hImgStory,
		titleShown: !0,
		city: "",
		poiId: 0,
		poiName: "",
		poiMarked: !1,
		audioShown: !1,
		audio: {},
		audioName: "",
		audioDuration: "",
		audioPaused: !0
	}, e.stories = [], e.storyList = [], e.page = 1, e.hasMore = !0, e.httpRequesting = !1, c.load(e, "modalStory");
	var d = function(t) {
			e.stories = t, e.stories.length > 0 && (e.story.index = 0, e.story.city = e.stories[0].city, e.story.poiId = e.stories[0].poi_id, e.story.poiName = e.stories[0].poi_name, e.story.poiMarked = e.stories[0].poi_marked, e.stories[0].audio_src && "" != e.stories[0].audio_src ? (e.story.audioShown = !0, e.story.audioName = e.stories[0].audio_name, e.story.audioDuration = e.stories[0].audio_duration, e.story.audio.sources.add(e.stories[0].audio_src)) : e.story.audioShown = !1)
		},
		u = function() {
			e.httpRequesting = !0, l.getStory({
				page: e.page
			}, function(t) {
				if (0 == t.data.code) {
					var o = 0;
					if (angular.forEach(t.data.list, function(e) {
							o += e.storys.length
						}), e.hasMore = o == t.data.per_num, 1 == e.page) e.storyList = t.data.list;
					else {
						var i = e.storyList.length;
						i > 0 && e.storyList[i - 1].name == t.data.list[0].name ? (e.storyList[i - 1].storys = e.storyList[i - 1].storys.concat(t.data.list[0].storys), t.data.list.splice(0, 1), e.storyList = e.storyList.concat(t.data.list)) : e.storyList = e.storyList.concat(t.data.list)
					}++e.page
				}
				e.httpRequesting = !1, e.$broadcast("scroll.infiniteScrollComplete")
			}, function() {
				e.httpRequesting = !1
			})
		};
	u(), e.onClickPoi = function(e, t, i) {
		o.go("app.poiDetail", {
			id: t,
			title: i
		})
	}, e.onClickStory = function(t, o) {
		d([e.storyList[t].storys[o]]), r.getModal("modalStory").show()
	}, e.onClickStoryEdit = function(t, i, n) {
		t.stopPropagation();
		var a = e.storyList[i].storys[n];
		s.put(a), o.go("app.newStory", {
			type: "modify",
			id: e.storyList[i].id,
			title: e.storyList[i].name
		})
	}, e.onClickStoryDel = function(t, o) {
		t.stopPropagation(), JAlert.confirm("确定删除故事吗？", function() {
			l.delStory({
				id: o
			}, function(t) {
				0 == t.data.code && (JAlert.notify("已删除"), e.page = 1, u())
			})
		}, function() {
			n.$getByHandle("story-list").closeOptionButtons()
		})
	};
	var p = e.page;
	e.loadMore = function() {
		p < e.page && e.hasMore && (p = e.page, u())
	}
}]).controller("userMessageCtrl", ["$scope", function(e) {
	e.title = "我的消息"
}]).controller("userOrderCtrl", ["$scope", "$rootScope", "$ionicSlideBoxDelegate", "CONFIG", "resUser", "orderFormData", "$state", function(e, t, o, i, n, a, r) {
	function s() {
		n.getOrderList({}, function(t) {
			e.orderGroup.unpaid = [], e.orderGroup.unused = [], e.orderGroup.uncomment = [], 0 == t.data.code && (e.orders = t.data.list, angular.forEach(e.orders, function(t) {
				switch (t.use_stat) {
					case "1":
						e.orderGroup.unpaid.push(t);
						break;
					case "2":
						e.orderGroup.unused.push(t);
						break;
					case "3":
						e.orderGroup.uncomment.push(t)
				}
			}))
		})
	}
	e.$emit("baseCtrl.cleanCache"), e.activeSlide = 0, e.page1 = 1, e.page2 = 1, e.page3 = 1, e.page4 = 1, e.number = i.loadOnceNum, e.imgSizeThumb = i.imgSizeThumb, e.orders = [], e.orderGroup = {
		unpaid: [],
		unused: [],
		uncomment: []
	}, e.$on("$ionicView.enter", s), e.onClickSwitch = function(t) {
		e.activeSlide = t, o.$getByHandle("user-order").slide(t)
	}, e.onSlideChanged = function(t) {
		e.activeSlide = t
	}, e.gotoDetail = function(e) {
		a.createByOrderId(e, function(e) {
			r.go("app.step3", {
				pid: e.getId(),
				cat: e.getType()
			})
		})
	}
}]).controller("contactsCtrl", ["$scope", "$http", "$state", "contactForm", "$stateParams", "$ionicHistory", "orderFormData", "resUser", function(e, t, o, i, n, a, r, s) {
	function c(e, t) {
		return e.startsWith ? e.startsWith(t) : e.slice(0, t.length) === t
	}
	var l = e.opt = n.opt;
	c(l, "choose") ? (e.choose = !0, e.index = parseInt(l.slice(7)), e.orderData = r.current(), e.title = "选择", e.choose = function(t) {
		if (e.contacts) {
			var o = angular.copy(e.contacts[e.orderData.chooseIndex[e.index]]);
			o.mobile = parseInt(o.mobile, 10) || 0, o.zipcode = parseInt(o.zipcode, 10) || 0, -1 === e.index ? e.orderData.contactInfo = o : e.orderData.personInfos[e.index] = o
		}
		t || a.goBack()
	}, e.$on("$ionicView.beforeLeave", function() {
		e.choose(!0)
	})) : e.title = "常用联系人", e.editContact = function(e) {
		e.id = e._id, e.mobile = parseInt(e.mobile, 10), e.zipcode = parseInt(e.zipcode, 10), e.type = "upd", i.setData(e), o.go("app.editContact", {
			cid: e._id,
			opt: l
		})
	}, s.getContacts({}, function(t) {
		e.contacts = t.data.list
	})
}]).controller("addContactCtrl", ["$scope", "$http", "$state", "$stateParams", "$ionicHistory", "genPy", "resUser", function(e, t, o, i, n, a, r) {
	e.contact = {
		type: "add"
	}, e.saveContact = function() {
		r.updateContact(e.contact, function() {
			n.currentView(n.getViewById(n.backView().backViewId)), o.go("app.contacts", {
				opt: i.opt
			})
		})
	}, e.genPinyin = function() {
		e.contact.pyname = a(e.contact.name)
	}
}]).controller("editContactCtrl", ["$scope", "$state", "$stateParams", "$ionicHistory", "genPy", "resUser", "contactForm", function(e, t, o, i, n, a, r) {
	e.title = "编辑", e.contact = r.data, e.deleteContact = function(n) {
		a.updateContact({
			id: n || e.contact.id,
			type: "del"
		}, function(e) {
			i.currentView(i.getViewById(i.backView().backViewId)), JAlert.notify(0 === e.data.code ? "删除成功！" : e.data.msg), t.go("app.contacts", {
				opt: o.opt
			})
		})
	}, e.saveContact = function() {
		a.updateContact(angular.copy(e.contact), function(e) {
			i.currentView(i.getViewById(i.backView().backViewId)), JAlert.notify(0 === e.data.code ? "修改成功！" : e.data.msg), t.go("app.contacts", {
				opt: o.opt
			})
		})
	}, e.genPinyin = function() {
		e.contact.pyname = n(e.contact.name)
	}
}]).controller("userPostcardCtrl", ["$scope", "resUser", "modal", "$timeout", "weixinShare", "statusBar", "$ionicActionSheet", "CONFIG", "$rootScope", function(e, t, o, i, n, a, r, s, c) {
	function l(t) {
		t = Math.round(t);
		var o = Math.floor(t / 60);
		e.duration = 0 === o ? t + '"' : o + "'" + t % 60 + '"'
	}
	e.imgSizePostBig = s.imgSizePostBig, t.getPostcardList({}, function(t) {
		0 === t.data.code && (e.postcardList = t.data.list)
	}), o.createModal("postcard", "app/user/templates/postcardModal.html", "up", !0, e, !0), e.close = function() {
		o.getModal("postcard").hide()
	}, e.audio = null, e.showClip = function(n, r, s) {
		function d() {
			if (!c.user.isIOS) {
				i(function() {
					document.querySelector(".user-postcard-modal .container").style.display = ""
				}, 100);
				var e = document.createEvent("HTMLEVENTS");
				e.initEvent("resize", !0, !0), window.dispatchEvent(e)
			}
		}
		if (c.user.isAndroid) {
			var u = document.querySelector(".user-postcard-modal .container");
			u && (u.style.display = "block")
		}
		e.postcard && e.postcard.id === n ? (a.hide(), o.getModal("postcard", e).show().then(d)) : t.getPostcardDetail({
			id: n
		}, function(t) {
			function n() {
				var t = c.getBoundingClientRect().height,
					o = c.parentElement.getBoundingClientRect().height;
				e.mediaStyle.bottom = .016 * t + (o - t) + "px", e.$apply()
			}
			if (0 === t.data.code) {
				if (a.hide(), e.postcard = t.data, e.postcard.oIndex = r, e.postcard.iIndex = s, o.getModal("postcard", e).show().then(d), !e.bind) {
					e.bind = !0;
					var c = document.querySelector(".user-postcard-modal img");
					e.mediaStyle = {}, c.addEventListener("load", n), window.addEventListener("resize", n), e.$on("$destory", function() {
						window.removeEventListener("resize", n)
					})
				}
				e.audio && e.audio.release(), e.postcard.audio_url && window.cordova ? (e.audio = new Media(e.postcard.audio_url, function() {
					e.isPlaying && (e.isPlaying = !1), i.cancel(e.toggle.t);
					var t = e.audio.getDuration();
					0 > t && (t = e.postcard.duration), l(t), e.$apply()
				}, function() {
					console.log("upostcard media fail", arguments)
				}), l(Math.round(e.postcard.duration / 1e3))) : e.audio = null
			}
		})
	}, e.isPlaying = !1, e.duration = "", e.toggle = function() {
		e.isPlaying ? (e.isPlaying = !1, e.audio.stop()) : (e.isPlaying = !0, e.audio.play(), e.toggle.t = i(function() {
			e.toggle.t = i(arguments.callee, 50), e.audio.getCurrentPosition(l)
		}, 50))
	}, e.$on("modal.hidden", function(t, i) {
		"postcard" === o.getModalName(i) && (e.isPlaying && e.toggle(), a.show())
	}), e.share = function() {
		function i() {
			JAlert.notify("已分享")
		}

		function a() {
			JAlert.notify("分享失败")
		}
		var l = {
			url: s.hostWWW + "/postcard/detail?id=" + e.postcard.id + "&uid=" + c.user.info.user_id,
			title: "有声音的明信片·有故事的旅行",
			desc: e.postcard.text,
			image: e.postcard.main_url + "-weixin"
		};
		r.show({
			buttons: [{
				text: '<i class="ic ic-weixin"></i>微信好友'
			}, {
				text: '<i class="ic ic-weixin-moment"></i>朋友圈（完整卡片）'
			}, {
				text: '<i class="ic ic-weixin-moment"></i>朋友圈（静态图片）'
			}, {
				text: "保存到相册"
			}, {
				text: '<span class="delete">删除<span>'
			}],
			cssClass: "share-sheet",
			cancelText: "取消",
			cancel: function() {},
			buttonClicked: function(r) {
				switch (r) {
					case 0:
						n.page2Friend(l, i, a);
						break;
					case 1:
						l.desc = "「" + (e.postcard.city || "欧优游") + "」寄出: " + l.desc, n.page2Timeline(l, i, a);
						break;
					case 2:
						n.image2Timeline(e.postcard.snapshot_url, i, a);
						break;
					case 3:
						var s = document.querySelector(".user-postcard-modal img"),
							c = document.createElement("canvas");
						c.width = s.naturalWidth, c.height = s.naturalHeight, c.getContext("2d").drawImage(s, 0, 0), window.canvas2ImagePlugin.saveImageDataToLibrary(function() {
							JAlert.notify("保存成功")
						}, function(e) {
							JAlert.notify(e)
						}, c);
						break;
					case 4:
						JAlert.confirm({
							title: "删除提示",
							text: "确认删除明信片?"
						}, function() {
							t.deletePostcard({
								id: e.postcard.id
							}, function(t) {
								0 === t.data.code ? (JAlert.notify("删除成功"), o.getModal("postcard").hide(), e.postcardList[e.postcard.oIndex].list.splice(e.postcard.iIndex, 1), 0 === e.postcardList[e.postcard.oIndex].list.length && e.postcardList.splice(e.postcard.oIndex, 1)) : JAlert.notify(t.data.msg)
							})
						}, function() {})
				}
				return !0
			}
		})
	}
}]), angular.module("app.user", ["app.user.modal", "app.user.controller", "app.user.route"]), angular.module("app.user.route", []).config(["$stateProvider", "$urlRouterProvider", "$locationProvider", "PERMISSIONS", function(e, t, o, i) {
	e.state("app.userHome", {
		url: "/userHome/:id/:name/:avatar",
		cache: !0,
		templateUrl: "app/user/templates/userHome.html",
		controller: "userHomeCtrl"
	}).state("app.userJourney", {
		url: "/userJourney",
		cache: !0,
		templateUrl: "app/user/templates/userJourney.html",
		controller: "userJourneyCtrl",
		data: {
			permission: i.needSignIn
		}
	}).state("app.userPoi", {
		url: "/userPoi",
		cache: !0,
		templateUrl: "app/user/templates/userPoi.html",
		controller: "userPoiCtrl",
		data: {
			permission: i.needSignIn
		}
	}).state("app.userStory", {
		url: "/userStory",
		cache: !0,
		templateUrl: "app/user/templates/userStory.html",
		controller: "userStoryCtrl",
		data: {
			permission: i.needSignIn
		}
	}).state("app.userMessage", {
		url: "/userMessage",
		cache: !0,
		templateUrl: "app/user/templates/userMessage.html",
		controller: "userMessageCtrl",
		data: {
			permission: i.needSignIn
		}
	}).state("app.userOrder", {
		url: "/userOrder",
		cache: !0,
		templateUrl: "app/user/templates/userOrder.html",
		controller: "userOrderCtrl",
		data: {
			permission: i.needSignIn
		}
	}).state("app.contacts", {
		url: "/contacts/:opt",
		cache: !1,
		templateUrl: "app/user/templates/contacts.html",
		controller: "contactsCtrl",
		data: {
			permission: i.needSignIn
		}
	}).state("app.addContact", {
		url: "/addContact/:opt",
		cache: !1,
		templateUrl: "app/user/templates/addContact.html",
		controller: "addContactCtrl",
		data: {
			permission: i.needSignIn
		}
	}).state("app.editContact", {
		url: "/editContact/:cid/:opt",
		cache: !1,
		templateUrl: "app/user/templates/editContact.html",
		controller: "editContactCtrl",
		data: {
			permission: i.needSignIn
		}
	}).state("app.userPostcard", {
		url: "/userPostcard",
		cache: !1,
		templateUrl: "app/user/templates/postcard.html",
		controller: "userPostcardCtrl",
		data: {
			permission: i.needSignIn
		}
	})
}]), angular.module("app.base.modal", ["app.base.modal.service"]), angular.module("app.base.modal.service", []).factory("guideModal", ["$rootScope", "$document", "$ionicSlideBoxDelegate", "modal", "CONFIG", "permission", "$timeout", "statusBar", function(e, t, o, i, n, a, r, s) {
	function c() {
		var o = t[0].body.querySelector(".modal-backdrop.active");
		move(o).duration("1.5s").set("opacity", 0).end(), r(function() {
			var t = i.getModal("modalGuide", e);
			t.hide(), s.show(), i.destroyModal("modalGuide", e), r(function() {
				delete e.guideModal, a.prompt()
			}, 1e3)
		}, 1500)
	}
	return {
		load: function() {
			s.hide(), i.createModalImmediately("modalGuide", "app/base/modal/templates/guideModal.html", "right", !1, e).then(function() {
				var t = i.getModal("modalGuide", e);
				i.showWithNoAnimation(t), e.guideModal.activeSlide = 0
			}), e.guideModal = {
				devHeight: n.devHeight + "px",
				activeSlide: null,
				startReady: !1,
				onSlideChanged: function(t) {
					var i = o.$getByHandle("guide-slider");
					t == i.slidesCount() - 1 ? (r(function() {
						e.guideModal.onSwipeLeft = function() {
							c()
						}
					}, 500), r(function() {
						e.guideModal.startReady = !0
					}, 1e3)) : (e.guideModal.startReady = !1, e.guideModal.onSwipeLeft = function() {}), e.guideModal.activeSlide = t
				},
				onSwipeLeft: function() {},
				onClickStart: function() {
					c()
				},
				hide: c
			}
		}
	}
}]).factory("perfectModal", ["$rootScope", "$timeout", "$ionicSlideBoxDelegate", "modal", "CONFIG", "permission", "statusBar", "$q", function(e, t, o, i, n, a, r, s) {
	function c() {
		var o = i.getModal("modalPerfect", e);
		return e.user.isIOS && r.show(), i.destroyModal("modalPerfect", e), t(function() {
			delete e.perfectModal
		}, 300), o.hide()
	}
	return {
		load: function() {
			var t = s.defer();
			return i.createModalImmediately("modalPerfect", "app/base/modal/templates/perfectModal.html", "right", !1, e).then(function() {
				var t = i.getModal("modalPerfect", e);
				e.user.isIOS && r.hide(), i.showWithNoAnimation(t), e.perfectModal.activeSlide = 0
			}), e.perfectModal = {
				hostImg: n.hostImg,
				imgSuffix: "?imageView2/1/w/" + n.devWidth + "/h/" + n.devHeight + "/q/100/format/JPG",
				devHeight: n.devHeight + "px",
				activeSlide: null,
				onSlideChanged: function(t) {
					var i = o.$getByHandle("perfect-slider"),
						n = i.slidesCount();
					t == n - 1 && this.hide(), e.perfectModal.activeSlide = t
				},
				onClickStart: function() {
					this.hide()
				},
				hide: function() {
					c().then(function() {
						t.resolve()
					}, function() {
						t.reject()
					})
				}
			}, t.promise
		}
	}
}]).factory("cardModal", ["$rootScope", "$timeout", "$ionicModal", "$ionicGesture", "$ionicScrollDelegate", "CONFIG", "cacheLocal", "statusBar", function(e, t, o, i, n, a, r, s) {
	e.cardModal = {
		audioCard: {},
		isPaused: !0,
		barShow: !1,
		devHeight: a.devHeight,
		imgSizeCard: a.imgSizeCard
	};
	var c = !1,
		l = !1,
		d = null,
		u = null,
		p = function(t) {
			e.cardModal.barShow = t, e.cardModal.modal.isShown() || (e.cardModal.modal.show(), ionic.Platform.ready(function() {
				s.hide()
			}))
		},
		m = function() {
			e.cardModal.modal.isShown() && (e.cardModal.modal.hide(), s.show())
		};
	if (r.system.get("visited")) {
		var h = r.system.info("visited").created;
		h = new Date(h);
		var g = new Date;
		l = h.getFullYear() == g.getFullYear() && h.getMonth() == g.getMonth() && h.getDate() == g.getDate()
	}
	return r.system.put("visited", !0), e.$on("$mediaReady", function() {
		e.cardModal.audioCard.options.setAutoplay(!1), e.cardModal.audioCard.options.setControls(!1), e.cardModal.audioCard.sources.add(e.cardModal.card.audio.src)
	}), {
		load: function() {
			o.fromTemplateUrl("app/poi/templates/postcardModal.html", {
				scope: e,
				animation: "min"
			}).then(function(t) {
				e.cardModal.modal = t, l || p(!1), e.cardModal.onClickList = function(t) {
					c || (e.cardModal.barShow = !e.cardModal.barShow, t.stopPropagation())
				}, e.cardModal.onDragUp = function() {
					c = !0, d = e.cardModal.modal.el.querySelector(".list"), u = e.cardModal.modal.el.querySelector(".mask"), move(d).duration("1s").scale(.9, .9).end(), move(u).duration("1s").set("background", "rgba(10,10,10, 0.3)").end()
				}, e.cardModal.onRelease = function() {
					c && (n.$getByHandle("postcard").scrollTop(!0), move(d).duration("1s").scale(1, 1).end(), move(u).duration("1s").set("background", "none").end(function() {
						c = !1, d = null, u = null
					}))
				}, e.cardModal.onClickMark = function(t) {
					e.cardModal.card.is_marked = !e.cardModal.card.is_marked, t.stopPropagation()
				}, e.cardModal.onClickPlay = function(t) {
					e.cardModal.audioCard.options.isPaused() ? e.cardModal.audioCard.controls.play() : e.cardModal.audioCard.controls.pause(), e.cardModal.isPaused = !e.cardModal.isPaused, t.stopPropagation()
				}, e.cardModal.onClickShrink = function(e) {
					m(), e.stopPropagation()
				}
			})
		},
		show: function() {
			p(!0)
		},
		hide: function() {
			m()
		}
	}
}]).factory("loginModal", ["$rootScope", "$timeout", "$ionicHistory", "$cordovaKeyboard", "modal", "JAlert", "resUser", "authFactory", "CONFIG", "mHistory", "random", "statusBar", function(e, t, o, i, n, a, r, s, c, l, d, u) {
	function p(e) {
		return u.hide(), window.cordova && i.isVisible() && i.close(), e.show()
	}

	function m(e) {
		l.go(e)
	}

	function h() {
		l.goBack()
	}

	function g() {
		return !l.isEmpty()
	}

	function f() {
		return l.hasShow()
	}

	function y() {
		e.loginModal.closed = !0, n.getModal("loginModal").hide(), u.show(), window.cordova && i.isVisible() && i.close(), n.destroyModal("loginModal", e), t(function() {
			delete e.loginModal
		}, 500)
	}

	function _() {
		y(), e.user.isSigned ? (a.notify("已登录"), e.$emit("signSuccess")) : a.showOnce("登录异常")
	}

	function v() {
		a.showOnce("请稍候..."), navigator.weixin.login(function(e) {
			console.log("微信登录返回：" + e), a.hide(), r.wxLogin({
				code: e
			}, function(e) {
				0 === e.data.code ? s.signIn(e.data._token, _) : a.showOnce(e.data.msg)
			})
		}, function() {
			a.showOnce("授权失败")
		})
	}

	function w() {
		r.mailLogin(e.loginModal.mailLoginData, function(e) {
			0 === e.data.code ? s.signIn(e.data._token, _) : a.showOnce(e.data.msg)
		})
	}

	function S() {
		r.register(e.loginModal.mailRegData, function(e) {
			0 == e.data.code ? (a.notify("注册成功"), s.signIn(e.data._token, y)) : a.showOnce(e.data.msg)
		})
	}

	function b() {
		r.findPassword(e.loginModal.getPwdData, function(e) {
			switch (e.data.code) {
				case 0:
					a.notify("密码已发送");
					break;
				case 1:
					a.notify("邮箱不存在");
					break;
				default:
					a.showOnce("异常，请稍候再试！")
			}
		})
	}
	return {
		show: function() {
			if (!e.user.isSigned) {
				var t = null;
				return n.contains("loginModal", e) ? (n.reInitModal("loginModal", e), t = n.getModalPromise("loginModal", e).then(p)) : t = n.createModalImmediately("loginModal", "app/base/modal/templates/loginModal.html", "up", !1, e, !1).then(p), e.loginModal = {
					bgLogin: "img/bg/login.jpg",
					go: m,
					back: h,
					hasBack: g,
					hasShow: f,
					close: y,
					wxLogin: v,
					mailLogin: w,
					mailLoginData: {},
					mailRegister: S,
					mailRegData: {},
					defaultLayer: "modal.login.start",
					getPassword: b
				}, "wifi" == e.user.networkState && (e.loginModal.bgLogin = c.hostImg + "/app/bg/bg" + d.getRandomNum(1, 10, !0) + ".jpg"), t
			}
		}
	}
}]).run(["PERMISSIONS", "$rootScope", "authFactory", "loginModal", function(e, t, o, i) {
	t.$on("$stateChangeStart", function(t, n) {
		var a = n && n.data ? n.data.permission : null;
		if (null != a) switch (a) {
			case e.needSignIn:
				o.authorize() || (t.preventDefault(), i.show())
		}
	})
}]).factory("sideModal", ["$rootScope", "$state", "$timeout", "$cordovaKeyboard", "modal", "loginModal", "settingModal", "perfectModal", "authFactory", "statusBar", function(e, t, o, i, n, a, r, s, c, l) {
	function d() {
		e.user.isIOS && l.show(), n.getModal("modalSide", e).hide()
	}
	return {
		load: function() {
			n.createModalImmediately("modalSide", "app/base/modal/templates/sideModal.html", "left", !1, e), e.sideModal = {
				onClickBar: function(e) {
					switch (d(), e) {
						case "journey":
							t.go("app.userJourney");
							break;
						case "poi":
							t.go("app.userPoi");
							break;
						case "story":
							t.go("app.userStory");
							break;
						case "order":
							t.go("app.userOrder");
							break;
						case "postcard":
							t.go("app.userPostcard")
					}
				},
				showSubscribe: function(e) {
					r.showSubscribe(e).then(d)
				},
				showSetting: function(e) {
					r.showSetting(e).then(function() {
						o(function() {
							d()
						}, 800)
					})
				},
				setUserInfo: function() {
					e.user.isSigned ? r.showSetting("user").then(function() {
						o(function() {
							d()
						}, 800)
					}) : a.show().then(function() {
						o(function() {
							d()
						}, 800)
					})
				},
				showMessage: function() {
					d(), t.go("app.userMessage")
				},
				hide: function() {
					d()
				},
				onClickBestTrip: function() {
					s.load(!0), o(function() {
						d()
					})
				}
			}
		},
		show: function() {
			c.loadUser(!0), e.user.isIOS && l.hide();
			var t = n.getModal("modalSide", e);
			return window.cordova && i.isVisible() && i.close(), t.show()
		}
	}
}]).factory("storyModal", ["modal", "$document", "$timeout", "$state", "resUser", "logicTip", function(e, t, o, n, a, r) {
	return {
		load: function(t, s) {
			var c = t,
				l = !1;
			return c.$on("$ionicView.beforeLeave", function() {
				var t = e.getModal(s, c);
				t && (l = t.isShown(), t.hide())
			}), c.$on("$ionicView.beforeEnter", function() {
				if (l) {
					var t = e.getModal(s, c);
					t && o(function() {
						t.show()
					}, 300)
				}
			}), c.onClickStoryTitle = function(e, t) {
				n.go("app.poiDetail", {
					id: e,
					title: t
				})
			}, c.onStoryDrag = function() {
				t.story.titleShown = !1
			}, c.onStoryRelease = function() {
				o(function() {
					t.story.titleShown = !0
				}, 500)
			}, c.onClickMarkPoi = function(e, o) {
				e.stopPropagation();
				var i = 0;
				i = c.poi ? c.poi.is_marked ? 0 : 1 : t.story.poiMarked ? 0 : 1, a.markPoi({
					poi_id: o,
					action: i
				}, function(e) {
					0 == e.data.code && (t.story.poiMarked = !t.story.poiMarked, c.list.updatePoiMarked(o, t.story.poiMarked), c.poi && (c.poi.is_marked = !c.poi.is_marked, c.modified = !0))
				})
			}, c.onClickLike = function(e) {
				var o = t.stories[e],
					i = o.liked ? 0 : 1;
				a.likeStory({
					story_id: o.id,
					action: i
				}, function(e) {
					0 == e.data.code && (o.liked ? o.like -= 1 : o.like += 1, o.liked = !o.liked)
				})
			}, c.onClickStoryAuthor = function(e, t, o) {
				e.stopPropagation(), n.go("app.userHome", {
					id: t,
					name: o
				})
			}, c.onClickStoryComment = function(e, t) {
				n.go("app.commentList", {
					type: "story",
					id: e,
					title: t
				})
			}, t.$on("modal.hidden", function(e, o) {
				o.__name == s && (t.story.audioPaused || (t.story.audioPaused = !0, t.story.audio.controls.pause()))
			}), c.onStorySlideChanged = function(e) {
				t.$emit("storySlideChange", e), t.story.index = e, t.story.city = t.stories[e].city, t.story.poiId = t.stories[e].poi_id, t.story.poiName = t.stories[e].poi_name, t.story.poiMarked = t.stories[e].poi_marked, t.stories[e].audio_src && "" != t.stories[e].audio_src ? (t.story.audioShown = !0, t.story.audioName = t.stories[e].audio_name, t.story.audioDuration = t.stories[e].audio_duration, t.story.audio.sources.add(t.stories[e].audio_src)) : t.story.audioShown = !1, t.story.audioPaused || (t.story.audioPaused = !0, t.story.audio.controls.pause())
			}, c.onClickPlay = function() {
				t.story.audioPaused = !t.story.audioPaused, t.story.audio.options.isPaused() ? t.story.audio.controls.play() : t.story.audio.controls.pause()
			}, c.list = {
				updatePoiMarked: function(e, o) {
					for (i = 0; i < t.stories.length; i++) t.stories[i].poi_id == e && (t.stories[i].poi_marked = o)
				}
			}, r.storyModal(t), e.createModal(s, "poi/storyModal.html", "round-right-down", !1, c)
		}
	}
}]).factory("startSelectModal", ["modal", "dateFilter", "resUser", function(e, t, o) {
	var i = "modalStartSelect";
	return {
		load: function(n) {
			var a = n,
				r = new Date,
				s = new Date,
				c = new Date;
			return r.setDate(r.getDate() + 1), s.setDate(s.getDate() + 10), c.setYear(c.getFullYear() + 1), a.start = {
				places: [],
				placeId: "",
				placeName: "选择城市",
				date: {
					minDate: r,
					maxDate: c,
					selected: t(s, "yyyy-MM-dd")
				},
				active: "card",
				showDate: !1
			}, o.getDepartCity({}, function(e) {
				0 == e.data.code && (a.start.places = e.data.list)
			}), a.onClickSelect = function(e) {
				a.start.active = e
			}, a.$on("dateSelect", function(e) {
				e.stopPropagation(), a.start.active = "card"
			}), a.onClickConfirm = function() {
				"" != a.start.placeId ? (e.getModal(i).hide(), a.$emit("startSelect:confirm", a.start.placeId, a.start.placeName, a.start.date.selected)) : JAlert.notify("请选择出发地")
			}, a.$on("modal.hidden", function() {
				a.start.active = "card"
			}), a.$on("$destroy", function() {
				e.destroyModal(i), delete a[i]
			}), e.createModal(i, "app/base/modal/templates/startSelectModal.html", "up", !1, a)
		},
		show: function() {
			e.getModal(i).show()
		},
		close: function() {
			e.getModal(i).hide()
		}
	}
}]).run(["$ionicPlatform", "$rootScope", "$timeout", "modal", "mHistory", function(e, t, o, i, n) {
	o(function() {
		t.user.isAndroid && document.addEventListener("backbutton", function(e) {
			n.hasShow() && (e.preventDefault(), n.isEmpty() ? t.loginModal && !t.loginModal.closed ? t.loginModal.close() : t.settingModal && !t.settingModal.closed && t.settingModal.close() : n.goBack())
		}, !0)
	}, 300)
}]), angular.module("app.common.expand.directive", []).directive("expand2", ["CONFIG", "$state", "$ionicViewSwitcher", "$ionicScrollDelegate", "$timeout", function(e, t, o, i, n) {
	function a(e, t) {
		this.element = t, this.selected = 0, this._realSelected = 0
	}

	function r(e) {
		o.nextTransition("slidUp"), t.go("app.storyCard", {
			id: e
		})
	}

	function s(e) {
		this._realSelected = this.selected, e.target.hasAttribute("ng-repeat") && "height" === e.propertyName && e.target.classList.contains("expand") && this.gotoStoryCard()
	}
	var c = parseInt(e.hImgPd) - 20 + "px",
		l = "72px",
		d = document.head || document.getElementsByTagName("head")[0],
		u = document.createElement("style");
	return d.appendChild(u), u.innerHTML = "[expand] [ng-repeat]{height:" + l + "} [expand] .expand{height:" + c + "}", a.prototype.expand = function(e, t) {
		this.id = t.currentTarget.getAttribute("expand-card-id"), this.selected = e, this._realSelected === e && this.gotoStoryCard()
	}, a.prototype.gotoStoryCard = function() {
		var e = 50 - this.element.querySelectorAll("[ng-repeat]")[this.selected].getBoundingClientRect().top;
		if (0 === e) r(this.id);
		else {
			i.scrollTo(0, i.getScrollPosition().top - e, !0);
			var t = this.id;
			n(function() {
				r(t)
			}, 500)
		}
	}, {
		restrict: "EAC",
		replace: !1,
		scope: !0,
		compile: function(e) {
			for (var t = 0, o = e.length; o > t; ++t) {
				var i = e[t].querySelector("[ng-repeat]");
				i && (i.setAttribute("ng-class", "{expand:$index===__expand.selected}"), i.setAttribute("ng-click", "__expand.expand($index,$event)"))
			}
			return {
				pre: function(e, t) {
					e.__expand = new a(0, t[0]), t[0].addEventListener(ionic.CSS.TRANSITIONEND.split(" ")[0], s.bind(e.__expand), !0)
				}
			}
		}
	}
}]), angular.module("app.common.expand", ["app.common.expand.directive"]), angular.module("app.common.datepicker.directive", []).factory("datepickerUtils", ["dateFilter", function(e) {
	return {
		isDate: function(e) {
			return "[object Date]" === Object.prototype.toString.call(e)
		},
		stringToDate: function(e) {
			if (this.isDate(e)) return new Date(e);
			var t = e.split("-"),
				o = t[0],
				i = t[1],
				n = t[2];
			return new Date(o, i - 1, n, 3)
		},
		dateRange: function(t, o, i, n) {
			var a, r, s, c = [];
			for (n || (n = "yyyy-MM-dd"), r = s = t; o >= t ? o > s : s > o; r = o >= t ? ++s : --s) a = this.stringToDate(i), a.setDate(a.getDate() + r), c.push(e(a, n));
			return c
		}
	}
}]).directive("datepicker", ["datepickerUtils", "dateFilter", function(e, t) {
	return {
		restrict: "EA",
		require: "ngModel",
		replace: !0,
		scope: {
			model: "=ngModel"
		},
		templateUrl: "app/common/datepicker/templates/datepicker.html",
		link: function(o, i, n, a) {
			function r() {
				var i = new Date(l.getFullYear(), l.getMonth() + 1, 0, 3).getDate(),
					n = e.dateRange(-l.getDay(), 0, l),
					a = e.dateRange(0, i, l),
					r = e.stringToDate(a[a.length - 1]),
					s = e.dateRange(1, 7 - r.getDay(), r),
					c = n.concat(a, s);
				c.length / 7 < 6 && (c = c.concat(e.dateRange(1, 8, c[c.length - 1]))), o.today = t(new Date, "yyyy-MM-dd"), o.month = t(l, "MM"), o.dates = c, o.current = l, o.allowPrevMonth = o.model.minDate ? o.model.minDate.getTime() < l.getTime() : (new Date).getTime() < l.getTime(), o.allowNextMonth = o.model.maxDate ? o.model.maxDate.getTime() >= new Date(l.getFullYear(), l.getMonth() + 1).getTime() : !0
			}

			function s(e) {
				return e && e.split("-")[1] == o.month ? o.model.enabled && -1 === Array.prototype.indexOf.call(o.model.enabled, e) || o.model.minDate && e < t(o.model.minDate, "yyyy-MM-dd") || o.model.maxDate && e > t(o.model.maxDate, "yyyy-MM-dd") : !0
			}
			o.dayNames = "日,一,二,三,四,五,六".split(",");
			var c = new Date,
				l = new Date(c.getFullYear(), c.getMonth());
			o.setDate = function(e) {
				s(e) || (o.model.selected = e, a.$setViewValue(o.model), o.$emit("dateSelect", o.model.selected))
			}, a.$render = function() {
				if (o.model.selected) {
					"today" === o.model.selected && (o.model.selected = t(new Date, "yyyy-MM-dd"));
					var e = new Date(o.model.selected);
					(e.getFullYear() !== l.getFullYear() || e.getMonth() !== l.getMonth()) && (l = new Date(e.getFullYear(), e.getMonth()), r())
				}
				"*" === o.model.enabled && delete o.model.enabled, r()
			}, o.changeMonth = function(e) {
				l.setDate(1), l.setMonth(l.getMonth() + e), r(), o.$emit("monthChange", l)
			}, o.nextMonth = function() {
				o.allowNextMonth && this.changeMonth(1)
			}, o.preMonth = function() {
				o.allowPrevMonth && this.changeMonth(-1)
			}, o.isDateDisabled = s
		}
	}
}]), angular.module("app.common.datepicker", ["app.common.datepicker.directive"]), angular.module("app.common.graphic.directive", []).directive("imageClip", ["canvasResize", "$cordovaKeyboard", "CONFIG", function(e, t, o) {
	function i(e, t) {
		if (null == t) return null;
		for (var o = 0, i = e.length; i > o; ++o)
			if (e[o].identifier === t) return e[o];
		return null
	}
	var n = "点击选择图片",
		a = "单指拖动，双指放大，点击重选图片",
		r = "选择图片尺寸过小",
		s = "图片加载中",
		c = "正在处理图片",
		l = "故事尚未上传图片",
		d = {
			init: function() {
				this.input.addEventListener("change", this), this.input.addEventListener("click", this, !0), this.bindInput && (this.bindInput.addEventListener("change", this), this.bindInput.addEventListener("click", this, !0)), this.element.addEventListener("touchstart", this), this.element.addEventListener("touchmove", this), this.element.addEventListener("touchend", this), this.span.innerHTML = n
			},
			handleEvent: function(e) {
				switch (e.type) {
					case "click":
						this.click(e);
						break;
					case "change":
						this.change(e);
						break;
					case "load":
						this.load(e);
						break;
					case "touchstart":
						this.hasImage && this.touchstart(e);
						break;
					case "touchmove":
						this.hasImage && this.touchmove(e);
						break;
					case "touchend":
						this.hasImage && this.touchend(e)
				}
				e.stopPropagation()
			},
			click: function(e) {
				window.cordova && t.isVisible() && (e.preventDefault(), t.close())
			},
			change: function(t) {
				this.span.innerHTML = s, this.div.classList.add("half");
				var o = t.target.files[0];
				if (o) {
					var i = this.ngModel.$viewValue;
					i && delete i.src, this.ngModel.$setViewValue(i), e(t.target.files[0], this)
				}
			},
			touchstart: function(e) {
				if (window.cordova && t.isVisible() && (document.activeElement.blur(), t.close()), null == this.__firstTouchId && (this.__firstTouchId = e.targetTouches[0].identifier, this.__$prePosition = {
						x: e.targetTouches[0].clientX,
						y: e.targetTouches[0].clientY
					}), null == this.__secondTouchId) {
					var o = e.targetTouches[0];
					if (!o) return void delete this.__secondTouchId;
					if (this.__secondTouchId = e.targetTouches[0].identifier, this.__firstTouchId === this.__secondTouchId) {
						if (o = e.targetTouches[1], !o) return void delete this.__secondTouchId;
						this.__secondTouchId = e.targetTouches[1].identifier
					}
					this.__$distance = Math.sqrt(Math.pow(o.clientX - this.__$prePosition.x, 2) + Math.pow(o.clientY - this.__$prePosition.y, 2)), this.__$prePosition = {
						x: (o.clientX + this.__$prePosition.x) / 2,
						y: (o.clientY + this.__$prePosition.y) / 2
					}, this.origin = {
						x: this.__$prePosition.x - this.viewLeft - this.translate.x,
						y: this.__$prePosition.y - this.viewTop - this.translate.y
					}, this.__$baseScale = this.scale
				}
			},
			touchmove: function(e) {
				var t = i(e.touches, this.__firstTouchId),
					o = i(e.touches, this.__secondTouchId);
				if (o) {
					var n = Math.sqrt(Math.pow(t.clientX - o.clientX, 2) + Math.pow(t.clientY - o.clientY, 2));
					this.scaleTo(this.__$baseScale * n / this.__$distance);
					var a = {
						x: (t.clientX + o.clientX) / 2,
						y: (t.clientY + o.clientY) / 2
					};
					this.moveBy(a.x - this.__$prePosition.x, a.y - this.__$prePosition.y), this.__$prePosition = a
				} else t && (this.moveBy(t.clientX - this.__$prePosition.x, t.clientY - this.__$prePosition.y), this.__$prePosition = {
					x: t.clientX,
					y: t.clientY
				})
			},
			touchend: function(e) {
				var t;
				null != this.__firstTouchId && (t = i(e.changedTouches, this.__firstTouchId)) && (this.__firstTouchId = void 0, delete this.__secondTouchId, delete this.__$distance, delete this.__$baseScale, delete this.__$prePosition), null != this.__secondTouchId && i(e.changedTouches, this.__secondTouchId) && (delete this.__secondTouchId, delete this.__$distance, delete this.__$baseScale, this.__$prePosition = {
					x: t.clientX,
					y: t.clientY
				})
			},
			callback: function(e, t, o, i) {
				this.div.classList.remove("half");
				var n = this.element.getBoundingClientRect();
				return this.viewWidth = n.width, this.viewHeight = n.height, this.viewLeft = n.left, this.viewTop = n.top, this.naturalWidth = t, this.naturalHeight = o, this.minScale = Math.max(this.viewWidth / t, this.viewHeight / o), this.maxScale = this.viewWidth / this.minWidth, this.maxScale < this.minScale ? void(0 === t || 0 === t ? JAlert.notify(l) : JAlert.showOnce(r)) : (this.hasImage = !0, this.rect = this.__computeRect(), this.translate = {
					x: 0,
					y: 0
				}, this.scale = this.minScale, this.img.src = e, void(this.canvas = i))
			},
			initBySrc: function(e) {
				this.span.innerHTML = s, this.div.classList.add("half");
				var t = new Image;
				t.addEventListener("load", this), t.src = e
			},
			load: function(e) {
				this.callback(e.target.src, e.target.naturalWidth, e.target.naturalHeight, e.target)
			},
			__computeRect: function() {
				var e = this.origin,
					t = this.scale;
				return {
					top: e.y * t - e.y,
					left: e.x * t - e.x,
					bottom: -((this.naturalHeight - e.y) * t - (this.viewHeight - e.y)),
					right: -((this.naturalWidth - e.x) * t - (this.viewWidth - e.x))
				}
			},
			__updateUi: function() {
				var e = ["translate3d(", this.translate.x, "px,", this.translate.y, "px,0) scale3d(", this.scale, ",", this.scale, ",1)"].join("");
				this.img.style.webkitTransform = e, this.img.style.transform = e;
				var t = [this.origin.x, "px ", this.origin.y, "px"].join("");
				this.img.style.webkitTransformOrigin = t, this.img.style.transformOrigin = t
			},
			set translate(e) {
				this.__translate = e, this.__updateUi()
			},
			get translate() {
				return this.__translate || (this.__translate = {
					x: 0,
					y: 0
				}), this.__translate
			},
			set scale(e) {
				this.__scale = e, this.rect = this.__computeRect(), this.__updateUi()
			},
			get scale() {
				return this.__scale || (this.__scale = 1), this.__scale
			},
			set origin(e) {
				var t = this.origin,
					o = this.translate;
				o.x += (e.x - t.x) * (this.scale - 1), o.y += (e.y - t.y) * (this.scale - 1), this.__origin = e, this.rect = this.__computeRect(), this.__updateUi()
			},
			get origin() {
				return this.__origin || (this.__origin = {
					x: 0,
					y: 0
				}), this.__origin
			},
			set hasImage(e) {
				if (e) {
					this.bindInput && (this.input.style.display = "none"), this.div.classList.add("transparent"), this.span.innerHTML = a;
					var t = this.ngModel.$viewValue || {};
					t.hasImage = !0, this.ngModel.$setViewValue(t)
				} else this.div.classList.remove("transparent"), this.span.innerHTML = n;
				this.___hasImage = e
			},
			get hasImage() {
				return this.___hasImage
			},
			set __firstTouchId(e) {
				this.___firstTouchId = e
			},
			get __firstTouchId() {
				return this.___firstTouchId
			},
			moveBy: function(e, t) {
				var o = this.translate;
				o.x += e, o.y += t, o.x > this.rect.left && (o.x = this.rect.left), o.x < this.rect.right && (o.x = this.rect.right), o.y > this.rect.top && (o.y = this.rect.top), o.y < this.rect.bottom && (o.y = this.rect.bottom), this.translate = o
			},
			scaleTo: function(e) {
				e < this.minScale && (e = this.minScale), e > this.maxScale && (e = this.maxScale), this.scale = e
			},
			__base64ToFile: function(e) {
				for (var t = atob(e.split(",")[1]), o = new ArrayBuffer(t.length), i = new Uint8Array(o), n = 0, a = t.length; a > n; ++n) i[n] = t.charCodeAt(n);
				return new Blob([i], {
					type: "image/jpeg"
				})
			},
			clip: function(t) {
				if (this.canvas) {
					this.origin = {
						x: 0,
						y: 0
					};
					var o = document.createElement("canvas");
					this.clipWidth = o.width = this.viewWidth / this.scale, this.clipHeight = o.height = this.viewHeight / this.scale;
					var i = o.getContext("2d"),
						n = this.translate;
					i.drawImage(this.canvas, n.x / this.scale, n.y / this.scale);
					var a = this.__base64ToFile(o.toDataURL("image/jpeg"));
					if (o.width > this.maxWidth) {
						var r = this;
						e(a, {
							width: this.maxWidth,
							callback: function(e, o, i) {
								r.clipWidth = o, r.clipHeight = i;
								var n = r.__base64ToFile(e);
								r = null, t(n)
							}
						})
					} else t(a);
					return a
				}
				t(null)
			},
			getClientSize: function() {
				return {
					width: this.clipWidth,
					height: this.clipHeight
				}
			}
		};
	return {
		restrict: "EA",
		require: "ngModel",
		replace: !0,
		template: ['<div on-swipe-left="$event.stopPropagation()">', "<img>", '<div><span></span><i class="ic ic-hand"></i></div>', '<input type="file" ng-style="{width: width-220+\'px\'}">', "</div>"].join(""),
		scope: {
			model: "=ngModel"
		},
		compile: function(e) {
			return e.addClass("image-clip"), {
				post: function(e, t, i, n) {
					function a(t) {
						if (t) {
							var o = e.obj.getClientSize();
							n.$viewValue.src && Math.abs(o.width - Math.round(r.naturalWidth)) < 2 && Math.abs(o.height - Math.round(r.naturalHeight)) < 2 || n.$setViewValue({
								file: t,
								width: o.width,
								height: o.height,
								size: Math.round(t.size / 1024),
								hasImage: !0
							})
						}
						e.$emit("image.clip.complete")
					}
					e.width = o.devWidth;
					var r = Object.create(d);
					r.element = t[0], r.img = r.element.querySelector("img"), r.input = r.element.querySelector("input");
					for (var s = r.element; s.parentElement;) s = s.parentElement;
					r.bindInput = s.querySelector(i.bindInput), r.div = r.element.querySelector("div"), r.span = r.element.querySelector("span"), r.minWidth = parseFloat(i.minWidth || 480), r.maxWidth = parseFloat(i.maxWidth || 1200), r.ngModel = n, r.init(), e.obj = r, n.$render = function() {
						n.$viewValue && n.$viewValue.src && r.initBySrc(n.$viewValue.src)
					}, e.$on("image.clip", function() {
						JAlert.notify(c);
						e.obj.clip(a)
					})
				}
			}
		}
	}
}]), angular.module("app.common.graphic", ["app.common.graphic.directive", "app.common.graphic.service"]), angular.module("app.common.graphic.service", []).factory("BinaryFile", function() {
	return function(e, t, o) {
		var i = e,
			n = t || 0,
			a = 0;
		this.getRawData = function() {
			return i
		}, "string" == typeof e ? (a = o || i.length, this.getByteAt = function(e) {
			return 255 & i.charCodeAt(e + n)
		}, this.getBytesAt = function(e, t) {
			for (var o = [], a = 0; t > a; a++) o[a] = 255 & i.charCodeAt(e + a + n);
			return o
		}) : "unknown" == typeof e && (a = o || IEBinary_getLength(i), this.getByteAt = function(e) {
			return IEBinary_getByteAt(i, e + n)
		}, this.getBytesAt = function(e, t) {
			return new VBArray(IEBinary_getBytesAt(i, e + n, t)).toArray()
		}), this.getLength = function() {
			return a
		}, this.getSByteAt = function(e) {
			var t = this.getByteAt(e);
			return t > 127 ? t - 256 : t
		}, this.getShortAt = function(e, t) {
			var o = t ? (this.getByteAt(e) << 8) + this.getByteAt(e + 1) : (this.getByteAt(e + 1) << 8) + this.getByteAt(e);
			return 0 > o && (o += 65536), o
		}, this.getSShortAt = function(e, t) {
			var o = this.getShortAt(e, t);
			return o > 32767 ? o - 65536 : o
		}, this.getLongAt = function(e, t) {
			var o = this.getByteAt(e),
				i = this.getByteAt(e + 1),
				n = this.getByteAt(e + 2),
				a = this.getByteAt(e + 3),
				r = t ? (((o << 8) + i << 8) + n << 8) + a : (((a << 8) + n << 8) + i << 8) + o;
			return 0 > r && (r += 4294967296), r
		}, this.getSLongAt = function(e, t) {
			var o = this.getLongAt(e, t);
			return o > 2147483647 ? o - 4294967296 : o
		}, this.getStringAt = function(e, t) {
			for (var o = [], i = this.getBytesAt(e, t), n = 0; t > n; n++) o[n] = String.fromCharCode(i[n]);
			return o.join("")
		}, this.getCharAt = function(e) {
			return String.fromCharCode(this.getByteAt(e))
		}, this.toBase64 = function() {
			return window.btoa(i)
		}, this.fromBase64 = function(e) {
			i = window.atob(e)
		}
	}
}).factory("EXIF", function() {
	function e(e) {
		return !!e.exifdata
	}

	function t(e, t) {
		BinaryAjax(e.src, function(i) {
			var n = o(i.binaryResponse);
			e.exifdata = n || {}, t && t.call(e)
		})
	}

	function o(e) {
		if (255 != e.getByteAt(0) || 216 != e.getByteAt(1)) return !1;
		for (var t, o = 2, i = e.getLength(); i > o;) {
			if (255 != e.getByteAt(o)) return u && console.log("Not a valid marker at offset " + o + ", found: " + e.getByteAt(o)), !1;
			if (t = e.getByteAt(o + 1), 22400 == t) return u && console.log("Found 0xFFE1 marker"), a(e, o + 4, e.getShortAt(o + 2, !0) - 2);
			if (225 == t) return u && console.log("Found 0xFFE1 marker"), a(e, o + 4, e.getShortAt(o + 2, !0) - 2);
			o += 2 + e.getShortAt(o + 2, !0)
		}
	}

	function i(e, t, o, i, a) {
		var r, s, c, l = e.getShortAt(o, a),
			d = {};
		for (c = 0; l > c; c++) r = o + 12 * c + 2, s = i[e.getShortAt(r, a)], !s && u && console.log("Unknown tag: " + e.getShortAt(r, a)), d[s] = n(e, r, t, o, a);
		return d
	}

	function n(e, t, o, i, n) {
		var a, r, s, c, l, d, u = e.getShortAt(t + 2, n),
			p = e.getLongAt(t + 4, n),
			m = e.getLongAt(t + 8, n) + o;
		switch (u) {
			case 1:
			case 7:
				if (1 == p) return e.getByteAt(t + 8, n);
				for (a = p > 4 ? m : t + 8, r = [], c = 0; p > c; c++) r[c] = e.getByteAt(a + c);
				return r;
			case 2:
				return a = p > 4 ? m : t + 8, e.getStringAt(a, p - 1);
			case 3:
				if (1 == p) return e.getShortAt(t + 8, n);
				for (a = p > 2 ? m : t + 8, r = [], c = 0; p > c; c++) r[c] = e.getShortAt(a + 2 * c, n);
				return r;
			case 4:
				if (1 == p) return e.getLongAt(t + 8, n);
				r = [];
				for (var c = 0; p > c; c++) r[c] = e.getLongAt(m + 4 * c, n);
				return r;
			case 5:
				if (1 == p) return l = e.getLongAt(m, n), d = e.getLongAt(m + 4, n), s = new Number(l / d), s.numerator = l, s.denominator = d, s;
				for (r = [], c = 0; p > c; c++) l = e.getLongAt(m + 8 * c, n), d = e.getLongAt(m + 4 + 8 * c, n), r[c] = new Number(l / d), r[c].numerator = l, r[c].denominator = d;
				return r;
			case 9:
				if (1 == p) return e.getSLongAt(t + 8, n);
				for (r = [], c = 0; p > c; c++) r[c] = e.getSLongAt(m + 4 * c, n);
				return r;
			case 10:
				if (1 == p) return e.getSLongAt(m, n) / e.getSLongAt(m + 4, n);
				for (r = [], c = 0; p > c; c++) r[c] = e.getSLongAt(m + 8 * c, n) / e.getSLongAt(m + 4 + 8 * c, n);
				return r
		}
	}

	function a(e, t) {
		if ("Exif" != e.getStringAt(t, 4)) return u && console.log("Not valid EXIF data! " + e.getStringAt(t, 4)), !1;
		var o, n, a, r, s, c = t + 6;
		if (18761 == e.getShortAt(c)) o = !1;
		else {
			if (19789 != e.getShortAt(c)) return u && console.log("Not valid TIFF data! (no 0x4949 or 0x4D4D)"), !1;
			o = !0
		}
		if (42 != e.getShortAt(c + 2, o)) return u && console.log("Not valid TIFF data! (no 0x002A)"), !1;
		if (8 != e.getLongAt(c + 4, o)) return u && console.log("Not valid TIFF data! (First offset not 8)", e.getShortAt(c + 4, o)), !1;
		if (n = i(e, c, c + 8, m, o), n.ExifIFDPointer) {
			r = i(e, c, c + n.ExifIFDPointer, p, o);
			for (a in r) {
				switch (a) {
					case "LightSource":
					case "Flash":
					case "MeteringMode":
					case "ExposureProgram":
					case "SensingMethod":
					case "SceneCaptureType":
					case "SceneType":
					case "CustomRendered":
					case "WhiteBalance":
					case "GainControl":
					case "Contrast":
					case "Saturation":
					case "Sharpness":
					case "SubjectDistanceRange":
					case "FileSource":
						r[a] = g[a][r[a]];
						break;
					case "ExifVersion":
					case "FlashpixVersion":
						r[a] = String.fromCharCode(r[a][0], r[a][1], r[a][2], r[a][3]);
						break;
					case "ComponentsConfiguration":
						r[a] = g.Components[r[a][0]] + g.Components[r[a][1]] + g.Components[r[a][2]] + g.Components[r[a][3]]
				}
				n[a] = r[a]
			}
		}
		if (n.GPSInfoIFDPointer) {
			s = i(e, c, c + n.GPSInfoIFDPointer, h, o);
			for (a in s) {
				switch (a) {
					case "GPSVersionID":
						s[a] = s[a][0] + "." + s[a][1] + "." + s[a][2] + "." + s[a][3]
				}
				n[a] = s[a]
			}
		}
		return n
	}

	function r(o, i) {
		return o.complete ? (e(o) ? i && i.call(o) : t(o, i), !0) : !1
	}

	function s(t, o) {
		return e(t) ? t.exifdata[o] : void 0
	}

	function c(t) {
		if (!e(t)) return {};
		var o, i = t.exifdata,
			n = {};
		for (o in i) i.hasOwnProperty(o) && (n[o] = i[o]);
		return n
	}

	function l(t) {
		if (!e(t)) return "";
		var o, i = t.exifdata,
			n = "";
		for (o in i) i.hasOwnProperty(o) && (n += "object" == typeof i[o] ? i[o] instanceof Number ? o + " : " + i[o] + " [" + i[o].numerator + "/" + i[o].denominator + "]\r\n" : o + " : [" + i[o].length + " values]\r\n" : o + " : " + i[o] + "\r\n");
		return n
	}

	function d(e) {
		return o(e)
	}
	var u = !1,
		p = {
			36864: "ExifVersion",
			40960: "FlashpixVersion",
			40961: "ColorSpace",
			40962: "PixelXDimension",
			40963: "PixelYDimension",
			37121: "ComponentsConfiguration",
			37122: "CompressedBitsPerPixel",
			37500: "MakerNote",
			37510: "UserComment",
			40964: "RelatedSoundFile",
			36867: "DateTimeOriginal",
			36868: "DateTimeDigitized",
			37520: "SubsecTime",
			37521: "SubsecTimeOriginal",
			37522: "SubsecTimeDigitized",
			33434: "ExposureTime",
			33437: "FNumber",
			34850: "ExposureProgram",
			34852: "SpectralSensitivity",
			34855: "ISOSpeedRatings",
			34856: "OECF",
			37377: "ShutterSpeedValue",
			37378: "ApertureValue",
			37379: "BrightnessValue",
			37380: "ExposureBias",
			37381: "MaxApertureValue",
			37382: "SubjectDistance",
			37383: "MeteringMode",
			37384: "LightSource",
			37385: "Flash",
			37396: "SubjectArea",
			37386: "FocalLength",
			41483: "FlashEnergy",
			41484: "SpatialFrequencyResponse",
			41486: "FocalPlaneXResolution",
			41487: "FocalPlaneYResolution",
			41488: "FocalPlaneResolutionUnit",
			41492: "SubjectLocation",
			41493: "ExposureIndex",
			41495: "SensingMethod",
			41728: "FileSource",
			41729: "SceneType",
			41730: "CFAPattern",
			41985: "CustomRendered",
			41986: "ExposureMode",
			41987: "WhiteBalance",
			41988: "DigitalZoomRation",
			41989: "FocalLengthIn35mmFilm",
			41990: "SceneCaptureType",
			41991: "GainControl",
			41992: "Contrast",
			41993: "Saturation",
			41994: "Sharpness",
			41995: "DeviceSettingDescription",
			41996: "SubjectDistanceRange",
			40965: "InteroperabilityIFDPointer",
			42016: "ImageUniqueID"
		},
		m = {
			256: "ImageWidth",
			257: "ImageHeight",
			34665: "ExifIFDPointer",
			34853: "GPSInfoIFDPointer",
			40965: "InteroperabilityIFDPointer",
			258: "BitsPerSample",
			259: "Compression",
			262: "PhotometricInterpretation",
			274: "Orientation",
			277: "SamplesPerPixel",
			284: "PlanarConfiguration",
			530: "YCbCrSubSampling",
			531: "YCbCrPositioning",
			282: "XResolution",
			283: "YResolution",
			296: "ResolutionUnit",
			273: "StripOffsets",
			278: "RowsPerStrip",
			279: "StripByteCounts",
			513: "JPEGInterchangeFormat",
			514: "JPEGInterchangeFormatLength",
			301: "TransferFunction",
			318: "WhitePoint",
			319: "PrimaryChromaticities",
			529: "YCbCrCoefficients",
			532: "ReferenceBlackWhite",
			306: "DateTime",
			270: "ImageDescription",
			271: "Make",
			272: "Model",
			305: "Software",
			315: "Artist",
			33432: "Copyright"
		},
		h = {
			0: "GPSVersionID",
			1: "GPSLatitudeRef",
			2: "GPSLatitude",
			3: "GPSLongitudeRef",
			4: "GPSLongitude",
			5: "GPSAltitudeRef",
			6: "GPSAltitude",
			7: "GPSTimeStamp",
			8: "GPSSatellites",
			9: "GPSStatus",
			10: "GPSMeasureMode",
			11: "GPSDOP",
			12: "GPSSpeedRef",
			13: "GPSSpeed",
			14: "GPSTrackRef",
			15: "GPSTrack",
			16: "GPSImgDirectionRef",
			17: "GPSImgDirection",
			18: "GPSMapDatum",
			19: "GPSDestLatitudeRef",
			20: "GPSDestLatitude",
			21: "GPSDestLongitudeRef",
			22: "GPSDestLongitude",
			23: "GPSDestBearingRef",
			24: "GPSDestBearing",
			25: "GPSDestDistanceRef",
			26: "GPSDestDistance",
			27: "GPSProcessingMethod",
			28: "GPSAreaInformation",
			29: "GPSDateStamp",
			30: "GPSDifferential"
		},
		g = {
			ExposureProgram: {
				0: "Not defined",
				1: "Manual",
				2: "Normal program",
				3: "Aperture priority",
				4: "Shutter priority",
				5: "Creative program",
				6: "Action program",
				7: "Portrait mode",
				8: "Landscape mode"
			},
			MeteringMode: {
				0: "Unknown",
				1: "Average",
				2: "CenterWeightedAverage",
				3: "Spot",
				4: "MultiSpot",
				5: "Pattern",
				6: "Partial",
				255: "Other"
			},
			LightSource: {
				0: "Unknown",
				1: "Daylight",
				2: "Fluorescent",
				3: "Tungsten (incandescent light)",
				4: "Flash",
				9: "Fine weather",
				10: "Cloudy weather",
				11: "Shade",
				12: "Daylight fluorescent (D 5700 - 7100K)",
				13: "Day white fluorescent (N 4600 - 5400K)",
				14: "Cool white fluorescent (W 3900 - 4500K)",
				15: "White fluorescent (WW 3200 - 3700K)",
				17: "Standard light A",
				18: "Standard light B",
				19: "Standard light C",
				20: "D55",
				21: "D65",
				22: "D75",
				23: "D50",
				24: "ISO studio tungsten",
				255: "Other"
			},
			Flash: {
				0: "Flash did not fire",
				1: "Flash fired",
				5: "Strobe return light not detected",
				7: "Strobe return light detected",
				9: "Flash fired, compulsory flash mode",
				13: "Flash fired, compulsory flash mode, return light not detected",
				15: "Flash fired, compulsory flash mode, return light detected",
				16: "Flash did not fire, compulsory flash mode",
				24: "Flash did not fire, auto mode",
				25: "Flash fired, auto mode",
				29: "Flash fired, auto mode, return light not detected",
				31: "Flash fired, auto mode, return light detected",
				32: "No flash function",
				65: "Flash fired, red-eye reduction mode",
				69: "Flash fired, red-eye reduction mode, return light not detected",
				71: "Flash fired, red-eye reduction mode, return light detected",
				73: "Flash fired, compulsory flash mode, red-eye reduction mode",
				77: "Flash fired, compulsory flash mode, red-eye reduction mode, return light not detected",
				79: "Flash fired, compulsory flash mode, red-eye reduction mode, return light detected",
				89: "Flash fired, auto mode, red-eye reduction mode",
				93: "Flash fired, auto mode, return light not detected, red-eye reduction mode",
				95: "Flash fired, auto mode, return light detected, red-eye reduction mode"
			},
			SensingMethod: {
				1: "Not defined",
				2: "One-chip color area sensor",
				3: "Two-chip color area sensor",
				4: "Three-chip color area sensor",
				5: "Color sequential area sensor",
				7: "Trilinear sensor",
				8: "Color sequential linear sensor"
			},
			SceneCaptureType: {
				0: "Standard",
				1: "Landscape",
				2: "Portrait",
				3: "Night scene"
			},
			SceneType: {
				1: "Directly photographed"
			},
			CustomRendered: {
				0: "Normal process",
				1: "Custom process"
			},
			WhiteBalance: {
				0: "Auto white balance",
				1: "Manual white balance"
			},
			GainControl: {
				0: "None",
				1: "Low gain up",
				2: "High gain up",
				3: "Low gain down",
				4: "High gain down"
			},
			Contrast: {
				0: "Normal",
				1: "Soft",
				2: "Hard"
			},
			Saturation: {
				0: "Normal",
				1: "Low saturation",
				2: "High saturation"
			},
			Sharpness: {
				0: "Normal",
				1: "Soft",
				2: "Hard"
			},
			SubjectDistanceRange: {
				0: "Unknown",
				1: "Macro",
				2: "Close view",
				3: "Distant view"
			},
			FileSource: {
				3: "DSC"
			},
			Components: {
				0: "",
				1: "Y",
				2: "Cb",
				3: "Cr",
				4: "R",
				5: "G",
				6: "B"
			}
		};
	return {
		readFromBinaryFile: d,
		pretty: l,
		getTag: s,
		getAllTags: c,
		getData: r,
		Tags: p,
		TiffTags: m,
		GPSTags: h,
		StringValues: g
	}
}).factory("canvasResize", ["BinaryFile", "EXIF", function(e, t) {
	function o(e, t) {
		this.file = e, this.__options = t, this.options = n.extend({}, a, t), this._defaults = a, this._name = i, this.init()
	}
	var i = "canvasResize",
		n = {
			newsize: function(e, t, o, i, n) {
				var a = n ? "h" : "";
				if (o && e > o || i && t > i) {
					var r = e / t;
					(r >= 1 || 0 === i) && o && !n ? (e = o, t = o / r >> 0) : n && o / i >= r ? (e = o, t = o / r >> 0, a = "w") : (e = i * r >> 0, t = i)
				}
				return {
					width: e,
					height: t,
					cropped: a
				}
			},
			dataURLtoBlob: function(e) {
				for (var t = e.split(",")[0].split(":")[1].split(";")[0], o = atob(e.split(",")[1]), i = new ArrayBuffer(o.length), n = new Uint8Array(i), a = 0; a < o.length; a++) n[a] = o.charCodeAt(a);
				var r = window.BlobBuilder || window.WebKitBlobBuilder || window.MozBlobBuilder;
				return r ? (r = new(window.BlobBuilder || window.WebKitBlobBuilder || window.MozBlobBuilder), r.append(i), r.getBlob(t)) : r = new Blob([i], {
					type: t
				})
			},
			detectSubsampling: function(e) {
				var t = e.width,
					o = e.height;
				if (t * o > 1048576) {
					var i = document.createElement("canvas");
					i.width = i.height = 1;
					var n = i.getContext("2d");
					return n.drawImage(e, -t + 1, 0), 0 === n.getImageData(0, 0, 1, 1).data[3]
				}
				return !1
			},
			rotate: function(e, t) {
				var o = {
					1: {
						90: 6,
						180: 3,
						270: 8
					},
					2: {
						90: 7,
						180: 4,
						270: 5
					},
					3: {
						90: 8,
						180: 1,
						270: 6
					},
					4: {
						90: 5,
						180: 2,
						270: 7
					},
					5: {
						90: 2,
						180: 7,
						270: 4
					},
					6: {
						90: 3,
						180: 8,
						270: 1
					},
					7: {
						90: 4,
						180: 5,
						270: 2
					},
					8: {
						90: 1,
						180: 6,
						270: 3
					}
				};
				return o[e][t] ? o[e][t] : e
			},
			transformCoordinate: function(e, t, o, i) {
				switch (i) {
					case 5:
					case 6:
					case 7:
					case 8:
						e.width = o, e.height = t;
						break;
					default:
						e.width = t, e.height = o
				}
				var n = e.getContext("2d");
				switch (i) {
					case 1:
						break;
					case 2:
						n.translate(t, 0), n.scale(-1, 1);
						break;
					case 3:
						n.translate(t, o), n.rotate(Math.PI);
						break;
					case 4:
						n.translate(0, o), n.scale(1, -1);
						break;
					case 5:
						n.rotate(.5 * Math.PI), n.scale(1, -1);
						break;
					case 6:
						n.rotate(.5 * Math.PI), n.translate(0, -o);
						break;
					case 7:
						n.rotate(.5 * Math.PI), n.translate(t, -o), n.scale(-1, 1);
						break;
					case 8:
						n.rotate(-.5 * Math.PI), n.translate(-t, 0)
				}
			},
			detectVerticalSquash: function(e, t, o) {
				var i = document.createElement("canvas");
				i.width = 1, i.height = o;
				var n = i.getContext("2d");
				n.drawImage(e, 0, 0);
				for (var a = n.getImageData(0, 0, 1, o).data, r = 0, s = o, c = o; c > r;) {
					var l = a[4 * (c - 1) + 3];
					0 === l ? s = c : r = c, c = s + r >> 1
				}
				var d = c / o;
				return 0 === d ? 1 : d
			},
			callback: function(e) {
				return e
			},
			extend: function() {
				var e = arguments[0] || {},
					t = 1,
					o = arguments.length,
					i = !1;
				e.constructor === Boolean && (i = e, e = arguments[1] || {}), 1 === o && (e = this, t = 0);
				for (var a; o > t; t++)
					if (null !== (a = arguments[t]))
						for (var r in a) e !== a[r] && (i && "object" == typeof a[r] && e[r] ? n.extend(e[r], a[r]) : void 0 !== a[r] && (e[r] = a[r]));
				return e
			}
		},
		a = {
			width: void 0,
			height: void 0,
			crop: !1,
			quality: 100,
			rotate: 0,
			callback: n.callback
		};
	return o.prototype = {
			init: function() {
				function o(o) {
					var r = atob(o.split(",")[1]),
						s = new e(r, 0, r.length),
						c = t.readFromBinaryFile(s),
						l = new Image;
					l.onload = function() {
						var e = c.Orientation || 1;
						e = n.rotate(e, i.options.rotate);
						var t = e >= 5 && 8 >= e ? n.newsize(l.height, l.width, i.options.width, i.options.height, i.options.crop) : n.newsize(l.width, l.height, i.options.width, i.options.height, i.options.crop),
							o = l.width,
							r = l.height,
							s = t.width,
							d = t.height,
							u = s * d;
						if (u > 5e6) {
							var p = Math.sqrt(u / 5e6);
							s /= p, d /= p
						}
						var m = document.createElement("canvas"),
							h = m.getContext("2d");
						h.save(), n.transformCoordinate(m, s, d, e), n.detectSubsampling(l) && (o /= 2, r /= 2);
						var g = 1024,
							f = document.createElement("canvas");
						f.width = f.height = g;
						for (var y = f.getContext("2d"), _ = n.detectVerticalSquash(l, o, r), v = 0; r > v;) {
							for (var w = v + g > r ? r - v : g, S = 0; o > S;) {
								var b = S + g > o ? o - S : g;
								y.clearRect(0, 0, g, g), y.drawImage(l, -S, -v);
								var k = Math.floor(S * s / o),
									$ = Math.ceil(b * s / o),
									x = Math.floor(v * d / r / _),
									P = Math.ceil(w * d / r / _);
								h.drawImage(f, 0, 0, b, w, k, x, $, P), S += g
							}
							v += g
						}
						h.restore(), f = y = null;
						var C = document.createElement("canvas");
						C.width = "h" === t.cropped ? d : s, C.height = "w" === t.cropped ? s : d;
						var T = "h" === t.cropped ? .5 * (d - s) : 0,
							A = "w" === t.cropped ? .5 * (s - d) : 0;
						if (newctx = C.getContext("2d"), newctx.drawImage(m, T, A, s, d), "image/png" === a.type) var M = C.toDataURL(a.type);
						else var M = C.toDataURL("image/jpeg", .01 * i.options.quality);
						i.__options.callback(M, C.width, C.height, C)
					}, l.src = o
				}
				var i = this,
					a = this.file;
				if (angular.isString(a)) o(a);
				else {
					var r = new FileReader;
					r.onloadend = o, r.readAsDataURL(a)
				}
			}
		},
		function(e, t) {
			new o(e, t)
		}
}]).factory("file", ["resFileUpload", "Ajax", "JAlert", function(e, t, o) {
	function i(e) {
		var i = e.data;
		if (0 === i.code) {
			var n = i.token,
				a = new t("http://upload.qiniu.com/", {
					method: t.HttpMethod.POST,
					enctype: t.HttpFormEnctype.MULTIPARTFORMDATA,
					crossDomain: !0,
					data: {
						key: this.opt.name,
						token: n,
						file: this.opt.file
					}
				}, "fileUpload");
			a.addEventListener(t.Event.SUCCESS, this.success), a.addEventListener(t.Event.ERROR, this.error), a.send(), o.show("正在保存图片")
		} else o.showOnce(i.msg)
	}

	function n(e, o, i, n, a, r, s, c) {
		var l = new t("http://upload.qiniu.com/", {
			method: t.HttpMethod.POST,
			enctype: t.HttpFormEnctype.MULTIPARTFORMDATA,
			crossDomain: !0,
			data: {
				key: o,
				token: e,
				file: i
			},
			timeout: n
		}, "fileUpload2");
		a && l.addEventListener(t.Event.SUCCESS, a), r && l.addEventListener(t.Event.ERROR, r), s && l.addEventListener(t.Event.TIMEOUT, s), c && (l.getXHR().upload.onprogress = c), l.send()
	}
	return t.global.addEventListener(t.Event.SUCCESS, function() {
		"fileUpload" === this.getId() && o.hide()
	}), t.global.addEventListener(t.Event.ERROR, function() {
		"fileUpload" === this.getId() && o.hide()
	}), {
		upload: function(t, o, n) {
			e.getToken({}).$promise.then(i.bind({
				opt: t,
				success: o,
				error: n
			}))
		},
		uploadTest: function(t, o, n) {
			e.getTestToken({}).$promise.then(i.bind({
				opt: t,
				success: o,
				error: n
			}))
		},
		getToken: function(t, o, i) {
			var n = "getToken";
			i && (n = "getTestToken"), e[n]({}, function(e) {
				0 === e.data.code && t && t(e.data.token)
			}, o || angular.noop)
		},
		getMP3Token: function(t, o, i, n) {
			var a = "getAudioMP3Token";
			n && (a = "getTestAudioMP3Token"), e[a]({
				key: t
			}, function(e) {
				o && o(e.data.token)
			}, i || angular.noop)
		},
		upload2: function(e, t, o, i, a) {
			n(e.token, e.name, e.file, e.time || 18e3, t, o, i, a)
		}
	}
}]).factory("tip", ["$timeout", "cacheLocal", "$ionicHistory", "$ionicPlatform", "$rootScope", function(e, t, o, i, n) {
	function a() {
		n.user.isIOS || (h(), h = i.registerBackButtonAction(function(e) {
			e.preventDefault()
		}, 401))
	}

	function r() {
		n.user.isIOS || (h(), h = angular.noop)
	}

	function s() {
		g.classList.add("android-fix")
	}

	function c() {
		g.style.opacity = 1
	}

	function l() {
		g.style.display = "", g.classList.remove("show"), f.style.top = ""
	}

	function d(e, t) {
		return ["-webkit-gradient(radial,50% 50%,", e, ",50% 50%,", t, ",from(rgba(255,255,255,0)), to(rgba(35,24,21,0.8)))"].join("")
	}

	function u() {
		v.style.opacity = 1
	}

	function p() {
		v.style.display = "", v.classList.remove("show")
	}

	function m() {
		if (k) {
			var e = k[k.index];
			e ? (e.fn && e.fn(), e.tipText ? ($.closeScroll(), $.searchlight(e.tipText, e.position, e.innerRadius, e.outerRadius, e.direction, e.width, e.offset)) : ($.closeSearchlight(), $.scroll(e.type, e.position, e.width, e.height, e.text, e.direction)), ++k.index) : ($.closeScroll(), $.closeSearchlight(), k = null)
		}
	}
	var h = angular.noop,
		g = document.createElement("div");
	g.classList.add("searchlight"), e(function() {
		n.user.isIOS && s()
	}, 300), g.appendChild(document.createElement("div"));
	var f = document.createElement("div");
	g.appendChild(document.createElement("div")).appendChild(f), document.body.appendChild(g);
	var y = !1,
		_ = null,
		v = document.createElement("div");
	v.classList.add("scrolltip");
	var w = document.createElement("div");
	v.appendChild(document.createElement("div")).appendChild(w), document.body.appendChild(v).appendChild(document.createElement("div"));
	var S = !1,
		b = null,
		k = null;
	g.addEventListener("touchend", m), v.addEventListener("touchend", m);
	var $ = {
		searchlight: function(t, o, i, n, r, l, u) {
			t = t || "", o = o || {
				x: 0,
				y: 0
			}, i = i || 0, n = n || 50, r = r || "bottom", u = u || 0, e.cancel(_), y || (a(), g.style.display = "block", _ = e(c, 10), y = !0), g.style.background = d(i, n), g.style.webkitTransform = "translate3d(" + o.x + "px," + o.y + "px,0)", g.classList.remove("show"), _ = e(function() {
				g.setAttribute("direction", r), f.parentNode.style.width = l ? l + "px" : "", "left" === r || "right" === r ? (f.style.top = -f.getBoundingClientRect().height / 2 + "px", f.parentNode.style.webkitTransform = "translate3D(0," + u + "px,0)") : f.parentNode.style.webkitTransform = "translate3D(" + u + "px,0,0)", g.classList.add("show"), f.innerHTML = t || "", e(s, 300)
			}, 500)
		},
		closeSearchlight: function() {
			y && (e.cancel(_), g.style.opacity = "", _ = e(l, 500), y = !1, r())
		},
		scroll: function(t, o, i, n, r, s) {
			t = t || "horizon", o = o || {
				x: 0,
				y: 0
			}, i = i || 100, n = n || 100, r = r || "", s = s || "bottom", e.cancel(b), S || (a(), v.style.display = "block", b = e(u, 10), S = !0), v.style.webkitTransform = "translate3d(" + o.x + "px," + o.y + "px,0)", w.style.width = i + "px", w.style.height = n + "px", v.classList.remove("show"), b = e(function() {
				v.setAttribute("type", t), v.setAttribute("direction", s), w.setAttribute("text", r), v.classList.add("show")
			}, 500)
		},
		closeScroll: function() {
			S && (e.cancel(b), v.style.opacity = "", b = e(p, 500), S = !1, r())
		},
		list: function(e) {
			e && (k ? k.push.apply(k, e) : (e.index = 0, k = e, m()))
		},
		shouldTip: function(e) {
			var i = t.system.get("stateGuide"),
				n = e || o.currentView().stateName;
			return !i[n]
		},
		setTiped: function(e) {
			var i = t.system.get("stateGuide"),
				n = e || o.currentView().stateName;
			i[n] = !0, t.system.put("stateGuide", i)
		}
	};
	return $
}]).factory("convert", function() {
	function e(e) {
		var t = (e.naturalWidth, e.naturalHeight),
			o = document.createElement("canvas");
		o.width = 1, o.height = t;
		var i = o.getContext("2d");
		i.drawImage(e, 0, 0);
		for (var n = i.getImageData(0, 0, 1, t).data, a = 0, r = t, s = t; s > a;) {
			var c = n[4 * (s - 1) + 3];
			0 === c ? r = s : a = s, s = r + a >> 1
		}
		var l = s / t;
		return 0 === l ? 1 : l
	}

	function t(t, o, i, n, a, r, s, c, l, d) {
		var u = e(o);
		t.drawImage(o, i, n, a, r, s, c, l, d / u)
	}

	function o(e) {
		for (var t = e.split(","), o = t[0].match(/:(.*?);/)[1], i = atob(t[1]), n = i.length, a = new Uint8Array(n); n--;) a[n] = i.charCodeAt(n);
		return new Blob([a], {
			type: o
		})
	}

	function i(e, t) {
		var o = new FileReader;
		o.onload = function(e) {
			t(e.target.result)
		}, o.readAsDataURL(e)
	}

	function n(e, t) {
		return e.toDataURL(t || "image/jpeg")
	}

	function a(e, o, i, a) {
		var r, s, c = e.naturalWidth,
			l = e.naturalHeight;
		i || a ? (r = i || 0, s = a || 0, r || (r = s / l * c), s || (s = r / c * l)) : (r = c, s = l);
		var d = r * s;
		if (d > 5e6) {
			var u = d / 5e6;
			r /= u, s /= u
		}
		var p = document.createElement("canvas");
		return p.width = r, p.height = s, t(p.getContext("2d"), e, 0, 0, c, l, 0, 0, r, s), n(p, o)
	}

	function r(e, o, i, a, r) {
		var s = document.createElement("canvas");
		s.width = o, s.height = i;
		var c, l, d, u, p, m, h, g, f = e.naturalWidth,
			y = e.naturalHeight;
		switch (a) {
			case "contain":
				i / y > o / f ? (p = 0, h = o, g = o / f * y, m = (i - g) / 2) : (m = 0, g = i, h = i / y * f, p = (o - h) / 2), c = l = 0, d = f, u = y;
				break;
			case "cover":
				o / f > i / y ? (c = 0, d = f, u = f / o * i, l = (y - u) / 2) : (l = 0, u = y, d = y / i * o, c = (f - d) / 2), p = m = 0, h = o, g = i;
				break;
			default:
				f > o ? (c = (f - o) / 2, p = 0) : (p = (o - f) / 2, c = 0), y > i ? (l = (y - i) / 2, m = 0) : (m = (i - y) / 2, l = 0), d = h = Math.min(f, o), u = g = Math.min(y, i)
		}
		return t(s.getContext("2d"), e, c, l, d, u, p, m, h, g), n(s, r)
	}
	return {
		dataURLtoBlob: o,
		readBlobAsDataURL: i,
		canvasToDataUrl: n,
		imageToDataUrl: a,
		clip: r,
		drawImageIOSFix: t
	}
}).factory("filter", function() {
	function e(e) {
		this._caman = Caman(e)
	}
	return Caman.renderBlocks = 8, Caman.Filter.register("huaijiu", function() {
		return this.sepia(100)
	}), Caman.Filter.register("tuise", function() {
		return this.vibrance(-100)
	}), Caman.Filter.register("jiuzhaopian", function() {
		return this.saturation(-100)
	}), Caman.Filter.register("baoguang", function() {
		return this.exposure(8)
	}), Caman.Filter.register("labihua", function() {
		return this.noise(9)
	}), e.prototype = {
		constructor: e,
		reset: function() {
			this._caman.revert()
		},
		useFilter: function(e) {
			e in this._caman && this._caman[e].apply(this._caman, Array.prototype.slice.call(arguments, 1))
		},
		apply: function(e) {
			this._caman.render(e)
		}
	}, {
		names: {
			huaijiu: "怀旧",
			tuise: "褪色",
			jiuzhaopian: "旧照片",
			baoguang: "曝光",
			labihua: "蜡笔画"
		},
		createInstance: function(t) {
			return new e(t)
		}
	}
}).factory("PhotoManager", ["filter", "convert", function(e) {
	function t(e, t, o, i, n) {
		var a = e.width,
			r = e.height,
			s = t.naturalWidth || t.width,
			c = t.naturalHeight || t.height;
		e.width = a;
		var l = e.getContext("2d");
		l.save(), l.setTransform(o, 0, 0, o, a / 2, r / 2), l.rotate(Math.PI / 2 * n);
		var d;
		switch (n) {
			case 0:
				break;
			case 1:
				d = i.x, i.x = i.y, i.y = -d;
				break;
			case 2:
				i.x = -i.x, i.y = -i.y;
				break;
			case 3:
				d = i.x, i.x = -i.y, i.y = d
		}
		l.drawImage(t, 0, 0, s, c, -s / 2 + i.x, -c / 2 + i.y, s, c), l.restore()
	}

	function o(t, i) {
		if (angular.isString(i)) {
			var n = new Image,
				a = this;
			return n.onload = function(e) {
				o.call(a, t, e.target), n.onload = null, a = null
			}, void(n.src = i)
		}
		this._canvas = t, this._originCanvas = document.createElement("canvas"), this._originCanvas.width = i.naturalWidth, this._originCanvas.height = i.naturalHeight, this._originCanvas.getContext("2d").drawImage(i, 0, 0, i.naturalWidth, i.naturalHeight, 0, 0, i.naturalWidth, i.naturalHeight), this._translate = {
			x: 0,
			y: 0
		}, this._rotate = 0, this._scale = Math.max(t.width / i.naturalWidth, t.height / i.naturalHeight), this._maxScale = 2 * this._scale, this._minScale = this._scale / 2, this._filter = e.createInstance(this._originCanvas), this._filterName = "", this._eleScale = t.width / t.getBoundingClientRect().width, d(this);
		var r = {
			manager: this
		};
		t.addEventListener("touchstart", s.bind(r)), t.addEventListener("touchmove", c.bind(r)), t.addEventListener("touchend", l.bind(r))
	}

	function i(e) {
		for (var t = 0, o = 0, i = 0, n = e.length; n > i; ++i) t += e[i].clientX, o += e[i].clientY;
		return {
			x: t / n,
			y: o / n
		}
	}

	function n(e, t) {
		for (var o = 0, i = e.length; i > o; ++o)
			if (e[o].identifier === t) return e[o];
		return null
	}

	function a(e, t, o) {
		var i = n(e, t),
			a = n(e, o);
		return i && a ? Math.sqrt(Math.pow(i.clientX - a.clientX, 2) + Math.pow(i.clientY - a.clientY, 2)) : void 0
	}

	function r(e, t) {
		if (void 0 === t && e[0]) return e[0].identifier;
		for (var o = 0, i = e.length; i > o; ++o)
			if (e[o].identifier !== t) return e[o].identifier
	}

	function s(e) {
		this.center = i(e.targetTouches), e.targetTouches.length >= 2 && (void 0 === this.touchId_1 || void 0 === this.touchId_2) && (void 0 == this.touchId_1 && (this.touchId_1 = r(e.targetTouches, this.touchId_2)), void 0 == this.touchId_2 && (this.touchId_2 = r(e.targetTouches, this.touchId_1)), this.distance = a(e.targetTouches, this.touchId_1, this.touchId_2), this.baseScale = this.manager.scale)
	}

	function c(e) {
		var t = i(e.targetTouches),
			o = t.x - this.center.x,
			n = t.y - this.center.y;
		if (this.center = t, this.distance) var r = a(e.targetTouches, this.touchId_1, this.touchId_2) / this.distance;
		var s = this.manager,
			c = this.baseScale;
		ionic.requestAnimationFrame(function() {
			s.moveBy(o, n), r && (s.scale = r * c), s = null
		})
	}

	function l(e) {
		this.center = i(e.targetTouches);
		var t = n(e.changedTouches, this.touchId_1),
			o = n(e.changedTouches, this.touchId_2);
		t && (delete this.touchId_1, delete this.distance), o && (delete this.touchId_2, delete this.distance)
	}

	function d(e) {
		e = e || this, e.constructor === o && t(e._canvas, e._originCanvas, e._scale, {
			x: e._translate.x / e._scale * e._eleScale,
			y: e._translate.y / e._scale * e._eleScale
		}, e._rotate)
	}
	return o.prototype.render = function() {
		JAlert.show("正在应用滤镜"), this._filter.reset(), this._filter.useFilter.apply(this._filter, arguments), this._filter.apply(function() {
			d(this), JAlert.hide()
		}.bind(this)), this._filterName = arguments[0]
	}, Object.defineProperty(o.prototype, "filter", {
		get: function() {
			return this._filterName
		}
	}), Object.defineProperty(o.prototype, "rotate", {
		get: function() {
			return this._rotate
		},
		set: function(e) {
			this._rotate = e % 4, d(this)
		}
	}), Object.defineProperty(o.prototype, "scale", {
		get: function() {
			return this._scale
		},
		set: function(e) {
			e < this._minScale && (e = this._minScale), e > this._maxScale && (e = this._maxScale), this._scale = e, d(this)
		}
	}), Object.defineProperty(o.prototype, "translate", {
		get: function() {
			return {
				x: this._translate.x,
				y: this._translate.y
			}
		},
		set: function(e) {
			this._translate.x = e.x, this._translate.y = e.y, d(this)
		}
	}), o.prototype.moveTo = function(e, t) {
		this._translate.x = e, this._translate.y = t, d(this)
	}, o.prototype.moveBy = function(e, t) {
		this._translate.x += e, this._translate.y += t, d(this)
	}, o.filterNames = e.names, o
}]).factory("affine", function() {
	function e(e, t, o) {
		if (0 !== o)
			for (var i = t[0].length, n = 0; i > n; ++n) t[0][n] += (e[0][n] || 0) * o, t[1][n] += (e[1][n] || 0) * o
	}

	function t(e, t) {
		if (1 !== t)
			for (var o = e[0].length, i = 0; o > i; ++i) e[0][i] *= t, e[1][i] *= t
	}

	function o(o, i) {
		var n, r = o.order,
			s = 3 === r ? a.E3 : a.E4;
		if (i) {
			n = [];
			for (var c = 0; r > c; ++c) n.push(o._matrix_array[c].slice(0))
		} else n = o._matrix_array;
		var c, l, d;
		for (c = 0; r > c; ++c) {
			if (0 === n[c][c])
				for (d = c + 1; r > d; ++d)
					if (0 !== n[d][c]) {
						e([n[d], s._matrix_array[d]], [n[c], s._matrix_array[c]], 1 / n[d][c]);
						break
					}
			if (0 === n[c][l]) throw new Error("矩阵不可逆");
			for (l = 0; r > l; ++l) c !== l && e([n[c], s._matrix_array[c]], [n[l], s._matrix_array[l]], -n[l][c] / n[c][c]);
			l === r && t([n[c], s._matrix_array[c]], 1 / n[c][c])
		}
		return i ? s : (o._matrix_array = s._matrix_array, o)
	}

	function i(e, t) {
		var o = e.order,
			i = t.order;
		if (i !== o) throw new RangeError("维度不匹配!");
		if (e instanceof a && t instanceof a) {
			var n, r, s, c, l = [];
			for (n = 0; o > n; ++n)
				for (r = 0; o > r; ++r) {
					for (c = 0, s = 0; o > s; ++s) c += e._matrix_array[n][s] * t._matrix_array[s][r];
					l.push(c)
				}
			return new a(l)
		}
		throw new TypeError("参数类型不正确")
	}

	function n(e, t) {
		var o = e.order,
			i = t.order;
		if (i !== o) throw new RangeError("维度不匹配!");
		if (e instanceof a && t instanceof r) {
			var n, s, c, l = [];
			for (n = 0; o > n; ++n) {
				for (c = 0, s = 0; o > s; ++s) c += e._matrix_array[n][s] * t._homogeneous_coordinates[s];
				l.push(c)
			}
			return new r(l)
		}
		throw new TypeError("参数类型不正确")
	}

	function a(e) {
		var t = Array.isArray(e) ? e : arguments;
		switch (t.length) {
			case 9:
				this._order = 3;
				break;
			case 16:
				this._order = 4;
				break;
			default:
				throw new TypeError("矩阵参数个数不正确(9或16)")
		}
		this._matrix_array = [];
		for (var o = 0; o < this._order; ++o) this._matrix_array.push(Array.prototype.slice.call(t, this._order * o, this._order * (o + 1)))
	}

	function r(e) {
		var t = Array.isArray(e) ? e : arguments;
		if (2 !== t.length && 3 == t.length) throw new TypeError("坐标个数不正确(2或3)");
		this._homogeneous_coordinates = Array.prototype.slice.call(t, 0), this._homogeneous_coordinates.push(1), this._order = this._homogeneous_coordinates.length
	}
	return a.prototype = {
		constructor: a,
		get order() {
			return this._order
		},
		getElement: function(e, t) {
			return this._matrix_array[e][t]
		},
		setElement: function(e, t, o) {
			this._matrix_array[e][t] = o
		},
		get inverseMatrix() {
			return o(this, !0)
		},
		inverse: function() {
			return o(this, !1)
		},
		multi: function(e) {
			return this._matrix_array = i(this, e)._matrix_array, this
		},
		translateX: function(e) {
			if (!e) return this;
			var t = 3 === this.order ? [1, 0, e, 0, 1, 0, 0, 0, 1] : [1, 0, 0, e, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];
			return this.multi(new a(t))
		},
		translateY: function(e) {
			if (!x) return this;
			var t = 3 === this.order ? [1, 0, 0, 0, 1, e, 0, 0, 1] : [1, 0, 0, 0, 0, 1, 0, e, 0, 0, 1, 0, 0, 0, 0, 1];
			return this.multi(new a(t))
		},
		translateZ: function(e) {
			return e ? (4 === this.order && this.multi(new a(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, e, 0, 0, 0, 1)), this) : this
		},
		translate: function(e, t, o) {
			if (!e && !t && !o) return this;
			var i = 3 === this.order ? [1, 0, e || 0, 0, 1, t || 0, 0, 0, 1] : [1, 0, 0, e || 0, 0, 1, 0, t || 0, 0, 0, 1, o || 0, 0, 0, 0, 1];
			return this.multi(new a(i))
		},
		scaleX: function(e) {
			if (null == e || 1 == e) return this;
			var t = 3 === this.order ? [e, 0, 0, 0, 1, 0, 0, 0, 1] : [e, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];
			return this.multi(new a(t))
		},
		scaleY: function(e) {
			if (null == e || 1 == e) return this;
			var t = 3 === this.order ? [1, 0, 0, 0, e, 0, 0, 0, 1] : [1, 0, 0, 0, 0, e, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];
			return this.multi(new a(t))
		},
		scaleZ: function(e) {
			return null == e || 1 == e ? this : (4 === this.order && this.multi(new a(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, e, 0, 0, 0, 0, 1)), this)
		},
		scale: function(e, t, o) {
			if (null == e && (e = 1), null == t && (t = 1), null == o && (o = 1), 1 === e && 1 === t && 1 === o) return this;
			var i = 3 === this.order ? [e, 0, 0, 0, t, 0, 0, 0, 1] : [e, 0, 0, 0, 0, t, 0, 0, 0, 0, o, 0, 0, 0, 0, 1];
			return this.multi(new a(i))
		},
		rotateX: function(e) {
			if (!e) return this;
			if (4 === this.order) {
				var t = Math.sin(e),
					o = Math.cos(e);
				this.multi(new a(1, 0, 0, 0, 0, o, -t, 0, 0, t, o, 0, 0, 0, 0, 1))
			}
			return this
		},
		rotateY: function(e) {
			if (!e) return this;
			if (4 === this.order) {
				var t = Math.sin(e),
					o = Math.cos(e);
				this.multi(new a(o, 0, t, 0, 0, 1, 0, 0, -t, 0, o, 0, 0, 0, 0, 1))
			}
			return this
		},
		rotateZ: function(e) {
			if (!e) return this;
			var t = Math.sin(e),
				o = Math.cos(e),
				i = 3 === this.order ? [o, -t, 0, t, o, 0, 0, 0, 1] : [o, -t, 0, 0, t, o, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];
			return this.multi(new a(i))
		},
		rotate: function(e, t, o) {
			return 3 === this.order ? this.rotateZ(e) : this.rotateX(e).rotateY(t).rotateZ(o)
		}
	}, Object.defineProperty(a, "E3", {
		get: function() {
			return new a(1, 0, 0, 0, 1, 0, 0, 0, 1)
		}
	}), Object.defineProperty(a, "E4", {
		get: function() {
			return new a(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)
		}
	}), a.multi = function(e, t) {
		return i(e, t)
	}, a.inverse = function(e) {
		return o(e, !0)
	}, r.prototype = {
		constructor: r,
		get order() {
			return this._order
		},
		get x() {
			return this._homogeneous_coordinates[0]
		},
		get y() {
			return this._homogeneous_coordinates[1]
		},
		get z() {
			return this._homogeneous_coordinates[2] || 0
		},
		transform: function(e) {
			return this._homogeneous_coordinates = n(e, this, order)._homogeneous_coordinates, this
		}
	}, r.transform = function(e, t) {
		return n(e, t)
	}, {
		Matrix: a,
		Coordinates: r
	}
}), angular.module("app.common.injector", ["app.common.injector.service"]), angular.module("app.common.injector.service", []).factory("http1Injector", ["$rootScope", "$timeout", "$q", "$injector", "cacheLocal", "CONFIG", function(e, t, o, i, n, a) {
	return {
		request: function(t) {
			if ("POST" == t.method) {
				if (t.timeout = 8e3, "POST" == t.method && (t.headers["x-requested-with"] = "XMLHttpRequest"), "file" === t.type && (t.headers["content-type"] = "multipart/form-data"), t.data) {
					t.data._base = {
						deviceId: a.deviceId,
						uuid: a.uuid,
						model: a.model,
						version: a.version,
						latitude: a.latitude.toString(),
						longitude: a.longitude.toString()
					}, t.data.timestamp = (new Date).getTime().toString(), t.data._token = e.user.token, t.data.page > 1 && (t.loading = !1), "undefined" != typeof t.data.getHttpOrCache && (t.getHttpOrCache = t.data.getHttpOrCache), delete t.data.getHttpOrCache, "undefined" != typeof t.data.getCacheOrHttp && (t.getCacheOrHttp = t.data.getCacheOrHttp), delete t.data.getCacheOrHttp, t.data.silence && (t.loading = !1), delete t.data.silence, delete t.data.sign;
					var n = "",
						r = Object.keys(t.data);
					r.sort();
					for (var s = 0; s < r.length; s++)
						if (-1 === ["loading", "getCacheOrHttp", "getHttpOrCache", "silence", "sign", "$$hashKey"].indexOf(r[s])) {
							var c = t.data[r[s]];
							"" !== c && null != c && (n += "object" == typeof c ? r[s] + "=object&" : r[s] + "=" + c + "&")
						}
					t.data.sign = md5(n.slice(0, n.length - 1) + a.SIGNATURE)
				}
				return "undefined" == typeof t.loading && (t.loading = !0), 0 == t.url.indexOf("/") && (t.url = a.host + t.url), t.needLogin && !e.user.isSigned ? (e.$emit("request:needSigned"), o.reject(t)) : (t.loading && (a.httpCount++, i.get("$ionicLoading").show()), t.getCacheOrHttp ? o.reject(t) : t)
			}
			return t
		}
	}
}]).factory("http2Injector", ["$rootScope", "$document", "$timeout", "$q", "$injector", "cacheLocal", "CONFIG", function(e, t, o, i, n, a, r) {
	function s(e, t) {
		var o = "";
		for (var i in t) - 1 === ["loading", "getCacheOrHttp", "getHttpOrCache", "silence", "_base", "_token", "timestamp", "sign"].indexOf(i) && (o += i + "=" + t[i] + "&");
		return "" == o ? e : e + "?" + o.slice(0, o.length - 1)
	}

	function c() {
		r.httpCount--, r.httpCount <= 0 && (n.get("$ionicLoading").hide(), t[0].body.classList.remove("loading-active"), r.httpCount = 0)
	}
	return jector = {
		requestError: function(t) {
			var o = s(t.url, t.data);
			return a.product.get(o) ? i.reject(a.product.get(o)) : t.needLogin && !e.user.isSigned ? i.reject({
				reason: "needLogin"
			}) : t
		},
		response: function(t) {
			if ("POST" == t.config.method) {
				if ("number" == typeof t.data.code && (t.data = {
						data: t.data
					}), -1 == t.data.data.code) return e.$emit("request:needSigned"), c(), t;
				if ((-404 == t.data.data.code || -500 == t.data.data.code) && JAlert.alert("系统异常！"), -4 == t.data.data.code && JAlert.alert(t.data.data.msg), t.config.getCacheOrHttp) {
					var o = s(t.config.url, t.config.data);
					a.product.put(o, t)
				}
				if (t.config.getHttpOrCache) {
					var o = s(t.config.url, t.config.data);
					a.system.put(o, t)
				}
				t.config.loading && c()
			}
			return t
		},
		responseError: function(t) {
			if (t.reason) return i.reject(t);
			if ("POST" == t.config.method) {
				if (c(), 200 == t.status) return t;
				if (t.config.getHttpOrCache && 0 == t.status) {
					var o = s(t.config.url, t.config.data),
						n = a.system.get(o);
					if (n) return n
				}
				return 408 == t.status || 0 == t.status ? (JAlert.showOnce(0 == t.status ? "请检查网络连接！" : "网络连接超时！"), e.$emit("baseCtrl.cleanCache"), i.reject(t)) : i.reject(t)
			}
		}
	}
}]), angular.module("app.common.override", ["ngCordova.plugins.geolocation"]), angular.module("ngCordova.plugins.geolocation", []).factory("$cordovaGeolocation", ["$q", "$rootScope", function(e, t) {
	return {
		getCurrentPosition: function(o) {
			var i = e.defer(),
				n = null;
			return n = t.user.isIOS ? navigator.geolocation : navigator.tmlocation, n.getCurrentPosition(function(e) {
				i.resolve(e)
			}, function(e) {
				i.reject(e)
			}, o), i.promise
		},
		watchPosition: function(t) {
			var o = e.defer(),
				i = navigator.geolocation.watchPosition(function(e) {
					o.notify(e)
				}, function(e) {
					o.reject(e)
				}, t);
			return o.promise.cancel = function() {
				navigator.geolocation.clearWatch(i)
			}, o.promise.clearWatch = function(e) {
				navigator.geolocation.clearWatch(e || i)
			}, o.promise.watchID = i, o.promise
		},
		clearWatch: function(e) {
			return navigator.geolocation.clearWatch(e)
		}
	}
}]), angular.module("app.common.modal.directive", []).directive("loadModal", ["$ionicModal", "$rootScope", "$timeout", "$document", "_modalUtil", "modal", "CONFIG", "currentScope", "$ionicGesture", "statusBar", "$ionicSlideBoxDelegate", function(e, t, o, i, n, a, r, s, c, l, d) {
	function u() {
		this._lock = !1, this._direction = "", this._preDirection = "", this._preOffset = 0, this._translate = 400
	}

	function p(e) {
		if (this.canDrag) {
			var t = e.gesture.deltaY;
			this.preDirection = t - this.preY > 0 ? "down" : "up", this.preY = t, d.enableSlide(!1), this.scope.dragData.setDrag2(a.getModal(this.name), e.gesture)
		} else this.dragTriggerTime < 2 && (this.preY = e.gesture.deltaY, ++this.dragTriggerTime, Math.abs(this.preY) > 1 && ("up" === e.gesture.direction || "down" === e.gesture.direction) && (this.canDrag = !0))
	}

	function m() {
		if (this.canDrag) {
			d.enableSlide(!0), this.canDrag = !1;
			var e = a.getModal(this.name);
			this.scope.dragData.release2(e, this.preDirection)
		}
		this.dragTriggerTime = 0
	}

	function h(e) {
		if (!e.__binded) {
			e.__binded = !0;
			var t = angular.element(e.modalEl);
			c.on("drag", p.bind(this), t), c.on("release", m.bind(this), t)
		}
	}

	function g(e, t) {
		var o = a.getModalName(t); - 1 !== this.blurNameList.indexOf(o) && t.modalEl.parentElement.parentElement.firstElementChild.classList.add("blur")
	}

	function f(e, t) {
		var o = a.getModalName(t); - 1 !== this.blurNameList.indexOf(o) && t.modalEl.parentElement.parentElement.firstElementChild.classList.remove("blur")
	}

	function y(e, t) {
		-1 !== this.hideBarNameList.indexOf(a.getModalName(t)) && ionic.Platform.ready(function() {
			l.show()
		})
	}

	function _(e, t) {
		-1 !== this.hideBarNameList.indexOf(a.getModalName(t)) && ionic.Platform.ready(function() {
			l.hide()
		})
	}
	var v = n;
	u.prototype.release2 = function(e, t) {
		var o = e.modalEl;
		this._lock = !1, o.style.webkitTransition = "", o.style.transition = "", ("up" === t && this._preOffset < -.2 || "down" === t && this._preOffset > .2) && e.hide(), this._preOffset = 0, ionic.requestAnimationFrame(function() {
			o.style.webkitTransform = "", o.style.transform = "", o.style.opacity = ""
		})
	}, u.prototype.release = function(e) {
		this._lock = !1, e.style.webkitTransition = "", e.style.transition = "", e.style.webkitTransform = "", e.style.transform = ""
	}, u.prototype.clear = function() {
		this._direction = "", this._preDirection = ""
	}, u.prototype.directionMaps = {
		left: "h",
		right: "h",
		up: "v",
		down: "v"
	}, u.prototype.setDrag2 = function(e, t) {
		var o = e.modalEl;
		if (!this._lock) {
			this._lock = !0, this._preOffset = 0, o.style.webkitTransition = "none", o.style.transition = "none", this._preClass = e.animation;
			var i = o.getBoundingClientRect();
			t.center.pageX > (i.left + i.right) / 2 ? (this._deg = 30, this._class = "round-left-", a.changeAnimation(e, this._class + "up")) : (this._deg = -30, this._class = "round-right-", a.changeAnimation(e, this._class + "up"))
		}
		a.changeAnimation(e, this._class + (t.deltaY > 0 ? "down" : "up"));
		var n = this._preOffset = t.deltaY / this._translate / 1.5;
		n > 1 ? n = 1 : -1 > n && (n = -1);
		var r = "rotateZ(" + this._deg * n + "deg) translate3D(0,0,0)";
		ionic.requestAnimationFrame(function() {
			o.style.webkitTransform = r, o.style.transform = r, o.style.opacity = 1 - Math.abs(n)
		})
	}, u.prototype.setDrag = function(e, t, o) {
		if (this._lock || (this._lock = !0, this._preOffset = 0, this._direction = t.direction, this._preDirection = "", e.style.webkitTransition = "none", e.style.transition = "none"), this.directionMaps[o] === this.directionMaps[this._direction]) {
			var i = "";
			switch (this._direction) {
				case "left":
				case "right":
					t.deltaX !== this._preOffset && (this._preDirection = t.deltaX > this._preOffset ? "right" : "left", this._preOffset = t.deltaX), i = "translate3d(" + t.deltaX + "px,0,0)";
					break;
				case "down":
				case "up":
					t.deltaY !== this._preOffset && (this._preDirection = t.deltaY > this._preOffset ? "down" : "up", this._preOffset = t.deltaY), i = "translate3d(0," + (t.deltaY < 0 ? "0" : t.deltaY) + "px,0)"
			}
			e.style.webkitTransform = i, e.style.transform = i
		}
	}, u.prototype.getDirection = function() {
		return this._direction
	}, u.prototype.getPreDirection = function() {
		return this._preDirection
	}, u.prototype.getOffset = function() {
		return this._preOffset
	};
	({
		h: .1 * r.devWidth,
		v: .1 * r.devHeight
	});
	return {
		restrict: "A",
		replace: !1,
		priority: 100,
		scope: {
			urlList: "=loadModal",
			nameList: "=modalName",
			directionList: "=modalSlideDirection",
			removeLeaveList: "=modalRemoveLeave",
			dragHide: "=modalDragHide",
			blur: "=modalBlurView",
			hideStatusBar: "=modalHideStatusbar"
		},
		controller: angular.noop,
		require: "^ionView",
		compile: function() {
			return {
				pre: function(e) {
					{
						var t = e.templateUrlList = v.parseJson(e.urlList),
							o = e.modalNameList = v.parseJson(e.nameList || []),
							i = e.slideDirectionList = v.parseJson(e.directionList || []),
							n = e.removeLeave = v.parseJson(e.removeLeaveList || []);
						e.dragList = v.parseJson(e.dragHide || []), e.blurList = v.parseJson(e.blur || []), e.hideStatusBarList = v.parseJson(e.hideStatusBar || [])
					}
					t && s.ready(e).then(function() {
						for (var e = 0, r = t.length; r > e; ++e) a.createModalImmediately(o[e] || (o[e] = "modal" + e), t[e], i[e] || (i[e] = "up"), -1 !== n.indexOf(o[e]))
					})
				},
				post: function(e, t) {
					s.ready(e).then(function() {
						e.dragData = new u, a.bind(function(t) {
							if ("enter" === t)
								for (var o = 0, i = e.dragList.length; i > o; ++o) a.getModalPromise(e.dragList[o]).then(h.bind({
									scope: e,
									name: e.dragList[o]
								}))
						}), e.blurList.show = [];
						var o = {
							element: t[0],
							blurNameList: e.blurList,
							hideBarNameList: e.hideStatusBarList
						};
						e.$on("modal.shown", g.bind(o)), e.$on("modal.hidden", f.bind(o)), e.$on("modal.shown", _.bind(o)), e.$on("modal.hidden", y.bind(o))
					})
				}
			}
		}
	}
}]).directive("modalLayerList", function() {
	function e(e) {
		this._scope = e
	}
	return e.$inject = ["$scope"], e.prototype.getDefaultLayerName = function() {
		return this._scope["default"]
	}, {
		restrict: "E",
		replace: !1,
		scope: {
			"default": "=default"
		},
		controller: e,
		link: function() {}
	}
}).directive("modalLayer", ["mHistory", function(e) {
	function t(t) {
		e.__destroy(t.currentScope.layerName)
	}

	function o(e) {
		this.__name = e.layerName
	}
	return o.$inject = ["$scope"], Object.defineProperty(o.prototype, "name", {
		get: function() {
			return this.__name
		}
	}), {
		restrict: "E",
		replace: !1,
		controller: o,
		scope: {
			layerName: "@name"
		},
		require: "^?modalLayerList",
		compile: function(o) {
			return o.addClass("modal-layer hide"), {
				pre: function(o, i, n, a) {
					if (e.__init(i[0]), o.$on("$destroy", t), a) {
						var r = a.getDefaultLayerName();
						r && r === o.layerName && e.go(r, i[0])
					}
				}
			}
		}
	}
}]), angular.module("app.common.modal", ["app.common.modal.directive", "app.common.modal.service"]), angular.module("app.common.modal.service", []).factory("_modalUtil", function() {
	function e(e, t) {
		return e.startsWith ? e.startsWith(t) : e.slice(0, t.length) === t
	}

	function t(e, t) {
		return e.endsWith ? e.endsWith(t) : e.slice(-t.length) === t
	}

	function o(i, n) {
		return o.unwrapperSuccess = !1, i = i.trim(), e(i, n[0]) && (i = i.slice(n[0].length), o.unwrapperSuccess = !0), t(i, n[1]) && (i = i.slice(0, -n[1].length), o.unwrapperSuccess = !0), i
	}

	function i(e) {
		e = o(e, ["[", "]"]);
		for (var t = e.split(","), i = 0, n = t.length, a = ""; n > i; ++i) a = o(t[i], ["'", "'"]), o.unwrapperSuccess || (a = o(t[i], ['"', '"'])), t[i] = "true" === a || "false" === a ? a : '"' + a + '"';
		return "[" + t.join(",") + "]"
	}
	return o.unwrapperSuccess = !1, {
		parseJson: function(e) {
			return angular.isString(e) ? JSON.parse(i(e)) : e
		},
		arrayRemove: function(e, t) {
			var o = e.indexOf(t); - 1 !== o && e.splice(o, 1)
		}
	}
}).factory("modal", ["$rootScope", "currentScope", "$ionicModal", function(e, t, o) {
	function i(e) {
		e.remove()
	}

	function n(e, t, o, i, n, a) {
		a = a === !1 ? !1 : !0, this.__name = e, this.__templateUrl = t, this.__direction = (c.indexOf(o) > -1 ? "slide-in-" : "") + o, this.__backclose = a, this.__removeLeave = i, this.__modalPromise = null, this.__modal = null, this.__enabled = !1, this._init(n)
	}

	function a(e) {
		var t = e.currentScope.__modal.list;
		if (t)
			for (var o = 0, i = t.length; i > o; ++o) t[o]._init(e.currentScope);
		for (var n = e.currentScope.__modal.bindFn, o = 0, i = n.length; i > o; ++o) n[o]("enter")
	}

	function r(e) {
		var t = e.currentScope.__modal.list;
		if (t)
			for (var o = 0, i = t.length; i > o; ++o) t[o].removeModalWhenViewLeave() && t[o]._destroy();
		for (var n = e.currentScope.__modal.bindFn, o = 0, i = n.length; i > o; ++o) n[o]("leave")
	}

	function s(e) {
		var t = e.currentScope.__modal.list;
		if (t)
			for (var o = 0, i = t.length; i > o; ++o) t[o]._destroy()
	}
	var c = ["left", "right", "up"];
	return n.prototype._init = function(e) {
		if (!this.__enabled) {
			var e = e || t.get();
			this.__enabled = !0, this.__modalPromise = o.fromTemplateUrl(this.__templateUrl, {
				scope: e,
				animation: this.__direction,
				hardwareBackButtonClose: this.__backclose
			});
			var i = this;
			this.__modalPromise.then(function(t) {
				i.__modal = t, t.__name = i.__name, i._triggerReadyEvent(e), i = null, e = null
			})
		}
	}, n.prototype.getModal = function() {
		return this.__modal
	}, n.prototype.getModalPromise = function() {
		return this.__modalPromise
	}, n.prototype.removeModalWhenViewLeave = function() {
		return this.__removeLeave
	}, n.prototype._destroy = function() {
		this.__enabled && (this.__modalPromise.then(i), this.__modal = null, this.__modalPromise = null, this.__enabled = !1)
	}, n.prototype._triggerReadyEvent = function(e) {
		var t = this.__name,
			o = this.__modal;
		e.$emit("modal.ready", t, o), e.$emit("modal.ready." + t, o)
	}, n.getModalName = function(e) {
		return e.__name
	}, {
		createModalImmediately: function(o, i, c, l, d, u) {
			u = u === !1 ? !1 : !0;
			var p = t.get(),
				m = d || p,
				h = d === e ? e : p;
			h.hasOwnProperty("__modal") || (h.__modal = {
				list: [],
				bind: !1,
				bindFn: []
			});
			var g = new n(o, i, c, l, m, u);
			return h.__modal.list.push(g), h.__modal.list[o] = g, d === e || h.__modal.bind || (h.$on("$ionicView.afterEnter", a), h.$on("$ionicView.beforeLeave", r), h.$on("$destroy", s), h.__modal.bind = !0), g.getModalPromise()
		},
		createModal: function(e, o, i, n, a, r) {
			var s = this.createModalImmediately;
			return t.ready(a, function() {
				var t = s(e, o, i, n, a, r);
				return s = null, t
			})
		},
		bind: function(e, o) {
			o = o || t.get(), o.hasOwnProperty("__modal") || (o.__modal = {
				list: [],
				bind: !1,
				bindFn: []
			}), o.__modal.bindFn.push(e)
		},
		createRootModal: function(t, o, i, n) {
			return this.createModalImmediately(t, o, i, n, e)
		},
		getModalName: function(e) {
			return n.getModalName(e)
		},
		_getModalData: function(o, i) {
			var n = t.get(),
				a = null;
			return i && i.__modal && (a = i.__modal.list[o]) ? a : n.__modal && (a = n.__modal.list[o]) ? a : e.__modal && (a = e.__modal.list[o]) ? a : null
		},
		_removeModalData: function(o, i) {
			i = i || t.get();
			var n = null;
			return i.__modal && (n = i.__modal.list[o]) ? (delete i.__modal.list[o], n) : e.__modal && (n = e.__modal.list[o]) ? (delete e.__modal.list[o], n) : null
		},
		getModal: function(e, t) {
			var o = this._getModalData(e, t);
			return o ? o.getModal() : null
		},
		getModalPromise: function(e, t) {
			var o = this._getModalData(e, t);
			return o ? o.getModalPromise() : null
		},
		destroyModal: function(e, t) {
			var o = this._getModalData(e, t);
			o && o._destroy()
		},
		reInitModal: function(e, t) {
			var o = this._getModalData(e, t);
			o && o._init(t)
		},
		removeModal: function(e, t) {
			var o = this._removeModalData(e, t);
			o && o._destroy()
		},
		contains: function(e, t) {
			return !!this._getModalData(e, t)
		},
		opWithNoAnimation: function(e, t) {
			if (angular.isString(e) && (e = this.getModal(e)), e) {
				t = t || "show";
				var o = e.animation;
				e.modalEl.classList.remove(o), e.animation = "", e[t]().then(function() {
					e.animation = o, e.modalEl.classList.add(o)
				})
			}
		},
		showWithNoAnimation: function(e) {
			this.opWithNoAnimation(e, "show")
		},
		hideWithNoAnimation: function(e) {
			this.opWithNoAnimation(e, "hide")
		},
		changeAnimation: function(e, t) {
			angular.isString(e) && (e = this.getModal(e)), e && t && t !== e.animation && (e.modalEl.classList.remove(e.animation), e.animation = t, e.modalEl.classList.add(e.animation))
		}
	}
}]).factory("mHistory", ["$timeout", "$rootScope", function(e, t) {
	function o(e, t) {
		return t = t || document.body, t.querySelector(".modal modal-layer.modal-layer[name='" + e + "']")
	}

	function i(e) {
		if (e.target === e.currentTarget) {
			var t = e.target.classList;
			t.contains("active") || t.add("hide"), e.stopPropagation()
		}
	}

	function n(e, o, i) {
		t.$broadcast("modalLayer.hide", {
			name: o,
			direction: i
		});
		for (var n = e.querySelectorAll("form"), a = 0, r = n.length; r > a; ++a) n[a].reset();
		e.classList.remove("active")
	}

	function a(o, i, n) {
		e(function() {
			o.classList.remove("hide"), t.$broadcast("modalLayer.show", {
				name: i,
				direction: n
			}), e(function() {
				o.classList.add("active")
			}, 50)
		}, 10)
	}
	var r = [],
		s = "";
	return {
		isEmpty: function() {
			return 0 === r.length
		},
		hasShow: function() {
			return !!s
		},
		goBack: function(e) {
			e = e || 1;
			var t = null;
			for (s && (t = o(s)) && n(t, s, "back"); e > 0 && r.length > 0;) s = r.pop(), s && (t = o(s)) && --e;
			t && a(t, s, "back")
		},
		go: function(e, t) {
			if (e && e !== s) {
				var i = r.indexOf(e),
					c = null;
				s && (c = o(s)) && (n(c, s, "forward"), r.push(s)), -1 !== i && (r.length = i), s = e, (c = t || o(s)) && a(c, s, "forward")
			}
		},
		clearHistory: function() {
			r = []
		},
		clear: function() {
			r = [];
			var e = o(s);
			e && e.classList.remove("active"), s = ""
		},
		__init: function(e) {
			e.addEventListener("transitionend", i), e.addEventListener("webkitTransitionEnd", i)
		},
		__destroy: function(e) {
			var t = r.indexOf(e);
			if (-1 !== t && r.splice(t, 1), e === s) {
				var i = o(s);
				i && i.classList.remove("active"), s = ""
			}
		}
	}
}]), angular.module("app.common.pushup.directive", []).directive("pushUp", ["$ionicGesture", "$ionicScrollDelegate", function(e, t) {
	function o(e) {
		switch (e.type) {
			case "drag":
				i.call(this, e);
				break;
			case "release":
				n.call(this, e)
		}
	}

	function i(e) {
		this._eventStackData.__dragNum < 3 && ++this._eventStackData.__dragNum, 2 === this._eventStackData.__dragNum && (this._eventStackData.eHeight || this._eventStackData.__init(), this._eventStackData.__animation(!1), this._eventStackData.__scroll = "up" === e.gesture.direction || "down" === e.gesture.direction ? !0 : !1), this._eventStackData.__scroll && (e.gesture.deltaY < this._eventStackData.__preDeltaY || 0 === t.$getByHandle(this.handle).getScrollPosition().top ? (this._eventStackData.__continue = !0, this._eventStackData.scrollHeight = this._eventStackData.scrollHeight + (this._eventStackData.__preDeltaY - e.gesture.deltaY)) : this._eventStackData.__continue = !1), this._eventStackData.__pre3DeltaY = this._eventStackData.__prepreDeltaY, this._eventStackData.__pre3Time = this._eventStackData.__prepreTime, this._eventStackData.__prepreDeltaY = this._eventStackData.__preDeltaY, this._eventStackData.__prepreTime = this._eventStackData.__preTime, this._eventStackData.__preDeltaY = e.gesture.deltaY, this._eventStackData.__preTime = e.gesture.timeStamp
	}

	function n() {
		if (this._eventStackData.__continue && this._eventStackData.__prepreTime) {
			var e = (this._eventStackData.__preDeltaY - this._eventStackData.__pre3DeltaY || this._eventStackData.__prepreDeltaY) / (this._eventStackData.__preTime - this._eventStackData.__pre3Time || this._eventStackData.__prepreTime),
				t = .01,
				o = Math.abs(e / t);
			this._eventStackData.__animation(!0, o);
			var i = .5 * t * o * o * (e > 0 ? 1 : -1);
			i && (this._eventStackData.scrollHeight -= i)
		}
		this._eventStackData.__pre3DeltaY = this._eventStackData.__pre3Time = this._eventStackData.__preDeltaY = this._eventStackData.__prepreDeltaY = this._eventStackData.__preTime = this._eventStackData.__prepreTime = null, this._eventStackData.__scroll = !1, this._eventStackData.__dragNum = 0, this._eventStackData.__preDeltaY = 0, this._eventStackData.__continue = !1
	}
	return {
		restrict: "EAC",
		replace: !1,
		scope: {
			handle: "=scrollHandle",
			scroll: "=onScroll"
		},
		compile: function() {
			return {
				pre: function(i, n, a) {
					i._eventStackData = {
						pushHeight: parseFloat(a.pushHeight),
						_scrollHeight: 0,
						get scrollHeight() {
							return this._scrollHeight
						},
						set scrollHeight(e) {
							0 > e && (e = 0), e > this.pushHeight && (e = this.pushHeight), e === this.pushHeight ? (n[0].classList.add("top"), i.$emit("userHome:stickUp")) : (n[0].classList.remove("top"), i.$emit("userHome:stickCancel")), this._scrollHeight = e, i.scroll && i.scroll(e);
							var t = "translate3D(0," + -e + "px,0)";
							ionic.requestAnimationFrame(function() {
								n[0].style.webkitTransform = t, n[0].style.transform = t
							})
						},
						eHeight: 0,
						__init: function() {
							this.eHeight = n[0].getBoundingClientRect().height, n[0].style.height = this.eHeight + this.pushHeight + "px", t.$getByHandle(i.handle).resize()
						},
						__animation: function(e, t) {
							e ? (n[0].classList.add("animation"), n[0].style.webkitTransitionDuration = t + "ms", n[0].style.transitionDuration = t + "ms") : n[0].classList.remove("animation")
						},
						__dragNum: 0,
						__preDeltaY: 0
					}, i.handleEvent = o, e.on("drag", i, n), e.on("release", i, n)
				}
			}
		}
	}
}]), angular.module("app.common.pushup", ["app.common.pushup.directive"]), angular.module("app.common.resource", ["app.common.resource.service"]), angular.module("app.common.resource.service", []).factory("__override", ["$rootScope", function(e) {
	return function(t, o) {
		if (window.cordova) {
			var i = t[o];
			t[o] = function() {
				++e.appratePrecondition, i.apply(this, arguments)
			}
		}
	}
}]).factory("resJourney", ["$resource", "__override", function(e, t) {
	var o = e("/api/:cat/:opt", null, {
		getHome: {
			params: {
				cat: "journey",
				opt: "GetThemeList"
			},
			method: "POST",
			getCacheOrHttp: !0
		},
		getTheme: {
			params: {
				cat: "journey",
				opt: "SearchByTheme"
			},
			method: "POST",
			getCacheOrHttp: !0
		},
		search: {
			params: {
				cat: "chat",
				opt: "searchJourney"
			},
			method: "POST"
		},
		getUserJourney: {
			params: {
				cat: "journey",
				opt: "getJourneyList"
			},
			method: "POST"
		},
		getDetail: {
			params: {
				cat: "journey",
				opt: "getJourneyDetail"
			},
			method: "POST"
		},
		getDetail2: {
			params: {
				cat: "journey",
				opt: "getNJourneyDetail"
			},
			method: "POST"
		},
		getPlan: {
			params: {
				cat: "journey",
				opt: "getJourneyPlan"
			},
			method: "POST"
		},
		getComments: {
			params: {
				cat: "comment",
				opt: "getJourneyComments"
			},
			method: "POST"
		},
		comment: {
			params: {
				cat: "comment",
				opt: "journey"
			},
			method: "POST",
			needLogin: !0
		},
		likeComment: {
			params: {
				cat: "comment",
				opt: "journeylike"
			},
			method: "POST",
			needLogin: !0
		}
	});
	return t(o, "like"), t(o, "likeComment"), o
}]).factory("resPoi", ["$resource", function(e) {
	return e("/api/:cat/:opt", null, {
		getDetail: {
			params: {
				cat: "poi",
				opt: "GetPoiDetail"
			},
			method: "POST"
		},
		getComments: {
			params: {
				cat: "comment",
				opt: "GetPoiComments"
			},
			method: "POST"
		},
		comment: {
			params: {
				cat: "comment",
				opt: "poi"
			},
			method: "POST"
		},
		likeComment: {
			params: {
				cat: "comment",
				opt: "PoiLike"
			},
			method: "POST"
		},
		getIntro: {
			params: {
				cat: "poi",
				opt: "GetPoiIntro"
			},
			method: "POST"
		},
		getUserMarkPoi: {
			params: {
				cat: "poi",
				opt: "getMarkPoiList"
			},
			method: "POST",
			needLogin: !1
		},
		search: {
			params: {
				cat: "chat",
				opt: "searchPoi"
			},
			method: "POST"
		},
		searchByType: {
			params: {
				cat: "poi",
				opt: "searchbycitytype"
			},
			method: "POST"
		},
		addTag: {
			params: {
				cat: "poi",
				opt: "addimpress"
			},
			method: "POST"
		}
	})
}]).factory("resBanner", ["$resource", function(e) {
	return e("/api/:cat/:opt", null, {
		getbannerlist: {
			params: {
				cat: "banner",
				opt: "getbannerlist"
			},
			loading: !1,
			method: "POST"
		}
	})
}]).factory("resStory", ["$resource", "__override", function(e, t) {
	var o = e("/api/:cat/:opt", null, {
		getTags: {
			params: {
				cat: "story",
				opt: "gettags"
			},
			method: "POST"
		},
		getUserStory: {
			params: {
				cat: "story",
				opt: "getStoryList"
			},
			method: "POST"
		},
		getHot: {
			params: {
				cat: "story",
				opt: "GetHotStory"
			},
			method: "POST"
		},
		getDetail: {
			params: {
				cat: "story",
				opt: "getnsdetail"
			},
			method: "POST"
		},
		searchByTag: {
			params: {
				cat: "story",
				opt: "SearchByTag"
			},
			method: "POST"
		},
		search: {
			params: {
				cat: "chat",
				opt: "SearchStory"
			},
			method: "POST"
		},
		getComments: {
			params: {
				cat: "comment",
				opt: "getstoryComments"
			},
			method: "POST"
		},
		comment: {
			params: {
				cat: "comment",
				opt: "story"
			},
			method: "POST",
			needLogin: !0
		},
		likeComment: {
			params: {
				cat: "comment",
				opt: "storylike"
			},
			method: "POST",
			needLogin: !0
		}
	});
	return t(o, "like"), t(o, "likeComment"), o
}]).factory("resChat", ["$resource", function(e) {
	return e("/api/chat/search", null, {
		getMessage: {
			method: "POST"
		}
	})
}]).factory("resTrain", ["$resource", function(e) {
	return e("/api/:cat/:opt", null, {
		search: {
			params: {
				cat: "train",
				opt: "search"
			},
			method: "POST"
		},
		getCites: {
			params: {
				cat: "train",
				opt: "getcitylist"
			},
			method: "POST"
		}
	})
}]).factory("resArticleSearch", ["$resource", function() {
	var e = [{
		id: 123232,
		title: "欧洲签证办理常见问题",
		thumb: ""
	}, {
		id: 132323,
		title: "申根签证的国家有哪些",
		thumb: ""
	}, {
		id: 323434,
		title: "面试官怎么问？我怎么答？",
		thumb: ""
	}];
	return {
		getList: function() {
			return e
		}
	}
}]).factory("resMap", ["$resource", function(e) {
	return e("/api/:cat/:opt", null, {
		getOffline: {
			params: {
				cat: "map",
				opt: "GetOffMap"
			},
			method: "POST"
		},
		getPoiByRange: {
			params: {
				cat: "map",
				opt: "GetPoiByRange"
			},
			method: "POST",
			loading: !1
		},
		getDownloadUrl: {}
	})
}]).factory("resMall", ["$resource", function(e) {
	return e("/api/production/marketindex", null, {
		getMallPage: {
			method: "POST"
		}
	})
}]).factory("resActivity", ["$resource", function(e) {
	return e("/api/production/GetActivity", null, {
		get: {
			method: "POST"
		}
	})
}]).factory("resVersion", ["$resource", function(e) {
	return e("/api/systerm/checkappversion", null, {
		check: {
			method: "POST"
		}
	})
}]).factory("resProduct", ["$resource", "__override", function(e, t) {
	var o = e("/api/:cat/:opt", null, {
		getSaleList: {
			params: {
				cat: "production",
				opt: "getsalelist"
			},
			method: "POST"
		},
		getExtraProducts: {
			params: {
				cat: "production",
				opt: "GetExtraProducts"
			},
			method: "POST"
		},
		getHot: {
			params: {
				cat: "production",
				opt: "getHotProduct"
			},
			method: "POST"
		},
		getHotByCat: {
			params: {
				cat: "production",
				opt: "GetHotProductByCat"
			},
			method: "POST"
		},
		getCountryPd: {
			params: {
				cat: "production",
				opt: "GetCountryPd"
			},
			method: "POST"
		},
		getPdList: {
			params: {
				cat: "Production",
				opt: "PdData"
			},
			method: "POST"
		},
		getPdListFilter: {
			params: {
				cat: "production",
				opt: "groupFilter"
			},
			method: "POST"
		},
		search: {
			params: {
				cat: "chat",
				opt: "SearchProduct"
			},
			method: "POST"
		},
		getDetail: {
			params: {
				cat: "production",
				opt: "getPdDetail"
			},
			method: "POST"
		},
		getJourney: {
			params: {
				cat: "production",
				opt: "GetJourneyDetail"
			},
			method: "POST"
		},
		mark: {
			params: {
				cat: "production",
				opt: "mark"
			},
			method: "POST"
		},
		getComments: {
			params: {
				cat: "comment",
				opt: "getproductcomments"
			},
			method: "POST"
		},
		comment: {
			params: {
				cat: "comment",
				opt: "product"
			},
			method: "POST"
		},
		likeComment: {
			params: {
				cat: "comment",
				opt: "productlike"
			},
			method: "POST"
		}
	});
	return t(o, "mark"), o
}]).factory("resUser", ["$resource", function(e) {
	return e("/api/:cat/:opt", null, {
		checkEmail: {
			params: {
				cat: "user2",
				opt: "CheckRegisterMail"
			},
			method: "POST"
		},
		register: {
			params: {
				cat: "user2",
				opt: "appRegister"
			},
			method: "POST"
		},
		findPassword: {
			params: {
				cat: "user2",
				opt: "findPassword"
			},
			method: "POST"
		},
		modifyPassword: {
			params: {
				cat: "user2",
				opt: "modifyPassword"
			},
			method: "POST"
		},
		wxLogin: {
			params: {
				cat: "user2",
				opt: "wxlogin"
			},
			method: "POST"
		},
		mailLogin: {
			params: {
				cat: "user2",
				opt: "mailLogin"
			},
			method: "POST"
		},
		logout: {
			params: {
				cat: "user2",
				opt: "logout"
			},
			method: "POST",
			needLogin: !0
		},
		getOwnInfo: {
			params: {
				cat: "user2",
				opt: "getUserInfo"
			},
			method: "POST"
		},
		getInfo: {
			params: {
				cat: "chat",
				opt: "getUserInfo"
			},
			method: "POST"
		},
		getMark: {
			params: {
				cat: "user2",
				opt: "getPoiByCityType"
			},
			method: "POST",
			needLogin: !0
		},
		getTags: {
			params: {
				cat: "user2",
				opt: "getTagsPool"
			},
			method: "POST",
			needLogin: !0
		},
		updateAvatar: {
			params: {
				cat: "user2",
				opt: "updateAvatar"
			},
			method: "POST",
			needLogin: !0
		},
		updateName: {
			params: {
				cat: "user2",
				opt: "updateName"
			},
			method: "POST",
			needLogin: !0
		},
		updateGender: {
			params: {
				cat: "user2",
				opt: "updateGender"
			},
			method: "POST",
			needLogin: !0
		},
		updateBrief: {
			params: {
				cat: "user2",
				opt: "updateBrief"
			},
			method: "POST",
			needLogin: !0
		},
		updateTags: {
			params: {
				cat: "user2",
				opt: "UpdateTags"
			},
			method: "POST",
			needLogin: !0
		},
		sendFeedback: {
			params: {
				cat: "user2",
				opt: "sendFeedback"
			},
			method: "POST"
		},
		getJourneyState: {
			params: {
				cat: "ujourney",
				opt: "queryJourneyCopyStat"
			},
			method: "POST",
			needLogin: !0
		},
		copyJourney: {
			params: {
				cat: "ujourney",
				opt: "copyJourney"
			},
			method: "POST",
			needLogin: !0
		},
		getMyJourney: {
			params: {
				cat: "ujourney",
				opt: "getJourneyList"
			},
			method: "POST",
			needLogin: !0
		},
		updateJourney: {
			params: {
				cat: "ujourney",
				opt: "UpdateJourney"
			},
			method: "POST",
			needLogin: !0
		},
		likeJourney: {
			params: {
				cat: "ujourney",
				opt: "like"
			},
			method: "POST",
			needLogin: !0
		},
		delJourney: {
			params: {
				cat: "ujourney",
				opt: "delete"
			},
			method: "POST",
			needLogin: !0
		},
		mergeJourney: {
			params: {
				cat: "ujourney",
				opt: "mergeJourney"
			},
			method: "POST",
			needLogin: !0
		},
		getCurJourney: {
			params: {
				cat: "ujourney",
				opt: "GetCurrentJourney"
			},
			method: "POST",
			needLogin: !0
		},
		getDepartCity: {
			params: {
				cat: "user2",
				opt: "getDepartCity"
			},
			method: "POST"
		},
		setCurJourney: {
			params: {
				cat: "ujourney",
				opt: "setCurrentJourney"
			},
			method: "POST",
			needLogin: !0
		},
		markPoi: {
			params: {
				cat: "upoi",
				opt: "mark"
			},
			method: "POST"
		},
		getMarkPoi: {
			params: {
				cat: "upoi",
				opt: "getMarkPoiList"
			},
			method: "POST",
			needLogin: !0
		},
		getStory: {
			params: {
				cat: "ustory",
				opt: "getStoryList"
			},
			method: "POST",
			needLogin: !0
		},
		likeStory: {
			params: {
				cat: "ustory",
				opt: "like"
			},
			method: "POST",
			needLogin: !0
		},
		newStory: {
			params: {
				cat: "ustory",
				opt: "createstory"
			},
			method: "POST",
			needLogin: !0
		},
		editStory: {
			params: {
				cat: "ustory",
				opt: "saveupdate"
			},
			method: "POST",
			needLogin: !0
		},
		delStory: {
			params: {
				cat: "ustory",
				opt: "delete"
			},
			method: "POST",
			needLogin: !0
		},
		getOrderList: {
			params: {
				cat: "uorder",
				opt: "getOrderList"
			},
			method: "POST",
			needLogin: !0
		},
		getOrderDetail: {
			params: {
				cat: "order",
				opt: "getOrderDetail"
			},
			method: "POST",
			needLogin: !0
		},
		getContacts: {
			params: {
				cat: "user2",
				opt: "getContacts"
			},
			method: "POST",
			needLogin: !0
		},
		updateContact: {
			params: {
				cat: "user2",
				opt: "updateContact"
			},
			method: "POST",
			needLogin: !0
		},
		getPostcardList: {
			params: {
				cat: "upostcard",
				opt: "getList"
			},
			method: "POST",
			needLogin: !0
		},
		getPostcardDetail: {
			params: {
				cat: "upostcard",
				opt: "getDetail"
			},
			method: "POST"
		},
		deletePostcard: {
			params: {
				cat: "upostcard",
				opt: "delete"
			},
			method: "POST",
			needLogin: !0
		}
	})
}]).factory("resOrder", ["$resource", function(e) {
	return e("/api/order/:opt", null, {
		getInfo: {
			params: {
				opt: "getPdInfo"
			},
			method: "POST",
			needLogin: !0
		},
		getAvailDate: {
			params: {
				opt: "GetAvailDateByMonth"
			},
			method: "POST",
			needLogin: !0
		},
		checkCode: {
			params: {
				opt: "CouponValid"
			},
			method: "POST",
			needLogin: !0
		},
		submit: {
			params: {
				opt: "submit"
			},
			method: "POST",
			needLogin: !0
		},
		getWeixPayid: {
			url: "/weixin/AppUnifiedOrder",
			method: "POST",
			needLogin: !0
		},
		getAliPayid: {
			url: "/alipayappsdk/orderpay",
			method: "POST",
			needLogin: !0
		}
	})
}]).factory("resFileUpload", ["$resource", function(e) {
	return e("/api/systerm/:action", null, {
		getToken: {
			params: {
				action: "getqntoken"
			},
			method: "POST"
		},
		getTestToken: {
			params: {
				action: "getqntesttoken"
			},
			method: "POST"
		},
		getAudioMP3Token: {
			params: {
				action: "getqnaudiotoken"
			},
			method: "POST"
		},
		getTestAudioMP3Token: {
			params: {
				action: "getqnaudiotesttoken"
			},
			method: "POST"
		}
	})
}]).factory("resPostcard", ["$resource", function(e) {
	return e("/api/:cat/:opt", null, {
		getAddress: {
			params: {
				cat: "position",
				opt: "fixbygps"
			},
			method: "POST"
		},
		randomTextByPoi: {
			params: {
				cat: "wish",
				opt: "searchbypoi"
			},
			method: "POST"
		},
		searchPosition: {
			params: {
				cat: "position",
				opt: "search"
			},
			method: "POST"
		},
		getTemplate: {
			params: {
				cat: "postcard",
				opt: "getTemplate"
			},
			method: "POST"
		},
		save: {
			params: {
				cat: "postcard",
				opt: "save"
			},
			method: "POST"
		},
		saveRawImage: {
			params: {
				cat: "postcard",
				opt: "saverawimage"
			},
			method: "POST",
			loading: !1
		},
		saveMailAddress: {
			params: {
				cat: "postcard",
				opt: "savemailaddress"
			},
			method: "POST"
		}
	})
}]).factory("resActivity", ["$resource", function(e) {
	return e("/api/activity/:opt", null, {
		comment: {
			params: {
				opt: "comment"
			},
			method: "POST"
		},
		like: {
			params: {
				opt: "like"
			},
			method: "POST"
		}
	})
}]), angular.module("app.common.scrollzoom.directive", []).directive("scrollZoom", ["CONFIG", function(e) {
	return {
		restrict: "EAC",
		replace: !1,
		link: function(t, o) {
			function i(e, t) {
				e.__scale && e.__scale === t || (e.__scale = t, e.style.webkitTransform = "scale(+" + t + ")")
			}

			function n(t) {
				var n = o[0].querySelectorAll(".item"),
					a = n.length;
				if (0 === a) return 0;
				if (0 > t) return -t;
				if (t >= a) return a - t - 1;
				var r = n[t].getBoundingClientRect();
				return r.top <= s + 30 && r.bottom >= s ? (i(n[t], 1), 0) : r.top > s ? (r.bottom > e.devHeight ? r.top < e.devHeight ? i(n[t], 1 - (r.bottom - e.devHeight) / r.height * .1) : i(n[t], .9) : i(n[t], 1), 0 === t ? 0 : -1) : (r.top < 0 ? r.bottom > 0 ? i(n[t], 1 - -r.top / r.height * .1) : i(n[t], .9) : i(n[t], 1), t === a - 1 ? 0 : 1);
				var r
			}

			function a() {
				var e = n(r);
				0 === e ? (n(r - 2), n(r - 1), n(r + 1), n(r + 2)) : (r += e, a())
			}
			var r = 0,
				s = e.devHeight / 2;
			ionic.requestAnimationFrame(function c() {
				0 === o[0].querySelectorAll(".item").length ? ionic.requestAnimationFrame(c) : a()
			}), o.bind("scroll", function() {
				a(), ionic.requestAnimationFrame(a)
			})
		}
	}
}]), angular.module("app.common.scrollzoom", ["app.common.scrollzoom.directive"]), angular.module("app.common.share.directive", []).directive("clickShare", ["$rootScope", "$ionicActionSheet", "CONFIG", function(e, t, o) {
	return {
		scope: {
			obj: "=shareObject"
		},
		link: function(i, n, a) {
			var r = {
				title: "欧优游·有故事的旅行",
				msg: "",
				url: "",
				image: "",
				scene: !1
			};
			n.bind("click", function(n) {
				switch (a.clickShare) {
					case "app":
						r.url = "http://a.app.qq.com/o/simple.jsp?pkgname=com.estrip.zouke", r.title = "欧优游·有故事的旅行", e.user.isSigned ? (r.msg = "我在欧优游，体验一场有故事的旅行，快看！", r.image = e.user.info.avatar) : (r.msg = "发现一款有故事的旅行APP，快来看看！", r.image = o.hostImg + "/app/logo.png-weixin");
						break;
					case "postcard":
						r.url = o.hostWWW + "/postcard/detail?id=" + i.obj.id + "&uid=" + e.user.info.user_id, r.title = "给你·有声音的明信片", r.msg = i.obj.desc, r.image = i.obj.img + o.imgSizeWeixin;
						break;
					case "story":
						r.url = o.hostWWW + "/story/detail2?id=" + i.obj.id + "&uid=" + e.user.info.user_id, r.title = i.obj.name + " | by " + i.obj.user_name, r.msg = i.obj.content.replace(/<[^>]+>/g, ""), r.image = i.obj.image + o.imgSizeWeixin;
						break;
					case "journey":
						r.url = o.hostWWW + "/journey/detail2?id=" + i.obj.id + "&uid=" + e.user.info.user_id, r.title = i.obj.name + " | by " + i.obj.user;
						for (var s = 0, c = 0; c < i.obj.days.length; c++)
							for (var l = 0; l < i.obj.days[c].pois.length && !(s > 1); l++) 0 != s && (r.msg += "; "), r.msg += i.obj.days[c].pois[l].wish_brief, s++;
						r.msg += "...", r.image = i.obj.img + o.imgSizeWeixin;
						break;
					case "product":
						r.url = o.hostWWW + "/production/pdetail?pdId=" + i.obj.pid + "&uid=" + e.user.info.user_id, r.title = i.obj.title, r.msg = i.obj.desc && "" != i.obj.desc ? i.obj.desc : i.obj.brief, r.image = i.obj.images[0] + o.imgSizeWeixin
				}
				var d = t.show({
					buttons: [{
						text: '<i class="ic ic-weixin"></i>微信好友'
					}, {
						text: '<i class="ic ic-weixin-moment"></i>发朋友圈'
					}],
					cssClass: "share-sheet",
					cancelText: "取消",
					cancel: function() {},
					buttonClicked: function(e) {
						switch (e) {
							case 0:
								r.scene = !1;
								break;
							case 1:
								r.scene = !0, "app" == a.clickShare ? r.title = r.msg : "postcard" == a.clickShare && (r.title = "有声明信片: " + r.msg)
						}
						return console.log(r), navigator.weixin && navigator.weixin.send({
							type: "webpage",
							url: r.url,
							title: r.title,
							desc: r.msg,
							imgUrl: r.image,
							isSendToTimeline: r.scene
						}, function() {
							JAlert.notify("已分享"), d()
						}, function() {}), !0
					}
				});
				n.stopPropagation()
			})
		}
	}
}]), angular.module("app.common.share", ["app.common.share.service", "app.common.share.directive"]), angular.module("app.common.share.service", []).factory("weixinShare", function() {
	function e(e, t, o) {
		navigator.weixin && navigator.weixin.send(e, t, o)
	}
	return {
		image2Friend: function(t, o, i) {
			e({
				type: "image",
				data: t,
				imageType: "url",
				title: "",
				isSendToTimeline: !1
			}, o, i)
		},
		image2Timeline: function(t, o, i) {
			e({
				type: "image",
				data: t,
				imageType: "url",
				title: "",
				isSendToTimeLine: !0
			}, o, i)
		},
		page2Friend: function(t, o, i) {
			e({
				type: "webpage",
				url: t.url,
				title: t.title || t.desc,
				desc: t.desc || t.title,
				imgUrl: t.image,
				isSendToTimeline: !1
			}, o, i)
		},
		page2Timeline: function(t, o, i) {
			e({
				type: "webpage",
				url: t.url,
				title: t.raw ? t.title || t.desc : t.desc || t.title,
				desc: t.desc || t.title,
				imgUrl: t.image,
				isSendToTimeline: !0
			}, o, i)
		}
	}
}), angular.module("app.common.slideup.directive", []).directive("slideUp", function() {
	return {
		restrict: "EAC",
		replace: !1,
		scope: !0,
		compile: function(e) {
			e.bind("click", function(t) {
				-1 !== Array.prototype.indexOf.call(e, t.target)
			});
			for (var t = 0, o = e.length; o > t; ++t) e[t].innerHTML = "<ion-content class='wrap' on-drag-down=\"$emit('slideUp.hide.trigger')\">" + e[t].innerHTML + "</ion-content>";
			return {
				pre: function(e, t) {
					e._slideUpData = {}, e._slideUpData.id = t[0].getAttribute("slide-up-id"), t[0].addEventListener("click", function(o) {
						o.target === t[0] && e.$emit("slideUp.hide.trigger")
					}), e.$on("slideUp.show", function(o, i) {
						(null === e._slideUpData.id || e._slideUpData.id === i) && t[0].classList.add("active")
					}), e.$on("slideUp.hide", function() {
						t[0].classList.remove("active")
					})
				}
			}
		}
	}
}).directive("slideUpBlur", function() {
	return {
		restrict: "EAC",
		replace: !1,
		link: function(e, t) {
			e.$on("slideUp.show", function() {
				t.css("-webkit-filter", "blur(5px)")
			}), e.$on("slideUp.hide", function() {
				t.css("-webkit-filter", "")
			})
		}
	}
}).directive("slideUpTrigger", function() {
	return {
		restrict: "EAC",
		replace: !1,
		link: function(e) {
			e.$on("slideUp.show.trigger", function(t, o) {
				t.stopPropagation(), e.$broadcast("slideUp.show", o)
			}), e.$on("slideUp.hide.trigger", function(t) {
				t.stopPropagation(), e.$broadcast("slideUp.hide")
			})
		}
	}
}), angular.module("app.common.slideup", ["app.common.slideup.directive"]), angular.module("app.common.third", ["app.common.third.service"]), angular.module("app.common.third.service", []).factory("baidu", ["$http", "$q", function(e, t) {
	var o = t.defer(),
		i = "3fe2d00af96b5f4ec1b25b327b0787a9";
	return {
		exchangeList: function() {
			var t = "http://apis.baidu.com/apistore/currencyservice/type";
			return e({
				url: t,
				method: "GET",
				headers: {
					apikey: i
				}
			}).success(function(e) {
				o.resolve(e)
			}), o.promise
		},
		exchange: function(t, n, a) {
			var r = "http://apis.baidu.com/apistore/currencyservice/currency?fromCurrency=" + t + "&toCurrency=" + n + "&amount=" + a;
			return e({
				url: r,
				method: "GET",
				headers: {
					apikey: i
				}
			}).success(function(e) {
				o.resolve(e)
			}), o.promise
		},
		weather: function(t) {
			var n = "http://apis.baidu.com/heweather/weather/free?city=" + t;
			return e.get({
				url: n,
				headers: {
					apikey: i
				}
			}).success(function(e) {
				o.resolve(e)
			}), o.promise
		}
	}
}]), angular.module("app.common.tips", ["app.common.tips.service"]), angular.module("app.common.tips.service", []).factory("logicTip", ["tip", "$timeout", "viewElement", "$ionicHistory", "$location", "$ionicScrollDelegate", "mapDrag", "CONFIG", "modal", "$ionicSlideBoxDelegate", "$rootScope", function(e, t, o, i, n, a, r, s, c, l, d) {
	function u(e, t, o, i, n, a) {
		if (!t) return null;
		var r = t.getBoundingClientRect(),
			s = {
				tipText: e,
				position: {
					x: (r.left + r.right) / 2,
					y: (r.top + r.bottom) / 2
				},
				innerRadius: 0,
				outerRadius: o
			};
		return i && (s.direction = i), n && (s.offset = n), a && (s.fn = a), s
	}

	function p(e, t, o, i, n) {
		var a = t.getBoundingClientRect(),
			r = {
				type: o || "horizon",
				text: e,
				width: a.width,
				height: a.height,
				position: {
					x: (a.left + a.right) / 2,
					y: (a.top + a.bottom) / 2
				}
			};
		return i && (r.direction = i), n && (r.fn = n), r
	}

	function m(e) {
		e.position.x < 55 ? e.direction = "right" : e.position.x > s.devWidth - 55 ? e.direction = "left" : (e.position.x < 100 ? e.offset = 100 - e.position.x : e.position.x > s.devWidth - 100 && (e.offset = s.devWidth - 100 - e.position.x), e.direction = e.position.y > s.devHeight / 2 ? "top" : "bottom")
	}

	function h(e, t) {
		null != t && e.push(t)
	}
	var g = null,
		f = d.user.isIOS ? 500 : 900,
		y = d.user.isIOS ? 900 : 1200;
	return {
		journeyDetail: function() {
			e.shouldTip() && t(function() {
				var t = o.current(),
					i = [];
				g = p("划动查看亮点故事", t.querySelector(".slider img")), h(i, g), g = {
					tipText: "点击查看详情",
					position: g.position,
					innerRadius: 0,
					outerRadius: 60
				}, h(i, g), g = u("查看每日行程安排", t.querySelector(".circle"), 60, "top", null, function() {
					a.scrollBy(0, 100, !0)
				}), g.position.y -= 100, h(i, g);
				var n = 200,
					r = t.querySelector(".map").getBoundingClientRect();
				g = u("点击查看行程地图", t.querySelector(".map"), 60, "top", null, function() {
					a.scrollBy(0, n - 100, !0)
				}), n = g.position.y - (s.devHeight - r.height / 2 - 15), g.position.y -= n, h(i, g), h(i, u("喜欢就复制到<br>「我的行程」", t.querySelector(".button-diy"), 60, "top", -20)), e.list(i), e.setTiped()
			}, f)
		},
		storyModal: function(o) {
			if (e.shouldTip("modal.story")) var i = o.$on("modal.shown", function(o, n) {
				if ("modalStory" === c.getModalName(n)) {
					var a = n.modalEl;
					t(function() {
						var t = [];
						t.push(p("左右划动切换故事", a.querySelectorAll(".card")[l.currentIndex()], null, "top")), g = angular.copy(t[0]), g.type = "vertical", g.text = "上下划动关闭卡片", h(t, g), h(t, u("点击查看兴趣点", a.querySelector(".poi"), 50)), h(t, u("点击收藏兴趣点", a.querySelector(".mark"), 50, null, -50)), e.list(t), e.setTiped("modal.story"), i()
					}, f)
				}
			})
		},
		poiDetail: function() {
			e.shouldTip() && t(function() {
				var t = o.current(),
					i = [];
				h(i, u("查看兴趣点简介", o.currentNavBar().querySelector(".secondary-buttons"), 40, null, -70)), h(i, u("点击收藏兴趣点", t.querySelector(".mark"), 40, null, -70)), h(i, u("为兴趣点添加故事", t.querySelector(".bottom-plus-button>span"), 40, "top")), e.list(i), e.setTiped()
			}, f)
		},
		journeyDiy: function() {
			e.shouldTip() && t(function() {
				var t = o.current(),
					i = [];
				h(i, u("查看行程地图", o.currentNavBar().querySelector(".secondary-buttons"), 40, null, -50)), h(i, u("修改行程名", t.querySelector(".rename"), 40, null, -30));
				var n = 0;
				g = u("增减行程天数", t.querySelector("node-content .flex .main:first-child"), 50, "top", null, function() {
					a.scrollBy(0, n, !0)
				}), g.position.y > s.devHeight - 75 && (n = g.position.y - (s.devHeight - 75), g.position.y = s.devHeight - 75), h(i, g), g = u("增减行程中的兴趣点", t.querySelector("node-content .flex .main:last-child"), 50, "top", -30), n > 0 && (g.position.y = s.devHeight - 75), h(i, g), h(i, u("完成修改后保存", t.querySelector("ion-footer-bar>a:first-child"), 50, "top")), e.list(i), e.setTiped()
			}, f)
		},
		journeyDiyMerge: function() {
			e.shouldTip("journey.diy.merge") && t(function() {
				var t = o.current(),
					i = [];
				h(i, u("将该行程<br>并入其他行程", t.querySelector("ion-footer-bar>a:last-child"), 50, "top", -35)), e.list(i), e.setTiped("journey.diy.merge")
			}, f)
		},
		mapJourney: function() {
			e.shouldTip() && t(function() {
				var t = o.current(),
					i = [];
				h(i, u("点击切换<br>行程日期", t.querySelector("[id='0']"), 30, "right")), h(i, u("显示当前位置", t.querySelector(".position"), 30, "right")), e.list(i), e.setTiped()
			}, y)
		},
		mapDrag: function(i) {
			e.shouldTip("map.drag") && t(function() {
				var t = (o.current(), []);
				g = {
					tipText: "长按拖动到左侧<br>改变游玩日期",
					position: r.getMarkerPositionOffset(i.__markers.journey[0]),
					innerRadius: 0,
					outerRadius: 30
				}, g.position.y -= 20, m(g), h(t, g), e.list(t), e.setTiped("map.drag")
			}, y)
		},
		mapWidget: function() {
			e.shouldTip("map.widget") && t(function() {
				var t = o.current(),
					i = [];
				h(i, u("点击加载<br>兴趣点", t.querySelector(".map-widget>li:nth-child(3)"), 30, "left", null, function() {
					angular.element(t.querySelector(".map-widget .more")).triggerHandler("click")
				})), e.list(i), e.setTiped("map.widget")
			}, y)
		},
		mapWidgetCat: function(o) {
			e.shouldTip("map.widget.cat") && t(function() {
				g = {
					tipText: "长按拖动到左侧<br>加入行程",
					position: r.getMarkerPositionOffset(o.__markers.other[0]),
					innerRadius: 0,
					outerRadius: 30
				}, g.position.y -= 20, m(g), e.list([g]), e.setTiped("map.widget.cat")
			}, f)
		},
		toolboxSale: function() {
			e.shouldTip() && t(function() {
				e.list([u("点击选择国家", o.currentNavBar().querySelector(".title"), 50, "bottom")]), e.setTiped()
			}, f)
		},
		mallCity: function() {
			e.shouldTip("mall.city") && t(function() {
				var t = o.current(),
					i = [];
				h(i, u("点击选择城市", t.querySelector(".city.active"), 40, "top", 50)), h(i, u("选择更多城市", t.querySelector(".city-more"), 40, "top", -50)), e.list(i), e.setTiped("mall.city")
			}, f)
		},
		chatHome: function() {
			e.shouldTip() && t(function() {
				var t = o.current(),
					i = [];
				h(i, u("可以直接跟我语音哦", t.querySelector(".bar-chat>:first-child"), 30, "top", 82)), e.list(i), e.setTiped()
			}, y)
		},
		storyList: function() {
			e.shouldTip() && t(function() {
				var t = [];
				h(t, u("点击选择故事标签", o.currentNavBar().querySelector(".nav-bar-title"), 60)), e.list(t), e.setTiped()
			}, f)
		}
	}
}]), angular.module("app.common.tool.directive", []).directive("compile", ["$compile", function(e) {
	return function(t, o, i) {
		t.$watch(function(e) {
			return e.$eval(i.compile)
		}, function(i) {
			o.html(i), e(o.contents())(t)
		})
	}
}]).directive("onFinishRender", ["$timeout", function(e) {
	return {
		restrict: "A",
		link: function(t, o) {
			e(function() {
				t.$emit("ngFinishRender", o)
			}, 0)
		}
	}
}]).directive("onRepeatComplete", ["$timeout", function(e) {
	return {
		restrict: "A",
		link: function(t, o) {
			e(function() {
				t.$last && t.$emit("ngRepeatComplete", o)
			}, 100)
		}
	}
}]).directive("scrollAnchor", ["CONFIG", function(e) {
	return {
		restrict: "A",
		link: function(t, o, i) {
			var n = 0,
				a = !1,
				r = !1;
			o.bind("scroll", function(s) {
				var c = 0;
				s.detail ? c = s.detail.scrollTop : s.target && (c = s.target.scrollTop);
				var l = c - n;
				n = c;
				var d = i.scrollAnchor,
					u = o[0].querySelector(d),
					p = u.getBoundingClientRect().top + u.offsetHeight - e.devHeight + 150;
				l > 0 && c > p ? a || (t.$emit("scrollAnchorUp"), a = !0, r = !1) : 0 > l && p > c && (r || (t.$emit("scrollAnchorDown"), r = !0, a = !1))
			})
		}
	}
}]).directive("headerShrink", ["$document", "CONFIG", function(e, t) {
	var o = 0,
		i = function(e, t, i) {
			o = Math.min(i, o + t), 0 > o && (o = 0);
			var n = 1 - o / 44 * 1.2;
			0 > n && (n = 0), ionic.requestAnimationFrame(function() {
				e[0].style[ionic.CSS.TRANSFORM] = "translate3d(0, -" + o + "px, 0)", e[0].style.opacity = n, e[1].style[ionic.CSS.TRANSFORM] = "translate3d(0, -" + o + "px, 0)", e[1].style.opacity = n
			})
		};
	return {
		restrict: "A",
		link: function(n, a, r) {
			var s = e[0].body.querySelectorAll(".bar-header"),
				c = 44,
				l = 0,
				d = !1,
				u = !1;
			n.$parent.$on("$ionicView.afterEnter", function() {
				e[0].body.querySelector(".tabs-index").style.display = "none"
			}), n.$parent.$on("$ionicView.beforeLeave", function() {
				var t = document.body.querySelectorAll(".bar-header");
				t[0].style[ionic.CSS.TRANSFORM] = "translate3d(0, 0, 0)", t[0].style.opacity = "1", t[1].style[ionic.CSS.TRANSFORM] = "translate3d(0, 0, 0)", t[1].style.opacity = "1", e[0].body.querySelector(".tabs-index").style.display = "-webkit-flex"
			}), a.bind("scroll", function(e) {
				if (!(e.detail.target.scrollHeight < t.devHeight + 50)) {
					var p = null;
					e.detail ? p = e.detail.scrollTop : e.target && (p = e.target.scrollTop);
					var m = p - l;
					l = p;
					var h = r.headerShrink,
						g = a[0].querySelector(h),
						f = g.getBoundingClientRect().top + g.offsetHeight - t.devHeight + 150;
					m > 0 && p > f ? d || (n.$emit("scrollAnchorUp"), d = !0, u = !1) : 0 > m && f > p && (u || (n.$emit("scrollAnchorDown"), u = !0, d = !1)), 0 > p || 0 == m || m > 0 && o == c || 0 > m && 0 == o || i(s, m, c)
				}
			})
		}
	}
}]).directive("iframeOnLoad", function() {
	return {
		restrict: "A",
		scope: {
			callBack: "&iframeOnLoad"
		},
		link: function(e, t) {
			t.on("load", function() {
				var o = t[0].contentDocument || t[0].contentWindow.document;
				return o = o.getElementsByTagName("body")[0].innerHTML, e.callBack({
					content: o
				})
			})
		}
	}
}).directive("linked", ["$document", "currentScope", function(e, t) {
	return function(e, o, i) {
		var n = i.linked;
		o.on("click", function() {
			t.activeModal() ? t.activeModal().querySelector("#" + n).click() : t.activeView() && t.activeView().querySelector("#" + n).click()
		})
	}
}]).directive("focusMe", ["$timeout", function(e) {
	function t(t, o) {
		e.cancel(n), n = e(function() {
			t.focus()
		}, o || 500)
	}

	function o(e, o) {
		o.name === this.name && t(this.element[0], 760)
	}

	function i() {
		delete this.element
	}
	var n = null;
	return {
		require: "?^modalLayer",
		link: function(e, n, a, r) {
			if (r) {
				var s = {
					name: r.name,
					element: n
				};
				e.$on("modalLayer.show", o.bind(s)), e.$on("$destroy", i.bind(s))
			} else t(n[0])
		}
	}
}]).directive("myTouchStart", [function() {
	return function(e, t, o) {
		t.on("touchstart", function() {
			e.$apply(function() {
				e.$eval(o.myTouchStart)
			})
		})
	}
}]).directive("myTouchEnd", [function() {
	return function(e, t, o) {
		t.on("touchend", function() {
			e.$apply(function() {
				e.$eval(o.myTouchEnd)
			})
		})
	}
}]).directive("backToRoot", ["setBackViewHome", function(e) {
	return function() {
		e()
	}
}]).directive("storyExpand", ["$document", "$ionicSlideBoxDelegate", "CONFIG", "modal", "currentScope", function(e, t, o, i, n) {
	function a(e, t) {
		this.scope = t, this.selected = 0
	}
	var r = e[0].head || e[0].getElementsByTagName("head")[0],
		s = !1;
	if (r.querySelectorAll("style").length > 1 && angular.forEach(r.querySelectorAll("style"), function(e) {
			e.innerHTML.indexOf("[story-expand]") > -1 && (s = !0)
		}), !s) {
		var c = parseInt(o.hImgPd) - 20 + "px",
			l = "72px",
			d = document.createElement("style");
		r.appendChild(d), d.innerHTML = "[story-expand] [ng-repeat] {height:" + l + "} [story-expand] .expanded {height:" + c + "}"
	}
	return a.prototype.expand = function(e) {
		this.selected == e && (i.getModal("modalStory").show(), t.$getByHandle("story-card-slider").slide(e, 0)), this.selected = e
	}, {
		restrict: "EAC",
		replace: !1,
		scope: !0,
		compile: function(e) {
			for (var t = 0, o = e.length; o > t; ++t) {
				var i = e[t].querySelector("[ng-repeat]");
				if (i) {
					var r = i.getAttribute("ng-click");
					i.setAttribute("ng-class", "{expanded:$index===__expand.selected}"), i.setAttribute("ng-click", "__expand.expand($index, $event);" + r)
				}
			}
			return {
				pre: function(e) {
					e.__expand = new a(0, e), n.ready(e, function() {
						n.get().$on("storySlideChange", function(t, o) {
							e.__expand.selected = o, t.stopPropagation()
						})
					})
				}
			}
		}
	}
}]).directive("elastic", ["$window", "$document", "$timeout", function(e, t, o) {
	var i = angular.element("<div></div>").css({
		position: "absolute",
		top: "-10000px",
		left: "-10000px",
		whiteSpace: "pre-wrap"
	});
	return angular.element(t[0].body).append(i), {
		require: "ngModel",
		link: function(t, n) {
			o(function() {
				var t, o, a = n[0].offsetHeight,
					r = e.getComputedStyle(n[0]),
					s = ["width", "boxSizing", "paddingTop", "paddingRight", "paddingBottom", "paddingLeft", "borderTopWidth", "borderRightWidth", "borderBottomWidth", "borderLeftWidth", "lineHeight"],
					c = {},
					l = "";
				angular.forEach(s, function(e) {
					c[e] = r[e]
				}), i.css(c), n.on("keyup", function() {
					t = n.val().replace(/\n$/g, "\n.") + l, i.text(t), o = Math.max(i[0].offsetHeight, a), n.css("height", o + "px")
				})
			})
		}
	}
}]).directive("keyboardAttachUpdate", function() {
	return function(e, t) {
		function o(e) {
			if (!ionic.Platform.isAndroid() || ionic.Platform.isFullScreen) {
				var o = e.keyboardHeight;
				console.log(o + "------------------"), ionic.Platform.isIOS() && (226 == o && (o = 262), 216 == o && (o = 252)), t.css("bottom", o + "px"), n = t.controller("$ionicScroll"), n && (n.scrollView.__container.style.bottom = o + "px")
			}
		}

		function i() {
			(!ionic.Platform.isAndroid() || ionic.Platform.isFullScreen) && (t.css("bottom", ""), n && (n.scrollView.__container.style.bottom = ""))
		}
		ionic.on("native.keyboardshow", o, window), ionic.on("native.keyboardhide", i, window), ionic.on("native.showkeyboard", o, window), ionic.on("native.hidekeyboard", i, window);
		var n;
		e.$on("$destroy", function() {
			ionic.off("native.keyboardshow", o, window), ionic.off("native.keyboardhide", i, window), ionic.off("native.showkeyboard", o, window), ionic.off("native.hidekeyboard", i, window)
		})
	}
}).directive("imeNext", function() {
	function e(e) {
		if (13 === e.keyCode) {
			var t = e.target.getAttribute("ime-next");
			if ("$submit" === t) {
				var o = e.target.form.querySelector("[type='submit']");
				o && o.click()
			} else {
				var i = document.querySelectorAll("[ime-focus-id='" + t + "']");
				if (1 !== i.length) throw new TypeError("ime-next属性值没的对应或对应多个ime-focus-id:" + t);
				i[0].focus()
			}
			e.preventDefault()
		}
	}
	return {
		restrict: "A",
		link: function(t, o, i) {
			i.imeNext && o.on("keypress", e)
		}
	}
}).directive("ignoreBouncing", function() {
	return {
		restrict: "A",
		require: "^ionSlideBox",
		link: function(e, t, o, i) {
			i.__slider.ignoreBuffer()
		}
	}
}).directive("preventEvent", ["$ionicGesture", "$timeout", function(e, t) {
	function o(e) {
		for (var t = 0, o = e.length; o > t; ++t)
			if (e[t]) return !0;
		return !1
	}

	function i(e) {
		return !e || e.__slider.selected() === e.slidesCount() - 1
	}

	function n(e) {
		return !e || 0 === e.__slider.selected()
	}

	function a(e) {
		return !e || !e.optionsContainer || !e.optionsContainer.length || Math.abs(parseFloat(e.$element[0].querySelector(".item-content").style.webkitTransform.slice(12) || 0)) >= Math.floor(e.optionsContainer[0].getBoundingClientRect().width)
	}

	function r(e) {
		return !e || !e.optionsContainer || !e.optionsContainer.length || 0 == Math.abs(parseFloat(e.$element[0].querySelector(".item-content").style.webkitTransform.slice(12) || 0))
	}
	return {
		restrict: "A",
		require: ["^?ionSlideBox", "^?ionItem", "^?ionList"],
		link: function(s, c, l, d) {
			function u(e) {
				f || e.stopPropagation(), y && (f = i(d[0]) && a(d[1]), y = !1)
			}

			function p(e) {
				f || e.stopPropagation(), y && (f = n(d[0]) && r(d[1]), y = !1)
			}

			function m(e) {
				e.stopPropagation()
			}

			function h(e) {
				var t = e.gesture.direction;
				"right" !== t && "left" !== t || f || e.stopPropagation()
			}

			function g() {
				y = !0
			}
			if (o(d)) {
				var f = !1,
					y = !0;
				t(function() {
					!d[0] && d[2] && (c = angular.element(d[2].listView.el)), e.on("drag", h, c), e.on("dragleft", u, c), e.on("dragright", p, c), e.on("swipeleft", m, c), e.on("swiperight", m, c), e.on("release", g, c)
				})
			}
		}
	}
}]).directive("exitApp", ["$rootScope", "$ionicPlatform", "$timeout", "$ionicHistory", function(e, t, o, i) {
	return {
		restrict: "A",
		link: function(n, a, r) {
			function s() {
				d = !1
			}
			if (!e.user.isIOS) {
				var c = r.exitApp || "再按一次退出app",
					l = parseFloat(r.exitSpanTime) || 1500,
					d = !1,
					u = null;
				n.$on("$destroy", function() {
					u()
				}), n.$on("$ionicView.leave", function() {
					u()
				}), n.$on("$ionicView.enter", function(e, n) {
					u = t.registerBackButtonAction(function(e) {
						i.currentView().stateName === n.stateName && (e.preventDefault(), d ? (console.log("exit"), ionic.Platform.exitApp()) : JAlert.showOnce(c), d = !0, o(s, l))
					}, 101)
				})
			}
		}
	}
}]).directive("contenteditable", function() {
	return {
		restrict: "A",
		require: "?ngModel",
		link: function(e, t, o, i) {
			function n() {
				a && (t[0].innerHTML = t[0].innerText, a = !1)
			}
			i && (i.$render = function() {
				t[0].innerText = i.$viewValue
			}), t.on("click", n), t.on("blur", n);
			var a = !1;
			t[0].addEventListener("input", function() {
				a = !0, i && i.$setViewValue(t[0].innerText)
			})
		}
	}
}).directive("headerBarClass", ["viewElement", "$cordovaStatusbar", function(e, t) {
	var o = e.currentNavBar().parentElement.classList;
	return {
		restrict: "A",
		link: function(e, i, n) {
			e.$on("$ionicView.beforeEnter", function() {
				o.add(n.headerBarClass), window.cordova && t.style(1)
			}), e.$on("$ionicView.beforeLeave", function() {
				o.remove(n.headerBarClass), window.cordova && t.style(0)
			})
		}
	}
}]), angular.module("app.common.tool", ["app.common.tool.directive", "app.common.tool.service"]), angular.module("app.common.tool.service", []).factory("cacheLocal", ["CacheFactory", function(e) {
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
}]), 

angular.module("app.common.validate.directive", []).directive("isMobile", function() {
	return {
		restrict: "A",
		require: "ngModel",
		link: function(e, t, o, i) {
			i.$validators.isMobile = function(e) {
				if (void 0 != e) {
					var t = e.toString(),
						o = t.length;
					return 11 == o && /^(((13[0-9]{1})|(14[0-9]{1})|(15[0-9]{1})|(17[0-9]{1})|(18[0-9]{1}))+\d{8})$/.test(t)
				}
				return !0
			}
		}
	}
}).directive("isIdCard", function() {
	return {
		restrict: "A",
		require: "ngModel",
		link: function(e, t, o, i) {
			i.$validators.isIdCard = function(e) {
				if (void 0 != e) {
					var t, o = e.toString(),
						i = o.length;
					if (15 == i) t = new RegExp(/^(\d{6})()?(\d{2})(\d{2})(\d{2})(\d{2})(\w)$/);
					else {
						if (18 != i) return !1;
						t = new RegExp(/^(\d{6})()?(\d{4})(\d{2})(\d{2})(\d{3})(\w)$/)
					}
					var n = o.match(t);
					if (null != n) {
						if (15 == i) var a = new Date("19" + n[3] + "/" + n[4] + "/" + n[5]),
							r = a.getYear() == n[3] && a.getMonth() + 1 == n[4] && a.getDate() == n[5];
						else var a = new Date(n[3] + "/" + n[4] + "/" + n[5]),
							r = a.getFullYear() == n[3] && a.getMonth() + 1 == n[4] && a.getDate() == n[5];
						if (!r) return !1
					}
					return t.test(o) ? !0 : !1
				}
				return !0
			}
		}
	}
}).directive("equalTo", function() {
	return {
		require: "ngModel",
		scope: {
			otherModelValue: "=equalTo"
		},
		link: function(e, t, o, i) {
			i.$validators.equalTo = function(t) {
				return t == e.otherModelValue
			}, e.$watch("otherModelValue", function() {
				i.$validate()
			})
		}
	}
}).directive("uniqueEmail", ["$q", "$timeout", "resUser", function(e, t, o) {
	return {
		restrict: "A",
		require: "ngModel",
		link: function(i, n, a, r) {
			r.$asyncValidators.uniqueEmail = function(i, n) {
				var a = e.defer(),
					r = i || n;
				return t(function() {
					o.checkEmail({
						email: r
					}).$promise.then(function(e) {
						0 === e.data.code ? a.resolve() : a.reject()
					})
				}, 1e3), a.promise
			}
		}
	}
}]).directive("uniqueNick", ["$q", "$timeout", "UniqueNickRes", function(e, t, o) {
	return {
		restrict: "A",
		require: "ngModel",
		link: function(i, n, a, r) {
			r.$asyncValidators.uniqueNick = function(i, n) {
				var a = e.defer(),
					r = i || n;
				return t(function() {
					o.check({
						nick_name: r
					}).$promise.then(function(e) {
						0 == e.data.code ? a.resolve() : a.reject()
					})
				}, 1e3), a.promise
			}
		}
	}
}]), 

angular.module("app.common.validate", ["app.common.validate.directive"]), angular.module("app.common.viewdragback.directive", []).directive("dragBack", ["viewElement", "$timeout", "$ionicGesture", "$ionicScrollDelegate", "CONFIG", "$ionicHistory", "$rootScope", "$cordovaKeyboard", function(e, t, o, i, n, a, r, s) {
	function c() {
		!c.ign && window.cordova && s.isVisible() && s.close()
	}

	function l() {
		c.ign = !0
	}

	function d() {
		c.ign = !1
	}

	function u(e) {
		var t = e.querySelector("ion-content");
		t && (t = angular.element(t));
		var i = angular.element(e.querySelectorAll("input,textarea,[contenteditable=true]"));
		t && o.on("scroll", c, t), i && i.on("focus", l), t && o.on("drag", d, t)
	}
	var p = {
		init: function() {
			this.dragTriggerTime = 0, this.canDrag = !1, this.currentNavBar_title = e.currentNavBar().querySelector(".title");
			var o = this;
			t(function() {
				o.currentNavBar_rBtn = e.currentNavBar().querySelector(".buttons-right") || {
					style: {}
				}, o = null
			}, 400)
		},
		destroy: function() {
			delete this.backView, delete this.currentNavBar_title, delete this.currentNavBar_rBtn
		},
		handleEvent: function(e) {
			switch (e.type) {
				case "drag":
					this.drag(e);
					break;
				case "release":
					this.release(e);
					break;
				case "wekbitTransitionEnd":
				case "transitionend":
					this.transitionend(e)
			}
		},
		transitionend: function(e) {
			e.currentTarget === e.target && -1 !== e.propertyName.indexOf("ransform") && (this.backView ? (e.currentTarget.style.webkitTransition = "", this.backView.style.display = "", this.backView.style.webkitTransition = "", this.backView.style.webkitTransform = this.backView.__p, delete this.backView.__p, delete this.backView) : this.currentNavBar_rBtn.style.opacity = "", this.currentNavBar_title.style.opacity = "")
		},
		drag: function(t) {
			if (!this.canDrag && this.dragTriggerTime < 1 && (this.preX = t.gesture.deltaX, ++this.dragTriggerTime, !this.dragPremission && t.gesture.touches[0].clientX < 50 && (this.dragPremission = !0), this.preX > 1 && "right" === t.gesture.direction && this.dragPremission)) {
				this.canDrag = !0, i.freezeAllScrolls(!0);
				var o = this.backView = e.back();
				o && (o.style.display = "block", o.__p = o.style.webkitTransform, o.style.webkitTransform = "translate3d(0,0,0)"), this.currentNavBar_title.style.webkitTransition = "none", this.currentNavBar_rBtn.style.webkitTransition = "none"
			}
			if (this.canDrag) {
				var a = t.gesture.deltaX;
				this.preDirection = a - this.preX > 0 ? "right" : "left", this.preX = a, 0 > a && (a = 0), t.currentTarget.style.webkitTransform = "translate3d(" + a + "px,0,0)", this._t = ionic.requestAnimationFrame(function() {
					this.currentNavBar_title.style.webkitTransform = "translate3d(" + a / 2 + "px,0,0)", this.currentNavBar_title.style.opacity = 1 - a / 2 / n.devWidth, this.currentNavBar_rBtn.style.opacity = 1 - a / n.devWidth
				}.bind(this))
			}
		},
		release: function(e) {
			if (this.canDrag) {
				if (i.freezeAllScrolls(!1), ionic.cancelAnimationFrame(this._t), this.canDrag = !1, e.gesture.deltaX > 100 && "right" === this.preDirection && angular.element(e.currentTarget).scope().$broadcast("view.dragBack.start").defaultPrevented === !1) {
					if (this.currentNavBar_title.style.webkitTransition = "", this.currentNavBar_rBtn.style.webkitTransition = "", this.backView) {
						delete this.backView.__p;
						var t = this;
						ionic.requestAnimationFrame(function() {
							t.backView.style.display = "", delete t.backView, t = null
						})
					}
					a.goBack()
				} else e.currentTarget.style.webkitTransition = this.currentNavBar_title.style.webkitTransition = this.currentNavBar_rBtn.style.webkitTransition = "all " + 10 * Math.sqrt(e.gesture.deltaX) + "ms ease-out", e.currentTarget.style.webkitTransform = this.currentNavBar_title.style.webkitTransform = "translate3d(0,0,0)";
				delete this.preDirection, delete this.preX
			}
			this.dragTriggerTime = 0, this.dragPremission = !1
		}
	};
	return {
		restrict: "A",
		replace: !1,
		compile: function(e) {
			return t(function() {
				u(e[0])
			}, 100), r.user.isAndroid ? void 0 : {
				pre: function(e, t) {
					var i = Object.create(p);
					i.init();
					var n, a;
					e.$on("$ionicView.afterEnter", function() {
						n = o.on("drag", i, t), a = o.on("release", i, t), t[0].addEventListener("wekbitTransitionEnd", i), t[0].addEventListener("transitionend", i)
					}), e.$on("$ionicView.beforeLeave", function() {
						o.off(n, "drag"), o.off(a, "release"), t[0].removeEventListener("wekbitTransitionEnd", i), t[0].removeEventListener("transitionend", i)
					}), e.$on("$destroy", function() {
						i.destroy()
					})
				}
			}
		}
	}
}]), 

angular.module("app.common.viewdragback", ["app.common.viewdragback.directive"]), 

angular.module("app.poi.modal", ["app.poi.modal.service"]), 

angular.module("app.poi.modal.service", []).factory("cardModal", ["$rootScope", "$timeout", "$ionicModal", "$ionicGesture", "$ionicScrollDelegate", "CONFIG", "cacheLocal", "statusBar", function(e, t, o, i, n, a, r, s) {
	e.cardModal = {
		audioCard: {},
		isPaused: !0,
		barShow: !1,
		devHeight: a.devHeight,
		imgSizeCard: a.imgSizeCard
	};
	var c = !1,
		l = !1,
		d = null,
		u = null,
		p = function(t) {
			e.cardModal.barShow = t, e.cardModal.modal.isShown() || (e.cardModal.modal.show(), ionic.Platform.ready(function() {
				s.hide()
			}))
		},
		m = function() {
			e.cardModal.modal.isShown() && (e.cardModal.modal.hide(), s.show())
		};
	if (r.system.get("visited")) {
		var h = r.system.info("visited").created;
		h = new Date(h);
		var g = new Date;
		l = h.getFullYear() == g.getFullYear() && h.getMonth() == g.getMonth() && h.getDate() == g.getDate()
	}
	return r.system.put("visited", !0), e.$on("$mediaReady", function() {
		e.cardModal.audioCard.options.setAutoplay(!1), e.cardModal.audioCard.options.setControls(!1), e.cardModal.audioCard.sources.add(e.cardModal.card.audio.src)
	}), {
		load: function() {
			o.fromTemplateUrl("app/poi/modal/templates/postcardModal.html", {
				scope: e,
				animation: "min"
			}).then(function(t) {
				e.cardModal.modal = t, l || p(!1), e.cardModal.onClickList = function(t) {
					c || (e.cardModal.barShow = !e.cardModal.barShow, t.stopPropagation())
				}, e.cardModal.onDragUp = function() {
					c = !0, d = e.cardModal.modal.el.querySelector(".list"), u = e.cardModal.modal.el.querySelector(".mask"), move(d).duration("1s").scale(.9, .9).end(), move(u).duration("1s").set("background", "rgba(10,10,10, 0.3)").end()
				}, e.cardModal.onRelease = function() {
					c && (n.$getByHandle("postcard").scrollTop(!0), move(d).duration("1s").scale(1, 1).end(), move(u).duration("1s").set("background", "none").end(function() {
						c = !1, d = null, u = null
					}))
				}, e.cardModal.onClickMark = function(t) {
					e.cardModal.card.is_marked = !e.cardModal.card.is_marked, t.stopPropagation()
				}, e.cardModal.onClickPlay = function(t) {
					e.cardModal.audioCard.options.isPaused() ? e.cardModal.audioCard.controls.play() : e.cardModal.audioCard.controls.pause(), e.cardModal.isPaused = !e.cardModal.isPaused, t.stopPropagation()
				}, e.cardModal.onClickShrink = function(e) {
					m(), e.stopPropagation()
				}
			})
		},
		show: function() {
			p(!0)
		},
		hide: function() {
			m()
		}
	}
}]).factory("storyModal", ["modal", "$document", "$timeout", "$state", "resUser", "logicTip", function(e, t, o, n, a, r) {
	return {
		load: function(t, s) {
			var c = t,
				l = !1;
			return c.$on("$ionicView.beforeLeave", function() {
				var t = e.getModal(s, c);
				t && (l = t.isShown(), t.hide())
			}), c.$on("$ionicView.beforeEnter", function() {
				if (l) {
					var t = e.getModal(s, c);
					t && o(function() {
						t.show()
					}, 300)
				}
			}), c.onClickStoryTitle = function(e, t) {
				n.go("app.poiDetail", {
					id: e,
					title: t
				})
			}, c.onStoryDrag = function() {
				t.story.titleShown = !1
			}, c.onStoryRelease = function() {
				o(function() {
					t.story.titleShown = !0
				}, 500)
			}, c.onClickMarkPoi = function(e, o) {
				e.stopPropagation();
				var i = 0;
				i = c.poi ? c.poi.is_marked ? 0 : 1 : t.story.poiMarked ? 0 : 1, a.markPoi({
					poi_id: o,
					action: i
				}, function(e) {
					0 == e.data.code && (t.story.poiMarked = !t.story.poiMarked, c.list.updatePoiMarked(o, t.story.poiMarked), c.poi && (c.poi.is_marked = !c.poi.is_marked, c.modified = !0))
				})
			}, c.onClickLike = function(e) {
				var o = t.stories[e],
					i = o.liked ? 0 : 1;
				a.likeStory({
					story_id: o.id,
					action: i
				}, function(e) {
					0 == e.data.code && (o.liked ? o.like -= 1 : o.like += 1, o.liked = !o.liked)
				})
			}, c.onClickStoryAuthor = function(e, t, o) {
				e.stopPropagation(), n.go("app.userHome", {
					id: t,
					name: o
				})
			}, c.onClickStoryComment = function(e, t) {
				n.go("app.commentList", {
					type: "story",
					id: e,
					title: t
				})
			}, t.$on("modal.hidden", function(e, o) {
				o.__name == s && (t.story.audioPaused || (t.story.audioPaused = !0, t.story.audio.controls.pause()))
			}), c.onStorySlideChanged = function(e) {
				t.$emit("storySlideChange", e), t.story.index = e, t.story.city = t.stories[e].city, t.story.poiId = t.stories[e].poi_id, t.story.poiName = t.stories[e].poi_name, t.story.poiMarked = t.stories[e].poi_marked, t.stories[e].audio_src && "" != t.stories[e].audio_src ? (t.story.audioShown = !0, t.story.audioName = t.stories[e].audio_name, t.story.audioDuration = t.stories[e].audio_duration, t.story.audio.sources.add(t.stories[e].audio_src)) : t.story.audioShown = !1, t.story.audioPaused || (t.story.audioPaused = !0, t.story.audio.controls.pause())
			}, c.onClickPlay = function() {
				t.story.audioPaused = !t.story.audioPaused, t.story.audio.options.isPaused() ? t.story.audio.controls.play() : t.story.audio.controls.pause()
			}, c.list = {
				updatePoiMarked: function(e, o) {
					for (i = 0; i < t.stories.length; i++) t.stories[i].poi_id == e && (t.stories[i].poi_marked = o)
				}
			}, r.storyModal(t), e.createModal(s, "app/poi/modal/templates/storyModal.html", "round-right-down", !1, c)
		}
	}
}]), 


angular.module("app.user.modal", ["app.user.modal.service"]),

angular.module("app.user.modal.service", []).factory("settingModal", ["$rootScope", "$ionicHistory", "$timeout", "$cordovaKeyboard", "$cordovaAppRate", "authFactory", "resUser", "resStory", "modal", "loginModal", "mHistory", "file", "random", "setBackViewHome", "statusBar", "genPy", "cacheLocal", function(e, t, o, i, n, a, r, s, c, l, d, u, p, m, h, g, f) {
	function y(e) {
		return h.hide(), e.show()
	}

	function _(e) {
		d.go(e)
	}

	function v() {
		d.goBack()
	}

	function w() {
		return !d.isEmpty()
	}

	function S() {
		return d.hasShow()
	}

	function b() {
		e.settingModal.closed = !0, c.getModal("settingModal").hide(), h.show(), window.cordova && i.isVisible() && i.close(), c.destroyModal("settingModal", e), o(function() {
			delete e.settingModal
		}, 500)
	}

	function k() {
		d.clear(), l.show().then(b)
	}

	function $() {
		a.signOut(function() {
			JAlert.notify("已退出登录"), t.clearCache()
		})
	}

	function x(t) {
		switch (e.settingModal.profile.cat = t, t) {
			case "name":
				e.settingModal.profile.placeholder = "用户名", e.settingModal.profile.data = e.user.info.user_name, d.go("modal.setting.profile");
				break;
			case "tag":
				r.getTags({}, function(t) {
					0 === t.data.code && (e.settingModal.profile.tags = t.data.list)
				}), e.settingModal.profile.placeholder = "标签", e.settingModal.profile.data = {
					__list: e.user.info.tag ? angular.copy(e.user.info.tag) : []
				};
				var o = e.user.info.tag;
				if (o && o.length > 0)
					for (var i = 0, n = o.length; n > i; ++i) e.settingModal.profile.data[o[i]] = !0;
				d.go("modal.setting.tags");
				break;
			case "gender":
				e.settingModal.profile.placeholder = "性别", e.settingModal.profile.data = e.user.info.gender, _("modal.setting.gender");
				break;
			case "brief":
				e.settingModal.profile.placeholder = "一句话简述", e.settingModal.profile.data = e.user.info.brief, d.go("modal.setting.profile");
				break;
			case "contact":
				d.go("modal.setting.contacts")
		}
	}

	function P(t) {
		var o = e.settingModal.profile.data;
		switch (t) {
			case "name":
				r.updateName({
					name: o
				}, function(t) {
					0 == t.data.code && (e.user.info.user_name = o)
				});
				break;
			case "tag":
				r.updateTags({
					tags: 0 === o.__list.length ? "null" : o.__list
				}, function(t) {
					0 == t.data.code && (e.user.info.tag = o.__list)
				});
				break;
			case "gender":
				r.updateGender({
					gender: o
				}, function(t) {
					0 == t.data.code && (e.user.info.gender = o)
				});
				break;
			case "brief":
				r.updateBrief({
					brief: o
				}, function(t) {
					0 == t.data.code && (e.user.info.brief = o)
				});
				break;
			case "contact":
		}
		d.goBack()
	}

	function C() {
		r.modifyPassword(e.settingModal.modifyData, function(e) {
			switch (e.data.code) {
				case 0:
					JAlert.notify("密码已修改");
					break;
				case 1:
					JAlert.showOnce("原密码输入错误");
					break;
				default:
					JAlert.showOnce("出现异常，请稍后再试！")
			}
		})
	}

	function T(t) {
		0 == t.data.code && (e.settingModal.contacts = t.data.list)
	}

	function A(t) {
		e.settingModal.__$index = t, e.settingModal.mContact = angular.copy(e.settingModal.contacts[t]), "id" in e.settingModal.mContact || (e.settingModal.mContact.id = e.settingModal.mContact._id), delete e.settingModal.mContact._id, e.settingModal.mContact.zipcode && (e.settingModal.mContact.zipcode = parseFloat(e.settingModal.mContact.zipcode)), e.settingModal.mContact.opt = "编辑", e.settingModal.mContact.type = "upd", d.go("modal.setting.mContact")
	}

	function M() {
		e.settingModal.mContact = {
			opt: "添加",
			type: "add"
		}, d.go("modal.setting.mContact")
	}

	function I(t) {
		e.settingModal.__$index = t, r.updateContact({
			id: e.settingModal.contacts[t]._id,
			type: "del"
		}, N)
	}

	function L() {
		e.$broadcast("image.clip")
	}

	function D(e) {
		JAlert.notify("上传成功"), r.updateAvatar({
			image: e.data.key
		}, j)
	}

	function O() {
		JAlert.notify("图片上传失败")
	}

	function j(t) {
		var o = t.data;
		0 === o.code ? (d.goBack(), e.user.info.avatar = o.image) : JAlert.showOnce(o.msg)
	}

	function E() {
		window.cordova && n.navigateToAppStore().then(function() {
			JAlert.showOnce("欧优游·有你更精彩！")
		})
	}

	function R() {
		e.settingModal.mContact.name && (e.settingModal.mContact.pyname = g(e.settingModal.mContact.name))
	}

	function B() {
		var t = e.settingModal.mContact,
			o = t.opt;
		delete t.opt, r.updateContact(t, F), t.opt = o
	}

	function F(t) {
		if (0 === t.data.code) {
			d.goBack(), JAlert.notify("保存成功!");
			var o = e.settingModal.__$index;
			null != o ? e.settingModal.contacts[o] = e.settingModal.mContact : (++e.user.info.contact, e.settingModal.mContact.id = t.data.id, e.settingModal.contacts.push(e.settingModal.mContact))
		} else JAlert.notify(t.data.msg)
	}

	function N(t) {
		0 === t.data.code ? (JAlert.notify("删除成功！"), e.settingModal.contacts.splice(e.settingModal.__$index, 1), --e.user.info.contact) : JAlert.nofity(t.data.msg)
	}

	function H(t) {
		var o = e.settingModal.profile.data,
			i = o.__list;
		if (o[t]) i.length >= 3 ? (o[t] = !1, JAlert.notify("已经选择3个标签")) : i.push(t);
		else {
			var n = i.indexOf(t); - 1 !== n && i.splice(n, 1)
		}
	}

	function J() {
		f.product.removeAll(), JAlert.notify("已清除！")
	}

	function q() {
		r.sendFeedback(e.settingModal.feedback, function(e) {
			0 == e.data.code && (JAlert.showOnce("欧优游·有你更精彩！"), o(function() {
				c.getModal("settingModal").hide()
			}, 1500))
		})
	}
	e.$on("modalLayer.show", function(t, o) {
		switch (o.name) {
			case "modal.setting.contacts":
				e.settingModal.contacts.length != e.user.info.contact && 0 != e.user.info.contact && r.getContacts({}, T)
		}
	}), e.$on("image.clip.complete", function() {
		e.settingModal.avatar ? u.upload({
			name: ["avatar/", (new Date).valueOf(), p.getRandomNum(0, 1e4, !0), ".jpg"].join(""),
			file: e.settingModal.avatar.file
		}, D, O) : JAlert.notify("请选择图片！")
	});
	var U = {
		M: "男",
		F: "女",
		list: [{
			key: "M",
			value: "男"
		}, {
			key: "F",
			value: "女"
		}]
	};
	return {
		_show: function() {
			var t = null;
			return c.contains("settingModal", e) ? (c.reInitModal("settingModal", e), t = c.getModalPromise("settingModal", e).then(y)) : t = c.createModalImmediately("settingModal", "app/user/modal/templates/settingModal.html", "up", !1, e, !1).then(y), e.settingModal = {
				go: _,
				back: v,
				hasBack: w,
				hasShow: S,
				close: b,
				login: k,
				signOut: $,
				profile: {},
				modifyPassword: C,
				contacts: [],
				modifyContact: A,
				addContact: M,
				clearCache: J,
				deleteContact: I,
				genderType: U,
				genPinyin: R,
				saveContact: B,
				avatar: null,
				uploadAvatar: L,
				onClickProfile: x,
				updateProfile: P,
				onClickRate: E,
				tagChange: H,
				sendFeedback: q
			}, t
		},
		showSubscribe: function(t) {
			var o = this._show().then(function() {
				e.settingModal.tranEnd = !0
			});
			return e.settingModal.defaultLayer = "modal.subscribe" + (t ? "." + t : ""), o
		},
		showSetting: function(t) {
			var o = this._show().then(function() {
				e.settingModal.tranEnd = !0
			});
			return e.settingModal.defaultLayer = "modal.setting" + (t ? "." + t : ""), o
		}
	}
}]);