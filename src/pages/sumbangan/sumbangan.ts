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

import { NgForm } from '@angular/forms';


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
  nama_donatur: string;
  random: number;
  hp_donatur: string;
  kurir_nama:string;
  kurir_hp:string;
  kurir_id:string;


  //verifikasi
  submitted = false;
  choose_gambar_barang = false;
  choose_jenis_barang = false;
  choose_nama_barang = false;
  choose_jumlah_barang = false;
  choose_berat_barang = false;
  choose_deskripsi_barang = false;

  //verifikasi

  //newVariables

  namaBarang: string;
  jumlahBarang: number;
  beratBarang: number;
  deskripsiBarang: string;

  //newVariables

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

                this.data.getData().then((data) => {
                  this.nama_donatur = data.nama;
                  this.hp_donatur = data.hp;
              })
                         //dapet data kurir
            console.log(this.item.$key);
            this.firedata.list('/data_kurir/'+ this.item.$key).subscribe(data => {
              console.log(data);
              console.log(data.length);
              this.random = Math.floor(Math.random() * (data.length - 0)) + 0;
              console.log(this.random);
    
                this.kurir_nama = data[this.random].nama, 
                this.kurir_hp = data[this.random].hp,
                this.kurir_id = data[this.random].$key 
    
            })

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


  post_donatur(form: NgForm){

    //verifikasi
    this.submitted = true;
    //verifikasi

    //loading

    // let loading = this.loadCtrl.create({
    //     content: 'memuat..'
    // });

    //loading

    if(form.valid && this.choose_jenis_barang && this.choose_gambar_barang)
    {
      var user = this.fire.auth.currentUser; 
      this.firedata.list('/data_barang_donatur/')
        .push(
          {
            //penerima_yayasan: this.item, 
          donatur: user.uid,  
          // nama_barang: this.nama_barang.value, 
          nama_barang:this.namaBarang,
          jenis_barang:this.jenis_barang, 
          jumlah_barang: this.jumlahBarang, 
          berat_barang: this.beratBarang,
          deskripsi: this.deskripsiBarang,
          
            penerima_yayasan: this.item.id,
            nama_donatur: this.nama_donatur,
            hp_donatur: this.hp_donatur, 
            yayasan: this.item.namaYayasan,
            // nama_barang: this.nama_barang.value, 
            // jenis_barang:this.jenis_barang, 
            // jumlah_barang: this.jumlah_barang.value, 
            // deskripsi: this.deskripsi.value,
            status:1,
            kurir_nama: this.kurir_nama,
            kurir_hp:this.kurir_hp,
            kurir_id:this.kurir_id
          }).then(data => {
              this.id_post = data.path.pieces_[1];
              console.log(this.id_post)
              
              //masukin foto ke storage firebase
              const picture = storage().ref('picture/foto_barang_donatur/'+user.uid+'--'+this.id_post);
              picture.putString(this.image, 'data_url');
      
              storage().ref().child('picture/foto_barang_donatur/'+user.uid+'--'+this.id_post).getDownloadURL().then(url =>{
                // ini kedata base
                this.firedata.object('/data_barang_donatur/'+ this.id_post).update({
                image: url })
              })

            })
    
          this.firedata.object('/data_user/'+ this.item.id).update({
            kuota: this.item.kuota+1 })


          
      console.log('got data', user);
      this.navCtrl.popToRoot();
      this.doAlert();
    }
    else {
    console.log("lengkapi data!");
    }
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
    
    this.cekGambarBarang();
            
  }


  //verifikasi pengisian
  cekJenisBarang() {
    this.choose_jenis_barang = true;
  }
  cekNamaBarang() {
    this.choose_nama_barang = true;
    console.log("berubah namnya harusnya bisa nih");
  }
  cekJumlahBarang() {
    this.choose_jumlah_barang = true;
  }
  cekBeratBarang() {
    this.choose_berat_barang = true;
  }
  cekDeskripsiBarang() {
    this.choose_deskripsi_barang = true;
  }
  cekGambarBarang() {
    this.choose_gambar_barang = true;
  }
  //verifikasi pengisian


}