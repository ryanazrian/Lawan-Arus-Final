import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App, AlertController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';

import { EditYayasanPage } from '../edit-yayasan/edit-yayasan';
import { LoginPage } from '../login/login';
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
	provinsi: string;

  constructor(public navCtrl: NavController, 
  			public navParams: NavParams,
  			public app: App,
  			public alertCtrl: AlertController,
  			private fire:AngularFireAuth,
  			private firedata: AngularFireDatabase,

  			) {
  			var user = this.fire.auth.currentUser;
  			const donatur = this.firedata.object('/data_user/'+user.uid).subscribe(data =>{
  				this.namaYayasan = data.namaYayasan;
  				this.email = data.email;
  				this.alamat = data.alamat;
					this.nomorPonsel = data.noHp;
					this.namaPemilik = data.namaPemilik;
					this.provinsi = data.provinsi;
  			})
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

  	this.navCtrl.push(EditYayasanPage);
  }

}
