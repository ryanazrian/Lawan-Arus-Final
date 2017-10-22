import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App, AlertController, ActionSheetController,LoadingController } from 'ionic-angular';
import { MainPage } from '../main/main';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';
import { EditDonaturPage } from '../edit-donatur/edit-donatur';
import { LoginPage } from '../login/login';
import { Data } from '../../providers/data';


import { MyApp } from '../../app/app.component';


import { storage } from 'firebase';

import { Http } from '@angular/http';
import { Camera, CameraOptions } from '@ionic-native/camera';


/**
 * Generated class for the ProfilPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-profil',
  templateUrl: 'profil.html',
})
export class ProfilPage {
  nama: string;
  email: string;
  alamat: string;
  hp: string;
  id_donatur: string;
  image: string;
  provinsi: string;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams, 
              public app:App, 
              public alertCtrl: AlertController, 
              private fire:AngularFireAuth, 
              private firedata: AngularFireDatabase,
              public data: Data,
              private camera: Camera,
              public actionSheetCtrl: ActionSheetController,

              ) {
                
                      this.data.getData().then((data) => {
                        this.nama = data.name;
                        this.provinsi = data.provinsi;
                        this.alamat= data.alamat;
                        this.hp = data.hp;
                        this.email = data.email;
                        this.id_donatur= data.id;
                        this.ambilGambar();
                      })
                
                
                  }
  

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilPage');
  }

  // keluar(){
  //   this.fire.auth.signOut;
  // 	this.app.getRootNav().setRoot(LoginPage);
  // 		//this.navCtrl.push(LoginPage);

  // }
  
  logOut(){
    let confirm = this.alertCtrl.create({
      title: 'Apakah Anda Yakin?',
      subTitle: 'Keluar dari akun akan menghapus semua data yang belum tersimpan.',
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
            this.fire.auth.signOut;
            this.data.logout();
            this.app.getRootNav().setRoot(LoginPage);
            // ,
            // this.data.logout();
            // this.app.getRootNav().setRoot(MyApp);
          }
        }
      ]
    });
    confirm.present();
  }



     edit() {
       //this.app.getRootNav().setRoot(LoginPage);
    this.navCtrl.push(EditDonaturPage);
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

}
