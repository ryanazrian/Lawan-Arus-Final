import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App, AlertController } from 'ionic-angular';

import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';

import { ProfilYayasanPage } from '../profil-yayasan/profil-yayasan';
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
	namapemilik: string;
  email: string;
  alamat: string;
	hp: number;

  constructor(public navCtrl: NavController, 
  			public navParams: NavParams,	
  			public app: App,
  			public alertCtrl: AlertController,
  			private fire: AngularFireAuth,
  			private firedata: AngularFireDatabase

  			) {

              var user = this.fire.auth.currentUser;
          this.firedata.object('/data_yayasan/'+user.uid).subscribe(data=>{
            this.namapemilik = data.namaPemilik;
            this.alamat= data.alamat;
            this.hp = data.noHp;
            this.email = data.email;
            //this.email = data.email;
          })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditYayasanPage');
  }

    edit(){
  		var user = this.fire.auth.currentUser;
  		this.firedata.object('/data_yayasan/'+user.uid).update({
        namaPemilik: this.namapemilik,
        email: this.email,
        alamat: this.alamat,
        hp:this.hp

  		});
  		this.navCtrl.setRoot(ProfilYayasanPage);

  }

}
