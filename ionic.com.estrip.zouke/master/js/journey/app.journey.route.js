angular.module("app.journey.route", []).config(["$stateProvider", "$urlRouterProvider", "$locationProvider", "PERMISSIONS", function(e, t, o, i) {
	o.html5Mode(!1), t.otherwise("/journeyHome"), e.state("app.journeyHome", {
		url: "/journeyHome",
		cache: !0,
		templateUrl: "app/journey/templates/journeyHome.html",
		controller: "journeyHomeCtrl"
	}).state("app.journeyList", {
		url: "/journeyList/:type/:option/:filter/:title",
		cache: !0,
		templateUrl: "app/journey/templates/journeyList.html",
		controller: "journeyListCtrl"
	}).state("app.journeyDetail", {
		url: "/journeyDetail/:id",
		cache: !0,
		templateUrl: "app/journey/templates/journeyDetail.html",
		controller: "journeyDetailCtrl"
	}).state("app.journeyDiy", {
		url: "/journeyDiy/:type/:id/",
		cache: !0,
		templateUrl: "app/journey/templates/journeyDiy.html",
		controller: "journeyDiyCtrl",
		data: {
			permission: i.needSignIn
		}
	})
}])