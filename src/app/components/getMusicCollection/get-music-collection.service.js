/**
 * Created by ivan on 4.12.15.
 */
(function(){
  "use strict";

  angular
    .module('getMusicCollection',[])
    .service('getMusicCollectionService',function($http){
       return $http.get('http://vest-labs.herokuapp.com/playlist')
      .then(function(promiseData){
         return promiseData.data;
       })
    });
})();
