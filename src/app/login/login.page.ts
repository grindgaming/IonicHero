import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {NavController} from '@ionic/angular';
import {Storage} from '@ionic/storage';
import {AccountModel} from '../models/account-model';
import { NativePageTransitions, NativeTransitionOptions} from '@ionic-native/native-page-transitions/ngx';
//import * as anime from 'animejs';
import anime from 'animejs/lib/anime.es';
import { Flip } from 'number-flip';
 


@Component({
    selector: 'app-login',
    templateUrl: 'login.page.html',
    styleUrls: ['login.page.scss'],
})


export class LoginPage {
    

    private options: NativeTransitionOptions;
    username = '';
    password = '';
    private account: AccountModel;
    private keys: string[];
    private keysLength: number;

    constructor(private router: Router, private storage: Storage) {
        
    }
    ngOnInit() {
        
    }

flip() {
    new Flip({
  node: 'number',
  from: 9527,
  to: 42
})

}

    loginKnopfFunction() {
        
        if (this.username === '' || this.password === '') {
            alert('Bitte tragen Sie Ihre Logindaten ein!');
        } else {
            this.storage.keys().then((k) => {
                console.log(k);
            })
            this.storage.get(this.username).then((val) => { 
                this.account = val;
                if(val){
                    if(this.account.password === this.password){
                        
                        this.storage.set("currentAccount", this.account);
                        console.log(this.account.savestate.hero.klasse);
                        if(this.account.savestate.hero.klasse === "") {
                            
                            this.router.navigate(['class-select']);
                        }else {
                        this.router.navigate(['home']); 
                        }
                    } else {
                        alert('Benutzername oder Passwort falsch!');
                    }       
                }else {
                    alert('Benutzername oder Passwort falsch!');
                }
                
            })
        }
             
    }

    removeKeys() {
        

      this.storage.forEach((value: any, key: string, iterationNumber: Number) => {
        this.storage.remove(key).then(() => {});
        })  
    
  }

 callAnime() {
    anime({
  targets: '.box',
  keyframes: [
      {translateX: 270},
      {translateX: 0}
  ],
  
  delay: anime.stagger(200) // increase delay by 100ms for each elements.
  
});

 anime({
  targets: '.bux',
  scale: [
    {value: .1, easing: 'easeOutSine', duration: 500},
    {value: 1, easing: 'easeInOutQuad', duration: 1200}
  ],
  delay: anime.stagger(200, {grid: [14, 5], from: 'center'})
});


}



}
