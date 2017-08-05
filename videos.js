/*global window: false */
/*jslint browser: true */
(function() {
"use strict";

  window.videos = [];

  jQuery.getJSON('/videos.php', function(jsonData) {
    window.videos = jsonData;

});

function pickRandom(items) {
  return items[Math.floor(Math.random()*items.length)];
}

function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

function getAnchorGame() {
  var qVal = parseInt(getParameterByName('g'));
  if (!isNaN(qVal) && qVal < videos.length) {
    return videos[qVal];
  }
  var hashVal = window.location.hash.substr(1);
  hashVal = parseInt(hashVal);
  if (!isNaN(hashVal) && hashVal < videos.length) {
    return videos[hashVal];
  }
}

function annotateVideos() {
  for (var i=0; i < videos.length; ++i) {
    (function(i) {
      videos[i].next = function next() {
        return videos[(i+1) % videos.length];
      };
      videos[i].index = i;
    })(i);
  }
}

function getYoutubePlayer() {
  if (window.Videos._playerPromise) {
    return window.Videos._playerPromise;
  }
  var player;
  var gameState = getAnchorGame() || pickRandom(videos);
  console.log(gameState.videoId);

  var promise = new Promise(function (resolve, reject) {
      window.onYouTubeIframeAPIReady = function() {
      player = new window.YT.Player('player', {
        height: '480',
        width: '854',
        videoId: gameState.videoId,
        playerVars: {
          controls: 0,
          rel: 0,
          showinfo: 0,
          playsinline: 1,
          modestbranding: 1,
          fs: 0,
          html5: 1,
          autoplay: 1
        },
        events: {
          'onReady': function youtubeReady(e) {
              resolve([player, gameState]);
          },
          'onError': function (e) {
              reject(e);
          }
        }
      });
    };
  });

  var tag = document.createElement('script');
  tag.src = "https://www.youtube.com/iframe_api";
  var firstScriptTag = document.getElementsByTagName('script')[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
  return promise;
}
annotateVideos();
window.Videos = {
  _playerPromise: undefined,
  getYoutubePlayer: getYoutubePlayer
};
window.Videos._playerPromise = getYoutubePlayer();

})();
