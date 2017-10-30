import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App, ActionSheetController, AlertController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';
import { Data } from '../../providers/data';
import { EditYayasanPage } from '../edit-yayasan/edit-yayasan';
import { LoginPage } from '../login/login';
import { MyApp } from '../../app/app.component';
import { storage } from 'firebase';
import { Http } from '@angular/http';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { DocumentYayasanPage } from "../document-yayasan/document-yayasan";

// import { LoginYayasanPage } from '../login-yayasan/login-yayasan';
/**
 * Generated class for the ProfilYayasanPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-profil-yayasan',
  templateUrl: 'profil-yayasan.html',
})
export class ProfilYayasanPage {
	namaYayasan: string;
	namaPemilik: string;
	nomorPonsel: number;
	email: string;
	alamat: string;
  kota: string;
  id_yayasan: string;
  image: string;
  deskripsi: string;

  constructor(public navCtrl: NavController, 
  			public navParams: NavParams,
  			public app: App,
  			public alertCtrl: AlertController,
  			private fire:AngularFireAuth,
        private firedata: AngularFireDatabase,
        public data: Data,
        private camera: Camera,
        public actionSheetCtrl: ActionSheetController,

  			) {
          var user = this.fire.auth.currentUser;
          this.firedata.object('/data_user/'+user.uid).subscribe(data=>{
            this.namaYayasan = data.namaYayasan;
            this.namaPemilik = data.namaPemilik;
            this.kota = data.kota;
            this.alamat= data.alamat;
            this.nomorPonsel = data.noHp;
            this.email = data.email;
            this.id_yayasan= data.id;
            this.deskripsi = data.deskripsi;
            console.log(data);
            this.ambilGambar();
          });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilYayasanPage');
  }
  keluar(){
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

  edit(){
    // untuk push page dengan tabs dihide
    this.app.getRootNav().push(EditYayasanPage);
  }

  ambilGambar() {
    storage().ref().child('picture/profileYayasan/'+ this.id_yayasan).getDownloadURL().then(url =>{
      this.image=url;
    }).catch (error => {
      
    });
  }

  lihatDokumen(){
    this.navCtrl.push(DocumentYayasanPage);
  }

}
