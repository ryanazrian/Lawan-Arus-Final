import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RegisterPage } from '../register-donatur/register';
import { RegisterYayasanPage } from '../register-yayasan/register-yayasan';
import { RegisterKurirPage } from '../register-kurir/register-kurir';



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
		this.navCtrl.push(RegisterPage);

	}

   yayasan(){

  //this.navCtrl.setRoot(LoginYayasanPage);
    this.navCtrl.push(RegisterYayasanPage);

  }

     kurir(){

  //this.navCtrl.setRoot(LoginKurirPage);
    this.navCtrl.push(RegisterKurirPage);

  }


}
