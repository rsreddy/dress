(function() {
  'use strict';

  angular
    .module('app.temperature')
    .run(appRun);

  appRun.$inject = ['routerHelper'];
  /* @ngInject */
  function appRun(routerHelper) {
    routerHelper.configureStates(getStates());
  }

  function getStates() {
    return [
      {
        state: 'temperature',
        config: {
          url: '/',
          templateUrl: 'app/temperature/temperature.html',
          controller: 'TemperatureController',
          controllerAs: 'tvm',
          title: 'temperature'
        }
      }
    ];
  }
})();
