import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, App, ActionSheetController, LoadingController } from 'ionic-angular';
import { MyApp } from '../../app/app.component';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';
import { storage } from 'firebase';

import { Data } from '../../providers/data';
import { Http } from '@angular/http';
import { Camera, CameraOptions } from '@ionic-native/camera';

/**
 * Generated class for the KonfirmasiBarangPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-konfirmasi-barang',
  templateUrl: 'konfirmasi-barang.html',
})
export class KonfirmasiBarangPage {
  key_barang: string;
  image_konfirmasi: string;
  validFoto = false;
  pesan : string;

  constructor(    
    public navCtrl: NavController,
    public navParams: NavParams,
    public app: App,
    public alertCtrl: AlertController,
    private fire: AngularFireAuth,
    
    private firedata: AngularFireDatabase,
    public http: Http, 
    public data: Data,
    private camera: Camera,
    public loadCtrl: LoadingController,
    public actionSheetCtrl: ActionSheetController,
  ) {

    {
      this.key_barang = this.navParams.data;
      
    }

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad KonfirmasiBarangPage');
  }

  updatePicture() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Pilihan',
      buttons: [
        {
          text: 'Ambil Gambar Baru',
          role: 'ambilGambar',
          handler: () => {
            this.takePicture();
          }
        },
        {
          text: 'Pilih Dari Galleri',
          role: 'gallery',
          handler: () => {
            this.getPhotoFromGallery();
          }
        }
      ]
    });
    actionSheet.present();
  }


  async takePicture(){
    try {
      const options : CameraOptions = {
        quality: 50, //to reduce img size
        targetHeight: 600,
        targetWidth: 600,
        destinationType: this.camera.DestinationType.DATA_URL, //to make it base64 image
        encodingType: this.camera.EncodingType.JPEG,
        mediaType:this.camera.MediaType.PICTURE,
        correctOrientation: true
      }

      const result =  await this.camera.getPicture(options);

      this.image_konfirmasi = 'data:image/jpeg;base64,' + result;
      this.validFoto = true;
    }
    catch (e) {
      console.error(e);
      alert("error");
    }

  }

  getPhotoFromGallery(){
    this.camera.getPicture({
        destinationType: this.camera.DestinationType.DATA_URL,
        sourceType     : this.camera.PictureSourceType.PHOTOLIBRARY,
        targetWidth: 600,
        targetHeight: 600
    }).then((imageData) => {
      // this.base64Image = imageData;
      // this.uploadFoto();
      this.image_konfirmasi = 'data:image/jpeg;base64,' + imageData; 
      this.validFoto = true;
            
      }, (err) => {
    });
  }

  ambilGambar() {
    storage().ref().child('picture/KonfirmasiBarang/'+ this.key_barang).getDownloadURL().then(url =>{
      this.image_konfirmasi=url;

         this.firedata.object('/data_barang_donatur/'+ this.key_barang).update({
         image_konfirmasi: this.image_konfirmasi
       })
    }).catch (error => {
      
    });
  }
  
  edit(){
    var user = this.fire.auth.currentUser;
    this.firedata.object('/data_barang_donatur/'+ this.key_barang).update({
      status:2,
      pesan: this.pesan
    });
    
    if(this.validFoto == true){
      const picture = storage().ref('picture/KonfirmasiBarang/'+ this.key_barang);
      picture.putString(this.image_konfirmasi, 'data_url');
      
      storage().ref().child('picture/KonfirmasiBarang/'+ this.key_barang).getDownloadURL().then(url =>{
        this.firedata.object('/data_barang_donatur/'+ this.key_barang).update({
          image_konfirmasi: url
        })
      }).catch (error => {
        
      });
    }
    this.navCtrl.pop();

}

}
