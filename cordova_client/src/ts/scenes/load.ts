
import 'phaser';

export default class Load extends Phaser.Scene {
    constructor() {
        super('load');
    }
    preload() {

    }
    create() {
        console.log('Load create end');
        this.scene.start('main');
    }
}