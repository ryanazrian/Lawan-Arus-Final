var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App, AlertController } from 'ionic-angular';
import { LoginKurirPage } from '../login-kurir/login-kurir';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
/**
 * Generated class for the Settings2Page page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var Settings2Page = (function () {
    function Settings2Page(navCtrl, navParams, app, alertCtrl, fire, firedata) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.app = app;
        this.alertCtrl = alertCtrl;
        this.fire = fire;
        this.firedata = firedata;
    }
    Settings2Page.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad Settings2Page');
    };
    Settings2Page.prototype.keluar = function () {
        this.fire.auth.signOut;
        this.app.getRootNav().setRoot(LoginKurirPage);
        //this.navCtrl.push(LoginPage);
    };
    Settings2Page.prototype.edit = function () {
        var prompt = this.alertCtrl.create({
            title: 'Edit',
            inputs: [
                {
                    name: 'title',
                    placeholder: 'Title'
                },
            ],
            buttons: [
                {
                    text: 'Cancel',
                    handler: function (data) {
                        console.log('Cancel clicked');
                    }
                },
                {
                    text: 'Save',
                    handler: function (data) {
                        console.log('Saved clicked');
                    }
                }
            ]
        });
        prompt.present();
    };
    return Settings2Page;
}());
Settings2Page = __decorate([
    IonicPage(),
    Component({
        selector: 'page-settings2',
        templateUrl: 'settings2.html',
    }),
    __metadata("design:paramtypes", [NavController,
        NavParams,
        App,
        AlertController,
        AngularFireAuth,
        AngularFireDatabase])
], Settings2Page);
export { Settings2Page };
//# sourceMappingURL=settings2.js.map