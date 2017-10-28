import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DocumentEditYayasanPage } from './document-edit-yayasan';

@NgModule({
  declarations: [
    DocumentEditYayasanPage,
  ],
  imports: [
    IonicPageModule.forChild(DocumentEditYayasanPage),
  ],
  exports: [
    DocumentEditYayasanPage
  ]
})
export class DocumentEditYayasanPageModule {}
