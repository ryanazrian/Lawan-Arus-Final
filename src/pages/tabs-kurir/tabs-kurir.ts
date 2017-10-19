import { Component } from '@angular/core';

import { Home2Page } from '../home2/home2';
import { Settings2Page } from '../settings2/settings2';
import { KurirPage } from '../kurir/kurir';
import { History2Page } from '../history2/history2';

@Component({
  templateUrl: 'tabs-kurir.html'
})
export class TabsKurirPage {

  tab1Root = Home2Page;
  tab2Root = KurirPage;
  tab3Root = History2Page;
  tab4Root = Settings2Page;

  constructor() {

  }
}
