import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { TabsYayasanPage } from '../tabs-yayasan/tabs-yayasan';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';
import { LoginYayasanPage } from '../login-yayasan/login-yayasan';



/**
 * Generated class for the RegisterYayasanPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-register-yayasan',
  templateUrl: 'register-yayasan.html',
})
export class RegisterYayasanPage {
    @ViewChild('email') email;
    @ViewChild('password') password;
    @ViewChild('nama') nama;
    @ViewChild('alamat') alamat;
    @ViewChild('hp') hp;
    @ViewChild('namapemilik') namapemilik;
    @ViewChild('jenis') jenis;
   // @ViewChild('provinsi') provinsi;
   provinsi:string;



    yayasan : FirebaseObjectObservable<any[]>;
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

	    formone: FormGroup;
	    submitAttempt: boolean = false;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams, 
              public formBuilder: FormBuilder, 
              private fire: AngularFireAuth,
              private firedata: AngularFireDatabase,
              public alertCtrl: AlertController
              ) {
    this.formone = formBuilder.group({
        nama: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
        namapemilik: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
        hp: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[0-9]*'), Validators.required])],
        email: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[A-Za-z0-9._%+-]{3,}@[a-zA-Z]{3,}([.]{1}[a-zA-Z]{2,}|[.]{1}[a-zA-Z]{2,}[.]{1}[a-zA-Z]{2,})'), Validators.required])],
        password: ['', Validators.compose([Validators.maxLength(15), Validators.minLength(6), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
        provinsi: ['', Validators.compose([Validators.required])],
        password1: ['']
    }, {
      validator: RegisterYayasanPage.MatchPassword // your validation method
    }
    )

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterYayasanPage');
  }

    alert(message: string) {
    this.alertCtrl.create({
      title: 'Info!',
      subTitle: message,
      buttons: ['OK']
    }).present();
  }

   daftar(){
    this.fire.auth.createUserWithEmailAndPassword(this.email.value, this.password.value)
    .then(data => {
      const yayasan = this.firedata.object('/data_yayasan/'+ data.uid);
      yayasan.set({id:data.uid, namaYayasan: this.nama.value, provinsi: this.provinsi, namaPemilik: this.namapemilik.value, email: this.email.value, alamat:this.alamat.value, noHp:this.hp.value, jenis:2})
      console.log('got data', data);
      this.alert('Registered!');
      this.navCtrl.setRoot(LoginYayasanPage);
    })

    .catch (error => {
      console.log('got an error', error);
      this.alert(error.message);
    });
      console.log('Would register user with ', this.email.value, this.password.value);
  //this.navCtrl.setRoot(TabsPage);
    //this.navCtrl.push(TabsYayasanPage);

  }
  }

