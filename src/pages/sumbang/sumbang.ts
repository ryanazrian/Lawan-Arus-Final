import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';
import { HistoryPage } from '../history/history';

/**
 * Generated class for the YayasanPostPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-sumbang',
  templateUrl: 'sumbang.html',
})
export class SumbangPage {
  @ViewChild('nama_barang') nama_barang;
  // @ViewChild('jenis_barang') jenis_barang;
  @ViewChild('berat_barang') berat_barang;
  @ViewChild('volume_barang') volume_barang;
  @ViewChild('keterangan') keterangan;
  jenis_barang:string;

  yayasan: FirebaseObjectObservable<any[]>

  constructor(public navCtrl: NavController, 
              public navParams: NavParams, 
              public alerCtrl: AlertController,
              private fire:AngularFireAuth,
              private firedata: AngularFireDatabase
              ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad YayasanPostPage');
  }
    doAlert() {
    let alert = this.alerCtrl.create({
      title: 'Terima Kasih',
      subTitle: 'Terima Kasih sudah meminta sumbangan, Tunggu donatur menyumbangkan barangnya',
      buttons: ['Ok']
    })
     .present()
  }

  post(){
      var user = this.fire.auth.currentUser; 
      this.firedata.list('/post_donatur/')
        .push({user: user.uid,  nama_barang: this.nama_barang.value, jenis_barang:this.jenis_barang, volume_barang: this.volume_barang.value, keterangan: this.keterangan.value});
      console.log('got data', user);
   
/*      console.log(this.nama_barang.value);
      console.log(this.volume_barang.value);
      console.log(this.berat_barang.value);
      console.log(this.keterangan.value);
      console.log(this.jenis_barang)*/
      this.doAlert();
  }
}
