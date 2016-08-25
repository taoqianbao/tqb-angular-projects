angular.module("app.common.filter", []).filter("inArray", function() {
	return function(e, t) {
		return void 0 === e ? !1 : -1 == e.indexOf(t) ? !1 : !0
	}
}).filter("toDate", function() {
	return function(e) {
		return void 0 === e ? !1 : new Date(e.split(" ")[0])
	}
}).filter("sortArray", function() {
	return function(e, t) {
		if (void 0 !== e) {
			var o = [];
			for (var i in t) {
				var n = t[i];
				o.push(e[n])
			}
			return o
		}
	}
}).filter("slice", function() {
	return function(e, t, o) {
		return void 0 != e ? 0 == o ? e.slice(t, e.length) : e.slice(t, o) : void 0
	}
}).filter("filterProduct", function() {
	return function(e, t, o) {
		if (void 0 != e) {
			if (null == o || "" == o) return e;
			var i = [];
			if ("location" == t) {
				for (var n in e)
					for (var a in e[n].country_code)
						if (e[n].country_code[a] == o) {
							i.push(e[n]);
							break
						}
			} else if ("category" == t)
				for (var n in e) {
					for (var a in e[n].tags)
						if (e[n].tags[a] == o) {
							i.push(e[n]);
							break
						}
					e[n].cat == o && i.push(e[n])
				}
			return i
		}
	}
}).filter("groupby", function() {
	return function(e, t) {
		if (e) {
			for (var o = {}, i = 0; i < e.length; i++) o[e[i][t]] ? o[e[i][t]].push(e[i]) : o[e[i][t]] = [e[i]];
			var n = [];
			for (var t in o) n.push({
				key: t,
				sort: o[t][0].sort,
				list: o[t]
			});
			return n.sort(function(e, t) {
				return e.sort > t.sort ? 1 : -1
			})
		}
	}
}).filter("orderByCustom", ["$parse", function(e) {
	return function(t, o, i) {
		function n(e, t) {
			for (var i = 0; i < o.length; i++) {
				var n = o[i](e, t);
				if (0 !== n) return n
			}
			return 0
		}

		function a(e, t) {
			return t ? function(t, o) {
				return e(o, t)
			} : e
		}

		function r(e) {
			switch (typeof e) {
				case "number":
				case "boolean":
				case "string":
					return !0;
				default:
					return !1
			}
		}

		function s(e) {
			return null === e ? "null" : "function" == typeof e.valueOf && (e = e.valueOf(), r(e)) ? e : "function" == typeof e.toString && (e = e.toString(), r(e)) ? e : ""
		}

		function c(e, t) {
			var o = typeof e,
				i = typeof t;
			return o === i && "object" === o && (e = s(e), t = s(t)), o === i ? ("string" === o && (e = e.toLowerCase(), t = t.toLowerCase()), e === t ? 0 : t > e ? -1 : 1) : i > o ? -1 : 1
		}
		if (void 0 !== t) return t.length > 0 && !t[0][o] ? t : t[0][o] ? (o = angular.isArray(o) ? o : [o], 0 === o.length && (o = ["+"]), o = o.map(function(t) {
			var o = !1,
				i = t || identity;
			if (angular.isString(t)) {
				if (("+" == t.charAt(0) || "-" == t.charAt(0)) && (o = "-" == t.charAt(0), t = t.substring(1)), "" === t) return a(c, o);
				if (i = e(t), i.constant) {
					var n = i();
					return a(function(e, t) {
						return c(e[n], t[n])
					}, o)
				}
			}
			return a(function(e, t) {
				return c(i(e), i(t))
			}, o)
		}), Array.prototype.slice.call(t).sort(a(n, i))) : t
	}
}])
