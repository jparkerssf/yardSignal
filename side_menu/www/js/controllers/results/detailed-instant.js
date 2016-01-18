angular.module('starter.controllers')
    .controller('ResultsDetailedInstantCtrl', ['$scope', '$rootScope', '$http', '$state', '$ionicHistory', 'CacheInstantService', 'SSFAlertsService','detailLevel', '$window', 'CacheErrorService', '$ionicViewSwitcher',
    function($scope, $rootScope, $http, $state, $ionicHistory, CacheInstantService, SSFAlertsService, detailLevel, $window, CacheErrorService, $ionicViewSwitcher) {
        
        
        // UserService.getLatestUserInputs
        
        
        if(detailLevel) {
            CacheErrorService.anyResultsErrors(detailLevel);
        }
        $scope.detailLevel = detailLevel;
        
        $scope.$on('$ionicView.enter', function(e) {
            $scope.$emit('setMenu', true);
        });
        $scope.showButton = true;
        $scope.editButton = function() {
            if(!$rootScope.online) {
                return SSFAlertsService.showAlert('ERROR.TITLE', 'ERROR.OFFLINE_EDIT');
            }
            $ionicHistory.nextViewOptions({
                disableAnimate: false,
                disableBack: false
            });
            $ionicViewSwitcher.nextDirection("back");
            $state.go('app.forms-instant');
        };
        $scope.continue = function() {
            $scope.showButton = false;
            $ionicHistory.nextViewOptions({
                disableAnimate: false,
                disableBack: true
            });
            $state.go('app.wizards-register');
        };
        
        $scope.showPopup = function($event,body,translate){
            SSFAlertsService.showPopup($scope,$event,body,translate);   
        };
        
    }])
;