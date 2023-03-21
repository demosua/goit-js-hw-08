import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('iframe');
const player = new Player(iframe);
const VIDEO_SAVED_TIME = 'videoplayer-current-time';

player.on('play', function () {

    const savedTime = localStorage.getItem(VIDEO_SAVED_TIME);
        
    player.setCurrentTime(savedTime).then(function(seconds) {
        seconds = savedTime;
    }).catch(function(error) {
        switch (error.name) {
            case 'RangeError':
                console.log('the time was less than 0 or greater than the video’s duration');
                break;
            default:
                console.log(error.name);
                break;
        }
    });
});
    
player.on('timeupdate', throttle(function() {

    player.getCurrentTime().then(function(seconds) {
        localStorage.setItem(VIDEO_SAVED_TIME, seconds);
    }).catch(function(error) {
        console.log(error.name);
    });
    
}, 1000));
