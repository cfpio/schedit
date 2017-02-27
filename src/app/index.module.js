(function() {
  'use strict';

  angular
    .module('schedit', ['ang-drag-drop'])
    .config(['$httpProvider', function($httpProvider) {
      $httpProvider.defaults.withCredentials = true;
    }]);

})();
