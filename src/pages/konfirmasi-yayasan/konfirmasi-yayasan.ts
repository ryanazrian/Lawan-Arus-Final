import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';



/**
 * Generated class for the KonfirmasiYayasanPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-konfirmasi-yayasan',
  templateUrl: 'konfirmasi-yayasan.html',
})
export class KonfirmasiYayasanPage {
  item:any;
  donatur: string;
  penerima: string;
  status:number=1;

  constructor(public navCtrl: NavController, 
              public alerCtrl: AlertController, 
              public navParams: NavParams,
              private fire: AngularFireAuth,
              private firedata: AngularFireDatabase
            ) {
    this.item = this.navParams.data;
    console.log(this.item.$key);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad KonfirmasiYayasanPage');

  }
  doAlert() {
    let alert = this.alerCtrl.create({
      title: 'Terima Kasih',
      subTitle: 'Donatur akan segera menghubungi anda',
      buttons: ['Ok']
    })
     .present()
  }


  kurir(){
     var user = this.fire.auth.currentUser; 
     this.firedata.object('/post_donatur/'+this.item.$key)
       .update({status: this.status, penerima: user.uid, kurir:1});
   console.log('got data', user);
 
/*      console.log(this.nama_barang.value);
    console.log(this.volume_barang.value);
    console.log(this.berat_barang.value);
    console.log(this.keterangan.value);
    console.log(this.jenis_barang)*/
    this.doAlert();
}


tidak(){
  var user = this.fire.auth.currentUser; 
  this.firedata.object('/post_donatur/'+this.item.$key)
    .update({status: this.status, penerima: user.uid, kurir:0});
console.log('got data', user);

/*      console.log(this.nama_barang.value);
 console.log(this.volume_barang.value);
 console.log(this.berat_barang.value);
 console.log(this.keterangan.value);
 console.log(this.jenis_barang)*/
 this.doAlert();
}

}
