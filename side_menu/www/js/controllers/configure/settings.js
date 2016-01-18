angular.module('starter.controllers')
    .controller('SettingsCtrl', ['$scope', '$http', '$state', '$ionicHistory', '$translate', '$window', 'UserService', 'SSFAlertsService', '$rootScope',
        function($scope, $http, $state, $ionicHistory, $translate, $window, UserService, SSFAlertsService, $rootScope) {
            
            $scope.test = {'test': 'en'};
            if($window.localStorage.language !== undefined) {
                $scope.test.test = $window.localStorage.language;
            }
            $scope.changeLanguage = function (a) {
                $translate.use(a);
                $window.localStorage['language'] = a;
                if(!$rootScope.online && !ionic.Platform.isWebView()) {
                    SSFAlertsService.showAlert('ERROR.WARNING', 'The changes you make may not take effect while you are offline.<br><br>Los cambios que realice pueden no surten efecto mientras usted está fuera de línea.<br><br>您所做的更改可能不會生效，當您處於脫機狀態。');
                }
                else if($window.localStorage.userId !== undefined) {
                    UserService.updateZIBuser($window.localStorage.token, {'id': $window.localStorage.userId, 'language': a});
                }
            };
            $scope.continue = function() {
                // $ionicHistory.nextViewOptions({
                //     disableAnimate: false,
                //     disableBack: false
                // });
                $state.go('app.configure-credits');
            };
        }
    ])
;