angular.module("app.poi.route", []).config(["$stateProvider", "$urlRouterProvider", "$locationProvider", "PERMISSIONS", function(e, t, o, i) {
	e.state("app.poiDetail", {
		url: "/poiDetail/:id/:journeyId/:title",
		cache: !0,
		templateUrl: "app/poi/templates/poiDetail.html",
		controller: "poiDetailCtrl"
	}).state("app.poiList", {
		url: "/poiList/:type/:option/:filter/:title",
		cache: !0,
		templateUrl: "app/poi/templates/poiList.html",
		controller: "poiListCtrl"
	}).state("app.postcardList", {
		url: "/postcardList/:id",
		cache: !0,
		templateUrl: "app/poi/templates/postcardList.html",
		controller: "postcardListCtrl"
	}).state("app.poiIntro", {
		url: "/poiIntro/:id",
		cache: !1,
		templateUrl: "app/poi/templates/poiIntro.html",
		controller: "poiIntroCtrl"
	}).state("app.newStory", {
		url: "/newStory/:type/:id/:title",
		cache: !1,
		templateUrl: "app/poi/templates/newStory.html",
		controller: "newStoryCtrl",
		data: {
			permission: i.needSignIn
		}
	})
}])