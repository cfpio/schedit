angular.module('schedit').service('EventService', function($http){

  var service = {};

  service.getEvent = function() {
    return $http.get('https://api.cfp.io/v0/application')
  }

  return service

})
