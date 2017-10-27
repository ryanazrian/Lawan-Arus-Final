import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the DetailYayasanPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-detail-yayasan',
  templateUrl: 'detail-yayasan.html',
})
export class DetailYayasanPage {
  item: any;
  donatur: string;
  penerima: string;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.item = this.navParams.data;
    console.log(this.item.$key);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetailYayasanPage');
  }

}
