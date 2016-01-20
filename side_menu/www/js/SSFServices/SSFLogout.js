/*  Youtube Imbedded Video
Instructions:
1.  Inject 'SSFLogout' into the app.js file.
2.  Place '<script src="js/SSFServices/SSFLogout.js"></script>' into the index.html
            file above the app.js
3.	Remember to call 'SSFLogoutService.logout();' on logout to clear all the data
            stored in the SSFServices.
*/


angular.module('SSFLogout', [])
.service('SSFLogoutService', ['$window',
        function ($window) {
    
    var service = this;
    service.logout = function() {
        //include all logout code here
        // SSFCacheService.clearData();
    };
}]);