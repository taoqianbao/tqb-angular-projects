angular.module("app.map.controller", []).controller("mapHomeCtrl", ["$scope", "$rootScope", "$ionicHistory", "$ionicScrollDelegate", "$state", "$timeout", "$http", "$cordovaFile", "$cordovaFileTransfer", "$cordovaNetwork", "$q", "viewArgument", "cacheLocal", "resMap", "resUser", function(e, t, o, i, n, a, r, s, c, l, d, u, p, m, h) {
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
}])
