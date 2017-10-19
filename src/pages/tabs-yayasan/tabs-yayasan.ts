import { Component } from '@angular/core';

import { HistoryPage } from '../history/history';
import { ProfilYayasanPage } from '../profil-yayasan/profil-yayasan';
import { Home1Page } from '../home1/home1';
import { YayasanPostPage } from '../yayasan-post/yayasan-post';
//import { SumbanganPage } from '../sumbangan/sumbangan';

@Component({
  templateUrl: 'tabs-yayasan.html'
})
export class TabsYayasanPage {

  tab1Root = Home1Page;
  tab2Root = HistoryPage;
  tab3Root = ProfilYayasanPage;

  constructor() {

  }
}
