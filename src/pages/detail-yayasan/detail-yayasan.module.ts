import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DetailYayasanPage } from './detail-yayasan';

@NgModule({
  declarations: [
    DetailYayasanPage,
  ],
  imports: [
    IonicPageModule.forChild(DetailYayasanPage),
  ],
  exports: [
    DetailYayasanPage
  ]
})
export class DetailYayasanPageModule {}
