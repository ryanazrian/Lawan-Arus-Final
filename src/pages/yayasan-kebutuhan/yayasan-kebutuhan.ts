import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
//import { YayasanJenisPage } from '../yayasan-jenis/yayasan-jenis';
import { TabsYayasanPage } from '../tabs-yayasan/tabs-yayasan';


/**
 * Generated class for the YayasanKebutuhanPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-yayasan-kebutuhan',
  templateUrl: 'yayasan-kebutuhan.html',
})
export class YayasanKebutuhanPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad YayasanKebutuhanPage');
  }

  kebutuhan(){

  //this.navCtrl.setRoot(YayasanKebutuhanPage);
    this.navCtrl.push(TabsYayasanPage);

  }

 

}
