angular.module('SSFDirectives', [])
.constant('CONTENT_WIDTH', 900)
.directive('resize', ["$window", "CONTENT_WIDTH", '$rootScope',
        function ($window, CONTENT_WIDTH, $rootScope) {
    
    return function (scope, element) {
        scope.$watch($window.innerWidth, function (newValue, oldValue) {        
            scope.style = function () {
               
                var newWidth;        
                if($window.innerWidth < CONTENT_WIDTH) {
                    newWidth = {
                        'width': "",
                        'position': "",
                        "transform": "",
                        'left': ''
                    };
                }
                else if(!ionic.Platform.isWebView()){
                    
                    newWidth = {
                        'width': CONTENT_WIDTH + "px",
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

.directive('ionSideMenuContent', [
  '$timeout',
  '$ionicGesture',
  '$window',
  'CONTENT_WIDTH',
function($timeout, $ionicGesture, $window, CONTENT_WIDTH) {
    return {
    require: '^ionSideMenus',
    compile: function(element, $attributes) {
        if(ionic.Platform.isWebView())
          return { pre: prelink };
        else 
          return { pre: customPrelink };

        function customPrelink($scope, $element, $attr, sideMenuCtrl) {
            var content = {
              element: element[0],
              onDrag: function() {},
              endDrag: function() {},
              getTranslateX: function() {
                return $scope.sideMenuContentTranslateX || 0;
              },
              setTranslateX: ionic.animationFrameThrottle(function(amount) {
                var xTransform = content.offsetX + amount;
                $element[0].style[ionic.CSS.TRANSFORM] = 'translate3d(' + xTransform + 'px,0,0)';
                $timeout(function() {
                  $scope.sideMenuContentTranslateX = amount;
                });
              }),
              setMarginLeft: ionic.animationFrameThrottle(function(amount) {
                if (amount) {
                   
                  amount = parseInt(amount, 10);
                  $element[0].style[ionic.CSS.TRANSFORM] = 'translate3d(' + amount + 'px,0,0)';
                  $element[0].style.width = (CONTENT_WIDTH - amount) + 'px';
                  content.offsetX = amount;
                } else {
                  $element[0].style[ionic.CSS.TRANSFORM] = 'translate3d(0,0,0)';
                  $element[0].style.width = '';
                  content.offsetX = 0;
                }
              }),
              setMarginRight: ionic.animationFrameThrottle(function(amount) {
                if (amount) {
                  amount = parseInt(amount, 10);
                  $element[0].style.width = (CONTENT_WIDTH - amount) + 'px';
                  content.offsetX = amount;
                } else {
                  $element[0].style.width = '';
                  content.offsetX = 0;
                }
                // reset incase left gets grabby
                $element[0].style[ionic.CSS.TRANSFORM] = 'translate3d(0,0,0)';
              }),
              enableAnimation: function() {
                $scope.animationEnabled = true;
                $element[0].classList.add('menu-animated');
              },
              disableAnimation: function() {
                $scope.animationEnabled = false;
                $element[0].classList.remove('menu-animated');
              },
              offsetX: 0
            };
            sideMenuCtrl.setContent(content);
      }
      
      function prelink($scope, $element, $attr, sideMenuCtrl) {
            var content = {
              element: element[0],
              onDrag: function() {},
              endDrag: function() {},
              getTranslateX: function() {
                return $scope.sideMenuContentTranslateX || 0;
              },
              setTranslateX: ionic.animationFrameThrottle(function(amount) {
                var xTransform = content.offsetX + amount;
                $element[0].style[ionic.CSS.TRANSFORM] = 'translate3d(' + xTransform + 'px,0,0)';
                $timeout(function() {
                  $scope.sideMenuContentTranslateX = amount;
                });
              }),
              setMarginLeft: ionic.animationFrameThrottle(function(amount) {
                if (amount) {
                   
                  amount = parseInt(amount, 10);
                  $element[0].style[ionic.CSS.TRANSFORM] = 'translate3d(' + amount + 'px,0,0)';
                  $element[0].style.width = ($window.innerWidth - amount) + 'px';
                  content.offsetX = amount;
                } else {
                  $element[0].style[ionic.CSS.TRANSFORM] = 'translate3d(0,0,0)';
                  $element[0].style.width = '';
                  content.offsetX = 0;
                }
              }),
              setMarginRight: ionic.animationFrameThrottle(function(amount) {
                if (amount) {
                  amount = parseInt(amount, 10);
                  $element[0].style.width = ($window.innerWidth - amount) + 'px';
                  content.offsetX = amount;
                } else {
                  $element[0].style.width = '';
                  content.offsetX = 0;
                }
                // reset incase left gets grabby
                $element[0].style[ionic.CSS.TRANSFORM] = 'translate3d(0,0,0)';
              }),
              enableAnimation: function() {
                $scope.animationEnabled = true;
                $element[0].classList.add('menu-animated');
              },
              disableAnimation: function() {
                $scope.animationEnabled = false;
                $element[0].classList.remove('menu-animated');
              },
              offsetX: 0
            };
            sideMenuCtrl.setContent(content);
      }
    }
   };
}]);