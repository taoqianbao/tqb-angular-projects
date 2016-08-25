/*
 * taoqianbao@gmail.com
 * peter zhu
 * 2015-12-03
 * baidu map controller
 */
App.controller('BMapController', ["$scope", "$timeout", function($scope, $timeout) {

	var position = [
		new BMap.Point(116.404, 39.915)
	];

	$scope.addMarker = addMarker;
	
	// we use timeout to wait maps to be ready before add a markers
	$timeout(function() {
		addMarker($scope.myMap1, position[0]);
		addMarker($scope.myMap2, position[0]);
		addMarker($scope.myMap3, position[0]);
		addMarker($scope.myMap5, position[0]);
	});
	
	$scope.mapOptions1 = {
		enableAutoResize: true
	};

	$scope.mapOptions2 = {
		enableAutoResize: true
	};

	$scope.mapOptions3 = {
		enableAutoResize: true
	};

	$scope.mapOptions4 = {
		enableAutoResize: true
	};
	
	$scope.mapOptions5 = {
		enableAutoResize: true
	};

	///////////////

	function addMarker(map, position) {
		console.log(map, position);
	}

}]);