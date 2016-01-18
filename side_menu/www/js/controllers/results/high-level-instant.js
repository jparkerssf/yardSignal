angular.module('starter.controllers')
    .controller('ResultsHighLevelInstantCtrl', ['$scope', '$rootScope', '$http', '$state', '$ionicHistory', 'CacheInstantService', 'SSFAlertsService','highLevel', '$window', '$translate', 'CacheErrorService', '$ionicViewSwitcher', 'UserInputsService', 'CacheCustomService',
    function($scope, $rootScope, $http, $state, $ionicHistory, CacheInstantService, SSFAlertsService, highLevel, $window, $translate, CacheErrorService, $ionicViewSwitcher, UserInputsService, CacheCustomService) {
      
        if(highLevel !== undefined) {
            CacheErrorService.anyResultsErrors(highLevel, false);
        }
        $scope.highLevel = highLevel;
        
        $scope.continueButtonDisplay = undefined;
        $translate(['FORMS.CONTINUE','RESULTS.INSTANT.DETAILED_VIEW'])
        .then(function(response) {
            if($window.localStorage['userId'] !== undefined) {
                $scope.continueButtonDisplay = response['RESULTS.INSTANT.DETAILED_VIEW'];
            }
            else {
                $scope.continueButtonDisplay = response['FORMS.CONTINUE'];
            }
        });
        
        $scope.editButton = function() {
            if(!$rootScope.online) {
                return SSFAlertsService.showAlert('ERROR.TITLE', 'ERROR.OFFLINE_EDIT');
            }
            else {
                $state.go('app.forms-instant');
            }
        };
        
        $scope.continue = function() {
            if($window.localStorage["userId"] !== undefined) {
                $state.go('app.results-detailed-instant');
            }
            else {
                $ionicViewSwitcher.nextDirection("forward");
                $state.go('app.wizards-register');
            }
        };
        
        $scope.showPopup = function($event,body,translate){
            SSFAlertsService.showPopup($scope,$event,body,translate);   
        };
        
    }])
;