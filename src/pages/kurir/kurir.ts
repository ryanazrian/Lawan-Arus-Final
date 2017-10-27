import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { RegisterKurirPage } from '../register-kurir/register-kurir';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';




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
  
    


  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public fire: AngularFireAuth,
              public firedata: AngularFireDatabase,
              public alertCtrl: AlertController,
              public loadingController: LoadingController,              
            ) {
  
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
        var user = this.fire.auth.currentUser;
        console.log(user.uid);
        this.firedata.list('/data_kurir/'+user.uid).subscribe(data =>{
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

}
