/**=========================================================
 * Module: modals.js
 * Provides a simple way to implement bootstrap modals from templates
 =========================================================*/

App.controller('ModalBmapController', ['$scope', '$modal', '$timeout', function ($scope, $modal, $timeout) {

  $scope.open = function (size) {

    var modalInstance = $modal.open({
      templateUrl: '/myModalContent.html',
      controller: ModalInstanceCtrl,
      size: size
    });
  };

  // Please note that $modalInstance represents a modal window (instance) dependency.
  // It is not the same as the $modal service used above.

  var ModalInstanceCtrl = function ($scope, $modalInstance, $timeout) {

    $modalInstance.opened.then(function () {
    	
      var position = new BMap.Point(116.404, 39.915);

      $scope.mapOptionsModal = {
        zoom: 14,
        center: position
      };

      // we use timeout to wait maps to be ready before add a markers
      $timeout(function(){
        // 1. Add a marker at the position it was initialized
        
        var marker = new BMap.Marker(nposition);
        
        $scope.myMapModal.addOverlay(marker);         
        
        // 2. Trigger a resize so the map is redrawed        
        
        $scope.myMapModal.checkResize();
        
        // 3. Move to the center if it is misaligned        
        $scope.myMapModal.setCenter(center);
        
      });

    });

    $scope.ok = function () {
      $modalInstance.close('closed');
    };

    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };

  };
  ModalInstanceCtrl.$inject = ["$scope", "$modalInstance", "$timeout"];

}]);
