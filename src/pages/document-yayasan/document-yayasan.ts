import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App, ActionSheetController, AlertController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';
import { Data } from '../../providers/data';
import { MyApp } from '../../app/app.component';
import { storage } from 'firebase';
import { Http } from '@angular/http';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { ProfilYayasanPage } from "../profil-yayasan/profil-yayasan";
import { DocumentEditYayasanPage } from "../document-edit-yayasan/document-edit-yayasan";

/**
 * Generated class for the DocumentYayasanPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-document-yayasan',
  templateUrl: 'document-yayasan.html',
})
export class DocumentYayasanPage {
  image: string;
  namaYayasan: string;
  id_yayasan: string;
  id: any;
  
  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public app: App,
    public alertCtrl: AlertController,
    private fire:AngularFireAuth,
    private firedata: AngularFireDatabase,
    public data: Data,
    private camera: Camera,
    public actionSheetCtrl: ActionSheetController,
    
  ) {
    this.data.getData().then((data) => {
      this.namaYayasan = data.namaYayasan;
      this.id_yayasan= data.id;
      this.ambilGambar();
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DocumentYayasanPage');
  }
  
  ambilGambar() {
    storage().ref().child('picture/documentYayasan/'+ this.id_yayasan).getDownloadURL().then(url =>{
      this.image=url;
    }).catch (error => {
      
    });
  }
  
  editDokumen(){
    this.navCtrl.push(DocumentEditYayasanPage);
  }

}
