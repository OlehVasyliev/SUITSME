import Phaser from 'phaser';
import PreloaderScene from './js/PreloaderScene.js';
import MainScene from './js/MainScene.js';


const gameConfig = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: 864,
    height: 486,
    scale: {
        mode:  Phaser.Scale.ENVELOP,
        autoCenter:  Phaser.Scale.CENTER_BOTH
    },
    scene: null
};


const game = new Phaser.Game(gameConfig);

game.scene.add("Preload", PreloaderScene);
game.scene.add("Main", MainScene);

game.scene.start("Preload");

// window.addEventListener('resize', function (event) {

//     game.scale.resize(window.innerWidth, window.innerHeight);

// }, false);



// Phaser.World.prototype.displayObjectUpdateTransform = function() {
//     if(!game.scale.correct) {
//     this.x = game.camera.y + game.width;
//     this.y = -game.camera.x;
//     this.rotation = Phaser.Math.degToRad(Phaser.Math.wrapAngle(90));
//     } else {
//     this.x = -game.camera.x;
//     this.y = -game.camera.y;
//     this.rotation = 0;
//     }
// }