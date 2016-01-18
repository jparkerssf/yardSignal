angular.module('starter.controllers')
.controller('LoginCtrl',["$scope", "$window", "$state", "$ionicHistory", "UserService",
    "$rootScope", "$ionicAnalytics", "SSFAlertsService", "SSFErrors",
    function($scope, $window, $state, $ionicHistory, UserService, $rootScope, $ionicAnalytics,
    SSFAlertsService, SSFErrors) {
  
  $scope.checkbox = {};
  $scope.loginData = {};
  if($window.localStorage["rememberMe"] === undefined || $window.localStorage["rememberMe"] == "true") {
      $scope.checkbox.rememberMe = true;
  }else {
      $scope.checkbox.rememberMe = false;
  }
  
  if($window.localStorage["email"] !== undefined && $scope.checkbox.rememberMe === true) {
      $scope.loginData.email = $window.localStorage["email"];
  }
  
  $scope.doLogin = function(form) {
    if(!$rootScope.online) {
      return SSFAlertsService.showAlert();
    }
    else if(form.$valid) {
      UserService.loginZIBuser($scope.loginData)
      .then(function(response) {
        if (response.status === 200) {
          $window.localStorage['rememberMe'] = $scope.checkbox.rememberMe;
          $window.localStorage['userId'] = response.data.userId;
          $window.localStorage['token'] = response.data.id;
          
          $ionicAnalytics.setGlobalProperties({
            ZibID: response.data.userId
          });
          
          //reset form
          $scope.loginData.password = "";
          if($scope.checkbox.rememberMe) {
            $window.localStorage["email"] = $scope.loginData.email;
          }
          else {
            delete $window.localStorage["email"];
            $scope.loginData.email = "";
          }
          form.$setPristine();
        }
        else {
      		//there was a problem, check for errors
      		SSFErrors.loginErrors(response);
      	}
      }, function(err) {
      	SSFErrors.loginErrors(response);
      });       
        
    }
    else {
      SSFAlertsService.showAlert();
    }
  };
  $scope.register = function() {
      SSFAlertsService.showAlert();
      $ionicHistory.nextViewOptions({
          disableAnimate: false,
          disableBack: false
      });
      $state.go();
  };
  
}]);