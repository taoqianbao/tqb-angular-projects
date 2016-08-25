angular.module("app.user.controller", []).controller("userHomeCtrl", ["$scope", "$state", "$timeout", "$stateParams", "$ionicSlideBoxDelegate", "viewArgument", "resUser", "resJourney", "resPoi", "resStory", "modal", "storyModal", "CONFIG", "loginModal", "$rootScope", function(e, t, o, i, n, a, r, s, c, l, d, u, p, m, h) {
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
}])
