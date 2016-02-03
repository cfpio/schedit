angular.module('schedit').directive('scSchedit', function(){
  return {
    templateUrl: 'app/components/schedit.template.html',
    scope:{
      events: '=scEvents',
      options: '=scOptions'
    },
    bindToController:true,
    controllerAs:'schedit',
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
