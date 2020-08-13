
import 'phaser';
import PhaserGUIAction from 'phaser3_gui_inspector'

export default class Main extends Phaser.Scene {
    constructor() {
        super('main');
    }
    preload() {
        console.log('Main preload');
    }
    create() {
        console.log('Main create');

        PhaserGUIAction(this);
    }
    update() {

    }
}