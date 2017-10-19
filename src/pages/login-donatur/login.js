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
import { TabsPage } from '../tabs-donatur/tabs';
import { RegisterPage } from '../register-donatur/register';
import { AngularFireAuth } from 'angularfire2/auth';
import { Data } from '../../providers/data';
import { AngularFireDatabase } from 'angularfire2/database';
import { MainPage } from '../main/main';
//import { LoggedInPage } from '../logged-in/logged-in';
/**
 * Generated class for the LoginPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var LoginPage = (function () {
    function LoginPage(navCtrl, navParams, alertCtrl, fire, firedata, data, loadingCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.alertCtrl = alertCtrl;
        this.fire = fire;
        this.firedata = firedata;
        this.data = data;
        this.loadingCtrl = loadingCtrl;
        this.angka = 1;
    }
    LoginPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad LoginPage');
    };
    LoginPage.prototype.alert = function (message) {
        this.alertCtrl.create({
            title: 'Info!',
            subTitle: message,
            buttons: ['OK']
        }).present();
    };
    /*login(){
    
        //this.navCtrl.setRoot(TabsPage);
            this.navCtrl.push(TabsPage);
    
        }*/
    LoginPage.prototype.back = function () {
        this.navCtrl.setRoot(MainPage);
    };
    LoginPage.prototype.daftar = function () {
        //this.navCtrl.setRoot(TabsPage);
        this.navCtrl.push(RegisterPage);
    };
    LoginPage.prototype.login = function () {
        var _this = this;
        var loader = this.loadingCtrl.create({
            content: "Memuat...",
            duration: 3000
        });
        loader.present();
        this.fire.auth.signInWithEmailAndPassword(this.email.value, this.password.value)
            .then(function (user) {
            _this.firedata.object('/data_donatur/' + user.uid).subscribe(function (data) {
                console.log(data);
                _this.data.login(data, "data_donatur");
                if (data.jenis == 1) {
                    console.log(_this.angka);
                    if (_this.angka == 1) {
                        _this.alert('Success! You\'re logged in');
                        _this.navCtrl.push(TabsPage);
                        _this.angka++;
                    }
                }
                else {
                    _this.alert('Pastikan Akun Anda Benar');
                }
            });
        })
            .catch(function (error) {
            console.log('got an error', error);
            _this.alert(error.message);
        });
        console.log('Would sign in with ', this.email.value, this.password.value);
    };
    return LoginPage;
}());
__decorate([
    ViewChild('email'),
    __metadata("design:type", Object)
], LoginPage.prototype, "email", void 0);
__decorate([
    ViewChild('password'),
    __metadata("design:type", Object)
], LoginPage.prototype, "password", void 0);
__decorate([
    ViewChild('jenis'),
    __metadata("design:type", Object)
], LoginPage.prototype, "jenis", void 0);
LoginPage = __decorate([
    IonicPage(),
    Component({
        selector: 'page-login',
        templateUrl: 'login.html',
    }),
    __metadata("design:paramtypes", [NavController,
        NavParams,
        AlertController,
        AngularFireAuth,
        AngularFireDatabase,
        Data,
        LoadingController])
], LoginPage);
export { LoginPage };
//# sourceMappingURL=login.js.map