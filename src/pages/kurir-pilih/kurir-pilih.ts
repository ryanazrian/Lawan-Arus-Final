import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, App, LoadingController } from 'ionic-angular';
import { TabsKurirPage } from '../tabs-kurir/tabs-kurir';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';
//import { DetailKurirPage } from '../detail-kurir/detail-kurir';
import { Data } from '../../providers/data';


/**
 * Generated class for the KurirPilihPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-kurir-pilih',
  templateUrl: 'kurir-pilih.html',
})
export class KurirPilihPage {
  data: any;
  yayasan: string;
  id:string;
  item: any;
  status: string;
  key_barang: string;
  hasil: any;


  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public fire: AngularFireAuth,
              public app: App,
              public firedata: AngularFireDatabase,
              public alertCtrl: AlertController,
              public loadingController: LoadingController,
              public datas: Data,  
            
            ) {
              this.datas.getData().then((data) => {
                this.id = data.id;
                console.log(data);
              })

              this.item = this.navParams.data;
              this.status = this.item.status;
              this.key_barang = this.item.$key;

              
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad KurirPilihPage');

    let loader = this.loadingController.create({
      content: "Memuat.."
    });
        console.log('ionViewDidLoad ListPage');


        this.data=[];   
        loader.present().then(() => {
       // var user = this.fire.auth.currentUser;
        //console.log(user.uid);
        this.firedata.list('/data_kurir/'+this.id, {query: {orderByChild: "nama"}}).subscribe(data =>{
            // for(var i=0, j=0; i<data.length;i++){
            //     this.data[j] = data[i];
            //     j++;
            // }
             this.data = data;
            
    
             loader.dismiss();
             
        });

      });
  }

  daftar(){
  		this.navCtrl.setRoot(TabsKurirPage);

  }

  kurir(data){
    var user = this.fire.auth.currentUser;
    this.hasil = data;

    this.item = this.navParams.data;

    console.log("Dataqu", this.hasil) ;
    console.log("Key", this.item); 


    this.firedata.object('/data_barang_donatur/'+this.item)
      .update({kurir_nama: this.hasil.nama,
               kurir_hp: this.hasil.hp,
      });


  console.log('got data', user);
  }

  doAlert(data) {
    let confirm = this.alertCtrl.create({
      title: 'Apakah Anda Yakin?',
      subTitle: 'Apakah ingin memilih kurir ini?',
      buttons: [
        {
          text: 'Tidak',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: 'Ya',
          handler: () => {
            console.log('Agree clicked')
            // this.navCtrl.setRoot(MyApp);
            this.kurir(data);
            //this.navCtrl.setRoot(HistoryPage);
            this.navCtrl.pop();
            
            // ,
            // this.data.logout();
            // this.app.getRootNav().setRoot(MyApp);
          }
        }
      ]
    });
    confirm.present();
  }

}
