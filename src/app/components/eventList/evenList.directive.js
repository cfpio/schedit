angular.module('schedit').directive('scEventList', function(){
  return {
    templateUrl: 'app/components/eventList/eventList.template.html',
    scope:{
      events: '=scEvents'
    },
    bindToController:true,
    controllerAs:'list',
    controller:function($scope){
      var vm = this;
      $scope.$watch(function(){
        return vm.events;
      }, function(){
        console.log(vm);
      })
    }
  }
})
