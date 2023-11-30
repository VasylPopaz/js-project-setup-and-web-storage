import Player from '@vimeo/player';
import throttle from 'lodash.throttle';
const iframe = document.querySelector('iframe');
const player = new Player(iframe);
player.on(
  'timeupdate',
  throttle(function (getTime) {
    localStorage.setItem('videoplayer-current-time', getTime.seconds);
  }, 1000)
);
const savedTime = localStorage.getItem('videoplayer-current-time');
if (!savedTime) return;
player.setCurrentTime(savedTime);
