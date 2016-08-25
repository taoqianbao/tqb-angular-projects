
angular.module("app.common.resource.service", []).factory("__override", ["$rootScope", function(e) {
	return function(t, o) {
		if (window.cordova) {
			var i = t[o];
			t[o] = function() {
				++e.appratePrecondition, i.apply(this, arguments)
			}
		}
	}
}]).factory("resJourney", ["$resource", "__override", function(e, t) {
	var o = e("/api/:cat/:opt", null, {
		getHome: {
			params: {
				cat: "journey",
				opt: "GetThemeList"
			},
			method: "POST",
			getCacheOrHttp: !0
		},
		getTheme: {
			params: {
				cat: "journey",
				opt: "SearchByTheme"
			},
			method: "POST",
			getCacheOrHttp: !0
		},
		search: {
			params: {
				cat: "chat",
				opt: "searchJourney"
			},
			method: "POST"
		},
		getUserJourney: {
			params: {
				cat: "journey",
				opt: "getJourneyList"
			},
			method: "POST"
		},
		getDetail: {
			params: {
				cat: "journey",
				opt: "getJourneyDetail"
			},
			method: "POST"
		},
		getDetail2: {
			params: {
				cat: "journey",
				opt: "getNJourneyDetail"
			},
			method: "POST"
		},
		getPlan: {
			params: {
				cat: "journey",
				opt: "getJourneyPlan"
			},
			method: "POST"
		},
		getComments: {
			params: {
				cat: "comment",
				opt: "getJourneyComments"
			},
			method: "POST"
		},
		comment: {
			params: {
				cat: "comment",
				opt: "journey"
			},
			method: "POST",
			needLogin: !0
		},
		likeComment: {
			params: {
				cat: "comment",
				opt: "journeylike"
			},
			method: "POST",
			needLogin: !0
		}
	});
	return t(o, "like"), t(o, "likeComment"), o
}]).factory("resPoi", ["$resource", function(e) {
	return e("/api/:cat/:opt", null, {
		getDetail: {
			params: {
				cat: "poi",
				opt: "GetPoiDetail"
			},
			method: "POST"
		},
		getComments: {
			params: {
				cat: "comment",
				opt: "GetPoiComments"
			},
			method: "POST"
		},
		comment: {
			params: {
				cat: "comment",
				opt: "poi"
			},
			method: "POST"
		},
		likeComment: {
			params: {
				cat: "comment",
				opt: "PoiLike"
			},
			method: "POST"
		},
		getIntro: {
			params: {
				cat: "poi",
				opt: "GetPoiIntro"
			},
			method: "POST"
		},
		getUserMarkPoi: {
			params: {
				cat: "poi",
				opt: "getMarkPoiList"
			},
			method: "POST",
			needLogin: !1
		},
		search: {
			params: {
				cat: "chat",
				opt: "searchPoi"
			},
			method: "POST"
		},
		searchByType: {
			params: {
				cat: "poi",
				opt: "searchbycitytype"
			},
			method: "POST"
		},
		addTag: {
			params: {
				cat: "poi",
				opt: "addimpress"
			},
			method: "POST"
		}
	})
}]).factory("resBanner", ["$resource", function(e) {
	return e("/api/:cat/:opt", null, {
		getbannerlist: {
			params: {
				cat: "banner",
				opt: "getbannerlist"
			},
			loading: !1,
			method: "POST"
		}
	})
}]).factory("resStory", ["$resource", "__override", function(e, t) {
	var o = e("/api/:cat/:opt", null, {
		getTags: {
			params: {
				cat: "story",
				opt: "gettags"
			},
			method: "POST"
		},
		getUserStory: {
			params: {
				cat: "story",
				opt: "getStoryList"
			},
			method: "POST"
		},
		getHot: {
			params: {
				cat: "story",
				opt: "GetHotStory"
			},
			method: "POST"
		},
		getDetail: {
			params: {
				cat: "story",
				opt: "getnsdetail"
			},
			method: "POST"
		},
		searchByTag: {
			params: {
				cat: "story",
				opt: "SearchByTag"
			},
			method: "POST"
		},
		search: {
			params: {
				cat: "chat",
				opt: "SearchStory"
			},
			method: "POST"
		},
		getComments: {
			params: {
				cat: "comment",
				opt: "getstoryComments"
			},
			method: "POST"
		},
		comment: {
			params: {
				cat: "comment",
				opt: "story"
			},
			method: "POST",
			needLogin: !0
		},
		likeComment: {
			params: {
				cat: "comment",
				opt: "storylike"
			},
			method: "POST",
			needLogin: !0
		}
	});
	return t(o, "like"), t(o, "likeComment"), o
}]).factory("resChat", ["$resource", function(e) {
	return e("/api/chat/search", null, {
		getMessage: {
			method: "POST"
		}
	})
}]).factory("resTrain", ["$resource", function(e) {
	return e("/api/:cat/:opt", null, {
		search: {
			params: {
				cat: "train",
				opt: "search"
			},
			method: "POST"
		},
		getCites: {
			params: {
				cat: "train",
				opt: "getcitylist"
			},
			method: "POST"
		}
	})
}]).factory("resArticleSearch", ["$resource", function() {
	var e = [{
		id: 123232,
		title: "欧洲签证办理常见问题",
		thumb: ""
	}, {
		id: 132323,
		title: "申根签证的国家有哪些",
		thumb: ""
	}, {
		id: 323434,
		title: "面试官怎么问？我怎么答？",
		thumb: ""
	}];
	return {
		getList: function() {
			return e
		}
	}
}]).factory("resMap", ["$resource", function(e) {
	return e("/api/:cat/:opt", null, {
		getOffline: {
			params: {
				cat: "map",
				opt: "GetOffMap"
			},
			method: "POST"
		},
		getPoiByRange: {
			params: {
				cat: "map",
				opt: "GetPoiByRange"
			},
			method: "POST",
			loading: !1
		},
		getDownloadUrl: {}
	})
}]).factory("resMall", ["$resource", function(e) {
	return e("/api/production/marketindex", null, {
		getMallPage: {
			method: "POST"
		}
	})
}]).factory("resActivity", ["$resource", function(e) {
	return e("/api/production/GetActivity", null, {
		get: {
			method: "POST"
		}
	})
}]).factory("resVersion", ["$resource", function(e) {
	return e("/api/systerm/checkappversion", null, {
		check: {
			method: "POST"
		}
	})
}]).factory("resProduct", ["$resource", "__override", function(e, t) {
	var o = e("/api/:cat/:opt", null, {
		getSaleList: {
			params: {
				cat: "production",
				opt: "getsalelist"
			},
			method: "POST"
		},
		getExtraProducts: {
			params: {
				cat: "production",
				opt: "GetExtraProducts"
			},
			method: "POST"
		},
		getHot: {
			params: {
				cat: "production",
				opt: "getHotProduct"
			},
			method: "POST"
		},
		getHotByCat: {
			params: {
				cat: "production",
				opt: "GetHotProductByCat"
			},
			method: "POST"
		},
		getCountryPd: {
			params: {
				cat: "production",
				opt: "GetCountryPd"
			},
			method: "POST"
		},
		getPdList: {
			params: {
				cat: "Production",
				opt: "PdData"
			},
			method: "POST"
		},
		getPdListFilter: {
			params: {
				cat: "production",
				opt: "groupFilter"
			},
			method: "POST"
		},
		search: {
			params: {
				cat: "chat",
				opt: "SearchProduct"
			},
			method: "POST"
		},
		getDetail: {
			params: {
				cat: "production",
				opt: "getPdDetail"
			},
			method: "POST"
		},
		getJourney: {
			params: {
				cat: "production",
				opt: "GetJourneyDetail"
			},
			method: "POST"
		},
		mark: {
			params: {
				cat: "production",
				opt: "mark"
			},
			method: "POST"
		},
		getComments: {
			params: {
				cat: "comment",
				opt: "getproductcomments"
			},
			method: "POST"
		},
		comment: {
			params: {
				cat: "comment",
				opt: "product"
			},
			method: "POST"
		},
		likeComment: {
			params: {
				cat: "comment",
				opt: "productlike"
			},
			method: "POST"
		}
	});
	return t(o, "mark"), o
}]).factory("resUser", ["$resource", function(e) {
	return e("/api/:cat/:opt", null, {
		checkEmail: {
			params: {
				cat: "user2",
				opt: "CheckRegisterMail"
			},
			method: "POST"
		},
		register: {
			params: {
				cat: "user2",
				opt: "appRegister"
			},
			method: "POST"
		},
		findPassword: {
			params: {
				cat: "user2",
				opt: "findPassword"
			},
			method: "POST"
		},
		modifyPassword: {
			params: {
				cat: "user2",
				opt: "modifyPassword"
			},
			method: "POST"
		},
		wxLogin: {
			params: {
				cat: "user2",
				opt: "wxlogin"
			},
			method: "POST"
		},
		mailLogin: {
			params: {
				cat: "user2",
				opt: "mailLogin"
			},
			method: "POST"
		},
		logout: {
			params: {
				cat: "user2",
				opt: "logout"
			},
			method: "POST",
			needLogin: !0
		},
		getOwnInfo: {
			params: {
				cat: "user2",
				opt: "getUserInfo"
			},
			method: "POST"
		},
		getInfo: {
			params: {
				cat: "chat",
				opt: "getUserInfo"
			},
			method: "POST"
		},
		getMark: {
			params: {
				cat: "user2",
				opt: "getPoiByCityType"
			},
			method: "POST",
			needLogin: !0
		},
		getTags: {
			params: {
				cat: "user2",
				opt: "getTagsPool"
			},
			method: "POST",
			needLogin: !0
		},
		updateAvatar: {
			params: {
				cat: "user2",
				opt: "updateAvatar"
			},
			method: "POST",
			needLogin: !0
		},
		updateName: {
			params: {
				cat: "user2",
				opt: "updateName"
			},
			method: "POST",
			needLogin: !0
		},
		updateGender: {
			params: {
				cat: "user2",
				opt: "updateGender"
			},
			method: "POST",
			needLogin: !0
		},
		updateBrief: {
			params: {
				cat: "user2",
				opt: "updateBrief"
			},
			method: "POST",
			needLogin: !0
		},
		updateTags: {
			params: {
				cat: "user2",
				opt: "UpdateTags"
			},
			method: "POST",
			needLogin: !0
		},
		sendFeedback: {
			params: {
				cat: "user2",
				opt: "sendFeedback"
			},
			method: "POST"
		},
		getJourneyState: {
			params: {
				cat: "ujourney",
				opt: "queryJourneyCopyStat"
			},
			method: "POST",
			needLogin: !0
		},
		copyJourney: {
			params: {
				cat: "ujourney",
				opt: "copyJourney"
			},
			method: "POST",
			needLogin: !0
		},
		getMyJourney: {
			params: {
				cat: "ujourney",
				opt: "getJourneyList"
			},
			method: "POST",
			needLogin: !0
		},
		updateJourney: {
			params: {
				cat: "ujourney",
				opt: "UpdateJourney"
			},
			method: "POST",
			needLogin: !0
		},
		likeJourney: {
			params: {
				cat: "ujourney",
				opt: "like"
			},
			method: "POST",
			needLogin: !0
		},
		delJourney: {
			params: {
				cat: "ujourney",
				opt: "delete"
			},
			method: "POST",
			needLogin: !0
		},
		mergeJourney: {
			params: {
				cat: "ujourney",
				opt: "mergeJourney"
			},
			method: "POST",
			needLogin: !0
		},
		getCurJourney: {
			params: {
				cat: "ujourney",
				opt: "GetCurrentJourney"
			},
			method: "POST",
			needLogin: !0
		},
		getDepartCity: {
			params: {
				cat: "user2",
				opt: "getDepartCity"
			},
			method: "POST"
		},
		setCurJourney: {
			params: {
				cat: "ujourney",
				opt: "setCurrentJourney"
			},
			method: "POST",
			needLogin: !0
		},
		markPoi: {
			params: {
				cat: "upoi",
				opt: "mark"
			},
			method: "POST"
		},
		getMarkPoi: {
			params: {
				cat: "upoi",
				opt: "getMarkPoiList"
			},
			method: "POST",
			needLogin: !0
		},
		getStory: {
			params: {
				cat: "ustory",
				opt: "getStoryList"
			},
			method: "POST",
			needLogin: !0
		},
		likeStory: {
			params: {
				cat: "ustory",
				opt: "like"
			},
			method: "POST",
			needLogin: !0
		},
		newStory: {
			params: {
				cat: "ustory",
				opt: "createstory"
			},
			method: "POST",
			needLogin: !0
		},
		editStory: {
			params: {
				cat: "ustory",
				opt: "saveupdate"
			},
			method: "POST",
			needLogin: !0
		},
		delStory: {
			params: {
				cat: "ustory",
				opt: "delete"
			},
			method: "POST",
			needLogin: !0
		},
		getOrderList: {
			params: {
				cat: "uorder",
				opt: "getOrderList"
			},
			method: "POST",
			needLogin: !0
		},
		getOrderDetail: {
			params: {
				cat: "order",
				opt: "getOrderDetail"
			},
			method: "POST",
			needLogin: !0
		},
		getContacts: {
			params: {
				cat: "user2",
				opt: "getContacts"
			},
			method: "POST",
			needLogin: !0
		},
		updateContact: {
			params: {
				cat: "user2",
				opt: "updateContact"
			},
			method: "POST",
			needLogin: !0
		},
		getPostcardList: {
			params: {
				cat: "upostcard",
				opt: "getList"
			},
			method: "POST",
			needLogin: !0
		},
		getPostcardDetail: {
			params: {
				cat: "upostcard",
				opt: "getDetail"
			},
			method: "POST"
		},
		deletePostcard: {
			params: {
				cat: "upostcard",
				opt: "delete"
			},
			method: "POST",
			needLogin: !0
		}
	})
}]).factory("resOrder", ["$resource", function(e) {
	return e("/api/order/:opt", null, {
		getInfo: {
			params: {
				opt: "getPdInfo"
			},
			method: "POST",
			needLogin: !0
		},
		getAvailDate: {
			params: {
				opt: "GetAvailDateByMonth"
			},
			method: "POST",
			needLogin: !0
		},
		checkCode: {
			params: {
				opt: "CouponValid"
			},
			method: "POST",
			needLogin: !0
		},
		submit: {
			params: {
				opt: "submit"
			},
			method: "POST",
			needLogin: !0
		},
		getWeixPayid: {
			url: "/weixin/AppUnifiedOrder",
			method: "POST",
			needLogin: !0
		},
		getAliPayid: {
			url: "/alipayappsdk/orderpay",
			method: "POST",
			needLogin: !0
		}
	})
}]).factory("resFileUpload", ["$resource", function(e) {
	return e("/api/systerm/:action", null, {
		getToken: {
			params: {
				action: "getqntoken"
			},
			method: "POST"
		},
		getTestToken: {
			params: {
				action: "getqntesttoken"
			},
			method: "POST"
		},
		getAudioMP3Token: {
			params: {
				action: "getqnaudiotoken"
			},
			method: "POST"
		},
		getTestAudioMP3Token: {
			params: {
				action: "getqnaudiotesttoken"
			},
			method: "POST"
		}
	})
}]).factory("resPostcard", ["$resource", function(e) {
	return e("/api/:cat/:opt", null, {
		getAddress: {
			params: {
				cat: "position",
				opt: "fixbygps"
			},
			method: "POST"
		},
		randomTextByPoi: {
			params: {
				cat: "wish",
				opt: "searchbypoi"
			},
			method: "POST"
		},
		searchPosition: {
			params: {
				cat: "position",
				opt: "search"
			},
			method: "POST"
		},
		getTemplate: {
			params: {
				cat: "postcard",
				opt: "getTemplate"
			},
			method: "POST"
		},
		save: {
			params: {
				cat: "postcard",
				opt: "save"
			},
			method: "POST"
		},
		saveRawImage: {
			params: {
				cat: "postcard",
				opt: "saverawimage"
			},
			method: "POST",
			loading: !1
		},
		saveMailAddress: {
			params: {
				cat: "postcard",
				opt: "savemailaddress"
			},
			method: "POST"
		}
	})
}]).factory("resActivity", ["$resource", function(e) {
	return e("/api/activity/:opt", null, {
		comment: {
			params: {
				opt: "comment"
			},
			method: "POST"
		},
		like: {
			params: {
				opt: "like"
			},
			method: "POST"
		}
	})
}])