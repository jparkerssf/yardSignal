angular.module('starter.controllers')
    .controller('ResultsCustomCtrl', ['custom', 'customInputs', '$scope', '$http', '$state', '$ionicHistory', 'CacheCustomService', 'SSFAlertsService', '$window', 'CacheErrorService', '$ionicViewSwitcher', '$rootScope',
        function(custom, customInputs, $scope, $http, $state, $ionicHistory, CacheCustomService, SSFAlertsService, $window, CacheErrorService, $ionicViewSwitcher, $rootScope) {
        
        
        if(custom !== undefined && customInputs === undefined) {
            CacheErrorService.anyResultsErrors(custom);
        }
        else if( customInputs !== undefined && customInputs.status !== undefined) {
            CacheErrorService.anyFetchInputErrors(customInputs);
        }
        if(customInputs !== undefined) {
            $scope.detailLevel = customInputs.data;
        }
        if(custom !== undefined) {
             $scope.custom = custom.data;
        }
       
        $scope.editButton = function() {
            if(!$rootScope.online) {
                return SSFAlertsService.showAlert('ERROR.TITLE', 'ERROR.OFFLINE_EDIT');
            }
            $ionicHistory.nextViewOptions({
                disableAnimate: false,
                disableBack: false
            });
            $ionicViewSwitcher.nextDirection("back");
            $state.go('app.forms-custom');
        };
        
        $scope.showPopup = function($event,body,translate){
            SSFAlertsService.showPopup($scope,$event,body,translate);   
        };
    }])
;