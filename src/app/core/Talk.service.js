angular.module('schedit').service('TalkService', function($http){

  var service = {};

  service.getAcceptedOrConfirmed = function() {
    return $http.get('https://api.cfp.io/v0/admin/sessions/export/sched.json?states=ACCEPTED,CONFIRMED')
  }

  return service

})
