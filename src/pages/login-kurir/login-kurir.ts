import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TabsKurirPage } from '../tabs-kurir/tabs-kurir';
import { RegisterKurirPage } from '../register-kurir/register-kurir';


/**
 * Generated class for the LoginKurirPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-login-kurir',
  templateUrl: 'login-kurir.html',
})
export class LoginKurirPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginKurirPage');
  }

    login(){

	//this.navCtrl.setRoot(TabsPage);
		this.navCtrl.push(TabsKurirPage);

	}
daftar(){

  //this.navCtrl.setRoot(TabsPage);
    this.navCtrl.push(RegisterKurirPage);

  }


}
