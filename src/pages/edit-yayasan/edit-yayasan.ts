import { Component } from '@angular/core';
import { IonicPage, LoadingController, NavController, NavParams, App, AlertController,  ActionSheetController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';
import { ProfilYayasanPage } from '../profil-yayasan/profil-yayasan';
import { MyApp } from '../../app/app.component';
import { storage } from 'firebase';
import { Data } from '../../providers/data';
import { Http } from '@angular/http';
import { Camera, CameraOptions } from '@ionic-native/camera';
/**
 * Generated class for the EditYayasanPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-edit-yayasan',
  templateUrl: 'edit-yayasan.html',
})
export class EditYayasanPage {
  submitted = false;
  validKota = false;
  namapemilik: string;
  namayayasan: string;
  kota: string;
  email: string;
  alamat: string;
  hp: number;
  image: string;
  id_yayasan: string;
  deskripsi: string;


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
          

              var user = this.fire.auth.currentUser;
          this.firedata.object('/data_user/'+user.uid).subscribe(data=>{
            this.id_yayasan = data.id;
            this.namayayasan = data.namaYayasan;
            this.namapemilik = data.namaPemilik;
            this.alamat= data.alamat;
            this.kota = data.kota;
            this.hp = data.noHp;
            this.email = data.email;
            this.deskripsi = data.deskripsi;
            this.ambilGambar();
          })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditYayasanPage');
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

      const picture = storage().ref('picture/profileYayasan/'+ this.id_yayasan);
      picture.putString(this.image, 'data_url');

      storage().ref().child('picture/profileYayasan/'+ this.id_yayasan).getDownloadURL().then(url =>{
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

      const picture = storage().ref('picture/profileYayasan/'+ this.id_yayasan);
      picture.putString(this.image, 'data_url');
      this.firedata.object('/data_user/'+ this.id_yayasan).update({
        image: 'picture/profileYayasan/'+ this.id_yayasan + '.jpeg'
      })
            
      }, (err) => {
    });
  }

  ambilGambar() {
    storage().ref().child('picture/profileYayasan/'+ this.id_yayasan).getDownloadURL().then(url =>{
      this.image=url;
    })
  }

  

    edit(){
  		var user = this.fire.auth.currentUser;
  		this.firedata.object('/data_user/'+user.uid).update({
        namaPemilik: this.namapemilik,
        email: this.email,
        alamat: this.alamat,
        hp:this.hp,
        kota: this.kota,
        deskripsi: this.deskripsi,
        namaYayasan: this.namayayasan
        
  		});
  		this.navCtrl.pop();

  }
  cekProvinsi(){
    
        this.validKota = true;
     
     }


}
