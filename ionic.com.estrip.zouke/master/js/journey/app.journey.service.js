angular.module("app.journey.service", []).factory("journeyTransfer", ["currentScope", function() {
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
}])
