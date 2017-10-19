import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';


/**
 * Generated class for the LoggedInPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-logged-in',
  templateUrl: 'logged-in.html',
})
export class LoggedInPage {
  email: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, private fire:AngularFireAuth) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoggedInPage');
  }

}
