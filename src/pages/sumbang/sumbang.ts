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
  @ViewChild('deskripsi') deskripsi;
  status: string;
  name: string;
  @ViewChild('jumlah_barang') jumlah_barang;

  @ViewChild('kondisi_barang') kondisi_barang;

  image: string;
  id_donatur: string;
  id_post: string;
  kota: string;
  list: any;
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

  post_donatur(){
    var user = this.fire.auth.currentUser; 
    this.firedata.list('/data_barang_donatur/')
      .push(
        {
          //penerima_yayasan: this.item, 
          donatur: user.uid,  
          nama_barang: this.nama_barang.value, 
          jenis_barang:this.jenis_barang, 
          kondisi_barang: this.kondisi_barang, 
          jumlah_barang: this.jumlah_barang.value, 
          deskripsi: this.deskripsi.value,
          status:0,
          penerima:'kosong'
        }).then(data => {
          console.log(data);
            this.id_post = data.path.pieces_[1];
          console.log(data.path.pieces_[1]);
          })
          console.log("mau masuk ke auto");
          this.auto();

        const picture = storage().ref('picture/foto_barang_donatur/'+user.uid+'--'+this.id_post);
        picture.putString(this.image, 'data_url');

        storage().ref().child('picture/foto_barang_donatur/'+user.uid+'--'+this.id_post).getDownloadURL().then(url =>{
          // ini kedata base
          this.firedata.object('/data_barang_donatur/'+ user.uid).update({
          image: url })
        })

    console.log('got data', user);
    this.navCtrl.setRoot(ListPage);
    this.doAlert();
}


auto(){ 
  console.log("masuk auto");
//  this.list=[];
 
  this.firedata.list('data_user',{query:{ 
    orderByChild:'kuota'
     
  }}).subscribe(data =>{    
    
    console.log(data[2]);
    console.log(data[2].email);
    console.log(data[2].id);
    var id_yayasan = data[0].id;
    this.firedata.object('/data_barang_donatur/'+ this.id_post).update({ 
      penerima: data[2].id }) 
      console.log('udah dapet id?')
      this.firedata.object('/data_user/'+ data[1].id).update({ 
        kuota: data[2].kuota +1 })
}); 

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

  ambilGambar() {
    storage().ref().child('picture/profileDonatur/'+ this.id_donatur).getDownloadURL().then(url =>{
      this.image=url;
    })
  }

}
