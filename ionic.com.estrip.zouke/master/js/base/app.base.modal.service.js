angular.module("app.base.modal.service", []).factory("guideModal", ["$rootScope", "$document", "$ionicSlideBoxDelegate", "modal", "CONFIG", "permission", "$timeout", "statusBar", function(e, t, o, i, n, a, r, s) {
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
}])
