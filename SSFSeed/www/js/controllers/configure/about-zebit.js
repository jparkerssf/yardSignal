angular.module('starter.controllers')
    .controller('AboutZebitCtrl', ['$scope', '$http', '$state', '$ionicHistory', function($scope, $http, $state, $ionicHistory) {
        
        $scope.editButton = function() {
            $state.go('app.forms-custom');
        };

    }])
;