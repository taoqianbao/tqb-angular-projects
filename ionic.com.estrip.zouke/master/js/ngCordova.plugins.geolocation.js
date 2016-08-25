angular.module("ngCordova.plugins.geolocation", []).factory("$cordovaGeolocation", ["$q", "$rootScope", function(e, t) {
	return {
		getCurrentPosition: function(o) {
			var i = e.defer(),
				n = null;
			return n = t.user.isIOS ? navigator.geolocation : navigator.tmlocation, n.getCurrentPosition(function(e) {
				i.resolve(e)
			}, function(e) {
				i.reject(e)
			}, o), i.promise
		},
		watchPosition: function(t) {
			var o = e.defer(),
				i = navigator.geolocation.watchPosition(function(e) {
					o.notify(e)
				}, function(e) {
					o.reject(e)
				}, t);
			return o.promise.cancel = function() {
				navigator.geolocation.clearWatch(i)
			}, o.promise.clearWatch = function(e) {
				navigator.geolocation.clearWatch(e || i)
			}, o.promise.watchID = i, o.promise
		},
		clearWatch: function(e) {
			return navigator.geolocation.clearWatch(e)
		}
	}
}])