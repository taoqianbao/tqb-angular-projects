/*!
 * JavaScript - loadBaiduMaps( version, apiKey, language )
 *
 * - Load Baidu Maps API using jQuery Deferred. 
 *   Useful if you want to only load the Baidu Maps API on-demand.
 * - Requires jQuery 1.5
 * 
 * Copyright (c) 2016 Peter Zhu
 * taoqianbao@gmail.com
 * Dual licensed under the MIT and GPL licenses.
 */
/*globals window, google, jQuery*/
var loadBaiduMaps = (function($) {

	var now = $.now(),

		promise;

	return function(version, apiKey, language) {
		
		//version: 2.0
		//'ak': 'eYf9sA6yVTFHlh9ytU4a0EYY',		//baidu key , petsoso
				
		if (promise) {
			return promise;
		}

		//Create a Deferred Object
		var deferred = $.Deferred(),

			//Declare a resolve function, pass baidu.maps for the done functions
			resolve = function() {
				deferred.resolve(window.BMap ? BMap : false);
			},

			//global callback name
			callbackName = "loadBaiduMaps_" + (now++),

			// Default Parameters
			params = $.extend({
				'sensor': false
			}, apiKey ? {
				"ak": apiKey
			} : {}, language ? {
				"language": language
			} : {});;

		//If google.maps exists, then Baidu Maps API was probably loaded with the <script> tag
		if (window.BMap) {

			resolve();

		//Last, try pure jQuery Ajax technique to load the Baidu Maps API in Async.
		} else {

			//Ajax URL params
			params = $.extend(params, {
				'v': version || 2.0,				
				'callback': callbackName
			});

			//Declare the global callback
			window[callbackName] = function() {

				resolve();

				//Delete callback
				setTimeout(function() {
					try {
						delete window[callbackName];
					} catch (e) {}
				}, 20);
			};

			//Can't use the jXHR promise because 'script' doesn't support 'callback=?'
			$.ajax({
				dataType: 'script',
				data: params,
				url: 'http://api.map.baidu.com/api'
			});
		}

		promise = deferred.promise();

		return promise;
	};

}(jQuery));