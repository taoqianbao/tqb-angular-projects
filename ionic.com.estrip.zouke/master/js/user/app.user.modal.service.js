angular.module("app.user.modal.service", []).factory("settingModal", ["$rootScope", "$ionicHistory", "$timeout", "$cordovaKeyboard", "$cordovaAppRate", "authFactory", "resUser", "resStory", "modal", "loginModal", "mHistory", "file", "random", "setBackViewHome", "statusBar", "genPy", "cacheLocal", function(e, t, o, i, n, a, r, s, c, l, d, u, p, m, h, g, f) {
	function y(e) {
		return h.hide(), e.show()
	}

	function _(e) {
		d.go(e)
	}

	function v() {
		d.goBack()
	}

	function w() {
		return !d.isEmpty()
	}

	function S() {
		return d.hasShow()
	}

	function b() {
		e.settingModal.closed = !0, c.getModal("settingModal").hide(), h.show(), window.cordova && i.isVisible() && i.close(), c.destroyModal("settingModal", e), o(function() {
			delete e.settingModal
		}, 500)
	}

	function k() {
		d.clear(), l.show().then(b)
	}

	function $() {
		a.signOut(function() {
			JAlert.notify("已退出登录"), t.clearCache()
		})
	}

	function x(t) {
		switch (e.settingModal.profile.cat = t, t) {
			case "name":
				e.settingModal.profile.placeholder = "用户名", e.settingModal.profile.data = e.user.info.user_name, d.go("modal.setting.profile");
				break;
			case "tag":
				r.getTags({}, function(t) {
					0 === t.data.code && (e.settingModal.profile.tags = t.data.list)
				}), e.settingModal.profile.placeholder = "标签", e.settingModal.profile.data = {
					__list: e.user.info.tag ? angular.copy(e.user.info.tag) : []
				};
				var o = e.user.info.tag;
				if (o && o.length > 0)
					for (var i = 0, n = o.length; n > i; ++i) e.settingModal.profile.data[o[i]] = !0;
				d.go("modal.setting.tags");
				break;
			case "gender":
				e.settingModal.profile.placeholder = "性别", e.settingModal.profile.data = e.user.info.gender, _("modal.setting.gender");
				break;
			case "brief":
				e.settingModal.profile.placeholder = "一句话简述", e.settingModal.profile.data = e.user.info.brief, d.go("modal.setting.profile");
				break;
			case "contact":
				d.go("modal.setting.contacts")
		}
	}

	function P(t) {
		var o = e.settingModal.profile.data;
		switch (t) {
			case "name":
				r.updateName({
					name: o
				}, function(t) {
					0 == t.data.code && (e.user.info.user_name = o)
				});
				break;
			case "tag":
				r.updateTags({
					tags: 0 === o.__list.length ? "null" : o.__list
				}, function(t) {
					0 == t.data.code && (e.user.info.tag = o.__list)
				});
				break;
			case "gender":
				r.updateGender({
					gender: o
				}, function(t) {
					0 == t.data.code && (e.user.info.gender = o)
				});
				break;
			case "brief":
				r.updateBrief({
					brief: o
				}, function(t) {
					0 == t.data.code && (e.user.info.brief = o)
				});
				break;
			case "contact":
		}
		d.goBack()
	}

	function C() {
		r.modifyPassword(e.settingModal.modifyData, function(e) {
			switch (e.data.code) {
				case 0:
					JAlert.notify("密码已修改");
					break;
				case 1:
					JAlert.showOnce("原密码输入错误");
					break;
				default:
					JAlert.showOnce("出现异常，请稍后再试！")
			}
		})
	}

	function T(t) {
		0 == t.data.code && (e.settingModal.contacts = t.data.list)
	}

	function A(t) {
		e.settingModal.__$index = t, e.settingModal.mContact = angular.copy(e.settingModal.contacts[t]), "id" in e.settingModal.mContact || (e.settingModal.mContact.id = e.settingModal.mContact._id), delete e.settingModal.mContact._id, e.settingModal.mContact.zipcode && (e.settingModal.mContact.zipcode = parseFloat(e.settingModal.mContact.zipcode)), e.settingModal.mContact.opt = "编辑", e.settingModal.mContact.type = "upd", d.go("modal.setting.mContact")
	}

	function M() {
		e.settingModal.mContact = {
			opt: "添加",
			type: "add"
		}, d.go("modal.setting.mContact")
	}

	function I(t) {
		e.settingModal.__$index = t, r.updateContact({
			id: e.settingModal.contacts[t]._id,
			type: "del"
		}, N)
	}

	function L() {
		e.$broadcast("image.clip")
	}

	function D(e) {
		JAlert.notify("上传成功"), r.updateAvatar({
			image: e.data.key
		}, j)
	}

	function O() {
		JAlert.notify("图片上传失败")
	}

	function j(t) {
		var o = t.data;
		0 === o.code ? (d.goBack(), e.user.info.avatar = o.image) : JAlert.showOnce(o.msg)
	}

	function E() {
		window.cordova && n.navigateToAppStore().then(function() {
			JAlert.showOnce("欧优游·有你更精彩！")
		})
	}

	function R() {
		e.settingModal.mContact.name && (e.settingModal.mContact.pyname = g(e.settingModal.mContact.name))
	}

	function B() {
		var t = e.settingModal.mContact,
			o = t.opt;
		delete t.opt, r.updateContact(t, F), t.opt = o
	}

	function F(t) {
		if (0 === t.data.code) {
			d.goBack(), JAlert.notify("保存成功!");
			var o = e.settingModal.__$index;
			null != o ? e.settingModal.contacts[o] = e.settingModal.mContact : (++e.user.info.contact, e.settingModal.mContact.id = t.data.id, e.settingModal.contacts.push(e.settingModal.mContact))
		} else JAlert.notify(t.data.msg)
	}

	function N(t) {
		0 === t.data.code ? (JAlert.notify("删除成功！"), e.settingModal.contacts.splice(e.settingModal.__$index, 1), --e.user.info.contact) : JAlert.nofity(t.data.msg)
	}

	function H(t) {
		var o = e.settingModal.profile.data,
			i = o.__list;
		if (o[t]) i.length >= 3 ? (o[t] = !1, JAlert.notify("已经选择3个标签")) : i.push(t);
		else {
			var n = i.indexOf(t); - 1 !== n && i.splice(n, 1)
		}
	}

	function J() {
		f.product.removeAll(), JAlert.notify("已清除！")
	}

	function q() {
		r.sendFeedback(e.settingModal.feedback, function(e) {
			0 == e.data.code && (JAlert.showOnce("欧优游·有你更精彩！"), o(function() {
				c.getModal("settingModal").hide()
			}, 1500))
		})
	}
	e.$on("modalLayer.show", function(t, o) {
		switch (o.name) {
			case "modal.setting.contacts":
				e.settingModal.contacts.length != e.user.info.contact && 0 != e.user.info.contact && r.getContacts({}, T)
		}
	}), e.$on("image.clip.complete", function() {
		e.settingModal.avatar ? u.upload({
			name: ["avatar/", (new Date).valueOf(), p.getRandomNum(0, 1e4, !0), ".jpg"].join(""),
			file: e.settingModal.avatar.file
		}, D, O) : JAlert.notify("请选择图片！")
	});
	var U = {
		M: "男",
		F: "女",
		list: [{
			key: "M",
			value: "男"
		}, {
			key: "F",
			value: "女"
		}]
	};
	return {
		_show: function() {
			var t = null;
			return c.contains("settingModal", e) ? (c.reInitModal("settingModal", e), t = c.getModalPromise("settingModal", e).then(y)) : t = c.createModalImmediately("settingModal", "app/user/modal/templates/settingModal.html", "up", !1, e, !1).then(y), e.settingModal = {
				go: _,
				back: v,
				hasBack: w,
				hasShow: S,
				close: b,
				login: k,
				signOut: $,
				profile: {},
				modifyPassword: C,
				contacts: [],
				modifyContact: A,
				addContact: M,
				clearCache: J,
				deleteContact: I,
				genderType: U,
				genPinyin: R,
				saveContact: B,
				avatar: null,
				uploadAvatar: L,
				onClickProfile: x,
				updateProfile: P,
				onClickRate: E,
				tagChange: H,
				sendFeedback: q
			}, t
		},
		showSubscribe: function(t) {
			var o = this._show().then(function() {
				e.settingModal.tranEnd = !0
			});
			return e.settingModal.defaultLayer = "modal.subscribe" + (t ? "." + t : ""), o
		},
		showSetting: function(t) {
			var o = this._show().then(function() {
				e.settingModal.tranEnd = !0
			});
			return e.settingModal.defaultLayer = "modal.setting" + (t ? "." + t : ""), o
		}
	}
}]);