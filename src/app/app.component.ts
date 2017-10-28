import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { Data } from "../providers/data";

import { TabsPage } from '../pages/tabs-donatur/tabs';
import { TabsYayasanPage } from '../pages/tabs-yayasan/tabs-yayasan';
//import { LoginPage } from '../pages/login/login';
import { LoginPage } from '../pages/login/login';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = LoginPage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, public data: Data) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });

    this.data.isLogin().then((value)=>{
      if(value){
        this.data.getRole().then((value)=>{
          switch(value){
            case "role1": this.rootPage = TabsPage;
              break;
            case "role2": this.rootPage = TabsYayasanPage;
              break;
            default : this.rootPage = LoginPage;
              break;
          }
        })
      } else {
         this.rootPage = LoginPage;
      }    
    });

  }
}
