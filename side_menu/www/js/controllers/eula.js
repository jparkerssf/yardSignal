angular.module('starter.controllers')
    .controller('EULACtrl', ['$scope', '$http', '$state', '$ionicHistory', '$ionicSideMenuDelegate', '$rootScope', '$window', function($scope, $http, $state, $ionicHistory, $ionicSideMenuDelegate, $rootScope, $window) {
        $scope.sliderValue = 1;
        $scope.sliderChange = function(sliderValue) {
            $scope.sliderValue = sliderValue;
        };
    }]);