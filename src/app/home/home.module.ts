import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {IonicModule} from '@ionic/angular';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';

import {HomePage} from './home.page';
import {IonicStorageModule} from '@ionic/storage';
import { TabBarComponentModule } from '../tab-bar/tab-bar.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        IonicStorageModule,
        RouterModule.forChild([
            {
                path: '',
                component: HomePage
            }
        ]),
        TabBarComponentModule
    ],
    declarations: [HomePage]
})
export class HomePageModule {
}
