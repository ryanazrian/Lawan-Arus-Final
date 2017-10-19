import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LoginKurirPage } from './login-kurir';

@NgModule({
  declarations: [
    LoginKurirPage,
  ],
  imports: [
    IonicPageModule.forChild(LoginKurirPage),
  ],
  exports: [
    LoginKurirPage
  ]
})
export class LoginKurirPageModule {}
