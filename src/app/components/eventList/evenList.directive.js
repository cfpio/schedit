angular.module('schedit').directive('scEventList', function(){
  return {
    templateUrl: 'app/components/eventList/eventList.template.html',
    scope:{},
    bindToController:true,
    controllerAs:'list',
    controller:function($scope, EventHelper){
      var vm = this;

      $scope.$watch(function() {
        return EventHelper.events;
      }, function(newEvents) {
        vm.events = newEvents;
      }, true);

      vm.spaceGap = EventHelper.spaceGap;
      vm.getNbSpaces = EventHelper.getNbSpaces;



      vm.exportAsJson = function(){
        var jsonString = EventHelper.getEventsAsJson();
        var data = "text/json;charset=utf-8," + encodeURIComponent(jsonString);
        var elem = angular.element();
        console.log(elem);
        console.log(jsonString);
      }
    }
  }
});
