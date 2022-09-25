import Phaser from "phaser";
import Person from './Person.js';
import Dialogs from './Dialogs.js';
import Selector from './Selector.js';


export default class MainScene extends Phaser.Scene {
    constructor () {
        super({ key: 'Main' });
    }
    create() {



        this.selectedDress = Number;
        this.bg = this.add.image(this.scale.width/2, this.scale.height/2, 'frames', 'bg').setScale(1);

        this.bgMusic =  this.sound.add('bg_music', {volume: 0.5, loop: true});
        this.bgMusic.play();
        this.clickFx =  this.sound.add('click_fx');

        this.initLooks();
        
        
        this.initLookOkBtn();
        



        this.logo = this.add.image(this.scale.width - (252)/2, 8, 'frames', 'logo').setOrigin(1,0).setScale(1.1);
        
        this.resize();

        this.scale.on('resize', this.resize, this);
    }
    setNewDress(selectedDress) {
        this.startTutorial();
        this.selectedDress = selectedDress ?? this.selectedDress;
        this.selector.unactiveSelectors();
        this.person.selectDress(selectedDress);
    }
    
    startTutorial() {
        if(this.selectedDress>=0) console.log(); else {
            this.tweens.add({
                targets: this.okBtnMask,
                x: this.okBtnMask.x - (144*0.7),
                ease: 'Circular.Out',
                duration: 512,
            })
            this.tweens.add({
                targets: [this.okBtnDark, this.okBtn],
                scale: this.okBtn.scale * 1.1,
                ease: 'Circular.Out',
                yoyo: true,
                repeat: Infinity,
                duration: 256,
            })
        
            this.tweens.add({
                targets: this.overlay,
                alpha: 0,
                ease: 'Power1',
                duration: 300,
            });
            this.tweens.add({
              targets: this.dialog_1,
              alpha: 0,
              ease: 'Power1',
              duration: 300,
            });
            this.okBtn.on('pointerdown', () => {
                this.clickFx =  this.sound.add('click_fx').play();
                this.tweens.add({
                    targets: this.selector,
                    alpha: 0,
                    x: this.selector.x + this.selector.width + 20,
                    ease: 'Power1',
                    duration: 300,
                });
                this.tweens.add({
                    targets: [this.okBtn, this.okBtnMask, this.okBtnDark],
                    alpha: 0,
                    ease: 'Power1',
                    duration: 300,
                });
                
                this.tweens.add({
                    targets: this.bgMusic,
                    detune: -1000,
                    volume: 0.16,
                    ease: 'Circular.In',
                    duration: 2800,
                });
                setTimeout(() => {
                    this.tweens.add({
                        targets: this.bgMusic,
                        detune: Phaser.Math.Between(-1000, -600),
                        volume: 0.16,
                        yoyo: true,
                        repeat: Infinity,
                        ease: 'Circular.In',
                        duration: 400,
                    });
                }, 2800);
                this.person.finalDialog(this.selectedDress);
                this.dialogs.finalShow();
                
            }).setInteractive()
        }      
    }

    initLookOkBtn() {
                
        this.okBtnDark = this.add.image(430, 380, 'frames', 'btnOkDark').setAlpha(0).setScale(0.7);
    
        this.okBtnMask = this.make.image({
            x: this.okBtnDark.x + (144*0.7)/2,
            y: this.okBtnDark.y,
            frame: 'btnOkMask',
            key: 'frames',
            add: false
        }).setAlpha(0).setScale(0.7);
        this.okBtn = this.make.sprite({
            x: this.okBtnDark.x,
            y: this.okBtnDark.y,
            frame: 'btnOk',
            key: 'frames',
            add: true
        }).setAlpha(0).setScale(0.7);
      
        this.okBtn.mask = new Phaser.Display.Masks.BitmapMask(this, this.okBtnMask);


    }

    showLookOkBtn() {
        const okBtnDarkShow = this.tweens.add({
            targets: this.okBtnDark,
            alpha:  1,
            ease: 'Back.Out',
            duration: 150,
        });
            
        const okBtnMaskShow = this.tweens.add({
            targets: this.okBtnMask,
            alpha:  1,
            ease: 'Back.Out',
            duration: 150,
        });
            
        const okBtnShow = this.tweens.add({
            targets: this.okBtn,
            alpha:  1,
            ease: 'Back.Out',
            duration: 150,
        });
    }
    initLooks() {
        this.person = new Person(this, this.scale.width*0.279, this.scale.height);

        this.overlay  = this.add.graphics().setAlpha(0);
        this.overlay.fillStyle(0x00000, 1);
        this.overlay.fillRoundedRect(0, 0, this.scale.width, this.scale.width, 0);

        
        
        this.dialogs = new Dialogs(this, 0, 0);
        // this.selector = new Selector(this, 0, 0).setAlpha(0);
        this.selector = new Selector(this, 0, 0);

        this.dialog_1 = this.add.image(400, 200, 'frames', 'dialog_1').setScale(0.25).setOrigin(0.5,0);
        setTimeout(() => {
            
            this.dialog_1.setPosition(this.selector.x - this.dialog_1.width*0.19, this.selector.y + this.dialog_1.height*0.25);
            this.dialog_1.scaleY = 0
        }, 1111);
    }

    showSelector() {
        this.selector.showSelectors();
        this.showLookOkBtn();
        this.tweens.add({
          targets: this.overlay,
          alpha: 0.35,
          ease: 'Power1',
          duration: 300,
        });
        this.tweens.add({
          targets: this.dialog_1,
          scaleY:  0.25,
          ease: 'Back.Out',
          duration: 300,
        });
        this.selector.startTutorial();
    }
    
    resize ()  {
        this.leftFrame = (this.scale.width - this.scale.displayScale.x * this.scale.parentSize.width)/2;
        this.topFrame = (this.scale.height - this.scale.displayScale.y * this.scale.parentSize.height)/2;
        this.rightFrame = ((this.scale.width - this.scale.displayScale.x * this.scale.parentSize.width)/2)+this.scale.displayScale.x * this.scale.parentSize.width;
        this.logo.x = this.rightFrame+1;
        this.logo.y = this.topFrame + 5;
        this.person.resize();


        this.dialog_1.setPosition(this.selector.x - this.dialog_1.width*0.19, this.selector.y + this.dialog_1.height*0.25);
        
        // this.okBtnDark.setPosition();
        // this.okBtnMask.setPosition(this.okBtnDark.x, this.okBtnDark.y);
        // this.okBtn.setPosition(this.okBtnDark.x, this.okBtnDark.y);


        // if (this.scale.parentSize.width / this.scale.parentSize.height > 0.8) {
        //     this.girlfriend.scale= 0.45;
        //     this.girlfriend.setPosition(this.scale.width*0.279, this.scale.height)
      
        //   } else {
        //     this.girlfriend.scale = 0.45 * 0.85;
        //     this.girlfriend.x = this.leftFrame+43;
        //   }
        
    }
    update() {

    }
}