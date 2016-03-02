/*  Deploying will automatically update the app on a user's device only if
            no new plugins were added since the last build, and the user accepts a prompt.
Instructions:
1.  Inject 'SSFDeploy' into the app.js file.
2.  Place '<script src="js/SSFServices/SSFDeploy.js"></script>' into the index.html
            file above the app.js


Deploying from the Terminal:
1.  Be sure to be in the correct project directory.
2.  ionic upload --note "comments about the purpose of this deploy" --deploy=production

From the ionic.io page:
1.  Ask Andres
*/



//found in menu.js of Zebit app as of 1/18/16
/*
  $ionicPlatform.ready(function() {
    
    if($window.localStorage["userId"]) {
      $ionicAnalytics.track('Load-Returning', {
        ZibID: $window.localStorage["userId"]
      });
    }else {
      $ionicAnalytics.track('Load-Returning', {
        ZibID: "anonymous"
      });
    }
      
    var deploy = new Ionic.Deploy();
    deploy.setChannel("dev");
    //Deploy check() checks for updates
    deploy.check().then(function(hasUpdate) {
      console.log('Ionic Deploy: Update available: ' + hasUpdate);
      if(hasUpdate) {
        deploy.getMetadata().then(function(metadata) {
        // metadata will be a JSON object
          if(metadata["priority"] == "required") {
            goToUpdate();
          }else {
            $translate(['LOGIN_CTRL.UPDATE_TITLE_MESSAGE','LOGIN_CTRL.UPDATE_BODY_MESSAGE','LOGIN_CTRL.UPDATE_YES_BUTTON','LOGIN_CTRL.UPDATE_NO_BUTTON']).
            then(function(translation){
              SSFAlertsService.showConfirm(translation["LOGIN_CTRL.UPDATE_TITLE_MESSAGE"], translation["LOGIN_CTRL.UPDATE_BODY_MESSAGE"],
              translation["LOGIN_CTRL.UPDATE_YES_BUTTON"],translation["LOGIN_CTRL.UPDATE_NO_BUTTON"])
              .then(function(response) {
                  if(response == true) {
                    goToUpdate();
                 }
              });
            });
          }
        }, function() {
          
        }, function() {
          
        });
       
      }
    }, function(err) {
      console.error('Ionic Deploy: Unable to check for updates', err);
    });
    
    function goToUpdate() {
      //Custom Ionic analytics event
      if($window.localStorage["userId"]) {
        $ionicAnalytics.track('User-Update', {
          ZibID: $window.localStorage["userId"]
        });
      }
      $ionicHistory.nextViewOptions({
        disableAnimate: true,
        historyRoot: true,
        disableBack: true
      });
      $state.go("update");
    }
*/

//found in app.js in Zebit app

  //   .state('app.update', {
  //     url: '/update',
  //     views: {
  //       'menuContent': {
  //         templateUrl: 'templates/update.html',
  //         controller: 'UpdateCtrl'
  //       }
  //     }
  //   })

angular.module('SSFDeploy', [])

//found in controllers/menu.js as on 2/18/16
.run(['$window', '$ionicPlatform', '$translate', 'SSFAlertsService',
    '$ionicHistory', '$state', '$rootScope',
    function($window, $ionicPlatform, $translate, SSFAlertsService,
    $ionicHistory, $state, $rootScope) {
  
  $ionicPlatform.ready(function() {
    
    // if($window.localStorage["userId"]) {
    //   $ionicAnalytics.track('Load-Returning', {
    //     ZibID: $window.localStorage["userId"]
    //   });
    // } else {
    //   $ionicAnalytics.track('Load-Returning', {
    //     ZibID: "anonymous"
    //   });
    // }
      
    var deploy = new Ionic.Deploy();
    deploy.setChannel("production");
    //Deploy check() checks for updates
    deploy.check().then(function(hasUpdate) {
      console.log('Ionic Deploy: Update available: ' + hasUpdate);
      if(hasUpdate) {
        deploy.getMetadata().then(function(metadata) {
        // metadata will be a JSON object
          if(metadata["priority"] == "required") {
            goToUpdate();
          }else {
            $translate(['LOGIN_CTRL.UPDATE_TITLE_MESSAGE','LOGIN_CTRL.UPDATE_BODY_MESSAGE','LOGIN_CTRL.UPDATE_YES_BUTTON','LOGIN_CTRL.UPDATE_NO_BUTTON']).
            then(function(translation){
              SSFAlertsService.showConfirm(translation["LOGIN_CTRL.UPDATE_TITLE_MESSAGE"], translation["LOGIN_CTRL.UPDATE_BODY_MESSAGE"],
              translation["LOGIN_CTRL.UPDATE_YES_BUTTON"],translation["LOGIN_CTRL.UPDATE_NO_BUTTON"])
              .then(function(response) {
                  if(response == true) {
                    goToUpdate();
                }
              });
            });
          }
        }, function() {
          
        }, function() {
          
        });
       
      }
    }, function(err) {
      console.error('Ionic Deploy: Unable to check for updates', err);
    });
    
    function goToUpdate() {
      //Custom Ionic analytics event
      // if($window.localStorage["userId"]) {
      //   $ionicAnalytics.track('User-Update', {
      //     ZibID: $window.localStorage["userId"]
      //   });
      // }
      $ionicHistory.nextViewOptions({
        disableAnimate: true,
        historyRoot: true,
        disableBack: true
      });
      $state.go("update");
    }
    
    // if(ionic.Platform.isWebView()){
      
    //   if($cordovaNetwork.getNetwork() === "none") {
    //     $rootScope.online = false;
    //   }else {
    //     $rootScope.online = true;
    //   }
    //   $rootScope.$apply();
    // // $rootScope.online =$cordovaNetwork.isOnline();
    //   $rootScope.$on('$cordovaNetwork:online', function(event, networkState) {
    //       $rootScope.online = true;
          
    //       // $rootScope.$apply();
    //       // alert("online cordova");
          
    //   });
    //   $rootScope.$on('$cordovaNetwork:offline', function(event, networkState) {
    //       $rootScope.online = false;
    //       // $rootScope.$apply();
    //       // alert("offline cordova");
          
    //   });
    // }
    // else{
    //   $rootScope.online = true;
    //   window.addEventListener("online", function(e) {
    //     $rootScope.online = true;
    //     // $rootScope.$apply();
    //     // alert("online browser");
    //   }, false);    
  
    //   window.addEventListener("offline", function(e) {
    //     $rootScope.online = false;
    //     // $rootScope.$apply();
    //     // alert("offline browser");
    //   }, false);  
  
    // }
  });
}])


//found in controllers/update.js in Zebit app
.controller('UpdateCtrl', ["$scope", "$ionicLoading", "$state", "$ionicHistory",
function($scope, $ionicLoading, $state, $ionicHistory) {
  
  $ionicLoading.show({
      template: '<ion-spinner></ion-spinner>',
      noBackdrop:true
  });
  $scope.progress = {
    value : "0%"
  };
  var deploy = new Ionic.Deploy();
  deploy.setChannel("dev");
  deploy.update().then(function(res) {
    //App will automatically reload when updated successfully
     console.log('Ionic Deploy: Update Success! ', res);
  }, function(err) {
    console.log('Ionic Deploy: Update error! ', err);
    goNext();
  }, function(prog) {
     console.log('Ionic Deploy: Progress... ', prog);
     var progString = prog.toString();
     var progArray = progString.split(".");
     $scope.$apply(function() {
       $scope.progress.value = progArray[0] + "%";
     });
  });

  function goNext() {
    $ionicLoading.hide();
    $ionicHistory.nextViewOptions({
      disableAnimate: true,
      historyRoot: true,
      disableBack: true
    });
    $state.go("landing");
  }
  
}])
.config(["$stateProvider", "$urlRouterProvider",
    function($stateProvider, $urlRouterProvider) {

  $stateProvider
  .state('update', {
    url: '/update',
    views: {
      'menuContent': {
        template: 
          '<ion-view hide-nav-bar="true">' +
            '<ion-content class="padding calm-bg" style="text-align:center;">' +
                '<h3 class="white" style="margin-top: 30px;">{{' + "'UPDATE_CTRL.SSF_DEPLOY.UPDATING'" + ' | translate}}</h3>' +
                '<h3 class="white">{{progress.value}}</h3>' +
                // <!-- Customize background -->
            '</ion-content>' +
          '</ion-view>',
        controller: 'UpdateCtrl'
      }
    }
  });
}])
;