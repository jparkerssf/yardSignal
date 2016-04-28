"use strict";
/*global angular*/
/*global Ionic*/

angular.module('starter.controllers', ['ionic', 'ngCordova'])

.controller('SideMenuCtrl', ['$ionicPlatform', "$scope", "$state", "$ionicSideMenuDelegate",
    "$rootScope", "$ionicHistory", "$window", "$translate", "SSFAlertsService",
    'SSFMailService', '$cordovaNetwork', "SSFConfigConstants", 'SSFCacheService',
    function($ionicPlatform, $scope, $state, $ionicSideMenuDelegate, $rootScope, $ionicHistory,
    $window, $translate, SSFAlertsService, SSFMailService, $cordovaNetwork, SSFConfigConstants,
    SSFCacheService) {
  
  
  
  $scope.minWidth = "(min-width:" + SSFConfigConstants.SSFDirectives.contentWidth +"px)";
 
  //cordova network plugin code
  $rootScope.online = false;
  $ionicPlatform.ready(function() {
      
  var deploy = new Ionic.Deploy();
  //Deploy check() checks for updates
  deploy.check().then(function(hasUpdate) {
    console.log('Ionic Deploy: Update available: ' + hasUpdate);
    if(hasUpdate) {
      $translate(['LOGIN_CTRL.UPDATE_TITLE_MESSAGE','LOGIN_CTRL.UPDATE_BODY_MESSAGE','LOGIN_CTRL.UPDATE_YES_BUTTON','LOGIN_CTRL.UPDATE_NO_BUTTON']).
      then(function(translation){
   
        SSFAlertsService.showConfirm(translation["LOGIN_CTRL.UPDATE_TITLE_MESSAGE"], translation["LOGIN_CTRL.UPDATE_BODY_MESSAGE"],
        translation["LOGIN_CTRL.UPDATE_YES_BUTTON"],translation["LOGIN_CTRL.UPDATE_NO_BUTTON"])
        .then(function(response) {
            if(response == true) {
            //Custom Ionic analytics event
            if($window.localStorage["userId"]) {
            //   $ionicAnalytics.track('User-Update', {
            //     ZibID: $window.localStorage["userId"]
            //   });
              $ionicHistory.nextViewOptions({
                disableAnimate: true,
                historyRoot: true,
                disableBack: true
              });
              $state.go("app.update");
            }
           }
        });
      });
    }
  }, function(err) {
    console.error('Ionic Deploy: Unable to check for updates', err);
  });
  
    if(ionic.Platform.isWebView()){
      console.log($cordovaNetwork.getNetwork());
      if($cordovaNetwork.getNetwork() === "none") {
        $rootScope.online = false;
      }else {
        $rootScope.online = true;
      }
      $rootScope.$apply();
     // $rootScope.online =$cordovaNetwork.isOnline();
      $rootScope.$on('$cordovaNetwork:online', function(event, networkState) {
          $rootScope.online = true;
          
          // $rootScope.$apply();
          // alert("online cordova");
          
      });
      $rootScope.$on('$cordovaNetwork:offline', function(event, networkState) {
          $rootScope.online = false;
          // $rootScope.$apply();
          // alert("offline cordova");
          
      });
    }
    else{
      $rootScope.online = true;
      window.addEventListener("online", function(e) {
        $rootScope.online = true;
        // $rootScope.$apply();
        // alert("online browser");
      }, false);    
  
      window.addEventListener("offline", function(e) {
        $rootScope.online = false;
        // $rootScope.$apply();
        // alert("offline browser");
      }, false);  
  
    }
  });
  
  
  $scope.showCheck = function(itemNumber) {
    if($window.localStorage["progress"] > itemNumber) {
      return true;
    }
    else {
      return false;
    }
  };
  
  if($window.localStorage.language !== undefined) {
    $translate.use($window.localStorage.language);
  }
  
  $scope.isAsideExposed =  $ionicSideMenuDelegate.isAsideExposed;
  $rootScope.$on('$ionicExposeAside', function(evt, isAsideExposed) {
    $scope.isAsideExposed = isAsideExposed;
  });
  
  $scope.showMenu = false;
  
  $rootScope.$on('$stateChangeStart', 
      function(event, toState, toParams, fromState, fromParams){
    
    // SSFAlertsService.showAlert('ERROR.TITLE', 'Am I online? ' + navigator.onLine);
    if($translate.use() !== $window.localStorage['language']) {
      $translate.use($window.localStorage['language']);
    }
    
    if($ionicSideMenuDelegate._instances[0].isOpen() === true) {
      $ionicSideMenuDelegate.toggleLeft();
    }
    
    /*  TODO: Remove this comment block to include hiding side menu
    if($scope.showMenu === true && $window.localStorage['userId'] === undefined) {
      $scope.showMenu = false;
    }
    else if($scope.showMenu === false && $window.localStorage['userId'] !== undefined) {
      $scope.showMenu = true;
    }
    */
  });
  
  $scope.showMenu = true;
  /*  TODO: Remove this comment block to include hiding side menu
  if($scope.showMenu === true && $window.localStorage['userId'] === undefined) {
    $scope.showMenu = false;
  }
  else if($scope.showMenu === false && $window.localStorage['userId'] !== undefined) {
    $scope.showMenu = true;
  }
  */
  
  /*  TODO: Remove this comment block to re-instate side menu functionality */
  $scope.logOut = function() {
    $ionicHistory.nextViewOptions({
        disableAnimate: false,
        disableBack: true
    });
    $state.go('app.landing');
  };
  
  $scope.dividerAA = function() {
    $ionicHistory.nextViewOptions({
        disableAnimate: false,
        disableBack: true
    });
    shouldCloseMenu('app.wizards-about');
  };
  
  $scope.dividerAB = function() {
    $ionicHistory.nextViewOptions({
        disableAnimate: false,
        disableBack: true
    });
    shouldCloseMenu('app.wizards-custom');
  };
  
  $scope.dividerAC = function() {
    $ionicHistory.nextViewOptions({
        disableAnimate: false,
        disableBack: true
    });
    shouldCloseMenu('app.forms-savings');
  };
  
  $scope.settings = function() {
    $ionicHistory.nextViewOptions({
        disableAnimate: false,
        disableBack: true
    });
    shouldCloseMenu('app.configure-settings');
  };
  
  $scope.aboutSSF = function() {
    $ionicHistory.nextViewOptions({
        disableAnimate: false,
        disableBack: true
    });
    shouldCloseMenu('app.configure-about-zebit');
  };
  
  $scope.privacyPolicy = function() {
    if(!$rootScope.online) {
      return SSFAlertsService.showAlert('ERROR.TITLE', 'ERROR.OFFLINE_POLICY');
    }
    else if($window.cordova && cordova.InAppBrowser){
      // cordova.InAppBrowser.open('https://www.zebit.com/privacy-policy', '_blank', 'location=no,hardwareback=no');
    }
    else {
      // $window.open('https://www.zebit.com/privacy-policy');
    }
  };
  
  $scope.userLiscense = function() {
    $ionicHistory.nextViewOptions({
        disableAnimate: false,
        disableBack: true
    });
    shouldCloseMenu('app.configure-eula');
  };
  
  $scope.feedback = function() {
    SSFAlertsService.showConfirm("SIDE_MENU.HEADER", "SIDE_MENU.ALERT.3")
    .then(function(response) {
      if(response) {
        SSFMailService.sendMail("Zebit Instant Budget Feedback","","apps@zebit.com");
      }
    });
  };
  
  function shouldCloseMenu(toState) {
    if($state.$current.self.name === toState) {
      $state.reload();
    }
    else {
      $state.go(toState);
    }
  }
  
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  
}]);