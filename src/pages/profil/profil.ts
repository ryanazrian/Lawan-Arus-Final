import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App, AlertController } from 'ionic-angular';
import { MainPage } from '../main/main';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { EditDonaturPage } from '../edit-donatur/edit-donatur';
import { Data } from '../../providers/data';
/**
 * Generated class for the ProfilPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-profil',
  templateUrl: 'profil.html',
})
export class ProfilPage {
  nama: string;
  email: string;
  alamat: string;
  hp: string;
  id_donatur: string;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams, 
              public app:App, 
              public alertCtrl: AlertController, 
              private fire:AngularFireAuth, 
              private firedata: AngularFireDatabase,
              public data: Data,

              ) {

                // this.data.getRole().then(data =>{
                //   this.nama = data.nama;
                //   this.id_donatur = data.id;
                //   this.email = data.email;
                //   this.alamat = data.alamat;
                //   this.hp = data.hp;
                // })
                var user = this.fire.auth.currentUser;
                const donatur = this.firedata.object('/data_donatur/'+user.uid).subscribe(data =>{
                   this.nama = data.name;
                   this.email = data.email;
                   this.alamat = data.alamat;
                   this.hp = data.hp;
                 }
                  )
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilPage');
  }

  keluar(){
    this.fire.auth.signOut;
  	this.app.getRootNav().setRoot(MainPage);
  		//this.navCtrl.push(LoginPage);

	}

     edit() {
       //this.app.getRootNav().setRoot(LoginPage);
    this.navCtrl.push(EditDonaturPage);
  }

}
