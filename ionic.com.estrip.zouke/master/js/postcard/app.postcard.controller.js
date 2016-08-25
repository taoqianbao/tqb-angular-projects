angular.module("app.postcard.controller", []).controller("postcardTemplate", ["$scope", "$state", "$cordovaImagePicker", "viewArgument", "file", "convert", "$cordovaFile", "$timeout", "statusBar", function(e, t, o, i, n, a, r, s, c) {
	function l(e, o) {
		e && 0 === e.length || (i.put(e), t.go("app.postcardFilter", {
			template: o
		}))
	}
	e.selectTemplate = function(e) {
		switch (e) {
			case "rome":
			case "alone":
				window.cordova ? (s(function() {
					JAlert.show("加载图片..."), c.hide(), c.fullScreen(!0)
				}, 300), navigator.camera.getPicture(function(t) {
					l([t], e), navigator.camera.cleanup(function() {}, function() {})
				}, function() {
					JAlert.hide(), c.show(), c.fullScreen(!1), console.log("fail", arguments), navigator.camera.cleanup(function() {}, function() {})
				}, {
					quality: 100,
					destinationType: navigator.camera.DestinationType.DATA_URL,
					sourceType: navigator.camera.PictureSourceType.PHOTOLIBRARY,
					encodingType: navigator.camera.EncodingType.JPEG,
					saveToPhotoAlbum: !1,
					targetWidth: 720,
					targetHeight: 720,
					mediaType: navigator.camera.MediaType.PICTURE,
					correctOrientation: !0
				})) : l([{
					data: "/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAMCAgICAgMCAgIDAwMDBAYEBAQEBAgGBgUGCQgKCgkICQkKDA8MCgsOCwkJDRENDg8QEBEQCgwSExIQEw8QEBD/2wBDAQMDAwQDBAgEBAgQCwkLEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBD/wAARCAAFAAUDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwD50ooor8MP9Uz/2Q=="
				}], e)
		}
	}
}]).controller("pictureSelect", ["$scope", "$stateParams", function() {}]).controller("postcardFilter", ["$scope", "viewArgument", "convert", "canvasResize", "$timeout", "$stateParams", "PhotoManager", "$ionicHistory", "$rootScope", "$cordovaFile", "Recorder", "$cordovaDatePicker", "$cordovaImagePicker", "$cordovaGeolocation", "resPostcard", "modal", "file", "$ionicScrollDelegate", "statusBar", "$cordovaKeyboard", "CONFIG", "$ionicActionSheet", "weixinShare", "mHistory", "$ionicPlatform", function(e, t, o, i, n, a, r, s, c, l, d, u, p, m, h, g, f, y, _, v, w, S, b, k, $) {
	function x(t) {
		if (e.showPan = "" == t ? !1 : e.panName === t ? !e.showPan : !0, "t" in x && n.cancel(x.t), e.showPan)
			if (e.panName = t, "filters" === t) e.popUpShow = !0, x.s && (y.scrollBy(0, -100, !0), x.s = !1);
			else {
				var o = e.popUpShow ? 500 : 100;
				e.popUpShow = !1, x.t = n(function() {
					x.s = !0, y.scrollBy(0, 100, !0)
				}, o)
			} else e.panName = "", x.s ? (y.scrollBy(0, -100, !0), x.s = !1) : e.popUpShow = !1
	}

	function P() {
		var e = E.position;
		e > E.time ? e = E.time : E.t = n(arguments.callee, 50), E.p = e
	}

	function C() {
		function t() {
			e._hasUploading = !0, JAlert.show("正在保存..."), a.timeout = !1, R.date = e.date.valueOf(), R.address_id = e.positionInfo.id, R.address_name = e.positionInfo.en_name || e.positionInfo.zh_name, R.text = e.textString.value.trim(), R.text_id = R.text === e.textOP.rawText ? e.textOP.rawId : "0", R.text_size = e.textStyle.fontSize, R.text_font = e.textStyle.fontFamily, R.author = e.authorString.value.trim(), R.length = 2, E.hasRecordFile && ++R.length, n(), E.hasRecordFile && (R.duration = E.time, l.readAsDataURL(E.path, E.name).then(function(e) {
				a(s, u, o.dataURLtoBlob(e), "audio")
			}, function(e) {
				console.log("audio read fail:", e)
			})), html2canvas(document.querySelector(".postcard-filter .imageContainer"), {
				onrendered: function(t) {
					e.saveCanvas = t, a(r, "postcard/" + c.user.info.user_id + "_main_" + d + ".jpg", o.dataURLtoBlob(o.canvasToDataUrl(t, "image/jpeg")), "main")
				},
				useCORS: !0
			}).then(function() {
				html2canvas(document.querySelector(".postcard-filter"), {
					onrendered: function(t) {
						e.saveCanvas = t, a(r, "postcard/" + c.user.info.user_id + "_clip_" + d + ".jpg", o.dataURLtoBlob(o.canvasToDataUrl(t, "image/jpeg")), "clip")
					},
					useCORS: !0
				})
			}).then(function() {
				if ("wifi" === c.user.networkState) {
					var e = "postcard/" + c.user.info.user_id + "_raw_" + d + ".jpg";
					f.upload2({
						token: r,
						name: e,
						file: o.dataURLtoBlob(o.canvasToDataUrl(O[0]._originCanvas, "image/jpeg"))
					}, function() {
						_ = e, i()
					}, function() {}, function() {}, function() {})
				}
			})
		}

		function i() {
			y && _ && h.saveRawImage({
				postcard_id: y,
				img_url: _
			})
		}

		function n() {
			p = [], m = R.length
		}

		function a(t, o, n, r) {
			function s() {
				switch (r) {
					case "main":
						e.share.main_url = "http://cdn3.zouke.com/" + o;
						break;
					case "clip":
						e.share.clip_url = "http://cdn3.zouke.com/" + o
				}
				R[r + "_url"] = o, --R.length, 0 === R.length && (delete R.length, JAlert.hide(), h.save(R, function(t) {
					0 === t.data.code && (g.getModal("savePostcard").show(), y = e.share.id = e.sendInfo.id = t.data.id, i())
				}))
			}
			if (n) {
				var c = {
					p: 0
				};
				p.push(c), p[o] = c, f.upload2({
					token: t,
					name: o,
					file: n
				}, s, function() {
					e.clipNow = !1, JAlert.hide(), JAlert.notify("图片保存出错!")
				}, function() {
					a.timout || (a.timout = !0, e.clipNow = !1, JAlert.hide(), JAlert.notify("图片保存超时"))
				}, function(e) {
					p[o].p = e.loaded / e.total;
					for (var t = 0, i = 0; i < p.length; ++i) t += p[i].p;
					var n = (t / m * 100).toFixed(1);
					n > 99 && (n = 99), JAlert.show("正在保存 " + n + "%", !0)
				})
			} else s()
		}
		if (!e.positionInfo || !e.positionInfo.en_name && !e.positionInfo.zh_name) return void JAlert.showOnce("明信片信息不完整");
		var r = "",
			s = "",
			d = (new Date).valueOf(),
			u = "postcard/" + c.user.info.user_id + "_audio_" + d + E.name;
		return void(c.user.isAndroid && E.hasRecordFile ? (f.getMP3Token(u, function(e) {
			s = e, r && t()
		}, function() {
			e.clipNow = !1
		}), f.getToken(function(e) {
			r = e, s && t()
		}, function() {
			e.clipNow = !1
		})) : f.getToken(function(e) {
			r = s = e, t()
		}, function() {
			e.clipNow = !1
		}));
		var p, m, y, _
	}

	function T() {
		B = n(function() {
			e.random = Math.floor(10 * Math.random()), B = n(arguments.callee, 100)
		}, 100)
	}

	function A() {
		n.cancel(B)
	}

	function M() {
		return e.prepublish ? void angular.element(document.querySelector(".publish-bar>span")).triggerHandler("click") : void(e.clipNow ? k.isEmpty() || k.goBack() : e.back(!0))
	}
	n(function() {
		y.freezeScroll(!0), y.$getByHandle("image-filter").freezeScroll(!1)
	});
	var I = {
			getPicture: function(e, t, o, i) {
				navigator.camera.getPicture(e, t, {
					quality: 100,
					destinationType: navigator.camera.DestinationType.DATA_URL,
					sourceType: navigator.camera.PictureSourceType.PHOTOLIBRARY,
					encodingType: navigator.camera.EncodingType.JPEG,
					saveToPhotoAlbum: !1,
					targetWidth: o,
					targetHeight: i,
					mediaType: navigator.camera.MediaType.PICTURE,
					correctOrientation: !0
				})
			},
			getPictureList: function(e, t, o, i, n, a) {
				window.imagePicker.getPictures(e, t, {
					maximumImagesCount: i,
					minimumImagesCount: o,
					width: n,
					height: a,
					quality: 100
				})
			},
			clip: function(e, t, i) {
				var n = new Image;
				n.addEventListener("load", function() {
					i && i(o.clip(n, t, t, "cover"), t)
				}), n.src = e
			},
			getPosition: function(t, o, i) {
				R.lat = t, R.lng = o, h.getAddress({
					lat: t,
					lng: o
				}, function(t) {
					0 === t.data.code && (e.hasActivity = t.data.in_activity, e.positionList = t.data.list, e.positionInfo = e.positionList[0], e.textOP._tempRandomText = t.data.briefs, e.textOP._page = 1, e.textOP._pointer = -1, e.textOP.next(), e.templateImageList = t.data.imgs, i && i())
				}, function() {
					JAlert.confirm("加载超时, 是否重试?", function() {
						I.getPosition(t, o, i)
					}, function() {})
				})
			},
			getFixPosition: function(e, t) {
				null == e || null == t ? (JAlert.notify("无法获取图片位置信息"), m.getCurrentPosition({
					timeout: 2e3,
					maximumAge: 3e4,
					enableHighAccuracy: !0
				}).then(function(e) {
					I.getPosition(e.coords.latitude, e.coords.longitude)
				}, function() {
					JAlert.notify("定位失败！"), I.getPosition("", "")
				})) : n(function() {
					I.getPosition(e, t)
				})
			}
		},
		L = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAGUlEQVQYV2O8e/fufwYiAOOoQnyhRP3gAQBG4CPnByUIhQAAAABJRU5ErkJggg==";
	e.templateImageList = [L, L, L, L];
	var D = t.get(),
		O = [];
	O.bindIndex = 0, n(function() {
		for (var e = document.querySelectorAll(".imageContainer canvas"), t = 0, o = D.length; o > t; ++t) O[t] = new r(e[t], "data:image/jpeg;base64," + D[t].data);
		JAlert.hide()
	}, 300);
	var j = e.template = a.template;
	e.hasStamp = !0, e.textString = {
			value: ""
		}, e.filterNames = r.filterNames, e.fontNames = ["fzjl"], e.authorString = {
			value: c.user.info.user_name
		}, e.textStyle = {
			fontSize: "20px",
			fontFamily: e.fontNames[0]
		}, e.date = new Date, e.positionList = [], e.positionInfo = null,
		function() {
			I.getFixPosition(D[0].lat, D[0].lng)
		}(), e.chooseAddress = function(t) {
			return window.cordova && v.isVisible() ? void v.close() : (t && (e.positionInfo = t), void g.getModal("addressSelect").hide())
		}, e.search = {
			keyword: ""
		}, e.$watch("search.keyword", function(t) {
			t && h.searchPosition({
				key_word: t
			}, function(t) {
				0 === t.data.code && (e.positionList = t.data.list, y.$getByHandle("postcard-poi").scrollTop())
			})
		}), g.createModal("addressSelect", "app/postcard/templates/poiSearchModal.html", "up", !0, e), g.createModal("savePostcard", "app/postcard/templates/saveModal.html", "up", !0, e, !1), e.showManageOperator = !1, e.showTextOperator = !1, e.showRecorderOperator = !1, e.showStampOperator = !1, e.showPan = !1, e.panName = "", e.imageOperator = function(t, o) {
			e.showManageOperator = !e.showManageOperator, x(e.showManageOperator ? "filters" : ""), e.showTextOperator = !1, e.showRecorderOperator = !1, e.showStampOperator = !1, O.bindIndex = o, t.stopPropagation()
		}, e.textOperator = function(t) {
			e.showTextOperator = !e.showTextOperator, x(e.showTextOperator ? "text" : ""), e.showManageOperator = !1, e.showRecorderOperator = !1, e.showStampOperator = !1, t.stopPropagation()
		}, e.stampOperator = function(t) {
			e.showManageOperator = !1, e.showTextOperator = !1, e.showPan = !1, e.showRecorderOperator = !1, e.showStampOperator = !e.showStampOperator, t.stopPropagation()
		}, e.closeOperator = function() {
			e.showManageOperator = !1, e.showTextOperator = !1, e.showRecorderOperator = !1, x(""), e.showStampOperator = !1
		}, e.recorderOperator = function() {
			e.showManageOperator = !1, e.showTextOperator = !1, x(""), e.showRecorderOperator = !0, e.showStampOperator = !1
		}, e.selectDate = function() {
			u.show({
				date: e.date,
				mode: "date",
				allowOldDates: !0,
				allowFutureDates: !0,
				doneButtonLabel: "选择",
				doneButtonColor: "#5FB2B2",
				cancelButtonLabel: "取消",
				cancelButtonColor: "#666666"
			}).then(function(t) {
				t && (e.date = t)
			})
		}, e.selectAddress = function() {
			g.getModal("addressSelect", e).show().then(function() {
				y.$getByHandle("postcard-poi").freezeScroll(!1)
			})
		}, e.stampOP = {
			remove: function() {
				e.hasStamp = !1
			}
		}, e.imageOP = {
			filter: function() {
				x("filters")
			},
			rotate: function() {
				++O[O.bindIndex].rotate
			},
			render: function(e) {
				O[O.bindIndex].render(e)
			},
			get filterName() {
				var e = O[O.bindIndex];
				return e ? e.filter : ""
			},
			reSelectImage: function(t) {
				function o() {
					console.log("getPicture fail")
				}

				function i(t, o) {
					I.clip(t, 160, function(t) {
						e.$apply(function() {
							e.templateImageList[o] = t
						})
					})
				}
				angular.isNumber(t) ? c.user.isIOS ? I.getPictureList(function(e) {
					for (var t = 0, o = e.length; o > t; ++t) i("data:image/jpeg;base64," + e[t].data, t);
					console.log(e)
				}, o, 1, 4, 160, 160) : I.getPicture(function(e) {
					i("data:image/jpeg;base64," + e.data, t)
				}, o, 160, 160) : I.getPicture(function(t) {
					e.closeOperator(), O[O.bindIndex] = new r(O[O.bindIndex]._canvas, "data:image/jpeg;base64," + t.data), I.getFixPosition(t.lat, t.lng)
				}, o, 720, 720)
			}
		}, e.textOP = {
			text: function() {
				x("text")
			},
			font: function() {
				x("fonts")
			},
			bigger: function() {
				var t = parseFloat(e.textStyle.fontSize) + 2;
				t > 32 && (t = 32), e.textStyle.fontSize = t + "px"
			},
			smaller: function() {
				var t = parseFloat(e.textStyle.fontSize) - 2;
				14 > t && (t = 14), e.textStyle.fontSize = t + "px"
			},
			setFont: function(t) {
				e.textStyle.fontFamily = t
			},
			next: function() {
				++this._pointer, this._tempRandomText && this._tempRandomText[this._pointer] ? e.textString.value = this._tempRandomText[this._pointer].brief : this._randomText(function(t) {
					0 === t.data.code && (e.textOP._tempRandomText = e.textOP._tempRandomText.concat(t.data.list), e.textString.value = e.textOP._tempRandomText[e.textOP._pointer].brief)
				})
			},
			pre: function() {
				this._pointer > 0 && (--this._pointer, e.textString.value = this._tempRandomText[this._pointer].brief)
			},
			_tempRandomText: null,
			_page: 1,
			_randomText: function(t) {
				++this._page, h.randomTextByPoi({
					id: e.positionInfo.id,
					page: this._page
				}, t)
			},
			_pointer: 0,
			get pointer() {
				return this._pointer
			},
			get rawText() {
				return this._tempRandomText ? this._tempRandomText[this._pointer].brief : ""
			},
			get rawId() {
				return this._tempRandomText ? this._tempRandomText[this._pointer].id : ""
			},
			authorName: function(t) {
				e.showManageOperator = !1, e.showTextOperator = !1, e.showRecorderOperator = !1, e.showStampOperator = !1, x("authorName"), t.stopPropagation()
			}
		};
	var E = e.recorderOP = new d("recorder");
	E.p = 0, E.play = function() {
		d.prototype.play.call(this), E.t = n(P, 50)
	}, E.stop = function() {
		d.prototype.stop.call(this), n.cancel(E.t)
	}, E.startRecord = function() {
		d.prototype.startRecord.call(this), E.ttt = n(function() {
			E.stopRecord()
		}, 9e4), T()
	}, E.stopRecord = function() {
		E.tt && n.cancel(E.tt), E.ttt && n.cancel(E.ttt), e.showRecorderTip = !0, E.tt = n(function() {
			delete e.showRecorderTip
		}, 1500), d.prototype.stopRecord.call(this), A()
	}, E.toggleRecord = function() {
		this.isRecording ? this.stopRecord() : this.startRecord()
	}, E.getTime = function() {
		if (this.time) {
			var e = Math.floor(this.time / 6e4),
				t = Math.floor(this.time % 6e4 / 1e3),
				o = "";
			0 != e && (o += e + "'"), o += t + '"';
			var i = this.p;
			if (this.isPlaying) {
				o = "";
				var n = Math.floor(i / 6e4),
					a = Math.floor(i % 6e4 / 1e3);
				0 != e && (o += n + "'"), o += a + '"'
			}
			return o
		}
	};
	var R = e.saveInfo = {
		template: j,
		version: 1,
		audio_url: "",
		main_url: "",
		clip_url: "",
		allow_open: !0,
		text_id: "",
		text: "",
		text_size: "",
		text_font: "",
		address_id: "",
		address_name: "",
		date: "",
		author: "",
		duration: 0,
		lat: "",
		lng: ""
	};
	e.save = function() {
		e.prepublish = !0, e.clipNow = !0, E.stopRecord(), E.stop()
	}, e.stopPublish = function() {
		e.prepublish = !1, e.clipNow = !1
	}, e.publish = function() {
		e.prepublish = !1, n(C, 200)
	}, e.toggleOpen = function() {
		R.allow_open = !R.allow_open
	}, e.back = function(e) {
		e ? JAlert.confirm("确认退出编辑?", function() {
			s.goBack(), _.show(), _.fullScreen(!1)
		}, function() {}) : (s.goBack(), _.show(), _.fullScreen(!1))
	}, e.random = 0;
	var B = 0;
	e.textareaBlur = function() {
		n(function() {
			e.showPan ? y.scrollBottom(!0) : y.scrollTop(!0)
		}, 200)
	}, e.$on("$destroy", function() {
		e.recorderOP.release()
	}), e.defaultLayer = "main", e.share = function() {
		function t() {
			JAlert.notify("已分享")
		}

		function o() {
			JAlert.notify("分享失败")
		}
		var i = {
				url: w.hostWWW + "/postcard/detail?id=" + arguments.callee.id + "&uid=" + c.user.info.user_id,
				title: "有声音的明信片·有故事的旅行",
				desc: e.textString.value.replace(/\n/g, " "),
				image: arguments.callee.main_url + "-weixin"
			},
			n = arguments.callee.clip_url;
		S.show({
			buttons: [{
				text: '<i class="ic ic-weixin"></i>微信好友'
			}, {
				text: '<i class="ic ic-weixin-moment"></i>朋友圈（完整卡片）'
			}, {
				text: '<i class="ic ic-weixin-moment"></i>朋友圈（静态图片）'
			}],
			cssClass: "share-sheet",
			cancelText: "取消",
			cancel: function() {},
			buttonClicked: function(a) {
				switch (a) {
					case 0:
						b.page2Friend(i, t, o);
						break;
					case 1:
						i.desc = "「" + (e.positionInfo.city || "欧优游") + "」寄出: " + i.desc, b.page2Timeline(i, t, o);
						break;
					case 2:
						b.image2Timeline(n, t, o)
				}
				return !0
			}
		})
	}, e.saveToLocal = function() {
		JAlert.showOnce("正在保存.."), window.canvas2ImagePlugin.saveImageDataToLibrary(function() {
			JAlert.notify("保存成功")
		}, function(e) {
			JAlert.notify(e)
		}, e.saveCanvas)
	}, e.sendInfo = {
		id: "",
		from_name: "",
		from_zipcode: "",
		from_address: "",
		to_name: "",
		to_zipcode: "",
		to_address: ""
	}, e.send = function() {
		e.sendInfo.from_name = e.saveInfo.author, n(function() {
			k.go("postcard")
		}, 300)
	}, e.mBack = function() {
		k.goBack(), window.cordova && v.isVisible() && v.close()
	}, e.sendPostcard = function() {
		e.sendInfo.to_name && e.sendInfo.to_zipcode && e.sendInfo.to_address ? h.saveMailAddress(e.sendInfo, function(e) {
			0 === e.data.code ? (JAlert.alert(0 === e.data.type ? "提交成功!\n欧优游将尽快为你打印并邮寄明信片" : "亲!你已超过免费邮寄的限额"), k.goBack()) : JAlert.notify(e.data.msg)
		}) : JAlert.notify("信息未填写完整!")
	};
	var F;
	e.$on("$ionicView.afterEnter", function() {
		F = $.registerBackButtonAction(M, 201)
	}), e.$on("$ionicView.beforeLeave", function() {
		F()
	})
}])

