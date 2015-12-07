/**
 * Created by ivan on 5.12.15.
 */
(function(){
  angular.module('tweetModule',[])
    .directive('tweet',
      function ($window, $location, $timeout) {
        return {
          restrict: 'A',
          scope: {
            tweet: '=',
            tweetUrl: '='
          },

          link: function (scope, element, attrs) {
            if (!$window.twttr) {
              // Load Twitter SDK if not already loaded
              getScript('https://platform.twitter.com/widgets.js', function () {
                renderTweetButton();
              });
            } else {
              renderTweetButton();
            }

            var watchAdded = false;
            function renderTweetButton() {
              if (!scope.tweet && !watchAdded) {
                watchAdded = true;
                var unbindWatch = scope.$watch('tweet', function (newValue, oldValue) {
                  if (newValue) {
                    renderTweetButton();
                    unbindWatch();
                  }
                });
                return;
              } else {
                element.html('<a style="margin-top: 0;" href="https://twitter.com/share" class="twitter-share-button" data-text="' + scope.tweet + '" data-url="' + (scope.tweetUrl || $location.absUrl()) + '">Tweet</a>');
                $window.twttr.widgets.load(element.parent()[0]);
              }
            }
            function getScript(url,success){
              var
                  s = document.createElement('script'),
                  c = document.getElementsByTagName('script')[0],
                  done = false;
              s.type = 'text/javascript';
              s.defer = "defer";
              s.async = true;
              s.src = url;
              s.onload = s.onreadystatechange = function(){
                if ( !done && (!this.readyState ||
                  this.readyState == "loaded" || this.readyState == "complete") ) {
                  done = true;
                  success();
                }
              };
              c.parentNode.insertBefore(s, c);
            }

          }
        };
      }
    );
})();
