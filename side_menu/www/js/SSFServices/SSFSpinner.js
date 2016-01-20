/* Spinner while waiting for a call to return from a backend
Instructions:
1.  Inject 'SSFSpinner' into the app.js file.
2.  Place '<script src="js/SSFServices/SSFSpinner.js"></script>' into the index.html
            file above the app.js.
*/


angular.module('SSFSpinner', [])
.config(['$httpProvider', function($httpProvider) {
  $httpProvider.interceptors.push(function($rootScope) {
    return {
      request: function(config) {
        $rootScope.$broadcast('loading:show');
        return config;
      },
      response: function(response) {
        $rootScope.$broadcast('loading:hide');
        return response;
      },
      requestError: function(reason) {
        $rootScope.$broadcast('loading:hide');
        return reason;
      },
      responseError: function(response) {
        $rootScope.$broadcast('loading:hide');
        if(response.status === 401 && (
            response.data.error.code === "INVALID_TOKEN" ||
            response.data.error.code === "AUTHORIZATION_REQUIRED")) {
          $rootScope.$broadcast('request:auth');
        }
        return response;
      }
    };
  });
}])
.run(["$rootScope", "$ionicLoading", function($rootScope, $ionicLoading) {
  $rootScope.$on('loading:show', function() {
    $ionicLoading.show({
      template: '<ion-spinner></ion-spinner>'
    });
  });
  $rootScope.$on('loading:hide', function() {
    $ionicLoading.hide();
  });
}]);