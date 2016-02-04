angular.module('schedit').directive('scEventList', function(){
  return {
    templateUrl: 'app/components/eventList/eventList.template.html',
    scope:{},
    bindToController:true,
    controllerAs:'list',
    controller:function($scope, EventHelper){
      var vm = this;
      vm.events = EventHelper.events;
      vm.spaceGap = EventHelper.spaceGap;
      vm.getNbSpaces = EventHelper.getNbSpaces;
    }
  }
})
