/* Translates arrays of text and for translating constant text for SSFServices
Instructions:
1.  Terminal: cd <project-name>
2.  Terminal: bower install angular-translate
3.  Terminal: bower install angular-translate-loader-static-files
4.  Inject 'pascalprecht.translate' into app.js before any other SSFServices
5.  create 'languages' folder inside of 'www' (www/languages)
6.  create 'en.json' file within 'languages' file (www/languages/en.json)
7.  create 'es.json' file within 'languages' file (www/languages/es.json)
8.  Inject 'SSFTranslate' into the app.js file.
9.  Place '<script src="js/SSFServices/SSFTranslate.js"></script>' into the index.html
            file above the app.js.
10. Place the following below this '<script src="lib/ionic/js/ionic.bundle.js"></script>':
            <script src="lib/angular-translate/angular-translate.js"></script>
            <script src="lib/angular-translate-loader-static-files/angular-translate-loader-static-files.js"></script>
10. Place the following object inside a language file:
{
    "SSF_CONFIG_CONSTANTS": {
    }
}
11. Check each service for text that gets translated.
            Known services: SSFAlerts.js & SSFCache.js
12. If you don't already have SSFConfig, add it now. Then you are finished.

Examples:
1.
    // to change the language being used:
    SSFTranslateService.changeLanguage('en'); **remember to also $rootScope.$broadcast('request:ssftranslate');
    // to translate text (only accepts arrays):
    var languageReferenceText = ['REFERENCE.TEXT.ONE', 'REFERENCE.TEXT.TWO'];
    var translatedText = SSFTranslateService.translate(languageReferenceText);
    
Listeners:
    'request:ssftranslate': updates the constant languages within the services.
*/

angular.module('SSFTranslate', [])
.service('SSFTranslateService', ['$translate', 'SSFConfigConstants', '$window', '$rootScope',
        function($translate, SSFConfigConstants, $window, $rootScope) {
    var service = this;
    service.changeLanguage = function(newLanguage) {
        $window.localStorage['language'] = newLanguage;
        $translate.use(newLanguage)
        .then(function(res) {
            $rootScope.$broadcast('request:ssftranslate');
        });
    };
    service.translate = function(array) {
        return $translate(array)
        .then(function(response) {
            var returnArray = [];
            for(var i in array) {
                returnArray.push(response[array[i]]);
            }
            return returnArray;
        });
    };
}])
.run(['SSFTranslateService', 'SSFAlertsService',
        function(SSFTranslateService, SSFAlertsService) {
    var service = SSFTranslateService;
    service.showAlert = function(title, body) {
        return service.translate([title, body])
        .then(function(res) {
            return SSFAlertsService.showAlert(res[0], res[1]);
        });
    };
    service.showConfirm = function(title, body, okText, cancelText) {
        return service.translate([title, body, okText, cancelText])
        .then(function(res) {
            return SSFAlertsService.showConfirm(res[0], res[1], res[2], res[3]);
        });
    };
    service.showPopup = function($scope, $event, body) {
        return service.translate([body])
        .then(function(res) {
            return SSFAlertsService.showPopup($scope, $event, res[0]);
        });
    };
}])
.run(['$rootScope', 'SSFConfigConstants', 'SSFTranslateService', 'SSFAlertsService', 'SSFCacheService',
        function($rootScope, SSFConfigConstants, SSFTranslateService, SSFAlertsService, SSFCacheService) {
    $rootScope.$on('request:ssftranslate', function() {
        for(var serviceName in SSFConfigConstants) {
            for(var serviceContentObjectNames in SSFConfigConstants[serviceName]) {
                if(serviceContentObjectNames === 'languageFileReference') {
                    SSFConfigConstants[serviceName]['textTranslated'] = SSFTranslateService.translate(SSFConfigConstants[serviceName][serviceContentObjectNames])
                    .then(function(res) {
                        return res;
                    });
                }
            }
        }
        SSFAlertsService.updateServiceText();
        SSFCacheService.updateServiceText();
    });
    $rootScope.$broadcast('request:ssftranslate');
}])
.constant('LANGUAGE_CODES', {
        "ENGLISH": "en",
        "SPANISH": "es"
})
.config(['$translateProvider', 'LANGUAGE_CODES',
        function($translateProvider, LANGUAGE_CODES) {
    $translateProvider
    //Load languages files from path 
    .useStaticFilesLoader({
        prefix: 'languages/',
        suffix: '.json'
    })
    .fallbackLanguage(LANGUAGE_CODES.ENGLISH)
    //Only works if determine preferred language is used
    .registerAvailableLanguageKeys(['en', 'es'], {
        'en_*': LANGUAGE_CODES.ENGLISH,
        'es_*': LANGUAGE_CODES.SPANISH
    })
    //determinePreferredLanguage tries to look at the locale and determine the language. 
    .determinePreferredLanguage();
    //To set the language, uncomment the next line of code and comment "determinePreferredLanguage"
    // .preferredLanguage(LANGUAGE_CODES.ENGLISH);
}]);











angular.module('Example', [])

.controller('ExampleCtrl', ['$translate', function($translate) {
    
    $translate('APP.NAME')
    .then(function(res) {
        console.log(res);
        //what is console logged is equal to 'Soft Stack Factory'
    });
    
    var translateArray = ['LANDING_CTRL.TITLE', 'LANDING_CTRL.OFFLINE', 'LANDING_CTRL.UNREGISTERED'];
    $translate(translateArray)
    .then(function(res) {
        console.log(res['LANDING_CTRL.TITLE']);
        //what is console logged is equal to 'Error'
        console.log(res['LANDING_CTRL.OFFLINE']);
        //what is console logged is equal to 'We could not retrieve your data while you are offline.'
        console.log(res['LANDING_CTRL.UNREGISTERED']);
        //what is console logged is equal to 'There was a problem with authenticating your session. Please sign in.'
        
    });
}]);








service.showAlert = function(title, body) {
    $translate([title, body])
    .then(function(res) {
        
    })
}

res = {
    'LANDING_CTRL.TITLE': 'Error', 
    'LANDING_CTRL.OFFLINE': 'We could not retrieve your data while you are offline.', 
    'LANDING_CTRL.UNREGISTERED': 'There was a problem with authenticating your session. Please sign in.'
}