import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EditYayasanPage } from './edit-yayasan';

@NgModule({
  declarations: [
    EditYayasanPage,
  ],
  imports: [
    IonicPageModule.forChild(EditYayasanPage),
  ],
  exports: [
    EditYayasanPage
  ]
})
export class EditYayasanPageModule {}
