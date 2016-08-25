function MyController($scope, $timeout) {

    $scope.clock = {
        now: new Date()
    };

    var updateClock = function () {
        $scope.clock.now = new Date();
    };

   setInterval(function () {

        updateClock();
        $scope.$apply();

        //recommended
        //$scope.$apply(updateClock);

    }, 1000);

    /*    */
    updateClock();
}