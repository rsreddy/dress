(function() {
  'use strict';

  angular
    .module('app.core')
    .factory('dataservice', dataservice);

  dataservice.$inject = ['$http', '$q', 'exception', 'logger'];
  /* @ngInject */
  function dataservice($http, $q, exception, logger) {
    var service = {
      getAttire: getAttire,
      results: results
    };

    return service;

    function results(outfit) {
      return $http.post('/api/attire', outfit)
        .then(success)
        .catch(fail);

      function success(response) {
        return response.data;
      }

      function fail(e) {
        return exception.catcher('XHR Failed for getAttire')(e);
      }
    }

    function getAttire(temperature) {
      return $http.get('/api/' + temperature)
        .then(success)
        .catch(fail);

      function success(response) {
        return response.data;
      }

      function fail(e) {
        return exception.catcher('XHR Failed for getAttire')(e);
      }
    }
  }
})();
