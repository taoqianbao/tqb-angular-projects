angular.module('ionic-http-auth', ['ionic', 'ngMockE2E', 'ionic-http-auth.services', 'ionic-http-auth.controllers'])
	.run(function($rootScope, $ionicPlatform, $httpBackend, $http) {
		// Mocking code used for simulation purposes (using ngMockE2E module)	
		var authorized = false;
		var customers = [{
			name: 'John Smith'
		}, {
			name: 'Tim Johnson'
		}];

		// returns the current list of customers or a 401 depending on authorization flag
		$httpBackend.whenGET('https://customers').respond(function(method, url, data, headers) {
			return authorized ? [200, customers] : [401];
		});
		$httpBackend.whenPOST('https://login').respond(function(method, url, data) {
			authorized = true;
			return [200, {
				authorizationToken: "NjMwNjM4OTQtMjE0Mi00ZWYzLWEzMDQtYWYyMjkyMzNiOGIy"
			}];
		});
		$httpBackend.whenPOST('https://logout').respond(function(method, url, data) {
			authorized = false;
			return [200];
		});
		// All other http requests will pass through
		$httpBackend.whenGET(/.*/).passThrough();
	})
	.config(function($stateProvider, $urlRouterProvider) {
		$stateProvider

			.state('app', {
				url: "/app",
				abstract: true,
				templateUrl: "templates/menu.html",
				controller: 'AppCtrl'
			})
			.state('app.home', {
				url: "/home",
				views: {
					'menuContent': {
						controller: "HomeCtrl",
						templateUrl: "templates/home.html"
					}
				}
			})
			.state('app.customers', {
				url: "/customers",
				views: {
					'menuContent': {
						controller: "CustomerCtrl",
						templateUrl: "templates/customers.html"
					}
				}
			})
			.state('app.logout', {
				url: "/logout",
				views: {
					'menuContent': {
						controller: "LogoutCtrl"
					}
				}
			});
		$urlRouterProvider.otherwise("/app/home");
	});