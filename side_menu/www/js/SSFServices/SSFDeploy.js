/*  Deploying will automatically update the app on a user's device only if
            no new plugins were added since the last build.
Set up:
1.  


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
      $state.go("app.update");
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


//found in update.js in Zebit app
angular.module('starter.controllers')
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
    $state.go("app.landing");
  }
  
}]);