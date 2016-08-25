angular.module("app.base.route", []).config(["$stateProvider", "$urlRouterProvider", "$locationProvider", "PERMISSIONS", function(e, t, o) {
	o.html5Mode(!1), t.otherwise("/journeyHome"), e.state("app", {
		"abstract": !0,
		templateUrl: "app/base/templates/tabs.html",
		controller: "baseCtrl"
	}).state("app.commentList", {
		url: "/commentList/:type/:id/:title",
		cache: !1,
		templateUrl: "app/base/templates/commentList.html",
		controller: "commentListCtrl"
	}).state("app.citySelect", {
		url: "/citySelect",
		cache: !1,
		templateUrl: "app/base/templates/citySelect.html",
		controller: "citySelectCtrl"
	}).state("app.dateSelect", {
		url: "/dateSelect",
		cache: !1,
		templateUrl: "app/base/templates/dateSelect.html",
		controller: "dateSelectCtrl"
	}).state("app.singleSelect", {
		url: "/singleSelect",
		cache: !1,
		templateUrl: "app/base/templates/singleSelect.html",
		controller: "singleSelectCtrl"
	}).state("app.commonActivity", {
		url: "/activity/:id",
		cache: !0,
		templateUrl: "app/base/templates/activity.html",
		controller: "commonActivityCtrl"
	})
}]).constant("PERMISSIONS", {
	needSignIn: "needSignIn"
})