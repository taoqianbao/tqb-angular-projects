angular.module("app.toolbox.controller", []).controller("toolboxHomeCtrl", ["$document", "$scope", "$rootScope", "$state", "$ionicHistory", "$timeout", function(e, t, o, i) {
	t.shortcut = [{
		name: "有故事",
		icon: "ic-story",
		img: "img/bg/toolbox-story.png"
	}, {
		name: "我要飞",
		icon: "ic-flight",
		img: "img/bg/toolbox-flight.png"
	}, {
		name: "查一查",
		icon: "ic-sale",
		img: "img/bg/toolbox-search.png"
	}, {
		name: "不一样",
		icon: "ic-different",
		img: "img/bg/toolbox-different.png"
	}, {
		name: "约个伴",
		icon: "ic-appointment",
		img: "img/bg/toolbox-appointment.png"
	}], t.onClickShortcut = function(e) {
		switch (e) {
			case "story":
				i.go("app.storyList", {
					type: "hot",
					option: "",
					filter: !0,
					title: "热门故事"
				});
				break;
			case "traffic":
				i.go("app.toolboxTraffic");
				break;
			case "sale":
				i.go("app.toolboxSale");
				break;
			case "special":
				i.go("app.productList", {
					type: "tag",
					option: "NE",
					filter: !0,
					title: "非凡体验"
				});
				break;
			case "appointment":
				i.go("app.toolboxAppointment")
		}
	}
}]).controller("trafficSearchCtrl", ["$scope", "$state", "$timeout", "$ionicSlideBoxDelegate", "CONFIG", "utils", "viewArgument", "dateFilter", "modal", "resTrain", "resProduct", function(e, t, o, i, n, a, r, s, c, l, d) {
	e.title = "欧铁查询", e.imgHeight = n.hImg, e.imgSize = n.imgSize, e.page = 1, e.number = n.loadOnceNum, e.activeSlide = 0, e.mini = !1, e.modified = !1, e.select = "", e.listSelect = [], e.products = [], e.minDate = new Date, e.maxDate = new Date, e.maxDate.setYear(e.maxDate.getFullYear() + 1), e.trainCities = {}, l.getCites({
		silence: !0
	}, function(t) {
		0 == t.data.code && (e.trainCities = t.data)
	}), e.timeRanges = [{
		label: "00:00-00:06",
		value: "1"
	}, {
		label: "06:00-12:00",
		value: "2"
	}, {
		label: "12:00-18:00",
		value: "3"
	}, {
		label: "18:00-24:00",
		value: "4"
	}], d.getPdList({
		category: "tag",
		option: "ER"
	}, function(t) {
		0 == t.data.code && (e.products = t.data.list)
	}), e.form = {
		fromCity: {
			zh_name: "选择城市"
		},
		toCity: {
			zh_name: "选择城市"
		},
		date: s(e.minDate, "yyyy-MM-dd"),
		timeRange: e.timeRanges[1]
	}, e.onClickSwitch = function(t) {
		e.activeSlide = t, i.$getByHandle("traffic-search").slide(t)
	}, e.onSlideChanged = function(t) {
		e.activeSlide = t
	}, e.onClickSelect = function(o) {
		switch (e.select = o, o) {
			case "from":
				r.put(e.trainCities), t.go("app.citySelect");
				break;
			case "to":
				r.put(e.trainCities), t.go("app.citySelect");
				break;
			case "date":
				r.put({
					minDate: e.minDate,
					maxDate: e.maxDate,
					selected: e.form.date
				}), t.go("app.dateSelect");
				break;
			case "time":
				r.put({
					title: "选择出发时间",
					list: e.listSelect
				}), t.go("app.singleSelect")
		}
	}, e.$on("$ionicView.beforeEnter", function(t, o) {
		if ("forward" != o.direction) {
			var i = r.get();
			if (void 0 != i) {
				switch (e.select) {
					case "from":
						e.form.fromCity.zh_name = i.name, e.form.fromCity.en_name = i.code;
						break;
					case "to":
						e.form.toCity.zh_name = i.name, e.form.toCity.en_name = i.code;
						break;
					case "date":
						e.form.date = i.date;
						break;
					case "time":
						e.form.timeRange = e.timeRanges[i.index]
				}
				e.modified = !0
			}
		}
	}), e.actionTrainSearch = function() {
		return "选择城市" === e.form.fromCity.zh_name || "选择城市" === e.form.toCity.zh_name ? void JAlert.notify("请选择城市！") : e.form.fromCity.zh_name == e.form.toCity.zh_name ? void JAlert.notify("请选择不同的城市！") : (e.mini = !0, e.modified = !1, void l.search({
			date: e.form.date,
			fromCity: e.form.fromCity.en_name,
			toCity: e.form.toCity.en_name,
			daypart: e.form.timeRange.value
		}, function(t) {
			0 == t.data.code && e.list.initTrains(t.data.trains)
		}))
	}, e.list = {
		initTrains: function(t) {
			e.trains = [], angular.forEach(t, function(t) {
				t.time_cost = a.minutesToHour(t.time_cost), t.transfer ? (angular.extend(t, {
					has_transfer: !0,
					transfer_times: 1,
					detail: [{
						from_station: t.from_station,
						from_time: t.from_time,
						numbers: t.numbers,
						time_cost: a.timeDiff(t.from_time, t.transfer.arrival_time),
						to_station: t.transfer.station,
						to_time: t.transfer.arrival_time
					}, {
						transfer_city: t.transfer.city,
						transfer_wait: a.timeDiff(t.transfer.arrival_time, t.transfer.departure_time),
						from_station: t.transfer.station,
						from_time: t.transfer.departure_time,
						numbers: t.transfer.numbers,
						time_cost: a.timeDiff(t.to_time, t.transfer.departure_time),
						to_station: t.to_station,
						to_time: t.to_time
					}]
				}), e.trains.push(t)) : (angular.extend(t, {
					has_transfer: !1
				}), e.trains.push(t))
			})
		},
		initSingleSelect: function(t) {
			angular.forEach(t, function(t) {
				e.listSelect.push({
					name: t.label
				})
			})
		}
	}, e.list.initSingleSelect(e.timeRanges)
}])

