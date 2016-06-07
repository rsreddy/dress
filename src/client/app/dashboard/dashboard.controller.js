(function() {
  'use strict';

  angular
    .module('app.dashboard')
    .controller('DashboardController', DashboardController);

  DashboardController.$inject = ['$q', 'dataservice', 'logger'];
  /* @ngInject */
  function DashboardController($q, dataservice, logger) {
    var vm = this;
    vm.news = {
      title: 'mausam',
      description: 'Hot Towel Angular is a SPA template for Angular developers.'
    };
    vm.messageCount = 0;
    vm.attire = [];
    vm.title = 'Dashboard';

    activate();

    function activate() {
      var promises = [getMessageCount(), getAttire()];
      return $q.all(promises).then(function() {
        logger.info('Activated Dashboard View');
      });
    }

    function getMessageCount() {
      return dataservice.getMessageCount().then(function(data) {
        vm.messageCount = data;
        return vm.messageCount;
      });
    }

    function getAttire() {
      return dataservice.getAttire().then(function(data) {
        vm.attire = data;
        return vm.attire;
      });
    }
  }
})();
