import { Component } from '@angular/core';
import { IonicPage, App, NavController, NavParams, AlertController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';
import { SumbanganPage } from '../sumbangan/sumbangan';
import { KurirPilihPage } from '../kurir-pilih/kurir-pilih';
import { KonfirmasiBarangPage } from '../konfirmasi-barang/konfirmasi-barang';
import { HistoryPage } from '../history/history';
import { storage } from 'firebase';
import { Http } from '@angular/http';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { CallNumber} from '@ionic-native/call-number';



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
  image: string;
  hp: number;
  nama: string;
  status: string;
  alamat: string;
  key_barang: string;

  constructor(public navCtrl: NavController,
          private call: CallNumber, 
          public navParams: NavParams,
          public alertCtrl: AlertController,
          private fire: AngularFireAuth,
          private firedata: AngularFireDatabase,
          public app: App,
          private camera: Camera
          ) {

                {
              this.item = this.navParams.data;
              this.status = this.item.status;
              this.key_barang = this.item.$key;
              console.log("key barang", this.key_barang);
              console.log(this.item);
              this.ambilGambar();
              this.donatur = this.item.donatur;
              
            }
            this.firedata.object('/data_user/'+this.donatur).subscribe(data=>{
                this.hp = data.hp;
                this.nama = data.nama;
                this.alamat = data.alamat;
            });

  }

  async callNumber():Promise<any>{
      try{
        await this.call.callNumber(String(this.hp),true);
      }
      catch(e){
        console.error(e);
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
                // this.terima();
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


      ambilGambar() {
        storage().ref().child('picture/foto_barang_donatur/'+ this.item.donatur+'--'+this.item.$key).getDownloadURL().then(url =>{
          this.image=url;
        }).catch (error => {
          
        });
      }


  // terima(){
  //   var user = this.fire.auth.currentUser; 
  //   this.firedata.object('/data_barang_donatur/'+this.item.$key)
  //     .update({status: 2});
  // console.log('got data', user);
  // }

  terima(key_barang){
    this.app.getRootNav().push(KonfirmasiBarangPage, key_barang);
  }

  telepon(){

  }

  kurir(key_barang){
    this.app.getRootNav().push(KurirPilihPage, key_barang);
  }
}
