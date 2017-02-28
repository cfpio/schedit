angular.module('schedit').controller('IndexController', function(TalkService, RoomService, EventService){
  var vm = this;
  vm.events = [];
  vm.scheduleOptions = {
    rooms: [],
    days: [],
    time:{
      startDate: "2017-04-19",
      startHour: 8,
      endHour: 21,
      spaceGap: 15 //in minutes : TODO
    }
  }

  TalkService.getAcceptedOrConfirmed().success(function(data){
    var cleanedData = data.forEach(function(event){
      console.log("event="+event);
      event.scheduled = false;
      delete event.venue;
      delete event.venue_id;
      delete event.event_start;
      delete event.event_end;
      return event
    });
    vm.events = cleanedData
  });

  RoomService.getRooms().success(function(data){
    console.log("rooms=", data);
    vm.scheduleOptions.rooms = data;
  });


  EventService.getEvent().success(function(data){
    vm.scheduleOptions.time.startDate = data.date;
    console.log("startDate="+data.date + " days="+data.duration);
    for (i = 0; i < data.duration; i++) {
      vm.scheduleOptions.days.push('Day '+i);
    }
  });


});
