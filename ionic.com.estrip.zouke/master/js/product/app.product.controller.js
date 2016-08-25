angular.module("app.product.controller", []).controller("productCtrl", ["$scope", "$rootScope", "$document", "$timeout", "$ionicScrollDelegate", "$state", "$stateParams", "$ionicSlideBoxDelegate", "CONFIG", "viewArgument", "dateFilter", "resProduct", function(e, t, o, i, n, a, r, s, c, l, d, u) {
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
}])
