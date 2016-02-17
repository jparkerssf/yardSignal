/*  Remove sensitive data on logout
Instructions:
1.  Inject 'SSFLogout' into the app.js file.
2.  Place '<script src="js/SSFServices/SSFLogout.js"></script>' into the index.html
            file above the app.js
3.	Remember to broadcast 'request:auth' when you want this listener to be called by using this:
            $rootScope.$broadcast('request:auth');
*/


angular.module('SSFLogout', [])
.run(["$rootScope", "$ionicHistory", "$state", "$window", function($rootScope, $ionicHistory, $state, $window) {

  $rootScope.$on('request:auth', function() {
    $ionicHistory.nextViewOptions({
      historyRoot: true,
      disableBack: true
    });
    delete $window.localStorage['token'];
    delete $window.localStorage['userID'];
    // include all logout code here
    // SSFCacheService.clearData();
    // SSFFavoritesService.removeFavorites();
    $state.go('landing');
  });  
}]);