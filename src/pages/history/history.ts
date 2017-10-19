import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { Http } from '@angular/http';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';


// Import pages to allow links to the page
// import { SingleItem } from '../../pages/single-item/single-item';
import { Detail1Page } from '../../pages/detail1/detail1';


// Service import for items
import { ItemApi } from '../../services/service';

// The component imports the specific parts from the html and scss file.
// The Http provider is included to make the API call to the service.
@Component({
  selector: 'page-history',
  templateUrl: 'history.html'
})

// The generic export class is created with the page name.
export class HistoryPage {

  // The items array to populate with data is created
  yayasan: any;
  list: any;
  pet:string;

  // The navController and the ItemApi Service is injected into the constructor
  constructor(
              public navCtrl: NavController,
              public params:NavParams,
              private itemApi: ItemApi,
              public loadingController: LoadingController,
              private fire: AngularFireAuth,
              private firedata: AngularFireDatabase,              
            ) {
    this.pet = "progress";
    this.list=[];

    var user = this.fire.auth.currentUser;
    console.log(user.uid);
    this.firedata.list('/post_donatur/').subscribe(data =>{
        for(var i=0, j=0; i<data.length;i++){
          if(data[i].penerima == user.uid){
            this.list[j] = data[i];
            j++;
          }
        }
        // this.yayasan = data;

    });

  }

  // ------------------------------------------------------------------------------------------
  // FUNCTIONS
  // ------------------------------------------------------------------------------------------

  // This is where the data loads from the service.
  // It happens when the view loads for the first time.
  ionViewDidLoad() {
        console.log('ionViewDidLoad ListPage');
  }
  // End of Searchbar Code


  // This function is an event to listen to clicks on elements.
  // The SingleItem Page has been included to be passed in this function.
  itemTapped(data) {
    this.navCtrl.push(Detail1Page, data);
  }

}
