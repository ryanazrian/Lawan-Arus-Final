import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RegisterYayasanPage } from './register-yayasan';

@NgModule({
  declarations: [
    RegisterYayasanPage,
  ],
  imports: [
    IonicPageModule.forChild(RegisterYayasanPage),
  ],
  exports: [
    RegisterYayasanPage
  ]
})
export class RegisterYayasanPageModule {}
