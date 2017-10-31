import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App } from 'ionic-angular';
import { SumbangPage } from '../sumbang/sumbang';


/**
 * Generated class for the PertaminaPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-pertamina',
  templateUrl: 'pertamina.html',
})
export class PertaminaPage {

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public app: App,               
            ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PertaminaPage');
  }


  sumbang(){
    //this.navCtrl.push(SumbangPage);
    this.app.getRootNav().push(SumbangPage);
  }

}
