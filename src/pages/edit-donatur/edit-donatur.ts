import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App, AlertController } from 'ionic-angular';

import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';

import { ProfilPage } from '../profil/profil';
/**
 * Generated class for the EditDonaturPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-edit-donatur',
  templateUrl: 'edit-donatur.html',
})
export class EditDonaturPage {
	nama:string;
  alamat:string;
  hp:string;
	//email:string;

  constructor(public navCtrl: NavController,
  			  public navParams: NavParams,
  			  public app: App,
  			  public alertCtrl: AlertController,
  			  private fire: AngularFireAuth,
  			  private firedata: AngularFireDatabase

  			  ) {
  				var user = this.fire.auth.currentUser;
  				this.firedata.object('/data_donatur/'+user.uid).subscribe(data=>{
  					this.nama = data.name;
            this.alamat= data.alamat;
            this.hp = data.hp;
  					//this.email = data.email;
  				})
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditDonaturPage');
  }

  edit(){
  		var user = this.fire.auth.currentUser;
  		this.firedata.object('/data_donatur/'+user.uid).update({
  			name: this.nama,
        alamat: this.alamat,
        hp:this.hp

  		});
  		this.navCtrl.setRoot(ProfilPage);

  }

  changeFoto(){
      this.navCtrl.push(ProfilPage); //nanti masukin  changePhotoPage
  }

}
