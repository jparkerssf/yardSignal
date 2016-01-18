/*  SSFAlerts Services
Comment out the .service('SSFAlertsService', [...]) for the one you don't need
The top chunch of code will translate any text passed in.
The bottom chunk will display the text directly passed into it.
*/

angular.module('SSFAlerts', [])
.service('SSFAlertsService', ['$ionicPopup', '$q','$ionicPopover', '$translate',
        function ($ionicPopup, $q, $ionicPopover, $translate) {
    var service = this;
    
    service.showAlert = function(title, body, okText) {
        $translate([title, body, 'GENERAL.OK', okText])
        .then(function(response){
            title = response[title];
            body = response[body];
            var okayText = response['GENERAL.OK'];
            okText = response[okText];
            if(navigator.notification === undefined) {
                var alertPopup = $ionicPopup.alert({
                    title: title,
                    template: body,
                    okText: (okText == undefined || okText == null) ? okayText : okText
                });
                return alertPopup;
            }
            else {
                var defer = $q.defer();
                var confirmCallback = function(buttonIndex) {
                    defer.resolve(true);
                };
                if(okText == undefined || okText == null) 
                    okText = okayText;
                navigator.notification.alert(body, confirmCallback, title, okText);
            }
        });
    };
    
    service.showConfirm = function(title, body, okText, cancelText) {
        var defer = $q.defer();
        defer.resolve(
            $translate([title, body, 'GENERAL.OK', okText, 'GENERAL.CANCEL', cancelText])
            .then(function(response){
                title = response[title];
                body = response[body];
                var okayText = response['GENERAL.OK'];
                okText = response[okText];
                var defaultCancelText = response['GENERAL.CANCEL'];
                var cancelText = response[cancelText];
                if(navigator.notification == undefined) {
                    var confirmPopup = $ionicPopup.confirm({
                        title: title,
                        template: body,
                        okText: (okText == undefined || okText == null) ? okayText : okText, 
                        cancelText: (cancelText == undefined || cancelText == null) ? defaultCancelText : cancelText
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
                    var buttons = [okText, defaultCancelText];
                    if(okText === undefined || okText === null) {
                        buttons[0] = okayText;
                    }
                    if(cancelText === undefined || cancelText === null) {
                        buttons[1] = defaultCancelText;
                    }
                    navigator.notification.confirm(body, confirmCallback, title, buttons);
                    return defer.promise;
                }
            })
        );
        return defer.promise;
    };
    
    service.showPopup = function($scope,$event,body,translate){
        //if 'translate' is not defined, it will default to false
        if(translate){
            var defer = $q.defer();
            defer.resolve(
                $translate([body])
                .then(function(response){
                    body = response[body];
                    return callPopover(body);
                })
            );
            return defer.promise;
        }
        else {
            callPopover(body);
        }
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


/*
.service('SSFAlertsService', ['$ionicPopup', '$q', '$ionicPopover',
        function ($ionicPopup, $q, $ionicPopover) {
    var service = this;
    
    service.showAlert = function(title, body, okText) {
        if(navigator.notification === undefined) {
            var alertPopup = $ionicPopup.alert({
                title: title,
                template: body,
                okText: (okText == undefined || okText == null) ? "OK" : okText
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
                okText: (okText == undefined || okText == null) ? "OK" : okText, 
                cancelText: (cancelText == undefined || cancelText == null) ? "Cancel" : cancelText
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
            var buttons = ["OK","Cancel"];
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
*/