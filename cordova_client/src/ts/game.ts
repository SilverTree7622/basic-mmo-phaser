import 'phaser';
import Load from './scenes/load';
import Main from './scenes/main';

export default class Game {

    private static type: any = Phaser.AUTO;
    private static mode: any = Phaser.Scale.NONE;
    private width: number = 800;
    private height: number = 600;
    private config: object;
    private self: any;

    constructor(_width?: number, _height?: number) {

        this.width = _width ? _width : this.width;
        this.height = _height ? _height : this.width;

        this.config = {
            type: Game.type,
            scale: {
                mode: Game.mode,
                width: this.width,
                height: this.height
            },
            scene: [ Load, Main ]
        };

        this.self = new Phaser.Game(this.config);

        console.log('config in phaser:', this.config);
        console.log('config in phaser game instance:', this.self);

        return this.self;
    }
}