import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoginPage } from '../login-donatur/login';
import { LoginYayasanPage } from '../login-yayasan/login-yayasan';
import { LoginKurirPage } from '../login-kurir/login-kurir';



/**
 * Generated class for the MainPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-main',
  templateUrl: 'main.html',
})
export class MainPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MainPage');
  }

  login(){

	//this.navCtrl.setRoot(LoginPage);
		this.navCtrl.push(LoginPage);

	}

   yayasan(){

  //this.navCtrl.setRoot(LoginYayasanPage);
    this.navCtrl.push(LoginYayasanPage);

  }

     kurir(){

  //this.navCtrl.setRoot(LoginKurirPage);
    this.navCtrl.push(LoginKurirPage);

  }


}
