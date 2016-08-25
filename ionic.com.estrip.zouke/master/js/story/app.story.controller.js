angular.module("app.story.controller", []).controller("storyPageCtrl1", ["$scope", "$rootScope", "$state", "$timeout", "$document", "$ionicScrollDelegate", "$ionicHistory", "cacheLocal", "$ionicPlatform", "resChat", "CONFIG", "viewArgument", "RootScopeProxy", "logicTip", function(e, t, o, i, n, a, r, s, c, l, d, u) {
	e.title = "Scene", e.scene = [], e.$on("story", function() {});
	var p = {};
	p.storyCats = function() {}, e.sceneCats = [{
		title: "大家",
		sub: "关于艺术的那些事情",
		readed: "25"
	}, {
		title: "大家",
		sub: "关于艺术的那些事情",
		readed: "26"
	}, {
		title: "大家",
		sub: "关于艺术的那些事情",
		readed: "27"
	}, {
		title: "大家",
		sub: "关于艺术的那些事情",
		readed: "28"
	}, {
		title: "大家",
		sub: "关于艺术的那些事情",
		readed: "29"
	}, {
		title: "大家",
		sub: "关于艺术的那些事情",
		readed: "30"
	}], e.onClickItem = function(e) {
		console.log(e), u.put(e), o.go("app.storyPage2")
	}, e.onClickSwitch = function(t) {
		e.activeSlide = t
	}
}]).controller("storyPageCtrl2", ["$scope", "$rootScope", "$state", "$timeout", "$document", "$ionicScrollDelegate", "$ionicHistory", "cacheLocal", "$ionicPlatform", "resChat", "CONFIG", "viewArgument", "RootScopeProxy", "logicTip", function(e, t, o, i, n, a, r, s, c, l, d, u) {
	var p = u.get();
	e.title = p.title, e.story = {
		imgSizeStory: d.imgSizePd,
		hImgStory: d.hImgStory,
		titleShown: !0,
		city: "",
		poiId: 0,
		poiName: "",
		poiMarked: !1,
		audioShown: !1,
		audio: {},
		audioName: "",
		audioDuration: "",
		audioPaused: !0
	}, e.stories = [{
		author: "QiuQiu1",
		title: "哥伦布的第一次远洋航行",
		location: "哥伦布纪念堂",
		view: "1110",
		id: "001",
		name: "xxx",
		user: "ooo",
		desc: "gag",
		img: ""
	}, {
		author: "QiuQiu2",
		title: "哥伦布的第一次远洋航行",
		location: "哥伦布纪念堂",
		view: "1111",
		id: "001",
		name: "xxx",
		user: "ooo",
		desc: "gag",
		img: ""
	}, {
		author: "QiuQiu3",
		title: "哥伦布的第一次远洋航行",
		location: "哥伦布纪念堂",
		view: "1112",
		id: "001",
		name: "xxx",
		user: "ooo",
		desc: "gag",
		img: ""
	}, {
		author: "QiuQiu4",
		title: "哥伦布的第一次远洋航行",
		location: "哥伦布纪念堂",
		view: "1113",
		id: "001",
		name: "xxx",
		user: "ooo",
		desc: "gag",
		img: ""
	}, {
		author: "QiuQiu5",
		title: "哥伦布的第一次远洋航行",
		location: "哥伦布纪念堂",
		view: "1114",
		id: "001",
		name: "xxx",
		user: "ooo",
		desc: "gag",
		img: ""
	}, {
		author: "QiuQiu6",
		title: "哥伦布的第一次远洋航行",
		location: "哥伦布纪念堂",
		view: "1114",
		id: "001",
		name: "xxx",
		user: "ooo",
		desc: "gag",
		img: ""
	}], e.onClickStoryItem = function(e) {
		u.put(e), o.go("app.storyPage3")
	}
}]).controller("storyListCtrl", ["$scope", "$state", "$stateParams", "$timeout", "CONFIG", "viewArgument", "resStory", function(e, t, o, i, n, a, r) {
	e.type = o.type, e.title = o.title, e.option = o.option, e.page = 1, e.hasMore = !0, e.imgSizePd = n.imgSizePd, e.imgSizeThumb = n.imgSizeThumb, e.items = [], e.tags = [];
	var s = function() {
		switch (e.httpRequesting = !0, e.type) {
			case "hot":
				r.getHot({
					page: e.page
				}, function(t) {
					0 == t.data.code && (e.hasMore = t.data.list.length == t.data.per_num, 1 == e.page ? (0 == e.tags.length && (e.tags = t.data.tags, e.tags.unshift({
						code: "hot",
						name: "热门标签"
					})), e.items = t.data.list) : e.items = e.items.concat(t.data.list), e.httpRequesting = !1, ++e.page), e.$broadcast("scroll.infiniteScrollComplete")
				}, function() {
					e.httpRequesting = !1
				});
				break;
			case "chat":
				r.search({
					key_word: e.option,
					page: e.page
				}, function(t) {
					0 == t.data.code && (t.data.list.length < t.data.per_num && (e.hasMore = !1), e.items = 1 == e.page ? t.data.list : e.items.concat(t.data.list), e.httpRequesting = !1, ++e.page), e.$broadcast("scroll.infiniteScrollComplete")
				}, function() {
					e.httpRequesting = !1
				});
				break;
			default:
				r.searchByTag({
					tag_id: e.type,
					page: e.page
				}, function(t) {
					0 == t.data.code && (e.hasMore = t.data.list.length == t.data.per_num, e.items = 1 == e.page ? t.data.list : e.items.concat(t.data.list), e.httpRequesting = !1, ++e.page), e.$broadcast("scroll.infiniteScrollComplete")
				}, function() {
					e.httpRequesting = !1
				})
		}
	};
	i(function() {
		s()
	}), e.onClickStory = function(e) {
		t.go("app.storyDetail", {
			id: e
		})
	};
	var c = e.page;
	e.loadMore = function() {
		c < e.page && e.hasMore && (c = e.page, s())
	}
}]).controller("storyDetailCtrl", ["$scope", "$state", "$rootScope", "$timeout", "$stateParams", "viewArgument", "CONFIG", "processContent", "resStory", "resUser", "dateFilter", function(e, t, o, i, n, a, r, s, c, l, d) {
	e.imgSize = r.imgSize;
	var u = function() {
		c.getDetail({
			id: n.id
		}, function(t) {
			0 == t.data.code && (e.story = t.data, e.story.content = s(e.story.content))
		})
	};
	e.replyUser = function(t, o) {
		var n = t.currentTarget.parentNode.parentNode.parentNode.querySelector('[contenteditable="true"]');
		i(function() {
			n.focus(), e.content.value = "@" + o + "  ", i(function() {
				var e, t;
				window.getSelection && document.createRange ? (t = document.createRange(), t.selectNodeContents(n), t.collapse(!0), t.setEnd(n, n.childNodes.length), t.setStart(n, n.childNodes.length), e = window.getSelection(), e.removeAllRanges(), e.addRange(t)) : document.body.createTextRange && (t = document.body.createTextRange(), t.moveToElementText(n), t.collapse(!0), t.select())
			}, 10)
		}, 300)
	}, i(function() {
		u()
	}, 0), e.onClickLikeStory = function() {
		l.likeStory({}, function(t) {
			0 == t.data.code && (e.story.liked = !e.story.liked)
		})
	}, e.clickAvatar = function(e, o, i) {
		t.go("app.userHome", {
			id: e,
			name: o,
			avatar: i
		})
	}, e.onClickAllComments = function() {
		t.go("app.commentList", {
			type: "story",
			id: e.story.id,
			title: e.story.name
		})
	}, e.content = {
		value: ""
	}, e.submitComment = function() {
		c.comment({
			story_id: e.story.id,
			content: e.content.value
		}, function(t) {
			if (0 == t.data.code) {
				var i = e.story.comments.list,
					n = {
						id: t.data.id,
						comment: e.content.value,
						comment_time: d(new Date, "yyyy-MM-dd hh:mm:ss"),
						is_liked: !1,
						like_num: 0,
						user_id: o.user.info.user_id,
						user_name: o.user.info.user_name,
						avatar: o.user.info.avatar
					};
				i.length > 3 && i.splice(-1), i.unshift(n), e.story.comments.num++, e.content.value = ""
			}
		})
	}, e.$on("$ionicView.afterEnter", function(t, o) {
		var i = a.get();
		"back" == o.direction && i && (e.story.comments.list = i.slice(0, 3), e.story.comments.num = i.length)
	}), e.onClickCommentLike = function(e) {
		var t = e.is_liked ? 0 : 1;
		c.likeComment({
			comment_id: e.id,
			action: t
		}, function(t) {
			0 == t.data.code && (e.is_liked ? e.like_num-- : e.like_num++, e.is_liked = !e.is_liked)
		})
	}, e.clickUser = function() {
		"crawl" != e.story.user_type && t.go("app.userHome", {
			id: e.story.user_id,
			name: e.story.user_name,
			avatar: e.story.avatar
		})
	}
}])
