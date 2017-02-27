angular.module('schedit').controller('IndexController', function($http){
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

  $http.get('https://api.cfp.io/v0/admin/sessions/export/sched.json?states=ACCEPTED,CONFIRMED').success(function(data){
    angular.forEach(data,function(event){
      console.log("event="+event);
      event.scheduled = false;
      delete event.venue;
      delete event.venue_id;
      delete event.event_start;
      delete event.event_end;

      vm.events.push(event);
    });
  });

  $http.get('https://api.cfp.io/v0/rooms').success(function(data){
    console.log("rooms="+data);
    vm.scheduleOptions.rooms.push(data);
  });


  $http.get('https://api.cfp.io/v0/application').success(function(data){
    vm.scheduleOptions.time.startDate = data.date;
    console.log("startDate="+data.date + " days="+data.duration);
    for (i = 0; i < data.duration; i++) {
      vm.scheduleOptions.days.push('Day '+i);
    }
  });


});
