angular.module('starter.controllers')
.controller('LoginCtrl',["$scope", "$window", "$state","$ionicHistory", "$rootScope",
    'UsersService', 'SSFTranslateService', '$timeout', 'ionicMaterialInk', 'ionicMaterialMotion',
    function($scope, $window, $state, $ionicHistory, $rootScope,UsersService,
    SSFTranslateService, $timeout, ionicMaterialInk, ionicMaterialMotion) {
  
  //sets current user's information **make sure this function mirrors the RegisterCtrl function**
  function setLocalStorage(data) {
    $window.localStorage['rememberMe'] = $scope.checkbox.rememberMe;
    $window.localStorage['userId'] = data.userId;
    $window.localStorage['token'] = data.id;
    if($scope.checkbox.rememberMe) {
      $window.localStorage["email"] = $scope.loginData.email;
    } else {
      delete $window.localStorage["email"];
      $scope.loginData.email = "";
    }
    //sets the users progress and sends the user to the correct page
    if(data.progress !== undefined) {
      $window.localStorage['progress'] = data.progress;
      handleProgress(data.progress);
    } else {
      $state.go('lobby');
    }
  }
  
  function handleProgress(progress) {
    if(progress === 0) {
      
    } else if(progress === 1) {
      
    } else if(progress === 2) {
      
    } else {
      $state.go('lobby');
    }
  }
  
  function retryLogin(form) {
    return SSFTranslateService.showConfirm("ERROR.TITLE", "ERROR.SOME_RETRY_ERROR")
    .then(function(res) {
      if(res)
        $scope.doLogin(form);
    });
  }
  
  $timeout(function(){
    ionicMaterialInk.displayEffect();
    ionicMaterialMotion.ripple();
  },0);
  
  $scope.loginData = {};
  
  $scope.checkbox = {};
  
  if($window.localStorage["email"] !== undefined && $scope.checkbox.rememberMe === true)
    $scope.loginData.email = $window.localStorage["email"];
    
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
      $scope.loginData.logIP = response.data;
    });
  });
  
  $scope.doLogin = function(form) {
    if(!form.$valid)
      return SSFTranslateService.showAlert("ERROR.TITLE", "ERROR.INCOMPLETE_FORM");
    var dateToSend = new Date();
    $scope.loginData.lastLog = dateToSend.toUTCString();
    UsersService.login($scope.loginData)
    .then(function(response) {
      //If the data is null, it means there is no internet connection.
      if(response.data === null)
        return SSFTranslateService.showAlert("ERROR.TITLE","ERROR.INTERNET_CONNECTION");
      if(response.status !== 200)
        return retryLogin(form);
      
      // $ionicAnalytics.setGlobalProperties({
      //   ZibID: response.data.userId
      // });
      
      //reset form
      $scope.loginData.password = "";
      form.$setPristine();
      
      setLocalStorage(response.data);
    },
    function(err) {
      retryLogin(form);
    });
  };
  
  $scope.register = function() {
    $state.go('register');
  };
  
  $scope.clickedRememberMe = function() {
    $window.localStorage.rememberMe = $scope.checkbox.rememberMe;
  };
  
}]);