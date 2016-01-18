angular.module('SSFMailComposer', [])
.service('SSFMailService', ['$q',function ($q) {
        
    var service = this;
    
    service.sendMail = function(subject, body, toEmail)
    {
        var defer = $q.defer();
        
        if (window.plugins && window.plugins.emailComposer) { //check if plugin exists

            window.plugins.emailComposer.showEmailComposerWithCallback(function (result) {
                //callback
                defer.resolve(result); 
            },
            subject,        // Subject
            body,        // Body
            [toEmail],     // To (Email to send)
            null,        // CC
            null,        // BCC
            false,       // isHTML
            null,        // Attachments
            null);       // Attachment Data
            
        }else {
            window.location.href = "mailto:"+toEmail+"?subject="+subject+"&body="+body;
            defer.resolve(true);
        }
        return defer.promise;
    };
}]);