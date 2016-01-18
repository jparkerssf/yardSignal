/*	
	remember to place '<script src="js/SSFServices/SSFCache.js"></script>'
		inside of the index.html above the app.js line
	remember to inject: 'SSFCacheService' into the app.js
	remember to call 'SSFCacheService.clearData();' on logout
	lastly, remember to inject all the service names from RESTServices.js
		'.service('ServiceName', [...])' into SSFCacheService
*/

/* EXAMPLE USES

creates high level instant budget
CacheService.manageData(InstantService, computeHighLevelInstant, mostRecentHighLevel, formInputs, false);

gets latest custom budget
CacheService.manageData(CustomService, getLatestCustom, mostRecentDeltas, {}, true);

gets latest savings budget
CacheService.manageData(SavingsService, getLatestSavingsBudget, mostRecentSavings, {}, true);
*/

angular.module('SSFCacheService', [])
.service('SSFCache', ['$window', '$q', '$rootScope',
		function ($window, $q, $rootScope) {
 
	var service = this,
	cacheData = {},
	currentData = {};

	function updateArray(storageName) {
		cacheData[storageName] = currentData;
		$window.localStorage['cacheData'] = JSON.stringify(cacheData);
	}

	function whichData(storageName) {
		//decides what data is being referenced
		if(cacheData.storageName !== undefined) {
			return currentData = cacheData.storageName;
		}
		else if($window.localStorage['cacheData'] !== undefined) {
			var tempHolder = JSON.parse($window.localStorage['cacheData']);
			if(tempHolder.storageName !== undefined) {
				currentData = tempHolder.storageName;
			}
			else {
				currentData = {
					'data': {},
					'errorMessage': 'ERROR.OFFLINE'
				};
			}
		}
		else {
			currentData = {
				'data': {},
				'errorMessage': 'ERROR.OFFLINE'
			};
		}
	}
	
	service.clearData = function() {
		cacheData = {};
    	currentData = {};
		delete $window.localStorage['cacheData'];
	};

	service.manageData = function(injectedName, serviceName, storageName, dataObject, shouldBeSignedIn) {
		/*	list of options
		injectedName: the name of the injected RESTServices.js provider
		serviceName: the name of the injected RESTServices.js provider
		storageName: *must be unique!* same name that references the RESTServices.js service to be called.
		dataObject: the object containing what the backend needs to complete it's call. If null, put: {}
		shouldBeSignedIn: boolean
		token: required if isSignedIn = true
		userId: required if isSignedIn = true
		*/
		
		var deferred = $q.defer();
		whichData(storageName);
		if(shouldBeSignedIn) {
			var token = $window.localStorage['token'],
			userId = $window.localStorage['userId'];
		}
		
		if(shouldBeSignedIn && $window.localStorage['userId'] === undefined) {
			deferred.resolve(
				currentData = {
					'data': {},
					'errorMessage': 'ERROR.NOT_LOGGED_IN'
				}
			);
		}
		else {
		    //TODO: test if this if statement actually works
			if(JSON.stringify(currentData.data) === '{}' || currentData.data === undefined) {
				if($rootScope.online) {
					deferred.resolve(
						injectedName.serviceName(token, userId, dataObject)
						.then(function(response) {
							currentData = response;
							updateArray(storageName, currentData);
							return response;
						}, function(error) {
							currentData = error;
							updateArray(storageName, currentData);
							return error;
						})
					);
				}
				else {
					//offline and don't have the data
					deferred.resolve(
						currentData = {
							'data': {},
							'errorMessage': 'ERROR.OFFLINE'
						}
					);
				}
			}
			else {
				deferred.resolve(currentData);
			}
		}
		return deferred.promise;
	};
}]);