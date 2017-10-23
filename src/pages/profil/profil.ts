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

  ambilGambar() {
    storage().ref().child('picture/profileDonatur/'+ this.id_donatur).getDownloadURL().then(url =>{
      this.image=url;
    })
  }

}
