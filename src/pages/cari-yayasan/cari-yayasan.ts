import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Detail2Page } from '../detail2/detail2';


/**
 * Generated class for the CariYayasanPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-cari-yayasan',
  templateUrl: 'cari-yayasan.html',
})
export class CariYayasanPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CariYayasanPage');
  }

    detail2(){

	//this.navCtrl.setRoot(Detail2Page);
		this.navCtrl.push(Detail2Page);

	}


}
