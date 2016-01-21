/*  Internet Connection online/offline
Instructions:
1.  Inject 'SSFConnectivity' into the app.js file.
2.  Place '<script src="js/SSFServices/SSFConnectivity.js"></script>' into the index.html
            file above the app.js
3.  If you already have ngCordova installed and injected in your
            app.js file, then skip to step #8
4.  Within your bash terminal, be sure you are in the root of the project directory
5.  Terminal: bower install ngCordova
6.  inject 'ngCordova' in your app.js file
7.  Terminal: ionic add ionic-platform-web-client
8.  Terminal: cordova plugin add cordova-plugin-network-information
9.  Include: '<script src="lib/ngCordova/dist/ng-cordova.min.js"></script>'
            in your index.html file just below:
            '<script src="lib/ionic/js/ionic.bundle.js"></script>'
            
If you are using a feature that changes color based on being online or offline, than
        be sure to include the following call in the controller that you want the
        feature in. It creates a scope variable that has a boolean value:
        SSFConnectivityService.setupConnectivityListeners($scope);
*/


angular.module('SSFConnectivity', [])
.service('SSFConnectivityService', ['$ionicPlatform', '$cordovaNetwork',
        function($ionicPlatform, $cordovaNetwork) {
    
    var service = this;
    
    service.setupConnectivityListeners = function($scope) {
        $scope.online = true;
        if(ionic.Platform.isWebView()) {
            if($cordovaNetwork.getNetwork() === "none") {
                $scope.online = false;
            }
            else {
                $scope.online = true;
            }
            $scope.$apply();
            $scope.$on('$cordovaNetwork:online', function(event, networkState) {
                $scope.online = true;
                // $scope.$apply();
                // alert("online cordova");
            });
            $scope.$on('$cordovaNetwork:offline', function(event, networkState) {
                $scope.online = false;
                // $scope.$apply();
                // alert("offline cordova");
            });
        }
        else {
            $scope.online = true;
            window.addEventListener("online", function(e) {
                $scope.online = true;
                // $scope.$apply();
                // alert("online browser");
            }, false);
            
            window.addEventListener("offline", function(e) {
                $scope.online = false;
                // $scope.$apply();
                // alert("offline browser");
            }, false);
        }
    };
    
    service.isOnline = function() {
        if(ionic.Platform.isWebView()) {
            if($cordovaNetwork.getNetwork() === "none") {
                return false;
            }
            else {
               return true;
            }
        }
        else {
            return navigator.onLine;
        }
    };
    
}]);

/*  Original code from Zebit Instant Budget app
//found in the menu.js
$ionicPlatform.ready(function() {
    if(ionic.Platform.isWebView()) {
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
            alert("online browser");
        }, false);
        
        window.addEventListener("offline", function(e) {
            $rootScope.online = false;
            // $rootScope.$apply();
            alert("offline browser");
        }, false);
    }
});
*/