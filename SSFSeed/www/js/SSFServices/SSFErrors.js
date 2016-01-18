/*	
	remember to place '<script src="js/SSFServices/SSFErrors.js"></script>'
		inside of the index.html above the app.js line
	remember to inject: 'SSFErrorMessages' into the app.js
	//	remember to call 'SSFCacheService.clearData();' on logout
*/

/*	EXAMPLE USE
UserService.loginZIBuser($scope.loginData)
.then(function(response) {
	if(response.satatus === 200) {
		//successful, carry on
	}
	else {
		//there was a problem, check for errors
		SSFErrors.loginErrors(response);
	}
}, function(err) {
	SSFErrors.loginErrors(response);
});
*/


angular.module('SSFErrorMessages', [])
.service('SSFErrors', ['$window', 'SSFAlertsService', '$ionicHistory', '$state', '$rootScope',
        '$ionicAnalytics',
		function ($window, SSFAlertsService, $ionicHistory, $state, $rootScope, $ionicAnalytics,
		SSFCacheService) {
	
	var service = this;
	
	function toLogin(showDefaultMessage) {
		//showDefaultMessage: boolean, if 'true' will display a message asking the user to login
		//  if 'false', provide an alert before calling this function. Default
		//  set to true.
		$ionicAnalytics.unsetGlobalProperty('ZibID');
		SSFCacheService.clearData();
		delete $window.localStorage['userId'];
		delete $window.localStorage['token'];
		
		if(showDefaultMessage === undefined) {
			showDefaultMessage = true;
		}
		
		if(showDefaultMessage) {
			SSFAlertsService.showAlert('ERROR.TITLE', 'ERROR.NOT_LOGGED_IN');
		}
		$ionicHistory.nextViewOptions({
			disableAnimate: false,
			disableBack: true
		});
		return $state.go('app.forms-login');
	}
	
	service.loginErrors = function(dataObject) {
		if(dataObject.status === 200) {
			return;
		}
		else if(dataObject.status === 401) {
			// TODO translate these
			SSFAlertsService.showAlert("LOGIN_CTRL.ERROR.TITLE","LOGIN_CTRL.ERROR.WRONG_INPUTS");
		}
		else if(dataObject.data === null) {
			//If the data is null, it means there is no internet connection.
			SSFAlertsService.showAlert("LOGIN_CTRL.ERROR.TITLE","LOGIN_CTRL.ERROR.INTERNET_CONNECTION");
        }
		else if(dataObject['errorMessage'] !== undefined) {
		    SSFAlertsService.showAlert("LOGIN_CTRL.ERROR.TITLE", dataObject['errorMessage']);
		}
		else {
			SSFAlertsService.showAlert("LOGIN_CTRL.ERROR.TITLE", "LOGIN_CTRL.ERROR.UNKNOWN_ISSUE");
		}
	};
	
	service.SSFCacheErrors = function(dataObject) {
	    if(dataObject.status === 200) {
			return;
		}
		else if(dataObject['errorMessage'] !== undefined) {
		    if(dataObject['errorMessage'] === 'ERROR.NOT_LOGGED_IN') {
		        //TODO: Make the user sign in
		        toLogin();
		    }
		    else {
    		    SSFAlertsService.showAlert("LOGIN_CTRL.ERROR.TITLE", dataObject['errorMessage']);
		    }
		}
		else {
			SSFAlertsService.showAlert("LOGIN_CTRL.ERROR.TITLE", "LOGIN_CTRL.ERROR.UNKNOWN_ISSUE");
		}
	};
}]);