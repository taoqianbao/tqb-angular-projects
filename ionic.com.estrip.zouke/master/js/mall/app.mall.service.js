angular.module("app.mall.service", []).service("commonData", function() {
	this.commonData = {}
}).service("contactForm", function() {
	this.data = {}, this.setData = function(e) {
		this.data = e
	}, this.getData = function() {
		return this.data
	}
}).factory("orderFormData", ["resOrder", "dateFilter", "resUser", function(e, t, o) {
	function i(e, t) {
		if (!u.isPersonal()) {
			var o = u._calendarInfos = e.avail_date,
				i = [];
			for (var n in o) o.hasOwnProperty(n) && i.push(n);
			u._dateEnabled = i, i[0] && (u.calendarModel.selected = i[0])
		}
		t && (u._pName = e.pd_name, u._refund = e.refund, u._min = e.min_num, u._max = e.max_num, u._personA = u._gPerson = u._gDays = e.min_num, u._oPrice = e.ori_price, u._packageInfos = e.set_info || u._packageInfos || null, u._packageSelected = u._packageSelected || u._packageInfos && Object.keys(u._packageInfos)[0], u._timeInfos = e.open_time || u._timeInfos || null, u._timeSelected = u._timeSelected || u._timeInfos && Object.keys(u._timeInfos)[0], u._pointInfos = e.meet_points || u._pointInfos || null, u._pointSelected = u._pointSelected || u._pointInfos && Object.keys(u._pointInfos)[0], u._airportInfos = e.airport_poi || u._airportInfos || null, u._airportSelected = u._aireportSelected || u._airportInfos && Object.keys(u._airportInfos)[0], u._express = e.express || !1)
	}

	function n(e) {
		0 === e.data.code ? i(e.data, !0) : JAlert.showOnce(e.data.msg)
	}

	function a(e) {
		if (0 === e.data.code) {
			if (u.isPersonal()) return;
			i(e.data)
		} else JAlert.showOnce(e.data.msg)
	}

	function r(e) {
		if (0 === e.data.code) {
			var t = e.data.list[0];
			t && (u.personInfos[0] = angular.copy(t), u.contactInfo = angular.copy(t))
		}
	}

	function s(e, t) {
		var o = this;
		this._status = 0, this._statusText = "", this._type = e, this._id = t, this._orderId = "", this._pName, this._refund = [], this._min = 0, this._max = 0, this._oPrice = 0, this._all_price = 0, this._o_all_price = 0, this._express = !1, this._calendarInfos = null, this._dateEnabled = [], this._dateSelected = "", this.__calenderModel = {get enabled() {
				return o._dateEnabled
			},
			get selected() {
				return o._dateSelected
			},
			set selected(e) {
				if (o._dateSelected = e, "FS" === o._type) {
					var t;
					(t = o._calendarInfos) && (t = t[o._dateSelected]) && (t = t.day_parts) && (t = t.label) && (o._timeInfos = t, !(o.timeSelected && o.timeSelected in o._timeInfos) && (o.timeSelected = Object.keys(o._timeInfos)[0]))
				}
			}
		}, this._packageInfos = null, this._packageSelected = "", this._timeInfos = null, this._timeSelected = "", this._personA = 0, this._personA_ = 0, this._personC = 0, this._personC_ = 0, this._personT = 0, this._personT_ = 0, this._gPerson = 0, this._gPerson_ = 0, this._gDays = 0, this._gDays_ = 0, this._address = "", this._rpersonInfos = null, this._rperson = 0, this._pointInfos = null, this._pointInfoSelected = "", this._personInfos = [], this._contactInfo = {}, this._code, this._payType = "weix", this._budget = "0", this._remark = "", this._airportInfos = null, this._aireportSelected = "", this._method = "0", this._flight = "", this._aTime = null
	}

	function c(e, t, o, i) {
		if (void 0 !== i) {
			if (null === i || "" === i) return e[t + "_"] = e[t], void(e[t] = null);
			var n = e[t];
			try {
				e[t] = parseInt(i, 10);
				var a;
				a = "_gDays" === t ? e.getDayNumber() : e.getPersonNumber(), (a > e._max || a < e._min || e[t] < o) && (e[t] = n || e[t + "_"])
			} catch (r) {
				e[t] = n || e[t + "_"]
			}
		}
	}
	s.prototype.initFromRemoteData = function(e) {
		if (this._id = e.pd_id, this._type = e.category, this._orderId = e.order_id, this._status = parseInt(e.use_stat, 10), 0 === this._status && (this._status = 2), this._statusText = e.statusDesc, this._pName = e.pd_name, this._refund = e.refund, this._dateSelected = e.travel_date, this._all_price = e.order_price, this._o_all_price = e.amount_price, e.adult_info) {
			this._personA = e.adult_info.length, this._personT = e.teenager_info.length, this._personC = e.child_info.length, this._personInfos = e.adult_info.concat(e.child_info, e.teenager_info);
			for (var t = 0, o = this._personInfos.length; o > t; ++t) this._personInfos[t].name = this._personInfos[t].zh_name
		}
		switch (e.open_time && (this._timeInfos = {}, this._timeInfos[e.open_time] = e.open_time_desc, this._timeSelected = e.open_time), e.set_name && (this._packageInfos = [{
			set_name: e.set_name
		}], this._packageSelected = "0"), this.contactInfo = {
			name: e.name_contact,
			pyname: e.name_contact_py,
			mobile: e.mobile_contact,
			email: e.email_contact
		}, this._type) {
			case "WD":
				this._gDays = e.order_days, this._pointInfos = [e.meet_point], this._pointSelected = "0";
				break;
			case "TG":
				this._gDays = e.adult_num, this._gPerson = e.person, this._address = e.address;
				break;
			case "PT":
				this._personA = e.adult_num, this._personC = e.child_num, this._personT = e.teenager_num, this._gDays = e.trip_day, this._budget = l.indexOf(e.budget), this._remark = e.trip_mark;
				break;
			case "VC":
				this._address = e.visa_address;
				break;
			case "ST":
				this._method = d.indexOf(e.st_method), this._flight = e.flight, this._airportSelected = e.airport, this._airportInfos = {}, this._airportInfos[e.airport] = e.airport_name, this._address = e.address, e.seeoff_time && (this._aTime = new Date("1970-01-01 " + e.seeoff_time)), this._gPerson = e.adult_num
		}
	}, s.prototype.getId = function() {
		return this._id
	}, s.prototype.getType = function() {
		return this._type
	}, Object.defineProperty(s.prototype, "needExpress", {
		get: function() {
			return this._express
		}
	}), Object.defineProperty(s.prototype, "orderId", {
		get: function() {
			return this._orderId
		},
		set: function(e) {
			this._orderId = e
		}
	}), Object.defineProperty(s.prototype, "status", {
		get: function() {
			return this._status
		},
		set: function(e) {
			this._status = e
		}
	}), Object.defineProperty(s.prototype, "statusText", {
		get: function() {
			return this._statusText
		},
		set: function(e) {
			this._statusText = e
		}
	}), Object.defineProperty(s.prototype, "pName", {
		get: function() {
			return this._pName
		}
	}), Object.defineProperty(s.prototype, "refund", {
		get: function() {
			return this._refund
		}
	}), Object.defineProperty(s.prototype, "dateSelected", {
		get: function() {
			return this._dateSelected
		}
	}), Object.defineProperty(s.prototype, "calendarModel", {
		get: function() {
			return this.__calenderModel
		}
	}), Object.defineProperty(s.prototype, "calendarInfos", {
		get: function() {
			return this._calendarInfos
		}
	}), Object.defineProperty(s.prototype, "packageInfos", {
		get: function() {
			return this._packageInfos
		}
	}), Object.defineProperty(s.prototype, "packageSelected", {
		get: function() {
			return this._packageSelected
		},
		set: function(e) {
			e in this._packageInfos && (this._packageSelected = e)
		}
	}), Object.defineProperty(s.prototype, "timeInfos", {
		get: function() {
			return this._timeInfos
		}
	}), Object.defineProperty(s.prototype, "timeSelected", {
		get: function() {
			return this._timeSelected
		},
		set: function(e) {
			if (e in this._timeInfos && (this._timeSelected = e), "FS" === this.getType()) {
				var t;
				(t = this._calendarInfos) && (t = t[this._dateSelected]) && (t = t.day_parts) && (t = t.person) && (t = t[this._timeSelected]) && (this._rpersonInfos = t, !(this._rperson && -1 !== this._rpersonInfos.indexOf(this._rperson)) && (this._rperson = this._rpersonInfos[0]))
			}
		}
	}), Object.defineProperty(s.prototype, "rpersonInfos", {
		get: function() {
			return this._rpersonInfos
		}
	}), Object.defineProperty(s.prototype, "rperson", {
		get: function() {
			return this._rperson
		},
		set: function(e) {
			this._rperson = e
		}
	}), Object.defineProperty(s.prototype, "pointInfos", {
		get: function() {
			return this._pointInfos
		}
	}), Object.defineProperty(s.prototype, "pointSelected", {
		get: function() {
			return this._pointSelected
		},
		set: function(e) {
			this._pointSelected = e
		}
	}), Object.defineProperty(s.prototype, "code", {
		get: function() {
			return this._code
		},
		set: function(e) {
			this._code = e
		}
	}), Object.defineProperty(s.prototype, "payType", {
		get: function() {
			return this._payType
		},
		set: function(e) {
			this._payType = e
		}
	}), Object.defineProperty(s.prototype, "budget", {
		get: function() {
			return this._budget
		},
		set: function(e) {
			this._budget = e
		}
	}), Object.defineProperty(s.prototype, "remark", {
		get: function() {
			return this._remark
		},
		set: function(e) {
			this._remark = e
		}
	}), Object.defineProperty(s.prototype, "airportInfos", {
		get: function() {
			return this._airportInfos
		}
	}), Object.defineProperty(s.prototype, "airportSelected", {
		get: function() {
			return this._airportSelected
		},
		set: function(e) {
			this._airportSelected = e
		}
	}), Object.defineProperty(s.prototype, "method", {
		get: function() {
			return this._method
		},
		set: function(e) {
			this._method = e
		}
	}), Object.defineProperty(s.prototype, "flight", {
		get: function() {
			return this._flight
		},
		set: function(e) {
			this._flight = e
		}
	}), Object.defineProperty(s.prototype, "aTime", {
		get: function() {
			return this._aTime
		},
		set: function(e) {
			this._aTime = e
		}
	}), Object.defineProperty(s.prototype, "personA", {
		get: function() {
			return this._personA
		},
		set: function(e) {
			c(this, "_personA", 1, e)
		}
	}), Object.defineProperty(s.prototype, "personC", {
		get: function() {
			return this._personC
		},
		set: function(e) {
			c(this, "_personC", 0, e)
		}
	}), Object.defineProperty(s.prototype, "personT", {
		get: function() {
			return this._personT
		},
		set: function(e) {
			c(this, "_personT", 0, e)
		}
	}), Object.defineProperty(s.prototype, "gPerson", {
		get: function() {
			return this._gPerson
		},
		set: function(e) {
			c(this, "_gPerson", 1, e)
		}
	}), Object.defineProperty(s.prototype, "gDays", {
		get: function() {
			return this._gDays
		},
		set: function(e) {
			c(this, "_gDays", 1, e)
		}
	}), Object.defineProperty(s.prototype, "personInfos", {
		get: function() {
			return this._personInfos
		}
	}), Object.defineProperty(s.prototype, "contactInfo", {
		get: function() {
			return this._contactInfo
		},
		set: function(e) {
			this._contactInfo = e
		}
	}), Object.defineProperty(s.prototype, "address", {
		get: function() {
			return this._address
		},
		set: function(e) {
			this._address = e
		}
	}), s.prototype.revertShadow = function(e) {
		null === this["_" + e] && (this["_" + e] = this["_" + e + "_"])
	}, s.prototype.getPerPrice = function(e) {
		var t = null;
		if (!this._calendarInfos || !(t = this._calendarInfos[this._dateSelected])) return 0;
		switch (e) {
			case "personC":
				return t.price_c;
			case "personT":
				return t.price_t;
			default:
				return t.price_a
		}
	}, s.prototype.changeNumber = function(e, t) {
		this[e] = this[e] + t
	}, s.prototype.addAble = function(e) {
		var t;
		return t = "gDays" === e ? this.getDayNumber() : this.getPersonNumber(), t < this.getMax()
	}, s.prototype.subAble = function(e) {
		switch (e) {
			case "personA":
			case "gPerson":
			case "gDays":
				if (1 === this[e]) return !1;
				break;
			default:
				if (0 === this[e]) return !1
		}
		var t;
		return t = "gDays" === e ? this.getDayNumber() : this.getPersonNumber(), t > this.getMin()
	}, s.prototype.hasCalendar = function() {
		return null != this._calendarInfos
	}, s.prototype.hasPackage = function() {
		return null != this._packageInfos
	}, s.prototype.hasTime = function() {
		return null != this._timeInfos
	}, s.prototype.hasPerson = function() {
		switch (this.getType()) {
			case "FS":
			case "TG":
			case "PT":
			case "WD":
			case "ST":
				return !1;
			default:
				return !0
		}
	}, s.prototype.hasPrice = function() {
		switch (this.getType()) {
			case "FS":
			case "PT":
				return !1;
			default:
				return !0
		}
	}, s.prototype.hasRperson = function() {
		return null != this._rpersonInfos
	}, s.prototype.isPersonal = function() {
		return "PT" === this.getType()
	}, s.prototype.isGuide = function() {
		return "TG" === this.getType()
	}, s.prototype.isWifi = function() {
		return "WD" === this.getType()
	}, s.prototype.isMQL = function() {
		return "FS" === this.getType()
	}, s.prototype.isVisa = function() {
		return "VC" === this.getType()
	}, s.prototype.isAirport = function() {
		return "ST" === this.getType()
	}, s.prototype.getMax = function() {
		return this._max
	}, s.prototype.getMin = function() {
		return this._min
	}, s.prototype.getPersonNumber = function() {
		return this.isPersonal() || this.hasPerson() ? this._personA + this._personC + this._personT : this.isGuide() || this.isAirport() ? this._gPerson : 0
	}, s.prototype.getDayNumber = function() {
		return this.isGuide() || this.isWifi() || this.isPersonal() ? this._gDays : 0
	}, s.prototype.getPackageOffset = function() {
		return this.packageInfos ? this.packageInfos[this.packageSelected].set_price : 0
	}, s.prototype.getPrice = function() {
		if (this._all_price) return this._all_price;
		if (this.hasPrice()) {
			if (this.isGuide()) return this.getPerPrice("gDays") * this.getDayNumber() / 2;
			var e = this.getPackageOffset();
			return this.isWifi() ? (this.getPerPrice("gDays") + e) * this.getDayNumber() : (this.getPerPrice("personA") + e) * this.personA + (this.getPerPrice("personC") + e) * this.personC + (this.getPerPrice("personT") + e) * this.personT
		}
		return 0
	}, s.prototype.getSave = function() {
		return this._all_price && this._o_all_price ? this._o_all_price - this._all_price : this.hasPrice() ? this.isGuide() ? 0 : this.isWifi() ? (this._oPrice - this.getPerPrice("gDays")) * this.getDayNumber() : (this._oPrice - this.getPerPrice("personA")) * this.personA + (this._oPrice - this.getPerPrice("personC")) * this.personC + (this._oPrice - this.getPerPrice("personT")) * this.personT : 0
	}, s.prototype.getRemoteInfos = function() {
		this.isPersonal() && (this._dateEnabled = "*", this._calendarInfos = [], this._dateSelected = "today"), e.getInfo({
			pdId: this._id
		}, n), o.getContacts({
			first: !0
		}, r)
	}, s.prototype.getAvailDateByMonth = function(o) {
		this.isPersonal() || e.getAvailDate({
			pdId: this._id,
			date: t(o, "yyyy-MM-dd")
		}, a)
	}, s.prototype.getRemoteOrderInfos = function(e) {
		this.orderId && o.getOrderDetail({
			order_id: this.orderId
		}, function(t) {
			0 === t.data.code ? (u.initFromRemoteData(t.data), e && e(u)) : JAlert.showOnce(t.data.msg)
		})
	};
	var l = ["2-5", "5-8", "8+"],
		d = ["pickup", "seeoff"];
	s.prototype.createOrder = function() {
		var e = {
			pd_id: this.getId(),
			travel_date: this.dateSelected,
			opt_value: this.timeSelected,
			set_id: this.packageSelected,
			set_price: this.packageInfos && this.packageInfos[this.packageSelected].set_price,
			adult_num: this.personA,
			teenager_num: this.personT,
			child_num: this.personC,
			adult_info: [],
			teenager_info: [],
			child_info: [],
			name_contact: this.contactInfo.name,
			name_contact_py: this.contactInfo.pyname,
			mobile_contact: this.contactInfo.mobile,
			email_contact: this.contactInfo.email,
			address_contact: this.contactInfo.address,
			zipcode_contact: this.contactInfo.zipcode,
			coupon_code: this.code
		};
		if (this.hasPerson())
			for (var o = this.personA, i = this.personA + this.personC, n = this.personInfos.length, a = 0; n > a; ++a) o > a ? e.adult_info.push({
				zh_name: this.personInfos[a].name,
				py_name: this.personInfos[a].pyname
			}) : i > a ? e.child_info.push({
				zh_name: this.personInfos[a].name,
				py_name: this.personInfos[a].pyname,
				age: this.personInfos[a].age
			}) : e.teenager_info.push({
				zh_name: this.personInfos[a].name,
				py_name: this.personInfos[a].pyname,
				age: this.personInfos[a].age
			});
		switch (this.getType()) {
			case "TG":
				e.adult_num = this.gDays, e.person = this.gPerson, e.address = this.address;
				break;
			case "PT":
				e.trip_day = this.gDays, e.budget = l[this.budget], e.trip_mark = this.remark;
				break;
			case "VC":
				e.visa_address = this.address;
				break;
			case "WD":
				e.get_point_key = this.pointSelected, e.adult_num = this.gDays;
				break;
			case "ST":
				e.st_method = d[this.method], e.flight = this.flight, e.airport = this.airportSelected, e.address = this.address, e.adult_num = this.gPerson, e.seeoff_time = t(this.aTime, "HH:MM")
		}
		return e
	};
	var u = null;
	return {
		create: function(e, t) {
			return u && u.getId() === t || (u = new s(e, t)), u
		},
		createByOrderId: function(e, t) {
			u || (u = new s("", "")), u.orderId = e, u.getRemoteOrderInfos(t)
		},
		current: function() {
			return u
		},
		clear: function() {
			u = null
		}
	}
}])
