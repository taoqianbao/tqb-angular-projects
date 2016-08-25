angular.module("app.controllers.chat", []).controller("chatHomeCtrl", ["$scope", "$rootScope", "$state", "$timeout", "$document", "$ionicScrollDelegate", "$ionicHistory", "cacheLocal", "$ionicPlatform", "resChat", "CONFIG", "viewArgument", "RootScopeProxy", "logicTip", function(e, t, o, i, n, a, r, s, c, l, d, u, p, m) {
	e.msgWidth = d.devWidth - 62 + 16, e.messages = [], e.msgModel = {}, e.msgNofity = "", e.tipsScroll = a.$getByHandle("chat-tips"), e.chatScroll = a.$getByHandle("chat"), e.showNofity = !1, e.imgSizeThumb = d.imgSizeThumb, e.$on("$ionicView.afterEnter", function(t, o) {
		if (e.messages.length <= 1) {
			var n = s.system.get("messages") || [];
			n.length > 0 && (e.messages = e.messages.concat(n))
		}
		"back" != o.direction && i(function() {
			e.chatScroll.resize(), e.chatScroll.scrollBottom(!1)
		}, 50)
	}), e.$on("$ionicView.afterLeave", function() {
		s.system.put("messages", e.messages.slice(1, e.messages.length))
	}), e.onClickHot = function(t, o) {
		e.showChat(), i(function() {
			e.sendMessage(o)
		}, 500)
	}, e.onFocusInput = function() {
		e.chatScroll.scrollBottom(!0)
	}, e.onBlurInput = function() {
		e.chatScroll.scrollBottom(!0)
	}, e.onClickItem = function(e, t, i) {
		var n = "";
		for (var a in i) n += 0 == a ? i[a] : "," + i[a];
		switch (e) {
			case "journey":
				o.go("app.journeyList", {
					type: "chat",
					option: t,
					filter: !1,
					title: "行程 - " + n
				});
				break;
			case "poi":
				o.go("app.poiList", {
					type: "chat",
					option: t,
					filter: !1,
					title: "兴趣点 - " + n
				});
				break;
			case "story":
				o.go("app.storyList", {
					type: "chat",
					option: t,
					filter: !1,
					title: "故事 - " + n
				});
				break;
			case "product":
				o.go("app.productList", {
					type: "chat",
					option: t,
					filter: !1,
					title: "特惠 - " + n
				});
				break;
			case "article":
				o.go("app.articleList", {
					type: "chat",
					option: t,
					filter: !1,
					title: "问答 - " + n
				})
		}
	}, e.onClickText = function(t) {
		if ("A" != t.target.nodeName) {
			var o = t.target.innerText;
			e.sendMessage(o)
		}
	}, e.isVoiceMethod = !1, e.switchInputMethod = function(o) {
		if (e.isVoiceMethod = !e.isVoiceMethod, e.isVoiceMethod) t.user.isIOS && window.cordova && navigator.wxvoice.check({}, function(e) {
			switch (e.code) {
				case 0:
					break;
				case 1:
					JAlert.alert("没有录音权限\n请在「设置」->「隐私」->「麦克风」中打开")
			}
		}, function(e) {
			console.log("error~~~~~~~~~~~~~~~~~" + e)
		});
		else {
			var n = o.currentTarget.parentNode.querySelector("input");
			e.isStartRecord = !1, i(function() {
				n.focus()
			}, 500)
		}
	}, e.showMessage = function(t) {
		return "" == t ? !1 : void l.getMessage({
			category: "all",
			key_word: t
		}, function(o) {
			0 == o.data.code && (o.data.input = t, o.data.logo = "img/icon-new/chat/default.png", e.messages.push({
				msg: o.data
			}), e.chatScroll.resize(), e.chatScroll.scrollBottom(!0))
		})
	}, i(function() {
		e.showMessage("hotword")
	}, 500), m.chatHome(), e.sendMessage = function(t) {
		return "" == t ? !1 : (e.messages.push({
			msg: t,
			client: !0
		}), e.msgModel.input = "", i(function() {
			e.chatScroll.resize(), e.chatScroll.scrollBottom(!0)
		}), void l.getMessage({
			category: "all",
			key_word: t
		}, function(o) {
			if (0 == o.data.code) {
				var i, n = parseInt(10 * Math.random());
				"tips" == o.data.type ? i = "img/icon-new/chat/notfound" + n % 4 + ".png" : "list" == o.data.type && (i = "img/icon-new/chat/success" + n % 5 + ".png"), o.data.input = t, o.data.logo = i, e.messages.push({
					msg: o.data
				}), e.chatScroll.resize(), e.chatScroll.scrollBottom(!0)
			}
		}))
	};
	var h = !1,
		g = 0,
		f = function() {
			e.isStartRecord = !1, t.user.isIOS && window.cordova && navigator.wxvoice.close()
		};
	e.voiceImg = "recog000", e.isStartRecord = !1, e.recordWait = !1, e.voickOk = !1;
	var y = new p(e);
	e.onVoiceHold = function() {
		if (h = !1, e.voiceImg = "recog000", e.isStartRecord = !0, window.cordova) {
			var t = function() {
				navigator.wxvoice.close(), h = !0, e.isStartRecord = !1
			};
			navigator.wxvoice.start({
				data: "startrecord"
			}, function(e) {
				-1 == e.code
			}, function(e) {
				console.log("error~~~~~~~~~~~~~~~~~" + e)
			});
			var o = !1;
			y.$on("$cordovaPush:voice", function(n, a) {
				if ("status" == a.type) i(function() {
					t()
				}, 800);
				else {
					var r = parseInt(a.msg);
					if (r > 100 && !o) {
						switch (r) {
							case 201:
								t(), JAlert.alert("请检查网络连接");
								break;
							case 301:
								t(), JAlert.notify("语音过短");
								break;
							case 304:
								t(), JAlert.alert("请开启麦克风权限");
								break;
							case 999:
								t(), JAlert.notify("语音识别异常");
								break;
							default:
								g = (new Date).getTime()
						}
						o = !0
					} else e.voiceImg = 9 >= r ? "recog00" + a.msg : "recog009", r > 1 && (e.voickOk = !0)
				}
			})
		}
	}, e.onVoiceRelease = function() {
		if (!h) {
			var t = (new Date).getTime() - g;
			if (1e3 > t) return JAlert.notify("时间太短了，亲！"), void f();
			if (!e.voickOk) return JAlert.notify("声音太低了，亲！"), void f();
			e.voickOk = !1, e.recordWait = !0, window.cordova && navigator.wxvoice.getResult({
				data: "startrecord"
			}, function(t) {
				switch (t.code) {
					case 0:
						e.sendMessage(t.msg);
						break;
					case -301:
						JAlert.notify("未采集到语音");
						break;
					case -201:
						JAlert.notify("网络异常");
						break;
					default:
						JAlert.notify("语音识别异常")
				}
				e.recordWait = !1, e.isStartRecord = !1
			}, function() {
				JAlert.notify("语音识别异常"), e.recordWait = !1, e.isStartRecord = !1
			})
		}
	}
}])
