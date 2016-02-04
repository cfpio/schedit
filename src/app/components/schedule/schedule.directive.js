angular.module('schedit').directive('scSchedule', function(){
  return {
    templateUrl: 'app/components/schedule/schedule.template.html',
    scope:{
      rooms: '=scRooms',
      time: '=scTime'
    },
    bindToController:true,
    controllerAs:'schedule',
    controller:function($scope,EventHelper){
      var vm = this;
      EventHelper.spaceGap = vm.time.spaceGap;

      var initSchedule = function(){
        vm.nbSpace = ((24 - vm.time.startHour - (24 - vm.time.endHour))*60) / vm.time.spaceGap;
        vm.gapPerHour = 60/(vm.time.spaceGap);
        vm.gaps = []
        for(var i=0; i<vm.gapPerHour; i++){
          vm.gaps.push(i*vm.time.spaceGap);
        }
        console.log(vm.gaps);
        for(var j=0; j<vm.rooms.length; j++){
          var room = vm.rooms[j];
          room.spaces = [];
          for(var i=0; i<vm.nbSpace; i++){
            room.spaces.push({empty:true, canDrop:true});
          }
        }
      }

      var canDrop = function(list, index, nbSpace){
          for(var i=0; i<nbSpace; i++){
            if(list[index+i]){
              if(!list[index+i].empty){
                return false;
              }
            }
          }
          return true;
      }

      $scope.$on('ANGULAR_DRAG_START',function(event,originEvent,channel,data){
        var nbSpace = EventHelper.getNbSpaces(data.data);
        for(var j=0; j<vm.rooms.length; j++){
          var room = vm.rooms[j];
          for(var i=0; i<room.spaces.length; i++){
            room.spaces[i].canDrop = canDrop(room.spaces, i, nbSpace);
          }
        }
      })

      $scope.$on('ANGULAR_DRAG_END',function(event,originEvent,channel){
        for(var j=0; j<vm.rooms.length; j++){
          var room = vm.rooms[j];
          for(var i=0; i<room.spaces.length; i++){
            room.spaces[i].canDrop = true;
          }
        }
        $scope.$apply();
      })

      vm.getNbSpaces = EventHelper.getNbSpaces;

      vm.setEvent = function(list, index, data){
        var nbSpace = EventHelper.getNbSpaces(data);
        for(var i=0; i<nbSpace; i++){
          data.scheduled = true;
          list[index+i].event = data;
          list[index+i].empty = false;
        }
        EventHelper.updateEvent(data);
      }

      initSchedule();
    }
  }
})
