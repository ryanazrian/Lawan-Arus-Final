import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DocumentYayasanPage } from './document-yayasan';

@NgModule({
  declarations: [
    DocumentYayasanPage,
  ],
  imports: [
    IonicPageModule.forChild(DocumentYayasanPage),
  ],
  exports: [
    DocumentYayasanPage
  ]
})
export class DocumentYayasanPageModule {}
