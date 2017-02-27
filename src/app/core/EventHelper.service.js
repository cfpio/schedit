angular.module('schedit').service('EventHelper', function(){

  var service = {};
  service.spaceGap = 15;
  service.spaceMapping = {
    "Conférence":55,
    "Tool in Action":25,
    "Université":120,
    "Quickie":15,
    "Lab":120,
    "default":30
  }

  service.colorMapping = {
    "Conférence":"#2F687B",
    "Tool in Action":"#3E4089",
    "Université":"#5E3685",
    "Quickie":"#9B3874",
    "Lab":"#C55647",
    "default":"#338C5A"
  }

  service.getNbSpaces = function(event){
    var result;
    if(service.spaceMapping[event['format']]){
      result = service.spaceMapping[event['format']]/service.spaceGap;
    }else{
      result = service.spaceMapping["default"]/service.spaceGap;
    }
    return result;
  }

  service.getColor = function(event){
      var result;
      if(service.colorMapping[event['format']]){
        result = service.colorMapping[event['format']];
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
