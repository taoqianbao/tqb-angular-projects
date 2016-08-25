angular.module("app.base.directive", []).directive("fixTabsAnimation", ["$document", "$rootScope", "$state", "$timeout", "$ionicHistory", function(e, t, o, i, n) {
	var a = e[0].querySelector(".tabs-index"),
		r = ["app.journeyHome", "app.mallHome", "app.mapHome"];
	return {
		restrict: "A",
		link: function(t) {
			t.$on("$ionicView.beforeLeave", function() {
				-1 == r.indexOf(n.currentView().stateName) && (angular.forEach(e[0].querySelectorAll(".bar.bar-header"), function(e) {
					e.classList.remove("hide")
				}), a.classList.add("inactive"))
			}), t.$on("$ionicView.beforeEnter", function() {
				a.classList.remove("inactive")
			})
		}
	}
}])