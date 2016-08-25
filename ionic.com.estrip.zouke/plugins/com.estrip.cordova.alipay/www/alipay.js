cordova.define("com.estrip.cordova.alipay.alipay", function(require, exports, module) { var alipay = {
    start: function(arg, success, error) {
        cordova.exec(success, error, "Alipay", "start", [arg]);
    }
}
module.exports = alipay;



});
