import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Home1Page } from './home1';

@NgModule({
  declarations: [
    Home1Page,
  ],
  imports: [
    IonicPageModule.forChild(Home1Page),
  ],
  exports: [
    Home1Page
  ]
})
export class Home1PageModule {}
