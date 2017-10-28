import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController,ActionSheetController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { TabsYayasanPage } from '../tabs-yayasan/tabs-yayasan';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';
import { LoginPage } from '../login/login';
import { NgForm } from '@angular/forms';
import { MyApp } from '../../app/app.component';
import { storage } from 'firebase';
import { Data } from '../../providers/data';
import { Http } from '@angular/http';
import { Camera, CameraOptions } from '@ionic-native/camera';


/**
 * Generated class for the RegisterYayasanPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-register-yayasan',
  templateUrl: 'register-yayasan.html',
})
export class RegisterYayasanPage {
    @ViewChild('email') email;
    @ViewChild('password') password;
    @ViewChild('nama') nama;
    @ViewChild('alamat') alamat;
    @ViewChild('hp') hp;
    @ViewChild('namapemilik') namapemilik;
    @ViewChild('jenis') jenis;
   // @ViewChild('provinsi') provinsi;
   kota:string;
   id_yayasan: string;

   //buat ffungsi tilik password
  status:string;
  lihat = true;
  image: string;
 //buat ffungsi tilik password

  //ini buat validasi dokumen
   validPhoto= true;
   //



    yayasan : FirebaseObjectObservable<any[]>;

	    formone: FormGroup;
	    submitAttempt: boolean = false;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams, 
              public formBuilder: FormBuilder, 
              private fire: AngularFireAuth,
              private firedata: AngularFireDatabase,
              public alertCtrl: AlertController,
              public http: Http, 
              public data: Data,
              private camera: Camera,
              public loadCtrl: LoadingController,
              public actionSheetCtrl: ActionSheetController,
              ) {
    this.formone = formBuilder.group({
        nama: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
        namapemilik: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
        hp: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[0-9]*'), Validators.required])],
        email: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[A-Za-z0-9._%+-]{3,}@[a-zA-Z]{3,}([.]{1}[a-zA-Z]{2,}|[.]{1}[a-zA-Z]{2,}[.]{1}[a-zA-Z]{2,})'), Validators.required])],
        password: ['', Validators.compose([Validators.maxLength(15), Validators.minLength(6), Validators.required])],
        kota: ['', Validators.compose([Validators.required])],
        password1: ['']
    }, {
       // your validation method
    }
    )

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterYayasanPage');
    this.status = "password";
  }

    alert(message: string) {
    this.alertCtrl.create({
      title: 'Info!',
      subTitle: message,
      buttons: ['OK']
    }).present();
  }


  sendEmailVerification(){
    this.fire.authState.subscribe(user => {
      user.sendEmailVerification().then(()=> {
        console.log('email sent');
      })
    })

  }


   daftar(){
    // if(form.valid){
    this.fire.auth.createUserWithEmailAndPassword(this.email.value, this.password.value)
    .then(data => {
      this.sendEmailVerification();


      const yayasan = this.firedata.object('/data_user/'+ data.uid);
      yayasan.set({id:data.uid, 
        namaYayasan: this.nama.value,
        kota: this.kota, 
        namaPemilik: this.namapemilik.value, 
        email: this.email.value, 
        alamat:this.alamat.value, 
        noHp:this.hp.value, 
        jenis:2,
        kuota: 0})

      //yayasan.subscribe(data =>{})
      this.id_yayasan = data.uid;
      console.log('got data', data);
       //ambil foto
    const picture = storage().ref('picture/documentYayasan/'+this.id_yayasan);
    picture.putString(this.image, 'data_url');

    storage().ref().child('picture/documentYayasan/'+ this.id_yayasan).getDownloadURL().then(url =>{
      // ini kedata base
      this.firedata.object('/data_user/'+ this.id_yayasan).update({
      image: url })
    })
      this.alert("Berhasil Melakukan Pendaftaran, silahkan cek email anda");
      this.navCtrl.setRoot(LoginPage);
    })
    .catch (error => {
      console.log('got an error', error);
      this.alert(error.message);
    });

   

      console.log('Would register user with ', this.email.value, this.password.value);
  }

  showPassword(){
    this.status = "text";
    this.lihat = false;
    console.log(this.status);
  }


  hidePassword(){
    this.status = "password";
    this.lihat = true;
    console.log(this.status);
  }

  validate(){
    this.validPhoto = true;
  }

  uploadDocument() {
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

            
      }, (err) => {
    });
  }

  ambilGambar() {
    storage().ref().child('picture/documentYayasan/'+ this.id_yayasan).getDownloadURL().then(url =>{
      this.image=url;
    })
  }

  }

