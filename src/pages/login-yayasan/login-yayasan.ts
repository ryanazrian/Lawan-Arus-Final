import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { TabsYayasanPage } from '../tabs-yayasan/tabs-yayasan';
import { RegisterYayasanPage } from '../register-yayasan/register-yayasan';
import { AngularFireAuth } from 'angularfire2/auth';
import { Data } from '../../providers/data';
import { Http } from '@angular/http';
import { AngularFireDatabase } from 'angularfire2/database';
/**
 * Generated class for the LoginYayasanPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-login-yayasan',
  templateUrl: 'login-yayasan.html',
})
export class LoginYayasanPage {
    @ViewChild('email') email;
    @ViewChild('password') password;
    angka =1;


  constructor(public navCtrl: NavController, 
              public navParams: NavParams, 
              public alertCtrl: AlertController, 
              private fire:AngularFireAuth,
              private firedata: AngularFireDatabase,
              private data: Data,
              public loadingCtrl: LoadingController
              ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginYayasanPage');
  }

      alert(message: string) {
    this.alertCtrl.create({
      title: 'Info!',
      subTitle: message,
      buttons: ['OK']
    }).present();
  }

  login(){
        let loader = this.loadingCtrl.create({
      content: "Memuat...",
      duration: 3000
    });
    loader.present();

    this.fire.auth.signInWithEmailAndPassword(this.email.value, this.password.value)
    .then( user => {
       this.firedata.object('/data_yayasan/'+ user.uid).subscribe(data =>{
         console.log(data);
         this.data.login(data, "data_yayasan");

         console.log(data.jenis);
         if(data.jenis == 2){
           if(this.angka ==1){
                this.alert("Login Sukses");
                this.navCtrl.push(TabsYayasanPage);
                this.angka++;
           }
         }
         else{
           this.alert("Pastikan Akun Anda Benar");
         }
       });

    })
    .catch( error => {
      console.log('got an error', error);
      this.alert(error.message);
    })
    console.log('Would sign in with ', this.email.value, this.password.value);

	}
daftar(){

  //this.navCtrl.setRoot(TabsPage);
    this.navCtrl.push(RegisterYayasanPage);

  }

}
