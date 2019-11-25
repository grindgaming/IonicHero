import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TabBarComponent } from './tab-bar.component';

@NgModule({
  imports: [ CommonModule, FormsModule,IonicModule,],
  declarations: [TabBarComponent],
  exports: [TabBarComponent]
})
export class TabBarComponentModule {}
