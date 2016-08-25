cordova.define("com.estrip.cordova.update.updateApp", function(require, exports, module) { /**
 * 检查并更新APP
 * version.js
 * [{'verCode':2,'verName':'1.2.1','apkPath':'http://****.com/your.apk'}]
 * verCode 版本号
 * verName 版本名称
 * apkPath APK下载路径
 * @author walker
 */

var updateApp = {
    checkAndUpdate: function(checkPath) {
        cordova.exec(null, null, "UpdateApp", "checkAndUpdate", [checkPath]);
    },
    getCurrentVer: function(success) {
        cordova.exec(success, null, "UpdateApp", "getCurrentVersion", []);
    },
    getServerVer: function(checkPath, success, error) {
        cordova.exec(success, error, "UpdateApp", "getServerVersion", [checkPath]);
    }
}

module.exports = updateApp;

});
