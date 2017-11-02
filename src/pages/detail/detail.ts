import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';
import { SumbanganPage } from '../sumbangan/sumbangan';
import {PetaPage} from '../peta/peta';
import { LaporYayasanPage } from '../lapor-yayasan/lapor-yayasan';
import { MyApp } from '../../app/app.component';
import { storage } from 'firebase';
import { Http } from '@angular/http';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { Data } from '../../providers/data'; 



/**
 * Generated class for the DetailPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
//DETAIL POST YAYASAN DI DONATUR
@IonicPage()
@Component({
  selector: 'page-detail',
  templateUrl: 'detail.html',
})
export class DetailPage {
	item: any;
	donatur: string;
  penerima: any;
  data: any;
  hasil: any;
  image: string;
  id: string;
  id_pelapor: string;
  number= 0;

  constructor(public navCtrl: NavController,
  			  public navParams: NavParams,
          public alerCtrl: AlertController,
          public datas: Data,
  			  private fire: AngularFireAuth,
  			  private firedata: AngularFireDatabase
          ) 
          {
  	        {
              
              this.item = this.navParams.data;
              this.hasil = this.item;
              this.id = this.item.id;
              console.log('mantap', this.id);


              this.datas.getData().then((data) => {
                this.id_pelapor = data.id
                console.log("id saya", this.id_pelapor);
  
                this.firedata.list('/data_laporan/'+ this.id).subscribe(data =>{
                  
                                  for(var i=0, j=0; i<data.length && j<1;i++){
                                    console.log("dtaa", data[i]); 
                                    if(data[i].id_pelapor == this.id_pelapor){
                                        this.number++;
                                        j++;
                                    } 
                                    else{} 
                                  } 
                                    console.log("nomor", this.number);
                              });
            })    
              this.ambilGambar();
            }
          }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetailPage');
 
  }
      doAlert() {
    let alert = this.alerCtrl.create({
      title: 'Terima Kasih',
      subTitle: 'Terima Kasih sudah menyumbang, Tunggu yayasan menghubungi anda',
      buttons: ['Ok']
    })
     .present()
  }

  sumbang(data){

      this.navCtrl.push(SumbanganPage, this.hasil);
      //{penerima: this.item.$key}
 	 	// var user = this.fire.auth.currentUser;
 	 	// this.firedata.object('/data_barang_yayasan/'+this.item.$key)
 	 	// .update({donatur:1})

 	 	// this.doAlert();
  }


  lapor(data){
    
          this.navCtrl.push(LaporYayasanPage, this.hasil);
          //{penerima: this.item.$key}
          // var user = this.fire.auth.currentUser;
          // this.firedata.object('/data_barang_yayasan/'+this.item.$key)
          // .update({donatur:1})
    
          // this.doAlert();
      }

  ambilGambar() {
    storage().ref().child('picture/profileYayasan/'+this.item.$key).getDownloadURL().then(url =>{
      this.image=url;
    }).catch (error => {
      
    });
  }

  loadMap(){
    this.navCtrl.push(PetaPage);
  }

}
