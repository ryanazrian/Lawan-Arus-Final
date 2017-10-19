import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PeminatPage } from './peminat';

@NgModule({
  declarations: [
    PeminatPage,
  ],
  imports: [
    IonicPageModule.forChild(PeminatPage),
  ],
  exports: [
    PeminatPage
  ]
})
export class PeminatPageModule {}
