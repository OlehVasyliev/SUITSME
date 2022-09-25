import Phaser from 'phaser';

/**
 * DressBtn
 * @class DressBtn
 * @param {Phaser.Game.scene} scene A reference to the currently running game.
 */
export default class DressBtn extends Phaser.GameObjects.Container  {
  constructor(scene, x, y, dуessImg, frameImg, index) {
    super(scene, x, y)
    this.scene = scene;
    this.index = index;
    this.selected = false;
    this.dress = this.scene.add.image(0, 0, 'frames', dуessImg);
    this.setSize(this.dress.width, this.dress.height).setInteractive();
    this.frame = this.scene.add.image(0, 0, 'frames', frameImg).setAlpha(0);
    this.clickFx =  this.scene.sound.add('click_fx');
    this.add(this.dress)
    this.add(this.frame)
    scene.add.existing(this)

    this.on('pointerdown', this.activate, this);

    this.resize();
    this.scene.scale.on('resize', this.resize, this);
  }
  activate ()  {
    this.clickFx.play();
    this.scene.setNewDress(this.index);
    const tweenFrame = this.scene.tweens.add({
      targets: this.frame,
      alpha: 1,
      ease: 'Linear.In',
      duration: 100,
    });
    const tweenBtn = this.scene.tweens.add({
      targets: this,
      scale:  this.scale*.9,
      yoyo: true,
      ease: 'Back.Out',
      duration: 150,
    });
  }
  unactive ()  {
    const tweenFrame = this.scene.tweens.add({
      targets: this.frame,
      alpha: 0,
      ease: 'Linear.In',
      duration: 50,
    });
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
