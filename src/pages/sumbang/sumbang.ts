import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';
import { HistoryPage } from '../history/history';
import {ListPage} from '../list/list';

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
  @ViewChild('jenis_barang') jenis_barang;
  @ViewChild('berat_barang') berat_barang;
  @ViewChild('deskripsi') deskripsi;
  status: string;
  name: string;
  @ViewChild('jumlah_barang') jumlah_barang;
  @ViewChild('kondisi_barang') kondisi_barang;


  yayasan: FirebaseObjectObservable<any[]>

  constructor(public navCtrl: NavController, 
              public navParams: NavParams, 
              public alerCtrl: AlertController,
              private fire:AngularFireAuth,
              private firedata: AngularFireDatabase
              ) {

                var user = this.fire.auth.currentUser;
                const donatur = this.firedata.object('/data_user/'+user.uid).subscribe(data =>{
                  this.name = data.name;
                })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad YayasanPostPage');
  }
    doAlert() {
    let alert = this.alerCtrl.create({
      title: 'Terima Kasih',
      subTitle: 'Tunggu yayasan untuk mengambil barang anda ya.',
      buttons: ['Ok']
    })
     .present()
  }

  post(){
      var user = this.fire.auth.currentUser; 
      this.firedata.list('/post_donatur/').push({user: user.uid,  nama_barang: this.nama_barang.value, 
          jenis_barang:this.jenis_barang, kondisi_barang: this.kondisi_barang, 
          jumlah_barang: this.jumlah_barang.value, deskripsi: this.deskripsi.value});
      console.log('got data', user);
   
/*      console.log(this.nama_barang.value);
      console.log(this.volume_barang.value);
      console.log(this.berat_barang.value);
      console.log(this.keterangan.value);
      console.log(this.jenis_barang)*/
      this.doAlert();
      this.navCtrl.setRoot(ListPage);

  }
}