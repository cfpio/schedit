angular.module('schedit').controller('IndexController', function($http){
   var vm = this;

   $http.get('app/shedule.json').success(function(data){
     vm.events = data;
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
     nbSpace:96,
   }
})
