import Phaser from 'phaser';

/**
 * Dress
 * @class Dress
 * @param {Phaser.Game.scene} scene A reference to the currently running game.
 */
export default class Dress extends Phaser.GameObjects.Image {
  constructor(scene, x, y, dуessImg, particleImg) {
    super(scene, x, y, 'frames', dуessImg)
    this.scene = scene;
    this.selected = false;
    scene.add.existing(this.setOrigin(0.5,1).setAlpha(0))
    this.resize();
    this.scene.scale.on('resize', this.resize, this);

    
    this.particles = scene.add.particles(particleImg);



    this.emitter = this.particles.createEmitter({
      x: { min: 78, max: 444 },
      y: { min: 111, max: 486 },
      speedY: { min: -240, max: -380 },
      scale: { start: 0.25, end: 0.15 },
      lifespan: 300,
      quantity: 4,
    }).stop();

  }
  show ()  {
    this.setAlpha(1);
    if (!this.selected) {
      this.emitter.start()
      this.selected = true;
      setTimeout(() => {
        this.emitter.stop()
      }, 300);
    }
  }
  hide ()  {
    this.setAlpha(0);
    this.selected = false;
  } 
  resize ()  {
    let setPositionLandscape = () => {
    }
    let setPositionPortrait = () => {
    }
    if (this.scene.scale.parentSize.width / this.scene.scale.parentSize.height > 0.8) {
      setPositionLandscape();
    } else {
      setPositionPortrait();
    }
  }
  

}
