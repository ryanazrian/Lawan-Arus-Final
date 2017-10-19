import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CariYayasanPage } from './cari-yayasan';

@NgModule({
  declarations: [
    CariYayasanPage,
  ],
  imports: [
    IonicPageModule.forChild(CariYayasanPage),
  ],
  exports: [
    CariYayasanPage
  ]
})
export class CariYayasanPageModule {}
