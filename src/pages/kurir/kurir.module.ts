import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { KurirPage } from './kurir';

@NgModule({
  declarations: [
    KurirPage,
  ],
  imports: [
    IonicPageModule.forChild(KurirPage),
  ],
  exports: [
    KurirPage
  ]
})
export class KurirPageModule {}
