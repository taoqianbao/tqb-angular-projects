angular.module("app.common.graphic.service", []).factory("BinaryFile", function() {
	return function(e, t, o) {
		var i = e,
			n = t || 0,
			a = 0;
		this.getRawData = function() {
			return i
		}, "string" == typeof e ? (a = o || i.length, this.getByteAt = function(e) {
			return 255 & i.charCodeAt(e + n)
		}, this.getBytesAt = function(e, t) {
			for (var o = [], a = 0; t > a; a++) o[a] = 255 & i.charCodeAt(e + a + n);
			return o
		}) : "unknown" == typeof e && (a = o || IEBinary_getLength(i), this.getByteAt = function(e) {
			return IEBinary_getByteAt(i, e + n)
		}, this.getBytesAt = function(e, t) {
			return new VBArray(IEBinary_getBytesAt(i, e + n, t)).toArray()
		}), this.getLength = function() {
			return a
		}, this.getSByteAt = function(e) {
			var t = this.getByteAt(e);
			return t > 127 ? t - 256 : t
		}, this.getShortAt = function(e, t) {
			var o = t ? (this.getByteAt(e) << 8) + this.getByteAt(e + 1) : (this.getByteAt(e + 1) << 8) + this.getByteAt(e);
			return 0 > o && (o += 65536), o
		}, this.getSShortAt = function(e, t) {
			var o = this.getShortAt(e, t);
			return o > 32767 ? o - 65536 : o
		}, this.getLongAt = function(e, t) {
			var o = this.getByteAt(e),
				i = this.getByteAt(e + 1),
				n = this.getByteAt(e + 2),
				a = this.getByteAt(e + 3),
				r = t ? (((o << 8) + i << 8) + n << 8) + a : (((a << 8) + n << 8) + i << 8) + o;
			return 0 > r && (r += 4294967296), r
		}, this.getSLongAt = function(e, t) {
			var o = this.getLongAt(e, t);
			return o > 2147483647 ? o - 4294967296 : o
		}, this.getStringAt = function(e, t) {
			for (var o = [], i = this.getBytesAt(e, t), n = 0; t > n; n++) o[n] = String.fromCharCode(i[n]);
			return o.join("")
		}, this.getCharAt = function(e) {
			return String.fromCharCode(this.getByteAt(e))
		}, this.toBase64 = function() {
			return window.btoa(i)
		}, this.fromBase64 = function(e) {
			i = window.atob(e)
		}
	}
}).factory("EXIF", function() {
	function e(e) {
		return !!e.exifdata
	}

	function t(e, t) {
		BinaryAjax(e.src, function(i) {
			var n = o(i.binaryResponse);
			e.exifdata = n || {}, t && t.call(e)
		})
	}

	function o(e) {
		if (255 != e.getByteAt(0) || 216 != e.getByteAt(1)) return !1;
		for (var t, o = 2, i = e.getLength(); i > o;) {
			if (255 != e.getByteAt(o)) return u && console.log("Not a valid marker at offset " + o + ", found: " + e.getByteAt(o)), !1;
			if (t = e.getByteAt(o + 1), 22400 == t) return u && console.log("Found 0xFFE1 marker"), a(e, o + 4, e.getShortAt(o + 2, !0) - 2);
			if (225 == t) return u && console.log("Found 0xFFE1 marker"), a(e, o + 4, e.getShortAt(o + 2, !0) - 2);
			o += 2 + e.getShortAt(o + 2, !0)
		}
	}

	function i(e, t, o, i, a) {
		var r, s, c, l = e.getShortAt(o, a),
			d = {};
		for (c = 0; l > c; c++) r = o + 12 * c + 2, s = i[e.getShortAt(r, a)], !s && u && console.log("Unknown tag: " + e.getShortAt(r, a)), d[s] = n(e, r, t, o, a);
		return d
	}

	function n(e, t, o, i, n) {
		var a, r, s, c, l, d, u = e.getShortAt(t + 2, n),
			p = e.getLongAt(t + 4, n),
			m = e.getLongAt(t + 8, n) + o;
		switch (u) {
			case 1:
			case 7:
				if (1 == p) return e.getByteAt(t + 8, n);
				for (a = p > 4 ? m : t + 8, r = [], c = 0; p > c; c++) r[c] = e.getByteAt(a + c);
				return r;
			case 2:
				return a = p > 4 ? m : t + 8, e.getStringAt(a, p - 1);
			case 3:
				if (1 == p) return e.getShortAt(t + 8, n);
				for (a = p > 2 ? m : t + 8, r = [], c = 0; p > c; c++) r[c] = e.getShortAt(a + 2 * c, n);
				return r;
			case 4:
				if (1 == p) return e.getLongAt(t + 8, n);
				r = [];
				for (var c = 0; p > c; c++) r[c] = e.getLongAt(m + 4 * c, n);
				return r;
			case 5:
				if (1 == p) return l = e.getLongAt(m, n), d = e.getLongAt(m + 4, n), s = new Number(l / d), s.numerator = l, s.denominator = d, s;
				for (r = [], c = 0; p > c; c++) l = e.getLongAt(m + 8 * c, n), d = e.getLongAt(m + 4 + 8 * c, n), r[c] = new Number(l / d), r[c].numerator = l, r[c].denominator = d;
				return r;
			case 9:
				if (1 == p) return e.getSLongAt(t + 8, n);
				for (r = [], c = 0; p > c; c++) r[c] = e.getSLongAt(m + 4 * c, n);
				return r;
			case 10:
				if (1 == p) return e.getSLongAt(m, n) / e.getSLongAt(m + 4, n);
				for (r = [], c = 0; p > c; c++) r[c] = e.getSLongAt(m + 8 * c, n) / e.getSLongAt(m + 4 + 8 * c, n);
				return r
		}
	}

	function a(e, t) {
		if ("Exif" != e.getStringAt(t, 4)) return u && console.log("Not valid EXIF data! " + e.getStringAt(t, 4)), !1;
		var o, n, a, r, s, c = t + 6;
		if (18761 == e.getShortAt(c)) o = !1;
		else {
			if (19789 != e.getShortAt(c)) return u && console.log("Not valid TIFF data! (no 0x4949 or 0x4D4D)"), !1;
			o = !0
		}
		if (42 != e.getShortAt(c + 2, o)) return u && console.log("Not valid TIFF data! (no 0x002A)"), !1;
		if (8 != e.getLongAt(c + 4, o)) return u && console.log("Not valid TIFF data! (First offset not 8)", e.getShortAt(c + 4, o)), !1;
		if (n = i(e, c, c + 8, m, o), n.ExifIFDPointer) {
			r = i(e, c, c + n.ExifIFDPointer, p, o);
			for (a in r) {
				switch (a) {
					case "LightSource":
					case "Flash":
					case "MeteringMode":
					case "ExposureProgram":
					case "SensingMethod":
					case "SceneCaptureType":
					case "SceneType":
					case "CustomRendered":
					case "WhiteBalance":
					case "GainControl":
					case "Contrast":
					case "Saturation":
					case "Sharpness":
					case "SubjectDistanceRange":
					case "FileSource":
						r[a] = g[a][r[a]];
						break;
					case "ExifVersion":
					case "FlashpixVersion":
						r[a] = String.fromCharCode(r[a][0], r[a][1], r[a][2], r[a][3]);
						break;
					case "ComponentsConfiguration":
						r[a] = g.Components[r[a][0]] + g.Components[r[a][1]] + g.Components[r[a][2]] + g.Components[r[a][3]]
				}
				n[a] = r[a]
			}
		}
		if (n.GPSInfoIFDPointer) {
			s = i(e, c, c + n.GPSInfoIFDPointer, h, o);
			for (a in s) {
				switch (a) {
					case "GPSVersionID":
						s[a] = s[a][0] + "." + s[a][1] + "." + s[a][2] + "." + s[a][3]
				}
				n[a] = s[a]
			}
		}
		return n
	}

	function r(o, i) {
		return o.complete ? (e(o) ? i && i.call(o) : t(o, i), !0) : !1
	}

	function s(t, o) {
		return e(t) ? t.exifdata[o] : void 0
	}

	function c(t) {
		if (!e(t)) return {};
		var o, i = t.exifdata,
			n = {};
		for (o in i) i.hasOwnProperty(o) && (n[o] = i[o]);
		return n
	}

	function l(t) {
		if (!e(t)) return "";
		var o, i = t.exifdata,
			n = "";
		for (o in i) i.hasOwnProperty(o) && (n += "object" == typeof i[o] ? i[o] instanceof Number ? o + " : " + i[o] + " [" + i[o].numerator + "/" + i[o].denominator + "]\r\n" : o + " : [" + i[o].length + " values]\r\n" : o + " : " + i[o] + "\r\n");
		return n
	}

	function d(e) {
		return o(e)
	}
	var u = !1,
		p = {
			36864: "ExifVersion",
			40960: "FlashpixVersion",
			40961: "ColorSpace",
			40962: "PixelXDimension",
			40963: "PixelYDimension",
			37121: "ComponentsConfiguration",
			37122: "CompressedBitsPerPixel",
			37500: "MakerNote",
			37510: "UserComment",
			40964: "RelatedSoundFile",
			36867: "DateTimeOriginal",
			36868: "DateTimeDigitized",
			37520: "SubsecTime",
			37521: "SubsecTimeOriginal",
			37522: "SubsecTimeDigitized",
			33434: "ExposureTime",
			33437: "FNumber",
			34850: "ExposureProgram",
			34852: "SpectralSensitivity",
			34855: "ISOSpeedRatings",
			34856: "OECF",
			37377: "ShutterSpeedValue",
			37378: "ApertureValue",
			37379: "BrightnessValue",
			37380: "ExposureBias",
			37381: "MaxApertureValue",
			37382: "SubjectDistance",
			37383: "MeteringMode",
			37384: "LightSource",
			37385: "Flash",
			37396: "SubjectArea",
			37386: "FocalLength",
			41483: "FlashEnergy",
			41484: "SpatialFrequencyResponse",
			41486: "FocalPlaneXResolution",
			41487: "FocalPlaneYResolution",
			41488: "FocalPlaneResolutionUnit",
			41492: "SubjectLocation",
			41493: "ExposureIndex",
			41495: "SensingMethod",
			41728: "FileSource",
			41729: "SceneType",
			41730: "CFAPattern",
			41985: "CustomRendered",
			41986: "ExposureMode",
			41987: "WhiteBalance",
			41988: "DigitalZoomRation",
			41989: "FocalLengthIn35mmFilm",
			41990: "SceneCaptureType",
			41991: "GainControl",
			41992: "Contrast",
			41993: "Saturation",
			41994: "Sharpness",
			41995: "DeviceSettingDescription",
			41996: "SubjectDistanceRange",
			40965: "InteroperabilityIFDPointer",
			42016: "ImageUniqueID"
		},
		m = {
			256: "ImageWidth",
			257: "ImageHeight",
			34665: "ExifIFDPointer",
			34853: "GPSInfoIFDPointer",
			40965: "InteroperabilityIFDPointer",
			258: "BitsPerSample",
			259: "Compression",
			262: "PhotometricInterpretation",
			274: "Orientation",
			277: "SamplesPerPixel",
			284: "PlanarConfiguration",
			530: "YCbCrSubSampling",
			531: "YCbCrPositioning",
			282: "XResolution",
			283: "YResolution",
			296: "ResolutionUnit",
			273: "StripOffsets",
			278: "RowsPerStrip",
			279: "StripByteCounts",
			513: "JPEGInterchangeFormat",
			514: "JPEGInterchangeFormatLength",
			301: "TransferFunction",
			318: "WhitePoint",
			319: "PrimaryChromaticities",
			529: "YCbCrCoefficients",
			532: "ReferenceBlackWhite",
			306: "DateTime",
			270: "ImageDescription",
			271: "Make",
			272: "Model",
			305: "Software",
			315: "Artist",
			33432: "Copyright"
		},
		h = {
			0: "GPSVersionID",
			1: "GPSLatitudeRef",
			2: "GPSLatitude",
			3: "GPSLongitudeRef",
			4: "GPSLongitude",
			5: "GPSAltitudeRef",
			6: "GPSAltitude",
			7: "GPSTimeStamp",
			8: "GPSSatellites",
			9: "GPSStatus",
			10: "GPSMeasureMode",
			11: "GPSDOP",
			12: "GPSSpeedRef",
			13: "GPSSpeed",
			14: "GPSTrackRef",
			15: "GPSTrack",
			16: "GPSImgDirectionRef",
			17: "GPSImgDirection",
			18: "GPSMapDatum",
			19: "GPSDestLatitudeRef",
			20: "GPSDestLatitude",
			21: "GPSDestLongitudeRef",
			22: "GPSDestLongitude",
			23: "GPSDestBearingRef",
			24: "GPSDestBearing",
			25: "GPSDestDistanceRef",
			26: "GPSDestDistance",
			27: "GPSProcessingMethod",
			28: "GPSAreaInformation",
			29: "GPSDateStamp",
			30: "GPSDifferential"
		},
		g = {
			ExposureProgram: {
				0: "Not defined",
				1: "Manual",
				2: "Normal program",
				3: "Aperture priority",
				4: "Shutter priority",
				5: "Creative program",
				6: "Action program",
				7: "Portrait mode",
				8: "Landscape mode"
			},
			MeteringMode: {
				0: "Unknown",
				1: "Average",
				2: "CenterWeightedAverage",
				3: "Spot",
				4: "MultiSpot",
				5: "Pattern",
				6: "Partial",
				255: "Other"
			},
			LightSource: {
				0: "Unknown",
				1: "Daylight",
				2: "Fluorescent",
				3: "Tungsten (incandescent light)",
				4: "Flash",
				9: "Fine weather",
				10: "Cloudy weather",
				11: "Shade",
				12: "Daylight fluorescent (D 5700 - 7100K)",
				13: "Day white fluorescent (N 4600 - 5400K)",
				14: "Cool white fluorescent (W 3900 - 4500K)",
				15: "White fluorescent (WW 3200 - 3700K)",
				17: "Standard light A",
				18: "Standard light B",
				19: "Standard light C",
				20: "D55",
				21: "D65",
				22: "D75",
				23: "D50",
				24: "ISO studio tungsten",
				255: "Other"
			},
			Flash: {
				0: "Flash did not fire",
				1: "Flash fired",
				5: "Strobe return light not detected",
				7: "Strobe return light detected",
				9: "Flash fired, compulsory flash mode",
				13: "Flash fired, compulsory flash mode, return light not detected",
				15: "Flash fired, compulsory flash mode, return light detected",
				16: "Flash did not fire, compulsory flash mode",
				24: "Flash did not fire, auto mode",
				25: "Flash fired, auto mode",
				29: "Flash fired, auto mode, return light not detected",
				31: "Flash fired, auto mode, return light detected",
				32: "No flash function",
				65: "Flash fired, red-eye reduction mode",
				69: "Flash fired, red-eye reduction mode, return light not detected",
				71: "Flash fired, red-eye reduction mode, return light detected",
				73: "Flash fired, compulsory flash mode, red-eye reduction mode",
				77: "Flash fired, compulsory flash mode, red-eye reduction mode, return light not detected",
				79: "Flash fired, compulsory flash mode, red-eye reduction mode, return light detected",
				89: "Flash fired, auto mode, red-eye reduction mode",
				93: "Flash fired, auto mode, return light not detected, red-eye reduction mode",
				95: "Flash fired, auto mode, return light detected, red-eye reduction mode"
			},
			SensingMethod: {
				1: "Not defined",
				2: "One-chip color area sensor",
				3: "Two-chip color area sensor",
				4: "Three-chip color area sensor",
				5: "Color sequential area sensor",
				7: "Trilinear sensor",
				8: "Color sequential linear sensor"
			},
			SceneCaptureType: {
				0: "Standard",
				1: "Landscape",
				2: "Portrait",
				3: "Night scene"
			},
			SceneType: {
				1: "Directly photographed"
			},
			CustomRendered: {
				0: "Normal process",
				1: "Custom process"
			},
			WhiteBalance: {
				0: "Auto white balance",
				1: "Manual white balance"
			},
			GainControl: {
				0: "None",
				1: "Low gain up",
				2: "High gain up",
				3: "Low gain down",
				4: "High gain down"
			},
			Contrast: {
				0: "Normal",
				1: "Soft",
				2: "Hard"
			},
			Saturation: {
				0: "Normal",
				1: "Low saturation",
				2: "High saturation"
			},
			Sharpness: {
				0: "Normal",
				1: "Soft",
				2: "Hard"
			},
			SubjectDistanceRange: {
				0: "Unknown",
				1: "Macro",
				2: "Close view",
				3: "Distant view"
			},
			FileSource: {
				3: "DSC"
			},
			Components: {
				0: "",
				1: "Y",
				2: "Cb",
				3: "Cr",
				4: "R",
				5: "G",
				6: "B"
			}
		};
	return {
		readFromBinaryFile: d,
		pretty: l,
		getTag: s,
		getAllTags: c,
		getData: r,
		Tags: p,
		TiffTags: m,
		GPSTags: h,
		StringValues: g
	}
}).factory("canvasResize", ["BinaryFile", "EXIF", function(e, t) {
	function o(e, t) {
		this.file = e, this.__options = t, this.options = n.extend({}, a, t), this._defaults = a, this._name = i, this.init()
	}
	var i = "canvasResize",
		n = {
			newsize: function(e, t, o, i, n) {
				var a = n ? "h" : "";
				if (o && e > o || i && t > i) {
					var r = e / t;
					(r >= 1 || 0 === i) && o && !n ? (e = o, t = o / r >> 0) : n && o / i >= r ? (e = o, t = o / r >> 0, a = "w") : (e = i * r >> 0, t = i)
				}
				return {
					width: e,
					height: t,
					cropped: a
				}
			},
			dataURLtoBlob: function(e) {
				for (var t = e.split(",")[0].split(":")[1].split(";")[0], o = atob(e.split(",")[1]), i = new ArrayBuffer(o.length), n = new Uint8Array(i), a = 0; a < o.length; a++) n[a] = o.charCodeAt(a);
				var r = window.BlobBuilder || window.WebKitBlobBuilder || window.MozBlobBuilder;
				return r ? (r = new(window.BlobBuilder || window.WebKitBlobBuilder || window.MozBlobBuilder), r.append(i), r.getBlob(t)) : r = new Blob([i], {
					type: t
				})
			},
			detectSubsampling: function(e) {
				var t = e.width,
					o = e.height;
				if (t * o > 1048576) {
					var i = document.createElement("canvas");
					i.width = i.height = 1;
					var n = i.getContext("2d");
					return n.drawImage(e, -t + 1, 0), 0 === n.getImageData(0, 0, 1, 1).data[3]
				}
				return !1
			},
			rotate: function(e, t) {
				var o = {
					1: {
						90: 6,
						180: 3,
						270: 8
					},
					2: {
						90: 7,
						180: 4,
						270: 5
					},
					3: {
						90: 8,
						180: 1,
						270: 6
					},
					4: {
						90: 5,
						180: 2,
						270: 7
					},
					5: {
						90: 2,
						180: 7,
						270: 4
					},
					6: {
						90: 3,
						180: 8,
						270: 1
					},
					7: {
						90: 4,
						180: 5,
						270: 2
					},
					8: {
						90: 1,
						180: 6,
						270: 3
					}
				};
				return o[e][t] ? o[e][t] : e
			},
			transformCoordinate: function(e, t, o, i) {
				switch (i) {
					case 5:
					case 6:
					case 7:
					case 8:
						e.width = o, e.height = t;
						break;
					default:
						e.width = t, e.height = o
				}
				var n = e.getContext("2d");
				switch (i) {
					case 1:
						break;
					case 2:
						n.translate(t, 0), n.scale(-1, 1);
						break;
					case 3:
						n.translate(t, o), n.rotate(Math.PI);
						break;
					case 4:
						n.translate(0, o), n.scale(1, -1);
						break;
					case 5:
						n.rotate(.5 * Math.PI), n.scale(1, -1);
						break;
					case 6:
						n.rotate(.5 * Math.PI), n.translate(0, -o);
						break;
					case 7:
						n.rotate(.5 * Math.PI), n.translate(t, -o), n.scale(-1, 1);
						break;
					case 8:
						n.rotate(-.5 * Math.PI), n.translate(-t, 0)
				}
			},
			detectVerticalSquash: function(e, t, o) {
				var i = document.createElement("canvas");
				i.width = 1, i.height = o;
				var n = i.getContext("2d");
				n.drawImage(e, 0, 0);
				for (var a = n.getImageData(0, 0, 1, o).data, r = 0, s = o, c = o; c > r;) {
					var l = a[4 * (c - 1) + 3];
					0 === l ? s = c : r = c, c = s + r >> 1
				}
				var d = c / o;
				return 0 === d ? 1 : d
			},
			callback: function(e) {
				return e
			},
			extend: function() {
				var e = arguments[0] || {},
					t = 1,
					o = arguments.length,
					i = !1;
				e.constructor === Boolean && (i = e, e = arguments[1] || {}), 1 === o && (e = this, t = 0);
				for (var a; o > t; t++)
					if (null !== (a = arguments[t]))
						for (var r in a) e !== a[r] && (i && "object" == typeof a[r] && e[r] ? n.extend(e[r], a[r]) : void 0 !== a[r] && (e[r] = a[r]));
				return e
			}
		},
		a = {
			width: void 0,
			height: void 0,
			crop: !1,
			quality: 100,
			rotate: 0,
			callback: n.callback
		};
	return o.prototype = {
			init: function() {
				function o(o) {
					var r = atob(o.split(",")[1]),
						s = new e(r, 0, r.length),
						c = t.readFromBinaryFile(s),
						l = new Image;
					l.onload = function() {
						var e = c.Orientation || 1;
						e = n.rotate(e, i.options.rotate);
						var t = e >= 5 && 8 >= e ? n.newsize(l.height, l.width, i.options.width, i.options.height, i.options.crop) : n.newsize(l.width, l.height, i.options.width, i.options.height, i.options.crop),
							o = l.width,
							r = l.height,
							s = t.width,
							d = t.height,
							u = s * d;
						if (u > 5e6) {
							var p = Math.sqrt(u / 5e6);
							s /= p, d /= p
						}
						var m = document.createElement("canvas"),
							h = m.getContext("2d");
						h.save(), n.transformCoordinate(m, s, d, e), n.detectSubsampling(l) && (o /= 2, r /= 2);
						var g = 1024,
							f = document.createElement("canvas");
						f.width = f.height = g;
						for (var y = f.getContext("2d"), _ = n.detectVerticalSquash(l, o, r), v = 0; r > v;) {
							for (var w = v + g > r ? r - v : g, S = 0; o > S;) {
								var b = S + g > o ? o - S : g;
								y.clearRect(0, 0, g, g), y.drawImage(l, -S, -v);
								var k = Math.floor(S * s / o),
									$ = Math.ceil(b * s / o),
									x = Math.floor(v * d / r / _),
									P = Math.ceil(w * d / r / _);
								h.drawImage(f, 0, 0, b, w, k, x, $, P), S += g
							}
							v += g
						}
						h.restore(), f = y = null;
						var C = document.createElement("canvas");
						C.width = "h" === t.cropped ? d : s, C.height = "w" === t.cropped ? s : d;
						var T = "h" === t.cropped ? .5 * (d - s) : 0,
							A = "w" === t.cropped ? .5 * (s - d) : 0;
						if (newctx = C.getContext("2d"), newctx.drawImage(m, T, A, s, d), "image/png" === a.type) var M = C.toDataURL(a.type);
						else var M = C.toDataURL("image/jpeg", .01 * i.options.quality);
						i.__options.callback(M, C.width, C.height, C)
					}, l.src = o
				}
				var i = this,
					a = this.file;
				if (angular.isString(a)) o(a);
				else {
					var r = new FileReader;
					r.onloadend = o, r.readAsDataURL(a)
				}
			}
		},
		function(e, t) {
			new o(e, t)
		}
}]).factory("file", ["resFileUpload", "Ajax", "JAlert", function(e, t, o) {
	function i(e) {
		var i = e.data;
		if (0 === i.code) {
			var n = i.token,
				a = new t("http://upload.qiniu.com/", {
					method: t.HttpMethod.POST,
					enctype: t.HttpFormEnctype.MULTIPARTFORMDATA,
					crossDomain: !0,
					data: {
						key: this.opt.name,
						token: n,
						file: this.opt.file
					}
				}, "fileUpload");
			a.addEventListener(t.Event.SUCCESS, this.success), a.addEventListener(t.Event.ERROR, this.error), a.send(), o.show("正在保存图片")
		} else o.showOnce(i.msg)
	}

	function n(e, o, i, n, a, r, s, c) {
		var l = new t("http://upload.qiniu.com/", {
			method: t.HttpMethod.POST,
			enctype: t.HttpFormEnctype.MULTIPARTFORMDATA,
			crossDomain: !0,
			data: {
				key: o,
				token: e,
				file: i
			},
			timeout: n
		}, "fileUpload2");
		a && l.addEventListener(t.Event.SUCCESS, a), r && l.addEventListener(t.Event.ERROR, r), s && l.addEventListener(t.Event.TIMEOUT, s), c && (l.getXHR().upload.onprogress = c), l.send()
	}
	return t.global.addEventListener(t.Event.SUCCESS, function() {
		"fileUpload" === this.getId() && o.hide()
	}), t.global.addEventListener(t.Event.ERROR, function() {
		"fileUpload" === this.getId() && o.hide()
	}), {
		upload: function(t, o, n) {
			e.getToken({}).$promise.then(i.bind({
				opt: t,
				success: o,
				error: n
			}))
		},
		uploadTest: function(t, o, n) {
			e.getTestToken({}).$promise.then(i.bind({
				opt: t,
				success: o,
				error: n
			}))
		},
		getToken: function(t, o, i) {
			var n = "getToken";
			i && (n = "getTestToken"), e[n]({}, function(e) {
				0 === e.data.code && t && t(e.data.token)
			}, o || angular.noop)
		},
		getMP3Token: function(t, o, i, n) {
			var a = "getAudioMP3Token";
			n && (a = "getTestAudioMP3Token"), e[a]({
				key: t
			}, function(e) {
				o && o(e.data.token)
			}, i || angular.noop)
		},
		upload2: function(e, t, o, i, a) {
			n(e.token, e.name, e.file, e.time || 18e3, t, o, i, a)
		}
	}
}]).factory("tip", ["$timeout", "cacheLocal", "$ionicHistory", "$ionicPlatform", "$rootScope", function(e, t, o, i, n) {
	function a() {
		n.user.isIOS || (h(), h = i.registerBackButtonAction(function(e) {
			e.preventDefault()
		}, 401))
	}

	function r() {
		n.user.isIOS || (h(), h = angular.noop)
	}

	function s() {
		g.classList.add("android-fix")
	}

	function c() {
		g.style.opacity = 1
	}

	function l() {
		g.style.display = "", g.classList.remove("show"), f.style.top = ""
	}

	function d(e, t) {
		return ["-webkit-gradient(radial,50% 50%,", e, ",50% 50%,", t, ",from(rgba(255,255,255,0)), to(rgba(35,24,21,0.8)))"].join("")
	}

	function u() {
		v.style.opacity = 1
	}

	function p() {
		v.style.display = "", v.classList.remove("show")
	}

	function m() {
		if (k) {
			var e = k[k.index];
			e ? (e.fn && e.fn(), e.tipText ? ($.closeScroll(), $.searchlight(e.tipText, e.position, e.innerRadius, e.outerRadius, e.direction, e.width, e.offset)) : ($.closeSearchlight(), $.scroll(e.type, e.position, e.width, e.height, e.text, e.direction)), ++k.index) : ($.closeScroll(), $.closeSearchlight(), k = null)
		}
	}
	var h = angular.noop,
		g = document.createElement("div");
	g.classList.add("searchlight"), e(function() {
		n.user.isIOS && s()
	}, 300), g.appendChild(document.createElement("div"));
	var f = document.createElement("div");
	g.appendChild(document.createElement("div")).appendChild(f), document.body.appendChild(g);
	var y = !1,
		_ = null,
		v = document.createElement("div");
	v.classList.add("scrolltip");
	var w = document.createElement("div");
	v.appendChild(document.createElement("div")).appendChild(w), document.body.appendChild(v).appendChild(document.createElement("div"));
	var S = !1,
		b = null,
		k = null;
	g.addEventListener("touchend", m), v.addEventListener("touchend", m);
	var $ = {
		searchlight: function(t, o, i, n, r, l, u) {
			t = t || "", o = o || {
				x: 0,
				y: 0
			}, i = i || 0, n = n || 50, r = r || "bottom", u = u || 0, e.cancel(_), y || (a(), g.style.display = "block", _ = e(c, 10), y = !0), g.style.background = d(i, n), g.style.webkitTransform = "translate3d(" + o.x + "px," + o.y + "px,0)", g.classList.remove("show"), _ = e(function() {
				g.setAttribute("direction", r), f.parentNode.style.width = l ? l + "px" : "", "left" === r || "right" === r ? (f.style.top = -f.getBoundingClientRect().height / 2 + "px", f.parentNode.style.webkitTransform = "translate3D(0," + u + "px,0)") : f.parentNode.style.webkitTransform = "translate3D(" + u + "px,0,0)", g.classList.add("show"), f.innerHTML = t || "", e(s, 300)
			}, 500)
		},
		closeSearchlight: function() {
			y && (e.cancel(_), g.style.opacity = "", _ = e(l, 500), y = !1, r())
		},
		scroll: function(t, o, i, n, r, s) {
			t = t || "horizon", o = o || {
				x: 0,
				y: 0
			}, i = i || 100, n = n || 100, r = r || "", s = s || "bottom", e.cancel(b), S || (a(), v.style.display = "block", b = e(u, 10), S = !0), v.style.webkitTransform = "translate3d(" + o.x + "px," + o.y + "px,0)", w.style.width = i + "px", w.style.height = n + "px", v.classList.remove("show"), b = e(function() {
				v.setAttribute("type", t), v.setAttribute("direction", s), w.setAttribute("text", r), v.classList.add("show")
			}, 500)
		},
		closeScroll: function() {
			S && (e.cancel(b), v.style.opacity = "", b = e(p, 500), S = !1, r())
		},
		list: function(e) {
			e && (k ? k.push.apply(k, e) : (e.index = 0, k = e, m()))
		},
		shouldTip: function(e) {
			var i = t.system.get("stateGuide"),
				n = e || o.currentView().stateName;
			return !i[n]
		},
		setTiped: function(e) {
			var i = t.system.get("stateGuide"),
				n = e || o.currentView().stateName;
			i[n] = !0, t.system.put("stateGuide", i)
		}
	};
	return $
}]).factory("convert", function() {
	function e(e) {
		var t = (e.naturalWidth, e.naturalHeight),
			o = document.createElement("canvas");
		o.width = 1, o.height = t;
		var i = o.getContext("2d");
		i.drawImage(e, 0, 0);
		for (var n = i.getImageData(0, 0, 1, t).data, a = 0, r = t, s = t; s > a;) {
			var c = n[4 * (s - 1) + 3];
			0 === c ? r = s : a = s, s = r + a >> 1
		}
		var l = s / t;
		return 0 === l ? 1 : l
	}

	function t(t, o, i, n, a, r, s, c, l, d) {
		var u = e(o);
		t.drawImage(o, i, n, a, r, s, c, l, d / u)
	}

	function o(e) {
		for (var t = e.split(","), o = t[0].match(/:(.*?);/)[1], i = atob(t[1]), n = i.length, a = new Uint8Array(n); n--;) a[n] = i.charCodeAt(n);
		return new Blob([a], {
			type: o
		})
	}

	function i(e, t) {
		var o = new FileReader;
		o.onload = function(e) {
			t(e.target.result)
		}, o.readAsDataURL(e)
	}

	function n(e, t) {
		return e.toDataURL(t || "image/jpeg")
	}

	function a(e, o, i, a) {
		var r, s, c = e.naturalWidth,
			l = e.naturalHeight;
		i || a ? (r = i || 0, s = a || 0, r || (r = s / l * c), s || (s = r / c * l)) : (r = c, s = l);
		var d = r * s;
		if (d > 5e6) {
			var u = d / 5e6;
			r /= u, s /= u
		}
		var p = document.createElement("canvas");
		return p.width = r, p.height = s, t(p.getContext("2d"), e, 0, 0, c, l, 0, 0, r, s), n(p, o)
	}

	function r(e, o, i, a, r) {
		var s = document.createElement("canvas");
		s.width = o, s.height = i;
		var c, l, d, u, p, m, h, g, f = e.naturalWidth,
			y = e.naturalHeight;
		switch (a) {
			case "contain":
				i / y > o / f ? (p = 0, h = o, g = o / f * y, m = (i - g) / 2) : (m = 0, g = i, h = i / y * f, p = (o - h) / 2), c = l = 0, d = f, u = y;
				break;
			case "cover":
				o / f > i / y ? (c = 0, d = f, u = f / o * i, l = (y - u) / 2) : (l = 0, u = y, d = y / i * o, c = (f - d) / 2), p = m = 0, h = o, g = i;
				break;
			default:
				f > o ? (c = (f - o) / 2, p = 0) : (p = (o - f) / 2, c = 0), y > i ? (l = (y - i) / 2, m = 0) : (m = (i - y) / 2, l = 0), d = h = Math.min(f, o), u = g = Math.min(y, i)
		}
		return t(s.getContext("2d"), e, c, l, d, u, p, m, h, g), n(s, r)
	}
	return {
		dataURLtoBlob: o,
		readBlobAsDataURL: i,
		canvasToDataUrl: n,
		imageToDataUrl: a,
		clip: r,
		drawImageIOSFix: t
	}
}).factory("filter", function() {
	function e(e) {
		this._caman = Caman(e)
	}
	return Caman.renderBlocks = 8, Caman.Filter.register("huaijiu", function() {
		return this.sepia(100)
	}), Caman.Filter.register("tuise", function() {
		return this.vibrance(-100)
	}), Caman.Filter.register("jiuzhaopian", function() {
		return this.saturation(-100)
	}), Caman.Filter.register("baoguang", function() {
		return this.exposure(8)
	}), Caman.Filter.register("labihua", function() {
		return this.noise(9)
	}), e.prototype = {
		constructor: e,
		reset: function() {
			this._caman.revert()
		},
		useFilter: function(e) {
			e in this._caman && this._caman[e].apply(this._caman, Array.prototype.slice.call(arguments, 1))
		},
		apply: function(e) {
			this._caman.render(e)
		}
	}, {
		names: {
			huaijiu: "怀旧",
			tuise: "褪色",
			jiuzhaopian: "旧照片",
			baoguang: "曝光",
			labihua: "蜡笔画"
		},
		createInstance: function(t) {
			return new e(t)
		}
	}
}).factory("PhotoManager", ["filter", "convert", function(e) {
	function t(e, t, o, i, n) {
		var a = e.width,
			r = e.height,
			s = t.naturalWidth || t.width,
			c = t.naturalHeight || t.height;
		e.width = a;
		var l = e.getContext("2d");
		l.save(), l.setTransform(o, 0, 0, o, a / 2, r / 2), l.rotate(Math.PI / 2 * n);
		var d;
		switch (n) {
			case 0:
				break;
			case 1:
				d = i.x, i.x = i.y, i.y = -d;
				break;
			case 2:
				i.x = -i.x, i.y = -i.y;
				break;
			case 3:
				d = i.x, i.x = -i.y, i.y = d
		}
		l.drawImage(t, 0, 0, s, c, -s / 2 + i.x, -c / 2 + i.y, s, c), l.restore()
	}

	function o(t, i) {
		if (angular.isString(i)) {
			var n = new Image,
				a = this;
			return n.onload = function(e) {
				o.call(a, t, e.target), n.onload = null, a = null
			}, void(n.src = i)
		}
		this._canvas = t, this._originCanvas = document.createElement("canvas"), this._originCanvas.width = i.naturalWidth, this._originCanvas.height = i.naturalHeight, this._originCanvas.getContext("2d").drawImage(i, 0, 0, i.naturalWidth, i.naturalHeight, 0, 0, i.naturalWidth, i.naturalHeight), this._translate = {
			x: 0,
			y: 0
		}, this._rotate = 0, this._scale = Math.max(t.width / i.naturalWidth, t.height / i.naturalHeight), this._maxScale = 2 * this._scale, this._minScale = this._scale / 2, this._filter = e.createInstance(this._originCanvas), this._filterName = "", this._eleScale = t.width / t.getBoundingClientRect().width, d(this);
		var r = {
			manager: this
		};
		t.addEventListener("touchstart", s.bind(r)), t.addEventListener("touchmove", c.bind(r)), t.addEventListener("touchend", l.bind(r))
	}

	function i(e) {
		for (var t = 0, o = 0, i = 0, n = e.length; n > i; ++i) t += e[i].clientX, o += e[i].clientY;
		return {
			x: t / n,
			y: o / n
		}
	}

	function n(e, t) {
		for (var o = 0, i = e.length; i > o; ++o)
			if (e[o].identifier === t) return e[o];
		return null
	}

	function a(e, t, o) {
		var i = n(e, t),
			a = n(e, o);
		return i && a ? Math.sqrt(Math.pow(i.clientX - a.clientX, 2) + Math.pow(i.clientY - a.clientY, 2)) : void 0
	}

	function r(e, t) {
		if (void 0 === t && e[0]) return e[0].identifier;
		for (var o = 0, i = e.length; i > o; ++o)
			if (e[o].identifier !== t) return e[o].identifier
	}

	function s(e) {
		this.center = i(e.targetTouches), e.targetTouches.length >= 2 && (void 0 === this.touchId_1 || void 0 === this.touchId_2) && (void 0 == this.touchId_1 && (this.touchId_1 = r(e.targetTouches, this.touchId_2)), void 0 == this.touchId_2 && (this.touchId_2 = r(e.targetTouches, this.touchId_1)), this.distance = a(e.targetTouches, this.touchId_1, this.touchId_2), this.baseScale = this.manager.scale)
	}

	function c(e) {
		var t = i(e.targetTouches),
			o = t.x - this.center.x,
			n = t.y - this.center.y;
		if (this.center = t, this.distance) var r = a(e.targetTouches, this.touchId_1, this.touchId_2) / this.distance;
		var s = this.manager,
			c = this.baseScale;
		ionic.requestAnimationFrame(function() {
			s.moveBy(o, n), r && (s.scale = r * c), s = null
		})
	}

	function l(e) {
		this.center = i(e.targetTouches);
		var t = n(e.changedTouches, this.touchId_1),
			o = n(e.changedTouches, this.touchId_2);
		t && (delete this.touchId_1, delete this.distance), o && (delete this.touchId_2, delete this.distance)
	}

	function d(e) {
		e = e || this, e.constructor === o && t(e._canvas, e._originCanvas, e._scale, {
			x: e._translate.x / e._scale * e._eleScale,
			y: e._translate.y / e._scale * e._eleScale
		}, e._rotate)
	}
	return o.prototype.render = function() {
		JAlert.show("正在应用滤镜"), this._filter.reset(), this._filter.useFilter.apply(this._filter, arguments), this._filter.apply(function() {
			d(this), JAlert.hide()
		}.bind(this)), this._filterName = arguments[0]
	}, Object.defineProperty(o.prototype, "filter", {
		get: function() {
			return this._filterName
		}
	}), Object.defineProperty(o.prototype, "rotate", {
		get: function() {
			return this._rotate
		},
		set: function(e) {
			this._rotate = e % 4, d(this)
		}
	}), Object.defineProperty(o.prototype, "scale", {
		get: function() {
			return this._scale
		},
		set: function(e) {
			e < this._minScale && (e = this._minScale), e > this._maxScale && (e = this._maxScale), this._scale = e, d(this)
		}
	}), Object.defineProperty(o.prototype, "translate", {
		get: function() {
			return {
				x: this._translate.x,
				y: this._translate.y
			}
		},
		set: function(e) {
			this._translate.x = e.x, this._translate.y = e.y, d(this)
		}
	}), o.prototype.moveTo = function(e, t) {
		this._translate.x = e, this._translate.y = t, d(this)
	}, o.prototype.moveBy = function(e, t) {
		this._translate.x += e, this._translate.y += t, d(this)
	}, o.filterNames = e.names, o
}]).factory("affine", function() {
	function e(e, t, o) {
		if (0 !== o)
			for (var i = t[0].length, n = 0; i > n; ++n) t[0][n] += (e[0][n] || 0) * o, t[1][n] += (e[1][n] || 0) * o
	}

	function t(e, t) {
		if (1 !== t)
			for (var o = e[0].length, i = 0; o > i; ++i) e[0][i] *= t, e[1][i] *= t
	}

	function o(o, i) {
		var n, r = o.order,
			s = 3 === r ? a.E3 : a.E4;
		if (i) {
			n = [];
			for (var c = 0; r > c; ++c) n.push(o._matrix_array[c].slice(0))
		} else n = o._matrix_array;
		var c, l, d;
		for (c = 0; r > c; ++c) {
			if (0 === n[c][c])
				for (d = c + 1; r > d; ++d)
					if (0 !== n[d][c]) {
						e([n[d], s._matrix_array[d]], [n[c], s._matrix_array[c]], 1 / n[d][c]);
						break
					}
			if (0 === n[c][l]) throw new Error("矩阵不可逆");
			for (l = 0; r > l; ++l) c !== l && e([n[c], s._matrix_array[c]], [n[l], s._matrix_array[l]], -n[l][c] / n[c][c]);
			l === r && t([n[c], s._matrix_array[c]], 1 / n[c][c])
		}
		return i ? s : (o._matrix_array = s._matrix_array, o)
	}

	function i(e, t) {
		var o = e.order,
			i = t.order;
		if (i !== o) throw new RangeError("维度不匹配!");
		if (e instanceof a && t instanceof a) {
			var n, r, s, c, l = [];
			for (n = 0; o > n; ++n)
				for (r = 0; o > r; ++r) {
					for (c = 0, s = 0; o > s; ++s) c += e._matrix_array[n][s] * t._matrix_array[s][r];
					l.push(c)
				}
			return new a(l)
		}
		throw new TypeError("参数类型不正确")
	}

	function n(e, t) {
		var o = e.order,
			i = t.order;
		if (i !== o) throw new RangeError("维度不匹配!");
		if (e instanceof a && t instanceof r) {
			var n, s, c, l = [];
			for (n = 0; o > n; ++n) {
				for (c = 0, s = 0; o > s; ++s) c += e._matrix_array[n][s] * t._homogeneous_coordinates[s];
				l.push(c)
			}
			return new r(l)
		}
		throw new TypeError("参数类型不正确")
	}

	function a(e) {
		var t = Array.isArray(e) ? e : arguments;
		switch (t.length) {
			case 9:
				this._order = 3;
				break;
			case 16:
				this._order = 4;
				break;
			default:
				throw new TypeError("矩阵参数个数不正确(9或16)")
		}
		this._matrix_array = [];
		for (var o = 0; o < this._order; ++o) this._matrix_array.push(Array.prototype.slice.call(t, this._order * o, this._order * (o + 1)))
	}

	function r(e) {
		var t = Array.isArray(e) ? e : arguments;
		if (2 !== t.length && 3 == t.length) throw new TypeError("坐标个数不正确(2或3)");
		this._homogeneous_coordinates = Array.prototype.slice.call(t, 0), this._homogeneous_coordinates.push(1), this._order = this._homogeneous_coordinates.length
	}
	return a.prototype = {
		constructor: a,
		get order() {
			return this._order
		},
		getElement: function(e, t) {
			return this._matrix_array[e][t]
		},
		setElement: function(e, t, o) {
			this._matrix_array[e][t] = o
		},
		get inverseMatrix() {
			return o(this, !0)
		},
		inverse: function() {
			return o(this, !1)
		},
		multi: function(e) {
			return this._matrix_array = i(this, e)._matrix_array, this
		},
		translateX: function(e) {
			if (!e) return this;
			var t = 3 === this.order ? [1, 0, e, 0, 1, 0, 0, 0, 1] : [1, 0, 0, e, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];
			return this.multi(new a(t))
		},
		translateY: function(e) {
			if (!x) return this;
			var t = 3 === this.order ? [1, 0, 0, 0, 1, e, 0, 0, 1] : [1, 0, 0, 0, 0, 1, 0, e, 0, 0, 1, 0, 0, 0, 0, 1];
			return this.multi(new a(t))
		},
		translateZ: function(e) {
			return e ? (4 === this.order && this.multi(new a(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, e, 0, 0, 0, 1)), this) : this
		},
		translate: function(e, t, o) {
			if (!e && !t && !o) return this;
			var i = 3 === this.order ? [1, 0, e || 0, 0, 1, t || 0, 0, 0, 1] : [1, 0, 0, e || 0, 0, 1, 0, t || 0, 0, 0, 1, o || 0, 0, 0, 0, 1];
			return this.multi(new a(i))
		},
		scaleX: function(e) {
			if (null == e || 1 == e) return this;
			var t = 3 === this.order ? [e, 0, 0, 0, 1, 0, 0, 0, 1] : [e, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];
			return this.multi(new a(t))
		},
		scaleY: function(e) {
			if (null == e || 1 == e) return this;
			var t = 3 === this.order ? [1, 0, 0, 0, e, 0, 0, 0, 1] : [1, 0, 0, 0, 0, e, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];
			return this.multi(new a(t))
		},
		scaleZ: function(e) {
			return null == e || 1 == e ? this : (4 === this.order && this.multi(new a(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, e, 0, 0, 0, 0, 1)), this)
		},
		scale: function(e, t, o) {
			if (null == e && (e = 1), null == t && (t = 1), null == o && (o = 1), 1 === e && 1 === t && 1 === o) return this;
			var i = 3 === this.order ? [e, 0, 0, 0, t, 0, 0, 0, 1] : [e, 0, 0, 0, 0, t, 0, 0, 0, 0, o, 0, 0, 0, 0, 1];
			return this.multi(new a(i))
		},
		rotateX: function(e) {
			if (!e) return this;
			if (4 === this.order) {
				var t = Math.sin(e),
					o = Math.cos(e);
				this.multi(new a(1, 0, 0, 0, 0, o, -t, 0, 0, t, o, 0, 0, 0, 0, 1))
			}
			return this
		},
		rotateY: function(e) {
			if (!e) return this;
			if (4 === this.order) {
				var t = Math.sin(e),
					o = Math.cos(e);
				this.multi(new a(o, 0, t, 0, 0, 1, 0, 0, -t, 0, o, 0, 0, 0, 0, 1))
			}
			return this
		},
		rotateZ: function(e) {
			if (!e) return this;
			var t = Math.sin(e),
				o = Math.cos(e),
				i = 3 === this.order ? [o, -t, 0, t, o, 0, 0, 0, 1] : [o, -t, 0, 0, t, o, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];
			return this.multi(new a(i))
		},
		rotate: function(e, t, o) {
			return 3 === this.order ? this.rotateZ(e) : this.rotateX(e).rotateY(t).rotateZ(o)
		}
	}, Object.defineProperty(a, "E3", {
		get: function() {
			return new a(1, 0, 0, 0, 1, 0, 0, 0, 1)
		}
	}), Object.defineProperty(a, "E4", {
		get: function() {
			return new a(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)
		}
	}), a.multi = function(e, t) {
		return i(e, t)
	}, a.inverse = function(e) {
		return o(e, !0)
	}, r.prototype = {
		constructor: r,
		get order() {
			return this._order
		},
		get x() {
			return this._homogeneous_coordinates[0]
		},
		get y() {
			return this._homogeneous_coordinates[1]
		},
		get z() {
			return this._homogeneous_coordinates[2] || 0
		},
		transform: function(e) {
			return this._homogeneous_coordinates = n(e, this, order)._homogeneous_coordinates, this
		}
	}, r.transform = function(e, t) {
		return n(e, t)
	}, {
		Matrix: a,
		Coordinates: r
	}
}), 
