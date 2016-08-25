angular.module("app.story.route", []).config(["$stateProvider", function(e) {
	e.state("app.storyList", {
		url: "/storyList/:type/:option/:filter/:title",
		cache: !0,
		templateUrl: "app/story/templates/storyList.html",
		controller: "storyListCtrl"
	}).state("app.storyDetail", {
		url: "/storyDetail/:id",
		cache: !0,
		templateUrl: "app/story/templates/storyDetail.html",
		controller: "storyDetailCtrl"
	})
}])