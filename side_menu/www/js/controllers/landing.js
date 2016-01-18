angular.module('starter.controllers')
.controller('LandingCtrl', ['$scope', '$http', '$state', '$ionicHistory', '$rootScope',
    '$window', '$q', '$translate', '$ionicSideMenuDelegate', '$ionicPlatform',
    function($scope, $http, $state, $ionicHistory, $rootScope, $window, $q, $translate,
    $ionicSideMenuDelegate, $ionicPlatform) {
  
  $ionicPlatform.ready(function() {
    if($window.localStorage.progress > 0) {
      $ionicHistory.nextViewOptions({
        disableAnimate: true,
        historyRoot: true,
        disableBack: true
      });
      if($window.localStorage.progress == 3) {
        $state.go('app.results-high-level-instant');
      }
      else if($window.localStorage.progress == 2) {
        $state.go('app.forms-savings');
      }
      else if($window.localStorage.progress == 1) {
        $state.go('app.wizards-custom');
      }
      else {
        $state.go('app.results-high-level-instant');
      }
    }
  });
  
  $scope.continue = function() {
      $ionicHistory.nextViewOptions({
          disableAnimate: false,
          disableBack: false
      });
      $state.go('app.wizards-about');
  };
  
  $scope.toLogin = function() {
      $ionicHistory.nextViewOptions({
          disableAnimate: false,
          disableBack: false
      });
      $state.go('app.forms-login');
  };
  
  $scope.buttonClicked = function() {
    if($window.cordova && cordova.InAppBrowser){
       cordova.InAppBrowser.open('https://www.zebit.com/privacy-policy', '_blank', 'location=no,hardwareback=no');
    }else {
        $window.open('https://www.zebit.com/privacy-policy');
    }
 };
}]);