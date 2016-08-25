angular.module('starter.controllers', ['ionic'])

.controller('DashCtrl', function($scope, Chats) {
	
	$scope.chats = Chats.all();	
	
})

.controller('ChatsCtrl', function($scope, Chats) {
	// With the new view caching in Ionic, Controllers are only called
	// when they are recreated or on app start, instead of every page change.
	// To listen for when this page is active (for example, to refresh data),
	// listen for the $ionicView.enter event:
	//
	//$scope.$on('$ionicView.enter', function(e) {
	//});

	$scope.chats = Chats.all();
	$scope.remove = function(chat) {
		Chats.remove(chat);
	};
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
	$scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
	$scope.settings = {
		enableFriends: true
	};
})

.controller('DemoCtrl', function($scope, $ionicPopup, $timeout) {
	$scope.hello = 'hello';
	$scope.doSomething = function() {
		// 一个精心制作的自定义弹窗
		var myPopup = $ionicPopup.show({
			template: '<input type="password" ng-model="data.wifi">',
			title: 'Enter Wi-Fi Password',
			subTitle: 'Please use normal things',
			scope: $scope,
			buttons: [{
				text: 'Cancel'
			}, {
				text: '<b>Save</b>',
				type: 'button-positive',
				onTap: function(e) {
					if (!$scope.data.wifi) {
						//不允许用户关闭，除非他键入wifi密码
						e.preventDefault();
					} else {
						return $scope.data.wifi;
					}
				}
			}, ]
		});
		myPopup.then(function(res) {
			console.log('Tapped!', res);
		});
		$timeout(function() {
			myPopup.close(); //由于某种原因3秒后关闭弹出
		}, 3000);
	}
});