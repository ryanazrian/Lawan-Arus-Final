
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
import { BarangProvider } from '../../providers/data_barang_yayasan';


/**
 * Generated class for the YayasanPostPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-sumbangan',
  templateUrl: 'sumbangan.html',
})
export class SumbanganPage {
  @ViewChild('nama_barang') nama_barang;
  @ViewChild('jenis_barang') jenis_barang;
  @ViewChild('berat_barang') berat_barang;
  @ViewChild('volume_barang') volume_barang;
  @ViewChild('deskripsi') deskripsi;
  @ViewChild('kondisi_barang') kondisi_barang;
  @ViewChild('jumlah_barang') jumlah_barang;
  image: string;
  id_post: string;
  //jenis_barang:string;
  penerima: string;
  item:any;
  status:string;
  nama: string;
  list: any;

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
                {
                  this.item = this.navParams.data;
                  console.log(this.item.$key);
                  // this.nama = this.navParams.data.nama;
                }
              }
  

  ionViewDidLoad() {
    console.log('ionViewDidLoad YayasanPostPage');
      }
    doAlert() {
    let alert = this.alerCtrl.create({
      title: 'Terima Kasih',
      subTitle: 'Terima Kasih sudah menyumbang, Yayasan akan segera menghubungi anda',
      buttons: ['Ok']
    })
     .present()
  }


  post_donatur(){
      var user = this.fire.auth.currentUser; 
      this.firedata.list('/data_barang_donatur/')
        .push(
          {
            penerima_yayasan: this.item.id, 
            donatur: user.uid,  
            nama_barang: this.nama_barang.value, 
            jenis_barang:this.jenis_barang, 
            jumlah_barang: this.jumlah_barang.value, 
            deskripsi: this.deskripsi.value,
            status:1
          }).then(data => {
              this.id_post = data.path.pieces_[1];
            })
  
          const picture = storage().ref('picture/foto_barang_donatur/'+user.uid+'--'+this.id_post);
          picture.putString(this.image, 'data_url');
  
          storage().ref().child('picture/foto_barang_donatur/'+user.uid+'--'+this.id_post).getDownloadURL().then(url =>{
            // ini kedata base
            this.firedata.object('/data_barang_donatur/'+ user.uid).update({
            image: url })
          })
          this.firedata.object('/data_user/'+ this.item.id).update({
            kuota: this.item.kuota+1 })

      console.log('got data', user);
      this.navCtrl.setRoot(ListPage);
      this.doAlert();
  }

  uploadBarangDonatur() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Pilihan',
      buttons: [
        // {
        //   text: 'Ambil Gambar Baru',
        //   role: 'ambilGambar',
        //   handler: () => {
        //     //this.takePicture();
        //   }
        // },
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