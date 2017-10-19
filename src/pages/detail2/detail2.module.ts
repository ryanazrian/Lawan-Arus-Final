import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Detail2Page } from './detail2';

@NgModule({
  declarations: [
    Detail2Page,
  ],
  imports: [
    IonicPageModule.forChild(Detail2Page),
  ],
  exports: [
    Detail2Page
  ]
})
export class Detail2PageModule {}
