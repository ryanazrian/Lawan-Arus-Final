import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { LoginPage } from '../login-donatur/login';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';
import { NgForm } from '@angular/forms';

/**
 * Generated class for the RegisterPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation
 */
@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
  @ViewChild('email') email;
  @ViewChild('password') password;
  @ViewChild('nama') nama;
  @ViewChild('alamat') alamat;
  @ViewChild('hp') hp;
  @ViewChild('jenis') jenis;
  kota:string;

  //buat ffungsi tilik password
  status:string;
  lihat = true;
 //buat ffungsi tilik password
  

  donatur : FirebaseObjectObservable<any[]>;

	    static MatchPassword(AC: AbstractControl) {
       let password = AC.get('password').value; // to get value in input tag
       let password1 = AC.get('password1').value; // to get value in input tag
        if(password != password1) {
            console.log('false');
            AC.get('password1').setErrors( {MatchPassword: true} )
        } else {
            console.log('true');
            return null
        }
    }

	    registerForm: FormGroup;
	    submitAttempt: boolean = false;


  constructor(private fire: AngularFireAuth, private firedata: AngularFireDatabase , public navCtrl: NavController, public navParams: NavParams, public formBuilder: FormBuilder, private alertCtrl: AlertController) {
    this.registerForm = formBuilder.group({
        nama: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
        hp: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[0-9]*'), Validators.required])],
        email: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[A-Za-z0-9._%+-]{3,}@[a-zA-Z]{3,}([.]{1}[a-zA-Z]{2,}|[.]{1}[a-zA-Z]{2,}[.]{1}[a-zA-Z]{2,})'), Validators.required])],
        password: ['', Validators.compose([Validators.maxLength(15), Validators.minLength(6)  , Validators.required])],
        password1: [''],  kota: ['', Validators.compose([Validators.required])]
 
    }, {
      validator: RegisterPage.MatchPassword // your validation method
    }
    )

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
    this.status = "password";
  }

  alert(title:string,  message: string) {
    this.alertCtrl.create({
      title: title,
      subTitle: message,
      buttons: ['OK']
    }).present();
  }
 /* daftar(){

  //this.navCtrl.setRoot(TabsPage);
    this.navCtrl.push(TabsPage);

  }*/
  daftar(form: NgForm){
    if(form.valid){
    this.fire.auth.createUserWithEmailAndPassword(this.email.value, this.password.value)
    .then(data => {
      const donatur = this.firedata.object('/data_user/'+ data.uid);
      donatur.set({id:data.uid, name: this.nama.value, kota: this.kota, email: this.email.value, alamat:this.alamat.value, hp:this.hp.value, jenis:1})
      console.log('got data', data);
      this.alert('Pendaftaran berhasil','Selamat anda berhasil mendaftar, Silahkan cek Email anda dan lakukan konfirmasi!');
      this.navCtrl.setRoot(LoginPage);
    })

    .catch (error => {
      console.log('got an error', error);
      this.alert('Error', error.message);
    });
      console.log('Would register user with ', this.email.value, this.password.value);
  //this.navCtrl.setRoot(TabsPage);
    //this.navCtrl.push(TabsYayasanPage);
  }
  else{
    let alert = this.alertCtrl.create({
                title: 'Lengkapi Data',
                // subTitle: 'Email atau Password salah',      
                buttons: ['OK']
              });
              // this.vibration.vibrate(1000);
              alert.present();
  }

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

}
