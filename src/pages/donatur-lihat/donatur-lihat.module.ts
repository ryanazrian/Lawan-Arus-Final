import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DonaturLihatPage } from './donatur-lihat';

@NgModule({
  declarations: [
    DonaturLihatPage,
  ],
  imports: [
    IonicPageModule.forChild(DonaturLihatPage),
  ],
  exports: [
    DonaturLihatPage
  ]
})
export class DonaturLihatPageModule {}
