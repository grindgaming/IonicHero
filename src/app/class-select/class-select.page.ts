import {Component, OnInit} from '@angular/core';
import {ModalController} from '@ionic/angular';
import {Storage} from '@ionic/storage';
import {ActivatedRoute, Router} from '@angular/router';
import {AccountModel} from '../models/account-model';
import {SavestateModel} from '../models/savestate-model';
import { ViewChild } from '@angular/core';
import { IonSlides } from '@ionic/angular';
import { AlertController} from '@ionic/angular';
import * as anime from 'animejs';


@Component({
  selector: 'app-class-select',
  templateUrl: './class-select.page.html',
  styleUrls: ['./class-select.page.scss'],
})
export class ClassSelectPage implements OnInit {

  @ViewChild("mySlides", {static:false}) slides: IonSlides;
  public account : AccountModel;
   
  constructor(public router: Router, public activatedRoute: ActivatedRoute, private storage: Storage,public alertController: AlertController) {
    this.account = new AccountModel('admin', 'admin', 'admin');
   }

   swipeNext() {
     this.slides.slideNext();
   }
   swipePrev() {
     this.slides.slidePrev();
   }

  setKlasse(klasse: string){
    this.storage.get('currentAccount').then( (val) => {
      this.account = val;
      if(klasse === 'krieger') {
           this.account.savestate.hero.strengthMulti = 2;
           this.account.savestate.hero.agillityMulti = 1;
           this.account.savestate.hero.intelligenceMulti = 1;
           this.account.savestate.hero.klasse = "Krieger";
      }
      if(klasse === 'waldlaufer') {
           this.account.savestate.hero.strengthMulti = 1;
           this.account.savestate.hero.agillityMulti = 2;
           this.account.savestate.hero.intelligenceMulti = 1;
           this.account.savestate.hero.klasse = "Waldläufer";
      }
      if(klasse === 'magier') {
          this.account.savestate.hero.strengthMulti = 1;
          this.account.savestate.hero.agillityMulti = 1;
          this.account.savestate.hero.intelligenceMulti = 2;
          this.account.savestate.hero.klasse = "Magier";
          console.log(this.account.savestate.hero.klasse);
      }
      this.storage.set('currentAccount', this.account);
      this.router.navigate(['home']);
    })
   
  }  

    async kriegerAlert() {
    const alert = await this.alertController.create({
      header: 'Krieger',
      message: 'Der Krieger hat erhöhte Krit-Chance und kann mehr Schaden einstecken. blabla epischer Teaser-Text lorem ipsum dolor sit amet ',
      buttons: [
        {
          text: 'Abbrechen',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Wählen',
          handler: () => {
            this.setKlasse('krieger');
          }
        }
      ]
    });

    await alert.present();
  } 

   

   async waldlauferAlert() {
    const alert = await this.alertController.create({
      header: 'Waldläufer',
      message: 'Der Waldläufer glänzt durch große Geschicklichkeit und Schnelligkeit, was Ihm ermöglicht Angriffen auszuweichen oder zwei Treffer in Folge zu landen. blabla epischer Teaser-Text lorem ipsum dolor sit amet ',
      buttons: [
        {
          text: 'Abbrechen',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Wählen',
          handler: () => {
            this.setKlasse('waldlaufer');
          }
        }
      ]
    });

    await alert.present();
  } 


 async magierAlert() {
    const alert = await this.alertController.create({
      header: 'Magier',
      message: 'Der Magier ist der intelligenteste unter den drei Helden. Seine Spezialfähigkeiten sind das Reflektieren von Angriffen seiner Gegner, und DoT-Angriffe. blabla epischer Teaser-Text lorem ipsum dolor sit amet ',
      buttons: [
        {
          text: 'Abbrechen',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Wählen',
          handler: () => {
            this.setKlasse('magier');
          }
        }
      ]
    });

    await alert.present();
 }

  ngOnInit() {
  }


  
 
}
