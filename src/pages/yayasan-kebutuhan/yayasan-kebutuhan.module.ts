import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { YayasanKebutuhanPage } from './yayasan-kebutuhan';

@NgModule({
  declarations: [
    YayasanKebutuhanPage,
  ],
  imports: [
    IonicPageModule.forChild(YayasanKebutuhanPage),
  ],
  exports: [
    YayasanKebutuhanPage
  ]
})
export class YayasanKebutuhanPageModule {}
