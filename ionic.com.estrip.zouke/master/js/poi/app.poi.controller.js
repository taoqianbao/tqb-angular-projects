angular.module("app.poi.controller", []).controller("poiDetailCtrl", ["$scope", "$rootScope", "$state", "$stateParams", "$timeout", "$ionicSlideBoxDelegate", "$ionicListDelegate", "CONFIG", "RootScopeProxy", "viewArgument", "resUser", "resPoi", "dateFilter", "utils", "$ionicScrollDelegate", function(e, t, o, i, n, a, r, s, c, l, d, u, p, m, h) {
	e.$emit("baseCtrl.cleanCache"), e.modified = !1, e.title = i.title, e.poiId = i.id, e.journeyId = i.journeyId, e.sliderHeight = s.hImgTp, e.imgSize = s.imgSizeTopic, e.imgSizeThumb = s.imgSizeThumb, e.hostImg = s.hostImg, e.content = {
		value: ""
	}, e.limitTag = 45, e.limitWord = 60, e.submitComment = function() {
		u.comment({
			poi_id: e.poi.id,
			content: e.content.value
		}, function(o) {
			if (0 == o.data.code) {
				var i = e.poi.comment.list,
					n = {
						id: o.data.id,
						comment: e.content.value,
						comment_time: p(new Date, "yyyy-MM-dd hh:mm:ss"),
						is_liked: !1,
						like_num: 0,
						user_id: t.user.info.user_id,
						user_name: t.user.info.user_name,
						avatar: t.user.info.avatar
					};
				i.length > 3 && i.splice(-1), i.unshift(n), e.poi.comment.count++, e.content.value = ""
			}
		})
	}, e.$on("$ionicView.afterEnter", function(t, o) {
		var i = l.get();
		"back" == o.direction && i && (e.poi.comment.list = i.slice(0, 3), e.poi.comment.count = i.length)
	}), e.likeComment = function(e) {
		var t = e.is_liked ? "0" : "1";
		u.likeComment({
			comment_id: e.id,
			action: t
		}, function(o) {
			0 == o.data.code && ("0" == t ? e.like_num -= 1 : e.like_num += 1, e.is_liked = !e.is_liked)
		})
	}, e.content = {
		value: ""
	}, e.replyUser = function(t, o) {
		var i = t.currentTarget.parentNode.parentNode.parentNode.querySelector('[contenteditable="true"]');
		n(function() {
			i.focus(), e.content.value = "@" + o + "  ", n(function() {
				var e, t;
				window.getSelection && document.createRange ? (t = document.createRange(), t.selectNodeContents(i), t.collapse(!0), t.setEnd(i, i.childNodes.length), t.setStart(i, i.childNodes.length), e = window.getSelection(), e.removeAllRanges(), e.addRange(t)) : document.body.createTextRange && (t = document.body.createTextRange(), t.moveToElementText(i), t.collapse(!0), t.select())
			}, 10)
		}, 300)
	}, e.clickAvatar = function(e, t, i) {
		o.go("app.userHome", {
			id: e,
			name: t,
			avatar: i
		})
	}, e.onClickAllComments = function() {
		o.go("app.commentList", {
			type: "poi",
			id: e.poi.id,
			title: e.poi.name
		})
	};
	var g = function() {
		u.getDetail({
			poi_id: e.poiId,
			journey_id: e.journeyId
		}, function(t) {
			0 == t.data.code && (e.poi = t.data, e.poi.distance = m.calcDistance([e.poi.lat, e.poi.lng], [s.latitude, s.longitude]), a.$getByHandle("poi-detail-slider").update())
		})
	};
	n(function() {
		g()
	}), e.onClickStory = function(e) {
		o.go("app.storyDetail", {
			id: e
		})
	}, e.onClickMarkPoi = function() {
		var t = e.poi.is_marked ? 0 : 1;
		d.markPoi({
			poi_id: e.poi.id,
			action: t
		}, function(t) {
			0 == t.data.code && (e.poi.is_marked = !e.poi.is_marked, e.poi.modified = !0)
		})
	}, e.onClickAddress = function() {
		console.log("click address...");
		var t = {
			id: e.poi.id,
			name: e.poi.name,
			type: e.poi.type,
			lat: e.poi.lat,
			lng: e.poi.lng,
			address: e.poi.address
		};
		l.put(t), o.go("app.mapAddress")
	};
	var f = new c(e);
	f.$on("signSuccess", function() {
		g()
	}), e.resizeScroll = function() {
		n(h.resize.bind(h))
	}
}]).controller("poiListCtrl", ["$scope", "$state", "$stateParams", "$timeout", "$ionicScrollDelegate", "CONFIG", "viewArgument", "resPoi", function(e, t, o, i, n, a, r, s) {
	e.items = [], e.type = o.type, e.title = o.title, e.option = o.option, e.hasFilter = o.filter, e.page = 1, e.hasMore = !0, e.imgSizeThumb = a.imgSizeThumb, e.hostImg = a.hostImg;
	var c = function() {
			s.getHot({
				page: e.page
			}, function(t) {
				0 == t.data.code && (e.hasMore = t.data.list.length == t.data.per_num, e.items = 1 == e.page ? t.data.list : e.items.concat(t.data.list), e.httpRequesting = !1, e.tags = t.data.tags, e.tags.unshift({
					code: "hot",
					name: "热门标签"
				})), e.$broadcast("scroll.infiniteScrollComplete")
			}, function() {
				e.httpRequesting = !1
			})
		},
		l = function() {
			switch (e.httpRequesting = !0, e.type) {
				case "hot":
					c();
					break;
				case "chat":
					s.search({
						key_word: e.option,
						page: e.page
					}, function(t) {
						0 == t.data.code && (t.data.list.length < t.data.per_num && (e.hasMore = !1), e.items = e.items.concat(t.data.list), e.httpRequesting = !1, ++e.page), e.$broadcast("scroll.infiniteScrollComplete")
					}, function() {
						e.httpRequesting = !1
					})
			}
		};
	i(function() {
		l()
	}), e.onClickPoi = function(e, o) {
		t.go("app.poiDetail", {
			id: e,
			title: o
		})
	};
	var d = e.page;
	e.loadMore = function() {
		d < e.page && e.hasMore && (d = e.page, l())
	}
}]).controller("postcardListCtrl", ["$rootScope", "$scope", "CONFIG", "cardModal", "resPoiCard", function(e, t, o, i, n) {
	t.imgSizeCardThumb = o.imgSizeCardThumb, t.thumbPaddingTop = o.hCard / 480 * 33.13 + "%", t.onClickPostcard = function(o) {
		e.card = t.postcards[o], i.show()
	}, t.addPostcard = function() {}, t.postcards = n.getCard()
}])
