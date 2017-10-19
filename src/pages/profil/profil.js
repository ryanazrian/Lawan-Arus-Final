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
import { MainPage } from '../main/main';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { EditDonaturPage } from '../edit-donatur/edit-donatur';
import { Data } from '../../providers/data';
/**
 * Generated class for the ProfilPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var ProfilPage = (function () {
    function ProfilPage(navCtrl, navParams, app, alertCtrl, fire, firedata, data) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.app = app;
        this.alertCtrl = alertCtrl;
        this.fire = fire;
        this.firedata = firedata;
        this.data = data;
        // this.data.getRole().then(data =>{
        //   this.nama = data.nama;
        //   this.id_donatur = data.id;
        //   this.email = data.email;
        //   this.alamat = data.alamat;
        //   this.hp = data.hp;
        // })
        var user = this.fire.auth.currentUser;
        var donatur = this.firedata.object('/data_donatur/' + user.uid).subscribe(function (data) {
            _this.nama = data.name;
            _this.email = data.email;
            _this.alamat = data.alamat;
            _this.hp = data.hp;
        });
    }
    ProfilPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad ProfilPage');
    };
    ProfilPage.prototype.keluar = function () {
        this.fire.auth.signOut;
        this.app.getRootNav().setRoot(MainPage);
        //this.navCtrl.push(LoginPage);
    };
    ProfilPage.prototype.edit = function () {
        //this.app.getRootNav().setRoot(LoginPage);
        this.navCtrl.push(EditDonaturPage);
    };
    return ProfilPage;
}());
ProfilPage = __decorate([
    IonicPage(),
    Component({
        selector: 'page-profil',
        templateUrl: 'profil.html',
    }),
    __metadata("design:paramtypes", [NavController,
        NavParams,
        App,
        AlertController,
        AngularFireAuth,
        AngularFireDatabase,
        Data])
], ProfilPage);
export { ProfilPage };
//# sourceMappingURL=profil.js.map