
angular.module("app.common.tips.service", []).factory("logicTip", ["tip", "$timeout", "viewElement", "$ionicHistory", "$location", "$ionicScrollDelegate", "mapDrag", "CONFIG", "modal", "$ionicSlideBoxDelegate", "$rootScope", function(e, t, o, i, n, a, r, s, c, l, d) {
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
}])