import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EditKurirPage } from './edit-kurir';

@NgModule({
  declarations: [
    EditKurirPage,
  ],
  imports: [
    IonicPageModule.forChild(EditKurirPage),
  ],
  exports: [
    EditKurirPage
  ]
})
export class EditKurirPageModule {}
