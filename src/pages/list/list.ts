import { Component } from '@angular/core';
import { NavController, NavParams, App, LoadingController } from 'ionic-angular';
import { Http } from '@angular/http';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';


// Import pages to allow links to the page
// import { SingleItem } from '../../pages/single-item/single-item';
import { DetailListPage } from '../../pages/detail-list/detail-list';


// Service import for items
import { ItemApi } from '../../services/service';

// The component imports the specific parts from the html and scss file.
// The Http provider is included to make the API call to the service.
@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})

// The generic export class is created with the page name.
export class ListPage {

  // The items array to populate with data is created
  yayasan: any;
  options: string;
  list: any;
  diproses: any;
  selesai: any;

  // The navController and the ItemApi Service is injected into the constructor
  constructor(
              public navCtrl: NavController,
              public params:NavParams,
              private itemApi: ItemApi,
              public app: App,
              public loadingController: LoadingController,
              private fire: AngularFireAuth,
              private firedata: AngularFireDatabase,              
            ) {
    this.options = "diproses";
    this.diproses=[];
    this.selesai=[];    

    this.list=[];
  }

  // ------------------------------------------------------------------------------------------
  // FUNCTIONS
  // ------------------------------------------------------------------------------------------

  // This is where the data loads from the service.
  // It happens when the view loads for the first time.
  ionViewDidLoad() {
        console.log('ionViewDidLoad ListPage');

        let loader = this.loadingController.create({
          content: "Mendapatkan data.."
        });
            console.log('ionViewDidLoad ListPage');
    
            loader.present().then(() => {
            var user = this.fire.auth.currentUser;
            console.log(user.uid);
            this.firedata.list('/data_barang_donatur/', {query:{orderByChild:'number'}}).subscribe(data =>{
                for(var i=0, j=0; i<data.length;i++){
                  if(data[i].donatur == user.uid && data[i].status == 1){
                    this.diproses[j] = data[i];
                    console.log(this.diproses[j]);
                    j++;
                  }
                }
                // this.yayasan = data;
        
                
            });
            loader.dismiss();
        
            this.firedata.list('/data_barang_donatur/',{query:{orderByChild:'number'}} ).subscribe(data =>{
              for(var i=0, j=0; i<data.length;i++){
                if(data[i].donatur == user.uid && data[i].status == 2){
                  this.selesai[j] = data[i];
                  j++;
                }
              }
              // this.yayasan = data;
        
          });
        });
  }
  // End of Searchbar Code


  // This function is an event to listen to clicks on elements.
  // The SingleItem Page has been included to be passed in this function.
  itemTapped(data) {
    // untuk push page dengan tabs dihide
    this.app.getRootNav().push(DetailListPage, data);
  }

}
