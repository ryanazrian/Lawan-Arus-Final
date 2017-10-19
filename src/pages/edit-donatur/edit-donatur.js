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
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { ProfilPage } from '../profil/profil';
/**
 * Generated class for the EditDonaturPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var EditDonaturPage = (function () {
    //email:string;
    function EditDonaturPage(navCtrl, navParams, app, alertCtrl, fire, firedata) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.app = app;
        this.alertCtrl = alertCtrl;
        this.fire = fire;
        this.firedata = firedata;
        var user = this.fire.auth.currentUser;
        this.firedata.object('/data_donatur/' + user.uid).subscribe(function (data) {
            _this.nama = data.name;
            _this.alamat = data.alamat;
            _this.hp = data.hp;
            //this.email = data.email;
        });
    }
    EditDonaturPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad EditDonaturPage');
    };
    EditDonaturPage.prototype.edit = function () {
        var user = this.fire.auth.currentUser;
        this.firedata.object('/data_donatur/' + user.uid).update({
            name: this.nama,
            alamat: this.alamat,
            hp: this.hp
        });
        this.navCtrl.setRoot(ProfilPage);
    };
    EditDonaturPage.prototype.changeFoto = function () {
        this.navCtrl.push(ProfilPage); //nanti masukin  changePhotoPage
    };
    return EditDonaturPage;
}());
EditDonaturPage = __decorate([
    IonicPage(),
    Component({
        selector: 'page-edit-donatur',
        templateUrl: 'edit-donatur.html',
    }),
    __metadata("design:paramtypes", [NavController,
        NavParams,
        App,
        AlertController,
        AngularFireAuth,
        AngularFireDatabase])
], EditDonaturPage);
export { EditDonaturPage };
//# sourceMappingURL=edit-donatur.js.map