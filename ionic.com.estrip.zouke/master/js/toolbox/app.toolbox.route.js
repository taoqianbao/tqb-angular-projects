angular.module("app.toolbox.route", []).config(["$stateProvider", "$urlRouterProvider", "$locationProvider", "PERMISSIONS", function(e, t, o) {
	o.html5Mode(!1), t.otherwise("/journeyHome"), e.state("app.toolboxHome", {
		url: "/toolboxHome",
		cache: !0,
		templateUrl: "app/toolbox/templates/toolboxHome.html",
		controller: "toolboxHomeCtrl"
	}).state("app.toolboxTraffic", {
		url: "/toolboxTraffic",
		cache: !0,
		templateUrl: "app/toolbox/templates/trafficSearch.html",
		controller: "trafficSearchCtrl"
	})
}])