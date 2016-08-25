angular.module("app.map.service", []).factory("map", ["$rootScope", "$document", "$timeout", "$compile", "$cordovaGeolocation", "$cordovaSQLite", "CONFIG", "currentScope", "utils", "mapDrag", function(e, t, o, n, a, r, s, c, l, d) {
	function u(e, t, o, i, n, a, r) {
		this.__scope = c.get(), this.__elem = e, this.__options = {
			zoom: o ? o : 12,
			center: new gogle.maps.LatLng(t.lat, t.lng),
			disableDefaultUI: !0,
			noClear: !1,
			styles: i
		}, this.__map = null, this.__isOffline = n, this.__infoBubble = null, this.__cityBubbles = [], this.__markers = {
			city: [],
			journey: [],
			other: []
		}, this.__lines = [], this.__icons = {
			city: "img/icon-new/marker/city.png",
			journey: "img/icon-new/marker/journey.png",
			mark: "img/icon-new/marker/mark.png",
			AT: "img/icon-new/marker/spot.png",
			RS: "img/icon-new/marker/food.png",
			SH: "img/icon-new/marker/shopping.png",
			HT: "img/icon-new/marker/hotel.png",
			TL: "img/icon-new/marker/toilet.png",
			SM: "img/icon-new/marker/activity.png",
			journeyTiny: "img/icon-new/marker/journey-tiny.png",
			poiTiny: "img/icon-new/marker/poi-tiny.png"
		}, this._init(a, r)
	}
	var p = [{
			featureType: "administrative",
			elementType: "all",
			stylers: [{
				visibility: "on"
			}, {
				lightness: 33
			}]
		}, {
			featureType: "landscape",
			elementType: "all",
			stylers: [{
				color: "#f2e5d4"
			}]
		}, {
			featureType: "water",
			elementType: "all",
			stylers: [{
				visibility: "on"
			}, {
				color: "#acbcc9"
			}]
		}],
		m = [{
			featureType: "landscape.man_made",
			elementType: "geometry",
			stylers: [{
				color: "#f7f1df"
			}]
		}, {
			featureType: "landscape.natural",
			elementType: "geometry",
			stylers: [{
				color: "#f3f8ec"
			}]
		}, {
			featureType: "landscape.natural.terrain",
			elementType: "geometry",
			stylers: [{
				visibility: "off"
			}]
		}, {
			featureType: "poi",
			elementType: "labels",
			stylers: [{
				visibility: "on"
			}]
		}, {
			featureType: "poi.business",
			elementType: "all",
			stylers: [{
				visibility: "off"
			}]
		}, {
			featureType: "poi.medical",
			elementType: "geometry",
			stylers: [{
				color: "#fbd3da"
			}]
		}, {
			featureType: "poi.park",
			elementType: "geometry",
			stylers: [{
				color: "#bde6ab"
			}]
		}, {
			featureType: "road",
			elementType: "geometry.stroke",
			stylers: [{
				visibility: "off"
			}]
		}, {
			featureType: "road",
			elementType: "labels",
			stylers: [{
				visibility: "off"
			}]
		}, {
			featureType: "road.highway",
			elementType: "geometry.fill",
			stylers: [{
				color: "#ffe15f"
			}]
		}, {
			featureType: "road.highway",
			elementType: "geometry.stroke",
			stylers: [{
				color: "#efd151"
			}]
		}, {
			featureType: "road.arterial",
			elementType: "geometry.fill",
			stylers: [{
				color: "#ffffff"
			}]
		}, {
			featureType: "road.local",
			elementType: "geometry.fill",
			stylers: [{
				color: "black"
			}]
		}, {
			featureType: "transit.station.airport",
			elementType: "geometry.fill",
			stylers: [{
				color: "#cfb2db"
			}]
		}, {
			featureType: "water",
			elementType: "geometry",
			stylers: [{
				color: "#a2daf2"
			}]
		}],
		h = [{
			featureType: "landscape.man_made",
			elementType: "geometry",
			stylers: [{
				color: "#f7f1df"
			}]
		}, {
			featureType: "landscape.natural",
			elementType: "geometry",
			stylers: [{
				color: "#f3f8ec"
			}]
		}, {
			featureType: "landscape.natural.terrain",
			elementType: "geometry",
			stylers: [{
				visibility: "off"
			}]
		}, {
			featureType: "poi",
			elementType: "labels",
			stylers: [{
				visibility: "on"
			}]
		}, {
			featureType: "poi.business",
			elementType: "all",
			stylers: [{
				visibility: "on"
			}]
		}, {
			featureType: "poi.medical",
			elementType: "geometry",
			stylers: [{
				color: "#fbd3da"
			}]
		}, {
			featureType: "poi.park",
			elementType: "geometry",
			stylers: [{
				color: "#bde6ab"
			}]
		}, {
			featureType: "road",
			elementType: "geometry.stroke",
			stylers: [{
				visibility: "off"
			}]
		}, {
			featureType: "road",
			elementType: "labels",
			stylers: [{
				visibility: "on"
			}]
		}, {
			featureType: "road.highway",
			elementType: "geometry.fill",
			stylers: [{
				color: "#ffe15f"
			}]
		}, {
			featureType: "road.highway",
			elementType: "geometry.stroke",
			stylers: [{
				color: "#efd151"
			}]
		}, {
			featureType: "road.arterial",
			elementType: "geometry.fill",
			stylers: [{
				color: "#ffffff"
			}]
		}, {
			featureType: "road.local",
			elementType: "geometry.fill",
			stylers: [{
				color: "black"
			}]
		}, {
			featureType: "transit.station.airport",
			elementType: "geometry.fill",
			stylers: [{
				color: "#cfb2db"
			}]
		}, {
			featureType: "water",
			elementType: "geometry",
			stylers: [{
				color: "#a2daf2"
			}]
		}];
	return u.prototype._execAfterRender = function() {
		var e = this;
		gogle.maps.event.addListenerOnce(this.__map, "idle", function() {
			angular.forEach(e.__elem.querySelectorAll("a"), function(e) {
				e.getAttribute("href") && e.getAttribute("href").indexOf("http://") > -1 && angular.element(e).on("click", function(e) {
					e.preventDefault()
				})
			}), e = null
		})
	}, u.prototype._fixInfoWindow = function() {
		var e = gogle.maps.InfoWindow.prototype.set;
		gogle.maps.InfoWindow.prototype.set = function(t) {
			("map" !== t || this.get("noSuppress")) && e.apply(this, arguments)
		}
	}, u.prototype._fixResizeBug = function() {
		var e = ionic.trigger;
		this.__scope.$on("$destroy", function() {
			ionic.trigger = e
		}), this.__scope.$on("$ionicView.afterLeave", function() {
			ionic.trigger = function(t) {
				return "resize" == t ? !1 : void e.apply(ionic, arguments)
			}
		}), this.__scope.$on("$ionicView.afterEnter", function() {
			ionic.trigger = e
		})
	}, u.prototype._init = function(e, t) {
		t = t, angular.extend(this.__options, t), this.__map = new gogle.maps.Map(this.__elem, this.__options), o(function() {
			var e = document.querySelectorAll("body>span[style]");
			e = e[e.length - 1], e && "BESbewy" === e.innerHTML && (this.__$span = e)
		}.bind(this), 200), this.__infoBubble = new InfoBubble({
			shadowStyle: 0,
			padding: 0,
			maxWidth: 100,
			maxHeight: 107,
			backgroundColor: "#fff",
			borderRadius: 5,
			arrowStyle: 0,
			arrowSize: 8,
			borderWidth: 1,
			borderColor: "#999",
			disableAutoPan: !1,
			hideCloseButton: !0
		}), this._execAfterRender(), this._fixInfoWindow(), this._fixResizeBug();
		var i = this;
		if (gogle.maps.event.addListener(i.__map, "click", function() {
				i.closeInfo()
			}), e) {
			var n = 13,
				a = null;
			gogle.maps.event.addListener(i.__map, "zoom_changed", function() {
				if (0 != i.__markers.journey.length || 0 != i.__markers.other.length) {
					var e = i.__map.getZoom();
					n >= e ? (a = function(e, t) {
						var o = t.getIcon(),
							n = "journey" == e ? i.__icons.journeyTiny : i.__icons.poiTiny;
						if (o.url != n) {
							var a = {
								url: n,
								size: new gogle.maps.Size(28, 35),
								origin: new gogle.maps.Point(0, 0),
								anchor: new gogle.maps.Point(7, 17.5),
								scaledSize: new gogle.maps.Size(14, 17.5)
							};
							t.setIcon(a)
						}
					}, i.__markers.journey.length && i.__markers.journey[0].getIcon().url == i.__icons.journey && angular.forEach(i.__markers.journey, function(e) {
						a("journey", e)
					}), i.__markers.other.length && i.__markers.other[0].getIcon().url != i.__icons.poiTiny && angular.forEach(i.__markers.other, function(e) {
						a("other", e)
					})) : e > n && (a = function(e, t) {
						var o = t.getIcon(),
							n = "journey" == e ? i.__icons.journey : i.__icons[t.type];
						if (o.url != n) {
							var a = {
								url: n,
								size: new gogle.maps.Size(40, 50),
								origin: new gogle.maps.Point(0, 0),
								anchor: new gogle.maps.Point(13, 33),
								scaledSize: new gogle.maps.Size(26, 33)
							};
							t.setIcon(a)
						}
					}, i.__markers.journey.length && i.__markers.journey[0].getIcon().url == i.__icons.journeyTiny && angular.forEach(i.__markers.journey, function(e) {
						a("journey", e)
					}), i.__markers.other.length && i.__markers.other[0].getIcon().url == i.__icons.poiTiny && angular.forEach(i.__markers.other, function(e) {
						a("other", e)
					}))
				}
			})
		}
	}, u.prototype.destroy = function() {
		this.clearMarkers("all"), this.__$span && (this.__$span.remove(), delete this.__$span), this.__options = null, gogle.maps.event.clearInstanceListeners(this.__map), gogle.maps.event.clearInstanceListeners(document), gogle.maps.event.clearInstanceListeners(window), this.__infoBubble = null, this.__cityBubbles = null, this.__markers = null, this.__lines = null
	}, u.prototype._addCityBubble = function(e, t) {
		var o = '<div class="item item-city" ng-click="onClickBubble($event,\'' + e.id + "','city','" + e.title + "')\"><span>" + e.title + "</span>" + (t ? "<p>" + t + "天</p>" : "") + "</div>",
			i = t ? 36 : 20,
			a = new InfoBubble({
				shadowStyle: 0,
				padding: 0,
				maxWidth: 65,
				maxHeight: i,
				backgroundColor: "#ec898c",
				borderRadius: 5,
				arrowStyle: 2,
				arrowSize: 8,
				borderWidth: 1,
				borderColor: "#fff",
				hideCloseButton: !0,
				disableAutoPan: !0,
				disableAnimation: !0
			}),
			r = n(o)(this.__scope);
		a.setContent(r[0]), a.open(this.__map, e), this.__cityBubbles.push(a)
	}, u.prototype._addMarker = function(e, t, o, i) {
		var a = {};
		"city" != t && (a = {
			url: this.__icons["search" == t ? e.type : t],
			size: new gogle.maps.Size(40, 50),
			origin: new gogle.maps.Point(0, 0),
			anchor: new gogle.maps.Point(13, 33),
			scaledSize: new gogle.maps.Size(26, 33)
		});
		var r = new gogle.maps.Marker({
				position: new gogle.maps.LatLng(e.lat, e.lng),
				map: this.__map,
				draggable: !1,
				raiseOnDrag: !1,
				title: e.name,
				icon: "city" == t ? this.__icons[t] : a
			}),
			s = this;
		if (r.id = e.id, r.type = e.type, o)
			if ("city" == t) s._addCityBubble(r, e.days);
			else {
				var c = "";
				gogle.maps.event.addListener(r, "click", function() {
					if (s.__isOffline) c = '<div class="item item-poi" ng-click="showMessage()"><p>' + this.title + "</p>", s.__infoBubble.disableAutoPan = !0;
					else {
						var t = "$event,'" + e.id + "','" + e.type + "',&quot;" + this.title + "&quot;";
						c = '<div class="item item-poi" ng-click="onClickBubble(' + t + ')"><p>' + this.title + '</p><img src="' + (e.img ? e.img + '-appmarker"' : 'http://cdn1.zouke.com/app/poi/default-thumb.jpg-appmarker"') + ">"
					}
					e.story_num && (c += "<span>" + e.story_num + "个故事</span>"), c += "</div>";
					var o = n(c)(s.__scope);
					s.__infoBubble.setContent(o[0]), s.__infoBubble.close(), s.__infoBubble.open(s.__map, this)
				})
			}
		return i && d.init(r), r
	}, u.prototype.setMapLocalType = function(t) {
		function o() {}
		if (null != t) {
			var i, n;
			window.cordova && (e.user.isIOS ? (i = cordova.file.documentsDirectory, n = window.sqlitePlugin.openDatabase({
				name: t.id + ".db",
				location: 2
			})) : e.user.isAndroid ? (i = cordova.file.applicationStorageDirectory, n = window.sqlitePlugin.openDatabase({
				name: t.id + ".db",
				androidDatabaseImplementation: 2
			})) : (i = cordova.file.tempDirectory, n = window.sqlitePlugin.openDatabase({
				name: t.id + ".db"
			}))), o.prototype.tileSize = new gogle.maps.Size(256, 256), o.prototype.maxZoom = t.max_zoom, o.prototype.minZoom = t.min_zoom, o.prototype.getTile = function(e, t) {
				var o = document.createElement("img");
				o.style.width = this.tileSize.width + "px", o.style.height = this.tileSize.height + "px";
				var i = "select x,y,z,buff from tiles where x=" + e.x + " and y=" + e.y + " and z=" + t + " limit 1;";
				return r.execute(n, i, []).then(function(e) {
					var t = e.rows.item(0);
					o.src = t ? "data:image/png;base64," + t.buff : "img/icon-new/mapblank.jpg"
				}, function(e) {
					console.log(e)
				}), o
			}, this.__map.setMapTypeId("local"), this.__map.mapTypes.set("local", new o);
			var a = new gogle.maps.LatLngBounds(new gogle.maps.LatLng(t.range[1], t.range[0]), new gogle.maps.LatLng(t.range[3], t.range[2]));
			that = this, gogle.maps.event.addListener(this.__map, "center_changed", function() {
				mcenter = that.__map.getCenter(), a.contains(mcenter) || (x = mcenter.lng(), y = mcenter.lat(), maxX = a.getNorthEast().lng(), maxY = a.getNorthEast().lat(), minX = a.getSouthWest().lng(), minY = a.getSouthWest().lat(), x < minX && (x = minX), x > maxX && (x = maxX), y < minY && (y = minY), y > maxY && (y = maxY), that.__map.setCenter(new gogle.maps.LatLng(y, x)))
			})
		} else this.__map.setMapTypeId(gogle.maps.MapTypeId.ROADMAP)
	}, u.prototype.getLocation = function(e, t) {
		var o = new gogle.maps.LatLngBounds(new gogle.maps.LatLng(t[1], t[0]), new gogle.maps.LatLng(t[3], t[2])),
			i = null,
			n = null;
		gogle.maps.event.addDomListenerOnce(e, "click", function() {
			null != n && n.setMap(null), r()
		});
		var r = function() {
			a.getCurrentPosition({
				enableHighAccuracy: !0,
				maximumAge: 12e4,
				timeout: 5e3
			}).then(function(e) {
				i = new gogle.maps.LatLng(e.coords.latitude, e.coords.longitude), n = new gogle.maps.Marker({
					map: this.__map,
					position: i,
					icon: "img/icon-new/current-pos.png"
				}), o.contains(i) ? this.__map.setCenter(i) : JAlert.showOnce("您的位置不在当前地图内！")
			}, function(e) {
				var t = "";
				t = e.code == e.PERMISSION_DENIED ? "请设置手机允许欧优游进行定位" : "请检查定位功能是否开启", JAlert.showOnce(t)
			})
		};
		r()
	}, u.prototype.getElem = function() {
		return this.__elem
	}, u.prototype.getMap = function() {
		return this.__map
	}, u.prototype.changeMarker = function(e, t, o, n) {
		var a = {};
		if (a = n ? {
				url: this.__icons[o],
				size: new gogle.maps.Size(40, 66),
				origin: new gogle.maps.Point(0, 0),
				anchor: new gogle.maps.Point(20, 66)
			} : {
				url: this.__icons[o],
				size: new gogle.maps.Size(40, 66),
				origin: new gogle.maps.Point(0, 0),
				anchor: new gogle.maps.Point(13, 43),
				scaledSize: new gogle.maps.Size(26, 43)
			}, e.setOptions({
				icon: a
			}), t != o) {
			"journey" != t && (t = "other");
			var r = this.__markers[t];
			for (i = 0; i < r.length; i++)
				if (r.id == e.id) {
					r.splice(i, 1);
					break
				}
				"journey" != o && (o = "other"), this.__markers[o].push(e)
		}
	}, u.prototype.switchStyle = function(e) {
		if (l.isEmpty(e)) e = m;
		else switch (e) {
			case "pale":
				e = p;
				break;
			case "simple":
				e = m;
				break;
			case "complex":
				e = h
		}
		this.__map.setOptions({
			styles: e
		})
	}, u.prototype.showMarkers = function(e, t, o, i) {
		if (0 != e.length) {
			this.__isOffline && (i = !1);
			for (var n = new gogle.maps.LatLngBounds, a = this, r = function(e) {
					var r = a._addMarker(e, t, o, i);
					return n.extend(r.position), r
				}, s = "city" == t || "journey" == t ? t : "other", c = 0; c < e.length; c++) {
				var l = e[c],
					d = null;
				if (-1 !== ["city", "AT", "RS", "SH", "SM", "TL", "HT"].indexOf(l.type)) switch (t) {
					case "city":
						d = r(l), this.__markers[s].push(d);
						break;
					case "journey":
						d = r(l), d.isJourney = !0, this.__markers[s].push(d);
						break;
					case "mark":
						l.isJourney || (d = r(l), d.index = c, d.isJourney = !1, d.isMarked = !0, this.__markers[s].push(d));
						break;
					default:
						l.isJourney || l.isMarked || (d = r(l), d.index = c, d.isJourney = !1, d.isMarked = !1, this.__markers[s].push(d))
				}
			}
			if (0 == this.__markers[s].length) {
				if ("city" == t) return;
				JAlert.notify("mark" == t ? "收藏的点已在行程中" : "加载的点已在行程中")
			} else {
				var a = this;
				this.__isOffline && "mark" == t ? (this.__map.setCenter(this.__markers[s][0].getPosition()), this.__map.setZoom(13)) : this.__map.fitBounds(n)
			}
		}
	}, u.prototype.showLines = function(e, t) {
		t = l.isEmpty(t) ? "#FF585B" : t;
		var o = e,
			i = new gogle.maps.LatLngBounds,
			n = [],
			a = {},
			r = {},
			s = {
				path: gogle.maps.SymbolPath.CIRCLE
			};
		if (1 == o.length) a = new gogle.maps.LatLng(o[0].lat, o[0].lng), i.extend(a), r = new gogle.maps.Polyline({
			path: [a, a],
			geodesic: !1,
			icons: [{
				icon: s,
				offset: "0%"
			}, {
				icon: s,
				offset: "100%"
			}],
			strokeColor: t,
			strokeOpacity: .9,
			strokeWeight: 2,
			map: this.__map
		}), this.__lines.push(r);
		else
			for (var c = 0; c < o.length; c++) a = new gogle.maps.LatLng(o[c].lat, o[c].lng), n.push(a), i.extend(a), n.length > 1 && (r = new gogle.maps.Polyline({
				path: n.slice(-2),
				geodesic: !0,
				icons: [{
					icon: s,
					offset: "0%"
				}, {
					icon: s,
					offset: "100%"
				}],
				strokeColor: t,
				strokeOpacity: .9,
				strokeWeight: 2,
				map: this.__map
			}), this.__lines.push(r));
		this.__map.fitBounds(i)
	}, u.prototype.getMarkerById = function(e) {
		var t = null,
			o = "journey";
		for (i = 0; i < this.__markers[o].length; i++)
			if (this.__markers[o][i].id == e) {
				t = this.__markers[o][i];
				break
			}
		if (null == t)
			for (o = "other", i = 0; i < this.__markers[o].length; i++)
				if (this.__markers[o][i].id == e) {
					t = this.__markers[o][i];
					break
				}
		return t
	}, u.prototype.clearMarkers = function(e) {
		var t = 0;
		if ("city" == e || "all" == e) {
			for (t = 0; t < this.__markers.city.length; t++) gogle.maps.event.clearInstanceListeners(this.__markers.city[t]), this.__markers.city[t].setMap(null), this.__markers.city[t] = null;
			for (t = 0; t < this.__cityBubbles.length; t++) this.__cityBubbles[t].close(), this.__cityBubbles[t] = null;
			this.__markers.city = [], this.__cityBubbles = []
		}
		if ("journey" == e || "all" == e) {
			for (t = 0; t < this.__markers.journey.length; t++) gogle.maps.event.clearInstanceListeners(this.__markers.journey[t]), this.__markers.journey[t].setMap(null), this.__markers.journey[t] = null;
			this.__markers.journey = []
		}
		if ("other" == e || "all" == e) {
			for (t = 0; t < this.__markers.other.length; t++) this.__markers.other[t].isJourney || (gogle.maps.event.clearInstanceListeners(this.__markers.other[t]), this.__markers.other[t].setMap(null), this.__markers.other[t] = null);
			this.__markers.other = []
		}
	}, u.prototype.clearLines = function() {
		this.__lines.length && (angular.forEach(this.__lines, function(e) {
			e.setMap(null), e = null
		}), this.__lines = [])
	}, u.prototype.closeInfo = function() {
		l.isEmpty(this.__infoBubble) || this.__infoBubble.close()
	}, u.prototype.setCenter = function(e) {
		this.__map.setCenter(new gogle.maps.LatLng(e.lat, e.lng))
	}, u.prototype.getCurrent = function() {
		var e = this;
		return a.watchPosition({
			enableHighAccuracy: !1,
			maximumAge: 12e4,
			timeout: 5e3
		}).then(function(t) {
			{
				var o = new gogle.maps.LatLng(t.coords.latitude, t.coords.longitude);
				new gogle.maps.Marker({
					position: o,
					map: e.__map,
					icon: "img/icon-new/current-pos.png",
					title: "我的位置"
				})
			}
		})
	}, u.prototype.route = function(e) {
		var t = document.createElement("div"),
			o = document.createElement("div");
		t.style.marginTop = "8px", t.style.padding = "0 15px", t.style.background = "rgba(255, 255, 255, 0.8)", t.style.borderTopLeftRadius = "3px", t.style.borderBottomLeftRadius = "3px", o.style.width = "33px", o.style.height = "33px", o.style.backgroundImage = "url(img/icon-new/map/walking.jpg)", t.appendChild(o), this.__map.controls[gogle.maps.ControlPosition.TOP_CENTER].push(t);
		var i = document.createElement("div"),
			n = document.createElement("div");
		i.style.marginTop = "8px", i.style.padding = "0 15px", i.style.background = "rgba(255, 255, 255, 0.8)", i.style.borderTopRightRadius = "3px", i.style.borderBottomRightRadius = "3px", n.style.width = "33px", n.style.height = "33px", n.style.backgroundImage = "url(img/icon-new/map/bus.jpg)", i.appendChild(n), this.__map.controls[gogle.maps.ControlPosition.TOP_CENTER].push(i);
		var r = document.createElement("div"),
			s = document.createElement("div");
		r.style.marginTop = "8px", r.style.padding = "0 15px", r.style.background = "rgba(255, 255, 255, 0.8)", s.style.width = "33px", s.style.height = "33px", s.style.backgroundImage = "url(img/icon-new/map/driving.jpg)", r.appendChild(s), this.__map.controls[gogle.maps.ControlPosition.TOP_CENTER].push(r);
		var c = this,
			d = null;
		gogle.maps.event.addDomListener(t, "click", function() {
			m(u, d, e, "walking"), o.style.backgroundImage = "url(img/icon-new/map/walking-active.jpg)", s.style.backgroundImage = "url(img/icon-new/map/driving.jpg)", n.style.backgroundImage = "url(img/icon-new/map/bus.jpg)"
		}), gogle.maps.event.addDomListener(r, "click", function() {
			m(u, d, e, "driving"), o.style.backgroundImage = "url(img/icon-new/map/walking.jpg)", s.style.backgroundImage = "url(img/icon-new/map/driving-active.jpg)", n.style.backgroundImage = "url(img/icon-new/map/bus.jpg)"
		}), gogle.maps.event.addDomListener(i, "click", function() {
			m(u, d, e, "transit"), o.style.backgroundImage = "url(img/icon-new/map/walking.jpg)", s.style.backgroundImage = "url(img/icon-new/map/driving.jpg)", n.style.backgroundImage = "url(img/icon-new/map/bus-active.jpg)"
		});
		var u = new gogle.maps.DirectionsRenderer;
		u.setMap(this.__map);
		var p = function(e, t, o, i, n) {
				var a = new gogle.maps.DirectionsService,
					r = {
						origin: o,
						destination: i,
						optimizeWaypoints: !0,
						travelMode: gogle.maps.DirectionsTravelMode.TRANSIT
					};
				"walking" == n ? r.travelMode = gogle.maps.DirectionsTravelMode.WALKING : "transit" == n ? r.travelMode = gogle.maps.DirectionsTravelMode.TRANSIT : "driving" == n && (r.travelMode = gogle.maps.DirectionsTravelMode.DRIVING), a.route(r, function(e, o) {
					JAlert.hide(), o == gogle.maps.DirectionsStatus.OK ? (t.setDirections(e), path = e.routes[0].overview_path) : JAlert.showOnce("查询异常！")
				})
			},
			m = function(e, t, o, i) {
				o = new gogle.maps.LatLng(o[0], o[1]), a.getCurrentPosition({
					enableHighAccuracy: !1,
					maximumAge: 12e4,
					timeout: 5e3
				}).then(function(n) {
					t = new gogle.maps.LatLng(n.coords.latitude, n.coords.longitude);
					var a = l.calcDistance([t.lat(), t.lng()], [o.lat(), o.lng()]);
					a > 100 ? JAlert.showOnce("亲，您距离目的地太远！") : (JAlert.show("路线规划中..."), p(c.__map, e, t, o, i))
				}, function() {
					p(c.__map, e, new gogle.maps.LatLng(31.2555630337, 121.564718921), o, i), JAlert.showOnce("不能获取当前位置！")
				})
			}
	}, {
		createMap: function(e, t, o, i, n, a, r) {
			if (delete window.gogle, window.gogle = n ? window.localGoogle : window.webGoogle, "undefined" == typeof gogle || "undefined" == typeof gogle.maps.LatLng) return void JAlert.showOnce("Google地图又趴了 :(\n稍候再试试");
			if (l.isEmpty(i)) i = m;
			else switch (i) {
				case "simple":
					i = m;
					break;
				case "pale":
					i = p;
					break;
				case "complex":
					i = h
			}
			return new u(e, t, o, i, n, a, r)
		},
		createStaticMap: function(e, t, o) {
			var i = "http://ditu.google.cn/maps/api/staticmap?maptype=terrain&style=feature:landscape.man_made|element:geometry|color:0xf7f1df&style=feature:water|element:geometry|color:0xa2daf2&style=feature:landscape.natural|element:geometry|color:0xf3f8ec";
			if (t && (i += "&size=" + t), o && o.length) {
				var n = o.length < 4 ? s.hostImg + "/marker/city-big.png" : s.hostImg + "/marker/city-small.png",
					a = "&markers=icon:" + n;
				if (o.length > 1) {
					var r = "&path=color:0xFF585B|weight:3|geodesic:true";
					angular.forEach(o, function(e) {
						r += "|" + e.lat + "," + e.lng, a += "|" + e.lat + "," + e.lng
					}), i += r
				} else e && (i += "&zoom=" + e), a += "|" + o[0].lat + "," + o[0].lng;
				i += a
			}
			return i
		}
	}
}]).factory("mapDrag", ["$rootScope", "$timeout", function(e, t) {
	function o() {
		var e = document.createElement("div");
		e.style.position = "absolute", e.style.zIndex = "1000", e.style.display = "none", e.style.left = "0", e.style.top = "0";
		var t = new Image;
		return t.style.display = "block", t.style.verticalAlign = "top", e.appendChild(t), document.body.appendChild(e), e
	}

	function i(e, t, o) {
		e && (e.style.left = t + "px", e.style.top = o + "px")
	}

	function n(e) {
		e && (e.style.display = "block")
	}

	function a(e) {
		e && (e.style.display = "none")
	}

	function r(e, t) {
		e.firstElementChild.src = t
	}

	function s(e) {
		var t = e.getMap(),
			o = t.getDiv(),
			i = t.getProjection(),
			n = Math.pow(2, t.getZoom()),
			a = i.fromLatLngToPoint(new gogle.maps.LatLng(t.getBounds().getNorthEast().lat(), t.getBounds().getSouthWest().lng())),
			r = i.fromLatLngToPoint(e.getPosition()),
			s = o.getBoundingClientRect();
		return {
			x: (r.x - a.x) * n + s.left,
			y: (r.y - a.y) * n + s.top
		}
	}

	function c(e) {
		e.___drag__disable || (e.getDiv().addEventListener("touchmove", c.touchmove, !0), e.___drag__disable = !0)
	}

	function l(e) {
		e.___drag__disable && (e.getDiv().removeEventListener("touchmove", c.touchmove, !0), e.___drag__disable = !1)
	}

	function d() {
		if (!(y > 1)) {
			var o = this;
			this.__$timer = t(function() {
				r(w, o.icon.url), g = o.isJourney ? {
					width: 26,
					height: 43
				} : {
					width: 26,
					height: 33
				};
				var t = s(o);
				o.__$left = t.x - g.width / 2 - h.x, o.__$top = t.y - g.height - h.y, i(w, o.__$left, o.__$top), n(w), c(o.getMap()), o.setOpacity(0), o.__$bindTouchEndFn || (o.__$bindTouchMoveFn = p.bind(o), o.__$bindTouchEndFn = m.bind(o)), document.addEventListener("touchmove", o.__$bindTouchMoveFn, !0), document.addEventListener("touchend", o.__$bindTouchEndFn, !0);
				var a = w.getBoundingClientRect();
				e.$broadcast("marker.drag", o, document.elementFromPoint((a.left + a.right) / 2, a.bottom + 1)), o.__$timer = null, o = null, f = !0
			}, 300)
		}
	}

	function u(e) {
		if (this.__$timer) {
			if (1 === y) {
				var o = Math.abs(e.touches[0].clientX - _.x),
					i = Math.abs(e.touches[0].clientY - _.y);
				if (10 > o && 10 > i) return
			}
			t.cancel(this.__$timer), this.__$timer = null
		}
	}

	function p(t) {
		var o = this;
		window.requestAnimationFrame || (window.requestAnimationFrame = window.webkitRequestAnimationFrame), window.requestAnimationFrame(function() {
			i(w, o.__$left + t.touches[0].clientX - _.x, o.__$top + t.touches[0].clientY - _.y);
			var n = w.getBoundingClientRect();
			e.$broadcast("marker.drag", o, document.elementFromPoint((n.left + n.right) / 2, n.bottom + 1))
		})
	}

	function m(t) {
		if (0 === t.touches.length || t.touches[0].identifier !== v) {
			document.removeEventListener("touchmove", this.__$bindTouchMoveFn, !0), document.removeEventListener("touchend", this.__$bindTouchEndFn, !0), l(this.getMap()), this.setOpacity(1);
			var o = w.getBoundingClientRect();
			e.$broadcast("marker.drop", this, document.elementFromPoint((o.left + o.right) / 2, o.bottom + 1)), a(w), f = !1
		}
	}
	var h = {
			x: 5,
			y: 25
		},
		g = {},
		f = !1,
		y = 0,
		_ = null,
		v = null;
	document.body.addEventListener("touchstart", function(e) {
		y = e.touches.length, 1 === y && (_ = {
			x: e.touches[0].clientX,
			y: e.touches[0].clientY
		}, v = e.touches[0].identifier)
	}, !0), document.body.addEventListener("touchend", function(e) {
		y = e.touches.length
	}, !0);
	var w = o();
	return c.touchmove = function(e) {
		e.stopPropagation()
	}, {
		init: function(e) {
			gogle.maps.event.addListener(e, "mousedown", d), gogle.maps.event.addListener(e, "mouseup", u), gogle.maps.event.addListener(e, "click", u), e.getMap().getDiv().addEventListener("touchmove", u.bind(e))
		},
		getMarkerPositionOffset: s,
		__$pointNumber: function() {
			return y
		},
		__$markerDragged: function() {
			return f
		},
		__$firstTouchid: function() {
			return v
		}
	}
}]).factory("mapRect", ["$timeout", "mapDrag", function(e, t) {
	function o(e, t, o) {
		var i = e.__$now,
			n = e.__$rect;
		t /= e.__$scale, o /= e.__$scale, i.x += t, i.y += o;
		var a = (-e.__$height + n.top) * e.__$scale + e.__$height,
			r = (e.__$height + n.bottom) * e.__$scale - e.__$height,
			s = (-e.__$width + n.left) * e.__$scale + e.__$width,
			c = (e.__$width + n.right) * e.__$scale - e.__$width;
		a > 0 && (a = 0), 0 > r && (r = 0), s > 0 && (s = 0), 0 > c && (c = 0);
		var l = i.x * e.__$scale,
			d = i.y * e.__$scale;
		d > r ? (o -= (d - r) / e.__$scale, i.y = r / e.__$scale) : a > d && (o += (a - d) / e.__$scale, i.y = a / e.__$scale), l > c ? (t -= (l - c) / e.__$scale, i.x = c / e.__$scale) : s > l && (t += (s - l) / e.__$scale, i.x = s / e.__$scale), e.panBy(-t, -o)
	}

	function i(e) {
		return Math.pow(2, e)
	}

	function n(e) {
		return Math.round(Math.log(e) / Math.log(2))
	}

	function a() {
		this.__$maxScale = i(this.__$maxZoom - this.getZoom()), this.__$minScale = i(this.__$minZoom - this.getZoom());
		var e = this.__$rect_sw,
			t = this.__$rect_ne,
			o = this.getProjection(),
			n = Math.pow(2, this.getZoom()),
			a = o.fromLatLngToPoint(this.getBounds().getNorthEast()),
			r = o.fromLatLngToPoint(this.getBounds().getSouthWest()),
			s = o.fromLatLngToPoint(t),
			c = o.fromLatLngToPoint(e);
		this.__$rect = {
			top: -(c.y - r.y) * n,
			bottom: (a.y - s.y) * n,
			left: -(s.x - a.x) * n,
			right: (r.x - c.x) * n
		}, this.__$rect.top > 0 && (this.__$rect.top = 0), this.__$rect.bottom < 0 && (this.__$rect.bottom = 0), this.__$rect.left > 0 && (this.__$rect.left = 0), this.__$rect.right < 0 && (this.__$rect.right = 0), this.__$now = {
			x: 0,
			y: 0
		}
	}

	function r(e) {
		this.__$width = this.getDiv().getBoundingClientRect().width / 2, this.__$height = this.getDiv().getBoundingClientRect().height / 2, a.call(this, e)
	}

	function s(e) {
		if (!t.__$markerDragged()) switch (this.__$endFn || (this.__$moveFn = c.bind(this), this.__$endFn = l.bind(this)), this.__$cancel && this.__$cancel(), t.__$pointNumber()) {
			case 1:
				this.getDiv().addEventListener("touchmove", this.__$moveFn, !0), this.getDiv().addEventListener("touchend", this.__$endFn, !0), this.__$isBind = !0, this.__$prePosition = {
					x: e.touches[0].clientX,
					y: e.touches[0].clientY
				}, this.__$preprePosition = this.__$prePosition, this.__$preTime = e.timeStamp, this.__$prepreTime = this.__$preTime;
				break;
			case 2:
				this.__$isBind || (this.getDiv().addEventListener("touchmove", this.__$moveFn, !0), this.getDiv().addEventListener("touchend", this.__$endFn, !0), this.__$isBind = !0), this.__$prePosition = {
					x: (e.touches[0].clientX + e.touches[1].clientX) / 2,
					y: (e.touches[0].clientY + e.touches[1].clientY) / 2
				};
				var o = this.getDiv().getBoundingClientRect();
				this.__$offsetX = (o.left + o.right) / 2 - this.__$prePosition.x, this.__$offsetY = (o.top + o.bottom) / 2 - this.__$prePosition.y, this.__$preprePosition = this.__$prePosition, this.__$prepreTime = this.__$preTime, this.__$preTime = e.timeStamp, this.__$mId = e.touches[1].identifier, this.__$destance = Math.sqrt(Math.pow(e.touches[0].clientX - e.touches[1].clientX, 2) + Math.pow(e.touches[0].clientY - e.touches[1].clientY, 2))
		}
	}

	function c(e) {
		if (!t.__$markerDragged()) switch (this.__$prepreTime = this.__$preTime, this.__$preTime = e.timeStamp, t.__$pointNumber()) {
			case 1:
				var i = e.touches[0].clientX,
					n = e.touches[0].clientY;
				o(this, i - this.__$prePosition.x, n - this.__$prePosition.y), this.__$preprePosition = this.__$prePosition, this.__$prePosition = {
					x: i,
					y: n
				};
				break;
			default:
				var i = (e.touches[0].clientX + e.touches[1].clientX) / 2,
					n = (e.touches[0].clientY + e.touches[1].clientY) / 2,
					a = Math.sqrt(Math.pow(e.touches[0].clientX - e.touches[1].clientX, 2) + Math.pow(e.touches[0].clientY - e.touches[1].clientY, 2));
				this.__$preScale = this.__$scale, this.__$scale = a / this.__$destance, this.__$scale > this.__$maxScale && (this.__$scale = this.__$maxScale), this.__$scale < this.__$minScale && (this.__$scale = this.__$minScale);
				var r = this.__$scale - this.__$preScale;
				o(this, i - this.__$prePosition.x + this.__$offsetX * r, n - this.__$prePosition.y + this.__$offsetY * r);
				var s = this;
				window.requestAnimationFrame(function() {
					s.getDiv().firstElementChild.style.webkitTransform = "scale(" + s.__$scale + ")", s.getDiv().firstElementChild.style.transform = "scale(" + s.__$scale + ")", s = null
				}), this.__$preprePosition = this.__$prePosition, this.__$prePosition = {
					x: i,
					y: n
				}
		}
	}

	function l(e) {
		if ("__$mId" in this && (!e.touches[1] || e.touches[1].identifier !== this.__$mId)) {
			var i = n(this.__$scale);
			this.__$scale = 1;
			var a = this;
			window.requestAnimationFrame(function() {
				a.getDiv().firstElementChild.style.webkitTransform = "scale(" + a.__$scale + ")", a.getDiv().firstElementChild.style.transform = "scale(" + a.__$scale + ")", a = null
			}), this.setZoom(this.getZoom() + i), this.__$preprePosition = null, delete this.__$preScale, delete this.__$offsetX, delete this.__$offsetY, delete this.__$destance, delete this.__$mId
		}
		if (!e.touches[0] || e.touches[0].identifier !== t.__$firstTouchid()) {
			if (this.getDiv().removeEventListener("touchmove", this.__$moveFn, !0), this.getDiv().removeEventListener("touchend", this.__$endFn, !0), this.__$isBind = !1, this.__$prepreTime && this.__$preprePosition) {
				for (var r = e.timeStamp - this.__$prepreTime, s = null, c = 0, l = e.changedTouches.length; l > c; ++c)
					if (e.changedTouches[c].identifier === t.__$firstTouchid()) {
						s = e.changedTouches[c];
						break
					}
				var d = (s.clientX - this.__$preprePosition.x) / (r / 1e3),
					u = (s.clientY - this.__$preprePosition.y) / (r / 1e3);
				if (0 !== d || 0 !== u) {
					var p = Math.sqrt(d * d + u * u),
						m = 1e3,
						h = -m * d / p,
						g = -m * u / p,
						f = p / m,
						y = e.timeStamp,
						_ = 0,
						v = 0,
						w = this,
						S = window.requestAnimationFrame(function() {
							var e = ((new Date).getTime() - y) / 1e3;
							e > f ? e = f : S = window.requestAnimationFrame(arguments.callee);
							var t = d * e + .5 * h * e * e,
								i = u * e + .5 * g * e * e;
							o(w, t - _, i - v), _ = t, v = i
						});
					this.__$cancel = function() {
						window.cancelRequestAnimationFrame(S), delete this.__$cancel, w = null
					}
				}
			}
			delete this.__$prePosition, delete this.__$preprePosition, delete this.__$preTime, delete this.__$prepreTime, delete this.__$mId
		}
	}
	return window.requestAnimationFrame || (window.requestAnimationFrame = window.webkitRequestAnimationFrame), window.cancelRequestAnimationFrame || (window.cancelRequestAnimationFrame = window.webkitCancelRequestAnimationFrame), window.mapRect = {
		init: function(e, t, o, i, n) {
			e.__$rect_sw = t, e.__$rect_ne = o, e.__$rect = null, e.__$now = null, e.__$scale = 1, e.__$width = 0, e.__$height = 0, e.__$minZoom = i || 3, e.__$maxZoom = n || 21, e.__$minScale = 0, e.__$maxScale = 0, e.setOptions({
				draggable: !1
			}), gogle.maps.event.addListener(e, "projection_changed", r), gogle.maps.event.addListener(e, "zoom_changed", a), e.getDiv().addEventListener("touchstart", s.bind(e), !0)
		},
		moveToCenter: function(e) {
			var t = e.getMap(),
				n = t.getProjection(),
				a = n.fromLatLngToPoint(t.getCenter()),
				r = n.fromLatLngToPoint(e.getPosition()),
				s = i(t.getZoom());
			o(t, (a.x - r.x) * s, (a.y - r.y) * s)
		}
	}
}]).factory("markerEvent", function() {
	return {
		resize: function(e, t) {
			gogle.maps.event.addListener(e.getMap(), "zoom_changed", function() {
				e.getMap() === this && t.call(e, this.getZoom())
			})
		}
	}
})

