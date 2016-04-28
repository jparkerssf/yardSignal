angular.module('starter.controllers')
.controller('LandingCtrl', ['$scope', '$rootScope', '$state', '$ionicHistory', '$timeout', 'ionicMaterialInk',
        'ionicMaterialMotion',
        function($scope, $rootScope, $state, $ionicHistory, $timeout, ionicMaterialInk, ionicMaterialMotion) {
    
    $timeout(function(){
        ionicMaterialInk.displayEffect();
        ionicMaterialMotion.ripple();
    },0);
    $scope.login = function() {
        $state.go('app.login');
    };
    $scope.register = function() {
        $state.go('app.register');
    };
}]);