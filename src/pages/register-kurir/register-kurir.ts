import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { LoginPage } from '../login/login';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';



/**
 * Generated class for the RegisterYayasanPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-register-kurir',
  templateUrl: 'register-kurir.html',
})
export class RegisterKurirPage {
  @ViewChild('email') email;
  @ViewChild('password') password;
  @ViewChild('nama') nama;
  @ViewChild('alamat') alamat;
  @ViewChild('hp') hp;
  // @ViewChild('namapemilik') namapemilik;
  @ViewChild('jenis') jenis;
  

  kurir: FirebaseObjectObservable<any[]>;

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
              public fire: AngularFireAuth,
              public firedata: AngularFireDatabase,
              public alertCtrl: AlertController
            ) {
    this.formone = formBuilder.group({
        nama: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
        email: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[A-Za-z0-9._%+-]{3,}@[a-zA-Z]{3,}([.]{1}[a-zA-Z]{2,}|[.]{1}[a-zA-Z]{2,}[.]{1}[a-zA-Z]{2,})'), Validators.required])],
        password: ['', Validators.compose([Validators.maxLength(15), Validators.minLength(6), Validators.required])],
        password1: [''], 
        alamat: [''],
        hp: ['', Validators.compose([ Validators.pattern('[0-9]*'), Validators.required])],        
    }, {
      validator: RegisterKurirPage.MatchPassword // your validation method
    }
    )

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterKurirPage');
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
        const kurir = this.firedata.object('/data_user/'+ data.uid);
        kurir.set({id:data.uid, name: this.nama.value, email: this.email.value, alamat:this.alamat.value, hp:this.hp.value, jenis:3})
        console.log('got data', data);
        this.alert('Registered!');
        this.navCtrl.setRoot(LoginPage);
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
