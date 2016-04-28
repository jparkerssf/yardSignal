angular.module('starter.controllers')
.controller('LobbyCtrl', ['$scope', '$rootScope', '$translate',
        function($scope, $rootScope, $translate) {
    $scope.logout = function() {
        $rootScope.$broadcast('request:auth');
    };
    
}]);