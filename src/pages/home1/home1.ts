import { Component } from '@angular/core';
import { IonicPage, NavController,  NavParams } from 'ionic-angular';
import { Detail2Page } from '../detail2/detail2';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { Data } from '../../providers/data';
/**
 * Generated class for the Home1Page page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-home1',
  templateUrl: 'home1.html',
})
export class Home1Page {
  yayasan: any;
  list: any;
  status= 0;
  provinsi: string;
  

  constructor(public navCtrl: NavController, public navParams: NavParams,  private fire: AngularFireAuth,
              private firedata: AngularFireDatabase, public data: Data,) {
                this.list=[];

                  
                    var user = this.fire.auth.currentUser;
                    console.log()

                    const donatur = this.firedata.object('/post_donatur/'+user.uid).subscribe(data =>{
                      this.provinsi = data.provinsi;
                    })

                    this.firedata.list('/post_donatur/', {query: {orderByChild: "nama_barang"}}).subscribe(data =>{
                      for(var i=0, j=0; i<data.length;i++){
                          console.log("status "+data[i].status);
                          if(data[i].status == status){
                            if(data[i].provinsi == this.provinsi){
                              this.list[j] = data[i];
                              j++;
                            }
                          }
                        }
                        // this.yayasan = data;

    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Home1Page');
  }

/*  detail(){

  //this.navCtrl.setRoot(DetailPage);
    this.navCtrl.push(DetailPage);

  }*/
      itemTapped(data) {
    this.navCtrl.push(Detail2Page, data);
  }
}
