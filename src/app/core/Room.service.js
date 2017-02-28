angular.module('schedit').service('RoomService', function($http){

  var service = {};

  service.getRooms = function() {
    return $http.get('https://api.cfp.io/v0/rooms')
  }

  return service

})
