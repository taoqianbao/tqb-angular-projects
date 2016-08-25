angular.module("app.poi.modal.service", []).factory("cardModal", ["$rootScope", "$timeout", "$ionicModal", "$ionicGesture", "$ionicScrollDelegate", "CONFIG", "cacheLocal", "statusBar", function(e, t, o, i, n, a, r, s) {
	e.cardModal = {
		audioCard: {},
		isPaused: !0,
		barShow: !1,
		devHeight: a.devHeight,
		imgSizeCard: a.imgSizeCard
	};
	var c = !1,
		l = !1,
		d = null,
		u = null,
		p = function(t) {
			e.cardModal.barShow = t, e.cardModal.modal.isShown() || (e.cardModal.modal.show(), ionic.Platform.ready(function() {
				s.hide()
			}))
		},
		m = function() {
			e.cardModal.modal.isShown() && (e.cardModal.modal.hide(), s.show())
		};
	if (r.system.get("visited")) {
		var h = r.system.info("visited").created;
		h = new Date(h);
		var g = new Date;
		l = h.getFullYear() == g.getFullYear() && h.getMonth() == g.getMonth() && h.getDate() == g.getDate()
	}
	return r.system.put("visited", !0), e.$on("$mediaReady", function() {
		e.cardModal.audioCard.options.setAutoplay(!1), e.cardModal.audioCard.options.setControls(!1), e.cardModal.audioCard.sources.add(e.cardModal.card.audio.src)
	}), {
		load: function() {
			o.fromTemplateUrl("app/poi/modal/templates/postcardModal.html", {
				scope: e,
				animation: "min"
			}).then(function(t) {
				e.cardModal.modal = t, l || p(!1), e.cardModal.onClickList = function(t) {
					c || (e.cardModal.barShow = !e.cardModal.barShow, t.stopPropagation())
				}, e.cardModal.onDragUp = function() {
					c = !0, d = e.cardModal.modal.el.querySelector(".list"), u = e.cardModal.modal.el.querySelector(".mask"), move(d).duration("1s").scale(.9, .9).end(), move(u).duration("1s").set("background", "rgba(10,10,10, 0.3)").end()
				}, e.cardModal.onRelease = function() {
					c && (n.$getByHandle("postcard").scrollTop(!0), move(d).duration("1s").scale(1, 1).end(), move(u).duration("1s").set("background", "none").end(function() {
						c = !1, d = null, u = null
					}))
				}, e.cardModal.onClickMark = function(t) {
					e.cardModal.card.is_marked = !e.cardModal.card.is_marked, t.stopPropagation()
				}, e.cardModal.onClickPlay = function(t) {
					e.cardModal.audioCard.options.isPaused() ? e.cardModal.audioCard.controls.play() : e.cardModal.audioCard.controls.pause(), e.cardModal.isPaused = !e.cardModal.isPaused, t.stopPropagation()
				}, e.cardModal.onClickShrink = function(e) {
					m(), e.stopPropagation()
				}
			})
		},
		show: function() {
			p(!0)
		},
		hide: function() {
			m()
		}
	}
}]).factory("storyModal", ["modal", "$document", "$timeout", "$state", "resUser", "logicTip", function(e, t, o, n, a, r) {
	return {
		load: function(t, s) {
			var c = t,
				l = !1;
			return c.$on("$ionicView.beforeLeave", function() {
				var t = e.getModal(s, c);
				t && (l = t.isShown(), t.hide())
			}), c.$on("$ionicView.beforeEnter", function() {
				if (l) {
					var t = e.getModal(s, c);
					t && o(function() {
						t.show()
					}, 300)
				}
			}), c.onClickStoryTitle = function(e, t) {
				n.go("app.poiDetail", {
					id: e,
					title: t
				})
			}, c.onStoryDrag = function() {
				t.story.titleShown = !1
			}, c.onStoryRelease = function() {
				o(function() {
					t.story.titleShown = !0
				}, 500)
			}, c.onClickMarkPoi = function(e, o) {
				e.stopPropagation();
				var i = 0;
				i = c.poi ? c.poi.is_marked ? 0 : 1 : t.story.poiMarked ? 0 : 1, a.markPoi({
					poi_id: o,
					action: i
				}, function(e) {
					0 == e.data.code && (t.story.poiMarked = !t.story.poiMarked, c.list.updatePoiMarked(o, t.story.poiMarked), c.poi && (c.poi.is_marked = !c.poi.is_marked, c.modified = !0))
				})
			}, c.onClickLike = function(e) {
				var o = t.stories[e],
					i = o.liked ? 0 : 1;
				a.likeStory({
					story_id: o.id,
					action: i
				}, function(e) {
					0 == e.data.code && (o.liked ? o.like -= 1 : o.like += 1, o.liked = !o.liked)
				})
			}, c.onClickStoryAuthor = function(e, t, o) {
				e.stopPropagation(), n.go("app.userHome", {
					id: t,
					name: o
				})
			}, c.onClickStoryComment = function(e, t) {
				n.go("app.commentList", {
					type: "story",
					id: e,
					title: t
				})
			}, t.$on("modal.hidden", function(e, o) {
				o.__name == s && (t.story.audioPaused || (t.story.audioPaused = !0, t.story.audio.controls.pause()))
			}), c.onStorySlideChanged = function(e) {
				t.$emit("storySlideChange", e), t.story.index = e, t.story.city = t.stories[e].city, t.story.poiId = t.stories[e].poi_id, t.story.poiName = t.stories[e].poi_name, t.story.poiMarked = t.stories[e].poi_marked, t.stories[e].audio_src && "" != t.stories[e].audio_src ? (t.story.audioShown = !0, t.story.audioName = t.stories[e].audio_name, t.story.audioDuration = t.stories[e].audio_duration, t.story.audio.sources.add(t.stories[e].audio_src)) : t.story.audioShown = !1, t.story.audioPaused || (t.story.audioPaused = !0, t.story.audio.controls.pause())
			}, c.onClickPlay = function() {
				t.story.audioPaused = !t.story.audioPaused, t.story.audio.options.isPaused() ? t.story.audio.controls.play() : t.story.audio.controls.pause()
			}, c.list = {
				updatePoiMarked: function(e, o) {
					for (i = 0; i < t.stories.length; i++) t.stories[i].poi_id == e && (t.stories[i].poi_marked = o)
				}
			}, r.storyModal(t), e.createModal(s, "app/poi/modal/templates/storyModal.html", "round-right-down", !1, c)
		}
	}
}])