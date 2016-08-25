angular.module("app.common.pushup.directive", []).directive("pushUp", ["$ionicGesture", "$ionicScrollDelegate", function(e, t) {
	function o(e) {
		switch (e.type) {
			case "drag":
				i.call(this, e);
				break;
			case "release":
				n.call(this, e)
		}
	}

	function i(e) {
		this._eventStackData.__dragNum < 3 && ++this._eventStackData.__dragNum, 2 === this._eventStackData.__dragNum && (this._eventStackData.eHeight || this._eventStackData.__init(), this._eventStackData.__animation(!1), this._eventStackData.__scroll = "up" === e.gesture.direction || "down" === e.gesture.direction ? !0 : !1), this._eventStackData.__scroll && (e.gesture.deltaY < this._eventStackData.__preDeltaY || 0 === t.$getByHandle(this.handle).getScrollPosition().top ? (this._eventStackData.__continue = !0, this._eventStackData.scrollHeight = this._eventStackData.scrollHeight + (this._eventStackData.__preDeltaY - e.gesture.deltaY)) : this._eventStackData.__continue = !1), this._eventStackData.__pre3DeltaY = this._eventStackData.__prepreDeltaY, this._eventStackData.__pre3Time = this._eventStackData.__prepreTime, this._eventStackData.__prepreDeltaY = this._eventStackData.__preDeltaY, this._eventStackData.__prepreTime = this._eventStackData.__preTime, this._eventStackData.__preDeltaY = e.gesture.deltaY, this._eventStackData.__preTime = e.gesture.timeStamp
	}

	function n() {
		if (this._eventStackData.__continue && this._eventStackData.__prepreTime) {
			var e = (this._eventStackData.__preDeltaY - this._eventStackData.__pre3DeltaY || this._eventStackData.__prepreDeltaY) / (this._eventStackData.__preTime - this._eventStackData.__pre3Time || this._eventStackData.__prepreTime),
				t = .01,
				o = Math.abs(e / t);
			this._eventStackData.__animation(!0, o);
			var i = .5 * t * o * o * (e > 0 ? 1 : -1);
			i && (this._eventStackData.scrollHeight -= i)
		}
		this._eventStackData.__pre3DeltaY = this._eventStackData.__pre3Time = this._eventStackData.__preDeltaY = this._eventStackData.__prepreDeltaY = this._eventStackData.__preTime = this._eventStackData.__prepreTime = null, this._eventStackData.__scroll = !1, this._eventStackData.__dragNum = 0, this._eventStackData.__preDeltaY = 0, this._eventStackData.__continue = !1
	}
	return {
		restrict: "EAC",
		replace: !1,
		scope: {
			handle: "=scrollHandle",
			scroll: "=onScroll"
		},
		compile: function() {
			return {
				pre: function(i, n, a) {
					i._eventStackData = {
						pushHeight: parseFloat(a.pushHeight),
						_scrollHeight: 0,
						get scrollHeight() {
							return this._scrollHeight
						},
						set scrollHeight(e) {
							0 > e && (e = 0), e > this.pushHeight && (e = this.pushHeight), e === this.pushHeight ? (n[0].classList.add("top"), i.$emit("userHome:stickUp")) : (n[0].classList.remove("top"), i.$emit("userHome:stickCancel")), this._scrollHeight = e, i.scroll && i.scroll(e);
							var t = "translate3D(0," + -e + "px,0)";
							ionic.requestAnimationFrame(function() {
								n[0].style.webkitTransform = t, n[0].style.transform = t
							})
						},
						eHeight: 0,
						__init: function() {
							this.eHeight = n[0].getBoundingClientRect().height, n[0].style.height = this.eHeight + this.pushHeight + "px", t.$getByHandle(i.handle).resize()
						},
						__animation: function(e, t) {
							e ? (n[0].classList.add("animation"), n[0].style.webkitTransitionDuration = t + "ms", n[0].style.transitionDuration = t + "ms") : n[0].classList.remove("animation")
						},
						__dragNum: 0,
						__preDeltaY: 0
					}, i.handleEvent = o, e.on("drag", i, n), e.on("release", i, n)
				}
			}
		}
	}
}])