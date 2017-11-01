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
import { ProfilYayasanPage } from "../profil-yayasan/profil-yayasan";

/**
 * Generated class for the DocumentEditYayasanPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-document-edit-yayasan',
  templateUrl: 'document-edit-yayasan.html',
})
export class DocumentEditYayasanPage {
  image: string;
  
  id: any;
  validFoto= false;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private firedata: AngularFireDatabase,
    public http: Http, 
    public data: Data,
    private camera: Camera,
    public loadCtrl: LoadingController,
    public actionSheetCtrl: ActionSheetController,
    private fire: AngularFireAuth,
  ) {
    this.data.getData().then((data) => {
      this.id = data.id;
      console.log(data);
      this.ambilGambar();
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DocumentEditYayasanPage');
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
      this.image = 'data:image/jpeg;base64,' + imageData; 
      this.validFoto = true;
            
      }, (err) => {
    });
  }

  edit(){
    if(this.validFoto == true){
      var user = this.fire.auth.currentUser;
      const picture = storage().ref('picture/documentYayasan/'+ this.id);
      picture.putString(this.image, 'data_url');
      this.firedata.object('/data_user/'+ this.id).update({
        image: 'picture/documentYayasan/'+ this.id + '.jpeg'
      })
    } 
    this.navCtrl.setRoot(ProfilYayasanPage);

}

ambilGambar() {
  storage().ref().child('picture/documentYayasan/'+ this.id).getDownloadURL().then(url =>{
    this.image=url;
  }).catch (error => {
    
  });
}
}
