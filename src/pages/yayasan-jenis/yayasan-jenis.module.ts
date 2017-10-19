import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { YayasanJenisPage } from './yayasan-jenis';

@NgModule({
  declarations: [
    YayasanJenisPage,
  ],
  imports: [
    IonicPageModule.forChild(YayasanJenisPage),
  ],
  exports: [
    YayasanJenisPage
  ]
})
export class YayasanJenisPageModule {}
