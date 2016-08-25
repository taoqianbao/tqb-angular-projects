cordova.define("com.estrip.cordova.weixin.weixin", function(require, exports, module) { /**
 * WeiXin
 * version 0.9
 * author: Jian Chen / ajccom
 * https://github.com/ajccom/phonegap-weixin
 * tested cordova version - 2.3.0
 **/
var weixin = {
    login: function(success, error) {
        cordova.exec(success, error, "WeiXin", "login", []);
    },

    send: function(arg, success, error) {
        if (typeof arg.isSendToTimeline === 'undefined') {arg.isSendToTimeline = true}
        if (arg.type === 'image' && typeof arg.imageType === 'undefined') {arg.imageType = 'url'}
        if (arg.type === 'music' || arg.type === 'video' || arg.type === 'webpage') {
            if (typeof arg.title === 'undefined') {arg.title = ''}
            if (typeof arg.desc === 'undefined') {arg.desc = ''}
            if (typeof arg.imgUrl === 'undefined') {arg.imgUrl = ''}
            if (typeof arg.isLowBand === 'undefined') {arg.isLowBand = false}
        }
        cordova.exec(success, error, "WeiXin", "send", [arg]);
    },
	
	pay: function(arg, success, error) {
        cordova.exec(success, error, "WeiXin", "pay", [arg]);
    },
}
module.exports = weixin;

});
