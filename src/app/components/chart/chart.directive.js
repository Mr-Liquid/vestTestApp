/**
 * Created by ivan on 6.12.15.
 */
(function(){
  "use strict";

  angular
    .module('vestTest')
    .directive('d3Chart', function($window){
      return {
        restrict: 'E',
        scope: {
          playlist: '='
        },
        templateUrl: 'app/components/chart/chart.html',
        link : function(scope, elem, attrs){
          var
              stars = [],
              arr2 = {},
              dataSet2,
              popCount = 0,
              rockCount = 0,
              hipHopCount = 0,
              id2,
              color2,
              dataset,
              color1,
              id;

          angular.forEach(scope.playlist, function(pl){
            stars.push(pl.Stars);
          });
          for(var b = 0; b < stars.length; b++){
            if(arr2[stars[b]]!=undefined){
              arr2[stars[b]]++
            }else {
              arr2[stars[b]]=1
            }
          }
          dataSet2 = (function subObject(obj){
            var keys = Object.keys(obj);
            var a = [];
            for(var i = 0; i < keys.length; i++){
              a.push({
                label: keys[i],
                count: obj[keys[i]]
              });
            }
            return a;
          })(arr2);
          id2 = '#chart2';
          color2 = $window.d3.scale.ordinal()
            .range(['#3813FF', '#78A5FA','#00145E', '#000', '#fff']);

          //Pie Genre
          angular.forEach(scope.playlist, function(pl){
            switch (pl.Genre){
              case 'Pop':
                popCount++;
                break;
              case 'Rock':
                rockCount++;
                break;
              case 'Hip Hop':
                hipHopCount++;
                break;
              default:
                break;
            }
          });

          dataset = [
            { label: 'Pop', count: popCount },
            { label: 'Hip Hop', count: hipHopCount},
            { label: 'Rock', count: rockCount }
          ];
          color1 = $window.d3.scale.ordinal()
            .range(['#3813FF', '#78A5FA','#00145E']);
          id = '#chart1';
          function _createPie(dataSet, id, color){
            var width = 200;
            var height = 200;
            var radius = Math.min(width, height) / 2;

            var svg = $window.d3.selectAll( id )
              .append('svg')
              .attr('width', width)
              .attr('height', height)
              .append('g')
              .attr('transform', 'translate(' + (width / 2) +  ',' + (height / 2) + ')');

            var arc = $window.d3.svg.arc()
              .outerRadius(radius);
            var pie = $window.d3.layout.pie()
              .value(function(d) { return d.count; })
              .sort(null);

            var path = svg.selectAll('path')
              .data(pie(dataSet))
              .enter()
              .append('path')
              .attr('d', arc)
              .attr('fill', function(d, i) {
                return color(d.data.label);
              });

            var g = svg.selectAll('g')
              .data(pie(dataSet))
              .enter()
              .append("text")
              .attr("transform", function(d) {
                //d.outerRadius = radius;
                d.innerRadius = radius - 55;
                return "translate(" + arc.centroid(d) + ")";
              })
              .attr("text-anchor", "middle")
              .style("fill", "#fff")
              .style("font", "bold 14px Arial")
              .text(function(d, i) { return dataSet[i].label; });
          }

          _createPie(dataSet2, id2, color2);
          _createPie(dataset, id, color1);
        }
      }
    });
})();
