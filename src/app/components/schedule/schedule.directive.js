angular.module('schedit').directive('scSchedule', function(){
  return {
    templateUrl: 'app/components/schedule/schedule.template.html',
    scope:{
      rooms: '=scRooms',
      nbSpace: '=scNbSpace'
    },
    bindToController:true,
    controllerAs:'schedule',
    controller:function($scope){
      var vm = this;
      vm.spaces= [];
      for(i=0; i<vm.nbSpace; i++){
        vm.spaces.push({status:'empty'});
      }
    }
  }
})
