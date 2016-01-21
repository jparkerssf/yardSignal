/*  SSFAlerts Services
Instructions:
1.  Comment out the .service('SSFAlertsService', [...]) for the one you don't need.
            The top .service uses translate, the bottom does not.
2.  Inject 'SSFAlerts' into the app.js file.
3.  Place '<script src="js/SSFServices/SSFAlerts.js"></script>' into the index.html
            file above the app.js
4.  If you do not have the SSFConfig.js file, include it then you are finished including SSFAlerts.
*/
    
    
angular.module('SSFAlerts', [])

.config(['SSFConfigConstants', function(SSFConfigConstants) {
    SSFConfigConstants['SSFAlertsService'] = {
    	//SSFTranslate should create a 'textTranslated' object whenever it translates
        'languageFileReference': [
            'SSF_CONFIG_CONSTANTS.SSF_ALERTS_SERVICE.OKAY',
            'SSF_CONFIG_CONSTANTS.SSF_ALERTS_SERVICE.CANCEL'
        ],
        'notTranslated': [
            'OK',
            'Cancel'
        ]
    };
}])

.service('SSFAlertsService', ['$ionicPopup', '$q', '$ionicPopover', 'SSFConfigConstants',
        function ($ionicPopup, $q, $ionicPopover, SSFConfigConstants) {
    var service = this;
    
    //switches between the text to be used and translated text.
    var serviceText = undefined;
    if(SSFConfigConstants.shouldTranslate) {
        serviceText = SSFConfigConstants.SSFAlertsService.textTranslated;
    }
    else {
        serviceText = SSFConfigConstants.SSFAlertsService.notTranslated;
    }
    service.updateServiceText = function() {
        if(SSFConfigConstants.shouldTranslate) {
            serviceText = SSFConfigConstants.SSFAlertsService.textTranslated;
        }
        else {
            serviceText = SSFConfigConstants.SSFAlertsService.notTranslated;
        }
    };
    
    service.showAlert = function(title, body, okText) {
        if(navigator.notification === undefined) {
            var alertPopup = $ionicPopup.alert({
                title: title,
                template: body,
                okText: (okText == undefined || okText == null) ? serviceText[0] : okText
            });
            return alertPopup;
        }
        else {
            var defer = $q.defer();
            var confirmCallback = function(buttonIndex) {
                defer.resolve(true);
            };
            navigator.notification.alert(body, confirmCallback, title, okText);
        }
    };
    
    service.showConfirm = function(title, body, okText, cancelText) {
        if(navigator.notification == undefined) {
            var confirmPopup = $ionicPopup.confirm({
                title: title,
                template: body,
                okText: (okText == undefined || okText == null) ? serviceText[0] : okText, 
                cancelText: (cancelText == undefined || cancelText == null) ? serviceText[1] : cancelText
            });
            return confirmPopup;
        }
        else {
            var defer = $q.defer();
            var confirmCallback = function(buttonIndex) {
                if(buttonIndex===1) {
                    defer.resolve(true);
                }
                else {
                    defer.resolve(false);
                }
            };
            var buttons = serviceText;
            if(okText != undefined)
                buttons[0] = okText;
            if(cancelText != undefined)
                buttons[1] = cancelText;
            navigator.notification.confirm(body, confirmCallback, title, buttons);
            return defer.promise;
        }
    };
    
    service.showPopup = function($scope,$event,body){
        return callPopover(body);
        // body = "{{'" + body + "' | translate }}";
        // .fromTemplate() method
        function callPopover(body) {
            var template = '<ion-popover-view style="height:auto" > <ion-content class="center text-center padding-horizontal" scroll="false" style="position:relative;">' + body + '</ion-content></ion-popover-view>';
            $scope.popover = $ionicPopover.fromTemplate(template, {
                scope: $scope
            });
            $scope.popover.show($event);
        }
    };
}]);


// .service('SSFAlertsService', ['$ionicPopup', '$q','$ionicPopover', '$translate', 'SSFConfigConstants',
//         function ($ionicPopup, $q, $ionicPopover, $translate, SSFConfigConstants) {
//     var service = this;
    
    
//     service.showAlert = function(title, body, okText) {
//         $translate([title, body, 'GENERAL.OK', okText])
//         .then(function(response){
//             title = response[title];
//             body = response[body];
//             var okayText = response['GENERAL.OK'];
//             okText = response[okText];
//             if(navigator.notification === undefined) {
//                 var alertPopup = $ionicPopup.alert({
//                     title: title,
//                     template: body,
//                     okText: (okText == undefined || okText == null) ? okayText : okText
//                 });
//                 return alertPopup;
//             }
//             else {
//                 var defer = $q.defer();
//                 var confirmCallback = function(buttonIndex) {
//                     defer.resolve(true);
//                 };
//                 if(okText == undefined || okText == null) 
//                     okText = okayText;
//                 navigator.notification.alert(body, confirmCallback, title, okText);
//             }
//         });
//     };
    
//     service.showConfirm = function(title, body, okText, cancelText) {
//         var defer = $q.defer();
//         defer.resolve(
//             $translate([title, body, 'GENERAL.OK', okText, 'GENERAL.CANCEL', cancelText])
//             .then(function(response){
//                 title = response[title];
//                 body = response[body];
//                 var okayText = response['GENERAL.OK'];
//                 okText = response[okText];
//                 var defaultCancelText = response['GENERAL.CANCEL'];
//                 var cancelText = response[cancelText];
//                 if(navigator.notification == undefined) {
//                     var confirmPopup = $ionicPopup.confirm({
//                         title: title,
//                         template: body,
//                         okText: (okText == undefined || okText == null) ? okayText : okText, 
//                         cancelText: (cancelText == undefined || cancelText == null) ? defaultCancelText : cancelText
//                     });
//                     return confirmPopup;
//                 }
//                 else {
//                     var defer = $q.defer();
//                     var confirmCallback = function(buttonIndex) {
//                         if(buttonIndex===1) {
//                             defer.resolve(true);
//                         }
//                         else {
//                             defer.resolve(false);
//                         }
//                     };
//                     var buttons = [okText, defaultCancelText];
//                     if(okText === undefined || okText === null) {
//                         buttons[0] = okayText;
//                     }
//                     if(cancelText === undefined || cancelText === null) {
//                         buttons[1] = defaultCancelText;
//                     }
//                     navigator.notification.confirm(body, confirmCallback, title, buttons);
//                     return defer.promise;
//                 }
//             })
//         );
//         return defer.promise;
//     };
    
//     service.showPopup = function($scope,$event,body,translate){
//         //if 'translate' is not defined, it will default to false
//         if(translate){
//             var defer = $q.defer();
//             defer.resolve(
//                 $translate([body])
//                 .then(function(response){
//                     body = response[body];
//                     return callPopover(body);
//                 })
//             );
//             return defer.promise;
//         }
//         else {
//             callPopover(body);
//         }
//         // .fromTemplate() method
//         function callPopover(body) {
//             var template = '<ion-popover-view style="height:auto" > <ion-content class="center text-center padding-horizontal" scroll="false" style="position:relative;">' + body + '</ion-content></ion-popover-view>';
//             $scope.popover = $ionicPopover.fromTemplate(template, {
//                 scope: $scope
//             });
//             $scope.popover.show($event);
//         }
//     };
// }]);