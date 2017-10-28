import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DetailKurirPage } from './detail-kurir';

@NgModule({
  declarations: [
    DetailKurirPage,
  ],
  imports: [
    IonicPageModule.forChild(DetailKurirPage),
  ],
  exports: [
    DetailKurirPage
  ]
})
export class DetailKurirPageModule {}
