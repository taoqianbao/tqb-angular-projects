(function(window, document, undefined){
  'use strict';

  // Init myApp
  var myApp = angular.module('myApp', ['angbus']);

  myApp.run(function($log) {

    $log.log('I\'m a line from myApp');

  });

})(window, document);
