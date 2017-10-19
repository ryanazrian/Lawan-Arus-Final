import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SumbangPage } from './sumbang';

@NgModule({
  declarations: [
    SumbangPage,
  ],
  imports: [
    IonicPageModule.forChild(SumbangPage),
  ],
  exports: [
    SumbangPage
  ]
})
export class SumbangPageModule {}
