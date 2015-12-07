/**
 * Created by ivan on 5.12.15.
 */
(function(){
  "use strict";

  angular
    .module('vestTest')
    .value('covers',{
      images: [
        'https://avatars.yandex.net/get-music-content/31ed6d91.a.1910403-1/200x200',
        'https://avatars.yandex.net/get-music-content/595d519b.a.2000237-1/200x200',
        'https://avatars.yandex.net/get-music-content/b5dbf92d.a.215501-1/200x200',
        'https://avatars.yandex.net/get-music-content/4f2ec925.a.35232-1/200x200',
        'https://avatars.yandex.net/get-music-content/b98d4040.a.34215-1/200x200',
        'https://avatars.yandex.net/get-music-content/de07a145.a.56642-1/200x200',
        'https://avatars.yandex.net/get-music-content/d089941b.a.77080-1/200x200'
      ]
    })
    .directive('description',function(covers, $window, $timeout){
      return {
        restrict: 'E',
        scope: {
          activeRow: '='
        },
        templateUrl: 'app/components/description/description.html',
        link: function(scope, elem, attrs){
          scope.comments = {};
          scope.activeRow.comments = [];

          scope.$watch('activeRow.Artist', function(artist){
            var saved;

            scope.spinner = true;
            $timeout(function(){
              if(artist){
                 saved = JSON.parse($window.localStorage.getItem('comments-' + artist));
                if(saved){
                  scope.activeRow.comments = saved.comments;
                }
              }
              scope.coverSrc = covers.images[Math.floor(Math.random() * covers.images.length)];
              if(!scope.activeRow.comments){
                scope.activeRow.comments = [];
              }
              scope.spinner = false;
            }, 500);
          });
          scope.saveComment = function(comment){
            if(comment === '' || !comment){
              return;
            }
            scope.activeRow.comments.push({
              comment: comment
            });
            $window.localStorage.setItem('comments-' + scope.activeRow.Artist , JSON.stringify(scope.activeRow));
            scope.comment = comment;
            scope.comments.comment = '';
          }
        }
      }
    });
})();
