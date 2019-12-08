import { Component, OnInit } from '@angular/core';
import {ModalController, NavParams, Platform} from '@ionic/angular';
import anime from 'animejs/lib/anime.es'
@Component({
  selector: 'app-tutorial',
  templateUrl: './tutorial.page.html',
  styleUrls: ['./tutorial.page.scss'],
})
export class TutorialPage implements OnInit {

  constructor(private modalController: ModalController) {

   }

  ngOnInit() {
    this.positionPNG();
  }

positionPNG() {
        anime({
            targets: '#babyborgcard',
            keyframes: [
            {translateX: 30},
            
            ],duration: 10
  
        });
        anime({
            targets: '#commonborgcard',
            keyframes: [
            {translateY: -30},
            
            ],duration: 10
  
        });
    }

async closeModal() {
    const onClosedData: string = "Wrapped Up!";
    await this.modalController.dismiss(onClosedData);
  }
}
