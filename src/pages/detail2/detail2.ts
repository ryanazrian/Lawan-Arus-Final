import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';
import { SumbanganPage } from '../sumbangan/sumbangan';
import {PetaPage} from '../peta/peta';



/**
 * Generated class for the DetailPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-detail2',
  templateUrl: 'detail2.html',
})
export class Detail2Page {
  item: any;
  donatur: string;
  penerima: string;
  status:number=1;

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
      subTitle: 'Donatur akan segera menghubungi anda',
      buttons: ['Ok']
    })
     .present()
  }

  sumbang(){

      var user = this.fire.auth.currentUser; 
      this.firedata.object('/post_donatur/'+this.item.$key)
        .update({status: this.status, penerima: user.uid});
      console.log('got data', user);
   
/*      console.log(this.nama_barang.value);
      console.log(this.volume_barang.value);
      console.log(this.berat_barang.value);
      console.log(this.keterangan.value);
      console.log(this.jenis_barang)*/
      this.doAlert();
  }

  loadMap(){
    this.navCtrl.push(PetaPage);
  }

}
