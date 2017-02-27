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
     })
     Array.prototype.push.apply(vm.events, data);
   });

   vm.scheduleOptions = {
     rooms: [{
       id:1,
       name:'Amphi1'
     },{
       id:2,
       name:'Amphi2'
     },{
       id:3,
       name:'Amphi3'
     },{
       id:4,
       name:'Amphi4'
     },{
       id:5,
       name:'Atelier1'
     },{
       id:6,
       name:'Atelier2'
     }],
     time:{
       startDate: "2016-03-23",
       startHour: 7,
       endHour: 20,
       spaceGap: 15 //in minutes : TODO
     }
   }
})
