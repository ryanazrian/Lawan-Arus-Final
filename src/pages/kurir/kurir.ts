import { Component } from '@angular/core';
import { IonicPage,App, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { RegisterKurirPage } from '../register-kurir/register-kurir';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';
import { DetailKurirPage } from '../detail-kurir/detail-kurir';
import { Data } from '../../providers/data';



/**
 * Generated class for the KurirPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-kurir',
  templateUrl: 'kurir.html',
})
export class KurirPage {
data: any;
yayasan: string;
id:string;
  
    


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
  }

  

  ionViewDidLoad() {
    console.log('ionViewDidLoad KurirPage');
    console.log('');

    let loader = this.loadingController.create({
      content: "Getting items.."
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
            
    
            
        });
        loader.dismiss();
      });
  }

  kurir(){
    this.navCtrl.push("RegisterKurirPage")
  }

  itemTapped(data) {
    // untuk push page dengan tabs dihide
    this.app.getRootNav().push(DetailKurirPage, data);
  }
}
