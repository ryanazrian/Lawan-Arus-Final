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
import { ProfilYayasanPage } from '../profil-yayasan/profil-yayasan';
/**
 * Generated class for the EditYayasanPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var EditYayasanPage = (function () {
    function EditYayasanPage(navCtrl, navParams, app, alertCtrl, fire, firedata) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.app = app;
        this.alertCtrl = alertCtrl;
        this.fire = fire;
        this.firedata = firedata;
        var user = this.fire.auth.currentUser;
        this.firedata.object('/data_yayasan/' + user.uid).subscribe(function (data) {
            _this.nama = data.name;
            _this.alamat = data.alamat;
            _this.hp = data.hp;
            //this.email = data.email;
        });
    }
    EditYayasanPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad EditYayasanPage');
    };
    EditYayasanPage.prototype.edit = function () {
        var user = this.fire.auth.currentUser;
        this.firedata.object('/data_yayasan/' + user.uid).update({
            name: this.nama,
            alamat: this.alamat,
            hp: this.hp
        });
        this.navCtrl.setRoot(ProfilYayasanPage);
    };
    return EditYayasanPage;
}());
EditYayasanPage = __decorate([
    IonicPage(),
    Component({
        selector: 'page-edit-yayasan',
        templateUrl: 'edit-yayasan.html',
    }),
    __metadata("design:paramtypes", [NavController,
        NavParams,
        App,
        AlertController,
        AngularFireAuth,
        AngularFireDatabase])
], EditYayasanPage);
export { EditYayasanPage };
//# sourceMappingURL=edit-yayasan.js.map