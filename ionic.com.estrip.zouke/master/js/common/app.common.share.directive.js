
angular.module("app.common.share.directive", []).directive("clickShare", ["$rootScope", "$ionicActionSheet", "CONFIG", function(e, t, o) {
	return {
		scope: {
			obj: "=shareObject"
		},
		link: function(i, n, a) {
			var r = {
				title: "欧优游·有故事的旅行",
				msg: "",
				url: "",
				image: "",
				scene: !1
			};
			n.bind("click", function(n) {
				switch (a.clickShare) {
					case "app":
						r.url = "http://a.app.qq.com/o/simple.jsp?pkgname=com.estrip.zouke", r.title = "欧优游·有故事的旅行", e.user.isSigned ? (r.msg = "我在欧优游，体验一场有故事的旅行，快看！", r.image = e.user.info.avatar) : (r.msg = "发现一款有故事的旅行APP，快来看看！", r.image = o.hostImg + "/app/logo.png-weixin");
						break;
					case "postcard":
						r.url = o.hostWWW + "/postcard/detail?id=" + i.obj.id + "&uid=" + e.user.info.user_id, r.title = "给你·有声音的明信片", r.msg = i.obj.desc, r.image = i.obj.img + o.imgSizeWeixin;
						break;
					case "story":
						r.url = o.hostWWW + "/story/detail2?id=" + i.obj.id + "&uid=" + e.user.info.user_id, r.title = i.obj.name + " | by " + i.obj.user_name, r.msg = i.obj.content.replace(/<[^>]+>/g, ""), r.image = i.obj.image + o.imgSizeWeixin;
						break;
					case "journey":
						r.url = o.hostWWW + "/journey/detail2?id=" + i.obj.id + "&uid=" + e.user.info.user_id, r.title = i.obj.name + " | by " + i.obj.user;
						for (var s = 0, c = 0; c < i.obj.days.length; c++)
							for (var l = 0; l < i.obj.days[c].pois.length && !(s > 1); l++) 0 != s && (r.msg += "; "), r.msg += i.obj.days[c].pois[l].wish_brief, s++;
						r.msg += "...", r.image = i.obj.img + o.imgSizeWeixin;
						break;
					case "product":
						r.url = o.hostWWW + "/production/pdetail?pdId=" + i.obj.pid + "&uid=" + e.user.info.user_id, r.title = i.obj.title, r.msg = i.obj.desc && "" != i.obj.desc ? i.obj.desc : i.obj.brief, r.image = i.obj.images[0] + o.imgSizeWeixin
				}
				var d = t.show({
					buttons: [{
						text: '<i class="ic ic-weixin"></i>微信好友'
					}, {
						text: '<i class="ic ic-weixin-moment"></i>发朋友圈'
					}],
					cssClass: "share-sheet",
					cancelText: "取消",
					cancel: function() {},
					buttonClicked: function(e) {
						switch (e) {
							case 0:
								r.scene = !1;
								break;
							case 1:
								r.scene = !0, "app" == a.clickShare ? r.title = r.msg : "postcard" == a.clickShare && (r.title = "有声明信片: " + r.msg)
						}
						return console.log(r), navigator.weixin && navigator.weixin.send({
							type: "webpage",
							url: r.url,
							title: r.title,
							desc: r.msg,
							imgUrl: r.image,
							isSendToTimeline: r.scene
						}, function() {
							JAlert.notify("已分享"), d()
						}, function() {}), !0
					}
				});
				n.stopPropagation()
			})
		}
	}
}])