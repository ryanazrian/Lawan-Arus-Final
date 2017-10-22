import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams,  AlertController, App, ActionSheetController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';
import { HistoryPage } from '../history/history';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { storage } from 'firebase';
import { Data } from '../../providers/data';
import { ListPage} from '../list/list';
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
  // @ViewChild('jenis_barang') jenis_barang;
  @ViewChild('berat_barang') berat_barang;
  @ViewChild('volume_barang') volume_barang;
  @ViewChild('keterangan') keterangan;
  jenis_barang:string;
  kondisi_barang: string;
  status: string;
  deskripsi_barang: string;
  image: string;
  id_donatur: string;
  id_post: string;
  

  yayasan: FirebaseObjectObservable<any[]>

  constructor(public navCtrl: NavController, 
              public navParams: NavParams, 
              public alerCtrl: AlertController,
              private fire:AngularFireAuth,
              private firedata: AngularFireDatabase,
              private camera: Camera,
              public data: Data,
              public actionSheetCtrl: ActionSheetController,
              ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad YayasanPostPage');
  }
    doAlert() {
    let alert = this.alerCtrl.create({
      title: 'Terima Kasih',
      subTitle: 'Terima Kasih telah Menyumbangkan Sebagian Rezeki Anda. Sukses Selalu.',
      buttons: ['Ok']
    })
     .present()
  }

  ionViewWillEnter() {
    //ini ni ngambil value yang di return dari data.ts
    this.data.getData().then((data) => {
      this.id_post = data.uid;
      this.id_donatur = data.id;

    })
  }

//   post(){
//       var user = this.fire.auth.currentUser; 
//       this.firedata.list('/post_donatur/')
//         .push({user: user.uid,  nama_barang: this.nama_barang.value, 
//           jenis_barang:this.jenis_barang, kondisi_barang: this.kondisi_barang, berat_barang: this.berat_barang,
//            deskripsi_barang: this.deskripsi_barang, status: 0});
//       console.log('got data', user);
   
// /*      console.log(this.nama_barang.value);
//       console.log(this.volume_barang.value);
//       console.log(this.berat_barang.value);
//       console.log(this.keterangan.value);
//       console.log(this.jenis_barang)*/
//       this.doAlert();
//   }

  post(){
    const picture = storage().ref('picture/barangDonatur/'+ this.id_donatur+ this.id_post);
    picture.putString(this.image, 'data_url');
  		var user = this.fire.auth.currentUser;
  		this.firedata.list('/post_donatur/').push({
        user: user.uid,  
        nama_barang: this.nama_barang.value, 
        jenis_barang:this.jenis_barang, 
        kondisi_barang: this.kondisi_barang, 
        berat_barang: this.berat_barang,
        image: 'picture/barangDonatur/'+ this.id_donatur + this.id_post+ '.jpeg',
        deskripsi_barang: this.deskripsi_barang, 
        status: 0});
        console.log('got data', user);
        
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

      const picture = storage().ref('picture/profileDonatur/'+ this.id_donatur);
      picture.putString(this.image, 'data_url');

      storage().ref().child('picture/profileDonatur/'+ this.id_donatur).getDownloadURL().then(url =>{
        // ini kedata base
        this.firedata.object('/data_user/'+ this.id_donatur).update({
        image: url })
      })
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
      // this.base64Image = imageData;
      // this.uploadFoto();
      this.image = 'data:image/jpeg;base64,' + imageData;

      // const picture = storage().ref('picture/profileDonatur/'+ this.id_donatur);
      // picture.putString(this.image, 'data_url');
      // this.firedata.object('/data_user/'+ this.id_donatur).update({
      //   image: 'picture/profileDonatur/'+ this.id_donatur + '.jpeg'
      // })
            
      }, (err) => {
    });
  }
}
