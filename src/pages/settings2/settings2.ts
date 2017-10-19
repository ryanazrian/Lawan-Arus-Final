import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App, AlertController } from 'ionic-angular';
import { LoginKurirPage } from '../login-kurir/login-kurir';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';
import { EditDonaturPage } from '../edit-donatur/edit-donatur';

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

  constructor(public navCtrl: NavController,
              public navParams: NavParams, 
              public app:App, 
              public alertCtrl: AlertController,
              private fire: AngularFireAuth,
              private firedata: AngularFireDatabase
              ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Settings2Page');
  }
  keluar(){

      this.fire.auth.signOut;
    	this.app.getRootNav().setRoot(LoginKurirPage);
    		//this.navCtrl.push(LoginPage);

	}

     edit() {
    let prompt = this.alertCtrl.create({
      title: 'Edit',
      inputs: [
        {
          name: 'title',
          placeholder: 'Title'
        },
      ],


      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Save',
          handler: data => {
            console.log('Saved clicked');
          }
        }
      ]
    });
    prompt.present();
  }
}