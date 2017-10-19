import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Detail2Page } from '../detail2/detail2';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
/**
 * Generated class for the Home1Page page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-home1',
  templateUrl: 'home1.html',
})
export class Home1Page {
  yayasan: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,  private fire: AngularFireAuth,
              private firedata: AngularFireDatabase) {
        const yayasan = this.firedata.list('/post_donatur/').subscribe(data =>{
        console.log(data);
        this.yayasan = data;

    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Home1Page');
  }

/*  detail(){

  //this.navCtrl.setRoot(DetailPage);
    this.navCtrl.push(DetailPage);

  }*/
      itemTapped(data) {
    this.navCtrl.push(Detail2Page, data);
  }
}
