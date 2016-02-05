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
        for(var j=0; j<vm.rooms.length; j++){
          var room = vm.rooms[j];
          room.spaces = [];
          for(i=0; i<vm.nbSpace; i++){
            room.spaces.push({empty:true, canDrop:true, first:true});
          }
        }
      }

      var canDrop = function(list, index, nbSpace){
          if(list.length < index+nbSpace){
            return false
          }
          for(var i=0; i<nbSpace; i++){
            if(list[index+i] && !list[index+i].empty){
              return false;
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

      $scope.$on('ANGULAR_DRAG_END',function(){
        for(var j=0; j<vm.rooms.length; j++){
          var room = vm.rooms[j];
          for(var i=0; i<room.spaces.length; i++){
            room.spaces[i].canDrop = true;
          }
        }
        $scope.$apply();
      })

      vm.getNbSpaces = EventHelper.getNbSpaces;

      formatDate = function(index) {
        var hourMin = vm.time.startHour + (index * 15)/60
        var hour = parseInt(hourMin);
        var min = (hourMin - hour) * 60;
        return vm.time.startDate + " " + (hour<10 ? "0": "") + hour + ":" + (min<10 ? "0": "") + min + ":00";
      }

      vm.getColor = function(event){
        if(event){
          return EventHelper.getColor(event);
        }
      }

      vm.clearEvent = function(list, index){
        var data = list[index].event;
        var nbSpace = EventHelper.getNbSpaces(list[index].event);
        data.scheduled = false;
        data.venue = undefined;
        data.venue_id = undefined;
        data.event_start = undefined;
        data.event_end = undefined;
        EventHelper.updateEvent(data);
        console.log(data);
        for(var i=0; i<nbSpace; i++){
          list[index+i].first = true;
          list[index+i].event = undefined;
          list[index+i].empty = true;
        }

      }

      vm.getSpaceClasses = function(space, index){

        var classes = "";

        if(!space.canDrop){
          classes+=" danger"
        }
        if(space.first){
          classes+=" add-top";
        }
        if(space.event){
          classes+=" with-event";
        }
        if(index%vm.gapPerHour === 0){
          classes+=" big-top";
        }else{
          classes+=" thin-top";
        }
        return classes;
      }

      vm.setEvent = function(room, index, data){
        var nbSpace = EventHelper.getNbSpaces(data);
        var list = room.spaces;
        data.scheduled = true;
        data.venue = room.name;
        data.venue_id = room.id;
        data.event_start = formatDate(index);
        data.event_end = formatDate(index + EventHelper.getNbSpaces(data));
        console.log(data);
        for(var i=0; i<nbSpace; i++){
          list[index+i].first = (i===0);
          list[index+i].event = data;
          list[index+i].empty = false;
        }
        EventHelper.updateEvent(data);
      }

      initSchedule();
    }
  }
})
