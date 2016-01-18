var app =  angular.module('RESTConnection1', []);
//app.constant('ENDPOINT_URL', 'https://zib-bka-ssfmaster.c9users.io/api/');
app.constant('ENDPOINT_URL', AppSettings.baseApiUrl);
app.service('UserService', ['$http', 'ENDPOINT_URL', 
function ($http, ENDPOINT_URL) {
  var service = this,
  path = 'ZIBusers/';
  
  function getUrl() {
    return ENDPOINT_URL + path;
  }
  
  function preparePostData(user) {
    var data = {};
    if (user.password != undefined && user.password != null){
      data.password = user.password;
    }
    if (user.language != undefined && user.language != null) {
      data.language = user.language;
    }
    if (user.instantCompleted != undefined && user.instantCompleted != null) {
      data.instantCompleted = user.instantCompleted;
    }
    if (user.customCompleted != undefined && user.customCompleted != null) {
      data.customCompleted = user.customCompleted;
    }
    if (user.savingsCompleted != undefined && user.savingsCompleted != null) {
      data.savingsCompleted = user.savingsCompleted;
    }
    if (user.hasAcceptedEULA != undefined && user.hasAcceptedEULA != null) {
      data.hasAcceptedEULA = user.hasAcceptedEULA;
    }
    return data;
  }
  
  service.createZIBuser = function (user) {
    var postData = preparePostData(user);
    if (user.email == undefined || user.email == null ){
      return "Err: email must be defined.";
    } else {
      postData.email = user.email;
    }
  
    return $http({
        url: getUrl(),
        method: "POST",
        data: postData
     });
  };

  service.findOneZIBuser = function(userId, token) {
    return $http({
        url: getUrl()+"findOne"+"?filter[where][id]="+userId,
        method: "GET",
        headers: {
            'Authorization': token
        }
     });
  };
  
  service.loginZIBuser = function(user) {
    user["ttl"] = 1209600000;
    return $http.post(getUrl()+"login",user);
  };
  
  service.logoutZIBuser = function(token) {
    return $http({
        url: getUrl()+"logout",
        method: "POST",
        headers: {
            'Authorization': token
        }
     });
  };
  
  service.updateZIBuser = function (token, user) {
    var postData = preparePostData(user);
    return $http({
        url: getUrl()+user.id,
        method: "PUT",
        data: postData,
        headers: {
          'Authorization': token
        }
     });
  }; 
  
}])
    
.service('InstantService', ['$http', 'ENDPOINT_URL',
function ($http, ENDPOINT_URL) {
  var service = this,
  path = 'instantBudgets/';
  
  function getUrl() {
    return ENDPOINT_URL + path;
  }
  //anonymous user completing the 4 questions
  service.computeHighLevelInstant = function(userInputs) {
    return $http({
      url: getUrl()+"computeHighLevelInstant",
      method: "POST",
      data: 
        {'userInputs': userInputs},
      headers: {
          "Content-Type":"application/json" }
     });
  };
        
  //newly registered user about to view their full instant budget
  service.computeDetailInstant = function(token, mostRecentInputs) {
    return $http({
      url: getUrl()+"computeDetailInstant",
      method: "POST",
      data: 
        {'userInputs': mostRecentInputs},
      headers: {
          'Authorization': token,
          "Content-Type":"application/json" }                  
     });
  };
        
  // retrieves current high level instant budget
  service.getLatestHighLevelInstant = function(token, userId) {
    return $http({
        url: getUrl()+"getLatestHighLevelInstant",
        method: "POST",
        data:
          {'userInputs': {
            'userId': userId
          }},
        headers: {
          'Authorization': token,
          'Content-Type':'application/json'
        } 
     });    
  };

  service.getLatestDetailInstant  = function(token, userId) {
    return $http.get(getUrl()+"?filter[where][userId]="+userId+"&filter[order]=timestamp DESC&filter[limit]=1",{
        params: { access_token: token }
    });
  };
}])
    
    
.service('CustomService', ['$http', 'ENDPOINT_URL',
function ($http, ENDPOINT_URL) {
  var service = this,
  path = 'customBudgets/';
  
  function getUrl() {
    return ENDPOINT_URL + path;
  }
        
  //for computing a custom budget
  service.computeCustom = function(token, form) {
    return $http({
      url: getUrl()+"computeCustom",
      method: "POST",
      data:
        {'userInputs': form},
      headers: {
          'Authorization': token,
          "Content-Type":"application/json" } 
     });
  };

  //for retrieving the most recent custom budget
  service.getLatestCustom = function(token, userId) {
    return $http.get(getUrl()+"?filter[where][userId]="+userId+"&filter[order]=timestamp DESC&filter[limit]=1",{
        params: { access_token: token }
    });
  };
}])
    
    
.service('SavingsService', ['$http', 'ENDPOINT_URL',
function ($http, ENDPOINT_URL) {
  var service = this,
  path = 'savingsBudgets/';
  
  function getUrl() {
    return ENDPOINT_URL + path;
  }
    
  //for computing a savings budget
  service.computeSavings = function(token, form) {
    return $http({
          url: getUrl()+"computeSavings",
          method: "POST",
          data:
            {'userInputs': form},
          headers: 
            {
              'Authorization': token,
              "Content-Type":"application/json"
            }                      
         });
  };
    
  //for retrieving the most recent savings budget
  service.getLatestSavingsBudget  = function(token, userId) {
    return $http.get(getUrl()+"?filter[where][userId]="+userId+"&filter[order]=timestamp DESC&filter[limit]=1",{
        params: { access_token: token }
    });
  };
}]);
    
app.service('UserInputsService', ['$http', 'ENDPOINT_URL', 
function ($http, ENDPOINT_URL) {
  var service = this,
  path = 'userInputs/';
  
  function getUrl() {
    return ENDPOINT_URL + path;
  }
  

  service.getUserInputs = function(token, userInputsId) {
    return $http.get(getUrl()+userInputsId,{
        params: { access_token: token }
    });
  };
  
  //retrieve the most recent userInputs for the specified user
  service.getLatestUserInputs  = function(token, userId) {
    return $http.get(getUrl()+"?filter[where][userId]="+userId+"&filter[order]=timestamp DESC&filter[limit]=1",{
        params: { access_token: token }
    });
  };  
}])    
;