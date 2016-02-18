(function() {
  'use strict';

  angular
    .module('schedit', ['ang-drag-drop'])
    .run(['$anchorScroll', function($anchorScroll) {
      $anchorScroll.yOffset = 50;   // always scroll by 50 extra pixels
    }])
})();
