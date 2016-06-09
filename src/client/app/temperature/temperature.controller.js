(function() {
  'use strict';

  angular
    .module('app.temperature')
    .controller('TemperatureController', TemperatureController);

  TemperatureController.$inject = ['$q', 'dataservice', 'logger'];
  /* @ngInject */
  function TemperatureController($q, dataservice, logger) {
    var tvm = this;

    activate();

    function activate() {
      logger.info('Activated Temperature View');
    }
  }
})();
