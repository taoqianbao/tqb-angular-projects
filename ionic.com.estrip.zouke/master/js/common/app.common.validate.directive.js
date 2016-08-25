
angular.module("app.common.validate.directive", []).directive("isMobile", function() {
	return {
		restrict: "A",
		require: "ngModel",
		link: function(e, t, o, i) {
			i.$validators.isMobile = function(e) {
				if (void 0 != e) {
					var t = e.toString(),
						o = t.length;
					return 11 == o && /^(((13[0-9]{1})|(14[0-9]{1})|(15[0-9]{1})|(17[0-9]{1})|(18[0-9]{1}))+\d{8})$/.test(t)
				}
				return !0
			}
		}
	}
}).directive("isIdCard", function() {
	return {
		restrict: "A",
		require: "ngModel",
		link: function(e, t, o, i) {
			i.$validators.isIdCard = function(e) {
				if (void 0 != e) {
					var t, o = e.toString(),
						i = o.length;
					if (15 == i) t = new RegExp(/^(\d{6})()?(\d{2})(\d{2})(\d{2})(\d{2})(\w)$/);
					else {
						if (18 != i) return !1;
						t = new RegExp(/^(\d{6})()?(\d{4})(\d{2})(\d{2})(\d{3})(\w)$/)
					}
					var n = o.match(t);
					if (null != n) {
						if (15 == i) var a = new Date("19" + n[3] + "/" + n[4] + "/" + n[5]),
							r = a.getYear() == n[3] && a.getMonth() + 1 == n[4] && a.getDate() == n[5];
						else var a = new Date(n[3] + "/" + n[4] + "/" + n[5]),
							r = a.getFullYear() == n[3] && a.getMonth() + 1 == n[4] && a.getDate() == n[5];
						if (!r) return !1
					}
					return t.test(o) ? !0 : !1
				}
				return !0
			}
		}
	}
}).directive("equalTo", function() {
	return {
		require: "ngModel",
		scope: {
			otherModelValue: "=equalTo"
		},
		link: function(e, t, o, i) {
			i.$validators.equalTo = function(t) {
				return t == e.otherModelValue
			}, e.$watch("otherModelValue", function() {
				i.$validate()
			})
		}
	}
}).directive("uniqueEmail", ["$q", "$timeout", "resUser", function(e, t, o) {
	return {
		restrict: "A",
		require: "ngModel",
		link: function(i, n, a, r) {
			r.$asyncValidators.uniqueEmail = function(i, n) {
				var a = e.defer(),
					r = i || n;
				return t(function() {
					o.checkEmail({
						email: r
					}).$promise.then(function(e) {
						0 === e.data.code ? a.resolve() : a.reject()
					})
				}, 1e3), a.promise
			}
		}
	}
}]).directive("uniqueNick", ["$q", "$timeout", "UniqueNickRes", function(e, t, o) {
	return {
		restrict: "A",
		require: "ngModel",
		link: function(i, n, a, r) {
			r.$asyncValidators.uniqueNick = function(i, n) {
				var a = e.defer(),
					r = i || n;
				return t(function() {
					o.check({
						nick_name: r
					}).$promise.then(function(e) {
						0 == e.data.code ? a.resolve() : a.reject()
					})
				}, 1e3), a.promise
			}
		}
	}
}])