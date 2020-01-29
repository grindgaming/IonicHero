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

              },
            ],   
            duration: 1,
            
        });
    }

async closeModal() {
    const onClosedData: string = "Wrapped Up!";
    await this.modalController.dismiss(onClosedData);
  }
}
