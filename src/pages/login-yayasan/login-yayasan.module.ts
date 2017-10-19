	import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LoginYayasanPage } from './login-yayasan';

@NgModule({
  declarations: [
    LoginYayasanPage,
  ],
  imports: [
    IonicPageModule.forChild(LoginYayasanPage),
  ],
  exports: [
    LoginYayasanPage
  ]
})
export class LoginYayasanPageModule {}
