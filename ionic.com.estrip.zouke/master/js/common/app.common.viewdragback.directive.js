
angular.module("app.common.viewdragback.directive", []).directive("dragBack", ["viewElement", "$timeout", "$ionicGesture", "$ionicScrollDelegate", "CONFIG", "$ionicHistory", "$rootScope", "$cordovaKeyboard", function(e, t, o, i, n, a, r, s) {
	function c() {
		!c.ign && window.cordova && s.isVisible() && s.close()
	}

	function l() {
		c.ign = !0
	}

	function d() {
		c.ign = !1
	}

	function u(e) {
		var t = e.querySelector("ion-content");
		t && (t = angular.element(t));
		var i = angular.element(e.querySelectorAll("input,textarea,[contenteditable=true]"));
		t && o.on("scroll", c, t), i && i.on("focus", l), t && o.on("drag", d, t)
	}
	var p = {
		init: function() {
			this.dragTriggerTime = 0, this.canDrag = !1, this.currentNavBar_title = e.currentNavBar().querySelector(".title");
			var o = this;
			t(function() {
				o.currentNavBar_rBtn = e.currentNavBar().querySelector(".buttons-right") || {
					style: {}
				}, o = null
			}, 400)
		},
		destroy: function() {
			delete this.backView, delete this.currentNavBar_title, delete this.currentNavBar_rBtn
		},
		handleEvent: function(e) {
			switch (e.type) {
				case "drag":
					this.drag(e);
					break;
				case "release":
					this.release(e);
					break;
				case "wekbitTransitionEnd":
				case "transitionend":
					this.transitionend(e)
			}
		},
		transitionend: function(e) {
			e.currentTarget === e.target && -1 !== e.propertyName.indexOf("ransform") && (this.backView ? (e.currentTarget.style.webkitTransition = "", this.backView.style.display = "", this.backView.style.webkitTransition = "", this.backView.style.webkitTransform = this.backView.__p, delete this.backView.__p, delete this.backView) : this.currentNavBar_rBtn.style.opacity = "", this.currentNavBar_title.style.opacity = "")
		},
		drag: function(t) {
			if (!this.canDrag && this.dragTriggerTime < 1 && (this.preX = t.gesture.deltaX, ++this.dragTriggerTime, !this.dragPremission && t.gesture.touches[0].clientX < 50 && (this.dragPremission = !0), this.preX > 1 && "right" === t.gesture.direction && this.dragPremission)) {
				this.canDrag = !0, i.freezeAllScrolls(!0);
				var o = this.backView = e.back();
				o && (o.style.display = "block", o.__p = o.style.webkitTransform, o.style.webkitTransform = "translate3d(0,0,0)"), this.currentNavBar_title.style.webkitTransition = "none", this.currentNavBar_rBtn.style.webkitTransition = "none"
			}
			if (this.canDrag) {
				var a = t.gesture.deltaX;
				this.preDirection = a - this.preX > 0 ? "right" : "left", this.preX = a, 0 > a && (a = 0), t.currentTarget.style.webkitTransform = "translate3d(" + a + "px,0,0)", this._t = ionic.requestAnimationFrame(function() {
					this.currentNavBar_title.style.webkitTransform = "translate3d(" + a / 2 + "px,0,0)", this.currentNavBar_title.style.opacity = 1 - a / 2 / n.devWidth, this.currentNavBar_rBtn.style.opacity = 1 - a / n.devWidth
				}.bind(this))
			}
		},
		release: function(e) {
			if (this.canDrag) {
				if (i.freezeAllScrolls(!1), ionic.cancelAnimationFrame(this._t), this.canDrag = !1, e.gesture.deltaX > 100 && "right" === this.preDirection && angular.element(e.currentTarget).scope().$broadcast("view.dragBack.start").defaultPrevented === !1) {
					if (this.currentNavBar_title.style.webkitTransition = "", this.currentNavBar_rBtn.style.webkitTransition = "", this.backView) {
						delete this.backView.__p;
						var t = this;
						ionic.requestAnimationFrame(function() {
							t.backView.style.display = "", delete t.backView, t = null
						})
					}
					a.goBack()
				} else e.currentTarget.style.webkitTransition = this.currentNavBar_title.style.webkitTransition = this.currentNavBar_rBtn.style.webkitTransition = "all " + 10 * Math.sqrt(e.gesture.deltaX) + "ms ease-out", e.currentTarget.style.webkitTransform = this.currentNavBar_title.style.webkitTransform = "translate3d(0,0,0)";
				delete this.preDirection, delete this.preX
			}
			this.dragTriggerTime = 0, this.dragPremission = !1
		}
	};
	return {
		restrict: "A",
		replace: !1,
		compile: function(e) {
			return t(function() {
				u(e[0])
			}, 100), r.user.isAndroid ? void 0 : {
				pre: function(e, t) {
					var i = Object.create(p);
					i.init();
					var n, a;
					e.$on("$ionicView.afterEnter", function() {
						n = o.on("drag", i, t), a = o.on("release", i, t), t[0].addEventListener("wekbitTransitionEnd", i), t[0].addEventListener("transitionend", i)
					}), e.$on("$ionicView.beforeLeave", function() {
						o.off(n, "drag"), o.off(a, "release"), t[0].removeEventListener("wekbitTransitionEnd", i), t[0].removeEventListener("transitionend", i)
					}), e.$on("$destroy", function() {
						i.destroy()
					})
				}
			}
		}
	}
}])