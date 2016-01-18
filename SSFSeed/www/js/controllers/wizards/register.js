angular.module('starter.controllers')
    .controller('WizardRegisterCtrl', ['$scope', '$http', '$state', '$ionicHistory', '$translate', function($scope, $http, $state, $ionicHistory, $translate) {
        
        //currently does not use the "Skip" feature because the slider is currently only one page.
        var buttonSkip = undefined,
        buttonDone = undefined;
        $scope.nextButton = undefined;
        $translate(["WIZARDS.SKIP", "WIZARDS.CONTINUE"]).
        then(function(response){
            buttonSkip = response["WIZARDS.SKIP"];
            buttonDone = response["WIZARDS.CONTINUE"];
            $scope.nextButton = buttonDone;
        });
        $scope.slideHasChanged = function(a) {
            if(a === 2) {
                $scope.nextButton = buttonDone;
            }
        };
        
        $scope.continue = function() {
            $scope.currentSlide = undefined;
            $ionicHistory.nextViewOptions({
                disableAnimate: false,
                disableBack: false
            });
            $state.go('app.forms-register');
        };
        
    }])
;