import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { KonfirmasiBarangPage } from './konfirmasi-barang';

@NgModule({
  declarations: [
    KonfirmasiBarangPage,
  ],
  imports: [
    IonicPageModule.forChild(KonfirmasiBarangPage),
  ],
  exports: [
    KonfirmasiBarangPage
  ]
})
export class KonfirmasiBarangPageModule {}
