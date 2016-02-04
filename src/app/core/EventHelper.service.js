angular.module('schedit').service('EventHelper', function(){

  var service = {};
  service.spaceGap = 15;
  service.spaceMapping = {
    "Docker Docker Docker":45,
    "Black Belt Tech":30,
    "Ecosystem":60,
    "Pre-Registration, Registration":60,
    "Registration":45,
    "Party":30,
    "Wild Cards":30,
    "Use Case":15,
    "break":15,
    "default":30
  }

  service.getNbSpaces = function(event){
    var result;
    if(service.spaceMapping[event['event_type']]){
      result = service.spaceMapping[event['event_type']]/service.spaceGap;
    }else{
      result = service.spaceMapping["default"]/service.spaceGap;
    }
    return result;
  }

  service.events = {};

  service.updateEvent = function(updatedEvent){
    angular.forEach(service.events,function(event){
      if(event.id === updatedEvent.id){
        event.scheduled = updatedEvent.scheduled;
        event.venue = updatedEvent.venue;
        event.venue_id = updatedEvent.venue_id;
        event.event_start = updatedEvent.event_start;
        event.event_end = updatedEvent.event_end;
      }
    })
  }

  return service

})
