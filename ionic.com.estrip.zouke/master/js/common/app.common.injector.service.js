angular.module("app.common.injector.service", []).factory("http1Injector", ["$rootScope", "$timeout", "$q", "$injector", "cacheLocal", "CONFIG", function(e, t, o, i, n, a) {
	return {
		request: function(t) {
			if ("POST" == t.method) {
				if (t.timeout = 8e3, "POST" == t.method && (t.headers["x-requested-with"] = "XMLHttpRequest"), "file" === t.type && (t.headers["content-type"] = "multipart/form-data"), t.data) {
					t.data._base = {
						deviceId: a.deviceId,
						uuid: a.uuid,
						model: a.model,
						version: a.version,
						latitude: a.latitude.toString(),
						longitude: a.longitude.toString()
					}, t.data.timestamp = (new Date).getTime().toString(), t.data._token = e.user.token, t.data.page > 1 && (t.loading = !1), "undefined" != typeof t.data.getHttpOrCache && (t.getHttpOrCache = t.data.getHttpOrCache), delete t.data.getHttpOrCache, "undefined" != typeof t.data.getCacheOrHttp && (t.getCacheOrHttp = t.data.getCacheOrHttp), delete t.data.getCacheOrHttp, t.data.silence && (t.loading = !1), delete t.data.silence, delete t.data.sign;
					var n = "",
						r = Object.keys(t.data);
					r.sort();
					for (var s = 0; s < r.length; s++)
						if (-1 === ["loading", "getCacheOrHttp", "getHttpOrCache", "silence", "sign", "$$hashKey"].indexOf(r[s])) {
							var c = t.data[r[s]];
							"" !== c && null != c && (n += "object" == typeof c ? r[s] + "=object&" : r[s] + "=" + c + "&")
						}
					t.data.sign = md5(n.slice(0, n.length - 1) + a.SIGNATURE)
				}
				return "undefined" == typeof t.loading && (t.loading = !0), 0 == t.url.indexOf("/") && (t.url = a.host + t.url), t.needLogin && !e.user.isSigned ? (e.$emit("request:needSigned"), o.reject(t)) : (t.loading && (a.httpCount++, i.get("$ionicLoading").show()), t.getCacheOrHttp ? o.reject(t) : t)
			}
			return t
		}
	}
}]).factory("http2Injector", ["$rootScope", "$document", "$timeout", "$q", "$injector", "cacheLocal", "CONFIG", function(e, t, o, i, n, a, r) {
	function s(e, t) {
		var o = "";
		for (var i in t) - 1 === ["loading", "getCacheOrHttp", "getHttpOrCache", "silence", "_base", "_token", "timestamp", "sign"].indexOf(i) && (o += i + "=" + t[i] + "&");
		return "" == o ? e : e + "?" + o.slice(0, o.length - 1)
	}

	function c() {
		r.httpCount--, r.httpCount <= 0 && (n.get("$ionicLoading").hide(), t[0].body.classList.remove("loading-active"), r.httpCount = 0)
	}
	return jector = {
		requestError: function(t) {
			var o = s(t.url, t.data);
			return a.product.get(o) ? i.reject(a.product.get(o)) : t.needLogin && !e.user.isSigned ? i.reject({
				reason: "needLogin"
			}) : t
		},
		response: function(t) {
			if ("POST" == t.config.method) {
				if ("number" == typeof t.data.code && (t.data = {
						data: t.data
					}), -1 == t.data.data.code) return e.$emit("request:needSigned"), c(), t;
				if ((-404 == t.data.data.code || -500 == t.data.data.code) && JAlert.alert("系统异常！"), -4 == t.data.data.code && JAlert.alert(t.data.data.msg), t.config.getCacheOrHttp) {
					var o = s(t.config.url, t.config.data);
					a.product.put(o, t)
				}
				if (t.config.getHttpOrCache) {
					var o = s(t.config.url, t.config.data);
					a.system.put(o, t)
				}
				t.config.loading && c()
			}
			return t
		},
		responseError: function(t) {
			if (t.reason) return i.reject(t);
			if ("POST" == t.config.method) {
				if (c(), 200 == t.status) return t;
				if (t.config.getHttpOrCache && 0 == t.status) {
					var o = s(t.config.url, t.config.data),
						n = a.system.get(o);
					if (n) return n
				}
				return 408 == t.status || 0 == t.status ? (JAlert.showOnce(0 == t.status ? "请检查网络连接！" : "网络连接超时！"), e.$emit("baseCtrl.cleanCache"), i.reject(t)) : i.reject(t)
			}
		}
	}
}]), 
