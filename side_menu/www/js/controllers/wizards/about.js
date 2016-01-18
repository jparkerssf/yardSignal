angular.module('starter.controllers')
.controller('WizardAboutCtrl', ['$scope', '$http', '$state', '$ionicSlideBoxDelegate', '$ionicHistory', '$ionicSideMenuDelegate', '$rootScope', '$translate', function($scope, $http, $state, $ionicSlideBoxDelegate, $ionicHistory, $ionicSideMenuDelegate, $rootScope, $translate) {
    
    $scope.continue = function() {
        $state.go('app.forms-instant');
    };
}]);