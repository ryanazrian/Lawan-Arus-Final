var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { TabsYayasanPage } from '../tabs-yayasan/tabs-yayasan';
import { RegisterYayasanPage } from '../register-yayasan/register-yayasan';
import { AngularFireAuth } from 'angularfire2/auth';
import { Data } from '../../providers/data';
import { AngularFireDatabase } from 'angularfire2/database';
/**
 * Generated class for the LoginYayasanPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var LoginYayasanPage = (function () {
    function LoginYayasanPage(navCtrl, navParams, alertCtrl, fire, firedata, data, loadingCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.alertCtrl = alertCtrl;
        this.fire = fire;
        this.firedata = firedata;
        this.data = data;
        this.loadingCtrl = loadingCtrl;
        this.angka = 1;
    }
    LoginYayasanPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad LoginYayasanPage');
    };
    LoginYayasanPage.prototype.alert = function (message) {
        this.alertCtrl.create({
            title: 'Info!',
            subTitle: message,
            buttons: ['OK']
        }).present();
    };
    LoginYayasanPage.prototype.login = function () {
        var _this = this;
        var loader = this.loadingCtrl.create({
            content: "Memuat...",
            duration: 3000
        });
        loader.present();
        this.fire.auth.signInWithEmailAndPassword(this.email.value, this.password.value)
            .then(function (user) {
            _this.firedata.object('/data_yayasan/' + user.uid).subscribe(function (data) {
                console.log(data);
                _this.data.login(data, "data_yayasan");
                console.log(data.jenis);
                if (data.jenis == 2) {
                    if (_this.angka == 1) {
                        _this.alert("Login Sukses");
                        _this.navCtrl.push(TabsYayasanPage);
                        _this.angka++;
                    }
                }
                else {
                    _this.alert("Pastikan Akun Anda Benar");
                }
            });
        })
            .catch(function (error) {
            console.log('got an error', error);
            _this.alert(error.message);
        });
        console.log('Would sign in with ', this.email.value, this.password.value);
    };
    LoginYayasanPage.prototype.daftar = function () {
        //this.navCtrl.setRoot(TabsPage);
        this.navCtrl.push(RegisterYayasanPage);
    };
    return LoginYayasanPage;
}());
__decorate([
    ViewChild('email'),
    __metadata("design:type", Object)
], LoginYayasanPage.prototype, "email", void 0);
__decorate([
    ViewChild('password'),
    __metadata("design:type", Object)
], LoginYayasanPage.prototype, "password", void 0);
LoginYayasanPage = __decorate([
    IonicPage(),
    Component({
        selector: 'page-login-yayasan',
        templateUrl: 'login-yayasan.html',
    }),
    __metadata("design:paramtypes", [NavController,
        NavParams,
        AlertController,
        AngularFireAuth,
        AngularFireDatabase,
        Data,
        LoadingController])
], LoginYayasanPage);
export { LoginYayasanPage };
//# sourceMappingURL=login-yayasan.js.map