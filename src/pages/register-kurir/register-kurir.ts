import { Component } from '@angular/core';
import { IonicPage,LoadingController, NavController, NavParams, AlertController, App, ActionSheetController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { LoginPage } from '../login/login';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';
import { KurirPage } from '../kurir/kurir';

import { MyApp } from '../../app/app.component';
import { storage } from 'firebase';
import { Data } from '../../providers/data';
import { Http } from '@angular/http';
import { Camera, CameraOptions } from '@ionic-native/camera'


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
nama : string;
hp   : string; 
image: string;
id_yayasan: string;
id_kurir: string;
  

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
              public alertCtrl: AlertController,
              public http: Http, 
              public data: Data,
              private camera: Camera,
              public loadCtrl: LoadingController,
              public actionSheetCtrl: ActionSheetController,
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

<<<<<<< HEAD
  tambahkurir(){
    var user = this.fire.auth.currentUser; 
    this.firedata.list('/data_kurir/'+user.uid).push(
      {
        yayasan:user.uid, 
        nama: this.nama, 
        hp: this.hp
      });
      this.id_yayasan = user.uid;
    console.log('got data', user);
 
    this.alert("Kurir Berhasil Ditambahkan");
    this.navCtrl.setRoot(KurirPage);
=======
  tambahkurir(form: NgForm){
    this.submitted = true;

    if(form.valid){
      var user = this.fire.auth.currentUser; 
      this.firedata.list('/data_kurir/'+user.uid).push(
        {
          yayasan:user.uid, 
          nama: this.nama, 
          hp: this.hp
        });
        this.id_yayasan = user.uid;
        this.alert("Kurir Berhasil Ditambahkan");
      console.log('got data', user);
   
      
      this.navCtrl.setRoot(KurirPage);
    }
    else {
    }  
>>>>>>> parent of ae28970... regis kurir fix
}

}
