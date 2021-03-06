/*
 * This is a object for video controller
 * @author BriceChou
 * @datetime 2016-4-22 16:30
 */

var ControlVideo = function() {
  'use strict';

  // change the figure can adjust the range of minimum video playback rate
  const PLAYBACK_RATE = 0.05;

  // change the figure can adjust the range of minimum video volume
  const VIDEO_VOLUME = 0.02;

  // chenge the figure can adjust the range of minimum fastward time
  const FASTWARD_TIME = 0.5;

  // define the video object;
  var video;

  var controlVideo;

  var init = function(videoId) {
    console.log(videoId);
    video = document.getElementById(videoId);
    var playPauseButton = document.getElementById('play-pause');
    var stopButton = document.getElementById('stop');
    var reloadButton = document.getElementById('reload');
    var fastForwardButton = document.getElementById('fast-forward');
    var fastBackwardButton = document.getElementById('fast-backward');
    var muteButton = document.getElementById('mute');
    var increaseVolumeButton = document.getElementById('increase-volume');
    var decreaseVolumeButton = document.getElementById('decrease-volume');
    var speedRateButton = document.getElementById('speed-rate');
    var decelerateRateButton = document.getElementById('decelerate-rate');

    // FIXME : click the button to play or pause the video
    playPauseButton.addEventListener('click', function() {
      if (video.paused) {
        video.play();
        playPauseButton.className = 'button_inset';
      } else {
        video.pause();
        playPauseButton.className = 'button_outset';
      }
    });

    // stop to play video
    stopButton.addEventListener('click', function() {
      video.load();
      if (video.loaded) {
        video.pause();
      }
    });

    // reload the video
    reloadButton.addEventListener('click', function() {
      video.load();
      if (video.loaded) {
        video.play();
      }
    });

    // fast forward the video
    fastForwardButton.addEventListener('click', function() {
      if (video.currentTime < video.duration) {
        video.currentTime += FASTWARD_TIME;
      } else {
        //how to do code
        video.currentTime = video.duration;
      }
    });

    // fast backward the video
    fastBackwardButton.addEventListener('click', function() {
      if (video.currentTime > 0) {
        video.currentTime -= FASTWARD_TIME;
      } else {
        //how to do code
        video.currentTime = 0;
      }
    });

    // mute the video and change the button status
    muteButton.addEventListener('click', function() {
      if (video.muted) {
        video.muted = false;
        muteButton.className = 'button_outset';
      } else {
        video.muted = true;
        muteButton.className = 'button_inset';
      }
    });

    // increase video volume
    increaseVolumeButton.addEventListener('click', function() {
      if (video.volume < 1) {
        video.volume += VIDEO_VOLUME;
      } else {
        video.volume = 1;
      }
    });

    // decrease video volume
    decreaseVolumeButton.addEventListener('click', function() {
      if (video.volume > VIDEO_VOLUME) {
        video.volume -= VIDEO_VOLUME;
      } else {
        video.volume = 0;
      }
    });

    //speed rate to play video
    speedRateButton.addEventListener('click', function() {
      video.playbackRate += PLAYBACK_RATE;
    });

    //decelerate rate to play video
    decelerateRateButton.addEventListener('click', function() {
      video.playbackRate -= PLAYBACK_RATE;
    });

    // video playback failed - show a message saying why
    video.addEventListener('onerror', function() {
      switch (video.error.code) {
        case video.error.MEDIA_ERR_ABORTED:
          alert('You aborted the video playback.');
          break;
        case video.error.MEDIA_ERR_NETWORK:
          alert('A network error caused the video download to fail part-way.');
          break;
        case video.error.MEDIA_ERR_DECODE:
          alert('The video playback was aborted due to a corruption problem or because the video used features your browser did not support.');
          break;
        case video.error.MEDIA_ERR_SRC_NOT_SUPPORTED:
          alert('The video could not be loaded, either because the server or network failed or because the format is not supported.');
          break;
        default:
          alert('An unknown error occurred.');
          break;
      }
    });
  };

  controlVideo = {
    init: init
  };
  return controlVideo;
}();