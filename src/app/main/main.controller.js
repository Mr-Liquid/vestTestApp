(function() {
  'use strict';

  angular
    .module('vestTest')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController($timeout, $scope, toastr, getMusicCollectionService, $document, $window) {
    var vm = this;
    vm.spinner = true;
    getMusicCollectionService.then(function(promiseData){
      vm.playlist = promiseData;
    }).catch(function(err){
      vm.alerts = [
        { type: 'danger', msg: 'Oh snap! Something went wrong please restart page.' }
      ];
      vm.closeAlert = function(index) {
        vm.alerts.splice(index, 1);
      };
    }).finally(function () {
      $timeout(function(){
        vm.spinner = false;
      },1000);
    });

    vm.activeRow = {};

  }
})();
