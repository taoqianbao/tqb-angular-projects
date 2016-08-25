angular.module("app.product.route", []).config(["$stateProvider", "$urlRouterProvider", "$locationProvider", "PERMISSIONS", function(e, t, o, i) {
	e.state("app.product", {
		url: "/product/:pid",
		cache: !0,
		templateUrl: "app/product/templates/product.html",
		controller: "productCtrl"
	}).state("app.meetingAddress", {
		url: "/meetingAddress",
		cache: !1,
		templateUrl: "app/product/templates/meetingAddress.html",
		controller: "meetingAddressCtrl"
	}).state("app.pdjourney", {
		url: "/pdjourney/:pid",
		cache: !1,
		templateUrl: "app/product/templates/pdJourney.html",
		controller: "pdJourneyCtrl"
	}).state("app.visaFile", {
		url: "/visaFile",
		cache: !1,
		templateUrl: "app/product/templates/visaFile.html",
		controller: "visaFileCtrl"
	}).state("app.step1", {
		url: "/product/step1/:pid/:cat",
		cache: !0,
		templateUrl: "app/product/templates/step1.html",
		controller: "step1Ctrl",
		data: {
			permission: i.needSignIn
		}
	}).state("app.step2", {
		url: "/product/step2/:pid/:cat",
		cache: !0,
		templateUrl: "app/product/templates/step2.html",
		controller: "step2Ctrl",
		data: {
			permission: i.needSignIn
		}
	}).state("app.step3", {
		url: "/product/step3/:pid/:cat",
		cache: !0,
		templateUrl: "app/product/templates/step3.html",
		controller: "step3Ctrl",
		data: {
			permission: i.needSignIn
		}
	})
}]), 
