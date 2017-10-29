import { Component } from '@angular/core';
import { IonicPage, App, NavController, NavParams, AlertController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';
import { SumbanganPage } from '../sumbangan/sumbangan';
import { HistoryPage } from '../history/history';



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
          public alertCtrl: AlertController,
          private fire: AngularFireAuth,
          private firedata: AngularFireDatabase,
          public app: App,
          ) {

                {
              this.item = this.navParams.data;
              console.log(this.item);
            }

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetailPage');
  }
      doAlert() {
        let confirm = this.alertCtrl.create({
          title: 'Apakah Anda Yakin?',
          subTitle: 'Apakah Barang Sudah diterima',
          buttons: [
            {
              text: 'Tidak',
              handler: () => {
                console.log('Disagree clicked');
              }
            },
            {
              text: 'Ya',
              handler: () => {
                console.log('Agree clicked')
                // this.navCtrl.setRoot(MyApp);
                this.terima();
                //this.navCtrl.setRoot(HistoryPage);
                this.navCtrl.pop();
                
                // ,
                // this.data.logout();
                // this.app.getRootNav().setRoot(MyApp);
              }
            }
          ]
        });
        confirm.present();
      }




  terima(){
    var user = this.fire.auth.currentUser; 
    this.firedata.object('/data_barang_donatur/'+this.item.$key)
      .update({status: 2});
  console.log('got data', user);
  
  /*      console.log(this.nama_barang.value);
   console.log(this.volume_barang.value);
   console.log(this.berat_barang.value);
   console.log(this.keterangan.value);
   console.log(this.jenis_barang)*/
  }

}
