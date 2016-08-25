

angular.module("app.common.slideup.directive", []).directive("slideUp", function() {
	return {
		restrict: "EAC",
		replace: !1,
		scope: !0,
		compile: function(e) {
			e.bind("click", function(t) {
				-1 !== Array.prototype.indexOf.call(e, t.target)
			});
			for (var t = 0, o = e.length; o > t; ++t) e[t].innerHTML = "<ion-content class='wrap' on-drag-down=\"$emit('slideUp.hide.trigger')\">" + e[t].innerHTML + "</ion-content>";
			return {
				pre: function(e, t) {
					e._slideUpData = {}, e._slideUpData.id = t[0].getAttribute("slide-up-id"), t[0].addEventListener("click", function(o) {
						o.target === t[0] && e.$emit("slideUp.hide.trigger")
					}), e.$on("slideUp.show", function(o, i) {
						(null === e._slideUpData.id || e._slideUpData.id === i) && t[0].classList.add("active")
					}), e.$on("slideUp.hide", function() {
						t[0].classList.remove("active")
					})
				}
			}
		}
	}
}).directive("slideUpBlur", function() {
	return {
		restrict: "EAC",
		replace: !1,
		link: function(e, t) {
			e.$on("slideUp.show", function() {
				t.css("-webkit-filter", "blur(5px)")
			}), e.$on("slideUp.hide", function() {
				t.css("-webkit-filter", "")
			})
		}
	}
}).directive("slideUpTrigger", function() {
	return {
		restrict: "EAC",
		replace: !1,
		link: function(e) {
			e.$on("slideUp.show.trigger", function(t, o) {
				t.stopPropagation(), e.$broadcast("slideUp.show", o)
			}), e.$on("slideUp.hide.trigger", function(t) {
				t.stopPropagation(), e.$broadcast("slideUp.hide")
			})
		}
	}
})