
import Phaser from 'phaser';
import Load from './client/load.js';
import Main from './client/game.js';


const config = {
    type: Phaser.WEBGL,
    parent: 'game',
    width: 800,
    height: 600,
    scene: [ Load, Main ]
};

var game = new Phaser.Game(config);
