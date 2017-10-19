import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { KurirPilihPage } from './kurir-pilih';

@NgModule({
  declarations: [
    KurirPilihPage,
  ],
  imports: [
    IonicPageModule.forChild(KurirPilihPage),
  ],
  exports: [
    KurirPilihPage
  ]
})
export class KurirPilihPageModule {}
