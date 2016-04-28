/* Can break the app if ionic updates this directive
Instructions:
1.  Inject 'SSFDirectives' into the app.js file.
2.  Place '<script src="js/SSFServices/SSFDirectives.js"></script>' into the index.html
            file above the app.js
3.  include the following div in the index.html
    <div resize="" ng-app="starter" style="height:100%;" ng-style="style()">
      <ion-nav-bar></ion-nav-bar>
      <ion-nav-view></ion-nav-view>
    </div>
4.  For an app without a side menu, you do not need the second directive in this file
      called 'ionSideMenuContent'.
5.  If you have not already, include the 'SSFConfig.js' file.
6.  Include the follow '.config([...})' block of code in the SSFConfig.js file.
    .config(['SSFConfigConstants', function(SSFConfigConstants) {
      SSFConfigConstants['SSFDirectives'] = {
        'contentWidth': 900
      };
    }])
7.  If you are making an app with a side menu, continue on to step 8. Otherwise, you have
            finsihed setting up the directives file.
8.  Go into your menu.html file and include this:
            ' expose-aside-when="{{minWidth}}" ng-style="style()' inside the:
            '<ion-side-menu side="left">''
            so it looks like:
            '<ion-side-menu side="left" expose-aside-when="{{minWidth}}">'
9.  Go into your menu.html's controller and include this:
            '$scope.minWidth = "(min-width:" + SSFConfigConstants.SSFDirectives.contentWidth +"px)";'
*/


angular.module('SSFDirectives', [])
.directive('resize', ["$window", "SSFConfigConstants", '$rootScope',
        function ($window, SSFConfigConstants, $rootScope) {
    
    return function (scope, element) {
        scope.$watch($window.innerWidth, function (newValue, oldValue) {        
            scope.style = function () {
                var newWidth;
                if($window.innerWidth < SSFConfigConstants.SSFDirectives.contentWidth) {
                    newWidth = {
                        'width': "",
                        'position': "",
                        "transform": "",
                        'left': ''
                    };
                }
                else if(!ionic.Platform.isWebView()){
                    newWidth = {
                        'width': SSFConfigConstants.SSFDirectives.contentWidth + "px",
                        'position': "fixed",
                        'transform': "translateX(-50%)",
                        'left':'50%'
                    };
                }
                return newWidth;
            };
        }, true);
        angular.element($window).bind('resize', function () {
            scope.$apply();
        });
    };
}])
.directive('ssfSideMenu', ['SSFConfigConstants', '$window', '$ionicPlatform',
    function(SSFConfigConstants, $window, $ionicPlatform) {
  return function(scope, element) {
    scope.ssfSideMenu = function() {
      //anything saying 'first' is related to the main content
      //anything saying 'last' is related to the side menu content
      //examples: 'firstElementChild', 'firstWidth'
      var firstWidth;
      
      if($window.innerWidth < SSFConfigConstants.SSFDirectives.contentWidth) {
        element[0].parentNode.offsetParent.lastElementChild.style.setProperty('width', '');
      }
      else if(!ionic.Platform.isWebView()){
        firstWidth = SSFConfigConstants.SSFDirectives.contentWidth - element[0].parentNode.offsetParent.lastElementChild.offsetWidth;
      }
      element[0].parentNode.offsetParent.firstElementChild.style.setProperty('width', firstWidth + 'px');
    };
  };
}])

;