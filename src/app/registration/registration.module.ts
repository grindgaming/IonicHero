import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {Routes, RouterModule} from '@angular/router';

import {IonicModule} from '@ionic/angular';
import {IonicStorageModule} from '@ionic/storage';

import {RegistrationPage} from './registration.page';


const routes: Routes = [
    {
        path: '',
        component: RegistrationPage
    }
];

@NgModule({
    imports: [
        CommonModule,
        IonicStorageModule.forRoot(),
        FormsModule,
        IonicModule,
        RouterModule.forChild([
            {
                path: '',
                component: RegistrationPage
            }
        ])
    ],
    declarations: [RegistrationPage]
})
export class RegistrationPageModule {


}






