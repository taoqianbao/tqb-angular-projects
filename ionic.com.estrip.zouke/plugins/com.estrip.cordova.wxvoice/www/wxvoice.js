cordova.define("com.estrip.cordova.wxvoice.wxvoice", function(require, exports, module) { var wxvoice = {
    start: function(arg, success, error) {
        cordova.exec(success, error, "WxVoice", "start", [arg]);
    },
	getResult: function(arg, success, error) {
        cordova.exec(success, error, "WxVoice", "stop", [arg]);
    },
	close: function(arg, success, error) {
        cordova.exec(success, error, "WxVoice", "close", [arg]);
    },
    check: function(arg, success, error) {
        cordova.exec(success, error, "WxVoice", "check", [arg]);
    }
/*
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
    }
*/
}
module.exports = wxvoice;



});
