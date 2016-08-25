angular.module("app.postcard.route", []).config(["$stateProvider", "$urlRouterProvider", "$locationProvider", "PERMISSIONS", function(e, t, o, i) {
	e.state("app.postcardTemplate", {
		url: "/postcardTemplate",
		cache: !0,
		templateUrl: "app/postcard/templates/postcardTemplate.html",
		controller: "postcardTemplate",
		data: {
			permission: i.needSignIn
		}
	}).state("app.pictureSelect", {
		url: "/pictureSelect/:template",
		cache: !1,
		templateUrl: "app/postcard/templates/pictureSelect.html",
		controller: "pictureSelect"
	}).state("app.postcardFilter", {
		url: "/postcardFilter/:template",
		cache: !1,
		templateUrl: "app/postcard/templates/postcardFilter.html",
		controller: "postcardFilter",
		data: {
			permission: i.needSignIn
		}
	})
}])