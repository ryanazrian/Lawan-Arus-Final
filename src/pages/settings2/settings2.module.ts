import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Settings2Page } from './settings2';

@NgModule({
  declarations: [
    Settings2Page,
  ],
  imports: [
    IonicPageModule.forChild(Settings2Page),
  ],
  exports: [
    Settings2Page
  ]
})
export class Settings2PageModule {}
