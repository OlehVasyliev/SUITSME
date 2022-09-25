import Phaser from 'phaser';

/**
 * Dialogs
 * @class Dialogs
 * @param {Phaser.Game.scene} scene A reference to the currently running game.
 */
  export default class Dialogs extends Phaser.GameObjects.Container {
  constructor(scene, x, y) {
    super(scene, scene.scale.width/2, scene.scale.height/2);
    scene.add.existing(this);
    this.scene = scene;
    


    // this.btnStart = this.scene.add.image(this.scene.scale.width/2, this.scene.scale.height*0.8,'btnStart')

    this.startBoard = this.scene.add.container(0,0);
    this.add(this.startBoard);
    this.btnStart = this.scene.add.image(0, 160, 'frames', 'btnStart').setAlpha(0).setScale(0).setOrigin(0.5,0.5);
    this.startBoard.add(this.btnStart);
    this.dialog_0 = this.scene.add.image(-10, -100, 'frames', 'dialog_0').setScale(0.5).setOrigin(0.5,0);
    this.dialog_0.scaleY = 0
    this.startBoard.add(this.dialog_0);
    this.fingerStartWrap = this.scene.add.container(180, 180);
    this.startBoard.add(this.fingerStartWrap);
    this.fingerStart = this.scene.add.image(0, 0, 'frames', 'finger').setAlpha(0);
    this.fingerStartWrap.add(this.fingerStart);





    this.finalBoard = this.scene.add.container(0,0);
    this.add(this.finalBoard);
    this.btnTryAgain = this.scene.add.image(0, 160, 'frames', 'btnTryAgain').setAlpha(0).setScale(0).setOrigin(0.5,0.5).setInteractive();
    this.btnTryAgain.on('pointerdown', () => alert('Link To Download SUITSME'))
    this.finalBoard.add(this.btnTryAgain);

    
    this.dialogFail = this.scene.add.image(-10, -100, 'frames', 'dialog_fail').setScale(0.5, 0).setOrigin(0.5,0);
    this.startBoard.add(this.dialogFail);
    
    this.failSticker = this.scene.add.image(-10, -100, 'frames', 'fail').setScale(5).setAlpha(0).setRotation(-0.2).setOrigin(0.5,0);
    this.startBoard.add(this.failSticker);

    this.fingerFinaltWrap = this.scene.add.container(180, 180);
    this.finalBoard.add(this.fingerFinaltWrap);
    this.fingerFinal = this.scene.add.image(0, 0, 'frames', 'finger').setAlpha(0);
    this.fingerFinaltWrap.add(this.fingerFinal);

    setTimeout(() => {
      this.resize();
      this.scene.scale.on('resize', this.resize, this);
    });


      
    this.btnStart.setInteractive();
    this.btnStart.on('pointerdown', this.preGameHide, this)


    this.preGameShow();
    // this.finalShow();




  }
  preGameShow () {
    setTimeout(() => {
      this.showDialog_0 = this.scene.tweens.add({
        targets: this.dialog_0,
        scaleY:  0.5,
        ease: 'Back.Out',
        duration: 300,
      });
      setTimeout(() => {
        this.showBtnStart = this.scene.tweens.add({
          targets: this.btnStart,
          scale:  1,
          alpha:  1,
          ease: 'Back.Out',
          duration: 300,
        });
        setTimeout(() => {
          this.showFingerStart = this.scene.tweens.add({
            targets: this.fingerStart,
            alpha:  1,
            ease: 'Back.Out',
            duration: 200,
          });
        }, 600);
        this.preGameAnimation ();
      }, 256);
    }, 128);
  }
  preGameAnimation () {
    setTimeout(() => {
      this.rotateBtnTween = this.scene.tweens.add({
        targets: this.btnStart,
        rotation: 0.075,
        yoyo: true,
        ease: function (k) {
          var s, a = 0.1, p = 0.4;
          if ( k === 0 ) return 0;
          if ( k === 1 ) return 1;
          if ( !a || a < 1 ) { a = 1; s = p / 4; }
          else s = p * Math.asin( 1 / a ) / ( 2 * Math.PI );
          return - ( a * Math.pow( 2, 10 * ( k -= 1 ) ) * Math.sin( ( k - s ) * ( 2 * Math.PI ) / p ) );
        },
        duration: 700,
        repeat: Infinity,
      });
      this.scaleBtnTween = this.scene.tweens.add({
        targets: this.btnStart,
        scale:  this.btnStart.scale*1.05,
        yoyo: true,
        ease: 'Power1',
        duration: 300,
        repeat: Infinity,
        hold: 750,
      });
    }, 256);
    setTimeout(() => {
      this.fingerStartTween = this.scene.tweens.add({
        targets: this.fingerStart,
        scale: () => {
          return this.btnStart.scale*1.05;
        },
        x: this.fingerStart.x + 20,
        y: this.fingerStart.y + 30,
        yoyo: true,
        ease: 'Power1',
        duration: 300,
        repeat: Infinity,
        hold: 750,
      });
    }, 130);
    
  }
  preGameHide () {
    this.clickFx =  this.scene.sound.add('click_fx').play();
    this.fingerStart.setVisible(false);
    this.hideStartBoard = this.scene.tweens.add({
      targets: this.btnStart,
      alpha:  0,
      ease: 'Linear',
      duration: 300,
    });
    setTimeout(() => {
      this.hideDialog_0 = this.scene.tweens.add({
        targets: this.dialog_0,
        alpha:  0,
        ease: 'Linear.In',
        duration: 200,
      });
    }, 256);
    setTimeout(() => {
      this.scene.showSelector()
    }, 512);
  }
  finalShow () {
    this.cryingFx =  this.scene.sound.add('crying_fx', {loop: true, volume: 2}).play();
    setTimeout(() => {
      this.showDialogFail = this.scene.tweens.add({
        targets: this.dialogFail,
        scaleY:  0.5,
        ease: 'Back.Out',
        duration: 300,
      });
      setTimeout(() => {
        this.showFailSticker = this.scene.tweens.add({
          targets: this.failSticker,
          scale:  1,
          alpha: 1,
          ease: 'Back.In',
          duration: 600,
        });
        setTimeout(() => {
          this.slapFx =  this.scene.sound.add('slap_fx', {volume: 10}).play();
        }, 600);
      }, 512);
      setTimeout(() => {
        this.showBtnTryAgain = this.scene.tweens.add({
          targets: this.btnTryAgain,
          scale:  1,
          alpha:  1,
          ease: 'Back.Out',
          duration: 300,
        });
        setTimeout(() => {
          this.showFingerFinal = this.scene.tweens.add({
            targets: this.fingerFinal,
            alpha:  1,
            ease: 'Back.Out',
            duration: 200,
          });
        }, 600);
        this.finalAnimation ();
      },1256);
    }, 128);
  }
  finalAnimation () {
    setTimeout(() => {
      this.rotateBtnTryAgainTween = this.scene.tweens.add({
        targets: this.btnTryAgain,
        rotation: 0.075,
        yoyo: true,
        ease: function (k) {
          var s, a = 0.1, p = 0.4;
          if ( k === 0 ) return 0;
          if ( k === 1 ) return 1;
          if ( !a || a < 1 ) { a = 1; s = p / 4; }
          else s = p * Math.asin( 1 / a ) / ( 2 * Math.PI );
          return - ( a * Math.pow( 2, 10 * ( k -= 1 ) ) * Math.sin( ( k - s ) * ( 2 * Math.PI ) / p ) );
        },
        duration: 700,
        repeat: Infinity,
      });
      this.scaleBtnTryAgainTween = this.scene.tweens.add({
        targets: this.btnTryAgain,
        scale:  this.btnTryAgain.scale*1.05,
        yoyo: true,
        ease: 'Power1',
        duration: 300,
        repeat: Infinity,
        hold: 750,
      });
    }, 256);
    setTimeout(() => {
      this.fingerFinaltTween = this.scene.tweens.add({
        targets: this.fingerFinal,
        scale: () => {
          return this.btnTryAgain.scale*1.05;
        },
        x: this.fingerFinal.x + 20,
        y: this.fingerFinal.y + 30,
        yoyo: true,
        ease: 'Power1',
        duration: 300,
        repeat: Infinity,
        hold: 750,
      });
    }, 130);
    
  }


  resize ()  {
    let sideRatio = this.scene.scale.parentSize.width / this.scene.scale.parentSize.height;
    if (sideRatio > 0.8) {
      this.startBoard.scale = 0.8;
      this.btnStart.y = 160;
      this.fingerStartWrap.y = 190;
      this.dialog_0.setPosition(-10, -100)

      
      this.finalBoard.scale = 0.8;
      this.btnTryAgain.y = 160;
      this.fingerFinaltWrap.y = 190;
      this.dialogFail.setPosition(-50, -40)
      this.failSticker.setPosition(0, -140)
    } else {
      this.startBoard.scale = sideRatio;
      this.btnStart.y = 160/sideRatio;
      this.fingerStartWrap.y = 190/sideRatio;
      this.dialog_0.setPosition(70, -50)

      
      this.finalBoard.scale = sideRatio;
      this.btnTryAgain.y = 160/sideRatio;
      this.fingerFinaltWrap.y = 190/sideRatio;
      this.dialogFail.setPosition(20, 10)
      this.failSticker.setPosition(0, -90)
    }
    if (sideRatio > 2.13) {
      this.startBoard.y = -22;
      this.dialog_0.setPosition(-10, -80);

      
      this.finalBoard.y = -22;
    } else {
      this.startBoard.y = 0

      
      this.finalBoard.y = 0
    }
  }
  

}
