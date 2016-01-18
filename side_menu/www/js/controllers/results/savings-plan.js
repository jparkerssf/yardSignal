angular.module('starter.controllers')
    .controller('ResultsSavingsPlanCtrl', ['$scope', '$http', '$state', '$ionicHistory', 'savings', 'custom', 'SSFAlertsService', '$window', 'CacheErrorService', '$translate', '$ionicViewSwitcher', '$ionicModal', '$rootScope',
        function($scope, $http, $state, $ionicHistory, savings, custom, SSFAlertsService, $window, CacheErrorService, $translate, $ionicViewSwitcher, $ionicModal, $rootScope) {
        
        if(savings !== undefined && savings.status !== undefined) {
            CacheErrorService.anyResultsErrors(savings);
        }
        if(custom !== undefined && custom.status !== undefined && savings.status === 200) {
            CacheErrorService.anyFetchInputErrors(custom);
        }
        
        var sortSavings = {};
        
        sortSavings = angular.copy(savings);
        
        
        function sortObject(obj) {
            delete sortSavings.data.id;
            delete sortSavings.data.userId;
            delete sortSavings.data.userInputsId;
            delete sortSavings.data.timestamp;
            var arr = [];
            var prop;
            for (prop in obj) {
                if (obj.hasOwnProperty(prop)) {
                    arr.push({
                        'key': prop,
                        'value': obj[prop]
                    });
                }
            }
            arr.sort(function(a, b) {
                return b.value - a.value;
            });
            return arr; // returns array
        }
        if(sortSavings.data !== undefined) {
            var sortedSavings = sortObject(sortSavings.data);
            $scope.savings = sortedSavings;
            $scope.custom = [];
            $scope.custom[0] = custom.data[sortedSavings[0].key];
            $scope.custom[1] = custom.data[sortedSavings[1].key];
            $scope.custom[2] = custom.data[sortedSavings[2].key];
            beginTranslate();
            
            $ionicModal.fromTemplateUrl('templates/savings-tips/'+sortedSavings[0].key+'.html', {
                scope: $scope,
            }).then(function(modal) {
                $scope.modal0 = modal;
            });
                $scope.$on('$destroy', function() {
                $scope.modal0.remove();
            });
            
            $ionicModal.fromTemplateUrl('templates/savings-tips/'+sortedSavings[1].key+'.html', {
                scope: $scope,
            }).then(function(modal) {
                $scope.modal1 = modal;
            });
                $scope.$on('$destroy', function() {
                $scope.modal1.remove();
            });
            
            $ionicModal.fromTemplateUrl('templates/savings-tips/'+sortedSavings[2].key+'.html', {
                scope: $scope,
            }).then(function(modal) {
                $scope.modal2 = modal;
            });
                $scope.$on('$destroy', function() {
                $scope.modal2.remove();
            });
        }
        
        
        function beginTranslate() {
            var dataTranslate = {};
            dataTranslate.utilities = 'DATA.HOUSING.2';
            dataTranslate.cellularPhone = 'DATA.HOUSING.3';
            dataTranslate.householdFurnishingOperationsAndSupplies = 'DATA.HOUSING.4';
            dataTranslate.transportation = 'DATA.TRANSPORTATION.1';
            dataTranslate.foodAtHome = 'DATA.FOOD.1_CONTEXT';
            dataTranslate.foodAwayFromHome = 'DATA.FOOD.2_CONTEXT';
            dataTranslate.tobacco = 'DATA.FOOD.3';
            dataTranslate.entertainment = 'DATA.DISCRETIONARY.1';
            dataTranslate.apparel = 'DATA.DISCRETIONARY.2';
            dataTranslate.education = 'DATA.DISCRETIONARY.3';
            dataTranslate.personalCare = 'DATA.SAVINGS.2';
            dataTranslate.lifeAndOtherPersonalInsurance = 'DATA.SAVINGS.3';
            dataTranslate.cashContributions = 'DATA.SAVINGS.5';
            dataTranslate.healthCare = 'DATA.SAVINGS.1';
            var suggestionsTranslate = {};
            suggestionsTranslate.utilities = 'UTILITIES'
            
            $translate([dataTranslate[sortedSavings[0].key], dataTranslate[sortedSavings[1].key], dataTranslate[sortedSavings[2].key]])
            .then(function(response) {
                var translated = [];
                var prop;
                for (prop in response) {
                    if (response.hasOwnProperty(prop)) {
                        translated.push(response[prop]);
                   }
                }
                $scope.translatedNames = translated;
            });
        }
        
        //CacheErrorService.checkResultsErrors(custom);

        
        $scope.editButton = function() {
            if(!$rootScope.online) {
                return SSFAlertsService.showAlert('ERROR.TITLE', 'ERROR.OFFLINE_EDIT');
            }
            $ionicHistory.nextViewOptions({
                disableAnimate: false,
                disableBack: false
            });
            $ionicViewSwitcher.nextDirection("back");
            $state.go('app.forms-savings');
        };
        

         
    }

    ])
;