import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Detail1Page } from './detail1';

@NgModule({
  declarations: [
    Detail1Page,
  ],
  imports: [
    IonicPageModule.forChild(Detail1Page),
  ],
  exports: [
    Detail1Page
  ]
})
export class Detail1PageModule {}
