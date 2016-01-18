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