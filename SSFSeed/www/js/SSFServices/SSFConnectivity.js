//not included in the index.html yet, and not injected in the app.js yet

angular.module('SSFConnectivity', [])
.config(['$ionicPlatform', '$rootScope', '$cordovaNetwork',
        function($ionicPlatform, $rootScope, $cordovaNetwork) {
    $ionicPlatform.ready(function() {
        if(ionic.Platform.isWebView()){
            if($cordovaNetwork.getNetwork() === "none") {
                $rootScope.online = false;
            }
            else {
                $rootScope.online = true;
            }
            $rootScope.$apply();
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
        else {
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
}]);