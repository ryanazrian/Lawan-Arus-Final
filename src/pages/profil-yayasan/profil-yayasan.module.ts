import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProfilYayasanPage } from './profil-yayasan';

@NgModule({
  declarations: [
    ProfilYayasanPage,
  ],
  imports: [
    IonicPageModule.forChild(ProfilYayasanPage),
  ],
  exports: [
    ProfilYayasanPage
  ]
})
export class ProfilYayasanPageModule {}
