cordova.define("com.estrip.cordova.chat.chat", function(require, exports, module) { /**
 * chat
 * version 0.9
 * author: Jian Chen / ajccom
 * tested cordova version - 2.3.0
 **/
var chat = {
	login: function(arg, success, error) {
        cordova.exec(success, error, "ChatMsg", "login", [arg]);
    },
    send: function(arg, success, error) {
        cordova.exec(success, error, "ChatMsg", "send", [arg]);
    },
	getUnReadMessage: function(arg, success, error) {
        cordova.exec(success, error, "ChatMsg", "getUnReadMessage", [arg]);
    }
}
module.exports = chat;

});
