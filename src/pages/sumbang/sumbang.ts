import { Component, ViewChild } from '@angular/core'; 
import { IonicPage, NavController, NavParams, AlertController, App, ActionSheetController, LoadingController } from 'ionic-angular'; 
import { AngularFireAuth } from 'angularfire2/auth'; 
import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database'; 
import { HistoryPage } from '../history/history'; 
import {ListPage} from '../list/list'; 
import { MyApp } from '../../app/app.component'; 

import { NgForm } from '@angular/forms';

 

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
  kuota: number; 
  done: any;
  penerima_nama: string;
  nama_donatur: string;
  hp_donatur: string;

  // jenis_barang:string;
  // kondisi_barang: string;

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


  yayasan: string;

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
                this.data.getData().then((data) => {
                  this.nama_donatur = data.nama,
                  this.hp_donatur = data.hp
              })
                                 

                var user = this.fire.auth.currentUser;
                this.firedata.object('/data_user/'+user.uid).subscribe(data=>{
                  this.id_donatur= data.id;
                  this.kota= data.provinsi;
                })

                this.done=[];  

                this.firedata.list('data_user',{query:{  
                  orderByChild:'kuota' 
                    
                }}).subscribe(data =>{   
                   
                  this.yayasan = data[2].id; 
                  for(var i=0, j=0; i<data.length && j<1;i++){ 
                    if(data[i].jenis == 2){
                      this.yayasan = data[i].id; 
                      this.penerima_nama = data[i].namaYayasan; 
                      this.kuota = data[i].kuota; 
                      j++; 
                    } 
                    else{} 
                  } 

                                    //

                  console.log("yayasan", this.yayasan);
              });
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

  doWarningAlert() {
    let alert = this.alerCtrl.create({
      title: 'Perbaiki Data',
      subTitle: 'masih ada yang salah bosqu',
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
          //kondisi_barang: this.kondisi_barang,
          yayasan: this.penerima_nama, 
          // jumlah_barang: this.jumlah_barang.value,
          jumlah_barang: this.jumlahBarang, 
          berat_barang: this.beratBarang,
          // deskripsi: this.deskripsi.value,
          deskripsi: this.deskripsiBarang,
          status:1,
          penerima_yayasan: this.yayasan,
          kurir_nama: 0,
          kurir_hp: 0
        })
        .then(data => {
          console.log(data);
            this.id_post = data.path.pieces_[1];
      
        const picture = storage().ref('picture/foto_barang_donatur/'+user.uid+'--'+this.id_post);
        picture.putString(this.image, 'data_url');

        storage().ref().child('picture/foto_barang_donatur/'+user.uid+'--'+this.id_post).getDownloadURL().then(url =>{
          // ini kedata base
          this.firedata.object('/data_barang_donatur/'+ this.id_post).update({
          image: url })
          })


        })
  
        this.firedata.object('/data_user/'+ this.yayasan).update({ 
          kuota: this.kuota +1 })
            


        //dapet data kurir
        // this.firedata.list('/data_kurir/'+ this.yayasan).subscribe(data => {
        //   var random = Math.floor(Math.random() * (data.length - 0)) + 0;
        //   console.log(random);

        //   this.firedata.object('/data_barang_donatur/'+ this.id_post).update({
        //     kurir_nama: data[random].nama, 
        //     kurir_hp: data[random].hp,
        //     kurir_id: data[random].$key })

        // })

    console.log('got data', user);
    //this.navCtrl.setRoot(ListPage);
    this.navCtrl.pop();
    this.doAlert();
    
  }
  else {
  }
}



  uploadBarangDonatur() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Pilihan',
      buttons: [
        {
          text: 'Ambil Gambar Baru',
          role: 'ambilGambar',
          handler: () => {
            this.takePicture();
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

  async takePicture(){
    try {
      const options : CameraOptions = {
        quality: 50, //to reduce img size
        targetHeight: 600,
        targetWidth: 600,
        destinationType: this.camera.DestinationType.DATA_URL, //to make it base64 image
        encodingType: this.camera.EncodingType.JPEG,
        mediaType:this.camera.MediaType.PICTURE,
        correctOrientation: true
      }

      const result =  await this.camera.getPicture(options);

      this.image = 'data:image/jpeg;base64,' + result;
      this.cekGambarBarang();
      
    }
    catch (e) {
      console.error(e);
      alert("error");
    }

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