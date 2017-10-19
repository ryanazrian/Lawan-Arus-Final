import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { YayasanPostPage } from './yayasan-post';

@NgModule({
  declarations: [
    YayasanPostPage,
  ],
  imports: [
    IonicPageModule.forChild(YayasanPostPage),
  ],
  exports: [
    YayasanPostPage
  ]
})
export class YayasanPostPageModule {}
