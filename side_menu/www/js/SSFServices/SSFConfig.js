/* Spinner while waiting for a call to return from a backend
Instructions:
1.  Inject 'SSFConfig' into the app.js file.
2.  Place '<script src="js/SSFServices/SSFConfig.js"></script>' into the index.html
            file above the app.js.
3.  Check all existing SSFServices for .config blocks of code, comment those out and include
    them in this file. If those files have a ".constant('SSFConfigConstants'...)" be sure
            to comment it out.
*/


angular.module('SSFConfig', [])
.constant('SSFConfigConstants', {
    //  if translation is a feature of the app, switch from false to true.
    'shouldTranslate': false
})


;