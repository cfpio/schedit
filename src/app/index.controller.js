angular.module('schedit').controller('IndexController', function($http){
   var vm = this;
   vm.events = [];

   $http.get('https://api.cfp.io/v0/admin/sessions/export/sched.json?states=ACCEPTED').success(function(data){
     angular.forEach(data,function(event){
       event.scheduled = false;
       delete event.venue;
       delete event.venue_id;
       delete event.event_start;
       delete event.event_end;

       vm.events.push(event);
     });
   });

   vm.scheduleOptions = {
     rooms: [{
       id:1,
       name:'RoomA'
     },{
       id:2,
       name:'RoomB'
     },{
       id:3,
       name:'RoomC'
     },{
       id:4,
       name:'RoomD'
     },{
       id:5,
       name:'Lab'
     }],
     time:{
       startDate: "2017-04-19",
       startHour: 8,
       endHour: 21,
       spaceGap: 15 //in minutes : TODO
     }
   }
});
