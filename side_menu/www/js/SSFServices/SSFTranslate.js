//service for translating text

//must call functions of services to update which text they are using when language changes

//must translate text passed into it.

//SSFCache.js
//SSFTranslate.js

/* Translates arrays of text
Instructions:
1.  Inject 'SSFTranslate' into the app.js file.
2.  Place '<script src="js/SSFServices/SSFTranslate.js"></script>' into the index.html
            file above the app.js.
3.  Tell John to finish his translate listener
*/

angular.module('SSFTranslate', [])
.service('SSFTranslateService', ['$translate', 'SSFConfigConstants',
        function($translate, SSFConfigConstants) {
    
    var service = this;
    
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
    
    //  untested, the content of this function should update the text for the services
    //  but still needs to be called with a listener whenever the language changes.
    // function testFunction() {
    //     for(var serviceNames in SSFConfigConstants) {
    //         for(var serviceContentObjectNames in SSFConfigConstants[serviceNames]) {
    //             if(serviceContentObjectNames === 'languageFileReference') {
    //                 $translate(SSFConfigConstants[serviceNames][serviceContentObjectNames])
    //                 .then(function(response) {
    //                     SSFConfigConstants[serviceNames]['textTranslated'] = response;
    //                 });
    //             }
    //         }
    //     }
    // }
    
}]);