import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {Storage} from '@ionic/storage';
import {AccountModel} from '../models/account-model';
import { NativePageTransitions, NativeTransitionOptions} from '@ionic-native/native-page-transitions/ngx';



@Component({
    selector: 'app-registration',
    templateUrl: './registration.page.html',
    styleUrls: ['./registration.page.scss'],
})
export class RegistrationPage {


    username = '';
    email = '';
    password = '';


    constructor(private router: Router, private storage: Storage, private nativePageTransitions: NativePageTransitions) {
    }


    saveRegi() {

        const account: AccountModel = new AccountModel(this.username, this.email, this.password);
        console.log(this.username);
        this.storage.set(this.username, account);
        this.router.navigate(['/login']);


    }

}
