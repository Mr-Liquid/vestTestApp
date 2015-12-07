/**
 * Created by ivan on 4.12.15.
 */
(function(){
  "use strict";

  angular
    .module('vestTest')
    .directive('musicCollection', function(){
      return {
        restrict: 'E',
        template:[
          '<table class="table table-striped music-collection-table">',
            '<thead><tr>',
              '<th><a href="#" ng-click="sortType = \'Lastplayed\'; sortReverse = !sortReverse">Last Played<span ng-show="sortType == \'Lastplayed\'" class="glyphicon-chevron-down"></span></a></th>',
              '<th><a href="#" ng-click="sortType = \'Artist\';sortReverse = !sortReverse">Artist<span ng-show="sortType == \'Artist\'" class="fa fa-caret-down"></span></a></th>',
              '<th><a href="#" ng-click="sortType = \'Name\'; sortReverse = !sortReverse">Name<span ng-show="sortType == \'Name\'" class="fa fa-caret-down"></span></a></th>',
              '<th><a href="#" ng-click="sortType = \'Genre\'; sortReverse = !sortReverse">Genre<span ng-show="sortType == \'Genre\'" class="fa fa-caret-down"></span></a></th>',
              '<th><a href="#" ng-click="sortType = \'Stars\'; sortReverse = !sortReverse">Stars<span ng-show="sortType == \'Stars\'" class="fa fa-caret-down"></span></a></th>',
            '<tr></thead>',
            '<tbody><tr ng-repeat="list in playlist | orderBy:sortType:sortReverse" ng-click="getActiveRow(list)">',
              '<td>{{list.Lastplayed}}</td>',
              '<td>{{list.Artist}}</td>',
              '<td>{{list.Name}}</td>',
              '<td>{{list.Genre}}</td>',
              '<td>{{list.Stars}}</td>',
            '</tr></tbody>',
          '</table>'
        ].join(''),
        scope: {
          playlist: '=',
          activeRow: '='
        },
        link: function(scope, elem, attrs){
            scope.sortType     = 'Artist';
            scope.sortReverse  = false;
            scope.getActiveRow = function(list){
              scope.activeRow = list;
            }
        }
      }
  });
})();
