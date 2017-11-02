import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LaporYayasanPage } from './lapor-yayasan';

@NgModule({
  declarations: [
    LaporYayasanPage,
  ],
  imports: [
    IonicPageModule.forChild(LaporYayasanPage),
  ],
  exports: [
    LaporYayasanPage
  ]
})
export class LaporYayasanPageModule {}
