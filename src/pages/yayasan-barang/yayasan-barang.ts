import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';

/**
 * Generated class for the YayasanBarangPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-yayasan-barang',
  templateUrl: 'yayasan-barang.html',
})
export class YayasanBarangPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public alerCtrl: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad YayasanBarangPage');
  }

  minat() {
    let alert = this.alerCtrl.create({
      title: 'Terima Kasih',
      message: 'Silahkan tunggu konfirmasi Donatur',
      buttons: ['Ok']
    });
    alert.present()
  }

}
