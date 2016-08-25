
angular.module("app.common.scrollzoom.directive", []).directive("scrollZoom", ["CONFIG", function(e) {
	return {
		restrict: "EAC",
		replace: !1,
		link: function(t, o) {
			function i(e, t) {
				e.__scale && e.__scale === t || (e.__scale = t, e.style.webkitTransform = "scale(+" + t + ")")
			}

			function n(t) {
				var n = o[0].querySelectorAll(".item"),
					a = n.length;
				if (0 === a) return 0;
				if (0 > t) return -t;
				if (t >= a) return a - t - 1;
				var r = n[t].getBoundingClientRect();
				return r.top <= s + 30 && r.bottom >= s ? (i(n[t], 1), 0) : r.top > s ? (r.bottom > e.devHeight ? r.top < e.devHeight ? i(n[t], 1 - (r.bottom - e.devHeight) / r.height * .1) : i(n[t], .9) : i(n[t], 1), 0 === t ? 0 : -1) : (r.top < 0 ? r.bottom > 0 ? i(n[t], 1 - -r.top / r.height * .1) : i(n[t], .9) : i(n[t], 1), t === a - 1 ? 0 : 1);
				var r
			}

			function a() {
				var e = n(r);
				0 === e ? (n(r - 2), n(r - 1), n(r + 1), n(r + 2)) : (r += e, a())
			}
			var r = 0,
				s = e.devHeight / 2;
			ionic.requestAnimationFrame(function c() {
				0 === o[0].querySelectorAll(".item").length ? ionic.requestAnimationFrame(c) : a()
			}), o.bind("scroll", function() {
				a(), ionic.requestAnimationFrame(a)
			})
		}
	}
}])