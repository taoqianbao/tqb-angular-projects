
angular.module("app.common.tool.directive", []).directive("compile", ["$compile", function(e) {
	return function(t, o, i) {
		t.$watch(function(e) {
			return e.$eval(i.compile)
		}, function(i) {
			o.html(i), e(o.contents())(t)
		})
	}
}]).directive("onFinishRender", ["$timeout", function(e) {
	return {
		restrict: "A",
		link: function(t, o) {
			e(function() {
				t.$emit("ngFinishRender", o)
			}, 0)
		}
	}
}]).directive("onRepeatComplete", ["$timeout", function(e) {
	return {
		restrict: "A",
		link: function(t, o) {
			e(function() {
				t.$last && t.$emit("ngRepeatComplete", o)
			}, 100)
		}
	}
}]).directive("scrollAnchor", ["CONFIG", function(e) {
	return {
		restrict: "A",
		link: function(t, o, i) {
			var n = 0,
				a = !1,
				r = !1;
			o.bind("scroll", function(s) {
				var c = 0;
				s.detail ? c = s.detail.scrollTop : s.target && (c = s.target.scrollTop);
				var l = c - n;
				n = c;
				var d = i.scrollAnchor,
					u = o[0].querySelector(d),
					p = u.getBoundingClientRect().top + u.offsetHeight - e.devHeight + 150;
				l > 0 && c > p ? a || (t.$emit("scrollAnchorUp"), a = !0, r = !1) : 0 > l && p > c && (r || (t.$emit("scrollAnchorDown"), r = !0, a = !1))
			})
		}
	}
}]).directive("headerShrink", ["$document", "CONFIG", function(e, t) {
	var o = 0,
		i = function(e, t, i) {
			o = Math.min(i, o + t), 0 > o && (o = 0);
			var n = 1 - o / 44 * 1.2;
			0 > n && (n = 0), ionic.requestAnimationFrame(function() {
				e[0].style[ionic.CSS.TRANSFORM] = "translate3d(0, -" + o + "px, 0)", e[0].style.opacity = n, e[1].style[ionic.CSS.TRANSFORM] = "translate3d(0, -" + o + "px, 0)", e[1].style.opacity = n
			})
		};
	return {
		restrict: "A",
		link: function(n, a, r) {
			var s = e[0].body.querySelectorAll(".bar-header"),
				c = 44,
				l = 0,
				d = !1,
				u = !1;
			n.$parent.$on("$ionicView.afterEnter", function() {
				e[0].body.querySelector(".tabs-index").style.display = "none"
			}), n.$parent.$on("$ionicView.beforeLeave", function() {
				var t = document.body.querySelectorAll(".bar-header");
				t[0].style[ionic.CSS.TRANSFORM] = "translate3d(0, 0, 0)", t[0].style.opacity = "1", t[1].style[ionic.CSS.TRANSFORM] = "translate3d(0, 0, 0)", t[1].style.opacity = "1", e[0].body.querySelector(".tabs-index").style.display = "-webkit-flex"
			}), a.bind("scroll", function(e) {
				if (!(e.detail.target.scrollHeight < t.devHeight + 50)) {
					var p = null;
					e.detail ? p = e.detail.scrollTop : e.target && (p = e.target.scrollTop);
					var m = p - l;
					l = p;
					var h = r.headerShrink,
						g = a[0].querySelector(h),
						f = g.getBoundingClientRect().top + g.offsetHeight - t.devHeight + 150;
					m > 0 && p > f ? d || (n.$emit("scrollAnchorUp"), d = !0, u = !1) : 0 > m && f > p && (u || (n.$emit("scrollAnchorDown"), u = !0, d = !1)), 0 > p || 0 == m || m > 0 && o == c || 0 > m && 0 == o || i(s, m, c)
				}
			})
		}
	}
}]).directive("iframeOnLoad", function() {
	return {
		restrict: "A",
		scope: {
			callBack: "&iframeOnLoad"
		},
		link: function(e, t) {
			t.on("load", function() {
				var o = t[0].contentDocument || t[0].contentWindow.document;
				return o = o.getElementsByTagName("body")[0].innerHTML, e.callBack({
					content: o
				})
			})
		}
	}
}).directive("linked", ["$document", "currentScope", function(e, t) {
	return function(e, o, i) {
		var n = i.linked;
		o.on("click", function() {
			t.activeModal() ? t.activeModal().querySelector("#" + n).click() : t.activeView() && t.activeView().querySelector("#" + n).click()
		})
	}
}]).directive("focusMe", ["$timeout", function(e) {
	function t(t, o) {
		e.cancel(n), n = e(function() {
			t.focus()
		}, o || 500)
	}

	function o(e, o) {
		o.name === this.name && t(this.element[0], 760)
	}

	function i() {
		delete this.element
	}
	var n = null;
	return {
		require: "?^modalLayer",
		link: function(e, n, a, r) {
			if (r) {
				var s = {
					name: r.name,
					element: n
				};
				e.$on("modalLayer.show", o.bind(s)), e.$on("$destroy", i.bind(s))
			} else t(n[0])
		}
	}
}]).directive("myTouchStart", [function() {
	return function(e, t, o) {
		t.on("touchstart", function() {
			e.$apply(function() {
				e.$eval(o.myTouchStart)
			})
		})
	}
}]).directive("myTouchEnd", [function() {
	return function(e, t, o) {
		t.on("touchend", function() {
			e.$apply(function() {
				e.$eval(o.myTouchEnd)
			})
		})
	}
}]).directive("backToRoot", ["setBackViewHome", function(e) {
	return function() {
		e()
	}
}]).directive("storyExpand", ["$document", "$ionicSlideBoxDelegate", "CONFIG", "modal", "currentScope", function(e, t, o, i, n) {
	function a(e, t) {
		this.scope = t, this.selected = 0
	}
	var r = e[0].head || e[0].getElementsByTagName("head")[0],
		s = !1;
	if (r.querySelectorAll("style").length > 1 && angular.forEach(r.querySelectorAll("style"), function(e) {
			e.innerHTML.indexOf("[story-expand]") > -1 && (s = !0)
		}), !s) {
		var c = parseInt(o.hImgPd) - 20 + "px",
			l = "72px",
			d = document.createElement("style");
		r.appendChild(d), d.innerHTML = "[story-expand] [ng-repeat] {height:" + l + "} [story-expand] .expanded {height:" + c + "}"
	}
	return a.prototype.expand = function(e) {
		this.selected == e && (i.getModal("modalStory").show(), t.$getByHandle("story-card-slider").slide(e, 0)), this.selected = e
	}, {
		restrict: "EAC",
		replace: !1,
		scope: !0,
		compile: function(e) {
			for (var t = 0, o = e.length; o > t; ++t) {
				var i = e[t].querySelector("[ng-repeat]");
				if (i) {
					var r = i.getAttribute("ng-click");
					i.setAttribute("ng-class", "{expanded:$index===__expand.selected}"), i.setAttribute("ng-click", "__expand.expand($index, $event);" + r)
				}
			}
			return {
				pre: function(e) {
					e.__expand = new a(0, e), n.ready(e, function() {
						n.get().$on("storySlideChange", function(t, o) {
							e.__expand.selected = o, t.stopPropagation()
						})
					})
				}
			}
		}
	}
}]).directive("elastic", ["$window", "$document", "$timeout", function(e, t, o) {
	var i = angular.element("<div></div>").css({
		position: "absolute",
		top: "-10000px",
		left: "-10000px",
		whiteSpace: "pre-wrap"
	});
	return angular.element(t[0].body).append(i), {
		require: "ngModel",
		link: function(t, n) {
			o(function() {
				var t, o, a = n[0].offsetHeight,
					r = e.getComputedStyle(n[0]),
					s = ["width", "boxSizing", "paddingTop", "paddingRight", "paddingBottom", "paddingLeft", "borderTopWidth", "borderRightWidth", "borderBottomWidth", "borderLeftWidth", "lineHeight"],
					c = {},
					l = "";
				angular.forEach(s, function(e) {
					c[e] = r[e]
				}), i.css(c), n.on("keyup", function() {
					t = n.val().replace(/\n$/g, "\n.") + l, i.text(t), o = Math.max(i[0].offsetHeight, a), n.css("height", o + "px")
				})
			})
		}
	}
}]).directive("keyboardAttachUpdate", function() {
	return function(e, t) {
		function o(e) {
			if (!ionic.Platform.isAndroid() || ionic.Platform.isFullScreen) {
				var o = e.keyboardHeight;
				console.log(o + "------------------"), ionic.Platform.isIOS() && (226 == o && (o = 262), 216 == o && (o = 252)), t.css("bottom", o + "px"), n = t.controller("$ionicScroll"), n && (n.scrollView.__container.style.bottom = o + "px")
			}
		}

		function i() {
			(!ionic.Platform.isAndroid() || ionic.Platform.isFullScreen) && (t.css("bottom", ""), n && (n.scrollView.__container.style.bottom = ""))
		}
		ionic.on("native.keyboardshow", o, window), ionic.on("native.keyboardhide", i, window), ionic.on("native.showkeyboard", o, window), ionic.on("native.hidekeyboard", i, window);
		var n;
		e.$on("$destroy", function() {
			ionic.off("native.keyboardshow", o, window), ionic.off("native.keyboardhide", i, window), ionic.off("native.showkeyboard", o, window), ionic.off("native.hidekeyboard", i, window)
		})
	}
}).directive("imeNext", function() {
	function e(e) {
		if (13 === e.keyCode) {
			var t = e.target.getAttribute("ime-next");
			if ("$submit" === t) {
				var o = e.target.form.querySelector("[type='submit']");
				o && o.click()
			} else {
				var i = document.querySelectorAll("[ime-focus-id='" + t + "']");
				if (1 !== i.length) throw new TypeError("ime-next属性值没的对应或对应多个ime-focus-id:" + t);
				i[0].focus()
			}
			e.preventDefault()
		}
	}
	return {
		restrict: "A",
		link: function(t, o, i) {
			i.imeNext && o.on("keypress", e)
		}
	}
}).directive("ignoreBouncing", function() {
	return {
		restrict: "A",
		require: "^ionSlideBox",
		link: function(e, t, o, i) {
			i.__slider.ignoreBuffer()
		}
	}
}).directive("preventEvent", ["$ionicGesture", "$timeout", function(e, t) {
	function o(e) {
		for (var t = 0, o = e.length; o > t; ++t)
			if (e[t]) return !0;
		return !1
	}

	function i(e) {
		return !e || e.__slider.selected() === e.slidesCount() - 1
	}

	function n(e) {
		return !e || 0 === e.__slider.selected()
	}

	function a(e) {
		return !e || !e.optionsContainer || !e.optionsContainer.length || Math.abs(parseFloat(e.$element[0].querySelector(".item-content").style.webkitTransform.slice(12) || 0)) >= Math.floor(e.optionsContainer[0].getBoundingClientRect().width)
	}

	function r(e) {
		return !e || !e.optionsContainer || !e.optionsContainer.length || 0 == Math.abs(parseFloat(e.$element[0].querySelector(".item-content").style.webkitTransform.slice(12) || 0))
	}
	return {
		restrict: "A",
		require: ["^?ionSlideBox", "^?ionItem", "^?ionList"],
		link: function(s, c, l, d) {
			function u(e) {
				f || e.stopPropagation(), y && (f = i(d[0]) && a(d[1]), y = !1)
			}

			function p(e) {
				f || e.stopPropagation(), y && (f = n(d[0]) && r(d[1]), y = !1)
			}

			function m(e) {
				e.stopPropagation()
			}

			function h(e) {
				var t = e.gesture.direction;
				"right" !== t && "left" !== t || f || e.stopPropagation()
			}

			function g() {
				y = !0
			}
			if (o(d)) {
				var f = !1,
					y = !0;
				t(function() {
					!d[0] && d[2] && (c = angular.element(d[2].listView.el)), e.on("drag", h, c), e.on("dragleft", u, c), e.on("dragright", p, c), e.on("swipeleft", m, c), e.on("swiperight", m, c), e.on("release", g, c)
				})
			}
		}
	}
}]).directive("exitApp", ["$rootScope", "$ionicPlatform", "$timeout", "$ionicHistory", function(e, t, o, i) {
	return {
		restrict: "A",
		link: function(n, a, r) {
			function s() {
				d = !1
			}
			if (!e.user.isIOS) {
				var c = r.exitApp || "再按一次退出app",
					l = parseFloat(r.exitSpanTime) || 1500,
					d = !1,
					u = null;
				n.$on("$destroy", function() {
					u()
				}), n.$on("$ionicView.leave", function() {
					u()
				}), n.$on("$ionicView.enter", function(e, n) {
					u = t.registerBackButtonAction(function(e) {
						i.currentView().stateName === n.stateName && (e.preventDefault(), d ? (console.log("exit"), ionic.Platform.exitApp()) : JAlert.showOnce(c), d = !0, o(s, l))
					}, 101)
				})
			}
		}
	}
}]).directive("contenteditable", function() {
	return {
		restrict: "A",
		require: "?ngModel",
		link: function(e, t, o, i) {
			function n() {
				a && (t[0].innerHTML = t[0].innerText, a = !1)
			}
			i && (i.$render = function() {
				t[0].innerText = i.$viewValue
			}), t.on("click", n), t.on("blur", n);
			var a = !1;
			t[0].addEventListener("input", function() {
				a = !0, i && i.$setViewValue(t[0].innerText)
			})
		}
	}
}).directive("headerBarClass", ["viewElement", "$cordovaStatusbar", function(e, t) {
	var o = e.currentNavBar().parentElement.classList;
	return {
		restrict: "A",
		link: function(e, i, n) {
			e.$on("$ionicView.beforeEnter", function() {
				o.add(n.headerBarClass), window.cordova && t.style(1)
			}), e.$on("$ionicView.beforeLeave", function() {
				o.remove(n.headerBarClass), window.cordova && t.style(0)
			})
		}
	}
}])