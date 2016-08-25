angular.module("app.route.chat", []).config(["$stateProvider", "$urlRouterProvider", "$locationProvider", "PERMISSIONS", function(e) {
	e.state("app.chatHome", {
		url: "/chatHome",
		cache: !0,
		templateUrl: "app/chat/templates/chatHome.html",
		controller: "chatHomeCtrl"
	})
}])
