require.config({
    paths: {
        // angular
        "angular": "bower_components/angular/angular",

        // angular-ui
        "angular-ui-router": "bower_components/angular-ui-router/release/angular-ui-router",

        // angularAMD
        "angularAMD": "bower_components/angularAMD/angularAMD",
        "ngload": "bower_components/angularAMD/ngload"

        ,
        "angular-messages": "../angular/1.5.3/angular-messages.min",
        "angular-locale_zh-cn": "../angular/1.5.3/angular-locale_zh-cn",

        "sweetalert": "../sweetalert/sweetalert.min",
        "uiBootstrap": "../angular-ui-bootstrap/1.2.4/ui-bootstrap-tpls-1.2.4.min",
        "commonFunction": "../angularCommon/commonFunction",
        "commonValueAndUrl": "../angularCommon/commonValueAndUrl",
        "workFlowCommonModule": "../angularCommon/workFlowCommonModule"

    },
    shim: {
        // angular
        "angular": {
            exports: "angular"
        },

        // angular-ui
        "angular-ui-router": ["angular"],

        // angularAMD
        "angularAMD": ["angular"],
        "ngload": ["angularAMD"]

        ,
        "workFlowCommonModule": ["angular"],
        "angular-messages": ["angular"],
        "angular-locale_zh-cn": ["angular"],
        "angular-ui-router": ["angular"],
        "uiBootstrap": ["angular-ui-router"],
        "angularAMD": ["angular"],
        "ngload": ["angularAMD"]
    }
});

// bootstrap
define(["angular", "angularAMD", "angular-ui-router"], function(angular, angularAMD) {

    // routes
    var registerRoutes = function($stateProvider, $urlRouterProvider) {

        // default
        $urlRouterProvider.otherwise("/pagetab");

        // route
        $stateProvider
            .state("pagetab", angularAMD.route({
                url: "/pagetab",
                templateUrl: "pagetab.html",
                controllerUrl: "pagetab.js"
            }))

        // home
        .state("pagetab.home", angularAMD.route({
            url: "/home",
            templateUrl: "home.html",
            controllerUrl: "home.js"
        }))

        // about
        .state("pagetab.about", angularAMD.route({
            url: "/about",
            templateUrl: "about.html",
            controllerUrl: "about.js"
        }));
    };

    // module
    var app = angular.module("app", ["ui.router"]);

    // config
    app.config(["$stateProvider", "$urlRouterProvider", registerRoutes]);

    // bootstrap
    return angularAMD.bootstrap(app);
});
