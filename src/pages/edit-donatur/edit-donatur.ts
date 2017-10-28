import { ProfilPage } from '../profil/profil';

import { Component } from '@angular/core';
import { IonicPage,LoadingController, NavController, NavParams, AlertController, App, ActionSheetController } from 'ionic-angular';

import { MyApp } from '../../app/app.component';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';


import { storage } from 'firebase';

import { Data } from '../../providers/data';
import { Http } from '@angular/http';
import { Camera, CameraOptions } from '@ionic-native/camera';

/**
 * Generated class for the EditDonaturPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-edit-donatur',
  templateUrl: 'edit-donatur.html',
})
export class EditDonaturPage {
  submitted = false;
  validKota = false;
  nama:string;
  alamat:string;
  hp:string;
  email: string;
  id_donatur: string;
  image: string;
  kota: string;


  constructor(public navCtrl: NavController,
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
          

              var user = this.fire.auth.currentUser;
          this.firedata.object('/data_user/'+user.uid).subscribe(data=>{
            this.nama = data.nama;
            this.alamat= data.alamat;
            this.kota = data.kota;
            this.hp = data.hp;
            this.email = data.email;
            this.id_donatur= data.id;
            this.ambilGambar();
          })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditDonaturPage');
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

      this.image = 'data:image/jpeg;base64,' + result;

      const picture = storage().ref('picture/profileDonatur/'+ this.id_donatur);
      picture.putString(this.image, 'data_url');

      storage().ref().child('picture/profileDonatur/'+ this.id_donatur).getDownloadURL().then(url =>{
        // ini kedata base
        this.firedata.object('/data_user/'+ this.id_donatur).update({
        image: url })
      })
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
      this.image = 'data:image/jpeg;base64,' + imageData;

      const picture = storage().ref('picture/profileDonatur/'+ this.id_donatur);
      picture.putString(this.image, 'data_url');
      this.firedata.object('/data_user/'+ this.id_donatur).update({
        image: 'picture/profileDonatur/'+ this.id_donatur + '.jpeg'
      })
            
      }, (err) => {
    });
  }

  ambilGambar() {
    storage().ref().child('picture/profileDonatur/'+ this.id_donatur).getDownloadURL().then(url =>{
      this.image=url;
    })
  }

  

    edit(){
  		var user = this.fire.auth.currentUser;
  		this.firedata.object('/data_user/'+user.uid).update({
        name: this.nama,
        alamat: this.alamat,
        hp:this.hp,
        email: this.email,
        kota: this.kota,
        
  		});
  		this.navCtrl.setRoot(ProfilPage);

  }
  cekProvinsi(){
    
        this.validKota = true;
     
     }

}