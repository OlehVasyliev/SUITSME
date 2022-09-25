import Phaser from 'phaser';
import Dress from './Dress.js';

/**
 * Person
 * @class Person
 * @param {Phaser.Game.scene} scene A reference to the currently running game.
 */
class Person {
  constructor(scene, x, y) {
    this.scene = scene;

    this.selectedLook = 'def';
    this.dress = [];
    this.sadFace = [];
    this.btnScale = 0.35;
    this.btnSize = 240;
    this.looksLenght = 5;

    this.personLookWrap = scene.add.container(x, y);
    this.personLookBtnWrap = scene.add.container(scene.scale.width - (this.btnSize*this.btnScale+10)/2, (scene.scale.height/2) - (Math.ceil((this.looksLenght/2)*(this.btnSize*this.btnScale+10)))/2 );
    this.personLookWrap.subject = scene.add.image(30, 0, 'frames', 'subject').setOrigin(0.5,1).setScale(1);
    this.personLookWrap.personLookDef = scene.add.image(0, 0, 'frames', 'main_look_def').setOrigin(0.5,1).setAlpha(1);
    this.personLookWrap.add(this.personLookWrap.subject);
    this.personLookWrap.add(this.personLookWrap.personLookDef);
  
   


      


    for (let i = 0; i <= this.looksLenght-1; i++) {
      this.dress[i] = new Dress(scene, 0, 0, `main_look_${[i]}`, `particle_${i}`);
      this.sadFace[i] = this.scene.add.image(29, -377, 'frames', `sad_face_${[i]}`).setAlpha(0);
      this.personLookWrap.add(this.dress[i]);
      this.personLookWrap.add(this.sadFace[i]);
    }

    
    this.girlfriend = this.scene.add.image(0, 0, 'frames', 'girlfriend').setOrigin(-0.5,1).setAlpha(0);
    this.personLookWrap.add(this.girlfriend);


    this.personLookBtnWrap.setAlpha(0)



  }


  selectDress (i)  {
    this.dress[i].show();
    if (this.selectedLook != i) {
      if(this.selectedLook != 'def'){
        this.dress[this.selectedLook].hide();
      }
      this.personLookWrap.personLookDef.setAlpha(0);
      this.selectedLook = i;
    }
  }

  finalDialog (sadFaceIndex) {
    
    this.sadFace[sadFaceIndex].setAlpha(1);
    
    this.scene.tweens.add({
        targets: this.girlfriend,
        alpha: 1,
        ease: 'Power1',
        duration: 300,
    });



  }

  resize ()  {
    let setPositionLandscape = () => {
      this.personLookWrap.scale= 1;
      this.personLookWrap.setPosition(this.scene.scale.width*0.279, this.scene.scale.height)
      this.personLookBtnWrap.setPosition(this.scene.rightFrame - (this.btnSize*this.btnScale+10)*1.9, 110)
      
    }
    let setPositionPortrait = () => {
      this.personLookWrap.scale = 0.85;
      this.personLookWrap.x = this.scene.leftFrame+43;
      this.personLookBtnWrap.setPosition(this.scene.rightFrame - (this.btnSize*this.btnScale+10)/2, 110)

    }


    if (this.scene.scale.parentSize.width / this.scene.scale.parentSize.height > 0.8) {
      setPositionLandscape();
    } else {
      setPositionPortrait();
    }
  }
  

}

export default Person;