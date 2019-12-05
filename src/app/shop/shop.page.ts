import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams, Platform} from '@ionic/angular';
import {Storage} from '@ionic/storage';
import {ActivatedRoute, Router} from '@angular/router';
import{AccountModel} from '../models/account-model';
import{SavestateModel} from '../models/savestate-model';
import { ArmorModel } from '../models/armor-model';
import { WeaponModel } from '../models/weapon-model';
import { IonSlides} from '@ionic/angular';
import { ViewChild} from '@angular/core';
import anime from 'animejs/lib/anime.es';
import { AlertController} from '@ionic/angular';


@Component({
  selector: 'app-shop',
  templateUrl: './shop.page.html',
  styleUrls: ['./shop.page.scss'],
})
export class ShopPage implements OnInit {

    @ViewChild("mySlides", {static:false}) slides: IonSlides;

    public account: AccountModel;
    public weaponToggle: boolean;
    public helmetToggle: boolean;
    public chestToggle: boolean;
    public armsToggle: boolean;
    public legsToggle: boolean;
    public feetToggle: boolean;
    public w: number;
    public h: number;
    public slideOpts = {
       grabCursor: true,
  cubeEffect: {
    shadow: true,
    slideShadows: true,
    shadowOffset: 20,
    shadowScale: 0.94,
  },
  on: {
    beforeInit: function() {
      const swiper = this;
      swiper.classNames.push(`${swiper.params.containerModifierClass}cube`);
      swiper.classNames.push(`${swiper.params.containerModifierClass}3d`);

      const overwriteParams = {
        slidesPerView: 1,
        slidesPerColumn: 1,
        slidesPerGroup: 1,
        watchSlidesProgress: true,
        resistanceRatio: 0,
        spaceBetween: 0,
        centeredSlides: false,
        virtualTranslate: true,
      };

      this.params = Object.assign(this.params, overwriteParams);
      this.originalParams = Object.assign(this.originalParams, overwriteParams);
    },
    setTranslate: function() {
      const swiper = this;
      const {
        $el, $wrapperEl, slides, width: swiperWidth, height: swiperHeight, rtlTranslate: rtl, size: swiperSize,
      } = swiper;
      const params = swiper.params.cubeEffect;
      const isHorizontal = swiper.isHorizontal();
      const isVirtual = swiper.virtual && swiper.params.virtual.enabled;
      let wrapperRotate = 0;
      let $cubeShadowEl;
      if (params.shadow) {
        if (isHorizontal) {
          $cubeShadowEl = $wrapperEl.find('.swiper-cube-shadow');
          if ($cubeShadowEl.length === 0) {
            $cubeShadowEl = swiper.$('<div class="swiper-cube-shadow"></div>');
            $wrapperEl.append($cubeShadowEl);
          }
          $cubeShadowEl.css({ height: `${swiperWidth}px` });
        } else {
          $cubeShadowEl = $el.find('.swiper-cube-shadow');
          if ($cubeShadowEl.length === 0) {
            $cubeShadowEl = swiper.$('<div class="swiper-cube-shadow"></div>');
            $el.append($cubeShadowEl);
          }
        }
      }

      for (let i = 0; i < slides.length; i += 1) {
        const $slideEl = slides.eq(i);
        let slideIndex = i;
        if (isVirtual) {
          slideIndex = parseInt($slideEl.attr('data-swiper-slide-index'), 10);
        }
        let slideAngle = slideIndex * 90;
        let round = Math.floor(slideAngle / 360);
        if (rtl) {
          slideAngle = -slideAngle;
          round = Math.floor(-slideAngle / 360);
        }
        const progress = Math.max(Math.min($slideEl[0].progress, 1), -1);
        let tx = 0;
        let ty = 0;
        let tz = 0;
        if (slideIndex % 4 === 0) {
          tx = -round * 4 * swiperSize;
          tz = 0;
        } else if ((slideIndex - 1) % 4 === 0) {
          tx = 0;
          tz = -round * 4 * swiperSize;
        } else if ((slideIndex - 2) % 4 === 0) {
          tx = swiperSize + (round * 4 * swiperSize);
          tz = swiperSize;
        } else if ((slideIndex - 3) % 4 === 0) {
          tx = -swiperSize;
          tz = (3 * swiperSize) + (swiperSize * 4 * round);
        }
        if (rtl) {
          tx = -tx;
        }

         if (!isHorizontal) {
          ty = tx;
          tx = 0;
        }

         const transform$$1 = `rotateX(${isHorizontal ? 0 : -slideAngle}deg) rotateY(${isHorizontal ? slideAngle : 0}deg) translate3d(${tx}px, ${ty}px, ${tz}px)`;
        if (progress <= 1 && progress > -1) {
          wrapperRotate = (slideIndex * 90) + (progress * 90);
          if (rtl) wrapperRotate = (-slideIndex * 90) - (progress * 90);
        }
        $slideEl.transform(transform$$1);
        if (params.slideShadows) {
          // Set shadows
          let shadowBefore = isHorizontal ? $slideEl.find('.swiper-slide-shadow-left') : $slideEl.find('.swiper-slide-shadow-top');
          let shadowAfter = isHorizontal ? $slideEl.find('.swiper-slide-shadow-right') : $slideEl.find('.swiper-slide-shadow-bottom');
          if (shadowBefore.length === 0) {
            shadowBefore = swiper.$(`<div class="swiper-slide-shadow-${isHorizontal ? 'left' : 'top'}"></div>`);
            $slideEl.append(shadowBefore);
          }
          if (shadowAfter.length === 0) {
            shadowAfter = swiper.$(`<div class="swiper-slide-shadow-${isHorizontal ? 'right' : 'bottom'}"></div>`);
            $slideEl.append(shadowAfter);
          }
          if (shadowBefore.length) shadowBefore[0].style.opacity = Math.max(-progress, 0);
          if (shadowAfter.length) shadowAfter[0].style.opacity = Math.max(progress, 0);
        }
      }
      $wrapperEl.css({
        '-webkit-transform-origin': `50% 50% -${swiperSize / 2}px`,
        '-moz-transform-origin': `50% 50% -${swiperSize / 2}px`,
        '-ms-transform-origin': `50% 50% -${swiperSize / 2}px`,
        'transform-origin': `50% 50% -${swiperSize / 2}px`,
      });

       if (params.shadow) {
        if (isHorizontal) {
          $cubeShadowEl.transform(`translate3d(0px, ${(swiperWidth / 2) + params.shadowOffset}px, ${-swiperWidth / 2}px) rotateX(90deg) rotateZ(0deg) scale(${params.shadowScale})`);
        } else {
          const shadowAngle = Math.abs(wrapperRotate) - (Math.floor(Math.abs(wrapperRotate) / 90) * 90);
          const multiplier = 1.5 - (
            (Math.sin((shadowAngle * 2 * Math.PI) / 360) / 2)
            + (Math.cos((shadowAngle * 2 * Math.PI) / 360) / 2)
          );
          const scale1 = params.shadowScale;
          const scale2 = params.shadowScale / multiplier;
          const offset$$1 = params.shadowOffset;
          $cubeShadowEl.transform(`scale3d(${scale1}, 1, ${scale2}) translate3d(0px, ${(swiperHeight / 2) + offset$$1}px, ${-swiperHeight / 2 / scale2}px) rotateX(-90deg)`);
        }
      }

      const zFactor = (swiper.browser.isSafari || swiper.browser.isUiWebView) ? (-swiperSize / 2) : 0;
      $wrapperEl
        .transform(`translate3d(0px,0,${zFactor}px) rotateX(${swiper.isHorizontal() ? 0 : wrapperRotate}deg) rotateY(${swiper.isHorizontal() ? -wrapperRotate : 0}deg)`);
    },
    setTransition: function(duration) {
      const swiper = this;
      const { $el, slides } = swiper;
      slides
        .transition(duration)
        .find('.swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left')
        .transition(duration);
      if (swiper.params.cubeEffect.shadow && !swiper.isHorizontal()) {
        $el.find('.swiper-cube-shadow').transition(duration);
      }
    },
  }  
    }

  constructor(
      public router: Router, public activatedRoute: ActivatedRoute,
      private storage: Storage, public platform: Platform,
      private modalController: ModalController,
      private navParams: NavParams,
      public alertController: AlertController
  ) {
    this.weaponToggle = true;
        this.helmetToggle = false;
        this.chestToggle = false;
        this.armsToggle = false;
        this.legsToggle = false;
        this.feetToggle = false;
        this.w = this.platform.width();
        this.h = this.platform.height();
        this.account = new AccountModel('a','a','a');
        this.storage.get('currentAccount').then((val) => {
            this.account = val;

            this.storage.set('currentAccount',this.account);
        })      
   }

  ngOnInit() {
    console.table(this.navParams);
     
  }
  async closeModal() {
    const onClosedData: string = "Wrapped Up!";
    await this.modalController.dismiss(onClosedData);
  }

  buyWeapon(i: number) {
        this.storage.get('currentAccount').then((val) => {
            this.account = val;
            let savestate = this.account.savestate;
            if(savestate.gold >= savestate.shopWeapons[i].price){
                savestate.hero.weapon = savestate.shopWeapons[i];
                savestate.gold -= savestate.shopWeapons[i].price;
                savestate.shopWeapons = [
                    new WeaponModel(savestate.shopWeapons[i].price*1.5,savestate.shopWeapons[i].price*2,this.getWeaponTitle(),this.getWeaponMat(),0),
                    new WeaponModel(savestate.shopWeapons[i].price,savestate.shopWeapons[i].price*2,this.getWeaponTitle(),this.getWeaponMat(),1),
                    new WeaponModel(savestate.shopWeapons[i].price,savestate.shopWeapons[i].price*2,this.getWeaponTitle(),this.getWeaponMat(),2),
                    new WeaponModel(savestate.shopWeapons[i].price,savestate.shopWeapons[i].price*2,this.getWeaponTitle(),this.getWeaponMat(),3),
                ]
                this.account.savestate = savestate;
                this.storage.set('currentAccount', this.account);
            }else{
                alert('Du hast nicht genug Gold!');
            }
            
        })
    }

    buyArmor(i: number) {
        this.storage.get('currentAccount').then((val) => {
            this.account = val;
            let savestate = this.account.savestate;
            const price = savestate.shopArmors[i].price;
            if(savestate.gold >= price){
                
                
                
                savestate.gold -= savestate.shopArmors[i].price;

                if(i == 0 || i==5 || i==10 || i==15){
                    savestate.hero.helmet = savestate.shopArmors[i];
                    savestate.shopArmors[0] = 
                    new ArmorModel(price*1.5,price*2,this.getArmorMat(),this.getArmorTitle(),0);
                    savestate.shopArmors[5] = 
                    new ArmorModel(price,price*2,this.getArmorMat(),this.getArmorTitle(),1);
                    savestate.shopArmors[10] = 
                    new ArmorModel(price,price*2,this.getArmorMat(),this.getArmorTitle(),2);
                    savestate.shopArmors[15] = 
                    new ArmorModel(price,price*2,this.getArmorMat(),this.getArmorTitle(),3);
                  

                }
                if(i == 1 || i==6 || i==11 || i==16){
                    savestate.hero.chest = savestate.shopArmors[i];
                    savestate.shopArmors[1] =
                    new ArmorModel(price*1.5,price*2,this.getArmorMat(),this.getArmorTitle(),0);
                    savestate.shopArmors[6] =
                    new ArmorModel(price,price*2,this.getArmorMat(),this.getArmorTitle(),1);
                    savestate.shopArmors[11] =
                    new ArmorModel(price,price*2,this.getArmorMat(),this.getArmorTitle(),2);
                    savestate.shopArmors[16] =
                    new ArmorModel(price,price*2,this.getArmorMat(),this.getArmorTitle(),3);
                }
                if(i == 2 || i==7 || i==12 || i==17){
                    savestate.hero.arms = savestate.shopArmors[i];
                    savestate.shopArmors[2] =
                    new ArmorModel(price*1.5,price*2,this.getArmorMat(),this.getArmorTitle(),0);
                    savestate.shopArmors[7] =
                    new ArmorModel(price,price*2,this.getArmorMat(),this.getArmorTitle(),1);
                    savestate.shopArmors[12] =
                    new ArmorModel(price,price*2,this.getArmorMat(),this.getArmorTitle(),2);
                    savestate.shopArmors[17] =
                    new ArmorModel(price,price*2,this.getArmorMat(),this.getArmorTitle(),3);

                }
                if(i == 3 || i==8 || i==13 || i==18){
                    savestate.hero.legs = savestate.shopArmors[i];
                    savestate.shopArmors[3] =
                    new ArmorModel(price*1.5,price*2,this.getArmorMat(),this.getArmorTitle(),0);
                    savestate.shopArmors[8] =
                    new ArmorModel(price,price*2,this.getArmorMat(),this.getArmorTitle(),1);
                    savestate.shopArmors[13] =
                    new ArmorModel(price,price*2,this.getArmorMat(),this.getArmorTitle(),2);
                    savestate.shopArmors[18] =
                    new ArmorModel(price,price*2,this.getArmorMat(),this.getArmorTitle(),3);

                }
                if(i == 4 || i==9 || i==14 || i==19){
                    savestate.hero.feet = savestate.shopArmors[i];
                    savestate.shopArmors[4] =
                    new ArmorModel(price*1.5,price*2,this.getArmorMat(),this.getArmorTitle(),0);
                    savestate.shopArmors[9] =
                    new ArmorModel(price,price*2,this.getArmorMat(),this.getArmorTitle(),1);
                    savestate.shopArmors[14] =
                    new ArmorModel(price,price*2,this.getArmorMat(),this.getArmorTitle(),2);
                    savestate.shopArmors[19] =
                    new ArmorModel(price,price*2,this.getArmorMat(),this.getArmorTitle(),3);
                    
                }
                
                
                savestate.hero.def = 
                savestate.hero.helmet.armor +
                savestate.hero.chest.armor +
                savestate.hero.arms.armor +
                savestate.hero.legs.armor +
                savestate.hero.feet.armor;

                let s: number = 0;
                let a: number = 0;
                let int: number = 0;     
                
                if(savestate.hero.helmet.attr == 1) {s += 5;}
                if(savestate.hero.helmet.attr == 2) {a += 5;}
                if(savestate.hero.helmet.attr == 3) {int += 5;}

                if(savestate.hero.chest.attr == 1) {s += 5;}
                if(savestate.hero.chest.attr == 2) {a += 5;}
                if(savestate.hero.chest.attr == 3) {int += 5;}

                if(savestate.hero.arms.attr == 1) {s += 5;}
                if(savestate.hero.arms.attr == 2) {a += 5;}
                if(savestate.hero.arms.attr == 3) {int += 5;}

                if(savestate.hero.legs.attr == 1) {s += 5;}
                if(savestate.hero.legs.attr == 2) {a += 5;}
                if(savestate.hero.legs.attr == 3) {int += 5;}

                if(savestate.hero.feet.attr == 1) {s += 5;}
                if(savestate.hero.feet.attr == 2) {a += 5;}
                if(savestate.hero.feet.attr == 3) {int += 5;}

                savestate.hero.strength = s;
                savestate.hero.agillity = a;
                savestate.hero.intelligence = int;

               

                
                this.account.savestate = savestate;
                console.log(this.account.savestate.hero.helmet.titel);
                console.log(this.account.savestate.hero.chest.titel);
                console.log(this.account.savestate.hero.arms.titel);
                console.log(this.account.savestate.hero.legs.titel);
                console.log(this.account.savestate.hero.feet.titel);
                this.storage.set('currentAccount', this.account);
            }else{
                alert('Du hast nicht genug Gold!');
            }
            
        })
    }

    public getWeaponTitle():string {
        let a: string[] = [
            'Morphaxt',
            'Schwert und Schild',
            'Langschwert',
            'Großschwert',
            'Chargeblade',
            'Hammer',
            'Dualblades',
            'Speer',
        ]
        return a[Math.floor(Math.random()*8)];

        
    }
    public getWeaponMat() {
        let a: string[] = [
            'Diamant',
            'Obsidian',
            'Smaragd',
            'Rubin',
            'Saphir',
            'Gold',
            'Stahl',
            'gehärtetem Stahl',
            'Ebenerz',
            'verzaubertem Holz',
            'Glas',
            'Eisen',
            'Knochen'
        ]
        return a[Math.floor(Math.random()*13)];    
    }
    public getArmorTitle() {
        let a: string[] = [
            'kampferprobte',
            'glohreiche',
            'ruhmreiche',
            'blutbefleckte',
            'zerschlissene',
            'fast kaputte',
            'nagelneue',
            'glitzernde',
            'leuchtende',
            'zerkratze',
            'zerbeulte',
        ]
        return a[Math.floor(Math.random()*11)];
    }
    public getArmorMat() {
        let a: string[] = [
            'Diamant',
            'Obsidian',
            'Smaragd',
            'Rubin',
            'Saphir',
            'Gold',
            'Stahl',
            'Ebenerz',
            'Glas',
            'Eisen',
            'Knochen',
            'Leder',           
        ] 
        return a[Math.floor(Math.random()*12)];
    }

  public equipToggle(i: number) {
        if(i == 1){
            this.weaponToggle = true;
            this.helmetToggle = false;
            this.chestToggle = false;
            this.armsToggle = false;
            this.legsToggle = false;
            this.feetToggle = false;
        }
        if(i == 2){
            this.weaponToggle = false;
            this.helmetToggle = true;
            this.chestToggle = false;
            this.armsToggle = false;
            this.legsToggle = false;
            this.feetToggle = false;
        }
        if(i == 3){
            this.weaponToggle = false;
            this.helmetToggle = false;
            this.chestToggle = true;
            this.armsToggle = false;
            this.legsToggle = false;
            this.feetToggle = false;
        }
        if(i == 4){
            this.weaponToggle = false;
            this.helmetToggle = false;
            this.chestToggle = false;
            this.armsToggle = true;
            this.legsToggle = false;
            this.feetToggle = false;
        }
        if(i == 5){
            this.weaponToggle = false;
            this.helmetToggle = false;
            this.chestToggle = false;
            this.armsToggle = false;
            this.legsToggle = true;
            this.feetToggle = false;
        }
        if(i == 6){
            this.weaponToggle = false;
            this.helmetToggle = false;
            this.chestToggle = false;
            this.armsToggle = false;
            this.legsToggle = false;
            this.feetToggle = true;
        }
    }


  async strengthAlert() {
    const alert = await this.alertController.create({
      header: 'Stärke',
      message: 'Der Stärkewert beschreibt die Chance auf einen Kritischen-Treffer, oder einen Block des gegnerischen Angriffs',
      buttons: [
        {
          text: 'Ok',
          role: 'cancel',
          cssClass: 'secondary',      
        }
      ]
    });
    await alert.present();
 }
 async agillityAlert() {
    const alert = await this.alertController.create({
      header: 'Beweglichkeit',
      message: 'Der Beweglichkeitswert beschreibt die Chance auf einen Doppelten-Treffer, oder einem Ausweichen des gegnerischen Angriffs',
      buttons: [
        {
          text: 'Ok',
          role: 'cancel',
          cssClass: 'secondary',      
        }
      ]
    });
    await alert.present();
 }  
 async intelligenceAlert() {
    const alert = await this.alertController.create({
      header: 'Intelligenz',
      message: 'Der Intelligenzwert beschreibt die Chance einen DoT-Effekt(Damage over time) zu erzielen, oder dem Zurückwerfen des gegnerischen Angriffs',
      buttons: [
        {
          text: 'Ok',
          role: 'cancel',
          cssClass: 'secondary',      
        }
      ]
    });
    await alert.present();
 }    
    
swipeNext() {
        this.slides.slideNext();
}
    swipePrev() {
        this.slides.slidePrev();
    }



}
