import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { TabsPage } from '../tabs-donatur/tabs';
import { TabsYayasanPage } from '../tabs-yayasan/tabs-yayasan';
import { RegisterPage } from '../register-donatur/register';
import { AngularFireAuth } from 'angularfire2/auth';
import { Data } from '../../providers/data';
import { Http } from '@angular/http';
import { AngularFireDatabase } from 'angularfire2/database';
import { MainPage } from '../main/main';
import { TabsKurirPage } from '../tabs-kurir/tabs-kurir';
import { NgForm } from '@angular/forms';
//import { LoggedInPage } from '../logged-in/logged-in';



/**
 * Generated class for the LoginPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  @ViewChild('email') email;
  @ViewChild('password') password;
  @ViewChild('jenis') jenis;
  yayasan:string;
  role:string;
   angka=1;
   submitted = false;


   //buat ffungsi tilik password
  status:string;
  lihat = true;
 //buat ffungsi tilik password
  


  constructor(public navCtrl: NavController, 
              public navParams: NavParams, 
              public alertCtrl: AlertController, 
              private fire:AngularFireAuth, 
              private firedata: AngularFireDatabase,
              public data: Data,
              public loadingCtrl: LoadingController
              ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
    this.status = "password";
  }

  showPassword(){
    this.status = "text";
    this.lihat = false;
    console.log(this.status);
  }

  hidePassword(){
    this.status = "password";
    this.lihat = true;
    console.log(this.status);
  }


    alert(message: string) {
    this.alertCtrl.create({
      title: 'Info!',
      subTitle: message,
      buttons: ['OK']
    }).present();
  }
/*login(){

	//this.navCtrl.setRoot(TabsPage);
		this.navCtrl.push(TabsPage);

	}*/
back(){

  this.navCtrl.setRoot(MainPage);
}

daftar(){

  //this.navCtrl.setRoot(TabsPage);
    this.navCtrl.push(MainPage);

  }

    login(form: NgForm) {


    let loader = this.loadingCtrl.create({
      content: "Memuat...",
      duration: 10000
    });
    if(form.valid){
      this.submitted = true;
      loader.present();
      
        
        this.fire.auth.signInWithEmailAndPassword(this.email.value, this.password.value)
        .then( user => {
          if(user.emailVerified){
           this.firedata.object('/data_user/'+ user.uid).subscribe(data =>{
             console.log(data);
             this.role= "role"+data.jenis;
             console.log(this.role);
             this.data.login(data, this.role); //ke lokal
    
                    
             if(data.jenis == 1){
               console.log(this.angka)
               if(this.angka == 1 ){
                   this.navCtrl.setRoot(TabsPage);
                   loader.dismiss();
                   this.alert("Login Sukses");
                   this.angka++;
               }
           }
           else if(data.jenis == 2){
            if(this.angka ==1){
                 this.navCtrl.setRoot(TabsYayasanPage);
                 loader.dismiss();
                 this.alert("Login Sukses");
                 this.angka++;
            }
          }
    
          else if(data.jenis == 3){
            if(this.angka ==1){
                 this.navCtrl.setRoot(TabsKurirPage);
                 this.alert("Login Sukses");
                 this.angka++;
            }
          }
    
             else{
               loader.dismiss();
               this.alert('Pastikan Akun Anda Benar');
             }
    
           });
    
          }
          else{
            loader.dismiss();
            this.alert("Lakukan Verifikasi Akun Anda");
          }
    
        }).catch( error => {
        // console.error(error);      
        let alert = this.alertCtrl.create({
          title: 'Gagal Masuk',
          subTitle: 'Silahkan coba lagi. Cek kembali Email dan Password',      
          buttons: ['OK']
        });
        // this.vibration.vibrate(1000);
        // alert.present();
        // loader.dismiss();
      })
    }else{
      let alert = this.alertCtrl.create({
        title: 'Gagal Masuk',
        subTitle: 'Email atau Password salah',      
        buttons: ['OK']
      });
      // this.vibration.vibrate(1000);
      alert.present();

    }

  }
  
}
