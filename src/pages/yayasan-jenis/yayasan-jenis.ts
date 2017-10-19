import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { YayasanBarangPage } from '../yayasan-barang/yayasan-barang';


/**
 * Generated class for the YayasanJenisPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-yayasan-jenis',
  templateUrl: 'yayasan-jenis.html',
})
export class YayasanJenisPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad YayasanJenisPage');
  }

  detail(){

	//this.navCtrl.setRoot(Detail1Page);
		this.navCtrl.push(YayasanBarangPage);

	}


}
