import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { KonfirmasiYayasanPage } from './konfirmasi-yayasan';

@NgModule({
  declarations: [
    KonfirmasiYayasanPage,
  ],
  imports: [
    IonicPageModule.forChild(KonfirmasiYayasanPage),
  ],
  exports: [
    KonfirmasiYayasanPage
  ]
})
export class KonfirmasiYayasanPageModule {}
