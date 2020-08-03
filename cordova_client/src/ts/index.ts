
import Game from './game';

let pGame: any;
const app = {
    // Application Constructor
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
        document.addEventListener('pause', this.onDevicePause.bind(this), false);
        document.addEventListener('resume', this.onDeviceResume.bind(this), false);
    },

    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function () {
        this.startPhaser();
        this.receivedEvent('deviceready');
    },
    onDevicePause: function () {
        console.log('device paused');
    },
    onDeviceResume: function () {
        console.log('device resume');
    },

    startPhaser() {
        pGame = new Game();
        console.log('pGame on device ready:', pGame);
    },

    // Update DOM on a Received Event
    receivedEvent: function (id: any) {
        var parentElement: any = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};

app.initialize();