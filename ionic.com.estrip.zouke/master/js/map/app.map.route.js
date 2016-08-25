angular.module("app.map.route", []).config(["$stateProvider", "$urlRouterProvider", "$locationProvider", "PERMISSIONS", function(e) {
	e.state("app.mapHome", {
		url: "/mapHome",
		cache: !0,
		templateUrl: "app/map/templates/mapHome.html",
		controller: "mapHomeCtrl"
	}).state("app.map", {
		url: "/map/:type/:uuid",
		cache: !0,
		templateUrl: "app/map/templates/map.html",
		controller: "mapGeneralCtrl"
	}).state("app.mapAddress", {
		url: "/mapAddress",
		cache: !1,
		templateUrl: "app/map/templates/mapAddress.html",
		controller: "mapAddressCtrl"
	}).state("app.mapRoute", {
		url: "/route/:lat/:lng",
		cache: !1,
		templateUrl: "app/map/templates/route.html",
		controller: "routeCtrl"
	}).state("app.mapAdd", {
		url: "/mapAdd",
		cache: !1,
		templateUrl: "app/map/templates/mapAdd.html",
		controller: "mapAddCtrl"
	})
}])