angular.module('starter.controllers', [])
.controller('LandingCtrl', ['$scope', '$rootScope', '$translate', '$timeout', 'ionicMaterialInk', 'ionicMaterialMotion',
        function($scope, $rootScope, $translate, $timeout, ionicMaterialInk, ionicMaterialMotion) {
    $timeout(function(){
        ionicMaterialInk.displayEffect();
        ionicMaterialMotion.ripple();
    },0);
    
}]);