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
}])