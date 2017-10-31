import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PertaminaPage } from './pertamina';

@NgModule({
  declarations: [
    PertaminaPage,
  ],
  imports: [
    IonicPageModule.forChild(PertaminaPage),
  ],
  exports: [
    PertaminaPage
  ]
})
export class PertaminaPageModule {}
