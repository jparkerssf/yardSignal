angular.module('starter.controllers')
    .controller('RegisterCtrl', ['$scope', '$state', '$window', '$ionicHistory',
            'UserService', 'SSFAlertsService', '$translate',
            '$ionicPopover', '$rootScope', '$ionicAnalytics', 'SSFErrors',
            function($scope, $state, $window, $ionicHistory, UserService,
            SSFAlertsService, $translate, $ionicPopover, $rootScope, $ionicAnalytics, SSFErrors) {
        
        $scope.assertive = 'assertive';
        $scope.checkbox = {};
        if($window.localStorage["rememberMe"] === undefined || $window.localStorage["rememberMe"] == "true") {
            $scope.checkbox.rememberMe = true;
        }
        else {
            $scope.checkbox.rememberMe = false;
        }
        $scope.registerData = {'hasAcceptedEULA': false};
        $scope.repeatPassword = {};
        
        
        

        $scope.submitRegisterForm = function(form) {
            if(!$rootScope.online) {
                return SSFAlertsService.showAlert('ERROR.TITLE', 'ERROR.OFFLINE_SUBMIT');
            }
            else if(form.$valid) {
                if($scope.registerData.hasAcceptedEULA === false) {
                    return SSFAlertsService.showAlert('REGISTER_CTRL.INVALID.TITLE', 'REGISTER_CTRL.INVALID.EULA');
                }
                // $scope.registerData.language = $translate.use();
                else if($scope.repeatPassword.password === $scope.registerData.password) {
                   UserService.createZIBuser($scope.registerData)
                    .then(function(response) {
                        if(response.status === 200) {
                            //login after successful register
                            if($scope.checkbox.rememberMe) {
                              $window.localStorage["email"] = $scope.registerData.email;
                            }
                            $window.localStorage["rememberMe"] = $scope.checkbox.rememberMe;
                            $window.localStorage['userId'] = response.data.id;
                            $window.localStorage['token'] = response.data.token;
                            
                            // $ionicAnalytics.setGlobalProperties({
                            //     ZibID: response.data.userId
                            // });
                            
                            UserService.loginZIBuser($scope.loginData)
                            .then(function(response) {
                            	if(response.satatus === 200) {
                            		//successful, carry on
                            	}
                            	else {
                            		//there was a problem, check for errors
                            		SSFErrors.loginErrors(response);
                            	}
                            }, function(err) {
                            	SSFErrors.loginErrors(response);
                            });
                        }
                        else if (response.status === 422) {
                            SSFAlertsService.showAlert('REGISTER_CTRL.WARNING', 'REGISTER_CTRL.EMAIL_TAKEN');
                        }
                        else {
                            //unsucessful
                            SSFAlertsService.showAlert('REGISTER_CTRL.NAV_BAR_TITLE', 'REGISTER_CTRL.ERROR_UNSUCCESSFUL');
                        }
                    }, function(response) {
                        // status 422 in this case corresonds to the email already registered to the DB
                        if(response.status === 422)
                        {
                            SSFAlertsService.showAlert('REGISTER_CTRL.WARNING', 'REGISTER_CTRL.EMAIL_TAKEN');
                        }else if(response.data === null){
                             //If the data is null, it means there is no internet connection.
                            SSFAlertsService.showAlert('ERROR.TITLE','ERROR.NO_CONNECTION');
                        }else {
                            SSFAlertsService.showAlert('ERROR.TITLE','ERROR.TRY_AGAIN');
                        }
                    });
                }
                else {
                    //passwords do not match
                    SSFAlertsService.showAlert('REGISTER_CTRL.NAV_BAR_TITLE', 'REGISTER_CTRL.ERROR_PASSWORDS_MATCH');
                }
            }
            else {
                //invalid form
                SSFAlertsService.showAlert('REGISTER_CTRL.NAV_BAR_TITLE', 'REGISTER_CTRL.ERROR_ALL_FIELDS');
            }
        };
        
        $scope.showPopup = function($event,body,translate){
            SSFAlertsService.showPopup($scope,$event,body,translate);   
        };
        
        $scope.continue = function() {
            $ionicHistory.nextViewOptions({
                disableAnimate: false,
                disableBack: true
            });
            $scope.registerData = {};
            $state.go('app.results-detailed-instant');
        };
                
        
        
    }])
;