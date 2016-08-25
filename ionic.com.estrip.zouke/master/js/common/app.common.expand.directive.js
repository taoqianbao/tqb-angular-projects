angular.module("app.common.expand.directive", []).directive("expand2", ["CONFIG", "$state", "$ionicViewSwitcher", "$ionicScrollDelegate", "$timeout", function(e, t, o, i, n) {
	function a(e, t) {
		this.element = t, this.selected = 0, this._realSelected = 0
	}

	function r(e) {
		o.nextTransition("slidUp"), t.go("app.storyCard", {
			id: e
		})
	}

	function s(e) {
		this._realSelected = this.selected, e.target.hasAttribute("ng-repeat") && "height" === e.propertyName && e.target.classList.contains("expand") && this.gotoStoryCard()
	}
	var c = parseInt(e.hImgPd) - 20 + "px",
		l = "72px",
		d = document.head || document.getElementsByTagName("head")[0],
		u = document.createElement("style");
	return d.appendChild(u), u.innerHTML = "[expand] [ng-repeat]{height:" + l + "} [expand] .expand{height:" + c + "}", a.prototype.expand = function(e, t) {
		this.id = t.currentTarget.getAttribute("expand-card-id"), this.selected = e, this._realSelected === e && this.gotoStoryCard()
	}, a.prototype.gotoStoryCard = function() {
		var e = 50 - this.element.querySelectorAll("[ng-repeat]")[this.selected].getBoundingClientRect().top;
		if (0 === e) r(this.id);
		else {
			i.scrollTo(0, i.getScrollPosition().top - e, !0);
			var t = this.id;
			n(function() {
				r(t)
			}, 500)
		}
	}, {
		restrict: "EAC",
		replace: !1,
		scope: !0,
		compile: function(e) {
			for (var t = 0, o = e.length; o > t; ++t) {
				var i = e[t].querySelector("[ng-repeat]");
				i && (i.setAttribute("ng-class", "{expand:$index===__expand.selected}"), i.setAttribute("ng-click", "__expand.expand($index,$event)"))
			}
			return {
				pre: function(e, t) {
					e.__expand = new a(0, t[0]), t[0].addEventListener(ionic.CSS.TRANSITIONEND.split(" ")[0], s.bind(e.__expand), !0)
				}
			}
		}
	}
}]), 
