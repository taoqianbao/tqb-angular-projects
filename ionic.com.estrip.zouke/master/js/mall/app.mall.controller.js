angular.module("app.mall.controller", []).controller("mallHomeCtrl", ["$rootScope", "$scope", "$state", "$ionicHistory", "$ionicSlideBoxDelegate", "viewArgument", "resMall", "CONFIG", function(e, t, o, i, n, a, r, s) {
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
}])
