import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TabsKurirPage } from '../tabs-kurir/tabs-kurir';

/**
 * Generated class for the KurirPilihPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-kurir-pilih',
  templateUrl: 'kurir-pilih.html',
})
export class KurirPilihPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad KurirPilihPage');
  }

  daftar(){
  		this.navCtrl.setRoot(TabsKurirPage);

  }

}
