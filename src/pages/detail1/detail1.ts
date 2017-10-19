import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';
import { SumbanganPage } from '../sumbangan/sumbangan';



/**
 * Generated class for the DetailPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-detail1',
  templateUrl: 'detail1.html',
})
export class Detail1Page {
  item: any;
  donatur: string;
  penerima: string;

  constructor(public navCtrl: NavController, 
          public navParams: NavParams,
          public alerCtrl: AlertController,
          private fire: AngularFireAuth,
          private firedata: AngularFireDatabase
          ) {

                {
              this.item = this.navParams.data;
              console.log(this.item.$key);
            }

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetailPage');
  }
      doAlert() {
    let alert = this.alerCtrl.create({
      title: 'Terima Kasih',
      subTitle: 'Terima Kasih sudah menyumbang, Tunggu yayasan menghubungi anda',
      buttons: ['Ok']
    })
     .present()
  }

  sumbang(penerima){

      this.navCtrl.push(SumbanganPage, {penerima: this.item.$key});
      // var user = this.fire.auth.currentUser;
      // this.firedata.object('/data_barang_yayasan/'+this.item.$key)
      // .update({donatur:1})

      // this.doAlert();
  }

}
