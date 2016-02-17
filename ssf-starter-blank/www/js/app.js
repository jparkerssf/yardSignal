// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic','ionic.service.core', 'pascalprecht.translate', 'RESTServices', 'ngCordova', 'SSFConfig', 'starter.controllers', 'SSFAlerts', 'SSFCache', 'SSFConnectivity',
    'SSFDirectives', 'SSFFavorites', 'SSFLogout', 'SSFMailComposer', 'SSFSpinner', 'SSFTranslate'])

.run(["$ionicPlatform", '$window', '$ionicHistory', '$state', '$rootScope',
    function($ionicPlatform, $window, $ionicHistory, $state, $rootScope) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(false);
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
    // Ionic.io();
    // //Dispatch interval, how often do we want our events to be sent to analytics. Default is 30 sec
    // if($window.localStorage["userId"]) {
    //   $ionicAnalytics.setGlobalProperties({
    //     ZibID: $window.localStorage["userId"]
    //   });
    // }
    if($window.localStorage["userId"] !== undefined) {
        $ionicHistory.nextViewOptions({
            historyRoot: true,
            disableBack: true
        });
        $state.go("lobby");
    }
    else {
      $rootScope.$broadcast('request:auth');
    }
  });
}])
.config(['$stateProvider', '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/');
  $stateProvider
  .state('landing', {
    url: '/',
    templateUrl: 'templates/landing.html',
    controller: 'LandingCtrl'
  })
  .state('login', {
    url: '/login',
    templateUrl: 'templates/forms/login.html',
    controller: 'LoginCtrl'
  })
  .state('register', {
    url: '/register',
    templateUrl: 'templates/forms/register.html',
    controller: 'RegisterCtrl'
  })
  .state('lobby', {
    url: '/lobby',
    templateUrl: 'templates/lobby.html',
    controller: 'LobbyCtrl'
  });
}]);