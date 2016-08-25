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
}])
