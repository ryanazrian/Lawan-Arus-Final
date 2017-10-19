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
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, Validators } from '@angular/forms';
import { KurirPilihPage } from '../kurir-pilih/kurir-pilih';
/**
 * Generated class for the RegisterYayasanPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var RegisterKurirPage = RegisterKurirPage_1 = (function () {
    function RegisterKurirPage(navCtrl, navParams, formBuilder) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.formBuilder = formBuilder;
        this.submitAttempt = false;
        this.formone = formBuilder.group({
            nama: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
            email: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[A-Za-z0-9._%+-]{3,}@[a-zA-Z]{3,}([.]{1}[a-zA-Z]{2,}|[.]{1}[a-zA-Z]{2,}[.]{1}[a-zA-Z]{2,})'), Validators.required])],
            password: ['', Validators.compose([Validators.maxLength(15), Validators.minLength(6), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
            password1: ['']
        }, {
            validator: RegisterKurirPage_1.MatchPassword // your validation method
        });
    }
    RegisterKurirPage.MatchPassword = function (AC) {
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
    RegisterKurirPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad RegisterYayasanPage');
    };
    RegisterKurirPage.prototype.daftar = function () {
        //this.navCtrl.setRoot(TabsPage);
        this.navCtrl.push(KurirPilihPage);
    };
    return RegisterKurirPage;
}());
RegisterKurirPage = RegisterKurirPage_1 = __decorate([
    IonicPage(),
    Component({
        selector: 'page-register-kurir',
        templateUrl: 'register-kurir.html',
    }),
    __metadata("design:paramtypes", [NavController, NavParams, FormBuilder])
], RegisterKurirPage);
export { RegisterKurirPage };
var RegisterKurirPage_1;
//# sourceMappingURL=register-kurir.js.map