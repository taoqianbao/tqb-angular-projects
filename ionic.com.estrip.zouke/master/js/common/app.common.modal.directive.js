angular.module("app.common.modal.directive", []).directive("loadModal", ["$ionicModal", "$rootScope", "$timeout", "$document", "_modalUtil", "modal", "CONFIG", "currentScope", "$ionicGesture", "statusBar", "$ionicSlideBoxDelegate", function(e, t, o, i, n, a, r, s, c, l, d) {
	function u() {
		this._lock = !1, this._direction = "", this._preDirection = "", this._preOffset = 0, this._translate = 400
	}

	function p(e) {
		if (this.canDrag) {
			var t = e.gesture.deltaY;
			this.preDirection = t - this.preY > 0 ? "down" : "up", this.preY = t, d.enableSlide(!1), this.scope.dragData.setDrag2(a.getModal(this.name), e.gesture)
		} else this.dragTriggerTime < 2 && (this.preY = e.gesture.deltaY, ++this.dragTriggerTime, Math.abs(this.preY) > 1 && ("up" === e.gesture.direction || "down" === e.gesture.direction) && (this.canDrag = !0))
	}

	function m() {
		if (this.canDrag) {
			d.enableSlide(!0), this.canDrag = !1;
			var e = a.getModal(this.name);
			this.scope.dragData.release2(e, this.preDirection)
		}
		this.dragTriggerTime = 0
	}

	function h(e) {
		if (!e.__binded) {
			e.__binded = !0;
			var t = angular.element(e.modalEl);
			c.on("drag", p.bind(this), t), c.on("release", m.bind(this), t)
		}
	}

	function g(e, t) {
		var o = a.getModalName(t); - 1 !== this.blurNameList.indexOf(o) && t.modalEl.parentElement.parentElement.firstElementChild.classList.add("blur")
	}

	function f(e, t) {
		var o = a.getModalName(t); - 1 !== this.blurNameList.indexOf(o) && t.modalEl.parentElement.parentElement.firstElementChild.classList.remove("blur")
	}

	function y(e, t) {
		-1 !== this.hideBarNameList.indexOf(a.getModalName(t)) && ionic.Platform.ready(function() {
			l.show()
		})
	}

	function _(e, t) {
		-1 !== this.hideBarNameList.indexOf(a.getModalName(t)) && ionic.Platform.ready(function() {
			l.hide()
		})
	}
	var v = n;
	u.prototype.release2 = function(e, t) {
		var o = e.modalEl;
		this._lock = !1, o.style.webkitTransition = "", o.style.transition = "", ("up" === t && this._preOffset < -.2 || "down" === t && this._preOffset > .2) && e.hide(), this._preOffset = 0, ionic.requestAnimationFrame(function() {
			o.style.webkitTransform = "", o.style.transform = "", o.style.opacity = ""
		})
	}, u.prototype.release = function(e) {
		this._lock = !1, e.style.webkitTransition = "", e.style.transition = "", e.style.webkitTransform = "", e.style.transform = ""
	}, u.prototype.clear = function() {
		this._direction = "", this._preDirection = ""
	}, u.prototype.directionMaps = {
		left: "h",
		right: "h",
		up: "v",
		down: "v"
	}, u.prototype.setDrag2 = function(e, t) {
		var o = e.modalEl;
		if (!this._lock) {
			this._lock = !0, this._preOffset = 0, o.style.webkitTransition = "none", o.style.transition = "none", this._preClass = e.animation;
			var i = o.getBoundingClientRect();
			t.center.pageX > (i.left + i.right) / 2 ? (this._deg = 30, this._class = "round-left-", a.changeAnimation(e, this._class + "up")) : (this._deg = -30, this._class = "round-right-", a.changeAnimation(e, this._class + "up"))
		}
		a.changeAnimation(e, this._class + (t.deltaY > 0 ? "down" : "up"));
		var n = this._preOffset = t.deltaY / this._translate / 1.5;
		n > 1 ? n = 1 : -1 > n && (n = -1);
		var r = "rotateZ(" + this._deg * n + "deg) translate3D(0,0,0)";
		ionic.requestAnimationFrame(function() {
			o.style.webkitTransform = r, o.style.transform = r, o.style.opacity = 1 - Math.abs(n)
		})
	}, u.prototype.setDrag = function(e, t, o) {
		if (this._lock || (this._lock = !0, this._preOffset = 0, this._direction = t.direction, this._preDirection = "", e.style.webkitTransition = "none", e.style.transition = "none"), this.directionMaps[o] === this.directionMaps[this._direction]) {
			var i = "";
			switch (this._direction) {
				case "left":
				case "right":
					t.deltaX !== this._preOffset && (this._preDirection = t.deltaX > this._preOffset ? "right" : "left", this._preOffset = t.deltaX), i = "translate3d(" + t.deltaX + "px,0,0)";
					break;
				case "down":
				case "up":
					t.deltaY !== this._preOffset && (this._preDirection = t.deltaY > this._preOffset ? "down" : "up", this._preOffset = t.deltaY), i = "translate3d(0," + (t.deltaY < 0 ? "0" : t.deltaY) + "px,0)"
			}
			e.style.webkitTransform = i, e.style.transform = i
		}
	}, u.prototype.getDirection = function() {
		return this._direction
	}, u.prototype.getPreDirection = function() {
		return this._preDirection
	}, u.prototype.getOffset = function() {
		return this._preOffset
	};
	({
		h: .1 * r.devWidth,
		v: .1 * r.devHeight
	});
	return {
		restrict: "A",
		replace: !1,
		priority: 100,
		scope: {
			urlList: "=loadModal",
			nameList: "=modalName",
			directionList: "=modalSlideDirection",
			removeLeaveList: "=modalRemoveLeave",
			dragHide: "=modalDragHide",
			blur: "=modalBlurView",
			hideStatusBar: "=modalHideStatusbar"
		},
		controller: angular.noop,
		require: "^ionView",
		compile: function() {
			return {
				pre: function(e) {
					{
						var t = e.templateUrlList = v.parseJson(e.urlList),
							o = e.modalNameList = v.parseJson(e.nameList || []),
							i = e.slideDirectionList = v.parseJson(e.directionList || []),
							n = e.removeLeave = v.parseJson(e.removeLeaveList || []);
						e.dragList = v.parseJson(e.dragHide || []), e.blurList = v.parseJson(e.blur || []), e.hideStatusBarList = v.parseJson(e.hideStatusBar || [])
					}
					t && s.ready(e).then(function() {
						for (var e = 0, r = t.length; r > e; ++e) a.createModalImmediately(o[e] || (o[e] = "modal" + e), t[e], i[e] || (i[e] = "up"), -1 !== n.indexOf(o[e]))
					})
				},
				post: function(e, t) {
					s.ready(e).then(function() {
						e.dragData = new u, a.bind(function(t) {
							if ("enter" === t)
								for (var o = 0, i = e.dragList.length; i > o; ++o) a.getModalPromise(e.dragList[o]).then(h.bind({
									scope: e,
									name: e.dragList[o]
								}))
						}), e.blurList.show = [];
						var o = {
							element: t[0],
							blurNameList: e.blurList,
							hideBarNameList: e.hideStatusBarList
						};
						e.$on("modal.shown", g.bind(o)), e.$on("modal.hidden", f.bind(o)), e.$on("modal.shown", _.bind(o)), e.$on("modal.hidden", y.bind(o))
					})
				}
			}
		}
	}
}]).directive("modalLayerList", function() {
	function e(e) {
		this._scope = e
	}
	return e.$inject = ["$scope"], e.prototype.getDefaultLayerName = function() {
		return this._scope["default"]
	}, {
		restrict: "E",
		replace: !1,
		scope: {
			"default": "=default"
		},
		controller: e,
		link: function() {}
	}
}).directive("modalLayer", ["mHistory", function(e) {
	function t(t) {
		e.__destroy(t.currentScope.layerName)
	}

	function o(e) {
		this.__name = e.layerName
	}
	return o.$inject = ["$scope"], Object.defineProperty(o.prototype, "name", {
		get: function() {
			return this.__name
		}
	}), {
		restrict: "E",
		replace: !1,
		controller: o,
		scope: {
			layerName: "@name"
		},
		require: "^?modalLayerList",
		compile: function(o) {
			return o.addClass("modal-layer hide"), {
				pre: function(o, i, n, a) {
					if (e.__init(i[0]), o.$on("$destroy", t), a) {
						var r = a.getDefaultLayerName();
						r && r === o.layerName && e.go(r, i[0])
					}
				}
			}
		}
	}
}]), 
