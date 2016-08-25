
angular.module("app.common.third.service", []).factory("baidu", ["$http", "$q", function(e, t) {
	var o = t.defer(),
		i = "3fe2d00af96b5f4ec1b25b327b0787a9";
	return {
		exchangeList: function() {
			var t = "http://apis.baidu.com/apistore/currencyservice/type";
			return e({
				url: t,
				method: "GET",
				headers: {
					apikey: i
				}
			}).success(function(e) {
				o.resolve(e)
			}), o.promise
		},
		exchange: function(t, n, a) {
			var r = "http://apis.baidu.com/apistore/currencyservice/currency?fromCurrency=" + t + "&toCurrency=" + n + "&amount=" + a;
			return e({
				url: r,
				method: "GET",
				headers: {
					apikey: i
				}
			}).success(function(e) {
				o.resolve(e)
			}), o.promise
		},
		weather: function(t) {
			var n = "http://apis.baidu.com/heweather/weather/free?city=" + t;
			return e.get({
				url: n,
				headers: {
					apikey: i
				}
			}).success(function(e) {
				o.resolve(e)
			}), o.promise
		}
	}
}])