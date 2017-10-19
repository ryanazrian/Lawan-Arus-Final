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
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { FormBuilder, Validators } from '@angular/forms';
import { LoginPage } from '../login-donatur/login';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
/**
 * Generated class for the RegisterPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation
 */
var RegisterPage = RegisterPage_1 = (function () {
    function RegisterPage(fire, firedata, navCtrl, navParams, formBuilder, alertCtrl) {
        this.fire = fire;
        this.firedata = firedata;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.formBuilder = formBuilder;
        this.alertCtrl = alertCtrl;
        this.submitAttempt = false;
        this.registerForm = formBuilder.group({
            nama: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
            hp: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[0-9]*'), Validators.required])],
            email: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[A-Za-z0-9._%+-]{3,}@[a-zA-Z]{3,}([.]{1}[a-zA-Z]{2,}|[.]{1}[a-zA-Z]{2,}[.]{1}[a-zA-Z]{2,})'), Validators.required])],
            password: ['', Validators.compose([Validators.maxLength(15), Validators.minLength(6), Validators.required])],
            password1: [''],
        }, {
            validator: RegisterPage_1.MatchPassword // your validation method
        });
    }
    RegisterPage.MatchPassword = function (AC) {
        var password = AC.get('password').value; // to get value in input tag
        var password1 = AC.get('password1').value; // to get value in input tag
        if (password != password1) {
            console.log('false');
            AC.get('password1').setErrors({ MatchPassword: true });
        }
        else {
            console.log('true');
            return null;
        }
    };
    RegisterPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad RegisterPage');
    };
    RegisterPage.prototype.alert = function (message) {
        this.alertCtrl.create({
            title: 'Info!',
            subTitle: message,
            buttons: ['OK']
        }).present();
    };
    /* daftar(){
   
     //this.navCtrl.setRoot(TabsPage);
       this.navCtrl.push(TabsPage);
   
     }*/
    RegisterPage.prototype.daftar = function () {
        var _this = this;
        this.fire.auth.createUserWithEmailAndPassword(this.email.value, this.password.value)
            .then(function (data) {
            var donatur = _this.firedata.object('/data_donatur/' + data.uid);
            donatur.set({ id: data.uid, name: _this.nama.value, email: _this.email.value, alamat: _this.alamat.value, hp: _this.hp.value, jenis: 1 });
            console.log('got data', data);
            _this.alert('Registered!');
            _this.navCtrl.setRoot(LoginPage);
        })
            .catch(function (error) {
            console.log('got an error', error);
            _this.alert(error.message);
        });
        console.log('Would register user with ', this.email.value, this.password.value);
        //this.navCtrl.setRoot(TabsPage);
        //this.navCtrl.push(TabsYayasanPage);
    };
    return RegisterPage;
}());
__decorate([
    ViewChild('email'),
    __metadata("design:type", Object)
], RegisterPage.prototype, "email", void 0);
__decorate([
    ViewChild('password'),
    __metadata("design:type", Object)
], RegisterPage.prototype, "password", void 0);
__decorate([
    ViewChild('nama'),
    __metadata("design:type", Object)
], RegisterPage.prototype, "nama", void 0);
__decorate([
    ViewChild('alamat'),
    __metadata("design:type", Object)
], RegisterPage.prototype, "alamat", void 0);
__decorate([
    ViewChild('hp'),
    __metadata("design:type", Object)
], RegisterPage.prototype, "hp", void 0);
__decorate([
    ViewChild('jenis'),
    __metadata("design:type", Object)
], RegisterPage.prototype, "jenis", void 0);
RegisterPage = RegisterPage_1 = __decorate([
    IonicPage(),
    Component({
        selector: 'page-register',
        templateUrl: 'register.html',
    }),
    __metadata("design:paramtypes", [AngularFireAuth, AngularFireDatabase, NavController, NavParams, FormBuilder, AlertController])
], RegisterPage);
export { RegisterPage };
var RegisterPage_1;
//# sourceMappingURL=register.js.map