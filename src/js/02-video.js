import Player from '@vimeo/player';
import throttle from 'lodash.throttle';
import locStorage from "./storage.js";

const iframe = document.querySelector('iframe');
const player = new Player(iframe);
const VIDEO_SAVED_DATA = 'videoplayer-current-time';

player.setCurrentTime(locStorage.load(VIDEO_SAVED_DATA)).then(function(data) {

    }).catch(function(error) {
    switch (error.name) {
        case 'RangeError':
            // console.log('the time was less than 0 or greater than the video’s duration');
        break;
        default:
            // console.log(error.name);
        break;
    }
});

player.on('timeupdate', throttle(function () {
    player.getCurrentTime().then(function(data) {
        locStorage.save(VIDEO_SAVED_DATA, data);
    }).catch(function(error) {
        console.log(error.name);
    });
}, 1000));
