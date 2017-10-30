import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';
import { MyApp } from '../../app/app.component';
import { storage } from 'firebase';
import { Http } from '@angular/http';
import { Camera, CameraOptions } from '@ionic-native/camera';



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
  image: string;
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public alertCtrl: AlertController,
              private fire: AngularFireAuth,
              private firedata: AngularFireDatabase,
              private camera: Camera,) {

                this.item = this.navParams.data;
                console.log(this.item.$key);
                this.ambilGambar();

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetailListPage');
    console.log(this.item);
  }

  ambilGambar() {
    storage().ref().child('picture/foto_barang_donatur/'+ this.item.donatur+'--'+this.item.$key).getDownloadURL().then(url =>{
      this.image=url;
    }).catch (error => {
      
    });
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
