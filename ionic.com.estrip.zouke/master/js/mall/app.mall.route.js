angular.module("app.mall.route", []).config(["$stateProvider", "$urlRouterProvider", "$locationProvider", "PERMISSIONS", function(e, t, o) {
	o.html5Mode(!1), e.state("app.mallHome", {
		url: "/mallHome",
		cache: !0,
		templateUrl: "app/mall/templates/mallHome.html",
		controller: "mallHomeCtrl"
	}).state("app.toolboxSale", {
		url: "/toolboxSale",
		cache: !0,
		templateUrl: "app/mall/templates/saleSearch.html",
		controller: "saleSearchCtrl"
	}).state("app.activity", {
		url: "/activity/:aid",
		cache: !1,
		templateUrl: "app/mall/templates/activity.html",
		controller: "activityCtrl"
	}).state("app.productList", {
		url: "/productList/:type/:option/:filter/:title",
		cache: !0,
		templateUrl: "app/mall/templates/productList.html",
		controller: "productListCtrl"
	})
}])
