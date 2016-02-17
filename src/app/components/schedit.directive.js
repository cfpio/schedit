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

      vm.handleInput = function(){
        if(vm.input[0] != 9){
          var room = vm.findRoom(vm.input);
          var day = vm.input[0];
          vm.selectedSlot = vm.findSlot(vm.input, room);
        }else{
          console.log("This is a conf")
        }
        vm.input = "";
      }

      vm.findRoom = function(input){
        var trackIndex = input[1];
        return vm.options.rooms[trackIndex-1];
      }

      vm.findSlot = function(input, room){
        var time = ""+input[2]+input[3]+":"+input[4]+input[5];
        var day = room['day'+input[0]];
        var found = false;
        for(key in day){
          console.log(day[key]);
          angular.forEach(day[key],function(slot){
            console.log(''+slot.start+' '+time);
            if(slot.start == time){
              found = slot;
            }
          })
        }
        return found;
      }
    }
  }
})
