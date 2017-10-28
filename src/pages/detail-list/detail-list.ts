import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';



/**
 * Generated class for the DetailListPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-detail-list',
  templateUrl: 'detail-list.html',
})
export class DetailListPage {

  item: any;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public alertCtrl: AlertController,
              private fire: AngularFireAuth,
              private firedata: AngularFireDatabase) {

                this.item = this.navParams.data;
                console.log(this.item.$key);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetailListPage');
  }
  // doAlert() {
  //   let confirm = this.alertCtrl.create({
  //     title: 'Apakah Anda Yakin?',
  //     subTitle: 'Apakah Barang Sudah diterima',
  //     buttons: [
  //       {
  //         text: 'Tidak',
  //         handler: () => {
  //           console.log('Disagree clicked');
  //         }
  //       },
  //       {
  //         text: 'Ya',
  //         handler: () => {
  //           console.log('Agree clicked')
  //           // this.navCtrl.setRoot(MyApp);
  //           this.terima();
  //           this.navCtrl.setRoot(Home1Page);
  //           // ,
  //           // this.data.logout();
  //           // this.app.getRootNav().setRoot(MyApp);
  //         }
  //       }
  //     ]
  //   });
  //   confirm.present();
  // }




// terima(){
// var user = this.fire.auth.currentUser; 
// this.firedata.object('/post_donatur/'+this.item.$key)
//   .update({status: 2});
// console.log('got data', user);

/*      console.log(this.nama_barang.value);
console.log(this.volume_barang.value);
console.log(this.berat_barang.value);
console.log(this.keterangan.value);
console.log(this.jenis_barang)*/
}
