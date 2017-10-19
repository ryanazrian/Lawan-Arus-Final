import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RegisterKurirPage } from './register-kurir';

@NgModule({
  declarations: [
    RegisterKurirPage,
  ],
  imports: [
    IonicPageModule.forChild(RegisterKurirPage),
  ],
  exports: [
    RegisterKurirPage
  ]
})
export class RegisterKurirPageModule {}
