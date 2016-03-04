angular.module('starter.controllers')
.controller('RegisterCtrl', ['$scope', '$http', '$state', '$window', '$ionicHistory',
        '$translate', '$rootScope', '$q', 'UsersService', 'SSFTranslateService', 'SSFConfigConstants',
        '$timeout', 'ionicMaterialInk', 'ionicMaterialMotion',
        function($scope, $http, $state, $window, $ionicHistory,$translate, $rootScope,
        $q, UsersService, SSFTranslateService, SSFConfigConstants, $timeout, ionicMaterialInk,
        ionicMaterialMotion) {
    
    function prepData() {
        $scope.registerData.language = $translate.use();
        var dateToSend = new Date();
        $scope.registerData.created = dateToSend.toUTCString();
        $scope.registerData.lastLog = dateToSend.toUTCString();
    }
    
    //sets current user's information **make sure this function mirrors the LoginCtrl function**
    function setLocalStorage(data) {
        $window.localStorage['rememberMe'] = $scope.checkbox.rememberMe;
        $window.localStorage['userId'] = data.userId;
        $window.localStorage['token'] = data.id;
        if($scope.checkbox.rememberMe) {
            $window.localStorage["email"] = $scope.registerData.email;
        } else {
            delete $window.localStorage["email"];
        }
        $scope.registerData = {'hasAcceptedEULA': false};
        setProgress();
    }
    
    function setProgress() {
        // return UsersService.updateUser($window.localStorage.token, $window.localStorage.userId, {})
        // .then(function(response){
            $ionicHistory.nextViewOptions({
                disableAnimate: false,
                disableBack: true
            });
            return $state.go('lobby');
        // });
    }
    
    function retryRegister(form) {
        return SSFTranslateService.showConfirm("ERROR.TITLE", "ERROR.SOME_RETRY_ERROR")
        .then(function(res) {
            if(res)
                $scope.submitRegisterForm(form);
        });
    }
    
    
    $timeout(function(){
        ionicMaterialInk.displayEffect();
        ionicMaterialMotion.ripple();
    },0);
    
    $scope.registerData = {'hasAcceptedEULA': false};
    
    $scope.checkbox = {};
    $scope.$on('$ionicView.enter', function() {
        // Code you want executed every time view is opened
        if($window.localStorage.rememberMe === undefined || $window.localStorage.rememberMe === 'true') {
            $scope.checkbox.rememberMe = true;
        } else {
            $scope.checkbox.rememberMe = false;
        }
        $rootScope.stopSpinner = true;
        UsersService.getIP()
        .then(function(response) {
            $scope.registerData.regIP = response.data;
            $scope.registerData.logIP = response.data;
        });
    });
    $scope.repeatPassword = {};
    
    $scope.submitRegisterForm = function(form) {
        if(form.password.$invalid)
            return SSFTranslateService.showAlert("ERROR.TITLE", "FORMS.POPOVERS.1");
        if(!$scope.registerData.hasAcceptedEULA)
            return SSFTranslateService.showAlert("ERROR.TITLE", "ERROR.ACCEPT_EULA");
        if($scope.repeatPassword.password !== $scope.registerData.password)
            return SSFTranslateService.showAlert("ERROR.TITLE", "ERROR.PASSWORDS_UNMATCHED");
        if(form.$invalid)
            return SSFTranslateService.showAlert("ERROR.TITLE", "ERROR.INCOMPLETE_FORM");
        prepData();
        UsersService.create($scope.registerData)
        .then(function(response) {
            if(response.status === 204)
                return SSFTranslateService.showAlert('ERROR.TITLE', 'ERROR.EMAIL_TAKEN');
            if(response.status !== 200)
                return SSFTranslateService.showAlert('ERROR.TITLE', 'ERROR.SOME_RETRY_ERROR');
            // $ionicAnalytics.setGlobalProperties({
            //     ZibID: response.data.userId
            // });
            setLocalStorage(response.data);
        }, function(err) {
            if(err.status === 204)
                return SSFTranslateService.showAlert('ERROR.TITLE', 'ERROR.EMAIL_TAKEN');
            retryRegister(form);
        });
    };
    
    $scope.showPopup = function($event, body){
        return SSFTranslateService.showPopup($scope, $event, body);
    };
    
    $scope.clickedRememberMe = function() {
        $window.localStorage['rememberMe'] = $scope.checkbox.rememberMe;
    };
    
    $scope.navEula = function() {
        if($window.cordova && cordova.InAppBrowser){
            cordova.InAppBrowser.open(SSFConfigConstants.eulaUrl, '_blank', 'location=no,hardwareback=no');
        } else {
            $window.open(SSFConfigConstants.eulaUrl);
        }
    };
}]);