import Phaser from 'phaser';
import DressBtn from './DressBtn.js';

/**
 * Selector
 * @class Selector
 * @param {Phaser.Game.scene} scene A reference to the currently running game.
 */
  export default class Selector extends Phaser.GameObjects.Container {
  constructor(scene, x, y) {
    super(scene, x, y)
    scene.add.existing(this)
    this.started = 0;
    this.scene = scene;
    this.array = [];
    this.frame = [];
    this.looksBtnActiveFrameArray = [];
    this.btnScale = 0.35;
    this.btnSize = 240;
    this.looksLenght = 5;
    
    for (let i = 0; i <= this.looksLenght-1; i++) {
      this.array[i] = new DressBtn(this.scene, 0, 0, `main_look_btn_${i}`, `main_look_btn_active_frame`, i);
      this.add(this.array[i])
    }
    setTimeout(() => {
      
      this.resize();
      this.scene.scale.on('resize', this.resize, this);
    });



  }
  unactiveSelectors () {
    this.array.forEach(el => el.unactive());
    clearInterval(this.fingerInterval)

    this.scene.tweens.add({
      targets: this.finger, 
      alpha: 0,
      duration: 100
    })
  }
  showSelectors () {
    this.started = 1;
    this.array.forEach((el, i) => {
      setTimeout(() => {
        const tween = this.scene.tweens.add({
          targets: el,
          scale:  () => {
            if (this.scene.scale.parentSize.width / this.scene.scale.parentSize.height > 0.8) {
              return this.btnScale*1.2
            } else{
              return this.btnScale*0.85
            }
          },
          ease: 'Back.Out',
          duration: 400,
        });
      }, 50*(this.looksLenght-i));
    });
  }


  startTutorial() {
    this.finger = this.scene.add.image(400, 300, 'frames', 'finger').setScale(0.7).setAlpha(1);
    this.add(this.finger)
    this.positinFinger = {
      x: (i) => this.array[i].x + this.array[i].width * 0.7 * this.array[i].scale - 15,
      y: (i) => this.array[i].y + this.array[i].width * 0.7 * this.array[i].scale
    };
    let selectedItem = 0;
    let duratuonFingerMoving = 700;
    this.fingerInterval = setInterval(() => {
      this.scene.tweens.add({
        targets: this.finger,
        props: {
            x: { value: () => this.array[selectedItem].x + this.array[selectedItem].width * 0.7 * this.array[selectedItem].scale - 15, ease: 'Power1' },
            y: { value: () => this.array[selectedItem].y + this.array[selectedItem].height * 0.7 * this.array[selectedItem].scale, ease: 'Power3' },
        },
        duration: duratuonFingerMoving,
      })
      setTimeout(() => {
        this.scene.tweens.add({
          targets: this.finger, 
          scale: this.finger.scale*0.9,
          x: this.finger.x-5,
          y: this.finger.y-5,
          yoyo: true,
          duration: duratuonFingerMoving*0.1
        })
      }, duratuonFingerMoving*0.8);

      selectedItem++
      if (this.looksLenght == selectedItem) selectedItem = 0;
    }, duratuonFingerMoving*1.1);

  }



  resize ()  {
    let setPositionLandscape = () => {
      for (let i = 0; i <= this.looksLenght-1; i++) {
        this.array[i].setScale(this.btnScale*1.2)
        const notLastBtn = (i+1)%this.looksLenght;
        const btnX = ((this.looksLenght%2) && !notLastBtn) && (this.btnSize*this.btnScale+10)/2 || ((i+1)%2) * (this.btnSize*this.btnScale+10);
        const btnY = Math.ceil((i+1)/2) * (this.btnSize*this.btnScale+10) - (this.btnSize*this.btnScale+10)/2;
        this.array[i].setPosition(btnX*1.2, btnY*1.2)
    
        if(!this.started)
          this.array[i].setScale(0)
      }
      this
          .setPosition(this.scene.rightFrame - (this.btnSize*this.btnScale+10)*1.65, 130)
          .setScale(0.85);
    }
    let setPositionPortrait = () => {
      for (let i = 0; i <= this.looksLenght-1; i++) {
        this.array[i].setScale(this.btnScale*0.85);
        const notLastBtn = (i+1)%this.looksLenght;
        const btnX = ((this.looksLenght%2) && !notLastBtn) && (this.btnSize*this.array[i].scale+10)/2 || ((i+1)%2) * (this.btnSize*this.array[i].scale+10);
        const btnY = i * (this.btnSize*this.array[i].scale+10);
        this.array[i].setPosition(0,btnY);
        if(!this.started)
          this.array[i].setScale(0);
      }

      this
          .setPosition(this.scene.rightFrame - (this.btnSize*this.btnScale+10)/2, 128)
          .setScale(0.85);
    }



    if (this.scene.scale.parentSize.width / this.scene.scale.parentSize.height > 0.8) {
      setPositionLandscape();
    } else {
      setPositionPortrait();
    }
  }
  

}
