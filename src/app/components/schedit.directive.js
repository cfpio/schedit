angular.module('schedit').directive('scSchedit', function($anchorScroll){
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
        if(vm.input === "export"){
          vm.exportSchedule();
          console.log('export');
        }else if(vm.input[0] != 9){
          vm.room = vm.findRoom(vm.input);
          vm.day = vm.input[0];
          vm.venue = vm.input[1];
          vm.selectedSlot = vm.findSlot(vm.input, vm.room);
        }else{
          var id = parseInt(vm.input.slice(1,6));
          vm.selectedConf = vm.getConfById(id);
          console.log(vm.selectedConf);
        }
        if(vm.selectedConf && vm.selectedSlot){
          vm.associateConfSlot(vm.day,vm.selectedConf,vm.selectedSlot);
          vm.selectedSlot = undefined;
          vm.selectedConf = undefined;
        }
        vm.input = "";
      }

      var addDays = function(events,day){
        for(key in day){
          for(var i = 0; i< day[key].length;i++){
            if(day[key][i].conf){
              events.push(day[key][i].conf);
            }
          }
        }

      }

      vm.exportSchedule = function(){
        var events = [];
        for(var i = 0; i < vm.options.rooms.length; i++){
          var room = vm.options.rooms[i];
          addDays(events,room.day1);
          addDays(events,room.day2);
          addDays(events,room.day3);
        }
        var blob = new Blob([JSON.stringify(events)], {type: "application/json"});
        var url = (window.URL || window.webkitURL).createObjectURL( blob );
        var downloadLink = angular.element('<a></a>');
        downloadLink.attr('href',window.URL.createObjectURL(blob));
        downloadLink.attr('download', 'BreizhCamp_Schedule.json');
  			downloadLink[0].click();
        downloadLink.remove();
      }

      vm.associateConfSlot = function(day,conf,slot){
        var date = vm.getDayDate(day);
        conf['event_start'] = date +'T'+ slot.start+':00';
        conf['event_end'] = date +'T'+ slot.end+':00';
        conf['venue'] = vm.room.name;
        conf['venue_id'] = vm.room.id;
        slot.conf = conf;
      }

      vm.getDayDate = function(day){
        if(day == 1){
          return "2016-04-23";
        }
        if(day == 2){
          return "2016-04-24";
        }
        if(day == 3){
          return "2016-04-25";
        }
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
              $anchorScroll(key);
            }
          })
        }
        return found;
      }

      vm.getConfById = function(id){
        for(var i=0; i<vm.events.length; i++){
          if(vm.events[i].id === id){
            return vm.events[i];
          }
        }
      }
    }
  }
})
