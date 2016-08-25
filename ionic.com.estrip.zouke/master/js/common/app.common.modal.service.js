angular.module("app.common.modal.service", []).factory("_modalUtil", function() {
	function e(e, t) {
		return e.startsWith ? e.startsWith(t) : e.slice(0, t.length) === t
	}

	function t(e, t) {
		return e.endsWith ? e.endsWith(t) : e.slice(-t.length) === t
	}

	function o(i, n) {
		return o.unwrapperSuccess = !1, i = i.trim(), e(i, n[0]) && (i = i.slice(n[0].length), o.unwrapperSuccess = !0), t(i, n[1]) && (i = i.slice(0, -n[1].length), o.unwrapperSuccess = !0), i
	}

	function i(e) {
		e = o(e, ["[", "]"]);
		for (var t = e.split(","), i = 0, n = t.length, a = ""; n > i; ++i) a = o(t[i], ["'", "'"]), o.unwrapperSuccess || (a = o(t[i], ['"', '"'])), t[i] = "true" === a || "false" === a ? a : '"' + a + '"';
		return "[" + t.join(",") + "]"
	}
	return o.unwrapperSuccess = !1, {
		parseJson: function(e) {
			return angular.isString(e) ? JSON.parse(i(e)) : e
		},
		arrayRemove: function(e, t) {
			var o = e.indexOf(t); - 1 !== o && e.splice(o, 1)
		}
	}
}).factory("modal", ["$rootScope", "currentScope", "$ionicModal", function(e, t, o) {
	function i(e) {
		e.remove()
	}

	function n(e, t, o, i, n, a) {
		a = a === !1 ? !1 : !0, this.__name = e, this.__templateUrl = t, this.__direction = (c.indexOf(o) > -1 ? "slide-in-" : "") + o, this.__backclose = a, this.__removeLeave = i, this.__modalPromise = null, this.__modal = null, this.__enabled = !1, this._init(n)
	}

	function a(e) {
		var t = e.currentScope.__modal.list;
		if (t)
			for (var o = 0, i = t.length; i > o; ++o) t[o]._init(e.currentScope);
		for (var n = e.currentScope.__modal.bindFn, o = 0, i = n.length; i > o; ++o) n[o]("enter")
	}

	function r(e) {
		var t = e.currentScope.__modal.list;
		if (t)
			for (var o = 0, i = t.length; i > o; ++o) t[o].removeModalWhenViewLeave() && t[o]._destroy();
		for (var n = e.currentScope.__modal.bindFn, o = 0, i = n.length; i > o; ++o) n[o]("leave")
	}

	function s(e) {
		var t = e.currentScope.__modal.list;
		if (t)
			for (var o = 0, i = t.length; i > o; ++o) t[o]._destroy()
	}
	var c = ["left", "right", "up"];
	return n.prototype._init = function(e) {
		if (!this.__enabled) {
			var e = e || t.get();
			this.__enabled = !0, this.__modalPromise = o.fromTemplateUrl(this.__templateUrl, {
				scope: e,
				animation: this.__direction,
				hardwareBackButtonClose: this.__backclose
			});
			var i = this;
			this.__modalPromise.then(function(t) {
				i.__modal = t, t.__name = i.__name, i._triggerReadyEvent(e), i = null, e = null
			})
		}
	}, n.prototype.getModal = function() {
		return this.__modal
	}, n.prototype.getModalPromise = function() {
		return this.__modalPromise
	}, n.prototype.removeModalWhenViewLeave = function() {
		return this.__removeLeave
	}, n.prototype._destroy = function() {
		this.__enabled && (this.__modalPromise.then(i), this.__modal = null, this.__modalPromise = null, this.__enabled = !1)
	}, n.prototype._triggerReadyEvent = function(e) {
		var t = this.__name,
			o = this.__modal;
		e.$emit("modal.ready", t, o), e.$emit("modal.ready." + t, o)
	}, n.getModalName = function(e) {
		return e.__name
	}, {
		createModalImmediately: function(o, i, c, l, d, u) {
			u = u === !1 ? !1 : !0;
			var p = t.get(),
				m = d || p,
				h = d === e ? e : p;
			h.hasOwnProperty("__modal") || (h.__modal = {
				list: [],
				bind: !1,
				bindFn: []
			});
			var g = new n(o, i, c, l, m, u);
			return h.__modal.list.push(g), h.__modal.list[o] = g, d === e || h.__modal.bind || (h.$on("$ionicView.afterEnter", a), h.$on("$ionicView.beforeLeave", r), h.$on("$destroy", s), h.__modal.bind = !0), g.getModalPromise()
		},
		createModal: function(e, o, i, n, a, r) {
			var s = this.createModalImmediately;
			return t.ready(a, function() {
				var t = s(e, o, i, n, a, r);
				return s = null, t
			})
		},
		bind: function(e, o) {
			o = o || t.get(), o.hasOwnProperty("__modal") || (o.__modal = {
				list: [],
				bind: !1,
				bindFn: []
			}), o.__modal.bindFn.push(e)
		},
		createRootModal: function(t, o, i, n) {
			return this.createModalImmediately(t, o, i, n, e)
		},
		getModalName: function(e) {
			return n.getModalName(e)
		},
		_getModalData: function(o, i) {
			var n = t.get(),
				a = null;
			return i && i.__modal && (a = i.__modal.list[o]) ? a : n.__modal && (a = n.__modal.list[o]) ? a : e.__modal && (a = e.__modal.list[o]) ? a : null
		},
		_removeModalData: function(o, i) {
			i = i || t.get();
			var n = null;
			return i.__modal && (n = i.__modal.list[o]) ? (delete i.__modal.list[o], n) : e.__modal && (n = e.__modal.list[o]) ? (delete e.__modal.list[o], n) : null
		},
		getModal: function(e, t) {
			var o = this._getModalData(e, t);
			return o ? o.getModal() : null
		},
		getModalPromise: function(e, t) {
			var o = this._getModalData(e, t);
			return o ? o.getModalPromise() : null
		},
		destroyModal: function(e, t) {
			var o = this._getModalData(e, t);
			o && o._destroy()
		},
		reInitModal: function(e, t) {
			var o = this._getModalData(e, t);
			o && o._init(t)
		},
		removeModal: function(e, t) {
			var o = this._removeModalData(e, t);
			o && o._destroy()
		},
		contains: function(e, t) {
			return !!this._getModalData(e, t)
		},
		opWithNoAnimation: function(e, t) {
			if (angular.isString(e) && (e = this.getModal(e)), e) {
				t = t || "show";
				var o = e.animation;
				e.modalEl.classList.remove(o), e.animation = "", e[t]().then(function() {
					e.animation = o, e.modalEl.classList.add(o)
				})
			}
		},
		showWithNoAnimation: function(e) {
			this.opWithNoAnimation(e, "show")
		},
		hideWithNoAnimation: function(e) {
			this.opWithNoAnimation(e, "hide")
		},
		changeAnimation: function(e, t) {
			angular.isString(e) && (e = this.getModal(e)), e && t && t !== e.animation && (e.modalEl.classList.remove(e.animation), e.animation = t, e.modalEl.classList.add(e.animation))
		}
	}
}]).factory("mHistory", ["$timeout", "$rootScope", function(e, t) {
	function o(e, t) {
		return t = t || document.body, t.querySelector(".modal modal-layer.modal-layer[name='" + e + "']")
	}

	function i(e) {
		if (e.target === e.currentTarget) {
			var t = e.target.classList;
			t.contains("active") || t.add("hide"), e.stopPropagation()
		}
	}

	function n(e, o, i) {
		t.$broadcast("modalLayer.hide", {
			name: o,
			direction: i
		});
		for (var n = e.querySelectorAll("form"), a = 0, r = n.length; r > a; ++a) n[a].reset();
		e.classList.remove("active")
	}

	function a(o, i, n) {
		e(function() {
			o.classList.remove("hide"), t.$broadcast("modalLayer.show", {
				name: i,
				direction: n
			}), e(function() {
				o.classList.add("active")
			}, 50)
		}, 10)
	}
	var r = [],
		s = "";
	return {
		isEmpty: function() {
			return 0 === r.length
		},
		hasShow: function() {
			return !!s
		},
		goBack: function(e) {
			e = e || 1;
			var t = null;
			for (s && (t = o(s)) && n(t, s, "back"); e > 0 && r.length > 0;) s = r.pop(), s && (t = o(s)) && --e;
			t && a(t, s, "back")
		},
		go: function(e, t) {
			if (e && e !== s) {
				var i = r.indexOf(e),
					c = null;
				s && (c = o(s)) && (n(c, s, "forward"), r.push(s)), -1 !== i && (r.length = i), s = e, (c = t || o(s)) && a(c, s, "forward")
			}
		},
		clearHistory: function() {
			r = []
		},
		clear: function() {
			r = [];
			var e = o(s);
			e && e.classList.remove("active"), s = ""
		},
		__init: function(e) {
			e.addEventListener("transitionend", i), e.addEventListener("webkitTransitionEnd", i)
		},
		__destroy: function(e) {
			var t = r.indexOf(e);
			if (-1 !== t && r.splice(t, 1), e === s) {
				var i = o(s);
				i && i.classList.remove("active"), s = ""
			}
		}
	}
}]), 
