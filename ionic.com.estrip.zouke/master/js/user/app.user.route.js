angular.module("app.user.route", []).config(["$stateProvider", "$urlRouterProvider", "$locationProvider", "PERMISSIONS", function(e, t, o, i) {
	e.state("app.userHome", {
		url: "/userHome/:id/:name/:avatar",
		cache: !0,
		templateUrl: "app/user/templates/userHome.html",
		controller: "userHomeCtrl"
	}).state("app.userJourney", {
		url: "/userJourney",
		cache: !0,
		templateUrl: "app/user/templates/userJourney.html",
		controller: "userJourneyCtrl",
		data: {
			permission: i.needSignIn
		}
	}).state("app.userPoi", {
		url: "/userPoi",
		cache: !0,
		templateUrl: "app/user/templates/userPoi.html",
		controller: "userPoiCtrl",
		data: {
			permission: i.needSignIn
		}
	}).state("app.userStory", {
		url: "/userStory",
		cache: !0,
		templateUrl: "app/user/templates/userStory.html",
		controller: "userStoryCtrl",
		data: {
			permission: i.needSignIn
		}
	}).state("app.userMessage", {
		url: "/userMessage",
		cache: !0,
		templateUrl: "app/user/templates/userMessage.html",
		controller: "userMessageCtrl",
		data: {
			permission: i.needSignIn
		}
	}).state("app.userOrder", {
		url: "/userOrder",
		cache: !0,
		templateUrl: "app/user/templates/userOrder.html",
		controller: "userOrderCtrl",
		data: {
			permission: i.needSignIn
		}
	}).state("app.contacts", {
		url: "/contacts/:opt",
		cache: !1,
		templateUrl: "app/user/templates/contacts.html",
		controller: "contactsCtrl",
		data: {
			permission: i.needSignIn
		}
	}).state("app.addContact", {
		url: "/addContact/:opt",
		cache: !1,
		templateUrl: "app/user/templates/addContact.html",
		controller: "addContactCtrl",
		data: {
			permission: i.needSignIn
		}
	}).state("app.editContact", {
		url: "/editContact/:cid/:opt",
		cache: !1,
		templateUrl: "app/user/templates/editContact.html",
		controller: "editContactCtrl",
		data: {
			permission: i.needSignIn
		}
	}).state("app.userPostcard", {
		url: "/userPostcard",
		cache: !1,
		templateUrl: "app/user/templates/postcard.html",
		controller: "userPostcardCtrl",
		data: {
			permission: i.needSignIn
		}
	})
}])
