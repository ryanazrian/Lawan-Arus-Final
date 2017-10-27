import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, App, ActionSheetController, LoadingController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';
import { HistoryPage } from '../history/history';
import {ListPage} from '../list/list';
import { MyApp } from '../../app/app.component';



import { storage } from 'firebase';

import { Data } from '../../providers/data';
import { Http } from '@angular/http';
import { Camera, CameraOptions } from '@ionic-native/camera';

/**
 * Generated class for the YayasanPostPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-sumbang',
  templateUrl: 'sumbang.html',
})
export class SumbangPage {
  @ViewChild('nama_barang') nama_barang;
  @ViewChild('jenis_barang') jenis_barang;
  @ViewChild('berat_barang') berat_barang;
  @ViewChild('volume_barang') kondisi_barang;
  @ViewChild('deskripsi') deskripsi;
  //jumlah_barang: string;
  @ViewChild('jumlah_barang') jumlah_barang;
  image: string;
  id_donatur: string;
  id_post: string;
  kota: string;
  // jenis_barang:string;
  // kondisi_barang: string;

  yayasan: FirebaseObjectObservable<any[]>

  constructor(public navCtrl: NavController, 
              public navParams: NavParams, 
              public alerCtrl: AlertController,
              private fire:AngularFireAuth,
              private firedata: AngularFireDatabase,
              public http: Http, 
              public data: Data,
              private camera: Camera,
              public loadCtrl: LoadingController,
              public actionSheetCtrl: ActionSheetController,
              ) {
                var user = this.fire.auth.currentUser;
                this.firedata.object('/data_user/'+user.uid).subscribe(data=>{
                  this.id_donatur= data.id;
                  this.kota= data.provinsi;
                })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad YayasanPostPage');
  }
    doAlert() {
    let alert = this.alerCtrl.create({
      title: 'Terima Kasih',
      subTitle: 'Yayasan akan dipilihkan langsung oleh sistem',
      buttons: ['Ok']
    })
     .present()
  }

  post(){
      var user = this.fire.auth.currentUser; 
      this.firedata.list('/post_donatur/')
        .push({donatur: user.uid,  nama_barang: this.nama_barang.value, 
          jenis_barang:this.jenis_barang, kondisi_barang: this.kondisi_barang, 
          jumlah_barang: this.jumlah_barang.value, deskripsi: this.deskripsi.value,
          kota: this.kota
        });

          this.firedata.object('/post_donatur/').subscribe(data=>{
            this.id_post = data.$key;
            console.log(data.$key);
          })

          const picture = storage().ref('picture/barangDonatur/'+ this.id_donatur+'--'+this.id_post);
          picture.putString(this.image, 'data_url');

          storage().ref().child('picture/barangDonatur/'+ this.id_donatur+'--'+this.id_post).getDownloadURL().then(url =>{
            // ini kedata base
            this.firedata.object('/post_donatur/'+ this.id_donatur).update({
            image: url })
          })

         // console.log(data.$key);
      console.log('got data', user);
   
/*      console.log(this.nama_barang.value);
      console.log(this.volume_barang.value);
      console.log(this.berat_barang.value);
      console.log(this.keterangan.value);
      console.log(this.jenis_barang)*/
      this.doAlert();
      this.navCtrl.setRoot(ListPage);

  }

  uploadBarangDonatur() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Pilihan',
      buttons: [
        {
          text: 'Ambil Gambar Baru',
          role: 'ambilGambar',
          handler: () => {
            //this.takePicture();
          }
        },
        {
          text: 'Pilih Dari Galleri',
          role: 'gallery',
          handler: () => {
            this.getPhotoFromGallery();
          }
        }
      ]
    });
    actionSheet.present();
  }


  getPhotoFromGallery(){
    this.camera.getPicture({
        destinationType: this.camera.DestinationType.DATA_URL,
        sourceType     : this.camera.PictureSourceType.PHOTOLIBRARY,
        targetWidth: 600,
        targetHeight: 600
    }).then((imageData) => {
      
      this.image = 'data:image/jpeg;base64,' + imageData;
      })
            
  }
}
