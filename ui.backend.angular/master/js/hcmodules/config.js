/**=========================================================
 * Module: config.js
 * App routes and resources configuration
 =========================================================*/

App.config(['$stateProvider', '$locationProvider', '$urlRouterProvider', 'RouteHelpersProvider',

	function($stateProvider, $locationProvider, $urlRouterProvider, helper) {

		'use strict';


		// Some state name examples  

		// stateName can be a single top-level name (must be unique).  
		$stateProvider.state("home", {});

		// Or it can be a nested state name. This state is a child of the   
		// above "home" state.  
		$stateProvider.state("home.newest", {});

		// Nest states as deeply as needed.  
		$stateProvider.state("home.newest.abc.xyz.inception", {});

		// state() returns $stateProvider, so you can chain state declarations.  
		$stateProvider
			.state("home", {})
			.state("about", {})
			.state("contacts", {});


		//参数化配置demo
		var urls = ['news-1', 'news-2', 'news-3'];

		angular.forEach(urls, function(v) {
			
			$stateProvider
				.state(v, {
					url: '/' + v,
					views: {
						'aboutBody': {
							templateUrl: templateBasePath + v
						}
					}
				});
		});



	}
]);