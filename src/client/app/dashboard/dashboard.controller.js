(function() {
  'use strict';

  angular
    .module('app.dashboard')
    .controller('DashboardController', DashboardController);

  DashboardController.$inject = ['$q', '$scope', 'dataservice', 'logger'];
  /* @ngInject */
  function DashboardController($q, $scope, dataservice, logger) {
    var vm = this;
    vm.news = {
      title: 'mausam',
      description: 'Hot Towel Angular is a SPA template for Angular developers.'
    };
    vm.title = 'Dashboard';
    vm.formData = {
      temperature: '',
      postOpts: [],
      results: []
    };
    vm.setSelected = setSelected;
    vm.attire = [];
    vm.submit = submit;

    activate();

    function activate() {
      logger.info('Activated Dashboard View');
      $scope.$watch('formData.temperature', function(value) {
        vm.formData.temperature = value;
        return dataservice.getAttire(value).then(function(data) {
          vm.options = data;
          return vm.options;
        });
      });
    }

    function submit() {
      vm.attire.unshift(vm.formData.temperature);
      return dataservice.results({outfit : vm.attire}).then(function(data) {
        vm.formData.results = data.data;
        return vm.formData.results;
      });
    }

    function setSelected(item) {
      vm.formData.postOpts.push(item);
      vm.attire = vm.formData.postOpts;
      logger.info(item + ' added to array!');
    }
  }
})();
