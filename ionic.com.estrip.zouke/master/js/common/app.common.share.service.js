

angular.module("app.common.share.service", []).factory("weixinShare", function() {
	function e(e, t, o) {
		navigator.weixin && navigator.weixin.send(e, t, o)
	}
	return {
		image2Friend: function(t, o, i) {
			e({
				type: "image",
				data: t,
				imageType: "url",
				title: "",
				isSendToTimeline: !1
			}, o, i)
		},
		image2Timeline: function(t, o, i) {
			e({
				type: "image",
				data: t,
				imageType: "url",
				title: "",
				isSendToTimeLine: !0
			}, o, i)
		},
		page2Friend: function(t, o, i) {
			e({
				type: "webpage",
				url: t.url,
				title: t.title || t.desc,
				desc: t.desc || t.title,
				imgUrl: t.image,
				isSendToTimeline: !1
			}, o, i)
		},
		page2Timeline: function(t, o, i) {
			e({
				type: "webpage",
				url: t.url,
				title: t.raw ? t.title || t.desc : t.desc || t.title,
				desc: t.desc || t.title,
				imgUrl: t.image,
				isSendToTimeline: !0
			}, o, i)
		}
	}
})