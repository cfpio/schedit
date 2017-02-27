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

  service.colorMapping = {
    "Docker Docker Docker":"#2F687B",
    "Black Belt Tech":"#3E4089",
    "Ecosystem":"#5E3685",
    "Pre-Registration, Registration":"#9B3874",
    "Registration":"#C55647",
    "Party":"#C58C47",
    "Wild Cards":"#C5A847",
    "Use Case":"#C5C247",
    "break":"#8BB642",
    "default":"#338C5A"
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

  service.getColor = function(event){
      var result;
      if(service.colorMapping[event['event_type']]){
        result = service.colorMapping[event['event_type']];
      }else{
        result = service.colorMapping["default"];
      }
      return result;
  }

  service.events = [];

  service.getEventsAsJson = function(){
    var json = angular.copy(service.events);
    return JSON.stringify(json);
  }

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
