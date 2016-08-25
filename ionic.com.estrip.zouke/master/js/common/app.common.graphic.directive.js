angular.module("app.common.graphic.directive", []).directive("imageClip", ["canvasResize", "$cordovaKeyboard", "CONFIG", function(e, t, o) {
	function i(e, t) {
		if (null == t) return null;
		for (var o = 0, i = e.length; i > o; ++o)
			if (e[o].identifier === t) return e[o];
		return null
	}
	var n = "点击选择图片",
		a = "单指拖动，双指放大，点击重选图片",
		r = "选择图片尺寸过小",
		s = "图片加载中",
		c = "正在处理图片",
		l = "故事尚未上传图片",
		d = {
			init: function() {
				this.input.addEventListener("change", this), this.input.addEventListener("click", this, !0), this.bindInput && (this.bindInput.addEventListener("change", this), this.bindInput.addEventListener("click", this, !0)), this.element.addEventListener("touchstart", this), this.element.addEventListener("touchmove", this), this.element.addEventListener("touchend", this), this.span.innerHTML = n
			},
			handleEvent: function(e) {
				switch (e.type) {
					case "click":
						this.click(e);
						break;
					case "change":
						this.change(e);
						break;
					case "load":
						this.load(e);
						break;
					case "touchstart":
						this.hasImage && this.touchstart(e);
						break;
					case "touchmove":
						this.hasImage && this.touchmove(e);
						break;
					case "touchend":
						this.hasImage && this.touchend(e)
				}
				e.stopPropagation()
			},
			click: function(e) {
				window.cordova && t.isVisible() && (e.preventDefault(), t.close())
			},
			change: function(t) {
				this.span.innerHTML = s, this.div.classList.add("half");
				var o = t.target.files[0];
				if (o) {
					var i = this.ngModel.$viewValue;
					i && delete i.src, this.ngModel.$setViewValue(i), e(t.target.files[0], this)
				}
			},
			touchstart: function(e) {
				if (window.cordova && t.isVisible() && (document.activeElement.blur(), t.close()), null == this.__firstTouchId && (this.__firstTouchId = e.targetTouches[0].identifier, this.__$prePosition = {
						x: e.targetTouches[0].clientX,
						y: e.targetTouches[0].clientY
					}), null == this.__secondTouchId) {
					var o = e.targetTouches[0];
					if (!o) return void delete this.__secondTouchId;
					if (this.__secondTouchId = e.targetTouches[0].identifier, this.__firstTouchId === this.__secondTouchId) {
						if (o = e.targetTouches[1], !o) return void delete this.__secondTouchId;
						this.__secondTouchId = e.targetTouches[1].identifier
					}
					this.__$distance = Math.sqrt(Math.pow(o.clientX - this.__$prePosition.x, 2) + Math.pow(o.clientY - this.__$prePosition.y, 2)), this.__$prePosition = {
						x: (o.clientX + this.__$prePosition.x) / 2,
						y: (o.clientY + this.__$prePosition.y) / 2
					}, this.origin = {
						x: this.__$prePosition.x - this.viewLeft - this.translate.x,
						y: this.__$prePosition.y - this.viewTop - this.translate.y
					}, this.__$baseScale = this.scale
				}
			},
			touchmove: function(e) {
				var t = i(e.touches, this.__firstTouchId),
					o = i(e.touches, this.__secondTouchId);
				if (o) {
					var n = Math.sqrt(Math.pow(t.clientX - o.clientX, 2) + Math.pow(t.clientY - o.clientY, 2));
					this.scaleTo(this.__$baseScale * n / this.__$distance);
					var a = {
						x: (t.clientX + o.clientX) / 2,
						y: (t.clientY + o.clientY) / 2
					};
					this.moveBy(a.x - this.__$prePosition.x, a.y - this.__$prePosition.y), this.__$prePosition = a
				} else t && (this.moveBy(t.clientX - this.__$prePosition.x, t.clientY - this.__$prePosition.y), this.__$prePosition = {
					x: t.clientX,
					y: t.clientY
				})
			},
			touchend: function(e) {
				var t;
				null != this.__firstTouchId && (t = i(e.changedTouches, this.__firstTouchId)) && (this.__firstTouchId = void 0, delete this.__secondTouchId, delete this.__$distance, delete this.__$baseScale, delete this.__$prePosition), null != this.__secondTouchId && i(e.changedTouches, this.__secondTouchId) && (delete this.__secondTouchId, delete this.__$distance, delete this.__$baseScale, this.__$prePosition = {
					x: t.clientX,
					y: t.clientY
				})
			},
			callback: function(e, t, o, i) {
				this.div.classList.remove("half");
				var n = this.element.getBoundingClientRect();
				return this.viewWidth = n.width, this.viewHeight = n.height, this.viewLeft = n.left, this.viewTop = n.top, this.naturalWidth = t, this.naturalHeight = o, this.minScale = Math.max(this.viewWidth / t, this.viewHeight / o), this.maxScale = this.viewWidth / this.minWidth, this.maxScale < this.minScale ? void(0 === t || 0 === t ? JAlert.notify(l) : JAlert.showOnce(r)) : (this.hasImage = !0, this.rect = this.__computeRect(), this.translate = {
					x: 0,
					y: 0
				}, this.scale = this.minScale, this.img.src = e, void(this.canvas = i))
			},
			initBySrc: function(e) {
				this.span.innerHTML = s, this.div.classList.add("half");
				var t = new Image;
				t.addEventListener("load", this), t.src = e
			},
			load: function(e) {
				this.callback(e.target.src, e.target.naturalWidth, e.target.naturalHeight, e.target)
			},
			__computeRect: function() {
				var e = this.origin,
					t = this.scale;
				return {
					top: e.y * t - e.y,
					left: e.x * t - e.x,
					bottom: -((this.naturalHeight - e.y) * t - (this.viewHeight - e.y)),
					right: -((this.naturalWidth - e.x) * t - (this.viewWidth - e.x))
				}
			},
			__updateUi: function() {
				var e = ["translate3d(", this.translate.x, "px,", this.translate.y, "px,0) scale3d(", this.scale, ",", this.scale, ",1)"].join("");
				this.img.style.webkitTransform = e, this.img.style.transform = e;
				var t = [this.origin.x, "px ", this.origin.y, "px"].join("");
				this.img.style.webkitTransformOrigin = t, this.img.style.transformOrigin = t
			},
			set translate(e) {
				this.__translate = e, this.__updateUi()
			},
			get translate() {
				return this.__translate || (this.__translate = {
					x: 0,
					y: 0
				}), this.__translate
			},
			set scale(e) {
				this.__scale = e, this.rect = this.__computeRect(), this.__updateUi()
			},
			get scale() {
				return this.__scale || (this.__scale = 1), this.__scale
			},
			set origin(e) {
				var t = this.origin,
					o = this.translate;
				o.x += (e.x - t.x) * (this.scale - 1), o.y += (e.y - t.y) * (this.scale - 1), this.__origin = e, this.rect = this.__computeRect(), this.__updateUi()
			},
			get origin() {
				return this.__origin || (this.__origin = {
					x: 0,
					y: 0
				}), this.__origin
			},
			set hasImage(e) {
				if (e) {
					this.bindInput && (this.input.style.display = "none"), this.div.classList.add("transparent"), this.span.innerHTML = a;
					var t = this.ngModel.$viewValue || {};
					t.hasImage = !0, this.ngModel.$setViewValue(t)
				} else this.div.classList.remove("transparent"), this.span.innerHTML = n;
				this.___hasImage = e
			},
			get hasImage() {
				return this.___hasImage
			},
			set __firstTouchId(e) {
				this.___firstTouchId = e
			},
			get __firstTouchId() {
				return this.___firstTouchId
			},
			moveBy: function(e, t) {
				var o = this.translate;
				o.x += e, o.y += t, o.x > this.rect.left && (o.x = this.rect.left), o.x < this.rect.right && (o.x = this.rect.right), o.y > this.rect.top && (o.y = this.rect.top), o.y < this.rect.bottom && (o.y = this.rect.bottom), this.translate = o
			},
			scaleTo: function(e) {
				e < this.minScale && (e = this.minScale), e > this.maxScale && (e = this.maxScale), this.scale = e
			},
			__base64ToFile: function(e) {
				for (var t = atob(e.split(",")[1]), o = new ArrayBuffer(t.length), i = new Uint8Array(o), n = 0, a = t.length; a > n; ++n) i[n] = t.charCodeAt(n);
				return new Blob([i], {
					type: "image/jpeg"
				})
			},
			clip: function(t) {
				if (this.canvas) {
					this.origin = {
						x: 0,
						y: 0
					};
					var o = document.createElement("canvas");
					this.clipWidth = o.width = this.viewWidth / this.scale, this.clipHeight = o.height = this.viewHeight / this.scale;
					var i = o.getContext("2d"),
						n = this.translate;
					i.drawImage(this.canvas, n.x / this.scale, n.y / this.scale);
					var a = this.__base64ToFile(o.toDataURL("image/jpeg"));
					if (o.width > this.maxWidth) {
						var r = this;
						e(a, {
							width: this.maxWidth,
							callback: function(e, o, i) {
								r.clipWidth = o, r.clipHeight = i;
								var n = r.__base64ToFile(e);
								r = null, t(n)
							}
						})
					} else t(a);
					return a
				}
				t(null)
			},
			getClientSize: function() {
				return {
					width: this.clipWidth,
					height: this.clipHeight
				}
			}
		};
	return {
		restrict: "EA",
		require: "ngModel",
		replace: !0,
		template: ['<div on-swipe-left="$event.stopPropagation()">', "<img>", '<div><span></span><i class="ic ic-hand"></i></div>', '<input type="file" ng-style="{width: width-220+\'px\'}">', "</div>"].join(""),
		scope: {
			model: "=ngModel"
		},
		compile: function(e) {
			return e.addClass("image-clip"), {
				post: function(e, t, i, n) {
					function a(t) {
						if (t) {
							var o = e.obj.getClientSize();
							n.$viewValue.src && Math.abs(o.width - Math.round(r.naturalWidth)) < 2 && Math.abs(o.height - Math.round(r.naturalHeight)) < 2 || n.$setViewValue({
								file: t,
								width: o.width,
								height: o.height,
								size: Math.round(t.size / 1024),
								hasImage: !0
							})
						}
						e.$emit("image.clip.complete")
					}
					e.width = o.devWidth;
					var r = Object.create(d);
					r.element = t[0], r.img = r.element.querySelector("img"), r.input = r.element.querySelector("input");
					for (var s = r.element; s.parentElement;) s = s.parentElement;
					r.bindInput = s.querySelector(i.bindInput), r.div = r.element.querySelector("div"), r.span = r.element.querySelector("span"), r.minWidth = parseFloat(i.minWidth || 480), r.maxWidth = parseFloat(i.maxWidth || 1200), r.ngModel = n, r.init(), e.obj = r, n.$render = function() {
						n.$viewValue && n.$viewValue.src && r.initBySrc(n.$viewValue.src)
					}, e.$on("image.clip", function() {
						JAlert.notify(c);
						e.obj.clip(a)
					})
				}
			}
		}
	}
}]), 
