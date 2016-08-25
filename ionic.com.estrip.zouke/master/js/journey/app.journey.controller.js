angular.module("app.journey.controller", []).controller("journeyHomeCtrl", ["$scope", "$rootScope", "$state", "$ionicHistory", "$timeout", "CONFIG", "viewElement", "viewArgument", "resJourney", "resUser", "resBanner", "RootScopeProxy", "activityManager", "$ionicSlideBoxDelegate", function(e, t, o, i, n, a, r, s, c, l, d, u, p, m) {
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
}])
