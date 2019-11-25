import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {IonicModule} from '@ionic/angular';
import {FormsModule} from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';

import {LoginPage} from './login.page';
import {BrowserModule} from '@angular/platform-browser';
import {IonicStorageModule} from '@ionic/storage';


@NgModule({
    imports: [

        CommonModule,
        FormsModule,
        IonicModule,
        IonicStorageModule.forRoot(),
        RouterModule.forChild([
            {
                path: '',
                component: LoginPage
            }
        ])
    ],
    declarations: [LoginPage]
})
export class LoginPageModule {
}
