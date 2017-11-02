import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController,ActionSheetController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
// import { LoginPage } from '../login/login';
import { NgForm } from '@angular/forms';
import { MyApp } from '../../app/app.component';
import { storage } from 'firebase';
import { Data } from '../../providers/data';
import { Http } from '@angular/http';
import { Camera, CameraOptions } from '@ionic-native/camera';

/**
 * Generated class for the LaporYayasanPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-lapor-yayasan',
  templateUrl: 'lapor-yayasan.html',
})
export class LaporYayasanPage {
  submitted = false;
  key: any;
  kuota_lapor: number;
  laporan: string;
  nama_pelapor: string;
  id_pelapor: string;

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
    public actionSheetCtrl: ActionSheetController,) {
      this.key = this.navParams.data;
      console.log(this.key);
      console.log("id yayasan", this.key.id);

      this.firedata.object('/data_user/'+ this.key.id).subscribe(data =>{   
        this.kuota_lapor = data.lapor;

        this.data.getData().then((data) => {
          this.nama_pelapor = data.nama,
          this.id_pelapor = data.id
      })
    });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LaporYayasanPage');
  }

  alert(text:string, message: string) {
    this.alertCtrl.create({
      title: text,
      subTitle: message,
      buttons: ['OK']
    }).present();
  }

  laporans(form: NgForm){
    this.submitted = true;

    if(form.valid){
      var user = this.fire.auth.currentUser; 
      this.firedata.list('/data_laporan/'+this.key.id).push(
        {
          id_yayasan:this.key.id, 
          nama_yayasan: this.key.namaYayasan, 
          laporan: this.laporan,
          nama_pelapor: this.nama_pelapor,
          id_pelapor: this.id_pelapor
        });

        this.firedata.object('/data_user/'+ this.key.id).update({ 
          lapor: this.kuota_lapor+1 })
        this.alert("Laporan Telah Disampaikan", "Laporan anda akan di validasi oleh admin");
      console.log('got data', user);
      this.navCtrl.pop();
 
  }
  else{
    // this.alert("Masukan Data Dengan Benar");
  }
   

      // console.log('Would register user with ', this.email, this.password);
  }

}
