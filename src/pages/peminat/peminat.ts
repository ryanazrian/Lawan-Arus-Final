import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Detail1Page } from '../detail1/detail1';


/**
 * Generated class for the PeminatPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-peminat',
  templateUrl: 'peminat.html',
})
export class PeminatPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PeminatPage');
  }

  detail(){

	//this.navCtrl.setRoot(Detail1Page);
		this.navCtrl.push(Detail1Page);

	}

}
