import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App, AlertController } from 'ionic-angular';
import { DetailPage } from '../detail/detail';
//import {Camera, File} from 'ionic-native';
import { Camera, File } from 'ionic-native';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { BarangProvider } from '../../providers/data_barang_yayasan';

declare var window: any;
import firebase from 'firebase';

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
   // nama_barang: string;
   // volume_barang: string;
   // berat_barang: string;
   // keterangan: string;
   // jenis_barang: string;
   yayasan: any;
   // public barang_yayasan:Array<any>;

  // public option={
  //   sourceType:Camera.PictureSourceType.SAVEPHOTOALBUM,
  //   mediaType:Camera.mediaType.ALLMEDIA,
  //   destinationType:Camera.DestinationType.FILE_URI
  // }

  // public Fbref:any;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams, 
              public app: App, public alertCtrl: AlertController,
              private fire: AngularFireAuth,
              private firedata: AngularFireDatabase,
              public BarangProvider: BarangProvider
              ) {
    //this.Fbref=firebase.storage().ref()
    const yayasan = this.firedata.list('/data_yayasan/').subscribe(data =>{
        console.log(data);
        this.yayasan = data;

    });

  }

  // getMedia(){
  //   Camera.getPicture(this.option).then(fileuri=>{
  //     window.resolvelocalFileSystemURL("file://"+fileuri, FE=>{
  //       FE.file(file=>{
  //         const FR=new FileReader()
  //         FR.onloadend=(res:any)=>{
  //           let AF=res.target.result
  //           let blob=new Blob([new Uint8Array(AF)], {type:'video/mp4'})
  //           this.upload(blob)
  //         };
  //         FR.readAsArrayBuffer(file);
  //       })
  //     })
  //   })
  // }
  // upload(blob:Blob){
  //   this.Fbref.child('vid').put(blob);
  // }

  ionViewDidLoad() {
        console.log('ionViewDidLoad HomePage');
    //     this.BarangProvider.getBarang().on('value', eventListSnapshot => {
    //   this.barang_yayasan = [];
    //   eventListSnapshot.forEach( snap => {
    //     this.barang_yayasan.push({
    //       nama_barang: snap.val().nama_barang,
    //       volume_barang: snap.val().volume_barang,
    //       berat_barang: snap.val().volume_barang,
    //       jenis_barang: snap.val().jenis_barang,
    //     });
    //     return false;
    //   });
    // });
  }


    itemTapped(data) {
    this.navCtrl.push(DetailPage, data);
  }

}