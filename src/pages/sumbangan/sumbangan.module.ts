import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SumbanganPage } from './sumbangan';

@NgModule({
  declarations: [
    SumbanganPage,
  ],
  imports: [
    IonicPageModule.forChild(SumbanganPage),
  ],
  exports: [
    SumbanganPage
  ]
})
export class SumbanganPageModule {}
