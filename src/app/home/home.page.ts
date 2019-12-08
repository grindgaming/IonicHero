import {Component, OnInit} from '@angular/core';
import {ModalController, Platform} from '@ionic/angular';
import {ShopPage} from '../shop/shop.page'
import {TutorialPage} from '../tutorial/tutorial.page'
import {Storage} from '@ionic/storage';
import {ActivatedRoute, Router} from '@angular/router';
import {AccountModel} from '../models/account-model';
import {SavestateModel} from '../models/savestate-model';
import { ArmorModel } from '../models/armor-model';
import { WeaponModel } from '../models/weapon-model';
import {EnemyModel} from '../models/enemy-model';
import { IonSlides} from '@ionic/angular';
import { ViewChild } from '@angular/core';
import anime from 'animejs/lib/anime.es';
import Flip from 'number-flip';
import { AlertController} from '@ionic/angular';


@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})

export class HomePage implements OnInit {

    @ViewChild("mySlides", {static:false}) slides: IonSlides;
    
    public account: AccountModel;
    public shopToggle: boolean;
    public weaponToggle: boolean;
    public helmetToggle: boolean;
    public chestToggle: boolean;
    public armsToggle: boolean;
    public legsToggle: boolean;
    public feetToggle: boolean;
    public message1;
    public message2;
    public message3;
    public message4;
    public currentMessage;
    public dot: number;
    public goldCounter: number;
    public w: number;
    public h: number;
    public specialCooldown: number;
    
    constructor(
        public router: Router, public activatedRoute: ActivatedRoute, 
        private storage: Storage,public platform: Platform,
        public modalController: ModalController,
        public alertController: AlertController
        ) {
        this.weaponToggle = true;
        this.helmetToggle = false;
        this.chestToggle = false;
        this.armsToggle = false;
        this.legsToggle = false;
        this.feetToggle = false;
        this.currentMessage = 4;
        this.specialCooldown = 0;
        this.w = this.platform.width();
        this.h = this.platform.height();       
        this.account = new AccountModel('a','a','a');
        this.storage.get('currentAccount').then((val) => {
            this.account = val;
            this.storage.set('currentAccount',this.account);
        })            
    }

ngOnInit() {
         this.storage.get('currentAccount').then((val) => {
            this.account = val;
            if(this.account.savestate.tutorial){
                this.tutorialAlert();
            }
            this.storage.set('currentAccount',this.account);
        })  
    }
    ionDidEnter(){    
    }

async tutorialAlert() {
    const alert = await this.alertController.create({
      header: 'Willkommen!',
      message: 'Spielen Sie Ionic Hero zum ersten Mal? Möchten Sie eine Einführung?',
      buttons: [
        {
          text: 'Nein',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Zur Einführung',
          handler: () => {
              this.showTutorial();
          }
        }
      ]
    });
    await alert.present();
  }

  showTutorial() {
      this.storage.get('currentAccount').then((val) => {
          this.account = val;
          this.account.savestate.tutorial = true;
          this.storage.set('currentAccount', this.account);         
          this.openTutorialModal();
      })
}

async openShopModal() {
        const modal = await this.modalController.create({
            component: ShopPage,           
        });      
        return await modal.present();
    }

async openTutorialModal() {
    const modal = await this.modalController.create({
        component: TutorialPage,           
    });      
    return await modal.present();
}    

    decreaseSpecialCooldown() {
        this.storage.get('currentAccount').then((val) => {
            this.account = val;
                console.log(this.account.savestate.specialCd);
            if(this.account.savestate.specialCd > 0){
        console.log("decrease Special");

                this.account.savestate.specialCd = this.account.savestate.specialCd - 1;
                this.storage.set('currentAccount', this.account); 
            }
            this.storage.set('currentAccount', this.account); 
            
        })
    }
    decreaseStrongCooldown() {
        console.log("decrease Strong");
        this.storage.get('currentAccount').then((val) => {
            this.account = val;
            let savestate = this.account.savestate;
            console.log(savestate.strongCd);
            if(savestate.strongCd > 0){
        console.log("decrease Strong");
                
            savestate.strongCd = savestate.strongCd - 1 ;
            
            }
            this.account.savestate = savestate;
            this.storage.set('currentAccount', this.account); 
        })
    }
    //===================================================================================================
    //===================================================================================================
    //** ======== N O R M A L ===  A T T A C K ==========================================================
    //===================================================================================================
        normalAttack() {
            
            this.storage.get('currentAccount').then((val) => {
                this.account = val;
                let savestate = this.account.savestate;
                const lvl = savestate.level;
                this.shakeEnemy();       
                savestate.enemys = [
                    new EnemyModel(lvl*14,lvl*14,'Gewöhnlicher Borg'),
                    new EnemyModel(lvl*14,lvl*14,'Gewöhnlicher Borg'),
                    new EnemyModel(lvl*14,lvl*14,'Gewöhnlicher Borg'),
                    new EnemyModel(lvl*14,lvl*16,'Fetter Borg'),
                    new EnemyModel(lvl*16,lvl*14,'Dünner Borg'),
                    new EnemyModel(lvl*16,lvl*16,'Borg Häuptling'),
                    new EnemyModel(lvl*8,lvl*8,'Baby Borg'),
                     ]; 
            if(savestate.eHP <= 0) {
//==========================
//======= G E G N E R - T O T ====
//========================
                this.shakeEnemy();        
                savestate.gold += savestate.eMaxHP;
                savestate.totalxp += savestate.eMaxHP*10;
                if(savestate.totalxp >= savestate.nextThreshhold) {
                    //==============================
                    //==========L E V E L - U P ====
                    //==============================
                    savestate.level += 1;
                    savestate.hero.maxHp += 10;
                    savestate.totalxp = 0;
                    savestate.nextThreshhold = savestate.expThreshholds[savestate.level];          
                    savestate.enemys = [                
                    new EnemyModel(lvl*14,lvl*14,'Gewöhnlicher Borg'),
                    new EnemyModel(lvl*14,lvl*14,'Gewöhnlicher Borg'),
                    new EnemyModel(lvl*14,lvl*14,'Gewöhnlicher Borg'),
                    new EnemyModel(lvl*14,lvl*16,'Fetter Borg'),
                    new EnemyModel(lvl*16,lvl*14,'Dünner Borg'),
                    new EnemyModel(lvl*16,lvl*16,'Borg Häuptling'),
                    new EnemyModel(lvl*8,lvl*8,'Baby Borg'),     
                     ]; 
                }//=============================
                savestate.currentEnemy = savestate.enemys[Math.floor(Math.random()*7)];
                savestate.eHP = savestate.currentEnemy.hp;
                savestate.eMaxHP = savestate.currentEnemy.maxHp;
                savestate.hero.hp = savestate.hero.maxHp;  
//====================================               
            }else {
        //===================================
        //============ A N G R I F F ========
        //==================================
                if(savestate.strongCd > 0){
                    console.log("decrease Strong");
                    savestate.strongCd = savestate.strongCd - 1 ;
                }
                if(savestate.specialCd > 0){
                    console.log("decrease Special");
                    savestate.specialCd = savestate.specialCd - 1 ;
                }
                const dmg = savestate.hero.weapon.dmg;
                let strengthRoll: number = Math.floor(Math.random() * 101);
                let agillityRoll: number = Math.floor(Math.random() * 101);
                let intelligenceRoll: number = Math.floor(Math.random() * 101);
                let crit: boolean = false;
                let swift: boolean = false;
                let dot: boolean = false;
                const sleep = (milliseconds) => {
                    return new Promise(resolve => setTimeout(resolve, milliseconds))
                }
                if(this.dot >0){   //============ WENN DOT AKTIV    
                    if(savestate.hero.klasse=="Krieger"){
                        this.setMessage(`Dein Gegner blutet stark! -${dmg} HP`);
                        sleep(1700).then(() => {
                        savestate.eHP -= dmg;
                        this.dot -= 1;
                        })
                    }
                    if(savestate.hero.klasse=="Waldläufer"){
                        this.setMessage(`Dein Gegner ist geschwächt durch dein Gift! -${dmg} HP`);
                        sleep(1700).then(() => {
                        savestate.eHP -= dmg;
                        })
                        this.dot -= 1;
                    }
                    if(savestate.hero.klasse=="Magier"){
                        this.setMessage(`Dein Gegner steht in Flammen! -${dmg} HP`);
                        sleep(1700).then(() => {
                        savestate.eHP -= dmg;
                        this.dot -= 1;
                        })
                    }         
                }        
                //========== C R I T ? === S W I F T ? === D O T ? =====
                //=========== KLASSEN MULTIPLIKATOR ================
                if(strengthRoll <= savestate.hero.strength*savestate.hero.strengthMulti) {                  
                        crit = true;             
                }
                if(agillityRoll <= savestate.hero.agillity*savestate.hero.agillityMulti) {         
                        swift = true;               
                }
                if(intelligenceRoll <= savestate.hero.intelligence*savestate.hero.intelligenceMulti) {                 
                        dot = true;            
                }
                //===================================
                //======== D A M A G E === U N D ==== S P E C I A L E V E N T S ======
                if(crit){
                    if(swift){
                        if(dot){
                            this.dot = 2*savestate.hero.intelligenceMulti;
                            this.setMessage(`Meisterleistung! -${dmg*4} HP + DoT: ${this.dot} Runden`);
                                savestate.eHP -= dmg*2;         
                                savestate.eHP -= dmg*2;                           
                        }else{
                            this.setMessage(`Doppelter Kritischer Treffer! -${ dmg*4 } HP`);                 
                            (async () => {     
                                savestate.eHP -= dmg*2;                     
                                savestate.eHP -= dmg*2;
                            })(); 
                        }
                    }else if(dot){
                        this.setMessage(`Kritischer Treffer -${dmg*2} + DoT: ${this.dot} Runden`);
                        savestate.eHP -= dmg*2;
                        this.dot = 2*savestate.hero.intelligenceMulti;
                    }else {
                        this.setMessage(`Kritischer Treffer! -${dmg *2} HP`);
                        savestate.eHP -= dmg*2;
                    }
                }
                else if(swift){
                    if(dot){
                        this.setMessage(`Doppelter Treffer! + DoT  -${dmg * 2} HP`);  
                        (async () => {     
                            savestate.eHP -= dmg;                
                            savestate.eHP -= dmg;
                        })();
                        this.dot = 2*savestate.hero.intelligenceMulti;          
                    }else {   
                        (async () => {  
                            this.setMessage(`Doppelter Treffer:  -${dmg*2} HP`);
                            savestate.eHP -= dmg;            
                            savestate.eHP -= dmg;       
                        })();             
                    }
                }
                else if(dot){
                    savestate.eHP -= dmg;
                    this.dot = 2*savestate.hero.intelligenceMulti;
                    this.setMessage(`Normaler Treffer: -${dmg} HP + DoT: ${this.dot} Runden`);            
                }else{
                    savestate.eHP -= dmg;
                    this.setMessage(`Normaler Treffer: -${dmg} HP`);     
                }         
                strengthRoll = Math.floor(Math.random() * 100) +1;
                agillityRoll = Math.floor(Math.random() * 100) +1;
                intelligenceRoll = Math.floor(Math.random() * 100)+1;
                crit = false;
                swift = false;
                dot = false;
                console.log(savestate.hero.strength);
                console.log(savestate.hero.agillity);
                console.log(savestate.hero.intelligence);
                if(strengthRoll <= savestate.hero.strength*savestate.hero.strengthMulti) {
                    crit = true;
                }
                if(agillityRoll <= savestate.hero.agillity*savestate.hero.agillityMulti) {
                    swift = true;
                }
                if(intelligenceRoll <= savestate.hero.intelligence*savestate.hero.intelligenceMulti) {
                    dot = true;
                }
                console.log(crit);
                console.log(swift);
                console.log(dot);   
                if(dot){
                    savestate.eHP -= savestate.currentEnemy.attack*0.5;
                    sleep(1700).then(() => {
                        this.setMessage(`Du hast den Angriff des Gegners reflektiert!`);
                    })
                }else if(swift){
                    sleep(1700).then(() => {
                        this.setMessage(`Du weichst dem Angriff des Gegners gekonnt aus!`);
                    })
                }else if(crit){
                    if(((savestate.currentEnemy.attack - savestate.hero.def)/1.5) <= 0){
                        sleep(1700).then(() => {
                            this.setMessage('Du blockst den Angriff deines Gegners erfolgreich!');
                        })
                    }else{
                    savestate.hero.hp -= ((savestate.currentEnemy.attack - savestate.hero.def)/1.5 );
                    sleep(1700).then(() => {
                        this.setMessage(`Du versuchst den Angriff des Gegners zu blocken! -${((savestate.currentEnemy.attack - savestate.hero.def)/1.5).toFixed(2)}`);
                        this.shakeHero();
                    })
                    }
                }else{
                    if(savestate.currentEnemy.attack - savestate.hero.def <= 0){
                        sleep(1700).then(() => {
                        this.setMessage('Der Treffer deines Gegners konnte dir nichtmal einen Kratzer zufügen...');
                        })
                    }else{
                    savestate.hero.hp -= (savestate.currentEnemy.attack - savestate.hero.def);
                    sleep(1700).then(() => {
                    this.setMessage(`Du wurdest getroffen! -${savestate.currentEnemy.attack - savestate.hero.def} HP`);
                    })
                    this.shakeHero();
                    }
                    
                }
                //====== H E L D ==== T O T ====
                if(savestate.hero.hp <= 0){
                    console.log("tot");
                    this.account.savestate.currentEnemy = this.account.savestate.enemys[Math.floor(Math.random()*5)];
                    this.account.savestate.eHP = this.account.savestate.currentEnemy.hp;
                    this.account.savestate.eMaxHP = this.account.savestate.currentEnemy.maxHp;
                    
                    savestate.hero.hp = savestate.hero.maxHp;
                    if(savestate.totalxp >= 50) {
                        savestate.totalxp -= 50;
                    }
                    savestate.totalxp
                    alert("Du bist gestorben! Press F for Respect... Viel Glück beim nächsten Gegner!");
                }  
                       
          }
                   this.account.savestate = savestate;
          this.storage.set('currentAccount', this.account); 
      
                
        })
        
    }
//========================================================================================================
//========================================================================================================
//=================== S T R O N G A T T A C K =============================================
    
    public strongAttack() {
        
            this.storage.get('currentAccount').then((val) => {
                this.account = val;
                let savestate = this.account.savestate;
                
                const lvl = savestate.level;
                this.shakeEnemy();       
                savestate.enemys = [
                    new EnemyModel(lvl*14,lvl*14,'Gewöhnlicher Borg'),
                    new EnemyModel(lvl*14,lvl*14,'Gewöhnlicher Borg'),
                    new EnemyModel(lvl*14,lvl*14,'Gewöhnlicher Borg'),
                    new EnemyModel(lvl*14,lvl*16,'Fetter Borg'),
                    new EnemyModel(lvl*16,lvl*14,'Dünner Borg'),
                    new EnemyModel(lvl*16,lvl*16,'Borg Häuptling'),
                    new EnemyModel(lvl*8,lvl*8,'Baby Borg'),
                     ]; 
            if(savestate.eHP <= 0) {
//==========================
//======= G E G N E R - T O T ====
//========================
                this.shakeEnemy();        
                savestate.gold += savestate.eMaxHP;
                savestate.totalxp += savestate.eMaxHP*10;
                if(savestate.totalxp >= savestate.nextThreshhold) {
                    //==============================
                    //==========L E V E L - U P ====
                    //==============================
                    savestate.level += 1;
                    savestate.hero.maxHp += 10;
                    savestate.totalxp = 0;
                    savestate.nextThreshhold = savestate.expThreshholds[savestate.level];          
                    savestate.enemys = [                
                    new EnemyModel(lvl*14,lvl*14,'Gewöhnlicher Borg'),
                    new EnemyModel(lvl*14,lvl*14,'Gewöhnlicher Borg'),
                    new EnemyModel(lvl*14,lvl*14,'Gewöhnlicher Borg'),
                    new EnemyModel(lvl*14,lvl*16,'Fetter Borg'),
                    new EnemyModel(lvl*16,lvl*14,'Dünner Borg'),
                    new EnemyModel(lvl*16,lvl*16,'Borg Häuptling'),
                    new EnemyModel(lvl*8,lvl*8,'Baby Borg'),                
                     ]; 
                }//=============================
                savestate.currentEnemy = savestate.enemys[Math.floor(Math.random()*5)];
                savestate.eHP = savestate.currentEnemy.hp;
                savestate.eMaxHP = savestate.currentEnemy.maxHp;
                savestate.hero.hp = savestate.hero.maxHp;  
//====================================               
            }else {
        //===================================
        //============ A N G R I F F ========
        //==================================
                const dmg = savestate.hero.weapon.dmg;
                let strengthRoll: number = Math.floor(Math.random() * 101);
                let agillityRoll: number = Math.floor(Math.random() * 101);
                let intelligenceRoll: number = Math.floor(Math.random() * 101);
                let crit: boolean = false;
                let swift: boolean = false;
                let dot: boolean = false;
                if(savestate.specialCd > 0){
                    console.log("decrease Special");
                    savestate.specialCd = savestate.specialCd - 1 ;
                }
                savestate.strongCd = 2;
                const sleep = (milliseconds) => {
                    return new Promise(resolve => setTimeout(resolve, milliseconds))
                }
                if(this.dot >0){   //============ WENN DOT AKTIV    
                    if(savestate.hero.klasse=="Krieger"){
                        this.setMessage(`Dein Gegner blutet stark! -${dmg} HP`);
                        sleep(1700).then(() => {
                        savestate.eHP -= dmg;
                        this.dot -= 1;
                        })
                    }
                    if(savestate.hero.klasse=="Waldläufer"){
                        this.setMessage(`Dein Gegner ist geschwächt durch dein Gift! -${dmg} HP`);
                        sleep(1700).then(() => {
                        savestate.eHP -= dmg;
                        })
                        this.dot -= 1;
                    }
                    if(savestate.hero.klasse=="Magier"){
                        this.setMessage(`Dein Gegner steht in Flammen! -${dmg} HP`);
                        sleep(1700).then(() => {
                        savestate.eHP -= dmg;
                        this.dot -= 1;
                        })
                    }   
                    sleep(1700).then(()=>{
                        console.log("dot");
                    })      
                }        
                //========== C R I T ? === S W I F T ? === D O T ? =====
                //=========== KLASSEN MULTIPLIKATOR ================
                if(strengthRoll <= savestate.hero.strength*2*savestate.hero.strengthMulti) {                  
                        crit = true;             
                }
                if(agillityRoll <= savestate.hero.agillity*2*savestate.hero.agillityMulti) {         
                        swift = true;               
                }
                if(intelligenceRoll <= savestate.hero.intelligence*2*savestate.hero.intelligenceMulti) {                 
                        dot = true;            
                }
                //===================================
                //======== D A M A G E === U N D ==== S P E C I A L E V E N T S ======
                if(crit){
                    if(swift){
                        if(dot){
                            this.dot = 2*savestate.hero.intelligenceMulti;
                            this.setMessage(`Meisterleistung! -${dmg*4} HP + DoT: ${this.dot} Runden`);
                                savestate.eHP -= dmg*2;         
                                savestate.eHP -= dmg*2;                           
                        }else{
                            this.setMessage(`Doppelter Kritischer Treffer! -${ dmg*4 } HP`);                 
                            (async () => {     
                                savestate.eHP -= dmg*2;                     
                                savestate.eHP -= dmg*2;
                            })(); 
                        }
                    }else if(dot){
                        this.setMessage(`Kritischer Treffer -${dmg*2} + DoT: ${this.dot} Runden`);
                        savestate.eHP -= dmg*2;
                        this.dot = 2*savestate.hero.intelligenceMulti;
                    }else {
                        this.setMessage(`Kritischer Treffer! -${dmg *2} HP`);
                        savestate.eHP -= dmg*2;
                    }
                }
                else if(swift){
                    if(dot){
                        this.setMessage(`Doppelter Treffer! + DoT  -${dmg * 2} HP`);  
                        (async () => {     
                            savestate.eHP -= dmg;                
                            savestate.eHP -= dmg;
                        })();
                        this.dot = 2*savestate.hero.intelligenceMulti;          
                    }else {   
                        (async () => {  
                            this.setMessage(`Doppelter Treffer:  -${dmg*2} HP`);
                            savestate.eHP -= dmg;            
                            savestate.eHP -= dmg;       
                        })();             
                    }
                }
                else if(dot){
                    savestate.eHP -= dmg;
                    this.dot = 2*savestate.hero.intelligenceMulti;
                    this.setMessage(`Normaler Treffer: -${dmg} HP + DoT: ${this.dot} Runden`);            
                }else{
                    savestate.eHP -= dmg;
                    this.setMessage(`Normaler Treffer: -${dmg} HP`);     
                }         
                strengthRoll = Math.floor(Math.random() * 100) +1;
                agillityRoll = Math.floor(Math.random() * 100) +1;
                intelligenceRoll = Math.floor(Math.random() * 100)+1;
                crit = false;
                swift = false;
                dot = false;
                console.log(savestate.hero.strength);
                console.log(savestate.hero.agillity);
                console.log(savestate.hero.intelligence);
                if(strengthRoll <= savestate.hero.strength*savestate.hero.strengthMulti) {
                    crit = true;
                }
                if(agillityRoll <= savestate.hero.agillity*savestate.hero.agillityMulti) {
                    swift = true;
                }
                if(intelligenceRoll <= savestate.hero.intelligence*savestate.hero.intelligenceMulti) {
                    dot = true;
                }
                console.log(crit);
                console.log(swift);
                console.log(dot);   
                if(dot){
                    savestate.eHP -= savestate.currentEnemy.attack*0.5;
                    sleep(1700).then(() => {
                        this.setMessage(`Du hast den Angriff des Gegners reflektiert!`);
                    })
                }else if(swift){
                    sleep(1700).then(() => {
                        this.setMessage(`Du weichst dem Angriff des Gegners gekonnt aus!`);
                    })
                }else if(crit){
                    if(((savestate.currentEnemy.attack - savestate.hero.def)/1.5) <= 0){
                        sleep(1700).then(() => {
                            this.setMessage('Du blockst den Angriff deines Gegners erfolgreich!');
                        })
                    }else{
                    savestate.hero.hp -= ((savestate.currentEnemy.attack - savestate.hero.def)/1.5 );
                    sleep(1700).then(() => {
                        this.setMessage(`Du versuchst den Angriff des Gegners zu blocken! -${((savestate.currentEnemy.attack - savestate.hero.def)/1.5).toFixed(2)}`);
                        this.shakeHero();
                    })
                    }
                }else{
                    if(savestate.currentEnemy.attack - savestate.hero.def <= 0){
                        sleep(1700).then(() => {
                        this.setMessage('Der Treffer deines Gegners konnte dir nichtmal einen Kratzer zufügen...');
                        })
                    }else{
                    savestate.hero.hp -= (savestate.currentEnemy.attack - savestate.hero.def);
                    sleep(1700).then(() => {
                    this.setMessage(`Du wurdest getroffen! -${savestate.currentEnemy.attack - savestate.hero.def} HP`);
                    })
                    this.shakeHero();
                    }
                    
                }
                //====== H E L D ==== T O T ====
                if(savestate.hero.hp <= 0){
                    console.log("tot");
                    this.account.savestate.currentEnemy = this.account.savestate.enemys[Math.floor(Math.random()*7)];
                    this.account.savestate.eHP = this.account.savestate.currentEnemy.hp;
                    this.account.savestate.eMaxHP = this.account.savestate.currentEnemy.maxHp;
                    
                    savestate.hero.hp = savestate.hero.maxHp;
                    if(savestate.totalxp >= 50) {
                        savestate.totalxp -= 50;
                    }
                    savestate.totalxp
                    alert("Du bist gestorben! Press F for Respect... Viel Glück beim nächsten Gegner!");
                }  
                       
          }
                   this.account.savestate = savestate;
          this.storage.set('currentAccount', this.account); 
      
                
        })
    }
//========================================================================================================
//========================================================================================================
//========== S P E C I A L - A T T A C K =================================================================
//========================================================================================================

    public specialAttack() {
        
        this.storage.get('currentAccount').then((val) => {
            this.account = val;
            let savestate = this.account.savestate;
            
            
            const lvl = savestate.level;
            this.shakeEnemy();
            
             savestate.enemys = [
                    new EnemyModel(lvl*14,lvl*14,'Gewöhnlicher Borg'),
                    new EnemyModel(lvl*14,lvl*14,'Gewöhnlicher Borg'),
                    new EnemyModel(lvl*14,lvl*14,'Gewöhnlicher Borg'),
                    new EnemyModel(lvl*14,lvl*16,'Fetter Borg'),
                    new EnemyModel(lvl*16,lvl*14,'Dünner Borg'),
                    new EnemyModel(lvl*16,lvl*16,'Borg Häuptling'),
                    new EnemyModel(lvl*8,lvl*8,'Baby Borg'),
                     ]; 
                     if(savestate.eHP <= 0) {
//==========================
//======= G E G N E R - T O T ====
//=========================
                savestate.gold += savestate.eMaxHP;
                savestate.totalxp += savestate.eMaxHP*10;
                if(savestate.totalxp >= savestate.nextThreshhold) {
                    //==============================
                    //==========L E V E L - U P ====
                    //==============================
                    savestate.level += 1;
                    savestate.hero.maxHp += 10;
                    savestate.totalxp = 0;
                    savestate.nextThreshhold = savestate.expThreshholds[savestate.level];
                    
                    savestate.enemys = [
                    new EnemyModel(lvl*13,lvl*13,'Gewöhnlicher Borg'),
                    new EnemyModel(lvl*13,lvl*15,'Fetter Borg'),
                    new EnemyModel(lvl*15,lvl*13,'Dünner Borg'),
                    new EnemyModel(lvl*15,lvl*15,'Borg Häuptling'),
                    new EnemyModel(lvl*8,lvl*8,'Baby Borg'),              
                     ]; 
                }//=============================

                savestate.currentEnemy = savestate.enemys[Math.floor(Math.random()*5)];
                savestate.eHP = savestate.currentEnemy.hp;
                savestate.eMaxHP = savestate.currentEnemy.maxHp;
                savestate.hero.hp = savestate.hero.maxHp;
//====================================               
            }else{
                const sleep = (milliseconds) => {
                        return new Promise(resolve => setTimeout(resolve, milliseconds))
                } 
                savestate.specialCd = 5;
            let dmg = savestate.hero.weapon.dmg;
            this.dot = 2*savestate.hero.intelligenceMulti;
                            this.setMessage(`Meisterleistung! -${dmg*4} HP + DoT: ${this.dot} Runden`);
                                
                                savestate.eHP -= dmg*2;        
                                sleep(800).then(() => {
                                    savestate.eHP -= dmg*2;
                                })
                                
                              
                            savestate.eHP -= savestate.currentEnemy.attack*0.5;
                    
                    sleep(1700).then(() => {
                       this.setMessage(`Du hast den Angriff des Gegners reflektiert!`); 
                    })       
                    
            }
            if(savestate.strongCd > 0){
                console.log("decrease Strong");
                savestate.strongCd = savestate.strongCd - 1 ;
            }
            this.account.savestate = savestate;
            this.storage.set('currentAccount', this.account);              
        }
        )}


        
    

    //=============================================
    //** ============ U T I L I T Y ============ */
    //==============================================
    buffAttack() {
        this.storage.get('currentAccount').then((val) => {
            this.account = val;
            this.account.savestate.hero.weapon.dmg += 1;
            this.storage.set('currentAccount', this.account);
        })
    }
    resetAttack() {
        this.storage.get('currentAccount').then((val) => {
            this.account = val;
            this.account.savestate.hero.weapon.dmg = 1;
            this.storage.set('currentAccount', this.account);
        })
    }

   
    shakeEnemy() {
        anime({
            targets: '#enemyCard',
            keyframes: [
                {translateY: -10},
                {translateX: -15},
                {translateY: 10},
                {translateX: 15},
                {translateY: 8},
                {translateY: -8},
                {translateX: 0},
                {translateY: 0},     
                            ],
            easing: 'easeOutElastic(7,2)',
            duration: 300, delay: 200
            });                   
    }

    shakeHero() {
        anime({
            targets: '#heroCard',
            keyframes: [
                {translateY: -10},
                {translateX: -15},
                {translateY: 10},
                {translateX: 15},
                {translateY: 8},
                {translateY: -8},
                {translateX: 0},
                {translateY: 0},    
                ],
                easing: 'easeOutElastic(7,2)',
                duration: 300, delay: 200
                });
    }

    shakeMessage() {
        anime({
            targets: '.message',
            keyframes: [
            {translateX: 350},
            {translateX: 0}
            ],
        delay: anime.stagger(150) // increase delay by 100ms for each elements.
  
        });
    }


     setMessage(message: string){
        this.shiftMessages();
        const sleep = (milliseconds) => {
            return new Promise(resolve => setTimeout(resolve, milliseconds))
        }
        sleep(500).then(() => {
            switch(this.currentMessage){
            case 4: this.currentMessage = 1;
            this.message1 = message;
            break;
            case 1: this.currentMessage = 2;
            this.message2 = message;
            break;
            case 2: this.currentMessage = 3;
            this.message3 = message;
            break;
            case 3: this.currentMessage = 4;
            this.message4 = message;
            break;
        }                         
        })
        
    }
    
    shiftMessages() {
        switch(this.currentMessage){
            case 4:
                var timeline = anime.timeline({
                    loop: false,
                    autoplay: true,
                    duration: 200,
                });
                timeline.add({
                    targets: '#m1',
                    keyframes: [
                        {translateX: this.w*2},               
                    ],easing: 'spring(1,90,10,30)'      
                })
                .add({
                    targets: ('#m2'),
                    keyframes: [
                        {translateY: -(this.h/13)}
                    ],easing: 'spring(1,90,10,30)' 
                
                })
                .add({
                    targets: ('#m3'),
                    keyframes: [
                        {translateY: -(this.h/13)}
                    ],easing: 'spring(1,90,10,30)' 
                })
                .add({
                    targets: ('#m4'),
                    keyframes: [
                        {translateY: -(this.h/13)}
                    ],easing: 'spring(1,90,10,30)' 
                })
                .add({
                    targets: ('#m1'),
                    keyframes: [
                        {translateY: (this.h/4.65)},
                        {translateX: 0}
                    ],easing: 'spring(1,90,10,30)' 
                });
                break;
            case 1:
                var timeline = anime.timeline({
                    loop: false,
                    autoplay: true,
                    duration: 200,
                });
                timeline.add({
                    targets: '#m2',
                    keyframes: [
                        {translateX: this.w*2},               
                    ],easing: 'spring(1,90,10,30)'
                })
                .add({
                    targets: ('#m3'),
                    keyframes: [
                        {translateY: -(this.h/6.8)}
                    ],easing: 'spring(1,90,10,30)'
                })
                .add({
                    targets: ('#m4'),
                    keyframes: [
                        {translateY: -(this.h/6.8)}
                    ],easing: 'spring(1,90,10,30)'
                })
                .add({
                    targets: ('#m1'),
                    keyframes: [
                        {translateY: (this.h/6.8)}
                    ],easing: 'spring(1,90,10,30)'
                })
                .add({
                    targets: ('#m2'),
                    keyframes: [
                        {translateY: (this.h/6.8)},
                        {translateX: 0}
                    ],easing: 'spring(1,90,10,30)'
                });
                break;
            
            case 2:
                var timeline = anime.timeline({
                    loop: false,
                    autoplay: true,
                    duration: 200,
                });
                timeline.add({
                    targets: '#m3',
                    keyframes: [
                        {translateX: this.w*2},               
                    ],easing: 'spring(1,90,10,30)'
                })
                .add({
                    targets: ('#m4'),
                    keyframes: [
                        {translateY: -(this.h/4.45)}
                    ],easing: 'spring(1,90,10,30)'
                })
                .add({
                    targets: ('#m1'),
                    keyframes: [
                        {translateY: (this.h/13)}
                    ],easing: 'spring(1,90,10,30)'
                })
                .add({
                    targets: ('#m2'),
                    keyframes: [
                        {translateY: (this.h/13)}
                    ],easing: 'spring(1,90,10,30)'
                })
                .add({
                    targets: ('#m3'),
                    keyframes: [
                        {translateY: (this.h/13)},
                        {translateX: 0}
                    ],easing: 'spring(1,90,10,30)'
                });
                break;
            
            case 3:
                var timeline = anime.timeline({
                    loop: false,
                    autoplay: true,
                    duration: 200,
                });
                timeline.add({
                    targets: '#m4',
                    keyframes: [
                        {translateX: this.w*2},               
                    ],easing: 'spring(1,90,10,30)'
                })
                .add({
                    targets: ('#m1'),
                    keyframes: [
                        {translateY: 0}
                    ],easing: 'spring(1,90,10,30)'
                })
                .add({
                    targets: ('#m2'),
                    keyframes: [
                        {translateY: 0}
                    ],easing: 'spring(1,90,10,30)'
                })
                .add({
                    targets: ('#m3'),
                    keyframes: [
                        {translateY: 0}
                    ],easing: 'spring(1,90,10,30)'
                })
                .add({
                    targets: ('#m4'),
                    keyframes: [
                        {translateY: 0},
                        {translateX: 0}
                    ],easing: 'spring(1,90,10,30)'
                });
                break;
        }
             
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

    test() {
        this.storage.get('currentAccount').then((val) => {
            this.account = val;
            console.log(this.account.savestate.currentEnemy);
        })
    }

    swipeNext() {
        this.slides.slideNext();
    }
    swipePrev() {
        this.slides.slidePrev();
    }

    stealEXP2() {
        this.storage.get('currentAccount').then((val) => {
            this.account = val;
            this.account.savestate.totalxp -= 100;
            this.storage.set('currentAccount', this.account);
        })     
    }

    public addGold() {
        this.storage.get('currentAccount').then((val) => {
            this.account = val;
            this.account.savestate.gold += 1000;

            this.storage.set('currentAccount',this.account);
        })
    }

ionViewWillLeave(){
    this.storage.get('currentAccount').then((val) => {
        this.account = val;
        const username = this.account.username;
        this.storage.set(username, this.account);
    })
    }
}





