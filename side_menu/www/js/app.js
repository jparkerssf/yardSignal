function shouldRotateToOrientation(degrees) {
  return true;
};
// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic','ionic.service.core', 'ionic.service.analytics',
    'starter.controllers', 'SSFConfig', 'pascalprecht.translate', 'ngIOS9UIWebViewPatch',
    'RESTConnection1', 'currencyMask', 'ngCordova', 'SSFAlerts', 'SSFDirectives',
    'SSFMailComposer', 'SSFCache'])
.constant("LANGUAGE_CODES", {
        "ENGLISH": "en",
        "SPANISH": "es",
        "CHINESE": "cmn"
})
.run(["$ionicPlatform", "$ionicAnalytics", function($ionicPlatform, $ionicAnalytics) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(false);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleLightContent();
    }
    
    Ionic.io();
    //Dispatch interval, how often do we want our events to be sent to analytics. Default is 30 sec
    $ionicAnalytics.dispatchInterval = 60;
    if(window.localStorage["userId"]) {
      $ionicAnalytics.setGlobalProperties({
        ZibID: window.localStorage["userId"]
      });
    }
    $ionicAnalytics.register();

  });
}])
.config(["$translateProvider", "LANGUAGE_CODES", function($translateProvider, LANGUAGE_CODES) {
  $translateProvider
  //Load languages files from path 
    .useStaticFilesLoader({
      prefix: 'languages/',
      suffix: '.json'
    })
    .fallbackLanguage(LANGUAGE_CODES.ENGLISH)
    //Only works if determine preferred language is used
    .registerAvailableLanguageKeys(['en', 'es', 'cmn'], {
      'en_*': LANGUAGE_CODES.ENGLISH,
      'es_*': LANGUAGE_CODES.SPANISH,
      'zh_*': LANGUAGE_CODES.CHINESE
    })
    //determinePreferredLanguage tries to look at the locale and determine the language. 
    .determinePreferredLanguage();
    //To set the language, uncomment the next line of code and comment "determinePreferredLanguage"
   // .preferredLanguage(LANGUAGE_CODES.ENGLISH)
    
}])
.config(["$stateProvider", "$urlRouterProvider", "$ionicConfigProvider",
    function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {
  $ionicConfigProvider.views.swipeBackEnabled(false);
  
  $stateProvider
  
  //not inside of a sub-folder of templates
  .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'SideMenuCtrl'
  })
  .state('app.landing', {
    url: '/landing',
    views: {
      'menuContent': {
        templateUrl: 'templates/landing.html',
        controller: 'LandingCtrl'
      }
    }
  })
  .state('app.update', {
    url: '/update',
    views: {
      'menuContent': {
        templateUrl: 'templates/update.html',
        controller: 'UpdateCtrl'
      }
    }
  })
  
  //forms folder
  .state('app.forms-custom', {
    url: '/forms-custom',
    cache: false,
    views: {
      'menuContent': {
        templateUrl: 'templates/forms/custom.html',
        controller: 'FormsCustomCtrl'
      }
    }
  })
  .state('app.forms-instant', {
    url: '/forms-instant',
    cache: false,
    views: {
      'menuContent': {
        templateUrl: 'templates/forms/instant.html',
        controller: 'FormsInstantCtrl'
      }
    }
  })
  .state('app.forms-login', {
    url: '/forms-login',
    views: {
      'menuContent': {
        templateUrl: 'templates/forms/login.html',
        controller: 'LoginCtrl'
      }
    }
  })
  .state('app.forms-register', {
    url: '/forms-register',
    views: {
      'menuContent': {
        templateUrl: 'templates/forms/register.html',
        controller: 'RegisterCtrl'
      }
    }
  })
  .state('app.forms-savings', {
    url: '/forms-savings',
    cache: false,
    views: {
      'menuContent': {
        templateUrl: 'templates/forms/savings.html',
        controller: 'FormsSavingsCtrl'
      }
    }
  })
  
  //results folder
  .state('app.results-custom', {
    url: '/results-custom',
    cache: false,
    views: {
      'menuContent': {
        templateUrl: 'templates/results/custom.html',
        controller: 'ResultsCustomCtrl'
      }
    }
  })
  .state('app.results-detailed-instant', {
    url: '/results-detailed-instant',
    cache: false,
    views: {
      'menuContent': {
        templateUrl: 'templates/results/detailed-instant.html',
        controller: 'ResultsDetailedInstantCtrl'
      }
    }
  })
  .state('app.results-high-level-instant', {
    url: '/results-high-level-instant',
    cache: false,
    views: {
      'menuContent': {
        templateUrl: 'templates/results/high-level-instant.html',
        controller: 'ResultsHighLevelInstantCtrl'
      }
    }
  })
  .state('app.results-savings-plan', {
    url: '/results-savings-plan',
    cache: false,
    views: {
      'menuContent': {
        templateUrl: 'templates/results/savings-plan.html',
        controller: 'ResultsSavingsPlanCtrl'
      }
    }
  })
  
  //wizards folder
  .state('app.wizards-about', {
    url: '/wizards-about',
    views: {
      'menuContent': {
        templateUrl: 'templates/wizards/about.html',
        controller: 'WizardAboutCtrl'
      }
    }
  })
  .state('app.wizards-custom', {
    url: '/wizards-custom',
    views: {
      'menuContent': {
        templateUrl: 'templates/wizards/custom.html',
        controller: 'WizardCustomCtrl'
      }
    }
  })
  .state('app.wizards-register', {
    url: '/wizards-register',
    views: {
      'menuContent': {
        templateUrl: 'templates/wizards/register.html',
        controller: 'WizardRegisterCtrl'
      }
    }
  })
  
  //configure folder
  .state('app.configure-about-zebit', {
    url: '/configure-about-zebit',
    views: {
      'menuContent': {
        templateUrl: 'templates/configure/about-zebit.html',
        controller: 'AboutZebitCtrl'
      }
    }
  })
  .state('app.configure-eula', {
    url: '/configure-eula',
    views: {
      'menuContent': {
        templateUrl: 'templates/configure/EULA.html'
      }
    }
  })
  .state('app.configure-settings', {
    url: '/configure-settings',
    views: {
      'menuContent': {
        templateUrl: 'templates/configure/settings.html',
        controller: 'SettingsCtrl'
      }
    }
  })
  .state('app.configure-credits', {
    url: '/configure-credits',
    views: {
      'menuContent': {
        templateUrl: 'templates/configure/credits.html'
      }
    }
  })
  
  //other
  .state('app.navigation', {
    url: '/navigation',
    views: {
      'menuContent': {
        template:
        '<ion-view hide-nav-bar="false">' +
          '<ion-content class="padding">' +
            '<button class="button button-block button-calm" ng-repeat="nav in navLinks" ui-sref="{{nav}}">{{nav}}</button>' +
          '</ion-content>' +
        '</ion-view>',
        controller: function($state, $scope) {
          var stateArray = $state.get();
          $scope.navLinks = [];
          for(var i in stateArray) {
            if(stateArray[i].name !== '' && stateArray[i].name !== 'app') {
              $scope.navLinks.push(stateArray[i].name);
            }
          }
        },
      }
    }
  })
  ;
  
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/landing');
}])
.config(['$ionicAutoTrackProvider', function($ionicAutoTrackProvider) {
  // Don't track which elements the user clicks on.
  $ionicAutoTrackProvider.disableTracking('Tap');
}])
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
        if(response.status === 401 && (response.data.error.code === "INVALID_TOKEN" || response.data.error.code === "AUTHORIZATION_REQUIRED"))
        {
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