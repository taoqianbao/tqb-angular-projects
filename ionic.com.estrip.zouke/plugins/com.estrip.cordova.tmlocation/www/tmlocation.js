cordova.define("com.estrip.cordova.tmlocation.tmlocation", function(require, exports, module) { var tmlocation = {
	getCurrentPosition: function(success, error, args) {
		cordova.exec(success, error, "TmLocation", "getCurrentPosition", []);
	},

	stopListener: function(success, error, args) {
		cordova.exec(success, error, "TmLocation", "stop", []);
	}
}
module.exports = tmlocation;
});
