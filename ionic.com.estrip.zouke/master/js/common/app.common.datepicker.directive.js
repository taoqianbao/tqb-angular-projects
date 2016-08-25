angular.module("app.common.datepicker.directive", []).factory("datepickerUtils", ["dateFilter", function(e) {
	return {
		isDate: function(e) {
			return "[object Date]" === Object.prototype.toString.call(e)
		},
		stringToDate: function(e) {
			if (this.isDate(e)) return new Date(e);
			var t = e.split("-"),
				o = t[0],
				i = t[1],
				n = t[2];
			return new Date(o, i - 1, n, 3)
		},
		dateRange: function(t, o, i, n) {
			var a, r, s, c = [];
			for (n || (n = "yyyy-MM-dd"), r = s = t; o >= t ? o > s : s > o; r = o >= t ? ++s : --s) a = this.stringToDate(i), a.setDate(a.getDate() + r), c.push(e(a, n));
			return c
		}
	}
}]).directive("datepicker", ["datepickerUtils", "dateFilter", function(e, t) {
	return {
		restrict: "EA",
		require: "ngModel",
		replace: !0,
		scope: {
			model: "=ngModel"
		},
		templateUrl: "app/common/datepicker/templates/datepicker.html",
		link: function(o, i, n, a) {
			function r() {
				var i = new Date(l.getFullYear(), l.getMonth() + 1, 0, 3).getDate(),
					n = e.dateRange(-l.getDay(), 0, l),
					a = e.dateRange(0, i, l),
					r = e.stringToDate(a[a.length - 1]),
					s = e.dateRange(1, 7 - r.getDay(), r),
					c = n.concat(a, s);
				c.length / 7 < 6 && (c = c.concat(e.dateRange(1, 8, c[c.length - 1]))), o.today = t(new Date, "yyyy-MM-dd"), o.month = t(l, "MM"), o.dates = c, o.current = l, o.allowPrevMonth = o.model.minDate ? o.model.minDate.getTime() < l.getTime() : (new Date).getTime() < l.getTime(), o.allowNextMonth = o.model.maxDate ? o.model.maxDate.getTime() >= new Date(l.getFullYear(), l.getMonth() + 1).getTime() : !0
			}

			function s(e) {
				return e && e.split("-")[1] == o.month ? o.model.enabled && -1 === Array.prototype.indexOf.call(o.model.enabled, e) || o.model.minDate && e < t(o.model.minDate, "yyyy-MM-dd") || o.model.maxDate && e > t(o.model.maxDate, "yyyy-MM-dd") : !0
			}
			o.dayNames = "日,一,二,三,四,五,六".split(",");
			var c = new Date,
				l = new Date(c.getFullYear(), c.getMonth());
			o.setDate = function(e) {
				s(e) || (o.model.selected = e, a.$setViewValue(o.model), o.$emit("dateSelect", o.model.selected))
			}, a.$render = function() {
				if (o.model.selected) {
					"today" === o.model.selected && (o.model.selected = t(new Date, "yyyy-MM-dd"));
					var e = new Date(o.model.selected);
					(e.getFullYear() !== l.getFullYear() || e.getMonth() !== l.getMonth()) && (l = new Date(e.getFullYear(), e.getMonth()), r())
				}
				"*" === o.model.enabled && delete o.model.enabled, r()
			}, o.changeMonth = function(e) {
				l.setDate(1), l.setMonth(l.getMonth() + e), r(), o.$emit("monthChange", l)
			}, o.nextMonth = function() {
				o.allowNextMonth && this.changeMonth(1)
			}, o.preMonth = function() {
				o.allowPrevMonth && this.changeMonth(-1)
			}, o.isDateDisabled = s
		}
	}
}])
