import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App, AlertController, ActionSheetController,LoadingController  } from 'ionic-angular';
import { DetailPage } from '../detail/detail';
//import {Camera, File} from 'ionic-native';
import { Camera, File, CameraOptions  } from '@ionic-native/camerq';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { BarangProvider } from '../../providers/data_barang_yayasan';
import { Data } from '../../providers/data';
import { SumbangPage } from '../sumbang/sumbang';

declare var window: any;
import firebase from 'firebase';
import { MyApp } from '../../app/app.component';
import { storage } from 'firebase';
import { Http } from '@angular/http';
/**
 * Generated class for the HomePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
 foto:any;
   // nama_barang: string;
   // volume_barang: string;
   // berat_barang: string;
   // keterangan: string;
   // jenis_barang: string;
   image: any;
   yayasan: any;
   id_yayasan: string;
   list: any;
   kota: string;
   id:any;
   angka: any;
   // public barang_yayasan:Array<any>;
  // public option={
  //   sourceType:Camera.PictureSourceType.SAVEPHOTOALBUM,
  //   mediaType:Camera.mediaType.ALLMEDIA,
  //   destinationType:Camera.DestinationType.FILE_URI
  // }
  // public Fbref:any;
  constructor(public navCtrl: NavController, 
              public navParams: NavParams, 
              public app: App, 
              public alertCtrl: AlertController,
              private fire: AngularFireAuth,
              private firedata: AngularFireDatabase,
              public BarangProvider: BarangProvider,
              public data: Data,
              ) {
                this.data.getData().then((data) => {
                  this.id = data.id;
                  this.kota = data.kota;
                  console.log("data", data);

                this.list=[];
                this.angka = [];
                this.image = [];
   
                var user = this.fire.auth.currentUser;
                this.firedata.list('/data_user/').subscribe(data =>{
                  for(var i=0, j=0, k=0; i<data.length;i++){
                    if(data[i].jenis == 2 && this.kota == data[i].kota){
                        this.list[j] = data[i];
                        this.id_yayasan = data[i].id;
                        storage().ref().child('picture/profileYayasan/'+ this.id_yayasan).getDownloadURL().then(url =>{
                          this.image[j]=url;
                          console.log(this.angka[j]);
                        }).catch (error => {
                          
                        });
                        j++;
                        
                    }
                  }
                });
                console.log(this.angka);
              })
                            
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');

  
  }

  tambahBarang(){
    //this.navCtrl.push(SumbangPage);
    this.app.getRootNav().push(SumbangPage);
  }



  itemTapped(data) {
    // untuk push page dengan tabs dihide
    this.app.getRootNav().push(DetailPage, data);
    // this.navCtrl.push(DetailPage, data);
  }


}