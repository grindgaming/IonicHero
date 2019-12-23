import { Component, OnInit } from '@angular/core';
import {ModalController, NavParams, Platform} from '@ionic/angular';
import anime from 'animejs/lib/anime.es'
@Component({
  selector: 'app-tutorial',
  templateUrl: './tutorial.page.html',
  styleUrls: ['./tutorial.page.scss'],
})
export class TutorialPage implements OnInit {
  private w: number;
  private h: number;
  constructor(private modalController: ModalController,private platform: Platform) {
      this.h = this.platform.height();
      this.w = this.platform.width();
   }

  ngOnInit() {
    this.positionPNG();
  }

positionPNG() {
        anime({
            targets: '#babyborg',
            keyframes: [
              {
                translateX: this.w/1.5,
              },
              {
                translateX: this.w/0.3,
              },         
              {
                translateY: this.h/0.3,
                zIndex: -100

              },
              {
                translateX: -this.w/0.3,
                translateY: 0,
                zIndex: 100

              },
              
            ],duration: 2500,
            loop: true
        });
        anime({
            targets: '#commonborg',
            keyframes: [
            {translateY: -this.h/6.8,
            translateX: this.w/1.8,
            zIndex: -5},
            ],duration: 1
  
        });
        anime({
            targets: '#slimborg',
            keyframes: [
            {translateY: -this.h/3.5,
            translateX:this.w/2.4,
            zIndex: -10},
            ],duration: 1
        });
        anime({
            targets: '#fatborg',
            keyframes: [
            {translateY: -this.h/2.32,
            translateX: this.w/3,
            zIndex: -15},
            ],duration: 1
        });
        anime({
            targets: '#borgchief',
            keyframes: [
            {translateY: -this.h/1.74,
            translateX: 100,
            zIndex: -20},
            ],duration: 1
        });
        
    }

async closeModal() {
    const onClosedData: string = "Wrapped Up!";
    await this.modalController.dismiss(onClosedData);
  }
}
