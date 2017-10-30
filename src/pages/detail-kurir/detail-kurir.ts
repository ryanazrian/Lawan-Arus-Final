import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App, AlertController } from 'ionic-angular';


import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';

import { KurirPage } from '../kurir/kurir';
import { TabsYayasanPage } from '../tabs-yayasan/tabs-yayasan';


/**
 * Generated class for the DetailKurirPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-detail-kurir',
  templateUrl: 'detail-kurir.html',
})
export class DetailKurirPage {
  item: any;
  nama: string;
  hp: string;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public app: App,
              public alertCtrl: AlertController,
              private fire: AngularFireAuth,
              private firedata: AngularFireDatabase
            ) {
    this.item = this.navParams.data;
    this.nama = this.item.nama;
    this.hp = this.item.hp; 
    console.log(this.item.$key) 
    console.log(this.item) 
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetailKurirPage');
  }

  doAlert(title:string, isi: string) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: isi,
      buttons: ['Ok']
    })
     .present()
  }


  edit(){
    console.log(this.nama);
    var user = this.fire.auth.currentUser;
    this.firedata.object('/data_kurir/'+ user.uid + '/' + this.item.$key).set({
      nama: this.nama,
      hp:this.hp

    });
    this.doAlert("Berhasil", "Edit berhasil");
    this.navCtrl.popToRoot();
}


hapus(){
  console.log(this.nama);
  var user = this.fire.auth.currentUser;
  this.firedata.object('/data_kurir/'+ user.uid + '/' + this.item.$key).remove();
  this.doAlert("Berhasil", "Hapus berhasil");
  //this.navCtrl.setRoot(KurirPage);
  this.navCtrl.pop();
}

}
