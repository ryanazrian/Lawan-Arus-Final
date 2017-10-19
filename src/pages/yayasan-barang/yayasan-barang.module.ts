import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { YayasanBarangPage } from './yayasan-barang';

@NgModule({
  declarations: [
    YayasanBarangPage,
  ],
  imports: [
    IonicPageModule.forChild(YayasanBarangPage),
  ],
  exports: [
    YayasanBarangPage
  ]
})
export class YayasanBarangPageModule {}
