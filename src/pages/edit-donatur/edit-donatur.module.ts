import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EditDonaturPage } from './edit-donatur';

@NgModule({
  declarations: [
    EditDonaturPage,
  ],
  imports: [
    IonicPageModule.forChild(EditDonaturPage),
  ],
  exports: [
    EditDonaturPage
  ]
})
export class EditDonaturPageModule {}
