import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, App } from 'ionic-angular';
import { storage } from 'firebase';
import { Http } from '@angular/http';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { CallNumber} from '@ionic-native/call-number';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';

/**
 * Generated class for the DonaturLihatPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-donatur-lihat',
  templateUrl: 'donatur-lihat.html',
})
export class DonaturLihatPage {
  key: string;
  pesan: string;
  image: string;

  constructor(public navCtrl: NavController,
            private call: CallNumber, 
            public navParams: NavParams,
            public alertCtrl: AlertController,
            private fire: AngularFireAuth,
            private firedata: AngularFireDatabase,
            public app: App,
            private camera: Camera
    )  {
            this.key = this.navParams.data;


            this.firedata.object('/data_barang_donatur/'+this.key).subscribe(data=>{
              this.pesan = data.pesan;
              this.image = data.image_konfirmasi;
          });


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DonaturLihatPage');
  }

}
