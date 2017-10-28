import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DetailListPage } from './detail-list';

@NgModule({
  declarations: [
    DetailListPage,
  ],
  imports: [
    IonicPageModule.forChild(DetailListPage),
  ],
  exports: [
    DetailListPage
  ]
})
export class DetailListPageModule {}
