/*  Youtube Imbedded Video
Instructions:
1.  Inject 'SSFFavorites' into the app.js file.
2.  Place '<script src="js/SSFServices/SSFFavorites.js"></script>' into the index.html file.
3.  Place the following code into the controller you want to have this feature in:
        $scope.favoriteToggle = SSFFavoritesService.favoriteToggle;
        $scope.isFavorited = SSFFavoritesService.isFavorited;
4.  Place the following code into the html linked to the controller with the feature:
        <div ng-click="favoriteToggle(itemId)">
            <icon class="icon energized" style="font-size: 32px;" ng-class="isFavorited(itemId) ? 'ion-ios-star' : 'ion-ios-star-outline'">
        </div>
6.  If you want to clear favorites on logout or manually clear them, use this:
        'SSFFavoritesService.removeFavorites();'
    
Examples:
1.  //will create the functions necessary to star and unstar an item in the controller
    SSFFavorites.favoritesFeature($scope);
2.  //is the actual star in the html that shows an item being favorited or not
    <i class="icon energized" ng-class="isFavorited(video.id.videoId) ? 'ion-ios-star' : 'ion-ios-star-outline'" ng-click="favoriteToggle(video.id.videoId)" ></i>
*/

angular.module('SSFFavorites', [])
.service('SSFFavoritesService', ['$window',
        function ($window) {
    
    var service = this;
    var haveFavorites = undefined;
    var localFavorites = undefined;
    if($window.localStorage['localFavorites'] !== undefined) {
        localFavorites = JSON.parse($window.localStorage['localFavorites']);
    }
    else {
        localFavorites = {};
    }
    
    Object.size = function(obj) {
        var size = 0, key;
        for (key in obj) {
            if (obj.hasOwnProperty(key)) size++;
        }
        return size;
    };
    
    function updateHaveFavorites() {
        if(localFavorites.size > 0) {
            haveFavorites = true;
        }
        else {
            haveFavorites = false;
        }
    }
    updateHaveFavorites();
    
    service.haveFavorites = function() {
        return haveFavorites;
    };
    
    service.isFavorited = function(itemId) {
        if(localFavorites[itemId]) {
            return true;
        }
        else {
            return false;
        }
    };
    
    service.favoriteToggle = function(itemId) {
        if(localFavorites[itemId]) {
            delete localFavorites[itemId];
        }
        else {
            localFavorites[itemId] = true;
        }
        updateHaveFavorites();
        $window.localStorage['localFavorites'] = JSON.stringify(localFavorites);
    };
    
    service.commaConcatenatedFavorites = function($scope) {
        var favoritesString = '';
        if(haveFavorites) {
            //have favorites
            for(var i in $scope.SSFFavorites.localFavorites) {
                favoritesString += i + ',';
            }
            return favoritesString;
        }
        else {
            return 'Check for favorites to exist before you call this function using: SSFFavoritesService.haveFavorites();';
        }
    };
    
    service.removeFavorites = function() {
        localFavorites = {};
        delete $window.localStorage['localFavorites'];
    };
}]);