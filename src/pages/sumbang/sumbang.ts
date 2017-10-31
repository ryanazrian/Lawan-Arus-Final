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
  kuota: number; 
  done: any;
  penerima_nama: string;
  nama_donatur: string;
  hp_donatur: string;

  // jenis_barang:string;
  // kondisi_barang: string;

  //verifikasi
  submitted = false;
  choose_jenis_barang = false;
  choose_nama_barang = false;
  choose_jumlah_barang = false;
  choose_berat_barang = false;
  choose_deskripsi_barang = false;
  choose_gambar_barang = false;

  //verifikasi


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
                  this.hp_donatur = data.nama
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


  post_donatur(){

    //verifikasi
    this.submitted = true;
    //verifikasi
    if(this.choose_berat_barang && this.choose_deskripsi_barang && this.choose_jenis_barang && this.choose_jumlah_barang && this.choose_nama_barang && this.choose_gambar_barang)
    {

    var user = this.fire.auth.currentUser;  

    this.firedata.list('/data_barang_donatur/')
      .push(
        {
          //penerima_yayasan: this.item, 
          donatur: user.uid,  
          nama_barang: this.nama_barang.value, 
          jenis_barang:this.jenis_barang, 
          nama_donatur: this.nama_donatur,
          hp_donatur: this.hp_donatur,
          //kondisi_barang: this.kondisi_barang,
          yayasan: this.penerima_nama, 
          jumlah_barang: this.jumlah_barang.value, 
          deskripsi: this.deskripsi.value,
          status:1,
          penerima_yayasan: this.yayasan
        })
        // .then(data => {
        //   console.log(data);
        //     this.id_post = data.path.pieces_[1];
        //   console.log("pieces", data.path.pieces_[1]);
        //   console.log("id_post", this.id_post);
        //   })
        //   console.log("mau masuk ke auto");
        //   this.auto();
  

            this.firedata.object('/data_user/'+ this.yayasan).update({ 
              kuota: this.kuota +1 })
      
        const picture = storage().ref('picture/foto_barang_donatur/'+user.uid+'--'+this.id_post);
        picture.putString(this.image, 'data_url');

        storage().ref().child('picture/foto_barang_donatur/'+user.uid+'--'+this.id_post).getDownloadURL().then(url =>{
          // ini kedata base
          this.firedata.object('/data_barang_donatur/'+ this.id_post).update({
          image: url })
        })


        //dapet data kurir
        this.firedata.list('/data_kurir/'+ this.yayasan).subscribe(data => {
          var random = Math.floor(Math.random() * (data.length - 0)) + 0;
          console.log(random);

          this.firedata.object('/data_barang_donatur/'+ this.id_post).update({
            kurir_nama: data[random].nama, 
            kurir_hp: data[random].hp,
            kurir_id: data[random].$key })

        })

    console.log('got data', user);
    //this.navCtrl.setRoot(ListPage);
    this.navCtrl.pop();
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
    
    this.cekGambarBarang();
  }

  ambilGambar() {
    storage().ref().child('picture/profileDonatur/'+ this.id_donatur).getDownloadURL().then(url =>{
      this.image=url;
    })
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