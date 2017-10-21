import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App, AlertController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';
import { EditKurirPage } from '../edit-kurir/edit-kurir';

/**
 * Generated class for the Settings2Page page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-settings2',
  templateUrl: 'settings2.html',
})
export class Settings2Page {
  nama: string;
	alamat: string;
	hp: string;
	email: string;

  constructor(public navCtrl: NavController,
              public navParams: NavParams, 
              public app:App, 
              public alertCtrl: AlertController,
              private fire: AngularFireAuth,
              private firedata: AngularFireDatabase
              ) {
                var user = this.fire.auth.currentUser;
                const donatur = this.firedata.object('/data_user/'+user.uid).subscribe(data =>{
                  this.nama = data.name;
                  this.email = data.email;
                  this.alamat = data.alamat;
                  this.hp = data.hp;
                })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Settings2Page');
  }
  keluar(){

      this.fire.auth.signOut;
    	this.app.getRootNav().setRoot(LoginPage);
    		//this.navCtrl.push(LoginPage);

	}

     edit() {
       this.navCtrl.push(EditKurirPage);

  }
}