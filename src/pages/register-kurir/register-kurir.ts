import { Component } from '@angular/core';
import { IonicPage,LoadingController, NavController, NavParams, AlertController, App, ActionSheetController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { LoginPage } from '../login/login';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';
import { KurirPage } from '../kurir/kurir';

import { MyApp } from '../../app/app.component';
import { storage } from 'firebase';
import { Data } from '../../providers/data';
import { Http } from '@angular/http';
import { Camera, CameraOptions } from '@ionic-native/camera'


/**
 * Generated class for the RegisterYayasanPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-register-kurir',
  templateUrl: 'register-kurir.html',
})
export class RegisterKurirPage {
nama : string;
hp   : string; 
image: string;
id_yayasan: string;
id_kurir: string;
  

  kurir: FirebaseObjectObservable<any[]>;

	 static MatchPassword(AC: AbstractControl) {
       let password = AC.get('password').value; // to get value in input tag
       let password1 = AC.get('password1').value; // to get value in input tag
        if(password != password1) {
            console.log('false');
            AC.get('password1').setErrors( {MatchPassword: true} )
        } else {
            console.log('true');
            return null
        }
    }

	    formone: FormGroup;
	    submitAttempt: boolean = false;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams, 
              public formBuilder: FormBuilder,
              public fire: AngularFireAuth,
              public firedata: AngularFireDatabase,
              public alertCtrl: AlertController,
              public http: Http, 
              public data: Data,
              private camera: Camera,
              public loadCtrl: LoadingController,
              public actionSheetCtrl: ActionSheetController,
            ) {
    this.formone = formBuilder.group({
        nama: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
        email: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[A-Za-z0-9._%+-]{3,}@[a-zA-Z]{3,}([.]{1}[a-zA-Z]{2,}|[.]{1}[a-zA-Z]{2,}[.]{1}[a-zA-Z]{2,})'), Validators.required])],
        password: ['', Validators.compose([Validators.maxLength(15), Validators.minLength(6), Validators.required])],
        password1: [''], 
        alamat: [''],
        hp: ['', Validators.compose([ Validators.pattern('[0-9]*'), Validators.required])],        
    }, {
      validator: RegisterKurirPage.MatchPassword // your validation method
    }
    )

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterKurirPage');
  }


  alert(message: string) {
    this.alertCtrl.create({
      title: 'Info!',
      subTitle: message,
      buttons: ['OK']
    }).present();
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

      const picture = storage().ref('picture/foto_kurir/'+ this.id_yayasan);
      picture.putString(this.image, 'data_url');

      storage().ref().child('picture/foto_kurir/'+ this.id_yayasan).getDownloadURL().then(url =>{
        // ini kedata base
        this.firedata.object('/data_user/'+ this.id_yayasan).update({
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

      const picture = storage().ref('picture/foto_kurir/'+ this.id_yayasan);
      picture.putString(this.image, 'data_url');
      this.firedata.object('/data_user/'+ this.id_yayasan).update({
        image: 'picture/foto_kurir/'+ this.id_yayasan + '.jpeg'
      })
            
      }, (err) => {
    });
  }

  ambilGambar() {
    storage().ref().child('picture/foto_kurir/'+ this.id_yayasan+'--'+this.id_kurir).getDownloadURL().then(url =>{
      this.image=url;
    })
  }

  tambahkurir(){
    var user = this.fire.auth.currentUser; 
    this.firedata.list('/data_kurir/'+user.uid).push(
      {
        yayasan:user.uid, 
        nama: this.nama, 
        hp: this.hp
      });
      this.id_yayasan = user.uid;
    console.log('got data', user);
 
    this.alert("Kurir Berhasil Ditambahkan");
    this.navCtrl.setRoot(KurirPage);
}

}
